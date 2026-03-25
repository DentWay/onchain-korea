import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, BookOpen, Zap, Shield } from 'lucide-react'
import { weeks, l } from '../data/curriculum'
import useProgress from '../hooks/useProgress'
import useLang from '../hooks/useLang'

const typeIcons = { read: BookOpen, practice: Zap, security: Shield }
const typeColors = { read: 'text-accent-soft', practice: 'text-amber-400', security: 'text-emerald-400' }

export default function WeekDetail() {
  const { weekId } = useParams()
  const week = weeks.find(w => w.id === Number(weekId))
  const { isWeekUnlocked, toggleLesson, toggleAction, getLessonStatus, getActionStatus, getWeekProgress } = useProgress()
  const { t, lang } = useLang()

  if (!week) return <Navigate to="/dashboard" replace />
  if (!isWeekUnlocked(week.id)) return <Navigate to="/dashboard" replace />
  const progress = getWeekProgress(week.id)

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg font-semibold text-[var(--text-high)]">Week {week.id}: {l(week.title, lang)}</h1>
          <Link to="/dashboard" className="text-[11px] text-accent-soft flex items-center gap-1 hover:text-accent transition-colors"><ArrowLeft size={12} /> {t('week.back')}</Link>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="ok-card p-4">
            <p className="text-[10px] text-[var(--text-low)] uppercase tracking-wider">{t('week.learningProgress')}</p>
            <p className="text-2xl font-bold text-[var(--text-high)] mt-1 ok-tabular-nums">{progress}%</p>
            <div className="mt-2 ok-progress-track"><div className="ok-progress-fill" style={{ width: `${progress}%` }} /></div>
          </div>
          <div className="ok-card p-4">
            <p className="text-[10px] text-[var(--text-low)] uppercase tracking-wider">{t('week.onchainAction')}</p>
            <p className="text-2xl font-bold text-[var(--text-high)] mt-1 ok-tabular-nums">{week.actions.filter(a => getActionStatus(a.id) === 'done').length}/{week.actions.length} {t('week.complete')}</p>
          </div>
        </div>

        <h2 className="text-sm font-semibold text-[var(--text-high)] mb-2">{t('week.lessons')}</h2>
        <div className="ok-card overflow-hidden mb-6">
          {week.lessons.map((lesson, i) => {
            const done = getLessonStatus(lesson.id) === 'done'
            return (
              <div key={lesson.id} className={`flex items-center gap-2.5 px-4 py-2.5 text-[12px] ${i < week.lessons.length - 1 ? 'border-b border-[var(--border)]' : ''} hover:bg-[var(--surface-2)] transition-colors`}>
                <button onClick={() => toggleLesson(lesson.id)} className={`w-[20px] h-[20px] rounded-full shrink-0 flex items-center justify-center border-2 transition-all ${done ? 'bg-success border-success text-white' : 'border-[var(--border)] hover:border-accent/50'}`}>
                  {done && <Check size={10} strokeWidth={3} />}
                </button>
                {(() => { const TypeIcon = typeIcons[lesson.type]; return TypeIcon ? <TypeIcon size={13} className={`shrink-0 ${typeColors[lesson.type]}`} /> : null })()}
                <Link to={`/lesson/${lesson.id}`} className={`flex-1 hover:text-accent-soft transition-colors ${done ? 'text-[var(--text-low)] line-through' : 'text-[var(--text-high)]'}`}>{l(lesson.title, lang)}</Link>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--surface-2)] text-[var(--text-low)] shrink-0">{lesson.source}</span>
              </div>
            )
          })}
        </div>

        <h2 className="text-sm font-semibold text-[var(--text-high)] mb-2">{t('week.actions')}</h2>
        <div className="ok-card overflow-hidden mb-6">
          {week.actions.map((action, i) => {
            const done = getActionStatus(action.id) === 'done'
            return (
              <div key={action.id} className={`flex items-center gap-2.5 px-4 py-2.5 text-[12px] ${i < week.actions.length - 1 ? 'border-b border-[var(--border)]' : ''} hover:bg-[var(--surface-2)] transition-colors`}>
                <button onClick={() => toggleAction(action.id)} className={`w-[20px] h-[20px] rounded-full shrink-0 flex items-center justify-center border-2 transition-all ${done ? 'bg-success border-success text-white' : 'border-[var(--border)] hover:border-accent/50'}`}>
                  {done && <Check size={10} strokeWidth={3} />}
                </button>
                <span className={`flex-1 ${done ? 'text-[var(--text-low)] line-through' : 'text-[var(--text-high)]'}`}>{l(action.title, lang)}</span>
                {action.guideId && <Link to={`/action/${action.guideId}`} className="text-[10px] text-accent-soft font-medium hover:text-accent transition-colors">{t('week.guide')}</Link>}
              </div>
            )
          })}
        </div>

        {week.hiddenTopic && (
          <>
            <h2 className="text-sm font-semibold text-[var(--text-high)] mb-2">{t('week.hiddenTopic')}</h2>
            <Link to="/hidden" className="block ok-card p-4 border-accent/20 hover:border-accent/30">
              <p className="text-[9px] text-accent-soft uppercase tracking-wider font-medium mb-1">{t('week.hotIssue')}</p>
              <p className="text-[13px] font-medium text-[var(--text-high)]">{l(week.hiddenTopic.title, lang)}</p>
              <div className="flex gap-3 mt-2 text-[10px] text-[var(--text-low)]">
                <span>{l(week.hiddenTopic.readTime, lang)}</span>
                <span>{week.hiddenTopic.forumCount}{t('week.participating')}</span>
              </div>
            </Link>
          </>
        )}
      </motion.div>
    </div>
  )
}
