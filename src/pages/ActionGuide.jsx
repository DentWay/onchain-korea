import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, ExternalLink, Check } from 'lucide-react'
import { actionGuides, l } from '../data/curriculum'
import useProgress from '../hooks/useProgress'
import useLang from '../hooks/useLang'

export default function ActionGuide() {
  const { actionId } = useParams()
  const guide = actionGuides.find(g => g.id === actionId)
  const nextGuide = guide && actionGuides.find(g => g.id !== guide.id && g.weekId === guide.weekId)
  const { toggleAction, getActionStatus } = useProgress()
  const { t, lang } = useLang()

  if (!guide) return <Navigate to="/dashboard" replace />

  const actionDone = guide.actionId ? getActionStatus(guide.actionId) === 'done' : false
  const handleComplete = () => { if (guide.actionId) toggleAction(guide.actionId) }
  const tips = Array.isArray(guide.safetyTips) ? guide.safetyTips : (guide.safetyTips[lang] || guide.safetyTips.ko)

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg font-semibold text-[var(--text-high)]">{t('action.practice')}: {l(guide.title, lang)}</h1>
          <Link to={`/week/${guide.weekId}`} className="text-[11px] text-accent-soft flex items-center gap-1 hover:text-accent transition-colors"><ArrowLeft size={12} /> Week {guide.weekId}</Link>
        </div>

        <div className="ok-card p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-surface)] flex items-center justify-center text-lg">{guide.icon}</div>
            <div>
              <p className="text-[14px] font-semibold text-[var(--text-high)]">{l(guide.title, lang)}</p>
              <p className="text-[11px] text-[var(--text-mid)]">{l(guide.subtitle, lang)}</p>
            </div>
          </div>
          <p className="text-[12px] text-[var(--text-mid)] leading-relaxed mb-5">{l(guide.description, lang)}</p>

          <div className="relative space-y-0">
            <div className="absolute left-[9px] top-3 bottom-3 w-px bg-[var(--border)]" />
            {guide.steps.map((step, i) => (
              <div key={i} className="relative flex gap-3 py-2.5">
                <div className="w-5 h-5 rounded-full bg-[var(--accent-surface)] border border-accent/30 flex items-center justify-center text-[10px] text-accent-soft font-semibold shrink-0 mt-0.5 z-10">{i + 1}</div>
                <div className="text-[12px] text-[var(--text-mid)] leading-relaxed">
                  {step.link ? (
                    <><a href={step.link} target="_blank" rel="noopener noreferrer" className="text-accent-soft font-medium hover:text-accent inline-flex items-center gap-0.5 transition-colors">{step.link.replace('https://', '')} <ExternalLink size={10} /></a> {l(step.text, lang)}</>
                  ) : <span>{l(step.text, lang)}</span>}
                  {step.note && <p className="text-[10px] text-[var(--text-low)] mt-0.5">{l(step.note, lang)}</p>}
                </div>
              </div>
            ))}
          </div>

          <button onClick={handleComplete} className={`mt-5 ok-btn text-[12px] ${actionDone ? 'ok-btn-ghost border-success/20 text-success' : 'ok-btn-primary'}`}>
            {actionDone ? <><Check size={14} /> {t('action.completed')}</> : <>✓ {l(guide.title, lang)} {t('action.complete')}</>}
          </button>
        </div>

        {nextGuide && (
          <Link to={`/action/${nextGuide.id}`} className="block ok-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] flex items-center justify-center text-lg">{nextGuide.icon}</div>
              <div>
                <p className="text-[13px] font-medium text-[var(--text-high)]">{t('action.next')}: {l(nextGuide.title, lang)}</p>
                <p className="text-[11px] text-[var(--text-low)]">{t('action.nextStart')}</p>
              </div>
            </div>
          </Link>
        )}

        {/* Safety — only place where warning amber is allowed (§8.5) */}
        <div className="ok-card p-4 mt-4 border-[var(--warning)]/15">
          <div className="flex items-center gap-1.5 mb-2">
            <Shield size={14} className="text-[var(--warning)]" />
            <p className="text-[12px] font-medium text-[var(--warning)]">{t('action.safety')}</p>
          </div>
          <ul className="space-y-1">
            {tips.map((tip, i) => <li key={i} className="text-[11px] text-[var(--text-mid)] leading-relaxed">• {tip}</li>)}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
