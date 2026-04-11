# Landing Page Conversion Strategy

> 적용된 마케팅 심리 원칙과 전환율 최적화 전략
> Updated 2026-04-06 — simplified landing page 반영

---

## 적용된 심리 원칙 (Cialdini + Behavioral Economics)

### 1. 앵커링 (Anchoring — Tversky & Kahneman)
- **위치**: FinalCTA
- **구현**: "유사 블록체인 교육 50~200만원 ~~→~~ ₩0"
- **효과**: 높은 가격을 먼저 보여줘서 "무료"의 가치를 극대화

### 2. 사회적 증거 (Social Proof — Cialdini)
- **위치**: Hero (N명이 시작)
- **구현**: 실제 Supabase `enrollment_stats`에서 동적 유저 수를 Hero 하단에 표시
- **효과**: "다른 사람들도 하고 있다" → 행동 확신

### 3. 희소성 (Scarcity — Cialdini)
- **위치**: FinalCTA
- **구현**: "200명 한정 · 4월 30일 마감", 실제 학기 카운트다운
- **효과**: 진짜 코호트 기반 scarcity (가짜 아님)

### 4. 손실 회피 (Loss Aversion — Kahneman)
- **위치**: FAQ 마지막 질문
- **구현**: "이번 기수를 놓치면 약 2개월을 기다려야 합니다"
- **효과**: 가입 안 하는 것의 비용을 명시

### 5. 호혜성 (Reciprocity — Cialdini)
- **위치**: 전체 과정이 무료
- **구현**: 가격 앵커링과 결합 ("50만원 가치를 무료로")
- **효과**: 무료로 가치를 받으면 심리적 부채감 → 참여/완료율 상승

### 6. 권위 (Authority — Cialdini)
- **위치**: Curriculum, Features
- **구현**: Greed Academy 커리큘럼 기반, 실무 중심 콘텐츠
- **효과**: 체계적 커리큘럼 구조가 전문성을 전달

### 7. 통합 (Unity — Cialdini 7th)
- **위치**: Hero, FinalCTA
- **구현**: "Semester 1", 코호트 개념, 함께 배우는 구조
- **효과**: 같은 기수 동기라는 집단 정체성

---

## 전환율 최적화 요소

### CTA 배치 (2곳)
1. **Hero**: 메인 CTA ("무료로 시작하기") + 보조 ("커리큘럼 보기")
2. **FinalCTA**: 페이지 하단 (마지막 기회)

### 의심 해소 (Doubt Removers)
- Hero CTA 아래: "카드 정보 불필요 · 광고 없음 · 언제든 중단 가능"
- FinalCTA 아래: 동일 + 유저 수 사회적 증거

### CTA 문구 최적화
- "시작하기" (generic) → "Week 1부터 시작하기" (구체적 — 다음 단계가 명확)
- 한국 Toss 원칙: 물리적 동사 ("만들기", "시작하기") > 추상적 동사 ("참여하기")

### 섹션 순서 (전환 퍼널)
```
Hero (Spline 3D · 가치 제안 · "블록체인, 4주면 충분합니다")
→ Curriculum (minimal 2-col grid · 무엇을 배우나)
→ Features (interactive tabs · 어떻게 다른가)
→ FAQ (마지막 의심 해소)
→ FinalCTA ← 최종 전환
→ Footer
```

### 디자인 원칙
- 모든 섹션이 `ok-readable-panel-soft` 컨테이너로 래핑 — 일관된 시각적 계층
- Hero 타이틀 한 줄: "블록체인, 4주면 충분합니다"
- Hero 서브카피 middot(·) 구분자로 핵심 가치 한 줄 요약
- 전체 한국어 카피 해요체 통일 (Toss-style)

---

## 한국 시장 특화 요소

| 요소 | 구현 | 근거 |
|------|------|------|
| 카카오톡 커뮤니티 | Community 페이지 | 한국에서 KakaoTalk = 신뢰의 인프라 |
| 원화 기준 가격 비교 | "50~200만원" | 한국 유저 기준 프레임 |
| 업비트/빗썸 맥락 | Week 1 첫 레슨, FAQ | 대부분의 한국인이 업비트에서 시작 |
| 한국 규제 투명성 | 히든토픽, FAQ | UST 사태 이후 한국 유저의 높은 스캠 경계심 |
| 안전 우선 메시징 | Week 1이 보안부터 시작 | 한국 크립토 시장의 #1 불안: 사기 |

---

## 제거된 요소

| 요소 | 제거 이유 |
|------|-----------|
| HeroPathPreview | 랜딩 간소화 — Hero에 불필요한 복잡성 |
| WhySection | 차별화 메시지를 Features 탭으로 통합 |
| GreedSignals | 불필요한 섹션, 전환 퍼널 단축 |
| CertificatePreview | 이름 입력 인터랙션 제거, 퍼널 간소화 |
| Stats 섹션 | Hero 내 사회적 증거로 통합 |
| SocialProof 섹션 | 파트너 배지 제거, 간결한 구조 |
| InlineCTA | CTA를 Hero + FinalCTA 2곳으로 집중 |
| Testimonials | 실제 후기 확보 전까지 제거 |
| LiveTicker | FomoToast와 중복, 하드코딩 메시지 |
| FomoBanner | 희소성 메시지를 FinalCTA로 통합 |
| 가짜 30일 카운트다운 | 발견 시 모든 신뢰 파괴 |
| "147명" 하드코딩 | 실제 Supabase DB 데이터로 교체 |
| 이모지 전체 | 프로페셔널하지 않음 |
