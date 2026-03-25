import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import LangToggle from '../LangToggle'
import FomoBanner from './FomoBanner'
import useAuth from '../../hooks/useAuth'
import useLang from '../../hooks/useLang'

export default function Nav() {
  const { t, lang } = useLang()
  const { user, supabaseEnabled } = useAuth()
  const startLink = supabaseEnabled && !user ? '/auth' : '/dashboard'
  const [bannerVisible, setBannerVisible] = useState(true)
  const handleBannerChange = useCallback((v) => setBannerVisible(v), [])

  return (
    <>
      <FomoBanner onVisibilityChange={handleBannerChange} />
      <nav className={`fixed left-0 right-0 z-50 bg-[#0C0D11]/80 backdrop-blur-xl border-b border-[var(--border)] transition-all ${bannerVisible ? 'top-9' : 'top-0'}`}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white text-[10px] font-bold tracking-tight">OK</span>
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-[var(--text-high)]">Onchain Korea</span>
            <div className="hidden sm:flex items-center gap-1.5 ml-3">
              <div className="w-1.5 h-1.5 rounded-full bg-success ok-pulse-dot" />
              <span className="text-[10px] text-[var(--text-low)]">
                {lang === 'ko' ? '학습 진행 중' : 'Live'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#curriculum" className="text-[13px] text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors hidden sm:block">{t('nav.curriculum')}</a>
            <a href="#features" className="text-[13px] text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors hidden sm:block">{t('nav.features')}</a>
            <LangToggle className="bg-[var(--surface-1)] border border-[var(--border)] text-[var(--text-mid)] hover:bg-[var(--surface-2)]" />
            <Link to={startLink} className="ok-btn ok-btn-primary text-[13px] px-5 py-1.5">{t('nav.start')}</Link>
          </div>
        </div>
      </nav>
    </>
  )
}
