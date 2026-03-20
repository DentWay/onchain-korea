import { motion } from 'framer-motion'
import { Shield, Search, Coins, ArrowRightLeft } from 'lucide-react'
import Section from './Section'

const weeks = [
  {
    num: 1, title: '지갑 + 보안', icon: Shield, color: 'from-blue-500 to-cyan-400',
    desc: '지갑 만들기부터 시드 문구 백업, 버너 지갑까지',
    actions: ['Phantom 지갑 설치', '버너 지갑 만들기', '시드 문구 백업'],
  },
  {
    num: 2, title: '온체인 탐색 + DYOR', icon: Search, color: 'from-emerald-500 to-teal-400',
    desc: '트랜잭션 읽기, 스캠 식별, 프로젝트 리서치',
    actions: ['Solscan 트랜잭션 추적', '스캠 프로젝트 분석'],
  },
  {
    num: 3, title: 'DeFi · NFT · 디지털 에셋', icon: Coins, color: 'from-purple-500 to-violet-400',
    desc: 'DEX 스왑, LP 전략, Metaplex Core NFT 민팅',
    actions: ['DEX 첫 스왑', 'NFT 민팅'],
  },
  {
    num: 4, title: '스테이블코인 · 브릿지 · 스테이킹', icon: ArrowRightLeft, color: 'from-amber-500 to-orange-400',
    desc: '크로스체인 전송, SOL 스테이킹, 거버넌스 참여',
    actions: ['스테이블코인 전송', 'deBridge 브릿지', 'SOL 스테이킹'],
  },
]

export default function Curriculum() {
  return (
    <Section className="py-24 px-6" id="curriculum">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[11px] text-accent font-semibold uppercase tracking-[0.2em]">Curriculum</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight">4주 완성 로드맵</h2>
          <p className="text-[15px] text-white/35 mt-3">매주 레슨 + 실습 + 히든 토픽. 단계별로 쌓아갑니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weeks.map((week, i) => {
            const Icon = week.icon
            return (
              <motion.div
                key={week.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] text-white/20 font-mono tracking-widest">WEEK {week.num}</span>
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${week.color} flex items-center justify-center shadow-lg`}>
                    <Icon size={16} className="text-white" />
                  </div>
                </div>

                <h3 className="text-[16px] font-semibold mb-1.5">{week.title}</h3>
                <p className="text-[13px] text-white/35 leading-relaxed">{week.desc}</p>

                <div className="flex flex-wrap gap-1.5 mt-5">
                  {week.actions.map((action) => (
                    <span key={action} className="text-[10px] px-2.5 py-1 rounded-md bg-white/[0.04] text-white/40">
                      {action}
                    </span>
                  ))}
                </div>

                <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r ${week.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
