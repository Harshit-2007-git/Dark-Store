'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FloatingLines } from '@/components/floating-lines';
import { SplitText } from '@/components/split-text';
import { AuthModal } from '@/components/auth-modal';
import { useUser, type UserRole } from '@/lib/user-context';
import { ChevronDown } from 'lucide-react';

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useUser();

  if (user) {
    return (
      <motion.div
        className="min-h-screen bg-slate-900 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-center">
          <motion.h1
            className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Welcome, {user.name}!
          </motion.h1>
          <p className="text-gray-400 mb-8">
            You are logged in as a {user.role}
          </p>
          <Link
            href={user.role === 'buyer' ? '/dashboard' : '/inventory'}
            className="inline-block bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-black font-semibold py-3 px-8 rounded transition-all duration-300"
          >
            Enter Dashboard
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <FloatingLines />
      <div className="min-h-screen w-full overflow-hidden">
        {/* Welcome Section */}
        <section className="min-h-screen w-full flex items-center justify-center relative">
          <div className="text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <SplitText
                text="Welcome to Dark Store"
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
                delay={0.2}
              />
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Seamless inventory management and order tracking for dark store operations
            </motion.p>

            {/* Scroll Indicator */}
            <motion.div
              className="flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex flex-col items-center gap-2">
                <ChevronDown className="w-6 h-6 text-cyan-400" />
                <p className="text-sm text-gray-500">Scroll to continue</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Role Selection Section */}
        <section className="min-h-screen w-full flex items-center justify-center relative px-4">
          <div className="max-w-6xl mx-auto w-full">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Choose Your Role
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Buyer Card */}
              <motion.div
                className="relative group cursor-pointer"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                onHoverStart={() => setSelectedRole('buyer')}
                onHoverEnd={() => setSelectedRole(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div
                  className="relative bg-slate-900 border border-cyan-500/30 group-hover:border-cyan-400 rounded-lg p-8 transition-all duration-300 neon-border cursor-pointer interactive"
                  onClick={() => {
                    setSelectedRole('buyer');
                    setShowAuthModal(true);
                  }}
                >
                  <motion.div
                    className="mb-6"
                    animate={selectedRole === 'buyer' ? { scale: 1.1 } : { scale: 1 }}
                  >
                    <div className="text-5xl mb-4">🛒</div>
                    <h3 className="text-2xl font-bold text-cyan-400 mb-2">Buyer</h3>
                    <p className="text-gray-400">
                      Browse inventory and place orders
                    </p>
                  </motion.div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3 text-gray-300">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span>View real-time inventory</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span>Place and track orders</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span>Manage WhatsApp conversations</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span>Order history and analytics</span>
                    </li>
                  </ul>

                  <motion.button
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-semibold py-2 rounded transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started as Buyer
                  </motion.button>
                </div>
              </motion.div>

              {/* Seller Card */}
              <motion.div
                className="relative group cursor-pointer"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                onHoverStart={() => setSelectedRole('seller')}
                onHoverEnd={() => setSelectedRole(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-magenta-500/20 to-pink-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div
                  className="relative bg-slate-900 border border-magenta-500/30 group-hover:border-magenta-400 rounded-lg p-8 transition-all duration-300 neon-border-magenta cursor-pointer interactive"
                  onClick={() => {
                    setSelectedRole('seller');
                    setShowAuthModal(true);
                  }}
                >
                  <motion.div
                    className="mb-6"
                    animate={selectedRole === 'seller' ? { scale: 1.1 } : { scale: 1 }}
                  >
                    <div className="text-5xl mb-4">📦</div>
                    <h3 className="text-2xl font-bold text-magenta-400 mb-2">Seller</h3>
                    <p className="text-gray-400">
                      Manage inventory and fulfill orders
                    </p>
                  </motion.div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3 text-gray-300">
                      <span className="text-magenta-400 mt-1">✓</span>
                      <span>Sync inventory with Google Sheets</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <span className="text-magenta-400 mt-1">✓</span>
                      <span>Receive and fulfill orders</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <span className="text-magenta-400 mt-1">✓</span>
                      <span>WhatsApp integration</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <span className="text-magenta-400 mt-1">✓</span>
                      <span>Sales analytics & insights</span>
                    </li>
                  </ul>

                  <motion.button
                    className="w-full bg-gradient-to-r from-magenta-500 to-pink-500 hover:from-magenta-600 hover:to-pink-600 text-black font-semibold py-2 rounded transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started as Seller
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          role={selectedRole}
        />
      </div>
    </>
  );
}
