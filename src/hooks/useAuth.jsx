import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (userId) => {
    if (!supabase) return null
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    return data
  }, [])

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      try { if (u) setProfile(await fetchProfile(u.id)) } catch {}
      setLoading(false)
    }).catch(() => setLoading(false))

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      try { if (u) setProfile(await fetchProfile(u.id)) } catch {}
      if (!u) setProfile(null)
    })

    return () => subscription.unsubscribe()
  }, [fetchProfile])

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
    const message = `Sign in to Onchain Korea\nNonce: ${nonce}\nAddress: ${address}`
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
    const message = `Sign in to Onchain Korea\nNonce: ${nonce}\nAddress: ${address}`
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

  const signOut = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithKakao, signInWithEthereum, signInWithSolana, signOut, supabaseEnabled: !!supabase }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
