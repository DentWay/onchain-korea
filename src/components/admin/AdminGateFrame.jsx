import { Link } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle'
import BrandLockup from '../brand/BrandLockup'
import useTheme from '../../hooks/useTheme'

function chipTone(tone) {
  switch (tone) {
    case 'success':
      return 'border-[rgba(74,222,128,0.18)] bg-[rgba(74,222,128,0.10)] text-[#86efac]'
    case 'warning':
      return 'border-[rgba(251,191,36,0.20)] bg-[rgba(251,191,36,0.10)] text-[#fde68a]'
    case 'danger':
      return 'border-[rgba(248,113,113,0.20)] bg-[rgba(248,113,113,0.10)] text-[#fca5a5]'
    default:
      return 'border-[rgba(87,65,216,0.20)] bg-[rgba(87,65,216,0.10)] text-[#c4b5fd]'
  }
}

export default function AdminGateFrame({
  backTo = '/',
  backLabel = 'Back',
  topLabel = 'Admin Access',
  eyebrow = 'Operations',
  title,
  description,
  chips = [],
  children,
  aside,
  compact = false,
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="ok-theme-workbench relative min-h-screen overflow-hidden px-4 py-8 text-[var(--app-ink-high)] md:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute inset-x-0 top-0 h-80 ${isDark ? 'bg-[radial-gradient(circle_at_top,rgba(87,65,216,0.18),transparent_54%)]' : 'bg-[radial-gradient(circle_at_top,rgba(87,65,216,0.08),transparent_54%)]'}`} />
        <div className={`absolute left-[-12%] top-[18%] h-80 w-80 rounded-full blur-3xl ${isDark ? 'bg-[rgba(0,71,160,0.10)]' : 'bg-[rgba(0,71,160,0.06)]'}`} />
        <div className={`absolute bottom-[-8%] right-[-8%] h-80 w-80 rounded-full blur-3xl ${isDark ? 'bg-[rgba(205,49,58,0.10)]' : 'bg-[rgba(205,49,58,0.06)]'}`} />
      </div>

      <div className={`relative mx-auto ${compact ? 'max-w-3xl' : 'max-w-6xl'}`}>
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link to={backTo} className="text-[12px] text-[var(--app-ink-mid)] transition-colors hover:text-[var(--app-ink-high)]">
            {backLabel}
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--app-ink-low)]">{topLabel}</div>
          </div>
        </div>

        <div className={aside ? 'grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_360px] lg:items-start' : ''}>
          <section className="ok-readable-panel p-6 md:p-8 lg:p-10">
            <div className="relative z-10">
              <div className="flex flex-col gap-5 border-b border-[var(--app-divider)] pb-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[var(--app-ink-low)]">{eyebrow}</p>
                    <BrandLockup surface={isDark ? 'dark' : 'light'} className="origin-left scale-[1.06]" />
                  </div>
                  {chips.length > 0 && (
                    <div className="flex flex-wrap justify-end gap-2">
                      {chips.map((chip) => (
                        <span
                          key={`${chip.label}-${chip.value || ''}`}
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${chipTone(chip.tone)}`}
                        >
                          <span>{chip.label}</span>
                          {chip.value ? <span className="text-[var(--app-ink-high)]">{chip.value}</span> : null}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="max-w-3xl">
                  <h1 className="text-[34px] font-[800] tracking-[-0.06em] text-[var(--app-ink-high)] md:text-[48px]">
                    {title}
                  </h1>
                  <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[var(--app-ink-mid)] md:text-[15px]">
                    {description}
                  </p>
                </div>
              </div>

              <div className="mt-8">{children}</div>
            </div>
          </section>

          {aside ? (
            <aside className="ok-readable-panel-soft p-5 md:p-6">
              <div className="relative z-10">{aside}</div>
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  )
}
