import { motion } from 'framer-motion'
import { Shield, Search, Coins, ArrowRightLeft } from 'lucide-react'
import Section from './Section'
import useLang from '../../hooks/useLang'

export default function Curriculum() {
  const { t, lang } = useLang()

  const weeks = [
    { num: 1, title: t('cur.w1.title'), icon: Shield, desc: t('cur.w1.desc'), actions: [t('cur.a.phantom'), t('cur.a.burner'), t('cur.a.seed')] },
    { num: 2, title: t('cur.w2.title'), icon: Search, desc: t('cur.w2.desc'), actions: [t('cur.a.solscan'), t('cur.a.scam')] },
    { num: 3, title: t('cur.w3.title'), icon: Coins, desc: t('cur.w3.desc'), actions: [t('cur.a.swap'), t('cur.a.nft')] },
    { num: 4, title: t('cur.w4.title'), icon: ArrowRightLeft, desc: t('cur.w4.desc'), actions: [t('cur.a.stable'), t('cur.a.bridge'), t('cur.a.staking')] },
  ]

  return (
    <Section className="py-32 px-6" id="curriculum">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="ok-section-label">{t('landing.curriculum')}</span>
          <h2 className="text-[32px] md:text-[40px] font-bold mt-4 tracking-tight text-[var(--text-high)]">
            {t('landing.roadmap')}
          </h2>
          <p className="text-[15px] text-[var(--text-mid)] mt-4">{t('landing.roadmapDesc')}</p>
        </div>

        <div className="space-y-4">
          {weeks.map((week, i) => {
            const Icon = week.icon
            return (
              <motion.div
                key={week.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="ok-card p-6 md:p-7"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                  {/* Week number + icon */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-11 h-11 rounded-xl bg-[var(--accent-surface)] flex items-center justify-center">
                      <Icon size={20} className="text-accent-soft" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--text-low)] font-mono tracking-widest uppercase">Week {week.num}</span>
                      <h3 className="text-[16px] md:text-[17px] font-semibold text-[var(--text-high)] mt-0.5">{week.title}</h3>
                    </div>
                  </div>

                  {/* Description + actions */}
                  <div className="flex-1 md:pl-4">
                    <p className="text-[13px] text-[var(--text-mid)] leading-relaxed">{week.desc}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {week.actions.map((action) => (
                        <span
                          key={action}
                          className="ok-tag text-[11px] px-3 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-mid)] font-medium"
                        >
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Simple dots */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {week.actions.map((_, j) => (
                      <div key={j} className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/30" />
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
