import { useEffect, useMemo, useRef } from 'react'
import BrandIcon from './BrandIcon'

const DIAMETER_MAP = {
  sm: 132,
  md: 176,
  lg: 224,
  hero: 288,
}

const DEFAULT_MOTION = {
  tiltX: '-14deg',
  tiltY: '18deg',
  glowX: '44%',
  glowY: '34%',
}

const SYMBOL_MOTION = {
  tiltX: '-10deg',
  tiltY: '14deg',
  glowX: '50%',
  glowY: '50%',
}

function resolveDiameter(size) {
  if (typeof size === 'number') return size
  return DIAMETER_MAP[size] || DIAMETER_MAP.md
}

function getSurfaceVars(surface) {
  if (surface === 'dark') {
    return {
      '--coin-face-primary': 'rgba(28, 29, 35, 0.96)',
      '--coin-face-secondary': 'rgba(20, 21, 26, 0.98)',
      '--coin-face-border': 'rgba(255, 255, 255, 0.08)',
      '--coin-rim-a': 'rgba(255, 255, 255, 0.16)',
      '--coin-rim-b': 'rgba(255, 255, 255, 0.06)',
      '--coin-shadow': 'rgba(0, 0, 0, 0.42)',
      '--coin-sheen': 'rgba(255, 255, 255, 0.20)',
    }
  }

  return {
    '--coin-face-primary': 'rgba(255, 255, 255, 0.94)',
    '--coin-face-secondary': 'rgba(243, 239, 230, 0.96)',
    '--coin-face-border': 'rgba(12, 13, 17, 0.08)',
    '--coin-rim-a': '#ebe3d4',
    '--coin-rim-b': '#d9cfbf',
    '--coin-shadow': 'rgba(12, 13, 17, 0.16)',
    '--coin-sheen': 'rgba(255, 255, 255, 0.78)',
  }
}

export default function BrandCoin3D({
  size = 'hero',
  surface = 'light',
  depthScale = 1,
  mode = 'coin',
  interactive = mode !== 'symbol',
  floating = mode === 'symbol',
  className = '',
}) {
  const rootRef = useRef(null)
  const frameRef = useRef(0)
  const baseMotion = mode === 'symbol' ? SYMBOL_MOTION : DEFAULT_MOTION
  const pendingRef = useRef(baseMotion)
  const diameter = resolveDiameter(size)
  const depth = Math.round(diameter * (mode === 'symbol' ? 0.095 : 0.16) * depthScale)
  const iconSize = Math.round(diameter * (mode === 'symbol' ? 0.78 : 0.64))
  const rimWidth = Math.max(6, Math.round(diameter * (0.038 + (depthScale - 1) * 0.012)))
  const rimHeight = Math.round(diameter * 0.84)
  const rimRadius = Math.round(diameter * 0.44)
  const rimSegments = useMemo(() => Array.from({ length: 28 }, (_, index) => index), [])
  const symbolLayers = useMemo(
    () => (mode === 'symbol' ? Array.from({ length: Math.max(18, Math.round(depth * 1.8)) }, (_, index) => index) : []),
    [depth, mode]
  )

  function applyMotion(nextMotion) {
    const node = rootRef.current
    if (!node) return
    node.style.setProperty('--coin-tilt-x', nextMotion.tiltX)
    node.style.setProperty('--coin-tilt-y', nextMotion.tiltY)
    node.style.setProperty('--coin-glow-x', nextMotion.glowX)
    node.style.setProperty('--coin-glow-y', nextMotion.glowY)
  }

  function scheduleMotion(nextMotion) {
    pendingRef.current = nextMotion
    if (frameRef.current) return

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0
      applyMotion(pendingRef.current)
    })
  }

  function handlePointerMove(event) {
    if (!interactive) return
    const node = rootRef.current
    if (!node) return

    const rect = node.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    const tiltX = ((0.5 - py) * 24).toFixed(2)
    const tiltY = ((px - 0.5) * 30).toFixed(2)

    scheduleMotion({
      tiltX: `${tiltX}deg`,
      tiltY: `${tiltY}deg`,
      glowX: `${(px * 100).toFixed(2)}%`,
      glowY: `${(py * 100).toFixed(2)}%`,
    })
  }

  function handlePointerLeave() {
    if (!interactive) return
    scheduleMotion(baseMotion)
  }

  useEffect(() => {
    applyMotion(baseMotion)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [baseMotion])

  return (
    <div
      ref={rootRef}
      className={`ok-coin-stage ${mode === 'symbol' ? 'ok-coin-stage-symbol' : ''} ${floating ? 'ok-coin-stage-floating' : ''} ${className}`.trim()}
      aria-hidden="true"
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerEnter={interactive ? handlePointerMove : undefined}
      onPointerLeave={interactive ? handlePointerLeave : undefined}
      style={{
        '--coin-diameter': `${diameter}px`,
        '--coin-depth': `${depth}px`,
        ...getSurfaceVars(surface),
      }}
    >
      <div className={`ok-coin-shadow ${mode === 'symbol' ? 'ok-coin-shadow-symbol' : ''}`} />
      <div className={`ok-coin-interactive ${mode === 'symbol' ? 'ok-coin-interactive-symbol' : ''} ${interactive ? '' : 'ok-coin-interactive-static'}`}>
        <div className={`ok-coin-spin ${mode === 'symbol' ? 'ok-coin-spin-symbol' : ''}`}>
          {mode === 'symbol' ? (
            <div className="ok-symbol-stack">
              {symbolLayers.map((layer, index) => {
                const depthOffset = (-depth / 2) + (depth / Math.max(symbolLayers.length - 1, 1)) * index
                return (
                  <div
                    key={layer}
                    className="ok-symbol-layer"
                    style={{
                      transform: `translateZ(${depthOffset}px)`,
                      opacity: index === symbolLayers.length - 1 ? 1 : 0.92,
                    }}
                  >
                    <BrandIcon size={iconSize} surface={surface} title="" />
                  </div>
                )
              })}
            </div>
          ) : (
            <>
              <div className="ok-coin-rim">
                {rimSegments.map((segment) => (
                  <span
                    key={segment}
                    className={`ok-coin-rim-segment ${segment % 2 === 0 ? 'ok-coin-rim-segment-alt' : ''}`}
                    style={{
                      width: `${rimWidth}px`,
                      height: `${rimHeight}px`,
                      transform: `translateX(-50%) rotateY(${(360 / rimSegments.length) * segment}deg) translateZ(${rimRadius}px)`,
                    }}
                  />
                ))}
              </div>

              <div className="ok-coin-face ok-coin-face-front">
                <div className="ok-coin-face-inner">
                  <BrandIcon size={iconSize} surface={surface} title="" />
                </div>
              </div>

              <div className="ok-coin-face ok-coin-face-back">
                <div className="ok-coin-face-inner ok-coin-face-inner-back">
                  <BrandIcon size={iconSize} surface={surface} title="" className="scale-x-[-1]" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
