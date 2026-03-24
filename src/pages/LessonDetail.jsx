import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Check, BookOpen } from 'lucide-react'
import { findLesson, l } from '../data/curriculum'
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

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg font-semibold text-[var(--text-high)]">{l(lesson.type, lang)} {l(lesson.title, lang)}</h1>
          <Link to={`/week/${lesson.weekId}`} className="text-[11px] text-accent-soft flex items-center gap-1 hover:text-accent transition-colors"><ArrowLeft size={12} /> Week {lesson.weekId}</Link>
        </div>

        <div className="flex items-center gap-2 mb-5">
          <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--text-low)]">Greed Academy {lesson.source}</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--accent-surface)] text-accent-soft">Week {lesson.weekId}</span>
        </div>

        <div className="ok-card p-10 text-center mb-5">
          <BookOpen size={40} className="mx-auto text-[var(--text-low)] mb-4" />
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

        <button onClick={() => toggleLesson(lesson.id)}
          className={`w-full ok-btn py-3 text-[13px] ${done ? 'ok-btn-ghost border-success/20 text-success' : 'ok-btn-primary'}`}>
          {done ? <><Check size={16} /> {t('lesson.completed')}</> : <>{t('lesson.markComplete')}</>}
        </button>
      </motion.div>
    </div>
  )
}
