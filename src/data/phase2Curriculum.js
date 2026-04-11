/**
 * Phase 2: Web3.0 금융상품 이해하기 — 8주 프로그램
 * 기획: MinGoo | 제작: Jason
 * 전제 조건: Phase 1 수료 인증(PoA)
 * 대상: 금융 비전공자 대학생~일반인 (Phase 1 졸업생)
 */

function l(ko, en) {
  return { ko, en }
}

// ── Phase 2 Weeks ──

const phase2Weeks = [
  // ── Week 1: 돈이 일하게 만드는 법 ──
  {
    id: 'p2-1',
    phase: 2,
    weekNumber: 1,
    title: l('돈이 일하게 만드는 법', 'Making Your Money Work'),
    subtitle: l(
      '금융상품 기초 · 은행 vs 스마트 컨트랙트 · 한국 크립토 규제',
      'Financial Product Basics · Banks vs Smart Contracts · Korean Crypto Regulation'
    ),
    lessons: [
      {
        id: 'p2-w1-1',
        title: l(
          '금융상품이란? — 예금, 채권, 주식, 펀드',
          'What Are Financial Products? — Deposits, Bonds, Stocks, Funds'
        ),
        type: 'read',
      },
      {
        id: 'p2-w1-2',
        title: l(
          '은행 vs 스마트 컨트랙트 — 중개인이 사라지면 뭐가 달라질까?',
          'Banks vs Smart Contracts — What Changes When the Middleman Disappears?'
        ),
        type: 'read',
      },
      {
        id: 'p2-w1-3',
        title: l(
          '한국에서 크립토 금융은 합법인가? — VAUPA, 디지털자산기본법, STO',
          'Is Crypto Finance Legal in Korea? — VAUPA, Digital Asset Act, STO'
        ),
        type: 'read',
      },
    ],
    actions: [
      {
        id: 'p2-a1-1',
        title: l(
          '카카오뱅크 적금 금리 vs Aave USDC 수익률 직접 비교해보기',
          'Compare Kakao Bank Savings Rate vs Aave USDC Yield'
        ),
        guideId: 'p2-tradfi-defi-compare',
      },
      {
        id: 'p2-a1-2',
        title: l(
          'TradFi ↔ DeFi 용어 대응표 직접 만들어보기',
          'Create Your Own TradFi ↔ DeFi Terminology Map'
        ),
        guideId: 'p2-terminology-map',
      },
    ],
    hiddenTopic: {
      title: l(
        '한국은행 기준금리와 크립토 — 금리가 오르면 왜 비트코인이 떨어질까?',
        'BOK Base Rate & Crypto — Why Does Bitcoin Drop When Rates Rise?'
      ),
      desc: l(
        '적금 금리가 5%면 굳이 위험한 투자를 안 하잖아요. 금리-크립토 관계를 분석합니다.',
        'When savings rates hit 5%, why take risky bets? Analyzing the rate-crypto relationship.'
      ),
      readTime: l('12분 읽기', '12 min read'),
      action: l('금리 vs 비트코인 차트 분석', 'Rate vs Bitcoin Chart Analysis'),
      forumCount: 0,
    },
    tradfiDefiTable: [
      { tradfi: l('예금 (Deposit)', 'Deposit'), defi: 'Supply', note: l('돈을 맡기고 이자 받기 — 같은 행위, 장소만 다름', 'Earn interest by depositing — same act, different place') },
      { tradfi: l('이자율 (Interest Rate)', 'Interest Rate'), defi: 'APY (Annual Percentage Yield)', note: l('"연 몇 %?" 표현 방식이 다를 뿐', 'Just a different way of saying "annual %"') },
      { tradfi: l('은행/증권사', 'Bank/Brokerage'), defi: 'Protocol', note: l('돈을 관리해주는 주체 — 사람 vs 코드', 'Entity managing money — people vs code') },
      { tradfi: l('예금보험공사 (5천만원 보호)', 'Deposit Insurance'), defi: l('없음 (Audit으로 대체)', 'None (replaced by Audit)'), note: l('DeFi에는 예금자 보호가 없어요. 대신 코드 감사(Audit)로 안전성을 확인', 'No depositor protection in DeFi. Safety verified through code audits') },
    ],
  },

  // ── Week 2: 스테이블코인 심화 ──
  {
    id: 'p2-2',
    phase: 2,
    weekNumber: 2,
    title: l('스테이블코인 심화', 'Stablecoins Deep Dive'),
    subtitle: l(
      'Fiat-backed · Crypto-collateralized · Algorithmic · 이자 수익 · 디페깅',
      'Fiat-backed · Crypto-collateralized · Algorithmic · Yield · Depegging'
    ),
    lessons: [
      {
        id: 'p2-w2-1',
        title: l(
          'Fiat-backed, Crypto-collateralized, Algorithmic — 스테이블코인의 세 가지 유형',
          'Three Types of Stablecoins — Fiat-backed, Crypto-collateralized, Algorithmic'
        ),
        type: 'read',
      },
      {
        id: 'p2-w2-2',
        title: l(
          '스테이블코인으로 이자 벌기 — Aave, Compound에 USDC 공급하기',
          'Earning Yield with Stablecoins — Supplying USDC to Aave & Compound'
        ),
        type: 'read',
      },
      {
        id: 'p2-w2-3',
        title: l(
          '디페깅(Depegging) — 스테이블코인이 1달러를 잃는 순간',
          'Depegging — When Stablecoins Lose Their Dollar Peg'
        ),
        type: 'read',
      },
    ],
    actions: [
      {
        id: 'p2-a2-1',
        title: l(
          'Aave에 USDC 공급해서 이자 받기 (소액 실습)',
          'Supply USDC to Aave and Earn Interest (Small Amount Practice)'
        ),
        guideId: 'p2-aave-supply',
      },
      {
        id: 'p2-a2-2',
        title: l(
          '스테이블코인 디페깅 사건 연표 만들기 — UST, USDC, USDT 역사',
          'Create a Stablecoin Depegging Timeline — UST, USDC, USDT History'
        ),
        guideId: 'p2-depeg-timeline',
      },
    ],
    hiddenTopic: {
      title: l(
        '원화 스테이블코인은 올까? — CBDC vs 민간 스테이블코인',
        'Will a KRW Stablecoin Come? — CBDC vs Private Stablecoins'
      ),
      desc: l(
        '카카오페이 잔액이 블록체인 위에 올라가는 세상이 올 수 있을까?',
        'Could KakaoPay balances live on the blockchain?'
      ),
      readTime: l('10분 읽기', '10 min read'),
      action: l('CBDC 글로벌 현황 조사', 'Research Global CBDC Status'),
      forumCount: 0,
    },
  },

  // ── Week 3: DeFi 렌딩 ──
  {
    id: 'p2-3',
    phase: 2,
    weekNumber: 3,
    title: l('DeFi 렌딩', 'DeFi Lending'),
    subtitle: l(
      '은행 없이 예금하고 대출받기 · LTV · 담보 · 청산',
      'Deposit & Borrow Without Banks · LTV · Collateral · Liquidation'
    ),
    lessons: [
      {
        id: 'p2-w3-1',
        title: l(
          'DeFi Lending이란? — Aave, Compound, Solend',
          'What is DeFi Lending? — Aave, Compound, Solend'
        ),
        type: 'read',
      },
      {
        id: 'p2-w3-2',
        title: l(
          'LTV와 담보대출 — 왜 빌리는 것보다 더 많이 맡겨야 할까?',
          'LTV & Over-collateralization — Why Deposit More Than You Borrow?'
        ),
        type: 'read',
      },
      {
        id: 'p2-w3-3',
        title: l(
          '청산(Liquidation)이란? — 담보가 부족해지면 생기는 일',
          'What is Liquidation? — What Happens When Collateral Falls Short'
        ),
        type: 'read',
      },
    ],
    actions: [
      {
        id: 'p2-a3-1',
        title: l(
          'Aave에 USDC 공급하고 aUSDC 받기 실습',
          'Supply USDC to Aave and Receive aUSDC Practice'
        ),
        guideId: 'p2-aave-supply-atoken',
      },
      {
        id: 'p2-a3-2',
        title: l(
          '소액 담보 대출 후 Health Factor 모니터링 체험',
          'Small Collateral Borrow + Health Factor Monitoring'
        ),
        guideId: 'p2-health-factor',
      },
    ],
    hiddenTopic: {
      title: l(
        'Flash Loan — 담보 없이 수억 원을 빌리는 1초의 마법',
        'Flash Loans — Borrowing Millions in One Second Without Collateral'
      ),
      desc: l(
        '빌리고 → 쓰고 → 갚기를 0.4초 안에 끝내면 담보 없이 무제한 대출이 가능합니다.',
        'Borrow → Use → Repay in 0.4 seconds for unlimited uncollateralized loans.'
      ),
      readTime: l('10분 읽기', '10 min read'),
      action: l('Flash Loan 사례 분석', 'Flash Loan Case Study'),
      forumCount: 0,
    },
    tradfiDefiTable: [
      { tradfi: l('예금 / 적금', 'Savings'), defi: 'Supply', note: l('돈을 맡기고 이자 받기', 'Deposit and earn interest') },
      { tradfi: l('통장 / 예금증서', 'Bankbook / Certificate'), defi: 'aToken (aUSDC 등)', note: l('"돈 맡겼다"는 증표 — 꺼낼 때 이 토큰을 반납', '"Proof of deposit" token — return when withdrawing') },
      { tradfi: l('주택담보대출', 'Mortgage'), defi: 'Borrow (과담보 대출)', note: l('자산을 맡기고 돈 빌리기', 'Deposit asset and borrow money') },
      { tradfi: l('LTV (담보인정비율)', 'LTV'), defi: 'LTV / Health Factor', note: l('담보 대비 빌린 금액 비율', 'Borrowed amount vs collateral ratio') },
      { tradfi: l('경매 / 강제매도', 'Foreclosure'), defi: 'Liquidation', note: l('담보 부족 → 강제로 팔림', 'Insufficient collateral → forced sale') },
      { tradfi: l('마진콜', 'Margin Call'), defi: 'Health Factor 알림', note: l('"담보 더 넣으세요" 경고 (DeFi는 별도 설정 필요)', '"Add more collateral" warning') },
    ],
  },

  // ── Week 4: 유동성 공급(LP) + 중간 이그잼 ──
  {
    id: 'p2-4',
    phase: 2,
    weekNumber: 4,
    title: l('유동성 공급(LP)', 'Liquidity Providing (LP)'),
    subtitle: l(
      'AMM · 유동성 풀 · Impermanent Loss · 중간 이그잼',
      'AMM · Liquidity Pools · Impermanent Loss · Midterm Exam'
    ),
    hasMidtermExam: true,
    lessons: [
      {
        id: 'p2-w4-1',
        title: l(
          'Liquidity Providing이란? — AMM과 유동성 풀',
          'What is Liquidity Providing? — AMM & Liquidity Pools'
        ),
        type: 'read',
      },
      {
        id: 'p2-w4-2',
        title: l(
          'Impermanent Loss(비영구적 손실) — LP의 가장 큰 리스크',
          'Impermanent Loss — The Biggest Risk of Being an LP'
        ),
        type: 'read',
      },
      {
        id: 'p2-w4-3',
        title: l(
          '풀 선택 가이드 — 어디에 유동성을 넣을까?',
          'Pool Selection Guide — Where Should You Provide Liquidity?'
        ),
        type: 'read',
      },
    ],
    actions: [
      {
        id: 'p2-a4-1',
        title: l(
          'Orca에서 USDC-USDT 스테이블 페어 LP 실습',
          'USDC-USDT Stable Pair LP on Orca'
        ),
        guideId: 'p2-orca-lp',
      },
      {
        id: 'p2-a4-2',
        title: l(
          'DeFiLlama에서 수익률 상위 풀 분석 리포트 작성',
          'Write Top Yield Pool Analysis Report on DeFiLlama'
        ),
        guideId: 'p2-defillama-analysis',
      },
    ],
    hiddenTopic: {
      title: l(
        'DEX Wars — Uniswap vs Jupiter vs Curve',
        'DEX Wars — Uniswap vs Jupiter vs Curve'
      ),
      desc: l(
        '쿠팡/네이버쇼핑/당근마켓이 각각 다른 전략으로 경쟁하듯, DEX도 각자 강점이 다릅니다.',
        'Just like Coupang/Naver Shopping/Danggeun compete with different strategies, DEXs have different strengths.'
      ),
      readTime: l('12분 읽기', '12 min read'),
      action: l('DEX 3곳 비교 분석', 'Compare 3 DEX Platforms'),
      forumCount: 0,
    },
  },

  // ── Week 5: Yield Farming ──
  {
    id: 'p2-5',
    phase: 2,
    weekNumber: 5,
    title: l('Yield Farming', 'Yield Farming'),
    subtitle: l(
      '수익 극대화의 기술과 함정 · APR vs APY · 러그풀',
      'Maximizing Returns & Its Traps · APR vs APY · Rug Pulls'
    ),
    lessons: [
      {
        id: 'p2-w5-1',
        title: l(
          'Yield Farming이란? — 프로토콜이 보상을 주는 이유',
          'What is Yield Farming? — Why Protocols Pay You Rewards'
        ),
        type: 'read',
      },
      {
        id: 'p2-w5-2',
        title: l(
          'APR vs APY — 수익률 표기에 속지 않는 법',
          'APR vs APY — Reading Yield Numbers Correctly'
        ),
        type: 'read',
      },
      {
        id: 'p2-w5-3',
        title: l(
          'Yield Farming 리스크 — "연 1000%" 프로젝트를 의심해야 하는 이유',
          'Yield Farming Risks — Why 1000% APY Is a Red Flag'
        ),
        type: 'security',
      },
    ],
    actions: [
      {
        id: 'p2-a5-1',
        title: l(
          'DYOR 체크리스트로 실제 Yield Farm 3개 평가해보기',
          'Evaluate 3 Real Yield Farms Using DYOR Checklist'
        ),
        guideId: 'p2-yield-farm-dyor',
      },
      {
        id: 'p2-a5-2',
        title: l(
          'APR → APY 변환 + 가스비 차감 = 실질 수익 직접 계산하기',
          'APR → APY Conversion + Gas Fees = Calculate Real Yield'
        ),
        guideId: 'p2-real-yield-calc',
      },
    ],
    hiddenTopic: {
      title: l(
        '솔라나 DeFi 생태계 분석 — Jupiter, Raydium, Orca, Marinade, Jito',
        'Solana DeFi Ecosystem — Jupiter, Raydium, Orca, Marinade, Jito'
      ),
      desc: l(
        '이더리움 DeFi가 "강남 금융가"라면, 솔라나 DeFi는 "판교 테크 허브"',
        'If Ethereum DeFi is "Gangnam finance district", Solana DeFi is "Pangyo tech hub"'
      ),
      readTime: l('12분 읽기', '12 min read'),
      action: l('솔라나 DeFi TVL 분석', 'Analyze Solana DeFi TVL'),
      forumCount: 0,
    },
  },

  // ── Week 6: Liquid Staking & Restaking ──
  {
    id: 'p2-6',
    phase: 2,
    weekNumber: 6,
    title: l('Liquid Staking & Restaking', 'Liquid Staking & Restaking'),
    subtitle: l(
      '명목 vs 실질 수익률 · LST(mSOL, stETH) · EigenLayer · Restaking',
      'Nominal vs Real Yield · LST (mSOL, stETH) · EigenLayer · Restaking'
    ),
    lessons: [
      {
        id: 'p2-w6-1',
        title: l(
          'Staking 수익의 진실 — 명목 APY vs 실질 수익률',
          'Staking Yield Truth — Nominal APY vs Real Returns'
        ),
        type: 'read',
      },
      {
        id: 'p2-w6-2',
        title: l(
          'Liquid Staking — Lido(stETH), Marinade(mSOL), Jito(JitoSOL)',
          'Liquid Staking — Lido (stETH), Marinade (mSOL), Jito (JitoSOL)'
        ),
        type: 'read',
      },
      {
        id: 'p2-w6-3',
        title: l(
          'Restaking — EigenLayer와 겹겹이 쌓이는 수익',
          'Restaking — EigenLayer and Layered Yield'
        ),
        type: 'read',
      },
    ],
    actions: [
      {
        id: 'p2-a6-1',
        title: l(
          'Marinade에서 SOL → mSOL Liquid Staking 실습',
          'SOL → mSOL Liquid Staking on Marinade'
        ),
        guideId: 'p2-marinade-liquid-staking',
      },
      {
        id: 'p2-a6-2',
        title: l(
          'mSOL을 렌딩 프로토콜에 담보로 활용해보기',
          'Use mSOL as Collateral in a Lending Protocol'
        ),
        guideId: 'p2-msol-collateral',
      },
    ],
    hiddenTopic: {
      title: l(
        'Restaking Wars — EigenLayer vs Symbiotic vs Solayer',
        'Restaking Wars — EigenLayer vs Symbiotic vs Solayer'
      ),
      desc: l(
        '하나의 담보로 여러 보험에 가입하는 것처럼, 리스테이킹은 하나의 ETH/SOL로 여러 서비스에 보안을 제공합니다.',
        'Like insuring one asset multiple times, restaking secures multiple services with one ETH/SOL.'
      ),
      readTime: l('12분 읽기', '12 min read'),
      action: l('Restaking 프로토콜 비교', 'Compare Restaking Protocols'),
      forumCount: 0,
    },
    tradfiDefiTable: [
      { tradfi: l('정기예금 (만기까지 묶임)', 'Fixed Deposit'), defi: 'Staking (Unbonding 대기)', note: l('돈 넣고 기다려야 이자 받기', 'Lock money, wait to earn interest') },
      { tradfi: l('양도성 예금증서 (CD)', 'Certificate of Deposit'), defi: 'Liquid Staking Token (mSOL, stETH)', note: l('"묶인 돈"을 토큰화해서 유동적으로', 'Tokenize locked funds for liquidity') },
      { tradfi: l('재담보 (Rehypothecation)', 'Rehypothecation'), defi: 'Restaking (EigenLayer 등)', note: l('한 담보를 여러 곳에 동시 사용', 'Use one collateral across multiple services') },
      { tradfi: l('명목금리 vs 실질금리', 'Nominal vs Real Rate'), defi: l('명목 APY vs 실질 APY', 'Nominal vs Real APY'), note: l('인플레이션 빼야 진짜 수익', 'Subtract inflation for real yield') },
    ],
  },

  // ── Week 7: RWA ──
  {
    id: 'p2-7',
    phase: 2,
    weekNumber: 7,
    title: l('RWA (Real World Assets)', 'RWA (Real World Assets)'),
    subtitle: l(
      '토큰화 원리 · 미국 국채 토큰 · 한국 STO',
      'Tokenization · US Treasury Tokens · Korean STO'
    ),
    lessons: [
      {
        id: 'p2-w7-1',
        title: l(
          'RWA(Real World Assets)란? — 토큰화의 원리',
          'What is RWA? — The Principle of Tokenization'
        ),
        type: 'read',
      },
      {
        id: 'p2-w7-2',
        title: l(
          '토큰화 미국 국채 — Ondo Finance, BlackRock BUIDL',
          'Tokenized US Treasuries — Ondo Finance, BlackRock BUIDL'
        ),
        type: 'read',
      },
      {
        id: 'p2-w7-3',
        title: l(
          '한국 STO(Security Token Offering) — 토큰증권의 현재와 미래',
          'Korean STO — Present and Future of Security Tokens'
        ),
        type: 'read',
      },
    ],
    actions: [
      {
        id: 'p2-a7-1',
        title: l(
          'Ondo Finance OUSG 구조 분석 — "블록체인 위 미국 국채" 리포트',
          'Ondo Finance OUSG Analysis — "US Treasuries on Blockchain" Report'
        ),
        guideId: 'p2-ousg-analysis',
      },
      {
        id: 'p2-a7-2',
        title: l(
          '한국 조각투자/STO 플랫폼 3개 비교 리포트',
          'Compare 3 Korean Fractional Investment/STO Platforms'
        ),
        guideId: 'p2-sto-compare',
      },
    ],
    hiddenTopic: {
      title: l(
        '한국 부동산 토큰화의 현실 — 조각투자 vs STO',
        'Korean Real Estate Tokenization — Fractional vs STO'
      ),
      desc: l(
        '아파트 청약 당첨 확률이 300:1인 세상에서, 건물 "1/10,000 조각"이라도 가질 수 있다면?',
        'In a world where apartment lottery odds are 300:1, what if you could own 1/10,000 of a building?'
      ),
      readTime: l('12분 읽기', '12 min read'),
      action: l('조각투자 플랫폼 체험', 'Try a Fractional Investment Platform'),
      forumCount: 0,
    },
  },

  // ── Week 8: DeFi 포트폴리오 설계 + 기말 ──
  {
    id: 'p2-8',
    phase: 2,
    weekNumber: 8,
    title: l('DeFi 포트폴리오 설계', 'DeFi Portfolio Design'),
    subtitle: l(
      'DeFi × TradFi 융합 · 성향별 전략 · Phase 3 프리뷰 · 기말 이그잼',
      'DeFi × TradFi Convergence · Strategy by Profile · Phase 3 Preview · Final Exam'
    ),
    hasFinalExam: true,
    lessons: [
      {
        id: 'p2-w8-1',
        title: l(
          'DeFi × TradFi 융합 — 기관이 DeFi에 들어오는 이유',
          'DeFi × TradFi Convergence — Why Institutions Are Entering DeFi'
        ),
        type: 'read',
      },
      {
        id: 'p2-w8-2',
        title: l(
          '나만의 DeFi 포트폴리오 설계 — 성향별 전략',
          'Design Your DeFi Portfolio — Strategy by Risk Profile'
        ),
        type: 'read',
      },
      {
        id: 'p2-w8-3',
        title: l(
          'Phase 2 졸업 — Phase 3 투자/트레이딩 프리뷰',
          'Phase 2 Graduation — Phase 3 Trading Preview'
        ),
        type: 'read',
      },
    ],
    actions: [
      {
        id: 'p2-a8-1',
        title: l(
          '나만의 DeFi 포트폴리오 설계서 — 성향 파악 + 자산 배분 + 예상 수익률',
          'My DeFi Portfolio Plan — Risk Profile + Allocation + Expected Yield'
        ),
        guideId: 'p2-portfolio-design',
      },
      {
        id: 'p2-a8-2',
        title: l(
          'DeBank/Zapper로 내 DeFi 포지션 전체 점검하기',
          'Review All DeFi Positions with DeBank/Zapper'
        ),
        guideId: 'p2-debank-review',
      },
    ],
    hiddenTopic: {
      title: l(
        '2027 크립토 과세 시대 — 한국 투자자가 알아야 할 것',
        '2027 Crypto Tax Era — What Korean Investors Need to Know'
      ),
      desc: l(
        '부동산을 팔면 양도소득세 내듯, 크립토를 팔아서 이익이 나면 세금을 내야 하는 시대가 옵니다.',
        'Just like capital gains tax on real estate, crypto profits will be taxed.'
      ),
      readTime: l('12분 읽기', '12 min read'),
      action: l('과세 시뮬레이션', 'Tax Simulation'),
      forumCount: 0,
    },
  },
]

// ── Phase 2 Action Guides ──

export const phase2ActionGuides = [
  {
    weekId: 'p2-1',
    id: 'p2-tradfi-defi-compare',
    actionId: 'p2-a1-1',
    title: l('카카오뱅크 적금 금리 vs Aave USDC 수익률 비교', 'Kakao Bank Savings vs Aave USDC Yield Comparison'),
    subtitle: l('약 15분 · 초급', '~15 min · Beginner'),
    icon: 'bar-chart-2',
    description: l(
      'TradFi와 DeFi의 수익률을 직접 비교해봅니다. 같은 "돈을 맡기고 이자 받기"인데 어떤 차이가 있는지 체감해보세요.',
      'Compare TradFi and DeFi yields directly. Feel the difference in "deposit and earn interest" across both worlds.'
    ),
    steps: [
      { text: l('카카오뱅크 앱에서 현재 적금 금리를 확인하세요', 'Check current savings rates on Kakao Bank app'), note: l('보통 연 3~4% 범위입니다', 'Usually around 3-4% annually') },
      { text: l('Aave 앱(app.aave.com)에 접속하세요', 'Visit Aave app (app.aave.com)'), link: 'https://app.aave.com', note: l('지갑 연결 없이 수익률만 확인 가능합니다', 'You can view yields without connecting a wallet') },
      { text: l('USDC의 Supply APY를 확인하세요', 'Check the USDC Supply APY'), note: l('시장 상황에 따라 연 3~8% 변동합니다', 'Varies 3-8% annually depending on market') },
      { text: l('두 수익률을 표로 비교하고 장단점을 정리하세요', 'Compare both yields in a table and note pros/cons'), note: l('예금자보호 유무, 접근성, 리스크 등을 비교해보세요', 'Compare deposit insurance, accessibility, risks, etc.') },
    ],
    safetyTips: {
      ko: ['이 실습은 관찰 위주입니다. 실제 자금을 넣을 필요 없습니다.', 'DeFi 수익률은 변동성이 크므로 특정 시점의 스냅샷임을 기억하세요.'],
      en: ['This exercise is observation-based. No need to deposit actual funds.', 'DeFi yields are volatile — remember this is a snapshot in time.'],
    },
  },
  {
    weekId: 'p2-1',
    id: 'p2-terminology-map',
    actionId: 'p2-a1-2',
    title: l('TradFi ↔ DeFi 용어 대응표 만들기', 'Create TradFi ↔ DeFi Terminology Map'),
    subtitle: l('약 10분 · 초급', '~10 min · Beginner'),
    icon: 'book-open',
    description: l(
      '전통 금융 용어와 DeFi 용어를 1:1로 매핑하는 나만의 사전을 만듭니다. Phase 2 전체 학습의 기초가 됩니다.',
      'Create your own dictionary mapping traditional finance terms to DeFi terms 1:1. This becomes the foundation for all Phase 2 learning.'
    ),
    steps: [
      { text: l('노트 앱이나 종이를 준비하세요', 'Prepare a notes app or paper'), note: l('구글 시트나 노션도 좋습니다', 'Google Sheets or Notion work well too') },
      { text: l('Week 1 레슨에서 배운 TradFi ↔ DeFi 대응 4쌍을 적으세요', 'Write down the 4 TradFi ↔ DeFi pairs from Week 1 lessons'), note: l('예금↔Supply, 이자율↔APY, 은행↔Protocol, 예금보험↔Audit', 'e.g. Deposit↔Supply, Interest Rate↔APY, Bank↔Protocol, Insurance↔Audit') },
      { text: l('각 쌍에 "쉽게 말하면~" 설명을 본인 말로 적어보세요', 'Add your own "in simple terms~" explanation for each pair'), note: l('본인이 이해한 대로 적는 것이 가장 좋습니다', 'Writing in your own words works best') },
      { text: l('매주 새로운 대응 쌍을 추가하면서 사전을 키워가세요', 'Add new pairs weekly as you learn, growing your dictionary'), note: l('Week 8까지 약 25개 이상의 대응표가 완성됩니다', 'By Week 8 you\'ll have 25+ mappings') },
    ],
    safetyTips: {
      ko: ['이 대응표는 Phase 2 전체에서 계속 사용됩니다. 잘 보관하세요.'],
      en: ['This mapping table will be used throughout all of Phase 2. Keep it safe.'],
    },
  },
  {
    weekId: 'p2-2',
    id: 'p2-aave-supply',
    actionId: 'p2-a2-1',
    title: l('Aave에 USDC 공급해서 이자 받기', 'Supply USDC to Aave and Earn Interest'),
    subtitle: l('약 15분 · 중급 · 소액 실습', '~15 min · Intermediate · Small Amount'),
    icon: 'piggy-bank',
    description: l(
      'DeFi 렌딩 프로토콜에 직접 자산을 공급하고 이자 수익을 체험합니다. "디지털 적금"의 첫 경험입니다.',
      'Supply assets to a DeFi lending protocol and experience earning yield. Your first "digital savings" experience.'
    ),
    steps: [
      { text: l('지갑에 소액 USDC를 준비하세요 (5~10 USDC 권장)', 'Prepare a small amount of USDC in your wallet (5-10 USDC recommended)'), note: l('처음에는 잃어도 괜찮은 금액으로 시작하세요', 'Start with an amount you can afford to lose') },
      { text: l('Aave 앱(app.aave.com)에 접속 → 지갑 연결', 'Visit Aave app (app.aave.com) → Connect wallet'), link: 'https://app.aave.com', note: l('네트워크를 확인하세요 (Ethereum, Polygon, Arbitrum 등)', 'Check your network (Ethereum, Polygon, Arbitrum, etc.)') },
      { text: l('USDC → Supply 클릭 → 금액 입력 → 트랜잭션 승인', 'USDC → Supply → Enter amount → Approve transaction'), note: l('첫 Supply 시 Approve + Supply 2번의 트랜잭션이 필요합니다', 'First time requires 2 transactions: Approve + Supply') },
      { text: l('aUSDC가 지갑에 들어온 것을 확인하세요', 'Verify aUSDC has appeared in your wallet'), note: l('aUSDC = "돈 맡겼다"는 증표. 이자가 실시간으로 쌓입니다', 'aUSDC = proof of deposit. Interest accrues in real-time') },
      { text: l('24시간 후 잔액 변화를 확인하세요', 'Check balance change after 24 hours'), note: l('소액이라 변화가 작지만, 복리로 쌓이는 구조를 확인할 수 있습니다', 'Small change with small amounts, but you can verify the compounding structure') },
    ],
    safetyTips: {
      ko: [
        '반드시 공식 URL(app.aave.com)인지 확인하세요. 피싱 사이트가 많습니다.',
        '처음에는 5~10 USDC 이하의 소액으로만 실습하세요.',
        '가스비(네트워크 수수료)가 별도로 발생합니다. Polygon이나 Arbitrum이 가스비가 저렴합니다.',
        '출금(Withdraw)은 언제든 가능합니다 — 정기예금과 달리 잠금 기간이 없습니다.',
      ],
      en: [
        'Always verify the official URL (app.aave.com). Many phishing sites exist.',
        'Practice with 5-10 USDC or less initially.',
        'Gas fees apply separately. Polygon or Arbitrum have lower gas fees.',
        'Withdraw anytime — no lock-up period unlike fixed deposits.',
      ],
    },
  },
  {
    weekId: 'p2-2',
    id: 'p2-depeg-timeline',
    actionId: 'p2-a2-2',
    title: l('스테이블코인 디페깅 사건 연표', 'Stablecoin Depegging Event Timeline'),
    subtitle: l('약 15분 · 초급 · 리서치', '~15 min · Beginner · Research'),
    icon: 'calendar',
    description: l(
      '주요 스테이블코인 디페깅 사건을 시간순으로 정리하고, 각 사건의 원인과 결과를 분석합니다.',
      'Organize major stablecoin depegging events chronologically and analyze causes and effects.'
    ),
    steps: [
      { text: l('노트 앱에 시간순 표를 만드세요 (날짜 | 스테이블코인 | 최저가 | 원인 | 결과)', 'Create a chronological table (Date | Stablecoin | Lowest Price | Cause | Result)'), note: l('최소 3개 사건을 포함하세요', 'Include at least 3 events') },
      { text: l('2022년 5월 UST 붕괴 사건을 조사하세요', 'Research the May 2022 UST collapse'), note: l('알고리즘 스테이블코인이 왜 실패했는지가 핵심', 'Key question: why algorithmic stablecoins failed') },
      { text: l('2023년 3월 SVB 파산 → USDC 디페깅 사건을 조사하세요', 'Research the March 2023 SVB bankruptcy → USDC depegging'), note: l('Fiat-backed도 은행 리스크가 있다는 교훈', 'Lesson: even fiat-backed coins carry bank risk') },
      { text: l('각 사건의 공통점과 차이점을 정리하세요', 'Summarize commonalities and differences across events'), note: l('공통점: 신뢰 상실 → 대량 매도 → 가격 이탈', 'Common: loss of trust → mass sell-off → price deviation') },
    ],
    safetyTips: {
      ko: ['이 실습은 리서치 위주입니다. 자금이 필요 없습니다.'],
      en: ['This exercise is research-based. No funds needed.'],
    },
  },
  {
    weekId: 'p2-3',
    id: 'p2-aave-supply-atoken',
    actionId: 'p2-a3-1',
    title: l('Aave에 USDC 공급하고 aUSDC 받기', 'Supply USDC to Aave and Receive aUSDC'),
    subtitle: l('약 10분 · 중급', '~10 min · Intermediate'),
    icon: 'arrow-down-to-line',
    description: l(
      'Week 2에서 Supply를 경험했다면, 이번에는 aToken의 의미와 활용을 더 깊이 이해합니다.',
      'Building on Week 2\'s Supply experience, understand aTokens and their uses more deeply.'
    ),
    steps: [
      { text: l('Aave 대시보드에서 내 Supply 포지션 확인', 'Check your Supply position on Aave dashboard'), link: 'https://app.aave.com', note: l('Week 2에서 공급한 USDC가 있다면 이어서 진행', 'Continue from Week 2 supply if you have one') },
      { text: l('aUSDC 잔액이 Supply 금액보다 미세하게 증가한 것을 확인', 'Verify aUSDC balance has slightly increased over your original supply'), note: l('이자가 자동으로 aToken 잔액에 반영됩니다', 'Interest automatically reflects in aToken balance') },
      { text: l('Solscan/Etherscan에서 aUSDC 컨트랙트를 조회해보세요', 'Look up the aUSDC contract on Solscan/Etherscan'), note: l('aToken이 실제 블록체인 위의 토큰임을 확인', 'Verify that aToken is an actual on-chain token') },
    ],
    safetyTips: {
      ko: ['Week 2 실습을 먼저 완료한 후 진행하세요.', '추가 자금이 필요하지 않습니다 — 기존 포지션으로 진행합니다.'],
      en: ['Complete Week 2 exercise first.', 'No additional funds needed — use your existing position.'],
    },
  },
  {
    weekId: 'p2-3',
    id: 'p2-health-factor',
    actionId: 'p2-a3-2',
    title: l('소액 담보 대출 + Health Factor 모니터링', 'Small Collateral Borrow + Health Factor Monitoring'),
    subtitle: l('약 15분 · 중급 · 소액 실습', '~15 min · Intermediate · Small Amount'),
    icon: 'heart-pulse',
    description: l(
      'DeFi에서 과담보 대출을 직접 해보고 Health Factor의 의미를 체험합니다. "마진콜"이 DeFi에서는 어떻게 작동하는지 느껴보세요.',
      'Experience over-collateralized borrowing in DeFi and understand Health Factor. Feel how "margin calls" work in DeFi.'
    ),
    steps: [
      { text: l('Aave에서 담보 자산(ETH 또는 SOL)을 Supply하세요', 'Supply collateral asset (ETH or SOL) on Aave'), note: l('최소 $20 이상의 담보가 필요합니다', 'Minimum ~$20 collateral needed') },
      { text: l('Borrow 탭에서 USDC를 소액(담보의 30% 이내) 빌리세요', 'Borrow a small amount of USDC (within 30% of collateral) from Borrow tab'), note: l('LTV를 낮게 유지하세요. 청산 위험을 줄이기 위해', 'Keep LTV low to reduce liquidation risk') },
      { text: l('대시보드에서 Health Factor를 확인하세요', 'Check Health Factor on dashboard'), note: l('Health Factor > 2.0이면 안전, < 1.0이면 청산 위험', 'Health Factor > 2.0 is safe, < 1.0 means liquidation risk') },
      { text: l('24시간 후 Health Factor 변화를 관찰하세요', 'Observe Health Factor changes after 24 hours'), note: l('담보 자산 가격 변동에 따라 Health Factor가 움직입니다', 'Health Factor moves with collateral price changes') },
      { text: l('실습이 끝나면 빌린 USDC를 Repay하고 담보를 Withdraw하세요', 'After exercise, Repay borrowed USDC and Withdraw collateral'), note: l('청산 리스크를 피하기 위해 실습 후 포지션을 정리하세요', 'Close position after exercise to avoid liquidation risk') },
    ],
    safetyTips: {
      ko: [
        '이 실습은 교육 목적입니다. 빌린 후 반드시 상환하세요.',
        'Health Factor가 1.5 이하로 떨어지면 즉시 추가 담보를 넣거나 상환하세요.',
        'DeFi 대출은 은행과 달리 경고 없이 청산될 수 있습니다.',
        '실습에는 가스비가 발생합니다 (Repay 시에도).',
      ],
      en: [
        'This is for educational purposes. Always repay after borrowing.',
        'If Health Factor drops below 1.5, immediately add collateral or repay.',
        'DeFi loans can be liquidated without warning, unlike banks.',
        'Gas fees apply for this exercise (including Repay).',
      ],
    },
  },
  {
    weekId: 'p2-4',
    id: 'p2-orca-lp',
    actionId: 'p2-a4-1',
    title: l('Orca에서 USDC-USDT 스테이블 페어 LP', 'USDC-USDT Stable Pair LP on Orca'),
    subtitle: l('약 15분 · 중급 · 소액 실습', '~15 min · Intermediate · Small Amount'),
    icon: 'waves',
    description: l(
      '가장 리스크가 낮은 LP를 직접 경험합니다. 스테이블코인 페어는 Impermanent Loss가 거의 없어 첫 LP 실습에 이상적입니다.',
      'Experience the lowest-risk LP firsthand. Stablecoin pairs have near-zero Impermanent Loss, ideal for first LP practice.'
    ),
    steps: [
      { text: l('Orca 앱(orca.so)에 접속 → 지갑 연결', 'Visit Orca app (orca.so) → Connect wallet'), link: 'https://www.orca.so', note: l('Solana 지갑(Phantom)을 연결하세요', 'Connect your Solana wallet (Phantom)') },
      { text: l('Pools 탭 → USDC-USDT 풀을 검색하세요', 'Pools tab → Search for USDC-USDT pool'), note: l('TVL과 APY를 확인하세요', 'Check TVL and APY') },
      { text: l('소액(5 USDC + 5 USDT)으로 유동성을 추가하세요', 'Add liquidity with small amount (5 USDC + 5 USDT)'), note: l('Full Range로 설정하세요 (Concentrated는 다음에)', 'Use Full Range (Concentrated later)') },
      { text: l('LP 토큰이 지갑에 들어온 것을 확인하세요', 'Verify LP tokens have appeared in your wallet'), note: l('이 토큰이 "환전소 지분증"과 같습니다', 'These tokens are like "exchange booth share certificates"') },
      { text: l('24시간 후 수수료 수익을 확인하세요', 'Check fee earnings after 24 hours'), note: l('소액이라 수익은 작지만 구조를 이해하는 것이 목표', 'Small earnings with small amounts, but understanding the structure is the goal') },
    ],
    safetyTips: {
      ko: [
        '스테이블 페어 LP는 IL 리스크가 매우 낮지만, 스마트 컨트랙트 리스크는 있습니다.',
        '실습 후 유동성을 제거(Remove)할 수 있습니다.',
        '공식 Orca URL인지 반드시 확인하세요.',
      ],
      en: [
        'Stable pair LP has very low IL risk, but smart contract risk exists.',
        'You can Remove liquidity after the exercise.',
        'Always verify the official Orca URL.',
      ],
    },
  },
  {
    weekId: 'p2-4',
    id: 'p2-defillama-analysis',
    actionId: 'p2-a4-2',
    title: l('DeFiLlama 수익률 분석 리포트', 'DeFiLlama Yield Analysis Report'),
    subtitle: l('약 15분 · 초급 · 리서치', '~15 min · Beginner · Research'),
    icon: 'search',
    description: l(
      'DeFiLlama에서 실제 풀 데이터를 분석하고 LP 풀 선택 기준을 실전으로 익힙니다.',
      'Analyze real pool data on DeFiLlama and learn LP pool selection criteria in practice.'
    ),
    steps: [
      { text: l('DeFiLlama Yields 페이지(defillama.com/yields)에 접속', 'Visit DeFiLlama Yields page (defillama.com/yields)'), link: 'https://defillama.com/yields', note: l('지갑 연결 불필요 — 데이터 조회 사이트입니다', 'No wallet needed — this is a data site') },
      { text: l('Solana 체인 필터 → Stablecoin 풀만 보기', 'Filter by Solana chain → Stablecoin pools only'), note: l('TVL 순으로 정렬하세요', 'Sort by TVL') },
      { text: l('상위 5개 풀의 APY, TVL, 프로토콜을 표로 정리', 'Create a table of top 5 pools: APY, TVL, Protocol'), note: l('APY 숫자만 보지 말고 TVL 규모도 중요합니다', 'Don\'t just look at APY — TVL size matters too') },
      { text: l('각 풀의 장단점을 분석하세요', 'Analyze pros and cons of each pool'), note: l('TVL 높음 = 안정적, APY 높음 = 리스크 가능성', 'High TVL = stable, High APY = possible risk') },
    ],
    safetyTips: {
      ko: ['리서치 실습입니다. 자금이 필요 없습니다.', 'DeFiLlama는 데이터 집계 사이트입니다 — 지갑 연결 요청이 오면 피싱입니다.'],
      en: ['Research exercise. No funds needed.', 'DeFiLlama is a data aggregator — if asked to connect wallet, it\'s phishing.'],
    },
  },
  {
    weekId: 'p2-5',
    id: 'p2-yield-farm-dyor',
    actionId: 'p2-a5-1',
    title: l('DYOR 체크리스트로 Yield Farm 평가', 'Evaluate Yield Farms with DYOR Checklist'),
    subtitle: l('약 20분 · 중급 · 리서치', '~20 min · Intermediate · Research'),
    icon: 'clipboard-check',
    description: l(
      'Phase 1에서 배운 DYOR 기술을 Yield Farming에 적용합니다. "연 1000%" 프로젝트를 냉정하게 평가하는 연습입니다.',
      'Apply DYOR skills from Phase 1 to Yield Farming. Practice evaluating "1000% APY" projects critically.'
    ),
    steps: [
      { text: l('DeFiLlama에서 APY 상위 3개 Yield Farm을 선택', 'Select top 3 Yield Farms by APY on DeFiLlama'), link: 'https://defillama.com/yields', note: l('의도적으로 APY가 비정상적으로 높은 것도 포함하세요', 'Intentionally include some with abnormally high APY') },
      { text: l('5가지 체크리스트 적용: ① Audit ② TVL ③ 토큰 발행 스케줄 ④ 팀 공개 ⑤ 수익 원천', 'Apply 5-point checklist: ① Audit ② TVL ③ Token emission ④ Team transparency ⑤ Revenue source'), note: l('각 항목을 ✅/❌로 평가하세요', 'Rate each item ✅/❌') },
      { text: l('각 Farm에 대해 "투자하겠다/안 하겠다" 결론을 내리세요', 'Conclude "Would invest / Would not invest" for each Farm'), note: l('이유를 반드시 적으세요 — 결론보다 근거가 중요합니다', 'Always write reasons — evidence matters more than conclusions') },
    ],
    safetyTips: {
      ko: ['리서치 실습입니다. 실제 투자하지 마세요.', '높은 APY = 반드시 위험하다는 뜻은 아니지만, 반드시 DYOR가 필요합니다.'],
      en: ['Research exercise. Do not invest.', 'High APY ≠ always dangerous, but always requires DYOR.'],
    },
  },
  {
    weekId: 'p2-5',
    id: 'p2-real-yield-calc',
    actionId: 'p2-a5-2',
    title: l('APR → APY 변환 + 실질 수익 계산', 'APR → APY Conversion + Real Yield Calculation'),
    subtitle: l('약 10분 · 초급', '~10 min · Beginner'),
    icon: 'calculator',
    description: l(
      'DeFi 수익률 표기의 함정을 수학으로 직접 확인합니다. 가스비를 빼면 실질 수익이 얼마인지 계산해봅니다.',
      'Verify DeFi yield display tricks with math. Calculate real yield after subtracting gas fees.'
    ),
    steps: [
      { text: l('APR 12%를 일 복리 APY로 변환하세요: APY = (1 + 0.12/365)^365 - 1', 'Convert APR 12% to daily compound APY: APY = (1 + 0.12/365)^365 - 1'), note: l('결과: 약 12.75% — 0.75% 차이가 "복리의 마법"', 'Result: ~12.75% — the 0.75% difference is "the magic of compounding"') },
      { text: l('월 1회 수동 복리 시: APY = (1 + 0.12/12)^12 - 1', 'Monthly manual compounding: APY = (1 + 0.12/12)^12 - 1'), note: l('결과: 약 12.68% — 복리 주기에 따라 달라짐', 'Result: ~12.68% — varies by compounding frequency') },
      { text: l('가스비 차감: 월 1회 복리 × 12개월 × 가스비 $2 = 연 $24 비용', 'Subtract gas: monthly compound × 12 months × $2 gas = $24/year cost'), note: l('$100 투자 시 가스비만 24% → 실질 수익 마이너스!', 'On $100 investment, gas alone is 24% → negative real yield!') },
      { text: l('최소 투자금 계산: 가스비가 수익의 10% 미만이 되려면 얼마가 필요한가?', 'Calculate minimum investment: how much needed for gas to be <10% of yield?'), note: l('이것이 "DeFi는 소액에 불리하다"의 수학적 근거', 'This is the math behind "DeFi disadvantages small amounts"') },
    ],
    safetyTips: {
      ko: ['계산 실습입니다. 계산기나 스프레드시트를 사용하세요.', 'L2(Arbitrum, Polygon)나 Solana에서는 가스비가 훨씬 저렴합니다.'],
      en: ['Calculation exercise. Use a calculator or spreadsheet.', 'Gas fees are much lower on L2 (Arbitrum, Polygon) or Solana.'],
    },
  },
  {
    weekId: 'p2-6',
    id: 'p2-marinade-liquid-staking',
    actionId: 'p2-a6-1',
    title: l('Marinade에서 SOL → mSOL Liquid Staking', 'SOL → mSOL Liquid Staking on Marinade'),
    subtitle: l('약 10분 · 중급 · 소액 실습', '~10 min · Intermediate · Small Amount'),
    icon: 'droplets',
    description: l(
      'SOL을 스테이킹하면서도 유동성을 유지하는 Liquid Staking을 직접 체험합니다. "정기적금에 돈이 묶이지 않는" 경험입니다.',
      'Experience Liquid Staking — stake SOL while maintaining liquidity. Like "a fixed deposit where your money isn\'t locked."'
    ),
    steps: [
      { text: l('Marinade Finance(marinade.finance)에 접속 → Phantom 연결', 'Visit Marinade Finance (marinade.finance) → Connect Phantom'), link: 'https://marinade.finance', note: l('Solana 네이티브 Liquid Staking 프로토콜입니다', 'Solana-native Liquid Staking protocol') },
      { text: l('Stake 탭에서 소액 SOL(0.5~1 SOL 권장)을 입력', 'Enter small SOL amount (0.5-1 SOL recommended) in Stake tab'), note: l('가스비용 SOL을 남겨두세요 (최소 0.05 SOL)', 'Keep some SOL for gas (minimum 0.05 SOL)') },
      { text: l('Stake 버튼 → 트랜잭션 승인 → mSOL 수령 확인', 'Stake button → Approve transaction → Verify mSOL received'), note: l('mSOL은 "스테이킹 중인 SOL의 증서"입니다', 'mSOL is your "staked SOL receipt"') },
      { text: l('mSOL의 SOL 대비 가치를 확인하세요 (1 mSOL > 1 SOL)', 'Check mSOL value vs SOL (1 mSOL > 1 SOL)'), note: l('mSOL 가격은 스테이킹 보상이 쌓이면서 점점 올라갑니다', 'mSOL price gradually increases as staking rewards accumulate') },
    ],
    safetyTips: {
      ko: [
        '공식 URL(marinade.finance)인지 반드시 확인하세요.',
        'Unstake는 즉시 또는 1~2 에포크(2~4일) 후 가능합니다.',
        'mSOL은 DeFi에서 담보로도 활용 가능합니다 (Week 6 액션 2에서 실습).',
      ],
      en: [
        'Always verify the official URL (marinade.finance).',
        'Unstake is available instantly or after 1-2 epochs (2-4 days).',
        'mSOL can be used as collateral in DeFi (practiced in Week 6 Action 2).',
      ],
    },
  },
  {
    weekId: 'p2-6',
    id: 'p2-msol-collateral',
    actionId: 'p2-a6-2',
    title: l('mSOL을 렌딩 프로토콜에 담보로 활용', 'Use mSOL as Collateral in Lending Protocol'),
    subtitle: l('약 10분 · 중급 · 소액 실습', '~10 min · Intermediate · Small Amount'),
    icon: 'layers',
    description: l(
      'Liquid Staking의 핵심 가치를 체험합니다 — 스테이킹 이자를 받으면서, 동시에 그 자산을 다른 곳에 활용하는 "이중 수익" 구조.',
      'Experience the core value of Liquid Staking — earning staking interest while simultaneously using that asset elsewhere for "double yield."'
    ),
    steps: [
      { text: l('Week 6 액션 1에서 받은 mSOL을 확인하세요', 'Verify your mSOL from Week 6 Action 1'), note: l('최소 0.5 mSOL이 필요합니다', 'Minimum 0.5 mSOL needed') },
      { text: l('Solend(solend.fi) 또는 Marginfi에 접속 → mSOL을 담보로 Supply', 'Visit Solend (solend.fi) or Marginfi → Supply mSOL as collateral'), link: 'https://solend.fi', note: l('mSOL의 스테이킹 이자 + 렌딩 공급 이자 = 이중 수익', 'mSOL staking yield + lending supply yield = double yield') },
      { text: l('Supply 후 대시보드에서 총 수익률을 확인하세요', 'After Supply, check total yield on dashboard'), note: l('SOL 스테이킹 APY + 렌딩 Supply APY의 합산입니다', 'Sum of SOL staking APY + lending Supply APY') },
    ],
    safetyTips: {
      ko: [
        '이중 수익 = 이중 리스크입니다. 두 프로토콜의 스마트 컨트랙트 리스크가 모두 적용됩니다.',
        'Borrow는 하지 마세요 — 이 실습은 Supply만 합니다.',
        '실습 후 Withdraw → Unstake로 원래 SOL로 복귀 가능합니다.',
      ],
      en: [
        'Double yield = double risk. Smart contract risk of both protocols applies.',
        'Do not Borrow — this exercise is Supply only.',
        'After exercise, Withdraw → Unstake to return to original SOL.',
      ],
    },
  },
  {
    weekId: 'p2-7',
    id: 'p2-ousg-analysis',
    actionId: 'p2-a7-1',
    title: l('Ondo Finance OUSG 구조 분석', 'Ondo Finance OUSG Structure Analysis'),
    subtitle: l('약 15분 · 초급 · 리서치', '~15 min · Beginner · Research'),
    icon: 'landmark',
    description: l(
      '"블록체인 위 미국 국채"인 OUSG의 구조를 분석하고, 전통 국채 ETF와 비교합니다.',
      'Analyze the structure of OUSG — "US Treasuries on blockchain" — and compare with traditional Treasury ETFs.'
    ),
    steps: [
      { text: l('Ondo Finance 웹사이트(ondo.finance)에서 OUSG 정보를 확인', 'Check OUSG info on Ondo Finance website (ondo.finance)'), link: 'https://ondo.finance', note: l('AUM, 수익률, 담보 구조를 확인하세요', 'Check AUM, yield, and collateral structure') },
      { text: l('KODEX 미국채 ETF(키움증권)와 OUSG를 비교 표로 정리', 'Create comparison table: KODEX US Treasury ETF vs OUSG'), note: l('수익률, 수수료, 접근성, 규제를 비교', 'Compare yield, fees, accessibility, regulation') },
      { text: l('BlackRock BUIDL 펀드도 조사해 추가하세요', 'Research and add BlackRock BUIDL fund'), note: l('전통 금융 거인이 왜 토큰화에 뛰어드는지가 핵심 질문', 'Key question: why are TradFi giants entering tokenization?') },
      { text: l('결론: RWA 토큰화가 한국 투자자에게 어떤 의미인지 정리', 'Conclusion: what RWA tokenization means for Korean investors'), note: l('접근성, 비용, 규제 관점에서 정리하세요', 'Summarize from accessibility, cost, and regulatory perspectives') },
    ],
    safetyTips: {
      ko: ['리서치 실습입니다. OUSG는 미국 투자자 전용(KYC 필수)이므로 직접 투자 대상이 아닙니다.', '한국에서 RWA 토큰 투자는 현재 법적 회색 지대입니다 — 규제 동향을 지속 확인하세요.'],
      en: ['Research exercise. OUSG is US-investor only (KYC required), not for direct investment.', 'RWA token investment from Korea is currently in a legal gray area — monitor regulation.'],
    },
  },
  {
    weekId: 'p2-7',
    id: 'p2-sto-compare',
    actionId: 'p2-a7-2',
    title: l('한국 조각투자/STO 플랫폼 비교', 'Korean Fractional Investment/STO Platform Comparison'),
    subtitle: l('약 15분 · 초급 · 리서치', '~15 min · Beginner · Research'),
    icon: 'building',
    description: l(
      '한국에서 이미 운영 중인 조각투자 및 STO 플랫폼 3개를 비교 분석합니다.',
      'Compare and analyze 3 fractional investment and STO platforms already operating in Korea.'
    ),
    steps: [
      { text: l('카사코리아, 펀블, 소유 중 3개를 조사하세요', 'Research 3 platforms: KASA Korea, Funble, Soyu'), note: l('각 플랫폼의 투자 대상(부동산, 미술품, 음악 등)을 확인', 'Check each platform\'s investment targets (real estate, art, music, etc.)') },
      { text: l('비교 표 작성: 최소 투자금, 수수료, 유동성, 규제 현황', 'Create comparison table: minimum investment, fees, liquidity, regulatory status'), note: l('STO 인가 여부가 핵심 차이점입니다', 'STO licensing is the key differentiator') },
      { text: l('블록체인 기반 여부를 확인하세요', 'Check if blockchain-based'), note: l('조각투자 ≠ STO. 블록체인 없이도 조각투자는 가능합니다', 'Fractional ≠ STO. Fractional investment works without blockchain too') },
      { text: l('결론: 한국 STO 시장의 현재와 전망을 정리', 'Conclusion: summarize Korean STO market present and outlook'), note: l('금융위 2023 STO 프레임워크 이후 진행 상황을 포함하세요', 'Include progress since FSC 2023 STO framework') },
    ],
    safetyTips: {
      ko: ['리서치 실습입니다.', '조각투자 플랫폼 투자 시 원금 손실 가능성이 있습니다 — 이 실습은 분석만 합니다.'],
      en: ['Research exercise.', 'Fractional investment carries principal loss risk — this exercise is analysis only.'],
    },
  },
  {
    weekId: 'p2-8',
    id: 'p2-portfolio-design',
    actionId: 'p2-a8-1',
    title: l('나만의 DeFi 포트폴리오 설계서', 'My DeFi Portfolio Design'),
    subtitle: l('약 20분 · 중급', '~20 min · Intermediate'),
    icon: 'pie-chart',
    description: l(
      '은행에서 하는 "투자 성향 테스트"처럼, 본인의 리스크 성향을 파악하고 그에 맞는 DeFi 포트폴리오를 설계합니다.',
      'Like a bank\'s "investment profile test," identify your risk profile and design a matching DeFi portfolio.'
    ),
    steps: [
      { text: l('투자 성향 자가 진단: 안정형 / 중립형 / 공격형', 'Self-assess risk profile: Conservative / Moderate / Aggressive'), note: l('잃어도 수면에 지장 없는 금액이 얼마인지로 판단하세요', 'Judge by how much you can lose without losing sleep') },
      { text: l('성향별 모델 포트폴리오를 참고하세요', 'Reference the model portfolio by risk profile'), note: l('안정형: 스테이블 렌딩 60% + LP 30% + LST 10%', 'Conservative: Stable lending 60% + LP 30% + LST 10%') },
      { text: l('본인의 포트폴리오를 설계하세요: 자산, 비율, 프로토콜, 예상 APY', 'Design your portfolio: assets, ratios, protocols, expected APY'), note: l('총 비율이 100%가 되어야 합니다', 'Total ratio must equal 100%') },
      { text: l('리스크 시나리오를 적어보세요: "만약 ETH가 50% 폭락하면?"', 'Write risk scenarios: "What if ETH drops 50%?"'), note: l('이 시나리오에서 내 포트폴리오는 어떻게 되는지 시뮬레이션', 'Simulate what happens to your portfolio in this scenario') },
    ],
    safetyTips: {
      ko: [
        '포트폴리오 설계는 교육 목적입니다. 실제 투자 결정은 본인 판단입니다.',
        'DeFi에는 예금자 보호가 없습니다 — 잃어도 괜찮은 금액만 투자하세요.',
        '"분산투자"는 리스크를 줄이지만 없애지는 않습니다.',
      ],
      en: [
        'Portfolio design is educational. Actual investment decisions are yours.',
        'No deposit insurance in DeFi — only invest what you can afford to lose.',
        '"Diversification" reduces but does not eliminate risk.',
      ],
    },
  },
  {
    weekId: 'p2-8',
    id: 'p2-debank-review',
    actionId: 'p2-a8-2',
    title: l('DeBank/Zapper로 DeFi 포지션 전체 점검', 'Review All DeFi Positions with DeBank/Zapper'),
    subtitle: l('약 10분 · 초급', '~10 min · Beginner'),
    icon: 'scan-eye',
    description: l(
      'Phase 2 동안 쌓인 모든 DeFi 포지션을 한눈에 확인하고 정리합니다. 졸업 전 마지막 점검입니다.',
      'Review all DeFi positions accumulated during Phase 2 at a glance. Final check before graduation.'
    ),
    steps: [
      { text: l('DeBank(debank.com)에 접속 → 지갑 주소 입력', 'Visit DeBank (debank.com) → Enter wallet address'), link: 'https://debank.com', note: l('지갑 연결 없이 주소만으로도 조회 가능합니다', 'Can query by address without connecting wallet') },
      { text: l('Portfolio 탭에서 전체 자산 현황을 확인', 'Check overall asset status in Portfolio tab'), note: l('Supply, Borrow, LP, Staking 등 모든 포지션이 표시됩니다', 'All positions shown: Supply, Borrow, LP, Staking, etc.') },
      { text: l('각 포지션의 현재 상태를 정리하세요: 프로토콜, 금액, APY, Health Factor', 'Organize each position: protocol, amount, APY, Health Factor'), note: l('빌린 것이 있다면 Health Factor를 반드시 확인하세요', 'If you have borrows, check Health Factor') },
      { text: l('정리할 포지션이 있다면 Withdraw/Repay/Remove 실행', 'If any positions need closing, execute Withdraw/Repay/Remove'), note: l('교육 실습용 포지션은 정리하는 것을 권장합니다', 'Recommended to close educational practice positions') },
    ],
    safetyTips: {
      ko: [
        'DeBank는 읽기 전용 사이트입니다. 지갑 연결 요청이 이상하면 피싱입니다.',
        '모든 실습 포지션을 정리한 후 최종 잔고를 스크린샷으로 남기세요.',
      ],
      en: [
        'DeBank is read-only. If wallet connection seems suspicious, it\'s phishing.',
        'Screenshot your final balance after closing all practice positions.',
      ],
    },
  },
]

// ── Phase 2 Exam Structure ──

export const phase2ExamConfig = {
  midterm: {
    weekRange: [1, 4],
    title: l('Phase 2 중간 이그잼', 'Phase 2 Midterm Exam'),
    structure: {
      multipleChoice: 15,
      tradfiDefiMatching: 5,
      scenario: 5,
      total: 25,
    },
    passRate: 0.7,
    timeLimitMinutes: 35,
  },
  final: {
    weekRange: [1, 8],
    title: l('Phase 2 기말 이그잼', 'Phase 2 Final Exam'),
    structure: {
      multipleChoice: 15,
      tradfiDefiMatching: 5,
      scenario: 10,
      calculation: 5,
      total: 35,
    },
    passRate: 0.7,
    timeLimitMinutes: 50,
  },
}

// ── Phase 2 Graduation Requirements ──

export const phase2GraduationReqs = {
  lessons: 24,
  quizPassRate: 0.8,
  minActions: 12,
  totalActions: 16,
  midtermPass: true,
  finalPass: true,
  reward: l('Phase 2 PoA + Phase 3 접근 권한', 'Phase 2 PoA + Phase 3 Access'),
}

// ── Master TradFi ↔ DeFi Table ──

export const masterTradfiDefiTable = [
  { tradfi: l('예금 (Deposit)', 'Deposit'), defi: 'Supply', note: l('돈을 맡기고 이자 받기', 'Earn interest by depositing'), week: 1 },
  { tradfi: l('이자율 (Interest Rate)', 'Interest Rate'), defi: 'APY', note: l('연 수익률 — 표현 방식만 다름', 'Annual yield — just different format'), week: 1 },
  { tradfi: l('은행 / 증권사', 'Bank / Brokerage'), defi: 'Protocol', note: l('금융 서비스 제공자 — 사람 vs 코드', 'Financial service provider — people vs code'), week: 1 },
  { tradfi: l('예금보험 (5천만원)', 'Deposit Insurance'), defi: 'Audit (코드 감사)', note: l('안전장치 — 정부 보증 vs 코드 검증', 'Safety — government guarantee vs code verification'), week: 1 },
  { tradfi: l('법정화폐 담보 수표', 'Fiat-backed Check'), defi: 'Fiat-backed Stablecoin (USDC)', note: l('진짜 달러가 뒤에 있는 토큰', 'Token backed by real dollars'), week: 2 },
  { tradfi: l('뱅크런 (예금 인출 사태)', 'Bank Run'), defi: 'Depegging', note: l('신뢰 붕괴 → 가치 이탈', 'Trust collapse → value deviation'), week: 2 },
  { tradfi: l('예금 → 은행 → 대출', 'Deposit → Bank → Loan'), defi: 'Supply → Pool → Borrow', note: l('중개 구조는 동일, 중개인만 다름', 'Same intermediation structure, different intermediary'), week: 3 },
  { tradfi: l('주택담보대출 LTV', 'Mortgage LTV'), defi: 'DeFi LTV / Health Factor', note: l('담보 대비 대출 비율', 'Loan-to-collateral ratio'), week: 3 },
  { tradfi: l('경매 / 강제매도', 'Foreclosure'), defi: 'Liquidation', note: l('담보 부족 → 강제 처분', 'Insufficient collateral → forced sale'), week: 3 },
  { tradfi: l('마진콜', 'Margin Call'), defi: 'Health Factor < 1.0', note: l('"담보 더 넣으세요" 경고', '"Add more collateral" warning'), week: 3 },
  { tradfi: l('시장조성자 (Market Maker)', 'Market Maker'), defi: 'LP (Liquidity Provider)', note: l('양쪽 자산 보유 → 거래 수수료 수익', 'Hold both assets → earn trading fees'), week: 4 },
  { tradfi: l('재고 리스크', 'Inventory Risk'), defi: 'Impermanent Loss (IL)', note: l('가격 변동 시 최적 보유 대비 손해', 'Loss vs optimal hold during price changes'), week: 4 },
  { tradfi: l('프로모션 우대금리', 'Promotional Rate'), defi: 'Farming Rewards', note: l('고객 유치용 추가 보상', 'Extra rewards for customer acquisition'), week: 5 },
  { tradfi: l('단리 / 복리', 'Simple / Compound Interest'), defi: 'APR / APY', note: l('이자 계산 방식', 'Interest calculation method'), week: 5 },
  { tradfi: l('폰지 사기 / 유사수신', 'Ponzi / Illegal Deposit-taking'), defi: 'Rug Pull / 토큰 무한 발행', note: l('수익 원천 없이 고수익 약속', 'High returns promised with no revenue source'), week: 5 },
  { tradfi: l('정기예금 (만기까지 묶임)', 'Fixed Deposit'), defi: 'Staking (Unbonding 대기)', note: l('돈을 잠그고 이자 받기', 'Lock money and earn interest'), week: 6 },
  { tradfi: l('양도성 예금증서 (CD)', 'Certificate of Deposit'), defi: 'Liquid Staking Token (mSOL 등)', note: l('"잠긴 돈"을 토큰화해서 유동적으로', 'Tokenize locked funds for liquidity'), week: 6 },
  { tradfi: l('재담보 (Rehypothecation)', 'Rehypothecation'), defi: 'Restaking', note: l('한 담보를 여러 곳에 동시 사용', 'Use one collateral across multiple services'), week: 6 },
  { tradfi: l('REITs / ETF', 'REITs / ETF'), defi: 'RWA Token', note: l('자산을 분할해서 소액 투자', 'Fractional asset investment'), week: 7 },
  { tradfi: l('국채 / 국채 ETF', 'Treasury / Treasury ETF'), defi: 'Tokenized Treasury (OUSG 등)', note: l('정부 채권의 블록체인 버전', 'Blockchain version of government bonds'), week: 7 },
  { tradfi: l('증권 (자본시장법)', 'Securities'), defi: 'STO (토큰증권)', note: l('블록체인 위 증권 — 같은 법 적용', 'Securities on blockchain — same law applies'), week: 7 },
  { tradfi: l('자산배분 (Asset Allocation)', 'Asset Allocation'), defi: 'DeFi Portfolio', note: l('위험 분산 — 여러 상품에 나눠 투자', 'Risk diversification — spread across products'), week: 8 },
]

export const phase2WeeksEnriched = phase2Weeks.map((week, i) => ({
  ...week,
  order: i + 1,
}))

export { phase2Weeks, phase2WeeksEnriched as enrichedPhase2Weeks }
