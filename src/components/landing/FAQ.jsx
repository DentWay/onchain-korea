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
    a: { ko: '주당 2~3시간이면 충분합니다. 레슨 읽기 30분 + 실습 30분 정도로, 모바일에서도 진행할 수 있습니다. 다만 Week 1 시드 문구 백업 실습 시에는 종이와 펜을 준비해주세요.', en: 'About 2-3 hours per week is enough. Around 30 minutes for reading + 30 minutes for practice. The course is mobile-friendly, but please have pen and paper ready for the seed phrase backup practice in Week 1.' },
  },
  {
    q: { ko: '실습에 돈이 드나요?', en: 'Does the practice cost money?' },
    a: { ko: 'Week 1~2는 비용 없이 진행됩니다. Week 3부터 DEX 스왑, NFT 민팅 등 온체인 액션에 소액의 네트워크 수수료가 필요합니다. SOL 0.1개(약 2,000원)이면 모든 실습을 완료할 수 있습니다. SOL은 업비트 등 한국 거래소에서 구매 후 Phantom 지갑으로 전송하면 되며, 해당 방법은 Week 1 실습 가이드에서 안내합니다.', en: 'Weeks 1-2 are completely free. From Week 3, on-chain actions (DEX swap, NFT minting) require small network fees. About 0.1 SOL (~$2) is enough for all practices. You can buy SOL on a Korean exchange like Upbit and send it to your Phantom wallet — we guide you through this in the Week 1 practice guide.' },
  },
  {
    q: { ko: '수료증은 어떻게 받나요?', en: 'How do I get the certificate?' },
    a: { ko: '레슨 80% 이상 완료 + 온체인 액션 3개 인증 + 히든 토픽 2개 참여하면 수료 자격이 주어집니다. 참여 인증서(Proof of Attendance)가 Solana 블록체인에 기록되는 NFT로 발급되며, LinkedIn에 공유할 수 있습니다. 공식 자격증이 아닌, 학습 참여를 온체인으로 증명하는 인증서입니다.', en: 'Complete 80%+ lessons + verify 3 on-chain actions + participate in 2 hidden topics. You receive a Proof of Attendance (PoA) issued as an NFT on Solana blockchain, shareable on LinkedIn. This is not an official certification — it\'s on-chain proof that you completed the learning program.' },
  },
  {
    q: { ko: '다음 기수는 언제인가요? Semester가 뭔가요?', en: 'When is the next cohort? What does Semester mean?' },
    a: { ko: 'Semester는 Greed Academy의 기수 시스템입니다. 현재 3기(Semester 3) 등록이 2026년 4월 30일에 마감됩니다. 다음 기수인 4기(Semester 4)는 2026년 7월 예정입니다. 같은 기수 수강생끼리 카카오톡에서 함께 학습하기 때문에, 이번 기수를 놓치면 약 2개월을 기다려야 합니다.', en: '"Semester" refers to the Greed Academy cohort system — each cohort learns together as a group. Semester 3 registration closes April 30, 2026. The next cohort (Semester 4) is planned for July 2026. Since each cohort studies together via KakaoTalk, missing this one means waiting about 2 months.' },
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
