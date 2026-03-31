import { motion } from 'framer-motion'
import { Zap, Flame, Award, Users } from 'lucide-react'
import Section from './Section'
import useLang from '../../hooks/useLang'

export default function Features() {
  const { t } = useLang()

  const features = [
    { icon: Zap, title: t('feat.practice.title'), desc: t('feat.practice.desc'), tag: t('feat.practice.tag') },
    { icon: Flame, title: t('feat.hidden.title'), desc: t('feat.hidden.desc'), tag: t('feat.hidden.tag') },
    { icon: Award, title: t('feat.cert.title'), desc: t('feat.cert.desc'), tag: t('feat.cert.tag') },
    { icon: Users, title: t('feat.community.title'), desc: t('feat.community.desc'), tag: t('feat.community.tag') },
  ]

  return (
    <Section className="py-32 px-6" id="features">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="ok-section-label">{t('landing.features')}</span>
          <h2 className="text-[32px] md:text-[40px] font-bold mt-4 tracking-tight text-[var(--text-high)]">
            {t('landing.featuresTitle')}
          </h2>
          <p className="text-[15px] text-[var(--text-mid)] mt-4">{t('landing.featuresDesc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="ok-card p-7 flex flex-col justify-between min-h-[200px]"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent-surface)] flex items-center justify-center mb-5">
                    <Icon size={20} className="text-accent-soft" />
                  </div>
                  <h3 className="text-[17px] font-semibold text-[var(--text-high)] mb-2">{f.title}</h3>
                  <p className="text-[13px] text-[var(--text-mid)] leading-relaxed">{f.desc}</p>
                </div>
                <div className="mt-5">
                  <span className="ok-tag ok-tag-accent text-[11px]">{f.tag}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
