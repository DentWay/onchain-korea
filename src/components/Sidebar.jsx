import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Zap, Flame, MessageCircle, Trophy, X, LogOut } from 'lucide-react'
import useProgress from '../hooks/useProgress'
import useAuth from '../hooks/useAuth'
import useLang from '../hooks/useLang'

export default function Sidebar({ onClose }) {
  const location = useLocation()
  const { activeWeek, overallProgress } = useProgress()
  const { user, profile, signOut, supabaseEnabled } = useAuth()
  const { t } = useLang()

  const displayName = profile?.display_name || user?.email?.split('@')[0] || ''

  const navItems = [
    { label: t('sidebar.learning'), items: [
      { to: '/dashboard', icon: LayoutDashboard, text: t('sidebar.dashboard') },
      { to: `/week/${activeWeek}`, icon: BookOpen, text: t('sidebar.thisWeek'), matchPrefix: '/week' },
      { to: '/action/phantom-setup', icon: Zap, text: t('sidebar.actionGuide'), matchPrefix: '/action' },
      { to: '/hidden', icon: Flame, text: t('sidebar.hiddenTopics') },
    ]},
    { label: t('sidebar.community_label'), items: [
      { to: '/community', icon: MessageCircle, text: t('sidebar.community') },
      { to: '/certificate', icon: Trophy, text: t('sidebar.certificate') },
    ]},
  ]

  return (
    <aside className="w-[220px] h-screen bg-[var(--surface-1)] text-[var(--text-high)] flex flex-col p-3 shrink-0 border-r border-[var(--border)]">
      <div className="px-1 mb-1 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white text-[10px] font-bold tracking-tight">OK</span>
            </div>
            <div>
              <h1 className="text-[15px] font-semibold tracking-tight">Onchain Korea</h1>
            </div>
          </div>
          <p className="text-[9px] text-[var(--text-low)] mt-1.5">{t('sidebar.tagline')}</p>
        </div>
        <button onClick={onClose} aria-label="메뉴 닫기" className="md:hidden p-1 rounded-lg hover:bg-[var(--surface-2)] transition-colors mt-0.5">
          <X size={16} className="text-[var(--text-low)]" />
        </button>
      </div>

      <nav aria-label="Main navigation" className="mt-4 flex-1 overflow-y-auto">
        {navItems.map((group) => (
          <div key={group.label}>
            <p className="text-[9px] text-[var(--text-low)] uppercase tracking-widest px-2 mt-4 mb-1">{group.label}</p>
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.to || (item.matchPrefix && location.pathname.startsWith(item.matchPrefix))
              return (
                <NavLink key={item.text} to={item.to} onClick={onClose}
                  className={`flex items-center gap-2 px-2.5 py-[7px] rounded-md text-[12px] mb-0.5 transition-all ${isActive ? 'bg-[var(--accent-surface)] text-[var(--text-high)]' : 'hover:bg-[var(--surface-2)] text-[var(--text-mid)]'}`}>
                  <Icon size={15} className={isActive ? 'text-accent-soft' : 'text-[var(--text-low)]'} />
                  <span>{item.text}</span>
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-[var(--border)] pt-3 mt-2">
        <div className="px-2.5 py-1.5">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] text-[var(--text-low)]">{t('sidebar.progress')}</p>
            <p className="text-[10px] text-accent-soft font-semibold ok-tabular-nums">{overallProgress}%</p>
          </div>
          <div className="ok-progress-track"><div className="ok-progress-fill" style={{ width: `${overallProgress}%` }} /></div>
          <p className="text-[9px] text-[var(--text-low)] mt-1.5">Week {activeWeek} {t('sidebar.weekProgress')}</p>
        </div>
        {supabaseEnabled && user && (
          <div className="px-2.5 pt-2 mt-1 border-t border-[var(--border)] flex items-center justify-between">
            <span className="text-[11px] text-[var(--text-mid)] truncate mr-2">{displayName}</span>
            <button onClick={signOut} className="text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors shrink-0" title={t('auth.signOut')}>
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
