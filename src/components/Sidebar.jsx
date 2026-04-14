import { NavLink, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Zap, Flame, MessageCircle, Trophy, X, LogOut, LockKeyhole, Shield, UserCircle2, BarChart3, Gauge } from 'lucide-react'
import BrandLockup from './brand/BrandLockup'
import useProgress from '../hooks/useProgress'
import useAuth from '../hooks/useAuth'
import useLang from '../hooks/useLang'
import { ADMIN_ACCESS_PATH, ADMIN_CONSOLE_PATH, ADMIN_ENTRY_PATH } from '../lib/adminRoute'

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

export default function Sidebar({ onClose }) {
  const location = useLocation()
  const { activeWeek, overallProgress } = useProgress()
  const { user, profile, isAdmin, canAccessAdminGate, adminAccessGranted, signOut, lockAdminAccess, supabaseEnabled } = useAuth()
  const { t, lang } = useLang()

  const displayName = profile?.display_name || user?.email?.split('@')[0] || ''
  const currentPath = `${location.pathname}${location.search}`
  const isAdminRoute = location.pathname.startsWith(ADMIN_ENTRY_PATH)
  const isAdminConsole = location.pathname.startsWith(ADMIN_CONSOLE_PATH) && isAdmin && adminAccessGranted
  const isAdminWorkspace = isAdminRoute && canAccessAdminGate
  const handleSignOut = async () => {
    onClose?.()
    await signOut()
  }
  const handleLockAdmin = () => {
    onClose?.()
    void lockAdminAccess()
  }

  const learnerNavItems = [
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

  const defaultNavItems = [...learnerNavItems]

  if (canAccessAdminGate) {
    defaultNavItems.push({
      label: t('sidebar.adminLabel'),
      items: [
        { href: ADMIN_ACCESS_PATH, icon: Shield, text: t('sidebar.admin'), matchPrefix: ADMIN_ENTRY_PATH },
      ],
    })
  }

  const adminGateNavItems = [
    {
      label: pick(lang, '운영', 'Admin'),
      items: [
        { to: ADMIN_ENTRY_PATH, icon: Shield, text: pick(lang, '관리자 입구', 'Admin Entry') },
        { to: ADMIN_ACCESS_PATH, icon: LockKeyhole, text: pick(lang, '잠금 해제', 'Unlock Access') },
        ...(adminAccessGranted ? [{ to: `${ADMIN_CONSOLE_PATH}?view=overview`, icon: Gauge, text: pick(lang, '운영 개요', 'Ops Overview') }] : []),
      ],
    },
    {
      label: pick(lang, '바로가기', 'Quick Links'),
      items: [
        { to: '/dashboard', icon: BookOpen, text: pick(lang, '학습자 화면', 'Learner App') },
        { to: '/settings', icon: UserCircle2, text: pick(lang, '내 정보', 'My Account'), matchPrefix: '/settings' },
      ],
    },
  ]

  const adminConsoleNavItems = [
    {
      label: pick(lang, '운영 개요', 'Operations'),
      items: [
        { to: `${ADMIN_CONSOLE_PATH}?view=overview`, icon: Gauge, text: pick(lang, '운영 개요', 'Overview') },
        { to: `${ADMIN_CONSOLE_PATH}?view=interventions`, icon: Shield, text: pick(lang, '개입 보드', 'Interventions') },
        { to: `${ADMIN_CONSOLE_PATH}?view=content`, icon: BookOpen, text: pick(lang, '콘텐츠 검수', 'Content Audit') },
        { to: `${ADMIN_CONSOLE_PATH}?view=analytics`, icon: BarChart3, text: pick(lang, '학습 분석', 'Analytics') },
        { to: `${ADMIN_CONSOLE_PATH}?view=leaderboard`, icon: Trophy, text: pick(lang, '학습자 랭킹', 'Leaderboard') },
      ],
    },
    {
      label: pick(lang, '워크스페이스', 'Workspace'),
      items: [
        { to: '/dashboard', icon: BookOpen, text: pick(lang, '학습자 화면 보기', 'View Learner App') },
        { to: '/settings', icon: UserCircle2, text: pick(lang, '내 정보', 'My Account'), matchPrefix: '/settings' },
      ],
    },
  ]

  const navItems = isAdminConsole
    ? adminConsoleNavItems
    : isAdminWorkspace
      ? adminGateNavItems
      : defaultNavItems

  const sidebarTagline = isAdminConsole
    ? pick(lang, '운영 데이터와 학습 상태를 관리합니다', 'Manage operations and learner state')
    : isAdminWorkspace
      ? pick(lang, '관리자 전용 진입 경로입니다', 'Restricted path for operators')
      : t('sidebar.tagline')

  return (
    <aside className="w-[236px] h-screen bg-white text-[#101114] flex flex-col p-3 shrink-0 border-r border-[#dedee5]">
      <div className="px-1 mb-2 flex items-start justify-between">
        <div>
          <Link to="/" className="block hover:opacity-80 transition-opacity">
            <BrandLockup surface="light" className="origin-left scale-[0.82]" />
          </Link>
          <div className="flex items-center gap-1.5 mt-2">
            <p className="text-[10px] text-[#9497a9]">{sidebarTagline}</p>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close menu / 메뉴 닫기" className="md:hidden p-1 rounded-lg hover:bg-[#f7f7f8] transition-colors mt-0.5">
          <X size={16} className="text-[#9497a9]" />
        </button>
      </div>

      <nav aria-label="Main navigation" className="mt-4 flex-1 overflow-y-auto">
        {navItems.map((group) => (
          <div key={group.label}>
            <p className="text-[9px] text-[#9497a9] uppercase tracking-[0.22em] px-2 mt-5 mb-1.5">{group.label}</p>
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = currentPath === item.to || location.pathname === item.to || (item.matchPrefix && location.pathname.startsWith(item.matchPrefix))
              const className = `flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] mb-1 transition-all ${isActive ? 'bg-[rgba(87,65,216,0.08)] text-[#5741d8]' : 'hover:bg-[#f7f7f8] text-[#686b82]'}`

              if (item.href) {
                return (
                  <a key={item.text} href={item.href} onClick={onClose} className={className}>
                    <Icon size={15} className={isActive ? 'text-[#5741d8]' : 'text-[#9497a9]'} />
                    <span>{item.text}</span>
                  </a>
                )
              }

              return (
                <NavLink key={item.text} to={item.to} onClick={onClose} className={className}>
                  <Icon size={15} className={isActive ? 'text-[#5741d8]' : 'text-[#9497a9]'} />
                  <span>{item.text}</span>
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-[#dedee5] pt-3 mt-2">
        <div className="px-2 py-1">
          {isAdminWorkspace ? (
            <>
              <div className="rounded-2xl border border-[#dedee5] bg-[#f7f7f8] px-3 py-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#9497a9]">{pick(lang, '관리자 세션', 'Admin Session')}</p>
                <p className="mt-1 text-[12px] font-semibold text-[#101114]">
                  {adminAccessGranted ? pick(lang, '운영 콘솔 사용 가능', 'Console unlocked') : pick(lang, '관리자 잠금 상태', 'Console locked')}
                </p>
                <p className="mt-1 text-[10px] text-[#686b82]">{displayName || user?.email || '-'}</p>
              </div>
              {supabaseEnabled && user && (
                <div className="pt-3 mt-3 border-t border-[#dedee5]">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 mr-2">
                      <span className="text-[11px] text-[#686b82] truncate block">{displayName}</span>
                      {isAdmin && <span className="text-[10px] text-[#5741d8]">Admin</span>}
                    </div>
                    <button type="button" onClick={handleSignOut} className="inline-flex items-center gap-1.5 text-[#9497a9] hover:text-[#686b82] transition-colors shrink-0" title={t('auth.signOut')} aria-label={t('auth.signOut')}>
                      <LogOut size={14} />
                      <span className="text-[11px]">{t('auth.signOut')}</span>
                    </button>
                  </div>
                  {isAdmin && adminAccessGranted && (
                    <button
                      type="button"
                      onClick={handleLockAdmin}
                      className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-[#9497a9] hover:text-[#686b82] transition-colors"
                    >
                      <LockKeyhole size={13} />
                      <span>{pick(lang, '관리자 잠금', 'Lock Admin')}</span>
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] text-[#9497a9]">{t('sidebar.progress')}</p>
                <p className="text-[10px] text-[#5741d8] font-semibold tabular-nums">{overallProgress}%</p>
              </div>
              <div className="h-1.5 rounded-full bg-[#eef0f3] overflow-hidden"><div className="h-full rounded-full bg-[#5741d8] transition-all duration-500" style={{ width: `${overallProgress}%` }} /></div>
              <p className="text-[10px] text-[#9497a9] mt-2">{t('common.week')} {activeWeek} {t('sidebar.weekProgress')}</p>
              {supabaseEnabled && user && (
                <div className="pt-3 mt-3 border-t border-[#dedee5]">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 mr-2">
                      <span className="text-[11px] text-[#686b82] truncate block">{displayName}</span>
                      {isAdmin && <span className="text-[10px] text-[#5741d8]">Admin</span>}
                    </div>
                    <button type="button" onClick={handleSignOut} className="inline-flex items-center gap-1.5 text-[#9497a9] hover:text-[#686b82] transition-colors shrink-0" title={t('auth.signOut')} aria-label={t('auth.signOut')}>
                      <LogOut size={14} />
                      <span className="text-[11px]">{t('auth.signOut')}</span>
                    </button>
                  </div>
                  {isAdmin && adminAccessGranted && (
                    <button
                      type="button"
                      onClick={handleLockAdmin}
                      className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-[#9497a9] hover:text-[#686b82] transition-colors"
                    >
                      <LockKeyhole size={13} />
                      <span>{pick(lang, '관리자 잠금', 'Lock Admin')}</span>
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
