import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, CheckCircle, Circle, Award, Share2 } from 'lucide-react'
import useProgress from '../hooks/useProgress'
import useLang from '../hooks/useLang'

export default function Certificate() {
  const { certificateStatus } = useProgress()
  const { t, lang } = useLang()
  const { eligible, lessonsComplete, lessonsRequired, lessonsEligible, actionsComplete, actionsRequired, actionsEligible, hiddenTopicsRead, hiddenTopicsRequired, hiddenTopicsEligible } = certificateStatus

  const requirements = [
    { text: t('cert.lessons80'), current: lessonsComplete, total: lessonsRequired, done: lessonsEligible },
    { text: `${actionsRequired}${t('cert.actions3')}`, current: actionsComplete, total: actionsRequired, done: actionsEligible },
    { text: `${hiddenTopicsRequired}${t('cert.hidden2')}`, current: hiddenTopicsRead, total: hiddenTopicsRequired, done: hiddenTopicsEligible },
  ]

  const shareText = encodeURIComponent(lang === 'ko' ? 'Onchain Korea 4주 블록체인 교육 수료! 온체인 인증 완료.' : 'Completed Onchain Korea 4-week blockchain program! On-chain verified.')

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg font-semibold text-[var(--text-high)]">{t('cert.title')}</h1>
          <Link to="/dashboard" className="text-[11px] text-accent-soft flex items-center gap-1 hover:text-accent transition-colors"><ArrowLeft size={12} /> {t('week.back')}</Link>
        </div>

        {eligible ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }} className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[var(--success-surface)] flex items-center justify-center mx-auto mb-4"><Award size={32} className="text-success" /></div>
            <p className="text-[17px] font-semibold text-[var(--text-high)]">{t('cert.congrats')}</p>
            <p className="text-[12px] text-[var(--text-mid)] mt-1">{t('cert.allDone')}</p>
          </motion.div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[var(--surface-2)] flex items-center justify-center mx-auto mb-4"><Lock size={28} className="text-[var(--text-low)]" /></div>
            <p className="text-[15px] font-medium text-[var(--text-high)]">{t('cert.notYet')}</p>
            <p className="text-[12px] text-[var(--text-mid)] mt-1">{t('cert.notYetDesc')}</p>
          </div>
        )}

        <p className="text-[12px] text-[var(--text-mid)] mb-2">{t('cert.requirements')}</p>
        <div className="ok-card overflow-hidden mb-6">
          {requirements.map((req, i) => (
            <div key={i} className={`flex items-center gap-2.5 px-4 py-3 text-[12px] ${i < requirements.length - 1 ? 'border-b border-[var(--border)]' : ''}`}>
              {req.done ? <CheckCircle size={16} className="text-success shrink-0" /> : req.current > 0 ? <div className="w-4 h-4 rounded-full border-2 border-accent shrink-0" /> : <Circle size={16} className="text-[var(--text-low)] shrink-0" />}
              <span className="flex-1 text-[var(--text-mid)]">{req.text}</span>
              <span className={`ok-tabular-nums text-[10px] ${req.done ? 'text-success' : 'text-[var(--text-low)]'}`}>{req.current}/{req.total}</span>
            </div>
          ))}
        </div>

        <p className="text-[12px] text-[var(--text-mid)] mb-2">{eligible ? t('cert.issued') : t('cert.preview')}</p>
        <div className={`ok-card overflow-hidden ${!eligible ? 'opacity-40' : ''}`}>
          <div className="bg-[var(--surface-1)] p-8 text-center">
            <p className="text-[9px] uppercase tracking-[3px] text-[var(--text-low)]">Certificate of completion</p>
            <p className="text-2xl font-semibold mt-2 tracking-tight text-[var(--text-high)]">Onchain Korea</p>
            <p className="text-[12px] text-[var(--text-mid)] mt-1">Blockchain Literacy & Safety Program</p>
            <div className="border-t border-[var(--border)] mt-5 pt-5">
              <p className="text-[11px] text-[var(--text-low)]">has successfully completed the 4-week program</p>
            </div>
            <div className={`inline-block mt-4 px-4 py-1.5 border rounded-full text-[11px] ${eligible ? 'border-success/50 text-success' : 'border-[var(--border)] text-[var(--text-low)]'}`}>
              {eligible ? '✅ On-chain verified' : '🔗 On-chain verified'}
            </div>
            <p className="text-[9px] text-[var(--text-low)] mt-4">Powered by Greed Academy × Elixi Venture Studio Group</p>
          </div>
        </div>

        {eligible && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex items-center justify-center gap-3 mt-5">
            <span className="text-[11px] text-[var(--text-low)] flex items-center gap-1"><Share2 size={12} /> {lang === 'ko' ? '공유하기' : 'Share'}</span>
            <a href={`https://twitter.com/intent/tweet?text=${shareText}`} target="_blank" rel="noopener noreferrer" className="ok-btn ok-btn-ghost text-[11px] px-3 py-1.5">Twitter / X</a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?text=${shareText}`} target="_blank" rel="noopener noreferrer" className="ok-btn ok-btn-ghost text-[11px] px-3 py-1.5">LinkedIn</a>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
