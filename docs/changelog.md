# Changelog

> 주요 변경 이력 (대화 기반, 역순)

---

## 2026-03-27

### 커리큘럼 재구성
- 4주 순서 전면 재배치 (한국 유저 여정 최적화)
- 스테이블코인 Week 4 → Week 2 이동
- 신규 레슨 w1-0: "한국 거래소에서 온체인으로" 추가
- 히든토픽 ↔ 주차 내용 일치시킴
- w1-3 (하드웨어 지갑) 드롭 (Week 1에 과하게 advanced)

### 컨텐츠 2026.3 기준 업데이트
- 2차 법안: "시사" → 국회 심의 중
- 트래블룰: 100만원 미만 확대
- SEC: Paul Atkins 취임 명시
- 권도형: 징역 15년 추가
- 업비트 점유율: 70-80% → 60-65%
- 한국 ETF: 초기 → 국회 심의 중

### 랜딩 페이지 전환율 최적화
- FinalCTA: 가짜 30일 카운트다운 → 실제 학기 마감일
- 가격 앵커링 추가 (Stats + FinalCTA)
- Hero: 의심 해소 문구 추가
- InlineCTA 컴포넌트 (Curriculum 뒤)
- FAQ 섹션 추가 (6개 질문)
- CertificatePreview: 인터랙티브 이름 입력
- FomoBanner: "선착순" → "N/200명 · 4월 30일 마감"
- LiveTicker 제거 (FomoToast만 유지)
- 섹션 순서 재배치

### Beta 표시
- 사이드바 + 모바일 헤더에 "BETA" 뱃지
- 로고 클릭 → 홈 (/) 링크

### CLAUDE.md + docs/ 생성

---

## 2026-03-26

### Phase 1: 콘텐츠 완성
- 19개 레슨 한국어 콘텐츠 작성 (week1~4.js)
- 4개 히든토픽 에디토리얼 아티클 작성 (hidden.js)
- LessonDetail: 플레이스홀더 → 인라인 콘텐츠 렌더링
- HiddenTopics: 아코디언 펼쳐읽기 UI

### Phase 2: Supabase 백엔드
- @supabase/supabase-js 설치
- AuthProvider + useAuth (email/Google OAuth)
- ProtectedRoute (미인증 → /auth)
- useProgress 리팩토링: localStorage + Supabase sync (debounce 500ms)
- useStats: enrollment_stats 실시간 조회
- Auth 페이지 (signin/signup/email confirmation)
- Layout + Sidebar: 유저 정보 + 로그아웃
- 랜딩 CTA: /auth 라우팅 (미인증 시)
- supabase-schema.sql 추가

### 팩트체크 1차
- 8개 항목 수정 (스테이블코인 시장, USDC Centre, 밸리데이터 수, APY 등)

### 이모지 제거 + Lucide 아이콘
- 레슨 타입: 📖⚡🔒 → BookOpen/Zap/Shield
- 액션 가이드: 👛💜🔐... → Wallet/Download/KeyRound...

### GA 소스 매핑 재구성
- w1-2: S2-L1 → S1-L5, w1-5: S1-L5 → S2-L1, w3-5: S2-L2 → S1-L6
- greedArticles 객체에 title 필드 추가
- "원문 읽기" 링크에 GA 아티클 제목 표시

### 디자인 리뉴얼
- LessonDetail: Medium 스타일 읽기 경험 (카드 제거, 14px/1.8 line-height)
- Dashboard: 수료 조건 프로그레스 바, 잠긴 주차 Lock, ActivityFeed 제거
- WeekDetail: 개별 카드, hover chevron, 듀얼 프로그레스 바

### 프로덕션 이슈 수정 (이전 세션에서)
- index.html: bg-gray-50 → bg-[#0C0D11] (FOUC 수정)
- SEO 메타 태그 추가 (og, twitter card)
- ErrorBoundary 추가
- BlockchainCanvas 최적화 (25 nodes, squared distance)
- 진도 잠금 재활성화 (60% 기준)
- 가짜 completion 데이터 제거

### Vercel 배포
- waybridges-projects/onchain-korea (dentway/itda와 분리)
- GitHub 자동 배포 연결

---

## 초기 빌드 (2026-03-26 이전)

- React + Vite + Tailwind 초기 설정
- 디자인 시스템 (design-guidelines.md)
- 4주 커리큘럼 데이터 구조
- 10개 액션 가이드 (스텝바이스텝)
- 랜딩 페이지 (Hero, Stats, Curriculum, Features 등)
- 다크 테마 + Pretendard 폰트
- 한/영 이중 언어 (useLang)
- 진도 추적 (useProgress + localStorage)
- FOMO 요소 (FomoBanner, FomoToast)
