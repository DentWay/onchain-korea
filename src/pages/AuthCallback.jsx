import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import useLang from '../hooks/useLang'
import { clearAuthIntent, readAuthIntent } from '../lib/authRedirect'

export default function AuthCallback() {
  const navigate = useNavigate()
  const { t } = useLang()

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
    <div className="flex items-center justify-center h-screen bg-[var(--surface-0)]">
      <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
    </div>
  )
}
