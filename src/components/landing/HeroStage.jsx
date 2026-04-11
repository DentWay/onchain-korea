import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuth from '../../hooks/useAuth'
import useLang from '../../hooks/useLang'

const Spline = lazy(() => import('@splinetool/react-spline'))

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function HeroStage() {
  const { t, lang } = useLang()
  const { user, supabaseEnabled } = useAuth()
  const startLink = supabaseEnabled && !user ? '/auth' : '/dashboard'

  const pick = (ko, en) => (lang === 'ko' ? ko : en)

  return (
    <section className="relative min-h-[100svh] bg-[#0a0b0d] overflow-hidden">
      {/* Spline 3D background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Spline scene="https://prod.spline.design/TbhR60wAFXrHjFrW/scene.splinecode" />
        </Suspense>
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 py-32">
        <div className="mx-auto w-full max-w-3xl text-center">
          {/* Badge */}
          <motion.div {...fade(0.1)} className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5741d8]/12 border border-[#5741d8]/20 text-[13px] font-medium text-[#828fff] tracking-wide">
              Greed Academy &times; Elixi
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            {...fade(0.25)}
            className="mt-8 text-[36px] md:text-[52px] lg:text-[80px] font-bold leading-[1.00] tracking-[-2px] text-white"
          >
            {pick('블록체인, 처음부터 안전하게', 'Blockchain. Safe from the Start.')}
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            {...fade(0.4)}
            className="mx-auto mt-6 max-w-[520px] text-[16px] md:text-[18px] leading-[1.65] text-[#9497a9]"
          >
            {pick(
              '지갑 생성부터 DeFi까지, 8주 만에 온체인 세계를 경험하세요. Greed Academy 커리큘럼 기반, 100% 무료.',
              'From wallet creation to DeFi, experience the on-chain world in 8 weeks. Based on the Greed Academy curriculum, 100% free.'
            )}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fade(0.55)} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={startLink}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-[56px] bg-[#5741d8] text-white text-[15px] font-semibold hover:bg-[#828fff] transition-colors min-w-[180px]"
            >
              {pick('무료로 시작하기', 'Start Free')}
            </Link>
            <a
              href="#curriculum"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-[56px] bg-[#0052ff] text-white text-[15px] font-semibold hover:bg-[#578bfa] transition-colors min-w-[180px]"
            >
              {pick('커리큘럼 보기', 'View Curriculum')}
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div {...fade(0.7)} className="mt-8 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#4ADE80] animate-pulse" />
            <span className="text-[13px] text-[#9497a9]">
              {pick('지금 참여 가능 · 4월 30일 마감', 'Open for enrollment · Deadline Apr 30')}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
