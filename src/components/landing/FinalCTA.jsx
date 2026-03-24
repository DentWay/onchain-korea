import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Section from './Section'
import CountdownTimer from '../CountdownTimer'
import useLang from '../../hooks/useLang'

const SEMESTER_DEADLINE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

export default function FinalCTA() {
  const { t, lang } = useLang()

  return (
    <Section className="py-32 px-6 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/3 rounded-full blur-[120px]" />

      <div className="relative max-w-xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <p className="text-[11px] text-[var(--text-low)] uppercase tracking-wider mb-3">
            {lang === 'ko' ? '등록 마감까지' : 'Registration closes in'}
          </p>
          <div className="flex justify-center"><CountdownTimer targetDate={SEMESTER_DEADLINE} /></div>
        </motion.div>

        <h2 className="text-3xl md:text-[44px] font-bold tracking-tight leading-tight text-[var(--text-high)]">
          {t('landing.finalTitle1')}<br />
          <span className="text-accent-soft">{t('landing.finalTitle2')}</span>
        </h2>
        <p className="text-[16px] text-[var(--text-mid)] mt-5 font-light">{t('landing.finalDesc')}</p>

        <Link to="/dashboard" className="group ok-btn ok-btn-primary mt-12 px-9 py-4 text-[16px]">
          {t('landing.startFree')}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        <p className="mt-5 text-[12px] text-[var(--text-low)]">
          {lang === 'ko' ? '147명이 이미 등록했습니다' : '147 already enrolled'}
        </p>
        <p className="mt-2 text-[12px] text-[var(--text-low)]">{t('landing.noSignup')}</p>
      </div>
    </Section>
  )
}
