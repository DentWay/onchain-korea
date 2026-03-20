import { motion } from 'framer-motion'
import Section from './Section'
import Counter from './Counter'

const stats = [
  { value: 4, suffix: '주', label: '커리큘럼', sub: '단계별 학습' },
  { value: 16, suffix: '개', label: '레슨', sub: '이론 + 실습' },
  { value: 10, suffix: '개', label: '온체인 실습', sub: '직접 해보기' },
  { value: 100, suffix: '%', label: '무료', sub: '비용 없음' },
]

export default function Stats() {
  return (
    <Section className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05]"
            >
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 text-transparent bg-clip-text">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-[13px] text-white/40 mt-1">{s.label}</p>
              <p className="text-[11px] text-accent/60 mt-0.5">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
