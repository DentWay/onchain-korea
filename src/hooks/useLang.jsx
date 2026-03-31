import { useState, useCallback, createContext, useContext } from 'react'

const LangContext = createContext(null)

const translations = {
  // Nav & Sidebar
  'nav.start': { ko: '시작하기', en: 'Get Started' },
  'nav.curriculum': { ko: '커리큘럼', en: 'Curriculum' },
  'nav.features': { ko: '특징', en: 'Features' },
  'sidebar.title': { ko: 'Onchain Korea', en: 'Onchain Korea' },
  'sidebar.tagline': { ko: '블록체인, 처음부터 안전하게', en: 'Blockchain, safely from the start' },
  'sidebar.learning': { ko: '학습', en: 'Learning' },
  'sidebar.community_label': { ko: '소통', en: 'Community' },
  'sidebar.dashboard': { ko: '대시보드', en: 'Dashboard' },
  'sidebar.thisWeek': { ko: '이번 주 수업', en: "This Week's Lesson" },
  'sidebar.actionGuide': { ko: '실습 가이드', en: 'Action Guide' },
  'sidebar.hiddenTopics': { ko: '히든 토픽', en: 'Hidden Topics' },
  'sidebar.community': { ko: '커뮤니티', en: 'Community' },
  'sidebar.certificate': { ko: '수료 증명', en: 'Proof of Attendance' },
  'sidebar.progress': { ko: '전체 진행률', en: 'Overall Progress' },
  'sidebar.weekProgress': { ko: '진행 중', en: 'In Progress' },

  // Dashboard
  'dash.title': { ko: '대시보드', en: 'Dashboard' },
  'dash.progress': { ko: '진행률', en: 'Progress' },
  'dash.completedLessons': { ko: '완료 레슨', en: 'Completed' },
  'dash.onchainActions': { ko: '온체인 액션', en: 'Actions' },
  'dash.hiddenTopics': { ko: '히든 토픽', en: 'Hidden Topics' },
  'dash.completed': { ko: '완료', en: 'done' },
  'dash.notStarted': { ko: '시작 전', en: 'Not started' },
  'dash.inProgress': { ko: '실습 진행 중', en: 'In progress' },
  'dash.thisWeekOpen': { ko: '이번 주 공개!', en: 'Open this week!' },
  'dash.readDone': { ko: '읽기 완료!', en: 'Read!' },
  'dash.curriculum4w': { ko: '4주 커리큘럼', en: '4-Week Curriculum' },
  'dash.done': { ko: '완료 ✓', en: 'Done ✓' },
  'dash.current': { ko: '진행 중', en: 'In Progress' },
  'dash.thisWeekHidden': { ko: '이번 주 히든 토픽', en: "This Week's Hidden Topic" },
  'dash.lessons': { ko: '레슨', en: 'Lessons' },
  'dash.actions': { ko: '액션', en: 'Actions' },
  'dash.topics': { ko: '히든토픽', en: 'Topics' },
  'dash.doneSub': { ko: '완료', en: 'done' },
  'dash.verified': { ko: '인증', en: 'verified' },
  'dash.read': { ko: '참여', en: 'read' },
  'dash.certLabel': { ko: '수료 조건', en: 'Proof of Attendance' },
  'dash.semesterDeadline': { ko: '학기 마감', en: 'Semester Deadline' },

  // Week Detail
  'week.back': { ko: '대시보드', en: 'Dashboard' },
  'week.learningProgress': { ko: '학습 진행률', en: 'Learning Progress' },
  'week.onchainAction': { ko: '온체인 액션', en: 'On-chain Actions' },
  'week.complete': { ko: '완료', en: 'complete' },
  'week.lessons': { ko: '학습 콘텐츠 (Greed Academy 기반)', en: 'Learning Content (Based on Greed Academy)' },
  'week.actions': { ko: '이번 주 실습 (Action Guide)', en: "This Week's Practice (Action Guide)" },
  'week.guide': { ko: '가이드 →', en: 'Guide →' },
  'week.hiddenTopic': { ko: '히든 토픽', en: 'Hidden Topic' },
  'week.hotIssue': { ko: '이번 주 핫이슈', en: "This Week's Hot Issue" },
  'week.participating': { ko: '명 참여', en: ' participating' },
  'week.lessonsDone': { ko: '레슨 완료', en: 'lessons done' },
  'week.actionsVerified': { ko: '액션 인증', en: 'actions verified' },
  'week.completePrevLesson': { ko: '이전 레슨을 먼저 완료하세요', en: 'Complete the previous lesson first' },
  'week.completeLessonsForActions': { ko: '모든 레슨을 완료하면 열립니다', en: 'Complete all lessons to unlock' },
  'week.completeActionForHidden': { ko: '액션 1개 이상 완료하면 열립니다', en: 'Complete at least 1 action to unlock' },

  // Lesson Detail
  'lesson.preparing': { ko: '한국어 콘텐츠 준비 중', en: 'Korean content coming soon' },
  'lesson.preparingDesc': { ko: '이 레슨의 한국어 번역 콘텐츠가 곧 업데이트됩니다.\n그동안 Greed Academy 원문을 참고해주세요.', en: 'Korean translation of this lesson will be available soon.\nPlease refer to the original Greed Academy article in the meantime.' },
  'lesson.readOriginal': { ko: 'Greed Academy 원문 읽기 (영어)', en: 'Read Original on Greed Academy' },
  'lesson.markComplete': { ko: '원문 읽기를 완료했다면 — 학습 완료로 표시', en: 'Mark as complete after reading' },
  'lesson.completed': { ko: '학습 완료됨 (클릭하면 취소)', en: 'Completed (click to undo)' },
  'lesson.keyTakeaways': { ko: '핵심 정리', en: 'Key Takeaways' },
  'lesson.originalSource': { ko: '원문 출처', en: 'Original Source' },
  'lesson.readOriginalShort': { ko: '원문 읽기', en: 'Read Original' },
  'lesson.nextLesson': { ko: '다음 레슨', en: 'Next Lesson' },

  // Action Guide
  'action.practice': { ko: '실습', en: 'Practice' },
  'action.complete': { ko: '완료하기', en: 'Mark Complete' },
  'action.completed': { ko: '완료됨', en: 'Completed' },
  'action.next': { ko: '다음 실습', en: 'Next Practice' },
  'action.nextStart': { ko: '클릭해서 시작하기', en: 'Click to start' },
  'action.safety': { ko: '안전 수칙 — 반드시 읽으세요', en: 'Safety Tips — Must Read' },

  // Hidden Topics
  'hidden.title': { ko: '히든 토픽', en: 'Hidden Topics' },
  'hidden.desc': { ko: '매주 한국에서 가장 뜨거운 Web3 주제를 다룹니다. 포럼에서 토론하고, 관련 온체인 액션까지 해보세요.', en: 'Weekly hot Web3 topics in Korea. Discuss in the forum and try related on-chain actions.' },
  'hidden.open': { ko: '공개 중', en: 'Open' },
  'hidden.readDone': { ko: '읽기 완료', en: 'Read' },
  'hidden.nextWeek': { ko: '다음 주 공개', en: 'Opens next week' },
  'hidden.weeksLater': { ko: '주 후 공개', en: ' weeks later' },
  'hidden.scheduled': { ko: '예정', en: 'Scheduled' },
  'hidden.forumScheduled': { ko: '포럼 예정', en: 'Forum TBD' },
  'hidden.markRead': { ko: '읽기 완료로 표시', en: 'Mark as read' },
  'hidden.readComplete': { ko: '읽기 완료 ✓', en: 'Read ✓' },
  'hidden.complete': { ko: '완료', en: 'Done' },
  'hidden.action': { ko: '액션', en: 'Action' },
  'hidden.thisWeek': { ko: '이번 주', en: 'This week' },
  'hidden.collapse': { ko: '접기', en: 'Collapse' },
  'hidden.readArticle': { ko: '아티클 읽기', en: 'Read Article' },
  'hidden.keyTakeaways': { ko: '핵심 정리', en: 'Key Takeaways' },

  // Certificate
  'cert.title': { ko: '수료 증명', en: 'Proof of Attendance' },
  'cert.congrats': { ko: '수료를 축하합니다!', en: 'Congratulations!' },
  'cert.allDone': { ko: '모든 수료 조건을 달성했습니다', en: 'All requirements have been met' },
  'cert.notYet': { ko: '아직 수료 전이에요', en: 'Not yet completed' },
  'cert.notYetDesc': { ko: '아래 조건을 충족하면 수료 증명이 발급됩니다', en: 'Meet the requirements below to earn your Proof of Attendance' },
  'cert.requirements': { ko: '수료 조건:', en: 'Requirements:' },
  'cert.lessons80': { ko: '주차별 학습 콘텐츠 80% 완료', en: '80% of weekly learning content completed' },
  'cert.actions3': { ko: '개 이상 인증', en: '+ actions verified' },
  'cert.hidden2': { ko: '개 이상 참여', en: '+ hidden topics read' },
  'cert.issued': { ko: '발급된 수료 증명:', en: 'Issued Proof of Attendance:' },
  'cert.preview': { ko: '수료 시 받게 될 수료 증명:', en: 'Proof of Attendance preview:' },

  // Community
  'community.title': { ko: '커뮤니티', en: 'Community' },
  'community.stats': { ko: '커뮤니티 현황', en: 'Community Stats' },
  'community.totalMembers': { ko: '총 참여자', en: 'Total Members' },
  'community.activeMembers': { ko: '카톡 활성 멤버', en: 'Active Members' },
  'community.forumPosts': { ko: '이번 주 포럼 글', en: 'Forum Posts' },
  'community.recentActivity': { ko: '최근 활동', en: 'Recent Activity' },

  // Landing page
  'landing.badge': { ko: 'Greed Academy 커리큘럼 기반 · 완전 무료', en: 'Based on Greed Academy Curriculum · 100% Free' },
  'landing.hero1': { ko: '블록체인, ', en: 'Blockchain, ' },
  'landing.hero2': { ko: '4주면 충분합니다', en: '4 Weeks Is All You Need' },
  'landing.heroSub': { ko: '지갑 만들기부터 DeFi, NFT, 크로스체인까지.\n매주 직접 온체인에서 실습합니다.', en: 'From wallet setup to DeFi, NFT, and cross-chain.\nHands-on on-chain practice every week.' },
  'landing.startFree': { ko: '무료로 시작하기', en: 'Start for Free' },
  'landing.viewCurriculum': { ko: '커리큘럼 보기', en: 'View Curriculum' },
  'landing.curriculum': { ko: 'Curriculum', en: 'Curriculum' },
  'landing.roadmap': { ko: '4주 완성 로드맵', en: '4-Week Roadmap' },
  'landing.roadmapDesc': { ko: '매주 레슨 + 실습 + 히든 토픽. 단계별로 쌓아갑니다.', en: 'Weekly lessons + practice + hidden topics. Building step by step.' },
  'landing.features': { ko: 'Features', en: 'Features' },
  'landing.featuresTitle': { ko: '읽기만 하는 교육은 끝', en: 'No More Read-Only Education' },
  'landing.featuresDesc': { ko: '직접 해봐야 내 것이 됩니다.', en: 'You have to do it to learn it.' },
  'landing.certTitle': { ko: '온체인 수료 증명', en: 'On-chain Proof of Attendance' },
  'landing.certDesc': { ko: '레슨 80% 이상 + 온체인 액션 3개 + 히든 토픽 2개 완료 시\nPoAP(Proof of Attendance Protocol) 방식으로 블록체인에 영구 기록되는 수료 증명을 발급합니다.', en: '80%+ lessons + 3 on-chain actions + 2 hidden topics.\nA Proof of Attendance (PoAP-style) token permanently recorded on the blockchain.' },
  'landing.finalTitle1': { ko: '4주 뒤,', en: 'After 4 weeks,' },
  'landing.finalTitle2': { ko: '온체인이 익숙해집니다', en: 'you\'ll feel at home on-chain' },
  'landing.finalDesc': { ko: '지갑 만들기부터 스테이킹까지. 완전 무료, 한국어로.', en: 'From wallet setup to staking. Completely free, in Korean.' },
  'landing.noSignup': { ko: '가입 없이 바로 시작할 수 있어요', en: 'No sign-up required — start right away' },
  'landing.noCard': { ko: '카드 정보 불필요 · 광고 없음 · 언제든 중단 가능', en: 'No credit card · No ads · Quit anytime' },
  'landing.socialProof': { ko: '명이 이미 시작했습니다', en: ' have already started' },
  'landing.socialProofEnrolled': { ko: '명이 이미 등록했습니다', en: ' already enrolled' },
  'landing.startNow': { ko: '지금 바로 시작할 수 있습니다', en: 'You can start right now' },
  'landing.startNowSub': { ko: '카드 정보 불필요 · 4주 완성 · Solana 수료 증명', en: 'No credit card · 4 weeks · Solana Proof of Attendance' },
  'landing.startWeek1': { ko: 'Week 1 시작하기', en: 'Start Week 1' },
  'landing.startFromWeek1': { ko: 'Week 1부터 시작하기', en: 'Start from Week 1' },
  'landing.semesterCloses': { ko: 'Semester 1 + 2 마감까지', en: 'Semester 1 + 2 closes in' },
  'landing.priceAnchor': { ko: '유사 블록체인 교육 과정 평균 50~200만원', en: 'Average blockchain course $400~$1,500' },
  'landing.priceAnchorArrow': { ko: '→ Onchain Korea: ₩0', en: '→ Onchain Korea: $0' },
  'landing.priceAnchorShort': { ko: '유사 교육 과정 50~200만원', en: 'Similar courses $400~$1,500' },
  'landing.priceFree': { ko: '₩0 무료', en: '$0 Free' },

  // Stats
  'stats.weeks': { ko: '주', en: 'wk' },
  'stats.lessons': { ko: '개', en: '' },
  'stats.actions': { ko: '개', en: '' },
  'stats.curriculum': { ko: '커리큘럼', en: 'Curriculum' },
  'stats.lesson': { ko: '레슨', en: 'Lessons' },
  'stats.practice': { ko: '온체인 실습', en: 'On-chain Practice' },
  'stats.free': { ko: '무료', en: 'Free' },
  'stats.stepByStep': { ko: '단계별 학습', en: 'Step by step' },
  'stats.theoryPractice': { ko: '이론 + 실습', en: 'Theory + Practice' },
  'stats.handson': { ko: '직접 해보기', en: 'Hands-on' },
  'stats.noCost': { ko: '비용 없음', en: 'No cost' },
  'stats.completed': { ko: '명 완료', en: ' completed' },

  // Curriculum cards (landing)
  'cur.w1.title': { ko: '지갑 + 보안', en: 'Wallets + Security' },
  'cur.w1.desc': { ko: '지갑 만들기부터 시드 문구 백업, 버너 지갑까지', en: 'From wallet creation to seed phrase backup and burner wallets' },
  'cur.w2.title': { ko: '온체인 탐색 + DYOR', en: 'On-chain Exploration + DYOR' },
  'cur.w2.desc': { ko: '트랜잭션 읽기, 스캠 식별, 프로젝트 리서치', en: 'Reading transactions, identifying scams, project research' },
  'cur.w3.title': { ko: 'DeFi · NFT · 디지털 에셋', en: 'DeFi · NFT · Digital Assets' },
  'cur.w3.desc': { ko: 'DEX 스왑, LP 전략, Metaplex Core NFT 민팅', en: 'DEX swaps, LP strategies, Metaplex Core NFT minting' },
  'cur.w4.title': { ko: '스테이블코인 · 브릿지 · 스테이킹', en: 'Stablecoins · Bridges · Staking' },
  'cur.w4.desc': { ko: '크로스체인 전송, SOL 스테이킹, 거버넌스 참여', en: 'Cross-chain transfers, SOL staking, governance participation' },
  'cur.a.phantom': { ko: 'Phantom 지갑 설치', en: 'Install Phantom' },
  'cur.a.burner': { ko: '버너 지갑 만들기', en: 'Create Burner Wallet' },
  'cur.a.seed': { ko: '시드 문구 백업', en: 'Seed Phrase Backup' },
  'cur.a.solscan': { ko: 'Solscan 트랜잭션 추적', en: 'Solscan TX Tracking' },
  'cur.a.scam': { ko: '스캠 프로젝트 분석', en: 'Scam Analysis' },
  'cur.a.swap': { ko: 'DEX 첫 스왑', en: 'First DEX Swap' },
  'cur.a.nft': { ko: 'NFT 민팅', en: 'NFT Minting' },
  'cur.a.stable': { ko: '스테이블코인 전송', en: 'Stablecoin Transfer' },
  'cur.a.bridge': { ko: 'deBridge 브릿지', en: 'deBridge Bridge' },
  'cur.a.staking': { ko: 'SOL 스테이킹', en: 'SOL Staking' },

  // Features cards (landing)
  'feat.practice.title': { ko: '직접 해보는 실습', en: 'Hands-on Practice' },
  'feat.practice.desc': { ko: '매주 실제 온체인 액션을 수행합니다. 읽기만 하는 교육은 끝.', en: 'Perform real on-chain actions every week. No more read-only learning.' },
  'feat.practice.tag': { ko: '10개 실습', en: '10 Actions' },
  'feat.hidden.title': { ko: '히든 토픽', en: 'Hidden Topics' },
  'feat.hidden.desc': { ko: '한국 시장에 맞는 주간 핫토픽. 스테이블코인부터 한국 거래소 비교까지.', en: 'Weekly hot topics for the Korean market. From stablecoins to Korean exchange comparisons.' },
  'feat.hidden.tag': { ko: '매주 공개', en: 'Weekly' },
  'feat.cert.title': { ko: '온체인 수료 증명', en: 'On-chain Proof of Attendance' },
  'feat.cert.desc': { ko: '블록체인에 영구 기록되는 수료 증명(PoAP). 링크드인에 공유할 수 있어요.', en: 'A Proof of Attendance (PoAP-style) token permanently recorded on the blockchain. Shareable on LinkedIn.' },
  'feat.cert.tag': { ko: 'Solana 기반', en: 'Solana-based' },
  'feat.community.title': { ko: '카카오톡 커뮤니티', en: 'KakaoTalk Community' },
  'feat.community.desc': { ko: '같이 배우는 동기들과 카카오톡으로 소통. 졸업 후 스터디 그룹까지.', en: 'Connect with fellow learners via KakaoTalk. Post-graduation study groups included.' },
  'feat.community.tag': { ko: '네트워크', en: 'Network' },

  // Certificate preview (landing)
  'certprev.placeholder': { ko: '홍길동', en: 'Your Name' },
  'certprev.inputPlaceholder': { ko: '이름을 입력하면 수료증을 미리 볼 수 있어요', en: 'Enter your name to preview the certificate' },
  'certprev.completionText': { ko: '4주 블록체인 리터러시 과정에 참여하였음을 증명합니다.', en: 'has attended and completed the 4-week Blockchain Literacy course.' },
  'certprev.curriculum': { ko: '커리큘럼', en: 'Curriculum' },
  'certprev.verified': { ko: '검증', en: 'Verified on' },
  'certprev.actions': { ko: '실습', en: 'Actions' },
  'certprev.share': { ko: '공유하기', en: 'Share' },
  'certprev.solana': { ko: 'Solana 기반', en: 'Solana-based' },
  'certprev.permanent': { ko: '영구 기록', en: 'Permanent Record' },
  'certprev.linkedin': { ko: '링크드인 공유', en: 'LinkedIn Shareable' },

  // Why Section
  'why.label': { ko: 'WHY', en: 'WHY' },
  'why.title': { ko: '왜 Onchain Korea인가?', en: 'Why Onchain Korea?' },
  'why.desc': { ko: '블록체인 교육, 아무거나 들으면 안 됩니다.', en: 'Not all blockchain education is created equal.' },

  // Testimonials
  'testimonials.label': { ko: '수강생 후기', en: 'Testimonials' },
  'testimonials.title': { ko: '먼저 시작한 분들의 이야기', en: 'Stories from those who started first' },

  // FAQ
  'faq.title': { ko: '자주 묻는 질문', en: 'FAQ' },

  // Footer
  'footer.program': { ko: '프로그램', en: 'Program' },
  'footer.desc': { ko: '블록체인, 처음부터 안전하게. Greed Academy 커리큘럼 기반 무료 교육 프로그램.', en: 'Blockchain, safely from the start. Free education based on Greed Academy curriculum.' },

  // Fomo Banner
  'fomo.text': { ko: '등록 중', en: 'Open' },
  'fomo.bannerSpots': { ko: '명', en: ' spots' },
  'fomo.spotsLimit': { ko: '200명 한정', en: '200 spots' },
  'fomo.closes': { ko: '4월 30일 마감', en: 'Closes Apr 30' },

  // FOMO
  'fomo.badge': { ko: 'Semester 1 + 2 등록 중', en: 'Semester 1 + 2 Registration Open' },
  'fomo.spots': { ko: '명 등록 완료', en: ' enrolled' },
  'fomo.limited': { ko: '선착순 마감 예정', en: 'Limited spots — closing soon' },
  'fomo.live': { ko: '지금 참여자가 학습 중', en: 'Learners active right now' },

  // Auth
  'auth.title': { ko: '로그인', en: 'Sign In' },
  'auth.signup': { ko: '회원가입', en: 'Sign Up' },
  'auth.email': { ko: '이메일', en: 'Email' },
  'auth.password': { ko: '비밀번호', en: 'Password' },
  'auth.google': { ko: 'Google로 계속하기', en: 'Continue with Google' },
  'auth.kakao': { ko: '카카오로 계속하기', en: 'Continue with Kakao' },
  'auth.ethereum': { ko: 'Ethereum 지갑으로 연결', en: 'Connect Ethereum Wallet' },
  'auth.solana': { ko: 'Solana 지갑으로 연결', en: 'Connect Solana Wallet' },
  'auth.socialLogin': { ko: '소셜 로그인', en: 'Social Login' },
  'auth.walletLogin': { ko: '지갑 연결', en: 'Wallet Connect' },
  'auth.emailLogin': { ko: '이메일로 로그인', en: 'Sign in with Email' },
  'auth.or': { ko: '또는', en: 'or' },
  'auth.noEthWallet': { ko: 'MetaMask 등 Ethereum 지갑을 설치해주세요', en: 'Please install an Ethereum wallet like MetaMask' },
  'auth.noSolWallet': { ko: 'Phantom 등 Solana 지갑을 설치해주세요', en: 'Please install a Solana wallet like Phantom' },
  'auth.noAccount': { ko: '계정이 없으신가요?', en: "Don't have an account?" },
  'auth.hasAccount': { ko: '이미 계정이 있으신가요?', en: 'Already have an account?' },
  'auth.signOut': { ko: '로그아웃', en: 'Sign Out' },
  'auth.checkEmail': { ko: '이메일을 확인해주세요', en: 'Check your email' },
  'auth.confirmEmailSent': { ko: '로 확인 메일을 보냈습니다. 링크를 클릭하면 가입이 완료됩니다.', en: '. Click the link to complete signup.' },
  'auth.confirmEmailPrefix': { ko: '', en: 'We sent a confirmation email to ' },
  'auth.backToSignIn': { ko: '로그인으로 돌아가기', en: 'Back to Sign In' },
  'auth.backToHome': { ko: '홈으로', en: 'Back to Home' },
  'auth.name': { ko: '이름', en: 'Name' },
  'auth.processing': { ko: '처리 중...', en: 'Processing...' },

  // Error boundary
  'error.title': { ko: '문제가 발생했습니다', en: 'Something went wrong' },
  'error.desc': { ko: '페이지를 새로고침하거나 홈으로 돌아가주세요.', en: 'Please refresh the page or go back to home.' },
  'error.refresh': { ko: '새로고침', en: 'Refresh' },
  'error.home': { ko: '홈으로', en: 'Go Home' },

  // Footer
  'footer.based': { ko: 'Greed Academy 커리큘럼 기반', en: 'Based on Greed Academy Curriculum' },

  // Common
  'common.week': { ko: '주차', en: 'Week' },

  // CountdownTimer
  'countdown.closed': { ko: '마감됨', en: 'Closed' },
  'countdown.days': { ko: '일', en: 'Days' },
  'countdown.hours': { ko: '시간', en: 'Hrs' },
  'countdown.minutes': { ko: '분', en: 'Min' },
  'countdown.seconds': { ko: '초', en: 'Sec' },

  // Certificate (certificate card text)
  'cert.certificateOfCompletion': { ko: '수료 증명 (Proof of Attendance)', en: 'Proof of Attendance' },
  'cert.programSubtitle': { ko: '블록체인 리터러시 & 안전 프로그램', en: 'Blockchain Literacy & Safety Program' },
  'cert.completionStatement': { ko: '4주 프로그램을 성공적으로 수료하였습니다', en: 'has successfully completed the 4-week program' },
  'cert.onchainVerified': { ko: '온체인 인증 완료', en: 'On-chain verified' },
  'cert.poweredBy': { ko: 'Powered by Greed Academy × Elixi Venture Studio Group', en: 'Powered by Greed Academy × Elixi Venture Studio Group' },
  'cert.share': { ko: '공유하기', en: 'Share' },
  'cert.shareText': { ko: 'Onchain Korea 4주 블록체인 교육 수료! 온체인 수료 증명 발급 완료.', en: 'Completed Onchain Korea 4-week blockchain program! On-chain Proof of Attendance issued.' },
  'cert.disclaimer': { ko: '본 수료 증명은 학습 참여를 기록한 온체인 토큰이며, 공인 자격증이 아닙니다.', en: 'This Proof of Attendance is an on-chain token recording your participation, not an official credential.' },

  // Nav (landing)
  'nav.live': { ko: '학습 진행 중', en: 'Live' },

  // Breadcrumb
  'breadcrumb.dashboard': { ko: '대시보드', en: 'Dashboard' },

  // Community channels
  'ch.kakao.title': { ko: '카카오톡 오픈채팅', en: 'KakaoTalk Open Chat' },
  'ch.kakao.desc': { ko: '실시간 질문, 이번 주 수업 논의, 스터디 모집', en: 'Live Q&A, weekly lesson discussion, study group recruitment' },
  'ch.kakao.btn': { ko: '카카오톡 입장 →', en: 'Join KakaoTalk →' },
  'ch.reminder.title': { ko: '주간 리마인더', en: 'Weekly Reminder' },
  'ch.reminder.desc': { ko: '매주 월요일 — 이번 주 학습 내용, 히든 토픽 미리보기', en: 'Every Monday — weekly content, hidden topic preview' },
  'ch.reminder.btn': { ko: '알림 설정 →', en: 'Set Reminder →' },
  'ch.forum.title': { ko: '히든 토픽 포럼', en: 'Hidden Topics Forum' },
  'ch.forum.desc': { ko: '매주 핫이슈 토론, 의견 공유, 투표', en: 'Weekly hot issue discussions, opinions, polls' },
  'ch.forum.btn': { ko: '이번 주 포럼 →', en: 'This Week →' },
  'ch.alumni.title': { ko: '졸업생 스터디', en: 'Alumni Study Group' },
  'ch.alumni.desc': { ko: '4주 수료 후 자율 심화 스터디 그룹', en: 'Self-directed advanced study after 4-week completion' },
  'ch.alumni.lock': { ko: '수료 후 오픈', en: 'Opens after completion' },
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('onchain-korea-lang') || 'ko' } catch { return 'ko' }
  })

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'ko' ? 'en' : 'ko'
      try { localStorage.setItem('onchain-korea-lang', next) } catch {}
      return next
    })
  }, [])

  const t = useCallback((key) => {
    const entry = translations[key]
    if (!entry) return key
    return entry[lang] || entry.ko || key
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export default function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
