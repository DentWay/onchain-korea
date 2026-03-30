import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, ChevronDown, Lightbulb } from 'lucide-react'
import { weeks, l } from '../data/curriculum'
import { hiddenTopicContents } from '../data/content'
import useProgress from '../hooks/useProgress'
import useLang from '../hooks/useLang'

export default function HiddenTopics() {
  const { readHiddenTopics, toggleHiddenTopic } = useProgress()
  const { t, lang } = useLang()
  const [expandedWeek, setExpandedWeek] = useState(null)

  const toggle = (weekId) => {
    setExpandedWeek(prev => prev === weekId ? null : weekId)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-semibold text-[var(--text-high)]">{t('hidden.title')}</h1>
          <Link to="/dashboard" className="text-[11px] text-accent-soft flex items-center gap-1 hover:text-accent transition-colors"><ArrowLeft size={12} /> {t('week.back')}</Link>
        </div>
        <p className="text-[12px] text-[var(--text-mid)] mb-5">{t('hidden.desc')}</p>

        <div className="space-y-3">
          {weeks.map((week, i) => {
            const ht = week.hiddenTopic
            const isRead = readHiddenTopics.includes(week.id)
            const isCurrent = i === 0
            const isExpanded = expandedWeek === week.id
            const content = hiddenTopicContents[week.id]

            return (
              <motion.div key={week.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className={`ok-card overflow-hidden ${isRead ? 'border-success/20' : isCurrent ? 'border-accent/20' : ''}`}>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-[var(--text-low)] uppercase tracking-wider font-medium">{t('common.week')} {week.id}</span>
                      {isCurrent && !isRead && <span className="ok-tag ok-tag-accent">{t('hidden.thisWeek')}</span>}
                    </div>
                    {isRead && <span className="text-[10px] text-success flex items-center gap-1"><Check size={12} /> {t('hidden.complete')}</span>}
                  </div>
                  <p className="text-[14px] font-semibold text-[var(--text-high)]">{l(ht.title, lang)}</p>
                  {ht.desc && <p className="text-[11px] text-[var(--text-mid)] mt-2 leading-relaxed">{l(ht.desc, lang)}</p>}
                  <div className="flex gap-3 mt-2 text-[10px] text-[var(--text-low)]">
                    <span>{l(ht.readTime, lang)}</span>
                    {ht.forumCount > 0 && <span>{ht.forumCount}{t('week.participating')}</span>}
                    <span>{t('hidden.action')}: {l(ht.action, lang)}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    {content && (
                      <button onClick={() => toggle(week.id)}
                        className="ok-btn ok-btn-ghost text-[11px] px-3 py-1.5 flex items-center gap-1">
                        <ChevronDown size={13} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        {isExpanded ? t('hidden.collapse') : t('hidden.readArticle')}
                      </button>
                    )}
                    <button onClick={() => toggleHiddenTopic(week.id)}
                      className={`ok-btn text-[11px] px-3 py-1.5 ${isRead ? 'ok-btn-ghost border-success/20 text-success' : 'ok-btn-primary'}`}>
                      {isRead ? t('hidden.readComplete') : t('hidden.markRead')}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && content && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}>
                      <div className="border-t border-[var(--border)] px-4 pt-4 pb-5 space-y-5">
                        {content.sections.map((section, j) => (
                          <div key={j}>
                            <h3 className="text-[14px] font-semibold text-[var(--text-high)] mb-2">{section.heading}</h3>
                            <div className="space-y-2.5">
                              {section.content.split('\n\n').map((para, k) => (
                                <p key={k} className="text-[12px] text-[var(--text-mid)] leading-relaxed">{para}</p>
                              ))}
                            </div>
                          </div>
                        ))}

                        {content.keyTakeaways && (
                          <div className="bg-[var(--accent-surface)] rounded-lg p-4 mt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Lightbulb size={14} className="text-accent-soft" />
                              <h4 className="text-[12px] font-semibold text-[var(--text-high)]">{t('hidden.keyTakeaways')}</h4>
                            </div>
                            <ul className="space-y-1.5">
                              {content.keyTakeaways.map((item, j) => (
                                <li key={j} className="text-[11px] text-[var(--text-mid)] flex items-start gap-2">
                                  <span className="text-accent-soft mt-0.5 shrink-0">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
