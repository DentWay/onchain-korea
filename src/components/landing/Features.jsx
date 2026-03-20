import { motion } from 'framer-motion'
import { Zap, Flame, Award, Users } from 'lucide-react'
import Section from './Section'

const features = [
  { icon: Zap, title: '직접 해보는 실습', desc: '매주 실제 온체인 액션을 수행합니다. 읽기만 하는 교육은 끝.', tag: '10개 실습' },
  { icon: Flame, title: '히든 토픽', desc: '한국 시장에 맞는 주간 핫토픽. 스테이블코인부터 한국 거래소 비교까지.', tag: '매주 공개' },
  { icon: Award, title: '온체인 수료증', desc: '블록체인에 영구 기록되는 수료증. 링크드인에 공유할 수 있어요.', tag: 'Solana 기반' },
  { icon: Users, title: '카카오톡 커뮤니티', desc: '같이 배우는 동기들과 카카오톡으로 소통. 졸업 후 스터디 그룹까지.', tag: '네트워크' },
]

export default function Features() {
  return (
    <Section className="py-24 px-6" id="features">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[11px] text-accent font-semibold uppercase tracking-[0.2em]">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight">읽기만 하는 교육은 끝</h2>
          <p className="text-[15px] text-white/35 mt-3">직접 해봐야 내 것이 됩니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-accent/20 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon size={18} className="text-accent" />
                </div>
                <h3 className="text-[16px] font-semibold">{f.title}</h3>
                <p className="text-[13px] text-white/35 mt-2 leading-relaxed">{f.desc}</p>
                <span className="inline-block mt-4 text-[11px] px-3 py-1 rounded-full bg-accent/10 text-accent/80 font-medium">
                  {f.tag}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
