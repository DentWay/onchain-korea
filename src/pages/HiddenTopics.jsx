import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, ChevronDown, Lightbulb, Lock, Flame } from 'lucide-react'
import { weeks, l } from '../data/curriculum'
import { hiddenTopicContents } from '../data/content'
import useProgress from '../hooks/useProgress'
import useLang from '../hooks/useLang'

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

export default function HiddenTopics() {
  const { readHiddenTopics, toggleHiddenTopic, isHiddenTopicUnlocked, isWeekUnlocked } = useProgress()
  const { t, lang } = useLang()
  const [expandedWeek, setExpandedWeek] = useState(null)

  const toggle = (weekId) => {
    setExpandedWeek((prev) => (prev === weekId ? null : weekId))
  }

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <section className="bg-white border border-[#dedee5] rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-5 md:p-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-[12px] font-medium text-[#686b82] transition-colors hover:text-[#101114]"
          >
            <ArrowLeft size={14} />
            <span>{t('week.back')}</span>
          </Link>

          <header className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#9497a9]">{t('hidden.title')}</p>
              <h1 className="mt-2 text-[30px] md:text-[40px] font-[800] tracking-[-0.05em] text-[#101114]">
                {pick(lang, '주차별 시장 맥락 모음', 'Weekly market-context archive')}
              </h1>
              <p className="mt-3 text-[14px] leading-relaxed text-[#686b82]">{t('hidden.desc')}</p>
            </div>

            <div className="bg-[#f7f7f8] border border-[#dedee5] rounded-[1.5rem] px-5 py-4 md:px-6 md:py-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#9497a9]">{pick(lang, '읽은 토픽', 'Topics read')}</p>
              <p className="mt-2 text-[36px] font-[800] tracking-[-0.05em] tabular-nums text-[#101114]">
                {readHiddenTopics.length}/{weeks.length}
              </p>
              <p className="mt-2 text-[12px] text-[#686b82]">
                {pick(lang, '실습을 마친 주차부터 순서대로 열려요.', 'Topics open week by week after actions are completed.')}
              </p>
            </div>
          </header>

          <div className="mt-6 space-y-4">
            {weeks.map((week, index) => {
              const hiddenTopic = week.hiddenTopic
              const content = hiddenTopicContents[week.id]
              const isRead = readHiddenTopics.includes(week.id)
              const isExpanded = expandedWeek === week.id
              const weekOpen = isWeekUnlocked(week.id)
              const unlocked = weekOpen && isHiddenTopicUnlocked(week.id)
              const locked = !unlocked && !isRead

              return (
                <motion.section
                  key={week.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white border border-[#dedee5] rounded-[1.5rem] overflow-hidden ${locked ? 'opacity-70' : ''}`}
                >
                  <div className="px-5 md:px-6 py-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(87,65,216,0.08)] px-2.5 py-1 text-[10px] font-semibold text-[#5741d8]">
                            <Flame size={11} />
                            <span>Week {week.id}</span>
                          </span>
                          {locked && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-[#dedee5] px-2.5 py-1 text-[10px] font-semibold text-[#9497a9]">
                              <Lock size={11} />
                              <span>{pick(lang, '잠금', 'Locked')}</span>
                            </span>
                          )}
                          {isRead && (
                            <span className="rounded-full bg-[rgba(20,158,97,0.16)] px-2.5 py-1 text-[10px] font-semibold text-[#026b3f]">
                              {t('hidden.complete')}
                            </span>
                          )}
                        </div>

                        <h2 className="mt-3 text-[22px] font-[800] tracking-[-0.04em] text-[#101114]">{l(hiddenTopic.title, lang)}</h2>
                        {hiddenTopic.desc && (
                          <p className="mt-2 text-[13px] leading-relaxed text-[#686b82]">{l(hiddenTopic.desc, lang)}</p>
                        )}
                        <div className="mt-3 flex flex-wrap gap-3 text-[12px] text-[#686b82]">
                          <span>{l(hiddenTopic.readTime, lang)}</span>
                          <span>{t('hidden.action')}: {l(hiddenTopic.action, lang)}</span>
                          {hiddenTopic.forumCount > 0 && <span>{hiddenTopic.forumCount}{t('week.participating')}</span>}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 md:justify-end">
                        {content && !locked && (
                          <button
                            onClick={() => toggle(week.id)}
                            className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-[#eef0f3] text-[#101114] font-semibold border border-[#dedee5] transition-colors hover:bg-[#e2e4e9] px-4 py-2.5 text-[12px]"
                          >
                            <ChevronDown size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            {isExpanded ? t('hidden.collapse') : t('hidden.readArticle')}
                          </button>
                        )}

                        {locked ? (
                          <div className="inline-flex items-center gap-2 rounded-full border border-[#dedee5] px-4 py-2.5 text-[12px] text-[#686b82]">
                            <Lock size={13} />
                            <span>{!weekOpen ? t('week.completePrevLesson') : t('week.completeActionForHidden')}</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => toggleHiddenTopic(week.id)}
                            className={`inline-flex items-center justify-center gap-2 font-semibold transition-colors px-4 py-2.5 text-[12px] ${isRead ? 'rounded-[12px] bg-[#eef0f3] text-[#101114] border border-[#dedee5] hover:bg-[#e2e4e9]' : 'rounded-[56px] bg-[#5741d8] text-white hover:bg-[#7132f5]'}`}
                          >
                            {isRead ? t('hidden.readComplete') : t('hidden.markRead')}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && content && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                      >
                        <div className="border-t border-[#dedee5] bg-[#f7f7f8] px-5 md:px-6 pt-5 pb-6">
                          <div className="space-y-6">
                            {content.sections.map((section, sectionIndex) => (
                              <div key={sectionIndex}>
                                <h3 className="text-[18px] font-[700] tracking-[-0.03em] text-[#101114]">{section.heading}</h3>
                                <div className="mt-3 space-y-3">
                                  {section.content.split('\n\n').map((para, paraIndex) => (
                                    <p key={paraIndex} className="text-[14px] leading-relaxed text-[#686b82]">{para}</p>
                                  ))}
                                </div>
                              </div>
                            ))}

                            {content.keyTakeaways && (
                              <div className="rounded-[24px] border border-[#dedee5] bg-white p-5">
                                <div className="flex items-center gap-2">
                                  <Lightbulb size={15} className="text-[#5741d8]" />
                                  <h4 className="text-[14px] font-[700] text-[#101114]">{t('hidden.keyTakeaways')}</h4>
                                </div>
                                <ul className="mt-4 space-y-2">
                                  {content.keyTakeaways.map((item, takeawayIndex) => (
                                    <li key={takeawayIndex} className="flex items-start gap-2 text-[13px] leading-relaxed text-[#686b82]">
                                      <span className="mt-1 shrink-0 text-[#5741d8]">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.section>
              )
            })}
          </div>
        </section>
      </motion.div>
    </div>
  )
}
