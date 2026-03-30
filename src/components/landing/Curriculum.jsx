import { motion } from 'framer-motion'
import { Shield, Search, Coins, ArrowRightLeft } from 'lucide-react'
import Section from './Section'
import useLang from '../../hooks/useLang'

const FAKE_PARTICIPANTS = [89, 67, 42, 28]

export default function Curriculum() {
  const { t, lang } = useLang()

  const weeks = [
    { num: 1, title: t('cur.w1.title'), icon: Shield, desc: t('cur.w1.desc'), actions: [t('cur.a.phantom'), t('cur.a.burner'), t('cur.a.seed')] },
    { num: 2, title: t('cur.w2.title'), icon: Search, desc: t('cur.w2.desc'), actions: [t('cur.a.solscan'), t('cur.a.scam')] },
    { num: 3, title: t('cur.w3.title'), icon: Coins, desc: t('cur.w3.desc'), actions: [t('cur.a.swap'), t('cur.a.nft')] },
    { num: 4, title: t('cur.w4.title'), icon: ArrowRightLeft, desc: t('cur.w4.desc'), actions: [t('cur.a.stable'), t('cur.a.bridge'), t('cur.a.staking')] },
  ]

  return (
    <Section className="py-24 px-6" id="curriculum">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="ok-section-label">{t('landing.curriculum')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight text-[var(--text-high)]">{t('landing.roadmap')}</h2>
          <p className="text-[15px] text-[var(--text-mid)] mt-3">{t('landing.roadmapDesc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weeks.map((week, i) => {
            const Icon = week.icon
            return (
              <motion.div key={week.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }} className="ok-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--text-low)] font-mono tracking-widest">WEEK {week.num}</span>
                    <span className="text-[9px] text-[var(--text-low)] ok-tabular-nums">{FAKE_PARTICIPANTS[i]}{t('stats.completed')}</span>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-[var(--accent-surface)] flex items-center justify-center">
                    <Icon size={16} className="text-accent-soft" />
                  </div>
                </div>
                <h3 className="text-[16px] font-semibold text-[var(--text-high)] mb-1.5">{week.title}</h3>
                <p className="text-[13px] text-[var(--text-mid)] leading-relaxed">{week.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {week.actions.map((action) => (
                    <span key={action} className="text-[10px] px-2.5 py-1 rounded-md bg-[var(--surface-2)] text-[var(--text-low)]">{action}</span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
