'use client'

import { MainLayout } from '@/components/main-layout'
import { StatsCard } from '@/components/stats-card'
import { BentoGrid, BentoGridItem } from '@/components/bento-grid'
import { motion } from 'framer-motion'
import { getDashboardStats, getProducts, getOrders, getConversations } from '@/lib/mock-data'
import { useUser } from '@/lib/user-context'
import {
  Package,
  ShoppingCart,
  MessageSquare,
  TrendingUp,
  Activity,
  Clock,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  if (!user) {
    return (
      <MainLayout title="Loading" subtitle="Redirecting...">
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full"
          />
        </div>
      </MainLayout>
    )
  }

  const stats = getDashboardStats()
  const orders = getOrders()
  const conversations = getConversations()

  const recentOrders = orders.slice(0, 3)
  const recentConversations = conversations.slice(0, 3)
  const isBuyer = user.role === 'buyer'

  return (
    <MainLayout 
      title={isBuyer ? "Buyer Dashboard" : "Seller Dashboard"} 
      subtitle={isBuyer ? "Browse and purchase inventory" : "Real-time dark store operations"}
    >
      <div className="space-y-8">
        {/* Bento Grid Stats */}
        <BentoGrid className="auto-rows-max">
          <BentoGridItem span="small" delay={0} color="cyan">
            <StatsCard
              label="Products"
              value={stats.totalProducts}
              icon={<Package />}
              color="cyan"
            />
          </BentoGridItem>
          <BentoGridItem span="small" delay={0.1} color="magenta">
            <StatsCard
              label={isBuyer ? "Cart Items" : "Orders"}
              value={isBuyer ? stats.totalProducts : stats.totalOrders}
              icon={<ShoppingCart />}
              color="magenta"
            />
          </BentoGridItem>
          <BentoGridItem span="small" delay={0.2} color="green">
            <StatsCard
              label="Active Conversations"
              value={stats.activeConversations}
              icon={<MessageSquare />}
              color="green"
            />
          </BentoGridItem>
          <BentoGridItem span="small" delay={0.3} color="cyan">
            <StatsCard
              label={isBuyer ? "Total Spent" : "Total Revenue"}
              value={`$${stats.revenue}`}
              icon={<TrendingUp />}
              color="cyan"
            />
          </BentoGridItem>

          {!isBuyer && (
            <>
              <BentoGridItem span="small" delay={0.4} color="magenta">
                <StatsCard
                  label="Inventory Value"
                  value={`$${stats.inventoryValue}`}
                  icon={<Activity />}
                  color="magenta"
                />
              </BentoGridItem>
              <BentoGridItem span="small" delay={0.5} color="green">
                <StatsCard
                  label="Last Sync"
                  value={new Date(stats.lastSync).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                  icon={<Clock />}
                  color="green"
                />
              </BentoGridItem>
            </>
          )}
        </BentoGrid>

        {/* Recent Orders */}
        <motion.div
          className="neon-border p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <ShoppingCart size={24} />
            Recent Orders
          </h2>
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                className="flex items-center justify-between p-3 bg-slate-900/50 rounded-sm border border-slate-800/50 hover:border-cyan-500/30 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex-1">
                  <p className="font-semibold text-slate-100">{order.orderNumber}</p>
                  <p className="text-sm text-slate-400">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-cyan-400">${order.total.toFixed(2)}</p>
                  <motion.span
                    className={`text-xs px-2 py-1 rounded-sm inline-block ${
                      order.status === 'completed'
                        ? 'bg-lime-500/10 text-lime-400'
                        : order.status === 'processing'
                          ? 'bg-yellow-500/10 text-yellow-400'
                          : 'bg-slate-700/50 text-slate-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {order.status}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Active Conversations */}
        <motion.div
          className="neon-border neon-border-magenta p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2">
            <MessageSquare size={24} />
            Active Conversations
          </h2>
          <div className="space-y-3">
            {recentConversations.map((conv, index) => (
              <motion.div
                key={conv.id}
                className="flex items-center justify-between p-3 bg-slate-900/50 rounded-sm border border-slate-800/50 hover:border-pink-500/30 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <div className="flex-1">
                  <p className="font-semibold text-slate-100">{conv.contactName}</p>
                  <p className="text-sm text-slate-400 truncate">{conv.lastMessage}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">
                    {new Date(conv.lastMessageTime).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  {conv.unreadCount > 0 && (
                    <motion.span
                      className="text-xs px-2 py-1 bg-pink-500 text-slate-950 rounded-sm inline-block font-bold mt-1"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      {conv.unreadCount} new
                    </motion.span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  )
}
