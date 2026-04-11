import { useEffect, useState } from 'react'
import { Navigate, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowLeft, Wallet } from 'lucide-react'
import BrandLockup from '../components/brand/BrandLockup'
import useAuth from '../hooks/useAuth'
import useLang from '../hooks/useLang'
import { persistAuthIntent } from '../lib/authRedirect'

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
)

const KakaoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.724 1.8 5.113 4.508 6.459-.2.742-.723 2.688-.828 3.107-.13.52.19.513.4.373.165-.11 2.627-1.787 3.687-2.51.723.104 1.47.16 2.233.16 5.523 0 10-3.463 10-7.689S17.523 3 12 3z" fill="#3C1E1E"/></svg>
)

const EthereumIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 1.5l-7 11.186L12 16.5l7-3.814L12 1.5z" fill="#627EEA" opacity="0.6"/><path d="M12 1.5v15l7-3.814L12 1.5z" fill="#627EEA"/><path d="M12 17.97l-7-3.814L12 22.5l7-8.344-7 3.814z" fill="#627EEA" opacity="0.6"/><path d="M12 17.97v4.53l7-8.344-7 3.814z" fill="#627EEA"/></svg>
)

const SolanaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24"><defs><linearGradient id="sol-g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00FFA3"/><stop offset="100%" stopColor="#DC1FFF"/></linearGradient></defs><path d="M5.5 16.5h13.3c.2 0 .4.1.5.2l1.2 1.3c.3.3.1.8-.3.8H6.9c-.2 0-.4-.1-.5-.2l-1.2-1.3c-.3-.3-.1-.8.3-.8zm0-5.3h13.3c.2 0 .4.1.5.2l1.2 1.3c.3.3.1.8-.3.8H6.9c-.2 0-.4-.1-.5-.2l-1.2-1.3c-.3-.3-.1-.8.3-.8zm14.8-2.4H7c-.2 0-.4-.1-.5-.2L5.3 7.3c-.3-.3-.1-.8.3-.8h13.3c.2 0 .4.1.5.2l1.2 1.3c.3.3.1.8-.3.8z" fill="url(#sol-g)"/></svg>
)

export default function Auth() {
  const { user, loading, signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithKakao, signInWithEthereum, signInWithSolana, supabaseEnabled } = useAuth()
  const { t } = useLang()
  const location = useLocation()
  const from = location.state?.from || '/dashboard'
  const oauthError = location.state?.authError || ''
  const oauthProvider = location.state?.authProvider || ''

  const [mode, setMode] = useState('signin')
  const [showEmail, setShowEmail] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(oauthError)
  const [submitting, setSubmitting] = useState(false)
  const [signupDone, setSignupDone] = useState(false)

  useEffect(() => {
    if (oauthError) setError(oauthError)
  }, [oauthError])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-[rgba(87,65,216,0.30)] border-t-[#5741d8] rounded-full animate-spin" />
      </div>
    )
  }
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

  const handleWalletLogin = async (type) => {
    setError('')
    try {
      if (type === 'ethereum') await signInWithEthereum()
      else await signInWithSolana()
    } catch (err) {
      if (err.message === 'no_ethereum_wallet') setError(t('auth.noEthWallet'))
      else if (err.message === 'no_solana_wallet') setError(t('auth.noSolWallet'))
      else setError(err.message)
    }
  }

  const handleOAuthLogin = async (provider) => {
    setError('')
    try {
      persistAuthIntent(from)
      if (provider === 'google') await signInWithGoogle()
      else await signInWithKakao()
    } catch (err) {
      setError(err.message || t('auth.oauthGenericIssue'))
    }
  }

  if (signupDone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-[#dedee5] rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-8 max-w-sm w-full text-center">
          <div className="w-12 h-12 rounded-full bg-[rgba(20,158,97,0.10)] flex items-center justify-center mx-auto mb-4">
            <Mail size={24} className="text-[#026b3f]" />
          </div>
          <h2 className="text-lg font-semibold text-[#101114] mb-2">
            {t('auth.checkEmail')}
          </h2>
          <p className="text-[13px] text-[#686b82] mb-4">
            {t('auth.confirmEmailPrefix')}{email}{t('auth.confirmEmailSent')}
          </p>
          <button onClick={() => { setSignupDone(false); setMode('signin') }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dedee5] bg-transparent text-[#686b82] font-semibold text-[13px] px-4 py-2 transition-colors hover:bg-[#f7f7f8]">
            {t('auth.backToSignIn')}
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm w-full">
        <Link to="/" className="flex items-center gap-2 text-[12px] text-[#9497a9] hover:text-[#686b82] transition-colors mb-6">
          <ArrowLeft size={14} />
          {t('auth.backToHome')}
        </Link>

        <div className="mb-6">
          <BrandLockup surface="light" className="origin-left scale-[1.08] md:scale-[1.14]" />
          <div className="mt-3">
            <h1 className="text-lg font-semibold text-[#101114]">
              {mode === 'signin' ? t('auth.title') : t('auth.signup')}
            </h1>
            <p className="text-[11px] text-[#9497a9]">OnChain Korea</p>
          </div>
        </div>

        <div className="bg-white border border-[#dedee5] rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-5 space-y-3">
          {/* Social Login */}
          <p className="text-[10px] text-[#9497a9] uppercase tracking-[0.15em]">{t('auth.socialLogin')}</p>

          <button onClick={() => handleOAuthLogin('google')}
            className="w-full inline-flex items-center justify-center gap-2.5 rounded-full border border-[#dedee5] bg-transparent text-[#686b82] font-semibold py-2.5 text-[13px] transition-colors hover:bg-[#f7f7f8]">
            <GoogleIcon />
            {t('auth.google')}
          </button>

          <button onClick={() => handleOAuthLogin('kakao')}
            className="w-full py-2.5 text-[13px] flex items-center justify-center gap-2.5 rounded-lg font-medium transition-colors"
            style={{ backgroundColor: '#FEE500', color: '#3C1E1E' }}>
            <KakaoIcon />
            {t('auth.kakao')}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1 h-px bg-[#dedee5]" />
            <span className="text-[10px] text-[#9497a9] uppercase tracking-[0.15em]">{t('auth.walletLogin')}</span>
            <div className="flex-1 h-px bg-[#dedee5]" />
          </div>

          {/* Wallet Login */}
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => handleWalletLogin('ethereum')}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dedee5] bg-transparent text-[#686b82] font-semibold py-2.5 text-[12px] transition-colors hover:bg-[#f7f7f8]">
              <EthereumIcon />
              Ethereum
            </button>
            <button onClick={() => handleWalletLogin('solana')}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dedee5] bg-transparent text-[#686b82] font-semibold py-2.5 text-[12px] transition-colors hover:bg-[#f7f7f8]">
              <SolanaIcon />
              Solana
            </button>
          </div>

          {error && (
            <div className="space-y-1.5 rounded-lg border border-[rgba(220,38,38,0.20)] bg-[rgba(220,38,38,0.06)] px-3 py-2.5">
              <p className="text-[11px] text-[#dc2626] text-center">{error}</p>
              {oauthProvider === 'kakao' && (
                <p className="text-[11px] text-[#686b82] text-center">{t('auth.kakaoSetupHint')}</p>
              )}
            </div>
          )}

          {/* Email toggle */}
          {!showEmail ? (
            <>
              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 h-px bg-[#dedee5]" />
                <span className="text-[10px] text-[#9497a9]">{t('auth.or')}</span>
                <div className="flex-1 h-px bg-[#dedee5]" />
              </div>
              <button onClick={() => setShowEmail(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#dedee5] bg-transparent text-[#686b82] font-semibold py-2.5 text-[12px] transition-colors hover:bg-[#f7f7f8]">
                <Mail size={15} />
                {t('auth.emailLogin')}
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 h-px bg-[#dedee5]" />
                <span className="text-[10px] text-[#9497a9]">{t('auth.emailLogin')}</span>
                <div className="flex-1 h-px bg-[#dedee5]" />
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                {mode === 'signup' && (
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9497a9]" />
                    <input type="text" value={name} onChange={e => setName(e.target.value)}
                      placeholder={t('auth.name')}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white border border-[#dedee5] text-[13px] text-[#101114] placeholder:text-[#9497a9] focus:outline-none focus:border-[#5741d8] transition-colors" />
                  </div>
                )}
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9497a9]" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    placeholder={t('auth.email')}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white border border-[#dedee5] text-[13px] text-[#101114] placeholder:text-[#9497a9] focus:outline-none focus:border-[#5741d8] transition-colors" />
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9497a9]" />
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
                    placeholder={t('auth.password')}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white border border-[#dedee5] text-[13px] text-[#101114] placeholder:text-[#9497a9] focus:outline-none focus:border-[#5741d8] transition-colors" />
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-[56px] bg-[#5741d8] text-white font-semibold py-2.5 text-[13px] transition-colors hover:bg-[#7132f5] disabled:opacity-50">
                  {submitting
                    ? t('auth.processing')
                    : mode === 'signin' ? t('auth.title') : t('auth.signup')}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-[12px] text-[#686b82] mt-4">
          {mode === 'signin' ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
          <button onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setShowEmail(false) }}
            className="text-[#5741d8] hover:text-[#7132f5] transition-colors font-medium">
            {mode === 'signin' ? t('auth.signup') : t('auth.title')}
          </button>
        </p>
      </motion.div>
    </div>
  )
}
