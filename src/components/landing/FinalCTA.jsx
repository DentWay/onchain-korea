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

export default function FinalCTA() {
  const { t, lang } = useLang()
  const { user, supabaseEnabled } = useAuth()
  const { stats } = useStats()
  const startLink = supabaseEnabled && !user ? '/auth' : '/dashboard'

  return (
    <Section className="py-32 px-6 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/3 rounded-full blur-[120px]" />

      <div className="relative max-w-xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <p className="text-[11px] text-[var(--text-low)] uppercase tracking-wider mb-3">
            {t('landing.semesterCloses')}
          </p>
          <div className="flex justify-center"><CountdownTimer targetDate={SEMESTER_DEADLINE} /></div>
        </motion.div>

        <h2 className="text-3xl md:text-[44px] font-bold tracking-tight leading-tight text-[var(--text-high)]">
          {t('landing.finalTitle1')}<br />
          <span className="text-accent-soft">{t('landing.finalTitle2')}</span>
        </h2>
        <p className="text-[16px] text-[var(--text-mid)] mt-5 font-light">{t('landing.finalDesc')}</p>

        {/* Price anchoring */}
        <div className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--surface-1)] border border-[var(--border)]">
          <span className="text-[13px] text-[var(--text-low)] line-through">
            {t('landing.priceAnchorShort')}
          </span>
          <span className="text-[14px] font-bold text-success">
            {t('landing.priceFree')}
          </span>
        </div>

        <div className="mt-8">
          <Link to={startLink} className="group ok-btn ok-btn-primary px-9 py-4 text-[16px]">
            {t('landing.startFromWeek1')}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {stats.total_users > 0 && (
          <p className="mt-4 text-[12px] text-[var(--text-low)]">
            {stats.total_users}{t('landing.socialProofEnrolled')}
          </p>
        )}
        <p className="mt-2 text-[11px] text-[var(--text-low)]">
          {t('landing.noCard')}
        </p>
      </div>
    </Section>
  )
}
