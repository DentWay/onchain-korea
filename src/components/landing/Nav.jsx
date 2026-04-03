import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import LangToggle from '../LangToggle'
import FomoBanner from './FomoBanner'
import BrandLockup from '../brand/BrandLockup'
import useAuth from '../../hooks/useAuth'
import useLang from '../../hooks/useLang'

export default function Nav() {
  const { t } = useLang()
  const { user, supabaseEnabled } = useAuth()
  const startLink = supabaseEnabled && !user ? '/auth' : '/dashboard'
  const [bannerVisible, setBannerVisible] = useState(true)
  const handleBannerChange = useCallback((v) => setBannerVisible(v), [])

  return (
    <>
      <FomoBanner onVisibilityChange={handleBannerChange} />
      <nav className={`fixed left-0 right-0 z-50 bg-[#0C0D11]/80 backdrop-blur-xl border-b border-[var(--border)] transition-all ${bannerVisible ? 'top-9' : 'top-0'}`}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/" className="shrink-0">
              <BrandLockup surface="dark" className="origin-left scale-[0.88] sm:scale-100" />
            </Link>
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
