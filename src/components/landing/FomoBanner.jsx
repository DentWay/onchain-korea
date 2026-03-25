import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import CountdownTimer from '../CountdownTimer'
import useStats from '../../hooks/useStats'
import useLang from '../../hooks/useLang'

// Semester 3 deadline: 2026-04-30 KST
const SEMESTER_DEADLINE = '2026-04-30T23:59:59+09:00'

export default function FomoBanner({ onVisibilityChange }) {
  const { lang } = useLang()
  const { stats } = useStats()
  const [visible, setVisible] = useState(() => {
    try { return sessionStorage.getItem('ok-fomo-dismissed') !== 'true' } catch { return true }
  })
  const count = stats.total_users || 0

  useEffect(() => { onVisibilityChange?.(visible) }, [visible, onVisibilityChange])

  if (!visible) return null

  const dismiss = () => {
    setVisible(false)
    try { sessionStorage.setItem('ok-fomo-dismissed', 'true') } catch {}
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-accent">
      <div className="max-w-5xl mx-auto px-4 h-9 flex items-center justify-between">
        <p className="text-[11px] text-white font-medium truncate flex-1">
          {lang === 'ko'
            ? `Semester 3 사전등록 중 — ${count}명 등록 완료 · 선착순 마감 예정`
            : `Semester 3 Pre-registration — ${count} enrolled · Limited spots`}
        </p>
        <div className="hidden sm:flex items-center gap-3 shrink-0 ml-3">
          <CountdownTimer targetDate={SEMESTER_DEADLINE} compact />
          <button onClick={dismiss} aria-label="배너 닫기" className="text-white/60 hover:text-white transition-colors"><X size={14} /></button>
        </div>
        <button onClick={dismiss} aria-label="배너 닫기" className="sm:hidden text-white/60 hover:text-white transition-colors ml-2"><X size={14} /></button>
      </div>
    </div>
  )
}
