'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StatsCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  color?: 'cyan' | 'magenta' | 'green'
  className?: string
}

const borderColors = {
  cyan: 'border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.2)]',
  magenta: 'border-pink-500 shadow-[0_0_15px_rgba(255,0,255,0.2)]',
  green: 'border-lime-500 shadow-[0_0_15px_rgba(0,255,100,0.2)]',
}

const textColors = {
  cyan: 'text-cyan-400',
  magenta: 'text-pink-400',
  green: 'text-lime-400',
}

export function StatsCard({
  label,
  value,
  icon,
  color = 'cyan',
  className = '',
}: StatsCardProps) {
  return (
    <motion.div
      className={`border ${borderColors[color]} bg-slate-950/50 backdrop-blur-sm p-6 rounded-sm ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm mb-2">{label}</p>
          <p className={`text-3xl font-bold ${textColors[color]}`}>{value}</p>
        </div>
        {icon && <div className={`text-4xl ${textColors[color]}`}>{icon}</div>}
      </div>
    </motion.div>
  )
}
