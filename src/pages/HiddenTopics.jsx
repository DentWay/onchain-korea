import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { weeks } from '../data/curriculum'

export default function HiddenTopics() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-semibold text-gray-900">🔥 히든 토픽</h1>
        <Link to="/" className="text-[11px] text-blue-600 flex items-center gap-1 hover:underline">
          <ArrowLeft size={12} /> 대시보드
        </Link>
      </div>
      <p className="text-[12px] text-gray-500 mb-5">
        매주 한국에서 가장 뜨거운 Web3 주제를 다룹니다. 포럼에서 토론하고, 관련 온체인 액션까지 해보세요.
      </p>

      {weeks.map((week, i) => {
        const ht = week.hiddenTopic
        const isOpen = week.status === 'current' || week.status === 'done'
        const opacity = isOpen ? '' : i === 1 ? 'opacity-50' : i === 2 ? 'opacity-30' : 'opacity-20'

        return (
          <div
            key={week.id}
            className={`bg-gradient-to-r from-pink-50/60 to-blue-50/60 border border-pink-200/30 rounded-lg p-4 mb-3 ${opacity} transition-all ${
              isOpen ? 'hover:border-pink-300/50 cursor-pointer' : ''
            }`}
          >
            <p className="text-[9px] text-pink-600 uppercase tracking-wider font-medium mb-1">
              Week {week.id} — {isOpen ? '공개 중' : i === 1 ? '다음 주 공개' : `${i}주 후 공개`}
            </p>
            <p className="text-[13px] font-medium text-gray-900">{ht.title}</p>

            {isOpen && ht.desc && (
              <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">{ht.desc}</p>
            )}

            <div className="flex gap-3 mt-2 text-[10px] text-gray-500">
              <span>📖 {isOpen ? ht.readTime : '예정'}</span>
              {isOpen && ht.forumCount > 0 && <span>💬 포럼 {ht.forumCount}명</span>}
              {!isOpen && <span>💬 포럼 예정</span>}
              <span>⚡ 액션: {ht.action}</span>
            </div>

            {isOpen && (
              <button className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 text-white text-[11px] font-medium hover:bg-blue-700 transition-colors">
                포럼 참여하기 →
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
