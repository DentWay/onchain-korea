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
    <Section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left — Big text + trust badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="ok-section-label">Certificate</span>
            <h2 className="text-[40px] md:text-[56px] font-bold mt-4 tracking-tight leading-[1.08] text-[var(--text-high)]">
              {t('landing.certTitle')}
            </h2>
            <p className="text-[15px] md:text-[17px] text-[var(--text-mid)] mt-5 leading-relaxed font-light max-w-md">
              {t('landing.certDesc').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
            </p>

            {/* Interactive name input */}
            <div className="mt-8">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={t('certprev.inputPlaceholder')}
                className="w-full max-w-sm px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-[14px] text-[var(--text-high)] placeholder:text-[var(--text-low)] focus:outline-none focus:border-accent/40 transition-colors"
              />
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center gap-5 text-[13px] text-[var(--text-low)]">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent/50" />{t('certprev.solana')}</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent/50" />{t('certprev.permanent')}</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent/50" />{t('certprev.linkedin')}</span>
            </div>
          </motion.div>

          {/* Right — Certificate mockup card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }} className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-[var(--surface-1)]" />
              <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />
              <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

              <div className="relative p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">OK</span>
                    </div>
                    <span className="text-[12px] font-semibold text-[var(--text-mid)]">Onchain Korea</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-low)] font-mono">Semester 3</span>
                </div>

                <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-low)] mb-3">Certificate of Completion</p>
                <p className="text-[28px] md:text-[32px] font-bold text-[var(--text-high)] mb-2 transition-all leading-tight">{displayName}</p>
                <p className="text-[13px] text-[var(--text-mid)] mb-8 font-light">
                  {t('certprev.completionText')}
                </p>

                <div className="flex items-center gap-6 text-[11px] text-[var(--text-low)]">
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

                <div className="mt-6 pt-5 border-t border-[var(--border)] flex items-center gap-3">
                  <span className="text-[10px] text-[var(--text-low)]">{t('certprev.share')}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full bg-[var(--surface-2)] flex items-center justify-center"><Linkedin size={13} className="text-[var(--text-low)]" /></div>
                    <div className="w-7 h-7 rounded-full bg-[var(--surface-2)] flex items-center justify-center"><Share2 size={13} className="text-[var(--text-low)]" /></div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-3xl border border-[var(--border)] pointer-events-none" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
