import { useRef, useEffect, useState } from 'react'

export default function Counter({ value, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const num = parseInt(value)
    if (isNaN(num)) { setCount(value); return }
    let start = 0
    const step = num / (duration * 60)
    const animate = () => {
      start += step
      if (start >= num) { setCount(num); return }
      setCount(Math.floor(start))
      requestAnimationFrame(animate)
    }
    animate()
  }, [started, value, duration])

  return <span ref={ref}>{count}{suffix}</span>
}
