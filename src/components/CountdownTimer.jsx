import { useState, useEffect } from 'react'
import useLang from '../hooks/useLang'

function pad(n) { return String(n).padStart(2, '0') }

export default function CountdownTimer({ targetDate, compact = false, surface = 'dark' }) {
  const { t } = useLang()
  const [time, setTime] = useState(getTimeLeft(targetDate))
  const primaryTone = surface === 'light' ? 'text-[#101114]' : 'text-white/80'
  const secondaryTone = surface === 'light' ? 'text-[#9497a9]' : 'text-white/30'
  const closedTone = surface === 'light' ? 'text-[#9497a9]' : 'text-white/40'

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  if (time.total <= 0) {
    return (
      <span className={`text-[12px] font-medium ${closedTone}`}>
        {t('countdown.closed')}
      </span>
    )
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1 text-[12px] tabular-nums">
        <span className={`${primaryTone} font-semibold`}>{time.days}d</span>
        <span className={secondaryTone}>:</span>
        <span className={`${primaryTone} font-semibold`}>{pad(time.hours)}h</span>
        <span className={secondaryTone}>:</span>
        <span className={`${primaryTone} font-semibold`}>{pad(time.minutes)}m</span>
      </div>
    )
  }

  const units = [
    { value: time.days, label: t('countdown.days') },
    { value: pad(time.hours), label: t('countdown.hours') },
    { value: pad(time.minutes), label: t('countdown.minutes') },
    { value: pad(time.seconds), label: t('countdown.seconds') },
  ]

  return (
    <div className="flex items-center gap-2">
      {units.map((u, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className={`text-xl md:text-2xl font-bold tabular-nums leading-none ${surface === 'light' ? 'text-[#101114]' : 'text-white'}`}>
            {u.value}
          </span>
          <span className={`text-[9px] mt-1 uppercase tracking-wider ${secondaryTone}`}>{u.label}</span>
        </div>
      ))}
    </div>
  )
}

function getTimeLeft(target) {
  const diff = new Date(target) - new Date()
  if (diff <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    total: diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}
