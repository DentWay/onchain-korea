# Changelog

> 주요 변경 이력 (대화 기반, 역순)

---

## 2026-04-02

### 관리자 콘솔 blank shell 방지 및 승인 이메일 UI 비노출
- 관리자 콘솔 route guard가 `adminAccessLoading`에 막혀 검은 빈 화면처럼 보이던 문제를 수정
- 관리자 전용 route는 초기 auth loading만 spinner를 보이고, 관리자 게이트 동기화는 access page로 넘기도록 단순화
- `/ops/onchainkorea-admin/access`의 SPA 화면과 server-rendered gate page 모두에서 승인 이메일 목록을 더 이상 노출하지 않도록 수정
- access page는 승인 이메일 하드코딩 목록 대신 `승인된 관리자 계정만 통과 가능` 규칙만 보여주도록 정리

### 관리자 콘솔 재구성 및 asset load 복구
- blank screen이 나지 않도록 관리자 콘솔을 더 단순한 운영 대시보드로 재구성
- 관리자 콘솔은 이제 항상 최소 골격(`요약 / 학습자 리스트 / 상세 / 빠른 이동 / 백엔드 상태`)을 렌더
- 학습자 데이터가 없어도 empty state와 권한 안내가 보이도록 수정
- stale hashed asset/chunk 404 발생 시 브라우저에서 1회 자동 새로고침 복구 추가
- 운영 첫 화면에 `운영 우선 확인`과 `주차 분포`를 추가해 정체 학습자와 주차 몰림을 바로 볼 수 있게 확장

### 관리자 접근 경로를 서버 페이지로 전환
- `/ops/onchainkorea-admin`를 Vercel server page redirect로 전환
- `/ops/onchainkorea-admin/access`를 React route가 아닌 dedicated server-rendered HTML gate page로 전환
- admin access blank screen을 SPA boot 문제와 분리
- `vercel.json`에 운영 경로 rewrite를 명시해 catch-all SPA rewrite보다 먼저 처리

### 관리자 접근 blank screen 복구 및 GREED 공개 신호 섹션 추가
- 관리자 `입구`와 `잠금 해제` 페이지를 protected app shell 바깥으로 이동
- 관리자 `입구`는 항상 `/ops/onchainkorea-admin/access`로 단순 전달되도록 변경
- 관리자 `잠금 해제` 화면의 full-screen loading 분기를 제거하고 인라인 상태칩만 남김
- 헤더/사이드바의 `관리자 입구` 버튼을 SPA `Link` 대신 전체 문서 이동(`href`)으로 변경
- `/ops/onchainkorea-admin/access`와 `/ops/onchainkorea-admin`를 다시 authenticated app shell 안에서 렌더되도록 조정
- `AdminAccess.jsx`의 누락된 `ADMIN_ACCESS_PATH` 참조 수정
- 관리자 진입 버튼을 눌렀을 때 빈 검은 화면 대신 정상 라우팅/렌더가 되도록 정리
- `docs/greed-academy-research-2026-04-02.md`에 GREED Academy 공개 메타데이터와 워크숍/참여 신호 정리
- 랜딩에 GREED 공개 성과 기반 인포그래픽 섹션 추가
- admin allowlist에 `min9.mark@gmail.com` 추가
- 로그아웃 완료 화면에 dark app theme scope와 대비 조정 적용

### 랜딩 Proof 섹션 제거
- 랜딩 하단의 회전 태극 심볼 섹션 전체 제거
- `CertificatePreview` 컴포넌트 삭제

### 관리자 입구 버튼 및 랜딩 패널 폭 조정
- 관리자 계정 UI 버튼은 `/ops/onchainkorea-admin`이 아니라 `/ops/onchainkorea-admin/access`로 바로 연결되도록 수정
- typed entry route `/ops/onchainkorea-admin`는 `adminAccessLoading`에 묶이지 않도록 단순화
- 랜딩의 가독성 패널 폭을 `max-w-7xl` 기준으로 확장해 기본값이 화면 가로에 더 가깝게 차도록 조정
- Hero 패널 내부 텍스트는 중앙 정렬을 유지하되 바깥 패널은 넓게 확장
- Hero 로고 락업/헤드라인 자간과 줄 간격을 완화해 가독성 조정
- Proof 섹션을 `두꺼운 태극 심볼 단일 회전` 모드로 단순화하고 hero 배경 간섭을 차단
- Proof 심볼 두께를 줄이고, 레이어 간격이 보이지 않도록 밀도를 높여 재조정
- Proof 심볼은 마우스 반응을 제거하고 자동 free-floating 회전으로 변경
- Proof 심볼 회전을 full Y-spin에서 oblique ambient spin으로 변경해 중간에 사라져 보이는 문제 완화

### 관리자 잠금 해제 흐름 안정화
- 관리자 비밀번호 통과 후 프로필 재조회 완료를 기다리지 않고 바로 운영 경로로 이동하도록 수정
- 관리자 잠금 해제 요청에 12초 타임아웃 추가
- 관리자 잠금 해제 화면에 타임아웃 전용 오류 문구 추가
- 관리자 상태 확인에도 타임아웃 추가
- 관리자 접근 화면 refresh 시 전체 spinner로 막히지 않도록 수정
- `/ops/onchainkorea-admin/`, `/ops/onchainkorea-admin/access/` trailing slash 경로 정규화
- OAuth callback 무한 로딩 방지용 5초 fallback 추가
- `/ops/onchainkorea-admin`를 콘솔이 아닌 전용 관리자 입구로 분리
- 실제 관리자 콘솔 경로를 `/ops/onchainkorea-admin/console`로 이동

### 코드 정리 및 저위험 최적화
- 의미 없이 남아 있던 `sendBeacon` progress sync 제거
- progress sync timer unmount cleanup 추가
- `useStats`의 미사용 `loaded` 상태 제거
- 현재 랜딩에서 사용하지 않는 dead component 제거

### 관리자 운영 경로 하드닝
- 공개 `/admin` 경로 폐기
- 별도 운영 경로 `/ops/onchainkorea-admin` 도입
- 관리자 비밀번호 검증을 프론트에서 제거하고 Vercel serverless API로 이동
- httpOnly 운영 쿠키 기반 세션 잠금/해제 추가
- OAuth 로그인 후 관리자 진입 경로 복귀 로직 추가
- 일반 계정도 운영 비밀번호 통과 시 관리자 승격 가능하도록 흐름 수정
- 관리자 허용 이메일을 `dentway.official@gmail.com` 단일 계정으로 제한
- `supabase-auth-hardening.sql` 추가
- `docs/auth-security.md` 문서 추가

### Bojana 피드백 반영
- "Certificate" → "Proof of Attendance (PoAP)" 전체 용어 변경 (공식 자격증 오해 방지)
- FAQ 업데이트: SOL 구매 가이드 추가, Semester = Greed Academy 코호트 설명 추가
- 모바일 시드 문구 안전 팁 추가
- Proof of Attendance 면책 문구 추가 ("공식 자격증이 아닌 학습 완료 증명")

### 랜딩 페이지 리디자인
- VeriChain 영감 디자인 → 디자인 시스템에 맞게 톤 다운
- Sequential content reveal 시스템 (레슨 → 액션 → 히든토픽)

### 인증 + 백엔드
- Google / Kakao / Wallet 인증 추가
- Supabase 통합 강화

### QA 감사
- P0 / P1 / P2 이슈 수정

### i18n 마이그레이션
- 100+ 번역 키 추가 (ko/en)

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
- CertificatePreview: 인터랙티브 이름 입력 (→ 이후 Proof of Attendance로 용어 변경)
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
