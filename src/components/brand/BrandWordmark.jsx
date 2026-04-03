import BrandIcon from './BrandIcon'

export default function BrandWordmark({ surface = 'light', compact = false, className = '' }) {
  const mainTone = surface === 'dark' ? 'text-white' : 'text-[var(--brand-ink)]'
  const lowTone = surface === 'dark' ? 'text-white/40' : 'text-[var(--brand-muted)]'
  const mainSize = compact ? 'text-[1.25rem] sm:text-[1.35rem]' : 'text-[2.4rem] sm:text-[2.9rem]'
  const suffixSize = compact ? 'text-[0.42rem] sm:text-[0.46rem]' : 'text-[0.62rem] sm:text-[0.7rem]'
  const iconSize = compact ? 26 : 54

  return (
    <div className={`inline-flex items-end leading-none ${className}`}>
      <span className="mr-[-2px] sm:mr-[-4px] shrink-0 relative top-[0.04em]">
        <BrandIcon size={iconSize} surface={surface} variant="wordmark" title="" />
      </span>
      <span className={`${mainTone} ${mainSize} font-[800] tracking-[-0.045em]`}>
        nChain
      </span>
      <span className={`${lowTone} ${suffixSize} ml-1.5 sm:ml-2 mb-[0.05em] font-semibold uppercase tracking-[0.12em] relative top-[0.16em]`}>
        KR
      </span>
    </div>
  )
}
