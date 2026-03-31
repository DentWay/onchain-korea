import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Search, Coins, ArrowRightLeft } from 'lucide-react'
import Section from './Section'
import useLang from '../../hooks/useLang'

const FAKE_PARTICIPANTS = [89, 67, 42, 28]

const gradients = [
  'from-blue-500/20 to-blue-600/5',
  'from-purple-500/20 to-purple-600/5',
  'from-green-500/20 to-green-600/5',
  'from-amber-500/20 to-amber-600/5',
]

const borderColors = [
  'border-l-blue-500',
  'border-l-purple-500',
  'border-l-green-500',
  'border-l-amber-500',
]

/* Pulsing dot that activates when in view */
function PulseDot({ inView }) {
  return (
    <motion.div
      className="w-2 h-2 rounded-full bg-accent/30"
      animate={inView ? { scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] } : {}}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

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
          <h2 className="text-[40px] md:text-[56px] font-bold mt-4 tracking-tight text-[var(--text-high)]">
            {t('landing.roadmap')}
          </h2>
          <p className="text-[16px] md:text-[18px] text-[var(--text-mid)] mt-4 font-light">{t('landing.roadmapDesc')}</p>
        </div>

        <div className="space-y-4">
          {weeks.map((week, i) => {
            const Icon = week.icon
            const isOdd = i % 2 === 0 // odd week = index 0, 2 (left); even week = index 1, 3 (right)
            return (
              <WeekCard
                key={week.num}
                week={week}
                Icon={Icon}
                index={i}
                isOdd={isOdd}
                gradient={gradients[i]}
                borderColor={borderColors[i]}
                participants={FAKE_PARTICIPANTS[i]}
                t={t}
              />
            )
          })}
        </div>
      </div>
    </Section>
  )
}

function WeekCard({ week, Icon, index, isOdd, gradient, borderColor, participants, t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isOdd ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
      className={`relative rounded-xl border border-[var(--border)] border-l-4 ${borderColor} overflow-hidden`}
    >
      {/* Subtle gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} pointer-events-none`} />

      <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
        {/* Week number + icon */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-[var(--accent-surface)] flex items-center justify-center">
            <Icon size={20} className="text-accent-soft" />
          </div>
          <div>
            <span className="text-[10px] text-[var(--text-low)] font-mono tracking-widest uppercase">Week {week.num}</span>
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[var(--text-high)] mt-0.5">{week.title}</h3>
          </div>
        </div>

        {/* Description + actions */}
        <div className="flex-1 md:pl-4">
          <p className="text-[14px] text-[var(--text-mid)] leading-relaxed">{week.desc}</p>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {week.actions.map((action, j) => (
              <motion.span
                key={action}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.12 + 0.2 + j * 0.08,
                  type: 'spring',
                  stiffness: 400,
                  damping: 15,
                }}
                className="text-[11px] px-3 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-mid)] font-medium"
              >
                {action}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Progress dots + participant count */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            {week.actions.map((_, j) => (
              <PulseDot key={j} inView={inView} />
            ))}
          </div>
          <span className="text-[10px] text-[var(--text-low)] ok-tabular-nums">{participants}{t('stats.completed')}</span>
        </div>
      </div>
    </motion.div>
  )
}
