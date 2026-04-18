# Changelog

> 주요 변경 이력 (대화 기반, 역순)

---

## 2026-04-18

### 랜딩 Hero 영문 헤드라인 레거시 문구 정리
- `HeroStage`의 영문 헤드라인이 `Blockchain` / `Safe from the Start` 2줄 구조로 고정되도록 재확인
- 남아 있던 legacy 번역 키 `landing.hero1`, `landing.hero2`도 새 문구로 통일해 이전 comma 기반 표현이 다시 섞여 나오지 않도록 정리

---

## 2026-04-17

### 랜딩 영문 카피 줄바꿈 가독성 보정
- `HeroStage`, `Curriculum`, `Features`, `FinalCTA`, `FAQ`의 영문 설명 문구를 다시 검토하고, 한 줄 길이가 과한 구간은 문장 단위 줄바꿈으로 정리
- 히어로 서브카피, 커리큘럼 소개문, CTA 보조문구는 `whitespace-pre-line` 기반으로 2줄 리듬을 주고, FAQ 영문 답변은 문단형 줄바꿈으로 읽기 밀도를 낮춤

### 랜딩 Hero 영문 헤드라인 줄바꿈 정리
- `HeroStage.jsx` 영문 타이틀을 `Blockchain. Safe from the Start.`에서 `Blockchain` / `Safe from the Start` 2줄 구조로 변경
- 영문 버전에서도 마침표를 제거해 한국어 히어로와 같은 리듬으로 정리

### 랜딩 커리큘럼 sticky 전환 기준 보정
- `Curriculum.jsx`의 좌측 sticky 포커스 카드가 단순 고정처럼 보이던 문제를 수정하고, 우측 주차 섹션이 화면 기준선에 도달할 때 활성 주차가 바뀌도록 스크롤 기준을 재설계
- 기존의 `closest section` 방식 대신 `trigger line`을 지난 마지막 주차를 현재 포커스로 삼도록 바꿔 Week 2, Week 3 등 각 섹션 진입 시점이 더 직관적으로 맞도록 보정
- sticky 카드 본문에 `AnimatePresence`/`motion` 전환을 추가해 제목, 설명, 요약 카드, 아티클 리스트가 주차 변경 시 자연스럽게 교체되도록 정리
- 추가 원인 분석 결과 랜딩 최상위 래퍼의 `overflow-x-hidden`이 sticky를 깨고 있었고, `Curriculum` 그리드의 `items-start/self-start` 조합도 sticky parent 높이를 카드 높이로 축소시켜 추적 불가 상태를 만들고 있었음을 확인
- `Landing.jsx`에서 랜딩 레벨 `overflow-x-hidden`을 제거하고, `Curriculum.jsx`에서 sticky parent가 오른쪽 로드맵 높이를 그대로 따라가도록 되돌린 뒤 headless Chrome DevTools 실측으로 `stickyTop`이 `112px`에 유지되는 것을 검증
- 추가로 sticky 노출 브레이크포인트를 `lg`에서 `min-[900px]`로 낮춰 좁은 데스크톱 폭에서도 같은 구조가 유지되도록 보정했고, headless Chrome 캡처 기준 `900px`와 `1440px` 모두에서 좌측 포커스 카드가 주차 진행에 맞춰 따라오는 것을 재확인

## 2026-04-16

### 앱 전역 다크모드 토큰 마이그레이션 마무리
- 학습자 앱, 인증 흐름, 로그아웃 완료 화면, 관리자 공용 컴포넌트에서 남아 있던 `bg-white`, `#101114`, `#686b82`, `#9497a9`, `#dedee5`, `#eef0f3`, `#f7f7f8` 하드코드를 `--app-*` 토큰 기반으로 정리
- `WeekDetail`, `LessonDetail`, `HiddenTopics`, `Dashboard`, `Quiz`, `ActionGuide`, `Certificate`, `Settings`, `Community`, `LessonInline`, `CircleProgress`, `ErrorBoundary`, `Auth`, `AuthCallback`를 중심으로 카드/텍스트/보더/트랙이 다크/라이트 모두 일관되게 보이도록 보정
- `index.css`에 `ok-app-section`, `ok-app-card`, `ok-app-muted-card`, `ok-app-pill`, `ok-app-divider`, `ok-app-track`, `ok-app-secondary-button` 등 공통 app-surface 유틸리티를 추가
- `AuthCallback`의 전체 흰 화면 spinner를 제거하고 앱 테마를 따르는 callback shell로 교체

### 랜딩 Hero 한국어 헤드라인 줄바꿈 조정
- `HeroStage` 한국어 타이틀을 `블록체인, 처음부터 안전하게`에서 `블록체인` / `처음부터 안전하게` 2줄 구조로 변경
- 한국어 버전에서만 comma를 제거하고, 영문 hero 카피와 3D hero 구조는 그대로 유지

### 랜딩 8주 로드맵 sticky-scroll 재구성
- `Curriculum.jsx`를 카드 8개 그리드에서 `sticky focus + 8주 스크롤 시퀀스` 구조로 전면 교체
- 좌측 sticky 패널에서 현재 주차의 제목, 오픈 규칙, 핵심 아티클, article/action/test 요약을 집중해서 읽도록 재구성
- 우측에는 `Week 1-4 기본 트랙 / Week 5-8 확장 트랙`을 한 줄 흐름으로 읽는 vertical roadmap을 배치
- 각 주차에 `이번 주 핵심 아티클`, `오픈 규칙`, `다음 주 개방 조건`을 넣어 8주 unlock 흐름을 랜딩에서 바로 이해할 수 있게 정리
- 모바일에서는 같은 데이터를 sticky 없이 순차형 open layout으로 유지하도록 정리

### Aceternity 컴포넌트 적합성 조사 정리
- `Aceternity UI` 컴포넌트들을 온체인코리아 랜딩/유저/관리자 구조에 맞춰 `채택 / 조건부 채택 / 배제` 기준으로 정리
- 현재 제품 제약상 `hero spectacle`보다 `정보 구조`와 `운영 인터랙션`에 쓰는 것이 맞다고 판단
- 최우선 후보를 `Sticky Scroll Reveal / Tabs / Sidebar / Stateful Button / Animated Modal`로 고정
- `Apple Cards Carousel / Timeline / Compare / Sticky Banner`는 조건부 채택 대상으로 분리
- 결과 문서를 `docs/design/aceternity-component-fit-2026-04-15.md`로 추가

### 관리자/앱 공통 테마 토글 및 라이트 기본 정렬
- `ThemeProvider`, `useTheme`, `ThemeToggle`를 추가해 앱 셸 기준 라이트/다크 토글을 전역 상태로 관리하도록 정리
- 관리자 진입 페이지와 관리자 콘솔에서 더 이상 검은 배경을 강제하지 않고 공통 앱 토큰(`--app-*`)을 따르도록 수정
- 관리자 콘솔의 주요 카드/보더/텍스트를 테마 변수 기반으로 치환해 라이트 모드가 기본으로 보이고 다크 모드에서도 같은 정보 구조가 유지되도록 조정
- 학습자 레이아웃, 사이드바, 로그인, 로그아웃 완료 화면도 동일 토큰과 토글을 공유하도록 정리
- 브랜드 가이드 문서의 theme split를 현재 구현 기준(랜딩 고정 + 학습/관리자 런타임 토글)으로 갱신

### 관리자 인포그래픽 2차 확장
- 관리자 콘솔에 `운영 히트맵`, `개입 분포 스트립`, `운영 규격 매트릭스`, `난도 스펙트럼`을 추가
- `운영 개요` 탭의 하단 보조 패널은 단순 주차 분포 막대 대신 주차별 경고 밀도와 평균 진행률을 함께 보는 히트맵으로 교체
- `개입 보드` 탭에 우선순위 기준의 단일 분포 스트립을 넣어 전체 운영 큐가 어디에 몰려 있는지 먼저 보도록 정리
- `콘텐츠 검수` 탭에 week × structure/article/action/hidden/test 상태를 한 줄씩 읽는 readiness matrix를 추가
- `학습 분석` 탭의 난도 경고는 카드 나열보다 pass/fail 스펙트럼과 응시 수를 함께 읽는 bar 형태로 재구성

## 2026-04-14

### 관리자 진입 최소화 및 좌측 IA 재분류
- `/ops/onchainkorea-admin`는 장황한 안내 화면을 없애고 `/access` 비밀번호 화면으로 바로 넘기도록 단순화
- `/ops/onchainkorea-admin/access`는 승인 계정 확인 + 비밀번호 입력만 남기는 최소 구조로 정리
- 관리자 콘솔은 더 이상 모든 인포그래픽을 한 화면에 쌓지 않고 좌측 탭 기준으로 `운영 개요 / 개입 보드 / 콘텐츠 검수 / 학습 분석 / 학습자 랭킹`으로 분리
- `운영 개요`에는 상단 KPI, 활동 신선도, 수료 준비도, 학습 퍼널, 병목 주차를 배치
- `개입 보드`에는 개입 그룹, 위험군 큐, 학습자 리스트/상세를 배치
- `콘텐츠 검수`에는 8주 운영 규격, 바로가기, 검수 큐를 배치
- `학습 분석`에는 unlock 전환, 실행 강도, 전환 드릴다운, 난도 경고를 배치

### 관리자 개입 보드 및 드릴다운 확장
- 관리자 콘솔 대시보드에 `운영 개입 보드`를 추가해 `즉시 개입 / 퀴즈 회복군 / 미시작 대기군 / 수료 직전군`을 자동 분류
- 각 개입 그룹 카드를 누르면 하단 학습자 리스트가 해당 그룹 기준으로 즉시 필터되도록 연결
- `콘텐츠 검수 우선순위` 패널을 추가해 운영상 바로 손봐야 하는 주차와 이슈(article quiz 부족, weekly test 부족, planned replace)를 큐 형태로 정리
- `전환 드릴다운` 패널을 추가해 각 주차에서 가장 큰 이탈 구간과 최종 전환률을 바로 확인할 수 있도록 확장
- 관리자 하단 학습자 리스트는 이제 검색/상태/주차 필터 외에 운영 개입 필터까지 함께 적용되도록 정리

## 2026-04-13

### 관리자 진입 화면 및 운영 인포그래픽 확장
- 관리자 입구(`/ops/onchainkorea-admin`)와 잠금 해제(`/access`) 화면을 운영 경로 안내용 구조로 재정리
- 관리자 진입 화면에서 `운영 대시보드 / 학습자 랭킹 / 학습 분석` 3개 콘솔 모듈을 미리 보여주도록 개선
- 관리자 잠금 해제 화면에 현재 계정, 도착 경로, 검증 방식 상태 카드를 추가해 운영자가 현재 세션 상태를 즉시 확인할 수 있도록 정리
- 관리자 콘솔 대시보드에 `활동 신선도`, `수료 준비도`, `주차별 unlock 전환`, `주차별 실행 강도` 인포그래픽 4종 추가
- `주차별 unlock 전환`은 진입 → 아티클 → 실습 → 히든 → 테스트 → 다음 단계/수료 흐름으로 주차별 감소 지점을 바로 보도록 구성
- `주차별 실행 강도`는 각 주차의 아티클/실습/테스트 진행률을 heat-card 형태로 보여 운영 개입 우선순위를 정하기 쉽게 정리

## 2026-04-12

### 관리자 카피 톤 및 좌측 IA 분리
- 관리자 콘솔의 `클릭 없이 운영 흐름을 봐요` 등 학습자형/토스형 표현을 운영자 화면에 맞는 중립 카피로 정리
- 관리자 전용 경로(`/ops/onchainkorea-admin`, `/access`, `/console`)에서는 더 이상 학습자용 좌측 탭을 재사용하지 않도록 구조 분리
- 관리자 콘솔 좌측 탭을 `운영 대시보드 / 학습자 랭킹 / 학습 분석` 중심으로 재구성
- 관리자 콘솔 상단 탭 상태를 URL query(`?view=`)와 동기화해 새로고침 후에도 같은 운영 화면이 유지되도록 정리
- 관리자 관련 경로의 사이드바 하단도 학습 진행률이 아닌 `관리자 세션` 상태 카드로 교체
- 관리자 첫 화면에 `콘텐츠 구성 요약`(8주 주차별 article/action/hidden/test 구조)과 `관리자 바로가기`(학습자 홈, Week 1/5, 히든 토픽, 수료 증명) 추가
- 운영자가 숫자만 보는 화면이 아니라 곧바로 실제 검수 대상 페이지로 이동할 수 있도록 admin dashboard를 보강
- `콘텐츠 구성` 카드를 `운영 규격 + 검수 상태` 카드로 확장해 주차별 `준비 완료 / 검토 필요 / 교체 예정` 상태와 article quiz / weekly test 충족 여부를 함께 표시

### 관리자 입구/잠금 해제 화면 일관화
- `/ops/onchainkorea-admin`, `/ops/onchainkorea-admin/access`를 랜딩/운영 콘솔과 같은 다크 브랜드 톤으로 재구성
- `AdminGateFrame` 공통 레이아웃을 추가해 브랜드 락업, 상태 칩, 운영 원칙/보안 규칙 패널을 동일 패턴으로 통일
- 관리자 전용 로딩 화면도 라이트 스피너가 아니라 다크 앱 셸 톤으로 맞춤
- React Router의 trailing slash 중복 route가 자기 자신으로 `Navigate` 하며 빈 검은 화면을 만들던 문제를 수정
- 오래된 server-rendered admin gate rewrite를 제거해 프로덕션에서도 동일한 SPA 디자인이 그대로 보이도록 정리

### 관리자보드 운영형 인포그래픽 확장
- 온라인 교육 플랫폼 5종(Canvas, Moodle, Thinkific, Teachable, Kajabi) 관리자 대시보드 레퍼런스를 조사해 `admin-dashboard-benchmark-2026-04-12.md`로 정리
- 관리자 첫 화면을 `개별 학습자 클릭 중심`에서 `운영 요약 중심`으로 확장
- 상단 KPI 카드(`전체 학습자 / 최근 7일 활성 / 주의 필요 / 수료`) 추가
- `학습 퍼널`, `병목 주차`, `주차 분포`, `위험군 큐`, `난도 경고` 인포그래픽 추가
- 위험군 큐는 정체/미시작/저득점/반복 실패를 기준으로 우선순위 정렬
- 기존 학습자 리스트와 상세 패널은 유지하되 운영 2차 drill-down 레이어로 위치를 명확히 분리

### QA 산출물 정리
- 로컬 검증 중 생성되는 Playwright 스크린샷, 임시 spec, `test-results/`, `.codex-tmp/` 등을 `.gitignore`로 정리
- 앞으로 실제 코드 변경과 임시 검증 산출물이 작업 트리에서 섞이지 않도록 정리

## 2026-04-06
### 브랜드 락업 간격 보정
- `BrandWordmark`가 패딩이 큰 `symbol-wordmark.png`를 참조하면서 태극 심볼과 `n` 사이 간격이 비정상적으로 벌어지던 문제 수정
- 런타임 락업은 trimmed `symbol-web.png`를 사용하도록 변경
- 심볼과 `nChain` 사이를 광학적으로 tighter 하게 보정해 랜딩/유저/관리자 전반의 브랜드 락업 리듬을 통일
- 태극 심볼을 소폭 위로 올려 `O`처럼 읽히는 광학 정렬로 조정

### docs 폴더 구조 정리
- docs/ 하위를 카테고리별 폴더로 재구성 (strategy, marketing, engineering, design, operations, finance, _archive)

---

## 2026-04-04

### RLS 및 SQL 통합
- profiles 테이블 RLS 무한 재귀 수정 (`is_admin_user()` SECURITY DEFINER 헬퍼 추가)
- 6개 SQL 파일을 단일 `supabase-complete.sql`로 통합

### 관리자 대시보드 간소화
- 운영 우선 확인, 주차 분포, 빠른 이동, 백엔드 상태 섹션 제거
- 테이블을 깔끔한 리스트 레이아웃으로 교체 (이름+뱃지 | 주차 | 진행률 바)
- 관리자 데이터 sessionStorage 캐싱 (5분 TTL, 재진입 즉시 로드)
- 관리자 사이드바에 퀴즈/테스트 이력 추가 (QUIZ/TEST 뱃지 구분)
- 서버 렌더링 관리자 접근 페이지에 브랜드 아이콘 추가
- 관리자 접근 페이지에서 불필요한 정보 사이드바 제거

---

## 2026-04-03

### 관리자 콘솔 및 인증 수정
- 관리자 콘솔 빈 페이지 수정: route를 최상위로 이동 (pathless layout route가 deep path 매칭 실패)
- ProtectedRoute 레이스 컨디션 수정: `adminAccessLoading` 스피너 게이트 추가
- useAuth 타이밍 수정: `adminAccessLoading` 초기값 + effect 리셋 로직
- 카카오 로그인 수정: OnChain Korea REST API 키에 맞는 Client Secret 매칭

### 랜딩 및 UX 카피 개편
- 전체 한국어 UX 카피를 토스 스타일 해요체로 재작성 (7개 파일, 197개 문자열)
- 액션 유도 카피에 부드러운 ~해봐요 톤 적용
- Hero 타이틀 한 줄 병합, 패널 높이 축소
- 랜딩 간소화: HeroPathPreview, WhySection, GreedSignals 3개 섹션 제거
- Curriculum 섹션을 미니멀 2컬럼 그리드로 재작성
- 모든 랜딩 섹션을 일관된 `ok-readable-panel-soft` 컨테이너로 래핑
- GreedSignals 가독성 개선 (줄바꿈, 카드 간격)

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
