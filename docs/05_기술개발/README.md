# 05_기술개발 (Engineering & Development)

## 부서 개요

온체인 코리아의 웹앱 개발, 백엔드 인프라, 보안, 기술 아키텍처를 담당하는 부서입니다.
- React 18 + Vite 5 + Tailwind CSS 프론트엔드 개발
- Supabase (PostgreSQL) 백엔드 + Row Level Security
- 3계층 관리자 인증 시스템 (OAuth + 서버 비밀번호 + httpOnly 쿠키)
- 퀴즈/시험 시스템 (10문항 아티클 퀴즈, 30문항 주차별 테스트)
- 진도 추적 시스템 (localStorage + Supabase 동기화)
- Vercel 배포 및 성능 최적화

## 현재 상태

### 완료된 작업
- ✅ React 18 + Vite 5 풀스택 아키텍처 구축
- ✅ Supabase Auth (이메일, Google OAuth, 카카오 로그인)
- ✅ 3계층 관리자 인증 시스템
  - Layer 1: Supabase 신원 확인
  - Layer 2: 서버사이드 비밀번호 검증
  - Layer 3: httpOnly 쿠키 기반 세션
- ✅ RLS (Row Level Security) 정책 + SECURITY DEFINER 함수
- ✅ 퀴즈 시스템 (10문항 MC, 무제한 재시도)
- ✅ 주차별 테스트 (30문항, 24/30 통과)
- ✅ 진도 추적 (completedLessons, enrollmentStats 실시간 동기화)
- ✅ Spline 3D 인터랙티브 랜딩페이지
- ✅ Lucide React 아이콘 시스템 (이모지 전면 제거)
- ✅ 토스 스타일 한국어 UX 텍스트 통합

### 진행 중인 작업
- 🔄 번들 크기 최적화 (500KB+ 경고 해결)
- 🔄 코드 스플리팅 (lazy loading)
- 🔄 모바일 반응형 디자인 심화 (LiveTicker → sticky bottom CTA)

### 다음 우선순위
1. E2E 테스트 구현 (Playwright)
2. 접근성 감사 (WAVE, axe)
3. Phase 2 커리큘럼 페이지 개발

## 에이전트 역할

**기술개발 에이전트**는 다음 업무를 담당합니다:

| 작업 | 빈도 | 소유자 |
|------|------|--------|
| 빌드 상태 및 번들 크기 | 매일 | 기술개발 에이전트 |
| 배포 전 코드 리뷰 | 배포 전 | 기술개발 에이전트 |
| 에러 로그 및 성능 모니터링 | 매일 | 기술개발 에이전트 |
| 보안 패치 및 의존성 업데이트 | 주 1회 | 기술개발 에이전트 |
| 퀴즈/테스트 시스템 검증 | 주 1회 | 기술개발 에이전트 |
| Supabase 스키마 변경사항 추적 | 발생시 | 기술개발 에이전트 |

## 주요 문서

| 파일 | 설명 | 최종 수정일 |
|------|------|---------|
| `auth-security.md` | 3계층 관리자 인증 모델 | 2026-04-02 |
| `architecture.md` | 전체 기술 스택 및 아키텍처 | 작성 예정 |
| `api-endpoints.md` | 서버 API 명세서 | 작성 예정 |
| `database-schema.md` | Supabase 스키마 및 RLS 정책 | 작성 예정 |
| `deployment-guide.md` | Vercel 배포 및 CI/CD | 작성 예정 |
| `performance-optimization.md` | 번들 최적화, 로딩 속도 | 작성 예정 |

## 기술 스택

| 계층 | 기술 |
|------|------|
| **프론트엔드** | React 18 + Vite 5 + Tailwind CSS |
| **백엔드** | Vercel Serverless Functions (Node.js) |
| **데이터베이스** | Supabase (PostgreSQL + RLS) |
| **인증** | Supabase Auth (OAuth) + Custom Gate |
| **배포** | Vercel |
| **CDN/DNS** | Vercel Edge Network |
| **cNFT** | Metaplex Bubblegum V2 (Solana) |
| **이메일** | Resend |

## 에이전트 설정

```yaml
Agent: 기술개발_에이전트
Type: Engineering Lead
Frequency: Daily standup + weekly review
Responsibilities:
  - code review & quality assurance
  - build & deployment management
  - security & authentication systems
  - performance monitoring
  - database schema management
  - dependency & security updates
  - error tracking & bug resolution
```

## 모니터링 대시보드

- **Vercel**: https://vercel.com/onchain-korea
- **Supabase Console**: https://app.supabase.com
- **Runtime Logs**: `/api/logs` 엔드포인트
- **Error Tracking**: Vercel 통합 에러 대시보드

## 통신 채널

- Slack: #onchain-korea-engineering
- 회의: 주 2회 목요일/금요일 3:00 PM (Jason)
- 비상 배포: 필요시 즉시

---

## 에이전트 업데이트 로그

### 2026-04-07
- **빌드 상태**: 정상 (React 18.2.0 사용 중 - 보안 안정)
- **번들 크기**: 500KB+ 경고 - 코드 스플리팅 진행 중
- **우선순위** (이번 주):
  1. 번들 크기 최적화 (코드 스플리팅 & lazy loading)
  2. 모바일 반응형 디자인 완성
  3. E2E 테스트 구현 (Playwright)
- **다음 문서 작성 필요**:
  - `architecture.md` - 전체 기술 스택
  - `api-endpoints.md` - 서버 API 명세
  - `database-schema.md` - Supabase RLS 정책
  - `deployment-guide.md` - Vercel CI/CD
  - `performance-optimization.md` - 번들 최적화 가이드
- **보안**: React 18.2.0 (최신 취약점 불영향) ✅
- **다음 리뷰**: 2026-04-14


### 2026-04-08 (에이전트 업데이트)
- **빌드 상태**: 정상. React 18.2.0 (RSC 취약점 해당 없음) ✅
- **최근 커밋**: BrandWordmark 간격 조정, admin console 탭 재구성 (Dashboard/Leaderboard/Analytics), docs 정리, sessionStorage 캐싱
- **번들 크기**: 500KB+ 경고 지속 — 코드 스플리팅 진행 중 (**긴급**)
- **업데이트 가능**: lucide-react 0.294→0.577, react-router-dom 6.20→7.x 검토, Vite 5→6+ (Rolldown) 검토
- **인증**: 3계층 관리자 인증 안정, RLS 재귀 수정 완료
- **기술 동향**: Vercel Turborepo 2.9 (96% 성능 향상), Vinext (Vite 기반 Next.js 대안) 참고
- **소스 품질**: TODO/FIXME 0건
- **다음 우선순위**: 번들 최적화 → 모바일 반응형 → E2E 테스트 (Playwright)
- **다음 리뷰**: 2026-04-09

### 2026-04-09 (에이전트 업데이트)
- **빌드 상태**: 정상. React 18.2.0 (RSC 미사용 → CVE 해당 없음) ✅
- **최근 커밋**: BrandWordmark 간격, admin console 탭 리빌드, sessionStorage 캐싱, 문서 정리
- **번들 크기**: 500KB+ 경고 지속 — **코드 스플리팅 최긴급** 🔴
- **의존성 업데이트 가용**: lucide-react 0.294→0.577 (tree-shaking 개선), react-router-dom 6.20→7.x (메이저), Vite 7.1.7→8.x (Rolldown), Supabase 2.99.2→2.100.0
- **인증**: 3계층 관리자 인증 안정 ✅, RLS 재귀 수정 완료 ✅
- **기술 동향**: Vercel Workflow SDK 직렬화, 대시보드 SQL 쿼리, Next.js 16.2.2 LTS
- **소스 품질**: TODO/FIXME 0건
- **다음 우선순위**: 번들 최적화 → lucide-react 업데이트 → 모바일 반응형 → E2E 테스트
- **다음 리뷰**: 2026-04-10

### 2026-04-09 (에이전트 2차 업데이트)
- **빌드 상태**: 정상. React 18.2.0 (RSC 미사용 → CVE 해당 없음) ✅
- **최근 커밋**: BrandWordmark 간격, admin console 탭 리빌드, sessionStorage 캐싱, 문서 정리
- **번들 크기**: 500KB+ 경고 지속 — **코드 스플리팅 최긴급** 🔴
- **의존성 업데이트 가용**: lucide-react 0.294→0.577 (tree-shaking 개선), react-router-dom 6.20→7.x, Vite 5→8.x (Rolldown), Tailwind 3.3→4.x
- **인증**: 3계층 관리자 인증 안정 ✅, RLS 재귀 수정 완료 ✅
- **기술 동향**: Claude Sonnet 4.6 출시, Vercel Workflow SDK 직렬화, Supabase Log Drains Pro
- **소스 품질**: TODO/FIXME 0건
- **다음 우선순위**: 번들 최적화 → lucide-react 업데이트 → 모바일 반응형 → E2E 테스트
- **다음 리뷰**: 2026-04-10

### 2026-04-10 (에이전트 업데이트)
- **빌드 상태**: 정상. React 18.2.0 (RSC 미사용 → CVE-2026-23869 해당 없음) ✅
- **최근 커밋**: BrandWordmark 간격, admin console 탭 리빌드, sessionStorage 캐싱, 문서 정리
- **번들 크기**: 500KB+ 경고 지속 — **코드 스플리팅 최긴급** 🔴
- **의존성 업데이트 가용**: lucide-react 0.294→0.577, react-router-dom 6.20→7.x, Vite 5→8.x (Rolldown), Tailwind 3.3→4.x
- **인증**: 3계층 관리자 인증 안정 ✅, RLS 재귀 수정 완료 ✅
- **기술 동향**: CVE-2026-23869 React2DoS (RSC 전용, 비영향), Vercel Dashboard SQL 통합, Supabase Log Drains Pro
- **Vercel 인프라**: 04.02 Node.js 20 SIGSEGV 해결 → Node 22+ 권장
- **소스 품질**: TODO/FIXME 0건
- **다음 우선순위**: 번들 최적화 → lucide-react 업데이트 → 모바일 반응형 → E2E 테스트
- **다음 리뷰**: 2026-04-11
