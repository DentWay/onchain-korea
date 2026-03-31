import { motion } from 'framer-motion'
import Section from './Section'
import Counter from './Counter'
import useLang from '../../hooks/useLang'

export default function Stats() {
  const { t, lang } = useLang()

  const stats = [
    { value: 4, suffix: t('stats.weeks'), label: t('stats.curriculum') },
    { value: 20, suffix: t('stats.lessons'), label: t('stats.lesson') },
    { value: 10, suffix: t('stats.actions'), label: t('stats.practice') },
    { value: 0, display: lang === 'ko' ? '\u20A90' : '$0', label: t('stats.free') },
  ]

  return (
    <Section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="ok-card p-6 text-center"
            >
              <p className="text-2xl md:text-3xl font-bold text-[var(--text-high)] ok-tabular-nums">
                {s.display ? s.display : <Counter value={s.value} suffix={s.suffix} />}
              </p>
              <p className="text-[13px] text-[var(--text-mid)] mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Price anchor */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[var(--surface-1)] border border-[var(--border)]">
            <span className="text-[13px] text-[var(--text-low)] line-through">
              {t('landing.priceAnchor')}
            </span>
            <span className="text-[14px] font-semibold text-success">
              {t('landing.priceAnchorArrow')}
            </span>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
