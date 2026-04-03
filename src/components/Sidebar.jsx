import { NavLink, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Zap, Flame, MessageCircle, Trophy, X, LogOut, LockKeyhole, Shield, UserCircle2 } from 'lucide-react'
import BrandLockup from './brand/BrandLockup'
import useProgress from '../hooks/useProgress'
import useAuth from '../hooks/useAuth'
import useLang from '../hooks/useLang'
import { ADMIN_ACCESS_PATH, ADMIN_ENTRY_PATH } from '../lib/adminRoute'

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

export default function Sidebar({ onClose }) {
  const location = useLocation()
  const { activeWeek, overallProgress } = useProgress()
  const { user, profile, isAdmin, canAccessAdminGate, adminAccessGranted, signOut, lockAdminAccess, supabaseEnabled } = useAuth()
  const { t, lang } = useLang()

  const displayName = profile?.display_name || user?.email?.split('@')[0] || ''
  const handleSignOut = async () => {
    onClose?.()
    await signOut()
  }
  const handleLockAdmin = () => {
    onClose?.()
    void lockAdminAccess()
  }

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
    { label: t('sidebar.accountLabel'), items: [
      { to: '/settings', icon: UserCircle2, text: t('sidebar.settings'), matchPrefix: '/settings' },
    ]},
  ]

  if (canAccessAdminGate) {
    navItems.push({
      label: t('sidebar.adminLabel'),
      items: [
        { href: ADMIN_ACCESS_PATH, icon: Shield, text: t('sidebar.admin'), matchPrefix: ADMIN_ENTRY_PATH },
      ],
    })
  }

  return (
    <aside className="w-[236px] h-screen bg-[rgba(12,13,17,0.96)] text-[var(--text-high)] flex flex-col p-3 shrink-0 border-r border-[var(--border)]">
      <div className="px-1 mb-2 flex items-start justify-between">
        <div>
          <Link to="/" className="block hover:opacity-80 transition-opacity">
            <BrandLockup surface="dark" className="origin-left scale-[0.82]" />
          </Link>
          <div className="flex items-center gap-1.5 mt-2">
            <p className="text-[10px] text-[var(--text-low)]">{t('sidebar.tagline')}</p>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close menu / 메뉴 닫기" className="md:hidden p-1 rounded-lg hover:bg-[var(--surface-2)] transition-colors mt-0.5">
          <X size={16} className="text-[var(--text-low)]" />
        </button>
      </div>

      <nav aria-label="Main navigation" className="mt-4 flex-1 overflow-y-auto">
        {navItems.map((group) => (
          <div key={group.label}>
            <p className="text-[9px] text-[var(--text-low)] uppercase tracking-[0.22em] px-2 mt-5 mb-1.5">{group.label}</p>
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.to || (item.matchPrefix && location.pathname.startsWith(item.matchPrefix))
              const className = `flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] mb-1 transition-all ${isActive ? 'bg-[rgba(59,130,246,0.12)] text-[var(--text-high)]' : 'hover:bg-[rgba(255,255,255,0.05)] text-[var(--text-mid)]'}`

              if (item.href) {
                return (
                  <a key={item.text} href={item.href} onClick={onClose} className={className}>
                    <Icon size={15} className={isActive ? 'text-accent-soft' : 'text-[var(--text-low)]'} />
                    <span>{item.text}</span>
                  </a>
                )
              }

              return (
                <NavLink key={item.text} to={item.to} onClick={onClose} className={className}>
                  <Icon size={15} className={isActive ? 'text-accent-soft' : 'text-[var(--text-low)]'} />
                  <span>{item.text}</span>
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-[var(--border)] pt-3 mt-2">
        <div className="px-2 py-1">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] text-[var(--text-low)]">{t('sidebar.progress')}</p>
            <p className="text-[10px] text-accent-soft font-semibold ok-tabular-nums">{overallProgress}%</p>
          </div>
          <div className="ok-progress-track"><div className="ok-progress-fill" style={{ width: `${overallProgress}%` }} /></div>
          <p className="text-[10px] text-[var(--text-low)] mt-2">{t('common.week')} {activeWeek} {t('sidebar.weekProgress')}</p>
          {supabaseEnabled && user && (
            <div className="pt-3 mt-3 border-t border-[var(--border)]">
              <div className="flex items-center justify-between">
                <div className="min-w-0 mr-2">
                  <span className="text-[11px] text-[var(--text-mid)] truncate block">{displayName}</span>
                  {isAdmin && <span className="text-[10px] text-[#79AFFF]">Admin</span>}
                </div>
                <button type="button" onClick={handleSignOut} className="inline-flex items-center gap-1.5 text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors shrink-0" title={t('auth.signOut')} aria-label={t('auth.signOut')}>
                  <LogOut size={14} />
                  <span className="text-[11px]">{t('auth.signOut')}</span>
                </button>
              </div>
              {isAdmin && adminAccessGranted && (
                <button
                  type="button"
                  onClick={handleLockAdmin}
                  className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors"
                >
                  <LockKeyhole size={13} />
                  <span>{pick(lang, '관리자 잠금', 'Lock Admin')}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
