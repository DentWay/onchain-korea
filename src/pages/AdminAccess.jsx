import { useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import useLang from '../hooks/useLang'
import AdminGateFrame from '../components/admin/AdminGateFrame'
import { ADMIN_ACCESS_PATH, ADMIN_CONSOLE_PATH } from '../lib/adminRoute'

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

function getGateError(lang, error) {
  switch (String(error?.message || '')) {
    case 'admin_password_invalid':
      return pick(lang, '비밀번호가 맞지 않습니다.', 'The password is incorrect.')
    case 'admin_email_not_allowed':
      return pick(lang, '이 계정은 관리자 접근 대상이 아닙니다.', 'This account is not approved for admin access.')
    case 'admin_promotion_failed':
      return pick(lang, '관리자 권한 전환에 실패했습니다. Supabase 보안 SQL 적용 상태를 확인해주세요.', 'Failed to promote this account to admin. Check the Supabase hardening SQL.')
    case 'admin_unlock_timeout':
      return pick(lang, '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.', 'The request timed out. Please try again.')
    default:
      return pick(lang, '관리자 잠금 해제에 실패했습니다.', 'Failed to unlock admin access.')
  }
}

export default function AdminAccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, profile, canAccessAdminGate, adminAccessGranted, adminAccessLoading, unlockAdminAccess, signOut, supabaseEnabled } = useAuth()
  const { lang } = useLang()
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const destination = useMemo(() => {
    const from = location.state?.from
    return typeof from === 'string' && from.startsWith(ADMIN_CONSOLE_PATH) ? from : ADMIN_CONSOLE_PATH
  }, [location.state])

  if (!supabaseEnabled) {
    return <Navigate to="/" replace />
  }

  if (adminAccessGranted) {
    return <Navigate to={destination} replace />
  }

  const currentEmail = profile?.email || user?.email || ''

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!password || submitting) return

    setSubmitting(true)
    setError('')

    try {
      await unlockAdminAccess(password)
      navigate(destination, { replace: true })
    } catch (nextError) {
      setError(getGateError(lang, nextError))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AdminGateFrame
      backTo={user ? '/dashboard' : '/'}
      backLabel={pick(lang, '홈으로', 'Back')}
      topLabel="Admin Access"
      eyebrow={pick(lang, '운영 비밀번호', 'Operations Password')}
      title={pick(lang, '관리자 접근', 'Admin access')}
      description={pick(
        lang,
        '비밀번호를 입력하면 관리자 콘솔로 이동합니다.',
        'Enter the operations password to open the admin console.'
      )}
      compact
    >
      {(adminAccessLoading || submitting) && (
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(87,65,216,0.18)] bg-[rgba(87,65,216,0.08)] px-3 py-1.5 text-[12px] text-[#c4b5fd]">
          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[rgba(87,65,216,0.25)] border-t-[#5741d8]" />
          <span>{pick(lang, '관리자 세션 확인 중', 'Checking admin session')}</span>
        </div>
      )}

      {!user ? (
        <div className="space-y-4">
          <div className="rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-5 py-5">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#c4b5fd]" />
              <p className="text-[12px] font-semibold text-[#f3f4f6]">{pick(lang, '로그인 필요', 'Sign-in required')}</p>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-[#a0a3b5]">
              {pick(
                lang,
                '승인된 관리자 계정으로 로그인한 뒤 비밀번호를 입력하세요.',
                'Sign in with an approved admin account before entering the admin password.'
              )}
            </p>
          </div>
          <Link
            to="/auth"
            state={{ from: ADMIN_ACCESS_PATH }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5741d8] px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#7132f5]"
          >
            <span>{pick(lang, '승인 계정으로 로그인', 'Sign in')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : !canAccessAdminGate ? (
        <div className="space-y-4">
          <div className="rounded-[24px] border border-[rgba(248,113,113,0.20)] bg-[rgba(248,113,113,0.10)] px-5 py-5">
            <p className="text-[12px] font-semibold text-[#fecaca]">{pick(lang, '이 계정은 승인되지 않았습니다', 'This account is not approved')}</p>
            <p className="mt-3 text-[14px] leading-relaxed text-[#fca5a5]">
              {pick(
                lang,
                '승인된 관리자 계정으로 다시 로그인해야 합니다.',
                'Sign in again with an approved admin account.'
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => void signOut('/auth')}
            className="inline-flex items-center justify-center rounded-full bg-[#5741d8] px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#7132f5]"
          >
            {pick(lang, '다시 로그인', 'Sign in again')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-5 py-5">
            <p className="text-[11px] text-[#a0a3b5]">
              {pick(lang, '승인 계정 로그인됨', 'Approved account signed in')}
              <span className="ml-2 font-medium text-[#f3f4f6]">{currentEmail || '-'}</span>
            </p>

            <label htmlFor="admin-password" className="mt-5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#686b82]">
              {pick(lang, '비밀번호', 'Password')}
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={pick(lang, '운영 비밀번호를 입력하세요', 'Enter the operations password')}
              autoComplete="current-password"
              className="mt-3 w-full rounded-2xl border border-[rgba(255,255,255,0.10)] bg-[rgba(10,12,17,0.48)] px-4 py-3 text-[14px] text-[#e8e9ed] outline-none transition-colors placeholder:text-[#686b82] focus:border-[#5741d8]"
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-[rgba(248,113,113,0.20)] bg-[rgba(248,113,113,0.10)] px-4 py-3 text-[13px] text-[#FCA5A5]">
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={!password || submitting}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5741d8] px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#7132f5] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>{submitting ? pick(lang, '확인 중...', 'Checking...') : pick(lang, '관리자 열기', 'Open admin')}</span>
              {!submitting ? <ArrowRight size={16} /> : null}
            </button>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] px-6 py-3 text-[13px] font-semibold text-[#e8e9ed]"
            >
              {pick(lang, '대시보드로', 'Go to dashboard')}
            </Link>
          </div>
        </form>
      )}
    </AdminGateFrame>
  )
}
