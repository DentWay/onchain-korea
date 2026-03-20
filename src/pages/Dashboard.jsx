import { Link } from 'react-router-dom'
import { weeks, userProgress } from '../data/curriculum'

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3.5">
      <p className="text-[10px] text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-900 mt-0.5">{value}</p>
      {sub && <p className="text-[10px] text-emerald-600 mt-0.5">{sub}</p>}
    </div>
  )
}

function WeekCard({ week }) {
  const isLocked = week.status === 'locked'
  const isCurrent = week.status === 'current'

  return (
    <Link
      to={isLocked ? '#' : `/week/${week.id}`}
      className={`block border rounded-lg mb-2 transition-all ${
        isLocked ? 'opacity-40 pointer-events-none' : 'hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-3 p-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
          week.status === 'done' ? 'bg-emerald-50 text-emerald-600' :
          isCurrent ? 'bg-blue-50 text-blue-600' :
          'bg-gray-100 text-gray-400'
        }`}>
          {week.id}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-gray-900 truncate">{week.title}</p>
          <p className="text-[11px] text-gray-500 truncate">{week.subtitle}</p>
        </div>
        {isCurrent && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium shrink-0">
            진행 중
          </span>
        )}
      </div>
      {isCurrent && (
        <div className="h-[2px] bg-gray-100 mx-3 mb-2.5 rounded-full">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${week.progress}%` }} />
        </div>
      )}
    </Link>
  )
}

export default function Dashboard() {
  const currentWeek = weeks.find(w => w.status === 'current')

  return (
    <div className="max-w-3xl">
      <h1 className="text-lg font-semibold text-gray-900 mb-5">
        안녕하세요, {userProgress.name}! 👋
      </h1>

      <div className="grid grid-cols-4 gap-2.5 mb-6">
        <StatCard label="진행률" value="25%" sub={`Week ${userProgress.currentWeek} / 4`} />
        <StatCard label="완료 레슨" value={`${userProgress.completedLessons}/${userProgress.totalLessons}`} sub="+3 이번 주" />
        <StatCard label="온체인 액션" value={userProgress.onchainActions} sub="지갑 생성 ✓" />
        <StatCard label="히든 토픽" value={`${userProgress.hiddenTopicsRead}/4`} sub="이번 주 공개!" />
      </div>

      <h2 className="text-sm font-medium text-gray-900 mb-2">4주 커리큘럼</h2>
      {weeks.map(week => <WeekCard key={week.id} week={week} />)}

      {currentWeek?.hiddenTopic && (
        <>
          <h2 className="text-sm font-medium text-gray-900 mt-5 mb-2">🔥 이번 주 히든 토픽</h2>
          <Link
            to="/hidden"
            className="block bg-gradient-to-r from-pink-50/60 to-blue-50/60 border border-pink-200/40 rounded-lg p-3.5 hover:border-pink-300/60 transition-all"
          >
            <p className="text-[9px] text-pink-600 uppercase tracking-wider font-medium mb-1">
              Week {currentWeek.id} hidden topic
            </p>
            <p className="text-[13px] font-medium text-gray-900">{currentWeek.hiddenTopic.title}</p>
            <div className="flex gap-3 mt-2 text-[10px] text-gray-500">
              <span>📖 {currentWeek.hiddenTopic.readTime}</span>
              <span>💬 포럼 {currentWeek.hiddenTopic.forumCount}명</span>
              <span>⚡ {currentWeek.hiddenTopic.action}</span>
            </div>
          </Link>
        </>
      )}
    </div>
  )
}
