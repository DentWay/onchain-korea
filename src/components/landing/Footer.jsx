import useLang from '../../hooks/useLang'
import BrandLockup from '../brand/BrandLockup'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="border-t border-[var(--border)] py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left — Logo + nav links */}
        <div className="flex items-center gap-6">
          <BrandLockup surface="dark" className="origin-left scale-[0.88]" />
          <div className="hidden md:flex items-center gap-4">
            <a href="#curriculum" className="text-[12px] text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors">{t('nav.curriculum')}</a>
            <a href="#features" className="text-[12px] text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors">{t('nav.features')}</a>
          </div>
        </div>

        {/* Right — Copyright */}
        <div className="flex items-center gap-4 text-[11px] text-[var(--text-low)]">
          <span>{t('footer.based')}</span>
        </div>
      </div>
    </footer>
  )
}
