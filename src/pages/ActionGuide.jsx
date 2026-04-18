import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, ExternalLink, Check, Wallet, Download, KeyRound, Search, FileText, ArrowLeftRight, Paintbrush, Banknote, GitBranch, Landmark } from 'lucide-react'
import { actionGuides, l } from '../data/curriculum'
import useProgress from '../hooks/useProgress'
import useLang from '../hooks/useLang'

const iconMap = {
  wallet: Wallet, download: Download, key: KeyRound, search: Search,
  'file-text': FileText, 'arrow-left-right': ArrowLeftRight,
  paintbrush: Paintbrush, banknote: Banknote, 'git-branch': GitBranch, landmark: Landmark,
}

export default function ActionGuide() {
  const { actionId } = useParams()
  const guide = actionGuides.find(g => g.id === actionId)
  const nextGuide = guide && actionGuides.find(g => g.id !== guide.id && g.weekId === guide.weekId)
  const { toggleAction, getActionStatus, isActionsUnlocked } = useProgress()
  const { t, lang } = useLang()

  if (!guide) return <Navigate to="/dashboard" replace />
  if (!isActionsUnlocked(guide.weekId)) return <Navigate to={`/week/${guide.weekId}`} replace />

  const actionDone = guide.actionId ? getActionStatus(guide.actionId) === 'done' : false
  const handleComplete = () => { if (guide.actionId) toggleAction(guide.actionId) }
  const tips = Array.isArray(guide.safetyTips) ? guide.safetyTips : (guide.safetyTips[lang] || guide.safetyTips.ko)

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg font-semibold text-[var(--app-ink-high)]">{t('action.practice')}: {l(guide.title, lang)}</h1>
          <Link to={`/week/${guide.weekId}`} className="text-[11px] text-[#5741d8] flex items-center gap-1 hover:text-[#7132f5] transition-colors"><ArrowLeft size={12} /> {t('common.week')} {guide.weekId}</Link>
        </div>

        <div className="bg-[var(--app-paper-bg)] border border-[var(--app-paper-border)] rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            {(() => { const Icon = iconMap[guide.icon]; return <div className="w-10 h-10 rounded-lg bg-[rgba(87,65,216,0.08)] flex items-center justify-center">{Icon ? <Icon size={20} className="text-[#5741d8]" /> : null}</div> })()}
            <div>
              <p className="text-[14px] font-semibold text-[var(--app-ink-high)]">{l(guide.title, lang)}</p>
              <p className="text-[11px] text-[var(--app-ink-mid)]">{l(guide.subtitle, lang)}</p>
            </div>
          </div>
          <p className="text-[12px] text-[var(--app-ink-mid)] leading-relaxed mb-5">{l(guide.description, lang)}</p>

          <div className="relative space-y-0">
            <div className="absolute left-[9px] top-3 bottom-3 w-px bg-[var(--app-divider)]" />
            {guide.steps.map((step, i) => (
              <div key={i} className="relative flex gap-3 py-2.5">
                <div className="w-5 h-5 rounded-full bg-[rgba(87,65,216,0.10)] border border-[rgba(87,65,216,0.25)] flex items-center justify-center text-[10px] text-[#5741d8] font-semibold shrink-0 mt-0.5 z-10">{i + 1}</div>
                <div className="text-[12px] text-[var(--app-ink-mid)] leading-relaxed">
                  {step.link ? (
                    <><a href={step.link} target="_blank" rel="noopener noreferrer" className="text-[#5741d8] font-medium hover:text-[#7132f5] inline-flex items-center gap-0.5 transition-colors">{step.link.replace('https://', '')} <ExternalLink size={10} /></a> {l(step.text, lang)}</>
                  ) : <span>{l(step.text, lang)}</span>}
                  {step.note && <p className="text-[10px] text-[var(--app-ink-low)] mt-0.5">{l(step.note, lang)}</p>}
                </div>
              </div>
            ))}
          </div>

          <button onClick={handleComplete} className={`mt-5 inline-flex items-center justify-center gap-2 font-semibold text-[12px] transition-colors ${actionDone ? 'rounded-[12px] bg-[var(--app-light-btn-bg)] border border-[rgba(20,158,97,0.20)] text-[var(--success)] px-4 py-2.5' : 'rounded-[56px] bg-[#5741d8] text-white hover:bg-[#7132f5] px-4 py-2.5'}`}>
            {actionDone ? <><Check size={14} /> {t('action.completed')}</> : <>✓ {l(guide.title, lang)} {t('action.complete')}</>}
          </button>
        </div>

        {nextGuide && (
          <Link to={`/action/${nextGuide.id}`} className="block bg-[var(--app-paper-bg)] border border-[var(--app-paper-border)] rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-4">
            <div className="flex items-center gap-3">
              {(() => { const Icon = iconMap[nextGuide.icon]; return <div className="w-10 h-10 rounded-lg bg-[var(--app-light-btn-bg)] flex items-center justify-center">{Icon ? <Icon size={20} className="text-[var(--app-ink-low)]" /> : null}</div> })()}
              <div>
                <p className="text-[13px] font-medium text-[var(--app-ink-high)]">{t('action.next')}: {l(nextGuide.title, lang)}</p>
                <p className="text-[11px] text-[var(--app-ink-low)]">{t('action.nextStart')}</p>
              </div>
            </div>
          </Link>
        )}

        {/* Safety — only place where warning amber is allowed */}
        <div className="bg-[var(--app-paper-muted-bg)] border border-[var(--app-paper-border)] rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-4 mt-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Shield size={14} className="text-[#dd5b00]" />
            <p className="text-[12px] font-medium text-[#dd5b00]">{t('action.safety')}</p>
          </div>
          <ul className="space-y-1">
            {tips.map((tip, i) => <li key={i} className="text-[11px] text-[var(--app-ink-mid)] leading-relaxed">• {tip}</li>)}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
