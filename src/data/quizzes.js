// Quiz data for all articles and weekly tests
// Each question: { q: {ko, en}, options: [{ko, en}], answer: 0-3 }
// PLACEHOLDER DATA — 2 sample questions per quiz. Real questions to be filled later.

export const articleQuizzes = {
  // ── Week 1: Getting Started ──
  'w1-0': [
    { q: { ko: '한국 거래소에서 온체인으로 자산을 옮기려면 가장 먼저 해야 할 일은?', en: 'What is the first step to move assets from a Korean exchange to on-chain?' }, options: [{ ko: '개인 지갑 주소 생성', en: 'Create a personal wallet address' }, { ko: '거래소에서 마진 거래 시작', en: 'Start margin trading on the exchange' }, { ko: 'NFT 구매', en: 'Buy an NFT' }, { ko: '스테이킹 시작', en: 'Start staking' }], answer: 0 },
    { q: { ko: '업비트에서 SOL을 출금할 때 필요한 정보는?', en: 'What information is needed to withdraw SOL from Upbit?' }, options: [{ ko: '이메일 주소', en: 'Email address' }, { ko: '수신 지갑 주소와 네트워크 선택', en: 'Receiving wallet address and network selection' }, { ko: '신용카드 번호', en: 'Credit card number' }, { ko: 'NFT ID', en: 'NFT ID' }], answer: 1 },
  ],
  'w1-1': [
    { q: { ko: '시드 문구(Seed Phrase)는 보통 몇 개의 단어로 구성되나요?', en: 'How many words typically make up a seed phrase?' }, options: [{ ko: '6개', en: '6' }, { ko: '12개 또는 24개', en: '12 or 24' }, { ko: '8개', en: '8' }, { ko: '32개', en: '32' }], answer: 1 },
    { q: { ko: '프라이빗 키를 분실하면 어떻게 되나요?', en: 'What happens if you lose your private key?' }, options: [{ ko: '거래소에서 복구 가능', en: 'Recoverable from exchange' }, { ko: '고객센터에 문의', en: 'Contact customer support' }, { ko: '자산에 영구적으로 접근 불가', en: 'Permanently lose access to assets' }, { ko: '자동으로 새 키 생성', en: 'A new key is auto-generated' }], answer: 2 },
  ],
  'w1-2': [
    { q: { ko: 'Phantom, Solflare, Backpack 중 Solana 전용 지갑이 아닌 것은?', en: 'Which of these is NOT a Solana-only wallet?' }, options: [{ ko: 'Phantom', en: 'Phantom' }, { ko: 'Solflare', en: 'Solflare' }, { ko: 'Backpack', en: 'Backpack' }, { ko: '모두 Solana 지원', en: 'All support Solana' }], answer: 3 },
    { q: { ko: '지갑 클라이언트를 선택할 때 가장 중요한 기준은?', en: 'What is the most important criterion when choosing a wallet client?' }, options: [{ ko: '디자인', en: 'Design' }, { ko: '보안성과 오픈소스 여부', en: 'Security and open-source status' }, { ko: '가격', en: 'Price' }, { ko: '친구 추천', en: 'Friend recommendation' }], answer: 1 },
  ],

  // ── Week 2: Wallet Security ──
  'w1-4': [
    { q: { ko: '버너 지갑의 주요 목적은?', en: 'What is the main purpose of a burner wallet?' }, options: [{ ko: '장기 자산 보관', en: 'Long-term asset storage' }, { ko: '의심스러운 dApp 사용 시 메인 지갑 보호', en: 'Protecting main wallet when using suspicious dApps' }, { ko: '스테이킹 수익 극대화', en: 'Maximizing staking rewards' }, { ko: 'NFT 수집', en: 'NFT collecting' }], answer: 1 },
    { q: { ko: '버너 지갑 사용 후 권장되는 행동은?', en: 'What is recommended after using a burner wallet?' }, options: [{ ko: '자산을 그대로 두기', en: 'Leave assets as is' }, { ko: '자산을 메인 지갑으로 회수하고 폐기', en: 'Withdraw assets to main wallet and discard' }, { ko: '더 많은 자산 전송', en: 'Transfer more assets' }, { ko: '시드 문구 공유', en: 'Share the seed phrase' }], answer: 1 },
  ],
  'w1-5': [
    { q: { ko: '시드 문구를 안전하게 보관하는 가장 좋은 방법은?', en: 'What is the safest way to store a seed phrase?' }, options: [{ ko: '스크린샷으로 저장', en: 'Save as screenshot' }, { ko: '클라우드에 업로드', en: 'Upload to cloud' }, { ko: '종이에 적어 안전한 곳에 보관', en: 'Write on paper and store safely' }, { ko: '메모 앱에 저장', en: 'Save in notes app' }], answer: 2 },
    { q: { ko: '하드웨어 지갑의 장점은?', en: 'What is the advantage of a hardware wallet?' }, options: [{ ko: '무료', en: 'Free' }, { ko: '프라이빗 키가 오프라인에 보관됨', en: 'Private keys stored offline' }, { ko: '더 빠른 트랜잭션', en: 'Faster transactions' }, { ko: '더 많은 토큰 지원', en: 'More token support' }], answer: 1 },
  ],
  'w2-0': [
    { q: { ko: '지갑에서 "서명 요청"이 오면 가장 먼저 확인해야 할 것은?', en: 'What should you check first when a "signature request" appears in your wallet?' }, options: [{ ko: '트랜잭션 금액', en: 'Transaction amount' }, { ko: '요청하는 사이트의 URL', en: 'The requesting site URL' }, { ko: '지갑 잔고', en: 'Wallet balance' }, { ko: '가스비', en: 'Gas fee' }], answer: 1 },
    { q: { ko: '토큰 권한(Approval)을 해제해야 하는 이유는?', en: 'Why should you revoke token approvals?' }, options: [{ ko: '가스비 절약', en: 'Save gas fees' }, { ko: '악의적 컨트랙트가 자산에 접근하는 것을 방지', en: 'Prevent malicious contracts from accessing assets' }, { ko: '지갑 속도 향상', en: 'Improve wallet speed' }, { ko: '더 많은 에어드롭 수령', en: 'Receive more airdrops' }], answer: 1 },
  ],

  // ── Week 3: Tokens ──
  'w3-t1': [
    { q: { ko: 'SPL 토큰은 어떤 블록체인의 토큰 스탠다드인가요?', en: 'SPL tokens are the token standard for which blockchain?' }, options: [{ ko: 'Ethereum', en: 'Ethereum' }, { ko: 'Solana', en: 'Solana' }, { ko: 'Bitcoin', en: 'Bitcoin' }, { ko: 'Polygon', en: 'Polygon' }], answer: 1 },
    { q: { ko: 'ERC-20과 SPL 토큰의 공통점은?', en: 'What do ERC-20 and SPL tokens have in common?' }, options: [{ ko: '같은 블록체인 사용', en: 'Use the same blockchain' }, { ko: '대체 가능한(fungible) 토큰 스탠다드', en: 'Both are fungible token standards' }, { ko: '동일한 가스비 구조', en: 'Same gas fee structure' }, { ko: '같은 지갑 사용', en: 'Use the same wallet' }], answer: 1 },
  ],
  'w3-t2': [
    { q: { ko: '토큰 이코노미에서 "총 공급량"이란?', en: 'What is "total supply" in tokenomics?' }, options: [{ ko: '현재 유통 중인 토큰 수', en: 'Number of tokens currently in circulation' }, { ko: '발행될 수 있는 토큰의 최대 수량', en: 'Maximum number of tokens that can be minted' }, { ko: '소각된 토큰 수', en: 'Number of burned tokens' }, { ko: '스테이킹된 토큰 수', en: 'Number of staked tokens' }], answer: 1 },
    { q: { ko: '토큰 분배에서 "베스팅(Vesting)"의 의미는?', en: 'What does "vesting" mean in token distribution?' }, options: [{ ko: '즉시 판매', en: 'Immediate sale' }, { ko: '일정 기간에 걸쳐 점진적으로 잠금 해제', en: 'Gradual unlock over a set period' }, { ko: '영구 잠금', en: 'Permanent lock' }, { ko: '에어드롭', en: 'Airdrop' }], answer: 1 },
  ],
  'w3-t3': [
    { q: { ko: 'SPL 토큰을 직접 만들 때 필요한 것은?', en: 'What do you need to create your own SPL token?' }, options: [{ ko: '비트코인', en: 'Bitcoin' }, { ko: 'SOL (가스비)과 Solana CLI 또는 민팅 도구', en: 'SOL (for gas) and Solana CLI or minting tool' }, { ko: 'Ethereum 노드', en: 'Ethereum node' }, { ko: '거래소 계정', en: 'Exchange account' }], answer: 1 },
    { q: { ko: '토큰을 만든 후 유동성을 제공하는 이유는?', en: 'Why provide liquidity after creating a token?' }, options: [{ ko: '법적 의무', en: 'Legal obligation' }, { ko: '다른 사용자가 토큰을 거래할 수 있도록', en: 'So other users can trade the token' }, { ko: '보안 강화', en: 'Enhance security' }, { ko: '에어드롭 자격', en: 'Airdrop eligibility' }], answer: 1 },
  ],

  // ── Week 4: DYOR ──
  'w2-3': [
    { q: { ko: 'DYOR에서 "레드플래그"란?', en: 'What is a "red flag" in DYOR?' }, options: [{ ko: '투자 신호', en: 'Investment signal' }, { ko: '프로젝트의 위험 징후', en: 'Warning signs of a project' }, { ko: '기술적 지표', en: 'Technical indicator' }, { ko: '가격 상승 신호', en: 'Price increase signal' }], answer: 1 },
    { q: { ko: '프로젝트의 팀 정보가 없을 때 어떻게 판단해야 하나요?', en: 'How should you evaluate a project with no team information?' }, options: [{ ko: '긍정적으로 평가', en: 'Evaluate positively' }, { ko: '높은 위험 요소로 간주', en: 'Consider it a high risk factor' }, { ko: '무시', en: 'Ignore it' }, { ko: '더 많이 투자', en: 'Invest more' }], answer: 1 },
  ],
  'w2-4': [
    { q: { ko: 'NFT 프로젝트를 리서치할 때 확인해야 할 핵심 지표는?', en: 'What key metrics should you check when researching an NFT project?' }, options: [{ ko: '트위터 팔로워 수만', en: 'Only Twitter followers' }, { ko: '거래량, 홀더 수, 바닥 가격 추이', en: 'Volume, holder count, floor price trends' }, { ko: '디스코드 이모지 수', en: 'Discord emoji count' }, { ko: '홈페이지 디자인', en: 'Website design' }], answer: 1 },
    { q: { ko: 'Rugcheck.xyz 같은 도구의 용도는?', en: 'What is the purpose of tools like Rugcheck.xyz?' }, options: [{ ko: '토큰 가격 예측', en: 'Token price prediction' }, { ko: '토큰 컨트랙트의 안전성 검증', en: 'Verify token contract safety' }, { ko: 'NFT 민팅', en: 'NFT minting' }, { ko: '에어드롭 추적', en: 'Airdrop tracking' }], answer: 1 },
  ],
  'w2-5': [
    { q: { ko: '가장 흔한 크립토 스캠 유형은?', en: 'What is the most common type of crypto scam?' }, options: [{ ko: '하드웨어 해킹', en: 'Hardware hacking' }, { ko: '피싱 사이트와 가짜 에어드롭', en: 'Phishing sites and fake airdrops' }, { ko: '51% 공격', en: '51% attack' }, { ko: '양자 컴퓨팅 공격', en: 'Quantum computing attack' }], answer: 1 },
    { q: { ko: '"러그 풀(Rug Pull)"이란 무엇인가요?', en: 'What is a "rug pull"?' }, options: [{ ko: '스마트 컨트랙트 업그레이드', en: 'Smart contract upgrade' }, { ko: '개발자가 유동성을 빼고 프로젝트를 버리는 것', en: 'Developers draining liquidity and abandoning the project' }, { ko: '토큰 에어드롭', en: 'Token airdrop' }, { ko: '거버넌스 투표', en: 'Governance voting' }], answer: 1 },
  ],

  // ── Week 5: On-chain + Stablecoins ──
  'w2-1': [
    { q: { ko: 'Solscan에서 트랜잭션을 확인하려면 무엇이 필요한가요?', en: 'What do you need to check a transaction on Solscan?' }, options: [{ ko: '이메일 주소', en: 'Email address' }, { ko: '트랜잭션 해시 또는 지갑 주소', en: 'Transaction hash or wallet address' }, { ko: '비밀번호', en: 'Password' }, { ko: '프라이빗 키', en: 'Private key' }], answer: 1 },
    { q: { ko: '블록 탐색기의 주요 용도는?', en: 'What is the main use of a block explorer?' }, options: [{ ko: '토큰 구매', en: 'Buying tokens' }, { ko: '온체인 트랜잭션 내역 조회 및 검증', en: 'Viewing and verifying on-chain transaction history' }, { ko: '지갑 생성', en: 'Creating wallets' }, { ko: 'NFT 민팅', en: 'NFT minting' }], answer: 1 },
  ],
  'w2-2': [
    { q: { ko: '고래(Whale) 지갑을 추적하는 이유는?', en: 'Why track whale wallets?' }, options: [{ ko: '해킹하기 위해', en: 'To hack them' }, { ko: '시장 움직임의 단서를 얻기 위해', en: 'To get clues about market movements' }, { ko: '그들의 비밀번호를 알기 위해', en: 'To learn their passwords' }, { ko: '에어드롭 받기 위해', en: 'To receive airdrops' }], answer: 1 },
    { q: { ko: '토큰 흐름 분석에서 "대규모 전송"이 의미할 수 있는 것은?', en: 'What could a "large transfer" indicate in token flow analysis?' }, options: [{ ko: '항상 매수 신호', en: 'Always a buy signal' }, { ko: '거래소 입출금, OTC 거래, 또는 프로젝트 자금 이동', en: 'Exchange deposits/withdrawals, OTC trades, or project fund movements' }, { ko: '버그', en: 'A bug' }, { ko: '네트워크 오류', en: 'Network error' }], answer: 1 },
  ],
  'w4-1': [
    { q: { ko: 'USDT, USDC, DAI의 공통점은?', en: 'What do USDT, USDC, and DAI have in common?' }, options: [{ ko: '모두 탈중앙화', en: 'All decentralized' }, { ko: '달러에 1:1 페깅된 스테이블코인', en: 'Stablecoins pegged 1:1 to the dollar' }, { ko: '같은 회사가 발행', en: 'Issued by the same company' }, { ko: '같은 블록체인에서만 작동', en: 'Only work on the same blockchain' }], answer: 1 },
    { q: { ko: 'DAI가 USDT/USDC와 다른 점은?', en: 'How is DAI different from USDT/USDC?' }, options: [{ ko: '더 빠름', en: 'Faster' }, { ko: '알고리즘/담보 기반 탈중앙화 스테이블코인', en: 'Algorithmic/collateral-based decentralized stablecoin' }, { ko: '더 비쌈', en: 'More expensive' }, { ko: '더 오래됨', en: 'Older' }], answer: 1 },
  ],

  // ── Week 6: DeFi ──
  'w6-d1': [
    { q: { ko: 'DeFi(탈중앙 금융)의 핵심 특징은?', en: 'What is the core feature of DeFi (Decentralized Finance)?' }, options: [{ ko: '중앙 기관이 관리', en: 'Managed by a central authority' }, { ko: '스마트 컨트랙트로 중개인 없이 금융 서비스 제공', en: 'Financial services via smart contracts without intermediaries' }, { ko: '은행이 운영', en: 'Operated by banks' }, { ko: '정부 규제 필수', en: 'Government regulation required' }], answer: 1 },
    { q: { ko: 'DeFi에서 "TVL"이란?', en: 'What is "TVL" in DeFi?' }, options: [{ ko: '총 거래량', en: 'Total volume' }, { ko: '프로토콜에 예치된 총 자산 가치', en: 'Total Value Locked in a protocol' }, { ko: '일일 사용자 수', en: 'Daily active users' }, { ko: '토큰 가격', en: 'Token price' }], answer: 1 },
  ],
  'w3-1': [
    { q: { ko: 'AMM(자동화된 마켓 메이커)의 역할은?', en: 'What is the role of an AMM (Automated Market Maker)?' }, options: [{ ko: '주문서 관리', en: 'Order book management' }, { ko: '유동성 풀을 사용한 자동 가격 결정과 거래', en: 'Automatic pricing and trading using liquidity pools' }, { ko: '중앙 거래소 운영', en: 'Central exchange operation' }, { ko: 'KYC 인증', en: 'KYC verification' }], answer: 1 },
    { q: { ko: '유동성 풀에 자산을 제공하면 받는 것은?', en: 'What do you receive for providing assets to a liquidity pool?' }, options: [{ ko: 'NFT', en: 'NFT' }, { ko: 'LP 토큰과 거래 수수료 수익', en: 'LP tokens and trading fee revenue' }, { ko: '에어드롭', en: 'Airdrop' }, { ko: '거버넌스 투표권만', en: 'Only governance voting rights' }], answer: 1 },
  ],
  'w3-2': [
    { q: { ko: 'Orca와 Raydium의 공통점은?', en: 'What do Orca and Raydium have in common?' }, options: [{ ko: 'Ethereum 기반 DEX', en: 'Ethereum-based DEX' }, { ko: 'Solana 기반 DEX', en: 'Solana-based DEX' }, { ko: '중앙화 거래소', en: 'Centralized exchange' }, { ko: 'NFT 마켓플레이스', en: 'NFT marketplace' }], answer: 1 },
    { q: { ko: 'DEX에서 스왑 시 "슬리피지(Slippage)"란?', en: 'What is "slippage" when swapping on a DEX?' }, options: [{ ko: '수수료', en: 'Fees' }, { ko: '예상 가격과 실제 체결 가격의 차이', en: 'Difference between expected and actual execution price' }, { ko: '전송 속도', en: 'Transfer speed' }, { ko: '가스비', en: 'Gas fee' }], answer: 1 },
  ],

  // ── Week 7: NFT + DAO ──
  'w3-4': [
    { q: { ko: 'NFT(Non-Fungible Token)의 특징은?', en: 'What is a characteristic of NFTs (Non-Fungible Tokens)?' }, options: [{ ko: '대체 가능', en: 'Fungible' }, { ko: '각각 고유하며 대체 불가능', en: 'Each is unique and non-fungible' }, { ko: '항상 같은 가격', en: 'Always the same price' }, { ko: '소각 불가', en: 'Cannot be burned' }], answer: 1 },
    { q: { ko: 'NFT의 실제 활용 사례가 아닌 것은?', en: 'Which is NOT a real use case for NFTs?' }, options: [{ ko: '디지털 아트 소유권 증명', en: 'Digital art ownership proof' }, { ko: '이벤트 티켓', en: 'Event tickets' }, { ko: '은행 대출 승인', en: 'Bank loan approval' }, { ko: '게임 내 아이템', en: 'In-game items' }], answer: 2 },
  ],
  'w3-5': [
    { q: { ko: 'Metaplex Core의 주요 장점은?', en: 'What is the main advantage of Metaplex Core?' }, options: [{ ko: '무료 민팅', en: 'Free minting' }, { ko: 'Solana에서 효율적이고 저렴한 NFT 생성', en: 'Efficient and affordable NFT creation on Solana' }, { ko: 'Ethereum과의 호환성', en: 'Ethereum compatibility' }, { ko: '자동 판매', en: 'Automatic sales' }], answer: 1 },
    { q: { ko: 'NFT 민팅 전 준비해야 할 것은?', en: 'What should you prepare before minting an NFT?' }, options: [{ ko: '비트코인', en: 'Bitcoin' }, { ko: '이미지/메타데이터와 SOL(가스비)', en: 'Image/metadata and SOL (for gas)' }, { ko: 'Ethereum 지갑', en: 'Ethereum wallet' }, { ko: '거래소 계정', en: 'Exchange account' }], answer: 1 },
  ],
  'w7-g1': [
    { q: { ko: 'DAO(Decentralized Autonomous Organization)란?', en: 'What is a DAO (Decentralized Autonomous Organization)?' }, options: [{ ko: '중앙화된 기업', en: 'Centralized company' }, { ko: '스마트 컨트랙트 기반의 탈중앙 의사결정 조직', en: 'Decentralized decision-making organization based on smart contracts' }, { ko: '정부 기관', en: 'Government agency' }, { ko: 'NFT 컬렉션', en: 'NFT collection' }], answer: 1 },
    { q: { ko: 'DAO에서 투표권은 주로 무엇으로 결정되나요?', en: 'What primarily determines voting power in a DAO?' }, options: [{ ko: '나이', en: 'Age' }, { ko: '보유한 거버넌스 토큰 수량', en: 'Amount of governance tokens held' }, { ko: '가입 순서', en: 'Sign-up order' }, { ko: '국적', en: 'Nationality' }], answer: 1 },
  ],

  // ── Week 8: Graduation ──
  'w4-2': [
    { q: { ko: '크로스체인 브릿지의 역할은?', en: 'What is the role of a cross-chain bridge?' }, options: [{ ko: '같은 체인 내 전송', en: 'Transfer within the same chain' }, { ko: '서로 다른 블록체인 간 자산 이동', en: 'Moving assets between different blockchains' }, { ko: 'NFT 민팅', en: 'NFT minting' }, { ko: '스테이킹', en: 'Staking' }], answer: 1 },
    { q: { ko: 'deBridge를 사용할 때 주의할 점은?', en: 'What should you be careful about when using deBridge?' }, options: [{ ko: '무제한 사용 가능', en: 'Unlimited usage' }, { ko: '브릿지 수수료와 슬리피지 확인', en: 'Check bridge fees and slippage' }, { ko: '프라이빗 키 입력 필요', en: 'Need to enter private key' }, { ko: '최소 1 BTC 필요', en: 'Minimum 1 BTC required' }], answer: 1 },
  ],
  'w4-3': [
    { q: { ko: '밸리데이터(Validator)의 역할은?', en: 'What is the role of a validator?' }, options: [{ ko: '토큰 발행', en: 'Token issuance' }, { ko: '트랜잭션 검증과 블록 생성', en: 'Transaction verification and block creation' }, { ko: 'NFT 디자인', en: 'NFT design' }, { ko: '지갑 생성', en: 'Wallet creation' }], answer: 1 },
    { q: { ko: 'SOL 스테이킹의 장점은?', en: 'What is the benefit of SOL staking?' }, options: [{ ko: '즉시 출금 가능', en: 'Instant withdrawal' }, { ko: '네트워크 보안에 기여하며 보상 수령', en: 'Contribute to network security and receive rewards' }, { ko: '가격 상승 보장', en: 'Guaranteed price increase' }, { ko: '수수료 면제', en: 'Fee exemption' }], answer: 1 },
  ],
  'w8-p1': [
    { q: { ko: '온체인 포트폴리오를 만들 때 포함해야 할 것은?', en: 'What should be included when building an on-chain portfolio?' }, options: [{ ko: '비밀번호', en: 'Passwords' }, { ko: '완료한 온체인 액션과 트랜잭션 기록', en: 'Completed on-chain actions and transaction records' }, { ko: '개인정보', en: 'Personal information' }, { ko: '신용카드 정보', en: 'Credit card info' }], answer: 1 },
    { q: { ko: '4주 과정에서 가장 중요한 교훈은?', en: 'What is the most important lesson from the 4-week course?' }, options: [{ ko: '빠르게 투자하기', en: 'Invest quickly' }, { ko: '직접 해보며 안전하게 온체인 경험 쌓기', en: 'Build on-chain experience safely through hands-on practice' }, { ko: '많이 투자하기', en: 'Invest a lot' }, { ko: '남의 조언 따르기', en: 'Follow others advice' }], answer: 1 },
  ],
}

export const weeklyTests = {
  // keyed by weekId (1-8)
  1: [
    { q: { ko: '온체인(On-chain)이란 무엇을 의미하나요?', en: 'What does "on-chain" mean?' }, options: [{ ko: '거래소에서 거래하는 것', en: 'Trading on an exchange' }, { ko: '블록체인 네트워크에서 직접 활동하는 것', en: 'Directly operating on a blockchain network' }, { ko: '오프라인 거래', en: 'Offline trading' }, { ko: '은행 송금', en: 'Bank transfer' }], answer: 1 },
    { q: { ko: '지갑의 퍼블릭 키(공개키)는 어떤 역할을 하나요?', en: 'What role does a public key play in a wallet?' }, options: [{ ko: '자산을 전송할 때 사용', en: 'Used to send assets' }, { ko: '다른 사람이 자산을 보낼 수 있는 주소 역할', en: 'Acts as an address for others to send assets to' }, { ko: '비밀번호 역할', en: 'Acts as a password' }, { ko: '시드 문구 생성', en: 'Generates seed phrase' }], answer: 1 },
  ],
  2: [
    { q: { ko: '피싱 공격을 방지하는 가장 좋은 방법은?', en: 'What is the best way to prevent phishing attacks?' }, options: [{ ko: '모든 링크 클릭', en: 'Click all links' }, { ko: 'URL을 항상 직접 확인하고 북마크 사용', en: 'Always verify URLs manually and use bookmarks' }, { ko: '안티바이러스만 설치', en: 'Just install antivirus' }, { ko: 'VPN 사용', en: 'Use VPN' }], answer: 1 },
    { q: { ko: '지갑 보안에서 "콜드 스토리지"란?', en: 'What is "cold storage" in wallet security?' }, options: [{ ko: '냉장고에 보관', en: 'Store in a fridge' }, { ko: '인터넷에 연결되지 않은 오프라인 보관 방식', en: 'Offline storage not connected to the internet' }, { ko: '클라우드 백업', en: 'Cloud backup' }, { ko: '거래소 보관', en: 'Exchange storage' }], answer: 1 },
  ],
  3: [
    { q: { ko: '토큰의 "시가총액(Market Cap)"을 계산하는 방법은?', en: 'How do you calculate a token\'s market cap?' }, options: [{ ko: '총 공급량 x 가격', en: 'Total supply x price' }, { ko: '유통 공급량 x 현재 가격', en: 'Circulating supply x current price' }, { ko: '거래량 x 가격', en: 'Volume x price' }, { ko: '홀더 수 x 가격', en: 'Holders x price' }], answer: 1 },
    { q: { ko: 'SPL 토큰을 보유하려면 어떤 지갑이 필요한가요?', en: 'What wallet do you need to hold SPL tokens?' }, options: [{ ko: 'MetaMask', en: 'MetaMask' }, { ko: 'Solana 호환 지갑 (Phantom, Solflare 등)', en: 'Solana-compatible wallet (Phantom, Solflare, etc.)' }, { ko: 'Bitcoin Core', en: 'Bitcoin Core' }, { ko: '은행 앱', en: 'Banking app' }], answer: 1 },
  ],
  4: [
    { q: { ko: 'DYOR에서 프로젝트의 "백서(Whitepaper)"를 확인하는 이유는?', en: 'Why check a project\'s whitepaper in DYOR?' }, options: [{ ko: '디자인 평가', en: 'Evaluate design' }, { ko: '프로젝트의 기술, 비전, 토큰 경제를 이해하기 위해', en: 'To understand the project\'s technology, vision, and token economics' }, { ko: '팀 사진 확인', en: 'Check team photos' }, { ko: '가격 예측', en: 'Price prediction' }], answer: 1 },
    { q: { ko: '"허니팟(Honeypot)" 스캠이란?', en: 'What is a "honeypot" scam?' }, options: [{ ko: '무료 토큰 배포', en: 'Free token distribution' }, { ko: '매수는 가능하나 매도가 불가능한 토큰', en: 'A token you can buy but cannot sell' }, { ko: '보안 감사', en: 'Security audit' }, { ko: '에어드롭 이벤트', en: 'Airdrop event' }], answer: 1 },
  ],
  5: [
    { q: { ko: 'Solscan에서 "프로그램(Program)"이란?', en: 'What is a "program" on Solscan?' }, options: [{ ko: '사용자 계정', en: 'User account' }, { ko: 'Solana 블록체인의 스마트 컨트랙트', en: 'Smart contract on Solana blockchain' }, { ko: '지갑 앱', en: 'Wallet app' }, { ko: '브라우저 플러그인', en: 'Browser plugin' }], answer: 1 },
    { q: { ko: '스테이블코인이 "디페깅(De-peg)"되면 어떤 일이 발생하나요?', en: 'What happens when a stablecoin "de-pegs"?' }, options: [{ ko: '가격이 상승', en: 'Price increases' }, { ko: '달러와의 1:1 가치가 깨짐', en: 'The 1:1 value with the dollar breaks' }, { ko: '전송 불가', en: 'Cannot transfer' }, { ko: '자동 소각', en: 'Auto burn' }], answer: 1 },
  ],
  6: [
    { q: { ko: '"비영구적 손실(Impermanent Loss)"이란?', en: 'What is "impermanent loss"?' }, options: [{ ko: '가스비 손실', en: 'Gas fee loss' }, { ko: '유동성 풀에 자산을 제공한 후 가격 변동으로 인한 손실', en: 'Loss due to price changes after providing assets to a liquidity pool' }, { ko: '해킹 손실', en: 'Hacking loss' }, { ko: '전송 실패 손실', en: 'Transfer failure loss' }], answer: 1 },
    { q: { ko: 'DEX와 CEX의 가장 큰 차이점은?', en: 'What is the biggest difference between DEX and CEX?' }, options: [{ ko: '속도', en: 'Speed' }, { ko: 'DEX는 스마트 컨트랙트 기반, CEX는 중앙 서버 기반', en: 'DEX is smart contract-based, CEX is central server-based' }, { ko: '디자인', en: 'Design' }, { ko: '지원 토큰 수', en: 'Number of supported tokens' }], answer: 1 },
  ],
  7: [
    { q: { ko: 'NFT의 "메타데이터"에 저장되는 정보는?', en: 'What information is stored in NFT metadata?' }, options: [{ ko: '프라이빗 키', en: 'Private key' }, { ko: '이름, 설명, 이미지 URL, 속성 등', en: 'Name, description, image URL, attributes, etc.' }, { ko: '비밀번호', en: 'Password' }, { ko: '거래 내역', en: 'Transaction history' }], answer: 1 },
    { q: { ko: 'DAO의 거버넌스 프로세스 순서는?', en: 'What is the typical DAO governance process?' }, options: [{ ko: '투표 → 제안 → 실행', en: 'Vote → Propose → Execute' }, { ko: '제안 → 토론 → 투표 → 실행', en: 'Propose → Discuss → Vote → Execute' }, { ko: '실행 → 투표 → 제안', en: 'Execute → Vote → Propose' }, { ko: '제안 → 실행', en: 'Propose → Execute' }], answer: 1 },
  ],
  8: [
    { q: { ko: 'Layer 2(L2) 솔루션의 목적은?', en: 'What is the purpose of Layer 2 (L2) solutions?' }, options: [{ ko: '새로운 블록체인 생성', en: 'Create new blockchain' }, { ko: 'Layer 1의 확장성 문제를 해결하고 비용 절감', en: 'Solve Layer 1 scalability issues and reduce costs' }, { ko: 'NFT 생성', en: 'NFT creation' }, { ko: '토큰 소각', en: 'Token burning' }], answer: 1 },
    { q: { ko: 'Solana 스테이킹에서 "에포크(Epoch)"란?', en: 'What is an "epoch" in Solana staking?' }, options: [{ ko: '토큰 이름', en: 'Token name' }, { ko: '밸리데이터 보상이 분배되는 주기 (약 2-3일)', en: 'Period during which validator rewards are distributed (~2-3 days)' }, { ko: '지갑 유형', en: 'Wallet type' }, { ko: 'NFT 컬렉션', en: 'NFT collection' }], answer: 1 },
  ],
}

// Helper to get quiz title based on lessonId or weekId
export function getQuizTitle(type, id, lang = 'ko') {
  if (type === 'weekly') {
    return lang === 'ko' ? `Week ${id} 주간 테스트` : `Week ${id} Weekly Test`
  }
  // For article quizzes, we need to look up the lesson title from curriculum
  return null // Resolved by Quiz.jsx from curriculum data
}
