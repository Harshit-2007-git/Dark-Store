'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlitchTextProps {
  children: ReactNode
  className?: string
  animated?: boolean
}

export function GlitchText({ children, className = '', animated = true }: GlitchTextProps) {
  return (
    <motion.div
      className={`relative inline-block ${animated ? 'animate-glitch' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="glow-cyan font-bold">{children}</span>
    </motion.div>
  )
}
