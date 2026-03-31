import { motion } from 'framer-motion'

export default function Section({ children, className = '', delay = 0, id }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
