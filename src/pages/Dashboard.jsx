import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Check, ClipboardCheck, Flame, Lock, Trophy, Zap } from 'lucide-react'
import { weeks, l } from '../data/curriculum'
import useProgress from '../hooks/useProgress'
import useQuiz from '../hooks/useQuiz'
import useLang from '../hooks/useLang'
import useAuth from '../hooks/useAuth'
import CountdownTimer from '../components/CountdownTimer'

const SEMESTER_DEADLINE = '2026-04-30T23:59:59+09:00'

const weekdayLabels = {
  ko: { 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토' },
  en: { 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' },
}

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

function getCadenceItems(
  week,
  lang,
  getLessonStatus,
  getActionStatus,
  isHiddenTopicUnlocked,
  isWeekCompleted,
  readHiddenTopics
) {
  const labels = weekdayLabels[lang] || weekdayLabels.ko

  const lessonItems = week.lessons.map((lesson) => ({
    key: lesson.id,
    day: labels[lesson.day] || `D${lesson.day}`,
    title: l(lesson.title, lang),
    state: getLessonStatus(lesson.id),
    kind: pick(lang, '아티클', 'Article'),
  }))

  const allLessonsDone = week.lessons.every((lesson) => getLessonStatus(lesson.id) === 'done')
  const actionDone = week.actions.length > 0 && week.actions.every((action) => getActionStatus(action.id) === 'done')
  const hiddenReady = week.hiddenTopic && isHiddenTopicUnlocked(week.id)
  const hiddenRead = readHiddenTopics.includes(week.id)
  const testDone = isWeekCompleted(week.id)

  return [
    ...lessonItems,
    {
      key: `action-${week.id}`,
      day: labels[4],
      title: pick(lang, 'Action Lab', 'Action Lab'),
      state: actionDone ? 'done' : allLessonsDone && week.actions.length > 0 ? 'available' : 'locked',
      kind: pick(lang, '실습', 'Action'),
    },
    {
      key: `hidden-${week.id}`,
      day: labels[5],
      title: pick(lang, 'Hidden Topic', 'Hidden Topic'),
      state: hiddenRead ? 'done' : hiddenReady ? 'available' : 'locked',
      kind: pick(lang, '히든', 'Hidden'),
    },
    {
      key: `test-${week.id}`,
      day: labels[6],
      title: pick(lang, 'Weekly Test', 'Weekly Test'),
      state: testDone ? 'done' : allLessonsDone ? 'available' : 'locked',
      kind: pick(lang, '테스트', 'Test'),
    },
  ]
}

export default function Dashboard() {
  const {
    completedLessons,
    completedActions,
    readHiddenTopics,
    overallProgress,
    activeWeek,
    getWeekProgress,
    totalLessons,
    totalActions,
    certificateStatus,
    isWeekCompleted,
    isWeekUnlocked,
    getLessonStatus,
    getActionStatus,
    isActionsUnlocked,
    isHiddenTopicUnlocked,
  } = useProgress()
  const { isWeeklyTestPassed } = useQuiz()
  const { t, lang } = useLang()
  const { user, profile } = useAuth()

  const currentWeek = weeks.find((week) => week.id === activeWeek)
  const totalHiddenTopics = weeks.filter((week) => week.hiddenTopic).length
  const completedWeeks = weeks.filter((week) => isWeekCompleted(week.id)).length
  const displayName = profile?.display_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || pick(lang, '학습자', 'Learner')
  const firstName = displayName.split(' ')[0]
  const certificateProgress = Math.min(
    100,
    Math.round(
      ((certificateStatus.lessonsComplete / certificateStatus.lessonsRequired) +
        (certificateStatus.actionsComplete / certificateStatus.actionsRequired) +
        (certificateStatus.hiddenTopicsRead / certificateStatus.hiddenTopicsRequired)) /
        3 *
        100
    )
  )

  const currentWeekLessonsDone = currentWeek?.lessons.filter((lesson) => getLessonStatus(lesson.id) === 'done').length || 0
  const nextLesson = currentWeek?.lessons.find((lesson) => getLessonStatus(lesson.id) === 'available')
  const nextAction = currentWeek?.actions.find((action) => getActionStatus(action.id) === 'available')
  const hiddenReady = currentWeek?.hiddenTopic && isHiddenTopicUnlocked(currentWeek.id)
  const hiddenRead = currentWeek ? readHiddenTopics.includes(currentWeek.id) : false
  const weeklyPassed = currentWeek ? isWeeklyTestPassed(currentWeek.id) : false
  const currentCadence = currentWeek
    ? getCadenceItems(
        currentWeek,
        lang,
        getLessonStatus,
        getActionStatus,
        isHiddenTopicUnlocked,
        isWeekCompleted,
        readHiddenTopics
      )
    : []

  let primaryTask = null

  if (currentWeek && nextLesson) {
    primaryTask = {
      icon: BookOpen,
      eyebrow: pick(lang, '다음 단계', 'Next up'),
      title: l(nextLesson.title, lang),
      body: pick(
        lang,
        `10문제 중 8문제를 맞추면 다음 아티클이 열려요.`,
        `Pass 8 of 10 quiz questions to unlock the next article.`
      ),
      meta: `Week ${currentWeek.id} · ${weekdayLabels[lang]?.[nextLesson.day] || `D${nextLesson.day}`}`,
      href: `/lesson/${nextLesson.id}`,
      cta: pick(lang, '계속하기', 'Continue'),
    }
  } else if (currentWeek && isActionsUnlocked(currentWeek.id) && nextAction) {
    primaryTask = {
      icon: Zap,
      eyebrow: pick(lang, '이번 주 실습', 'Action Lab'),
      title: l(nextAction.title, lang),
      body: pick(
        lang,
        `실습을 마치면 히든 토픽이 열려요.`,
        `Finish the action lab to open the hidden topic for this week.`
      ),
      meta: `Week ${currentWeek.id} · ${weekdayLabels[lang]?.[4] || 'D4'}`,
      href: nextAction.guideId ? `/action/${nextAction.guideId}` : `/week/${currentWeek.id}`,
      cta: pick(lang, '실습 열기', 'Open Lab'),
    }
  } else if (currentWeek?.hiddenTopic && hiddenReady && !hiddenRead) {
    primaryTask = {
      icon: Flame,
      eyebrow: pick(lang, '이번 주 이슈', 'Hidden Topic'),
      title: l(currentWeek.hiddenTopic.title, lang),
      body: pick(
        lang,
        `이번 주 학습과 연결된 시장 이슈예요.`,
        `Use this Korea-focused brief to add context around this week's practical work.`
      ),
      meta: `Week ${currentWeek.id} · ${weekdayLabels[lang]?.[5] || 'D5'}`,
      href: '/hidden',
      cta: pick(lang, '읽으러 가기', 'Read Topic'),
    }
  } else if (currentWeek && !weeklyPassed) {
    primaryTask = {
      icon: ClipboardCheck,
      eyebrow: pick(lang, '주간 체크포인트', 'Weekly Test'),
      title: `Week ${currentWeek.id} ${t('quiz.weeklyTest')}`,
      body: pick(
        lang,
        `30문제로 이번 주를 점검해요.\n통과하면 다음 주가 열려요.`,
        `A 30-question checkpoint across this week's articles. Passing it unlocks the next week.`
      ),
      meta: pick(lang, '30문제 · 24/30 통과', '30 questions · 24/30 to pass'),
      href: `/quiz/weekly/${currentWeek.id}`,
      cta: pick(lang, '테스트 보기', 'Open Test'),
    }
  } else {
    primaryTask = {
      icon: Trophy,
      eyebrow: pick(lang, '마무리', 'Milestone'),
      title: pick(lang, '수료 조건 확인', 'Review your certificate progress'),
      body: pick(
        lang,
        `남은 조건을 채우면 수료증을 받을 수 있어요.`,
        `Check your remaining actions and hidden topics, then review your on-chain certificate progress.`
      ),
      meta: pick(lang, '수료 진행 상황', 'Certificate status'),
      href: '/certificate',
      cta: pick(lang, '수료증 보기', 'View Certificate'),
    }
  }

  const ResolvedPrimaryTaskIcon = primaryTask.icon
  const metricTiles = [
    { label: pick(lang, 'Article', 'Articles'), value: `${completedLessons.length}/${totalLessons}`, note: pick(lang, '통과한 아티클', 'articles passed') },
    { label: pick(lang, 'Action', 'Actions'), value: `${completedActions.length}/${totalActions}`, note: pick(lang, '완료한 실습', 'actions finished') },
    { label: pick(lang, 'Test', 'Tests'), value: `${completedWeeks}/${weeks.length}`, note: pick(lang, '통과한 주차', 'weeks cleared') },
    { label: pick(lang, 'Certificate', 'Certificate'), value: `${certificateProgress}%`, note: pick(lang, '수료 진행률', 'certificate progress') },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <section className="ok-workbench p-5 md:p-8">
          <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {currentWeek && (
                  <span className="inline-flex items-center rounded-full bg-[rgba(59,130,246,0.10)] px-3 py-1 text-[11px] font-semibold text-[#79AFFF]">
                    Week {currentWeek.id}
                  </span>
                )}
                <span className="inline-flex items-center rounded-full border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-3 py-1 text-[11px] font-semibold ok-ink-mid">
                  {pick(lang, `${completedWeeks}/${weeks.length}주 완료`, `${completedWeeks}/${weeks.length} weeks cleared`)}
                </span>
              </div>
              <h1 className="mt-2 text-[30px] md:text-[40px] font-[800] tracking-[-0.05em] ok-ink-high">
                {pick(lang, `${firstName}님, 이어서 진행해봐요`, `Pick up where you left off, ${firstName}`)}
              </h1>
              <p className="mt-3 max-w-2xl text-[14px] md:text-[15px] leading-relaxed ok-ink-mid">
                {currentWeek
                  ? pick(
                      lang,
                      `아티클 ${currentWeekLessonsDone}/${currentWeek.lessons.length}개 완료 · 주간 테스트까지 마무리하면 돼요.`,
                      `Clear ${currentWeek.lessons.length} articles and the weekly checkpoint for Week ${currentWeek.id}.`
                    )
                  : pick(lang, '열린 주차부터 바로 시작할 수 있어요.', `Continue from the currently unlocked path.`)}
              </p>
            </div>

            {currentWeek && (
              <Link
                to={`/week/${currentWeek.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-2 text-[12px] font-semibold ok-ink-high transition-colors hover:bg-[var(--app-soft-bg-strong)]"
              >
                <span>Week {currentWeek.id}</span>
                <ArrowRight size={14} />
              </Link>
            )}
          </header>

          <div className="mt-6 ok-paper p-6 md:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(59,130,246,0.10)] px-3 py-1 text-[11px] font-semibold text-[#2156B8]">
                  <ResolvedPrimaryTaskIcon size={14} />
                  <span>{primaryTask.eyebrow}</span>
                </div>
                <h2 className="mt-4 text-[24px] md:text-[30px] font-[800] tracking-[-0.05em] ok-ink-high">
                  {primaryTask.title}
                </h2>
                <p className="mt-3 max-w-xl text-[14px] md:text-[15px] leading-relaxed ok-ink-mid">
                  {primaryTask.body}
                </p>
              </div>

              <div className="shrink-0 border-l border-[var(--app-divider)] pl-5 text-left lg:min-w-[190px]">
                <p className="text-[10px] uppercase tracking-[0.18em] ok-ink-low">{t('dash.progress')}</p>
                <p className="mt-2 text-[32px] font-[800] tracking-[-0.05em] ok-ink-high ok-tabular-nums">{overallProgress}%</p>
                <p className="mt-1 text-[12px] ok-ink-mid">{primaryTask.meta}</p>
                {currentWeek && (
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--app-track)]">
                    <div className="h-full rounded-full bg-[#3B82F6]" style={{ width: `${Math.round(getWeekProgress(currentWeek.id))}%` }} />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to={primaryTask.href} className="ok-btn ok-btn-primary px-6 py-3 text-[13px]">
                {primaryTask.cta}
                <ArrowRight size={15} />
              </Link>
              <p className="text-[12px] ok-ink-mid">
                {currentWeek
                  ? pick(
                      lang,
                      `${Math.round(getWeekProgress(currentWeek.id))}% 완료 · 다음 단계가 열려 있어요.`,
                      `${Math.round(getWeekProgress(currentWeek.id))}% complete · the next step opens as you progress.`
                    )
                  : pick(lang, '열린 주차에서 시작해요.', `Continue from the current unlocked week.`)}
              </p>
            </div>

            {currentCadence.length > 0 && (
              <div className="mt-8 border-t border-[var(--app-divider)] pt-5">
                <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] ok-ink-low">{pick(lang, '이번 주 리듬', "This week's rhythm")}</p>
                    <p className="mt-2 text-[15px] font-[700] ok-ink-high">
                      {pick(lang, '월-토 순서대로 진행해요', 'Follow the Mon-Sat sequence')}
                    </p>
                  </div>
                  <p className="text-[12px] ok-ink-mid">
                    {pick(lang, '열린 단계부터 하나씩 해요.', 'Focus only on the currently open step.')}
                  </p>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
                  {currentCadence.map((item) => {
                    const tone =
                      item.state === 'done'
                        ? 'border-[rgba(74,222,128,0.22)] text-[#15803D]'
                        : item.state === 'locked'
                          ? 'border-[var(--app-soft-border)] ok-ink-low'
                          : 'border-[rgba(59,130,246,0.24)] text-[#79AFFF]'

                    return (
                      <div key={item.key} className={`border-l px-4 py-2 ${tone}`}>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">{item.day}</span>
                          <span className="text-[10px]">{item.kind}</span>
                        </div>
                        <p className="mt-3 text-[14px] font-[700] leading-snug">{item.title}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <dl className="mt-8 grid gap-4 border-y border-[var(--app-divider)] py-5 sm:grid-cols-2 xl:grid-cols-4">
              {metricTiles.map((item, index) => (
                <div key={item.label} className={`${index > 0 ? 'xl:border-l xl:border-[var(--app-divider)] xl:pl-5' : ''}`}>
                  <dt className="text-[11px] uppercase tracking-[0.16em] ok-ink-low">{item.label}</dt>
                  <dd className="mt-2 text-[24px] font-[800] tracking-[-0.04em] ok-tabular-nums ok-ink-high">{item.value}</dd>
                  <p className="mt-1 text-[12px] ok-ink-mid">{item.note}</p>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_300px]">
            <section className="ok-paper overflow-hidden">
              <div className="px-5 md:px-6 pt-5 md:pt-6 pb-4 border-b border-[var(--app-divider)]">
                <h2 className="mt-2 text-[20px] font-[800] tracking-[-0.04em] ok-ink-high">{pick(lang, '한 주씩 여는 학습 경로', 'A roadmap that opens one week at a time')}</h2>
                <p className="mt-2 text-[13px] leading-relaxed ok-ink-mid">
                  {pick(lang, '지금 주차에 집중하고, 테스트를 통과하면 다음 주가 열려요.', 'The current week stays in focus and the next week opens after the weekly test.')}
                </p>
              </div>

              <div>
                {weeks.map((week, index) => {
                  const progress = getWeekProgress(week.id)
                  const isLocked = !isWeekUnlocked(week.id)
                  const isDone = isWeekCompleted(week.id)
                  const isCurrent = week.id === activeWeek
                  const cadence = getCadenceItems(
                    week,
                    lang,
                    getLessonStatus,
                    getActionStatus,
                    isHiddenTopicUnlocked,
                    isWeekCompleted,
                    readHiddenTopics
                  )

                  const row = (
                    <div className={`px-5 md:px-6 py-5 ${index > 0 ? 'border-t border-[var(--app-divider)]' : ''}`}>
                      <div className="flex items-start gap-4">
                        <div className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-[13px] font-bold ${
                          isDone
                            ? 'border-[rgba(74,222,128,0.22)] bg-[rgba(74,222,128,0.12)] text-[#15803D]'
                            : isCurrent
                              ? 'border-[rgba(59,130,246,0.18)] bg-[rgba(59,130,246,0.12)] text-[#2156B8]'
                              : isLocked
                                ? 'border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] text-[var(--app-ink-low)]'
                                : 'border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] ok-ink-high'
                        }`}>
                          {isDone ? <Check size={16} /> : isLocked ? <Lock size={14} /> : week.id}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-[11px] uppercase tracking-[0.18em] ok-ink-low">Week {week.id}</p>
                            {isDone && <span className="rounded-full bg-[rgba(74,222,128,0.12)] px-2.5 py-1 text-[10px] font-semibold text-[#15803D]">Done</span>}
                            {isCurrent && !isDone && <span className="rounded-full bg-[rgba(59,130,246,0.10)] px-2.5 py-1 text-[10px] font-semibold text-[#2156B8]">{pick(lang, '현재 진행 중', 'In progress')}</span>}
                            {isLocked && <span className="rounded-full bg-[var(--app-soft-bg)] px-2.5 py-1 text-[10px] font-semibold ok-ink-low">{pick(lang, '잠금', 'Locked')}</span>}
                          </div>

                          <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                            <div className="min-w-0">
                              <h3 className={`text-[17px] font-[700] leading-snug ${isLocked ? 'ok-ink-mid' : 'ok-ink-high'}`}>{l(week.title, lang)}</h3>
                              <p className="mt-1 text-[13px] leading-relaxed ok-ink-mid">{l(week.subtitle, lang)}</p>
                            </div>

                            <div className="shrink-0 lg:pl-4">
                              <p className="text-[12px] ok-ink-mid ok-tabular-nums">{progress}%</p>
                              <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-[var(--app-track)]">
                                <div
                                  className={`h-full rounded-full ${isDone ? 'bg-[#16A34A]' : 'bg-[#3B82F6]'}`}
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          {isCurrent && !isLocked && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {cadence.map((item) => {
                                const tone =
                                  item.state === 'done'
                                    ? 'bg-[rgba(74,222,128,0.12)] text-[#15803D] border-[rgba(74,222,128,0.18)]'
                                    : item.state === 'locked'
                                      ? 'bg-[var(--app-soft-bg)] ok-ink-low border-[var(--app-soft-border)]'
                                      : 'bg-[var(--app-soft-bg-strong)] ok-ink-high border-[var(--app-soft-border)]'

                                return (
                                  <div key={item.key} className={`rounded-full border px-3 py-2 text-[11px] ${tone}`}>
                                    <span className="mr-2 font-semibold">{item.day}</span>
                                    <span>{item.kind}</span>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>

                        {!isLocked && (
                          <ArrowRight size={16} className="mt-1 shrink-0 ok-ink-low" />
                        )}
                      </div>
                    </div>
                  )

                  if (isLocked) return <div key={week.id}>{row}</div>

                  return (
                    <Link key={week.id} to={`/week/${week.id}`} className="block transition-transform hover:translate-x-[2px]">
                      {row}
                    </Link>
                  )
                })}
              </div>
            </section>

            <aside className="space-y-4">
              <div className="ok-paper-muted p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mt-2 text-[18px] font-[700] tracking-[-0.03em] ok-ink-high">{pick(lang, '수료 진행 상황', 'Certificate progress')}</h3>
                    <p className="mt-2 text-[12px] leading-relaxed ok-ink-mid">
                      {pick(lang, '아티클, 실습, 히든 토픽을 채우면 수료 자격이 생겨요.', 'Clear the remaining articles, actions, and hidden topics to reach certificate eligibility.')}
                    </p>
                  </div>
                  <Trophy size={18} className="text-[#2156B8]" />
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--app-track)]">
                  <div
                    className="h-full rounded-full bg-[#3B82F6]"
                    style={{ width: `${certificateProgress}%` }}
                  />
                </div>
                <div className="mt-4 space-y-2 text-[12px] ok-ink-mid">
                  <div className="flex items-center justify-between"><span>{pick(lang, 'Article', 'Articles')}</span><span className="ok-tabular-nums">{certificateStatus.lessonsComplete}/{certificateStatus.lessonsRequired}</span></div>
                  <div className="flex items-center justify-between"><span>{pick(lang, 'Action', 'Actions')}</span><span className="ok-tabular-nums">{certificateStatus.actionsComplete}/{certificateStatus.actionsRequired}</span></div>
                  <div className="flex items-center justify-between"><span>{pick(lang, 'Hidden', 'Hidden')}</span><span className="ok-tabular-nums">{certificateStatus.hiddenTopicsRead}/{certificateStatus.hiddenTopicsRequired}</span></div>
                </div>
                <Link to="/certificate" className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold text-[#2156B8] hover:text-[#1D4ED8]">
                  {pick(lang, '수료증 보기', 'Open Certificate')}
                  <ArrowRight size={13} />
                </Link>
              </div>

              {currentWeek?.hiddenTopic && (
                <Link to="/hidden" className="block ok-paper-muted p-5 transition-transform hover:-translate-y-[1px]">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] ok-ink-low">
                    <Flame size={13} className="text-[#2156B8]" />
                    <span>{pick(lang, '이번 주 맥락', "This week's context")}</span>
                  </div>
                  <p className="mt-3 text-[16px] font-[700] leading-snug ok-ink-high">{l(currentWeek.hiddenTopic.title, lang)}</p>
                  <p className="mt-2 text-[12px] leading-relaxed ok-ink-mid">
                    {hiddenReady
                      ? pick(lang, '실습과 연결된 시장 맥락이에요.', 'Market context connected to this week\u2019s work.')
                      : pick(lang, 'action을 완료하면 열려요.', 'Opens after you complete this week\u2019s action.')}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-[12px]">
                    <span className={hiddenReady ? 'text-[#2156B8]' : 'ok-ink-low'}>
                      {hiddenReady ? (hiddenRead ? pick(lang, '읽음', 'Read') : pick(lang, '열림', 'Open')) : pick(lang, '잠금', 'Locked')}
                    </span>
                    <ArrowRight size={13} className="ok-ink-low" />
                  </div>
                </Link>
              )}

              <div className="ok-paper-muted p-5">
                <p className="text-[13px] font-semibold ok-ink-high">{pick(lang, '현재 기수 마감까지', 'Enrollment closes in')}</p>
                <div className="mt-4">
                  <CountdownTimer targetDate={SEMESTER_DEADLINE} surface="light" />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] ok-ink-low">{pick(lang, 'Hidden', 'Hidden')}</p>
                    <p className="mt-1 text-[18px] font-[800] ok-tabular-nums ok-ink-high">{readHiddenTopics.length}/{totalHiddenTopics}</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] ok-ink-low">{pick(lang, 'Weekly', 'Weekly')}</p>
                    <p className="mt-1 text-[18px] font-[800] ok-tabular-nums ok-ink-high">{completedWeeks}/{weeks.length}</p>
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
