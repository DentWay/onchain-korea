import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import useLang from '../../hooks/useLang'

const faqs = [
  {
    q: { ko: '블록체인을 하나도 모르는데 괜찮을까요?', en: 'I know nothing about blockchain. Is that okay?' },
    a: { ko: '네, 완전 초보를 위한 과정입니다. Week 1에서 지갑이 뭔지부터 시작합니다. 코딩 지식이나 사전 경험이 전혀 필요 없습니다.', en: 'Yes, this course is designed for complete beginners. Week 1 starts with what a wallet is. No coding knowledge or prior experience needed.' },
  },
  {
    q: { ko: '정말 무료인가요? 나중에 결제를 요구하진 않나요?', en: 'Is it really free? Will you ask for payment later?' },
    a: { ko: '네, 8주 전체 커리큘럼이 무료입니다. 먼저 Week 1-4 기본 트랙부터 진행하고, 각 주차의 테스트를 통과하면 Week 5-8 심화 트랙이 순서대로 열립니다. 카드 정보를 요구하지 않으며, 숨겨진 비용도 없습니다.', en: 'Yes, the full 8-week curriculum is free. You start with the Week 1-4 foundation track, and Weeks 5-8 unlock sequentially after you pass each weekly test. We never ask for credit card information and there are no hidden charges.' },
  },
  {
    q: { ko: '하루에 얼마나 시간을 투자해야 하나요?', en: 'How much time do I need per day?' },
    a: { ko: '하루 20~30분 정도면 충분합니다. 월-수는 article 1개씩, 목은 Action Lab, 금은 히든 토픽/복습, 토는 주간 테스트 흐름이라 직장인도 따라가기 어렵지 않게 설계했습니다.', en: 'About 20-30 minutes a day is enough. The rhythm is one article each on Mon-Wed, an action lab on Thu, hidden-topic review on Fri, and a weekly test on Sat, so working professionals can keep up.' },
  },
  {
    q: { ko: '실습에 돈이 드나요?', en: 'Does the practice cost money?' },
    a: { ko: 'Week 1은 완전 무료로 시작할 수 있습니다. 이후 일부 온체인 액션은 소액의 네트워크 수수료가 필요하지만, 대부분은 매우 적은 비용으로 진행됩니다. 업비트나 빗썸에서 SOL을 구매한 뒤 개인 지갑으로 옮기는 방법도 Week 1에서 안내합니다.', en: 'Week 1 can be started completely free. After that, some on-chain actions require small network fees, but the costs are still minimal. Week 1 also explains how to buy SOL on an exchange and move it into your own wallet.' },
  },
  {
    q: { ko: '수료증은 어떻게 받나요?', en: 'How do I get the certificate?' },
    a: { ko: '레슨 80% 이상 완료 + 온체인 액션 3개 인증 + 히든 토픽 2개 참여하면 수료 자격이 주어집니다. 수료증은 Solana 블록체인에 영구 기록되는 NFT로 발급되며, LinkedIn에 공유할 수 있습니다.', en: 'Complete 80%+ lessons + verify 3 on-chain actions + participate in 2 hidden topics. The certificate is issued as an NFT permanently recorded on Solana blockchain, shareable on LinkedIn.' },
  },
  {
    q: { ko: '다음 기수는 언제인가요?', en: 'When is the next cohort?' },
    a: { ko: '현재 프로그램은 8주 경로로 운영됩니다. Semester 1은 Week 1-4 기본 트랙, Semester 2는 Week 5-8 심화 트랙이며, Semester 1의 주간 테스트를 통과해야 Semester 2가 열립니다. 등록은 2026년 4월 30일에 마감됩니다.', en: 'The current program runs as an 8-week path. Semester 1 is the Week 1-4 foundation track, and Semester 2 is the Week 5-8 advanced track. Semester 2 unlocks only after you pass the Semester 1 weekly tests. Registration closes on April 30, 2026.' },
  },
]

export default function FAQ() {
  const { lang } = useLang()
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center text-[12px] uppercase tracking-[0.2em] text-[#686b82] mb-4"
        >
          FAQ
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[36px] md:text-[48px] font-bold text-[#101114] tracking-tight leading-[1.1] mb-14"
        >
          {lang === 'ko' ? '자주 묻는 질문' : 'Frequently Asked Questions'}
        </motion.h2>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="rounded-[12px] border border-[#dedee5] bg-white overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-[#f8f8fa]"
                >
                  <span className="text-[18px] font-semibold text-[#101114] leading-snug">
                    {faq.q[lang] || faq.q.ko}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#686b82] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-5 text-[16px] font-normal text-[#686b82] leading-[1.56]">
                        {faq.a[lang] || faq.a.ko}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
