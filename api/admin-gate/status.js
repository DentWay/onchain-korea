import { json, readGateCookie, requireAdminCaller } from './_shared.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return json(res, 405, { ok: false, error: 'method_not_allowed' })
  }

  const caller = await requireAdminCaller(req)
  if (!caller.ok) {
    return json(res, caller.status, { ok: false, unlocked: false, error: caller.code })
  }

  const gate = readGateCookie(req)
  return json(res, 200, { ok: true, unlocked: gate.unlocked })
}
