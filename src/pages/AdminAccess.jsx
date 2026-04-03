import { useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useLang from '../hooks/useLang'
import { ADMIN_ACCESS_PATH, ADMIN_CONSOLE_PATH, ADMIN_ENTRY_PATH } from '../lib/adminRoute'

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
    <div data-app-theme="dark" className="min-h-screen bg-[var(--surface-0)] px-4 py-8 text-[var(--text-high)] md:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link to={user ? '/dashboard' : '/'} className="text-[12px] text-[var(--text-mid)] hover:text-[var(--text-high)]">
            {pick(lang, '홈으로', 'Back')}
          </Link>
          <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--text-low)]">Admin Access</div>
        </div>

        <div className="rounded-[28px] border border-[var(--app-soft-border)] bg-[rgba(18,20,29,0.9)] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] md:p-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-low)]">
            {pick(lang, '운영 콘솔 접근', 'Operations Console')}
          </p>
          <h1 className="mt-3 text-[32px] font-[800] tracking-[-0.05em] text-[var(--text-high)] md:text-[42px]">
            {pick(lang, '관리자 잠금 해제', 'Unlock Admin Access')}
          </h1>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[var(--text-mid)]">
            {pick(
              lang,
              '승인된 관리자 계정으로 로그인한 뒤 운영 비밀번호를 입력하면 관리자 콘솔이 열립니다. 이 화면은 일반 사용자 내비게이션에 노출되지 않습니다.',
              'Sign in with an approved admin account, then enter the operations password to open the admin console. This screen is not exposed in normal user navigation.'
            )}
          </p>

          {(adminAccessLoading || submitting) && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[rgba(59,130,246,0.18)] bg-[rgba(59,130,246,0.08)] px-3 py-1.5 text-[12px] text-[#AFCBFF]">
              <div className="h-3.5 w-3.5 rounded-full border-2 border-[rgba(121,175,255,0.25)] border-t-[#79AFFF] animate-spin" />
              <span>{pick(lang, '관리자 세션을 확인 중입니다', 'Checking admin session')}</span>
            </div>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_260px]">
            <div>
              {!user ? (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-4 text-[13px] text-[var(--text-mid)]">
                    {pick(
                      lang,
                      '먼저 승인된 관리자 계정으로 로그인해야 합니다.',
                      'Sign in with an approved admin account first.'
                    )}
                  </div>
                  <Link
                    to="/auth"
                    state={{ from: ADMIN_ACCESS_PATH }}
                    className="inline-flex items-center justify-center rounded-full bg-[#4F83FF] px-5 py-3 text-[13px] font-semibold text-white hover:bg-[#5d8cff]"
                  >
                    {pick(lang, '승인 계정으로 로그인', 'Sign in')}
                  </Link>
                </div>
              ) : !canAccessAdminGate ? (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-[rgba(248,113,113,0.20)] bg-[rgba(248,113,113,0.10)] px-4 py-4 text-[13px] text-[#FCA5A5]">
                    {pick(
                      lang,
                      `현재 계정(${currentEmail || 'unknown'})은 관리자 접근 대상이 아닙니다. 승인된 관리자 계정으로 다시 로그인해야 합니다.`,
                      `The current account (${currentEmail || 'unknown'}) is not approved for admin access. Sign in again with an approved admin account.`
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => void signOut('/auth')}
                    className="inline-flex items-center justify-center rounded-full bg-[#4F83FF] px-5 py-3 text-[13px] font-semibold text-white hover:bg-[#5d8cff]"
                  >
                    {pick(lang, '다시 로그인', 'Sign in again')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="admin-password" className="block text-[12px] font-semibold text-[var(--text-high)]">
                      {pick(lang, '관리자 비밀번호', 'Admin password')}
                    </label>
                    <input
                      id="admin-password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder={pick(lang, '비밀번호를 입력하세요', 'Enter the password')}
                      autoComplete="current-password"
                      className="w-full rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-3 text-[14px] text-[var(--text-high)] outline-none placeholder:text-[var(--text-low)] focus:border-[#79AFFF]"
                    />
                    <p className="text-[12px] text-[var(--text-mid)]">
                      {pick(lang, '비밀번호는 서버에서 검증합니다. 성공하면 이 브라우저 세션에서만 운영 콘솔이 열립니다.', 'The password is verified on the server. Success opens the admin console only for this browser session.')}
                    </p>
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
                      className="inline-flex items-center justify-center rounded-full bg-[#4F83FF] px-5 py-3 text-[13px] font-semibold text-white hover:bg-[#5d8cff] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting ? pick(lang, '확인 중...', 'Checking...') : pick(lang, '관리자 열기', 'Open admin')}
                    </button>
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center justify-center rounded-full border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-5 py-3 text-[13px] font-semibold text-[var(--text-high)]"
                    >
                      {pick(lang, '대시보드로', 'Go to dashboard')}
                    </Link>
                  </div>
                </form>
              )}
            </div>

            <aside className="rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] p-4 text-[13px] text-[var(--text-mid)]">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-low)]">{pick(lang, '현재 조건', 'Requirements')}</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-low)]">{pick(lang, '현재 계정', 'Current account')}</p>
                  <p className="mt-1 break-all text-[13px] text-[var(--text-high)]">{currentEmail || pick(lang, '로그인 필요', 'Not signed in')}</p>
                </div>
                <div className="border-t border-[var(--app-divider)] pt-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-low)]">{pick(lang, '접근 기준', 'Access rule')}</p>
                  <p className="mt-1 text-[13px] text-[var(--text-high)]">
                    {pick(lang, '승인된 관리자 계정만 비밀번호를 통과할 수 있습니다.', 'Only approved admin accounts can pass this gate.')}
                  </p>
                </div>
                <div className="border-t border-[var(--app-divider)] pt-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-low)]">{pick(lang, '운영 경로', 'Ops path')}</p>
                  <code className="mt-1 block text-[12px] text-[var(--text-high)]">{ADMIN_ENTRY_PATH}</code>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
