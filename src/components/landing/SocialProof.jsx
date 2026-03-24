import { motion } from 'framer-motion'
import Section from './Section'
import Counter from './Counter'
import useLang from '../../hooks/useLang'

const partners = [
  { name: 'Solflare', amount: '50,000 USDC' },
  { name: 'Metaplex', amount: '100,000 MPLX' },
  { name: 'FlashTrade', amount: '5.5M FAF' },
  { name: 'Raydium', amount: '8,500 RAY' },
  { name: 'Realms DAOs', amount: '15,000 USDC' },
]

export default function SocialProof() {
  const { lang } = useLang()

  return (
    <Section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
          <p className="text-[11px] text-[var(--text-low)] uppercase tracking-[0.2em] mb-3">
            {lang === 'ko' ? 'Semester 2 파트너 & 리워드' : 'Semester 2 Partners & Rewards'}
          </p>
          <p className="text-4xl md:text-5xl font-bold text-[var(--text-high)] ok-tabular-nums">
            $<Counter value={120} suffix=",000+" />
          </p>
          <p className="text-[13px] text-[var(--text-low)] mt-2">
            {lang === 'ko' ? '총 리워드 풀 · SOL 스테이킹 + 레슨 완료 시 분배' : 'Total reward pool · Distributed based on SOL staking + lesson completion'}
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="ok-card flex items-center gap-2 px-4 py-2.5 rounded-xl"
            >
              <span className="text-[12px] font-medium text-[var(--text-mid)]">{p.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-surface)] text-accent-soft font-mono ok-tabular-nums">{p.amount}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
