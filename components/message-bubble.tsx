'use client'

import { motion } from 'framer-motion'
import { Message } from '@/lib/types'

interface MessageBubbleProps {
  message: Message
  index?: number
}

export function MessageBubble({ message, index = 0 }: MessageBubbleProps) {
  const isUser = message.sender === 'user'

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-sm ${
          isUser
            ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-100'
            : 'bg-slate-800/50 border border-slate-700/50 text-slate-200'
        }`}
      >
        <p className="text-sm break-words">{message.content}</p>
        <p className="text-xs text-slate-400 mt-1 opacity-75">
          {new Date(message.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </motion.div>
  )
}
