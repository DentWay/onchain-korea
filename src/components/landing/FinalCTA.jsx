import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Section from './Section'
import CountdownTimer from '../CountdownTimer'
import useAuth from '../../hooks/useAuth'
import useStats from '../../hooks/useStats'
import useLang from '../../hooks/useLang'

// Real semester deadline — same as FomoBanner
const SEMESTER_DEADLINE = '2026-04-30T23:59:59+09:00'

/* Floating glow orb */
function GlowOrb({ className, delay = 0, duration = 12 }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      animate={{
        x: [0, 30, -20, 10, 0],
        y: [0, -20, 15, -10, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  )
}

export default function FinalCTA() {
  const { t, lang } = useLang()
  const { user, supabaseEnabled } = useAuth()
  const { stats } = useStats()
  const startLink = supabaseEnabled && !user ? '/auth' : '/dashboard'

  return (
    <section className="relative py-32 md:py-40 px-6 bg-black overflow-hidden">
      {/* Ambient floating glow orbs */}
      <GlowOrb className="bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/5 blur-[160px]" delay={0} duration={14} />
      <GlowOrb className="top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-500/5 blur-[120px]" delay={2} duration={10} />
      <GlowOrb className="top-1/3 right-1/5 w-[200px] h-[200px] bg-cyan-500/4 blur-[100px]" delay={4} duration={16} />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Countdown */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <p className="text-[12px] text-[var(--text-low)] uppercase tracking-[0.2em] mb-4">
            {t('landing.semesterCloses')}
          </p>
          <div className="flex justify-center"><CountdownTimer targetDate={SEMESTER_DEADLINE} /></div>
        </motion.div>

        {/* Huge headline — each line reveals on scroll */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
          className="text-[40px] md:text-[64px] font-bold tracking-tight leading-[1.05]"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="block text-[var(--text-high)]"
          >
            {t('landing.finalTitle1')}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="block bg-gradient-to-r from-[var(--accent)] via-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            {t('landing.finalTitle2')}
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[17px] md:text-[20px] text-[var(--text-mid)] mt-6 font-light"
        >
          {t('landing.finalDesc')}
        </motion.p>

        {/* Price anchoring */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--surface-1)] border border-[var(--border)]"
        >
          <span className="text-[14px] text-[var(--text-low)] line-through">
            {t('landing.priceAnchorShort')}
          </span>
          <span className="text-[16px] font-bold text-success">
            {t('landing.priceFree')}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10"
        >
          <Link to={startLink} className="ok-final-cta-btn group ok-btn ok-btn-primary px-12 py-5 text-[17px]">
            {t('landing.startFromWeek1')}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {stats.total_users > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-5 text-[13px] text-[var(--text-low)]"
          >
            {stats.total_users}{t('landing.socialProofEnrolled')}
          </motion.p>
        )}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-2 text-[12px] text-[var(--text-low)]"
        >
          {t('landing.noCard')}
        </motion.p>
      </div>
    </section>
  )
}
