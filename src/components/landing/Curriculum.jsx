import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Lock } from 'lucide-react'
import Section from './Section'
import useLang from '../../hooks/useLang'
import { weeks as programWeeks, l } from '../../data/curriculum'

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

function shortTitle(title, lang) {
  return l(title, lang).split(' — ')[0]
}

export default function Curriculum() {
  const { t, lang } = useLang()
  const [selectedWeekId, setSelectedWeekId] = useState(1)

  const selectedWeek = useMemo(
    () => programWeeks.find((week) => week.id === selectedWeekId) || programWeeks[0],
    [selectedWeekId]
  )

  const pathFill = `${Math.max(4, (selectedWeek.id / programWeeks.length) * 100)}%`

  return (
    <Section className="py-24 px-6" id="curriculum">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="ok-section-label">{t('landing.curriculum')}</span>
          <h2 className="mt-4 text-[32px] font-bold tracking-tight text-[var(--text-high)] md:text-[44px]">
            {t('landing.roadmap')}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-[var(--text-mid)]">
            {t('landing.roadmapDesc')}
          </p>
        </div>

        <div className="ok-readable-panel-soft mt-12 p-6 md:p-8">
          <div className="relative z-10 grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-start">
          <div className="xl:sticky xl:top-28">
            <div className="border-l border-[rgba(255,255,255,0.10)] pl-5 md:pl-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                  selectedWeek.id <= 4
                    ? 'bg-[rgba(59,130,246,0.10)] text-[#79AFFF]'
                    : 'bg-[rgba(255,255,255,0.06)] text-[var(--text-mid)]'
                }`}>
                  {selectedWeek.id <= 4 ? 'Semester 1' : 'Semester 2'}
                </span>
                {selectedWeek.id > 4 && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-1 text-[10px] font-semibold text-[var(--text-low)]">
                    <Lock size={11} />
                    <span>{pick(lang, 'Week 1-4 통과 후 열림', 'Opens after Weeks 1-4')}</span>
                  </span>
                )}
              </div>

              <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-[var(--text-low)]">Week {selectedWeek.id}</p>
              <h3 className="mt-2 text-[28px] font-[800] tracking-[-0.05em] text-[var(--text-high)]">
                {l(selectedWeek.title, lang)}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-mid)]">
                {l(selectedWeek.subtitle, lang)}
              </p>

              <div className="mt-8 border-t border-[rgba(255,255,255,0.08)] pt-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-low)]">
                  {pick(lang, '이번 주 흐름', 'This week flow')}
                </p>
                <div className="mt-4 space-y-3">
                  {selectedWeek.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-start gap-3 text-[13px] leading-relaxed text-[var(--text-mid)]">
                      <span className="mt-[2px] shrink-0 text-[11px] font-semibold text-[#79AFFF]">{index + 1}.</span>
                      <span>{shortTitle(lesson.title, lang)}</span>
                    </div>
                  ))}
                  <div className="flex items-start gap-3 text-[13px] leading-relaxed text-[var(--text-mid)]">
                    <span className="mt-[2px] shrink-0 text-[11px] font-semibold text-[var(--text-low)]">4.</span>
                    <span>{pick(lang, 'Action Lab', 'Action Lab')} · {shortTitle(selectedWeek.actions[0].title, lang)}</span>
                  </div>
                  <div className="flex items-start gap-3 text-[13px] leading-relaxed text-[var(--text-mid)]">
                    <span className="mt-[2px] shrink-0 text-[11px] font-semibold text-[var(--text-low)]">5.</span>
                    <span>{pick(lang, 'Hidden Topic', 'Hidden Topic')}</span>
                  </div>
                  <div className="flex items-start gap-3 text-[13px] leading-relaxed text-[var(--text-mid)]">
                    <span className="mt-[2px] shrink-0 text-[11px] font-semibold text-[var(--text-low)]">6.</span>
                    <span>{pick(lang, 'Weekly Test', 'Weekly Test')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[rgba(255,255,255,0.08)] pt-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-low)]">{pick(lang, 'Article', 'Articles')}</p>
                  <p className="mt-2 text-[22px] font-[800] text-[var(--text-high)]">{selectedWeek.lessons.length}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-low)]">{pick(lang, 'Action', 'Action')}</p>
                  <p className="mt-2 text-[22px] font-[800] text-[var(--text-high)]">{selectedWeek.actions.length}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-low)]">{pick(lang, 'Gate', 'Gate')}</p>
                  <p className="mt-2 text-[22px] font-[800] text-[var(--text-high)]">{selectedWeek.id > 4 ? 'Lock' : 'Open'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="mb-8 grid gap-4 border-y border-[rgba(255,255,255,0.08)] py-5 sm:grid-cols-3 sm:divide-x sm:divide-[rgba(255,255,255,0.08)]">
              <div className="sm:pr-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-low)]">{pick(lang, '리듬', 'Cadence')}</p>
                <p className="mt-2 text-[14px] font-semibold text-[var(--text-high)]">{pick(lang, '월-수 아티클 · 목 실습 · 금 히든 · 토 테스트', 'Mon-Wed articles · Thu lab · Fri hidden · Sat test')}</p>
              </div>
              <div className="sm:px-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-low)]">{pick(lang, '언락 방식', 'Unlock logic')}</p>
                <p className="mt-2 text-[14px] font-semibold text-[var(--text-high)]">{pick(lang, '퀴즈 통과 시 다음 아티클, 테스트 통과 시 다음 주', 'Quiz opens the next article, weekly test opens the next week')}</p>
              </div>
              <div className="sm:pl-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-low)]">{pick(lang, '최종 결과', 'Outcome')}</p>
                <p className="mt-2 text-[14px] font-semibold text-[var(--text-high)]">{pick(lang, '8주 전체를 통과하면 온체인 수료 증명까지 이어집니다', 'Passing all 8 weeks leads to on-chain proof')}</p>
              </div>
            </div>

            <div className="relative pl-8 md:pl-12">
              <div className="absolute bottom-5 left-[12px] top-5 w-px bg-[rgba(255,255,255,0.08)] md:left-[18px]" />
              <motion.div
                className="absolute left-[12px] top-5 w-px rounded-full bg-gradient-to-b from-[#3B82F6] to-[#79AFFF] md:left-[18px]"
                animate={{ height: pathFill }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />

              <div className="space-y-4">
                {programWeeks.map((week) => {
                  const isSelected = selectedWeek.id === week.id
                  const isLocked = week.id > 4

                  return (
                    <div key={week.id}>
                      {week.id === 5 && (
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.45 }}
                          className="relative pb-4 pl-10 md:pl-12"
                        >
                          <div className="border-l-2 border-[#3B82F6] pl-4">
                            <p className="text-[10px] uppercase tracking-[0.18em] text-[#79AFFF]">{pick(lang, 'Unlock Gate', 'Unlock Gate')}</p>
                            <p className="mt-2 text-[14px] font-semibold text-[var(--text-high)]">
                              {pick(lang, 'Week 1-4의 주간 테스트를 통과하면 Week 5-8이 순서대로 열립니다.', 'Pass the Week 1-4 weekly tests and Weeks 5-8 open in sequence.')}
                            </p>
                          </div>
                        </motion.div>
                      )}

                      <motion.button
                        type="button"
                        key={week.id}
                        onMouseEnter={() => setSelectedWeekId(week.id)}
                        onFocus={() => setSelectedWeekId(week.id)}
                        onClick={() => setSelectedWeekId(week.id)}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: week.id * 0.03 }}
                        className="group relative block w-full pl-10 text-left md:pl-12"
                      >
                        <span className={`absolute left-0 top-6 flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold md:left-[6px] ${
                          isSelected
                            ? 'border-[#3B82F6] bg-[#3B82F6] text-white'
                            : isLocked
                              ? 'border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] text-[var(--text-low)]'
                              : 'border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.08)] text-[var(--text-high)]'
                        }`}>
                          {isLocked && !isSelected ? <Lock size={11} /> : week.id}
                        </span>

                        <div className={`border-b border-[rgba(255,255,255,0.08)] py-5 transition-all ${
                          isSelected
                            ? 'bg-[linear-gradient(90deg,rgba(59,130,246,0.12),rgba(59,130,246,0.00))] pl-4 pr-3'
                            : 'hover:bg-[rgba(255,255,255,0.02)]'
                        }`}>
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-low)]">Week {week.id}</span>
                                {week.id <= 4 ? (
                                  <span className="rounded-full bg-[rgba(59,130,246,0.10)] px-2.5 py-1 text-[10px] font-semibold text-[#79AFFF]">Semester 1</span>
                                ) : (
                                  <span className="rounded-full border border-[rgba(255,255,255,0.08)] px-2.5 py-1 text-[10px] font-semibold text-[var(--text-low)]">Semester 2</span>
                                )}
                              </div>
                              <h3 className="mt-3 text-[21px] font-[800] leading-tight tracking-[-0.04em] text-[var(--text-high)]">
                                {l(week.title, lang)}
                              </h3>
                              <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[var(--text-mid)]">
                                {pick(
                                  lang,
                                  `${shortTitle(week.lessons[0].title, lang)}, ${shortTitle(week.lessons[1].title, lang)}, ${shortTitle(week.lessons[2].title, lang)}로 이어집니다.`,
                                  `Covers ${shortTitle(week.lessons[0].title, lang)}, ${shortTitle(week.lessons[1].title, lang)}, and ${shortTitle(week.lessons[2].title, lang)}.`
                                )}
                              </p>
                            </div>

                            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold ${
                              isLocked
                                ? 'border border-[rgba(255,255,255,0.08)] text-[var(--text-low)]'
                                : 'bg-[rgba(59,130,246,0.10)] text-[#79AFFF]'
                            }`}>
                              {isLocked ? <Lock size={12} /> : <CheckCircle2 size={12} />}
                              <span>{isLocked ? pick(lang, '잠금', 'Locked') : pick(lang, '열림', 'Open')}</span>
                            </div>
                          </div>

                          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[var(--text-low)]">
                            <span>{pick(lang, 'Article 3개', '3 articles')}</span>
                            <span className="h-1 w-1 rounded-full bg-[rgba(255,255,255,0.20)]" />
                            <span>{pick(lang, 'Action Lab', 'Action Lab')}</span>
                            <span className="h-1 w-1 rounded-full bg-[rgba(255,255,255,0.20)]" />
                            <span>{pick(lang, 'Weekly Test', 'Weekly Test')}</span>
                            {isSelected && (
                              <span className="inline-flex items-center gap-1 font-semibold text-[#79AFFF]">
                                <span>{pick(lang, '상세 보기', 'Previewing')}</span>
                                <ArrowRight size={12} />
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
