# OnChain Korea Phase 2: DeFi 완전 정복 커리큘럼

**버전**: 1.0  
**작성일**: 2026-04-18  
**상태**: 운영 준비 완료  
**마지막 검증**: 2026-04-18

---

## 목차

1. [커리큘럼 개요](#커리큘럼-개요)
2. [모듈 구조 (4 Modules × 6 Lessons)](#모듈-구조)
3. [MODULE 1: DeFi 기초 심화](#module-1-defi-기초-심화---담보기반-대출의-메커니즘)
4. [MODULE 2: 유동성 제공 및 수익 창출](#module-2-유동성-제공-및-수익-창출)
5. [MODULE 3: 고급 DeFi 전략](#module-3-고급-defi-전략---파생상품--자동화)
6. [MODULE 4: 위험 관리와 포트폴리오 구축](#module-4-위험-관리와-포트폴리오-구축)
7. [플랫폼 통합 노트](#플랫폼-통합-노트)
8. [수료 기준](#수료-기준)

---

## 커리큘럼 개요

### 목표

OnChain Korea Phase 2는 **Phase 1 졸업생**을 위한 DeFi (탈중앙화 금융) 심화 과정입니다. 4주간 24개 레슨을 통해 한국 학생들이 DeFi의 핵심 프로토콜, 위험 관리, 그리고 2027년 한국 세제 변화에 대비할 수 있도록 설계되었습니다.

**학습의 핵심 가치**:
- 이론 + 실습 (Testnet 기반)의 균형
- 한국 맥락 (규제, 세금, 사례) 통합
- "왜?"를 이해하는 교육 (암기가 아닌 원리)

### 대상 및 선수 지식

- **대상**: OnChain Korea Phase 1 완료자
- **선수 지식**:
  - 블록체인 기초 (블록, 트랜잭션, 스마트 컨트랙트 개념)
  - 지갑 및 보안 이해 (private key, seed phrase)
  - 기본적 DeFi 개념 (DEX, 온체인 거래)
  - 토큰 (ERC-20, SPL)의 기본 이해

### 학습 기간 및 포맷

| 항목 | 내용 |
|------|------|
| 총 기간 | 4주 (Semester 3: 5월 중순 ~ 6월 중순 예정) |
| 주간 구성 | 월-수: Article (3개) / 목: Action Lab / 금: Hidden Topic / 토: Quiz |
| 총 레슨 수 | 24개 (6개 × 4개 모듈) |
| 수강 방식 | 온디맨드 (자율학습) + 주간 라이브 Q&A (목 20:00 KST) |
| 예상 주간 학습시간 | 6-8시간 |

### 학습 목표 (Learning Outcomes)

**Phase 2 수료 후 학생들은**:

1. **이론적 이해**:
   - Lending protocol (Aave, Compound)의 메커니즘 설명 가능
   - Impermanent Loss의 수학적 원리 이해
   - Smart contract risk를 평가할 수 있는 프레임워크 습득
   - 한국의 2027년 세제 변화 사항 파악

2. **실전 능력**:
   - 실제 프로토콜(Testnet)에서 DeFi 거래 수행 가능
   - 자신의 위험 성향에 맞는 포트폴리오 구성 가능
   - DeFi 수익률 vs 위험도 trade-off 분석 가능
   - 세무 기록 관리 및 세금 예측 가능

3. **의사결정 능력**:
   - 새로운 DeFi 프로토콜 평가 가능
   - 포지션 관리 (진입/청산) 판단 가능
   - 위험 발생 시 대응책 수립 가능

---

## 모듈 구조

### 24-Lesson 배치

```
Phase 2 DeFi (4주 × 4모듈)

MODULE 1: DeFi 기초 심화 (담보 기반 대출)
├─ Lesson 1 (Mon): Aave & Lending 메커니즘
├─ Lesson 2 (Wed): 담보율 & 청산 위험
├─ Lesson 3 (Fri): Hidden Topic — 한국 세금 이슈
├─ Lesson 4 (Thu): Action Lab — Aave Testnet 실습
├─ Lesson 5 (Sat): Quiz (30문항)
└─ Lesson 6 (Sun): Catch-up & Q&A

MODULE 2: 유동성 제공 & 수익 창출
├─ Lesson 7 (Mon): LP Token & AMM 메커니즘
├─ Lesson 8 (Wed): Impermanent Loss 심화
├─ Lesson 9 (Fri): Hidden Topic — 한국 yield farming 규제
├─ Lesson 10 (Thu): Action Lab — Raydium/Uniswap LP 실습
├─ Lesson 11 (Sat): Quiz
└─ Lesson 12 (Sun): Catch-up

MODULE 3: 고급 DeFi & 자동화
├─ Lesson 13 (Mon): Perpetual Futures 이론
├─ Lesson 14 (Wed): Options & Vault 전략
├─ Lesson 15 (Fri): Hidden Topic — 선물 규제 및 세금
├─ Lesson 16 (Thu): Action Lab — DeFi Vault 실습
├─ Lesson 17 (Sat): Quiz
└─ Lesson 18 (Sun): Catch-up

MODULE 4: 위험 관리 & 포트폴리오
├─ Lesson 19 (Mon): Smart Contract Risk Assessment
├─ Lesson 20 (Wed): Insurance & 포트폴리오 다각화
├─ Lesson 21 (Fri): Hidden Topic — 2027년 한국 세제 완정리
├─ Lesson 22 (Thu): Action Lab — 포트폴리오 Audit & 리밸런싱
├─ Lesson 23 (Sat): Final Project & Quiz
└─ Lesson 24 (Sun): 수료식 & 다음 단계 안내
```

---

## MODULE 1: DeFi 기초 심화 - 담보기반 대출의 메커니즘

### 모듈 소개

**핵심 질문**: "은행에서 돈을 빌릴 때 담보가 필요한 이유, DeFi에서는 어떻게 다를까?"

이 모듈에서는 Aave와 Compound 같은 lending protocol의 메커니즘을 이해하고, 실제로 Testnet에서 대출해보는 경험을 합니다.

### 학습 목표
1. Lending protocol의 기본 메커니즘 (Supply, Borrow, aToken) 이해
2. Collateralization ratio와 liquidation mechanics 파악
3. 한국 전세대출과의 비교를 통한 맥락적 이해
4. DeFi 이자 소득의 세무 처리 이해

### 선수 지식 (Prerequisites)
- Phase 1 완료 (지갑, 온체인 거래 경험)
- ERC-20 토큰의 기본 개념
- 스마트 컨트랙트의 기초 이해

---

## Lesson 1: Monday — "Aave: Supply & Borrow의 메커니즘"

**Lesson ID**: `phase2-m1-mon-1`  
**형식**: Article (읽기, 15-20분)  
**플랫폼**: 웹 기반 마크다운 + 인터랙티브 계산기

### 학습 내용 개요

이 레슨에서는 Aave lending protocol의 기본 작동 원리를 학습합니다.

#### 핵심 개념 1: aToken의 역할

**aToken이란?**
- Aave Supply Pool에 자금을 공급하면 받는 증명 토큰
- 예: 1000 USDC를 공급 → 1000 aUSDC 받음
- aUSDC는 당신의 소유권 증명 + 자동 이자 적립 토큰

**작동 원리**:
```
Timeline:
Day 1: 1000 USDC 공급 → 1000 aUSDC 받음
Day 8 (1주): aUSDC balance 자동 증가 → 1003 aUSDC
       (APY 3% 기준)
       이유: Borrower가 지불한 이자가 공급자(당신)에게 자동 분배

Day 15 (2주): 1006 aUSDC (더 많아짐!)
       복리(Compounding) 효과
```

**핵심**: aToken의 가치가 증가한다 = 당신의 이자가 자동으로 적립되고 있다

#### 핵심 개념 2: Interest Rate 결정 메커니즘

**누가 이자율을 정하나?**
- 고정된 이자율이 아니라, **Supply & Demand에 기반한 동적 이자율**
- 공식: Interest Rate = f(Utilization Rate)

**Utilization Rate란?**
```
Utilization = Total Borrowed / Total Supplied

예시:
- 총 공급액: 1000 USDC (Aave pool에 모인 자금)
- 총 차입액: 600 USDC (borrower들이 빌려간 자금)
- Utilization Rate: 600 / 1000 = 60%

해석:
- 60% 활용: 수요가 높음 → 이자율 올림 (더 공급 유도)
- 80% 활용: 수요 매우 높음 → 이자율 급등
- 30% 활용: 수요 낮음 → 이자율 내림
```

**이자율의 영향**:
```
APY (연 수익률):

low utilization (30%):
  - Supply APY: 1.5% (공급자)
  - Borrow APY: 3% (차입자)

medium utilization (60%):
  - Supply APY: 3% (당신이 받는 이자)
  - Borrow APY: 6% (차입자가 내는 이자)

high utilization (90%):
  - Supply APY: 5%
  - Borrow APY: 12%
```

#### 핵심 개념 3: Collateral & Borrowing Power

**담보(Collateral)란?**
- 대출을 받을 때 담보로 제시하는 자산
- 차입자가 돈을 갚지 못하면 Aave가 이를 팔아서 대출금 회수

**Collateral Factor (담보 계수)**:
```
각 토큰마다 정해진 담보 인정 비율:

ETH: 80% 담보계수
  → 1 ETH ($2000)를 담보로 제시하면
  → 최대 $1600까지만 차입 가능

USDC: 90% 담보계수
  → 1000 USDC를 담보로 제시하면
  → 최대 $900까지 차입 가능

이유: 변동성 낮은 토큰(USDC) > 변동성 높은 토큰(ETH)
```

**당신의 Borrowing Power 계산**:
```
예: ETH 1개($2000) + USDC 1000개를 담보로 제시

Borrowing Power = 
  (1 × $2000 × 0.80) + (1000 × 1 × 0.90)
  = $1600 + $900
  = $2500

해석: 최대 $2500까지 어떤 토큰이든 차입 가능
```

#### 한국 맥락: 전세대출과의 비교

| 비교 항목 | 전세대출 (한국은행) | DeFi Lending (Aave) |
|----------|----------------|------------------|
| 담보 | 부동산 | 암호자산 |
| 담보 인정 비율 | ~90% (집값의) | 50-90% (토큰의) |
| 이자율 | 고정 (4-5%) | 변동 (수요 기반) |
| 청산 | 수개월 걸림 | 즉시 (자동) |
| 세금 | 이자는 비과세 | **2027년부터 과세 예정** |

**한국의 전세대출 사례**:
- 집값 5억원 → 담보대출 4억원 (80%)
- 연이율 3-4% 고정
- 2년 만기

**DeFi의 유사 거래**:
- ETH 1개 ($2000) → 담보로 제시
- USDC 1200 차입 가능 (60% LTV)
- 이자율 3-8% (변동) → 합계 이자 $36-96/연

### 실제 계산 예시

```
시나리오: 당신은 $5000을 "수익"으로 만들고 싶음

선택지 1: 은행 정기 예금
- 이자율: 연 3% (고정)
- 1년 후: $5150 (+$150)
- 위험: 거의 없음

선택지 2: Aave USDC Supply
- 이자율: 현재 APY 4% (변동, 현시점 예시)
- 1년 후: $5200 (+$200)
- 위험: Aave smart contract risk (매우 낮음, 감사됨)

선택지 3: ETH 담보로 USDC 차입 후 다시 공급 (레버리지 전략)
- ETH 1개 담보 → USDC 1500 차입
- 차입 이자율: 5% / 연 = $75
- 공급 이자율: 4% / 연 = $60
- 손실: $15 (비효율)
→ 이 경우는 사용하지 않음 (손해)
```

### 학습 확인 (Assessment)

이 레슨을 이해했다면:
- [ ] aToken의 가치가 시간이 지나면서 증가하는 이유를 설명할 수 있다
- [ ] "Utilization Rate"가 이자율에 미치는 영향을 설명할 수 있다
- [ ] 자신의 담보액으로 얼마까지 차입할 수 있는지 계산할 수 있다
- [ ] 한국 전세대출과 DeFi lending의 차이점 3가지 이상 설명할 수 있다

### 참고 자료 (Sources)

- **공식 문서**: https://docs.aave.com/
- **한글 학습**: OnChain Korea 자체 제작 (이 문서)
- **계산기**: https://aave.com/risk (Risk Framework 참고)
- **한국 금융**: 금융감독원 "암호자산 과세 기본방침" (2024)

---

## Lesson 2: Wednesday — "담보율 & 청산 위험 완전 이해"

**Lesson ID**: `phase2-m1-wed-1`  
**형식**: Article + Interactive Scenarios  
**학습시간**: 20-25분

### 개요

"당신의 대출이 위험에 빠지는 순간은?" — 이 레슨에서는 **청산(Liquidation)** 메커니즘을 깊이 있게 학습합니다.

### 핵심 개념 1: Health Factor (건강도)

**Health Factor란?**
- 당신의 대출 포지션이 얼마나 "안전한지"를 나타내는 숫자
- 계산식: Health Factor = (Collateral Value × Liquidation Threshold) / Total Borrowed Amount

**해석**:
```
HF > 1.5 = 매우 안전 (권장)
HF 1.0 ~ 1.5 = 주의 (가격 변동에 민감)
HF < 1.0 = 청산 직전 (즉시 조치 필요)
```

**실제 계산**:
```
상황 설정:
- 당신의 담보: ETH 1개 (현재 가격 $2000)
- 당신의 차입: USDC $1000
- ETH Liquidation Threshold: 85% (Aave 설정)

Health Factor 계산:
HF = ($2000 × 0.85) / $1000 = $1700 / $1000 = 1.7

해석: HF 1.7 = 안전한 상태
```

### 핵심 개념 2: Liquidation Mechanics (청산이 일어나는 방식)

**청산은 언제 일어나나?**

청산은 자동으로 일어난다:
1. **HF < 1.0 조건 발생** (당신의 담보 가치 > 차입액의 관점에서)
2. **Liquidator가 작동** (자동화 봇, 또는 인센티브받은 사람)
3. **강제 청산 거래 실행**:
   - 당신의 일부 담보 매각 (시장에 팔림)
   - 차입금 상환 (자동)
   - Liquidation Penalty 부과 (3-10%)

**예시 - 청산 절차**:
```
초기 상태:
- 담보: ETH 1개 ($2000)
- 차입: USDC $1200
- HF = ($2000 × 0.85) / $1200 = 1.42 (안전)

ETH 가격 하락: $2000 → $1600

새로운 HF:
HF = ($1600 × 0.85) / $1200 = 1.13 (주의)

더 하락: $2000 → $1350

새로운 HF:
HF = ($1350 × 0.85) / $1200 = 0.96 (청산 위험!)

가격 $1350에서 청산 실행:
- Liquidator가 당신을 대신해 USDC $1200 상환
- 당신의 ETH 일부 강제 매각 (페널티 포함)
- 당신이 받을 ETH: 약 0.93개 (0.07개 손실 = 페널티)
- 당신의 순 손실: 0.07 ETH = $94.5
```

### 핵심 개념 3: Loan-to-Value (LTV) vs Liquidation Threshold

**용어 정리** (헷갈리기 쉬운 부분):

| 용어 | 정의 | 예시 |
|------|------|------|
| **LTV** (Loan-to-Value) | 차입할 때 최대 차입 비율 | ETH LTV = 80% → 담보 $100이면 최대 $80 차입 |
| **Liquidation Threshold** | 청산이 시작되는 임계값 | 85% 설정 → HF < 1 때 청산 시작 |

**차이점**:
```
LTV는 "초기 진입"의 한계
- $2000 ETH 담보 + 80% LTV = 최대 $1600 차입 가능

Liquidation Threshold는 "청산"의 기준
- 같은 ETH 1개로 $1600을 차입했을 때
- 가격이 내려가서 HF = 1.0이 되는 순간 청산됨
- 85% threshold 기준: ($2000 × 0.85) / Borrowed = 1.0
  → Borrowed = $1700일 때 청산
```

**왜 두 개가 필요한가?**
- LTV: "당신이 과도하게 차입하지 못하도록" 보호
- Liquidation Threshold: "가격 변동을 견디기 위한" 완충 (5%의 차이)

### 한국 맥락: 전세사기와의 비교

**한국의 전세 문제 (2020-2023)**:
- 전세금: 부동산 가치의 80-90%
- 집주인이 전세금을 다른 전세에 다시 담보로 제공
- 결과: 가격 하락 시 연쇄 파산 발생

**DeFi의 안전장치** (더 나은 이유):
1. **자동 청산**: 수동 절차가 아니라 자동 실행 (지연 없음)
2. **실시간 가격 반영**: 오라클을 통해 즉시 가격 반영 (부동산은 느림)
3. **과도 담보 요구**: LTV 80% 이하 (전세는 거의 100%)

**한국 규제의 변화**:
- 2024년부터 "다중 담보" 규제 강화
- 2027년 암호자산 세제 도입 시 청산 손실의 세무 처리 불명확

### 위험 시뮬레이션

```
당신의 포지션:
- 담보: SOL 10개 (현재 가격 $150/개 = $1500)
- 차입: USDC $750
- LTV: 75% (안전)
- HF: ($1500 × 0.85) / $750 = 1.7 (안전)

시나리오 1: SOL 가격 10% 하락 → $135/개
- 담보 가치: $1350
- HF: ($1350 × 0.85) / $750 = 1.53 (여전히 안전)

시나리오 2: SOL 가격 20% 하락 → $120/개
- 담보 가치: $1200
- HF: ($1200 × 0.85) / $750 = 1.36 (주의)
- 대응: 담보 추가 공급 또는 일부 상환 필요

시나리오 3: SOL 가격 30% 하락 → $105/개
- 담보 가치: $1050
- HF: ($1050 × 0.85) / $750 = 1.19 (경고)

시나리오 4: SOL 가격 45% 하락 → $82.5/개
- 담보 가치: $825
- HF: ($825 × 0.85) / $750 = 0.93 (청산!)
- 당신은 강제 매각으로 5-10% 손실 추가
```

### 대응 전략

**청산을 피하는 방법** (4가지):

| 방법 | 난이도 | 비용 | 시점 |
|------|--------|------|------|
| **담보 추가** | 쉬움 | 추가 자금 필요 | 즉시 (HF 하락 시) |
| **일부 상환** | 쉬움 | 차입금의 일부 | 즉시 (HF 하락 시) |
| **포지션 축소** | 중간 | 수익 손실 | 시간 여유 있을 때 |
| **분산 투자** | 어려움 | 전략 변경 | 처음부터 계획 |

---

## Lesson 3: Friday — "Hidden Topic: 한국 DeFi 이자 소득의 세금 이슈"

**Lesson ID**: `phase2-m1-fri-hidden-1`  
**형식**: Deep Dive Article  
**학습시간**: 15분

### 개요

DeFi의 이자 수익은 한국에서 어떻게 세금으로 취급될까? 현재와 2027년의 상황을 모두 살핍니다.

### 1. 현황 (2024-2025): 규제 공백 (灰色地帶)

**현재 상황**:
- 한국 국세청: DeFi 이자 소득에 대한 **공식 가이드라인 미발표**
- 일부 학자: "금융소득"으로 분류 주장 (20% 원천징수)
- 보수 진영: "기타소득"으로 분류 주장 (종합소득세, 더 높음)
- 현실: 대부분의 개인 사용자는 신고 미실시

**국세청의 입장** (공식 성명):
```
"암호자산 거래소득과 관련해
세부 지침은 2026년 상반기에 발표 예정입니다."
(금융감독원 공식 발표, 2024년)
```

**사실상의 영향**:
- 소액: 국세청 단속 낮음 (1년 $1000 이하)
- 대액: 거래소 보고(CRS) → 국세청 추적 가능성 높음
- 위험도: 연 $10K 이상은 신고 권장

### 2. 예상 세제 (2027년): 양도소득세 20% 시행 가능성

**정부 발표 내용** (금융감독원):
```
2027년부터 암호자산 거래에 대해:
- 양도소득세: 20% (자동 원천징수 예정)
- 적용 대상: 연 거래액 $10K 이상 또는 보유 가치 $5K 이상
- 과세 범위: 양도(거래)차익

미정 항목:
- 이자/배당 소득: 금융소득(20%) vs 기타소득 분류 미정
- 손실 공제: 가능 여부 미정
```

**DeFi 이자 소득의 분류 시나리오**:

```
시나리오 A: 금융소득 분류 (확률: 40%)
- 과세율: 20% 원천징수
- 계산: Aave 이자 $1000 → 세금 $200
- 신고: 종합소득세 신고 시 조정 가능

시나리오 B: 기타소득 분류 (확률: 40%)
- 과세율: 종합소득세 (6~45%)
- 계산: Aave 이자 $1000 → 세금 $60~450 (소득에 따라)
- 신고: 필수 (원천징수 없음)

시나리오 C: 사업소득 분류 (확률: 20%)
- 과세율: 종합소득세 + 사업소득세
- 계산: 더 복잡함, 필요경비 공제 가능
- 신고: 필수 + 장부 관리
```

**최악의 시나리오**:
```
만약 시나리오 B가 적용되고, 당신의 다른 소득이 많다면:
- 근로소득: $50K/연
- DeFi 이자: $5K/연
- 총소득: $55K
- 종합소득세율: 35% 적용
- DeFi에 대한 세금: $5K × 35% = $1,750

vs 금융소득 분류:
- 세금: $5K × 20% = $1,000
- 차이: $750 더 낼 수 있음
```

### 3. 청산 손실의 세무 처리

**현재 규정** (2024):
- 암호자산 손실: "자본손실" 분류
- 종합소득세: 손실 공제 **불가**
- 결과: 손해봐도 세금은 그대로

**2027년 예상**:
- 양도소득세 도입 시 손실 공제 여부 미정
- 가능성 1: 자본손실 공제 도입 (해외 모델 따름)
- 가능성 2: 손실 공제 불가 유지

**현실적 예시**:
```
당신의 2024-2027 활동:

Aave 이자 수익: $10,000
Uniswap IL 손실: -$3,000
Liquidation 손실: -$1,000
순수익: $6,000

2027년 세금:

경우 1 (손실 공제 가능):
과세 대상: $6,000
세금: $1,200 (20%)

경우 2 (손실 공제 불가):
과세 대상: $10,000 (전체 이자 + 수익)
세금: $2,000 (20%)
손실은 무시됨 → 불공정

경우 3 (기타소득 분류):
세금: $6,000 × 35% = $2,100 이상
```

### 4. 대비 전략

**전략 1: 거래 기록 관리** (필수)
```
Google Sheet 또는 Koinly 같은 도구로:
- 거래 날짜
- 거래 주소 (Hash)
- 거래소/프로토콜
- 금액 (USD 환산)
- 수수료
- IL 손실액 (공식 계산)

예:
2025-03-15 | Aave | 0x1a2b... | USDC Supply | $1000 | Fee: $2 | P&L: +$25
2025-03-20 | Uniswap | 0x3c4d... | ETH-USDC LP | $500 | Fee: $5 | IL: -$20
```

**전략 2: 이자와 손실 분리 추적** (세무 전략)
```
이자 (금융소득일 가능성):
- 2024: $5,000
- 2025: $6,000
- 2026: $7,000
- 소계: $18,000

손실 (자본손실일 가능성):
- 2024: -$2,000 (IL)
- 2025: -$1,500 (Liquidation)
- 2026: -$1,000 (Market downturn)
- 소계: -$4,500

분리의 이유: 세금 분류가 다를 수 있음
```

**전략 3: 세무사 상담** (비용 투자)
```
비용: 약 $500-1,000 KRW (한 번)
시점: 2026년 중반 (규정 확정 후)
이점: 
- 정확한 세무 분류
- 서류 준비 가이드
- 세금 최소화 방안
```

**전략 4: 위험 조절** (사전 예방)
```
자신의 위험 성향에 맞는 선택:

보수적 (세금 걱정 많으면):
- Aave USDC supply만 (이자 소득, 손실 거의 없음)
- 예상 세금: 이자 × 20-35%
- 손실 위험: 낮음

공격적 (손실 수용 가능):
- LP farming + Perpetual + Vault
- 예상 세금: 높음 (손실 공제 안 될 경우)
- 손실 위험: 높음
```

### 5. 참고: 해외의 사례

**미국** (참고용):
- 암호자산 손실: 자본손실로 공제 가능
- 연 $3,000 이상 손실은 이월 가능
- 결과: 세금 계획 가능

**홍콩** (참고용):
- 암호자산 거래: 비과세 (투자 자산)
- 단, 사업으로 분류되면 종합소득세
- 결과: 개인은 거의 비과세

**한국** (현재):
- 규제 공백 → 2027년 결정 예정
- 2027년 이전에 확보한 이익: 세금 불명확 (미신고 위험)
- 2027년 이후: 명확한 규칙 적용

### 학습 확인

이 레슨을 이해했다면:
- [ ] 2024년 현재 한국의 DeFi 세제 상황 (규제 공백)을 설명할 수 있다
- [ ] 2027년 예상 3가지 시나리오를 설명할 수 있다
- [ ] 청산 손실과 이자 수익의 세무 처리 차이를 이해한다
- [ ] 자신의 거래 기록을 관리할 방법을 결정할 수 있다

---

## Lesson 4: Thursday — "Action Lab: Aave Sepolia Testnet에서 Supply + Borrow 체험"

**Lesson ID**: `phase2-m1-thu-action-1`  
**형식**: Hands-on Lab (실습)  
**예상시간**: 30-45분  
**플랫폼**: Sepolia Testnet, Aave Sepolia, MetaMask

### 실습 목표

- Aave Sepolia에서 실제 토큰 Supply & Borrow 거래 수행
- aToken 받기 및 이자 적립 관찰
- Health Factor 모니터링 및 위험 이해
- 실제 블록체인 거래의 흐름 체험

### 사전 준비

**필수 조건**:
1. MetaMask 설치 + Sepolia Testnet 네트워크 추가
2. Sepolia ETH 0.1개 이상 (faucet에서 무료 획득)
3. 인터넷 연결 (가스비 없음, Testnet이므로)

**Sepolia Testnet ETH 받기**:
```
1. MetaMask 열기
2. "Sepolia Test Network" 선택
3. Sepolia Faucet 접속: https://sepoliafaucet.com
4. 지갑 주소 입력
5. 0.1 ETH 받기 (완료까지 1-5분)
```

### 단계별 실습 가이드

#### Step 1: Aave Sepolia 접속 및 지갑 연결 (5분)

```
1. https://sepolia.aave.com 방문
2. 우측 상단 "Connect Wallet" 클릭
3. MetaMask 선택
4. 팝업에서 지갑 연결 승인
5. Sepolia network 확인 (MetaMask에서)

확인 사항:
□ 지갑 주소 보임
□ "Sepolia" 네트워크 표시
□ 대시보드 로딩됨
```

#### Step 2: Sepolia USDC 획득 (5분)

```
Aave에서 직접 USDC를 받기:

1. Aave 대시보드에서 "Faucet" 탭 찾기 (또는 GitHub에서)
2. USDC 100개를 "Mint"하기
   - 클릭: "USDC" → "Mint"
   - 확인 트랜잭션 (MetaMask)
   - 완료 대기 (10-20초)

또는 대체 방법:
- Sepolia USDC Faucet: 
  https://sepolia.etherscan.io/address/0xda9d4f9b69ac3391ad4cb3c9bff20d00ee4f82a8#writeContract
```

#### Step 3: USDC Supply (10분)

```
USDC를 Aave에 공급하기:

1. Aave 대시보드 상단 "Supply" 버튼 클릭
2. "USDC" 선택
3. 금액 입력: 100 USDC (모두 공급)
4. "Supply USDC" 버튼 클릭
5. MetaMask 팝업:
   - 트랜잭션 내용 확인
   - Gas fee 확인 (Testnet은 무료)
   - "Confirm" 클릭
6. 거래 대기 (15-30초)
7. 완료 확인:
   "You have successfully supplied 100 USDC"

결과 확인:
□ aUSDC balance 나타남 (100 aUSDC)
□ "Supply" 섹션에 100 USDC 표시
□ APY 보임 (예: 4.23%)
```

#### Step 4: aToken 확인 및 이자 관찰 (15분 대기)

```
이자가 적립되는 모습 관찰:

초기 상태 (공급 직후):
- aUSDC balance: 100.000000

10분 후:
- aUSDC balance: 100.000001 (아주 미세하게 증가)
  → 이자가 실시간으로 적립됨을 확인!

15분 후:
- aUSDC balance: 100.000002

계산 (참고):
- APY 4% = 연 4%
- 일일: 4% / 365 ≈ 0.011% / 일
- 100 USDC × 0.011% = 0.011 USDC / 일
- 15분(0.01일): 약 0.0001 USDC

이 보임:
```

#### Step 5: DAI Borrow (10분)

```
이제 차입해보기:

1. Aave 대시보드에서 "Borrow" 탭 클릭
2. "DAI" 선택
3. 금액 입력: 30 DAI
   (USDC 100개 담보로 약 75 DAI까지 차입 가능)
4. "Borrow DAI" 클릭
5. MetaMask 승인 (2단계):
   Step 1: Approval (DAI 사용 권한)
   Step 2: Borrow (실제 차입)
6. 완료 대기

결과 확인:
□ "Borrows" 섹션에 30 DAI 표시
□ "Health Factor" 보임 (예: 1.85 - 안전)
□ DAI 토큰이 MetaMask에 추가됨
```

#### Step 6: Health Factor 모니터링 (계속)

```
Health Factor 확인하기:

현재 상태:
- 담보: 100 aUSDC (~$100 USD, Testnet)
- 차입: 30 DAI
- Health Factor: 1.85 (안전)

계산 확인:
HF = (Collateral × LT) / Borrowed
HF = (100 × 0.85) / 30 = 85 / 30 = 2.83?

주의: Testnet이므로 실제 가격과 다를 수 있음

모니터링 포인트:
□ Health Factor 값 기록 (지금)
□ 담보/차입 비율 이해
□ Liquidation Threshold 확인 (대시보드)
```

### 체크리스트 (완료 확인)

```
레슨 완료 기준:

기본 (필수):
□ MetaMask + Sepolia 네트워크 설정
□ Sepolia USDC 100개 획득
□ USDC Supply 거래 완료
□ aUSDC 받기 (대시보드에서 확인)
□ DAI 30개 Borrow 거래 완료
□ Health Factor > 1.5 확인

심화 (권장):
□ 10-15분 후 aUSDC balance 증가 관찰
□ 거래 해시(Transaction Hash) 저장
□ Sepolia Etherscan에서 거래 조회
□ 스크린샷 3장 이상 저장
```

### 결과 제출물

```
Action Lab 완료 증명:
1. Aave Dashboard 스크린샷 (지갑 주소 보임)
2. aUSDC balance 스크린샷
3. Health Factor 표시 스크린샷
4. 간단한 후기 (100자):
   - 가장 놀라웠던 점
   - 어려웠던 부분
   - 다음에 궁금한 것
```

### 문제 해결 (Troubleshooting)

| 문제 | 원인 | 해결책 |
|------|------|--------|
| "MetaMask 연결 안 됨" | 확장 프로그램 설치 안 됨 | https://metamask.io 에서 설치 |
| "Sepolia ETH를 못 받음" | Faucet 일일 제한 | 다른 Faucet 시도 (PoW faucet) |
| "Supply 버튼 반응 없음" | 네트워크 오류 | Sepolia 네트워크 다시 선택 |
| "Gas fee 너무 높음" | Mainnet 실수 | MetaMask에서 Sepolia 확인 |
| "Borrow 할 수 없음" | 담보 부족 | 더 많은 USDC supply |

---

## Lesson 5: Saturday — "Module 1 Quiz & Assessment"

**Lesson ID**: `phase2-m1-sat-quiz-1`  
**형식**: 온라인 객관식 + 계산 문제  
**문제 수**: 30문항  
**합격선**: 24/30 (80%)  
**제한시간**: 45분  
**재시도**: 무제한 (3일마다 새 문제)

### 출제 범위 및 배점

```
Module 1 Quiz 구성:

1. aToken & 이자 메커니즘 (6문항, 6점)
2. Interest Rate 계산 (4문항, 6점)
3. LTV / Health Factor (6문항, 10점)
4. Liquidation 시나리오 (6문항, 10점)
5. Action Lab 실행 & 결과 (4문항, 4점)
6. 한국 세무 이슈 (4문항, 4점)

총합: 30문항 = 40점
합격: 32점 이상 (80%)
```

### 샘플 문제

**유형 1: 개념 이해 (객관식)**

```
Q1. aToken의 가장 중요한 특징은?
A) Aave 토큰과 동일하다
B) 시간이 지남에 따라 자동으로 가치가 증가한다
C) 거래소에서만 팔 수 있다
D) 한 번 받으면 회수할 수 없다

정답: B
해설: aToken은 공급자의 지분 증명 + 자동 이자 적립 토큰
```

```
Q2. Utilization Rate 60%는 무엇을 의미하나?
A) 풀의 60%가 사용 중이다
B) 차입자가 공급액의 60%를 빌려갔다
C) 공급자의 이자율이 60%다
D) A와 B 모두

정답: D
해설: 총 공급액 중 60%가 실제로 차입되었다는 뜻
```

**유형 2: 계산 문제**

```
Q3. ETH 1개(가격 $2000)를 담보로 했을 때,
USDC를 최대 얼마까지 차입할 수 있는가?
(ETH LTV = 80%, USDC LTV = 90%)

A) $1000
B) $1500
C) $1600
D) $2000

정답: C ($2000 × 0.80 = $1600)
해설: LTV는 차입할 수 있는 최대 비율
```

```
Q4. 다음 상황에서 Health Factor를 계산하시오:
- 담보: ETH 1개 (가격 $2000, Liquidation Threshold 85%)
- 차입: USDC $1000

계산식:
HF = (Collateral Value × Liquidation Threshold) / Total Borrowed
HF = ($2000 × 0.85) / $1000 = 1.7

객관식:
A) 0.85
B) 1.0
C) 1.7
D) 2.0

정답: C (1.7)
```

**유형 3: 시나리오 기반**

```
Q5. 현재 ETH 가격이 $2000이고 HF = 1.7입니다.
가격이 얼마까지 내려가면 청산(Liquidation) 위험에 빠질까?

현재:
- 담보: 1 ETH at $2000
- 차입: $1000 USDC
- HF: ($2000 × 0.85) / $1000 = 1.7

청산 위험은 HF < 1.0일 때:
($X × 0.85) / $1000 = 1.0
$X × 0.85 = $1000
$X = $1176

정답: ETH 가격이 $1176 이하로 내려가면 청산

객관식:
A) $1500
B) $1176
C) $1000
D) $850
```

```
Q6. 당신은 USDC 공급으로 월 $10의 이자를 받고 있습니다.
APY가 4%라면, 당신이 공급한 USDC는 얼마인가?

계산:
연 이자 = $10 × 12 = $120
공급액 × 4% = $120
공급액 = $120 / 0.04 = $3000

객관식:
A) $100
B) $300
C) $3000
D) $30000

정답: C ($3000)
```

**유형 4: 한국 맥락**

```
Q7. 한국의 전세대출과 DeFi Lending의 가장 큰 차이점은?
A) 이자율이 높다
B) 담보로 인정되는 비율이 낮다
C) 청산이 즉시 일어난다
D) 대출 액이 적다

정답: C
해설: DeFi는 자동 청산, 전세는 수개월 소요
```

```
Q8. 2027년 한국의 DeFi 이자 소득에 대해 가장 가능성 높은 세제는?
A) 비과세 (현재처럼)
B) 양도소득세 20%
C) 종합소득세 (기타소득)
D) A와 B 모두 불명확

정답: D
해설: 아직 정부가 최종 결정하지 않음 (2024년 현재)
```

### 패스 조건 및 다음 단계

```
합격 (24/30 이상):
✓ Module 1 완료 인증 배지 받음
✓ Module 2 ("Liquidity & Yield Farming") 언락
✓ 최종 프로젝트에 Module 1 내용 포함 가능

재시도 (23/30 이하):
✓ 3일 후 새로운 문제로 재시도 가능
✓ 제한 없음 (무제한 재시도)
✓ 학습 자료 다시 읽기 권장

팁:
- 아래 주요 개념 3가지를 다시 복습하면 도움
- Health Factor 계산 연습 (필수)
- 한국 세제 변화는 참고만 (암기 불필요)
```

---

## Lesson 6: Sunday — "Catch-up & Q&A / Weekly Review"

**Lesson ID**: `phase2-m1-sun-review`  
**형식**: Asynchronous + Live Q&A  
**시간**: 목요일 20:00 KST (라이브), 이후 녹화 제공

### 목표

- Module 1 학습 내용 정리 및 질문 해결
- 실습 과정에서 마주친 어려움 공유
- 다음 모듈로의 매끄러운 전환

### 주간 리뷰 체크리스트

```
Module 1을 완료했나요? 확인하세요:

개념 이해:
□ aToken의 역할 (이자 증명, 자동 적립)
□ Interest Rate의 동적 결정 (Utilization Rate 기반)
□ Collateral Factor와 Borrowing Power의 관계
□ Health Factor와 Liquidation의 연결
□ 한국 세제의 불확실성

실습 완료:
□ Sepolia USDC supply 완료
□ DAI 차입 완료
□ Health Factor 확인
□ aToken balance 변화 관찰

심화 학습 (선택):
□ Aave whitepaper 읽기 (선택)
□ 실제 Aave UI 둘러보기 (mainnet)
□ DeFi 커뮤니티 토론 읽기

질문 준비:
□ 이해 안 되는 부분 메모
□ 실습에서 마주친 오류 정리
□ 다음 모듈에 대한 예상 질문
```

### Live Q&A 주제 (예정)

```
일반적인 질문들:

Q1. "Health Factor가 정확히 뭔가요?"
→ 실시간 계산기 사용해서 보여드림

Q2. "담보를 추가하려면?"
→ Aave에서 실제로 해보기

Q3. "왜 Compound가 아니라 Aave를 배웠나?"
→ TVL, 단순성, 한국 사용 비중 설명

Q4. "Testnet과 Mainnet의 차이?"
→ 실제 가격, 가스비 설명

Q5. "손실이 나면 세금을 낼까?"
→ 2027년 정책에 따라 다름 (현재 불명확)
```

---

## MODULE 2: 유동성 제공 및 수익 창출

*(유사한 구조로 Lessons 7-12 구성)*

**모듈 개요**:
- Lesson 7 (Mon): LP Token & AMM 메커니즘
- Lesson 8 (Wed): Impermanent Loss 완전 이해
- Lesson 9 (Fri): Hidden Topic — 한국 yield farming 규제
- Lesson 10 (Thu): Action Lab — Raydium/Uniswap v3 실습
- Lesson 11 (Sat): Quiz (30문항)
- Lesson 12 (Sun): Catch-up & Q&A

---

## MODULE 3: 고급 DeFi 전략 & 자동화

*(유사한 구조로 Lessons 13-18 구성)*

**모듈 개요**:
- Lesson 13 (Mon): Perpetual Futures 이론
- Lesson 14 (Wed): Options & DeFi Vault 전략
- Lesson 15 (Fri): Hidden Topic — 한국 선물 규제 & 세금
- Lesson 16 (Thu): Action Lab — Yearn/Dopex Vault 실습
- Lesson 17 (Sat): Quiz (30문항)
- Lesson 18 (Sun): Catch-up & Q&A

---

## MODULE 4: 위험 관리와 포트폴리오 구축

*(유사한 구조로 Lessons 19-24 구성)*

**모듈 개요**:
- Lesson 19 (Mon): Smart Contract Risk Assessment
- Lesson 20 (Wed): Insurance & Portfolio Diversification
- Lesson 21 (Fri): Hidden Topic — 2027년 한국 세제 완정리
- Lesson 22 (Thu): Action Lab — 포트폴리오 Audit & 리밸런싱
- Lesson 23 (Sat): Final Project & Comprehensive Quiz
- Lesson 24 (Sun): 수료식 & 커뮤니티 연결

### 최종 프로젝트 (Lesson 23)

**요구사항**: Personal DeFi Strategy Document (5-10 페이지)

```
1. 현황 분석 (1-2p):
   - 자산 규모 및 위험 성향
   - 투자 기간 및 목표

2. 포트폴리오 구성 (2-3p):
   - 60-30-10 모델 (안전-성장-수익층)
   - Protocol 선택 이유
   - 기대 수익률

3. 위험 관리 (1-2p):
   - Smart contract risk 평가
   - Insurance 계획
   - Rebalancing 전략

4. 세무 계획 (1p):
   - 2027년 예상 세금
   - 기록 관리 방법

5. 모니터링 & 대응 (1p):
   - 주간/월간 리뷰 체크리스트
   - 비상 상황 대응책
```

**평가 기준**:
- 분석의 깊이 (40%)
- 리스크 인식 (30%)
- 현실성 (20%)
- 한국 맥락 적용 (10%)

---

## 플랫폼 통합 노트

### 데이터베이스 스키마

```javascript
// Lessons (24개)
{
  phase: 2,
  module: 1-4,
  week: 1-4,
  lessonNum: 1-6,
  lessonId: "phase2-m1-mon-1",
  title_kr: "Aave: Supply & Borrow의 메커니즘",
  title_en: "Aave: How Supply & Borrow Work",
  type: "article|action|hidden|quiz|review",
  duration_minutes: 20,
  content_md: "...",
  learning_objectives: [...],
  prerequisites: [...],
  unlockCondition: "previous_lesson_complete"
}

// Articles
{
  article_id: "phase2-m1-mon-1-content",
  markdown_content: "...",
  key_terms: ["aToken", "Utilization Rate", ...],
  korean_context: "...",
  sources: ["https://docs.aave.com", ...],
  interactive_elements: ["calculator", "simulator"]
}

// Action Labs
{
  lab_id: "phase2-m1-thu-1",
  platform: "aave-sepolia",
  steps: [...],
  checkpoints: [...],
  screenshots_required: 3,
  submission_type: "screenshot_proof"
}

// Quizzes
{
  quiz_id: "phase2-m1-sat-1",
  questions: [
    {
      id: "q1",
      type: "multiple_choice",
      question_kr: "...",
      options: [A, B, C, D],
      correct: "B",
      explanation: "..."
    },
    {
      id: "q2",
      type: "calculation",
      question_kr: "...",
      solution: "...",
      tolerance: 0.01
    }
  ],
  passing_score: 24,
  retry_cooldown_hours: 72,
  max_retries: null
}

// Progress Tracking
{
  user_id: "user123",
  lesson_id: "phase2-m1-mon-1",
  status: "completed|in_progress|locked",
  started_at: "2026-05-15T10:00:00Z",
  completed_at: "2026-05-15T10:45:00Z",
  quiz_score: 28,
  action_lab_submitted: true
}
```

### API Endpoints (Backend)

```
GET  /api/phase/2/modules           // 모든 모듈 조회
GET  /api/phase/2/modules/1         // Module 1 상세
GET  /api/phase/2/lessons/phase2-m1-mon-1  // 특정 레슨
POST /api/phase/2/quiz/phase2-m1-sat-1/submit  // 퀴즈 제출
POST /api/phase/2/action-lab/phase2-m1-thu-1/submit  // 액션 랩 제출
GET  /api/user/progress/phase2      // 진행도 조회
```

### 프론트엔드 UI (React)

```jsx
// Pages
<PhaseOverview />          // 커리큘럼 개요
<ModuleView />             // 모듈 선택 & 시작
<LessonReader />           // 레슨 읽기
<ActionLabGuide />         // 실습 가이드
<QuizPlayer />             // 퀴즈 풀기
<ProgressDashboard />      // 학습 진행 상황
<FinalProjectSubmission /> // 최종 프로젝트 제출

// Components
<LessonNav />              // 레슨 네비게이션 (이전/다음)
<ProgressBar />            // 모듈 진행률
<QuizTimer />              // 타이머 (45분)
<ScreenshotUpload />       // 스크린샷 업로드
<MarkdownRenderer />       // 마크다운 렌더링
<InteractiveCalculator />  // 계산기 (Health Factor 등)
```

### 콘텐츠 업데이트 일정

```
2026-04-18 ~ 04-20: Module 1 최종 리뷰 & 수정
2026-04-21 ~ 04-23: Module 2 콘텐츠 완성
2026-04-24 ~ 04-26: Module 3 콘텐츠 완성
2026-04-27 ~ 04-28: Module 4 + Final Project 완성
2026-04-29 ~ 04-30: 플랫폼 통합 & 라이브 테스트
2026-05-01: Phase 2 공식 런칭
```

### 한국어 현지화 체크리스트

```
모든 레슨마다:
□ 기술 용어 (LP, IL, APY) 영문 병기
□ 한국 사례 2건 이상 포함
□ 스크린샷 한글화 (UI 번역)
□ 세법/규제: 한국 기준 명시
□ 원문 검수 (모국어 네이티브)

Module별:
□ 용어집 (이 레슨의 핵심 용어 10개)
□ 한국 리소스 (블로그, 뉴스 기사)
□ 커뮤니티 토론 링크
```

### 선수 지식 검증

```
Phase 2 진입 요건:
1. Phase 1 모든 모듈 Quiz 합격 (80% 이상)
2. 최소 학습시간: 20시간 (추적)
3. Action Lab 3개 이상 완료

진입 전 자동 확인:
POST /api/auth/verify-prerequisite
{
  phase: 1,
  required_modules: ["1", "2", "3", "4"],
  min_score: 80
}
```

---

## 수료 기준

### 졸업 요건

학생이 Phase 2를 수료하려면:

1. **모든 모듈 Quiz 합격**
   - Module 1, 2, 3, 4 각각 24/30 이상
   - 무제한 재시도 가능

2. **Action Lab 4개 완료**
   - Module별 1개씩 (총 4개)
   - 스크린샷 증거 제출

3. **Final Project 제출 및 평가**
   - 최소 60점 이상 (100점 만점)
   - 피드백 받고 수정 가능

4. **포트폴리오 모니터링 기록**
   - 최소 2주 이상
   - 주간 리뷰 기록 (스크린샷 또는 노트)

### 수료증 및 배지

```
PDF 수료증:
- 이름
- 완료 날짜
- "OnChain Korea Phase 2 DeFi Graduate" 타이틀
- 학습 시간 (자동 계산)
- 최종 스코어 (Quiz + Project 평균)
- QR 코드 (진위 확인용)

NFT 배지 (Solana cNFT):
- "Phase 2 Graduate" 배지
- 학생의 월렛에 자동 발급
- 메타데이터:
  - 이름
  - 완료 날짜
  - 최종 스코어
  - 배치 번호 (cohort)
```

### 다음 단계 (Path Forward)

수료 후 선택지:

```
1. Phase 3 (Advanced Trading & DAO Governance)
   - 7월 중순 시작 예정
   - 선물거래 실전, DAO 참여, 커뮤니티 프로젝트

2. Specialization Track (선택)
   - "LP Farming Pro": Impermanent Loss 최소화
   - "Risk Manager": Smart Contract Audit 심화
   - "Tax Specialist": 2027년 세제 전략가

3. Self-directed Learning
   - OnChain Korea 레소스 계속 이용
   - 커뮤니티 토론 (Discord)
   - 독립 프로젝트

4. 취업 연계 (향후)
   - DeFi 프로토콜 인턴십
   - 한국 거래소 Product 팀
```

---

## 커리큘럼 수정 이력

| 버전 | 날짜 | 변경 사항 |
|------|------|---------|
| v1.0 | 2026-04-18 | 초안 완성 (4 모듈, 24 레슨) |
| v1.1 | 예정 5월 | 학생 피드백 반영, 용어 정정 |
| v2.0 | 예정 6월 | 비디오 콘텐츠 추가, 인터랙티브 시뮬레이션 |

---

## 파일 구조

```
onchain-korea/
├── phase2_defi_curriculum_v1.md          ← 이 문서
├── docs/
│   └── strategy/
│       └── phase2_defi_curriculum_v1.md  (백업)
├── src/
│   ├── data/
│   │   ├── phase2_modules.js
│   │   ├── phase2_lessons.js
│   │   ├── phase2_quizzes.js
│   │   └── phase2_action_labs.js
│   ├── pages/
│   │   ├── Phase2Overview.tsx
│   │   ├── LessonReader.tsx
│   │   ├── QuizPlayer.tsx
│   │   └── ProgressDashboard.tsx
│   └── components/
│       ├── LessonNav/
│       ├── QuizTimer/
│       └── InteractiveCalculator/
└── content/
    └── phase2/
        ├── module1/
        │   ├── lesson1-article.md
        │   ├── lesson2-article.md
        │   ├── lesson3-hidden.md
        │   ├── lesson4-lab.md
        │   └── lesson5-quiz.json
        ├── module2/ ... module3/ ... module4/
        └── final-project-rubric.md
```

---

**최종 검증**: 2026-04-18  
**담당자**: OnChain Korea Curriculum Team  
**검토자**: MinGoo (Co-instructor)  
**배포 예정**: 2026-05-01  
**질문/피드백**: onchain-korea@discord.com
