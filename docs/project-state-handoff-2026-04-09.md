# OnChain Korea — Project State Handoff

Last updated: 2026-04-09

## 1. Scope

This handoff is for the `onchain-korea` repo:

- Repo path: `/Users/jason/Desktop/Project/onchain-korea`
- Live site: `https://onchain-korea.vercel.app`

Important:

- My current shell cwd was **not** this repo.
- Current shell cwd was: `/Users/jason/Desktop/Project/ITDA-AI`
- The actual website/project work referenced here is in `onchain-korea`.

---

## 2. Current product summary

OnChain Korea is currently a Korean blockchain education product with:

- public landing page
- authenticated learner app
- 8-week curriculum structure
- article quiz flow
- weekly tests
- Supabase auth/progress/quiz persistence
- private admin access flow under `/ops/onchainkorea-admin/*`

Core stack:

- React 18
- Vite 5
- Tailwind CSS 3
- React Router 6
- Supabase JS v2
- Spline hero on landing

Key source folders:

- app shell / routing:
  - [src/App.jsx](/Users/jason/Desktop/Project/onchain-korea/src/App.jsx)
  - [src/main.jsx](/Users/jason/Desktop/Project/onchain-korea/src/main.jsx)
  - [src/index.css](/Users/jason/Desktop/Project/onchain-korea/src/index.css)
- auth/admin:
  - [src/hooks/useAuth.jsx](/Users/jason/Desktop/Project/onchain-korea/src/hooks/useAuth.jsx)
  - [src/components/ProtectedRoute.jsx](/Users/jason/Desktop/Project/onchain-korea/src/components/ProtectedRoute.jsx)
  - [src/pages/Admin.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/Admin.jsx)
  - [src/pages/AdminAccess.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/AdminAccess.jsx)
  - [src/pages/AdminEntry.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/AdminEntry.jsx)
  - [src/lib/adminRoute.js](/Users/jason/Desktop/Project/onchain-korea/src/lib/adminRoute.js)
  - [api/admin-gate/](/Users/jason/Desktop/Project/onchain-korea/api/admin-gate)
- learning app:
  - [src/pages/Dashboard.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/Dashboard.jsx)
  - [src/pages/WeekDetail.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/WeekDetail.jsx)
  - [src/pages/LessonDetail.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/LessonDetail.jsx)
  - [src/pages/Quiz.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/Quiz.jsx)
  - [src/pages/ActionGuide.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/ActionGuide.jsx)
  - [src/pages/HiddenTopics.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/HiddenTopics.jsx)
  - [src/pages/Community.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/Community.jsx)
  - [src/pages/Certificate.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/Certificate.jsx)
  - [src/pages/Settings.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/Settings.jsx)
- content/data:
  - [src/data/curriculum.js](/Users/jason/Desktop/Project/onchain-korea/src/data/curriculum.js)
  - [src/data/programBlueprint.js](/Users/jason/Desktop/Project/onchain-korea/src/data/programBlueprint.js)
  - [src/data/quizzes.js](/Users/jason/Desktop/Project/onchain-korea/src/data/quizzes.js)
  - [src/data/phase2Curriculum.js](/Users/jason/Desktop/Project/onchain-korea/src/data/phase2Curriculum.js)
  - [src/data/quizzes-phase2-w1w2.js](/Users/jason/Desktop/Project/onchain-korea/src/data/quizzes-phase2-w1w2.js)
  - [src/data/quizzes-phase2-w3w4.js](/Users/jason/Desktop/Project/onchain-korea/src/data/quizzes-phase2-w3w4.js)
  - [src/data/quizzes-phase2-w5w6.js](/Users/jason/Desktop/Project/onchain-korea/src/data/quizzes-phase2-w5w6.js)
  - [src/data/quizzes-phase2-w7w8.js](/Users/jason/Desktop/Project/onchain-korea/src/data/quizzes-phase2-w7w8.js)

---

## 3. Current documentation state

There are two documentation layers right now:

### A. Old/stale root README

- [README.md](/Users/jason/Desktop/Project/onchain-korea/README.md)

This file is stale.

It still says:

- `/` is dashboard
- 4-week curriculum framing

That is no longer the actual product state.

### B. New docs system

- [docs/README.md](/Users/jason/Desktop/Project/onchain-korea/docs/README.md)

This is the newer operating doc and is closer to current direction.

It describes:

- 8-week structure
- department-based docs organization
- Phase 1 / Phase 2 framing
- admin/security/docs references

When handing off to another agent, treat `docs/README.md` as the better overview than the root `README.md`.

---

## 4. Current repository state

The repo is **dirty** and has a lot of ongoing work.

Current git status has:

- many modified tracked files
- many new untracked docs/assets/components
- screenshots and local debug artifacts still in repo root

This is important:

- do not assume a clean tree
- do not broadly revert
- isolate fixes carefully

High-signal modified files currently include:

- [src/components/Layout.jsx](/Users/jason/Desktop/Project/onchain-korea/src/components/Layout.jsx)
- [src/components/Sidebar.jsx](/Users/jason/Desktop/Project/onchain-korea/src/components/Sidebar.jsx)
- [src/pages/Auth.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/Auth.jsx)
- [src/pages/Dashboard.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/Dashboard.jsx)
- [src/pages/LessonDetail.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/LessonDetail.jsx)
- [src/pages/Quiz.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/Quiz.jsx)
- [src/pages/Settings.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/Settings.jsx)
- [src/pages/WeekDetail.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/WeekDetail.jsx)
- [src/components/landing/HeroStage.jsx](/Users/jason/Desktop/Project/onchain-korea/src/components/landing/HeroStage.jsx)
- [src/components/landing/Curriculum.jsx](/Users/jason/Desktop/Project/onchain-korea/src/components/landing/Curriculum.jsx)
- [src/components/landing/Features.jsx](/Users/jason/Desktop/Project/onchain-korea/src/components/landing/Features.jsx)
- [src/index.css](/Users/jason/Desktop/Project/onchain-korea/src/index.css)
- [src/data/quizzes.js](/Users/jason/Desktop/Project/onchain-korea/src/data/quizzes.js)

High-signal untracked/new additions currently include:

- [src/pages/Admin.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/Admin.jsx)
- [src/pages/AdminAccess.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/AdminAccess.jsx)
- [src/pages/AdminEntry.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/AdminEntry.jsx)
- [src/pages/SignedOut.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/SignedOut.jsx)
- [src/pages/Settings.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/Settings.jsx)
- [src/lib/adminRoute.js](/Users/jason/Desktop/Project/onchain-korea/src/lib/adminRoute.js)
- [src/lib/authRedirect.js](/Users/jason/Desktop/Project/onchain-korea/src/lib/authRedirect.js)
- [src/components/LessonInline.jsx](/Users/jason/Desktop/Project/onchain-korea/src/components/LessonInline.jsx)
- [src/data/phase2Curriculum.js](/Users/jason/Desktop/Project/onchain-korea/src/data/phase2Curriculum.js)
- [src/data/quizzes-phase2-w1w2.js](/Users/jason/Desktop/Project/onchain-korea/src/data/quizzes-phase2-w1w2.js)
- [src/data/quizzes-phase2-w3w4.js](/Users/jason/Desktop/Project/onchain-korea/src/data/quizzes-phase2-w3w4.js)
- [src/data/quizzes-phase2-w5w6.js](/Users/jason/Desktop/Project/onchain-korea/src/data/quizzes-phase2-w5w6.js)
- [src/data/quizzes-phase2-w7w8.js](/Users/jason/Desktop/Project/onchain-korea/src/data/quizzes-phase2-w7w8.js)
- [supabase-account-schema.sql](/Users/jason/Desktop/Project/onchain-korea/supabase-account-schema.sql)
- [supabase-admin-schema.sql](/Users/jason/Desktop/Project/onchain-korea/supabase-admin-schema.sql)
- [supabase-auth-hardening.sql](/Users/jason/Desktop/Project/onchain-korea/supabase-auth-hardening.sql)
- [supabase-migration-2026-04-04.sql](/Users/jason/Desktop/Project/onchain-korea/supabase-migration-2026-04-04.sql)

There are also many debug screenshots and test artifacts in the repo root that are probably cleanup candidates later.

---

## 5. Current website state

### Public landing

Current landing direction:

- dark visual system
- Spline 3D hero retained
- more readable text panels added on top of the dark visual field
- multiple landing sections tuned around Korean blockchain learner onboarding

Important landing constraints already established in docs:

- [docs/landing-design-invariants.md](/Users/jason/Desktop/Project/onchain-korea/docs/landing-design-invariants.md)

Do not casually break these:

- 3D interactive feature should not be casually replaced
- hero readability matters
- design language should stay coherent with the rest of the product

### Learner app

Current learner app structure includes:

- dashboard
- week path
- lesson/article screen
- quiz screen
- action guide
- hidden topics
- community
- certificate / proof
- settings / nickname / account actions

The app has already been pushed toward:

- darker coherent shell
- more natural Korean copy
- less “AI-looking” generic dashboard structure

### Admin area

Current private admin route family:

- `/ops/onchainkorea-admin`
- `/ops/onchainkorea-admin/access`
- `/ops/onchainkorea-admin/console`

Security model:

- approved email allowlist
- password gate
- httpOnly cookie
- Supabase role hardening via SQL

Relevant docs:

- [docs/auth-security.md](/Users/jason/Desktop/Project/onchain-korea/docs/auth-security.md)
- [docs/admin-console-handoff-2026-04-03.md](/Users/jason/Desktop/Project/onchain-korea/docs/admin-console-handoff-2026-04-03.md)

---

## 6. Current known problem

The biggest unresolved issue is still the **admin console render problem**.

Observed behavior:

- access page opens
- password entry completes
- route transitions to `/ops/onchainkorea-admin/console`
- header and sidebar render
- main admin content area stays blank

This means:

- shell is alive
- auth is at least partially resolved
- route transition happens
- but admin main content is not visibly rendering

There is already a focused handoff doc for this:

- [docs/admin-console-handoff-2026-04-03.md](/Users/jason/Desktop/Project/onchain-korea/docs/admin-console-handoff-2026-04-03.md)

That doc should be treated as the main debugging note for the admin issue.

---

## 7. Current security/admin state

Admin allowlist currently includes:

- `dentway.official@gmail.com`
- `min9.mark@gmail.com`

The UI was intentionally changed so approved email lists are **not shown** in the access page.

Files involved:

- [src/hooks/useAuth.jsx](/Users/jason/Desktop/Project/onchain-korea/src/hooks/useAuth.jsx)
- [src/pages/AdminAccess.jsx](/Users/jason/Desktop/Project/onchain-korea/src/pages/AdminAccess.jsx)
- [api/admin-gate/access-page.js](/Users/jason/Desktop/Project/onchain-korea/api/admin-gate/access-page.js)
- [api/admin-gate/_shared.js](/Users/jason/Desktop/Project/onchain-korea/api/admin-gate/_shared.js)
- [supabase-auth-hardening.sql](/Users/jason/Desktop/Project/onchain-korea/supabase-auth-hardening.sql)

Operational note:

- if security behavior changes, update [docs/auth-security.md](/Users/jason/Desktop/Project/onchain-korea/docs/auth-security.md) in the same change set

---

## 8. Curriculum/content state

Project direction is no longer “simple 4-week only”.

Current documented direction is:

- 8-week GREED-based Korean curriculum
- learner-facing public framing still emphasizes “4주 기본기” in some places
- internal content/data has phase 2 preparation files

Signals of current state:

- [src/data/curriculum.js](/Users/jason/Desktop/Project/onchain-korea/src/data/curriculum.js)
- [src/data/programBlueprint.js](/Users/jason/Desktop/Project/onchain-korea/src/data/programBlueprint.js)
- [src/data/phase2Curriculum.js](/Users/jason/Desktop/Project/onchain-korea/src/data/phase2Curriculum.js)
- [src/data/quizzes.js](/Users/jason/Desktop/Project/onchain-korea/src/data/quizzes.js)
- [src/data/quizzes-phase2-w1w2.js](/Users/jason/Desktop/Project/onchain-korea/src/data/quizzes-phase2-w1w2.js)
- [src/data/quizzes-phase2-w3w4.js](/Users/jason/Desktop/Project/onchain-korea/src/data/quizzes-phase2-w3w4.js)
- [src/data/quizzes-phase2-w5w6.js](/Users/jason/Desktop/Project/onchain-korea/src/data/quizzes-phase2-w5w6.js)
- [src/data/quizzes-phase2-w7w8.js](/Users/jason/Desktop/Project/onchain-korea/src/data/quizzes-phase2-w7w8.js)

This indicates the repo is partway through a transition:

- phase 1 live product
- phase 2 preparation in progress

---

## 9. What a follow-up agent should do first

If another agent takes over, recommended order:

1. Read:
   - [docs/README.md](/Users/jason/Desktop/Project/onchain-korea/docs/README.md)
   - [docs/auth-security.md](/Users/jason/Desktop/Project/onchain-korea/docs/auth-security.md)
   - [docs/admin-console-handoff-2026-04-03.md](/Users/jason/Desktop/Project/onchain-korea/docs/admin-console-handoff-2026-04-03.md)
   - [docs/landing-design-invariants.md](/Users/jason/Desktop/Project/onchain-korea/docs/landing-design-invariants.md)
   - [docs/changelog.md](/Users/jason/Desktop/Project/onchain-korea/docs/changelog.md)

2. Treat root `README.md` as stale.

3. Do **not** assume a clean git state.

4. If debugging admin console:
   - start from [docs/admin-console-handoff-2026-04-03.md](/Users/jason/Desktop/Project/onchain-korea/docs/admin-console-handoff-2026-04-03.md)
   - do not refactor the whole admin/auth system first
   - prove whether `Admin.jsx` mounts before making broad changes

5. If changing auth/admin behavior:
   - update [docs/auth-security.md](/Users/jason/Desktop/Project/onchain-korea/docs/auth-security.md)

6. If changing landing hero/layout:
   - respect [docs/landing-design-invariants.md](/Users/jason/Desktop/Project/onchain-korea/docs/landing-design-invariants.md)

---

## 10. Short plain-language status

Current practical status:

- website exists and is live
- learner product exists and is fairly deep
- admin auth/gate/access flow exists
- admin console route still has a render problem
- documentation has improved, but some top-level docs are stale
- repo is active and mid-transition, not clean/frozen

