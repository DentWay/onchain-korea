import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, X, Trophy, RotateCcw, ChevronRight, Clock, Award, Lock } from 'lucide-react'
import { weeks, l } from '../data/curriculum'
import { articleQuizzes, weeklyTests } from '../data/quizzes'
import useProgress from '../hooks/useProgress'
import useQuiz from '../hooks/useQuiz'
import useLang from '../hooks/useLang'

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

function shuffle(arr) {
  const next = [...arr]
  for (let index = next.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[target]] = [next[target], next[index]]
  }
  return next
}

function shuffleQuestions(questions) {
  return shuffle(questions).map((question) => {
    const correctOption = question.options[question.answer]
    const options = shuffle(question.options)
    const answer = options.indexOf(correctOption)
    return { ...question, options, answer }
  })
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  return `${minutes}:${remainder.toString().padStart(2, '0')}`
}

function getOptionTone({ selected, correct, wrong, answered }) {
  if (correct) {
    return 'border-[rgba(74,222,128,0.22)] bg-[rgba(74,222,128,0.10)] text-[#15803D]'
  }
  if (wrong) {
    return 'border-[rgba(248,113,113,0.24)] bg-[rgba(248,113,113,0.10)] text-[#B42318]'
  }
  if (selected) {
    return 'border-[rgba(59,130,246,0.22)] bg-[var(--app-soft-bg-strong)] text-[var(--text-high)]'
  }
  if (answered) {
    return 'border-[var(--app-soft-border)] bg-[rgba(255,255,255,0.03)] text-[var(--app-ink-low)]'
  }
  return 'border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] text-[var(--text-high)] hover:bg-[var(--app-soft-bg-strong)] hover:border-[rgba(255,255,255,0.16)]'
}

export default function Quiz() {
  const { type, id } = useParams()
  const { getQuizStatus, submitQuiz } = useQuiz()
  const { isWeekUnlocked, isLessonUnlocked, getLessonStatus, isAdmin } = useProgress()
  const { t, lang } = useLang()

  const isArticle = type === 'article'
  const isWeekly = type === 'weekly'
  const rawQuestions = isArticle ? articleQuizzes[id] : isWeekly ? weeklyTests[Number(id)] : null
  const articleWeek = isArticle ? weeks.find((week) => week.lessons.some((lesson) => lesson.id === id)) : null
  const weeklyWeek = isWeekly ? weeks.find((week) => week.id === Number(id)) : null

  const quizTitle = useMemo(() => {
    if (isWeekly) return `Week ${id} ${t('quiz.weeklyTest')}`
    for (const week of weeks) {
      const lesson = week.lessons.find((item) => item.id === id)
      if (lesson) return l(lesson.title, lang)
    }
    return id
  }, [id, isWeekly, lang, t])

  const backLink = useMemo(() => {
    if (isWeekly) return `/week/${id}`
    for (const week of weeks) {
      if (week.lessons.some((item) => item.id === id)) return `/week/${week.id}`
    }
    return '/dashboard'
  }, [id, isWeekly])

  const [phase, setPhase] = useState('start')
  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [passed, setPassed] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const timerRef = useRef(null)

  const status = getQuizStatus(type, isWeekly ? String(id) : id)

  useEffect(() => {
    if (phase === 'quiz') {
      setElapsed(0)
      timerRef.current = setInterval(() => setElapsed((value) => value + 1), 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [phase])

  if (!rawQuestions || (!isArticle && !isWeekly)) {
    return <Navigate to="/dashboard" replace />
  }

  if (isArticle && (!articleWeek || !isWeekUnlocked(articleWeek.id) || !isLessonUnlocked(id))) {
    return <Navigate to={articleWeek ? `/week/${articleWeek.id}` : '/dashboard'} replace />
  }

  if (
    isWeekly &&
    (
      !weeklyWeek ||
      !isWeekUnlocked(Number(id)) ||
      (!isAdmin && !weeklyWeek.lessons.every((lesson) => getLessonStatus(lesson.id) === 'done'))
    )
  ) {
    return <Navigate to={`/week/${id}`} replace />
  }

  const total = rawQuestions.length
  const passThreshold = Math.ceil(total * 0.8)
  const nextArticle = useMemo(() => {
    if (!isArticle || !articleWeek) return null
    const lessonIndex = articleWeek.lessons.findIndex((lesson) => lesson.id === id)
    return lessonIndex >= 0 ? articleWeek.lessons[lessonIndex + 1] || null : null
  }, [articleWeek, id, isArticle])

  const successLink = useMemo(() => {
    if (!passed) return backLink

    if (isArticle) {
      if (nextArticle) return `/lesson/${nextArticle.id}`
      if (articleWeek && weeklyTests[articleWeek.id]) return `/quiz/weekly/${articleWeek.id}`
      return articleWeek ? `/week/${articleWeek.id}` : '/dashboard'
    }

    if (isWeekly) {
      const nextWeek = weeks.find((week) => week.id === Number(id) + 1)
      return nextWeek ? `/week/${nextWeek.id}` : '/certificate'
    }

    return '/dashboard'
  }, [articleWeek, backLink, id, isArticle, isWeekly, nextArticle, passed])

  const successLabel = useMemo(() => {
    if (!passed) return t('week.back')

    if (isArticle) {
      if (nextArticle) return t('lesson.nextLesson')
      if (articleWeek && weeklyTests[articleWeek.id]) return t('quiz.weeklyTest')
      return pick(lang, '주차로 돌아가기', 'Back to week')
    }

    if (isWeekly) {
      const nextWeek = weeks.find((week) => week.id === Number(id) + 1)
      return nextWeek ? `Week ${nextWeek.id}` : t('sidebar.certificate')
    }

    return t('quiz.continue')
  }, [articleWeek, id, isArticle, isWeekly, lang, nextArticle, passed, t])

  const handleStart = () => {
    setQuestions(shuffleQuestions(rawQuestions))
    setCurrentIdx(0)
    setSelectedOption(null)
    setAnswers([])
    setScore(0)
    setPassed(false)
    setSubmitError('')
    setIsSubmitting(false)
    setPhase('quiz')
  }

  const handleSelect = (optionIndex) => {
    if (selectedOption !== null || isSubmitting) return
    setSelectedOption(optionIndex)
  }

  const handleNext = async () => {
    if (selectedOption === null || isSubmitting) return

    const isCorrect = selectedOption === questions[currentIdx].answer
    const nextAnswers = [...answers, { selected: selectedOption, correct: questions[currentIdx].answer, isCorrect }]
    setAnswers(nextAnswers)

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1)
      setSelectedOption(null)
      return
    }

    clearInterval(timerRef.current)
    const finalScore = nextAnswers.filter((answer) => answer.isCorrect).length
    setScore(finalScore)
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const result = await submitQuiz(type, isWeekly ? String(id) : id, finalScore, total)
      setPassed(result.passed)
      if (result.syncError) {
        setSubmitError(
          pick(
            lang,
            '기록 저장이 잠시 지연되고 있습니다. 새로고침 후에도 반영되지 않으면 다시 한 번 제출해보세요.',
            'Progress sync is delayed. If it does not appear after refresh, submit once more.'
          )
        )
      }
      setPhase('result')
    } catch (error) {
      console.error('Quiz submission failed:', error)
      setPassed((finalScore / total) >= 0.8)
      setSubmitError(
        pick(
          lang,
          '제출 중 오류가 있었지만 점수 계산은 끝났습니다. 계속 진행한 뒤 필요하면 다시 한 번 제출하세요.',
          'There was an error during submission, but your score was calculated. Continue and retry if needed.'
        )
      )
      setPhase('result')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (phase === 'start') {
    return (
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <section className="ok-workbench p-5 md:p-8 lg:p-10">
            <Link to={backLink} className="inline-flex items-center gap-2 text-[12px] font-medium ok-ink-mid transition-colors hover:text-[var(--text-high)]">
              <ArrowLeft size={14} />
              <span>{t('week.back')}</span>
            </Link>

            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="ok-paper p-6 md:p-8 lg:p-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(59,130,246,0.10)]">
                  <Award size={26} className="text-[#2156B8]" />
                </div>

                <p className="mt-6 text-[11px] uppercase tracking-[0.22em] ok-ink-low">
                  {isArticle ? t('quiz.articleQuiz') : t('quiz.weeklyTest')}
                </p>
                <h1 className="mt-3 max-w-3xl text-[28px] md:text-[36px] font-[800] tracking-[-0.05em] leading-tight ok-ink-high">
                  {quizTitle}
                </h1>
                <p className="mt-4 max-w-3xl text-[14px] md:text-[15px] leading-relaxed ok-ink-mid">
                  {pick(
                    lang,
                    isArticle
                      ? `${total}문제 중 ${passThreshold}문제 이상 맞히면 다음 아티클이 열립니다. 문제 순서와 선택지는 매번 바뀝니다.`
                      : `${total}문제 중 ${passThreshold}문제 이상 맞히면 다음 주가 열립니다. 아티클 퀴즈와 완전히 같은 문제는 나오지 않습니다.`,
                    isArticle
                      ? `Get at least ${passThreshold} of ${total} correct to unlock the next article. Questions are shuffled each attempt.`
                      : `Get at least ${passThreshold} of ${total} correct to unlock the next week. Questions are similar, not exact duplicates of article quizzes.`
                  )}
                </p>

                <div className="mt-8 grid gap-4 border-t border-[var(--app-divider)] pt-5 md:grid-cols-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] ok-ink-low">{pick(lang, '열리는 것', 'Unlocks')}</p>
                    <p className="mt-2 text-[15px] font-[700] ok-ink-high">
                      {isArticle
                        ? (nextArticle ? l(nextArticle.title, lang) : pick(lang, '이번 주 테스트', 'This week’s test'))
                        : (weeks.find((week) => week.id === Number(id) + 1) ? `Week ${Number(id) + 1}` : t('sidebar.certificate'))}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] ok-ink-low">{pick(lang, '응시 방식', 'Attempt mode')}</p>
                    <p className="mt-2 text-[15px] font-[700] ok-ink-high">{pick(lang, '횟수 제한 없음', 'Unlimited retries')}</p>
                    <p className="mt-1 text-[12px] leading-relaxed ok-ink-mid">
                      {pick(lang, '문제 순서와 보기 순서는 매번 바뀝니다.', 'Question order and answer order are shuffled every time.')}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button onClick={handleStart} className="ok-btn ok-btn-primary px-8 py-3 text-[14px]">
                    {status.attempts > 0 ? t('quiz.retry') : t('quiz.start')}
                  </button>
                  <Link to={backLink} className="ok-btn ok-btn-light px-8 py-3 text-[14px]">
                    {t('week.back')}
                  </Link>
                </div>
              </div>

              <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
                <div className="ok-paper-muted p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] ok-ink-low">{pick(lang, '응시 정보', 'Attempt summary')}</p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.16em] ok-ink-low">{pick(lang, '통과 기준', 'Pass threshold')}</p>
                      <p className="mt-1 text-[24px] font-[800] ok-tabular-nums ok-ink-high">{passThreshold}/{total}</p>
                    </div>
                    <div className="border-t border-[var(--app-divider)] pt-4">
                      <p className="text-[11px] uppercase tracking-[0.16em] ok-ink-low">{t('quiz.attempts')}</p>
                      <p className="mt-1 text-[20px] font-[800] ok-tabular-nums ok-ink-high">{status.attempts}</p>
                    </div>
                    <div className="border-t border-[var(--app-divider)] pt-4">
                      <p className="text-[11px] uppercase tracking-[0.16em] ok-ink-low">{t('quiz.bestScore')}</p>
                      <p className="mt-1 text-[20px] font-[800] ok-tabular-nums ok-ink-high">
                        {status.attempts > 0 ? `${status.bestScore}/${status.total}` : pick(lang, '기록 없음', 'No record')}
                      </p>
                    </div>
                    <div className="border-t border-[var(--app-divider)] pt-4">
                      <p className="text-[11px] uppercase tracking-[0.16em] ok-ink-low">{t('quiz.passed')}</p>
                      <p className="mt-1 text-[13px] font-[700] ok-ink-high">
                        {status.firstPassDate ? new Date(status.firstPassDate).toLocaleDateString() : pick(lang, '미통과', 'Not yet')}
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </motion.div>
      </div>
    )
  }

  if (phase === 'quiz') {
    const question = questions[currentIdx]
    const progress = ((currentIdx + 1) / questions.length) * 100
    const isLastQuestion = currentIdx + 1 === questions.length
    const answered = selectedOption !== null

    return (
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <section className="ok-workbench p-5 md:p-8 lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link to={backLink} className="inline-flex items-center gap-2 text-[12px] font-medium ok-ink-mid transition-colors hover:text-[var(--text-high)]">
                <ArrowLeft size={14} />
                <span>{t('week.back')}</span>
              </Link>
              <div className="flex items-center gap-4 text-[12px] ok-ink-mid">
                <div className="flex items-center gap-2">
                  <Clock size={13} />
                  <span className="ok-tabular-nums">{formatTime(elapsed)}</span>
                </div>
                <div className="h-4 w-px bg-[var(--app-divider)]" />
                <div className="ok-tabular-nums">{currentIdx + 1}/{questions.length}</div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
              <div className="ok-paper p-6 md:p-8 lg:p-10">
                <p className="text-[11px] uppercase tracking-[0.2em] ok-ink-low">
                  {isArticle ? t('quiz.articleQuiz') : t('quiz.weeklyTest')}
                </p>
                <h1 className="mt-2 max-w-3xl text-[24px] md:text-[32px] font-[800] tracking-[-0.05em] leading-tight ok-ink-high">{quizTitle}</h1>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-[var(--app-track)]">
                  <motion.div
                    className="h-full rounded-full bg-[#3B82F6]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] ok-ink-mid">
                  <span>{t('quiz.question')} {currentIdx + 1} {t('quiz.of')} {questions.length}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--app-ink-low)]" />
                  <span>{pick(lang, '현재 문제를 풀고 다음으로 넘어갑니다.', 'Finish this question and move to the next one.')}</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="mt-8"
                  >
                    <h2 className="text-[24px] md:text-[30px] font-[800] tracking-[-0.04em] leading-snug ok-ink-high">
                      {lang === 'ko' ? question.q.ko : question.q.en}
                    </h2>

                    <div className="mt-7 space-y-3">
                      {question.options.map((option, optionIndex) => {
                        const selected = selectedOption === optionIndex
                        const correct = answered && optionIndex === question.answer
                        const wrong = answered && selected && optionIndex !== question.answer
                        const optionTone = getOptionTone({ selected, correct, wrong, answered })

                        return (
                          <motion.button
                            type="button"
                            key={optionIndex}
                            onClick={() => handleSelect(optionIndex)}
                            disabled={isSubmitting}
                            className={`flex w-full items-start gap-4 rounded-[24px] border px-5 py-4 text-left transition-all ${optionTone}`}
                            whileTap={!answered ? { scale: 0.99 } : {}}
                          >
                            <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-[700] ${
                              correct
                                ? 'border-[#16A34A] bg-[#16A34A] text-white'
                                : wrong
                                  ? 'border-[#DC2626] bg-[#DC2626] text-white'
                                  : selected
                                    ? 'border-[#3B82F6] bg-[rgba(59,130,246,0.10)] text-[#2156B8]'
                                    : 'border-[var(--app-soft-border)] bg-[rgba(255,255,255,0.05)] ok-ink-mid'
                            }`}>
                              {correct ? <Check size={12} strokeWidth={3} /> : wrong ? <X size={12} strokeWidth={3} /> : String.fromCharCode(65 + optionIndex)}
                            </span>
                            <span className="flex-1 text-[15px] leading-relaxed">
                              {lang === 'ko' ? option.ko : option.en}
                            </span>
                          </motion.button>
                        )
                      })}
                    </div>

                    <AnimatePresence>
                      {answered && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex justify-end">
                          <button type="button" onClick={handleNext} disabled={isSubmitting} className="ok-btn ok-btn-primary px-6 py-3 text-[13px] disabled:opacity-60 disabled:cursor-not-allowed">
                            {isSubmitting ? t('auth.processing') : isLastQuestion ? t('quiz.submit') : t('quiz.next')}
                            <ChevronRight size={14} />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>
              </div>

              <aside className="xl:sticky xl:top-24 xl:self-start">
                <div className="ok-paper-muted p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] ok-ink-low">{pick(lang, '풀이 정보', 'Session info')}</p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.16em] ok-ink-low">{pick(lang, '현재 진행', 'Current progress')}</p>
                      <p className="mt-1 text-[24px] font-[800] ok-tabular-nums ok-ink-high">{currentIdx + 1}/{questions.length}</p>
                    </div>
                    <div className="border-t border-[var(--app-divider)] pt-4">
                      <p className="text-[11px] uppercase tracking-[0.16em] ok-ink-low">{pick(lang, '통과 기준', 'Pass threshold')}</p>
                      <p className="mt-1 text-[20px] font-[800] ok-tabular-nums ok-ink-high">{passThreshold}/{total}</p>
                    </div>
                    <div className="border-t border-[var(--app-divider)] pt-4">
                      <p className="text-[11px] uppercase tracking-[0.16em] ok-ink-low">{t('quiz.bestScore')}</p>
                      <p className="mt-1 text-[20px] font-[800] ok-tabular-nums ok-ink-high">
                        {status.attempts > 0 ? `${status.bestScore}/${status.total}` : pick(lang, '기록 없음', 'No record')}
                      </p>
                    </div>
                    <div className="border-t border-[var(--app-divider)] pt-4">
                      <p className="text-[12px] leading-relaxed ok-ink-mid">
                        {pick(
                          lang,
                          '오답이어도 바로 다음 문제로 넘어갈 수 있습니다. 마지막 문제까지 풀면 결과 화면에서 점수를 확인합니다.',
                          'Keep moving even if you miss one. The result screen appears after the last question.'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </motion.div>
      </div>
    )
  }

  if (phase === 'result') {
    const pct = Math.round((score / total) * 100)

    return (
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
          <section className="ok-workbench p-5 md:p-8 lg:p-10">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div className="ok-paper p-6 md:p-8 lg:p-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 220 }}
                  className={`flex h-[72px] w-[72px] items-center justify-center rounded-full ${
                    passed ? 'bg-[rgba(74,222,128,0.12)]' : 'bg-[rgba(248,113,113,0.10)]'
                  }`}
                >
                  {passed ? <Trophy size={30} className="text-[#15803D]" /> : <RotateCcw size={30} className="text-[#B42318]" />}
                </motion.div>

                <h2 className={`mt-6 text-[32px] font-[800] tracking-[-0.05em] ${passed ? 'text-[#15803D]' : 'text-[#B42318]'}`}>
                  {passed ? t('quiz.passed') : t('quiz.failed')}
                </h2>
                <p className="mt-2 text-[14px] ok-ink-mid">{quizTitle}</p>

                <div className="mt-8 border-t border-[var(--app-divider)] pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] uppercase tracking-[0.18em] ok-ink-low">{t('quiz.score')}</span>
                    <span className={`text-[30px] font-[800] ok-tabular-nums ${passed ? 'text-[#15803D]' : 'text-[#B42318]'}`}>
                      {score}/{total}
                    </span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--app-track)]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: passed ? '#16A34A' : '#DC2626' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </div>

                {submitError && (
                  <p className="mt-5 text-[12px] leading-relaxed ok-ink-mid">
                    {submitError}
                  </p>
                )}

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  {!passed && (
                    <button type="button" onClick={handleStart} className="ok-btn ok-btn-primary px-6 py-3 text-[13px]">
                      <RotateCcw size={14} />
                      {t('quiz.retry')}
                    </button>
                  )}
                  <Link to={passed ? successLink : backLink} className="ok-btn ok-btn-light px-6 py-3 text-[13px]">
                    {passed ? successLabel : t('week.back')}
                  </Link>
                  {passed && (
                    <button type="button" onClick={handleStart} className="ok-btn ok-btn-light px-6 py-3 text-[13px]">
                      <RotateCcw size={14} />
                      {t('quiz.retry')}
                    </button>
                  )}
                </div>
              </div>

              <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
                <div className="ok-paper-muted p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] ok-ink-low">{pick(lang, '결과 요약', 'Result summary')}</p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.16em] ok-ink-low">{t('quiz.passThreshold')}</p>
                      <p className="mt-1 text-[20px] font-[800] ok-tabular-nums ok-ink-high">{passThreshold}/{total}</p>
                    </div>
                    <div className="border-t border-[var(--app-divider)] pt-4">
                      <p className="text-[11px] uppercase tracking-[0.16em] ok-ink-low">{pick(lang, '소요 시간', 'Elapsed')}</p>
                      <p className="mt-1 text-[20px] font-[800] ok-tabular-nums ok-ink-high">{formatTime(elapsed)}</p>
                    </div>
                    {!passed && (
                      <div className="border-t border-[var(--app-divider)] pt-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--app-soft-border)] px-4 py-2 text-[12px] ok-ink-mid">
                          <Lock size={13} />
                          <span>{pick(lang, '횟수 제한 없이 다시 풀 수 있습니다', 'Unlimited retries available')}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </motion.div>
      </div>
    )
  }

  return null
}
