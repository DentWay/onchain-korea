import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Check, Lightbulb, BookOpen, Zap, Shield, ChevronRight } from 'lucide-react'
import { findLesson, weeks, greedArticles, l } from '../data/curriculum'
import { lessonContents } from '../data/content'
import useProgress from '../hooks/useProgress'
import useLang from '../hooks/useLang'

const typeConfig = {
  read: { icon: BookOpen, label: { ko: '읽기', en: 'Read' } },
  practice: { icon: Zap, label: { ko: '실습', en: 'Practice' } },
  security: { icon: Shield, label: { ko: '보안', en: 'Security' } },
}

export default function LessonDetail() {
  const { lessonId } = useParams()
  const lesson = findLesson(lessonId)
  const { getLessonStatus, toggleLesson, isWeekUnlocked } = useProgress()
  const { t, lang } = useLang()

  if (!lesson) return <Navigate to="/dashboard" replace />
  if (!isWeekUnlocked(lesson.weekId)) return <Navigate to="/dashboard" replace />

  const done = getLessonStatus(lesson.id) === 'done'
  const content = lessonContents[lesson.id]

  // Find next lesson
  const week = weeks.find(w => w.id === lesson.weekId)
  const lessonIndex = week?.lessons.findIndex(l => l.id === lesson.id) ?? -1
  const nextLesson = week?.lessons[lessonIndex + 1]

  const cfg = typeConfig[lesson.type]
  const TypeIcon = cfg?.icon

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-low)] mb-8">
          <Link to="/dashboard" className="hover:text-[var(--text-mid)] transition-colors">Dashboard</Link>
          <ChevronRight size={10} />
          <Link to={`/week/${lesson.weekId}`} className="hover:text-[var(--text-mid)] transition-colors">Week {lesson.weekId}</Link>
          <ChevronRight size={10} />
          <span className="text-[var(--text-mid)]">{l(lesson.title, lang).split(' — ')[0]}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            {TypeIcon && (
              <span className="flex items-center gap-1.5 text-[10px] font-medium text-accent-soft px-2 py-0.5 rounded-full bg-[var(--accent-surface)]">
                <TypeIcon size={11} />
                {cfg.label[lang] || cfg.label.ko}
              </span>
            )}
            <span className="text-[10px] text-[var(--text-low)]">{greedArticles[lesson.source]?.title}</span>
          </div>
          <h1 className="text-2xl md:text-[28px] font-bold text-[var(--text-high)] leading-tight tracking-tight">{l(lesson.title, lang)}</h1>
        </div>

        {content ? (
          <>
            {/* Article body — clean reading flow, no card wrappers */}
            <article className="mb-12">
              {content.sections.map((section, i) => (
                <motion.section key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + i * 0.05 }}
                  className="mb-10">
                  <h2 className="text-[17px] font-semibold text-[var(--text-high)] mb-4 pb-2 border-b border-[var(--border)]">{section.heading}</h2>
                  <div className="space-y-4">
                    {section.content.split('\n\n').map((para, j) => (
                      <p key={j} className="text-[14px] text-[var(--text-mid)] leading-[1.8]">{para}</p>
                    ))}
                  </div>
                </motion.section>
              ))}
            </article>

            {/* Key Takeaways */}
            {content.keyTakeaways && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="rounded-xl bg-[var(--accent-surface)] border border-accent/10 p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb size={16} className="text-accent-soft" />
                  <h3 className="text-[14px] font-semibold text-[var(--text-high)]">{t('lesson.keyTakeaways')}</h3>
                </div>
                <ul className="space-y-3">
                  {content.keyTakeaways.map((item, i) => (
                    <li key={i} className="text-[13px] text-[var(--text-mid)] leading-relaxed flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-accent/10 text-accent-soft flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Source attribution */}
            {lesson.mediumUrl && (
              <div className="flex items-center justify-between ok-card p-4 mb-6">
                <div>
                  <p className="text-[10px] text-[var(--text-low)] uppercase tracking-wider mb-0.5">{t('lesson.originalSource')}</p>
                  <p className="text-[12px] text-[var(--text-mid)]">Greed Academy — {greedArticles[lesson.source]?.title}</p>
                </div>
                <a href={lesson.mediumUrl} target="_blank" rel="noopener noreferrer"
                  className="ok-btn ok-btn-ghost text-[11px] px-3 py-1.5 shrink-0">
                  {t('lesson.readOriginalShort')} <ExternalLink size={11} />
                </a>
              </div>
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

        {/* Bottom actions */}
        <div className="space-y-3">
          <button onClick={() => toggleLesson(lesson.id)}
            className={`w-full ok-btn py-3.5 text-[13px] ${done ? 'ok-btn-ghost border-success/20 text-success' : 'ok-btn-primary'}`}>
            {done ? <><Check size={16} /> {t('lesson.completed')}</> : <>{t('lesson.markComplete')}</>}
          </button>

          {nextLesson && (
            <Link to={`/lesson/${nextLesson.id}`}
              className="flex items-center justify-between w-full ok-card p-4 hover:bg-[var(--surface-2)] transition-colors group">
              <div>
                <p className="text-[10px] text-[var(--text-low)] mb-0.5">{t('lesson.nextLesson')}</p>
                <p className="text-[13px] text-[var(--text-high)] font-medium">{l(nextLesson.title, lang)}</p>
              </div>
              <ChevronRight size={16} className="text-[var(--text-low)] group-hover:text-accent-soft transition-colors" />
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  )
}
