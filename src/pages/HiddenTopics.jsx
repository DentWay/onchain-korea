import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import { weeks, l } from '../data/curriculum'
import useProgress from '../hooks/useProgress'
import useLang from '../hooks/useLang'

export default function HiddenTopics() {
  const { readHiddenTopics, toggleHiddenTopic } = useProgress()
  const { t, lang } = useLang()

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

            return (
              <motion.div key={week.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className={`ok-card p-4 ${isRead ? 'border-success/20' : isCurrent ? 'border-accent/20' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-[var(--text-low)] uppercase tracking-wider font-medium">Week {week.id}</span>
                    {isCurrent && !isRead && <span className="ok-tag ok-tag-accent">{lang === 'ko' ? '이번 주' : 'This week'}</span>}
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
                <button onClick={() => toggleHiddenTopic(week.id)}
                  className={`mt-3 ok-btn text-[11px] px-3 py-1.5 ${isRead ? 'ok-btn-ghost border-success/20 text-success' : 'ok-btn-primary'}`}>
                  {isRead ? t('hidden.readComplete') : t('hidden.markRead')}
                </button>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
