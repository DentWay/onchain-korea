// Greed Academy source articles
export const greedArticles = {
  'S1-L1': { url: 'https://medium.com/@GreedAcademy/lesson-1-staking-and-validators-378beb4b3624', title: 'Staking and Validators' },
  'S1-L2': { url: 'https://medium.com/@GreedAcademy/lesson-2-governance-4e6f42381104', title: 'Governance' },
  'S1-L4': { url: 'https://medium.com/@GreedAcademy/lesson-4-hype-6b5911ae077b', title: 'Hype' },
  'S1-L5': { url: 'https://medium.com/@GreedAcademy/lesson-5-wallets-533940862aa6', title: 'Wallets' },
  'S1-L6': { url: 'https://medium.com/@GreedAcademy/lesson-6-nfts-5d6d968b0ffe', title: 'NFTs' },
  'S1-L7': { url: 'https://medium.com/@GreedAcademy/lesson-7-dyor-part-1-b37bca48479e', title: 'DYOR Part 1' },
  'S1-L8': { url: 'https://medium.com/@GreedAcademy/lesson-8-dyor-part-2-8f491539bdbd', title: 'DYOR Part 2' },
  'S2-L1': { url: 'https://medium.com/@GreedAcademy/lesson-1-wallets-and-wallet-hygiene-8eaf26a62269', title: 'Wallets & Wallet Hygiene' },
  'S2-L2': { url: 'https://medium.com/@GreedAcademy/lesson-2-digital-assets-b325f0fcc0a1', title: 'Digital Assets' },
  'S2-L4': { url: 'https://medium.com/@GreedAcademy/lesson-4-defi-29f03eb73f00', title: 'DeFi' },
  'S2-L6': { url: 'https://medium.com/@GreedAcademy/lesson-6-onchain-explorers-bc61de7d3250', title: 'Onchain Explorers' },
  'S2-L7': { url: 'https://medium.com/@GreedAcademy/lesson-7-stablecoins-22ef6be6c003', title: 'Stablecoins' },
  'S2-L8': { url: 'https://medium.com/@GreedAcademy/lesson-8-cross-chain-and-bridging-7af924e1016d', title: 'Cross-chain & Bridging' },
}

export const weeks = [
  // ── Week 1: 크립토 기초 + 지갑 설정 ──
  {
    id: 1,
    title: { ko: '크립토 기초 + 지갑 설정', en: 'Crypto Basics + Wallet Setup' },
    subtitle: { ko: '거래소에서 온체인으로 · 지갑 · 시드 문구 · 버너 지갑 · 보안', en: 'From Exchange to On-chain · Wallets · Seed Phrases · Burner · Security' },
    lessons: [
      { id: 'w1-0', title: { ko: '한국 거래소에서 온체인으로 — 업비트에서 시작해서 지갑까지', en: 'From Korean Exchange to On-chain — Starting from Upbit to Your Wallet' }, source: null, type: 'read', mediumUrl: null },
      { id: 'w1-1', title: { ko: '지갑이란? — 주소, 프라이빗 키, 시드 문구 이해', en: 'What is a Wallet? — Addresses, Private Keys, Seed Phrases' }, source: 'S1-L5', type: 'read', mediumUrl: greedArticles['S1-L5'].url },
      { id: 'w1-2', title: { ko: '지갑 클라이언트 비교 — Phantom, Solflare, Backpack', en: 'Comparing Wallet Clients — Phantom, Solflare, Backpack' }, source: 'S1-L5', type: 'read', mediumUrl: greedArticles['S1-L5'].url },
      { id: 'w1-4', title: { ko: '버너 지갑 만들기 — 가장 안전한 온체인 습관', en: 'Creating a Burner Wallet — The Safest On-chain Habit' }, source: 'S2-L1', type: 'practice', mediumUrl: greedArticles['S2-L1'].url },
      { id: 'w1-5', title: { ko: '키 관리 & 보안 베스트 프랙티스', en: 'Key Management & Security Best Practices' }, source: 'S2-L1', type: 'security', mediumUrl: greedArticles['S2-L1'].url },
    ],
    actions: [
      { id: 'a1-1', title: { ko: 'Phantom 지갑 설치 + 생성', en: 'Install + Create Phantom Wallet' }, guideId: 'phantom-setup' },
      { id: 'a1-2', title: { ko: 'Solflare 버너 지갑 만들기 + 비우기', en: 'Create + Empty Solflare Burner Wallet' }, guideId: 'burner-wallet' },
      { id: 'a1-3', title: { ko: '시드 문구 안전 보관 실습', en: 'Seed Phrase Safe Storage Practice' }, guideId: 'seed-backup' },
    ],
    hiddenTopic: {
      title: { ko: '한국 거래소 vs 해외 DEX — 어디서 거래해야 할까?', en: 'Korean Exchanges vs Overseas DEX — Where Should You Trade?' },
      desc: { ko: '업비트, 빗썸 같은 한국 거래소와 해외 DEX의 장단점을 비교합니다.', en: 'Comparing pros and cons of Korean exchanges like Upbit, Bithumb vs overseas DEXs.' },
      readTime: { ko: '10분 읽기', en: '10 min read' },
      action: { ko: 'DEX에서 첫 스왑', en: 'First Swap on DEX' },
      forumCount: 23,
    },
  },
  // ── Week 2: 스테이블코인 + 온체인 탐색 ──
  {
    id: 2,
    title: { ko: '스테이블코인 + 온체인 탐색', en: 'Stablecoins + On-chain Exploration' },
    subtitle: { ko: 'USDT/USDC/DAI · 토큰 스탠다드 · 블록 탐색기 · 온체인 분석', en: 'USDT/USDC/DAI · Token Standards · Block Explorers · On-chain Analysis' },
    lessons: [
      { id: 'w4-1', title: { ko: '스테이블코인 작동 원리 — USDT vs USDC vs DAI', en: 'How Stablecoins Work — USDT vs USDC vs DAI' }, source: 'S2-L7', type: 'read', mediumUrl: greedArticles['S2-L7'].url },
      { id: 'w3-3', title: { ko: '디지털 에셋 & 토큰 스탠다드 (SPL, ERC-20)', en: 'Digital Assets & Token Standards (SPL, ERC-20)' }, source: 'S2-L2', type: 'read', mediumUrl: greedArticles['S2-L2'].url },
      { id: 'w2-1', title: { ko: '블록 탐색기란? — Solscan으로 트랜잭션 읽기', en: 'What is a Block Explorer? — Reading Transactions with Solscan' }, source: 'S2-L6', type: 'read', mediumUrl: greedArticles['S2-L6'].url },
      { id: 'w2-2', title: { ko: '온체인 활동 추적 — 지갑 분석과 토큰 흐름', en: 'Tracking On-chain Activity — Wallet Analysis & Token Flows' }, source: 'S2-L6', type: 'read', mediumUrl: greedArticles['S2-L6'].url },
    ],
    actions: [
      { id: 'a4-1', title: { ko: '스테이블코인 전송 실습', en: 'Stablecoin Transfer Practice' }, guideId: 'stablecoin-transfer' },
      { id: 'a2-1', title: { ko: 'Solscan에서 내 트랜잭션 찾기', en: 'Find My Transactions on Solscan' }, guideId: 'solscan-tx' },
    ],
    hiddenTopic: {
      title: { ko: '왜 스테이블코인이 주목받고 있을까? — 한국에서의 실제 활용 사례', en: 'Why Are Stablecoins Getting Attention? — Real Use Cases in Korea' },
      desc: { ko: '한국에서 스테이블코인은 왜 중요할까요? 해외 송금, P2P 결제, DeFi 진입점으로서의 역할을 알아봅니다.', en: 'Why are stablecoins important in Korea? Explore their role in remittances, P2P payments, and as a DeFi entry point.' },
      readTime: { ko: '10분 읽기', en: '10 min read' },
      action: { ko: 'USDC 전송 체험', en: 'USDC Transfer Experience' },
      forumCount: 0,
    },
  },
  // ── Week 3: DYOR + DeFi ──
  {
    id: 3,
    title: { ko: 'DYOR + 스캠 방지 + DeFi', en: 'DYOR + Scam Prevention + DeFi' },
    subtitle: { ko: '리서치 기초/심화 · 스캠 분석 · AMM/LP · DEX 스왑', en: 'Research Basics/Advanced · Scam Analysis · AMM/LP · DEX Swap' },
    lessons: [
      { id: 'w2-3', title: { ko: 'DYOR 기초 — 레드플래그 식별법', en: 'DYOR Basics — Identifying Red Flags' }, source: 'S1-L7', type: 'read', mediumUrl: greedArticles['S1-L7'].url },
      { id: 'w2-4', title: { ko: 'DYOR 심화 — 프로젝트 & NFT 리서치 툴', en: 'Advanced DYOR — Project & NFT Research Tools' }, source: 'S1-L8', type: 'read', mediumUrl: greedArticles['S1-L8'].url },
      { id: 'w2-5', title: { ko: '실전 스캠 분석 — 실제 사례로 배우기', en: 'Real Scam Analysis — Learning from Actual Cases' }, source: 'S1-L4', type: 'security', mediumUrl: greedArticles['S1-L4'].url },
      { id: 'w3-1', title: { ko: 'DeFi란? — AMM, 유동성 풀, 수수료 구조', en: 'What is DeFi? — AMM, Liquidity Pools, Fee Structures' }, source: 'S2-L4', type: 'read', mediumUrl: greedArticles['S2-L4'].url },
      { id: 'w3-2', title: { ko: 'DEX에서 스왑하기 — Orca, Raydium 비교', en: 'Swapping on DEX — Comparing Orca & Raydium' }, source: 'S2-L4', type: 'practice', mediumUrl: greedArticles['S2-L4'].url },
    ],
    actions: [
      { id: 'a2-2', title: { ko: '의심 프로젝트 3개 리서치 보고서 작성', en: 'Write Research Report on 3 Suspicious Projects' }, guideId: 'dyor-report' },
      { id: 'a3-1', title: { ko: 'DEX에서 첫 스왑 실행', en: 'Execute First Swap on DEX' }, guideId: 'dex-swap' },
    ],
    hiddenTopic: {
      title: { ko: '트럼프는 왜 비트코인을 밀까? — 미국 크립토 정책이 한국에 미치는 영향', en: 'Why Is Trump Pushing Bitcoin? — How US Crypto Policy Affects Korea' },
      desc: { ko: '미국 정치와 크립토의 관계, 그리고 한국 시장에 미치는 파급효과를 분석합니다.', en: 'Analyzing the relationship between US politics and crypto, and its ripple effects on the Korean market.' },
      readTime: { ko: '12분 읽기', en: '12 min read' },
      action: { ko: '비트코인 가격 추적 실습', en: 'Bitcoin Price Tracking Practice' },
      forumCount: 0,
    },
  },
  // ── Week 4: NFT · 크로스체인 · 스테이킹 · 거버넌스 ──
  {
    id: 4,
    title: { ko: 'NFT · 크로스체인 · 스테이킹', en: 'NFT · Cross-chain · Staking' },
    subtitle: { ko: 'Metaplex Core · 브릿지 · 밸리데이터 · 거버넌스 & DAO', en: 'Metaplex Core · Bridges · Validators · Governance & DAOs' },
    lessons: [
      { id: 'w3-4', title: { ko: 'NFT 이해하기 — 개념부터 활용까지', en: 'Understanding NFTs — From Concepts to Applications' }, source: 'S1-L6', type: 'read', mediumUrl: greedArticles['S1-L6'].url },
      { id: 'w3-5', title: { ko: 'Metaplex Core로 내 에셋 민팅하기', en: 'Minting Your Asset with Metaplex Core' }, source: 'S1-L6', type: 'practice', mediumUrl: greedArticles['S1-L6'].url },
      { id: 'w4-2', title: { ko: '크로스체인 & 브릿지 — L2, 롤업, deBridge', en: 'Cross-chain & Bridges — L2, Rollups, deBridge' }, source: 'S2-L8', type: 'read', mediumUrl: greedArticles['S2-L8'].url },
      { id: 'w4-3', title: { ko: '밸리데이터 & 스테이킹 — 원리와 참여 방법', en: 'Validators & Staking — Principles & How to Participate' }, source: 'S1-L1', type: 'read', mediumUrl: greedArticles['S1-L1'].url },
      { id: 'w4-4', title: { ko: '거버넌스 & DAO — 온체인 의사결정', en: 'Governance & DAOs — On-chain Decision Making' }, source: 'S1-L2', type: 'read', mediumUrl: greedArticles['S1-L2'].url },
    ],
    actions: [
      { id: 'a3-2', title: { ko: 'Metaplex Core로 NFT 민팅', en: 'Mint NFT with Metaplex Core' }, guideId: 'nft-mint' },
      { id: 'a4-2', title: { ko: 'deBridge로 크로스체인 브릿지', en: 'Cross-chain Bridge via deBridge' }, guideId: 'debridge' },
      { id: 'a4-3', title: { ko: 'SOL 스테이킹 (Greed Validator)', en: 'SOL Staking (Greed Validator)' }, guideId: 'sol-staking' },
    ],
    hiddenTopic: {
      title: { ko: '한국에서 NFT는 끝났나? — 진짜 유스케이스와 Metaplex Core', en: 'Are NFTs Dead in Korea? — Real Use Cases & Metaplex Core' },
      desc: { ko: '한국 NFT 시장의 현실과 실제 활용 사례, Metaplex Core의 가능성을 탐구합니다.', en: 'Exploring the reality of the Korean NFT market, real use cases, and the potential of Metaplex Core.' },
      readTime: { ko: '10분 읽기', en: '10 min read' },
      action: { ko: '내 NFT 민팅', en: 'Mint My NFT' },
      forumCount: 0,
    },
  },
]

export const actionGuides = [
  {
    weekId: 1,
    id: 'burner-wallet',
    actionId: 'a1-2',
    title: { ko: 'Solflare 버너 지갑 만들기', en: 'Create a Solflare Burner Wallet' },
    subtitle: { ko: 'Greed Academy S2-L1 실습 과제 · 약 10분 · 초급', en: 'Greed Academy S2-L1 Practice · ~10 min · Beginner' },
    icon: 'wallet',
    description: { ko: '버너 지갑은 의심스러운 dApp이나 민팅에 사용하는 "일회용 지갑"입니다. 메인 지갑을 보호하는 가장 실전적인 방법이에요.', en: 'A burner wallet is a "disposable wallet" used for suspicious dApps or minting. It\'s the most practical way to protect your main wallet.' },
    steps: [
      { text: { ko: 'solflare.com 에 접속 → Chrome 확장 또는 모바일 앱 설치', en: 'Visit solflare.com → Install Chrome extension or mobile app' }, link: 'https://solflare.com', note: { ko: '이미 Phantom이 있어도 Solflare를 별도로 설치하세요', en: 'Install Solflare separately even if you already have Phantom' } },
      { text: { ko: '기존 지갑 시드 문구로 Solflare에 로그인', en: 'Log into Solflare with your existing wallet seed phrase' }, note: { ko: 'Semester 2 등록 시 사용한 지갑과 동일해야 합니다', en: 'Must be the same wallet used for Semester 2 registration' } },
      { text: { ko: '"버너 지갑 만들기" 기능 사용 (Solflare 내장)', en: 'Use the "Create Burner Wallet" feature (built into Solflare)' }, note: { ko: '다른 지갑에서는 "새 주소 추가"로 동일하게 가능', en: 'On other wallets, use "Add New Address" for the same result' } },
      { text: { ko: '버너 지갑으로 소액 전송 → 테스트 트랜잭션 → 자산 전부 메인으로 회수', en: 'Send small amount to burner → Test transaction → Withdraw all back to main' }, note: { ko: '버너를 비운 후 그 주소는 폐기하는 것이 원칙', en: 'The principle is to discard the address after emptying the burner' } },
      { text: { ko: 'Solscan에서 내 트랜잭션 확인', en: 'Verify your transaction on Solscan' }, link: 'https://solscan.io', note: { ko: '지갑 주소 검색 → 전송 내역이 보이면 성공!', en: 'Search wallet address → If you see the transfer history, success!' } },
    ],
    safetyTips: {
      ko: [
        '시드 문구를 절대 스크린샷 찍지 마세요. 종이에만 기록하세요.',
        '공식 사이트 외 링크를 클릭하지 마세요 (피싱 주의).',
        '"지갑 연결" 요청이 오면 항상 URL을 확인하세요.',
        '처음에는 소액으로만 연습하세요.',
      ],
      en: [
        'Never screenshot your seed phrase. Write it on paper only.',
        'Don\'t click links outside official sites (beware of phishing).',
        'Always verify the URL when a "connect wallet" request appears.',
        'Practice with small amounts first.',
      ],
    },
  },
  {
    weekId: 1,
    id: 'phantom-setup',
    actionId: 'a1-1',
    title: { ko: 'Phantom 지갑 설치 + 생성', en: 'Install + Create Phantom Wallet' },
    subtitle: { ko: '약 5분 · 초급', en: '~5 min · Beginner' },
    icon: 'download',
    description: { ko: 'Solana 생태계에서 가장 인기 있는 지갑 클라이언트를 설치하고 첫 지갑을 만듭니다.', en: 'Install the most popular wallet client in the Solana ecosystem and create your first wallet.' },
    steps: [
      { text: { ko: 'phantom.app 에 접속', en: 'Visit phantom.app' }, link: 'https://phantom.app', note: { ko: 'Chrome, Brave, Firefox, Edge 지원', en: 'Supports Chrome, Brave, Firefox, Edge' } },
      { text: { ko: '"새 지갑 만들기" 클릭 → 비밀번호 설정 (8자 이상)', en: 'Click "Create New Wallet" → Set password (8+ characters)' }, note: { ko: '이 비밀번호는 브라우저 잠금용입니다', en: 'This password is for browser lock only' } },
      { text: { ko: '시드 문구 12개를 종이에 적으세요', en: 'Write down your 12-word seed phrase on paper' }, note: { ko: '절대 디지털로 저장하지 마세요', en: 'Never store digitally' } },
      { text: { ko: '시드 문구 확인 → 지갑 생성 완료!', en: 'Confirm seed phrase → Wallet creation complete!' }, note: { ko: '지갑 주소가 화면 상단에 표시됩니다', en: 'Your wallet address will appear at the top of the screen' } },
    ],
    safetyTips: {
      ko: [
        '시드 문구 = 지갑의 마스터 키. 이걸 가진 사람이 지갑을 소유합니다.',
        '절대 다른 사람에게 공유하지 마세요.',
        '종이 2장에 적어 다른 장소에 보관하세요.',
      ],
      en: [
        'Seed phrase = master key to your wallet. Whoever has it owns the wallet.',
        'Never share with anyone.',
        'Write on 2 pieces of paper and store in different locations.',
      ],
    },
  },
  {
    weekId: 1, id: 'seed-backup', actionId: 'a1-3',
    title: { ko: '시드 문구 안전 보관 실습', en: 'Seed Phrase Safe Storage Practice' },
    subtitle: { ko: '약 5분 · 초급', en: '~5 min · Beginner' },
    icon: 'key',
    description: { ko: '시드 문구는 지갑의 마스터 키입니다. 디지털이 아닌 물리적 방법으로 안전하게 보관하는 방법을 실습합니다.', en: 'Your seed phrase is the master key to your wallet. Practice storing it safely using physical methods, not digital.' },
    steps: [
      { text: { ko: '빈 종이 2장을 준비하세요', en: 'Prepare 2 blank sheets of paper' }, note: { ko: '펜으로 쓸 수 있는 종이면 됩니다', en: 'Any paper you can write on with a pen' } },
      { text: { ko: '지갑에서 시드 문구 12개를 확인하세요 (설정 → 시드 문구 보기)', en: 'Check your 12-word seed phrase in wallet (Settings → View Seed Phrase)' }, note: { ko: '주변에 아무도 없는 상태에서 하세요', en: 'Make sure no one is around when you do this' } },
      { text: { ko: '시드 문구를 두 장의 종이에 각각 정확히 적으세요', en: 'Write the seed phrase accurately on both sheets' }, note: { ko: '번호와 함께 적어야 순서를 헷갈리지 않습니다', en: 'Write with numbers so you don\'t confuse the order' } },
      { text: { ko: '두 장을 서로 다른 안전한 장소에 보관하세요', en: 'Store the two sheets in separate secure locations' }, note: { ko: '예: 서랍 + 금고, 또는 자택 + 부모님 댁', en: 'e.g., drawer + safe, or your home + parents\' home' } },
    ],
    safetyTips: {
      ko: ['시드 문구를 절대 사진 찍지 마세요.', '클라우드(iCloud, Google Drive)에 절대 저장하지 마세요.', '다른 사람에게 보여주거나 공유하지 마세요.', '시드 문구를 잃어버리면 지갑을 복구할 수 없습니다.', '모바일에서 진행하는 경우, 시드 문구를 메모 앱이 아닌 종이에 직접 적어주세요. 스크린샷도 금지입니다.'],
      en: ['Never take a photo of your seed phrase.', 'Never store on cloud (iCloud, Google Drive).', 'Never show or share with anyone.', 'If you lose your seed phrase, your wallet cannot be recovered.', 'If you\'re on mobile, write down your seed phrase on paper, not in a notes app. Screenshots are also not recommended.'],
    },
  },
  // Week 2 guides (stablecoins + on-chain exploration)
  {
    weekId: 2, id: 'stablecoin-transfer', actionId: 'a4-1',
    title: { ko: '스테이블코인 전송 실습', en: 'Stablecoin Transfer Practice' },
    subtitle: { ko: '약 5분 · 초급', en: '~5 min · Beginner' },
    icon: 'banknote',
    description: { ko: 'USDC를 다른 지갑으로 전송해봅니다. 스테이블코인의 실제 사용법을 체험합니다.', en: 'Send USDC to another wallet. Experience how stablecoins are actually used.' },
    steps: [
      { text: { ko: 'Phantom에서 USDC 잔액을 확인하세요', en: 'Check your USDC balance in Phantom' }, note: { ko: '업비트에서 USDC를 구매하여 전송하거나, DEX 스왑으로 확보', en: 'Buy USDC on Upbit and transfer, or get via DEX swap' } },
      { text: { ko: '자신의 버너 지갑 주소를 복사하세요', en: 'Copy your burner wallet address' }, note: { ko: '자기 자신에게 보내는 연습입니다', en: 'This is practice sending to yourself' } },
      { text: { ko: 'Send → USDC 선택 → 주소 입력 → 소액 전송', en: 'Send → Select USDC → Enter address → Send small amount' }, note: { ko: '$0.5 이하로 시작하세요', en: 'Start with less than $0.5' } },
      { text: { ko: 'Solscan에서 전송 트랜잭션을 확인하세요', en: 'Verify transfer transaction on Solscan' }, link: 'https://solscan.io', note: { ko: '버너 지갑에 USDC가 도착하면 성공!', en: 'If USDC arrives in burner wallet, success!' } },
    ],
    safetyTips: {
      ko: ['주소를 반드시 두 번 확인하세요.', '잘못된 주소로 보내면 되돌릴 수 없습니다.', '처음에는 소액으로 테스트하세요.'],
      en: ['Always double-check the address.', 'Sending to wrong address is irreversible.', 'Test with small amounts first.'],
    },
  },
  {
    weekId: 2, id: 'solscan-tx', actionId: 'a2-1',
    title: { ko: 'Solscan에서 내 트랜잭션 찾기', en: 'Find My Transactions on Solscan' },
    subtitle: { ko: '약 10분 · 초급', en: '~10 min · Beginner' },
    icon: 'search',
    description: { ko: '블록체인의 모든 거래는 공개됩니다. Solscan을 사용해 내 지갑의 트랜잭션을 직접 찾아보고 읽어봅니다.', en: 'All blockchain transactions are public. Use Solscan to find and read your wallet\'s transactions.' },
    steps: [
      { text: { ko: 'solscan.io에 접속하세요', en: 'Visit solscan.io' }, link: 'https://solscan.io', note: { ko: 'Solana 전용 블록 탐색기입니다', en: 'Solana-specific block explorer' } },
      { text: { ko: '내 Phantom 지갑 주소를 복사하세요', en: 'Copy your Phantom wallet address' }, note: { ko: 'Phantom → 주소 클릭 → 복사', en: 'Phantom → Click address → Copy' } },
      { text: { ko: 'Solscan 검색창에 주소를 붙여넣으세요', en: 'Paste the address in Solscan search bar' }, note: { ko: '내 계정 정보와 트랜잭션 목록이 표시됩니다', en: 'Your account info and transaction list will appear' } },
      { text: { ko: '트랜잭션 하나를 클릭해서 상세 정보를 확인하세요', en: 'Click a transaction to see its details' }, note: { ko: '보낸 사람, 받는 사람, 금액, 시간을 확인할 수 있습니다', en: 'You can see sender, receiver, amount, and time' } },
    ],
    safetyTips: {
      ko: ['지갑 주소는 공개 정보이므로 공유해도 됩니다.', '하지만 시드 문구는 절대 입력하지 마세요.', 'Solscan에서 지갑 연결을 요구하지 않습니다.'],
      en: ['Wallet addresses are public — safe to share.', 'But NEVER enter your seed phrase anywhere.', 'Solscan does not require wallet connection.'],
    },
  },
  {
    weekId: 3, id: 'dyor-report', actionId: 'a2-2',
    title: { ko: '의심 프로젝트 리서치 보고서 작성', en: 'Write a Research Report on Suspicious Projects' },
    subtitle: { ko: '약 20분 · 중급', en: '~20 min · Intermediate' },
    icon: 'file-text',
    description: { ko: '실제 프로젝트 3개를 골라 DYOR(Do Your Own Research) 체크리스트로 분석하고, 레드플래그를 식별하는 연습을 합니다.', en: 'Pick 3 real projects, analyze them using a DYOR checklist, and practice identifying red flags.' },
    steps: [
      { text: { ko: 'CoinGecko 또는 CoinMarketCap에서 프로젝트 3개를 고르세요', en: 'Pick 3 projects from CoinGecko or CoinMarketCap' }, link: 'https://www.coingecko.com', note: { ko: '시가총액이 낮은 것도 포함해보세요', en: 'Include some with low market cap' } },
      { text: { ko: '각 프로젝트의 공식 웹사이트, Twitter, Discord를 확인하세요', en: 'Check each project\'s official website, Twitter, Discord' }, note: { ko: '활동이 있는지, 팀이 공개되어 있는지 확인', en: 'Check for activity and whether team is doxxed' } },
      { text: { ko: '레드플래그 체크리스트로 평가하세요: 익명 팀? 코드 감사 없음? 비현실적 수익률?', en: 'Evaluate with red flag checklist: Anonymous team? No code audit? Unrealistic returns?' }, note: { ko: 'DYOR Part 1 수업 내용을 참고하세요', en: 'Refer to DYOR Part 1 lesson' } },
      { text: { ko: '각 프로젝트에 대해 Green/Yellow/Red 등급을 매기세요', en: 'Rate each project as Green/Yellow/Red' }, note: { ko: '왜 그렇게 판단했는지 이유를 적어보세요', en: 'Write down your reasoning' } },
    ],
    safetyTips: {
      ko: ['리서치 중 지갑을 연결하지 마세요.', '의심스러운 링크를 클릭하지 마세요.', '이 실습은 분석만 합니다 — 투자하지 마세요.'],
      en: ['Do not connect your wallet during research.', 'Do not click suspicious links.', 'This is analysis only — do not invest.'],
    },
  },
  // Week 3 guides (DYOR + DeFi)
  {
    weekId: 3, id: 'dex-swap', actionId: 'a3-1',
    title: { ko: 'DEX에서 첫 스왑 실행', en: 'Execute First Swap on DEX' },
    subtitle: { ko: '약 10분 · 중급', en: '~10 min · Intermediate' },
    icon: 'arrow-left-right',
    description: { ko: '탈중앙화 거래소(DEX)에서 직접 토큰을 스왑해봅니다. 중앙 거래소와 다른 경험을 체험합니다.', en: 'Swap tokens directly on a decentralized exchange (DEX). Experience something different from centralized exchanges.' },
    steps: [
      { text: { ko: 'Jupiter Aggregator에 접속하세요', en: 'Visit Jupiter Aggregator' }, link: 'https://jup.ag', note: { ko: 'Solana에서 가장 많이 사용되는 DEX 애그리게이터', en: 'Most popular DEX aggregator on Solana' } },
      { text: { ko: 'Phantom 지갑을 연결하세요', en: 'Connect your Phantom wallet' }, note: { ko: 'URL이 jup.ag인지 반드시 확인하세요', en: 'Make sure the URL is jup.ag' } },
      { text: { ko: 'SOL → USDC 소액 스왑을 실행하세요', en: 'Execute a small SOL → USDC swap' }, note: { ko: '$1 이하의 소액으로 시작하세요', en: 'Start with less than $1' } },
      { text: { ko: 'Solscan에서 스왑 트랜잭션을 확인하세요', en: 'Verify swap transaction on Solscan' }, link: 'https://solscan.io', note: { ko: 'Swap 완료 후 지갑에 USDC가 보이면 성공!', en: 'If USDC appears in your wallet after swap, success!' } },
    ],
    safetyTips: {
      ko: ['처음에는 반드시 소액으로 연습하세요.', 'URL을 항상 확인하세요 (피싱 사이트 주의).', '슬리피지(Slippage) 설정을 너무 높이지 마세요.', '스왑 전 가격 비교를 습관화하세요.'],
      en: ['Always practice with small amounts first.', 'Always verify URLs (beware phishing sites).', 'Don\'t set slippage too high.', 'Make it a habit to compare prices before swapping.'],
    },
  },
  {
    weekId: 4, id: 'nft-mint', actionId: 'a3-2',
    title: { ko: 'Metaplex Core로 NFT 민팅', en: 'Mint NFT with Metaplex Core' },
    subtitle: { ko: '약 15분 · 중급', en: '~15 min · Intermediate' },
    icon: 'paintbrush',
    description: { ko: 'Metaplex의 새로운 Core 표준을 사용해 직접 NFT를 만들어봅니다.', en: 'Create your own NFT using Metaplex\'s new Core standard.' },
    steps: [
      { text: { ko: 'Metaplex Core 민팅 페이지에 접속하세요', en: 'Visit Metaplex Core minting page' }, link: 'https://core.metaplex.com', note: { ko: 'Metaplex의 최신 NFT 표준입니다', en: 'Metaplex\'s latest NFT standard' } },
      { text: { ko: 'Phantom 지갑을 연결하세요', en: 'Connect your Phantom wallet' }, note: { ko: 'SOL 잔액이 필요합니다 (가스비용)', en: 'You need SOL balance (for gas fees)' } },
      { text: { ko: '이미지를 업로드하고 이름, 설명을 입력하세요', en: 'Upload an image and enter name, description' }, note: { ko: '아무 이미지나 연습용으로 사용하세요', en: 'Use any image for practice' } },
      { text: { ko: 'Mint 버튼을 클릭하고 트랜잭션을 승인하세요', en: 'Click Mint and approve the transaction' }, note: { ko: '민팅 후 지갑에서 NFT를 확인할 수 있습니다', en: 'After minting, check the NFT in your wallet' } },
    ],
    safetyTips: {
      ko: ['민팅 비용(가스비)을 미리 확인하세요.', '연습용 NFT이므로 가치를 기대하지 마세요.', '공식 사이트 URL을 반드시 확인하세요.'],
      en: ['Check minting cost (gas fee) in advance.', 'This is a practice NFT — don\'t expect value.', 'Always verify the official site URL.'],
    },
  },
  // Week 4 guides (NFT, cross-chain, staking)
  {
    weekId: 4, id: 'debridge', actionId: 'a4-2',
    title: { ko: 'deBridge로 크로스체인 브릿지', en: 'Cross-chain Bridge via deBridge' },
    subtitle: { ko: '약 10분 · 중급', en: '~10 min · Intermediate' },
    icon: 'git-branch',
    description: { ko: 'deBridge를 사용해 Solana에서 다른 체인으로 자산을 브릿지해봅니다.', en: 'Use deBridge to bridge assets from Solana to another chain.' },
    steps: [
      { text: { ko: 'app.debridge.finance에 접속하세요', en: 'Visit app.debridge.finance' }, link: 'https://app.debridge.finance', note: { ko: '크로스체인 브릿지 프로토콜', en: 'Cross-chain bridge protocol' } },
      { text: { ko: 'Phantom 지갑을 연결하세요', en: 'Connect your Phantom wallet' }, note: { ko: 'URL이 정확한지 확인하세요', en: 'Verify the URL is correct' } },
      { text: { ko: 'Solana → Ethereum (또는 다른 체인) 브릿지를 설정하세요', en: 'Set up Solana → Ethereum (or other chain) bridge' }, note: { ko: '소액으로 시작하세요 — 브릿지 수수료를 확인', en: 'Start small — check bridge fees' } },
      { text: { ko: '트랜잭션을 승인하고 브릿지 완료를 기다리세요', en: 'Approve transaction and wait for bridge completion' }, note: { ko: '크로스체인 전송은 몇 분 걸릴 수 있습니다', en: 'Cross-chain transfers may take a few minutes' } },
    ],
    safetyTips: {
      ko: ['브릿지 수수료가 전송 금액보다 클 수 있으니 확인하세요.', '브릿지 중에는 자산이 일시적으로 보이지 않을 수 있습니다.', '공식 URL만 사용하세요.'],
      en: ['Bridge fees may exceed transfer amount — check first.', 'Assets may temporarily not appear during bridging.', 'Use official URLs only.'],
    },
  },
  {
    weekId: 4, id: 'sol-staking', actionId: 'a4-3',
    title: { ko: 'SOL 스테이킹 (Greed Validator)', en: 'SOL Staking (Greed Validator)' },
    subtitle: { ko: '약 10분 · 초급', en: '~10 min · Beginner' },
    icon: 'landmark',
    description: { ko: 'Greed Academy의 밸리데이터에 SOL을 스테이킹해봅니다. 네트워크에 기여하면서 보상을 받는 방법을 체험합니다.', en: 'Stake SOL with the Greed Academy validator. Experience contributing to the network and earning rewards.' },
    steps: [
      { text: { ko: 'Phantom에서 SOL 잔액을 확인하세요', en: 'Check your SOL balance in Phantom' }, note: { ko: '스테이킹할 SOL + 가스비가 필요합니다', en: 'You need SOL for staking + gas fees' } },
      { text: { ko: 'Phantom → Staking → Greed Academy Validator를 검색하세요', en: 'Phantom → Staking → Search for Greed Academy Validator' }, note: { ko: '0% 커미션 밸리데이터입니다', en: '0% commission validator' } },
      { text: { ko: '스테이킹할 금액을 입력하고 Stake를 클릭하세요', en: 'Enter amount to stake and click Stake' }, note: { ko: '소액으로 시작하세요 — 언스테이킹에 며칠 걸립니다', en: 'Start small — unstaking takes a few days' } },
      { text: { ko: 'Staking 대시보드에서 스테이킹 상태를 확인하세요', en: 'Check staking status in Staking dashboard' }, note: { ko: '보상은 자동으로 지급됩니다', en: 'Rewards are distributed automatically' } },
    ],
    safetyTips: {
      ko: ['언스테이킹에 2~3일이 걸립니다.', '스테이킹 중에는 해당 SOL을 사용할 수 없습니다.', '밸리데이터의 퍼포먼스를 확인하세요.'],
      en: ['Unstaking takes 2-3 days.', 'Staked SOL cannot be used during staking.', 'Check the validator\'s performance.'],
    },
  },
]

// Helper: resolve localized field
export function l(field, lang = 'ko') {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[lang] || field.ko || ''
}

// Helper: find all lessons across all weeks
export function findLesson(lessonId) {
  for (const week of weeks) {
    const lesson = week.lessons.find(l => l.id === lessonId)
    if (lesson) return { ...lesson, weekId: week.id, weekTitle: week.title }
  }
  return null
}
