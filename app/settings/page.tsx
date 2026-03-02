'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/main-layout'
import { NeonBorder } from '@/components/neon-border'
import { motion } from 'framer-motion'
import { generateWebhookToken, formatWebhookUrl } from '@/lib/webhook'
import { WebhookToken } from '@/lib/types'
import { Copy, RefreshCw, Eye, EyeOff } from 'lucide-react'

export default function SettingsPage() {
  const [webhookTokens, setWebhookTokens] = useState<WebhookToken[]>([])
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})
  const [copiedTokenId, setCopiedTokenId] = useState<string | null>(null)

  const generateNewToken = () => {
    const newToken = generateWebhookToken()
    setWebhookTokens([...webhookTokens, newToken])
  }

  const copyToClipboard = (text: string, tokenId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedTokenId(tokenId)
    setTimeout(() => setCopiedTokenId(null), 2000)
  }

  const toggleSecretVisibility = (tokenId: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [tokenId]: !prev[tokenId],
    }))
  }

  return (
    <MainLayout title="Settings & Configuration" subtitle="Manage webhooks, API tokens, and integrations">
      <div className="space-y-8 max-w-4xl">
        {/* Google Sheets */}
        <motion.div
          className="neon-border p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold text-cyan-400 mb-4">Google Sheets Integration</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 uppercase tracking-wider block mb-2">
                Sheets ID
              </label>
              <input
                type="text"
                placeholder="Enter your Google Sheets ID"
                className="w-full bg-slate-900 border border-slate-800 rounded-sm px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                defaultValue="1BxiMVs0XRA5nFMXT3PJrQ3j-Eza1xZs-BXsMU6Vj_2w"
              />
              <p className="text-xs text-slate-500 mt-1">
                The ID from your Google Sheets URL (between /d/ and /edit)
              </p>
            </div>
            <div>
              <label className="text-sm text-slate-400 uppercase tracking-wider block mb-2">
                API Key
              </label>
              <input
                type="password"
                placeholder="Enter your Google API key"
                className="w-full bg-slate-900 border border-slate-800 rounded-sm px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <motion.button
              className="px-4 py-2 bg-cyan-500 text-slate-950 rounded-sm font-semibold hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]"
              whileHover={{ scale: 1.05 }}
            >
              Test Connection
            </motion.button>
          </div>
        </motion.div>

        {/* WhatsApp */}
        <motion.div
          className="neon-border neon-border-magenta p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-bold text-pink-400 mb-4">WhatsApp Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 uppercase tracking-wider block mb-2">
                Business Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1234567890"
                className="w-full bg-slate-900 border border-slate-800 rounded-sm px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 uppercase tracking-wider block mb-2">
                Access Token
              </label>
              <input
                type="password"
                placeholder="Enter your WhatsApp Business API token"
                className="w-full bg-slate-900 border border-slate-800 rounded-sm px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>
            <motion.button
              className="px-4 py-2 bg-pink-500 text-slate-950 rounded-sm font-semibold hover:shadow-[0_0_15px_rgba(255,0,255,0.4)]"
              whileHover={{ scale: 1.05 }}
            >
              Test Connection
            </motion.button>
          </div>
        </motion.div>

        {/* Webhooks */}
        <motion.div
          className="neon-border neon-border-green p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-lime-400">Webhook Tokens</h2>
            <motion.button
              onClick={generateNewToken}
              className="flex items-center gap-2 px-4 py-2 border border-lime-500 text-lime-400 rounded-sm font-semibold hover:bg-lime-500/10 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <RefreshCw size={18} />
              Generate Token
            </motion.button>
          </div>

          {webhookTokens.length === 0 ? (
            <p className="text-slate-400 text-sm">No webhook tokens generated yet. Create one to get started.</p>
          ) : (
            <div className="space-y-4">
              {webhookTokens.map((token, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-900/50 border border-slate-800/50 rounded-sm p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Webhook URL</p>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          readOnly
                          value={formatWebhookUrl('https://darkstore.example.com', token.token)}
                          className="flex-1 bg-slate-950 border border-slate-700 rounded-sm px-3 py-1 text-xs text-slate-300 font-mono"
                        />
                        <motion.button
                          onClick={() =>
                            copyToClipboard(
                              formatWebhookUrl('https://darkstore.example.com', token.token),
                              `url-${index}`
                            )
                          }
                          className="p-2 rounded-sm border border-slate-700 hover:border-lime-500 text-slate-400 hover:text-lime-400 transition-colors"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Copy size={16} />
                        </motion.button>
                      </div>
                      {copiedTokenId === `url-${index}` && (
                        <p className="text-xs text-lime-400 mt-1">Copied!</p>
                      )}
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Secret</p>
                      <div className="flex gap-2 items-center">
                        <input
                          type={showSecrets[`secret-${index}`] ? 'text' : 'password'}
                          readOnly
                          value={token.secret}
                          className="flex-1 bg-slate-950 border border-slate-700 rounded-sm px-3 py-1 text-xs text-slate-300 font-mono"
                        />
                        <motion.button
                          onClick={() => toggleSecretVisibility(`secret-${index}`)}
                          className="p-2 rounded-sm border border-slate-700 hover:border-lime-500 text-slate-400 hover:text-lime-400 transition-colors"
                          whileHover={{ scale: 1.1 }}
                        >
                          {showSecrets[`secret-${index}`] ? <EyeOff size={16} /> : <Eye size={16} />}
                        </motion.button>
                        <motion.button
                          onClick={() => copyToClipboard(token.secret, `secret-${index}`)}
                          className="p-2 rounded-sm border border-slate-700 hover:border-lime-500 text-slate-400 hover:text-lime-400 transition-colors"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Copy size={16} />
                        </motion.button>
                      </div>
                      {copiedTokenId === `secret-${index}` && (
                        <p className="text-xs text-lime-400 mt-1">Copied!</p>
                      )}
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Expires At</p>
                      <p className="text-xs text-slate-300">
                        {new Date(token.expiresAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* System Info */}
        <motion.div
          className="neon-border p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-cyan-400 mb-4">System Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 p-3 rounded-sm border border-slate-800/50">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Version</p>
              <p className="text-lg font-bold text-slate-200">v1.0.0</p>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-sm border border-slate-800/50">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Environment</p>
              <p className="text-lg font-bold text-slate-200">Production</p>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-sm border border-slate-800/50">
              <p className="text-xs text-slate-500 uppercase tracking-wider">API Endpoint</p>
              <p className="text-xs font-bold text-slate-300 font-mono">/api/v1</p>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  )
}
