# OnChain Korea — 8부서 에이전트 시스템 문서

> 한국 블록체인 교육 플랫폼 (GREED Academy)
> 최종 정리: 2026-04-07

---

## 프로젝트 개요

**OnChain Korea** = 블록체인 입문자를 위한 무료 한국어 교육 플랫폼

- **제품**: GREED Academy — 8주 블록체인 기초 커리큘럼
- **대상**: 한국 20~35세 암호화폐 초보자 (Upbit/Bithumb 사용 경험자)
- **목표**: 500+ 학습자 모집, 40%+ 완료율
- **현재 단계**: Phase 1 (4주→8주 확장) + Phase 2 준비 (DeFi)
- **런칭**: 2026년 5월

---

## 조직 구조 — 8부서 에이전트 시스템

모든 작업은 **8개 부서**로 조직되어 있습니다. 각 부서는 전담 에이전트가 관리하며, 주 1회 동기화를 통해 협력합니다.

### 부서 리스트

| # | 부서 | 담당자 | 핵심 책임 | README |
|---|------|--------|---------|--------|
| **01** | 경영관리 | MinGoo | 전략, 의사결정, 로드맵 | [01_경영관리/README.md](./01_경영관리/README.md) |
| **02** | 영업마케팅 | Jason | 전환율 최적화, 콘텐츠 마케팅 | [02_영업마케팅/README.md](./02_영업마케팅/README.md) |
| **03** | 재무회계 | MinGoo | 예산 관리, 비용 추적 | [03_재무회계/README.md](./03_재무회계/README.md) |
| **04** | 인사총무 | MinGoo/Jason | 팀 조정, 협력사 관리 | [04_인사총무/README.md](./04_인사총무/README.md) |
| **05** | 기술개발 | Jason | 웹앱 개발, 백엔드, 보안 | [05_기술개발/README.md](./05_기술개발/README.md) |
| **06** | 운영생산 | 전담팀 | 수강생 지원, 커뮤니티, Changelog | [06_운영생산/README.md](./06_운영생산/README.md) |
| **07** | 법무컴플라이언스 | 외부 파트너 | 규제 준수, 계약 관리 | [07_법무컴플라이언스/README.md](./07_법무컴플라이언스/README.md) |
| **08** | 기타 (디자인) | 협력사 | 브랜드, 시각 정체성, 리서치 | [08_기타/README.md](./08_기타/README.md) |

---

## 부서별 주요 문서

### 01_경영관리
- `roadmap.md` — Phase 1/2/3 로드맵 + 완료 항목
- `curriculum-mapping.md` — GA 29개 소스 → 8주 커리큘럼 매핑
- `decisions.md` — 12가지 전략적 의사결정 기록

### 02_영업마케팅
- `conversion-strategy.md` — Cialdini 심리학 + CTA 최적화 (앵커링, 희소성, 사회적 증거 등)
- `content-audit.md` — 35개 팩트체크 (월 1회 갱신)
- `greed-academy-research-2026-04-02.md` — GA 공개 데이터 리서치

### 03_재무회계
- `invoice-recalculation-2026-03-31.ko.md` — cNFT 민팅 비용 + 담당인력 비용

### 04_인사총무
- (주요 문서 작성 중)

### 05_기술개발
- `auth-security.md` — 3계층 관리자 인증 (Supabase + 서버 비밀번호 + httpOnly 쿠키)

### 06_운영생산
- `changelog.md` — 모든 변경 이력 (역순, 매일 업데이트)

### 07_법무컴플라이언스
- (주요 문서 작성 중 — 한국 규제 동향)

### 08_기타
- `brand-guidelines.md` — 색상, 테마, 브랜드 규칙
- `landing-design-invariants.md` — 랜딩 3D 히어로 설계 제약조건
- `interactive-landing-research-2026-04-02.md` — Apple/Stripe/Linear 벤치마크
- `internal-app-design-research-2026-04-01.md` — Toss/Duolingo 벤치마크

---

## 에이전트 운영 가이드

### 에이전트란?
각 부서를 담당하는 **자동화된 협력자**입니다. 전담 담당자와 함께 업무를 관리합니다.

- **주 1회 동기화**: 각 부서별 정기 회의 (상세는 [agents/AGENT_CONFIG.md](./agents/AGENT_CONFIG.md) 참조)
- **실시간 Slack**: 부서별 채널에서 일일 모니터링
- **모든 결정 기록**: decisions.md, changelog.md에 자동 기록

### 구체적인 역할 배치

**경영관리 에이전트 (MinGoo)**
- 주간 마일스톤 진도 40% 확인
- Phase 2 커리큘럼 체크리스트 관리
- 의사결정 기록 (decisions.md)
- 월별 재무 보고서 검토
- 파트너십 협의 추적

**영업마케팅 에이전트 (Jason)**
- 주간 수강생 등록 현황 (enrollment_stats)
- SNS 캠페인 실행 및 분석 (주 2회)
- 팩트체크 월 1회 갱신
- 랜딩페이지 A/B 테스트
- 커뮤니티 피드백 수집

**기술개발 에이전트 (Jason)**
- 매일 빌드 상태 및 번들 크기 모니터링
- 배포 전 코드 리뷰
- Supabase 스키마 변경 추적
- 보안 패치 주 1회 확인
- 에러 로그 분석

**운영생산 에이전트 (전담팀)**
- 매일 enrollment 현황 확인
- 진도 부진 학습자 주 2회 독려 (KakaoTalk)
- Changelog 매일 업데이트
- 주간 진도율 리포트
- Proof of Attendance 민팅 확인

---

## 핵심 지표 (KPI)

### 영업마케팅
- 랜딩페이지 → 수강 신청: **전환율 8~12%**
- 수강 신청 → 개강: **등록 완료율 95%**
- 개강 → 완료: **완료율 40%+**
- SNS 팔로워: **월 20% 성장**
- 팩트체크: **100% 신뢰도 (오류 0건)**

### 기술개발
- 번들 크기: **500KB 이하** (또는 설명 가능)
- 에러율: **0.1% 이하**
- 배포 성공률: **99.9%**
- 보안 취약점: **0건**

### 운영생산
- 총 등록: **500+ (6개월)**
- 주차별 완료율: **60%+**
- 최종 완료율: **40%+ (200+ 명)**
- 커뮤니티 활동: **주 100+ 메시지**
- 고객 만족도: **4.5/5.0 이상**

---

## 문서 관리 규칙

### 1. 모든 결정은 기록된다
```
📁 docs/01_경영관리/decisions.md
```
- 날짜, 의사결정 내용, 근거, 담당자 기록
- 주 1회 월요일 스탠드업에서 검토

### 2. 모든 변경은 기록된다
```
📁 docs/06_운영생산/changelog.md
```
- 매일 자동 업데이트
- 기술, 콘텐츠, 운영 모든 변경 포함

### 3. 모든 문서는 버전 관리된다
- 파일 상단에 "Last Updated: YYYY-MM-DD" 명시
- Git commit 기록
- Breaking change는 changelog에 즉시 기록

---

## 정기 회의 일정

| 일시 | 부서 | 주제 | 참석자 |
|------|------|------|--------|
| **주 월요일 9:30 AM** | 경영관리 + 인사총무 | 주간 마일스톤, 스탠드업 | MinGoo, Jason |
| **주 수요일 1:00 PM** | 기타(디자인) | 디자인 리뷰 | 디자인 담당자 |
| **주 수요일 2:00 PM** | 영업마케팅 | 수강생 모집, SNS 분석 | Jason |
| **주 목요일/금요일 3:00 PM** | 기술개발 | 코드 리뷰, 배포 | Jason |
| **주 금요일 3:00 PM** | 운영생산 | 진도율, 커뮤니티 | 운영팀 |
| **월 첫째 주 금요일 4:00 PM** | 재무회계 | 예산 현황 | MinGoo |
| **월 첫째 주 목요일 2:00 PM** | 법무컴플라이언스 | 규제 동향 | 외부 법무 |

---

## Slack 채널 (커뮤니케이션)

| 채널 | 부서 | 용도 |
|------|------|------|
| #onchain-korea-management | 경영관리 | 전략, 의사결정 |
| #onchain-korea-marketing | 영업마케팅 | SNS, 모집, 팩트체크 |
| #onchain-korea-finance | 재무회계 | 예산, 비용 |
| #onchain-korea-ops | 인사총무 | 팀 조정, 파트너십 |
| #onchain-korea-engineering | 기술개발 | 배포, 버그, 기술 |
| #onchain-korea-operations | 운영생산 | 커뮤니티, 진도, Changelog |
| #onchain-korea-legal | 법무컴플라이언스 | 규제, 계약 |
| #onchain-korea-design | 기타(디자인) | 디자인, UX |
| **#onchain-korea-emergency** | **전사** | **긴급 상황 (30분 내 응답)** |

---

## 에이전트 상세 설정

**전체 에이전트 설정은 여기 참조:**
👉 [agents/AGENT_CONFIG.md](./agents/AGENT_CONFIG.md)

주요 내용:
- 8개 부서 에이전트 상세 역할 정의
- 동기화 일정 (일일, 주 1회, 월 1회, 분기 1회)
- 의사결정 권한 (누가 무엇을 결정하는가)
- 에스컬레이션 규칙 (긴급 상황 대응)
- 성공 지표

---

## Phase 진행 상황

### Phase 1: 웹3 기초 (진행 중)
- ✅ 4주 커리큘럼 → **8주 확장**
- ✅ 20개 레슨 한국어 콘텐츠
- ✅ 4개 Hidden Topic 에디토리얼
- ✅ 퀴즈 시스템 (10문항 MC, 무제한 재시도)
- ✅ Weekly Test (30문항, 24/30 통과)
- ✅ 3계층 관리자 인증
- ✅ Spline 3D 인터랙티브 랜딩
- 🔄 **5월 본 과정 런칭 예정** (500+ 모집)

### Phase 2: DeFi 심화 (준비 중)
- 🔄 6월~8월: 24개 새로운 레슨 작성
  - W1 금융 기초 (TradFi/DeFi 브릿지)
  - W2~3 스테이블코인 (yield farming, depegging)
  - W4 DeFi 렌딩 (LTV, liquidation)
  - W5 유동성 공급 (AMM, impermanent loss)
  - W6 Yield Farming (APR vs APY)
  - W7 Liquid Staking & Restaking
  - W8 RWA/STO (한국 STO 규제)
- 16개 Action Lab + 8개 Hidden Topic
- ~200개 퀴즈 문항 + 중간/기말 고사
- 9월 런칭 예정

### Phase 3: 투자/거래 (계획 단계)
- [ ] 한국 거래소 파트너 (PropW, Bithumb)
- [ ] 실제 거래 시뮬레이터
- [ ] 포트폴리오 관리 기초

---

## 빠른 링크

| 문서 | 링크 |
|------|------|
| **에이전트 설정** | [agents/AGENT_CONFIG.md](./agents/AGENT_CONFIG.md) |
| **로드맵** | [01_경영관리/roadmap.md](./01_경영관리/roadmap.md) |
| **의사결정** | [01_경영관리/decisions.md](./01_경영관리/decisions.md) |
| **커리큘럼 매핑** | [01_경영관리/curriculum-mapping.md](./01_경영관리/curriculum-mapping.md) |
| **전환율 전략** | [02_영업마케팅/conversion-strategy.md](./02_영업마케팅/conversion-strategy.md) |
| **팩트체크** | [02_영업마케팅/content-audit.md](./02_영업마케팅/content-audit.md) |
| **인증 보안** | [05_기술개발/auth-security.md](./05_기술개발/auth-security.md) |
| **변경 이력** | [06_운영생산/changelog.md](./06_운영생산/changelog.md) |
| **브랜드** | [08_기타/brand-guidelines.md](./08_기타/brand-guidelines.md) |

---

## 기술 스택

| 계층 | 기술 |
|------|------|
| **프론트엔드** | React 18 + Vite 5 + Tailwind CSS |
| **백엔드** | Vercel Serverless Functions (Node.js) |
| **데이터베이스** | Supabase (PostgreSQL + RLS) |
| **인증** | Supabase Auth (OAuth) + Custom Admin Gate |
| **배포** | Vercel |
| **3D** | Spline |
| **아이콘** | Lucide React |
| **cNFT** | Metaplex Bubblegum V2 (Solana) |

---

## 프로젝트 특징

### 핵심 강점
1. **한국 시장 최적화**
   - 한국 거래소(Upbit/Bithumb) 출발점
   - 토스 스타일 UX 카피 ("해요체")
   - 한국 특화 콘텐츠 (규제, 세금, 사기 사례)

2. **신뢰 기반 교육**
   - 가짜 데이터 전면 제거
   - 35개 클레임 팩트체크 (월 1회 갱신)
   - 모든 출처 공개 (GA 29개 소스 + 원문 링크)

3. **심리학 기반 마케팅**
   - Cialdini 원칙 적용 (앵커링, 희소성, 권위)
   - 인터랙티브 Proof of Attendance 미리보기
   - 가격 앵커링 (50~200만원 대비 무료)

4. **보안 우선**
   - 3계층 관리자 인증 (Supabase + 서버 + httpOnly)
   - Row Level Security (RLS) 정책
   - 모든 학습 데이터 개인키로 암호화

---

## 연락처

- **전사 긴급**: #onchain-korea-emergency (Slack)
- **경영 문의**: MinGoo (@mingoo)
- **기술 문의**: Jason (@jason)
- **운영 문의**: 운영팀

---

## 문서 개정 이력

| 날짜 | 변경 | 담당자 |
|------|------|--------|
| 2026-04-07 | 8부서 에이전트 시스템 초기화 | 경영관리 |
| - | - | - |

**다음 검토**: 2026-05-07 (1개월 후)

---

*OnChain Korea — 한국을 Web3로*
