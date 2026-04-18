# Aceternity UI Component Fit

Date: 2026-04-15 KST

## Why this document exists

OnChain Korea already has a strong visual anchor:

- a fixed 3D `Spline` hero
- a custom brand lockup
- a learner shell and admin shell with their own information density

Because of that, `Aceternity UI` should not be used as a hero-replacement library.
It is better used as a `structure` and `interaction` library for:

- curriculum storytelling
- admin information architecture
- high-signal micro interactions

This document maps the Aceternity catalog to the current product constraints.

## Constraints from the current product

- Do not cover or replace the existing 3D landing hero.
- Do not add more decorative effects on top of the hero scene.
- Avoid turning the whole site into stacked boxed cards.
- Prefer components that improve `reading order`, `navigation`, and `operational scanning`.
- Admin UI and learner UI should remain coherent with the current brand and token system.
- Our app is `Vite + React + Tailwind`, not `Next + shadcn` by default, so Aceternity examples must be adapted manually.

## Best-fit shortlist

### 1. Sticky Scroll Reveal

Link: <https://ui.aceternity.com/components/sticky-scroll-reveal>

Best use:

- landing `8-week roadmap`
- landing `how the unlock flow works`
- admin `week-by-week operational health`

Why it fits:

- It supports long-form vertical explanation without introducing another heavy visual object.
- It is structurally compatible with the current requirement to keep the hero unobstructed and push explanation below the hero.
- It helps replace dense paragraph sections with a guided reading sequence.

Recommended adaptation:

- Use it below the hero, not inside the hero.
- Keep the visual panel restrained and use our own dark/light tokens.
- Feed it real week data from the curriculum instead of marketing-only copy.

Priority: `highest`

### 2. Tabs

Link: <https://ui.aceternity.com/components/tabs>

Best use:

- admin console top-level dataset switching
- learner dashboard module switching
- certificate / progress / profile subviews

Why it fits:

- The current admin console is naturally multi-view.
- Tabs are a cleaner fit than long stacked sections when operators need to switch context fast.
- This aligns with the existing admin IA split without forcing more cards into one screen.

Recommended adaptation:

- Preserve route-driven state with `?view=`.
- Use tabs as a view switcher, not as a decorative header.
- Keep labels operational: overview, intervention, content audit, analytics, leaderboard.

Priority: `highest`

### 3. Sidebar

Link: <https://ui.aceternity.com/components/sidebar>

Best use:

- admin-only left navigation refinement
- clearer separation between learner nav and operator nav

Why it fits:

- The user already requested that the admin left tab structure must differ from the learner sidebar.
- The Aceternity sidebar patterns are relevant as IA inspiration, not as a literal drop-in.
- It gives a better model for grouped sections, compact labels, and collapsible density.

Recommended adaptation:

- Keep our current routing and auth logic.
- Borrow grouping, hierarchy, and spacing patterns only.
- Do not replace the current sidebar wholesale unless the rewrite also preserves mobile behavior and admin gating.

Priority: `highest`

### 4. Stateful Button

Link: <https://ui.aceternity.com/components/stateful-button>

Best use:

- admin unlock CTA
- quiz submit / retry CTA
- destructive actions like account deletion with explicit progress states

Why it fits:

- OnChain Korea has several critical action buttons where `idle / loading / success / error` states matter.
- This is a high-value upgrade with low visual risk.
- It improves trust without affecting the larger layout.

Recommended adaptation:

- Use only where the system actually changes state.
- Keep copy minimal and operational.
- Do not use it for every button in the app.

Priority: `high`

### 5. Animated Modal

Link: <https://ui.aceternity.com/components/animated-modal>

Best use:

- learner profile edit
- admin learner detail drill-down
- quick curriculum previews

Why it fits:

- The current product has several places where users need focused detail without a full route transition.
- It can reduce dashboard clutter if secondary details move into modal layers.

Recommended adaptation:

- Use for secondary detail only.
- Avoid stuffing full dashboards inside modals.
- Keep modal width adaptive and content-first.

Priority: `high`

## Conditional-fit components

### 6. Apple Cards Carousel

Link: <https://ui.aceternity.com/components/apple-cards-carousel>

Best use:

- mobile-first curriculum preview
- a small `what you learn in 8 weeks` narrative strip
- admin onboarding tips if needed later

Why it can work:

- It gives the landing a more editorial progression without interfering with the 3D hero.
- It is more useful on mobile than desktop because the desktop landing already has a strong visual stage.

Risk:

- It can quickly become another box-heavy section, which the user already dislikes.

Recommendation:

- Use only if we need a horizontal narrative section on mobile.
- Do not use it for fake testimonials or generic feature cards.

Priority: `medium`

### 7. Timeline

Link: <https://ui.aceternity.com/components/timeline>

Best use:

- admin operational history
- public roadmap / release notes
- program milestones

Why it can work:

- It is useful if the content is truly chronological.
- It is less suitable than Sticky Scroll Reveal for the main landing curriculum because our curriculum is a guided learning path, not only a historical log.

Recommendation:

- Use for changelog or admin operations history before using it for the main landing.

Priority: `medium`

### 8. Compare

Link: <https://ui.aceternity.com/components/compare>

Best use:

- before/after content audit
- `before learning` vs `after completion` message
- certificate or wallet setup transformation visuals

Why it can work:

- It is effective when there is a real binary comparison.

Risk:

- If there is no true side-by-side evidence, it becomes gimmicky.

Recommendation:

- Use only when we have actual proof assets.

Priority: `medium`

### 9. Sticky Banner

Link: <https://ui.aceternity.com/components/sticky-banner>

Best use:

- top enrollment notice
- temporary campaign or deadline notice

Why it can work:

- We already use a top FOMO/enrollment bar.
- This is a natural place to borrow animation rhythm and dismissal behavior.

Risk:

- Too much motion here makes the chrome noisy.

Recommendation:

- Keep the current bar structurally simple.
- Borrow only subtle stickiness and transition behavior.

Priority: `medium`

## Components to avoid for now

Avoid using Aceternity as a source for extra hero spectacle.

Do not add additional:

- beam / spotlight / lamp style hero effects
- animated background treatments over the 3D scene
- decorative marquee or testimonial loops without sourced content
- heavy bento-card sections that push the site further into boxed layouts

Reason:

- They compete directly with the current Spline hero.
- They increase visual noise instead of improving comprehension.
- They conflict with the approved landing invariants.

## Recommended rollout order

### Phase 1

- Refine `admin sidebar` using sidebar IA patterns
- Refine `admin access` and critical CTA buttons using stateful button behavior
- Add `tabs` discipline where the admin console still feels too dense

### Phase 2

- Rebuild the landing `8-week roadmap` with `Sticky Scroll Reveal`
- Use a restrained readability panel treatment only around text regions

### Phase 3

- Test `Apple Cards Carousel` only if mobile curriculum storytelling still feels weak
- Add `Animated Modal` for learner/admin secondary detail surfaces

## Implementation note

When implementing Aceternity-derived components in this repo:

1. Keep our current route model and auth model intact.
2. Port markup and motion ideas, not full framework assumptions.
3. Replace their theme tokens with our `--app-*` and brand tokens.
4. Re-check the landing against:
   - [brand-guidelines.md](/Users/jason/Desktop/Project/onchain-korea/docs/design/brand-guidelines.md)
   - [landing-design-invariants.md](/Users/jason/Desktop/Project/onchain-korea/docs/design/landing-design-invariants.md)

## Immediate conclusion

The best Aceternity imports for OnChain Korea are not the flashy hero pieces.

The strongest matches are:

1. `Sticky Scroll Reveal`
2. `Tabs`
3. `Sidebar`
4. `Stateful Button`
5. `Animated Modal`

If we implement only one next, `Sticky Scroll Reveal` is the most useful landing upgrade and `Sidebar/Tabs` are the most useful admin upgrades.
