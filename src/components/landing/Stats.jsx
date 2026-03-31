import { motion } from 'framer-motion'
import Section from './Section'
import Counter from './Counter'
import useLang from '../../hooks/useLang'

export default function Stats() {
  const { t, lang } = useLang()

  const stats = [
    { value: 4, suffix: t('stats.weeks'), label: t('stats.curriculum'), gradient: 'from-blue-500 to-cyan-400' },
    { value: 20, suffix: t('stats.lessons'), label: t('stats.lesson'), gradient: 'from-purple-500 to-pink-400' },
    { value: 10, suffix: t('stats.actions'), label: t('stats.practice'), gradient: 'from-green-500 to-emerald-400' },
    { value: 0, display: lang === 'ko' ? '\u20A90' : '$0', label: t('stats.free'), gradient: 'from-amber-500 to-orange-400' },
  ]

  return (
    <Section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Large stat bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
              className="text-center"
            >
              <p className="text-[48px] md:text-[64px] font-bold text-[var(--text-high)] ok-tabular-nums leading-none">
                {s.display ? s.display : <Counter value={s.value} suffix={s.suffix} />}
              </p>
              <div className={`h-1 w-16 mx-auto mt-4 rounded-full bg-gradient-to-r ${s.gradient}`} />
              <p className="text-[14px] md:text-[16px] text-[var(--text-mid)] mt-3 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Price anchor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--surface-1)] border border-[var(--border)]">
            <span className="text-[14px] text-[var(--text-low)] line-through">
              {t('landing.priceAnchor')}
            </span>
            <span className="text-[16px] font-bold text-success">
              {t('landing.priceAnchorArrow')}
            </span>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
