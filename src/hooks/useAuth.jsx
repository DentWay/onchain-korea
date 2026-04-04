import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { supabase } from '../lib/supabase'
import { clearAuthIntent } from '../lib/authRedirect'

const AuthContext = createContext(null)
const ADMIN_EMAILS = ['dentway.official@gmail.com', 'min9.mark@gmail.com']
const REQUEST_TIMEOUT_MS = 5000

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function createTimeoutError(label) {
  const error = new Error(label)
  error.name = 'TimeoutError'
  return error
}

async function withTimeout(promise, label, timeoutMs = REQUEST_TIMEOUT_MS) {
  let timeoutId

  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(createTimeoutError(label)), timeoutMs)
      }),
    ])
  } finally {
    clearTimeout(timeoutId)
  }
}

function clearClientAuthState() {
  try {
    const keys = []

    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index)
      if (!key) continue
      if (
        key === 'onchain-korea-progress' ||
        key === 'onchain-korea-quiz-results' ||
        key.startsWith('sb-') ||
        key.includes('supabase')
      ) {
        keys.push(key)
      }
    }

    keys.forEach((key) => localStorage.removeItem(key))
  } catch {}

  try {
    const keys = []

    for (let index = 0; index < sessionStorage.length; index += 1) {
      const key = sessionStorage.key(index)
      if (!key) continue
      if (key.startsWith('sb-') || key.includes('supabase')) {
        keys.push(key)
      }
    }

    keys.forEach((key) => sessionStorage.removeItem(key))
  } catch {}
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [adminAccessGranted, setAdminAccessGranted] = useState(() => {
    try { return sessionStorage.getItem('ok-admin-unlocked') === '1' } catch { return false }
  })
  const [adminAccessLoading, setAdminAccessLoading] = useState(() => {
    try { return sessionStorage.getItem('ok-admin-unlocked') !== '1' } catch { return true }
  })

  const fetchProfile = useCallback(async (userId) => {
    if (!supabase) return null
    const { data } = await withTimeout(
      supabase.from('profiles').select('*').eq('id', userId).single(),
      'profile_fetch_timeout'
    )
    return data
  }, [])

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    let resolved = false
    const done = () => { if (!resolved) { resolved = true; setLoading(false) } }

    // Safety timeout — never spin longer than 3s
    const timeout = setTimeout(done, 3000)

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      try { if (u) setProfile(await fetchProfile(u.id)) } catch {}
      done()
    }).catch(done)

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      try { if (u) setProfile(await fetchProfile(u.id)) } catch {}
      if (!u) setProfile(null)
    })

    return () => { clearTimeout(timeout); subscription.unsubscribe() }
  }, [fetchProfile])

  const refreshProfile = useCallback(async (userId = user?.id) => {
    if (!userId) {
      setProfile(null)
      return null
    }

    const nextProfile = await fetchProfile(userId)
    setProfile(nextProfile)
    return nextProfile
  }, [fetchProfile, user?.id])

  const signInWithEmail = useCallback(async (email, password) => {
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }, [])

  const signUpWithEmail = useCallback(async (email, password, name) => {
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    if (error) throw error
    return data
  }, [])

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) throw error
    return data
  }, [])

  const signInWithKakao = useCallback(async () => {
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) throw error
    return data
  }, [])

  const signInWithEthereum = useCallback(async () => {
    if (!window.ethereum) throw new Error('no_ethereum_wallet')
    const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const nonce = crypto.randomUUID()
    const message = `Sign in to OnChain Korea\nNonce: ${nonce}\nAddress: ${address}`
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [message, address],
    })
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase.functions.invoke('wallet-auth', {
      body: { provider: 'ethereum', address, message, signature },
    })
    if (error) throw error
    if (data?.access_token) {
      await supabase.auth.setSession({ access_token: data.access_token, refresh_token: data.refresh_token })
    }
    return data
  }, [])

  const signInWithSolana = useCallback(async () => {
    const provider = window.phantom?.solana || window.solana
    if (!provider?.isPhantom) throw new Error('no_solana_wallet')
    const resp = await provider.connect()
    const address = resp.publicKey.toString()
    const nonce = crypto.randomUUID()
    const message = `Sign in to OnChain Korea\nNonce: ${nonce}\nAddress: ${address}`
    const encoded = new TextEncoder().encode(message)
    const { signature } = await provider.signMessage(encoded, 'utf8')
    const sig = btoa(String.fromCharCode(...signature))
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase.functions.invoke('wallet-auth', {
      body: { provider: 'solana', address, message, signature: sig },
    })
    if (error) throw error
    if (data?.access_token) {
      await supabase.auth.setSession({ access_token: data.access_token, refresh_token: data.refresh_token })
    }
    return data
  }, [])

  const getAccessToken = useCallback(async () => {
    if (!supabase) return ''
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session?.access_token || ''
  }, [])

  const updateDisplayName = useCallback(async (nextDisplayName) => {
    if (!supabase) throw new Error('Supabase not configured')
    if (!user) throw new Error('not_authenticated')

    const trimmed = String(nextDisplayName || '').trim()
    if (!trimmed) throw new Error('display_name_required')

    const { data, error } = await supabase
      .from('profiles')
      .upsert(
        {
          id: user.id,
          display_name: trimmed,
          email: user.email ?? null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .select('*')
      .single()

    if (error) throw error

    setProfile(data)

    try {
      await supabase.auth.updateUser({
        data: {
          full_name: trimmed,
          name: trimmed,
        },
      })
    } catch {}

    return data
  }, [user])

  const signOut = useCallback(async (redirectTo = '/signed-out') => {
    setUser(null)
    setProfile(null)
    setAdminAccessGranted(false)
    try { sessionStorage.removeItem('ok-admin-unlocked') } catch {}
    setAdminAccessLoading(false)

    try {
      if (typeof window !== 'undefined') {
        clearAuthIntent()

        try {
          fetch('/api/admin-gate/lock', {
            method: 'POST',
            credentials: 'include',
            keepalive: true,
          })
        } catch {}
      }

      if (supabase) {
        const result = await Promise.race([
          supabase.auth.signOut({ scope: 'global' }),
          new Promise((resolve) => setTimeout(() => resolve({ error: null, timedOut: true }), 1500)),
        ])

        if (result?.error) {
          console.error('Sign-out failed:', result.error)
        }
      }
    } finally {
      clearClientAuthState()
      if (typeof window !== 'undefined' && window.location.pathname !== redirectTo) {
        window.location.replace(redirectTo)
      }
    }
  }, [])

  const syncAdminAccess = useCallback(async () => {
    if (!supabase || !user) {
      setAdminAccessGranted(false)
      setAdminAccessLoading(false)
      return false
    }

    const token = await getAccessToken()
    if (!token) {
      setAdminAccessGranted(false)
      setAdminAccessLoading(false)
      return false
    }

    setAdminAccessLoading(true)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
      let response

      try {
        response = await fetch('/api/admin-gate/status', {
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        })
      } finally {
        clearTimeout(timeoutId)
      }

      if (!response.ok) {
        setAdminAccessGranted(false)
        return false
      }

      const payload = await response.json()
      const unlocked = !!payload?.unlocked
      setAdminAccessGranted(unlocked)
      try { sessionStorage.setItem('ok-admin-unlocked', unlocked ? '1' : '0') } catch {}
      return unlocked
    } catch {
      setAdminAccessGranted(false)
      try { sessionStorage.removeItem('ok-admin-unlocked') } catch {}
      return false
    } finally {
      setAdminAccessLoading(false)
    }
  }, [getAccessToken, user?.id])

  const unlockAdminAccess = useCallback(async (password) => {
    if (!supabase) throw new Error('Supabase not configured')
    if (!user) throw new Error('not_authenticated')

    const token = await getAccessToken()
    if (!token) {
      throw new Error('not_authenticated')
    }

    setAdminAccessLoading(true)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 12000)
      let response

      try {
        response = await fetch('/api/admin-gate/unlock', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password,
          }),
          signal: controller.signal,
        })
      } finally {
        clearTimeout(timeoutId)
      }

      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        if (payload?.error === 'invalid_password') {
          throw new Error('admin_password_invalid')
        }
        if (payload?.error === 'admin_email_not_allowed') {
          throw new Error('admin_email_not_allowed')
        }
        if (payload?.error === 'not_admin') {
          throw new Error('not_admin')
        }
        if (payload?.error === 'admin_promotion_failed') {
          throw new Error('admin_promotion_failed')
        }
        throw new Error('admin_unlock_failed')
      }

      setAdminAccessGranted(true)
      try { sessionStorage.setItem('ok-admin-unlocked', '1') } catch {}
      refreshProfile(user.id).catch(() => {})
      return true
    } catch (error) {
      if (error?.name === 'AbortError') {
        throw new Error('admin_unlock_timeout')
      }
      throw error
    } finally {
      setAdminAccessLoading(false)
    }
  }, [getAccessToken, refreshProfile, user?.id, supabase])

  const lockAdminAccess = useCallback(async () => {
    setAdminAccessGranted(false)
    setAdminAccessLoading(false)
    try { sessionStorage.removeItem('ok-admin-unlocked') } catch {}

    try {
      await fetch('/api/admin-gate/lock', {
        method: 'POST',
        credentials: 'include',
      })
    } catch {}
  }, [])

  const deleteAccount = useCallback(async () => {
    if (!supabase) throw new Error('Supabase not configured')
    if (!user) throw new Error('not_authenticated')

    const { error } = await supabase.rpc('delete_my_account')
    if (error) throw error

    await signOut('/signed-out?reason=deleted')
  }, [signOut, user])

  const normalizedUserEmail = normalizeEmail(user?.email)
  const normalizedProfileEmail = normalizeEmail(profile?.email)
  const canAccessAdminGate = ADMIN_EMAILS.includes(normalizedUserEmail) || ADMIN_EMAILS.includes(normalizedProfileEmail)
  const isAdmin = !!(profile?.is_admin || canAccessAdminGate)

  useEffect(() => {
    let cancelled = false

    if (!supabase) {
      setAdminAccessGranted(false)
      setAdminAccessLoading(false)
      return undefined
    }

    if (!user || !isAdmin) {
      setAdminAccessGranted(false)
      return undefined
    }

    setAdminAccessLoading(true)

    ;(async () => {
      try {
        const unlocked = await syncAdminAccess()
        if (!cancelled) {
          setAdminAccessGranted(unlocked)
        }
      } catch {
        if (!cancelled) {
          setAdminAccessGranted(false)
        }
      } finally {
        if (!cancelled) {
          setAdminAccessLoading(false)
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [isAdmin, supabase, syncAdminAccess, user?.id])

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isAdmin,
      canAccessAdminGate,
      adminAccessGranted,
      adminAccessLoading,
      loading,
      refreshProfile,
      updateDisplayName,
      deleteAccount,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signInWithKakao,
      signInWithEthereum,
      signInWithSolana,
      signOut,
      syncAdminAccess,
      unlockAdminAccess,
      lockAdminAccess,
      supabaseEnabled: !!supabase,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
