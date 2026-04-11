# Curriculum ↔ Greed Academy Mapping

> 2026-03-31 기준 8주 프로그램 운영안.
> GA 29개 소스를 내부 라이브러리로 쓰고, 유저에게는 8주 프로그램으로 재패키징한다.

---

## 운영 구조

- 월: Article 1
- 화: Article 2
- 수: Article 3
- 목: Action Lab
- 금: Hidden Topic
- 토: Weekly Test
- 일: Catch-up

학습 규칙:

- Article 퀴즈: 10문항, 8/10 통과, 무제한 재시도
- Weekly Test: 30문항, 24/30 통과, 무제한 재시도
- 다음 Article: 이전 Article 퀴즈 통과 시 오픈
- 다음 Week: Weekly Test 통과 시 오픈

---

## 소스 풀

- Semester 1: 8개
- Semester 2: 8개
- Tokens: 7개
- DeFi: 6개
- 합계: 29개
- OnChain Korea Original: 1개

커버리지 전략:

- 핵심 코어 소스: 23/29
- optional deep dive: 6/29
- original 한국 특화 소스: 1개

Optional deep dive로 남기는 소스:

- Tokens: TK-3, TK-5, TK-6
- DeFi: DF-2, DF-5, DF-6

---

## 8주 매핑

### Week 1

| Day | Type | Lesson Slot | Source Refs |
|-----|------|-------------|-------------|
| 1 | Article | w1-0 한국 거래소에서 온체인으로 | OK-ORIGINAL |
| 2 | Article | w1-1 지갑이란? | S1-L5 |
| 3 | Article | w1-2 지갑 클라이언트 비교 | S1-L5 |
| 4 | Action Lab | Phantom 설치 + 시드 백업 | a1-1, a1-3 |
| 5 | Hidden Topic | 한국 거래소 vs 해외 DEX | Original |
| 6 | Weekly Test | Week 1 Test | Week 1 범위 |

### Week 2

| Day | Type | Lesson Slot | Source Refs |
|-----|------|-------------|-------------|
| 1 | Article | w1-4 버너 지갑 만들기 | S2-L1 |
| 2 | Article | w1-5 키 관리 & 보안 베스트 프랙티스 | S2-L1, S1-L5 |
| 3 | Article | w2-0 권한 관리, revoke, 피싱 방지 | S2-L1 |
| 4 | Action Lab | 버너 지갑 만들기 | a1-2 |
| 5 | Hidden Topic | 한국 해킹 사례 모음 | Original |
| 6 | Weekly Test | Week 2 Test | Week 2 범위 |

### Week 3

| Day | Type | Lesson Slot | Source Refs |
|-----|------|-------------|-------------|
| 1 | Article | w3-t1 토큰이란 무엇인가 | TK-1, TK-2 |
| 2 | Article | w3-t2 토크노믹스 & 토큰 스탠다드 | TK-4, S2-L2 |
| 3 | Article | w3-t3 나만의 토큰 만들기 | TK-B, S2-L2 |
| 4 | Action Lab | SPL 토큰 민팅 | a3-t1 |
| 5 | Hidden Topic | 한국의 토큰 규제 | Original |
| 6 | Weekly Test | Week 3 Test | Week 3 범위 |

Optional:

- TK-3 Tokens by the Code
- TK-5 A Mutable Token
- TK-6 You can just keep making tokens?

### Week 4

| Day | Type | Lesson Slot | Source Refs |
|-----|------|-------------|-------------|
| 1 | Article | w2-3 DYOR 기초 | S1-L7 |
| 2 | Article | w2-4 DYOR 심화 | S1-L8 |
| 3 | Article | w2-5 Hype & 스캠 분석 | S1-L4 |
| 4 | Action Lab | 의심 프로젝트 리서치 | a2-2 |
| 5 | Hidden Topic | 한국 크립토 사기 사례 | Original |
| 6 | Weekly Test | Week 4 Test | Week 4 범위 |

### Week 5

| Day | Type | Lesson Slot | Source Refs |
|-----|------|-------------|-------------|
| 1 | Article | w2-1 Solscan으로 트랜잭션 읽기 | S2-L6 |
| 2 | Article | w2-2 온체인 활동 추적 | S2-L6 |
| 3 | Article | w4-1 스테이블코인 | S2-L7 |
| 4 | Action Lab | Solscan 추적 + 스테이블코인 전송 | a2-1, a4-1 |
| 5 | Hidden Topic | 왜 한국에서 스테이블코인이 뜨는가 | Original |
| 6 | Weekly Test | Week 5 Test | Week 5 범위 |

### Week 6

| Day | Type | Lesson Slot | Source Refs |
|-----|------|-------------|-------------|
| 1 | Article | w6-d1 DeFi 입문 | S1-L3, DF-1 |
| 2 | Article | w3-1 AMM, 유동성 풀, 수수료 | S2-L4, DF-3 |
| 3 | Article | w3-2 DEX 스왑 이해 | S2-L4, DF-4 |
| 4 | Action Lab | DEX 첫 스왑 | a3-1 |
| 5 | Hidden Topic | 한국 DeFi 현황과 규제 | Original |
| 6 | Weekly Test | Week 6 Test | Week 6 범위 |

Optional:

- DF-2 Another way to look at DeFi
- DF-5 Just another day in DeFi complexity
- DF-6 Just when you thought it was complex enough

### Week 7

| Day | Type | Lesson Slot | Source Refs |
|-----|------|-------------|-------------|
| 1 | Article | w3-4 NFT 이해하기 | S1-L6 |
| 2 | Article | w3-5 Metaplex Core 민팅 | S1-L6, S2-L2 |
| 3 | Article | w7-g1 거버넌스 & DAO | S1-L2, S2-L3 |
| 4 | Action Lab | NFT 민팅 | a3-2 |
| 5 | Hidden Topic | 한국 NFT 시장의 현재와 미래 | Original |
| 6 | Weekly Test | Week 7 Test | Week 7 범위 |

### Week 8

| Day | Type | Lesson Slot | Source Refs |
|-----|------|-------------|-------------|
| 1 | Article | w4-2 브릿지와 크로스체인 | S2-L8 |
| 2 | Article | w4-3 밸리데이터 & 스테이킹 | S1-L1 |
| 3 | Planned Replace | w8-p1 슬롯을 선물거래 이론으로 교체 | S2-L5 |
| 4 | Action Lab | 브릿지 + SOL 스테이킹 | a4-2, a4-3 |
| 5 | Hidden Topic | 미국 정책과 한국 ETF 전망 | Original |
| 6 | Weekly Test | Week 8 Test | Week 8 범위 |

주의:

- 현재 `w8-p1`는 졸업 프로젝트 슬롯이다.
- 최종 운영안에서는 이 슬롯을 `선물거래 이해하기 — 이론 전용` article로 교체한다.
- 실습은 넣지 않는다.

---

## 구현 메모

데이터 레이어:

- `src/data/programBlueprint.js`에 29개 source catalog와 8주 blueprint를 정의
- `src/data/curriculum.js`는 이 blueprint 메타데이터를 lesson/day/sourceRefs에 주입

다음 구현 단계:

1. 진행 잠금 로직을 체크박스에서 `quiz pass` 기반으로 전환
2. article당 10문항 bank, weekly당 30문항 bank 설계
3. `w8-p1` 콘텐츠와 퀴즈를 선물거래 이론 버전으로 교체
4. hidden topic 본문을 8주 전체로 확장
5. 현재 20개인 lesson content를 24개까지 확장
