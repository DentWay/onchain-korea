import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { weeks, actionGuides } from '../data/curriculum'

const dotClass = {
  done: 'bg-emerald-500',
  current: 'bg-blue-500',
  locked: 'bg-gray-200',
}

export default function WeekDetail() {
  const { weekId } = useParams()
  const week = weeks.find(w => w.id === Number(weekId)) || weeks[0]

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg font-semibold text-gray-900">
          Week {week.id}: {week.title}
        </h1>
        <Link to="/dashboard" className="text-[11px] text-blue-600 flex items-center gap-1 hover:underline">
          <ArrowLeft size={12} /> 대시보드
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-5">
        <div className="bg-gray-50 rounded-lg p-3.5">
          <p className="text-[10px] text-gray-500">학습 진행률</p>
          <p className="text-xl font-semibold text-gray-900">{week.progress}%</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3.5">
          <p className="text-[10px] text-gray-500">온체인 액션</p>
          <p className="text-xl font-semibold text-gray-900">
            {week.actions.filter(a => a.status === 'done').length}/{week.actions.length} 완료
          </p>
        </div>
      </div>

      <h2 className="text-sm font-medium text-gray-900 mb-2">📖 학습 콘텐츠 (Greed Academy 기반)</h2>
      <div className="border rounded-lg overflow-hidden mb-5">
        {week.lessons.map((lesson, i) => (
          <div
            key={lesson.id}
            className={`flex items-center gap-2.5 px-3 py-2 text-[12px] ${
              i < week.lessons.length - 1 ? 'border-b' : ''
            } ${lesson.status === 'current' ? 'bg-blue-50/40' : ''}`}
          >
            <div className={`w-[7px] h-[7px] rounded-full shrink-0 ${dotClass[lesson.status]}`} />
            <span className={`flex-1 text-gray-900 ${lesson.status === 'current' ? 'font-medium' : ''}`}>
              {lesson.title}
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 shrink-0">
              {lesson.source}
            </span>
            {lesson.status === 'done' && (
              <span className="text-[10px] text-emerald-600 shrink-0">✓</span>
            )}
            {lesson.status === 'current' && (() => {
              const guide = actionGuides.find(g => g.weekId === week.id)
              return guide ? (
                <Link to={`/action/${guide.id}`} className="text-[10px] text-blue-600 font-medium shrink-0 hover:underline">
                  시작 →
                </Link>
              ) : null
            })()}
          </div>
        ))}
      </div>

      <h2 className="text-sm font-medium text-gray-900 mb-2">⚡ 이번 주 실습 (Action Guide)</h2>
      <div className="border rounded-lg overflow-hidden mb-5">
        {week.actions.map((action, i) => (
          <div
            key={action.id}
            className={`flex items-center gap-2.5 px-3 py-2 text-[12px] ${
              i < week.actions.length - 1 ? 'border-b' : ''
            } ${action.status === 'current' ? 'bg-blue-50/40' : ''}`}
          >
            <div className={`w-[7px] h-[7px] rounded-full shrink-0 ${dotClass[action.status]}`} />
            <span className={`flex-1 text-gray-900 ${action.status === 'current' ? 'font-medium' : ''}`}>
              {action.title}
            </span>
            {action.status === 'done' && <span className="text-[10px] text-emerald-600">완료 ✓</span>}
            {action.status === 'current' && (() => {
              const guide = actionGuides.find(g => g.weekId === week.id && g.title.includes(action.title.split(' ')[0]))
                || actionGuides.find(g => g.weekId === week.id)
              return guide ? (
                <Link to={`/action/${guide.id}`} className="text-[10px] text-blue-600 font-medium hover:underline">
                  가이드 →
                </Link>
              ) : null
            })()}
          </div>
        ))}
      </div>

      {week.hiddenTopic && (
        <>
          <h2 className="text-sm font-medium text-gray-900 mb-2">🔥 히든 토픽</h2>
          <Link
            to="/hidden"
            className="block bg-gradient-to-r from-pink-50/60 to-blue-50/60 border border-pink-200/40 rounded-lg p-3.5 hover:border-pink-300/60 transition-all"
          >
            <p className="text-[9px] text-pink-600 uppercase tracking-wider font-medium mb-1">이번 주 핫이슈</p>
            <p className="text-[13px] font-medium text-gray-900">{week.hiddenTopic.title}</p>
            <div className="flex gap-3 mt-2 text-[10px] text-gray-500">
              <span>📖 {week.hiddenTopic.readTime}</span>
              <span>💬 {week.hiddenTopic.forumCount}명 참여</span>
              <span>⚡ {week.hiddenTopic.action}</span>
            </div>
          </Link>
        </>
      )}
    </div>
  )
}
