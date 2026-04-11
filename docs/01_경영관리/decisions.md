# Architectural & Strategic Decisions

> 이 문서는 프로젝트에서 내린 주요 결정과 그 근거를 기록합니다.

---

## 1. 커리큘럼 순서 재구성 (2026-03-27)

**결정**: 스테이블코인을 Week 4 → Week 2로 이동. 전체 4주 순서 재배치.

**근거**:
- 한국 유저의 실제 크립토 여정: 업비트 가입 → 매수 → "이게 뭐지?" → 스테이블코인(환헤지/송금) → 셀프 커스터디
- 스테이블코인이 한국인에게 가장 빠르게 "쓸모있다"고 느끼는 유스케이스 (해외 송금, 달러 환헤지)
- Week 4에 넣으면 3주간 체감 없이 이론만 진행
- 히든토픽과 주차 내용이 불일치하는 문제 해결

**이전**: 지갑 → DYOR → DeFi/NFT → 스테이블코인/스테이킹
**이후**: 지갑(업비트 브릿지) → 스테이블코인/탐색 → DYOR/DeFi → NFT/스테이킹

---

## 2. Lesson ID 유지 정책 (2026-03-27)

**결정**: 주차를 재배치해도 기존 lesson ID (w1-1, w4-1 등)를 변경하지 않음.

**근거**:
- useProgress가 localStorage와 Supabase에 `completedLessons: ['w1-1', 'w4-1', ...]` 형태로 저장
- ID를 바꾸면 기존 베타 유저의 진도 데이터가 전부 초기화됨
- 콘텐츠 lookup은 flat object (`lessonContents[lessonId]`)라서 week 소속과 무관하게 작동
- 결과: w4-1(스테이블코인)이 Week 2에 있지만 ID는 그대로 — 약간 이상하지만 유저에겐 보이지 않음

---

## 3. Supabase 선택 + Optional 설계 (2026-03-26)

**결정**: Supabase를 백엔드로 선택하되, 없어도 앱이 동작하도록 설계.

**근거**:
- Firebase 대비: Postgres 기반이라 SQL 친화적, RLS(Row Level Security)로 보안 간편
- Optional 이유: 개발 중에는 env 없이 localStorage만으로 테스트 가능해야 함
- `supabase.js`에서 env 없으면 `null` 반환 → 모든 hook에서 `if (!supabase)` 체크

---

## 4. 가짜 데이터 전면 제거 (2026-03-26)

**결정**: FinalCTA의 rolling 30-day 카운트다운, 하드코딩 "147명" 등 모든 가짜 데이터 제거.

**근거**:
- 한국 유저는 조작된 긴급성을 빠르게 감지 (한국 소비자 연구 결과)
- 한 번 발견되면 페이지의 모든 신뢰 시그널이 무효화됨
- 대안: 실제 Supabase enrollment_stats 테이블에서 실시간 데이터, 실제 학기 마감일 사용

---

## 5. LiveTicker 제거, FomoToast만 유지 (2026-03-27)

**결정**: 랜딩 페이지에서 LiveTicker(좌하단) 제거, FomoToast(우하단)만 유지.

**근거**:
- 두 개 동시 운영 시 "조작하고 있다"는 느낌 (연구: 동시 FOMO 요소는 역효과)
- LiveTicker는 하드코딩된 메시지 → 신뢰도 낮음
- FomoToast는 랜덤 생성이라 더 자연스러움
- 추후 Supabase Realtime으로 실제 활동 데이터 연동 가능

---

## 6. 이모지 전면 제거 (2026-03-26)

**결정**: 레슨 타입 (📖 읽기, ⚡ 실습, 🔒 보안), 액션 가이드 아이콘 (👛💜🔐 등) 모든 이모지 제거.

**근거**:
- 유저 피드백: "짜치는 이모티콘" — 프로페셔널하지 않음
- 디자인 시스템에서 Lucide React 아이콘 이미 사용 중
- 대안: 레슨 타입 → BookOpen/Zap/Shield 아이콘 + accent-soft 색상, 액션 → Wallet/Download/KeyRound 등

---

## 7. 가격 앵커링 적용 (2026-03-27)

**결정**: Stats 섹션과 FinalCTA에 "유사 교육 50~200만원 → ₩0" 가격 비교 삽입.

**근거**:
- Tversky & Kahneman 앵커링 효과: 높은 가격을 먼저 보여주면 "무료"의 가치가 극대화
- 무료 = 가치 없음이라는 인식 방지
- 실제 한국 블록체인 교육 시장 가격대 (클래스101, 패스트캠퍼스 기준) 50~200만원은 사실
- 위치: Stats 바로 아래(첫 인상) + FinalCTA(마지막 결정 순간)

---

## 8. FAQ 섹션 추가 (2026-03-27)

**결정**: 랜딩 페이지에 6개 FAQ 추가 (Testimonials 뒤, FinalCTA 전).

**근거**:
- 한국 유저의 top objection: "초보인데 괜찮나?", "정말 무료?", "시간 투자?"
- FAQ가 없으면 이 의문을 품은 채 이탈
- 위치: Testimonials(사회적 증거) 직후 → FAQ(의심 해소) → FinalCTA(전환)
- 마지막 FAQ "다음 기수는 언제?"로 자연스러운 긴박감 유도 (놓치면 2개월 대기)

---

## 9. 인터랙티브 Proof of Attendance 미리보기 (2026-03-27, updated 2026-03-31)

**결정**: CertificatePreview에 이름 입력 필드 추가 → 실시간 Proof of Attendance 미리보기.

**근거**:
- Goal Gradient Effect: 목표(Proof of Attendance)에 이미 이름이 적혀있으면 완료 동기 상승
- Endowment Effect: "내 것"이라고 느끼기 시작하면 포기하기 어려움
- LinkedIn 공유 mockup: 사회적 화폐 동기 (한국 직장인 타겟)
- 구현: 간단한 useState input → 플레이스홀더 "홍길동" → 실시간 반영

---

## 10. 섹션 순서 최적화 (2026-03-27)

**결정**: 랜딩 페이지 섹션 재배치.

**이전**: Hero → Stats → Why → SocialProof → Testimonials → Curriculum → Features → Cert → FinalCTA
**이후**: Hero → Stats(가격앵커) → SocialProof(파트너 먼저) → Why → Curriculum → InlineCTA → Features → Cert(인터랙티브) → Testimonials → FAQ → FinalCTA

**근거**:
- SocialProof를 위로 이동: 파트너 로고/리워드가 "이 과정이 진짜"라는 신뢰를 먼저 구축
- Curriculum 뒤에 InlineCTA: 커리큘럼을 보고 "괜찮네" 느낀 순간이 전환 의도 최고점
- Testimonials를 Cert 뒤로 이동: Proof of Attendance 열망 → 실제 수료자 후기 순서가 더 설득력
- FAQ를 FinalCTA 직전: 마지막 의심 해소 후 바로 CTA

---

## 11. Certificate → Proof of Attendance (PoAP) 용어 변경 (2026-03-31)

**결정**: 모든 유저 대면 텍스트에서 "Certificate" / "수료증"을 "Proof of Attendance (PoAP)"로 변경.

**근거**:
- Bojana 피드백: "Certificate"는 공인 자격증을 암시할 수 있음
- 우리 프로그램은 공인 교육기관이 아니므로 법적/윤리적 오해 방지 필요
- "Proof of Attendance"는 학습 참여 증명이라는 정확한 의미 전달
- 면책 문구 추가: "본 Proof of Attendance는 공식 자격증이 아닌 학습 완료 증명입니다"

---

## 12. Sequential Content Reveal 시스템 (2026-03-31)

**결정**: 콘텐츠 잠금 해제 순서를 레슨 → 액션 → 히든토픽으로 강제.

**근거**:
- 유저가 히든토픽을 먼저 읽고 레슨을 건너뛰는 패턴 방지
- 학습 퍼널: 이론(레슨) → 실습(액션) → 심화(히든토픽) 순서가 교육학적으로 효과적
- 각 단계 완료율이 다음 단계 잠금 해제 조건으로 작동
- 진도 추적(useProgress)과 자연스럽게 연동
