import { useState, useEffect } from 'react'
import useLang from '../hooks/useLang'

function pad(n) { return String(n).padStart(2, '0') }

export default function CountdownTimer({ targetDate, compact = false }) {
  const { lang } = useLang()
  const [time, setTime] = useState(getTimeLeft(targetDate))

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  if (time.total <= 0) {
    return (
      <span className="text-[12px] text-white/40 font-medium">
        {lang === 'ko' ? '마감됨' : 'Closed'}
      </span>
    )
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1 text-[12px] ok-tabular-nums">
        <span className="text-white/80 font-semibold">{time.days}d</span>
        <span className="text-white/30">:</span>
        <span className="text-white/80 font-semibold">{pad(time.hours)}h</span>
        <span className="text-white/30">:</span>
        <span className="text-white/80 font-semibold">{pad(time.minutes)}m</span>
      </div>
    )
  }

  const units = [
    { value: time.days, label: lang === 'ko' ? '일' : 'Days' },
    { value: pad(time.hours), label: lang === 'ko' ? '시간' : 'Hrs' },
    { value: pad(time.minutes), label: lang === 'ko' ? '분' : 'Min' },
    { value: pad(time.seconds), label: lang === 'ko' ? '초' : 'Sec' },
  ]

  return (
    <div className="flex items-center gap-2">
      {units.map((u, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="text-xl md:text-2xl font-bold text-white ok-tabular-nums leading-none">
            {u.value}
          </span>
          <span className="text-[9px] text-white/30 mt-1 uppercase tracking-wider">{u.label}</span>
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
