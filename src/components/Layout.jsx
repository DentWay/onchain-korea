import { Outlet, Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, LogOut } from 'lucide-react'
import Sidebar from './Sidebar'
import LangToggle from './LangToggle'
import useAuth from '../hooks/useAuth'
import useLang from '../hooks/useLang'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, profile, signOut, supabaseEnabled } = useAuth()
  const { t } = useLang()

  const displayName = profile?.display_name || user?.email?.split('@')[0] || ''

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--surface-0)] text-[var(--text-high)]">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-3 focus:bg-accent focus:text-white">Skip to content</a>
      <div className={`ok-sidebar-overlay md:hidden ${sidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(false)} />
      <div className={`fixed md:relative z-50 md:z-auto transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      <main id="main-content" className="flex-1 overflow-y-auto relative">
        <div className="sticky top-0 z-30 md:hidden flex items-center justify-between px-4 h-12 bg-[var(--surface-0)]/95 backdrop-blur-xl border-b border-[var(--border)]">
          <button onClick={() => setSidebarOpen(true)} aria-label="Open menu / 메뉴 열기" className="p-1.5 rounded-lg hover:bg-[var(--surface-2)] transition-colors"><Menu size={20} className="text-[var(--text-mid)]" /></button>
          <Link to="/" className="text-[13px] font-semibold flex items-center gap-1.5">Onchain Korea <span className="text-[8px] font-semibold px-1 py-0.5 rounded bg-accent/10 text-accent-soft uppercase tracking-wider">Beta</span></Link>
          <LangToggle className="bg-[var(--surface-1)] border border-[var(--border)] text-[var(--text-mid)] hover:bg-[var(--surface-2)] text-[11px]" />
        </div>
        <div className="hidden md:flex fixed top-3 right-6 z-40 items-center gap-2 bg-[var(--surface-1)]/80 backdrop-blur-xl border border-[var(--border)] rounded-lg px-3 py-1.5">
          {supabaseEnabled && user && (
            <>
              <span className="text-[11px] text-[var(--text-mid)] font-medium">{displayName}</span>
              <div className="w-px h-3.5 bg-[var(--border)]" />
              <button onClick={signOut} className="flex items-center gap-1 text-[11px] text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors">
                <LogOut size={11} />
              </button>
              <div className="w-px h-3.5 bg-[var(--border)]" />
            </>
          )}
          <LangToggle className="text-[var(--text-mid)] hover:text-[var(--text-high)] text-[11px]" />
        </div>
        <div className="p-4 md:p-6 ok-page-enter"><Outlet /></div>
      </main>
    </div>
  )
}
