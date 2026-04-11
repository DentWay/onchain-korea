import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { ADMIN_ACCESS_PATH } from '../lib/adminRoute'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin, canAccessAdminGate, adminAccessGranted, adminAccessLoading, loading, supabaseEnabled } = useAuth()
  const location = useLocation()
  const loadingShell = adminOnly
    ? 'flex min-h-screen items-center justify-center bg-[#0c0d11]'
    : 'flex h-screen items-center justify-center bg-white'

  // If Supabase is not configured, allow access (dev mode / no-auth fallback)
  if (!supabaseEnabled) return children

  if (loading) {
    return (
      <div data-app-theme={adminOnly ? 'dark' : undefined} className={loadingShell}>
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[rgba(87,65,216,0.25)] border-t-[#5741d8]" />
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
      <div data-app-theme="dark" className={loadingShell}>
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[rgba(87,65,216,0.25)] border-t-[#5741d8]" />
      </div>
    )
  }

  if (adminOnly && !adminAccessGranted) {
    return <Navigate to={ADMIN_ACCESS_PATH} state={{ from: location.pathname }} replace />
  }

  return children
}
