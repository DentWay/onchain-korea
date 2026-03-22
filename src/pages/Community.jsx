import { Link } from 'react-router-dom'
import { ArrowLeft, MessageCircle, Bell, Flame, BookOpen } from 'lucide-react'

const channels = [
  { icon: MessageCircle, title: '카카오톡 오픈채팅', desc: '실시간 질문, 이번 주 수업 논의, 스터디 모집', btn: '카카오톡 입장 →', color: 'text-yellow-600' },
  { icon: Bell, title: '주간 리마인더', desc: '매주 월요일 — 이번 주 학습 내용, 히든 토픽 미리보기', btn: '알림 설정 →', color: 'text-blue-600' },
  { icon: Flame, title: '히든 토픽 포럼', desc: '매주 핫이슈 토론, 의견 공유, 투표', btn: '이번 주 포럼 →', color: 'text-pink-600', link: '/hidden' },
  { icon: BookOpen, title: '졸업생 스터디', desc: '4주 수료 후 자율 심화 스터디 그룹', locked: true, color: 'text-purple-600' },
]

export default function Community() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg font-semibold text-gray-900">💬 커뮤니티</h1>
        <Link to="/dashboard" className="text-[11px] text-blue-600 flex items-center gap-1 hover:underline">
          <ArrowLeft size={12} /> 대시보드
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {channels.map((ch) => {
          const Icon = ch.icon
          const Wrapper = ch.link ? Link : 'div'
          const wrapperProps = ch.link ? { to: ch.link } : {}

          return (
            <Wrapper
              key={ch.title}
              {...wrapperProps}
              className={`border rounded-lg p-3.5 transition-all ${
                ch.locked ? 'opacity-50' : 'hover:border-gray-300 cursor-pointer'
              }`}
            >
              <Icon size={20} className={`mb-1.5 ${ch.color}`} />
              <p className="text-[12px] font-medium text-gray-900">{ch.title}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{ch.desc}</p>
              {ch.locked ? (
                <p className="text-[10px] text-gray-400 mt-2">🔒 수료 후 오픈</p>
              ) : (
                <span className="mt-2.5 inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-600 text-white text-[10px] font-medium">
                  {ch.btn}
                </span>
              )}
            </Wrapper>
          )
        })}
      </div>

      <h2 className="text-sm font-medium text-gray-900 mb-2">📊 커뮤니티 현황</h2>
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-gray-50 rounded-lg p-3.5">
          <p className="text-[10px] text-gray-500">총 참여자</p>
          <p className="text-xl font-semibold text-gray-900">47</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3.5">
          <p className="text-[10px] text-gray-500">카톡 활성 멤버</p>
          <p className="text-xl font-semibold text-gray-900">38</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3.5">
          <p className="text-[10px] text-gray-500">이번 주 포럼 글</p>
          <p className="text-xl font-semibold text-gray-900">23</p>
        </div>
      </div>
    </div>
  )
}
