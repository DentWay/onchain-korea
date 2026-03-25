import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!supabase) {
      navigate('/dashboard', { replace: true })
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      navigate(session ? '/dashboard' : '/auth', { replace: true })
    })
  }, [navigate])

  return (
    <div className="flex items-center justify-center h-screen bg-[var(--surface-0)]">
      <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
    </div>
  )
}
