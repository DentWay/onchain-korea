import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { ADMIN_ACCESS_PATH } from '../lib/adminRoute'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin, canAccessAdminGate, adminAccessGranted, adminAccessLoading, loading, supabaseEnabled } = useAuth()
  const location = useLocation()

  // If Supabase is not configured, allow access (dev mode / no-auth fallback)
  if (!supabaseEnabled) return children

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--surface-0)]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[rgba(79,131,255,0.25)] border-t-[#4F83FF]" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />
  }

  if (adminOnly && !canAccessAdminGate) {
    return <Navigate to="/dashboard" replace />
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  if (adminOnly && adminAccessLoading) {
    return (
      <div style={{ color: 'yellow', fontSize: 30, padding: 40, background: 'black', border: '4px solid yellow', position: 'relative', zIndex: 9999 }}>
        ADMIN ACCESS LOADING...
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[rgba(79,131,255,0.25)] border-t-[#4F83FF]" style={{ marginTop: 16 }} />
      </div>
    )
  }

  if (adminOnly && !adminAccessGranted) {
    return <Navigate to={ADMIN_ACCESS_PATH} state={{ from: location.pathname }} replace />
  }

  return children
}
