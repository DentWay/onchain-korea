import { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react'
import { weeks as weekData } from '../data/curriculum'
import { supabase } from '../lib/supabase'
import useAuth from './useAuth'

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

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const { user } = useAuth()
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

  // Flush pending sync on tab close
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && supabase && user) {
        clearTimeout(syncTimer.current)
        const data = loadLocal()
        navigator.sendBeacon?.(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/user_progress?id=eq.${user.id}`, '')
        // Fallback: sync immediately
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
    if (!user) initialSyncDone.current = false
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

  const toggleLesson = useCallback((lessonId) => {
    updateProgress(prev => ({
      ...prev,
      completedLessons: prev.completedLessons.includes(lessonId)
        ? prev.completedLessons.filter(id => id !== lessonId)
        : [...prev.completedLessons, lessonId],
    }))
  }, [updateProgress])

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

  const isWeekUnlocked = useCallback((weekId) => {
    if (weekId === 1) return true
    const prevWeek = weekData.find(w => w.id === weekId - 1)
    if (!prevWeek) return false
    const done = prevWeek.lessons.filter(l => progress.completedLessons.includes(l.id)).length
    return (done / prevWeek.lessons.length) >= 0.6
  }, [progress.completedLessons])

  const getLessonStatus = useCallback((lessonId) => {
    return progress.completedLessons.includes(lessonId) ? 'done' : 'available'
  }, [progress.completedLessons])

  const getActionStatus = useCallback((actionId) => {
    return progress.completedActions.includes(actionId) ? 'done' : 'available'
  }, [progress.completedActions])

  const getWeekProgress = useCallback((weekId) => {
    const week = weekData.find(w => w.id === weekId)
    if (!week) return 0
    const done = week.lessons.filter(l => progress.completedLessons.includes(l.id)).length
    return Math.round((done / week.lessons.length) * 100)
  }, [progress.completedLessons])

  const certificateStatus = {
    lessonsComplete: progress.completedLessons.length,
    lessonsRequired: Math.ceil(totalLessons * 0.8),
    lessonsEligible: progress.completedLessons.length >= Math.ceil(totalLessons * 0.8),
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
    (progress.completedLessons.length / totalLessons) * 100
  )

  const activeWeek = weekData.reduce((active, w) => {
    if (isWeekUnlocked(w.id)) return w.id
    return active
  }, 1)

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
    toggleLesson,
    toggleAction,
    toggleHiddenTopic,
    isWeekUnlocked,
    getLessonStatus,
    getActionStatus,
    getWeekProgress,
    certificateStatus,
    overallProgress,
    activeWeek,
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
