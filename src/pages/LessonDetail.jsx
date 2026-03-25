import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Check, Lightbulb } from 'lucide-react'
import { findLesson, l } from '../data/curriculum'
import { lessonContents } from '../data/content'
import useProgress from '../hooks/useProgress'
import useLang from '../hooks/useLang'

export default function LessonDetail() {
  const { lessonId } = useParams()
  const lesson = findLesson(lessonId)
  const { getLessonStatus, toggleLesson, isWeekUnlocked } = useProgress()
  const { t, lang } = useLang()

  if (!lesson) return <Navigate to="/dashboard" replace />
  if (!isWeekUnlocked(lesson.weekId)) return <Navigate to="/dashboard" replace />

  const done = getLessonStatus(lesson.id) === 'done'
  const content = lessonContents[lesson.id]

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg font-semibold text-[var(--text-high)]">{l(lesson.type, lang)} {l(lesson.title, lang)}</h1>
          <Link to={`/week/${lesson.weekId}`} className="text-[11px] text-accent-soft flex items-center gap-1 hover:text-accent transition-colors shrink-0 ml-4"><ArrowLeft size={12} /> Week {lesson.weekId}</Link>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--text-low)]">Greed Academy {lesson.source}</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--accent-surface)] text-accent-soft">Week {lesson.weekId}</span>
        </div>

        {content ? (
          <>
            <div className="space-y-6 mb-8">
              {content.sections.map((section, i) => (
                <motion.section key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                  className="ok-card p-5">
                  <h2 className="text-[15px] font-semibold text-[var(--text-high)] mb-3">{section.heading}</h2>
                  <div className="space-y-3">
                    {section.content.split('\n\n').map((para, j) => (
                      <p key={j} className="text-[13px] text-[var(--text-mid)] leading-relaxed">{para}</p>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>

            {content.keyTakeaways && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="ok-card p-5 mb-6 border-accent/20">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={16} className="text-accent-soft" />
                  <h3 className="text-[13px] font-semibold text-[var(--text-high)]">{lang === 'ko' ? '핵심 정리' : 'Key Takeaways'}</h3>
                </div>
                <ul className="space-y-2">
                  {content.keyTakeaways.map((item, i) => (
                    <li key={i} className="text-[12px] text-[var(--text-mid)] flex items-start gap-2">
                      <span className="text-accent-soft mt-0.5 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {lesson.mediumUrl && (
              <a href={lesson.mediumUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 ok-btn ok-btn-ghost px-5 py-2.5 text-[12px] mb-4">
                {lang === 'ko' ? '원문 읽기 (English)' : 'Read Original (English)'} <ExternalLink size={13} />
              </a>
            )}
          </>
        ) : (
          <div className="ok-card p-10 text-center mb-5">
            <p className="text-[15px] font-medium text-[var(--text-high)] mb-2">{t('lesson.preparing')}</p>
            <p className="text-[12px] text-[var(--text-mid)] leading-relaxed mb-6">
              {t('lesson.preparingDesc').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
            </p>
            {lesson.mediumUrl && (
              <a href={lesson.mediumUrl} target="_blank" rel="noopener noreferrer" className="ok-btn ok-btn-ghost px-5 py-2.5 text-[13px]">
                {t('lesson.readOriginal')} <ExternalLink size={14} />
              </a>
            )}
          </div>
        )}

        <button onClick={() => toggleLesson(lesson.id)}
          className={`w-full ok-btn py-3 text-[13px] ${done ? 'ok-btn-ghost border-success/20 text-success' : 'ok-btn-primary'}`}>
          {done ? <><Check size={16} /> {t('lesson.completed')}</> : <>{t('lesson.markComplete')}</>}
        </button>
      </motion.div>
    </div>
  )
}
