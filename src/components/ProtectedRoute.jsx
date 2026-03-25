import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function ProtectedRoute({ children }) {
  const { user, loading, supabaseEnabled } = useAuth()
  const location = useLocation()

  // If Supabase is not configured, allow access (dev mode / no-auth fallback)
  if (!supabaseEnabled) return children

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--surface-0)]">
        <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />
  }

  return children
}
