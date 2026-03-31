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
        {/* 3-stripe gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />

        <div className="relative px-8 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-[24px] md:text-[32px] font-bold text-white tracking-tight">
              {t('landing.startNow')}
            </h3>
            <p className="text-[15px] text-white/80 mt-2 font-light">
              {t('landing.startNowSub')}
            </p>
          </div>
          <Link to={startLink} className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[15px] font-semibold text-gray-900 hover:bg-white/90 transition-colors">
            {t('landing.startWeek1')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
