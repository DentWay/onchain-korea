import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Zap, Flame, MessageCircle, Trophy } from 'lucide-react'
import { userProgress } from '../data/curriculum'

const navItems = [
  { label: '학습', items: [
    { to: '/dashboard', icon: LayoutDashboard, text: '대시보드' },
    { to: '/week/1', icon: BookOpen, text: '이번 주 수업' },
    { to: '/action/burner-wallet', icon: Zap, text: '실습 가이드', badge: 'new', badgeColor: 'bg-accent/60' },
    { to: '/hidden', icon: Flame, text: '히든 토픽', badge: 'HOT', badgeColor: 'bg-hot/70' },
  ]},
  { label: '소통', items: [
    { to: '/community', icon: MessageCircle, text: '커뮤니티' },
    { to: '/certificate', icon: Trophy, text: '수료증' },
  ]},
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-[220px] bg-navy-900 text-white flex flex-col p-3 shrink-0">
      <div className="px-1 mb-1">
        <h1 className="text-xl font-semibold tracking-tight">Onchain Korea</h1>
        <p className="text-[9px] text-white/30 mt-0.5">블록체인, 처음부터 안전하게</p>
      </div>

      <nav className="mt-4 flex-1">
        {navItems.map((group) => (
          <div key={group.label}>
            <p className="text-[9px] text-white/25 uppercase tracking-widest px-2 mt-4 mb-1">
              {group.label}
            </p>
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.to ||
                (item.to.startsWith('/week') && location.pathname.startsWith('/week')) ||
                (item.to.startsWith('/action') && location.pathname.startsWith('/action'))

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 px-2.5 py-[7px] rounded-md text-[12px] mb-0.5 transition-all
                    ${isActive
                      ? 'bg-accent/20 border-l-[2.5px] border-accent'
                      : 'hover:bg-white/[0.06] border-l-[2.5px] border-transparent'
                    }`}
                >
                  <Icon size={15} className="opacity-60" />
                  <span>{item.text}</span>
                  {item.badge && (
                    <span className={`ml-auto text-[8px] px-1.5 py-[1px] rounded-full font-medium ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-white/[0.06] pt-2 mt-2">
        <div className="flex items-center gap-2 px-2.5 py-1.5">
          <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-[9px] font-medium">
            {userProgress.name[0]}L
          </div>
          <div>
            <p className="text-[11px]">{userProgress.name} Lee</p>
            <p className="text-[9px] text-white/35">Week {userProgress.currentWeek} 진행 중</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
