import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { weeks, l } from '../data/curriculum'
import useProgress from '../hooks/useProgress'
import useLang from '../hooks/useLang'
import CircleProgress from '../components/CircleProgress'
import ActivityFeed from '../components/ActivityFeed'
import CountdownTimer from '../components/CountdownTimer'

// Semester 3 deadline: 2026-04-30 KST
const SEMESTER_DEADLINE = '2026-04-30T23:59:59+09:00'

function StatCard({ label, value, sub }) {
  return (
    <div className="ok-card p-4">
      <p className="text-[10px] text-[var(--text-low)] uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-[var(--text-high)] ok-tabular-nums mt-1">{value}</p>
      {sub && <p className="text-[10px] text-[var(--text-low)] mt-1">{sub}</p>}
    </div>
  )
}

function WeekCard({ week, progress, lang, index }) {
  const isDone = progress >= 100
  const isStarted = progress > 0

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }}>
      <Link to={`/week/${week.id}`} className="block ok-card p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-[var(--text-low)] font-mono tracking-widest">WEEK {week.id}</span>
          <div className="flex items-center gap-2">
            {isDone && <span className="ok-tag ok-tag-done">✓</span>}
            {isStarted && !isDone && <span className="ok-tag ok-tag-progress">{progress}%</span>}
          </div>
        </div>
        <h3 className="text-[14px] font-semibold text-[var(--text-high)] mb-1">{l(week.title, lang)}</h3>
        <p className="text-[11px] text-[var(--text-mid)]">{l(week.subtitle, lang)}</p>
        {isStarted && <div className="mt-3 ok-progress-track"><div className="ok-progress-fill" style={{ width: `${progress}%` }} /></div>}
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-1.5">
            <span className="text-[9px] px-2 py-0.5 rounded-md bg-[var(--surface-2)] text-[var(--text-low)]">{week.lessons.length} {lang === 'ko' ? '레슨' : 'lessons'}</span>
            <span className="text-[9px] px-2 py-0.5 rounded-md bg-[var(--surface-2)] text-[var(--text-low)]">{week.actions.length} {lang === 'ko' ? '액션' : 'actions'}</span>
          </div>
          <ArrowRight size={14} className="text-[var(--text-low)]" />
        </div>
      </Link>
    </motion.div>
  )
}

export default function Dashboard() {
  const { completedLessons, completedActions, readHiddenTopics, overallProgress, activeWeek, getWeekProgress, totalLessons, certificateStatus } = useProgress()
  const { t, lang } = useLang()
  const currentWeek = weeks.find(w => w.id === activeWeek)

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <CircleProgress value={overallProgress} size="lg" label={t('dash.progress')} />
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
          <StatCard label={t('dash.completedLessons')} value={`${completedLessons.length}/${totalLessons}`} sub={completedLessons.length > 0 ? `+${completedLessons.length} ${t('dash.completed')}` : t('dash.notStarted')} />
          <StatCard label={t('dash.onchainActions')} value={completedActions.length} sub={completedActions.length > 0 ? t('dash.inProgress') : t('dash.notStarted')} />
          <StatCard label={t('dash.hiddenTopics')} value={`${readHiddenTopics.length}/4`} sub={readHiddenTopics.length > 0 ? t('dash.readDone') : t('dash.thisWeekOpen')} />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="ok-card p-4">
          <ActivityFeed maxItems={4} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="ok-card p-4">
          <div className="mb-4">
            <p className="text-[10px] text-[var(--text-low)] uppercase tracking-wider mb-3">{lang === 'ko' ? '학기 마감' : 'Semester Deadline'}</p>
            <CountdownTimer targetDate={SEMESTER_DEADLINE} />
          </div>
          <div className="border-t border-[var(--border)] pt-3">
            <p className="text-[10px] text-[var(--text-low)] uppercase tracking-wider mb-1">{lang === 'ko' ? '수료 조건' : 'Certificate Requirements'}</p>
            <p className="text-sm text-[var(--text-mid)] mt-1">{lang === 'ko' ? `레슨 ${certificateStatus.lessonsComplete}/${certificateStatus.lessonsRequired} · 액션 ${certificateStatus.actionsComplete}/${certificateStatus.actionsRequired} · 히든토픽 ${certificateStatus.hiddenTopicsRead}/${certificateStatus.hiddenTopicsRequired}` : `Lessons ${certificateStatus.lessonsComplete}/${certificateStatus.lessonsRequired} · Actions ${certificateStatus.actionsComplete}/${certificateStatus.actionsRequired} · Topics ${certificateStatus.hiddenTopicsRead}/${certificateStatus.hiddenTopicsRequired}`}</p>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <h2 className="text-sm font-semibold text-[var(--text-high)] mb-3">{t('dash.curriculum4w')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {weeks.map((week, i) => <WeekCard key={week.id} week={week} progress={getWeekProgress(week.id)} lang={lang} index={i} />)}
        </div>
      </motion.div>

      {currentWeek?.hiddenTopic && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6">
          <h2 className="text-sm font-semibold text-[var(--text-high)] mb-3">{t('dash.thisWeekHidden')}</h2>
          <Link to="/hidden" className="block ok-card p-4 border-accent/20 hover:border-accent/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="ok-tag ok-tag-accent">NEW</span>
              <span className="text-[9px] text-[var(--text-low)] uppercase tracking-wider">Week {currentWeek.id}</span>
            </div>
            <p className="text-[14px] font-semibold text-[var(--text-high)]">{l(currentWeek.hiddenTopic.title, lang)}</p>
            <div className="flex gap-3 mt-2 text-[10px] text-[var(--text-low)]">
              <span>{l(currentWeek.hiddenTopic.readTime, lang)}</span>
              <span>{currentWeek.hiddenTopic.forumCount}{t('week.participating')}</span>
            </div>
          </Link>
        </motion.div>
      )}
    </div>
  )
}
