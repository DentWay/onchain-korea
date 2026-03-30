import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Section from './Section'
import useLang from '../../hooks/useLang'

const faqs = [
  {
    q: { ko: '블록체인을 하나도 모르는데 괜찮을까요?', en: 'I know nothing about blockchain. Is that okay?' },
    a: { ko: '네, 완전 초보를 위한 과정입니다. Week 1에서 지갑이 뭔지부터 시작합니다. 코딩 지식이나 사전 경험이 전혀 필요 없습니다.', en: 'Yes, this course is designed for complete beginners. Week 1 starts with what a wallet is. No coding knowledge or prior experience needed.' },
  },
  {
    q: { ko: '정말 무료인가요? 나중에 결제를 요구하진 않나요?', en: 'Is it really free? Will you ask for payment later?' },
    a: { ko: '네, 4주 전체 커리큘럼이 완전 무료입니다. 카드 정보를 요구하지 않으며, 숨겨진 비용도 없습니다. Greed Academy와 파트너들의 후원으로 운영됩니다.', en: 'Yes, the entire 4-week curriculum is completely free. We never ask for credit card info, and there are no hidden costs. Supported by Greed Academy and our partners.' },
  },
  {
    q: { ko: '하루에 얼마나 시간을 투자해야 하나요?', en: 'How much time do I need per day?' },
    a: { ko: '주당 2~3시간이면 충분합니다. 레슨 읽기 30분 + 실습 30분 정도로, 출퇴근길이나 점심시간에도 진행할 수 있습니다.', en: 'About 2-3 hours per week is enough. Around 30 minutes for reading + 30 minutes for practice. You can do it during your commute or lunch break.' },
  },
  {
    q: { ko: '실습에 돈이 드나요?', en: 'Does the practice cost money?' },
    a: { ko: '대부분의 실습은 무료이며, 일부 온체인 액션(DEX 스왑, NFT 민팅 등)에 소액의 네트워크 수수료(0.01달러 미만)가 필요합니다. SOL 기준 0.1개(약 2,000원) 정도면 모든 실습을 완료할 수 있습니다.', en: 'Most practice is free. Some on-chain actions (DEX swap, NFT minting) require small network fees (less than $0.01). About 0.1 SOL (~$2) is enough to complete all practices.' },
  },
  {
    q: { ko: '수료증은 어떻게 받나요?', en: 'How do I get the certificate?' },
    a: { ko: '레슨 80% 이상 완료 + 온체인 액션 3개 인증 + 히든 토픽 2개 참여하면 수료 자격이 주어집니다. 수료증은 Solana 블록체인에 영구 기록되는 NFT로 발급되며, LinkedIn에 공유할 수 있습니다.', en: 'Complete 80%+ lessons + verify 3 on-chain actions + participate in 2 hidden topics. The certificate is issued as an NFT permanently recorded on Solana blockchain, shareable on LinkedIn.' },
  },
  {
    q: { ko: '다음 기수는 언제인가요?', en: 'When is the next cohort?' },
    a: { ko: 'Semester 3 등록은 2026년 4월 30일에 마감됩니다. 다음 기수(Semester 4)는 2026년 7월 예정입니다. 이번 기수를 놓치면 약 2개월을 기다려야 합니다.', en: 'Semester 3 registration closes April 30, 2026. The next cohort (Semester 4) is planned for July 2026. If you miss this one, you\'ll wait about 2 months.' },
  },
]

export default function FAQ() {
  const { t, lang } = useLang()
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <Section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-high)]">
            {t('faq.title')}
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <button onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full ok-card px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-[var(--surface-2)] transition-colors">
                  <span className="text-[14px] font-medium text-[var(--text-high)]">{faq.q[lang] || faq.q.ko}</span>
                  <ChevronDown size={16} className={`shrink-0 text-[var(--text-low)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <div className="px-5 py-3 text-[13px] text-[var(--text-mid)] leading-relaxed bg-[var(--surface-1)] rounded-b-xl border-x border-b border-[var(--border)] -mt-1">
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
    </Section>
  )
}
