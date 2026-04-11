import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleBannerChange = useCallback((v) => setBannerVisible(v), [])

  const navLinks = [
    { label: t('nav.curriculum'), href: '#curriculum' },
    { label: t('nav.features'), href: '#features' },
  ]

  return (
    <>
      <FomoBanner onVisibilityChange={handleBannerChange} />
      <nav
        className={`fixed left-0 right-0 z-50 bg-white transition-all ${bannerVisible ? 'top-9' : 'top-0'}`}
        style={{ boxShadow: 'rgba(0,0,0,0.03) 0px 4px 24px' }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
            <BrandLockup surface="light" className="origin-left scale-[0.88] sm:scale-100" />
          </Link>

          {/* Center links — desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[16px] font-medium text-[#101114] hover:text-[#5741d8] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right side — desktop */}
          <div className="hidden md:flex items-center gap-4">
            <LangToggle className="bg-[#eef0f3] border border-[#eef0f3] text-[#101114] hover:bg-[#e2e4e9]" />
            <Link
              to={startLink}
              className="inline-flex items-center px-6 py-2.5 rounded-[56px] bg-[#5741d8] text-white text-[14px] font-semibold hover:bg-[#828fff] transition-colors"
            >
              {t('nav.start')}
            </Link>
          </div>

          {/* Hamburger — mobile */}
          <div className="flex md:hidden items-center gap-3">
            <LangToggle className="bg-[#eef0f3] border border-[#eef0f3] text-[#101114] hover:bg-[#e2e4e9]" />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 text-[#101114] hover:text-[#5741d8] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile sheet */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#eef0f3] bg-white px-6 pb-6 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[16px] font-medium text-[#101114] hover:text-[#5741d8] transition-colors py-2"
                >
                  {l.label}
                </a>
              ))}
              <Link
                to={startLink}
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center px-6 py-3 rounded-[56px] bg-[#5741d8] text-white text-[15px] font-semibold hover:bg-[#828fff] transition-colors"
              >
                {t('nav.start')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
