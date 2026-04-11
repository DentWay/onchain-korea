import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import CountdownTimer from '../CountdownTimer'
import useAuth from '../../hooks/useAuth'
import useStats from '../../hooks/useStats'
import useLang from '../../hooks/useLang'

const SEMESTER_DEADLINE = '2026-04-30T23:59:59+09:00'

export default function FinalCTA() {
  const { lang } = useLang()
  const { user, supabaseEnabled } = useAuth()
  const { stats } = useStats()
  const startLink = supabaseEnabled && !user ? '/auth' : '/dashboard'

  return (
    <section className="relative py-28 md:py-36 px-6 bg-[#0a0b0d] overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center rounded-full bg-[rgba(87,65,216,0.12)] border border-[rgba(87,65,216,0.24)] px-4 py-2 text-[13px] font-medium text-[#a78bfa]"
        >
          {lang === 'ko' ? '100% 무료 \u00b7 카드 불필요' : '100% Free \u00b7 No Card Required'}
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-8 text-[48px] md:text-[64px] font-bold text-white tracking-[-1.5px] leading-[1.05]"
        >
          {lang === 'ko' ? '지금 시작하세요' : 'Start Now'}
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-5 text-[18px] text-[#9497a9]"
        >
          {lang === 'ko'
            ? '4월 30일까지 등록 가능합니다.'
            : 'Registration open until April 30.'}
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <CountdownTimer targetDate={SEMESTER_DEADLINE} />
        </motion.div>

        {/* Purple pill CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-10"
        >
          <Link
            to={startLink}
            className="group inline-flex items-center gap-2 rounded-[56px] bg-[#5741d8] hover:bg-[#6b58e0] text-white px-10 py-4 text-[16px] font-semibold transition-colors"
          >
            {lang === 'ko' ? '무료로 시작하기' : 'Start Free'}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Info pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-2"
        >
          {[
            { ko: '무료', en: 'Free' },
            { ko: '즉시 Week 1 시작', en: 'Start Week 1 instantly' },
            { ko: '퀴즈 통과 시 다음 주 오픈', en: 'Next week unlocks after quiz' },
          ].map((pill, i) => (
            <span
              key={i}
              className="rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-4 py-1.5 text-[12px] text-[#9497a9]"
            >
              {lang === 'ko' ? pill.ko : pill.en}
            </span>
          ))}
        </motion.div>

        {/* Social proof */}
        {stats.total_users > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="mt-8 inline-flex items-center gap-2 text-[13px] text-[#9497a9]"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            {lang === 'ko'
              ? `수백 명이 이미 참여 중`
              : `Hundreds already joined`}
          </motion.div>
        )}
      </div>
    </section>
  )
}
