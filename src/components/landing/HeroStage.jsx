import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import BrandLockup from '../brand/BrandLockup'
import useAuth from '../../hooks/useAuth'
import useStats from '../../hooks/useStats'
import useLang from '../../hooks/useLang'

const Spline = lazy(() => import('@splinetool/react-spline'))

export default function HeroStage() {
  const { t } = useLang()
  const { user, supabaseEnabled } = useAuth()
  const { stats } = useStats()
  const startLink = supabaseEnabled && !user ? '/auth' : '/dashboard'

  return (
    <section className="relative h-[100svh] min-h-[100svh] bg-black">
      <div className="pointer-events-none fixed inset-x-0 bottom-0 top-[5.75rem] z-0 bg-black">
        <Suspense fallback={null}>
          <Spline scene="https://prod.spline.design/TbhR60wAFXrHjFrW/scene.splinecode" />
        </Suspense>
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black via-black/88 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full min-h-[100svh] items-end px-6 pb-14 pt-28 md:pb-16 md:pt-32">
        <div className="mx-auto w-full max-w-7xl text-center">
          <div className="ok-readable-panel w-full px-5 py-5 md:px-7 md:py-6">
            <div className="relative z-10 mx-auto max-w-3xl">
              <div className="flex justify-center">
                <BrandLockup surface="dark" withElixi responsive className="origin-center scale-[1.02] md:scale-[1.12]" />
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-low)]">
                <span className="h-2 w-2 rounded-full bg-[#4ADE80]" />
                <span>{t('landing.semester1Badge')}</span>
              </div>

              <h1 className="mt-4 text-[36px] font-bold leading-[1.04] tracking-[-0.045em] text-[var(--text-high)] md:text-[60px] md:leading-[1.02]">
                {t('landing.hero1')}{t('landing.hero2')}
              </h1>

              <p className="mx-auto mt-5 max-w-[52rem] text-[14px] leading-[1.7] text-[var(--text-mid)] md:text-[16px]">
                {t('landing.heroSub')}
              </p>

              <div className="pointer-events-auto mt-6 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
                <Link to={startLink} className="ok-btn ok-btn-primary px-7 py-3 text-[14px]">
                  {t('landing.startFree')}
                  <ArrowRight size={15} />
                </Link>
                <a href="#curriculum" className="ok-btn ok-btn-light px-6 py-3 text-[14px]">
                  {t('landing.viewCurriculum')}
                </a>
              </div>

              {stats.total_users > 0 && (
                <p className="mt-4 text-[12px] text-[var(--text-low)]">
                  {stats.total_users}{t('landing.socialProof')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
