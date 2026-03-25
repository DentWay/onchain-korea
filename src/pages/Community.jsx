import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MessageCircle, Bell, Flame, BookOpen } from 'lucide-react'
import useLang from '../hooks/useLang'
import useStats from '../hooks/useStats'
import ActivityFeed from '../components/ActivityFeed'

export default function Community() {
  const { t, lang } = useLang()
  const { stats } = useStats()

  const channels = [
    { icon: MessageCircle, title: t('ch.kakao.title'), desc: t('ch.kakao.desc'), btn: t('ch.kakao.btn'), featured: true },
    { icon: Bell, title: t('ch.reminder.title'), desc: t('ch.reminder.desc'), btn: t('ch.reminder.btn') },
    { icon: Flame, title: t('ch.forum.title'), desc: t('ch.forum.desc'), btn: t('ch.forum.btn'), link: '/hidden' },
    { icon: BookOpen, title: t('ch.alumni.title'), desc: t('ch.alumni.desc'), locked: true },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg font-semibold text-[var(--text-high)]">{t('community.title')}</h1>
          <Link to="/dashboard" className="text-[11px] text-accent-soft flex items-center gap-1 hover:text-accent transition-colors"><ArrowLeft size={12} /> {t('week.back')}</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {channels.map((ch, i) => {
            const Icon = ch.icon
            const Wrapper = ch.link ? Link : 'div'
            const wrapperProps = ch.link ? { to: ch.link } : {}
            return (
              <motion.div key={ch.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Wrapper {...wrapperProps} className={`block ok-card p-4 ${ch.locked ? 'opacity-40' : ''} ${ch.featured ? 'border-accent/20' : ''}`}>
                  <Icon size={20} className={`mb-2 ${ch.featured ? 'text-accent-soft' : 'text-[var(--text-low)]'}`} />
                  <p className="text-[13px] font-medium text-[var(--text-high)]">{ch.title}</p>
                  <p className="text-[11px] text-[var(--text-mid)] mt-1">{ch.desc}</p>
                  {ch.locked ? (
                    <p className="text-[10px] text-[var(--text-low)] mt-3">{t('ch.alumni.lock')}</p>
                  ) : ch.featured ? (
                    <span className="mt-3 ok-btn ok-btn-primary text-[10px] px-3 py-1.5">{ch.btn}</span>
                  ) : (
                    <span className="mt-3 ok-btn ok-btn-ghost text-[10px] px-3 py-1.5">{ch.btn || 'Coming Soon'}</span>
                  )}
                </Wrapper>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-sm font-semibold text-[var(--text-high)] mb-2">{t('community.stats')}</h2>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: t('community.totalMembers'), value: stats.total_users || '—' },
                { label: t('community.activeMembers'), value: stats.week1_completions || '—' },
                { label: t('community.forumPosts'), value: stats.certificate_count || '—' },
              ].map((s, i) => (
                <div key={i} className="ok-card p-3">
                  <p className="text-[9px] text-[var(--text-low)] uppercase tracking-wider">{s.label}</p>
                  <p className="text-xl font-bold text-[var(--text-high)] mt-1 ok-tabular-nums">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[var(--text-high)] mb-2">{t('community.recentActivity')}</h2>
            <div className="ok-card p-3"><ActivityFeed maxItems={4} /></div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
