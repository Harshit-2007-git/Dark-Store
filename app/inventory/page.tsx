'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/main-layout'
import { ProductTable } from '@/components/product-table'
import { BentoGrid, BentoGridItem } from '@/components/bento-grid'
import { motion } from 'framer-motion'
import { getProducts } from '@/lib/mock-data'
import { useUser } from '@/lib/user-context'
import { Product } from '@/lib/types'
import { RefreshCw, Plus, Cloud } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function InventoryPage() {
  const { user } = useUser()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>(getProducts())
  const [syncing, setSyncing] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  const isSeller = user?.role === 'seller'

  const inStock = products.filter(p => p.status === 'in-stock').length
  const lowStock = products.filter(p => p.status === 'low-stock').length
  const outOfStock = products.filter(p => p.status === 'out-of-stock').length

  const handleSync = async () => {
    setSyncing(true)
    // Simulate sync delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSyncing(false)
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
  }

  return (
    <MainLayout 
      title={isSeller ? "Inventory Management" : "Browse Inventory"} 
      subtitle={isSeller ? "Manage your dark store products and stock levels" : "View available products"}
    >
      <div className="space-y-8">
        {/* Top Actions - Only for Sellers */}
        {isSeller && (
          <motion.div
            className="flex gap-4 items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-slate-950 rounded-sm font-semibold hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div animate={syncing ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 1, repeat: syncing ? Infinity : 0 }}>
                <RefreshCw size={18} />
              </motion.div>
              {syncing ? 'Syncing...' : 'Sync with Sheets'}
            </motion.button>

            <motion.button
              className="flex items-center gap-2 px-4 py-2 border border-cyan-500 text-cyan-400 rounded-sm font-semibold hover:bg-cyan-500/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={18} />
              Add Product
            </motion.button>

            <motion.button
              className="flex items-center gap-2 px-4 py-2 border border-slate-700 text-slate-400 rounded-sm font-semibold hover:border-slate-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Cloud size={18} />
              Cloud Sync
            </motion.button>
          </motion.div>
        )}

        {/* Stock Status Cards in Bento Grid */}
        <BentoGrid>
          <BentoGridItem span="small" delay={0} color="green">
            <div className="text-center">
              <p className="text-3xl font-bold text-lime-400">{inStock}</p>
              <p className="text-sm text-slate-400 mt-2">In Stock</p>
            </div>
          </BentoGridItem>
          <BentoGridItem span="small" delay={0.1} color="cyan">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-400">{lowStock}</p>
              <p className="text-sm text-slate-400 mt-2">Low Stock</p>
            </div>
          </BentoGridItem>
          <BentoGridItem span="small" delay={0.2} color="magenta">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-400">{outOfStock}</p>
              <p className="text-sm text-slate-400 mt-2">Out of Stock</p>
            </div>
          </BentoGridItem>
        </BentoGrid>

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ProductTable products={products} onEdit={handleEdit} />
        </motion.div>

        {/* Selected Product Details */}
        {selectedProduct && (
          <motion.div
            className="neon-border neon-border-magenta p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex items-start justify-between mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div>
                <h3 className="text-xl font-bold text-pink-400">{selectedProduct.name}</h3>
                <p className="text-sm text-slate-400 font-mono">{selectedProduct.sku}</p>
              </div>
              <motion.button
                onClick={() => setSelectedProduct(null)}
                className="text-slate-400 hover:text-slate-200"
                whileHover={{ scale: 1.2 }}
              >
                ✕
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Quantity</p>
                <p className="text-2xl font-bold text-cyan-400">{selectedProduct.quantity}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Price</p>
                <p className="text-2xl font-bold text-cyan-400">${selectedProduct.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Category</p>
                <p className="text-2xl font-bold text-slate-300">{selectedProduct.category}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Status</p>
                <motion.span
                  className={`inline-block px-3 py-1 rounded-sm text-sm font-semibold ${
                    selectedProduct.status === 'in-stock'
                      ? 'bg-lime-500/20 text-lime-400'
                      : selectedProduct.status === 'low-stock'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {selectedProduct.status.replace('-', ' ')}
                </motion.span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-pink-900/50 flex gap-3">
              <motion.button
                className="px-4 py-2 bg-pink-500 text-slate-950 rounded-sm font-semibold hover:shadow-[0_0_15px_rgba(255,0,255,0.4)] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Edit
              </motion.button>
              <motion.button
                className="px-4 py-2 border border-pink-500 text-pink-400 rounded-sm font-semibold hover:bg-pink-500/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </MainLayout>
  )
}
