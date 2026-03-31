import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, X, Trophy, RotateCcw, ChevronRight, Clock, Award } from 'lucide-react'
import { weeks, l } from '../data/curriculum'
import { articleQuizzes, weeklyTests } from '../data/quizzes'
import useQuiz from '../hooks/useQuiz'
import useLang from '../hooks/useLang'

// Shuffle array (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Shuffle options and remap answer index
function shuffleQuestions(questions) {
  return shuffle(questions).map(q => {
    const correctOption = q.options[q.answer]
    const shuffled = shuffle(q.options)
    const newAnswer = shuffled.indexOf(correctOption)
    return { ...q, options: shuffled, answer: newAnswer }
  })
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function Quiz() {
  const { type, id } = useParams()
  const { getQuizStatus, submitQuiz } = useQuiz()
  const { t, lang } = useLang()

  // Validate params
  const isArticle = type === 'article'
  const isWeekly = type === 'weekly'
  const rawQuestions = isArticle ? articleQuizzes[id] : isWeekly ? weeklyTests[Number(id)] : null

  // Get quiz title
  const quizTitle = useMemo(() => {
    if (isWeekly) return `Week ${id} ${t('quiz.weeklyTest')}`
    // Find lesson in curriculum
    for (const week of weeks) {
      const lesson = week.lessons.find(les => les.id === id)
      if (lesson) return l(lesson.title, lang)
    }
    return id
  }, [type, id, lang, t])

  // Get back link
  const backLink = useMemo(() => {
    if (isWeekly) return `/week/${id}`
    for (const week of weeks) {
      if (week.lessons.some(les => les.id === id)) return `/week/${week.id}`
    }
    return '/dashboard'
  }, [type, id])

  // Quiz state
  const [phase, setPhase] = useState('start') // 'start' | 'quiz' | 'result'
  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [passed, setPassed] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef(null)

  const status = getQuizStatus(type, isWeekly ? String(id) : id)

  // Timer
  useEffect(() => {
    if (phase === 'quiz') {
      setElapsed(0)
      timerRef.current = setInterval(() => setElapsed(p => p + 1), 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [phase])

  if (!rawQuestions || (!isArticle && !isWeekly)) {
    return <Navigate to="/dashboard" replace />
  }

  const total = rawQuestions.length
  const passThreshold = isArticle ? Math.ceil(total * 0.8) : Math.ceil(total * 0.8)

  const handleStart = () => {
    setQuestions(shuffleQuestions(rawQuestions))
    setCurrentIdx(0)
    setSelectedOption(null)
    setAnswers([])
    setScore(0)
    setPassed(false)
    setPhase('quiz')
  }

  const handleSelect = (optIdx) => {
    if (selectedOption !== null) return // already selected
    setSelectedOption(optIdx)
  }

  const handleNext = async () => {
    const isCorrect = selectedOption === questions[currentIdx].answer
    const newAnswers = [...answers, { selected: selectedOption, correct: questions[currentIdx].answer, isCorrect }]
    setAnswers(newAnswers)

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1)
      setSelectedOption(null)
    } else {
      // Quiz finished
      clearInterval(timerRef.current)
      const finalScore = newAnswers.filter(a => a.isCorrect).length
      setScore(finalScore)
      const result = await submitQuiz(type, isWeekly ? String(id) : id, finalScore, total)
      setPassed(result.passed)
      setPhase('result')
    }
  }

  const isLastQuestion = currentIdx + 1 === questions.length

  // --- START SCREEN ---
  if (phase === 'start') {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Link to={backLink} className="text-[11px] text-accent-soft flex items-center gap-1 hover:text-accent transition-colors mb-6">
            <ArrowLeft size={12} /> {t('week.back')}
          </Link>

          <div className="ok-card p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[var(--accent-surface)] flex items-center justify-center mx-auto mb-4">
              <Award size={24} className="text-accent-soft" />
            </div>

            <p className="text-[10px] text-accent-soft font-mono uppercase tracking-widest mb-2">
              {isArticle ? t('quiz.articleQuiz') : t('quiz.weeklyTest')}
            </p>

            <h1 className="text-lg font-bold text-[var(--text-high)] mb-2">{quizTitle}</h1>

            <div className="flex items-center justify-center gap-4 text-[12px] text-[var(--text-mid)] mb-6">
              <span>{total} {t('quiz.question')}</span>
              <span className="text-[var(--border)]">|</span>
              <span>{t('quiz.passThreshold')}: {passThreshold}/{total}</span>
            </div>

            {status.attempts > 0 && (
              <div className="ok-card p-4 mb-6 text-left">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-[var(--text-low)]">{t('quiz.bestScore')}</span>
                  <span className={`font-semibold ${status.passed ? 'text-success' : 'text-[var(--text-high)]'}`}>
                    {status.bestScore}/{status.total}
                    {status.passed && <Check size={12} className="inline ml-1" />}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[12px] mt-2">
                  <span className="text-[var(--text-low)]">{t('quiz.attempts')}</span>
                  <span className="text-[var(--text-mid)]">{status.attempts}</span>
                </div>
                {status.firstPassDate && (
                  <div className="flex items-center justify-between text-[12px] mt-2">
                    <span className="text-[var(--text-low)]">{t('quiz.passed')}</span>
                    <span className="text-success text-[11px]">{new Date(status.firstPassDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            )}

            <button onClick={handleStart} className="ok-btn ok-btn-primary px-8 py-2.5 text-[14px]">
              {status.attempts > 0 ? t('quiz.retry') : t('quiz.start')}
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // --- QUIZ SCREEN ---
  if (phase === 'quiz') {
    const question = questions[currentIdx]
    const progress = ((currentIdx) / questions.length) * 100

    return (
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] text-[var(--text-low)] font-mono">
              {t('quiz.question')} {currentIdx + 1}{t('quiz.of')}{questions.length}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-[var(--text-low)]">
              <Clock size={11} />
              <span className="ok-tabular-nums">{formatTime(elapsed)}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="ok-progress-track mb-6">
            <motion.div
              className="ok-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="ok-card p-6 mb-4">
                <h2 className="text-[15px] font-semibold text-[var(--text-high)] leading-relaxed">
                  {lang === 'ko' ? question.q.ko : question.q.en}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-2 mb-6">
                {question.options.map((opt, i) => {
                  const isSelected = selectedOption === i
                  const isCorrect = selectedOption !== null && i === question.answer
                  const isWrong = selectedOption !== null && isSelected && i !== question.answer

                  let optClasses = 'ok-card px-5 py-3.5 cursor-pointer transition-all text-[13px]'
                  if (selectedOption === null) {
                    optClasses += ' hover:bg-[var(--surface-2)] hover:border-[rgba(255,255,255,0.14)]'
                  } else if (isCorrect) {
                    optClasses += ' border-success/30 bg-[var(--success-surface)]'
                  } else if (isWrong) {
                    optClasses += ' border-[var(--error)]/30 bg-[rgba(248,113,113,0.08)]'
                  } else {
                    optClasses += ' opacity-50'
                  }
                  if (isSelected && selectedOption !== null && !isWrong) {
                    optClasses += ' border-success/30'
                  }

                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`${optClasses} w-full text-left flex items-center gap-3`}
                      whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                    >
                      <span className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[11px] font-semibold border-2 transition-all ${
                        isCorrect ? 'bg-success border-success text-white' :
                        isWrong ? 'bg-[var(--error)] border-[var(--error)] text-white' :
                        isSelected ? 'border-accent bg-[var(--accent-surface)] text-accent-soft' :
                        'border-[var(--border)] text-[var(--text-low)]'
                      }`}>
                        {isCorrect ? <Check size={12} strokeWidth={3} /> :
                         isWrong ? <X size={12} strokeWidth={3} /> :
                         String.fromCharCode(65 + i)}
                      </span>
                      <span className={`flex-1 ${
                        isCorrect ? 'text-success' :
                        isWrong ? 'text-[var(--error)]' :
                        'text-[var(--text-high)]'
                      }`}>
                        {lang === 'ko' ? opt.ko : opt.en}
                      </span>
                    </motion.button>
                  )
                })}
              </div>

              {/* Next button */}
              <AnimatePresence>
                {selectedOption !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end"
                  >
                    <button onClick={handleNext} className="ok-btn ok-btn-primary px-6 py-2">
                      {isLastQuestion ? t('quiz.submit') : t('quiz.next')}
                      <ChevronRight size={14} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    )
  }

  // --- RESULT SCREEN ---
  if (phase === 'result') {
    const pct = Math.round((score / total) * 100)

    return (
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
          <div className="ok-card p-8 text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                passed ? 'bg-[var(--success-surface)]' : 'bg-[rgba(248,113,113,0.08)]'
              }`}
            >
              {passed ? <Trophy size={28} className="text-success" /> : <RotateCcw size={28} className="text-[var(--error)]" />}
            </motion.div>

            {/* Status */}
            <h2 className={`text-xl font-bold mb-1 ${passed ? 'text-success' : 'text-[var(--error)]'}`}>
              {passed ? t('quiz.passed') : t('quiz.failed')}
            </h2>
            <p className="text-[12px] text-[var(--text-mid)] mb-6">{quizTitle}</p>

            {/* Score */}
            <div className="ok-card p-5 mb-6 text-left">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] text-[var(--text-low)]">{t('quiz.score')}</span>
                <span className={`text-lg font-bold ok-tabular-nums ${passed ? 'text-success' : 'text-[var(--error)]'}`}>
                  {score}/{total}
                </span>
              </div>
              <div className="ok-progress-track mb-3">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: passed ? 'var(--success)' : 'var(--error)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--text-low)]">{t('quiz.passThreshold')}: {passThreshold}/{total}</span>
                <span className="text-[var(--text-low)]">{formatTime(elapsed)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-3">
              {!passed && (
                <button onClick={handleStart} className="ok-btn ok-btn-primary px-6 py-2.5">
                  <RotateCcw size={14} /> {t('quiz.retry')}
                </button>
              )}
              <Link to={backLink} className="ok-btn ok-btn-ghost px-6 py-2.5">
                {passed ? t('quiz.continue') : t('week.back')}
              </Link>
              {passed && (
                <button onClick={handleStart} className="ok-btn ok-btn-ghost px-6 py-2.5">
                  <RotateCcw size={14} /> {t('quiz.retry')}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return null
}
