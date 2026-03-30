import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, BookOpen, Zap, Shield, ChevronRight, Flame } from 'lucide-react'
import { weeks, l } from '../data/curriculum'
import useProgress from '../hooks/useProgress'
import useLang from '../hooks/useLang'

const typeIcons = { read: BookOpen, practice: Zap, security: Shield }

export default function WeekDetail() {
  const { weekId } = useParams()
  const week = weeks.find(w => w.id === Number(weekId))
  const { isWeekUnlocked, toggleLesson, toggleAction, getLessonStatus, getActionStatus, getWeekProgress } = useProgress()
  const { t, lang } = useLang()

  if (!week) return <Navigate to="/dashboard" replace />
  if (!isWeekUnlocked(week.id)) return <Navigate to="/dashboard" replace />
  const progress = getWeekProgress(week.id)

  const completedLessons = week.lessons.filter(l => getLessonStatus(l.id) === 'done').length
  const completedActions = week.actions.filter(a => getActionStatus(a.id) === 'done').length

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/dashboard" className="text-[11px] text-accent-soft flex items-center gap-1 hover:text-accent transition-colors"><ArrowLeft size={12} /> {t('week.back')}</Link>
        </div>

        <div className="mb-8">
          <p className="text-[10px] text-[var(--text-low)] font-mono tracking-widest uppercase mb-2">Week {week.id}</p>
          <h1 className="text-xl font-bold text-[var(--text-high)] mb-1">{l(week.title, lang)}</h1>
          <p className="text-[12px] text-[var(--text-mid)]">{l(week.subtitle, lang)}</p>
        </div>

        {/* Progress overview */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="ok-card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-[var(--text-low)] uppercase tracking-wider">{t('week.learningProgress')}</p>
              <p className="text-[10px] text-accent-soft font-semibold ok-tabular-nums">{progress}%</p>
            </div>
            <div className="ok-progress-track"><div className="ok-progress-fill" style={{ width: `${progress}%` }} /></div>
            <p className="text-[10px] text-[var(--text-low)] mt-2">{completedLessons}/{week.lessons.length} {t('week.lessonsDone')}</p>
          </div>
          <div className="ok-card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-[var(--text-low)] uppercase tracking-wider">{t('week.onchainAction')}</p>
              <p className="text-[10px] text-accent-soft font-semibold ok-tabular-nums">{completedActions}/{week.actions.length}</p>
            </div>
            <div className="ok-progress-track"><div className="ok-progress-fill" style={{ width: `${week.actions.length > 0 ? (completedActions / week.actions.length * 100) : 0}%` }} /></div>
            <p className="text-[10px] text-[var(--text-low)] mt-2">{completedActions}/{week.actions.length} {t('week.actionsVerified')}</p>
          </div>
        </div>

        {/* Lessons */}
        <h2 className="text-sm font-semibold text-[var(--text-high)] mb-3">{t('week.lessons')}</h2>
        <div className="space-y-1.5 mb-8">
          {week.lessons.map((lesson, i) => {
            const done = getLessonStatus(lesson.id) === 'done'
            const TypeIcon = typeIcons[lesson.type]
            return (
              <motion.div key={lesson.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                <div className="ok-card flex items-center gap-3 px-4 py-3 group hover:bg-[var(--surface-2)] transition-colors">
                  <button onClick={() => toggleLesson(lesson.id)} className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center border-2 transition-all ${done ? 'bg-success border-success text-white' : 'border-[var(--border)] hover:border-accent/50'}`}>
                    {done && <Check size={10} strokeWidth={3} />}
                  </button>
                  {TypeIcon && <TypeIcon size={13} className="shrink-0 text-accent-soft" />}
                  <Link to={`/lesson/${lesson.id}`} className={`flex-1 text-[13px] group-hover:text-accent-soft transition-colors ${done ? 'text-[var(--text-low)] line-through' : 'text-[var(--text-high)]'}`}>
                    {l(lesson.title, lang)}
                  </Link>
                  <ChevronRight size={14} className="text-[var(--text-low)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Actions */}
        <h2 className="text-sm font-semibold text-[var(--text-high)] mb-3">{t('week.actions')}</h2>
        <div className="space-y-1.5 mb-8">
          {week.actions.map((action, i) => {
            const done = getActionStatus(action.id) === 'done'
            return (
              <motion.div key={action.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                <div className="ok-card flex items-center gap-3 px-4 py-3 group hover:bg-[var(--surface-2)] transition-colors">
                  <button onClick={() => toggleAction(action.id)} className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center border-2 transition-all ${done ? 'bg-success border-success text-white' : 'border-[var(--border)] hover:border-accent/50'}`}>
                    {done && <Check size={10} strokeWidth={3} />}
                  </button>
                  <Zap size={13} className="shrink-0 text-accent-soft" />
                  <span className={`flex-1 text-[13px] ${done ? 'text-[var(--text-low)] line-through' : 'text-[var(--text-high)]'}`}>{l(action.title, lang)}</span>
                  {action.guideId && (
                    <Link to={`/action/${action.guideId}`} className="text-[10px] text-accent-soft font-medium hover:text-accent transition-colors ok-btn ok-btn-ghost px-2 py-0.5">{t('week.guide')}</Link>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Hidden Topic */}
        {week.hiddenTopic && (
          <>
            <h2 className="text-sm font-semibold text-[var(--text-high)] mb-3">{t('week.hiddenTopic')}</h2>
            <Link to="/hidden" className="block ok-card p-5 border-accent/10 hover:border-accent/20 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Flame size={13} className="text-accent-soft" />
                <span className="text-[10px] text-accent-soft uppercase tracking-wider font-medium">{t('week.hotIssue')}</span>
              </div>
              <p className="text-[14px] font-semibold text-[var(--text-high)] leading-snug">{l(week.hiddenTopic.title, lang)}</p>
              <p className="text-[11px] text-[var(--text-mid)] mt-1">{l(week.hiddenTopic.readTime, lang)}</p>
            </Link>
          </>
        )}
      </motion.div>
    </div>
  )
}
