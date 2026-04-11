# Internal App Design Research

Date: 2026-04-01 KST

## Scope

- Focus area: post-login product surfaces, not the landing page
- Current pages reviewed:
  - `src/pages/Dashboard.jsx`
  - `src/pages/WeekDetail.jsx`
  - `src/pages/LessonDetail.jsx`
  - `src/pages/Quiz.jsx`
  - `src/pages/Certificate.jsx`
  - `src/components/Sidebar.jsx`
  - `src/components/Layout.jsx`

## Current Diagnosis

The logged-in experience feels AI-generated for structural reasons more than stylistic ones.

### 1. Everything is a card

- Dashboard, week view, quiz start, quiz result, certificate, and hidden topic all use the same card language.
- This flattens priority. The page does not tell the user what matters first.
- The result is "component soup": many containers, little information hierarchy.

### 2. Primary action is not dominant enough

- On dashboard, the "continue" moment competes with metrics, certificate progress, countdown, week list, and hidden topic.
- On week detail, lessons, actions, hidden topic, and weekly test all look like adjacent modules instead of a guided sequence.
- On lesson detail, the article reading surface is fine, but the quiz CTA is visually too similar to other actions.

### 3. The app is too label-heavy

- Many labels restate what the layout should already communicate.
- Examples:
  - tiny uppercase labels on nearly every block
  - repeated counts and secondary meta under every list item
  - icon + tag + caption combinations where one of them would be enough

### 4. The flow is sequential, but the UI is not

- The product logic is now quiz-gated and weekly-test-gated.
- The UI still looks like a generalized dashboard rather than a guided curriculum path.
- This mismatch is why the product feels less intentional than the rules behind it.

### 5. The chrome and the work surface are not separated

- Sidebar, top controls, content cards, and learning surfaces all share a similar dark-card treatment.
- Because the "shell" and the "task area" are visually too similar, nothing feels anchored.

## Research Notes

I prioritized official sources and high-signal product pages over random design inspiration.

### Toss

#### Product principles and complexity reduction

- Toss repeatedly emphasizes reducing screen complexity instead of decorating complexity.
- In `크고 복잡한 제품, 과감하게 갈아엎기`, the core issue was unclear priority and too many goals on one screen. The solution was to reorganize around user behavior and a clear main action, not just tweak components.
- In `거꾸로 입력하는 가입 화면, 처음에 어떻게 떠올렸을까?`, Toss references `1 thing for 1 page`: one screen should center one action.
- In `독이 되는 레퍼런스 활용법`, Toss argues that extra functions and extra information are costs, not benefits.

#### Design system and internal-product lessons

- In `디자인 시스템 다시 생각해보기`, Toss frames the design system as a product serving real product teams.
- In `토스 디자이너가 제품에만 집중할 수 있는 방법`, Toss shows that components should absorb edge cases, accessibility, and text growth so product screens can stay focused.
- In `제품이 커지면 디자인 시스템 가이드는 어떻게 개선돼야 할까?`, Toss explicitly recommends organizing guidance from large structure to detailed spec.
- In `토스가 특허 낸 리서치툴, TNS 제작기`, Toss uses custom UI and transitions to orient users before asking them to act. This is relevant for quizzes and tests.

### Figma

#### UI principles

- Figma's UI principles emphasize:
  - hierarchy
  - progressive disclosure
  - consistency
  - proximity
  - alignment
- The most relevant lessons for this product:
  - hierarchy: users should know what matters first
  - progressive disclosure: multi-step flows should reveal only what is needed at each stage
  - proximity: things that belong together should stay together
  - alignment: strong grid and consistent placement reduce noise

#### Structure

- Figma's website-structure guidance is useful here because the signed-in product is not a landing page problem, it is a structure problem.
- The most relevant models:
  - hierarchical: dashboard and global navigation
  - sequential: lesson and quiz progression
  - hybrid: a learning app often needs both

### Similar products

#### GREED Academy

- Public HTML is relatively clear:
  - `header`
  - `main`
  - section header rows
  - `ul` grid lists containing lesson cards
- The important pattern is not visual richness. It is simple grouping:
  - title
  - short context
  - grid of cards

#### Binance Academy

- The public course page is structured like a guided track:
  - title
  - level and time metadata
  - overview
  - syllabus
  - certificate
  - FAQ
- This is not "dashboard as control center"; it is "track as guided program".

#### Coinbase Learn

- The public learn hub behaves like a content index:
  - broad topic header
  - taxonomy labels such as `Beginner's Guide`, `Glossary`, `Key term`
  - repeated content entries
- It treats the main experience as browsing and reading, not as a card-heavy KPI dashboard.

#### Duolingo

- Duolingo's official explanation of the home screen redesign is the strongest learning-product reference here.
- Their key move was changing the home screen into a clear path, integrating review into the path, grouping lessons into smaller units, and making progress feel guided rather than self-managed.

## Core Conclusion

The signed-in product should not look like a crypto dashboard.

It should look like a guided learning path with a strong app shell.

That means:

- dashboard = orient and continue
- week page = guided unit map
- lesson page = reading surface
- quiz page = focus mode
- certificate page = milestone artifact

Right now, the app treats all of those as variations of a card list.

## Design Direction

### Direction A: Quiet shell, bright work surface

Recommended.

- Keep the sidebar and global chrome dark and restrained.
- Move the main work area toward a lighter "paper/workbench" surface for dashboard, lesson, quiz, and certificate.
- This creates a clear distinction:
  - shell = navigation
  - surface = task

This will immediately make the product feel less like generic AI dark-mode SaaS.

### Direction B: Reduce containers, increase structure

- Fewer nested cards.
- More whitespace, type hierarchy, alignment, and section rhythm.
- Use containers only when they represent a meaningful state change or object boundary.

### Direction C: Make sequential learning visible

- Replace the generic week list feel with a clearer path or module rhythm.
- Users should always know:
  - where they are
  - what the next action is
  - what unlocks after that

## Recommended Redesign by Page

### Dashboard

Current problem:

- It is trying to be progress overview, week navigator, certificate tracker, and hidden-topic promo at the same time.

Proposed structure:

1. Page header
   - `안녕하세요, {name}`
   - one-sentence status line such as `오늘은 Week 3 Day 2를 진행하면 됩니다`

2. Primary continue block
   - one dominant card or strip
   - title: current step
   - subcopy: expected time, quiz threshold, unlock result
   - CTA: `계속하기`

3. Secondary progress row
   - 2 to 3 compact metrics max
   - not equal visual weight with the main action

4. Weekly roadmap
   - vertical list or stepped path
   - only one active week expanded
   - locked weeks should be visibly quieter

5. Side info / lower priority
   - hidden topic
   - certificate progress
   - deadline
   - community

What to remove:

- Reduce badge noise and repeated metadata.
- Stop making every week card equally heavy.

### Week Detail

Current problem:

- It is closer to the right model than dashboard, but lessons, actions, hidden topic, and weekly test still feel like separate blocks rather than one weekly journey.

Proposed structure:

1. Week header
   - week number, title, subtitle
   - progress summary in one line

2. Daily rhythm strip
   - Mon / Tue / Wed / Thu / Fri / Test
   - articles are days, not anonymous list items
   - show state with shape and position, not only chips

3. Main curriculum rail
   - articles first
   - action lab after article completion
   - hidden topic after first action
   - weekly test as the final checkpoint

4. Compact side summary on desktop
   - quiz pass count
   - action count
   - unlock rule

Better mental model:

- This page should feel like a syllabus board, not a settings panel.

### Lesson Detail

Current problem:

- The article body is the best part of the signed-in experience.
- The rest of the page still feels generic and utility-first.

Proposed structure:

1. Reading header
   - breadcrumb
   - week/day marker
   - lesson title
   - reading time and source

2. Main article surface
   - narrower column
   - better typographic scale
   - more editorial spacing

3. Sticky quiz rail or footer CTA
   - progress toward passing
   - retry count
   - pass requirement

4. Key takeaways as marginalia
   - less like a blue info card
   - more like a structured summary block

### Quiz

Current problem:

- The quiz UI is functional, but visually it still looks like a standard component demo.

Proposed structure:

1. Focus mode header
   - question number
   - timer
   - progress

2. Large question surface
   - clear type scale
   - more breathing room

3. Answer stack
   - fewer borders
   - stronger active state
   - less generic green/red SaaS styling

4. Sticky bottom action bar
   - next / submit
   - keyboard-friendly

5. Result screen as milestone
   - show pass/fail clearly
   - next unlock
   - what to do now

### Certificate

Current problem:

- The certificate page is still a standard card with requirement rows under it.

Proposed structure:

1. Milestone header
   - completion state
   - short value statement

2. Poster-like certificate preview
   - real artifact treatment
   - larger scale
   - more negative space

3. Requirement checklist below
   - quieter, utility-style

## Concrete Anti-AI Rules

Use these as implementation constraints.

1. Do not use the same card style for everything.
2. Do not give all sections equal visual weight.
3. Do not rely on tiny uppercase labels to create hierarchy.
4. Do not add icons unless they clarify state.
5. Do not solve hierarchy with more badges.
6. Do not stack metrics above the primary CTA unless those metrics change the decision.
7. Do not treat lesson, quiz, action, and hidden topic as the same object.
8. Do not keep all surfaces dark if the content area needs focus and readability.

## HTML / Layout Recommendations

The signed-in app should use clearer semantic structure.

### Dashboard skeleton

```html
<main class="app-page app-page-dashboard">
  <header class="page-header">
    <div class="page-header__copy">
      <p class="eyebrow">Dashboard</p>
      <h1>오늘의 학습</h1>
      <p>Week 3 Day 2를 진행하면 다음 article이 열립니다.</p>
    </div>
    <div class="page-header__meta">
      <button>프로필</button>
    </div>
  </header>

  <section class="continue-panel" aria-labelledby="continue-title">
    <h2 id="continue-title">지금 해야 할 것</h2>
    <p>토크노믹스 & 토큰 스탠다드</p>
    <a href="/lesson/w3-t2">계속하기</a>
  </section>

  <section class="progress-strip" aria-label="학습 진행 상태">
    <dl>
      <div><dt>Article</dt><dd>9 / 24</dd></div>
      <div><dt>Action</dt><dd>2 / 8</dd></div>
      <div><dt>Test</dt><dd>2 / 8</dd></div>
    </dl>
  </section>

  <section class="roadmap" aria-labelledby="roadmap-title">
    <h2 id="roadmap-title">8주 로드맵</h2>
    <ol class="roadmap-list">
      <li class="is-current">...</li>
      <li>...</li>
    </ol>
  </section>
</main>
```

### Week detail skeleton

```html
<main class="app-page app-page-week">
  <header class="page-header">
    <p class="eyebrow">Week 3</p>
    <h1>토큰의 세계</h1>
    <p>이번 주는 article 3개, action 1개, hidden topic 1개, weekly test 1개로 구성됩니다.</p>
  </header>

  <section class="week-rhythm" aria-label="이번 주 진행 순서">
    <ol>
      <li class="is-done">Mon / Article</li>
      <li class="is-current">Tue / Article</li>
      <li>Wed / Article</li>
      <li>Thu / Action</li>
      <li>Fri / Hidden Topic</li>
      <li>Sat / Weekly Test</li>
    </ol>
  </section>

  <section class="week-path">
    <div class="path-main">...</div>
    <aside class="path-side">...</aside>
  </section>
</main>
```

### Lesson skeleton

```html
<main class="app-page app-page-lesson">
  <header class="reading-header">
    <nav aria-label="Breadcrumb">...</nav>
    <p class="eyebrow">Week 3 / Day 2</p>
    <h1>토크노믹스 & 토큰 스탠다드</h1>
    <p>읽기 7분 · 퀴즈 10문항</p>
  </header>

  <div class="reading-layout">
    <article class="reading-body">...</article>
    <aside class="reading-side">...</aside>
  </div>
</main>
```

## Implementation Order

Recommended sequence:

1. Redesign app shell
   - quiet chrome
   - remove floating-control feeling
   - define content surface

2. Redesign dashboard
   - one dominant continue block
   - roadmap structure

3. Redesign week detail
   - turn list into weekly rhythm

4. Redesign lesson detail
   - editorial reading surface

5. Redesign quiz
   - focus mode

6. Redesign certificate
   - milestone artifact treatment

## Sources

Official sources reviewed on 2026-04-01 KST:

- Toss
  - https://toss.tech/article/44097
  - https://toss.tech/article/toss-design-system
  - https://toss.tech/article/27400
  - https://toss.tech/article/mydoc
  - https://toss.tech/article/toss-signup-process
  - https://toss.tech/article/toss-design-system-guide
  - https://toss.tech/article/bad-reference-uses
  - https://toss.tech/article/Toss_Navigation_Score
  - https://toss.tech/article/43385
  - https://toss.tech/article/37325
- Figma
  - https://www.figma.com/resource-library/ui-design-principles/
  - https://www.figma.com/resource-library/what-is-visual-hierarchy/
  - https://www.figma.com/resource-library/consistency-in-design/
  - https://www.figma.com/resource-library/website-structure/
  - https://www.figma.com/resource-library/reducing-design-complexity/
- Similar products
  - https://greed.academy/learn
  - https://academy.binance.com/en/track/beginner-track
  - https://academy.binance.com/
  - https://www.coinbase.com/learn/crypto-basics
  - https://blog.duolingo.com/new-duolingo-home-screen-design/
  - https://blog.duolingo.com/how-to-review-previous-lessons-on-duolingo

## Note

- Some comparable app-shell pages are heavily client-rendered or login-gated, so the most useful signal came from:
  - official product explanations
  - public course/index pages
  - visible page structure
- For Figma, I prioritized the official resource library over general forum threads because it is a cleaner primary source for interface principles.
- The recommendation above is therefore partly source-based and partly an inference from those patterns.
