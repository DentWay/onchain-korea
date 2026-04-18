import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, CheckCircle, Circle, Award, Share2 } from 'lucide-react'
import BrandLockup from '../components/brand/BrandLockup'
import useProgress from '../hooks/useProgress'
import useLang from '../hooks/useLang'

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

export default function Certificate() {
  const { certificateStatus } = useProgress()
  const { t, lang } = useLang()
  const {
    eligible,
    lessonsComplete,
    lessonsRequired,
    lessonsEligible,
    actionsComplete,
    actionsRequired,
    actionsEligible,
    hiddenTopicsRead,
    hiddenTopicsRequired,
    hiddenTopicsEligible,
  } = certificateStatus

  const requirements = [
    { text: t('cert.lessons80'), current: lessonsComplete, total: lessonsRequired, done: lessonsEligible },
    { text: `${actionsRequired}${t('cert.actions3')}`, current: actionsComplete, total: actionsRequired, done: actionsEligible },
    { text: `${hiddenTopicsRequired}${t('cert.hidden2')}`, current: hiddenTopicsRead, total: hiddenTopicsRequired, done: hiddenTopicsEligible },
  ]

  const shareText = encodeURIComponent(t('cert.shareText'))

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <section className="bg-[var(--app-paper-bg)] border border-[var(--app-paper-border)] rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-5 md:p-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-[12px] font-medium text-[var(--app-ink-mid)] transition-colors hover:text-[var(--app-ink-high)]"
          >
            <ArrowLeft size={14} />
            <span>{t('week.back')}</span>
          </Link>

          <header className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--app-ink-low)]">{t('cert.title')}</p>
              <h1 className="mt-2 text-[30px] md:text-[40px] font-[800] tracking-[-0.05em] text-[var(--app-ink-high)]">
                {eligible ? t('cert.congrats') : t('cert.notYet')}
              </h1>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--app-ink-mid)]">
                {eligible ? t('cert.allDone') : t('cert.notYetDesc')}
              </p>
            </div>

            <div className="bg-[var(--app-paper-muted-bg)] border border-[var(--app-paper-border)] rounded-[1.5rem] px-5 py-4 md:px-6 md:py-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--app-ink-low)]">{pick(lang, '현재 상태', 'Current status')}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  eligible ? 'bg-[rgba(20,158,97,0.12)]' : 'bg-[var(--app-light-btn-bg)]'
                }`}>
                  {eligible ? <Award size={22} className="text-[var(--success)]" /> : <Lock size={20} className="text-[var(--app-ink-low)]" />}
                </div>
                <div>
                  <p className="text-[18px] font-[800] tracking-[-0.04em] text-[var(--app-ink-high)]">
                    {eligible ? pick(lang, '발급 가능', 'Eligible') : pick(lang, '진행 중', 'In progress')}
                  </p>
                  <p className="text-[12px] text-[var(--app-ink-mid)]">{t('cert.requirements')}</p>
                </div>
              </div>
            </div>
          </header>

          <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_320px]">
            <div className="space-y-5">
              <section className="bg-[var(--app-paper-bg)] border border-[var(--app-paper-border)] rounded-[1.5rem] overflow-hidden">
                <div className="px-5 md:px-6 pt-5 md:pt-6 pb-4 border-b border-[var(--app-paper-border)]">
                  <h2 className="text-[20px] font-[800] tracking-[-0.04em] text-[var(--app-ink-high)]">{t('cert.requirements')}</h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--app-ink-mid)]">
                    {pick(lang, '레슨, 온체인 액션, 히든 토픽 조건을 모두 충족하면 수료증을 받을 수 있어요.', 'You become eligible for the certificate after clearing the lesson, action, and hidden-topic requirements.')}
                  </p>
                </div>

                <div>
                  {requirements.map((requirement, index) => (
                    <div
                      key={requirement.text}
                      className={`flex items-center gap-3 px-5 md:px-6 py-4 ${index > 0 ? 'border-t border-[var(--app-paper-border)]' : ''}`}
                    >
                      {requirement.done ? (
                        <CheckCircle size={18} className="shrink-0 text-[var(--success)]" />
                      ) : requirement.current > 0 ? (
                        <div className="h-4 w-4 shrink-0 rounded-full border-2 border-[#5741d8]" />
                      ) : (
                        <Circle size={18} className="shrink-0 text-[var(--app-ink-low)]" />
                      )}
                      <span className="flex-1 text-[14px] leading-relaxed text-[var(--app-ink-mid)]">{requirement.text}</span>
                      <span className={`text-[12px] font-[700] tabular-nums ${requirement.done ? 'text-[var(--success)]' : 'text-[var(--app-ink-low)]'}`}>
                        {requirement.current}/{requirement.total}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-[var(--app-paper-bg)] border border-[var(--app-paper-border)] rounded-[1.5rem] overflow-hidden">
                <div className="bg-[var(--app-paper-muted-bg)] p-8 text-center">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--app-ink-low)]">{t('cert.certificateOfCompletion')}</p>
                  <div className="mt-4 flex justify-center">
                    <BrandLockup surface="light" className="origin-center scale-[1.18]" />
                  </div>
                  <p className="mt-2 text-[14px] text-[var(--app-ink-mid)]">{t('cert.programSubtitle')}</p>
                  <div className="mx-auto mt-6 max-w-md border-t border-[var(--app-paper-border)] pt-6">
                    <p className="text-[13px] leading-relaxed text-[var(--app-ink-mid)]">{t('cert.completionStatement')}</p>
                  </div>
                  <div className={`inline-flex mt-5 rounded-full border px-4 py-2 text-[12px] font-semibold ${
                    eligible
                      ? 'border-[rgba(20,158,97,0.26)] bg-[rgba(20,158,97,0.16)] text-[var(--success)]'
                      : 'border-[var(--app-paper-border)] bg-[var(--app-light-btn-bg)] text-[var(--app-ink-low)]'
                  }`}>
                    {t('cert.onchainVerified')}
                  </div>
                  <p className="mt-5 text-[11px] text-[var(--app-ink-low)]">{t('cert.poweredBy')}</p>
                </div>
              </section>

              <p className="text-[12px] italic text-[var(--app-ink-low)]">{t('cert.disclaimer')}</p>
            </div>

            <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
              <div className="bg-[var(--app-paper-muted-bg)] border border-[var(--app-paper-border)] rounded-[1.5rem] p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--app-ink-low)]">{pick(lang, '진행 요약', 'Progress summary')}</p>
                <dl className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-2xl border border-[var(--app-paper-border)] bg-[var(--app-paper-bg)] px-4 py-3">
                    <dt className="text-[12px] text-[var(--app-ink-mid)]">{pick(lang, 'Lessons', 'Lessons')}</dt>
                    <dd className="text-[18px] font-[800] tabular-nums text-[var(--app-ink-high)]">{lessonsComplete}/{lessonsRequired}</dd>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-[var(--app-paper-border)] bg-[var(--app-paper-bg)] px-4 py-3">
                    <dt className="text-[12px] text-[var(--app-ink-mid)]">{pick(lang, 'Actions', 'Actions')}</dt>
                    <dd className="text-[18px] font-[800] tabular-nums text-[var(--app-ink-high)]">{actionsComplete}/{actionsRequired}</dd>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-[var(--app-paper-border)] bg-[var(--app-paper-bg)] px-4 py-3">
                    <dt className="text-[12px] text-[var(--app-ink-mid)]">{pick(lang, 'Hidden', 'Hidden')}</dt>
                    <dd className="text-[18px] font-[800] tabular-nums text-[var(--app-ink-high)]">{hiddenTopicsRead}/{hiddenTopicsRequired}</dd>
                  </div>
                </dl>
              </div>

              {eligible && (
                <div className="bg-[var(--app-paper-muted-bg)] border border-[var(--app-paper-border)] rounded-[1.5rem] p-5">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--app-ink-low)]">
                    <Share2 size={13} />
                    <span>{t('cert.share')}</span>
                  </div>
                  <div className="mt-4 flex flex-col gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${shareText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-[var(--app-light-btn-bg)] text-[var(--app-ink-high)] font-semibold border border-[var(--app-paper-border)] transition-colors hover:bg-[var(--app-light-btn-hover-bg)] px-5 py-3 text-[13px]"
                    >
                      Twitter / X
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?text=${shareText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-[var(--app-light-btn-bg)] text-[var(--app-ink-high)] font-semibold border border-[var(--app-paper-border)] transition-colors hover:bg-[var(--app-light-btn-hover-bg)] px-5 py-3 text-[13px]"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>
      </motion.div>
    </div>
  )
}
