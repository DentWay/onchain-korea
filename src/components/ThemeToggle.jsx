import { Moon, SunMedium } from 'lucide-react'
import useTheme from '../hooks/useTheme'
import useLang from '../hooks/useLang'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const { lang } = useLang()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center gap-1 rounded-full border border-[var(--app-light-btn-border)] bg-[var(--app-light-btn-bg)] px-2.5 py-1.5 text-[11px] font-medium text-[var(--app-ink-mid)] transition-colors hover:bg-[var(--app-light-btn-hover-bg)] hover:text-[var(--app-ink-high)] ${className}`}
      title={isDark ? (lang === 'ko' ? '라이트 모드로 전환' : 'Switch to light mode') : (lang === 'ko' ? '다크 모드로 전환' : 'Switch to dark mode')}
      aria-label={isDark ? (lang === 'ko' ? '라이트 모드로 전환' : 'Switch to light mode') : (lang === 'ko' ? '다크 모드로 전환' : 'Switch to dark mode')}
    >
      <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${isDark ? 'bg-[rgba(255,255,255,0.08)] text-[var(--app-ink-high)]' : 'bg-[rgba(87,65,216,0.12)] text-[#5741d8]'}`}>
        {isDark ? <SunMedium size={12} /> : <Moon size={12} />}
      </span>
      <span>{isDark ? (lang === 'ko' ? '라이트' : 'Light') : (lang === 'ko' ? '다크' : 'Dark')}</span>
    </button>
  )
}
