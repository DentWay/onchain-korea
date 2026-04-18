import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, BookOpen, Check, ChevronRight, ChevronUp, ClipboardCheck, Flame, Lock, Zap } from 'lucide-react'
import { weeks, l } from '../data/curriculum'
import { articleQuizzes, weeklyTests } from '../data/quizzes'
import useProgress from '../hooks/useProgress'
import useQuiz from '../hooks/useQuiz'
import useLang from '../hooks/useLang'
import LessonInline from '../components/LessonInline'

const weekdayLabels = {
  ko: { 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토' },
  en: { 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' },
}

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

function getStepTone(state) {
  if (state === 'done') {
    return 'border-[rgba(20,158,97,0.2)] bg-[rgba(20,158,97,0.16)] text-[var(--success)]'
  }
  if (state === 'locked') {
    return 'border-[var(--app-paper-border)] bg-[var(--app-paper-muted-bg)] text-[var(--app-ink-low)]'
  }
  return 'border-[rgba(87,65,216,0.2)] bg-[rgba(87,65,216,0.08)] text-[#5741d8]'
}

function getRowTone(state) {
  if (state === 'done') {
    return 'bg-[rgba(20,158,97,0.04)]'
  }
  if (state === 'locked') {
    return 'bg-transparent'
  }
  return 'bg-[var(--app-paper-bg)]'
}

function CadenceStep({ day, title, meta, state }) {
  return (
    <div className={`border-l-2 px-4 py-2 ${getStepTone(state)}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">{day}</span>
        <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${
          state === 'done' ? 'border-[rgba(20,158,97,0.25)] bg-[rgba(20,158,97,0.1)]' :
          state === 'locked' ? 'border-[var(--app-paper-border)] bg-[var(--app-paper-muted-bg)]' :
          'border-[rgba(87,65,216,0.2)] bg-[rgba(87,65,216,0.06)]'
        }`}>
          {state === 'done' ? <Check size={14} /> : state === 'locked' ? <Lock size={13} /> : <span className="h-2 w-2 rounded-full bg-current" />}
        </span>
      </div>
      <p className="mt-3 text-[15px] font-[700] leading-tight">{title}</p>
      <p className="mt-1 text-[12px] opacity-70">{meta}</p>
    </div>
  )
}

function SectionHeader({ title, description }) {
  return (
    <div className="px-5 md:px-6 pt-5 md:pt-6 pb-4 border-b border-[var(--app-paper-border)]">
      <h2 className="text-[20px] font-[800] tracking-[-0.04em] text-[var(--app-ink-high)]">{title}</h2>
      {description && <p className="mt-2 text-[13px] leading-relaxed text-[var(--app-ink-mid)]">{description}</p>}
    </div>
  )
}

export default function WeekDetail() {
  const { weekId } = useParams()
  const week = weeks.find((item) => item.id === Number(weekId))
  const {
    completedActions,
    readHiddenTopics,
    isAdmin,
    isWeekUnlocked,
    isActionsUnlocked,
    isHiddenTopicUnlocked,
    getLessonStatus,
    getActionStatus,
    getWeekProgress,
  } = useProgress()
  const { getQuizStatus, isWeeklyTestPassed } = useQuiz()
  const { lang, t } = useLang()

  const [expandedLesson, setExpandedLesson] = useState(null)

  if (!week) return <Navigate to="/dashboard" replace />
  if (!isWeekUnlocked(week.id)) return <Navigate to="/dashboard" replace />

  const labels = weekdayLabels[lang] || weekdayLabels.ko
  const progress = getWeekProgress(week.id)
  const completedLessons = week.lessons.filter((lesson) => getLessonStatus(lesson.id) === 'done').length
  const completedWeekActions = week.actions.filter((action) => completedActions.includes(action.id)).length
  const actionsOpen = isActionsUnlocked(week.id)
  const hiddenOpen = isHiddenTopicUnlocked(week.id)
  const hiddenRead = readHiddenTopics.includes(week.id)
  const allLessonsDone = completedLessons === week.lessons.length
  const weeklyPassed = isWeeklyTestPassed(week.id)
  const weeklyAvailable = allLessonsDone || weeklyPassed || isAdmin
  const weeklyStatus = getQuizStatus('weekly', String(week.id))
  const nextUnlockCopy = isAdmin
    ? pick(lang, '관리자 모드라 모든 주차와 테스트가 열려 있어요.', 'Admin mode bypasses content locks and opens every week and test.')
    : !allLessonsDone
    ? pick(lang, '아티클 3개 퀴즈를 통과하면 Action Lab이 열려요.', 'Pass all 3 article quizzes to unlock the action lab.')
    : completedWeekActions === 0
      ? pick(lang, 'action 1개를 완료하면 Hidden Topic이 열려요.', 'Complete one action to unlock the hidden topic.')
      : !weeklyPassed
        ? pick(lang, '주간 테스트를 통과하면 다음 주가 열려요.', 'Pass the weekly test to unlock the next week.')
        : pick(lang, '이번 주를 마쳤어요. 다음 주로 넘어갈 수 있어요.', 'You have completed this week\u2019s core flow and can move on.')

  const cadenceSteps = [
    ...week.lessons.map((lesson) => ({
      key: lesson.id,
      day: labels[lesson.day] || `D${lesson.day}`,
      title: l(lesson.title, lang),
      meta: pick(lang, '아티클', 'Article'),
      state: getLessonStatus(lesson.id),
    })),
    {
      key: `actions-${week.id}`,
      day: labels[4],
      title: pick(lang, 'Action Lab', 'Action Lab'),
      meta: week.actions.length > 1 ? `${week.actions.length} ${pick(lang, '개 실습', 'labs')}` : pick(lang, '실습', 'Action'),
      state: completedWeekActions === week.actions.length ? 'done' : actionsOpen ? 'available' : 'locked',
    },
    {
      key: `hidden-${week.id}`,
      day: labels[5],
      title: pick(lang, 'Hidden Topic', 'Hidden Topic'),
      meta: pick(lang, '시장 맥락', 'Market context'),
      state: hiddenRead ? 'done' : hiddenOpen ? 'available' : 'locked',
    },
    {
      key: `test-${week.id}`,
      day: labels[6],
      title: pick(lang, 'Weekly Test', 'Weekly Test'),
      meta: pick(lang, '30문제 체크포인트', '30-question checkpoint'),
      state: weeklyPassed ? 'done' : weeklyAvailable ? 'available' : 'locked',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <section className="bg-[var(--app-paper-bg)] p-5 md:p-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-[12px] font-medium text-[var(--app-ink-mid)] transition-colors hover:text-[var(--app-ink-high)]"
          >
            <ArrowLeft size={14} />
            <span>{t('week.back')}</span>
          </Link>

          <header className="mt-5 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-[rgba(87,65,216,0.16)] px-3 py-1 text-[11px] font-semibold text-[#7132f5]">
                  Week {week.id}
                </span>
                <span className="inline-flex items-center rounded-full border border-[var(--app-paper-border)] bg-[var(--app-paper-muted-bg)] px-3 py-1 text-[11px] font-semibold text-[var(--app-ink-mid)]">
                  {pick(lang, `${completedLessons}/${week.lessons.length} 아티클`, `${completedLessons}/${week.lessons.length} articles`)}
                </span>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${
                  weeklyPassed
                    ? 'bg-[rgba(20,158,97,0.16)] text-[var(--success)]'
                    : weeklyAvailable
                      ? 'bg-[rgba(87,65,216,0.16)] text-[#7132f5]'
                      : 'border border-[var(--app-paper-border)] bg-[var(--app-paper-muted-bg)] text-[var(--app-ink-mid)]'
                }`}>
                  {weeklyPassed ? pick(lang, '테스트 통과', 'Test passed') : weeklyAvailable ? pick(lang, '테스트 가능', 'Test open') : pick(lang, '테스트 잠금', 'Test locked')}
                </span>
              </div>
              <h1 className="mt-2 text-[30px] md:text-[42px] font-[800] tracking-[-0.05em] text-[var(--app-ink-high)]">
                {l(week.title, lang)}
              </h1>
              <p className="mt-3 text-[14px] md:text-[15px] leading-relaxed text-[var(--app-ink-mid)]">
                {l(week.subtitle, lang)}
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-[var(--app-ink-mid)]">
                {pick(
                  lang,
                  `월-수 아티클, 목 실습, 금 히든 토픽, 토 테스트 순서예요. 실습은 ${completedWeekActions}/${week.actions.length}개 진행했어요.`,
                  `This week runs Mon-Wed articles, Thu action lab, Fri hidden topic, and Sat test. You have logged ${completedWeekActions} of ${week.actions.length} actions so far.`
                )}
              </p>
            </div>

            <div className="border-l border-[var(--app-paper-border)] px-5 py-2 md:px-6 xl:min-w-[240px]">
              <p className="text-[13px] font-semibold text-[var(--app-ink-high)]">{pick(lang, '이번 주 진행률', 'This week')}</p>
              <p className="mt-2 text-[40px] font-[800] tracking-[-0.06em] tabular-nums text-[#5741d8]">{progress}%</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--app-light-btn-bg)]">
                <div className="h-full rounded-full bg-[#5741d8]" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-[var(--app-ink-mid)]">{nextUnlockCopy}</p>
            </div>
          </header>

          <section className="mt-8 border-t border-[var(--app-paper-border)] pt-5">
            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              {cadenceSteps.map((step) => (
                <CadenceStep key={step.key} day={step.day} title={step.title} meta={step.meta} state={step.state} />
              ))}
            </div>
          </section>

          <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_300px]">
            <div className="space-y-5">
              <section className="overflow-hidden rounded-xl border border-[var(--app-paper-border)] bg-[var(--app-paper-bg)] shadow-[rgba(0,0,0,0.03)_0px_4px_24px]">
                <SectionHeader
                  title={pick(lang, '이번 주 아티클', "This week's articles")}
                  description={pick(
                    lang,
                    '앞 퀴즈를 통과하면 다음이 열려요. 10문제 중 8문제 이상 맞추면 통과예요.',
                    'Each next article opens after you pass the previous quiz. Every article quiz has 10 questions and requires 8 correct answers.'
                  )}
                />

                <div>
                  {week.lessons.map((lesson, index) => {
                    const state = getLessonStatus(lesson.id)
                    const isOpen = state !== 'locked'
                    const questionCount = articleQuizzes[lesson.id]?.length || 0
                    const isExpanded = expandedLesson === lesson.id

                    const row = (
                      <div className={`px-5 md:px-6 py-5 ${index > 0 && !isExpanded ? 'border-t border-[var(--app-paper-border)]' : index > 0 ? 'border-t border-[rgba(87,65,216,0.15)]' : ''} ${isExpanded ? 'bg-[rgba(87,65,216,0.04)]' : getRowTone(state)}`}>
                        <div className="flex items-start gap-4">
                          <div className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-[13px] font-bold ${getStepTone(state)}`}>
                            {state === 'done' ? <Check size={16} /> : state === 'locked' ? <Lock size={14} /> : lesson.day}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(87,65,216,0.08)] px-2.5 py-1 text-[10px] font-semibold text-[#5741d8]">
                                <BookOpen size={11} />
                                <span>{labels[lesson.day]}</span>
                              </span>
                              {state === 'done' && <span className="rounded-full bg-[rgba(20,158,97,0.16)] px-2.5 py-1 text-[10px] font-semibold text-[var(--success)]">{pick(lang, '퀴즈 통과', 'Passed')}</span>}
                            </div>

                            <h3 className={`mt-3 text-[18px] font-[700] leading-snug ${state === 'locked' ? 'text-[var(--app-ink-low)]' : 'text-[var(--app-ink-high)]'}`}>
                              {l(lesson.title, lang)}
                            </h3>
                            <p className="mt-2 text-[13px] leading-relaxed text-[var(--app-ink-mid)]">
                              {state === 'done'
                                ? pick(lang, `${questionCount}문제 퀴즈 통과 완료`, `${questionCount} quiz questions cleared`)
                                : state === 'available'
                                  ? pick(lang, `${questionCount}문제 퀴즈 · 통과하면 다음이 열려요`, `${questionCount} quiz questions · pass to unlock the next article`)
                                  : pick(lang, '앞 퀴즈를 통과하면 열려요.', 'This opens after you pass the previous article quiz.')}
                            </p>
                          </div>

                          {isOpen ? (
                            isExpanded
                              ? <ChevronUp size={18} className="mt-1 shrink-0 text-[#5741d8]" />
                              : <ChevronRight size={18} className="mt-1 shrink-0 text-[var(--app-ink-low)]" />
                          ) : (
                            <Lock size={15} className="mt-1 shrink-0 text-[var(--app-ink-low)]" />
                          )}
                        </div>
                      </div>
                    )

                    return (
                      <div key={lesson.id}>
                        {isOpen ? (
                          <button
                            type="button"
                            onClick={() => setExpandedLesson(isExpanded ? null : lesson.id)}
                            className="block w-full text-left transition-colors hover:bg-[var(--app-paper-muted-bg)]"
                          >
                            {row}
                          </button>
                        ) : (
                          row
                        )}
                        <AnimatePresence>
                          {isExpanded && (
                            <LessonInline lesson={lesson} />
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-[var(--app-paper-border)] bg-[var(--app-paper-bg)] shadow-[rgba(0,0,0,0.03)_0px_4px_24px]">
                <SectionHeader
                  title={pick(lang, 'Action Lab', 'Action Lab')}
                  description={pick(
                    lang,
                    '아티클을 모두 통과하면 실습이 열려요. 실습 하나를 마치면 히든 토픽을 읽을 수 있어요.',
                    'The lab opens after you clear all articles. Finishing one action opens the hidden topic.'
                  )}
                />

                <div>
                  {week.actions.map((action, index) => {
                    const state = getActionStatus(action.id)
                    const isOpen = state !== 'locked'
                    const href = action.guideId ? `/action/${action.guideId}` : `/week/${week.id}`

                    const row = (
                      <div className={`px-5 md:px-6 py-5 ${index > 0 ? 'border-t border-[var(--app-paper-border)]' : ''} ${getRowTone(state)}`}>
                        <div className="flex items-start gap-4">
                          <div className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${getStepTone(state)}`}>
                            {state === 'done' ? <Check size={16} /> : state === 'locked' ? <Lock size={14} /> : <Zap size={16} />}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className={`text-[18px] font-[700] leading-snug ${state === 'locked' ? 'text-[var(--app-ink-low)]' : 'text-[var(--app-ink-high)]'}`}>
                              {l(action.title, lang)}
                            </h3>
                            <p className="mt-2 text-[13px] leading-relaxed text-[var(--app-ink-mid)]">
                              {state === 'done'
                                ? pick(lang, '실습 완료로 기록됐어요.', 'Marked as completed.')
                                : state === 'available'
                                  ? pick(lang, '가이드를 따라 진행하고 완료로 기록해봐요.', 'Open the guide, complete the lab, and record it as done.')
                                  : pick(lang, '아티클 퀴즈를 모두 통과하면 열려요.', 'This opens after all article quizzes in this week are passed.')}
                            </p>
                          </div>

                          {isOpen ? (
                            <ChevronRight size={18} className="mt-1 shrink-0 text-[var(--app-ink-low)]" />
                          ) : (
                            <Lock size={15} className="mt-1 shrink-0 text-[var(--app-ink-low)]" />
                          )}
                        </div>
                      </div>
                    )

                    return isOpen ? (
                      <Link key={action.id} to={href} className="block transition-transform hover:translate-x-[2px]">
                        {row}
                      </Link>
                    ) : (
                      <div key={action.id}>{row}</div>
                    )
                  })}
                </div>
              </section>

              {week.hiddenTopic && (
                <section className="rounded-xl border border-[var(--app-paper-border)] bg-[var(--app-paper-bg)] p-5 md:p-6 shadow-[rgba(0,0,0,0.03)_0px_4px_24px]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(87,65,216,0.08)] px-2.5 py-1 text-[10px] font-semibold text-[#5741d8]">
                        <Flame size={11} />
                        <span>{pick(lang, '금요일 히든 토픽', 'Friday hidden topic')}</span>
                      </div>
                      <h2 className="mt-3 text-[22px] font-[800] tracking-[-0.04em] text-[var(--app-ink-high)]">{l(week.hiddenTopic.title, lang)}</h2>
                      <p className="mt-2 text-[13px] leading-relaxed text-[var(--app-ink-mid)]">{l(week.hiddenTopic.desc, lang)}</p>
                    </div>
                    <div className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${
                      hiddenRead
                        ? 'bg-[rgba(20,158,97,0.16)] text-[var(--success)]'
                        : hiddenOpen
                          ? 'bg-[rgba(87,65,216,0.16)] text-[#5741d8]'
                          : 'bg-[var(--app-paper-muted-bg)] text-[var(--app-ink-low)]'
                    }`}>
                      {hiddenRead ? pick(lang, '읽음', 'Read') : hiddenOpen ? pick(lang, '열림', 'Open') : pick(lang, '잠금', 'Locked')}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--app-paper-border)] pt-5">
                    {hiddenOpen ? (
                      <Link to="/hidden" className="inline-flex items-center gap-2 rounded-[56px] bg-[#5741d8] px-5 py-3 text-[13px] font-semibold text-white hover:bg-[#828fff] transition-colors">
                        {hiddenRead ? pick(lang, '다시 읽기', 'Read Again') : pick(lang, '읽으러 가기', 'Read Topic')}
                      </Link>
                    ) : (
                      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--app-paper-border)] px-4 py-3 text-[12px] text-[var(--app-ink-mid)]">
                        <Lock size={13} />
                        <span>{pick(lang, '이번 주 action 1개 완료 후 열림', 'Opens after one action is completed')}</span>
                      </div>
                    )}
                    <p className="text-[12px] text-[var(--app-ink-mid)]">
                      {l(week.hiddenTopic.readTime, lang)} · {l(week.hiddenTopic.action, lang)}
                    </p>
                  </div>
                </section>
              )}

              <section className="rounded-xl border border-[var(--app-paper-border)] bg-[var(--app-paper-muted-bg)] p-5 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(87,65,216,0.16)] px-2.5 py-1 text-[10px] font-semibold text-[#7132f5]">
                      <ClipboardCheck size={11} />
                      <span>{pick(lang, '토요일 체크포인트', 'Saturday checkpoint')}</span>
                    </div>
                    <h2 className="mt-3 text-[24px] font-[800] tracking-[-0.04em] text-[var(--app-ink-high)]">{pick(lang, 'Weekly Test', 'Weekly Test')}</h2>
                    <p className="mt-2 text-[13px] leading-relaxed text-[var(--app-ink-mid)]">
                      {weeklyPassed
                        ? pick(lang, '이번 주 테스트를 통과했어요. 다음 주가 열려 있어요.', "You passed this week's test and the next week is unlocked.")
                        : weeklyAvailable
                          ? pick(lang, '30문제 중 24문제 이상 맞추면 다음 주가 열려요. 아티클 퀴즈와 같은 문제는 안 나와요.', 'Score 24 out of 30 to unlock the next week. The questions are variants, not duplicates of the article quizzes.')
                          : pick(lang, '아티클 3개 퀴즈를 모두 통과해야 테스트가 열려요.', 'You need to pass all three article quizzes before the test opens.')}
                    </p>
                  </div>

                  <div className="border-l border-[var(--app-paper-border)] px-5 py-2 text-left md:min-w-[200px]">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--app-ink-low)]">{pick(lang, '현재 기록', 'Best record')}</p>
                    <p className="mt-2 text-[30px] font-[800] tracking-[-0.05em] tabular-nums text-[var(--app-ink-high)]">
                      {weeklyStatus.bestScore}/{weeklyStatus.total || (weeklyTests[week.id]?.length || 0)}
                    </p>
                    <p className="mt-1 text-[12px] text-[var(--app-ink-mid)]">
                      {weeklyStatus.attempts > 0
                        ? pick(lang, `${weeklyStatus.attempts}회 응시`, `${weeklyStatus.attempts} attempt(s)`)
                        : pick(lang, '아직 응시 전', 'No attempts yet')}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  {weeklyAvailable ? (
                    <Link to={`/quiz/weekly/${week.id}`} className="inline-flex items-center gap-2 rounded-[56px] bg-[#5741d8] px-6 py-3 text-[13px] font-semibold text-white hover:bg-[#828fff] transition-colors">
                      {weeklyPassed ? pick(lang, '다시 보기', 'Retake Test') : pick(lang, '테스트 시작', 'Start Test')}
                    </Link>
                  ) : (
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--app-paper-border)] px-4 py-3 text-[12px] text-[var(--app-ink-mid)]">
                      <Lock size={13} />
                      <span>{pick(lang, '아티클 3개 통과 후 열림', 'Opens after all 3 articles are passed')}</span>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
              <div className="rounded-xl border border-[var(--app-paper-border)] bg-[var(--app-paper-muted-bg)] p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--app-ink-low)]">{pick(lang, '이번 주 요약', 'This week at a glance')}</p>
                <dl className="mt-4 divide-y divide-[var(--app-divider)] border-y border-[var(--app-paper-border)]">
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-[12px] text-[var(--app-ink-mid)]">{pick(lang, 'Article', 'Articles')}</dt>
                    <dd className="text-[18px] font-[800] tabular-nums text-[var(--app-ink-high)]">{completedLessons}/{week.lessons.length}</dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-[12px] text-[var(--app-ink-mid)]">{pick(lang, 'Action', 'Actions')}</dt>
                    <dd className="text-[18px] font-[800] tabular-nums text-[var(--app-ink-high)]">{completedWeekActions}/{week.actions.length}</dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-[12px] text-[var(--app-ink-mid)]">{pick(lang, 'Hidden', 'Hidden')}</dt>
                    <dd className="text-[18px] font-[800] tabular-nums text-[var(--app-ink-high)]">{hiddenRead ? pick(lang, '읽음', 'Read') : hiddenOpen ? pick(lang, '열림', 'Open') : pick(lang, '잠금', 'Locked')}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-xl border border-[var(--app-paper-border)] bg-[var(--app-paper-muted-bg)] p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--app-ink-low)]">{pick(lang, '이번 주 체크', 'This week checklist')}</p>
                <div className="mt-4 divide-y divide-[var(--app-divider)] border-y border-[var(--app-paper-border)] text-[13px] leading-relaxed">
                  <div className="flex items-start gap-3 py-4">
                    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${allLessonsDone ? 'bg-[rgba(20,158,97,0.16)] text-[var(--success)]' : 'bg-[rgba(87,65,216,0.16)] text-[#7132f5]'}`}>
                      {allLessonsDone ? <Check size={13} /> : 1}
                    </span>
                    <div>
                      <p className="font-semibold text-[var(--app-ink-high)]">{pick(lang, '아티클 3개 통과', 'Pass all 3 articles')}</p>
                      <p className="mt-1 text-[12px] text-[var(--app-ink-mid)]">{pick(lang, '앞 퀴즈를 통과하면 다음이 열려요.', 'Each next article opens after the previous quiz.')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 py-4">
                    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${completedWeekActions > 0 ? 'bg-[rgba(20,158,97,0.16)] text-[var(--success)]' : actionsOpen ? 'bg-[rgba(87,65,216,0.16)] text-[#7132f5]' : 'bg-[var(--app-paper-muted-bg)] border border-[var(--app-paper-border)] text-[var(--app-ink-low)]'}`}>
                      {completedWeekActions > 0 ? <Check size={13} /> : actionsOpen ? 2 : <Lock size={12} />}
                    </span>
                    <div>
                      <p className="font-semibold text-[var(--app-ink-high)]">{pick(lang, 'Action 1개 이상 완료', 'Complete at least one action')}</p>
                      <p className="mt-1 text-[12px] text-[var(--app-ink-mid)]">{pick(lang, '실습 하나를 마치면 히든 토픽이 열려요.', 'One completed action opens the hidden topic.')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 py-4">
                    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${weeklyPassed ? 'bg-[rgba(20,158,97,0.16)] text-[var(--success)]' : weeklyAvailable ? 'bg-[rgba(87,65,216,0.16)] text-[#7132f5]' : 'bg-[var(--app-paper-muted-bg)] border border-[var(--app-paper-border)] text-[var(--app-ink-low)]'}`}>
                      {weeklyPassed ? <Check size={13} /> : weeklyAvailable ? 3 : <Lock size={12} />}
                    </span>
                    <div>
                      <p className="font-semibold text-[var(--app-ink-high)]">{pick(lang, '주간 테스트 통과', 'Pass the weekly test')}</p>
                      <p className="mt-1 text-[12px] text-[var(--app-ink-mid)]">{pick(lang, '30문제 중 24문제 맞추면 다음 주가 열려요.', 'Score 24 out of 30 to unlock the next week.')}</p>
                    </div>
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
