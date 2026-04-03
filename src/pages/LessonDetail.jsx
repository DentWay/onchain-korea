import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Check, Lightbulb, BookOpen, Zap, Shield, ChevronRight } from 'lucide-react'
import { findLesson, weeks, greedArticles, l } from '../data/curriculum'
import { lessonContents } from '../data/content'
import { articleQuizzes } from '../data/quizzes'
import useProgress from '../hooks/useProgress'
import useQuiz from '../hooks/useQuiz'
import useLang from '../hooks/useLang'

const typeConfig = {
  read: { icon: BookOpen, label: { ko: '읽기', en: 'Read' } },
  practice: { icon: Zap, label: { ko: '실습', en: 'Practice' } },
  security: { icon: Shield, label: { ko: '보안', en: 'Security' } },
}

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

export default function LessonDetail() {
  const { lessonId } = useParams()
  const lesson = findLesson(lessonId)
  const { getLessonStatus, isWeekUnlocked, isLessonUnlocked } = useProgress()
  const { getQuizStatus } = useQuiz()
  const { t, lang } = useLang()

  if (!lesson) return <Navigate to="/dashboard" replace />
  if (!isWeekUnlocked(lesson.weekId)) return <Navigate to="/dashboard" replace />
  if (!isLessonUnlocked(lesson.id)) return <Navigate to={`/week/${lesson.weekId}`} replace />

  const done = getLessonStatus(lesson.id) === 'done'
  const content = lessonContents[lesson.id]
  const hasQuiz = !!articleQuizzes[lesson.id]
  const quizStatus = hasQuiz ? getQuizStatus('article', lesson.id) : null
  const questionCount = articleQuizzes[lesson.id]?.length || 0

  const week = weeks.find((item) => item.id === lesson.weekId)
  const lessonIndex = week?.lessons.findIndex((item) => item.id === lesson.id) ?? -1
  const nextLesson = week?.lessons[lessonIndex + 1]
  const cfg = typeConfig[lesson.type]
  const TypeIcon = cfg?.icon
  const sourceTitle = lesson.source ? greedArticles[lesson.source]?.title : null
  const passCopy = hasQuiz
    ? pick(lang, `${questionCount}문제 중 8문제 이상 맞히면 다음 아티클이 열려요.`, `Score at least 8 out of ${questionCount} to open the next article.`)
    : pick(lang, '이 아티클은 참고용 콘텐츠예요.', 'This article is reference content.')

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <section className="ok-workbench p-5 md:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2 text-[12px] ok-ink-mid">
            <Link to="/dashboard" className="transition-colors hover:text-[var(--text-high)]">{t('breadcrumb.dashboard')}</Link>
            <ChevronRight size={12} />
            <Link to={`/week/${lesson.weekId}`} className="transition-colors hover:text-[var(--text-high)]">{t('common.week')} {lesson.weekId}</Link>
            <ChevronRight size={12} />
            <span className="ok-ink-high">{l(lesson.title, lang).split(' — ')[0]}</span>
          </div>

          <header className="mt-5">
            <div className="flex flex-wrap items-center gap-2">
              {TypeIcon && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(59,130,246,0.10)] px-3 py-1 text-[11px] font-semibold text-[#2156B8]">
                  <TypeIcon size={12} />
                  <span>{cfg.label[lang] || cfg.label.ko}</span>
                </span>
              )}
              {sourceTitle && (
                <span className="inline-flex items-center rounded-full border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-3 py-1 text-[11px] ok-ink-mid">
                  {sourceTitle}
                </span>
              )}
            </div>

            <h1 className="mt-4 text-[30px] md:text-[40px] font-[800] tracking-[-0.05em] leading-tight ok-ink-high">
              {l(lesson.title, lang)}
            </h1>
            <p className="mt-4 max-w-3xl text-[14px] md:text-[15px] leading-relaxed ok-ink-mid">
              {pick(
                lang,
                hasQuiz
                  ? `${questionCount}문제 퀴즈를 통과해야 다음 아티클이 열려요. 먼저 읽고 핵심만 정리해 두세요.`
                  : '이 아티클은 참고용 콘텐츠예요. 본문을 읽고 연결된 실습 흐름을 확인해 보세요.',
                hasQuiz
                  ? `You need to pass a ${questionCount}-question quiz to unlock the next article. Read first and lock in the core ideas.`
                  : 'This article is reference content. Read it to understand the connected practical flow.'
              )}
            </p>
          </header>

          <div className="mt-8 space-y-6">
            {content ? (
              <article className="ok-reading-panel px-6 py-7 md:px-10 md:py-10 lg:px-12 lg:py-12">
                <div className="ok-reading-copy mx-auto">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--app-divider)] pb-5">
                    <div className="flex flex-wrap items-center gap-2 text-[12px] ok-ink-mid">
                      <span>{pick(lang, '읽기 모드', 'Reading mode')}</span>
                      <span className="h-1 w-1 rounded-full bg-[var(--app-ink-low)]" />
                      <span>{passCopy}</span>
                    </div>
                    {quizStatus && (
                      <div className="inline-flex items-center gap-3 rounded-full border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-2 text-[12px] ok-ink-mid">
                        <span>{t('quiz.bestScore')}</span>
                        <span className="ok-tabular-nums font-[700] ok-ink-high">
                          {quizStatus.attempts > 0 ? `${quizStatus.bestScore}/${quizStatus.total}` : pick(lang, '기록 없음', 'No record')}
                        </span>
                      </div>
                    )}
                  </div>

                  {content.sections.map((section, index) => (
                    <motion.section
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.12 + index * 0.04 }}
                      className={index > 0 ? 'mt-12 border-t border-[var(--app-divider)] pt-12' : 'mt-8'}
                    >
                      <h2 className="text-[21px] md:text-[23px] font-[800] tracking-[-0.03em] ok-ink-high">{section.heading}</h2>
                      <div className="mt-5 space-y-5">
                        {section.content.split('\n\n').map((para, innerIndex) => (
                          <p key={innerIndex} className="text-[16px] leading-[1.95] ok-ink-mid">
                            {para}
                          </p>
                        ))}
                      </div>
                    </motion.section>
                  ))}

                  {content.keyTakeaways && (
                    <motion.section
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.22 }}
                      className="mt-12 border-t border-[var(--app-divider)] pt-10"
                    >
                      <div className="flex items-center gap-2">
                        <Lightbulb size={16} className="text-[#2156B8]" />
                        <h3 className="text-[15px] font-[700] ok-ink-high">{t('lesson.keyTakeaways')}</h3>
                      </div>
                      <ul className="mt-4 divide-y divide-[var(--app-divider)] border-y border-[var(--app-divider)]">
                        {content.keyTakeaways.map((item, index) => (
                          <li key={index} className="flex items-start gap-3 py-4 text-[14px] leading-relaxed ok-ink-mid">
                            <span className="mt-0.5 shrink-0 text-[11px] font-[700] text-[#79AFFF]">{index + 1}.</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.section>
                  )}
                </div>
              </article>
            ) : (
              <div className="ok-paper p-10 text-center">
                <p className="text-[18px] font-[700] ok-ink-high">{t('lesson.preparing')}</p>
                <p className="mt-3 text-[13px] leading-relaxed ok-ink-mid">
                  {t('lesson.preparingDesc').split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index === 0 && <br />}
                    </span>
                  ))}
                </p>
                {lesson.mediumUrl && (
                  <a
                    href={lesson.mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ok-btn ok-btn-light mt-6 px-5 py-3 text-[13px]"
                  >
                    {t('lesson.readOriginal')}
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            )}

            <section className="ok-paper overflow-hidden">
              <div className="px-6 py-6 md:px-8 lg:px-10">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-[11px] uppercase tracking-[0.2em] ok-ink-low">{pick(lang, '다음 단계', 'Next step')}</p>
                    <p className="mt-3 text-[22px] font-[800] tracking-[-0.04em] ok-ink-high">
                      {done ? t('lesson.quizPassed') : pick(lang, '읽은 뒤 바로 퀴즈로 넘어가요', 'Read first, then move straight to the quiz')}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed ok-ink-mid">
                      {done
                        ? pick(lang, '이 아티클은 통과됐어요. 다음 단계로 넘어가면 돼요.', 'This article is already cleared. Move to the next step.')
                        : passCopy}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
                    <div className="rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] ok-ink-low">{t('quiz.attempts')}</p>
                      <p className="mt-2 text-[22px] font-[800] ok-tabular-nums ok-ink-high">{quizStatus?.attempts || 0}</p>
                    </div>
                    <div className="rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] ok-ink-low">{t('quiz.bestScore')}</p>
                      <p className="mt-2 text-[22px] font-[800] ok-tabular-nums ok-ink-high">
                        {quizStatus?.attempts ? `${quizStatus.bestScore}/${quizStatus.total}` : '-'}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] ok-ink-low">{pick(lang, '현재 상태', 'Current state')}</p>
                      <p className="mt-2 text-[14px] font-[700] ok-ink-high">
                        {done ? t('lesson.quizPassed') : pick(lang, '퀴즈 대기', 'Waiting on quiz')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-[var(--app-divider)] pt-5 sm:flex-row sm:flex-wrap">
                  {hasQuiz && (
                    <Link
                      to={`/quiz/article/${lesson.id}`}
                      className={`ok-btn px-5 py-3 text-[13px] ${done ? 'ok-btn-light' : 'ok-btn-primary'}`}
                    >
                      {done
                        ? <><Check size={16} /> {t('lesson.quizPassed')}</>
                        : <>{quizStatus?.attempts > 0 ? t('quiz.retry') : t('quiz.start')}</>}
                    </Link>
                  )}
                  {nextLesson && done && (
                    <Link
                      to={`/lesson/${nextLesson.id}`}
                      className="ok-btn ok-btn-light px-5 py-3 text-[13px]"
                    >
                      {t('lesson.nextLesson')}
                      <ChevronRight size={14} />
                    </Link>
                  )}
                  <Link to={`/week/${lesson.weekId}`} className="ok-btn ok-btn-light px-5 py-3 text-[13px]">
                    <ArrowLeft size={14} />
                    {pick(lang, '주차로 돌아가기', 'Back to week')}
                  </Link>
                  {lesson.mediumUrl && (
                    <a
                      href={lesson.mediumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ok-btn ok-btn-light px-5 py-3 text-[13px]"
                    >
                      {t('lesson.readOriginalShort')}
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </section>
          </div>
        </section>
      </motion.div>
    </div>
  )
}
