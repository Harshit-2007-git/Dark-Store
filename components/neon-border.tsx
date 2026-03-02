'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface NeonBorderProps {
  children: ReactNode
  color?: 'cyan' | 'magenta' | 'green'
  className?: string
  hoverGlow?: boolean
}

const colorClasses = {
  cyan: 'neon-border',
  magenta: 'neon-border-magenta',
  green: 'neon-border-green',
}

const glowClasses = {
  cyan: 'hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]',
  magenta: 'hover:shadow-[0_0_20px_rgba(255,0,255,0.5)]',
  green: 'hover:shadow-[0_0_20px_rgba(0,255,100,0.5)]',
}

export function NeonBorder({
  children,
  color = 'cyan',
  className = '',
  hoverGlow = true,
}: NeonBorderProps) {
  return (
    <motion.div
      className={`${colorClasses[color]} p-4 rounded-sm transition-all duration-300 ${
        hoverGlow ? glowClasses[color] : ''
      } ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
