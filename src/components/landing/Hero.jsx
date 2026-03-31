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
  const splineOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const { t } = useLang()
  const { user, supabaseEnabled } = useAuth()
  const { stats } = useStats()
  const startLink = supabaseEnabled && !user ? '/auth' : '/dashboard'

  return (
    <section ref={sectionRef} className="relative pt-24">
      {/* Spline 3D — pointer-events:none so page scroll works through it */}
      <motion.div
        style={{ opacity: splineOpacity }}
        className="relative w-full h-[60vh] md:h-[70vh] pointer-events-none select-none"
      >
        <Suspense fallback={null}>
          <Spline scene="https://prod.spline.design/TbhR60wAFXrHjFrW/scene.splinecode" />
        </Suspense>
        {/* Covers watermark + blends into page */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--surface-0)] to-transparent" />
      </motion.div>

      {/* Content — natural flow below 3D */}
      <div className="relative z-10 -mt-16 pb-24 px-6">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface-1)] border border-[var(--border)] text-[11px] text-[var(--text-mid)] mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-success ok-pulse-dot" />
              {t('landing.badge')}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[40px] md:text-[64px] leading-[1.08] font-bold tracking-tight text-[var(--text-high)]"
          >
            {t('landing.hero1')}
            <br />
            <span className="text-accent-soft">{t('landing.hero2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-[16px] md:text-[19px] text-[var(--text-mid)] leading-relaxed max-w-lg mx-auto"
          >
            {t('landing.heroSub').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <div className="flex items-center justify-center gap-3">
              <Link to={startLink} className="ok-btn ok-btn-primary px-7 py-3 text-[14px]">
                {t('landing.startFree')}
                <ArrowRight size={15} />
              </Link>
              <a href="#curriculum" className="ok-btn ok-btn-ghost px-7 py-3 text-[14px]">{t('landing.viewCurriculum')}</a>
            </div>
            <p className="text-[11px] text-[var(--text-low)]">{t('landing.noCard')}</p>
            {stats.total_users > 0 && (
              <p className="text-[11px] text-[var(--text-low)]">{stats.total_users}{t('landing.socialProof')}</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
