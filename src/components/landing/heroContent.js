import { Award, Clock3, LockKeyhole, ShieldCheck } from 'lucide-react'

export function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

export function getHeroProof(t, lang) {
  return [
    {
      icon: ShieldCheck,
      step: '01',
      badge: t('landing.semester1Badge'),
      title: pick(lang, '지갑, 보안, 토큰, DYOR부터 순서대로 시작합니다', 'Start with wallets, security, tokens, and DYOR in order'),
      desc: pick(
        lang,
        '한 번에 다 보여주지 않고, Week 1-4에서 블록체인 기본기를 먼저 만듭니다.',
        'The path does not dump everything at once. Weeks 1-4 build the on-chain foundation first.'
      ),
    },
    {
      icon: LockKeyhole,
      step: '02',
      badge: pick(lang, '퀴즈 게이트', 'Quiz gates'),
      title: pick(lang, '통과해야 다음 단계가 열립니다', 'Pass to unlock the next step'),
      desc: pick(
        lang,
        '아티클은 퀴즈로, 주차는 주간 테스트로 열립니다. 읽고 끝나는 구조가 아닙니다.',
        'Articles open through quizzes and weeks open through the weekly checkpoint. Reading alone is not enough.'
      ),
    },
    {
      icon: Clock3,
      step: '03',
      badge: t('landing.semester2Badge'),
      title: pick(lang, '기본기를 넘기면 8주 전체 경로가 이어집니다', 'Pass the foundation and the full 8-week path opens up'),
      desc: pick(
        lang,
        'Week 5-8에서는 스테이블코인, DeFi, NFT, DAO, 크로스체인까지 실전 범위로 확장됩니다.',
        'Weeks 5-8 expand into stablecoins, DeFi, NFT, DAO, and cross-chain practice.'
      ),
    },
    {
      icon: Award,
      step: '04',
      badge: t('landing.certTitle'),
      title: pick(lang, '마지막에는 온체인 수료 증명이 남습니다', 'A shareable on-chain proof remains at the end'),
      desc: pick(
        lang,
        '체크리스트만 끝나는 게 아니라, 링크로 보여줄 수 있는 결과물을 남깁니다.',
        'The program leaves a proof you can show and share, not just a completed checklist.'
      ),
    },
  ]
}
