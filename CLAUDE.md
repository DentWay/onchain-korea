> **공통 규칙 필독**: 작업 전 반드시 `../CLAUDE.md` (프로젝트 공통 운영 규칙)를 먼저 읽는다.

**last_verified: 2026-04-17**

# Onchain Korea — Project Context

## Overview
Blockchain Literacy & Safety Education Platform for Korea.
Built by Elixi Venture Studio Group × Greed Academy.
8-week curriculum teaching Korean beginners from wallet setup to staking.

- **Production**: https://onchain-korea.vercel.app
- **Repo**: https://github.com/DentWay/onchain-korea
- **Vercel Project**: waybridges-projects/onchain-korea

## Tech Stack
- React 18 + Vite 5 (SPA)
- Tailwind CSS 3 + custom design tokens (CSS variables)
- React Router 6
- Framer Motion (animations)
- Supabase (auth + progress sync — graceful fallback if no credentials)
- Pretendard font (Korean optimized)
- Deployed on Vercel (auto-deploy on push to main)

## Curriculum Structure (Korean Market Optimized)

Order designed for Korean user journey: 업비트 → 지갑 → 스테이블코인 → DYOR → DeFi → NFT → 스테이킹

⚠️ **Lesson ID Re-mapping Note**: Lesson IDs in documentation (w1-0, w2-1, etc.) are outdated legacy references. Current code uses full alphanumeric IDs (w3-t1, w4-p2, etc.) per `curriculum.js`. Refer to source code for authoritative lesson ID mappings.

### Week 1: 크립토 기초 + 지갑 설정
| Lesson | ID | GA Source |
|--------|-----|-----------|
| 한국 거래소에서 온체인으로 (업비트→지갑 브릿지) | w1-0 | Original |
| 지갑이란? — 주소, 프라이빗 키, 시드 문구 | w1-1 | S1-L5 Wallets |
| 지갑 클라이언트 비교 — Phantom, Solflare, Backpack | w1-2 | S1-L5 Wallets |
| 버너 지갑 만들기 | w1-4 | S2-L1 Wallet Hygiene |
| 키 관리 & 보안 베스트 프랙티스 | w1-5 | S2-L1 Wallet Hygiene |
- Actions: phantom-setup, burner-wallet, seed-backup
- Hidden Topic: 한국 거래소 vs 해외 DEX (content key: 1)

### Week 2: 스테이블코인 + 온체인 탐색
| Lesson | ID | GA Source |
|--------|-----|-----------|
| 스테이블코인 작동 원리 — USDT vs USDC vs DAI | w4-1 | S2-L7 Stablecoins |
| 디지털 에셋 & 토큰 스탠다드 (SPL, ERC-20) | w3-3 | S2-L2 Digital Assets |
| 블록 탐색기란? — Solscan으로 트랜잭션 읽기 | w2-1 | S2-L6 Onchain Explorers |
| 온체인 활동 추적 — 지갑 분석과 토큰 흐름 | w2-2 | S2-L6 Onchain Explorers |
- Actions: stablecoin-transfer, solscan-tx
- Hidden Topic: 왜 스테이블코인이 주목받고 있을까 (content key: 2)

### Week 3: DYOR + DeFi
| Lesson | ID | GA Source |
|--------|-----|-----------|
| DYOR 기초 — 레드플래그 식별법 | w2-3 | S1-L7 DYOR Part 1 |
| DYOR 심화 — 프로젝트 & NFT 리서치 툴 | w2-4 | S1-L8 DYOR Part 2 |
| 실전 스캠 분석 — 실제 사례로 배우기 | w2-5 | S1-L4 Hype |
| DeFi란? — AMM, 유동성 풀, 수수료 구조 | w3-1 | S2-L4 DeFi |
| DEX에서 스왑하기 — Orca, Raydium 비교 | w3-2 | S2-L4 DeFi |
- Actions: dyor-report, dex-swap
- Hidden Topic: 트럼프 크립토 정책 (content key: 3)

### Week 4: NFT · 크로스체인 · 스테이킹
| Lesson | ID | GA Source |
|--------|-----|-----------|
| NFT 이해하기 — 개념부터 활용까지 | w3-4 | S1-L6 NFTs |
| Metaplex Core로 내 에셋 민팅하기 | w3-5 | S1-L6 NFTs |
| 크로스체인 & 브릿지 — L2, 롤업, deBridge | w4-2 | S2-L8 Cross-chain |
| 밸리데이터 & 스테이킹 — 원리와 참여 방법 | w4-3 | S1-L1 Staking |
| 거버넌스 & DAO — 온체인 의사결정 | w4-4 | S1-L2 Governance |
- Actions: nft-mint, debridge, sol-staking
- Hidden Topic: 한국에서 NFT는 끝났나 (content key: 4)

## Greed Academy Source Articles
13 Medium articles used as reference. Lesson IDs keep original numbering for backward compatibility with user progress data.

```
S1-L1: Staking and Validators
S1-L2: Governance
S1-L4: Hype (scams/FOMO)
S1-L5: Wallets
S1-L6: NFTs
S1-L7: DYOR Part 1
S1-L8: DYOR Part 2
S2-L1: Wallets & Wallet Hygiene
S2-L2: Digital Assets
S2-L4: DeFi
S2-L6: Onchain Explorers
S2-L7: Stablecoins
S2-L8: Cross-chain & Bridging
```

## File Architecture

```
src/
├── data/
│   ├── curriculum.js          # Weeks, lessons, actions, hidden topics, GA mappings
│   └── content/
│       ├── index.js           # Merges all lesson content into flat object
│       ├── week1.js           # w1-0, w1-1, w1-2, w1-4, w1-5
│       ├── week2.js           # w2-1 ~ w2-5
│       ├── week3.js           # w3-1 ~ w3-5
│       ├── week4.js           # w4-1 ~ w4-4
│       └── hidden.js          # hiddenTopicContents[1-4] (keyed by week id)
├── hooks/
│   ├── useAuth.jsx            # Supabase auth (email/Google OAuth)
│   ├── useProgress.jsx        # Progress tracking (localStorage + Supabase sync)
│   ├── useLang.jsx            # i18n (ko/en) with 200+ translation keys
│   └── useStats.jsx           # Enrollment stats from Supabase
├── lib/
│   └── supabase.js            # Supabase client (graceful null if no env vars)
├── pages/
│   ├── Landing.jsx            # Public landing page
│   ├── Auth.jsx               # Login/signup
│   ├── AuthCallback.jsx       # Google OAuth callback
│   ├── Dashboard.jsx          # Main learning hub
│   ├── WeekDetail.jsx         # Week-level view
│   ├── LessonDetail.jsx       # Article reading experience
│   ├── ActionGuide.jsx        # Step-by-step practice guides
│   ├── HiddenTopics.jsx       # Weekly editorial articles
│   ├── Community.jsx          # KakaoTalk, newsletter, forum
│   └── Certificate.jsx        # Proof of Attendance (PoAP) eligibility tracker
├── components/
│   ├── Layout.jsx             # App shell (sidebar + outlet)
│   ├── Sidebar.jsx            # Navigation + progress + Beta badge
│   ├── ProtectedRoute.jsx     # Auth gate
│   ├── ErrorBoundary.jsx      # Error recovery UI
│   └── landing/               # 17 landing page components
│       ├── Hero.jsx, Nav.jsx, Stats.jsx
│       ├── Curriculum.jsx, Features.jsx
│       ├── CertificatePreview.jsx (interactive PoAP name input)
│       ├── FAQ.jsx (6 questions)
│       ├── InlineCTA.jsx (mid-page conversion)
│       ├── FomoBanner.jsx (top bar with real deadline)
│       └── FinalCTA.jsx (price anchoring + real countdown)
└── index.css                  # Design tokens, ok-* classes, animations
```

## Design System
- Dark theme only (surface-0: #0C0D11)
- Single accent hue: blue (#3B82F6)
- 3-level text hierarchy: 87% / 60% / 38% white opacity
- `.ok-card`, `.ok-btn`, `.ok-btn-primary`, `.ok-btn-ghost`, `.ok-tag`, `.ok-progress-track`
- No emojis in content. Lucide React icons only.
- 60-30-10 color rule enforced

## Supabase Schema
See `supabase-schema.sql` in project root.
- `profiles` — user display info
- `user_progress` — completed_lessons[], completed_actions[], read_hidden_topics[]
- `enrollment_stats` — singleton row for landing page stats
- Trigger `handle_new_user` auto-creates rows on signup

Environment variables (Vercel + .env.local):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Key Decisions
1. **Lesson IDs preserved across restructure** — w4-1 is in Week 2 but keeps its ID to avoid breaking existing user progress in localStorage/Supabase.
2. **Content lookup is flat** — `lessonContents[lessonId]` works regardless of which week the lesson is in.
3. **Hidden topic keys = week IDs** — `hiddenTopicContents[weekId]` must be re-keyed when weeks are reordered.
4. **Supabase is optional** — app works without credentials (falls back to localStorage only).
5. **No fake data** — all countdown timers use real semester deadline (2026-04-30), stats come from DB.
6. **"Proof of Attendance (PoAP)" not "Certificate"** — Bojana feedback: avoid implying official credential. All user-facing copy uses "Proof of Attendance" instead of "Certificate".
7. **"Semester" = Greed Academy cohort** — Current offering is Semester 1 + 2 combined (Greed Academy S1 & S2 curriculum merged). Explained in FAQ.

## Implementation Status Notes

- **[미구현] GA 트래킹** — 문서에만 존재하며, 코드에 GA 이벤트 추적이 실제로 구현되지 않음. 설치 필요시 `pages/`의 각 라우트에 `gtag.event()` 호출 추가 필요.

## Content Factcheck Status (as of 2026-03-27)
All 20 lessons and 4 hidden topic articles have been verified against primary sources.
Key regulatory facts verified:
- GENIUS Act signed July 2025
- 가상자산 이용자 보호법 2024.7.19 시행
- 과세 2027년까지 유예
- 트래블룰 100만원 미만으로 확대 중
- 업비트 점유율 ~62% (2026.1)
- 권도형 징역 15년 (2025.12)
- SEC Paul Atkins 취임 (2025.4)
- Solana 밸리데이터 ~800개 (post-pruning)
- 스테이블코인 시장 $300B+

## Semester Info
- Semester 1 + 2 (combined) deadline: 2026-04-30T23:59:59+09:00
- Next cohort (Semester 3): July 2026
- Capacity: 200 spots per semester
