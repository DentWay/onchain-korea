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
    <Section className="py-20 px-6" id="why">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="ok-section-label">{t('why.label')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight text-[var(--text-high)]">
            {t('why.title')}
          </h2>
          <p className="text-[15px] text-[var(--text-mid)] mt-3">
            {t('why.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="ok-card p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-surface)] flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-accent-soft" />
                </div>
                <h3 className="text-[16px] font-semibold text-[var(--text-high)] mb-2">{p.title[lang] || p.title.ko}</h3>
                <p className="text-[13px] text-[var(--text-mid)] leading-relaxed">{p.desc[lang] || p.desc.ko}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
