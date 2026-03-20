import { Link } from 'react-router-dom'
import { Shield, Search, Coins, ArrowRightLeft, ChevronRight, Award, Users, Flame, Zap } from 'lucide-react'

const weeks = [
  {
    num: 1,
    title: '지갑 + 보안',
    desc: '지갑 만들기부터 시드 문구 백업, 버너 지갑까지',
    icon: Shield,
    color: 'from-blue-500 to-blue-600',
    actions: ['Phantom 지갑 설치', '버너 지갑 만들기', '시드 문구 백업'],
  },
  {
    num: 2,
    title: '온체인 탐색 + DYOR',
    desc: '트랜잭션 읽기, 스캠 식별, 프로젝트 리서치',
    icon: Search,
    color: 'from-emerald-500 to-emerald-600',
    actions: ['Solscan 트랜잭션 추적', '스캠 프로젝트 분석'],
  },
  {
    num: 3,
    title: 'DeFi · NFT · 디지털 에셋',
    desc: 'DEX 스왑, LP 전략, Metaplex Core NFT 민팅',
    icon: Coins,
    color: 'from-purple-500 to-purple-600',
    actions: ['DEX 첫 스왑', 'NFT 민팅'],
  },
  {
    num: 4,
    title: '스테이블코인 · 브릿지 · 스테이킹',
    desc: '크로스체인 전송, SOL 스테이킹, 거버넌스 참여',
    icon: ArrowRightLeft,
    color: 'from-amber-500 to-amber-600',
    actions: ['스테이블코인 전송', 'deBridge 브릿지', 'SOL 스테이킹'],
  },
]

const features = [
  {
    icon: Zap,
    title: '직접 해보는 실습',
    desc: '읽기만 하면 잊어요. 매주 실제 온체인 액션을 수행합니다.',
    highlight: '10개 실습 과제',
  },
  {
    icon: Flame,
    title: '히든 토픽',
    desc: '한국 시장에 맞는 주간 핫토픽. 스테이블코인, 트럼프 정책, 한국 거래소 비교까지.',
    highlight: '매주 1개 공개',
  },
  {
    icon: Award,
    title: '온체인 수료증',
    desc: '4주 완료 시 블록체인에 기록되는 수료증. 이력서에 넣을 수 있어요.',
    highlight: '링크드인 인증',
  },
  {
    icon: Users,
    title: '카카오톡 커뮤니티',
    desc: '같이 배우는 사람들과 카카오톡으로 소통. 졸업 후 스터디 그룹까지.',
    highlight: '동기 네트워크',
  },
]

const stats = [
  { value: '4주', label: '커리큘럼' },
  { value: '16개', label: '레슨' },
  { value: '10개', label: '온체인 실습' },
  { value: '100%', label: '무료' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-navy-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold">OK</span>
            </div>
            <span className="font-semibold text-gray-900 text-[15px]">Onchain Korea</span>
          </div>
          <Link
            to="/dashboard"
            className="text-[13px] px-4 py-1.5 rounded-full bg-navy-900 text-white hover:bg-navy-800 transition-colors"
          >
            시작하기
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-medium mb-6">
            <span>Greed Academy 커리큘럼 기반</span>
          </div>
          <h1 className="text-[40px] leading-[1.2] font-bold text-gray-900 tracking-tight">
            블록체인,<br />
            <span className="text-accent">4주면 충분합니다</span>
          </h1>
          <p className="mt-5 text-[16px] text-gray-500 leading-relaxed max-w-lg mx-auto">
            지갑 만들기부터 DeFi, NFT, 크로스체인까지.<br />
            읽기만 하는 교육은 그만 — 매주 직접 온체인에서 실습합니다.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="px-6 py-2.5 rounded-full bg-navy-900 text-white text-[14px] font-medium hover:bg-navy-800 transition-colors"
            >
              무료로 시작하기
            </Link>
            <a
              href="#curriculum"
              className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-600 text-[14px] font-medium hover:border-gray-300 transition-colors"
            >
              커리큘럼 살펴보기
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-3xl mx-auto px-6 py-6 grid grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] text-accent font-semibold uppercase tracking-widest mb-2">Curriculum</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">4주 완성 커리큘럼</h2>
          <p className="text-[14px] text-gray-500 mb-10">매주 레슨 + 실습 + 히든 토픽. 단계별로 쌓아갑니다.</p>

          <div className="space-y-3">
            {weeks.map((week) => {
              const Icon = week.icon
              return (
                <div key={week.num} className="border border-gray-150 rounded-xl p-5 hover:border-gray-300 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${week.color} flex items-center justify-center shrink-0`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-gray-400 font-medium">WEEK {week.num}</span>
                      </div>
                      <h3 className="text-[15px] font-semibold text-gray-900">{week.title}</h3>
                      <p className="text-[13px] text-gray-500 mt-0.5">{week.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {week.actions.map((action) => (
                          <span key={action} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 mt-2 group-hover:text-gray-400 transition-colors shrink-0" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50/70">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] text-accent font-semibold uppercase tracking-widest mb-2">Features</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">읽기만 하는 교육은 끝</h2>
          <p className="text-[14px] text-gray-500 mb-10">직접 해봐야 내 것이 됩니다.</p>

          <div className="grid grid-cols-2 gap-3">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="bg-white border border-gray-100 rounded-xl p-5">
                  <div className="w-9 h-9 rounded-lg bg-navy-900/5 flex items-center justify-center mb-3">
                    <Icon size={17} className="text-navy-900" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-gray-900">{f.title}</h3>
                  <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">{f.desc}</p>
                  <span className="inline-block mt-3 text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                    {f.highlight}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certificate Preview */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-navy-900 to-navy-700 rounded-2xl p-10 text-center text-white">
            <Award size={32} className="mx-auto mb-4 opacity-60" />
            <p className="text-[11px] uppercase tracking-widest text-white/40 mb-3">Certificate of Completion</p>
            <h3 className="text-xl font-semibold mb-2">온체인 수료증</h3>
            <p className="text-[13px] text-white/60 max-w-md mx-auto leading-relaxed">
              레슨 80% 이상 + 온체인 액션 3개 + 히든 토픽 2개 완료 시<br />
              블록체인에 영구 기록되는 수료증을 발급합니다.
            </p>
            <div className="mt-6 inline-flex items-center gap-4 text-[11px] text-white/40">
              <span>Solana 기반</span>
              <span>·</span>
              <span>영구 기록</span>
              <span>·</span>
              <span>링크드인 공유 가능</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 border-t border-gray-100">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            4주 뒤, 온체인이 익숙해집니다
          </h2>
          <p className="text-[14px] text-gray-500 mb-8">
            지갑 만들기부터 스테이킹까지. 완전 무료, 한국어로.
          </p>
          <Link
            to="/dashboard"
            className="inline-block px-8 py-3 rounded-full bg-navy-900 text-white text-[15px] font-medium hover:bg-navy-800 transition-colors"
          >
            무료로 시작하기
          </Link>
          <p className="mt-4 text-[11px] text-gray-400">
            가입 없이 바로 시작할 수 있어요
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-navy-900 flex items-center justify-center">
              <span className="text-white text-[7px] font-bold">OK</span>
            </div>
            <span>Onchain Korea · Powered by Elixi Venture Studio</span>
          </div>
          <span>Greed Academy 커리큘럼 기반</span>
        </div>
      </footer>
    </div>
  )
}
