import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Lock, BookOpen, Zap, Flame, Check } from 'lucide-react'
import { weeks, l } from '../data/curriculum'
import useProgress from '../hooks/useProgress'
import useLang from '../hooks/useLang'
import CountdownTimer from '../components/CountdownTimer'

const SEMESTER_DEADLINE = '2026-04-30T23:59:59+09:00'

export default function Dashboard() {
  const { completedLessons, completedActions, readHiddenTopics, overallProgress, activeWeek, getWeekProgress, totalLessons, totalActions, certificateStatus, isWeekUnlocked } = useProgress()
  const { t, lang } = useLang()
  const currentWeek = weeks.find(w => w.id === activeWeek)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Current Week Hero Card */}
      {currentWeek && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Link to={`/week/${currentWeek.id}`} className="block ok-card p-6 mb-6 border-accent/15 hover:border-accent/25 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-surface)] flex items-center justify-center">
                  <span className="text-accent-soft text-[13px] font-bold">{activeWeek}</span>
                </div>
                <div>
                  <p className="text-[10px] text-accent-soft uppercase tracking-wider font-medium">{t('common.week')} {activeWeek}</p>
                  <h2 className="text-[16px] font-semibold text-[var(--text-high)]">{l(currentWeek.title, lang)}</h2>
                </div>
              </div>
              <ArrowRight size={16} className="text-accent-soft" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="ok-progress-track">
                  <div className="ok-progress-fill" style={{ width: `${getWeekProgress(activeWeek)}%` }} />
                </div>
              </div>
              <span className="text-[12px] text-accent-soft font-semibold ok-tabular-nums">{getWeekProgress(activeWeek)}%</span>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Stats row */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: t('dash.lessons'), value: `${completedLessons.length}/${totalLessons}`, sub: t('dash.doneSub') },
          { label: t('dash.actions'), value: `${completedActions.length}/${totalActions}`, sub: t('dash.verified') },
          { label: t('dash.topics'), value: `${readHiddenTopics.length}/4`, sub: t('dash.read') },
        ].map((s, i) => (
          <div key={i} className="ok-card p-3 text-center">
            <p className="text-[9px] text-[var(--text-low)] uppercase tracking-wider mb-1">{s.label}</p>
            <p className="text-lg font-bold text-[var(--text-high)] ok-tabular-nums">{s.value}</p>
            <p className="text-[9px] text-[var(--text-low)]">{s.sub}</p>
          </div>
        ))}
      </motion.div>

      {/* Certificate + Deadline row */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        <div className="ok-card p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-[var(--text-low)] uppercase tracking-wider">{t('dash.certLabel')}</p>
            <p className="text-[10px] text-[var(--text-low)] ok-tabular-nums">
              {certificateStatus.lessonsComplete}/{certificateStatus.lessonsRequired} · {certificateStatus.actionsComplete}/{certificateStatus.actionsRequired} · {certificateStatus.hiddenTopicsRead}/{certificateStatus.hiddenTopicsRequired}
            </p>
          </div>
          <div className="ok-progress-track">
            <div className="ok-progress-fill" style={{ width: `${Math.min(100, Math.round(((certificateStatus.lessonsComplete / certificateStatus.lessonsRequired) + (certificateStatus.actionsComplete / certificateStatus.actionsRequired) + (certificateStatus.hiddenTopicsRead / certificateStatus.hiddenTopicsRequired)) / 3 * 100))}%` }} />
          </div>
        </div>
        <div className="ok-card p-4">
          <p className="text-[10px] text-[var(--text-low)] uppercase tracking-wider mb-2">{t('dash.semesterDeadline')}</p>
          <CountdownTimer targetDate={SEMESTER_DEADLINE} />
        </div>
      </motion.div>

      {/* Week Timeline */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.16 }}>
        <h2 className="text-sm font-semibold text-[var(--text-high)] mb-4">{t('dash.curriculum4w')}</h2>
        <div className="space-y-2">
          {weeks.map((week, i) => {
            const progress = getWeekProgress(week.id)
            const locked = !isWeekUnlocked(week.id)
            const isDone = progress >= 100
            const isActive = week.id === activeWeek
            const isStarted = progress > 0

            return (
              <motion.div key={week.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + i * 0.06 }}>
                {locked ? (
                  <div className="ok-card p-4 opacity-40 cursor-not-allowed flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[var(--surface-2)] flex items-center justify-center shrink-0">
                      <Lock size={14} className="text-[var(--text-low)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[var(--text-low)] font-mono uppercase tracking-widest">{t('common.week')} {week.id}</p>
                      <p className="text-[14px] font-medium text-[var(--text-mid)] truncate">{l(week.title, lang)}</p>
                    </div>
                  </div>
                ) : (
                  <Link to={`/week/${week.id}`} className={`block ok-card p-4 transition-colors hover:bg-[var(--surface-2)] ${isActive ? 'border-accent/15' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isDone ? 'bg-[var(--success-surface)]' : isActive ? 'bg-[var(--accent-surface)]' : 'bg-[var(--surface-2)]'}`}>
                        {isDone ? (
                          <Check size={16} className="text-success" />
                        ) : (
                          <span className={`text-[13px] font-bold ${isActive ? 'text-accent-soft' : 'text-[var(--text-low)]'}`}>{week.id}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-[10px] text-[var(--text-low)] font-mono uppercase tracking-widest">{t('common.week')} {week.id}</p>
                          {isDone && <span className="ok-tag ok-tag-done">Done</span>}
                          {isActive && !isDone && <span className="ok-tag ok-tag-progress">{progress}%</span>}
                        </div>
                        <p className="text-[14px] font-medium text-[var(--text-high)] truncate">{l(week.title, lang)}</p>
                        <div className="flex gap-3 mt-1 text-[10px] text-[var(--text-low)]">
                          <span className="flex items-center gap-1"><BookOpen size={10} /> {week.lessons.length}</span>
                          <span className="flex items-center gap-1"><Zap size={10} /> {week.actions.length}</span>
                          {week.hiddenTopic && <span className="flex items-center gap-1"><Flame size={10} /> 1</span>}
                        </div>
                      </div>
                      {isStarted && !isDone && (
                        <div className="w-16 shrink-0">
                          <div className="ok-progress-track">
                            <div className="ok-progress-fill" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                      )}
                      <ArrowRight size={14} className="text-[var(--text-low)] shrink-0" />
                    </div>
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* This week's hidden topic */}
      {currentWeek?.hiddenTopic && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6">
          <Link to="/hidden" className="block ok-card p-4 border-accent/10 hover:border-accent/20 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <Flame size={13} className="text-accent-soft" />
              <span className="text-[10px] text-accent-soft uppercase tracking-wider font-medium">{t('dash.thisWeekHidden')}</span>
            </div>
            <p className="text-[13px] font-medium text-[var(--text-high)] leading-snug">{l(currentWeek.hiddenTopic.title, lang)}</p>
          </Link>
        </motion.div>
      )}
    </div>
  )
}
