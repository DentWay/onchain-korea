import { useEffect, useState } from 'react'

const sizes = {
  sm: { size: 64, stroke: 4, font: 'text-sm' },
  md: { size: 96, stroke: 5, font: 'text-2xl' },
  lg: { size: 128, stroke: 6, font: 'text-3xl' },
}

export default function CircleProgress({ value = 0, size = 'md', label }) {
  const [animated, setAnimated] = useState(0)
  const config = sizes[size] || sizes.md
  const radius = (config.size - config.stroke * 2) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (animated / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(value), 100)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: config.size, height: config.size }}>
        <svg width={config.size} height={config.size} className="-rotate-90">
          <circle cx={config.size / 2} cy={config.size / 2} r={radius} fill="none" stroke="var(--surface-2)" strokeWidth={config.stroke} />
          <circle cx={config.size / 2} cy={config.size / 2} r={radius} fill="none" stroke="var(--accent)" strokeWidth={config.stroke} strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)' }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${config.font} font-bold text-[var(--text-high)] ok-tabular-nums`}>{animated}%</span>
        </div>
      </div>
      {label && <p className="text-[11px] text-[var(--text-low)]">{label}</p>}
    </div>
  )
}
