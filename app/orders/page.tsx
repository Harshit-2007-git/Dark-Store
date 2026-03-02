'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/main-layout'
import { NeonBorder } from '@/components/neon-border'
import { motion } from 'framer-motion'
import { getOrders } from '@/lib/mock-data'
import { useUser } from '@/lib/user-context'
import { Order } from '@/lib/types'
import { ShoppingCart, Filter, Download, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function OrdersPage() {
  const { user } = useUser()
  const router = useRouter()
  const [orders] = useState<Order[]>(getOrders())
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filter, setFilter] = useState<Order['status'] | 'all'>('all')

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  const isBuyer = user?.role === 'buyer'

  const filteredOrders = orders.filter(
    order => filter === 'all' || order.status === filter
  )

  const statusCounts = {
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'text-lime-400'
      case 'processing':
        return 'text-yellow-400'
      case 'pending':
        return 'text-cyan-400'
      case 'cancelled':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusBg = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-lime-500/10 border-lime-500/30'
      case 'processing':
        return 'bg-yellow-500/10 border-yellow-500/30'
      case 'pending':
        return 'bg-cyan-500/10 border-cyan-500/30'
      case 'cancelled':
        return 'bg-red-500/10 border-red-500/30'
      default:
        return 'bg-gray-500/10 border-gray-500/30'
    }
  }

  return (
    <MainLayout 
      title={isBuyer ? "My Orders" : "Order Management"} 
      subtitle={isBuyer ? "Track your purchases" : "Manage and fulfill all orders"}
    >
      <div className="space-y-6">
        {/* Action Buttons */}
        {isBuyer && (
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-slate-950 rounded-sm font-semibold hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={18} />
              Create New Order
            </motion.button>
          </motion.div>
        )}

        {/* Filter Buttons */}
        <motion.div
          className="flex gap-2 flex-wrap"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {(['all', 'pending', 'processing', 'completed', 'cancelled'] as const).map(status => (
            <motion.button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-sm font-semibold uppercase text-xs tracking-wider transition-all ${
                filter === status
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,255,255,0.4)]'
                  : 'border border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status === 'all'
                ? `All Orders (${orders.length})`
                : `${status} (${statusCounts[status]})`}
            </motion.button>
          ))}
        </motion.div>

        {/* Export Button */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <motion.button
            className="flex items-center gap-2 px-4 py-2 border border-slate-700 text-slate-400 rounded-sm font-semibold hover:border-slate-600 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <Download size={18} />
            Export
          </motion.button>
        </motion.div>

        {/* Orders Grid */}
        <motion.div
          className="grid gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <NeonBorder
                color="cyan"
                className="hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">{order.orderNumber}</h3>
                    <p className="text-sm text-slate-400">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <motion.span
                    className={`px-3 py-1 rounded-sm text-xs font-semibold border ${getStatusBg(
                      order.status
                    )} ${getStatusColor(order.status)}`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {order.status.toUpperCase()}
                  </motion.span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Customer</p>
                    <p className="font-semibold text-slate-200">{order.customer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Items</p>
                    <p className="font-semibold text-slate-200">{order.items.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total</p>
                    <p className="font-semibold text-cyan-400">${order.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Source</p>
                    <p className="font-semibold text-slate-200 uppercase text-xs">{order.source}</p>
                  </div>
                </div>
              </NeonBorder>
            </motion.div>
          ))}
        </motion.div>

        {/* Order Details */}
        {selectedOrder && (
          <motion.div
            className="neon-border neon-border-magenta p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="flex items-center justify-between mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center gap-3">
                <ShoppingCart size={24} className="text-pink-400" />
                <div>
                  <h3 className="text-xl font-bold text-pink-400">{selectedOrder.orderNumber}</h3>
                  <p className="text-sm text-slate-400">{selectedOrder.customer}</p>
                </div>
              </div>
              <motion.button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-200"
                whileHover={{ scale: 1.2 }}
              >
                ✕
              </motion.button>
            </motion.div>

            <div className="bg-slate-900/50 rounded-sm p-4 mb-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Items</p>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div>
                      <p className="font-semibold text-slate-200">{item.productName}</p>
                      <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-cyan-400">${(item.price * item.quantity).toFixed(2)}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-pink-900/50">
              <p className="text-lg font-bold text-slate-200">Total</p>
              <p className="text-2xl font-bold text-pink-400">${selectedOrder.total.toFixed(2)}</p>
            </div>

            <div className="mt-6 flex gap-3">
              <motion.button
                className="px-4 py-2 bg-pink-500 text-slate-950 rounded-sm font-semibold hover:shadow-[0_0_15px_rgba(255,0,255,0.4)]"
                whileHover={{ scale: 1.05 }}
              >
                Update Status
              </motion.button>
              <motion.button
                className="px-4 py-2 border border-pink-500 text-pink-400 rounded-sm font-semibold hover:bg-pink-500/10"
                whileHover={{ scale: 1.05 }}
              >
                Print
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </MainLayout>
  )
}
