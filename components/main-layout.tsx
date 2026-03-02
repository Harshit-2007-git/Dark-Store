'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from './sidebar'
import { ScanLine } from './scan-line'

interface MainLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
}

export function MainLayout({ children, title, subtitle }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="ml-64 flex-1 overflow-auto relative">
        <ScanLine />
        
        {/* Header */}
        {title && (
          <motion.div
            className="sticky top-0 z-40 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm neon-border border-l-0 border-r-0 border-t-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-6">
              <h1 className="text-3xl font-bold glow-cyan mb-2">{title}</h1>
              {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
            </div>
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          className="p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}
