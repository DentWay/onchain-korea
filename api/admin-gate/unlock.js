import {
  createGateCookie,
  getAdminFlag,
  json,
  promoteCallerToAdmin,
  readGateCookie,
  refreshCallerProfile,
  requireAuthenticatedCaller,
  verifyPassword,
} from './_shared.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { ok: false, error: 'method_not_allowed' })
  }

  const caller = await requireAuthenticatedCaller(req)
  if (!caller.ok) {
    return json(res, caller.status, { ok: false, error: caller.code })
  }

  if (!caller.canAccessAdminGate) {
    return json(res, 403, { ok: false, error: 'admin_email_not_allowed' })
  }

  let body = {}
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
  } catch {
    return json(res, 400, { ok: false, error: 'invalid_json' })
  }

  if (!verifyPassword(body.password)) {
    return json(res, 401, { ok: false, error: 'invalid_password' })
  }

  let promoted = false

  if (!caller.isAdmin) {
    const promotion = await promoteCallerToAdmin(caller, body.password)
    if (!promotion.ok) {
      return json(res, 403, { ok: false, error: 'admin_promotion_failed' })
    }

    const refreshedProfile = await refreshCallerProfile(caller)
    if (!getAdminFlag(refreshedProfile)) {
      return json(res, 403, { ok: false, error: 'admin_promotion_failed' })
    }

    promoted = true
  }

  const existing = readGateCookie(req)
  if (existing.unlocked) {
    return json(res, 200, { ok: true, unlocked: true, promoted })
  }

  return json(
    res,
    200,
    { ok: true, unlocked: true, promoted },
    { 'Set-Cookie': createGateCookie() }
  )
}
