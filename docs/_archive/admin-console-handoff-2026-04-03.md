# OnChain Korea — Admin Console Handoff

Last updated: 2026-04-03

## Status: RESOLVED ✅

All four success criteria met. Console renders heading, summary cards, learner table.

### Root cause

The admin console route (`/ops/onchainkorea-admin/console`) was nested inside a **pathless layout route** (`<Route element={<Layout />}>`). React Router 6.30 did not match the deep `/ops/...` path as a child of the pathless parent — the `<Outlet />` rendered nothing.

### Fix applied

1. **Moved the admin console route to a top-level route** in `App.jsx` with its own `<Layout />` + `<ProtectedRoute adminOnly>` wrapper and an `index` child for `<Admin />`.
2. **Fixed ProtectedRoute race condition**: added `adminAccessLoading` spinner gate so it waits for the gate status check before deciding to redirect.
3. **Fixed useAuth timing**: changed `adminAccessLoading` initial value to `true` and stopped resetting it to `false` when `user` is still `null` (auth loading).

### Previous blocker (now resolved)

- `/ops/onchainkorea-admin/access` works
- password entry works
- user is redirected to `/ops/onchainkorea-admin/console`
- ~~but the console page still shows only the dark app shell with header/sidebar and **no main content**~~
- **Console now renders fully.**

This is not an auth-page blank screen anymore. It is now specifically an **admin console render problem**.

---

## Current user-facing symptom

Repro from the user:

1. Open `https://onchain-korea.vercel.app/ops/onchainkorea-admin/access`
2. Use an approved admin account
3. Enter password `onchainkorea@@`
4. Browser lands on `https://onchain-korea.vercel.app/ops/onchainkorea-admin/console`
5. Header and sidebar render
6. Main console body is blank

The screenshot shows:

- left sidebar renders normally
- top header renders normally
- current user and `Admin` badge render
- main content area is empty black

That strongly suggests:

- app shell mounted
- auth state resolved enough to render `Layout`
- route did not crash the whole app
- but the `Admin` route element either:
  - is not mounting,
  - is returning nothing,
  - is hidden by route logic,
  - or is failing in a way that does not surface visibly

---

## What is already implemented

### Admin paths

- Entry: `/ops/onchainkorea-admin`
- Access: `/ops/onchainkorea-admin/access`
- Console: `/ops/onchainkorea-admin/console`

Defined in:

- [src/lib/adminRoute.js](/Users/jason/Desktop/Project/onchain-korea/src/lib/adminRoute.js)

### Access gate model

- Access page is server-rendered, not SPA-rendered
- Password verification is server-side
- Gate cookie is httpOnly
- Approved admin emails currently:
  - `dentway.official@gmail.com`
  - `min9.mark@gmail.com`

Relevant files:

- [api/admin-gate/access-page.js](/Users/jason/Desktop/Project/onchain-korea/api/admin-gate/access-page.js)
- [api/admin-gate/entry-page.js](/Users/jason/Desktop/Project/onchain-korea/api/admin-gate/entry-page.js)
- [api/admin-gate/unlock.js](/Users/jason/Desktop/Project/onchain-korea/api/admin-gate/unlock.js)
- [api/admin-gate/status.js](/Users/jason/Desktop/Project/onchain-korea/api/admin-gate/status.js)
- [api/admin-gate/_shared.js](/Users/jason/Desktop/Project/onchain-korea/api/admin-gate/_shared.js)

### Access UI changes already made

- approved admin email list is no longer shown in UI
- access page is intended to show:
  - sign-in CTA when no session
  - denied state when non-approved account
  - password form when approved account

SPA version:

- [src/pages/AdminAccess.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/AdminAccess.jsx)

Server-rendered version used in production:

- [api/admin-gate/access-page.js](/Users/jason/Desktop/Project/onchain-korea/api/admin-gate/access-page.js)

### Admin console implementation exists

The page is not intentionally empty.

It currently includes:

- summary cards
- ops priorities
- stalled learners
- week distribution
- learner table
- selected learner detail
- quick links
- backend state

File:

- [src/pages/Admin.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/Admin.jsx)

### Route setup

Main routing:

- [src/App.jsx](/Users/jason/Desktop/Project/onchain-korea/src/App.jsx)

Protected route:

- [src/components/ProtectedRoute.jsx](/Users/jason/Desktop/Project/onchain-korea/src/components/ProtectedRoute.jsx)

Layout:

- [src/components/Layout.jsx](/Users/jason/Desktop/Project/onchain-korea/src/components/Layout.jsx)

Auth hook:

- [src/hooks/useAuth.jsx](/Users/jason/Desktop/Project/onchain-korea/src/hooks/useAuth.jsx)

---

## Important current code state

### ProtectedRoute was already simplified

This was changed on purpose:

- `ProtectedRoute` no longer blocks admin routes on `adminAccessLoading`
- it only blocks on the base `loading` state

File:

- [src/components/ProtectedRoute.jsx](/Users/jason/Desktop/Project/onchain-korea/src/components/ProtectedRoute.jsx)

So if the page is still blank, the old explanation "`adminAccessLoading` spinner is hiding everything" is probably no longer enough.

### Access page now checks approval via server status

The server-rendered access page no longer prints the allowlist and no longer hardcodes client-side allowlist display.

Instead, it:

- reads Supabase session from local storage
- calls `/api/admin-gate/status`
- if `403`, shows denied state
- if `200` and unlocked, redirects to console
- otherwise shows password form

File:

- [api/admin-gate/access-page.js](/Users/jason/Desktop/Project/onchain-korea/api/admin-gate/access-page.js)

### ErrorBoundary exists

If the entire React tree were crashing in a normal render error, we would expect the fallback UI.

File:

- [src/components/ErrorBoundary.jsx](/Users/jason/Desktop/Project/onchain-korea/src/components/ErrorBoundary.jsx)

Because the screenshot shows shell-with-empty-main instead of the fallback, likely possibilities are:

- child route is not rendering into `<Outlet />`
- route logic returns `null`/redirect branch unexpectedly
- CSS/layout is hiding the content region
- stale chunk/cached asset is loading an old route tree

---

## Most likely root causes to test next

### Hypothesis 1 — `Admin` route is not mounting inside `Outlet`

The shell clearly mounts.

Need to verify whether the `Admin` element itself is rendered at all.

Fastest way:

1. Add a temporary plain marker at the top of `Admin.jsx`, for example:
   - red text
   - no helper classes
   - no dependency on data
2. Confirm whether it appears in `/ops/onchainkorea-admin/console`

If it does not appear:

- route/outlet problem
- nested `ProtectedRoute` / route path issue

If it does appear:

- the page is mounting
- then the rest is CSS/layout/conditional rendering

### Hypothesis 2 — old/stale frontend chunk is still being used

This repo has had repeated Vercel deployments while the route structure changed.

There is already a one-time reload mechanism in:

- [src/main.jsx](/Users/jason/Desktop/Project/onchain-korea/src/main.jsx)

But the user still saw a blank shell after multiple deploys, so a stale bundle mismatch is still plausible.

Need to check:

- browser console for chunk/module load errors
- network tab for failed JS asset loads on `/ops/onchainkorea-admin/console`

### Hypothesis 3 — `Admin.jsx` render path is getting hidden by data or layout conditions

`Admin.jsx` has these key gates:

- `if (supabaseEnabled && !isAdmin) return <Navigate ... />`
- `loading`
- data fetch error state
- empty state

Even with bad data, it should still show the page shell and empty/error panels.

So if nothing at all is visible, inspect:

- parent container sizing
- `ok-workbench` / `ok-paper` styles
- any accidental `overflow`, `opacity`, or animation interaction

CSS file:

- [src/index.css](/Users/jason/Desktop/Project/onchain-korea/src/index.css)

### Hypothesis 4 — route shell visible but nested route not matched

Current nested route setup:

- outer protected layout route
- admin console route nested under it

File:

- [src/App.jsx](/Users/jason/Desktop/Project/onchain-korea/src/App.jsx)

Need to confirm that `/ops/onchainkorea-admin/console` is definitely matching the nested child route and not only the parent layout route.

This is a strong candidate because the screenshot looks exactly like:

- layout mounted
- outlet child absent

---

## Recommended debug sequence

Do this in order.

### Step 1 — Prove whether `Admin.jsx` mounts

Add a temporary block at the very top of the component return:

```jsx
<div style={{ color: 'red', fontSize: 40, padding: 40, position: 'relative', zIndex: 10 }}>
  ADMIN ROUTE MOUNTED
</div>
```

If not visible:

- focus on route matching / nested route rendering / redirect logic

If visible:

- focus on admin content tree and CSS

### Step 2 — Simplify the console route completely

Temporarily replace the admin route element in [src/App.jsx](/Users/jason/Desktop/Project/onchain-korea/src/App.jsx) with a minimal inline page.

Example test:

```jsx
<Route
  path={ADMIN_CONSOLE_PATH}
  element={
    <ProtectedRoute adminOnly>
      <div style={{ color: 'white', padding: 40 }}>ADMIN CONSOLE TEST</div>
    </ProtectedRoute>
  }
/>
```

If this renders:

- route and guard are fine
- `Admin.jsx` implementation or its import path is the problem

If this still does not render:

- route tree / guard / outlet issue

### Step 3 — Remove nested complexity if needed

If step 2 still fails, temporarily move the admin console route **outside** the shared layout nesting and render a standalone console page.

Reason:

- current symptom looks like parent shell-only rendering
- isolating the route will prove whether `Layout` nesting is the blocker

### Step 4 — Inspect browser devtools on production

Need exact answers for:

- does main content DOM contain admin section nodes?
- are they just invisible?
- are any JS assets failing?
- are there runtime exceptions after route transition?

### Step 5 — Only after route render is stable, restore full console UI

Do not keep tweaking the admin data UI until the mount/render problem is proven resolved.

---

## Current production expectations

Expected user flow:

1. open `/ops/onchainkorea-admin/access`
2. sign in with approved account
3. enter `onchainkorea@@`
4. land on `/ops/onchainkorea-admin/console`
5. console UI should appear

Current reality:

- step 4 succeeds
- step 5 fails visually

So the unresolved issue is now **console rendering only**.

---

## Security constraints that should remain unchanged

Do not undo these while debugging:

- keep private admin paths under `/ops/onchainkorea-admin/*`
- keep server-side password verification
- keep httpOnly admin gate cookie
- keep approved email list hidden from the UI
- keep approved emails restricted to:
  - `dentway.official@gmail.com`
  - `min9.mark@gmail.com`

Related files:

- [src/hooks/useAuth.jsx](/Users/jason/Desktop/Project/onchain-korea/src/hooks/useAuth.jsx)
- [api/admin-gate/_shared.js](/Users/jason/Desktop/Project/onchain-korea/api/admin-gate/_shared.js)
- [supabase-auth-hardening.sql](/Users/jason/Desktop/Project/onchain-korea/supabase-auth-hardening.sql)

---

## Repo hygiene note

This repo currently has a large dirty working tree with many unrelated changes and generated artifacts.

Do not assume a clean git state.

Before broad refactors:

- avoid reverting unrelated files
- isolate admin-console debugging to:
  - `src/App.jsx`
  - `src/pages/Admin.jsx`
  - `src/components/ProtectedRoute.jsx`
  - `src/components/Layout.jsx`
  - `src/hooks/useAuth.jsx`
  - `src/index.css`
  - `api/admin-gate/access-page.js`

---

## Minimal success criterion

The debug task is complete when:

1. `/ops/onchainkorea-admin/access` renders reliably
2. password submission redirects to `/ops/onchainkorea-admin/console`
3. `/ops/onchainkorea-admin/console` visibly shows at least:
   - page heading
   - summary cards
   - learner table or empty state
4. no approved admin email list is shown in UI

