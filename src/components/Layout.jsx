import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, LogOut, LockKeyhole, Shield, UserCircle2 } from 'lucide-react'
import Sidebar from './Sidebar'
import LangToggle from './LangToggle'
import BrandLockup from './brand/BrandLockup'
import useAuth from '../hooks/useAuth'
import useLang from '../hooks/useLang'
import { ADMIN_ACCESS_PATH, ADMIN_CONSOLE_PATH, ADMIN_ENTRY_PATH } from '../lib/adminRoute'

function getPageChrome(pathname, lang) {
  if (pathname.startsWith('/dashboard')) {
    return {
      label: lang === 'ko' ? '대시보드' : 'Dashboard',
      hint: lang === 'ko' ? '오늘의 학습을 확인해봐요' : 'Pick up the next required step',
    }
  }

  if (pathname.startsWith('/week/')) {
    return {
      label: lang === 'ko' ? '주차 학습' : 'Weekly path',
      hint: lang === 'ko' ? '아티클 → 실습 → 히든 토픽 → 테스트' : 'Article → Lab → Hidden topic → Test',
    }
  }

  if (pathname.startsWith('/lesson/')) {
    return {
      label: lang === 'ko' ? '아티클' : 'Article',
      hint: lang === 'ko' ? '퀴즈를 통과하면 다음이 열려요' : 'Pass the quiz to unlock the next article',
    }
  }

  if (pathname.startsWith('/quiz/')) {
    return {
      label: lang === 'ko' ? '퀴즈' : 'Quiz',
      hint: lang === 'ko' ? '한 문제씩 풀어봐요' : 'One question at a time',
    }
  }

  if (pathname.startsWith('/certificate')) {
    return {
      label: lang === 'ko' ? '수료 증명' : 'Certificate',
      hint: lang === 'ko' ? '남은 조건을 확인해봐요' : 'Review the remaining requirements',
    }
  }

  if (pathname.startsWith('/hidden')) {
    return {
      label: lang === 'ko' ? '히든 토픽' : 'Hidden Topic',
      hint: lang === 'ko' ? '이번 주 시장 맥락이에요' : 'This week\u2019s market context',
    }
  }

  if (pathname.startsWith('/settings')) {
    return {
      label: lang === 'ko' ? '내 정보' : 'My Account',
      hint: lang === 'ko' ? '프로필과 계정을 관리해봐요' : 'Manage your profile and account',
    }
  }

  if (pathname === ADMIN_ENTRY_PATH) {
    return {
      label: lang === 'ko' ? '관리자 입구' : 'Admin Entry',
      hint: lang === 'ko' ? '운영 콘솔 진입 조건을 먼저 확인합니다' : 'Check the requirements before opening the operations console',
    }
  }

  if (pathname.startsWith(ADMIN_ACCESS_PATH)) {
    return {
      label: lang === 'ko' ? '관리자 잠금 해제' : 'Admin Access',
      hint: lang === 'ko' ? '운영 콘솔을 열기 전에 비밀번호를 한 번 더 확인합니다' : 'Confirm the password once more before opening the console',
    }
  }

  if (pathname.startsWith(ADMIN_CONSOLE_PATH)) {
    return {
      label: lang === 'ko' ? '관리자 콘솔' : 'Admin Console',
      hint: lang === 'ko' ? '사용자 진행률과 콘텐츠 상태를 확인합니다' : 'Review learner progress and content status',
    }
  }

  return {
    label: 'OnChain Korea',
    hint: lang === 'ko' ? '하나씩 진행해봐요' : 'One step at a time',
  }
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { user, profile, isAdmin, canAccessAdminGate, adminAccessGranted, signOut, lockAdminAccess, supabaseEnabled } = useAuth()
  const { t, lang } = useLang()

  const displayName = profile?.display_name || user?.email?.split('@')[0] || ''
  const chrome = getPageChrome(location.pathname, lang)
  const handleSignOut = async () => {
    await signOut()
  }
  const handleLockAdmin = () => {
    void lockAdminAccess()
  }

  return (
    <div data-app-theme="dark" className="flex h-screen overflow-hidden bg-[var(--surface-0)] text-[var(--text-high)]">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-3 focus:bg-accent focus:text-white">Skip to content</a>
      <div className={`ok-sidebar-overlay md:hidden ${sidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(false)} />
      <div className={`fixed md:relative z-50 md:z-auto transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      <main id="main-content" className="flex-1 overflow-y-auto relative">
        <div className="sticky top-0 z-30 md:hidden flex items-center justify-between px-4 h-12 bg-[var(--surface-0)]/95 backdrop-blur-xl border-b border-[var(--border)]">
          <button onClick={() => setSidebarOpen(true)} aria-label="Open menu / 메뉴 열기" className="p-1.5 rounded-lg hover:bg-[var(--surface-2)] transition-colors"><Menu size={20} className="text-[var(--text-mid)]" /></button>
          <Link to="/" className="shrink-0">
            <BrandLockup surface="dark" className="origin-center scale-[0.68]" />
          </Link>
          <LangToggle className="bg-[var(--surface-1)] border border-[var(--border)] text-[var(--text-mid)] hover:bg-[var(--surface-2)] text-[11px]" />
        </div>
        <div className="hidden md:block sticky top-0 z-40 border-b border-[var(--app-divider)] bg-[rgba(12,13,17,0.88)] px-6 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <Link to="/dashboard" className="shrink-0 transition-opacity hover:opacity-80">
                <BrandLockup surface="dark" className="origin-left scale-[0.62]" />
              </Link>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-low)]">{chrome.label}</p>
                <p className="mt-1 text-[12px] text-[var(--text-mid)] truncate">
                  {chrome.hint}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {supabaseEnabled && user && (
                <>
                  {canAccessAdminGate && (
                    <a
                      href={ADMIN_ACCESS_PATH}
                      className="inline-flex items-center gap-1.5 px-2 py-1.5 text-[11px] font-medium text-[#79AFFF] transition-colors hover:text-[#AFCBFF]"
                    >
                      <Shield size={12} />
                      <span>{t('sidebar.admin')}</span>
                    </a>
                  )}
                  {canAccessAdminGate && <div className="w-px h-3.5 bg-[rgba(255,255,255,0.08)]" />}
                  <Link
                    to="/settings"
                    className="inline-flex max-w-[220px] items-center gap-1.5 truncate px-2 py-1.5 text-[11px] font-medium text-[var(--text-mid)] transition-colors hover:text-[var(--text-high)]"
                  >
                    <UserCircle2 size={12} />
                    <span className="truncate">{displayName}</span>
                  </Link>
                  {isAdmin && <span className="rounded-full bg-[rgba(59,130,246,0.12)] px-2 py-1 text-[10px] font-semibold text-[#79AFFF]">Admin</span>}
                  {isAdmin && adminAccessGranted && (
                    <>
                      <div className="w-px h-3.5 bg-[rgba(255,255,255,0.08)]" />
                      <button type="button" onClick={handleLockAdmin} className="flex items-center gap-1.5 text-[11px] text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors">
                        <LockKeyhole size={11} />
                        <span>{lang === 'ko' ? '관리자 잠금' : 'Lock Admin'}</span>
                      </button>
                    </>
                  )}
                  <div className="w-px h-3.5 bg-[rgba(255,255,255,0.08)]" />
                  <button type="button" onClick={handleSignOut} className="flex items-center gap-1.5 text-[11px] text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors">
                    <LogOut size={11} />
                    <span>{t('auth.signOut')}</span>
                  </button>
                  <div className="w-px h-3.5 bg-[rgba(255,255,255,0.08)]" />
                </>
              )}
              <LangToggle className="text-[var(--text-mid)] hover:text-[var(--text-high)] text-[11px]" />
            </div>
          </div>
        </div>
        <div className="p-4 md:px-6 md:pb-6 ok-page-enter"><Outlet /></div>
      </main>
    </div>
  )
}
