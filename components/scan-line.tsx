'use client'

import { motion } from 'framer-motion'

interface ScanLineProps {
  color?: string
  height?: number
}

export function ScanLine({ color = 'rgba(0,255,255,0.1)', height = 2 }: ScanLineProps) {
  return (
    <motion.div
      className="absolute left-0 right-0 pointer-events-none"
      style={{
        height: `${height}px`,
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`,
      }}
      animate={{
        top: ['0%', '100%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}
