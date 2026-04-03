import { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react'
import { supabase } from '../lib/supabase'
import useAuth from './useAuth'
import { weeks } from '../data/curriculum'
import { articleQuizzes } from '../data/quizzes'

const STORAGE_KEY = 'onchain-korea-quiz-results'

// Article quiz: 8/10 to pass
const ARTICLE_PASS_RATIO = 0.8
// Weekly test: 24/30 to pass (80%)
const WEEKLY_PASS_RATIO = 0.8

function loadLocal() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

function saveLocal(results) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(results)) } catch {}
}

const QuizContext = createContext(null)

export function QuizProvider({ children }) {
  const { user } = useAuth()
  const [results, setResults] = useState(loadLocal)
  const initialSyncDone = useRef(false)

  // Save to localStorage on every change
  useEffect(() => { saveLocal(results) }, [results])

  // Initial sync from Supabase on login
  useEffect(() => {
    if (!supabase || !user || initialSyncDone.current) return
    initialSyncDone.current = true

    ;(async () => {
      const { data: rows } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', user.id)

      if (rows && rows.length > 0) {
        const local = loadLocal()
        const merged = { ...local }

        for (const row of rows) {
          const key = `${row.quiz_type}-${row.quiz_id}`
          const existing = merged[key]
          if (!existing) {
            merged[key] = {
              attempts: 1,
              bestScore: row.score,
              total: row.total,
              passed: row.passed,
              firstPassDate: row.passed ? row.attempted_at : null,
            }
          } else {
            merged[key] = {
              attempts: existing.attempts + 1,
              bestScore: Math.max(existing.bestScore, row.score),
              total: row.total,
              passed: existing.passed || row.passed,
              firstPassDate: existing.firstPassDate
                ? (
                    row.passed && new Date(row.attempted_at).getTime() < new Date(existing.firstPassDate).getTime()
                      ? row.attempted_at
                      : existing.firstPassDate
                  )
                : (row.passed ? row.attempted_at : null),
            }
          }
        }

        setResults(merged)
        saveLocal(merged)
      }
    })()
  }, [user])

  // Reset sync flag on logout
  useEffect(() => {
    if (!user) {
      initialSyncDone.current = false
      setResults({})
    }
  }, [user])

  const getQuizStatus = useCallback((quizType, quizId) => {
    const key = `${quizType}-${quizId}`
    return results[key] || { attempts: 0, bestScore: 0, total: 0, passed: false, firstPassDate: null }
  }, [results])

  const submitQuiz = useCallback(async (quizType, quizId, score, total) => {
    const passRatio = quizType === 'article' ? ARTICLE_PASS_RATIO : WEEKLY_PASS_RATIO
    const passed = (score / total) >= passRatio
    const key = `${quizType}-${quizId}`

    // Update local state
    setResults(prev => {
      const existing = prev[key] || { attempts: 0, bestScore: 0, total: 0, passed: false, firstPassDate: null }
      const updated = {
        attempts: existing.attempts + 1,
        bestScore: Math.max(existing.bestScore, score),
        total,
        passed: existing.passed || passed,
        firstPassDate: existing.firstPassDate || (passed ? new Date().toISOString() : null),
      }
      return { ...prev, [key]: updated }
    })

    let syncError = null

    // Save to Supabase
    if (supabase && user) {
      try {
        const { error } = await supabase.from('quiz_results').insert({
          user_id: user.id,
          quiz_type: quizType,
          quiz_id: quizId,
          score,
          total,
          passed,
          attempted_at: new Date().toISOString(),
        })
        if (error) {
          syncError = error
          console.error('Quiz result sync failed:', error)
        }
      } catch (error) {
        syncError = error
        console.error('Quiz result sync failed:', error)
      }
    }

    return { passed, score, total, syncError }
  }, [user])

  const isArticlePassed = useCallback((lessonId) => {
    const status = getQuizStatus('article', lessonId)
    return status.passed
  }, [getQuizStatus])

  const isWeeklyTestPassed = useCallback((weekId) => {
    const status = getQuizStatus('weekly', String(weekId))
    return status.passed
  }, [getQuizStatus])

  // Check if all article quizzes for a week are passed
  const areAllArticleQuizzesPassed = useCallback((weekId) => {
    const week = weeks.find(w => w.id === Number(weekId))
    if (!week) return false
    return week.lessons.every(lesson => {
      // Only require quiz if quiz data exists for this lesson
      if (!articleQuizzes[lesson.id]) return true
      return isArticlePassed(lesson.id)
    })
  }, [isArticlePassed])

  const value = {
    getQuizStatus,
    submitQuiz,
    isArticlePassed,
    isWeeklyTestPassed,
    areAllArticleQuizzesPassed,
  }

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  )
}

export default function useQuiz() {
  const ctx = useContext(QuizContext)
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider')
  return ctx
}
