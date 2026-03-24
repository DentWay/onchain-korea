import useLang from '../../hooks/useLang'

export default function Footer() {
  const { t, lang } = useLang()

  return (
    <footer className="border-t border-[var(--border)] py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
                <span className="text-white text-[7px] font-bold">OK</span>
              </div>
              <span className="text-[13px] font-semibold text-[var(--text-mid)]">Onchain Korea</span>
            </div>
            <p className="text-[11px] text-[var(--text-low)] max-w-xs">
              {lang === 'ko' ? '블록체인, 처음부터 안전하게. Greed Academy 커리큘럼 기반 무료 교육 프로그램.' : 'Blockchain, safely from the start. Free education based on Greed Academy curriculum.'}
            </p>
          </div>
          <div className="flex gap-10">
            <div>
              <p className="text-[10px] text-[var(--text-low)] uppercase tracking-wider mb-2">{lang === 'ko' ? '프로그램' : 'Program'}</p>
              <div className="space-y-1.5">
                <a href="#curriculum" className="block text-[12px] text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors">{t('nav.curriculum')}</a>
                <a href="#features" className="block text-[12px] text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors">{t('nav.features')}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-[var(--border)] pt-5 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-[var(--text-low)]">
          <span>Powered by Elixi Venture Studio × Greed Academy</span>
          <span>{t('footer.based')}</span>
        </div>
      </div>
    </footer>
  )
}
