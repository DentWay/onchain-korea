# 08_기타 (Design & Research)

## 부서 개요

온체인 코리아의 브랜드 디자인, 시각 정체성, 리서치 및 벤치마킹을 담당하는 부서입니다.
- 브랜드 가이드라인 관리 (색상, 테마, 에셋)
- 랜딩페이지 디자인 (Spline 3D 인터랙션)
- 앱 UI/UX (Toss/Duolingo 참고)
- 디자인 시스템 (Lucide 아이콘)
- 벤치마킹 및 리서치

## 현재 상태

### 완료된 작업
- ✅ 브랜드 가이드라인 (색상: #CD313A 적색, #0047A0 청색)
- ✅ 랜딩페이지 3D 인터랙티브 디자인 (Spline)
- ✅ 랜딩페이지 히어로 디자인 불변 규칙 정의
- ✅ Lucide React 아이콘 시스템 (이모지 제거)
- ✅ 다크 모드 UI (학습 앱)
- ✅ 라이트 모드 UI (랜딩페이지)
- ✅ 한국어 UX 카피 토스 스타일 적용 (해요체)
- ✅ 인터랙티브 Proof of Attendance 미리보기
- ✅ 모바일 대응 디자인 (기초)

### 진행 중인 작업
- 🔄 모바일 최적화 심화 (sticky bottom CTA, LiveTicker 모바일 대응)
- 🔄 접근성 감사 (WAVE, axe 도구)
- 🔄 Phase 2 DeFi 레슨 UI 디자인

### 다음 우선순위
1. Phase 2 커리큘럼 페이지 디자인 (금융 기초, 스테이블코인)
2. 모바일 UX 최적화 완성
3. 브랜드 에셋 라이브러리 확대

## 에이전트 역할

**기타(디자인) 에이전트**는 다음 업무를 담당합니다:

| 작업 | 빈도 | 소유자 |
|------|------|--------|
| 디자인 시스템 업데이트 | 월 1회 | 기타(디자인) 에이전트 |
| 새 아이콘 생성/추가 | 필요시 | 기타(디자인) 에이전트 |
| 모바일 UX 검증 | 주 1회 | 기타(디자인) 에이전트 |
| 접근성 감사 | 월 1회 | 기타(디자인) 에이전트 |
| 브랜드 가이드 준수 확인 | 월 1회 | 기타(디자인) 에이전트 |
| 벤치마크 리서치 | 분기 1회 | 기타(디자인) 에이전트 |

## 주요 문서

| 파일 | 설명 | 최종 수정일 |
|------|------|---------|
| `brand-guidelines.md` | 브랜드 규칙 (색상, 에셋, 로고) | 2026-04-02 |
| `landing-design-invariants.md` | 랜딩 3D 히어로 설계 제약조건 | 2026-04-02 |
| `interactive-landing-research.md` | 인터랙티브 랜딩 리서치 (Apple/Stripe/Linear) | 2026-04-02 |
| `internal-app-design-research.md` | 앱 UI/UX 리서치 (Toss/Duolingo) | 2026-04-01 |
| `design-system.md` | 컴포넌트, 아이콘, 색상 시스템 | 작성 예정 |
| `mobile-ux-guidelines.md` | 모바일 대응 설계 규칙 | 작성 예정 |

## 디자인 원칙

### 1. 시각 정체성
- **색상 팔레트**: Red (#CD313A), Blue (#0047A0), Dark (#0C0D11)
- **테마 분리**: Landing (light) vs App (dark)
- **기호**: 네트워크 노드, 체인 링크, 큐브 레퍼런스

### 2. 사용자 경험 (UX)
- **카피 톤**: 토스 스타일 해요체 ("무료로 시작해요" O, "시작하십시오" X)
- **물리적 동사**: "만들기", "시작하기", "받기" (추상적 동사 X)
- **밀도**: Landing은 명백한 여백, App은 정보 밀도 높음

### 3. 인터랙션
- **Spline 3D**: 랜딩 히어로 (건드릴 수 있는 느낌)
- **마이크로인터랙션**: Lucide 아이콘 + 색상 변화
- **모션**: 부드러운 트랜지션 (150~300ms)

### 4. 접근성
- **명암**: WCAG AA 이상
- **텍스트 크기**: 16px 이상 (모바일)
- **인터랙션**: 터치 타겟 44px 이상

## 벤치마크 인사이트

### Landing 레퍼런스
- **Apple**: 간결한 타이포그래피, 여백의 미
- **Stripe**: 기울어진 이미지, 우측 정렬 CTA
- **Linear**: 앱과의 연결성, 다이나믹한 헤더

### App 레퍼런스
- **Toss**: 한국 서비스 UX, 밝은 색상 대비
- **Duolingo**: 게이미피케이션 (진도 바, 뱃지), 친근한 톤
- **Notion**: 다크 모드, 복잡한 정보 정리

## 에이전트 설정

```yaml
Agent: 기타_디자인_에이전트
Type: Design & UX Lead
Frequency: Weekly design review
Responsibilities:
  - brand consistency & guidelines
  - visual design & component system
  - landing page & app UI/UX
  - mobile responsiveness & accessibility
  - design research & benchmarking
  - icon & asset library management
  - user testing & feedback integration
```

## 리서치 로그

시장·규제·경쟁 동향을 날짜별로 기록합니다.
- `research-log.md` — 주간 심층 분석 결과 (2026-04-09~)

---

## 디자인 자산 위치

- **심볼 소스**: `public/brand/symbol-source.png`
- **런타임 심볼**: `public/brand/symbol-web.png`
- **소셜 이미지**: `public/brand/og-card.svg`
- **앱 아이콘**: `public/brand/` (PNG)
- **React 컴포넌트**: `src/components/brand/`

## 통신 채널

- Slack: #onchain-korea-design
- 회의: 주 1회 수요일 1:00 PM (디자인 리뷰)
- 피그마: https://figma.com/onchain-korea (공유 링크)
