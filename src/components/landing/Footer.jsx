import useLang from '../../hooks/useLang'

export default function Footer() {
  const { t, lang } = useLang()

  return (
    <footer className="border-t border-[var(--border)] py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left — Logo + nav links */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
              <span className="text-white text-[7px] font-bold">OK</span>
            </div>
            <span className="text-[13px] font-semibold text-[var(--text-mid)]">Onchain Korea</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="#curriculum" className="text-[12px] text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors">{t('nav.curriculum')}</a>
            <a href="#features" className="text-[12px] text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors">{t('nav.features')}</a>
          </div>
        </div>

        {/* Right — Copyright */}
        <div className="flex items-center gap-4 text-[11px] text-[var(--text-low)]">
          <span>{t('footer.based')}</span>
          <span className="hidden md:inline">Powered by Elixi Venture Studio</span>
        </div>
      </div>
    </footer>
  )
}
