import { motion } from 'framer-motion'
import { Award, Flame, Users, Zap } from 'lucide-react'
import useLang from '../../hooks/useLang'

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

export default function Features() {
  const { lang } = useLang()

  const features = [
    {
      icon: Zap,
      title: pick(lang, '실전 중심 학습', 'Learn by Doing'),
      desc: pick(
        lang,
        '읽기 → 퀴즈 → 실습 → 인증. 이론만이 아닌 실전 경험.',
        `Read → Quiz → Practice → Certify.
Real experience, not just theory.`
      ),
    },
    {
      icon: Flame,
      title: pick(lang, '한국 시장 맥락', 'Korean Market Context'),
      desc: pick(
        lang,
        '매주 한국 크립토 시장에 특화된 히든 토픽을 제공합니다.',
        'Weekly hidden topics tailored to the Korean crypto market.'
      ),
    },
    {
      icon: Award,
      title: pick(lang, '온체인 수료증', 'On-chain Certificate'),
      desc: pick(
        lang,
        '수료 조건 달성 시 블록체인에 영구 기록되는 수료 인증서.',
        `A certificate permanently recorded on the blockchain
upon completion.`
      ),
    },
    {
      icon: Users,
      title: pick(lang, '커뮤니티', 'Community'),
      desc: pick(
        lang,
        '카카오톡 스터디 그룹과 주간 리듬으로 함께 학습합니다.',
        `Learn together with KakaoTalk study groups
and a weekly rhythm.`
      ),
    },
  ]

  return (
    <section id="features" className="bg-[#0a0b0d] py-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9497a9]">
            FEATURES
          </p>
          <h2 className="mt-4 text-[36px] font-[700] tracking-[-1px] text-white md:text-[48px]">
            {pick(lang, '왜 온체인 코리아인가?', 'Why Onchain Korea?')}
          </h2>
        </div>

        {/* 2x2 grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="rounded-[12px] bg-[#282b31] p-6"
              >
                {/* Icon circle */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(87,65,216,0.16)]">
                  <Icon size={22} className="text-[#7132f5]" />
                </div>

                <h3 className="mt-5 text-[22px] font-[600] tracking-[-0.02em] text-white">
                  {feature.title}
                </h3>

                <p className="mt-2 whitespace-pre-line text-[16px] leading-[1.50] text-[#9497a9]">
                  {feature.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
