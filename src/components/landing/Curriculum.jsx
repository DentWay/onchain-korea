import { motion } from 'framer-motion'
import { BookOpen, Wrench, ClipboardCheck } from 'lucide-react'
import useLang from '../../hooks/useLang'
import { weeks as programWeeks, l } from '../../data/curriculum'

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

export default function Curriculum() {
  const { lang } = useLang()

  return (
    <section id="curriculum" className="bg-[#ffffff] py-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#686b82]">
            CURRICULUM
          </p>
          <h2 className="mt-4 text-[36px] font-[700] tracking-[-1px] text-[#101114] md:text-[48px]">
            {pick(lang, '8주 로드맵', '8-Week Roadmap')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-[1.50] text-[#686b82]">
            {pick(
              lang,
              '매주 아티클 → 퀴즈 → 실습 → 테스트 순서로 진행합니다.',
              'Each week follows: Articles → Quiz → Action Lab → Weekly Test.'
            )}
          </p>
        </div>

        {/* 2-column grid of week cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {programWeeks.map((week, index) => {
            const articleCount = week.lessons?.length || 0
            const actionCount = week.actions?.length || 0

            return (
              <motion.div
                key={week.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="rounded-[12px] border border-[rgba(91,97,110,0.2)] bg-white p-5 shadow-[0px_4px_24px_rgba(0,0,0,0.03)]"
              >
                {/* Week badge + title */}
                <div className="flex items-start gap-3">
                  <span className="inline-flex shrink-0 items-center rounded-full bg-[rgba(87,65,216,0.16)] px-2.5 py-1 text-[11px] font-bold text-[#7132f5]">
                    Week {week.id}
                  </span>
                </div>

                <h3 className="mt-3 text-[22px] font-[600] tracking-[-0.02em] text-[#101114]">
                  {l(week.title, lang)}
                </h3>

                {week.subtitle && (
                  <p className="mt-1.5 text-[14px] leading-[1.50] text-[#686b82]">
                    {l(week.subtitle, lang)}
                  </p>
                )}

                {/* Bottom metrics */}
                <div className="mt-4 flex items-center gap-4 border-t border-[rgba(91,97,110,0.12)] pt-3">
                  <span className="flex items-center gap-1.5 text-[13px] text-[#686b82]">
                    <BookOpen size={14} className="text-[#9497a9]" />
                    {articleCount} {pick(lang, '아티클', 'Articles')}
                  </span>
                  <span className="flex items-center gap-1.5 text-[13px] text-[#686b82]">
                    <Wrench size={14} className="text-[#9497a9]" />
                    {actionCount} {pick(lang, '실습', 'Action')}
                  </span>
                  <span className="flex items-center gap-1.5 text-[13px] text-[#686b82]">
                    <ClipboardCheck size={14} className="text-[#9497a9]" />
                    1 {pick(lang, '테스트', 'Test')}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
