import useLang from '../../hooks/useLang'
import BrandWordmark from '../brand/BrandWordmark'

export default function Footer() {
  const { t, lang } = useLang()

  const navLinks = [
    { label: t('nav.curriculum'), href: '#curriculum' },
    { label: t('nav.features'), href: '#features' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <footer className="bg-[#0a0b0d] border-t border-[rgba(255,255,255,0.08)]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Mobile: stack vertically, centered */}
        {/* Desktop: 3-column row */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-6">
          {/* Left -- Brand lockup */}
          <div className="shrink-0 flex justify-center md:justify-start">
            <BrandWordmark surface="dark" compact />
          </div>

          {/* Center -- Nav links */}
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] text-[#9497a9] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right -- Copyright */}
          <p className="text-[11px] text-[#686b82] text-center md:text-right leading-relaxed">
            © 2026 Onchain Korea.
            <br className="sm:hidden" />
            {' '}Powered by Greed Academy × Elixi.
          </p>
        </div>
      </div>
    </footer>
  )
}
