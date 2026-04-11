# Documentation Migration Guide — 8부서 에이전트 시스템

> 2026-04-07 | 구 구조 → 신 구조 마이그레이션 완료 요약

---

## 마이그레이션 완료

OnChain Korea 문서 구조가 **카테고리 기반** (strategy/, marketing/, design/ 등) 에서 **부서 기반 에이전트 시스템** (01_경영관리/, 02_영업마케팅/ 등)으로 전환되었습니다.

### 마이그레이션 목표
- ✅ 팀의 실제 조직 구조와 문서 구조 일치
- ✅ 각 부서의 역할과 책임 명확화
- ✅ 주 1회 에이전트 동기화를 통한 자동화된 협력
- ✅ 의사결정, 변경, 진도 추적의 표준화

---

## 구조 비교

### 이전 구조 (카테고리 기반)
```
docs/
├── strategy/
│   ├── roadmap.md
│   ├── curriculum-mapping.md
│   ├── decisions.md
│   └── greed-academy-research-2026-04-02.md
├── marketing/
│   ├── conversion-strategy.md
│   └── content-audit.md
├── engineering/
│   └── auth-security.md
├── design/
│   ├── brand-guidelines.md
│   ├── landing-design-invariants.md
│   ├── interactive-landing-research-2026-04-02.md
│   └── internal-app-design-research-2026-04-01.md
├── operations/
│   └── changelog.md
├── finance/
│   ├── invoice-recalculation-2026-03-31.ko.md
│   └── invoice-recalculation-2026-03-31.en.md
└── _archive/
    ├── admin-console-handoff-2026-04-03.md
    └── feedback-bojana.md
```

### 신 구조 (부서 에이전트 기반)
```
docs/
├── 01_경영관리/
│   ├── README.md ⭐ [부서 개요 및 에이전트 설정]
│   ├── roadmap.md
│   ├── curriculum-mapping.md
│   └── decisions.md
├── 02_영업마케팅/
│   ├── README.md ⭐ [부서 개요 및 에이전트 설정]
│   ├── conversion-strategy.md
│   ├── content-audit.md
│   └── greed-academy-research-2026-04-02.md
├── 03_재무회계/
│   ├── README.md ⭐
│   └── invoice-recalculation-2026-03-31.ko.md
├── 04_인사총무/
│   └── README.md ⭐
├── 05_기술개발/
│   ├── README.md ⭐
│   └── auth-security.md
├── 06_운영생산/
│   ├── README.md ⭐
│   └── changelog.md
├── 07_법무컴플라이언스/
│   └── README.md ⭐
├── 08_기타/
│   ├── README.md ⭐
│   ├── brand-guidelines.md
│   ├── landing-design-invariants.md
│   ├── interactive-landing-research-2026-04-02.md
│   └── internal-app-design-research-2026-04-01.md
├── agents/
│   └── AGENT_CONFIG.md ⭐ [전사 에이전트 운영 가이드]
├── README.md ⭐ [마스터 인덱스]
├── _archive/ [구 폴더는 여전히 유지]
│   ├── strategy/
│   ├── marketing/
│   ├── engineering/
│   ├── design/
│   ├── operations/
│   └── finance/
└── MIGRATION_GUIDE.md [이 문서]
```

---

## 파일 이동 매핑

### 01_경영관리 (경영관리 부서 담당: MinGoo)
| 구 위치 | 신 위치 | 파일명 |
|--------|--------|--------|
| strategy/ | 01_경영관리/ | roadmap.md |
| strategy/ | 01_경영관리/ | curriculum-mapping.md |
| strategy/ | 01_경영관리/ | decisions.md |
| (신규) | 01_경영관리/ | README.md |

### 02_영업마케팅 (마케팅 담당: Jason)
| 구 위치 | 신 위치 | 파일명 |
|--------|--------|--------|
| marketing/ | 02_영업마케팅/ | conversion-strategy.md |
| marketing/ | 02_영업마케팅/ | content-audit.md |
| strategy/ | 02_영업마케팅/ | greed-academy-research-2026-04-02.md |
| (신규) | 02_영업마케팅/ | README.md |

### 03_재무회계 (재무 담당: MinGoo)
| 구 위치 | 신 위치 | 파일명 |
|--------|--------|--------|
| finance/ | 03_재무회계/ | invoice-recalculation-2026-03-31.ko.md |
| (신규) | 03_재무회계/ | README.md |

### 04_인사총무 (인사 담당: MinGoo/Jason)
| 구 위치 | 신 위치 | 파일명 |
|--------|--------|--------|
| (신규) | 04_인사총무/ | README.md |

### 05_기술개발 (기술 담당: Jason)
| 구 위치 | 신 위치 | 파일명 |
|--------|--------|--------|
| engineering/ | 05_기술개발/ | auth-security.md |
| (신규) | 05_기술개발/ | README.md |

### 06_운영생산 (운영 담당: 전담팀)
| 구 위치 | 신 위치 | 파일명 |
|--------|--------|--------|
| operations/ | 06_운영생산/ | changelog.md |
| (신규) | 06_운영생산/ | README.md |

### 07_법무컴플라이언스 (법무 담당: 외부 파트너)
| 구 위치 | 신 위치 | 파일명 |
|--------|--------|--------|
| (신규) | 07_법무컴플라이언스/ | README.md |

### 08_기타 (디자인 담당: 협력사)
| 구 위치 | 신 위치 | 파일명 |
|--------|--------|--------|
| design/ | 08_기타/ | brand-guidelines.md |
| design/ | 08_기타/ | landing-design-invariants.md |
| design/ | 08_기타/ | interactive-landing-research-2026-04-02.md |
| design/ | 08_기타/ | internal-app-design-research-2026-04-01.md |
| (신규) | 08_기타/ | README.md |

---

## 신규 추가 문서

### 1. 부서별 README.md
각 부서에 **README.md** 파일이 추가되었습니다. 이는 에이전트 설정 문서입니다.

**내용**:
- 부서 개요
- 현재 상태 (완료, 진행, 다음 우선순위)
- 에이전트 역할 (책임 및 빈도)
- 주요 문서 목록
- KPI 및 성공 지표
- 에이전트 설정 (YAML 형식)
- 통신 채널

**예시**: [01_경영관리/README.md](./01_경영관리/README.md)

### 2. agents/AGENT_CONFIG.md
**전사 에이전트 운영 가이드 문서**

**내용**:
- 8개 부서 에이전트 개요
- 각 에이전트 상세 역할
- 동기화 일정 (일일, 주 1회, 월 1회, 분기 1회)
- 의사결정 권한 (누가 무엇을 결정하는가)
- 에스컬레이션 규칙 (긴급 상황 대응)
- 문서 관리 규칙
- 성공 지표 (KPI)

**링크**: [agents/AGENT_CONFIG.md](./agents/AGENT_CONFIG.md)

### 3. 마스터 README.md (업데이트)
**문서 인덱스 및 프로젝트 개요**

**이전**: 카테고리별 파일 나열
**현재**:
- 8부서 구조 설명
- 부서별 README 링크
- 에이전트 운영 가이드 링크
- 정기 회의 일정
- Slack 채널 정보
- Phase 진행 상황

**링크**: [README.md](./README.md)

---

## 마이그레이션 완료 체크리스트

### 문서 복사 및 정리
- [x] 01_경영관리/ 폴더 생성 및 전략 문서 이동
- [x] 02_영업마케팅/ 폴더 생성 및 마케팅 문서 이동
- [x] 03_재무회계/ 폴더 생성 및 재무 문서 이동
- [x] 04_인사총무/ 폴더 생성 (신규)
- [x] 05_기술개발/ 폴더 생성 및 엔지니어링 문서 이동
- [x] 06_운영생산/ 폴더 생성 및 운영 문서 이동
- [x] 07_법무컴플라이언스/ 폴더 생성 (신규)
- [x] 08_기타/ 폴더 생성 및 디자인 문서 이동
- [x] agents/ 폴더 생성 및 AGENT_CONFIG.md 작성

### README 문서 작성
- [x] 01_경영관리/README.md
- [x] 02_영업마케팅/README.md
- [x] 03_재무회계/README.md
- [x] 04_인사총무/README.md
- [x] 05_기술개발/README.md
- [x] 06_운영생산/README.md
- [x] 07_법무컴플라이언스/README.md
- [x] 08_기타/README.md

### 전사 가이드
- [x] agents/AGENT_CONFIG.md (전사 에이전트 운영 가이드)
- [x] README.md (마스터 인덱스, 신 구조 설명)
- [x] MIGRATION_GUIDE.md (이 문서)

### 이전 폴더 관리
- [x] 이전 폴더(strategy, marketing, etc.) 유지 (_archive 유지, 삭제 X)
- [ ] 3개월 후 완전 이전 시 _archive/ 안으로 이동 (선택 사항)

---

## 사용 가이드

### 1단계: 부서 README 읽기
자신의 부서 README를 먼저 읽으세요.

**예시**:
- 마케팅 담당자 → [02_영업마케팅/README.md](./02_영업마케팅/README.md)
- 개발자 → [05_기술개발/README.md](./05_기술개발/README.md)

### 2단계: 에이전트 설정 숙독
전사 에이전트 시스템을 이해하기 위해 이 문서를 읽으세요.

**링크**: [agents/AGENT_CONFIG.md](./agents/AGENT_CONFIG.md)

**주요 내용**:
- 내 부서 에이전트의 역할
- 정기 회의 일정
- 의사결정 권한
- Slack 채널

### 3단계: 부서 문서 확인
각 부서별로 필요한 문서를 확인하세요.

**예시** (마케팅):
- conversion-strategy.md — 전환율 전략
- content-audit.md — 팩트체크
- greed-academy-research-2026-04-02.md — GA 벤치마크

### 4단계: 동기화 참석
정기 회의(주 1회)에 참석하고 부서별 현황을 공유하세요.

| 회의 | 일시 | 참석자 |
|------|------|--------|
| 경영관리 + 인사총무 | 주 월요일 9:30 AM | MinGoo, Jason |
| 영업마케팅 | 주 수요일 2:00 PM | Jason |
| 기술개발 | 주 목요일/금요일 3:00 PM | Jason |
| 운영생산 | 주 금요일 3:00 PM | 운영팀 |

---

## 문서 관리 원칙

### 원칙 1: 모든 결정은 기록된다
```
📁 docs/01_경영관리/decisions.md
```
- 새로운 결정이 발생하면 즉시 기록
- 주 1회 월요일 스탠드업에서 검토

### 원칙 2: 모든 변경은 기록된다
```
📁 docs/06_운영생산/changelog.md
```
- 매일 자동 업데이트
- 기술, 콘텐츠, 운영 모든 변경 포함

### 원칙 3: 모든 문서는 버전 관리된다
- 파일 상단에 "Last Updated: YYYY-MM-DD" 명시
- Git commit 기록
- Breaking change는 changelog에 즉시 기록

---

## Slack 채널 전환

### 이전 채널 (선택 사항)
```
#onchain-korea-general (전체)
#onchain-korea-roadmap (전략)
```

### 신규 채널 (현재 운영)
```
#onchain-korea-management (01_경영관리)
#onchain-korea-marketing (02_영업마케팅)
#onchain-korea-finance (03_재무회계)
#onchain-korea-ops (04_인사총무 + 전사)
#onchain-korea-engineering (05_기술개발)
#onchain-korea-operations (06_운영생산)
#onchain-korea-legal (07_법무컴플라이언스)
#onchain-korea-design (08_기타)
#onchain-korea-emergency (긴급 - 모든 부서)
```

**확인**: 자신의 부서 채널에 가입했는지 확인하세요.

---

## FAQ

### Q: 이전 폴더(strategy/, marketing/ 등)는 삭제되나요?
A: 아니요. 현재 유지되고 있습니다. 3개월 후 완전 이전 시 _archive/ 안으로 이동할 예정입니다.

### Q: 내 부서가 어디에 있나요?
A: 부서 번호(01~08)를 확인하고 해당 폴더의 README.md를 읽으세요.

### Q: 새로운 문서를 어디에 추가하나요?
A: 각 부서 폴더(예: 02_영업마케팅/) 안에 추가하세요. 부서 에이전트가 관리합니다.

### Q: 긴급 상황이 발생하면?
A: #onchain-korea-emergency 채널에 공지하고, 담당자에게 직접 연락하세요 (30분 내 응답 기준).

### Q: 에이전트는 무엇인가요?
A: 각 부서를 담당하는 자동화된 협력자입니다. 전담 담당자와 함께 업무를 관리하며, 주 1회 동기화를 통해 진도를 추적합니다. 상세 정보는 [agents/AGENT_CONFIG.md](./agents/AGENT_CONFIG.md)를 참조하세요.

---

## 다음 단계

### 즉시 (이번 주)
- [ ] 각 부서 담당자가 자신의 부서 README 읽음
- [ ] 첫 주 정기 회의 참석 (월요일 9:30 AM)
- [ ] Slack 부서 채널 가입

### 단기 (4월 중)
- [ ] 부서별 주요 문서 업데이트
- [ ] 아직 작성되지 않은 문서 작성 (각 부서별 계획)
- [ ] Phase 1 마일스톤 추적 시작

### 중기 (5월~6월)
- [ ] Phase 1 본 과정 런칭 (5월)
- [ ] Phase 2 커리큘럼 콘텐츠 작성 (6월~8월)
- [ ] 월별 성과 보고 및 OKR 검토

---

## 연락처

- **전사 문의**: #onchain-korea-management
- **마이그레이션 문의**: MinGoo (@mingoo)
- **기술 문제**: Jason (@jason)
- **긴급**: #onchain-korea-emergency

---

## 문서 개정 이력

| 날짜 | 변경 | 담당자 |
|------|------|--------|
| 2026-04-07 | 8부서 에이전트 시스템 마이그레이션 완료 | 경영관리 |
| - | - | - |

**다음 검토**: 2026-05-07 (1개월 후, Phase 1 운영 중)

---

*OnChain Korea Documentation System — 8부서 에이전트 기반 운영*
