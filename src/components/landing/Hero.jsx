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

  const bottomBand = lang === 'ko'
    ? ['기록하고', '증명하고', '성장하기']
    : ['Record', 'Verify', 'Grow']

  return (
    <motion.section
      ref={heroRef}
      style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-32"
    >
      <BlockchainCanvas />
      <FloatingBlocks />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--surface-0)]" style={{ zIndex: 1 }} />

      {/* Glowing orb — pure CSS */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px]">
        <div className="absolute inset-0 rounded-full bg-accent/8 blur-[160px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-[15%] rounded-full bg-purple-500/6 blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute inset-[30%] rounded-full bg-accent/10 blur-[80px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
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
          className="text-[56px] md:text-[80px] leading-[1.02] font-bold tracking-tight text-[var(--text-high)]"
        >
          {t('landing.hero1')}
          <br />
          <span className="bg-gradient-to-r from-[var(--accent)] via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {t('landing.hero2')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-[18px] md:text-[22px] text-[var(--text-mid)] leading-relaxed max-w-xl mx-auto font-light"
        >
          {t('landing.heroSub').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-14 flex flex-col items-center gap-5"
        >
          <div className="flex items-center justify-center gap-4">
            <Link to={startLink} className="ok-btn ok-btn-primary px-10 py-4 text-[16px]">
              {t('landing.startFree')}
              <ArrowRight size={18} />
            </Link>
            <a href="#curriculum" className="ok-btn ok-btn-ghost px-10 py-4 text-[16px]">{t('landing.viewCurriculum')}</a>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
            className="text-[12px] text-[var(--text-low)]">
            {t('landing.noCard')}
          </motion.p>

          {stats.total_users > 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-[12px] text-[var(--text-low)]">
              {stats.total_users}{t('landing.socialProof')}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Bottom band */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.4 }}
        className="relative z-10 mt-20 w-full max-w-2xl mx-auto"
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

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-5 h-8 rounded-full border border-[var(--border)] flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[var(--text-low)]" />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
