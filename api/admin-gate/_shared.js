import crypto from 'node:crypto'
import { createClient } from '@supabase/supabase-js'

const COOKIE_NAME = 'ok_admin_gate'
const ADMIN_EMAILS = ['dentway.official@gmail.com', 'min9.mark@gmail.com']
const PASSWORD_HASH =
  process.env.ADMIN_GATE_PASSWORD_HASH ||
  'scrypt$onchain-korea-admin-v1$3e7f49cb09c7192ad46e94c14731f164da72eeb455569bcbbe92921e202d123548d7afa5ec4acbc94f7994c015602a16afdccb1c27c28c54bb3f5e6689d1a979'
const COOKIE_SECRET = process.env.ADMIN_GATE_COOKIE_SECRET || 'onchain-korea-admin-cookie-v1'
const COOKIE_TTL_SECONDS = Number(process.env.ADMIN_GATE_COOKIE_TTL_SECONDS || 60 * 60 * 12)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function parseCookies(header = '') {
  return header
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((acc, part) => {
      const index = part.indexOf('=')
      if (index === -1) return acc
      const key = part.slice(0, index)
      const value = part.slice(index + 1)
      acc[key] = decodeURIComponent(value)
      return acc
    }, {})
}

function encode(value) {
  return Buffer.from(String(value), 'utf8').toString('base64url')
}

function decode(value) {
  return Buffer.from(String(value), 'base64url').toString('utf8')
}

function sign(payload) {
  return crypto.createHmac('sha256', COOKIE_SECRET).update(payload).digest('base64url')
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a))
  const right = Buffer.from(String(b))
  if (left.length !== right.length) return false
  return crypto.timingSafeEqual(left, right)
}

export function verifyPassword(password) {
  const [scheme, salt, expectedHash] = PASSWORD_HASH.split('$')
  if (scheme !== 'scrypt' || !salt || !expectedHash) return false
  const actualHash = crypto.scryptSync(String(password || ''), salt, 64).toString('hex')
  return safeEqual(actualHash, expectedHash)
}

export function createGateCookie() {
  const expiresAt = Math.floor(Date.now() / 1000) + COOKIE_TTL_SECONDS
  const payload = `${expiresAt}.${crypto.randomUUID()}`
  const token = `${encode(payload)}.${sign(payload)}`

  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${COOKIE_TTL_SECONDS}`
}

export function clearGateCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`
}

export function readGateCookie(req) {
  const cookies = parseCookies(req.headers.cookie || '')
  const token = cookies[COOKIE_NAME]
  if (!token) return { unlocked: false }

  const parts = String(token).split('.')
  if (parts.length !== 2) return { unlocked: false }

  try {
    const payload = decode(parts[0])
    const signature = parts[1]
    if (!safeEqual(sign(payload), signature)) return { unlocked: false }

    const [expiresAt] = payload.split('.')
    if (Number(expiresAt) <= Math.floor(Date.now() / 1000)) {
      return { unlocked: false, expired: true }
    }

    return { unlocked: true }
  } catch {
    return { unlocked: false }
  }
}

export function json(res, status, body, extraHeaders = {}) {
  res.statusCode = status
  Object.entries({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extraHeaders,
  }).forEach(([key, value]) => {
    res.setHeader(key, value)
  })
  res.end(JSON.stringify(body))
}

function getBearerToken(req) {
  const header = req.headers.authorization || req.headers.Authorization
  if (!header || !String(header).startsWith('Bearer ')) return null
  return String(header).slice(7).trim()
}

export async function requireAuthenticatedCaller(req) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return { ok: false, status: 500, code: 'supabase_not_configured' }
  }

  const accessToken = getBearerToken(req)
  if (!accessToken) {
    return { ok: false, status: 401, code: 'missing_token' }
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  })

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(accessToken)

  if (userError || !user) {
    return { ok: false, status: 401, code: 'invalid_token' }
  }

  let { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, email, is_admin')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    await supabase
      .from('profiles')
      .upsert(
        {
          id: user.id,
          email: user.email ?? null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )

    const refreshed = await supabase
      .from('profiles')
      .select('id, email, is_admin')
      .eq('id', user.id)
      .single()

    profile = refreshed.data ?? null
    profileError = refreshed.error ?? null
  }

  if (profileError || !profile) {
    profile = {
      id: user.id,
      email: user.email ?? null,
      is_admin: false,
    }
  }

  const candidateEmail = normalizeEmail(profile.email || user.email)
  const canAccessAdminGate = ADMIN_EMAILS.includes(candidateEmail)
  const isAdmin = !!(profile.is_admin || canAccessAdminGate)
  return { ok: true, user, profile, supabase, isAdmin, canAccessAdminGate }
}

export async function requireAdminCaller(req) {
  const caller = await requireAuthenticatedCaller(req)
  if (!caller.ok) return caller

  if (!caller.canAccessAdminGate) {
    return { ok: false, status: 403, code: 'admin_email_not_allowed' }
  }

  if (!caller.isAdmin) {
    return { ok: false, status: 403, code: 'not_admin' }
  }

  return caller
}

export async function promoteCallerToAdmin(caller, password) {
  const { supabase, user } = caller

  try {
    const { data, error } = await supabase.rpc('claim_admin_role', {
      admin_password: password,
    })

    if (!error && data) {
      return { ok: true, method: 'rpc' }
    }
  } catch {}

  const { error: updateError } = await supabase
    .from('profiles')
    .upsert(
      {
        id: user.id,
        is_admin: true,
        email: user.email ?? caller.profile.email ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    )

  if (updateError) {
    return { ok: false, error: updateError.message || 'admin_promotion_failed' }
  }

  return { ok: true, method: 'profile-update' }
}

export function getAdminFlag(profile) {
  return !!(profile?.is_admin || ADMIN_EMAILS.includes(normalizeEmail(profile?.email)))
}

export async function refreshCallerProfile(caller) {
  const { supabase, user } = caller
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, is_admin')
    .eq('id', user.id)
    .single()

  return profile || null
}
