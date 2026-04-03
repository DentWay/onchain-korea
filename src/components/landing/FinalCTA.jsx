import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Section from './Section'
import CountdownTimer from '../CountdownTimer'
import useAuth from '../../hooks/useAuth'
import useStats from '../../hooks/useStats'
import useLang from '../../hooks/useLang'

// Real semester deadline -- same as FomoBanner
const SEMESTER_DEADLINE = '2026-04-30T23:59:59+09:00'

export default function FinalCTA() {
  const { t, lang } = useLang()
  const { user, supabaseEnabled } = useAuth()
  const { stats } = useStats()
  const startLink = supabaseEnabled && !user ? '/auth' : '/dashboard'

  return (
    <section className="relative py-24 md:py-32 px-6 bg-[var(--surface-0)] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="ok-landing-panel p-8 md:p-10 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] text-[var(--text-low)] uppercase tracking-[0.2em]"
          >
            {t('landing.semesterCloses')}
          </motion.p>
          <div className="mt-4 flex justify-center"><CountdownTimer targetDate={SEMESTER_DEADLINE} /></div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-8 text-[32px] md:text-[48px] font-bold tracking-tight leading-[1.1]"
          >
            <span className="text-[var(--text-high)]">
              {t('landing.finalTitle1')}
            </span>{' '}
            <span className="text-[var(--accent-soft)]">
              {t('landing.finalTitle2')}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mt-5 max-w-2xl text-[15px] text-[var(--text-mid)]"
          >
            {t('landing.finalDesc')}
          </motion.p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-[11px] text-[var(--text-low)]">
            <span className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5">
              {t('landing.priceFree')}
            </span>
            <span className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5">
              {lang === 'ko' ? 'Week 1 바로 시작 가능' : 'Start with Week 1 immediately'}
            </span>
            <span className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5">
              {lang === 'ko' ? '통과하면 Week 5-8 언락' : 'Weeks 5-8 unlock after passing'}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Link to={startLink} className="group ok-btn ok-btn-primary px-10 py-4 text-[15px]">
              {t('landing.startFromWeek1')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {stats.total_users > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-5 text-[12px] text-[var(--text-low)]"
            >
              {stats.total_users}{t('landing.socialProofEnrolled')}
            </motion.p>
          )}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="mt-2 text-[11px] text-[var(--text-low)]"
          >
            {t('landing.noCard')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
