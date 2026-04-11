import { Link, Navigate, useLocation } from 'react-router-dom'
import { ArrowRight, Gauge, KeyRound, ShieldCheck, UserCheck } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import useLang from '../hooks/useLang'
import AdminGateFrame from '../components/admin/AdminGateFrame'
import { ADMIN_ACCESS_PATH, ADMIN_CONSOLE_PATH } from '../lib/adminRoute'

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

export default function AdminEntry() {
  const location = useLocation()
  const { user, profile, canAccessAdminGate, adminAccessGranted, supabaseEnabled } = useAuth()
  const { lang } = useLang()

  if (!supabaseEnabled) {
    return <Navigate to="/" replace />
  }

  const destination = typeof location.state?.from === 'string' && location.state.from.startsWith(ADMIN_CONSOLE_PATH)
    ? location.state.from
    : ADMIN_CONSOLE_PATH

  if (adminAccessGranted) {
    return <Navigate to={destination} replace />
  }

  const currentEmail = profile?.email || user?.email || ''

  const chips = [
    { label: pick(lang, '경로', 'Route'), value: '/ops/onchainkorea-admin', tone: 'default' },
    user
      ? {
          label: pick(lang, '계정 상태', 'Account'),
          value: canAccessAdminGate ? pick(lang, '승인됨', 'Approved') : pick(lang, '미승인', 'Not approved'),
          tone: canAccessAdminGate ? 'success' : 'warning',
        }
      : {
          label: pick(lang, '로그인', 'Login'),
          value: pick(lang, '필요', 'Required'),
          tone: 'warning',
        },
    { label: pick(lang, '세션 잠금', 'Session Lock'), value: pick(lang, '활성', 'Enabled'), tone: 'default' },
  ]

  const steps = [
    {
      icon: UserCheck,
      title: pick(lang, '승인된 계정으로 로그인', 'Sign in with an approved account'),
      desc: pick(
        lang,
        '일반 사용자 경로와 분리된 운영 경로입니다. 승인된 관리자 계정으로 먼저 로그인해야 해요.',
        'This route is separated from the public learner flow. Start by signing in with an approved admin account.'
      ),
    },
    {
      icon: KeyRound,
      title: pick(lang, '운영 비밀번호 확인', 'Verify the operations password'),
      desc: pick(
        lang,
        '비밀번호는 서버에서 확인하고, 성공하면 이 브라우저 세션에서만 관리자 잠금이 해제됩니다.',
        'The password is verified on the server, and a successful check unlocks admin mode only for this browser session.'
      ),
    },
    {
      icon: Gauge,
      title: pick(lang, '운영 콘솔에서 바로 판단', 'Read the console at a glance'),
      desc: pick(
        lang,
        '콘솔 첫 화면에서 KPI, 퍼널, 병목 주차, 위험군 큐를 바로 확인할 수 있게 구성했습니다.',
        'The console is structured to show KPI, funnel, bottlenecks, and the at-risk queue immediately.'
      ),
    },
  ]

  return (
    <AdminGateFrame
      backTo={user ? '/dashboard' : '/'}
      backLabel={pick(lang, '홈으로', 'Back')}
      topLabel="Admin Entry"
      eyebrow={pick(lang, '운영 진입', 'Operations Entry')}
      title={pick(lang, '관리자 콘솔 진입 경로', 'Admin console entry route')}
      description={pick(
        lang,
        '관리자 진입은 일반 학습자 화면과 분리되어야 합니다. 이 페이지에서 계정 상태를 확인하고, 운영 비밀번호 확인 단계로 이동한 뒤 콘솔을 여세요.',
        'Admin entry must stay separate from the learner-facing flow. Check your account state here, move to password verification, then open the console.'
      )}
      chips={chips}
      aside={
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#686b82]">
            {pick(lang, '운영 원칙', 'Operating rules')}
          </p>
          <div className="mt-4 space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[rgba(87,65,216,0.14)] text-[#c4b5fd]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#686b82]">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-1 text-[14px] font-semibold text-[#f3f4f6]">{step.title}</h3>
                      <p className="mt-2 text-[12px] leading-relaxed text-[#a0a3b5]">{step.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-5 py-5">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#c4b5fd]" />
            <p className="text-[12px] font-semibold text-[#f3f4f6]">
              {pick(lang, '현재 진입 상태', 'Current access state')}
            </p>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#686b82]">{pick(lang, '로그인', 'Login')}</p>
              <p className="mt-1 text-[14px] font-semibold text-[#f3f4f6]">
                {user ? pick(lang, '완료', 'Ready') : pick(lang, '필요', 'Required')}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#686b82]">{pick(lang, '승인 계정', 'Approved account')}</p>
              <p className="mt-1 text-[14px] font-semibold text-[#f3f4f6]">
                {user ? (canAccessAdminGate ? pick(lang, '승인됨', 'Approved') : pick(lang, '미승인', 'Not approved')) : '-'}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#686b82]">{pick(lang, '현재 계정', 'Current account')}</p>
              <p className="mt-1 truncate text-[14px] font-semibold text-[#f3f4f6]">{currentEmail || '-'}</p>
            </div>
          </div>
        </div>

        {!user ? (
          <Link
            to="/auth"
            state={{ from: ADMIN_ACCESS_PATH }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5741d8] px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#7132f5]"
          >
            <span>{pick(lang, '승인 계정으로 로그인', 'Sign in')}</span>
            <ArrowRight size={16} />
          </Link>
        ) : canAccessAdminGate ? (
          <Link
            to={ADMIN_ACCESS_PATH}
            state={{ from: destination }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5741d8] px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#7132f5]"
          >
            <span>{pick(lang, '잠금 해제로 이동', 'Continue to unlock')}</span>
            <ArrowRight size={16} />
          </Link>
        ) : (
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[rgba(248,113,113,0.20)] bg-[rgba(248,113,113,0.10)] px-6 py-3 text-[13px] font-semibold text-[#fca5a5]"
          >
            {pick(lang, '승인된 계정이 필요해요', 'Approved account required')}
          </button>
        )}
      </div>
    </AdminGateFrame>
  )
}
