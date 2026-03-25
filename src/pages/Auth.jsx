import { useState } from 'react'
import { Navigate, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowLeft } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import useLang from '../hooks/useLang'

export default function Auth() {
  const { user, loading, signInWithEmail, signUpWithEmail, signInWithGoogle, supabaseEnabled } = useAuth()
  const { t, lang } = useLang()
  const location = useLocation()
  const from = location.state?.from || '/dashboard'

  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [signupDone, setSignupDone] = useState(false)

  if (loading) return null
  if (user) return <Navigate to={from} replace />
  if (!supabaseEnabled) return <Navigate to="/dashboard" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      if (mode === 'signup') {
        await signUpWithEmail(email, password, name)
        setSignupDone(true)
      } else {
        await signInWithEmail(email, password)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (signupDone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--surface-0)] px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="ok-card p-8 max-w-sm w-full text-center">
          <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <Mail size={24} className="text-success" />
          </div>
          <h2 className="text-lg font-semibold text-[var(--text-high)] mb-2">
            {lang === 'ko' ? '이메일을 확인해주세요' : 'Check your email'}
          </h2>
          <p className="text-[13px] text-[var(--text-mid)] mb-4">
            {lang === 'ko'
              ? `${email}로 확인 메일을 보냈습니다. 링크를 클릭하면 가입이 완료됩니다.`
              : `We sent a confirmation email to ${email}. Click the link to complete signup.`}
          </p>
          <button onClick={() => { setSignupDone(false); setMode('signin') }}
            className="ok-btn ok-btn-ghost text-[13px] px-4 py-2">
            {lang === 'ko' ? '로그인으로 돌아가기' : 'Back to Sign In'}
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-0)] px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm w-full">
        <Link to="/" className="flex items-center gap-2 text-[12px] text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors mb-6">
          <ArrowLeft size={14} />
          {lang === 'ko' ? '홈으로' : 'Back to Home'}
        </Link>

        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white text-[11px] font-bold">OK</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-[var(--text-high)]">
              {mode === 'signin' ? t('auth.title') : t('auth.signup')}
            </h1>
            <p className="text-[11px] text-[var(--text-low)]">Onchain Korea</p>
          </div>
        </div>

        <div className="ok-card p-5">
          <button onClick={signInWithGoogle}
            className="w-full ok-btn ok-btn-ghost py-2.5 text-[13px] mb-4 flex items-center justify-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            {t('auth.google')}
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-[10px] text-[var(--text-low)]">or</span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-low)]" />
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder={lang === 'ko' ? '이름' : 'Name'}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[13px] text-[var(--text-high)] placeholder:text-[var(--text-low)] focus:outline-none focus:border-accent/50 transition-colors" />
              </div>
            )}
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-low)]" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder={t('auth.email')}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[13px] text-[var(--text-high)] placeholder:text-[var(--text-low)] focus:outline-none focus:border-accent/50 transition-colors" />
            </div>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-low)]" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
                placeholder={t('auth.password')}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[13px] text-[var(--text-high)] placeholder:text-[var(--text-low)] focus:outline-none focus:border-accent/50 transition-colors" />
            </div>

            {error && <p className="text-[11px] text-[var(--error)]">{error}</p>}

            <button type="submit" disabled={submitting}
              className="w-full ok-btn ok-btn-primary py-2.5 text-[13px] disabled:opacity-50">
              {submitting
                ? (lang === 'ko' ? '처리 중...' : 'Processing...')
                : mode === 'signin' ? t('auth.title') : t('auth.signup')}
            </button>
          </form>
        </div>

        <p className="text-center text-[12px] text-[var(--text-mid)] mt-4">
          {mode === 'signin' ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
          <button onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError('') }}
            className="text-accent-soft hover:text-accent transition-colors font-medium">
            {mode === 'signin' ? t('auth.signup') : t('auth.title')}
          </button>
        </p>
      </motion.div>
    </div>
  )
}
