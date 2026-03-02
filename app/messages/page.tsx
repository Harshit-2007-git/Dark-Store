'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/main-layout'
import { MessageBubble } from '@/components/message-bubble'
import { NeonBorder } from '@/components/neon-border'
import { motion } from 'framer-motion'
import { getConversations, getConversation } from '@/lib/mock-data'
import { Conversation, Message } from '@/lib/types'
import { Send, Phone, Info } from 'lucide-react'

export default function MessagesPage() {
  const [conversations] = useState<Conversation[]>(getConversations())
  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0]?.id)
  const [messageInput, setMessageInput] = useState('')
  
  const selectedConv = getConversation(selectedConvId)

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConv) {
      const newMessage: Message = {
        id: `${selectedConv.id}-${Date.now()}`,
        conversationId: selectedConv.id,
        sender: 'bot',
        content: messageInput,
        timestamp: new Date().toISOString(),
        status: 'sent',
      }
      // In a real app, this would be sent to the server
      console.log('Message sent:', newMessage)
      setMessageInput('')
    }
  }

  return (
    <MainLayout title="WhatsApp Messages" subtitle="Manage conversations and customer interactions">
      <div className="flex gap-6 h-[calc(100vh-180px)]">
        {/* Conversations List */}
        <motion.div
          className="w-80 overflow-y-auto space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="text-xs text-slate-500 uppercase tracking-wider px-4 py-2 font-semibold">
            Conversations ({conversations.length})
          </p>
          {conversations.map((conv, index) => (
            <motion.div
              key={conv.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.button
                onClick={() => setSelectedConvId(conv.id)}
                className={`w-full text-left p-4 rounded-sm transition-all ${
                  selectedConvId === conv.id
                    ? 'bg-cyan-500/20 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,255,255,0.2)]'
                    : 'bg-slate-900/50 border border-slate-800/50 hover:border-slate-700/50'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-100">{conv.contactName}</h3>
                  {conv.unreadCount > 0 && (
                    <motion.span
                      className="w-5 h-5 bg-pink-500 text-slate-950 rounded-full flex items-center justify-center text-xs font-bold"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      {conv.unreadCount}
                    </motion.span>
                  )}
                </div>
                <p className="text-xs text-slate-400 truncate">{conv.lastMessage}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(conv.lastMessageTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Chat Area */}
        {selectedConv && (
          <motion.div
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={selectedConvId}
          >
            {/* Chat Header */}
            <motion.div
              className="neon-border neon-border-magenta mb-4 p-4 flex items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <h2 className="text-lg font-bold text-pink-400">{selectedConv.contactName}</h2>
                <p className="text-xs text-slate-400 font-mono">{selectedConv.phoneNumber}</p>
              </div>
              <div className="flex gap-2">
                <motion.button
                  className="p-2 rounded-sm border border-slate-700 hover:border-pink-500 text-slate-400 hover:text-pink-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Phone size={18} />
                </motion.button>
                <motion.button
                  className="p-2 rounded-sm border border-slate-700 hover:border-pink-500 text-slate-400 hover:text-pink-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Info size={18} />
                </motion.button>
              </div>
            </motion.div>

            {/* Messages */}
            <motion.div
              className="flex-1 overflow-y-auto p-4 space-y-2 neon-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {selectedConv.messages.map((msg, index) => (
                <MessageBubble key={msg.id} message={msg} index={index} />
              ))}
            </motion.div>

            {/* Message Input */}
            <motion.div
              className="mt-4 flex gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    handleSendMessage()
                  }
                }}
                placeholder="Type a message..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-sm px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <motion.button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="px-4 py-2 bg-cyan-500 text-slate-950 rounded-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={18} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </MainLayout>
  )
}
