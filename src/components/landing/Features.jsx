import { motion } from 'framer-motion'
import { Zap, Flame, Award, Users, ArrowUpRight } from 'lucide-react'
import Section from './Section'
import useLang from '../../hooks/useLang'

const cardStyles = [
  { gradient: 'from-blue-600/20 via-blue-500/10 to-transparent', iconBg: 'bg-blue-500/15', iconColor: 'text-blue-400' },
  { gradient: 'from-purple-600/20 via-purple-500/10 to-transparent', iconBg: 'bg-purple-500/15', iconColor: 'text-purple-400' },
  { gradient: 'from-green-600/20 via-green-500/10 to-transparent', iconBg: 'bg-green-500/15', iconColor: 'text-green-400' },
  { gradient: 'from-amber-600/20 via-amber-500/10 to-transparent', iconBg: 'bg-amber-500/15', iconColor: 'text-amber-400' },
]

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
          <h2 className="text-[40px] md:text-[56px] font-bold mt-4 tracking-tight text-[var(--text-high)]">
            {t('landing.featuresTitle')}
          </h2>
          <p className="text-[16px] md:text-[18px] text-[var(--text-mid)] mt-4 font-light">{t('landing.featuresDesc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon
            const style = cardStyles[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative rounded-2xl border border-[var(--border)] overflow-hidden min-h-[240px] flex flex-col justify-between p-7 hover:border-white/12 transition-all"
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} pointer-events-none`} />
                <div className="absolute inset-0 bg-[var(--surface-1)]/60 pointer-events-none" />

                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl ${style.iconBg} flex items-center justify-center mb-5`}>
                    <Icon size={22} className={style.iconColor} />
                  </div>
                  <h3 className="text-[20px] md:text-[22px] font-bold text-[var(--text-high)] mb-3">{f.title}</h3>
                  <p className="text-[14px] text-[var(--text-mid)] leading-relaxed">{f.desc}</p>
                </div>

                <div className="relative flex items-center justify-between mt-6">
                  <span className="ok-tag ok-tag-accent text-[11px]">{f.tag}</span>
                  <ArrowUpRight size={18} className="text-[var(--text-low)] group-hover:text-[var(--text-mid)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
