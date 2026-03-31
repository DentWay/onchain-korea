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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className="py-24 px-6"
    >
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-2xl">
        {/* 3-stripe gradient background with shifting animation */}
        <div
          className="absolute inset-0 opacity-90 ok-gradient-shift"
          style={{
            background: 'linear-gradient(135deg, #2563EB, #9333EA, #10B981, #2563EB)',
            backgroundSize: '200% 200%',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />

        <div className="relative px-8 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-[24px] md:text-[32px] font-bold text-white tracking-tight">
              {t('landing.startNow')}
            </h3>
            <p className="text-[15px] text-white/80 mt-2 font-light">
              {t('landing.startNowSub')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              to={startLink}
              className="ok-inline-cta-btn shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[15px] font-semibold text-gray-900 hover:bg-white/90 transition-colors"
            >
              {t('landing.startWeek1')}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
