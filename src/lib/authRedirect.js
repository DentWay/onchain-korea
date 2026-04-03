const AUTH_INTENT_STORAGE_KEY = 'onchain-korea-auth-intent'

function normalizePath(pathname) {
  if (typeof pathname !== 'string') return ''
  if (!pathname.startsWith('/')) return ''
  if (pathname.startsWith('//')) return ''
  return pathname
}

export function persistAuthIntent(pathname) {
  const nextPath = normalizePath(pathname)
  if (!nextPath) return

  try {
    sessionStorage.setItem(AUTH_INTENT_STORAGE_KEY, nextPath)
  } catch {}
}

export function readAuthIntent() {
  try {
    return normalizePath(sessionStorage.getItem(AUTH_INTENT_STORAGE_KEY) || '')
  } catch {
    return ''
  }
}

export function clearAuthIntent() {
  try {
    sessionStorage.removeItem(AUTH_INTENT_STORAGE_KEY)
  } catch {}
}
