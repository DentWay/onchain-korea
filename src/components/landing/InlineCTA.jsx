import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import useLang from '../../hooks/useLang'

export default function InlineCTA() {
  const { t, lang } = useLang()
  const { user, supabaseEnabled } = useAuth()
  const startLink = supabaseEnabled && !user ? '/auth' : '/dashboard'

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="py-24 px-6"
    >
      <div className="max-w-5xl mx-auto ok-card border-[var(--accent)]/10 px-8 py-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <h3 className="text-[20px] md:text-[24px] font-bold text-[var(--text-high)] tracking-tight">
            {t('landing.startNow')}
          </h3>
          <p className="text-[14px] text-[var(--text-mid)] mt-2">
            {t('landing.startNowSub')}
          </p>
        </div>
        <Link
          to={startLink}
          className="shrink-0 ok-btn ok-btn-primary px-8 py-3 text-[14px]"
        >
          {t('landing.startWeek1')}
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.section>
  )
}
