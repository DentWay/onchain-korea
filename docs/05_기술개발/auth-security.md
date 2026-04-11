# Auth And Admin Security

Last updated: 2026-04-02

## Current auth model

- Public learner app and admin console share the same Supabase user base.
- A user must first authenticate with Supabase.
- Admin capability is then determined by:
  - `public.profiles.is_admin = true`, or
  - `VITE_ADMIN_EMAILS` / `ADMIN_EMAILS` environment allowlist fallback
- OAuth login restores the originally requested internal path after callback.
  - Example: an unauthenticated admin visiting `/ops/onchainkorea-admin` is sent to login first, then returned to the admin gate instead of being dropped on `/dashboard`.

## Admin entry model

- Public routes do **not** use `/admin` anymore.
- Legacy routes are disabled:
  - `/admin`
  - `/admin-access`
- Current private operations paths:
  - Entry: `/ops/onchainkorea-admin`
  - Access gate: `/ops/onchainkorea-admin/access`
  - Console: `/ops/onchainkorea-admin/console`
- Approved emails allowed to use this path:
  - `dentway.official@gmail.com`
  - `min9.mark@gmail.com`

## Why this changed

The previous model had two weak points:

- the public route name was obvious
- the admin password was checked in the browser

The current model fixes both:

- the entry path is separate from the old public route
- password verification happens on the server

## Current gate architecture

### Layer 1: Supabase identity

- The browser must hold a valid Supabase session.
- The server checks the caller token with Supabase before admin unlock is allowed.
- Non-admin users cannot open the admin gate even if they know the password.

### Layer 2: Server-side admin password

- Admin password verification is handled by Vercel serverless functions:
  - `api/admin-gate/unlock.js`
  - `api/admin-gate/status.js`
  - `api/admin-gate/lock.js`
- The browser never compares the password locally.
- The deployed frontend bundle no longer contains the admin password string.

### Layer 3: httpOnly admin gate cookie

- Successful unlock sets an `HttpOnly` cookie.
- The browser cannot read this cookie directly from JavaScript.
- Frontend state is restored via `/api/admin-gate/status`.
- The admin entry and access screens now live outside the main protected app shell so they can render reliably even when the app layout or protected route state is unstable.
- Locking admin access or signing out clears the cookie.

### Unlock transition behavior

- After a successful server-side password check, the client now opens the admin route immediately.
- Profile re-sync happens in the background instead of blocking the transition.
- The browser-side unlock request times out after 12 seconds and shows a dedicated error message instead of hanging indefinitely.

### Refresh and route stability

- Admin status checks now use a client-side timeout instead of waiting indefinitely.
- The admin access screen never blocks the whole page with a full-screen loading state.
- It renders the login/password shell first and shows account/session verification as an inline status chip.
- The admin entry and access paths are now served by dedicated Vercel server pages instead of relying on the React SPA boot sequence.
- This avoids layout-level blank states and route loops when the internal dashboard chrome, protected-route state, or SPA boot path is unstable.
- Trailing-slash variants are normalized:
  - `/ops/onchainkorea-admin/`
  - `/ops/onchainkorea-admin/access/`
- The direct typed path `/ops/onchainkorea-admin` is now a dedicated admin entry route instead of the console itself.
- The real admin console lives behind the gate at `/ops/onchainkorea-admin/console`.
- UI buttons for approved admin users now link directly to `/ops/onchainkorea-admin/access` so the visible admin action always opens the password gate immediately.
- Internal admin buttons use full document navigation (`href`) instead of client-side SPA routing to reduce route-stall risk.
- `/ops/onchainkorea-admin` remains the typed/manual entry path and no longer waits on admin gate status before forwarding.
- `/ops/onchainkorea-admin/access` is now rendered server-side with inline logic that:
  - reads the existing Supabase browser session from local storage
  - shows the sign-in CTA if no approved session exists
  - checks existing admin gate cookie state
  - submits the unlock password directly to `/api/admin-gate/unlock`
- The access screen no longer prints the approved admin email list in the UI.
- Admin console routing no longer blocks on `adminAccessLoading`; unresolved gate sync should fall back to the access page instead of leaving a blank shell.
- OAuth callback recovery now falls back to `/auth` after 5 seconds instead of leaving a full-screen spinner up indefinitely.

## Password storage

- Passwords are not stored in plaintext in frontend code.
- Server verification uses a `scrypt` hash string.
- Preferred runtime configuration:
  - `ADMIN_GATE_PASSWORD_HASH`
  - `ADMIN_GATE_COOKIE_SECRET`
  - `ADMIN_GATE_COOKIE_TTL_SECONDS`
  - `ADMIN_EMAILS` if server-side allowlist is needed

## Current default behavior

- If no env override is supplied, the server falls back to the current configured password hash.
- The current expected password is operationally set to `onchainkorea@@`.
- This should be rotated into environment variables for production hardening.

## Rotation procedure

### Change the admin password

1. Generate a new `scrypt` hash.
2. Set `ADMIN_GATE_PASSWORD_HASH` in Vercel.
3. Redeploy.
4. Share the new password only out of band.

Example hash generation:

```bash
node -e "const crypto=require('crypto'); const salt='onchain-korea-admin-v1'; console.log('scrypt$'+salt+'$'+crypto.scryptSync('NEW_PASSWORD', salt, 64).toString('hex'))"
```

### Change the cookie signing secret

1. Set a new `ADMIN_GATE_COOKIE_SECRET` in Vercel.
2. Redeploy.
3. Existing unlocked admin browser sessions become invalid.

## Required supporting schema

- `supabase-schema.sql`
- `supabase-admin-schema.sql`
- `supabase-account-schema.sql`
- `supabase-auth-hardening.sql`

Admin read access still depends on the Supabase `is_admin` role and policies. The password gate is an additional control layer, not a replacement for RLS.

The current production rule is intentionally narrow:

- only `dentway.official@gmail.com` and `min9.mark@gmail.com` may be promoted or unlocked
- other accounts are rejected even if they know the operations password

## Important hardening note

If `supabase-auth-hardening.sql` has not been applied yet:

- the app can still promote the current authenticated user after server password verification
- but profile update rules are not fully tightened yet

Apply `supabase-auth-hardening.sql` to lock down direct `is_admin` edits and make self-promotion go through the dedicated database function instead. That function is restricted to the approved admin allowlist.

## Frontend files tied to this model

- `src/hooks/useAuth.jsx`
- `src/components/ProtectedRoute.jsx`
- `src/pages/AdminAccess.jsx`
- `src/pages/Admin.jsx`
- `src/components/Layout.jsx`
- `src/components/Sidebar.jsx`
- `src/lib/adminRoute.js`
- `src/lib/authRedirect.js`
- `src/pages/Auth.jsx`
- `src/pages/AuthCallback.jsx`

## Server files tied to this model

- `api/admin-gate/_shared.js`
- `api/admin-gate/entry-page.js`
- `api/admin-gate/access-page.js`
- `api/admin-gate/unlock.js`
- `api/admin-gate/status.js`
- `api/admin-gate/lock.js`

## Maintenance rule

When admin auth flow, entry paths, password handling, or logout semantics change, update this file in the same change set.
