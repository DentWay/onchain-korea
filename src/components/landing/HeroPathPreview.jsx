import useLang from '../../hooks/useLang'
import { getHeroProof, pick } from './heroContent'

export default function HeroPathPreview() {
  const { t, lang } = useLang()
  const heroProof = getHeroProof(t, lang)

  return (
    <section className="relative bg-[#0b0c10] px-6 pb-24 pt-10 md:pt-14">
      <div className="mx-auto max-w-7xl">
        <div className="ok-readable-panel-soft px-6 py-6 md:px-8">
          <div className="relative z-10">
            <div className="border-t border-[rgba(255,255,255,0.10)] pt-6">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(255,255,255,0.40)]">
                    {pick(lang, '스크롤 뒤에 이어질 경로', 'What opens next')}
                  </p>
                  <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-white md:text-[36px]">
                    {pick(lang, '4주를 넘기면 이렇게 이어집니다', 'After the first 4 weeks, the path continues like this')}
                  </h2>
                </div>
                <p className="text-[12px] text-[rgba(255,255,255,0.40)]">
                  {pick(lang, '총 4단계 설명', '4-step overview')}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-0 lg:grid-cols-4 lg:gap-8">
              {heroProof.map((item, index) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.step}
                    className="grid gap-4 border-t border-[rgba(255,255,255,0.08)] py-6 lg:grid-cols-1 lg:items-start lg:border-t-0 lg:border-l lg:border-[rgba(255,255,255,0.08)] lg:px-6 lg:py-0 first:lg:border-l-0 first:lg:px-0"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(87,65,216,0.10)] text-[#7132f5]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.40)]">
                        {item.badge}
                      </p>
                      <h3 className="mt-2 text-[19px] font-semibold leading-snug text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#9497a9]">
                        {item.desc}
                      </p>
                    </div>
                    <div className="text-[12px] font-semibold text-[#7132f5] lg:pt-3">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
