import { motion } from 'framer-motion'
import { ShieldCheck, GraduationCap, Users } from 'lucide-react'
import Section from './Section'
import useLang from '../../hooks/useLang'

const pillars = [
  {
    icon: GraduationCap,
    title: { ko: '처음부터 순서대로', en: 'Sequenced from zero' },
    desc: { ko: '한 번에 다 보여주지 않습니다. 지갑, 보안, 토큰, DYOR 순서로 기본기를 먼저 만듭니다.', en: 'The path does not dump everything at once. It builds wallets, security, tokens, and DYOR in order.' },
  },
  {
    icon: ShieldCheck,
    title: { ko: '위험한 것부터 막습니다', en: 'Risk is handled first' },
    desc: { ko: '버너 지갑, 시드 문구, 승인 관리처럼 사고를 줄이는 내용을 가장 앞에 둡니다.', en: 'Burner wallets, seed phrases, and approvals come first to reduce avoidable mistakes.' },
  },
  {
    icon: Users,
    title: { ko: '한국 사용자 흐름으로 설명합니다', en: 'Built for Korean users' },
    desc: { ko: '업비트·빗썸에서 온체인으로 넘어가는 실제 흐름과 한국형 시장 맥락을 같이 다룹니다.', en: 'It follows the real path from Korean exchanges into on-chain activity and adds local market context.' },
  },
]

export default function WhySection() {
  const { t, lang } = useLang()

  return (
    <Section className="py-24 px-6" id="why">
      <div className="max-w-7xl mx-auto">
        <div className="ok-readable-panel-soft p-6 md:p-8">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] gap-16 md:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="ok-section-label">{t('why.label')}</span>
            <h2 className="text-[32px] md:text-[40px] font-bold mt-4 tracking-tight leading-[1.1] text-white">
              {t('why.title')}
            </h2>
            <p className="text-[16px] text-[#9497a9] mt-4 leading-relaxed max-w-xl">
              {t('why.desc')}
            </p>
            <div className="mt-10 border-t border-[rgba(255,255,255,0.10)] pt-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.40)]">
                {lang === 'ko' ? '핵심 원칙' : 'Design principles'}
              </p>
              <ul className="mt-4 divide-y divide-[rgba(255,255,255,0.08)]">
                <li className="flex items-start gap-3 py-4 text-[14px] leading-relaxed text-[#9497a9]">
                  <span className="mt-0.5 shrink-0 text-[12px] font-bold tracking-[0.18em] text-[#7132f5]">01</span>
                  <span>{lang === 'ko' ? '이번 주에 필요한 것만 보여줍니다.' : 'Only the next required step stays visible.'}</span>
                </li>
                <li className="flex items-start gap-3 py-4 text-[14px] leading-relaxed text-[#9497a9]">
                  <span className="mt-0.5 shrink-0 text-[12px] font-bold tracking-[0.18em] text-[#7132f5]">02</span>
                  <span>{lang === 'ko' ? '실습과 퀴즈로 넘어가도록 읽기 흐름을 짭니다.' : 'Reading is designed to lead into quiz and practice immediately.'}</span>
                </li>
                <li className="flex items-start gap-3 py-4 text-[14px] leading-relaxed text-[#9497a9]">
                  <span className="mt-0.5 shrink-0 text-[12px] font-bold tracking-[0.18em] text-[#7132f5]">03</span>
                  <span>{lang === 'ko' ? '한국 사용자가 실제로 마주치는 리스크와 도구를 먼저 다룹니다.' : 'It prioritizes the tools and risks Korean users actually encounter.'}</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <div className="divide-y divide-[rgba(255,255,255,0.08)] border-t border-[rgba(255,255,255,0.08)]">
            {pillars.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-5 py-6"
                >
                  <div className="w-11 h-11 rounded-xl bg-[rgba(87,65,216,0.10)] flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#7132f5]" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-white mb-1.5">{p.title[lang] || p.title.ko}</h3>
                    <p className="text-[13px] text-[#9497a9] leading-relaxed">{p.desc[lang] || p.desc.ko}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
