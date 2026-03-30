import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import useLang from '../../hooks/useLang'

export default function InlineCTA() {
  const { t, lang } = useLang()
  const { user, supabaseEnabled } = useAuth()
  const startLink = supabaseEnabled && !user ? '/auth' : '/dashboard'

  return (
    <div className="py-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 ok-card p-6 border-accent/10">
        <div>
          <p className="text-[15px] font-semibold text-[var(--text-high)]">
            {t('landing.startNow')}
          </p>
          <p className="text-[12px] text-[var(--text-mid)] mt-1">
            {t('landing.startNowSub')}
          </p>
        </div>
        <Link to={startLink} className="ok-btn ok-btn-primary px-6 py-2.5 text-[13px] shrink-0">
          {t('landing.startWeek1')}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
