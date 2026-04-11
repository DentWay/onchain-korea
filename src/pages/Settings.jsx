import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowLeft, Loader2, Mail, Save, Shield, Trash2, UserCircle2 } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import useLang from '../hooks/useLang'

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

function formatDate(value, lang) {
  if (!value) return '-'

  try {
    return new Intl.DateTimeFormat(lang === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(value))
  } catch {
    return value
  }
}

function getProviderLabel(provider, lang) {
  const normalized = String(provider || 'email').toLowerCase()

  if (normalized === 'google') return 'Google'
  if (normalized === 'kakao') return 'Kakao'
  if (normalized === 'email') return pick(lang, '이메일', 'Email')
  if (normalized === 'ethereum') return 'Ethereum'
  if (normalized === 'solana') return 'Solana'

  return provider || pick(lang, '이메일', 'Email')
}

function getDeleteErrorMessage(error, lang) {
  const message = String(error?.message || error?.details || '')
  const code = String(error?.code || '')

  if (code === 'PGRST202' || code === '42883' || message.includes('delete_my_account')) {
    return pick(
      lang,
      '탈퇴 기능을 쓰려면 Supabase SQL Editor에서 `supabase-account-schema.sql`을 먼저 적용해야 합니다.',
      'To enable account deletion, apply `supabase-account-schema.sql` in the Supabase SQL Editor first.'
    )
  }

  return pick(
    lang,
    '탈퇴 처리에 실패했습니다. 잠시 후 다시 시도해주세요.',
    'Account deletion failed. Please try again shortly.'
  )
}

export default function Settings() {
  const { user, profile, updateDisplayName, deleteAccount, supabaseEnabled } = useAuth()
  const { lang } = useLang()
  const [displayName, setDisplayName] = useState('')
  const [saveState, setSaveState] = useState({ status: 'idle', message: '' })
  const [deletePhrase, setDeletePhrase] = useState('')
  const [deleteState, setDeleteState] = useState({ status: 'idle', message: '' })

  const currentDisplayName = useMemo(() => {
    return profile?.display_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || ''
  }, [profile?.display_name, user?.email, user?.user_metadata?.full_name])

  useEffect(() => {
    setDisplayName(currentDisplayName)
  }, [currentDisplayName])

  const trimmedDisplayName = displayName.trim()
  const isDisplayNameChanged = trimmedDisplayName !== currentDisplayName
  const isDisplayNameValid = trimmedDisplayName.length > 0 && trimmedDisplayName.length <= 24
  const canSave = supabaseEnabled && isDisplayNameValid && isDisplayNameChanged && saveState.status !== 'saving'
  const deleteMatch = deletePhrase.trim() === '탈퇴' || deletePhrase.trim().toUpperCase() === 'DELETE'
  const providerLabel = getProviderLabel(user?.app_metadata?.provider, lang)

  const handleSave = async (event) => {
    event.preventDefault()
    if (!canSave) return

    setSaveState({ status: 'saving', message: '' })

    try {
      await updateDisplayName(trimmedDisplayName)
      setSaveState({
        status: 'success',
        message: pick(lang, '닉네임을 저장했습니다.', 'Nickname saved.'),
      })
    } catch {
      setSaveState({
        status: 'error',
        message: pick(lang, '닉네임 저장에 실패했습니다. 다시 시도해주세요.', 'Failed to save nickname. Please try again.'),
      })
    }
  }

  const handleDelete = async () => {
    if (!supabaseEnabled || !deleteMatch || deleteState.status === 'deleting') return

    const confirmed = window.confirm(
      pick(
        lang,
        '정말 탈퇴하시겠습니까? 진행 기록과 퀴즈 기록도 함께 삭제되며 되돌릴 수 없습니다.',
        'Are you sure you want to delete your account? Your learning and quiz records will also be removed and cannot be recovered.'
      )
    )

    if (!confirmed) return

    setDeleteState({ status: 'deleting', message: '' })

    try {
      await deleteAccount()
    } catch (error) {
      setDeleteState({
        status: 'error',
        message: getDeleteErrorMessage(error, lang),
      })
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <section className="bg-white border border-[#dedee5] rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-5 md:p-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-[12px] font-medium text-[#686b82] transition-colors hover:text-[#101114]"
          >
            <ArrowLeft size={14} />
            <span>{pick(lang, '대시보드', 'Dashboard')}</span>
          </Link>

          <header className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#9497a9]">{pick(lang, '내 정보', 'My Account')}</p>
              <h1 className="mt-2 text-[30px] md:text-[40px] font-[800] tracking-[-0.05em] text-[#101114]">
                {pick(lang, '이름과 계정을 여기서 관리하면 됩니다', 'Manage your profile and account here')}
              </h1>
              <p className="mt-3 text-[14px] leading-relaxed text-[#686b82]">
                {pick(
                  lang,
                  '닉네임은 상단과 사이드바에 바로 반영됩니다. 탈퇴는 되돌릴 수 없는 작업이라 확인 문구를 먼저 입력해야 합니다.',
                  'Nickname changes appear immediately in the app chrome. Account deletion is irreversible, so you must enter a confirmation phrase first.'
                )}
              </p>
            </div>

            <div className="bg-[#f7f7f8] border border-[#dedee5] rounded-[1.5rem] px-5 py-4 md:px-6 md:py-5 lg:min-w-[250px]">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#9497a9]">{pick(lang, '현재 계정', 'Current account')}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef0f3]">
                  <UserCircle2 size={22} className="text-[#686b82]" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[18px] font-[800] tracking-[-0.04em] text-[#101114]">{currentDisplayName || '-'}</p>
                  <p className="truncate text-[12px] text-[#686b82]">{user?.email || '-'}</p>
                </div>
              </div>
            </div>
          </header>

          <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_320px]">
            <div className="space-y-5">
              <section className="bg-white border border-[#dedee5] rounded-[1.5rem] overflow-hidden">
                <div className="border-b border-[#dedee5] px-5 pb-4 pt-5 md:px-6 md:pt-6">
                  <h2 className="text-[20px] font-[800] tracking-[-0.04em] text-[#101114]">{pick(lang, '프로필', 'Profile')}</h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#686b82]">
                    {pick(
                      lang,
                      '학습 화면에 보이는 이름만 바꾸면 됩니다. 이메일은 로그인 기준으로 유지됩니다.',
                      'Only the name shown in the learning app changes here. Your email stays tied to login.'
                    )}
                  </p>
                </div>

                <form onSubmit={handleSave} className="space-y-5 px-5 py-5 md:px-6 md:py-6">
                  <div className="space-y-2">
                    <label htmlFor="display-name" className="text-[12px] font-semibold text-[#101114]">
                      {pick(lang, '닉네임', 'Nickname')}
                    </label>
                    <input
                      id="display-name"
                      value={displayName}
                      onChange={(event) => {
                        setDisplayName(event.target.value)
                        if (saveState.status !== 'idle') {
                          setSaveState({ status: 'idle', message: '' })
                        }
                      }}
                      placeholder={pick(lang, '닉네임을 입력하세요', 'Enter your nickname')}
                      className="w-full rounded-2xl border border-[#dedee5] bg-white px-4 py-3 text-[14px] text-[#101114] outline-none transition-colors placeholder:text-[#9497a9] focus:border-[#5741d8]"
                      maxLength={24}
                      disabled={!supabaseEnabled}
                    />
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[12px] text-[#686b82]">
                        {pick(lang, '상단과 사이드바에 바로 반영됩니다.', 'This appears immediately in the header and sidebar.')}
                      </p>
                      <span className={`text-[12px] tabular-nums ${isDisplayNameValid ? 'text-[#9497a9]' : 'text-[#dc2626]'}`}>
                        {trimmedDisplayName.length}/24
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email-address" className="text-[12px] font-semibold text-[#101114]">
                      {pick(lang, '이메일', 'Email')}
                    </label>
                    <input
                      id="email-address"
                      value={user?.email || ''}
                      readOnly
                      className="w-full rounded-2xl border border-[#dedee5] bg-[#f7f7f8] px-4 py-3 text-[14px] text-[#686b82] outline-none"
                    />
                  </div>

                  {saveState.message && (
                    <div
                      className={`rounded-2xl border px-4 py-3 text-[13px] ${
                        saveState.status === 'success'
                          ? 'border-[rgba(20,158,97,0.18)] bg-[rgba(20,158,97,0.10)] text-[#026b3f]'
                          : 'border-[rgba(220,38,38,0.20)] bg-[rgba(220,38,38,0.08)] text-[#dc2626]'
                      }`}
                    >
                      {saveState.message}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={!canSave}
                      className="inline-flex items-center justify-center gap-2 rounded-[56px] bg-[#5741d8] text-white font-semibold transition-colors hover:bg-[#7132f5] px-5 py-3 text-[13px] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {saveState.status === 'saving' ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                      <span>{saveState.status === 'saving' ? pick(lang, '저장 중...', 'Saving...') : pick(lang, '저장하기', 'Save')}</span>
                    </button>
                    {!supabaseEnabled && (
                      <p className="text-[12px] text-[#dc2626]">
                        {pick(lang, 'Supabase가 연결되지 않아 계정 설정을 저장할 수 없습니다.', 'Account settings cannot be saved because Supabase is not configured.')}
                      </p>
                    )}
                  </div>
                </form>
              </section>

              <section className="bg-white border border-[#dedee5] rounded-[1.5rem] overflow-hidden">
                <div className="border-b border-[#dedee5] px-5 pb-4 pt-5 md:px-6 md:pt-6">
                  <div className="flex items-center gap-2 text-[#dc2626]">
                    <AlertTriangle size={16} />
                    <h2 className="text-[20px] font-[800] tracking-[-0.04em]">{pick(lang, '위험 작업', 'Danger zone')}</h2>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#686b82]">
                    {pick(
                      lang,
                      '탈퇴하면 프로필, 진행률, 퀴즈 기록이 함께 삭제됩니다. 이 작업은 되돌릴 수 없습니다.',
                      'Deleting your account also removes your profile, progress, and quiz history. This action cannot be undone.'
                    )}
                  </p>
                </div>

                <div className="space-y-5 px-5 py-5 md:px-6 md:py-6">
                  <div className="space-y-2">
                    <label htmlFor="delete-phrase" className="text-[12px] font-semibold text-[#101114]">
                      {pick(lang, '확인 문구', 'Confirmation phrase')}
                    </label>
                    <input
                      id="delete-phrase"
                      value={deletePhrase}
                      onChange={(event) => {
                        setDeletePhrase(event.target.value)
                        if (deleteState.status !== 'idle') {
                          setDeleteState({ status: 'idle', message: '' })
                        }
                      }}
                      placeholder={pick(lang, '`탈퇴`를 입력하세요', 'Type `DELETE` or `탈퇴`')}
                      className="w-full rounded-2xl border border-[rgba(220,38,38,0.20)] bg-[rgba(220,38,38,0.04)] px-4 py-3 text-[14px] text-[#101114] outline-none transition-colors placeholder:text-[#9497a9] focus:border-[#dc2626]"
                      disabled={!supabaseEnabled || deleteState.status === 'deleting'}
                    />
                    <p className="text-[12px] text-[#686b82]">
                      {pick(lang, '버튼을 켜려면 `탈퇴`를 입력하세요.', 'Enter `DELETE` or `탈퇴` to enable the button.')}
                    </p>
                  </div>

                  {deleteState.message && (
                    <div className="rounded-2xl border border-[rgba(220,38,38,0.20)] bg-[rgba(220,38,38,0.08)] px-4 py-3 text-[13px] text-[#dc2626]">
                      {deleteState.message}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={!supabaseEnabled || !deleteMatch || deleteState.status === 'deleting'}
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.24)] bg-[rgba(220,38,38,0.08)] px-5 py-3 text-[13px] font-semibold text-[#dc2626] transition-colors hover:bg-[rgba(220,38,38,0.12)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deleteState.status === 'deleting' ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                    <span>{deleteState.status === 'deleting' ? pick(lang, '탈퇴 처리 중...', 'Deleting...') : pick(lang, '회원 탈퇴', 'Delete account')}</span>
                  </button>
                </div>
              </section>
            </div>

            <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
              <div className="bg-[#f7f7f8] border border-[#dedee5] rounded-[1.5rem] p-5">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#9497a9]">
                  <Shield size={13} />
                  <span>{pick(lang, '계정 요약', 'Account summary')}</span>
                </div>
                <dl className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-[#dedee5] bg-white px-4 py-3">
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-[#9497a9]">{pick(lang, '로그인 방식', 'Sign-in method')}</dt>
                    <dd className="mt-1 text-[15px] font-[700] text-[#101114]">{providerLabel}</dd>
                  </div>
                  <div className="rounded-2xl border border-[#dedee5] bg-white px-4 py-3">
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-[#9497a9]">{pick(lang, '가입일', 'Joined')}</dt>
                    <dd className="mt-1 text-[15px] font-[700] text-[#101114]">{formatDate(profile?.created_at || user?.created_at, lang)}</dd>
                  </div>
                  <div className="rounded-2xl border border-[#dedee5] bg-white px-4 py-3">
                    <dt className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#9497a9]">
                      <Mail size={12} />
                      <span>{pick(lang, '연결된 이메일', 'Connected email')}</span>
                    </dt>
                    <dd className="mt-1 break-all text-[13px] text-[#101114]">{user?.email || '-'}</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-[#f7f7f8] border border-[#dedee5] rounded-[1.5rem] p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#9497a9]">{pick(lang, '안내', 'Notes')}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-[#686b82]">
                  {pick(
                    lang,
                    '탈퇴 버튼은 프론트만으로 끝나지 않습니다. 계정 삭제 RPC가 없는 Supabase 프로젝트라면 `supabase-account-schema.sql`을 한 번 적용해야 정상 동작합니다.',
                    'Account deletion depends on a server-side RPC. If your Supabase project does not have it yet, apply `supabase-account-schema.sql` once.'
                  )}
                </p>
              </div>
            </aside>
          </div>
        </section>
      </motion.div>
    </div>
  )
}
