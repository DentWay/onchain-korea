import BrandWordmark from './BrandWordmark'

export default function BrandLockup({ surface = 'light', withElixi = false, responsive = false, className = '' }) {
  const byTone = surface === 'dark' ? 'text-white/64' : 'text-[rgba(12,13,17,0.68)]'
  const elixiTone = surface === 'dark' ? 'text-white' : 'text-[var(--brand-ink)]'

  return (
    <div className={`inline-flex ${withElixi ? 'items-end gap-3.5 sm:gap-4.5' : 'flex-col items-start gap-y-1'} ${responsive ? 'max-w-full' : ''} ${className}`}>
      <BrandWordmark surface={surface} compact={!withElixi} />
      {withElixi && (
        <div className="min-w-0 whitespace-nowrap mb-[0.38em]">
          <span className={`${byTone} text-[0.8rem] italic leading-none`}>
            by{' '}
          </span>
          <span className={`${elixiTone} text-[0.98rem] font-semibold italic leading-none`}>
            Elixi.
          </span>
        </div>
      )}
    </div>
  )
}
