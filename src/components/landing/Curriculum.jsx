import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import Section from './Section'
import useLang from '../../hooks/useLang'
import { weeks as programWeeks, l } from '../../data/curriculum'

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

export default function Curriculum() {
  const { t, lang } = useLang()

  return (
    <Section className="py-20 px-6" id="curriculum">
      <div className="mx-auto max-w-5xl">
        <div className="ok-readable-panel-soft p-6 md:p-8">
          <div className="relative z-10">
            <div className="text-center">
              <span className="ok-section-label">{t('landing.curriculum')}</span>
              <h2 className="mt-4 text-[32px] font-bold tracking-tight text-[var(--text-high)] md:text-[44px]">
                {t('landing.roadmap')}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--text-mid)]">
                {pick(lang, '퀴즈를 통과하면 다음이 열려요. Week 4까지 마치면 심화 트랙이 시작돼요.', 'Pass each quiz to unlock the next. Complete Week 4 to start the advanced track.')}
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {programWeeks.map((week, index) => {
            const isLocked = week.id > 4

            return (
              <motion.div
                key={week.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className={`group rounded-2xl border px-5 py-4 transition-colors ${
                  isLocked
                    ? 'border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]'
                    : 'border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.06)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                      isLocked
                        ? 'bg-[rgba(255,255,255,0.04)] text-[var(--text-low)]'
                        : 'bg-[rgba(59,130,246,0.12)] text-[#79AFFF]'
                    }`}>
                      {isLocked ? <Lock size={11} /> : week.id}
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--text-low)]">Week {week.id}</p>
                      <h3 className={`text-[16px] font-[700] tracking-[-0.02em] ${isLocked ? 'text-[var(--text-mid)]' : 'text-[var(--text-high)]'}`}>
                        {l(week.title, lang)}
                      </h3>
                    </div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                    isLocked
                      ? 'border border-[rgba(255,255,255,0.06)] text-[var(--text-low)]'
                      : 'bg-[rgba(59,130,246,0.10)] text-[#79AFFF]'
                  }`}>
                    {week.id <= 4 ? 'S1' : 'S2'}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-[12px] text-[var(--text-low)]">
              <span>{pick(lang, 'Article 3개 · Action Lab · Hidden Topic · Weekly Test', '3 articles · action lab · hidden topic · weekly test')}</span>
              <span className="text-[var(--text-mid)]">{pick(lang, '매주 같은 리듬', 'Same rhythm every week')}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
