import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BookOpen, ClipboardCheck, LockKeyhole, Sparkles, Wrench } from 'lucide-react'
import useLang from '../../hooks/useLang'
import { weeks as programWeeks, l } from '../../data/curriculum'

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

const FOUNDATION_END_WEEK = 4
const totalLessons = programWeeks.reduce((sum, week) => sum + (week.lessons?.length || 0), 0)
const totalActions = programWeeks.reduce((sum, week) => sum + (week.actions?.length || 0), 0)

function getTrackCopy(lang, weekId) {
  return weekId <= FOUNDATION_END_WEEK
    ? pick(lang, 'Week 1-4 기본 트랙', 'Week 1-4 Foundation')
    : pick(lang, 'Week 5-8 확장 트랙', 'Week 5-8 Expansion')
}

function getUnlockCopy(lang, weekId) {
  if (weekId < FOUNDATION_END_WEEK) {
    return pick(
      lang,
      '이번 주 테스트를 통과하면 다음 기본 트랙이 열립니다.',
      'Pass this weekly test to open the next foundation week.'
    )
  }

  if (weekId === FOUNDATION_END_WEEK) {
    return pick(
      lang,
      'Week 4를 통과하면 Week 5-8 확장 트랙이 순서대로 열립니다.',
      'Pass Week 4 and the Week 5-8 expansion track opens in order.'
    )
  }

  if (weekId < programWeeks.length) {
    return pick(
      lang,
      '확장 트랙도 같은 규칙입니다. 통과해야 다음 주가 열립니다.',
      'The expansion track follows the same rule. Pass to open the next week.'
    )
  }

  return pick(
    lang,
    '마지막 주를 마치면 온체인 수료 증명까지 이어집니다.',
    'Finish the final week and the path ends with your on-chain proof.'
  )
}

function getStageSummary(lang, week) {
  const articleCount = week.lessons?.length || 0
  const actionCount = week.actions?.length || 0

  return [
    { icon: BookOpen, label: pick(lang, `${articleCount}개 아티클`, `${articleCount} articles`) },
    { icon: Wrench, label: pick(lang, `${actionCount}개 실습`, `${actionCount} actions`) },
    { icon: ClipboardCheck, label: pick(lang, '30문제 테스트', '30-question test') },
  ]
}

function getWeekLead(lang, weekId) {
  if (weekId === 1) {
    return pick(
      lang,
      '거래소에서 지갑으로 나오는 첫 흐름부터 시작합니다.',
      'Start with the first move from an exchange into your wallet.'
    )
  }

  if (weekId === 4) {
    return pick(
      lang,
      '기본기 마지막 주입니다. 여기까지 통과하면 확장 트랙이 열립니다.',
      'This is the last foundation week. Clear it to open the expansion track.'
    )
  }

  if (weekId === 8) {
    return pick(
      lang,
      '브릿지, 스테이킹, 졸업 프로젝트로 8주 경로를 마무리합니다.',
      'Close the 8-week path with bridging, staking, and the graduation project.'
    )
  }

  return pick(
    lang,
    '읽기만 하지 않고 퀴즈와 실습을 함께 통과해야 다음 단계로 넘어갑니다.',
    'You do not just read. You pass quizzes and actions to move to the next step.'
  )
}

function RoadmapItem({ week, lang, active, layout = 'desktop' }) {
  const summary = getStageSummary(lang, week)
  const articlePreview = week.lessons.slice(0, 3)

  return (
    <article
      data-roadmap-week={week.id}
      data-roadmap-layout={layout}
      className="relative min-h-[auto] border-t border-[rgba(16,17,20,0.10)] py-10 first:border-t-0 md:min-h-[68vh] md:py-16"
    >
      <div className="absolute left-0 top-10 hidden h-[calc(100%-2.5rem)] w-px bg-[rgba(16,17,20,0.10)] md:block" />
      <div
        className={`absolute -left-[8px] top-10 hidden h-4 w-4 rounded-full border-4 transition-colors md:block ${
          active ? 'border-[#5741d8] bg-white' : 'border-[#c9cfdd] bg-white'
        }`}
      />

      <div className="pl-0 md:pl-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-[rgba(87,65,216,0.08)] px-3 py-1 text-[11px] font-semibold text-[#5741d8]">
                {`Week ${week.id}`}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#686b82]">
                {getTrackCopy(lang, week.id)}
              </span>
            </div>

            <h3 className="mt-4 text-[28px] font-[750] tracking-[-0.045em] text-[#101114] md:text-[34px]">
              {l(week.title, lang)}
            </h3>

            {week.subtitle ? (
              <p className="mt-3 max-w-xl text-[15px] leading-[1.7] text-[#515668] md:text-[17px]">
                {l(week.subtitle, lang)}
              </p>
            ) : null}

            <p className="mt-4 max-w-xl text-[14px] leading-[1.7] text-[#686b82] md:text-[15px]">
              {getWeekLead(lang, week.id)}
            </p>
          </div>

          <div className="w-full max-w-[270px]">
            <div className="grid grid-cols-3 gap-2">
              {summary.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="rounded-[20px] border border-[rgba(16,17,20,0.08)] bg-[rgba(255,255,255,0.66)] px-3 py-3">
                    <Icon size={15} className="text-[#5741d8]" />
                    <p className="mt-2 text-[11px] font-medium leading-[1.5] text-[#515668]">{item.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#686b82]">
              {pick(lang, '이번 주 핵심 아티클', 'This week’s core articles')}
            </p>
            <div className="mt-4 space-y-3">
              {articlePreview.map((lesson, index) => (
                <div key={lesson.id} className="flex items-start gap-3">
                  <span className="mt-[2px] inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef0f6] text-[11px] font-semibold text-[#5741d8]">
                    {index + 1}
                  </span>
                  <p className="text-[14px] leading-[1.65] text-[#101114] md:text-[15px]">
                    {l(lesson.title, lang)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[rgba(16,17,20,0.08)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[rgba(87,65,216,0.10)] text-[#5741d8]">
                <LockKeyhole size={18} />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#686b82]">
                  {pick(lang, '오픈 규칙', 'Unlock rule')}
                </p>
                <p className="mt-2 text-[15px] leading-[1.7] text-[#101114]">
                  {getUnlockCopy(lang, week.id)}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[#5741d8]">
                  <span>{pick(lang, '아티클 퀴즈 → 실습 → 테스트', 'Article quiz → action → test')}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Curriculum() {
  const { lang } = useLang()
  const [activeWeekId, setActiveWeekId] = useState(programWeeks[0]?.id || 1)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-roadmap-week][data-roadmap-layout="desktop"]'))
    if (!sections.length) return undefined

    let ticking = false

    const updateActiveWeek = () => {
      const triggerLine = window.innerHeight * 0.34
      let nextActiveWeekId = programWeeks[0]?.id || 1

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const weekId = Number(section.getAttribute('data-roadmap-week'))

        if (!Number.isFinite(weekId)) return
        if (rect.top <= triggerLine) nextActiveWeekId = weekId
      })

      setActiveWeekId((prev) => (prev === nextActiveWeekId ? prev : nextActiveWeekId))
      ticking = false
    }

    const scheduleUpdate = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateActiveWeek)
    }

    updateActiveWeek()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [])

  const activeWeek = useMemo(
    () => programWeeks.find((week) => week.id === activeWeekId) || programWeeks[0],
    [activeWeekId]
  )

  const activeSummary = getStageSummary(lang, activeWeek)

  return (
    <section
      id="curriculum"
      className="bg-[radial-gradient(circle_at_top,rgba(87,65,216,0.08),transparent_22%),linear-gradient(180deg,#ffffff_0%,#f6f8fc_100%)] px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#686b82]">
            CURRICULUM
          </p>
          <h2 className="mt-4 text-[38px] font-[800] tracking-[-0.055em] text-[#101114] md:text-[56px]">
            {pick(lang, '8주 전체 로드맵', 'The Full 8-Week Roadmap')}
          </h2>
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-[#515668] md:text-[18px]">
            {pick(
              lang,
              'Week 1-4에서 지갑, 보안, 토큰, DYOR 기본기를 먼저 만들고, 매주 통과할 때마다 Week 5-8 실전 트랙이 순서대로 이어집니다.',
              'Weeks 1-4 build the foundation across wallets, security, tokens, and DYOR. As you pass each checkpoint, Weeks 5-8 open into the practical track.'
            )}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(16,17,20,0.08)] bg-white/80 px-4 py-2 text-[13px] text-[#515668]">
            <Sparkles size={14} className="text-[#5741d8]" />
            <span>{pick(lang, `${programWeeks.length}주 경로`, `${programWeeks.length}-week path`)}</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(16,17,20,0.08)] bg-white/80 px-4 py-2 text-[13px] text-[#515668]">
            <BookOpen size={14} className="text-[#5741d8]" />
            <span>{pick(lang, `${totalLessons}개 레슨`, `${totalLessons} lessons`)}</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(16,17,20,0.08)] bg-white/80 px-4 py-2 text-[13px] text-[#515668]">
            <Wrench size={14} className="text-[#5741d8]" />
            <span>{pick(lang, `${totalActions}개 실습`, `${totalActions} actions`)}</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(16,17,20,0.08)] bg-white/80 px-4 py-2 text-[13px] text-[#515668]">
            <ClipboardCheck size={14} className="text-[#5741d8]" />
            <span>{pick(lang, '주차별 테스트', 'Weekly checkpoints')}</span>
          </div>
        </div>

        <div className="mt-14 hidden gap-6 md:grid md:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)] lg:gap-8 xl:gap-10">
          <div className="relative">
            <div className="sticky top-24 max-h-[calc(100vh-7.5rem)] overflow-y-auto rounded-[28px] border border-[rgba(16,17,20,0.08)] bg-[rgba(255,255,255,0.82)] p-6 shadow-[0_24px_80px_rgba(16,17,20,0.08)] backdrop-blur-md lg:top-28 lg:max-h-[calc(100vh-8.5rem)] lg:rounded-[32px] lg:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#686b82]">
                    {pick(lang, '현재 포커스', 'Current focus')}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-[rgba(87,65,216,0.08)] px-3 py-1 text-[11px] font-semibold text-[#5741d8]">
                      {`Week ${activeWeek.id}`}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#686b82]">
                      {getTrackCopy(lang, activeWeek.id)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#686b82]">
                    {pick(lang, '오픈 규칙', 'Unlock')}
                  </p>
                  <p className="mt-2 text-[13px] font-semibold text-[#5741d8]">
                    {activeWeek.id === FOUNDATION_END_WEEK
                      ? pick(lang, 'Week 5-8 개방', 'Open Weeks 5-8')
                      : activeWeek.id === programWeeks.length
                        ? pick(lang, '수료 증명', 'On-chain proof')
                        : pick(lang, '다음 주 오픈', 'Next week opens')}
                  </p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWeek.id}
                  initial={{ opacity: 0, y: 18, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.985 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="mt-8 text-[30px] font-[800] tracking-[-0.05em] text-[#101114] lg:text-[38px]">
                    {l(activeWeek.title, lang)}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.7] text-[#515668]">
                    {l(activeWeek.subtitle, lang)}
                  </p>
                  <p className="mt-4 text-[14px] leading-[1.75] text-[#686b82]">
                    {getUnlockCopy(lang, activeWeek.id)}
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {activeSummary.map((item) => {
                      const Icon = item.icon
                      return (
                        <div key={item.label} className="rounded-[22px] border border-[rgba(16,17,20,0.08)] bg-[#fbfcfe] px-4 py-4">
                          <Icon size={16} className="text-[#5741d8]" />
                          <p className="mt-2 text-[12px] font-medium leading-[1.5] text-[#515668]">{item.label}</p>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-8 border-t border-[rgba(16,17,20,0.08)] pt-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#686b82]">
                      {pick(lang, '이번 주 아티클', 'This week’s articles')}
                    </p>
                    <div className="mt-4 space-y-3">
                      {activeWeek.lessons.slice(0, 3).map((lesson, index) => (
                        <div key={lesson.id} className="flex items-start gap-3">
                          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef0f6] text-[11px] font-semibold text-[#5741d8]">
                            {index + 1}
                          </span>
                          <p className="text-[14px] leading-[1.65] text-[#101114]">
                            {l(lesson.title, lang)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div>
            {programWeeks.map((week) => (
              <RoadmapItem key={week.id} week={week} lang={lang} active={week.id === activeWeekId} layout="desktop" />
            ))}
          </div>
        </div>

        <div className="mt-12 md:hidden">
          <div className="space-y-8">
            {programWeeks.map((week) => (
              <RoadmapItem key={week.id} week={week} lang={lang} active={week.id === activeWeekId} layout="mobile" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
