'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useUser } from '@/lib/user-context'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageCircle,
  Settings,
  Home,
  Zap,
  LogOut,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  sellerOnly?: boolean
  buyerOnly?: boolean
}

const baseNavItems: NavItem[] = [
  { label: 'Home', href: '/', icon: <Home size={20} /> },
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Inventory', href: '/inventory', icon: <Package size={20} /> },
  { label: 'Orders', href: '/orders', icon: <ShoppingCart size={20} />, sellerOnly: true },
  { label: 'Messages', href: '/messages', icon: <MessageCircle size={20} /> },
  { label: 'Settings', href: '/settings', icon: <Settings size={20} /> },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useUser()

  const navItems = baseNavItems.filter(item => {
    if (item.sellerOnly && user?.role !== 'seller') return false
    if (item.buyerOnly && user?.role !== 'buyer') return false
    return true
  })

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <motion.aside
      className="fixed left-0 top-0 h-screen w-64 neon-border border-r border-t-0 border-b-0 border-l-0 bg-slate-950/80 backdrop-blur-sm flex flex-col p-6"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo/Brand */}
      <motion.div className="mb-8 pb-8 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-sm flex items-center justify-center">
            <Zap size={24} className="text-slate-950 font-bold" />
          </div>
          <div>
            <h1 className="text-lg font-bold glow-cyan">DarkStore</h1>
            <p className="text-xs text-slate-500">Bridge V1</p>
          </div>
        </Link>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(0,255,255,0.2)]'
                    : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-900/50'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="ml-auto w-2 h-2 bg-cyan-400 rounded-full"
                    layoutId="activeIndicator"
                  />
                )}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Footer */}
      <motion.div
        className="pt-8 border-t border-slate-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {user && (
          <motion.div className="mb-4 p-3 bg-slate-900/50 rounded border border-slate-700 text-center">
            <p className="text-xs text-slate-400 mb-1">Logged in as</p>
            <p className="text-sm font-semibold text-cyan-400 mb-2">{user.name}</p>
            <p className="text-xs text-slate-500 capitalize">
              {user.role} account
            </p>
          </motion.div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800/50 border border-slate-700 hover:border-red-500/50 text-slate-400 hover:text-red-400 rounded-sm transition-all duration-200 text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>
        <p className="text-xs text-slate-500 text-center mt-4">
          {new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </p>
      </motion.div>
    </motion.aside>
  )
}
