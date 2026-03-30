import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import BlockchainCanvas from './BlockchainCanvas'
import FloatingBlocks from './FloatingBlocks'
import useAuth from '../../hooks/useAuth'
import useStats from '../../hooks/useStats'
import useLang from '../../hooks/useLang'

export default function Hero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const { t, lang } = useLang()
  const { user, supabaseEnabled } = useAuth()
  const { stats } = useStats()
  const startLink = supabaseEnabled && !user ? '/auth' : '/dashboard'

  return (
    <motion.section
      ref={heroRef}
      style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      className="relative min-h-screen flex items-center justify-center px-6 pt-24"
    >
      <BlockchainCanvas />
      <FloatingBlocks />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--surface-0)]" style={{ zIndex: 1 }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[150px]" />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--surface-1)] border border-[var(--border)] text-[12px] text-[var(--text-mid)] mb-10">
            <div className="w-1.5 h-1.5 rounded-full bg-success ok-pulse-dot" />
            {t('landing.badge')}
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-[48px] md:text-[72px] leading-[1.05] font-bold tracking-tight text-[var(--text-high)]"
        >
          {t('landing.hero1')}
          <br />
          <span className="text-accent-soft">{t('landing.hero2')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-7 text-[17px] md:text-[20px] text-[var(--text-mid)] leading-relaxed max-w-lg mx-auto font-light"
        >
          {t('landing.heroSub').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <div className="flex items-center justify-center gap-4">
            <Link to={startLink} className="ok-btn ok-btn-primary px-8 py-3.5 text-[15px]">
              {t('landing.startFree')}
              <ArrowRight size={16} />
            </Link>
            <a href="#curriculum" className="ok-btn ok-btn-ghost px-8 py-3.5 text-[15px]">{t('landing.viewCurriculum')}</a>
          </div>

          {/* Doubt remover */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
            className="text-[11px] text-[var(--text-low)]">
            {t('landing.noCard')}
          </motion.p>

          {/* Social proof */}
          {stats.total_users > 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-[12px] text-[var(--text-low)]">
              {stats.total_users}{t('landing.socialProof')}
            </motion.p>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute -bottom-20 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-5 h-8 rounded-full border border-[var(--border)] flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[var(--text-low)]" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
