# Landing Design Invariants

Date: 2026-04-02 KST

This file records approved landing-page constraints so future changes do not repeat rejected hero layouts.

## Non-Negotiables

- Do not modify, replace, or cover the existing 3D interactive feature in the landing hero.
- Do not place a boxed overlay panel on top of the active 3D area.
- Do not push the hero brand block and headline so far down that the first viewport loses the message.
- Do not create a large dead left column while the 3D object sits on the right.
- Do not place raw paragraph text directly over visually busy 3D regions when readability drops.

## Approved Hero Structure

- Use a stacked top-of-page flow:
  - `HeroStage`
  - `HeroPathPreview`
- `HeroStage` is a fixed single-screen 3D chapter at the top and the following sections scroll above it.
- `HeroStage` itself must show the brand, headline, and CTA inside the first viewport.
- `HeroPathPreview` sits below the intro and uses a horizontal desktop layout.
- The hero content should sit in an open layout, not inside a large card or glass panel.
- The first brand row should not use a pill or boxed treatment around the lockup.
- Localized semi-transparent readability panels are allowed behind text blocks, as long as they wrap only the reading area and do not compete with the 3D focal object.
- Readability panels should scale with the page width and feel horizontally integrated with the layout, not collapse into square cards by default.
- Hero typography should favor readability over maximum density: slightly looser tracking and taller line-height are preferred over compressed display copy.

## Layout Intent

- The first viewport should be dominated by the 3D object, but it must also show the main message immediately.
- The hero copy block should sit as a centered lower overlay inside the first viewport.
- The path preview should spread horizontally on desktop instead of collapsing into a left-heavy list.
- The section after `Why` may use public, sourced proof/infographic content, but it should rely on verifiable metadata rather than invented testimonials.
- The 3D object should remain the visual anchor.
- Typography and spacing should organize the hero, not panels.
- When text overlaps the persistent 3D background in later sections, use restrained backplates behind the text region instead of leaving copy directly on the animation.
- Negative space should feel intentional, not empty.

## Rejected Patterns

- Left-column hero copy beside the 3D scene.
- Top-heavy boxed hero layouts that compete with the object.
- Fixes that solve overlap by hiding the message below the fold.
- Nav changes that accidentally shift the hero problem instead of solving it.

## Review Checklist

Before shipping any landing-page update:

1. Check the first viewport on desktop.
2. Confirm the 3D scene is visible and not covered.
3. Confirm the first viewport already shows the brand, headline, and CTA in one centered block.
4. Confirm there is no oversized dead column.
5. Confirm the path preview sits below the hero and reads as a horizontal desktop section.
