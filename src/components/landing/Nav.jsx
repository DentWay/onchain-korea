import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1e]/80 backdrop-blur-xl border-b border-white/[0.04]">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-cyan-400 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold tracking-tight">OK</span>
          </div>
          <span className="font-semibold text-[15px] tracking-tight">Onchain Korea</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#curriculum" className="text-[13px] text-white/50 hover:text-white/80 transition-colors hidden sm:block">커리큘럼</a>
          <a href="#features" className="text-[13px] text-white/50 hover:text-white/80 transition-colors hidden sm:block">특징</a>
          <Link
            to="/dashboard"
            className="text-[13px] px-4 py-1.5 rounded-full bg-white text-[#0a0f1e] font-medium hover:bg-white/90 transition-colors"
          >
            시작하기
          </Link>
        </div>
      </div>
    </nav>
  )
}
