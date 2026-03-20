import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Section from './Section'

export default function FinalCTA() {
  return (
    <Section className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/10 rounded-full blur-[120px]" />

      <div className="relative max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          4주 뒤,<br />
          <span className="bg-gradient-to-r from-accent to-cyan-400 text-transparent bg-clip-text">
            온체인이 익숙해집니다
          </span>
        </h2>
        <p className="text-[15px] text-white/35 mt-4">
          지갑 만들기부터 스테이킹까지. 완전 무료, 한국어로.
        </p>
        <Link
          to="/dashboard"
          className="group inline-flex items-center gap-2 mt-10 px-8 py-3.5 rounded-full bg-white text-[#0a0f1e] text-[16px] font-semibold hover:shadow-[0_0_40px_rgba(74,144,217,0.3)] transition-all"
        >
          무료로 시작하기
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <p className="mt-5 text-[12px] text-white/20">
          가입 없이 바로 시작할 수 있어요
        </p>
      </div>
    </Section>
  )
}
