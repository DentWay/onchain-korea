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
    <Section className="py-24 px-6" id="features">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="ok-section-label">{t('landing.features')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight text-[var(--text-high)]">{t('landing.featuresTitle')}</h2>
          <p className="text-[15px] text-[var(--text-mid)] mt-3">{t('landing.featuresDesc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="ok-card p-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-surface)] flex items-center justify-center mb-4">
                  <Icon size={18} className="text-accent-soft" />
                </div>
                <h3 className="text-[16px] font-semibold text-[var(--text-high)]">{f.title}</h3>
                <p className="text-[13px] text-[var(--text-mid)] mt-2 leading-relaxed">{f.desc}</p>
                <span className="ok-tag ok-tag-accent mt-4">{f.tag}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
