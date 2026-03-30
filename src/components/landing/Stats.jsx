import { motion } from 'framer-motion'
import Section from './Section'
import Counter from './Counter'
import useLang from '../../hooks/useLang'

export default function Stats() {
  const { t, lang } = useLang()

  const stats = [
    { value: 4, suffix: t('stats.weeks'), label: t('stats.curriculum'), sub: t('stats.stepByStep') },
    { value: 20, suffix: t('stats.lessons'), label: t('stats.lesson'), sub: t('stats.theoryPractice') },
    { value: 10, suffix: t('stats.actions'), label: t('stats.practice'), sub: t('stats.handson') },
    { value: 100, suffix: '%', label: t('stats.free'), sub: t('stats.noCost') },
  ]

  return (
    <Section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Price anchor */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
          <p className="text-[12px] text-[var(--text-low)]">
            <span className="line-through">{t('landing.priceAnchor')}</span>
            <span className="ml-2 text-success font-semibold">{t('landing.priceAnchorArrow')}</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="ok-card text-center p-6"
            >
              <p className="text-3xl md:text-4xl font-bold text-[var(--text-high)] ok-tabular-nums">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-[13px] text-[var(--text-mid)] mt-1.5">{s.label}</p>
              <p className="text-[11px] text-[var(--text-low)] mt-0.5">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
