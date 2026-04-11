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
        <section className="bg-white p-5 md:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#686b82]">
            <Link to="/dashboard" className="transition-colors hover:text-[#101114]">{t('breadcrumb.dashboard')}</Link>
            <ChevronRight size={12} />
            <Link to={`/week/${lesson.weekId}`} className="transition-colors hover:text-[#101114]">{t('common.week')} {lesson.weekId}</Link>
            <ChevronRight size={12} />
            <span className="text-[#101114]">{l(lesson.title, lang).split(' — ')[0]}</span>
          </div>

          <header className="mt-5">
            <div className="flex flex-wrap items-center gap-2">
              {TypeIcon && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(87,65,216,0.16)] px-3 py-1 text-[11px] font-semibold text-[#7132f5]">
                  <TypeIcon size={12} />
                  <span>{cfg.label[lang] || cfg.label.ko}</span>
                </span>
              )}
              {sourceTitle && (
                <span className="inline-flex items-center rounded-full border border-[#dedee5] bg-[#f7f7f8] px-3 py-1 text-[11px] text-[#686b82]">
                  {sourceTitle}
                </span>
              )}
            </div>

            <h1 className="mt-4 text-[30px] md:text-[40px] font-[800] tracking-[-0.05em] leading-tight text-[#101114]">
              {l(lesson.title, lang)}
            </h1>
            <p className="mt-4 max-w-3xl text-[14px] md:text-[15px] leading-relaxed text-[#686b82]">
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
              <article className="rounded-xl border border-[#dedee5] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)] px-6 py-7 md:px-10 md:py-10 lg:px-12 lg:py-12">
                <div className="max-w-3xl mx-auto">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dedee5] pb-5">
                    <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#686b82]">
                      <span>{pick(lang, '읽기 모드', 'Reading mode')}</span>
                      <span className="h-1 w-1 rounded-full bg-[#9497a9]" />
                      <span>{passCopy}</span>
                    </div>
                    {quizStatus && (
                      <div className="inline-flex items-center gap-3 rounded-full border border-[#dedee5] bg-[#f7f7f8] px-4 py-2 text-[12px] text-[#686b82]">
                        <span>{t('quiz.bestScore')}</span>
                        <span className="tabular-nums font-[700] text-[#101114]">
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
                      className={index > 0 ? 'mt-12 border-t border-[#dedee5] pt-12' : 'mt-8'}
                    >
                      <h2 className="text-[21px] md:text-[23px] font-[800] tracking-[-0.03em] text-[#101114]">{section.heading}</h2>
                      <div className="mt-5 space-y-5">
                        {section.content.split('\n\n').map((para, innerIndex) => (
                          <p key={innerIndex} className="text-[16px] leading-[1.95] text-[#686b82]">
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
                      className="mt-12 border-t border-[#dedee5] pt-10"
                    >
                      <div className="flex items-center gap-2">
                        <Lightbulb size={16} className="text-[#5741d8]" />
                        <h3 className="text-[15px] font-[700] text-[#101114]">{t('lesson.keyTakeaways')}</h3>
                      </div>
                      <ul className="mt-4 divide-y divide-[#dedee5] border-y border-[#dedee5]">
                        {content.keyTakeaways.map((item, index) => (
                          <li key={index} className="flex items-start gap-3 py-4 text-[14px] leading-relaxed text-[#686b82]">
                            <span className="mt-0.5 shrink-0 text-[11px] font-[700] text-[#5741d8]">{index + 1}.</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.section>
                  )}
                </div>
              </article>
            ) : (
              <div className="rounded-xl border border-[#dedee5] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-10 text-center">
                <p className="text-[18px] font-[700] text-[#101114]">{t('lesson.preparing')}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-[#686b82]">
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
                    className="inline-flex items-center gap-2 rounded-xl bg-[#eef0f3] px-5 py-3 text-[13px] font-[600] text-[#101114] transition-colors hover:bg-[#dedee5] mt-6"
                  >
                    {t('lesson.readOriginal')}
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            )}

            <section className="rounded-xl border border-[#dedee5] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="px-6 py-6 md:px-8 lg:px-10">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#9497a9]">{pick(lang, '다음 단계', 'Next step')}</p>
                    <p className="mt-3 text-[22px] font-[800] tracking-[-0.04em] text-[#101114]">
                      {done ? t('lesson.quizPassed') : pick(lang, '읽은 뒤 바로 퀴즈로 넘어가요', 'Read first, then move straight to the quiz')}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#686b82]">
                      {done
                        ? pick(lang, '이 아티클은 통과됐어요. 다음 단계로 넘어가면 돼요.', 'This article is already cleared. Move to the next step.')
                        : passCopy}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
                    <div className="rounded-xl border border-[#dedee5] bg-[#f7f7f8] px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-[#9497a9]">{t('quiz.attempts')}</p>
                      <p className="mt-2 text-[22px] font-[800] tabular-nums text-[#101114]">{quizStatus?.attempts || 0}</p>
                    </div>
                    <div className="rounded-xl border border-[#dedee5] bg-[#f7f7f8] px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-[#9497a9]">{t('quiz.bestScore')}</p>
                      <p className="mt-2 text-[22px] font-[800] tabular-nums text-[#101114]">
                        {quizStatus?.attempts ? `${quizStatus.bestScore}/${quizStatus.total}` : '-'}
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#dedee5] bg-[#f7f7f8] px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-[#9497a9]">{pick(lang, '현재 상태', 'Current state')}</p>
                      <p className="mt-2 text-[14px] font-[700] text-[#101114]">
                        {done ? t('lesson.quizPassed') : pick(lang, '퀴즈 대기', 'Waiting on quiz')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-[#dedee5] pt-5 sm:flex-row sm:flex-wrap">
                  {hasQuiz && (
                    <Link
                      to={`/quiz/article/${lesson.id}`}
                      className={done
                        ? 'inline-flex items-center gap-2 rounded-xl bg-[#eef0f3] px-5 py-3 text-[13px] font-[600] text-[#101114] transition-colors hover:bg-[#dedee5]'
                        : 'inline-flex items-center gap-2 rounded-[56px] bg-[#5741d8] px-5 py-3 text-[13px] font-[600] text-white transition-colors hover:bg-[#4835b0]'}
                    >
                      {done
                        ? <><Check size={16} /> {t('lesson.quizPassed')}</>
                        : <>{quizStatus?.attempts > 0 ? t('quiz.retry') : t('quiz.start')}</>}
                    </Link>
                  )}
                  {nextLesson && done && (
                    <Link
                      to={`/lesson/${nextLesson.id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#eef0f3] px-5 py-3 text-[13px] font-[600] text-[#101114] transition-colors hover:bg-[#dedee5]"
                    >
                      {t('lesson.nextLesson')}
                      <ChevronRight size={14} />
                    </Link>
                  )}
                  <Link to={`/week/${lesson.weekId}`} className="inline-flex items-center gap-2 rounded-xl bg-[#eef0f3] px-5 py-3 text-[13px] font-[600] text-[#101114] transition-colors hover:bg-[#dedee5]">
                    <ArrowLeft size={14} />
                    {pick(lang, '주차로 돌아가기', 'Back to week')}
                  </Link>
                  {lesson.mediumUrl && (
                    <a
                      href={lesson.mediumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#eef0f3] px-5 py-3 text-[13px] font-[600] text-[#101114] transition-colors hover:bg-[#dedee5]"
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
