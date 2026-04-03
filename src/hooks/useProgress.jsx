import { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react'
import { weeks as weekData } from '../data/curriculum'
import { articleQuizzes, weeklyTests } from '../data/quizzes'
import { supabase } from '../lib/supabase'
import useAuth from './useAuth'
import useQuiz from './useQuiz'

const STORAGE_KEY = 'onchain-korea-progress'

const defaultProgress = {
  completedLessons: [],
  completedActions: [],
  readHiddenTopics: [],
  currentWeek: 1,
}

function loadLocal() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { ...defaultProgress, ...JSON.parse(saved) } : defaultProgress
  } catch {
    return defaultProgress
  }
}

function saveLocal(progress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)) } catch {}
}

function mergeProgress(local, remote) {
  return {
    completedLessons: [...new Set([...local.completedLessons, ...remote.completedLessons])],
    completedActions: [...new Set([...local.completedActions, ...remote.completedActions])],
    readHiddenTopics: [...new Set([...local.readHiddenTopics, ...remote.readHiddenTopics])],
    currentWeek: Math.max(local.currentWeek, remote.currentWeek),
  }
}

function sameItems(a, b) {
  if (a.length !== b.length) return false
  const set = new Set(a)
  return b.every((item) => set.has(item))
}

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const { user, isAdmin } = useAuth()
  const { getQuizStatus } = useQuiz()
  const [progress, setProgress] = useState(loadLocal)
  const syncTimer = useRef(null)
  const initialSyncDone = useRef(false)

  // Save to localStorage on every change
  useEffect(() => { saveLocal(progress) }, [progress])

  // Debounced sync to Supabase
  const syncToSupabase = useCallback((data) => {
    if (!supabase || !user) return
    clearTimeout(syncTimer.current)
    syncTimer.current = setTimeout(async () => {
      await supabase.from('user_progress').upsert({
        id: user.id,
        completed_lessons: data.completedLessons,
        completed_actions: data.completedActions,
        read_hidden_topics: data.readHiddenTopics,
        current_week: data.currentWeek,
        updated_at: new Date().toISOString(),
      })
    }, 500)
  }, [user])

  // Flush pending sync when the tab is backgrounded.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && supabase && user) {
        clearTimeout(syncTimer.current)
        const data = loadLocal()
        supabase.from('user_progress').upsert({
          id: user.id,
          completed_lessons: data.completedLessons,
          completed_actions: data.completedActions,
          read_hidden_topics: data.readHiddenTopics,
          current_week: data.currentWeek,
          updated_at: new Date().toISOString(),
        })
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [user])

  useEffect(() => {
    return () => {
      clearTimeout(syncTimer.current)
    }
  }, [])

  // Initial sync: merge local + remote on login
  useEffect(() => {
    if (!supabase || !user || initialSyncDone.current) return
    initialSyncDone.current = true

    ;(async () => {
      const { data: remote } = await supabase
        .from('user_progress')
        .select('*')
        .eq('id', user.id)
        .single()

      if (remote) {
        const remoteProgress = {
          completedLessons: remote.completed_lessons || [],
          completedActions: remote.completed_actions || [],
          readHiddenTopics: remote.read_hidden_topics || [],
          currentWeek: remote.current_week || 1,
        }
        const local = loadLocal()
        const merged = mergeProgress(local, remoteProgress)
        setProgress(merged)
        saveLocal(merged)
        syncToSupabase(merged)
      }
    })()
  }, [user, syncToSupabase])

  // Reset sync flag on logout
  useEffect(() => {
    if (!user) {
      initialSyncDone.current = false
      setProgress(defaultProgress)
    }
  }, [user])

  // Re-sync on reconnect
  useEffect(() => {
    const handleOnline = () => {
      if (supabase && user) syncToSupabase(loadLocal())
    }
    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [user, syncToSupabase])

  const updateProgress = useCallback((updater) => {
    setProgress(prev => {
      const next = updater(prev)
      syncToSupabase(next)
      return next
    })
  }, [syncToSupabase])

  const toggleAction = useCallback((actionId) => {
    updateProgress(prev => ({
      ...prev,
      completedActions: prev.completedActions.includes(actionId)
        ? prev.completedActions.filter(id => id !== actionId)
        : [...prev.completedActions, actionId],
    }))
  }, [updateProgress])

  const toggleHiddenTopic = useCallback((weekId) => {
    updateProgress(prev => ({
      ...prev,
      readHiddenTopics: prev.readHiddenTopics.includes(weekId)
        ? prev.readHiddenTopics.filter(id => id !== weekId)
        : [...prev.readHiddenTopics, weekId],
    }))
  }, [updateProgress])

  // Computed values
  const totalLessons = weekData.reduce((sum, w) => sum + w.lessons.length, 0)
  const totalActions = weekData.reduce((sum, w) => sum + w.actions.length, 0)

  const isLegacyLessonComplete = useCallback((lessonId) => {
    return progress.completedLessons.includes(lessonId)
  }, [progress.completedLessons])

  const isLessonComplete = useCallback((lessonId) => {
    const hasArticleQuiz = !!articleQuizzes[lessonId]
    if (!hasArticleQuiz) return isLegacyLessonComplete(lessonId)

    const status = getQuizStatus('article', lessonId)
    return status.passed || (status.attempts === 0 && isLegacyLessonComplete(lessonId))
  }, [getQuizStatus, isLegacyLessonComplete])

  const isWeekCompleted = useCallback((weekId) => {
    const week = weekData.find(w => w.id === Number(weekId))
    if (!week) return false

    const legacyWeekDone = week.lessons.every((lesson) => progress.completedLessons.includes(lesson.id))
    const status = getQuizStatus('weekly', String(weekId))

    if (weeklyTests[Number(weekId)]) {
      return status.passed || (status.attempts === 0 && legacyWeekDone)
    }

    return week.lessons.every((lesson) => isLessonComplete(lesson.id))
  }, [getQuizStatus, isLessonComplete, progress.completedLessons])

  const isWeekUnlockedByProgress = useCallback((weekId) => {
    if (weekId === 1) return true
    return isWeekCompleted(weekId - 1)
  }, [isWeekCompleted])

  const isWeekUnlocked = useCallback((weekId) => {
    return isAdmin || isWeekUnlockedByProgress(weekId)
  }, [isAdmin, isWeekUnlockedByProgress])

  // Sequential unlock: lesson N requires the previous lesson quiz to be passed.
  const isLessonUnlockedByProgress = useCallback((lessonId) => {
    for (const week of weekData) {
      const idx = week.lessons.findIndex(l => l.id === lessonId)
      if (idx === -1) continue
      if (!isWeekUnlockedByProgress(week.id)) return false
      if (idx === 0) return true
      return isLessonComplete(week.lessons[idx - 1].id)
    }
    return true
  }, [isLessonComplete, isWeekUnlockedByProgress])

  const isLessonUnlocked = useCallback((lessonId) => {
    return isAdmin || isLessonUnlockedByProgress(lessonId)
  }, [isAdmin, isLessonUnlockedByProgress])

  // Actions unlock after all lesson quizzes in that week are passed.
  const isActionsUnlockedByProgress = useCallback((weekId) => {
    const week = weekData.find(w => w.id === weekId)
    if (!week) return false
    return week.lessons.every(l => isLessonComplete(l.id))
  }, [isLessonComplete])

  const isActionsUnlocked = useCallback((weekId) => {
    return isAdmin || isActionsUnlockedByProgress(weekId)
  }, [isAdmin, isActionsUnlockedByProgress])

  // Hidden topic unlocks after at least 1 action in that week is completed
  const isHiddenTopicUnlockedByProgress = useCallback((weekId) => {
    const week = weekData.find(w => w.id === weekId)
    if (!week) return false
    return week.actions.some(a => progress.completedActions.includes(a.id))
  }, [progress.completedActions])

  const isHiddenTopicUnlocked = useCallback((weekId) => {
    return isAdmin || isHiddenTopicUnlockedByProgress(weekId)
  }, [isAdmin, isHiddenTopicUnlockedByProgress])

  const getLessonStatus = useCallback((lessonId) => {
    if (isLessonComplete(lessonId)) return 'done'
    return isLessonUnlocked(lessonId) ? 'available' : 'locked'
  }, [isLessonComplete, isLessonUnlocked])

  const getActionStatus = useCallback((actionId) => {
    if (progress.completedActions.includes(actionId)) return 'done'
    // Find which week this action belongs to
    for (const week of weekData) {
      if (week.actions.some(a => a.id === actionId)) {
        return isActionsUnlocked(week.id) ? 'available' : 'locked'
      }
    }
    return 'available'
  }, [progress.completedActions, isActionsUnlocked])

  const getWeekProgress = useCallback((weekId) => {
    const week = weekData.find(w => w.id === weekId)
    if (!week) return 0
    const done = week.lessons.filter(l => isLessonComplete(l.id)).length
    return Math.round((done / week.lessons.length) * 100)
  }, [isLessonComplete])

  const completedLessons = weekData.flatMap((week) =>
    week.lessons.filter((lesson) => isLessonComplete(lesson.id)).map((lesson) => lesson.id)
  )

  const certificateStatus = {
    lessonsComplete: completedLessons.length,
    lessonsRequired: Math.ceil(totalLessons * 0.8),
    lessonsEligible: completedLessons.length >= Math.ceil(totalLessons * 0.8),
    actionsComplete: progress.completedActions.length,
    actionsRequired: 3,
    actionsEligible: progress.completedActions.length >= 3,
    hiddenTopicsRead: progress.readHiddenTopics.length,
    hiddenTopicsRequired: 2,
    hiddenTopicsEligible: progress.readHiddenTopics.length >= 2,
    get eligible() {
      return this.lessonsEligible && this.actionsEligible && this.hiddenTopicsEligible
    },
  }

  const overallProgress = Math.round(
    (completedLessons.length / totalLessons) * 100
  )

  const activeWeek = weekData.reduce((active, w) => {
    if (isWeekUnlockedByProgress(w.id)) return w.id
    return active
  }, 1)

  useEffect(() => {
    const needsLessonMirror = !sameItems(progress.completedLessons, completedLessons)
    const needsWeekMirror = progress.currentWeek !== activeWeek

    if (!needsLessonMirror && !needsWeekMirror) return

    const next = {
      ...progress,
      completedLessons: needsLessonMirror ? completedLessons : progress.completedLessons,
      currentWeek: needsWeekMirror ? activeWeek : progress.currentWeek,
    }

    setProgress(next)
    syncToSupabase(next)
  }, [activeWeek, completedLessons, progress, syncToSupabase])

  const resetProgress = useCallback(() => {
    const reset = { ...defaultProgress }
    setProgress(reset)
    if (supabase && user) {
      supabase.from('user_progress').upsert({
        id: user.id,
        completed_lessons: [],
        completed_actions: [],
        read_hidden_topics: [],
        current_week: 1,
        updated_at: new Date().toISOString(),
      })
    }
  }, [user])

  const value = {
    ...progress,
    completedLessons,
    currentWeek: activeWeek,
    toggleAction,
    toggleHiddenTopic,
    isWeekCompleted,
    isWeekUnlocked,
    isLessonUnlocked,
    isActionsUnlocked,
    isHiddenTopicUnlocked,
    getLessonStatus,
    getActionStatus,
    getWeekProgress,
    certificateStatus,
    overallProgress,
    activeWeek,
    isAdmin,
    totalLessons,
    totalActions,
    resetProgress,
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

export default function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
