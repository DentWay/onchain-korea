import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Lock, BookOpen, Zap, Flame } from 'lucide-react'
import { weeks, l } from '../data/curriculum'
import useProgress from '../hooks/useProgress'
import useLang from '../hooks/useLang'
import CircleProgress from '../components/CircleProgress'
import CountdownTimer from '../components/CountdownTimer'

// Semester 3 deadline: 2026-04-30 KST
const SEMESTER_DEADLINE = '2026-04-30T23:59:59+09:00'

function WeekCard({ week, progress, lang, index, locked }) {
  const isDone = progress >= 100
  const isStarted = progress > 0

  const inner = (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + index * 0.08 }}>
      <div className={`ok-card p-5 h-full ${locked ? 'opacity-40' : ''} ${isDone ? 'border-success/15' : isStarted ? 'border-accent/15' : ''}`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-[var(--text-low)] font-mono tracking-widest uppercase">Week {week.id}</span>
          {locked && <Lock size={13} className="text-[var(--text-low)]" />}
          {isDone && <span className="ok-tag ok-tag-done">Done</span>}
          {isStarted && !isDone && <span className="text-[10px] text-accent-soft font-semibold ok-tabular-nums">{progress}%</span>}
        </div>

        <h3 className="text-[15px] font-semibold text-[var(--text-high)] mb-1 leading-snug">{l(week.title, lang)}</h3>
        <p className="text-[11px] text-[var(--text-mid)] mb-4 leading-relaxed">{l(week.subtitle, lang)}</p>

        {isStarted && !locked && (
          <div className="mb-4 ok-progress-track">
            <div className="ok-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-[10px] text-[var(--text-low)]">
            <span className="flex items-center gap-1"><BookOpen size={10} /> {week.lessons.length}</span>
            <span className="flex items-center gap-1"><Zap size={10} /> {week.actions.length}</span>
            {week.hiddenTopic && <span className="flex items-center gap-1"><Flame size={10} /> 1</span>}
          </div>
          {!locked && <ArrowRight size={14} className="text-[var(--text-low)]" />}
        </div>
      </div>
    </motion.div>
  )

  if (locked) return <div className="cursor-not-allowed">{inner}</div>
  return <Link to={`/week/${week.id}`} className="block">{inner}</Link>
}

export default function Dashboard() {
  const { completedLessons, completedActions, readHiddenTopics, overallProgress, activeWeek, getWeekProgress, totalLessons, totalActions, certificateStatus, isWeekUnlocked } = useProgress()
  const { t, lang } = useLang()
  const currentWeek = weeks.find(w => w.id === activeWeek)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero stats */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center gap-8 mb-10">
        <CircleProgress value={overallProgress} size="lg" label={t('dash.progress')} />
        <div className="flex-1 w-full">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: lang === 'ko' ? '레슨' : 'Lessons', value: `${completedLessons.length}/${totalLessons}`, sub: lang === 'ko' ? '완료' : 'done' },
              { label: lang === 'ko' ? '액션' : 'Actions', value: `${completedActions.length}/${totalActions}`, sub: lang === 'ko' ? '인증' : 'verified' },
              { label: lang === 'ko' ? '히든토픽' : 'Topics', value: `${readHiddenTopics.length}/4`, sub: lang === 'ko' ? '참여' : 'read' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                className="ok-card p-4 text-center">
                <p className="text-[10px] text-[var(--text-low)] uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-xl font-bold text-[var(--text-high)] ok-tabular-nums">{s.value}</p>
                <p className="text-[9px] text-[var(--text-low)] mt-0.5">{s.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Certificate progress */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            className="mt-3 ok-card p-3 flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] text-[var(--text-low)]">{lang === 'ko' ? '수료 조건' : 'Certificate'}</p>
                <p className="text-[10px] text-[var(--text-low)] ok-tabular-nums">
                  {certificateStatus.lessonsComplete}/{certificateStatus.lessonsRequired} · {certificateStatus.actionsComplete}/{certificateStatus.actionsRequired} · {certificateStatus.hiddenTopicsRead}/{certificateStatus.hiddenTopicsRequired}
                </p>
              </div>
              <div className="ok-progress-track">
                <div className="ok-progress-fill" style={{ width: `${Math.min(100, Math.round(((certificateStatus.lessonsComplete / certificateStatus.lessonsRequired) + (certificateStatus.actionsComplete / certificateStatus.actionsRequired) + (certificateStatus.hiddenTopicsRead / certificateStatus.hiddenTopicsRequired)) / 3 * 100))}%` }} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Deadline + Hidden topic */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="ok-card p-4">
          <p className="text-[10px] text-[var(--text-low)] uppercase tracking-wider mb-2">{lang === 'ko' ? '학기 마감' : 'Semester Deadline'}</p>
          <CountdownTimer targetDate={SEMESTER_DEADLINE} />
        </motion.div>

        {currentWeek?.hiddenTopic && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Link to="/hidden" className="block ok-card p-4 border-accent/10 hover:border-accent/20 transition-colors h-full">
              <div className="flex items-center gap-2 mb-2">
                <Flame size={13} className="text-accent-soft" />
                <span className="text-[10px] text-[var(--text-low)] uppercase tracking-wider">{lang === 'ko' ? '이번 주 히든 토픽' : "This Week's Hidden Topic"}</span>
              </div>
              <p className="text-[13px] font-medium text-[var(--text-high)] leading-snug">{l(currentWeek.hiddenTopic.title, lang)}</p>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Week cards */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <h2 className="text-sm font-semibold text-[var(--text-high)] mb-4">{t('dash.curriculum4w')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {weeks.map((week, i) => (
            <WeekCard key={week.id} week={week} progress={getWeekProgress(week.id)} lang={lang} index={i} locked={!isWeekUnlocked(week.id)} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
