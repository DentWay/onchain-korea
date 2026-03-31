import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, BookOpen, Zap, Shield, ChevronRight, Flame, Lock, Award, ClipboardCheck } from 'lucide-react'
import { weeks, l } from '../data/curriculum'
import { articleQuizzes, weeklyTests } from '../data/quizzes'
import useProgress from '../hooks/useProgress'
import useQuiz from '../hooks/useQuiz'
import useLang from '../hooks/useLang'

const typeIcons = { read: BookOpen, practice: Zap, security: Shield }

export default function WeekDetail() {
  const { weekId } = useParams()
  const week = weeks.find(w => w.id === Number(weekId))
  const { isWeekUnlocked, isActionsUnlocked, isHiddenTopicUnlocked, toggleLesson, toggleAction, getLessonStatus, getActionStatus, getWeekProgress } = useProgress()
  const { isArticlePassed, areAllArticleQuizzesPassed, isWeeklyTestPassed } = useQuiz()
  const { t, lang } = useLang()

  if (!week) return <Navigate to="/dashboard" replace />
  if (!isWeekUnlocked(week.id)) return <Navigate to="/dashboard" replace />
  const progress = getWeekProgress(week.id)

  const completedLessons = week.lessons.filter(l => getLessonStatus(l.id) === 'done').length
  const completedActions = week.actions.filter(a => getActionStatus(a.id) === 'done').length
  const actionsOpen = isActionsUnlocked(week.id)
  const hiddenOpen = isHiddenTopicUnlocked(week.id)
  const allLessonsDone = completedLessons === week.lessons.length

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/dashboard" className="text-[11px] text-accent-soft flex items-center gap-1 hover:text-accent transition-colors"><ArrowLeft size={12} /> {t('week.back')}</Link>
        </div>

        <div className="mb-6">
          <p className="text-[10px] text-[var(--text-low)] font-mono tracking-widest uppercase mb-2">{t('common.week')} {week.id}</p>
          <h1 className="text-xl font-bold text-[var(--text-high)] mb-1">{l(week.title, lang)}</h1>
          <p className="text-[12px] text-[var(--text-mid)]">{l(week.subtitle, lang)}</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-1 mb-8">
          {['lessons', 'actions', 'hidden'].map((step, i) => {
            const stepDone = step === 'lessons' ? allLessonsDone : step === 'actions' ? completedActions > 0 : hiddenOpen && week.hiddenTopic
            const stepActive = step === 'lessons' ? !allLessonsDone : step === 'actions' ? allLessonsDone && completedActions === 0 : false
            return (
              <div key={step} className="flex items-center gap-1 flex-1">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium transition-colors ${stepDone ? 'bg-[var(--success-surface)] text-success' : stepActive ? 'bg-[var(--accent-surface)] text-accent-soft' : 'bg-[var(--surface-2)] text-[var(--text-low)]'}`}>
                  {stepDone ? <Check size={10} /> : <span>{i + 1}</span>}
                  <span className="hidden sm:inline">{step === 'lessons' ? t('dash.lessons') : step === 'actions' ? t('dash.actions') : t('dash.topics')}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-px ${stepDone ? 'bg-success/30' : 'bg-[var(--border)]'}`} />}
              </div>
            )
          })}
        </div>

        {/* Progress cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
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

        {/* Lessons — sequential unlock with blur preview */}
        <h2 className="text-sm font-semibold text-[var(--text-high)] mb-3">{t('week.lessons')}</h2>
        <div className="space-y-1.5 mb-6">
          {week.lessons.map((lesson, i) => {
            const status = getLessonStatus(lesson.id)
            const locked = status === 'locked'
            const done = status === 'done'
            const TypeIcon = typeIcons[lesson.type]
            const isNext = !done && !locked && i > 0 && getLessonStatus(week.lessons[i - 1]?.id) === 'done'
            return (
              <motion.div key={lesson.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                <div className={`ok-card flex items-center gap-3 px-4 py-3 group transition-all ${locked ? 'opacity-50' : 'hover:bg-[var(--surface-2)]'} ${isNext ? 'border-accent/15' : ''}`}>
                  {locked ? (
                    <div className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center border-2 border-[var(--border)]">
                      <Lock size={9} className="text-[var(--text-low)]" />
                    </div>
                  ) : (
                    <button onClick={() => toggleLesson(lesson.id)} className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center border-2 transition-all ${done ? 'bg-success border-success text-white' : 'border-[var(--border)] hover:border-accent/50'}`}>
                      {done && <Check size={10} strokeWidth={3} />}
                    </button>
                  )}
                  {TypeIcon && <TypeIcon size={13} className={`shrink-0 ${locked ? 'text-[var(--text-low)]' : 'text-accent-soft'}`} />}
                  {locked ? (
                    <span className="flex-1 text-[13px] text-[var(--text-low)]" style={{ filter: 'blur(3px)' }}>{l(lesson.title, lang)}</span>
                  ) : (
                    <Link to={`/lesson/${lesson.id}`} className={`flex-1 text-[13px] group-hover:text-accent-soft transition-colors ${done ? 'text-[var(--text-low)] line-through' : 'text-[var(--text-high)]'}`}>
                      {l(lesson.title, lang)}
                    </Link>
                  )}
                  {isNext && <span className="text-[9px] text-accent-soft font-medium">Next</span>}
                  {done && articleQuizzes[lesson.id] && (
                    <Link
                      to={`/quiz/article/${lesson.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className={`text-[10px] font-medium shrink-0 ok-btn px-2 py-0.5 ${
                        isArticlePassed(lesson.id)
                          ? 'ok-btn-ghost text-success border-success/20'
                          : 'ok-btn-ghost text-accent-soft'
                      }`}
                    >
                      {isArticlePassed(lesson.id) ? <><Check size={10} /> {t('quiz.takeQuiz')}</> : <><Award size={10} /> {t('quiz.takeQuiz')}</>}
                    </Link>
                  )}
                  {!locked && <ChevronRight size={14} className="text-[var(--text-low)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Actions unlock banner */}
        <AnimatePresence>
          {allLessonsDone && !actionsOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="ok-card p-4 border-success/15 mb-3 text-center"
            >
              <Check size={16} className="text-success mx-auto mb-1" />
              <p className="text-[12px] text-success font-medium">{t('week.lessonsDone')}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold text-[var(--text-high)]">{t('week.actions')}</h2>
          {!actionsOpen && <Lock size={12} className="text-[var(--text-low)]" />}
        </div>
        {!actionsOpen && (
          <p className="text-[11px] text-[var(--text-low)] mb-3">{t('week.completeLessonsForActions')}</p>
        )}
        <div className={`space-y-1.5 mb-6 transition-opacity ${!actionsOpen ? 'opacity-35 pointer-events-none' : ''}`}>
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
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-semibold text-[var(--text-high)]">{t('week.hiddenTopic')}</h2>
              {!hiddenOpen && <Lock size={12} className="text-[var(--text-low)]" />}
            </div>
            {!hiddenOpen && (
              <p className="text-[11px] text-[var(--text-low)] mb-3">{t('week.completeActionForHidden')}</p>
            )}
            <div className={`transition-opacity ${!hiddenOpen ? 'opacity-35 pointer-events-none' : ''}`}>
              <Link to="/hidden" className="block ok-card p-5 border-accent/10 hover:border-accent/20 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Flame size={13} className="text-accent-soft" />
                  <span className="text-[10px] text-accent-soft uppercase tracking-wider font-medium">{t('week.hotIssue')}</span>
                </div>
                <p className="text-[14px] font-semibold text-[var(--text-high)] leading-snug">{l(week.hiddenTopic.title, lang)}</p>
                <p className="text-[11px] text-[var(--text-mid)] mt-1">{l(week.hiddenTopic.readTime, lang)}</p>
              </Link>
            </div>
          </>
        )}

        {/* Weekly Test */}
        {weeklyTests[week.id] && (
          <>
            <div className="flex items-center gap-2 mb-3 mt-8">
              <h2 className="text-sm font-semibold text-[var(--text-high)]">{t('quiz.weeklyTestTitle')}</h2>
              {!areAllArticleQuizzesPassed(week.id) && <Lock size={12} className="text-[var(--text-low)]" />}
            </div>
            {!areAllArticleQuizzesPassed(week.id) && (
              <p className="text-[11px] text-[var(--text-low)] mb-3">{t('quiz.passAllArticles')}</p>
            )}
            <div className={`transition-opacity ${!areAllArticleQuizzesPassed(week.id) ? 'opacity-35 pointer-events-none' : ''}`}>
              <Link to={`/quiz/weekly/${week.id}`} className="block ok-card p-5 border-accent/10 hover:border-accent/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${
                    isWeeklyTestPassed(week.id) ? 'bg-[var(--success-surface)]' : 'bg-[var(--accent-surface)]'
                  }`}>
                    {isWeeklyTestPassed(week.id)
                      ? <Check size={18} className="text-success" />
                      : <ClipboardCheck size={18} className="text-accent-soft" />
                    }
                  </div>
                  <div className="flex-1">
                    <p className={`text-[14px] font-semibold leading-snug ${
                      isWeeklyTestPassed(week.id) ? 'text-success' : 'text-[var(--text-high)]'
                    }`}>
                      Week {week.id} {t('quiz.weeklyTest')}
                    </p>
                    <p className="text-[11px] text-[var(--text-mid)] mt-0.5">
                      {weeklyTests[week.id].length} {t('quiz.question')} · {t('quiz.passThreshold')} {Math.ceil(weeklyTests[week.id].length * 0.8)}/{weeklyTests[week.id].length}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-[var(--text-low)] shrink-0" />
                </div>
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
