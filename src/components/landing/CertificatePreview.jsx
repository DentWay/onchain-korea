import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import Section from './Section'

export default function CertificatePreview() {
  return (
    <Section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* BG */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-[#0f2847] to-navy-700" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="relative p-12 md:p-16 text-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <Award size={40} className="mx-auto mb-6 text-accent/60" />
            </motion.div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/25 mb-4">Certificate of Completion</p>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">온체인 수료증</h3>
            <p className="text-[14px] text-white/40 max-w-md mx-auto leading-relaxed">
              레슨 80% 이상 + 온체인 액션 3개 + 히든 토픽 2개 완료 시<br />
              블록체인에 영구 기록되는 수료증을 발급합니다.
            </p>
            <div className="mt-8 flex items-center justify-center gap-6 text-[12px] text-white/25">
              <span className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-accent/40" />
                Solana 기반
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-cyan-400/40" />
                영구 기록
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-400/40" />
                링크드인 공유
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
