const ASSETS = {
  symbol: {
    src: '/brand/symbol-web.png',
    width: 706,
    height: 774,
    alt: 'OnChain Korea brand symbol',
  },
  logoPrimary: {
    src: '/brand/logo-primary-web.png',
    width: 3120,
    height: 774,
    alt: 'OnChain Korea primary logo',
  },
  logoFull: {
    src: '/brand/logo-full-web.png',
    width: 3120,
    height: 1035,
    alt: 'OnChain Korea by Elixi logo',
  },
  logoDark: {
    src: '/brand/logo-dark-web.png',
    width: 3120,
    height: 1035,
    alt: 'OnChain Korea by Elixi logo',
  },
  elixiText: {
    src: '/brand/elixi-text-web.png',
    width: 698,
    height: 219,
    alt: 'Elixi wordmark',
  },
}

export default function BrandAsset({
  variant = 'logoDark',
  alt,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  ...props
}) {
  const asset = ASSETS[variant]

  if (!asset) return null

  return (
    <img
      src={asset.src}
      alt={alt || asset.alt}
      width={asset.width}
      height={asset.height}
      loading={loading}
      decoding={decoding}
      className={`block max-w-full ${className}`}
      style={{ height: 'auto' }}
      {...props}
    />
  )
}
