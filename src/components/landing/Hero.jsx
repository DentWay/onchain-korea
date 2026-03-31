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
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const splineOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const splineY = useTransform(scrollYProgress, [0, 0.6], [0, -80])

  const { t, lang } = useLang()
  const { user, supabaseEnabled } = useAuth()
  const { stats } = useStats()
  const startLink = supabaseEnabled && !user ? '/auth' : '/dashboard'

  return (
    <section ref={sectionRef} className="relative">
      {/* Spline 3D — inline, natural flow, no separate background */}
      <motion.div
        style={{ opacity: splineOpacity, y: splineY }}
        className="relative w-full h-[70vh] md:h-[80vh]"
      >
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        }>
          <Spline scene="https://prod.spline.design/TbhR60wAFXrHjFrW/scene.splinecode" />
        </Suspense>
        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--surface-0)] to-transparent pointer-events-none" />
      </motion.div>

      {/* Text content — directly below 3D, natural scroll */}
      <div className="relative z-10 -mt-20 pb-32 px-6">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--surface-1)] border border-[var(--border)] text-[12px] text-[var(--text-mid)] mb-10">
              <div className="w-1.5 h-1.5 rounded-full bg-success ok-pulse-dot" />
              {t('landing.badge')}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-[48px] md:text-[80px] leading-[1.02] font-bold tracking-tight text-[var(--text-high)]"
          >
            {t('landing.hero1')}
            <br />
            <span className="bg-gradient-to-r from-[var(--accent)] via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {t('landing.hero2')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-[17px] md:text-[22px] text-[var(--text-mid)] leading-relaxed max-w-xl mx-auto font-light"
          >
            {t('landing.heroSub').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-14 flex flex-col items-center gap-5"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
