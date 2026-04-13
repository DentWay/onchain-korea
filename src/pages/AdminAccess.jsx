import { useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, BarChart3, Gauge, KeyRound, LockKeyhole, ShieldCheck, Trophy, UserCheck } from 'lucide-react'
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

  const chips = [
    { label: pick(lang, '경로', 'Route'), value: '/ops/onchainkorea-admin/access', tone: 'default' },
    user
      ? {
          label: pick(lang, '승인 계정', 'Approved account'),
          value: canAccessAdminGate ? pick(lang, '확인됨', 'Verified') : pick(lang, '미승인', 'Not approved'),
          tone: canAccessAdminGate ? 'success' : 'warning',
        }
      : {
          label: pick(lang, '로그인', 'Login'),
          value: pick(lang, '필요', 'Required'),
          tone: 'warning',
        },
    { label: pick(lang, '세션 잠금', 'Session lock'), value: pick(lang, '해제 전', 'Locked'), tone: 'default' },
  ]

  const guardItems = [
    {
      icon: UserCheck,
      title: pick(lang, '승인 계정만 통과', 'Approved accounts only'),
      desc: pick(
        lang,
        '허용된 관리자 계정으로 로그인한 경우에만 다음 단계가 열립니다.',
        'The next step opens only when the signed-in account is on the approved admin list.'
      ),
    },
    {
      icon: KeyRound,
      title: pick(lang, '비밀번호는 서버 검증', 'Password checked on the server'),
      desc: pick(
        lang,
        '운영 비밀번호는 브라우저에서 비교하지 않고 서버에서 검증합니다.',
        'The operations password is never compared in the browser. Verification happens on the server.'
      ),
    },
    {
      icon: LockKeyhole,
      title: pick(lang, '현재 브라우저 세션에만 적용', 'Browser-session only'),
      desc: pick(
        lang,
        '잠금 해제 성공 후에도 해당 브라우저 세션에서만 관리자 콘솔이 열립니다.',
        'Even after a successful unlock, admin access is limited to the current browser session.'
      ),
    },
  ]

  const consoleCards = [
    {
      icon: Gauge,
      title: pick(lang, '운영 대시보드', 'Operations dashboard'),
      desc: pick(lang, '활성, 정체, 수료, 콘텐츠 검수 상태를 먼저 봅니다.', 'See active, stalled, completed, and content audit status first.'),
    },
    {
      icon: Trophy,
      title: pick(lang, '학습자 랭킹', 'Learner leaderboard'),
      desc: pick(lang, '주차, 진행률, 테스트 통과 상태를 빠르게 비교합니다.', 'Compare week, progress, and test completion quickly.'),
    },
    {
      icon: BarChart3,
      title: pick(lang, '학습 분석', 'Learning analytics'),
      desc: pick(lang, '주차별 전환과 난도 경고를 보고 개입 우선순위를 정합니다.', 'Use conversion and difficulty alerts to set intervention priorities.'),
    },
  ]

  return (
    <AdminGateFrame
      backTo={user ? '/dashboard' : '/'}
      backLabel={pick(lang, '홈으로', 'Back')}
      topLabel="Admin Access"
      eyebrow={pick(lang, '운영 잠금 해제', 'Operations Unlock')}
      title={pick(lang, '관리자 세션 잠금 해제', 'Unlock the admin session')}
      description={pick(
        lang,
        '승인된 관리자 계정 로그인과 운영 비밀번호 검증이 모두 끝나면 관리자 콘솔이 열립니다. 이 단계는 공개 학습자 내비게이션과 분리되어 유지됩니다.',
        'After signing in with an approved admin account, verify the operations password to open the console. This step is never exposed in the public learner navigation.'
      )}
      chips={chips}
      aside={
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#686b82]">
            {pick(lang, '보안 규칙', 'Security rules')}
          </p>
          <div className="mt-4 space-y-3">
            {guardItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[rgba(87,65,216,0.14)] text-[#c4b5fd]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-semibold text-[#f3f4f6]">{item.title}</h3>
                      <p className="mt-2 text-[12px] leading-relaxed text-[#a0a3b5]">{item.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#686b82]">
                {pick(lang, '현재 계정', 'Current account')}
              </p>
              <p className="mt-2 truncate text-[14px] font-semibold text-[#f3f4f6]">{currentEmail || '-'}</p>
            </div>
          </div>
        </div>
      }
    >
      {(adminAccessLoading || submitting) && (
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(87,65,216,0.18)] bg-[rgba(87,65,216,0.08)] px-3 py-1.5 text-[12px] text-[#c4b5fd]">
          <div className="h-3.5 w-3.5 rounded-full border-2 border-[rgba(87,65,216,0.25)] border-t-[#5741d8] animate-spin" />
          <span>{pick(lang, '관리자 세션을 확인 중입니다', 'Checking admin session')}</span>
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
                '관리자 잠금 해제는 승인된 관리자 계정 로그인 이후에만 진행할 수 있습니다.',
                'Admin unlock is available only after you sign in with an approved admin account.'
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
                `현재 계정(${currentEmail || 'unknown'})은 관리자 접근 대상이 아닙니다. 승인된 계정으로 다시 로그인해야 합니다.`,
                `The current account (${currentEmail || 'unknown'}) is not approved for admin access. Sign in again with an approved account.`
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
          <div className="grid gap-3 md:grid-cols-3">
            {[
              {
                label: pick(lang, '현재 계정', 'Current account'),
                value: currentEmail || '-',
              },
              {
                label: pick(lang, '도착 경로', 'Destination'),
                value: destination,
              },
              {
                label: pick(lang, '검증 방식', 'Verification'),
                value: pick(lang, '서버 검증 + 세션 쿠키', 'Server check + session cookie'),
              },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#686b82]">{item.label}</p>
                <p className="mt-2 break-all text-[13px] font-semibold text-[#f3f4f6]">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-5 py-5">
            <label htmlFor="admin-password" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#686b82]">
              {pick(lang, '관리자 비밀번호', 'Admin password')}
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
            <p className="mt-3 text-[12px] leading-relaxed text-[#a0a3b5]">
              {pick(
                lang,
                '비밀번호는 서버에서 검증합니다. 검증이 끝나면 현재 브라우저 세션에 한해 관리자 콘솔 접근이 열립니다.',
                'The password is verified on the server. A successful check opens admin mode only in the current browser session.'
              )}
            </p>
          </div>

          <div className="rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#686b82]">
              {pick(lang, '잠금 해제 후 열리는 화면', 'What opens after unlock')}
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {consoleCards.map((card) => {
                const Icon = card.icon
                return (
                  <div key={card.title} className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-4 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(87,65,216,0.12)] text-[#c4b5fd]">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-4 text-[14px] font-semibold text-[#f3f4f6]">{card.title}</h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-[#a0a3b5]">{card.desc}</p>
                  </div>
                )
              })}
            </div>
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
