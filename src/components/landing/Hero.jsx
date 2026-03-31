import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, Suspense, lazy } from 'react'
import { ArrowRight } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import useStats from '../../hooks/useStats'
import useLang from '../../hooks/useLang'

const Spline = lazy(() => import('@splinetool/react-spline'))

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  // 3D zone: fade out as you scroll past first screen
  const splineOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const splineScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.92])

  // Text zone: fade in as 3D fades out
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1])
  const textY = useTransform(scrollYProgress, [0.25, 0.5], [80, 0])

  // Bottom band
  const bandOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1])
  const bandY = useTransform(scrollYProgress, [0.45, 0.65], [40, 0])

  const { t, lang } = useLang()
  const { user, supabaseEnabled } = useAuth()
  const { stats } = useStats()
  const startLink = supabaseEnabled && !user ? '/auth' : '/dashboard'

  const bottomBand = lang === 'ko'
    ? ['기록하고', '증명하고', '성장하기']
    : ['Record', 'Verify', 'Grow']

  return (
    <section ref={sectionRef} className="relative" style={{ height: '250vh' }}>
      {/* Sticky container — locks everything in viewport while scrolling */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[var(--surface-0)]">

        {/* Layer 1: Spline 3D — fades out on scroll */}
        <motion.div
          style={{ opacity: splineOpacity, scale: splineScale }}
          className="absolute inset-0 z-0"
        >
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
          }>
            <Spline scene="https://prod.spline.design/TbhR60wAFXrHjFrW/scene.splinecode" />
          </Suspense>
        </motion.div>

        {/* Gradient overlay for smooth transition */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[var(--surface-0)]/20 via-transparent to-[var(--surface-0)]/60 pointer-events-none" />

        {/* Scroll hint — visible only at top */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2">
            <span className="text-[11px] text-[var(--text-low)]">{lang === 'ko' ? '스크롤' : 'Scroll'}</span>
            <div className="w-5 h-8 rounded-full border border-[var(--border)] flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-[var(--text-low)]" />
            </div>
          </motion.div>
        </motion.div>

        {/* Layer 2: Text content — fades in as 3D fades out */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--surface-1)]/80 backdrop-blur-xl border border-[var(--border)] text-[12px] text-[var(--text-mid)] mb-10">
              <div className="w-1.5 h-1.5 rounded-full bg-success ok-pulse-dot" />
              {t('landing.badge')}
            </div>

            <h1 className="text-[48px] md:text-[80px] leading-[1.02] font-bold tracking-tight text-[var(--text-high)]">
              {t('landing.hero1')}
              <br />
              <span className="bg-gradient-to-r from-[var(--accent)] via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {t('landing.hero2')}
              </span>
            </h1>

            <p className="mt-8 text-[17px] md:text-[22px] text-[var(--text-mid)] leading-relaxed max-w-xl mx-auto font-light">
              {t('landing.heroSub').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
            </p>

            <div className="mt-14 flex flex-col items-center gap-5">
              <div className="flex items-center justify-center gap-4">
                <Link to={startLink} className="ok-btn ok-btn-primary px-10 py-4 text-[16px]">
                  {t('landing.startFree')}
                  <ArrowRight size={18} />
                </Link>
                <a href="#curriculum" className="ok-btn ok-btn-ghost px-10 py-4 text-[16px]">{t('landing.viewCurriculum')}</a>
              </div>

              <p className="text-[12px] text-[var(--text-low)]">
                {t('landing.noCard')}
              </p>

              {stats.total_users > 0 && (
                <p className="text-[12px] text-[var(--text-low)]">
                  {stats.total_users}{t('landing.socialProof')}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Layer 3: Bottom band — appears last */}
        <motion.div
          style={{ opacity: bandOpacity, y: bandY }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-6"
        >
          <div className="ok-glass rounded-2xl px-8 py-5 flex items-center justify-center gap-6 md:gap-10">
            {bottomBand.map((word, i) => (
              <span key={i} className="flex items-center gap-6 md:gap-10">
                <span className="text-[15px] md:text-[18px] font-semibold text-[var(--text-high)] tracking-tight">
                  {word}
                </span>
                {i < bottomBand.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-accent/40" />
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
