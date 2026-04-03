import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { ADMIN_ACCESS_PATH, ADMIN_CONSOLE_PATH } from '../lib/adminRoute'

export default function AdminEntry() {
  const location = useLocation()
  const { supabaseEnabled } = useAuth()

  if (!supabaseEnabled) {
    return <Navigate to="/" replace />
  }

  const from = typeof location.state?.from === 'string' && location.state.from.startsWith(ADMIN_CONSOLE_PATH)
    ? location.state.from
    : ADMIN_CONSOLE_PATH

  return <Navigate to={ADMIN_ACCESS_PATH} state={{ from }} replace />
}
