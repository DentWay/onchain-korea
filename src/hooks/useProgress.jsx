import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { weeks as weekData } from '../data/curriculum'

const STORAGE_KEY = 'onchain-korea-progress'

const defaultProgress = {
  completedLessons: [],   // ['w1-1', 'w1-2', ...]
  completedActions: [],   // ['a1-1', ...]
  readHiddenTopics: [],   // [1, 2, ...] (week ids)
  currentWeek: 1,
}

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { ...defaultProgress, ...JSON.parse(saved) } : defaultProgress
  } catch {
    return defaultProgress
  }
}

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  // Toggle lesson complete/incomplete
  const toggleLesson = useCallback((lessonId) => {
    setProgress(prev => {
      const completed = prev.completedLessons.includes(lessonId)
        ? prev.completedLessons.filter(id => id !== lessonId)
        : [...prev.completedLessons, lessonId]
      return { ...prev, completedLessons: completed }
    })
  }, [])

  // Toggle action complete/incomplete
  const toggleAction = useCallback((actionId) => {
    setProgress(prev => {
      const completed = prev.completedActions.includes(actionId)
        ? prev.completedActions.filter(id => id !== actionId)
        : [...prev.completedActions, actionId]
      return { ...prev, completedActions: completed }
    })
  }, [])

  // Mark hidden topic as read
  const toggleHiddenTopic = useCallback((weekId) => {
    setProgress(prev => {
      const read = prev.readHiddenTopics.includes(weekId)
        ? prev.readHiddenTopics.filter(id => id !== weekId)
        : [...prev.readHiddenTopics, weekId]
      return { ...prev, readHiddenTopics: read }
    })
  }, [])

  // Computed values
  const totalLessons = weekData.reduce((sum, w) => sum + w.lessons.length, 0)
  const totalActions = weekData.reduce((sum, w) => sum + w.actions.length, 0)

  // Week unlock logic: all weeks open (demo/beta mode)
  // TODO: re-enable progressive unlock when launching production
  // Original: week N unlocks when week N-1 has >= 60% lessons done
  const isWeekUnlocked = useCallback(() => {
    return true
  }, [])

  // Get lesson status for a specific lesson
  const getLessonStatus = useCallback((lessonId) => {
    return progress.completedLessons.includes(lessonId) ? 'done' : 'available'
  }, [progress.completedLessons])

  // Get action status
  const getActionStatus = useCallback((actionId) => {
    return progress.completedActions.includes(actionId) ? 'done' : 'available'
  }, [progress.completedActions])

  // Week progress percentage
  const getWeekProgress = useCallback((weekId) => {
    const week = weekData.find(w => w.id === weekId)
    if (!week) return 0
    const done = week.lessons.filter(l => progress.completedLessons.includes(l.id)).length
    return Math.round((done / week.lessons.length) * 100)
  }, [progress.completedLessons])

  // Certificate eligibility: 80% lessons + 3 actions + 2 hidden topics
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

  // Overall progress percentage
  const overallProgress = Math.round(
    (progress.completedLessons.length / totalLessons) * 100
  )

  // Current active week (highest unlocked week with incomplete lessons)
  const activeWeek = weekData.reduce((active, w) => {
    if (isWeekUnlocked(w.id)) return w.id
    return active
  }, 1)

  // Reset all progress
  const resetProgress = useCallback(() => {
    setProgress(defaultProgress)
  }, [])

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
