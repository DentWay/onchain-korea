import { motion } from 'framer-motion'
import { ShieldCheck, GraduationCap, Users } from 'lucide-react'
import Section from './Section'
import useLang from '../../hooks/useLang'

const pillars = [
  {
    icon: GraduationCap,
    title: { ko: '검증된 커리큘럼', en: 'Proven Curriculum' },
    desc: { ko: 'Greed Academy의 검증된 블록체인 교육 콘텐츠를 기반으로 합니다. 수천 명의 수강생이 이미 검증한 커리큘럼.', en: 'Built on Greed Academy\'s proven blockchain education content. Curriculum already verified by thousands of students.' },
  },
  {
    icon: ShieldCheck,
    title: { ko: '안전 제일', en: 'Safety First' },
    desc: { ko: '모든 레슨에 안전 수칙 포함. 버너 지갑으로 시작하고, 시드 문구 관리법을 가장 먼저 배웁니다.', en: 'Safety tips in every lesson. Start with a burner wallet, learn seed phrase management first.' },
  },
  {
    icon: Users,
    title: { ko: '함께 배우기', en: 'Learn Together' },
    desc: { ko: '혼자가 아닙니다. 카카오톡 오픈채팅으로 실시간 소통하고, 매주 히든 토픽으로 함께 토론합니다.', en: 'You\'re not alone. Real-time chat via KakaoTalk, weekly hidden topic discussions with peers.' },
  },
]

export default function WhySection() {
  const { t, lang } = useLang()

  return (
    <Section className="py-32 px-6" id="why">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Left — Big bold headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="ok-section-label">{t('why.label')}</span>
            <h2 className="text-[40px] md:text-[56px] font-bold mt-4 tracking-tight leading-[1.08] text-[var(--text-high)]">
              <span className="bg-gradient-to-r from-[var(--accent)] to-purple-400 bg-clip-text text-transparent">
                {t('why.title')}
              </span>
            </h2>
            <p className="text-[16px] md:text-[18px] text-[var(--text-mid)] mt-5 leading-relaxed font-light">
              {t('why.desc')}
            </p>
            {/* Gradient accent line */}
            <div className="h-1 w-24 mt-8 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-accent" />
          </motion.div>

          {/* Right — 3 stacked benefit cards */}
          <div className="space-y-4">
            {pillars.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="ok-card p-6 flex items-start gap-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-surface)] flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-accent-soft" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-semibold text-[var(--text-high)] mb-2">{p.title[lang] || p.title.ko}</h3>
                    <p className="text-[14px] text-[var(--text-mid)] leading-relaxed">{p.desc[lang] || p.desc.ko}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
