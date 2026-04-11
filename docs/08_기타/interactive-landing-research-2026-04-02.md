# Interactive Landing Research

Date: 2026-04-02 KST

## Goal

- Redesign the OnChain Korea landing page so it feels simpler at first glance but more alive in motion.
- Keep the page readable and conversion-oriented.
- Add stronger interactive depth without turning the site into a noisy demo reel.
- Use high-signal references, including Apple-style product storytelling and award-winning interactive sites.

## Current Landing Audit

Current landing composition in the repo:

- [src/pages/Landing.jsx](../src/pages/Landing.jsx)
- [src/components/landing/Nav.jsx](../src/components/landing/Nav.jsx)
- [src/components/landing/Hero.jsx](../src/components/landing/Hero.jsx)
- [src/components/landing/Stats.jsx](../src/components/landing/Stats.jsx)
- [src/components/landing/WhySection.jsx](../src/components/landing/WhySection.jsx)
- [src/components/landing/Curriculum.jsx](../src/components/landing/Curriculum.jsx)
- [src/components/landing/InlineCTA.jsx](../src/components/landing/InlineCTA.jsx)
- [src/components/landing/Features.jsx](../src/components/landing/Features.jsx)
- [src/components/landing/CertificatePreview.jsx](../src/components/landing/CertificatePreview.jsx)
- [src/components/landing/FAQ.jsx](../src/components/landing/FAQ.jsx)
- [src/components/landing/FinalCTA.jsx](../src/components/landing/FinalCTA.jsx)

Current strengths:

- Brand is already established.
- Hero already uses a 3D scene.
- Content strategy is clearer than before.
- The curriculum logic is now aligned to the 8-week program.

Current weaknesses:

- The page is still mostly a vertical stack of sections.
- Motion is mostly entrance animation, not narrative motion.
- The 3D scene exists, but the page does not really use it as a storytelling engine.
- Too many sections still resolve to "panel + cards + CTA".
- The eye does not get enough surprise, reward, or tactile feedback while scrolling.
- The experience feels simple in layout, but not intentionally simple in the Apple sense.

## What "Apple-like" Actually Means Here

The useful part of Apple is not "expensive gradients" or "big 3D objects everywhere".

The useful part is:

- one dominant idea per section
- very strong type hierarchy
- large areas of visual rest
- a single anchored object or system that evolves as you scroll
- transitions that explain the product, not just decorate it
- almost no visual clutter around the primary object

For OnChain Korea, that means:

- keep the page visually simpler than now
- make the motion system much richer than now
- let one core 3D language carry the page instead of adding many unrelated effects

## Research Method

- Prioritized official sites first.
- Added award context where it helps identify interaction quality.
- Focused on interaction patterns, section architecture, motion logic, and what is transferable to OnChain Korea.
- Excluded references that are visually impressive but structurally wrong for an education product.

## Reference Set

### 1. Apple Vision Pro

- URL: https://www.apple.com/apple-vision-pro/
- Source note: official Apple product page
- Signal:
  - official page frames the product as spatial computing and uses the device itself as the storytelling anchor
- What matters:
  - One object carries the whole story.
  - Typography and product visual are tightly staged.
  - Scroll feels like reveal, not navigation.
- Borrow:
  - hero as a stage
  - object-led storytelling
  - fewer competing UI boxes
- Do not copy:
  - hyper-luxury spacing that hides core information for too long

### 2. Apple iPhone

- URL: https://www.apple.com/iphone/
- Source note: official Apple iPhone page
- Signal:
  - repeated chapter structure of headline, media, and short supporting copy
- What matters:
  - section rhythm is extremely consistent
  - each chapter advances one reason to care
  - product media changes while the page structure stays understandable
- Borrow:
  - chaptered narrative
  - short explanatory copy under large headings
  - media-led proof blocks
- Do not copy:
  - too many chapters; our page should remain shorter

### 3. Stripe

- URL: https://stripe.com/
- Source note: official homepage
- Signal:
  - concise enterprise headline with layered motion and modular proof blocks
- What matters:
  - dense product value is still presented with strong hierarchy
  - motion supports credibility and system breadth
  - gradients and motion add energy without breaking clarity
- Borrow:
  - premium but restrained motion
  - system-feel through modular visual blocks
  - trust plus conversion in one page
- Do not copy:
  - dashboard-density in the hero

### 4. Linear

- URL: https://linear.app/
- Source note: official homepage
- Signal:
  - clear product-system framing and roadmap-oriented storytelling
- What matters:
  - clean, product-centric motion
  - animated UI previews feel real, not decorative
  - page stays calm even with constant motion
- Borrow:
  - product UI as motion content
  - restrained palette with sharp typography
  - smooth state transitions over dramatic spectacle
- Do not copy:
  - overly software-SaaS visual language; we need more atmosphere than Linear

### 5. Spline

- URL: https://spline.design/
- Source note: official homepage
- Signal:
  - real-time interactive 3D positioning with collaboration and event-driven behavior
- What matters:
  - 3D becomes useful when it is interactive and production-aware
  - not every scene needs to be cinematic; some can be tactile and direct
- Borrow:
  - pointer-reactive 3D
  - state/event-driven object behavior
  - production-aware 3D embedding
- Do not copy:
  - tool-demo complexity on a marketing page

### 6. Vercel

- URL: https://vercel.com/
- Source note: official homepage
- Signal:
  - minimal hero with ambient motion and short stacked benefit framing
- What matters:
  - simple headline, moving atmosphere, strong CTA
  - interaction lives in polish, layering, and transitions
- Borrow:
  - subtle ambient motion
  - crisp CTA hierarchy
  - minimal but premium shell
- Do not copy:
  - enterprise-neutral visual tone; OnChain Korea should feel more distinctive

### 7. Runway

- URL: https://runwayml.com/
- Source note: official homepage
- Signal:
  - cinematic framing with sparse copy and strong atmosphere
- What matters:
  - cinematic energy with sparse copy
  - strong visual mood without turning unusable
  - a research/product brand can still feel cultural
- Borrow:
  - cinematic pacing
  - darker, atmospheric sections
  - tighter copy with bigger visual confidence
- Do not copy:
  - abstractness that hides the onboarding message

### 8. Bruno Simon Portfolio

- URL: https://bruno-simon.com/
- Award context: recognized by Awwwards and widely referenced for interactive portfolio design
- Signal:
  - portfolio is navigated through a drivable 3D world
  - strong 3D, gesture, and exploration-led interaction
- What matters:
  - full-scene interaction can make a site unforgettable
  - mechanics themselves can become navigation
- Borrow:
  - playful object interaction
  - reward for exploration
  - tactile sense of depth
- Do not copy:
  - game-first interaction model; it would bury our conversion path

### 9. Cuberto

- URL: https://cuberto.com/
- Award context: award-recognized interactive agency site
- Signal:
  - strong section transitions and interaction-led project browsing
- What matters:
  - transitions can be the brand
  - motion can connect sections, not just animate inside them
- Borrow:
  - cursor and transition language
  - elegant section-to-section continuity
  - interactive hover systems
- Do not copy:
  - agency-portfolio self-expression that distracts from our offer

### 10. Active Theory

- URL: https://activetheory.net/
- Award context: Awwwards profile shows extensive award history
- Signal:
  - large-scale immersive digital experience positioning
- What matters:
  - high-end immersive storytelling
  - large-scale interaction systems can still be coherent
- Borrow:
  - confidence in scene transitions
  - deeper mouse/parallax response
  - occasional immersive chapter design
- Do not copy:
  - agency-showcase spectacle on every section

### 11. Resn

- URL: https://resn.co.nz/
- Award context: award-recognized studio with multiple high-profile immersive projects
- Signal:
  - some experiences explicitly gate unsupported browsers and provide fallbacks
- What matters:
  - serious interactive sites need graceful degradation
  - heavy interaction must still handle unsupported contexts
- Borrow:
  - fallback thinking
  - progressive enhancement strategy
  - strong experience gating for unsupported environments
- Do not copy:
  - browser fragility or interaction that blocks core learning CTA

## Cross-Reference Findings

Patterns that show up repeatedly across the strongest references:

1. One dominant object or system
   - Apple has the product.
   - Bruno has the car/world.
   - Spline has the interactive 3D canvas.
   - We should have one dominant OnChain system, not many isolated effects.

2. Motion explains structure
   - Good motion tells the user what changed.
   - Bad motion just proves the designer knows animation.

3. The page moves between calm and spectacle
   - The best sites alternate intense motion with quiet reading zones.
   - Continuous spectacle becomes tiring and kills comprehension.

4. Interactivity is layered
   - scroll
   - hover
   - drag
   - subtle depth shifts
   - reveal transitions
   - only one of these should be primary at a time

5. Strong pages use fewer sections, but each section does more
   - Our landing can likely lose some section boundaries by merging related content.

## What OnChain Korea Should Become

### Design thesis

OnChain Korea should feel like:

- a premium interactive explainer
- a guided on-chain initiation ritual
- a calm, credible product page with moments of depth

It should not feel like:

- a crypto dashboard
- an NFT landing page from 2021
- a pure agency-showcase experiment
- a static educational brochure with a random 3D object on top

## Recommended Interaction System

### Core visual principle

Make the page visually simpler than now.

Then make motion do more work.

That means:

- fewer visible panel boundaries
- fewer simultaneous cards in the viewport
- bigger type and stronger spacing
- richer motion transitions between states

### Core 3D principle

Use one core 3D system:

- chain + taeguk blockchain symbol
- or chain + proof token
- or chain + curriculum unlock object

Do not create separate unrelated 3D scenes for every section.

### Motion layers

#### Layer 1. Ambient motion

- slow parallax
- floating depth shifts
- light shader or reflection changes
- subtle chain sway

Use this everywhere in small amounts.

#### Layer 2. Scroll narrative motion

- object rotates or reframes between sections
- chain tension shifts
- token flips or locks/unlocks
- curriculum rail progresses as scroll advances

Use this for section transitions.

#### Layer 3. Direct interaction

- pointer tilt
- cursor magnetism on CTA
- hover-to-expand cards
- drag-to-rotate proof token or chain coin

Use this sparingly on hero and proof sections.

#### Layer 4. Triggered payoff motion

- Week 1-4 foundation lock clicks into place
- Week 5-8 unlock animation
- Proof of Attendance coin settles into view
- CTA pulse when countdown nears visibility

Use this only where meaning changes.

## Recommended Landing Structure

### 1. FOMO bar

Keep it, but reduce visual noise.

- one short line
- one countdown
- no extra explanatory fragments
- sticky but quiet

### 2. Hero

This should become the main interactive stage.

Recommended structure:

- left: strong headline + one supporting paragraph + CTA
- right or center: one pinned 3D object system
- as the user scrolls:
  - object reframes
  - headline emphasis changes
  - proof chips do not remain static cards; they should transition in sequence

What to remove from hero:

- too many supporting chips visible at once
- panel feeling that competes with the 3D scene
- static proof cards that feel like generic SaaS features

### 3. Foundation to advanced unlock chapter

Replace static stats feel with a scroll-reactive story:

- Step 1: 4-week foundation
- Step 2: quiz gates
- Step 3: Week 5-8 unlock

Interaction idea:

- a horizontal or vertical rail that fills as you scroll
- Week 5-8 remains visually locked until the scroll chapter reaches the unlock beat

### 4. Curriculum chapter

The current curriculum is clearer than before, but still card-heavy.

Recommended version:

- show 8 weeks as one continuous path
- active highlight follows scroll
- hovering or tapping a week reveals only the 3 article titles and one action line
- avoid showing all week details at the same intensity

### 5. Practice chapter

Show what "hands-on" means with motion, not just bullets.

Possible scene:

- wallet card
- transaction line
- explorer panel
- proof token

As the user scrolls:

- wallet connects
- tx line travels
- explorer confirms
- proof token appears

### 6. Proof of Attendance chapter

This should be one of the strongest visual moments.

Recommended behavior:

- proof token rotates slowly
- user name preview updates live
- subtle drag interaction on desktop
- blockchain permanence explained with one short statement

### 7. FAQ and final CTA

These should become quieter after the motion-heavy chapters.

- reduce ornament
- keep focus on trust and conversion
- subtle motion only

## What to Build, Specifically

### Must-have elements

1. One pinned hero object
2. Scroll-linked chapter transitions
3. Curriculum path animation
4. Proof token interaction
5. Better hover states for CTA and chapter links
6. Reduced-motion fallback
7. Mobile-safe version of every interactive section

### Nice-to-have elements

1. Cursor-reactive light field on desktop
2. Section-based background depth shifts
3. Scroll-synced counter changes
4. Subtle sound-ready architecture, but muted by default

### Avoid

1. More than one heavy 3D renderer on the page
2. Long autoplay scenes that block CTA reading
3. Overlapping parallax systems
4. Full-screen effects on every section
5. Text inside busy 3D backgrounds

## Implementation Methods

## Option A. Best near-term path

Use the current stack:

- React
- Framer Motion
- Spline

Implementation style:

- keep one Spline scene in hero
- move most section choreography into Framer Motion
- use sticky sections and scroll progress transforms
- add CSS depth, blur, and opacity staging around the main object

Why this is good:

- lowest engineering risk
- fastest path to visible improvement
- no large dependency shift

Why this is limited:

- Spline scene control is less precise than custom Three.js
- performance budget remains sensitive

## Option B. Best medium-term path

Introduce:

- `three`
- `@react-three/fiber`
- `@react-three/drei`

Implementation style:

- rebuild the hero object as a lightweight custom scene
- keep the rest of the page in normal React + Framer Motion
- use one real-time WebGL scene and several non-WebGL motion chapters

Why this is good:

- much tighter control than Spline
- easier to match Apple-like pacing
- easier to resize and restage the object across sections

Why this is expensive:

- more engineering effort
- more performance testing
- more asset preparation

## Option C. Full immersive path

Use custom WebGL as a page-wide storytelling engine.

Not recommended for this product right now.

Reason:

- too expensive relative to current business value
- too risky for readability
- likely to hurt conversion unless executed extremely well

## Recommended Technical Direction

Choose Option B after a short Option A cleanup.

That means:

### Phase 1

- simplify landing layout
- reduce panel/card noise
- make hero and curriculum motion smarter using existing stack

### Phase 2

- replace the current Spline hero with a custom lightweight 3D scene
- use the taeguk blockchain mark and chain forms as the main object language

### Phase 3

- add proof token drag interaction
- add curriculum rail motion
- add subtle cursor-reactive depth to key sections

## Performance and Accessibility Rules

These are non-negotiable.

1. Respect `prefers-reduced-motion`
2. Keep all primary copy readable with motion disabled
3. Keep CTA clickable and visually stable while objects animate
4. Use one heavy scene at most
5. Pause or simplify motion on mobile where needed
6. Provide fallback if WebGL or advanced features fail

## OnChain Korea-Specific Creative Direction

### Brand language

The taeguk blockchain symbol should not just sit in the logo.

It should become the motion language:

- orbit
- lock/unlock
- chain tension
- confirmation pulse
- token flip

### Section mood

- Hero: cinematic, immersive, high contrast
- Foundation path: structured, almost editorial
- Practice chapter: energetic, systems-focused
- Proof chapter: ceremonial, polished, memorable
- FAQ/CTA: quiet, confident, conversion-focused

## Recommended First Redesign Pass

If implementation starts next, the first pass should do only this:

1. Merge the current Hero proof cards into a scroll-driven reveal system
2. Turn the curriculum into one animated path instead of a card grid first
3. Rebuild certificate preview as a proof-token moment
4. Remove any section whose only job is repeating a claim already made elsewhere
5. Make the landing feel like 5 major chapters, not 10 stacked blocks

## Success Criteria

The redesign is working if:

- the page feels simpler, not busier
- motion explains the 4-week to 8-week progression
- the user can still read the main value proposition in under 5 seconds
- the taeguk blockchain symbol becomes a living object, not a pasted badge
- the site feels more premium without becoming harder to use

## Source Links

Official sites:

- Apple Vision Pro: https://www.apple.com/apple-vision-pro/
- Apple iPhone: https://www.apple.com/iphone/
- Stripe: https://stripe.com/
- Linear: https://linear.app/
- Spline: https://spline.design/
- Vercel: https://vercel.com/
- Runway: https://runwayml.com/
- Bruno Simon: https://bruno-simon.com/
- Cuberto: https://cuberto.com/
- Resn: https://resn.co.nz/
- Active Theory: https://activetheory.net/

Award and signal references:

- Bruno Simon Portfolio on Awwwards: https://www.awwwards.com/sites/bruno-simon-portfolio
- Active Theory on Awwwards: https://www.awwwards.com/active_theory/
- Cuberto on Awwwards: https://www.awwwards.com/sites/cuberto
- Resn on Awwwards: https://www.awwwards.com/resn/
