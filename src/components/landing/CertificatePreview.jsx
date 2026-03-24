import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import Section from './Section'
import useLang from '../../hooks/useLang'

export default function CertificatePreview() {
  const { t } = useLang()

  return (
    <Section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }} className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-[var(--surface-1)]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/4 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

          <div className="relative p-12 md:p-16 text-center">
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity }}>
              <Award size={40} className="mx-auto mb-6 text-[var(--text-low)]" />
            </motion.div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-low)] mb-4">Certificate of Completion</p>
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-high)] mb-3">{t('landing.certTitle')}</h3>
            <p className="text-[14px] text-[var(--text-mid)] max-w-md mx-auto leading-relaxed font-light">
              {t('landing.certDesc').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
            </p>
            <div className="mt-8 flex items-center justify-center gap-6 text-[12px] text-[var(--text-low)]">
              <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-accent/40" />{t('certprev.solana')}</span>
              <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-accent/40" />{t('certprev.permanent')}</span>
              <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-accent/40" />{t('certprev.linkedin')}</span>
            </div>
          </div>
          <div className="absolute inset-0 rounded-3xl border border-[var(--border)] pointer-events-none" />
        </motion.div>
      </div>
    </Section>
  )
}
