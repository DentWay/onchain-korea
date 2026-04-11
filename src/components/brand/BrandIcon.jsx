const SIZE_MAP = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 56,
  hero: 84,
}

function resolveSize(size) {
  if (typeof size === 'number') return size
  return SIZE_MAP[size] || SIZE_MAP.md
}

const SRC_MAP = {
  default: '/brand/symbol-web.png',
  // The padded wordmark PNG created an artificial gap before the "n".
  // Use the trimmed runtime symbol for the live lockup.
  wordmark: '/brand/symbol-web.png',
}

export default function BrandIcon({
  size = 'md',
  surface = 'light',
  variant = 'default',
  className = '',
  title = 'OnChain Korea symbol',
}) {
  const resolvedSize = resolveSize(size)
  const src = SRC_MAP[variant] || SRC_MAP.default

  return (
    <img
      src={src}
      alt={title || ''}
      width={resolvedSize}
      height={resolvedSize}
      aria-hidden={title ? undefined : true}
      className={`block shrink-0 object-contain ${className}`}
      style={{ width: resolvedSize, height: resolvedSize }}
      loading="eager"
      decoding="async"
      draggable="false"
    />
  )
}
