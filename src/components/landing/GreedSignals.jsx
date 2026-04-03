import { motion } from 'framer-motion'
import { BookOpenCheck, Coins, GraduationCap, Trophy, UsersRound } from 'lucide-react'
import Section from './Section'
import useLang from '../../hooks/useLang'

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

const stats = [
  {
    value: '4,000+',
    icon: UsersRound,
    title: { ko: '공개 학습자 수', en: 'Public learners' },
    source: 'Semester 1 about',
  },
  {
    value: '2,700+',
    icon: BookOpenCheck,
    title: { ko: '완료된 레슨', en: 'Completed lessons' },
    source: 'Semester 1 about',
  },
  {
    value: '$100k+',
    icon: Trophy,
    title: { ko: 'Semester 1 보상', en: 'Semester 1 rewards' },
    source: 'Semester 1 about',
  },
  {
    value: '93',
    icon: GraduationCap,
    title: { ko: '아테네 첫 온보딩 유저', en: 'First-time users in Athens' },
    source: 'Athens recap',
  },
]

const sourceMap = [
  { label: 'Semester 1', units: 8, tone: 'bg-[#79AFFF]' },
  { label: 'Semester 2', units: 8, tone: 'bg-[#4F8DFF]' },
  { label: 'Tokens', units: 7, tone: 'bg-[rgba(255,255,255,0.22)]' },
  { label: 'DeFi', units: 6, tone: 'bg-[rgba(255,255,255,0.14)]' },
]

const signals = [
  {
    title: {
      ko: '보상만으로 끝나지 않았습니다',
      en: 'It lasted beyond incentives',
    },
    desc: {
      ko: 'Semester 1 공식 페이지는 보상을 받은 뒤에도 학습자가 계속 돌아왔다고 설명합니다. 구조 자체가 유지력을 만든 셈입니다.',
      en: 'The Semester 1 page says learners kept coming back after rewards were claimed. The structure itself appears to have created retention.',
    },
    source: 'greed.academy / Semester 1',
  },
  {
    title: {
      ko: '현장 온보딩에도 먹혔습니다',
      en: 'It also worked live',
    },
    desc: {
      ko: '아테네에서는 5시간 코스로 93명의 첫 사용자 온보딩이 공개적으로 공유됐고, 시카고와 하노이 커뮤니티도 같은 흐름을 워크숍으로 재사용했습니다.',
      en: 'A public Athens recap reported 93 first-time users in a 5-hour course, and Chicago and Hanoi communities reused the same teaching flow in workshops.',
    },
    source: 'Reddit recap + Luma events',
  },
  {
    title: {
      ko: '소스 라이브러리도 충분히 깊습니다',
      en: 'The source library is deep enough',
    },
    desc: {
      ko: 'Semester 1, Semester 2, Tokens, DeFi를 합치면 공개된 학습 유닛이 29개입니다. OnChain Korea는 이걸 한국형 8주 경로로 다시 편성했습니다.',
      en: 'Semester 1, Semester 2, Tokens, and DeFi add up to 29 public learning units. OnChain Korea repackages that into a Korean 8-week path.',
    },
    source: 'Learn hub',
  },
]

export default function GreedSignals() {
  const { lang } = useLang()

  return (
    <Section className="px-6 py-24" id="signals">
      <div className="mx-auto max-w-7xl">
        <div className="ok-readable-panel-soft p-6 md:p-8 lg:p-10">
          <div className="relative z-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-end">
              <div>
                <span className="ok-section-label">
                  {pick(lang, 'Public Signals', 'Public Signals')}
                </span>
                <h2 className="mt-4 whitespace-pre-line text-[32px] font-bold tracking-tight text-[var(--text-high)] md:text-[44px] md:leading-[1.15]">
                  {pick(lang, '왜 이 구조를 가져왔는지,\n공개 데이터로 설명해요', 'Why we chose this model,\nexplained with public data')}
                </h2>
                <p className="mt-4 max-w-2xl whitespace-pre-line text-[15px] leading-[1.8] text-[var(--text-mid)]">
                  {pick(
                    lang,
                    'GREED Academy의 공개 결과와 워크숍 사례를 보면,\n초보자에게는 순서 있는 학습 흐름과 바로 해보는 실습이\n가장 잘 작동했어요.\n\nOnChain Korea는 그 구조를\n한국 사용자 흐름에 맞춰 다시 짰어요.',
                    'Public GREED Academy results and workshop recaps show that sequenced learning and immediate hands-on practice worked best for beginners.\n\nOnChain Korea adapts that structure for Korean users.'
                  )}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.title.ko}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.06 }}
                      className="rounded-[24px] border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] px-5 py-5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgba(59,130,246,0.12)] text-[#79AFFF]">
                          <Icon size={16} />
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.18em] text-[var(--text-low)] leading-tight">{item.source}</span>
                      </div>
                      <p className="mt-4 text-[32px] font-[800] tracking-[-0.05em] text-[var(--text-high)]">{item.value}</p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--text-mid)]">{item.title[lang] || item.title.ko}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
              <div className="rounded-[28px] border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] px-6 py-6">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--text-low)]">
                  <Coins size={14} className="text-[#79AFFF]" />
                  <span>{pick(lang, '공개 소스 맵', 'Public source map')}</span>
                </div>
                <h3 className="mt-3 text-[22px] font-[800] tracking-[-0.04em] text-[var(--text-high)]">
                  {pick(lang, '29개 공개 유닛을 한국형 8주 경로로 재구성했습니다', '29 public units, repackaged into 8 Korean weeks')}
                </h3>
                <div className="mt-6 overflow-hidden rounded-full border border-[rgba(255,255,255,0.08)]">
                  <div className="flex h-4 w-full">
                    {sourceMap.map((item) => (
                      <div
                        key={item.label}
                        className={item.tone}
                        style={{ width: `${(item.units / 29) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {sourceMap.map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${item.tone}`} />
                        <span className="text-[13px] text-[var(--text-mid)]">{item.label}</span>
                      </div>
                      <span className="text-[14px] font-semibold text-[var(--text-high)]">{item.units}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-[rgba(255,255,255,0.08)] rounded-[28px] border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] px-6 py-3">
                {signals.map((item, index) => (
                  <motion.div
                    key={item.title.ko}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="py-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 shrink-0 text-[11px] font-bold tracking-[0.18em] text-[#79AFFF]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-[var(--text-high)]">
                          {item.title[lang] || item.title.ko}
                        </h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-mid)]">
                          {item.desc[lang] || item.desc.ko}
                        </p>
                        <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[var(--text-low)]">
                          {item.source}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-[12px] leading-relaxed text-[var(--text-low)]">
              {pick(
                lang,
                'Sources: GREED Academy learn hub, Semester 1/2 about pages, Athens recap, public workshop pages, and a public participant write-up.',
                'Sources: GREED Academy learn hub, Semester 1/2 about pages, Athens recap, public workshop pages, and a public participant write-up.'
              )}
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
