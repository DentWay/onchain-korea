import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import useLang from '../hooks/useLang'
import { clearAuthIntent, readAuthIntent } from '../lib/authRedirect'

export default function AuthCallback() {
  const navigate = useNavigate()
  const { t, lang } = useLang()

  useEffect(() => {
    let cancelled = false
    const searchParams = new URLSearchParams(window.location.search)
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''))
    const errorCode = searchParams.get('error_code') || hashParams.get('error_code') || ''
    const errorDescription = searchParams.get('error_description') || hashParams.get('error_description') || ''
    const errorText = `${errorCode} ${errorDescription}`.toLowerCase()
    const intendedPath = readAuthIntent() || '/dashboard'

    if (errorCode || errorDescription) {
      let authError = errorDescription || t('auth.oauthGenericIssue')

      if (errorText.includes('redirect') || errorText.includes('uri')) {
        authError = t('auth.oauthRedirectIssue')
      }
      if (errorText.includes('kakao') || errorText.includes('koe205')) {
        authError = t('auth.kakaoConfigIssue')
      }

      navigate('/auth', {
        replace: true,
        state: {
          from: intendedPath,
          authError,
          authProvider: errorText.includes('kakao') || errorText.includes('koe205') ? 'kakao' : 'oauth',
        },
      })
      return
    }

    if (!supabase) {
      navigate('/auth', {
        replace: true,
        state: { from: intendedPath, authError: t('auth.oauthGenericIssue'), authProvider: 'oauth' },
      })
      return
    }

    const timeoutId = setTimeout(() => {
      if (cancelled) return
      navigate('/auth', {
        replace: true,
        state: { from: intendedPath, authError: t('auth.oauthGenericIssue'), authProvider: 'oauth' },
      })
    }, 5000)

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (cancelled) return
        clearTimeout(timeoutId)

        if (session) {
          clearAuthIntent()
        }

        navigate(session ? intendedPath : '/auth', {
          replace: true,
          state: session ? null : { from: intendedPath, authError: t('auth.oauthGenericIssue'), authProvider: 'oauth' },
        })
      })
      .catch(() => {
        if (cancelled) return
        clearTimeout(timeoutId)
        navigate('/auth', {
          replace: true,
          state: { from: intendedPath, authError: t('auth.oauthGenericIssue'), authProvider: 'oauth' },
        })
      })

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [navigate, t])

  return (
    <div className="ok-theme-workbench flex min-h-screen items-center justify-center px-6">
      <div className="ok-app-card w-full max-w-sm rounded-[1.5rem] p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(87,65,216,0.12)]">
          <div className="h-6 w-6 rounded-full border-2 border-[rgba(87,65,216,0.28)] border-t-[#5741d8] animate-spin" />
        </div>
        <p className="mt-5 text-[15px] font-[700] text-[var(--app-ink-high)]">{t('auth.processing')}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--app-ink-mid)]">
          {lang === 'ko' ? '로그인 연동을 마무리하고 있습니다.' : 'Finishing your sign-in flow.'}
        </p>
      </div>
    </div>
  )
}
