import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, ChevronUp, ExternalLink } from 'lucide-react'
import { lessonContents } from '../data/content'
import { phase2LessonContents } from '../data/content/phase2'
import { articleQuizzes } from '../data/quizzes'
import useQuiz from '../hooks/useQuiz'
import useProgress from '../hooks/useProgress'
import useLang from '../hooks/useLang'

const allContents = { ...lessonContents, ...phase2LessonContents }

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

export default function LessonInline({ lesson, onQuizStart }) {
  const content = allContents[lesson.id]
  const hasQuiz = !!articleQuizzes[lesson.id]
  const questionCount = articleQuizzes[lesson.id]?.length || 0
  const { getQuizStatus } = useQuiz()
  const { getLessonStatus } = useProgress()
  const { lang, t } = useLang()
  const quizStatus = hasQuiz ? getQuizStatus('article', lesson.id) : null
  const done = getLessonStatus(lesson.id) === 'done'
  const containerRef = useRef(null)

  useEffect(() => {
    // Scroll the expanded content into view smoothly
    if (containerRef.current) {
      const yOffset = -80
      const y = containerRef.current.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, [])

  if (!content) {
    return (
      <div className="px-5 py-8 md:px-6 text-center">
        <p className="text-[16px] font-[700] text-[var(--app-ink-high)]">{pick(lang, '콘텐츠 준비 중', 'Content Coming Soon')}</p>
        <p className="mt-2 text-[13px] text-[var(--app-ink-mid)]">
          {pick(lang, '아직 이 레슨의 콘텐츠가 준비되지 않았어요.', 'This lesson content is not available yet.')}
        </p>
        {lesson.mediumUrl && (
          <a
            href={lesson.mediumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--app-light-btn-bg)] px-5 py-2.5 text-[13px] font-[600] text-[var(--app-ink-high)] transition-colors hover:bg-[var(--app-light-btn-hover-bg)] mt-4"
          >
            {pick(lang, '원문 읽기', 'Read Original')}
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    )
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="overflow-hidden"
    >
      <div className="border-t border-[var(--app-paper-border)] bg-[var(--app-paper-muted-bg)]">
        {/* Reading content */}
        <article className="px-5 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-3xl">
            {/* Reading mode header */}
            <div className="flex flex-wrap items-center gap-3 border-b border-[var(--app-paper-border)] pb-4 text-[12px] text-[var(--app-ink-mid)]">
              <span>{pick(lang, '읽기 모드', 'Reading mode')}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--app-ink-low)]" />
              <span>
                {hasQuiz
                  ? pick(lang, `${questionCount}문제 중 8문제 이상 맞히면 다음 아티클이 열려요.`, `Score at least 8 out of ${questionCount} to unlock next.`)
                  : pick(lang, '참고용 콘텐츠예요.', 'Reference content.')}
              </span>
            </div>

            {/* Sections */}
            {content.sections.map((section, index) => (
              <section
                key={index}
                className={index > 0 ? 'mt-10 border-t border-[var(--app-paper-border)] pt-10' : 'mt-6'}
              >
                <h3 className="text-[19px] md:text-[21px] font-[800] tracking-[-0.03em] text-[var(--app-ink-high)]">
                  {section.heading}
                </h3>
                <div className="mt-4 space-y-4">
                  {section.content.split('\n\n').map((para, i) => (
                    <p key={i} className="text-[15px] leading-[1.9] text-[var(--app-ink-mid)]">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            {/* Key Takeaways */}
            {content.keyTakeaways && (
              <section className="mt-10 border-t border-[var(--app-paper-border)] pt-8">
                <div className="flex items-center gap-2">
                  <Lightbulb size={15} className="text-[#5741d8]" />
                  <h4 className="text-[14px] font-[700] text-[var(--app-ink-high)]">
                    {pick(lang, '핵심 정리', 'Key Takeaways')}
                  </h4>
                </div>
                <ul className="mt-3 divide-y divide-[var(--app-divider)] border-y border-[var(--app-paper-border)]">
                  {content.keyTakeaways.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 py-3 text-[13px] leading-relaxed text-[var(--app-ink-mid)]">
                      <span className="mt-0.5 shrink-0 text-[11px] font-[700] text-[#5741d8]">{i + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Quiz CTA */}
            <div className="mt-8 flex flex-col gap-3 border-t border-[var(--app-paper-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[15px] font-[700] text-[var(--app-ink-high)]">
                  {done
                    ? pick(lang, '퀴즈 통과 완료', 'Quiz Passed')
                    : pick(lang, '다 읽었으면 퀴즈로', 'Done reading? Take the quiz')}
                </p>
                {quizStatus && quizStatus.attempts > 0 && (
                  <p className="mt-1 text-[12px] text-[var(--app-ink-mid)]">
                    {pick(lang, '최고 점수', 'Best')}: {quizStatus.bestScore}/{quizStatus.total}
                    {' · '}
                    {quizStatus.attempts}{pick(lang, '회 응시', ' attempt(s)')}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {hasQuiz && (
                  <Link
                    to={`/quiz/article/${lesson.id}`}
                    className={done
                      ? 'inline-flex items-center gap-2 rounded-xl bg-[var(--app-light-btn-bg)] px-5 py-2.5 text-[13px] font-[600] text-[var(--app-ink-high)] transition-colors hover:bg-[var(--app-light-btn-hover-bg)]'
                      : 'inline-flex items-center gap-2 rounded-[56px] bg-[#5741d8] px-5 py-2.5 text-[13px] font-[600] text-white transition-colors hover:bg-[#4835b0]'}
                  >
                    {done
                      ? pick(lang, '다시 풀기', 'Retake')
                      : quizStatus?.attempts > 0
                        ? pick(lang, '다시 도전', 'Retry')
                        : pick(lang, '퀴즈 시작', 'Start Quiz')}
                  </Link>
                )}
                {lesson.mediumUrl && (
                  <a
                    href={lesson.mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--app-light-btn-bg)] px-4 py-2.5 text-[13px] font-[600] text-[var(--app-ink-high)] transition-colors hover:bg-[var(--app-light-btn-hover-bg)]"
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </motion.div>
  )
}
