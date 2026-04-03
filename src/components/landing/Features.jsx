import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Award, Flame, Users, Zap } from 'lucide-react'
import Section from './Section'
import useLang from '../../hooks/useLang'

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

export default function Features() {
  const { t, lang } = useLang()
  const [activeIndex, setActiveIndex] = useState(0)

  const features = [
    {
      icon: Zap,
      title: t('feat.practice.title'),
      desc: lang === 'ko' ? '읽고 끝나는 구조가 아니라 지갑, 탐색기, DEX 실습까지 바로 이어집니다.' : 'Reading turns directly into wallets, explorers, and DEX practice.',
      tag: t('feat.practice.tag'),
      metrics: [
        { label: pick(lang, '출발', 'Start'), value: pick(lang, '아티클', 'Article') },
        { label: pick(lang, '다음 단계', 'Next'), value: pick(lang, '퀴즈', 'Quiz') },
        { label: pick(lang, '결과', 'Result'), value: pick(lang, '실습', 'Action') },
      ],
      step: 1,
    },
    {
      icon: Flame,
      title: t('feat.hidden.title'),
      desc: lang === 'ko' ? '히든 토픽은 한국 사용자에게 필요한 시장 맥락만 짧고 선명하게 정리합니다.' : 'Hidden topics compress only the market context Korean users actually need.',
      tag: t('feat.hidden.tag'),
      metrics: [
        { label: pick(lang, '주기', 'Cadence'), value: pick(lang, '주 1회', 'Weekly') },
        { label: pick(lang, '형식', 'Format'), value: pick(lang, '짧은 브리프', 'Short brief') },
        { label: pick(lang, '초점', 'Focus'), value: pick(lang, '한국 맥락', 'Korean context') },
      ],
      step: 2,
    },
    {
      icon: Award,
      title: t('feat.cert.title'),
      desc: lang === 'ko' ? '수료 조건을 채우면 링크로 보여줄 수 있는 온체인 결과물이 남습니다.' : 'Finishing the path leaves an on-chain result you can actually share.',
      tag: t('feat.cert.tag'),
      metrics: [
        { label: pick(lang, '기록', 'Record'), value: pick(lang, '온체인', 'On-chain') },
        { label: pick(lang, '형식', 'Format'), value: pick(lang, 'Proof', 'Proof') },
        { label: pick(lang, '공유', 'Share'), value: 'LinkedIn' },
      ],
      step: 3,
    },
    {
      icon: Users,
      title: t('feat.community.title'),
      desc: lang === 'ko' ? '혼자 막히지 않도록 카카오톡 커뮤니티와 주간 흐름을 함께 둡니다.' : 'KakaoTalk community support keeps the path from becoming a solo dead end.',
      tag: t('feat.community.tag'),
      metrics: [
        { label: pick(lang, '채널', 'Channel'), value: 'KakaoTalk' },
        { label: pick(lang, '타이밍', 'Timing'), value: pick(lang, '주간 흐름', 'Weekly rhythm') },
        { label: pick(lang, '목적', 'Purpose'), value: pick(lang, '막힘 해소', 'Unblock') },
      ],
      step: 4,
    },
  ]

  const activeFeature = features[activeIndex]
  const ActiveIcon = activeFeature.icon
  const previewFlow = [
    { label: pick(lang, '읽기', 'Read') },
    { label: pick(lang, '퀴즈', 'Quiz') },
    { label: pick(lang, '실습', 'Action') },
    { label: pick(lang, '증명', 'Proof') },
  ]

  return (
    <Section className="py-24 px-6" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="ok-section-label">{t('landing.features')}</span>
          <h2 className="mt-4 text-[32px] font-bold tracking-tight text-[var(--text-high)] md:text-[42px]">
            {t('landing.featuresTitle')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--text-mid)]">
            {lang === 'ko'
              ? '기능을 많이 보여주기보다, 실제로 무엇을 하게 되는지 한 흐름으로 정리했습니다.'
              : 'Instead of listing features, this shows the actual learning flow as one system.'}
          </p>
        </div>

        <div className="ok-readable-panel-soft p-6 md:p-8">
          <div className="relative z-10 grid gap-10 xl:grid-cols-[minmax(0,1.08fr)_340px]">
            <div className="xl:sticky xl:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(59,130,246,0.12)] text-[#79AFFF]">
                    <ActiveIcon size={22} />
                  </div>
                  <span className="rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-low)]">
                    {activeFeature.tag}
                  </span>
                </div>

                <h3 className="mt-5 text-[28px] font-[800] tracking-[-0.05em] text-[var(--text-high)] md:text-[36px]">
                  {activeFeature.title}
                </h3>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--text-mid)]">
                  {activeFeature.desc}
                </p>

                <div className="mt-8 border-y border-[rgba(255,255,255,0.08)] py-5">
                  <div className="grid gap-3 md:grid-cols-4">
                    {previewFlow.map((step, index) => {
                      const isActive = activeFeature.step === index + 1

                      return (
                        <motion.div
                          key={step.label}
                          animate={{ y: isActive ? -4 : 0, opacity: isActive ? 1 : 0.56 }}
                          transition={{ duration: 0.25 }}
                          className={`border-l px-4 py-2 ${
                            isActive
                              ? 'border-[rgba(59,130,246,0.50)] text-[var(--text-high)]'
                              : 'border-[rgba(255,255,255,0.10)] text-[var(--text-mid)]'
                          }`}
                        >
                          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-low)]">0{index + 1}</p>
                          <p className="mt-2 text-[14px] font-semibold">{step.label}</p>
                        </motion.div>
                      )
                    })}
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {activeFeature.metrics.map((metric) => (
                      <div key={metric.label} className="border-t border-[rgba(255,255,255,0.08)] pt-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-low)]">{metric.label}</p>
                        <p className="mt-2 text-[18px] font-[700] text-[var(--text-high)]">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                </motion.div>
            </AnimatePresence>
            </div>

            <div className="divide-y divide-[rgba(255,255,255,0.08)] border-t border-[rgba(255,255,255,0.08)]">
              {features.map((feature, index) => {
                const Icon = feature.icon
                const isActive = activeIndex === index

                return (
                  <motion.button
                    key={feature.title}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    whileHover={{ x: 4 }}
                    className={`w-full py-5 text-left transition-all ${
                      isActive
                        ? 'pl-4'
                        : 'hover:pl-2'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                        isActive ? 'bg-[rgba(59,130,246,0.12)] text-[#79AFFF]' : 'bg-[rgba(255,255,255,0.05)] text-[var(--text-low)]'
                      }`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-low)]">0{index + 1}</span>
                          <span className="rounded-full border border-[rgba(255,255,255,0.08)] px-2.5 py-1 text-[10px] font-semibold text-[var(--text-low)]">
                            {feature.tag}
                          </span>
                        </div>
                        <h4 className={`mt-3 text-[17px] font-[700] leading-snug ${isActive ? 'text-[var(--text-high)]' : 'text-[var(--text-mid)]'}`}>{feature.title}</h4>
                        <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-mid)]">{feature.desc}</p>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
