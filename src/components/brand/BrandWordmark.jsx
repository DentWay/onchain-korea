import BrandIcon from './BrandIcon'

/**
 * BrandWordmark — "⊙nChain KR" logotype
 *
 * The icon acts as the "O" in "OnChain", so the gap between icon and "n"
 * must match the visual letter-spacing of the text. We use a tight negative
 * margin on the icon side to optically align it with the letterforms.
 *
 * compact = true  → sidebar / footer / small contexts (24px icon, ~1.15rem text)
 * compact = false → hero / auth / certificate (48px icon, ~2.4rem text)
 */
export default function BrandWordmark({ surface = 'light', compact = false, className = '' }) {
  const mainTone = surface === 'dark' ? 'text-white' : 'text-[#101114]'
  const krTone = surface === 'dark' ? 'text-white/50' : 'text-[#9497a9]'

  // Icon size and text size are coupled
  const iconSize = compact ? 22 : 44
  const textSize = compact ? 'text-[1.1rem]' : 'text-[1.9rem] sm:text-[2.3rem]'
  const krSize = compact ? 'text-[0.55rem]' : 'text-[0.65rem] sm:text-[0.75rem]'

  // The symbol acts as the first glyph of the wordmark, so the visible gap
  // must be much tighter than a normal flex gap. We use a trimmed PNG plus a
  // small negative margin to match the rhythm between letters.
  const iconGap = 'gap-0'
  const iconOffset = compact ? '-mr-[1px]' : '-mr-[2px] sm:-mr-[3px]'
  const iconLift = compact ? '-translate-y-[0.03em]' : '-translate-y-[0.05em] sm:-translate-y-[0.055em]'
  const krGap = compact ? 'ml-[4px]' : 'ml-[6px] sm:ml-[7px]'

  return (
    <div className={`inline-flex items-center ${iconGap} ${className}`}>
      <BrandIcon
        size={iconSize}
        surface={surface}
        variant="wordmark"
        title=""
        className={`${iconOffset} ${iconLift}`}
      />
      <div className="flex items-baseline">
        <span className={`${mainTone} ${textSize} font-[800] tracking-[-0.035em] leading-none`}>
          nChain
        </span>
        <span className={`${krTone} ${krSize} ${krGap} font-semibold uppercase tracking-[0.14em] leading-none`}>
          KR
        </span>
      </div>
    </div>
  )
}
