import useLang from '../hooks/useLang'

export default function LangToggle({ className = '' }) {
  const { lang, toggleLang } = useLang()

  return (
    <button
      onClick={toggleLang}
      className={`flex items-center gap-0.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${className}`}
      title={lang === 'ko' ? 'Switch to English' : '한국어로 전환'}
    >
      <span className={`px-1.5 py-0.5 rounded-full transition-all ${lang === 'ko' ? 'bg-accent/20 text-accent' : 'opacity-40'}`}>한</span>
      <span className={`px-1.5 py-0.5 rounded-full transition-all ${lang === 'en' ? 'bg-accent/20 text-accent' : 'opacity-40'}`}>EN</span>
    </button>
  )
}
