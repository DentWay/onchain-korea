import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Linkedin, Share2 } from 'lucide-react'
import Section from './Section'
import useLang from '../../hooks/useLang'

export default function CertificatePreview() {
  const { t, lang } = useLang()
  const [name, setName] = useState('')
  const displayName = name || t('certprev.placeholder')

  return (
    <Section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-high)]">{t('landing.certTitle')}</h2>
          <p className="text-[14px] text-[var(--text-mid)] mt-3 max-w-md mx-auto font-light leading-relaxed">
            {t('landing.certDesc').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
          </p>
        </motion.div>

        {/* Interactive name input */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center mb-6">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={t('certprev.inputPlaceholder')}
            className="w-full max-w-sm px-4 py-2.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-[13px] text-[var(--text-high)] placeholder:text-[var(--text-low)] focus:outline-none focus:border-accent/40 transition-colors text-center"
          />
        </motion.div>

        {/* Certificate card */}
        <motion.div whileHover={{ scale: 1.005 }} transition={{ type: 'spring', stiffness: 300 }} className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-[var(--surface-1)]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/4 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

          <div className="relative p-10 md:p-14">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">OK</span>
                </div>
                <span className="text-[12px] font-semibold text-[var(--text-mid)]">Onchain Korea</span>
              </div>
              <span className="text-[10px] text-[var(--text-low)] font-mono">Semester 3 · 2026</span>
            </div>

            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-low)] mb-3">Certificate of Completion</p>
            <p className="text-3xl md:text-4xl font-bold text-[var(--text-high)] mb-2 transition-all">{displayName}</p>
            <p className="text-[13px] text-[var(--text-mid)] mb-8 font-light">
              {t('certprev.completionText')}
            </p>

            <div className="flex items-center gap-8 text-[11px] text-[var(--text-low)]">
              <div>
                <p className="text-[9px] uppercase tracking-wider mb-0.5">{t('certprev.curriculum')}</p>
                <p className="text-[var(--text-mid)] font-medium">Greed Academy</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider mb-0.5">{t('certprev.verified')}</p>
                <p className="text-[var(--text-mid)] font-medium">Solana Blockchain</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider mb-0.5">{t('certprev.actions')}</p>
                <p className="text-[var(--text-mid)] font-medium">10 On-chain</p>
              </div>
            </div>

            {/* Share mockup */}
            <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center gap-3">
              <span className="text-[10px] text-[var(--text-low)]">{t('certprev.share')}</span>
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-[var(--surface-2)] flex items-center justify-center"><Linkedin size={13} className="text-[var(--text-low)]" /></div>
                <div className="w-7 h-7 rounded-full bg-[var(--surface-2)] flex items-center justify-center"><Share2 size={13} className="text-[var(--text-low)]" /></div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-3xl border border-[var(--border)] pointer-events-none" />
        </motion.div>

        {/* Trust badges */}
        <div className="mt-6 flex items-center justify-center gap-6 text-[12px] text-[var(--text-low)]">
          <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-accent/40" />{t('certprev.solana')}</span>
          <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-accent/40" />{t('certprev.permanent')}</span>
          <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-accent/40" />{t('certprev.linkedin')}</span>
        </div>
      </div>
    </Section>
  )
}
