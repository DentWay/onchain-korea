# OnChain Korea Phase 2: DeFi Deep Dive Curriculum
## v1.0 | 2026-04-17

---

## 개요 (Overview)

**Phase 2**는 Phase 1 졸업생을 위한 심화 DeFi 과정입니다. 4주간 4개 모듈을 통해 Lending, Yield Farming, Advanced Derivatives, Risk Management을 다룹니다.

- **대상**: Phase 1 완료자 (Wallet, Security, Basic DeFi 이해)
- **기간**: 4주 (4 Modules × 1주)
- **학습 형식**: Mon-Wed Article, Thu Action Lab, Fri Hidden Topic, Sat Quiz, Sun Catch-up
- **수료 요건**: 모든 모듈 완료 + Final Project (Personal DeFi Strategy) 제출
- **모듈당 구성**: 학습 목표 3개, Article 3개, Action Lab 1개, Hidden Topic 1개, Quiz 20-30Q

---

## MODULE 1: DeFi Deep Dive — Lending & Borrowing
### 주제: 담보 기반 대출의 메커니즘

**학습 목표**:
1. Lending protocol (Aave, Compound)의 작동 원리 이해
2. Collateralization ratio와 liquidation mechanics 파악
3. 한국의 전세대출과 DeFi 대출의 경제 구조 비교

**선수 지식 (Prerequisites)**:
- Phase 1: Basic DeFi, Stablecoins 완료
- ERC-20 토큰 기초 이해
- 스마트 컨트랙트 기본 개념

---

### Week 1-1: Monday — "Aave: How Supply & Borrow Work"
**Lesson ID**: `phase2-m1-mon-1`

**Article 목표**: Lending protocol의 기본 메커니즘 이해

**학습 내용**:
- Aave의 Supply pool 구조 (aTokens 발행)
- Interest rate 결정 메커니즘 (supply rate, borrow rate)
- Collateral과 borrowing power의 관계
- APY vs APR 차이

**핵심 개념**:
- **aToken**: ERC-20 기반 Supply 증명 토큰, 자동 이자 적립
- **Interest Rate Strategy**: Utilization Rate에 따른 동적 금리
- **Collateral Factor**: 담보로 인정되는 비율 (e.g., 80%)

**실제 사례**: 
- Supply 1,000 USDC → 1,003 aUSDC (1주 후, APY 3%)
- Borrow 500 USDC (ETH 담보) → 500 aDebt accrues interest

**한국 맥락**:
- 전세대출: 집을 담보로 대출 → Collateralized Loan과 유사
- 차이점: DeFi는 Over-collateralization (150-200% 필요), 전세는 담보가치 근처

**출처 & 매핑**: 
- GA: "DeFi Lending 101"
- Aave Docs: https://docs.aave.com/
- 한글화: "스마트 컨트랙트 기반 금리" 섹션 추가

---

### Week 1-1: Wednesday — "Collateralization & Liquidation Explained"
**Lesson ID**: `phase2-m1-wed-1`

**Article 목표**: 담보율, 청산 메커니즘, 위험 관리의 원리

**학습 내용**:
- Collateralization ratio 계산 (e.g., $1500 collateral / $500 borrowed = 300%)
- Loan-to-Value (LTV) vs Health Factor
- Liquidation 트리거 조건
- Liquidator의 역할과 보상 메커니즘

**핵심 개념**:
- **Health Factor**: (Collateral × LT) / Borrowed Amount
  - HF > 1.0 = 안전
  - HF < 1.0 = 청산 대상
- **LTV (Loan-to-Value)**: 담보에 대한 차입 비율
  - Aave: ETH는 82.5% LTV, USDC는 90% LTV
- **Liquidation Threshold**: HF = 1.0이 되는 시점
- **Liquidation Penalty**: 청산 시 손실 (3-10%)

**시나리오 분석**:
```
시나리오: ETH 담보 1개 (현재 $2000), $1500 USDC 차입

조건: ETH LTV = 82.5%, Liquidation Threshold = 85%
- Health Factor = (2000 × 0.825) / 1500 = 1.1 (안전)

ETH 가격 하락: $2000 → $1800
- Health Factor = (1800 × 0.825) / 1500 = 0.99 → 청산 위험!

ETH 추가로 담보 제공하거나 차입 상환 필요
```

**한국 맥락**:
- 전세사기 방지: 한국도 "담보 비중" 규제 강화 (2024년 정책)
- DeFi vs 은행: 은행은 고정 담보비율, DeFi는 시가 기준 변동

**출처 & 매핑**:
- GA: "Liquidation Risk & How to Avoid It"
- Compound Docs: Liquidation mechanism
- 한글 추가: "청산이란 무엇인가" 용어집

---

### Week 1-1: Friday — Hidden Topic
**Lesson ID**: `phase2-m1-fri-hidden-1`
**주제**: "한국 DeFi 사용자의 세금 이슈: 이자 소득과 청산 손실"

**숨겨진 주제 목표**:
- DeFi 이자 소득의 한국 세법상 분류
- 청산으로 인한 손실의 세무 처리
- 2027년 Crypto Tax 시행 대비

**내용**:
1. **이자 소득 세분류**: 금융소득 vs 기타소득
   - Aave 이자 → "금융소득" 가능성 (국세청 지침 미정)
   - 20% 원천징수 대상인지 현황 불명

2. **청산 손실**:
   - 암호자산 손실은 "자본손실" → 종합소득에 불산입 (현재)
   - 2027년 규정 변경 가능성 높음

3. **한국 시장 현황**:
   - 대부분 한국 사용자는 세금 신고 미실시
   - 국세청 2024년 암호자산 추적 강화 = 위험 증대
   - Aave 한국 거래량 (월 $2-5M 수준)

4. **대비 전략**:
   - 개별 거래 기록 관리 (hash 저장)
   - 이자 vs 손실 분리 추적
   - 회계사 상담 권장

**출처**: 
- 국세청 "가상자산 과세 기본방침" (2024)
- 법무법인 태평양 암호자산 세무 가이드
- OnChain Korea 독자 제작

---

### Week 1-1: Thursday — Action Lab
**Lesson ID**: `phase2-m1-thu-action-1`
**실습 주제**: "Aave Sepolia Testnet에서 Supply + Borrow 체험"

**실습 목표**:
- Aave UI에서 토큰 Supply하고 aToken 받기
- aToken balance 증가 관찰 (이자 적립)
- 담보를 기반으로 토큰 Borrow하기
- Health Factor 모니터링

**사전 준비**:
- MetaMask with Sepolia 설정 완료
- Sepolia testnet ETH 0.1개 (faucet에서 획득)
- Aave Sepolia: https://sepolia.aave.com

**단계별 가이드**:

1. **Aave Sepolia 접속**
   - https://sepolia.aave.com 방문
   - MetaMask 지갑 연결 (Sepolia network)

2. **USDC Supply (100 USDC)**
   - 상단 "Supply" 클릭
   - USDC 선택 → 100 USDC 입력
   - "Supply" 버튼 클릭 → 트랜잭션 승인
   - aUSDC balance 확인

3. **Borrow (30 DAI)**
   - 상단 "Borrow" 클릭
   - DAI 선택 → 30 DAI 입력
   - 담보: USDC (자동 인식)
   - Health Factor 확인 (> 1.5 필요)
   - "Borrow" 버튼 → 트랜잭션 승인

4. **모니터링 (1시간 후)**
   - aUSDC balance 증가 확인 (이자)
   - Borrow balance 증가 확인 (금리)
   - Health Factor 변동 추적

**체크리스트**:
- [ ] Sepolia USDC 100개 Supply 완료
- [ ] aUSDC 수령 확인
- [ ] DAI 30개 Borrow 완료
- [ ] Health Factor > 1.5 확인
- [ ] 1시간 후 이자 적립 확인

**스크린샷 제출**: Aave Dashboard + Health Factor + aToken balance

**한국 UI 지원**: 
- 메타마스크 한글판에서 진행
- "담보", "차입", "건강도" 용어 번역 제공

---

### Week 1-1: Saturday — Quiz
**Lesson ID**: `phase2-m1-sat-quiz-1`
**문제 수**: 30문제 (Article 2개당 10Q, Action Lab 5Q)
**합격선**: 24/30 (80%)

**출제 범위**:
- aToken 메커니즘 (5Q)
- Interest rate 계산 (4Q)
- LTV / Health Factor (6Q)
- Liquidation 시나리오 (6Q)
- Action Lab 실행 (9Q)

**문제 유형**:
- 객관식 (20Q)
- 계산 (5Q)
- 시나리오 (5Q)

**샘플 문제**:
```
Q1: Aave에서 1000 USDC를 Supply했을 때, aUSDC를 받는 이유는?
A) 거래 수수료 감면
B) 공급한 토큰의 소유권 증명 + 자동 이자 적립
C) 스테이킹 보상
D) 담보 증명

Q2: ETH 1개 (가격 $2000)를 담보로 했을 때, 최대 몇 USDC를 차입할 수 있나?
(조건: ETH LTV = 82.5%, USDC LTV = 90%)
A) $1000
B) $1500
C) $1650
D) $2000

Q3: Health Factor가 0.95라는 것은?
A) 매우 안전한 상태
B) 곧 청산될 위험 상태
C) 이자를 더 받는 상태
D) 담보를 추가할 필요 없음
```

---

## MODULE 2: Yield Farming & Liquidity Provision
### 주제: 유동성 제공 및 수익 창출

**학습 목표**:
1. LP Token과 Impermanent Loss (IL) 개념 이해
2. Yield farming 전략 (보수적 vs 공격적) 구분
3. 한국의 적금과 DeFi yield farming의 위험도 비교

**선수 지식**:
- Module 1 완료
- AMM (Automated Market Maker) 기초
- 슬리피지 (Slippage) 개념

---

### Week 2-1: Monday — "Liquidity Pools & LP Tokens Explained"
**Lesson ID**: `phase2-m2-mon-1`

**Article 목표**: LP 토큰의 작동 원리와 수수료 메커니즘

**학습 내용**:
- Constant Product Formula (x × y = k)
- LP token의 발행 및 소각 (Mint/Burn)
- Trading fee distribution (0.01% ~ 1%)
- Pool composition 유지 메커니즘

**핵심 개념**:
- **LP Token**: Liquidity Pool의 주식 같은 증명
  - 1 LP token = Pool의 특정 % 지분
  - 수익 = trading fees × 지분율

**실제 계산**:
```
USDC-ETH Pool (Uniswap v3, 0.3% fee)
- Total Liquidity: $10M USDC + $5M ETH (= $15M)
- 당신의 공급: $100 USDC + $50 ETH (= $150)
- LP Token 지분율: $150 / $15,000,000 = 0.001% (1 BPS)

하루 거래량: $5M
- 수수료: $5M × 0.3% = $15,000
- 당신의 하루 수익: $15,000 × 0.001% = $1.50
- 연수익 (APY): $1.50 × 365 = $547.50 (0.37% APY)
```

**AMM vs CEX**:
- CEX (중앙화거래소): Order book 기반, 높은 유동성
- DEX AMM: 탈중앙화, 누구나 유동성 제공 가능

**한국 맥락**:
- 적금 (Korean Savings): 정기적금 연이율 3-4% (보장)
- LP farming: APY 0.5-50% (변동 + 손실 위험)

**출처 & 매핑**:
- GA: "Uniswap Liquidity Mining 101"
- Uniswap Docs: Concentrated Liquidity
- Curve Docs: StableSwap formula

---

### Week 2-1: Wednesday — "Impermanent Loss: Deep Dive"
**Lesson ID**: `phase2-m2-wed-1`

**Article 목표**: IL의 수학적 개념 및 현실적 영향 이해

**학습 내용**:
- IL 발생 메커니즘 (가격 변동 시)
- IL 계산 공식
- IL vs Trading Fee trade-off
- IL 최소화 전략

**핵심 공식**:
```
Impermanent Loss (IL%) = (2√P / (1 + P)) - 1
(P = 최종 가격 / 초기 가격)

예: 초기 가격 대비 50% 상승 (P = 1.5)
IL% = (2 × √1.5 / (1 + 1.5)) - 1 = -5.7%

200% 상승 (P = 3)
IL% = (2 × √3 / (1 + 3)) - 1 = -25.5%
```

**시나리오 분석**:
```
Case: ETH-USDC LP 공급

초기 상태:
- ETH 가격: $1000
- 공급액: 1 ETH + 1000 USDC (= $2000)
- LP token 몇 개 받음

3개월 후:
- ETH 가격: $1500 (50% 상승)
- 당신의 LP position 가치: $2115 (IL -5.7%)
- 그 외 다른 곳에 보관했을 경우: $2500
- 손실액: $385

하지만 3개월 trading fees 수수료: $450
- 순이익: $450 - $385 = $65 (긍정)
```

**IL이 심한 경우**:
- Volatile 쌍 (ETH-SHIB): IL 크다 → 높은 APY 필요
- Stable 쌍 (USDC-DAI): IL 거의 없음 → 낮은 APY 가능

**한국 맥락**:
- 주식 장기 보유 vs 변동성 수익
- "파는 시점" 의존성 높음 (LP도 유사)

**출처 & 매핕**:
- GA: "Understanding Impermanent Loss"
- Curve Finance: StableSwap 장점
- Uniswap v3: Concentrated Liquidity로 IL 최소화 전략

---

### Week 2-1: Friday — Hidden Topic
**Lesson ID**: `phase2-m2-fri-hidden-1`
**주제**: "한국 Yield Farm 선호도와 2027 세제 변화"

**숨겨진 주제 목표**:
- 한국 사용자의 yield farming 규모 및 추세
- 세법상 "사업소득" vs "기타소득" 분류
- 2027년 손실 처리 규정 변경 예상

**내용**:
1. **한국 Market Size**:
   - Raydium (Solana), Orca: 한국 유동성 $50-100M 추정
   - 대부분 개인 숨겨진 수익 (세금 미신고)

2. **세법 이슈**:
   - LP fee 소득: 금융소득 vs 기타소득?
   - IL 손실: 자본손실 → 2027년 공제 불가 예상
   - 사업소득 인정 가능성 (양도세 회피 시도)

3. **한국 특수성**:
   - 높은 IL 손실 시 "손해배상" 가능성 논의 (미반영)
   - 스테이킹 vs LP farming 세제 차별화 가능성

4. **실제 사례**:
   - 한국인 A: USDC-USDT LP farming → $50K IL 손실 (2024)
   - 세무신고 고민: $20K fee 수익 vs $50K IL 손실

**대비 전략**:
- 개별 LP position 기록 (하이퍼레저 활용)
- Trading fee와 IL 분리 추적
- 자산배치: Stable-pair for safety, Volatile for growth

**출처**:
- 한국 암호자산 거래소 통계 (2024)
- Defi Llama: Korean liquidity stats
- 국세청 추정 정책 변화

---

### Week 2-1: Thursday — Action Lab
**Lesson ID**: `phase2-m2-thu-action-1`
**실습 주제**: "Raydium/Orca Devnet에서 LP 유동성 제공 및 수익 확인"

**실습 목표**:
- LP token 수령 및 관리
- Trading fee 수익 확인
- IL 계산 및 모니터링

**준비 사항**:
- Phantom wallet (Solana) 또는 MetaMask (EVM)
- Testnet SOL / ETH
- Raydium (Solana) 또는 Uniswap v3 (Ethereum)

**선택지**: 플랫폼 선택 후 진행

**경로 A: Raydium (Solana Devnet)**

1. **Phantom 지갑 설정**
   - Devnet 전환
   - SOL faucet에서 1 SOL 획득

2. **토큰 획득**
   - USDC devnet faucet
   - COPE (test token) faucet

3. **LP 유동성 공급**
   - Raydium 접속: https://raydium.io
   - "Liquidity" → "Create Pool" 또는 기존 pool에 Add Liquidity
   - USDC-COPE 쌍 선택
   - $100 USDC + 100 COPE 공급
   - LP token 수령 (확인)

4. **모니터링 (1주일)**
   - 매일 LP balance 확인
   - Fee 누적 현황
   - 가격 변동 추적 (COPE 가격 변화)
   - IL 추정 계산

**경로 B: Uniswap v3 (Sepolia)**

1. **MetaMask Sepolia 설정**
   - Sepolia ETH faucet

2. **토큰 획득**
   - USDC, DAI Sepolia faucet

3. **LP 공급**
   - Uniswap v3: https://app.uniswap.org/add (Sepolia)
   - USDC-DAI 쌍 (stable pair = IL 최소)
   - $100 공급
   - LP NFT 수령 (Uniswap v3는 NFT 기반)

4. **모니터링**
   - IL 거의 없음을 확인
   - Fee 누적 추적
   - 가격 범위 설정 영향 관찰

**체크리스트**:
- [ ] Testnet 지갑 및 토큰 획득
- [ ] LP 공급 거래 완료
- [ ] LP token/NFT 수령 확인
- [ ] 초기 position value 기록
- [ ] 1주일 후 fee 누적 기록
- [ ] IL 계산 (공식 이용)

**제출물**:
- 스크린샷: Initial + 1주일 후 position
- 계산: IL %, APY 추정
- 분석: Fee vs IL trade-off 평가

---

### Week 2-1: Saturday — Quiz
**Lesson ID**: `phase2-m2-sat-quiz-1`
**문제 수**: 30문제
**합격선**: 24/30

**출제 범위**:
- LP token mechanism (6Q)
- Trading fee 계산 (5Q)
- IL 공식 및 시나리오 (8Q)
- Stable vs Volatile 쌍 (4Q)
- Action Lab (7Q)

**샘플 문제**:
```
Q1: Uniswap v2에서 $1000을 USDC-ETH (1:1 비율) LP에 공급했을 때,
1주 후 pool에서의 수익이 $20인데, ETH 가격이 30% 올랐다면?
A) 총 수익 $20
B) ETH 가격 상승으로 인해 IL이 발생했을 가능성
C) 손실 상태일 수 있음
D) B와 C 모두

Q2: IL% = (2√P / (1 + P)) - 1 에서 P = 2 (가격 2배 상승)인 경우?
A) 0%
B) -5.7%
C) -20.6%
D) +10%

Q3: Curve의 StableSwap이 Uniswap v2보다 나은 이유는?
A) 거래 속도가 빠르다
B) IL이 적다 (같은 자산쌍의 경우)
C) 수수료가 싸다
D) 한국 지원이 좋다
```

---

## MODULE 3: Advanced DeFi — Derivatives & Vaults
### 주제: 선물, 옵션, 자동 복리 전략

**학습 목표**:
1. Perpetual futures의 이론적 구조 이해 (실제 거래 X)
2. Options protocol 개요
3. Vault 자동화 전략과 smart contract risk

**선수 지식**:
- Module 1, 2 완료
- 선물/옵션 금융 기초 (한국 주식 시장 경험)

---

### Week 3-1: Monday — "Perpetual Futures: Theory & Korean Regulations"
**Lesson ID**: `phase2-m3-mon-1`

**Article 목표**: Perpetual futures의 메커니즘 및 한국 규제 현황 이해

**학습 내용**:
- Perpetual Futures vs Traditional Futures 차이
- Funding rate 메커니즘
- Leverage와 liquidation risk
- 한국의 선물거래 규제 현황

**핵심 개념**:
- **Perpetual**: 만기 없는 선물 (영구 거래 가능)
- **Funding Rate**: Long과 Short 간의 정기적 자금 이체
  - 양수 funding: Long 포지션이 Short에 지불
  - 음수 funding: Short가 Long에 지불

**Mechanism 예시**:
```
Dydx Perpetual ETH/USD

현물 가격: $2000
Perpetual 가격: $2010 (프리미엄)
Funding Rate: 0.01% / 8시간 (연 46%)

상황:
- 1 ETH perpetual long (2배 레버리지) → $1000 마진
- 포지션 규모: $2000
- 가격이 $2100이 되어도 이익: $100 (10%)
- 가격이 $1900이 되면 손실: $100 (전체 마진 손실 = liquidation)

하지만 8시간마다 funding fee 지불:
- $2000 × 0.01% = $0.20 지불 (적음)
```

**Liquidation Risk**:
- 10배 레버리지 = 10% 가격 변동으로 청산
- 2배 레버리지 = 50% 가격 변동으로 청산

**한국 규제**:
- **선물거래 금지 수준** (불명확): 
  - 현물거래는 합법
  - 선물거래는 도박 우려로 규제 검토 중 (2024-2025)
- **국세청**: Perpetual P&L은 사업소득으로 분류 가능
- **금융감독**: "과도한 레버리지" 경고 (2024)

**한국 vs 글로벌**:
- 한국: 주식 선물은 코스피 200 지수 선물만 합법
- 암호자산: 규제 불명확 → 사실상 회피 거래 (Dydx, Bybit)
- 2025년 정책 변화 가능성 높음

**출처 & 매핑**:
- GA: "Perpetual Futures 101"
- Dydx Docs: Funding mechanics
- 금융감독원 "암호자산 거래 가이드" (2024)

---

### Week 3-1: Wednesday — "Options & Vaults: Passive Income Strategies"
**Lesson ID**: `phase2-m3-wed-1`

**Article 목표**: Options protocol과 자동화된 vault 전략 이해

**학습 내용**:
- Options의 기본 (Call, Put)
- Options protocol (Dopex, Lyra, Premia)
- DeFi Vault 전략 (Covered Call, Theta Decay)
- Auto-compounding의 작동

**핵심 개념**:
- **Call Option**: 미래의 특정 가격에 자산 구매 권리
  - "4월 말에 ETH를 $2500에 사고 싶다" (현재 $2000)
  - Call 프리미엄 (옵션료): $100
  
- **Put Option**: 미래에 자산 판매 권리
  - "4월 말에 ETH를 $1800에 팔고 싶다" (위험 방어)
  - Put 프리미엄: $50

**DeFi Vault 전략**:
```
Covered Call Vault (Dopex)
- ETH를 vault에 예치: 1 ETH
- 자동으로 1 ETH call option 판매 (프리미엄 수익)
- 월 프리미엄: 약 3-5% (연 40%)
- 위험: ETH 가격이 행사가 위로 올라가면 강제 판매

예시:
- ETH 1개 예치 (가격 $2000)
- Call 프리미엄: 월 $60 (3%)
- 연 수익: $720 (36% APY)
- 하지만 ETH 가격이 $2500 이상이면 손실 가능
```

**Auto-Compounding Vault**:
```
Yearn Finance Vault (USDC)
- USDC 1000개 예치
- 자동으로 최고 APY yield farming 위치 선정
- 이자를 자동 재투자 (Compounding)
- 월 관리료: 2% (수익의 일부)

리스크: Smart contract risk, Impermanent loss (if LP included)
```

**한국 맥락**:
- "선물옵션": 한국 주식시장 (코스피 200 옵션) 규제 강함
- 암호자산 옵션: 규제 공백 → 글로벌 서비스 사용 (위험)
- Vault: 자동 관리 서비스 → 수수료 (2-4%) 높음

**출처 & 매핑**:
- GA: "Options & Yield Vaults Deep Dive"
- Dopex Docs: Covered Call strategy
- Yearn Docs: Vault mechanics

---

### Week 3-1: Friday — Hidden Topic
**Lesson ID**: `phase2-m3-fri-hidden-1`
**주제**: "한국 DeFi 선물 규제와 2027 정책 예측"

**숨겨진 주제 목표**:
- 한국 규제 환경의 불확실성
- Perpetual 거래의 법적 지위
- 향후 정책 시나리오 분석

**내용**:
1. **현재 규제 상황 (2024-2025)**:
   - 공식 금지: 없음
   - 비공식 경고: 금융감독원 (2024년)
   - 시행 중: 관찰 단계

2. **한국인의 선물 거래 규모**:
   - Dydx: 한국 사용자 TVL $100-200M 추정
   - Bybit Perpetual: $500M+ (추정)
   - 대부분 개인 수익 미신고

3. **규제 시나리오**:
   - **A안**: 명시 금지 (2025-2026)
     - 당신의 포지션 강제 종료 위험
     - 세금 부과 가능성
   
   - **B안**: 규제 플랫폼만 허가 (일본 모델)
     - 현재의 비규제 플랫폼 이용 제재
     - 한국 거래소만 가능 (시간)
   
   - **C안**: 현상 유지 (확률 낮음)
     - 불명확함 계속

4. **세금 이슈**:
   - 선물 P&L: 사업소득 or 기타소득?
   - 손실: 공제 가능 여부 (2027년 결정)

5. **사례**:
   - 한국인 B: Bybit perpetual $100K 수익 (2024)
   - 세금신고 여부 고민 중 (미신고 위험)

**대비 전략**:
- 글로벌 플랫폼 사용 시 거래 기록 정리
- 규제 뉴스 구독 (금감위)
- 세무사 상담 (선제적)
- 포지션 규모 조절 (A안 시나리오 대비)

**출처**:
- 금융감독원 "암호자산 규제 방향" (2024)
- 한국경제신문: "선물거래 규제 검토" 기사
- Dydx 커뮤니티: 한국 사용자 토론

---

### Week 3-1: Thursday — Action Lab
**Lesson ID**: `phase3-m3-thu-action-1`
**실습 주제**: "DeFi Vault에 자금 예치 및 수익 추적"

**실습 목표**:
- Real vault에 자금 예치 (작은 금액)
- Auto-compounding 메커니즘 관찰
- 수익 및 수수료 계산

**선택**: Yearn (ETH) 또는 Curve Vault (Solana)

**경로 A: Yearn Vault (Ethereum)**

**준비**:
- MetaMask with Ethereum mainnet
- ETH 또는 stETH (staking derivative)
- $100 이상의 자금

**단계**:
1. **Yearn 접속**: https://yearn.finance
2. **Vault 선택**: Lido stETH Vault (안정적, 낮은 위험)
3. **입금**:
   - "Deposit" 클릭
   - stETH 100개 입력
   - 승인 (Approve) → 입금 (Deposit)
   - Vault token (yvstETH) 수령 확인

4. **모니터링** (1주일):
   - 매일 balance 확인
   - APY 변동 추적
   - 관리료 (2%) 확인
   - 실제 수익률 계산

**경로 B: Covered Call Vault (Dopex - Arbitrum)**

**준비**:
- MetaMask with Arbitrum
- 0.1 ETH 이상
- Arbitrum bridge로 이동

**단계**:
1. **Dopex 접속**: https://dopex.io
2. **Covered Call Vault 선택**: May ETH Call Vault
3. **입금**:
   - 0.1 ETH 예치
   - Approve → Deposit
   
4. **모니터링**:
   - 매주 프리미엄 수익 확인
   - "Checkpoint" 시점에 자동 재투자 관찰
   - 실제 APY 계산

**체크리스트**:
- [ ] Vault 선택 및 입금 완료
- [ ] Vault token 수령 확인
- [ ] 초기 balance + APY 기록
- [ ] 1주일 후 수익 확인
- [ ] 수수료 계산 (실제 수익 - 기대 수익)

**제출물**:
- Vault dashboard 스크린샷
- APY 분석 (명시 vs 실제)
- 수익 계산

---

### Week 3-1: Saturday — Quiz
**Lesson ID**: `phase3-m3-sat-quiz-1`
**문제 수**: 30문제
**합격선**: 24/30

**출제 범위**:
- Perpetual futures 메커니즘 (6Q)
- Funding rate 계산 (4Q)
- Options (Call/Put) (6Q)
- Vault 전략 (5Q)
- 한국 규제 (5Q)
- Action Lab (4Q)

**샘플 문제**:
```
Q1: Perpetual futures에서 funding rate가 0.05% / 8시간이라면,
1 ETH long 포지션 (담보 $1000, 2배 레버리지)에서
8시간 동안의 funding fee는 얼마인가?
A) $0.05
B) $0.10
C) $1.00
D) $10

Q2: Call option을 구매했을 때의 최대 손실은?
A) Unlimited
B) 행사가
C) 옵션료 (프리미엄)
D) 현물 가격 차이

Q3: Covered Call Vault의 위험은?
A) 기저자산(ETH) 가격 하락
B) 행사가 위로 올라가면 강제 판매
C) Smart contract exploit
D) 모두 맞음

Q4: 한국에서 Perpetual futures 거래는 현재 (2025년)?
A) 명시적으로 금지됨
B) 규제 공백 (불명확)
C) 공식 허가됨
D) 조건부 허가 (거래소 제한)
```

---

## MODULE 4: DeFi Risk Management & Portfolio Strategy
### 주제: 위험 평가, 포트폴리오 구성, 세금 대비

**학습 목표**:
1. Smart contract risk assessment (코드 감시)
2. Insurance protocol 활용 (Nexus Mutual, etc.)
3. DeFi portfolio 다각화 전략
4. 2027년 세제 변화 대비

**선수 지식**:
- Module 1-3 완료
- Smart contract 기초 (Solidity)

---

### Week 4-1: Monday — "Smart Contract Risk Assessment"
**Lesson ID**: `phase2-m4-mon-1`

**Article 목표**: SC risk 평가 방법론 및 체크리스트 습득

**학습 내용**:
- Audit report 읽기
- Code review 체크리스트 (감시 지점)
- TVL vs Risk trade-off
- 한국의 대표 exploit 사례

**핵심 개념**:
- **Audit**: 전문 회사의 보안 검토 (Trail of Bits, OpenZeppelin 등)
- **Un-audited**: 위험 높음 → APY가 매우 높은 이유
- **재진입 공격 (Reentrancy)**: 가장 흔한 취약점

**Risk 체크리스트**:
```
Protocol에 투자 전 확인 사항:

□ 감사 여부
  - 상위 회사의 감사? (Trail of Bits, OpenZeppelin)
  - 최근? (1년 이내)
  - 심각한 결함 발견? (GitHub 확인)

□ TVL (Total Value Locked)
  - $100M+: 기본 신뢰도
  - $10-100M: 중간 위험
  - $1-10M: 높은 위험
  - <$1M: 매우 높은 위험

□ 운영 팀
  - 알려진 팀? (전 경험)
  - Doxxed (신원 공개)? 또는 Anonymous?
  - 소셜 미디어 활동?

□ 코드
  - GitHub 공개?
  - 최근 업데이트?
  - 커뮤니티 감시? (Discord)

□ 보험
  - Nexus Mutual coverage 가능?
  - 가격은?
```

**한국 사례**:
- **Luna/Terra 붕괴** (2022): UST 알고리즘 안정화 실패
  - 감시 신호: 과도한 APY (20%)
  - 기술적 결함: De-peg 방지 메커니즘 미흡
- **Curve exploit** (2023): reentrancy 공격
  - $50M 손실
  - Vyper 언어 버그였음

**출처 & 매핕**:
- GA: "Smart Contract Risk 101"
- OpenZeppelin: Common Vulnerabilities
- Rekt: DeFi hack database (https://rekt.news)

---

### Week 4-1: Wednesday — "Insurance & Portfolio Diversification"
**Lesson ID**: `phase2-m4-wed-1`

**Article 목표**: Insurance protocol 활용 및 다각화 전략

**학습 내용**:
- Insurance protocol (Nexus Mutual, Uninsured Risk)
- 보험료 vs risk premium 계산
- Portfolio allocation (60-30-10 모델)
- Rebalancing 시기와 방법

**핵심 개념**:
- **Nexus Mutual**: 스마트 컨트랙트 보험
  - Cover 가격: $10,000당 연 $500-2000 (5-20% premium)
  - Payout: Hack 발생 시 최대 100% 보상

**보험 여부 판단**:
```
Position: Yearn Vault에 $5000 예치

Yearn Risk: 낮음 (감사됨, 큰 TVL)
Yearn 보험료: 연 $50-100 (1-2%)

위험도 평가:
- Hack 확률: 1% 이상?
- 손실 액: $5000
- 예상 손실: $5000 × 1% = $50
- 보험료: $100

판단: 보험료 > 예상 손실 (비추천)

---

Position: 신규 DeFi protocol에 $5000 예치 (APY 50%)

위험도: 높음 (미감사, 작은 TVL)
보험료: $500-1000 (10-20%)

위험도 평가:
- Hack 확률: 10-20%?
- 예상 손실: $5000 × 15% = $750
- 보험료: $700

판단: 보험료 ≈ 예상 손실 (경계)
추천: 보험료 + 자금량 축소 (2-3천 달러만)
```

**Portfolio Allocation (예시)**:
```
총 자금: $10,000

안전층 (60%, $6000):
- Aave USDC supply: $4000 (APY 4%)
- Yearn stETH Vault: $2000 (APY 3.5%)

성장층 (30%, $3000):
- Uniswap v3 USDC-USDT LP: $2000 (APY 2%)
- Curve USDC-DAI LP: $1000 (APY 1.5%)

수익층 (10%, $1000):
- Dydx Perpetual (낮은 레버리지): $500 (위험)
- Dopex Call Vault: $500 (프리미엄)

기대 포트폴리오 수익:
- 안전층: 60% × 3.75% = 2.25%
- 성장층: 30% × 1.75% = 0.525%
- 수익층: 10% × ? = 0-20% (변동성)
- 전체: 3-5% APY (균형)
```

**Rebalancing**:
- 분기별 (3개월) 또는 반기별
- 각 layer가 목표 비율(60-30-10)로 돌아갔는지 확인
- 변동성이 높은 투자부터 정리

**출처 & 매핑**:
- GA: "Portfolio Diversification"
- Nexus Mutual Docs: Coverage mechanics
- Balancer: Auto-rebalancing 자동화 옵션

---

### Week 4-1: Friday — Hidden Topic
**Lesson ID**: `phase2-m4-fri-hidden-1`
**주제**: "2027년 한국 암호자산 세제 완전 정리와 개인 전략"

**숨겨진 주제 목표**:
- 2027년 세제 확정 내용 (예상)
- 개인의 세무 전략
- 손실 공제 및 기록 관리

**내용**:
1. **2027년 세제 예상 내용**:
   
   **확정 (가능성 높음)**:
   - 양도소득세 20% (전격 시행)
   - 고액 투자자 (거래액 $100K+): 종합소득세 적용
   - 손실: 공제 불가 (또는 제한적)
   
   **미정 (논쟁 중)**:
   - 이자/배당 소득 분류 (이미 언급한 aave interest)
   - DeFi yield farming 사업소득 인정 여부
   - Loss carryforward (손실 이월 공제)

2. **세무 전략**:
   
   **전략 A: 손실 최소화**
   - Position 크기 조절
   - High-risk 거래 제한
   - IL이 큰 volatile pair 피하기
   
   **전략 B: 기록 관리 (중요)**
   - 모든 거래: Hash, 거래소, 날짜, 금액, 수수료
   - 이자/yield: 매월 정리 (Google Sheet + 블록체인 내보내기)
   - 손실: IL 계산값도 함께 기록
   
   **전략 C: 세금 우호적 구조**
   - 손실: 사업소득 연도에 발생 (공제 가능성)
   - 이자: 따로 분리 (세율 다를 수 있음)
   - 법인 활용 (큰 규모: $100K+)

3. **실제 계산 사례**:
   
   ```
   시나리오: 2027년 세무신고
   
   2024-2026 DeFi 활동:
   - Aave interest 수익: $5000
   - Yield farming fee: $3000
   - Trading (Dydx): +$2000
   - IL 손실: -$4000
   - 부정 손실: -$1000 (liquidation)
   - 총: +$5000
   
   예상 세금 (2027년 적용):
   - 양도소득세 20%: $5000 × 20% = $1000
   - 또는 종합소득세 (더 높을 수 있음): $5000 × 40% = $2000
   - 손실 공제: -$5000 불가 → 0 (최악)
   
   추정 납부: $1000-2000
   
   대비:
   - 2024-2025 기간에 손실 극소화
   - 세무사 상담 (정식, 비용 $500-1000)
   - 법인 설립 검토 (큰 거래량)
   ```

4. **한국 vs 해외 전략**:
   
   **한국**: 세금 높음, 손실 공제 제한
   → 수익 극대화, 위험 최소화 필요
   
   **해외** (미국, 홍콩): 세금 다름
   → 일부 거래를 해외로 분산 (영주권자만)

**출처**:
- 국세청 "2027 암호자산 과세제도" (정식 공지: 2025년 하반기)
- 금융감독원 "DeFi 이자 소득 분류" (미정)
- 법무법인 태평양: "암호자산 세무 A to Z"
- 온체인코리아 독자 제작: "한국인 DeFi 세무 전략"

---

### Week 4-1: Thursday — Action Lab
**Lesson ID**: `phase2-m4-thu-action-1`
**실습 주제**: "기존 DeFi 포지션의 Risk Audit 및 포트폴리오 재구성"

**실습 목표**:
- 현재 DeFi 포지션 진단
- Risk score 계산
- 포트폴리오 리밸런싱 계획 수립

**단계**:

1. **포지션 목록 작성**:
   - 모든 DeFi 위치 나열 (지갑 주소)
   - 각 위치의 $USD 가치
   - 진입 날짜 및 예상 수익률

2. **Risk Audit**:
   
   각 위치마다:
   - Protocol 감사 여부 확인 (https://defisafety.com)
   - TVL 확인 (https://defillama.com)
   - 최근 해킹/버그 여부 확인 (https://rekt.news)
   - Risk score 계산 (1-10 scale)
   
   ```
   예시:
   Position: Aave USDC supply ($2000)
   - Audit: OpenZeppelin (✓)
   - TVL: $10B+ (✓)
   - Recent hack: None (✓)
   - Risk score: 2/10 (매우 안전)
   
   Position: Unknown yield farm ($500)
   - Audit: None (✗)
   - TVL: $5M (△)
   - Recent hack: 3개월 전 (✗)
   - Risk score: 9/10 (매우 위험)
   ```

3. **포트폴리오 재구성**:
   - Risk score 5 이상: 축소 또는 제거
   - Risk score 3-5: 보험 추가
   - Risk score <3: 유지 또는 확대
   - 목표 allocation으로 리밸런스

4. **세무 기록 생성**:
   - 모든 위치의 현재 P&L 계산
   - IL 손실 추정
   - 2027년 세금 추정 계산

**체크리스트**:
- [ ] 모든 DeFi 위치 목록화
- [ ] 각 위치 risk audit 완료
- [ ] 포트폴리오 allocation 재검토
- [ ] 리밸런싱 계획 수립
- [ ] 세무 기록 (Google Sheet 또는 Koinly)

**제출물**:
- Risk audit report (Protocol별)
- 현재 vs 목표 allocation 비교
- 재구성 계획 (Action items)
- 2027년 세금 예상 계산

---

### Week 4-1: Saturday — Final Project & Quiz
**Lesson ID**: `phase2-m4-sat-final-project`

**최종 프로젝트**: Personal DeFi Strategy Document (5-10페이지)

**요구사항**:

1. **현황 분석** (1-2페이지):
   - 현재 자산 규모
   - Risk appetite (보수적/중간/공격적)
   - 투자 기간 (3개월/1년/3년+)
   
2. **목표 설정** (1페이지):
   - 6개월 목표 수익률
   - 허용 가능한 최대 손실 (drawdown)
   - 주요 목표 (수익/학습/경험)

3. **전략 제시** (2-3페이지):
   - 추천 portfolio allocation
   - 각 위치별 protocol 선택 및 이유
   - 리스크 관리 방법 (insurance, diversification)
   - 리밸런싱 일정

4. **세무 계획** (1페이지):
   - 2027년 예상 세금
   - 기록 관리 방법
   - 손실 최소화 전략

5. **모니터링 계획** (1페이지):
   - 주간/월간 리뷰 체크리스트
   - 포지션 조정 기준
   - 비상 상황 대응책

**평가 기준**:
- 분석의 깊이 (40%)
- 리스크 인식 (30%)
- 현실성 (20%)
- 한국 맥락 적용 (10%)

---

### Week 4-1: Saturday — Quiz (동시 진행)
**Lesson ID**: `phase2-m4-sat-quiz-final`
**문제 수**: 30문제
**합격선**: 24/30

**출제 범위**:
- SC risk assessment (6Q)
- Nexus Mutual 보험 (4Q)
- Portfolio allocation (6Q)
- 세무 (8Q)
- 모든 모듈 복습 (6Q)

**샘플 문제**:
```
Q1: Smart contract 감사를 가장 중요하게 하는 이유는?
A) APY가 높다
B) 코드의 보안 결함 여부를 전문가가 검토했음을 뜻함
C) 해킹이 절대 일어나지 않는다
D) 수수료가 싸다

Q2: Nexus Mutual 보험이 필요한 경우는?
A) 모든 DeFi 위치 (너무 비쌈)
B) 감사되지 않은, 높은 위험 위치
C) 큰 금액을 장기 예치할 때
D) B와 C

Q3: Portfolio의 60-30-10 모델에서 10% 수익층의 목적은?
A) 전체 수익의 대부분 생성
B) 높은 위험으로 높은 수익 가능성 추구
C) 안정성 확보
D) 세금 절감

Q4: 2027년 한국 세제에서 DeFi yield farming의 수익은?
A) 완전히 비과세
B) 양도소득세 20% (확정 가능성 높음)
C) 기타소득 (이율 미정)
D) A-C 모두 가능성 있음 (2025년 확정 전)

Q5: IL 손실을 세무 처리하는 방법은?
A) 자본손실로 전액 공제
B) 2027년 이후에만 공제 가능
C) 공제 불가 (현재 규정)
D) 사업소득으로 분류 시 공제 가능
```

---

## APPENDIX: Implementation Notes for Dev Team

### Database Schema
```
Modules:
- phase (2)
- module (1-4)
- week (1)
- lessonType (article, action, hidden, quiz)
- lessonId (phase2-m1-mon-1 등)
- title_kr, title_en
- content_md
- prerequisites []
- learningObjectives []

Articles:
- article_id
- module_id
- day (mon, wed, fri)
- content (markdown)
- keyTerms []
- koreanContext (section)
- sources []

ActionLabs:
- lab_id
- module_id
- platform (aave, raydium, yearn, etc.)
- steps []
- checkpoints []
- screenshots_required []

Quizzes:
- quiz_id
- module_id
- questions[] (객관식, 계산, 시나리오)
- passingScore (24/30)
- unlockCondition (previous module complete)

FinalProject:
- project_id
- requirements[] (5 sections)
- rubric (분석/위험/현실성/맥락)
```

### Content Development Timeline
- **4/17-4/20**: Module 1 content finalize + QA
- **4/21-4/23**: Module 2 content finalize
- **4/24-4/26**: Module 3 content finalize
- **4/27-4/28**: Module 4 + Final Project finalize
- **4/29-4/30**: Full integration + launch testing

### Korean Localization Checklist
- [ ] Technical terms (DeFi, LP, IL) 영문 병기
- [ ] 한국 사례 2건 이상 per module
- [ ] 한글 스크린샷 (UI 번역)
- [ ] 원문 감수 (모국어 검수자)

### Prerequisite Verification
- Phase 1 완료 증명 (Quiz 24/30 이상 all 모듈)
- Module 순차적 unlock (모듈 완료 → 다음 unlock)

### External Resources
- Aave API: https://api.aave.com
- Defillama TVL API: https://api.llama.fi
- Defi Safety Scores: https://defisafety.com/api
- Rekt database: https://rekt.news (manual scrape)

---

## 수료 기준 (Graduation Requirements)

**Phase 2 수료 조건**:
1. 모든 모듈 Quiz 합격 (24/30 이상) → 순차적 unlock
2. Final Project 제출 및 평가 통과 (60점 이상)
3. 모든 Action Lab 완료 (체크리스트 확인)
4. 최소 2주 이상 포트폴리오 모니터링 기록

**Certificate**:
- PDF 발급 (완료 날짜, 총 학습시간)
- OnChain Korea "Phase 2 Graduate" 배지

**다음 단계**:
- Phase 3 (Advanced Trading & Community Projects) 오픈
- 또는 Self-directed learning path

---

## 버전 관리

**v1.0 (2026-04-17)**
- Initial outline + Full content
- 4 Modules complete
- 20 Articles, 4 Action Labs, 4 Hidden Topics
- 120 Quiz questions + Final Project

**예정 업데이트**:
- v1.1 (5월): Student feedback반영, 용어 정확화
- v2.0 (6월): Video content 추가, Interactive simulations

---

**문서 담당자**: OnChain Korea Curriculum Team  
**최종 검토**: 2026-04-17  
**배포 예정일**: 2026-04-30
