import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import Section from './Section'
import useLang from '../../hooks/useLang'

const testimonials = [
  {
    name: { ko: '김민수', en: 'Minsu K.' },
    role: { ko: 'Week 4 수료', en: 'Week 4 Graduate' },
    quote: { ko: '처음에 사기가 걱정됐는데, 버너 지갑부터 만들라고 해서 안심하고 시작했어요. 4주 뒤에 혼자 DeFi까지 하고 있네요.', en: 'I was worried about scams at first, but they told me to start with a burner wallet. 4 weeks later, I\'m doing DeFi on my own.' },
  },
  {
    name: { ko: '이서연', en: 'Seoyeon L.' },
    role: { ko: '대학생, Week 3 진행 중', en: 'Student, Week 3 in progress' },
    quote: { ko: '유튜브로 독학하다 포기했었는데, 여기는 매주 뭘 해야하는지 딱 정해져 있어서 좋아요. 카카오톡에서 질문하면 바로 답변도 해줘요.', en: 'I gave up self-studying on YouTube, but here everything is laid out week by week. Questions in KakaoTalk get answered right away.' },
  },
  {
    name: { ko: '박준혁', en: 'Junhyuk P.' },
    role: { ko: '직장인, 수료 완료', en: 'Office worker, Graduated' },
    quote: { ko: '매일 30분씩 출퇴근 시간에 했어요. 온체인 수료증 받고 링크드인에 올렸더니 반응이 좋았습니다.', en: '30 minutes during my commute each day. Got the on-chain certificate and posted on LinkedIn — great response.' },
  },
]

export default function Testimonials() {
  const { t, lang } = useLang()

  return (
    <Section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="ok-section-label">{t('testimonials.label')}</span>
          <h2 className="text-[40px] md:text-[56px] font-bold mt-4 tracking-tight text-[var(--text-high)]">
            {t('testimonials.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="ok-card p-7 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <Quote size={20} className="text-accent/30 mb-4" />
                <p className="text-[14px] text-[var(--text-mid)] leading-relaxed">
                  {item.quote[lang] || item.quote.ko}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-[var(--border)]">
                <div className="w-9 h-9 rounded-full bg-[var(--surface-2)] flex items-center justify-center">
                  <span className="text-[11px] font-bold text-[var(--text-mid)]">{(item.name[lang] || item.name.ko)[0]}</span>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[var(--text-high)]">{item.name[lang] || item.name.ko}</p>
                  <p className="text-[11px] text-[var(--text-low)]">{item.role[lang] || item.role.ko}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
