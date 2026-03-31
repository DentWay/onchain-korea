import { useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Share2 } from 'lucide-react'
import Section from './Section'
import useLang from '../../hooks/useLang'

export default function CertificatePreview() {
  const { t, lang } = useLang()
  const [name, setName] = useState('')
  const displayName = name || t('certprev.placeholder')

  const trustBadges = [
    { label: t('certprev.solana') },
    { label: t('certprev.permanent') },
    { label: t('certprev.linkedin') },
  ]

  return (
    <Section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left -- text + trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="ok-section-label">Certificate</span>
            <h2 className="text-[32px] md:text-[40px] font-bold mt-4 tracking-tight leading-[1.1] text-[var(--text-high)]">
              {t('landing.certTitle')}
            </h2>
            <p className="text-[14px] text-[var(--text-mid)] mt-4 leading-relaxed max-w-md">
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
              {trustBadges.map((badge, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                  {badge.label}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right -- Certificate mockup card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="ok-card relative rounded-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-[80px]" />

              <div className="relative p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">OK</span>
                    </div>
                    <span className="text-[12px] font-semibold text-[var(--text-mid)]">Onchain Korea</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-low)] font-mono">Semester 1 + 2</span>
                </div>

                <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-low)] mb-3">{t('cert.certificateOfCompletion')}</p>
                <p className="text-[24px] md:text-[28px] font-bold text-[var(--text-high)] mb-2 transition-all leading-tight">{displayName}</p>
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
            </div>
            <p className="text-[11px] text-[var(--text-low)] mt-3 text-center italic">{t('cert.disclaimer')}</p>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
