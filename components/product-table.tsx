'use client'

import { motion } from 'framer-motion'
import { Product } from '@/lib/types'

interface ProductTableProps {
  products: Product[]
  onEdit?: (product: Product) => void
}

export function ProductTable({ products, onEdit }: ProductTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'text-lime-400'
      case 'low-stock':
        return 'text-yellow-400'
      case 'out-of-stock':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-lime-500/10'
      case 'low-stock':
        return 'bg-yellow-500/10'
      case 'out-of-stock':
        return 'bg-red-500/10'
      default:
        return 'bg-gray-500/10'
    }
  }

  return (
    <div className="overflow-x-auto neon-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-cyan-900/50">
            <th className="text-left p-4 text-cyan-400 font-semibold">Product</th>
            <th className="text-left p-4 text-cyan-400 font-semibold">SKU</th>
            <th className="text-right p-4 text-cyan-400 font-semibold">Quantity</th>
            <th className="text-right p-4 text-cyan-400 font-semibold">Price</th>
            <th className="text-center p-4 text-cyan-400 font-semibold">Status</th>
            <th className="text-center p-4 text-cyan-400 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <motion.tr
              key={product.id}
              className="border-b border-slate-800/50 hover:bg-slate-900/50 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <td className="p-4 text-slate-200">{product.name}</td>
              <td className="p-4 text-slate-400 font-mono text-xs">{product.sku}</td>
              <td className="p-4 text-right text-slate-200 font-mono">{product.quantity}</td>
              <td className="p-4 text-right text-slate-200">${product.price.toFixed(2)}</td>
              <td className="p-4">
                <motion.span
                  className={`inline-block px-3 py-1 rounded-sm text-xs font-semibold ${getStatusColor(
                    product.status
                  )} ${getStatusBg(product.status)}`}
                  whileHover={{ scale: 1.1 }}
                >
                  {product.status.replace('-', ' ')}
                </motion.span>
              </td>
              <td className="p-4 text-center">
                <motion.button
                  onClick={() => onEdit?.(product)}
                  className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold uppercase tracking-wider"
                  whileHover={{ scale: 1.1 }}
                >
                  Edit
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
