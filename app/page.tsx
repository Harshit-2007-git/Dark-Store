'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FloatingLines } from '@/components/floating-lines';
import { SplitText } from '@/components/split-text';
import { AuthModal } from '@/components/auth-modal';
import { useUser, type UserRole } from '@/lib/user-context';
import { ChevronDown, ShieldCheck, ArrowRight, Lock, ShoppingCart } from 'lucide-react';

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration flicker
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // --- POST-LOGIN "ACCESS GRANTED" VIEW ---
  if (user) {
    return (
      <motion.div
        className="min-h-screen bg-[#0F1115] flex items-center justify-center p-6 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="w-full max-w-md p-8 border border-slate-800 bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-6 text-cyan-400 text-xs tracking-widest uppercase">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            Secure Bridge Established // ID: 24BCE1363
          </div>

          <h1 className="text-3xl font-bold mb-2 text-white">
            Welcome, {user.name}
          </h1>
          <p className="text-slate-400 mb-8 text-sm">
            Access authorized for encrypted <span className={user.role === 'buyer' ? "text-cyan-400 font-bold" : "text-red-500 font-bold"}>{user.role.toUpperCase()}</span> protocols.
          </p>

          <Link
            href={user.role === 'buyer' ? '/dashboard' : '/inventory'}
            className={`group flex items-center justify-center w-full ${user.role === 'buyer' ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-gradient-to-r from-red-600 to-red-800'} text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg`}
          >
            INITIALIZE INTERFACE
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  // --- LANDING & ROLE SELECTION VIEW ---
  return (
    <div className="bg-[#0A0A0B] text-slate-200 min-h-screen">
      <FloatingLines />
      <div className="w-full overflow-hidden">
        
        {/* Welcome Section */}
        <section className="min-h-screen w-full flex items-center justify-center relative">
          <div className="text-center px-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <SplitText
                text="Dark Store Bridge"
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tighter"
                delay={0.2}
              />
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Democratizing local commerce through secure, zero-maintenance digital storefronts.
            </motion.p>

            <motion.div className="flex flex-col items-center gap-2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown className="w-6 h-6 text-cyan-500/50" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-600">Scroll to Authenticate</p>
            </motion.div>
          </div>
        </section>

        {/* Role Selection Section */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 pb-20 font-mono">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div className="text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Select Identity</h2>
              <p className="text-slate-500 text-sm">System Registry: 24BCE1363</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 relative">
              
              {/* Dynamic Scan-Line Animation (Swaps Blue/Red based on Hover) */}
              <AnimatePresence>
                {selectedRole && (
                  <motion.div
                    key="role-scan"
                    className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className={`absolute inset-x-0 h-1 blur-sm ${selectedRole === 'buyer' ? 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]'}`}
                      animate={{ y: ["-10%", "1100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buyer Card (Blue Theme) */}
              <motion.div
                className="relative group cursor-pointer z-10"
                onHoverStart={() => setSelectedRole('buyer')}
                onHoverEnd={() => setSelectedRole(null)}
                onClick={() => { setSelectedRole('buyer'); setShowAuthModal(true); }}
              >
                <div className="absolute inset-0 bg-cyan-500/5 rounded-2xl blur-2xl group-hover:bg-cyan-500/10 transition-all" />
                <div className="relative bg-slate-900/40 border border-slate-800 group-hover:border-cyan-500/50 rounded-2xl p-8 backdrop-blur-md transition-all duration-500">
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-4 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
                      <ShoppingCart className="w-8 h-8" />
                    </div>
                    <ShieldCheck className="w-5 h-5 text-slate-700 group-hover:text-cyan-500 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Buyer Portal</h3>
                  <p className="text-slate-400 text-sm mb-8 font-light">Securely browse verified local inventory and initiate encrypted WhatsApp orders.</p>
                  
                  <ul className="space-y-3 mb-10 text-sm text-slate-500">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Real-time Inventory</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Secure Handshake</li>
                  </ul>

                  <div className="w-full py-3 bg-slate-800 text-slate-300 group-hover:bg-cyan-600 group-hover:text-white text-center font-bold rounded-lg transition-all duration-300">
                    Access Marketplace
                  </div>
                </div>
              </motion.div>

              {/* Seller Card (Red Theme) */}
              <motion.div
                className="relative group cursor-pointer z-10"
                onHoverStart={() => setSelectedRole('seller')}
                onHoverEnd={() => setSelectedRole(null)}
                onClick={() => { setSelectedRole('seller'); setShowAuthModal(true); }}
              >
                <div className="absolute inset-0 bg-red-600/5 rounded-2xl blur-2xl group-hover:bg-red-600/10 transition-all" />
                <div className="relative bg-slate-900/40 border border-slate-800 group-hover:border-red-600/50 rounded-2xl p-8 backdrop-blur-md transition-all duration-500">
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-4 bg-red-600/10 rounded-xl text-red-500 border border-red-600/20">
                      <Lock className="w-8 h-8" />
                    </div>
                    <ShieldCheck className="w-5 h-5 text-slate-700 group-hover:text-red-500 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Seller Dashboard</h3>
                  <p className="text-slate-400 text-sm mb-8 font-light">Convert Google Sheets into storefronts and manage neighborhood fulfillments.</p>
                  
                  <ul className="space-y-3 mb-10 text-sm text-slate-500">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-red-600" /> Sheet-to-Store Sync</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-red-600" /> Identity Masking</li>
                  </ul>

                  <div className="w-full py-3 bg-slate-800 text-slate-300 group-hover:bg-red-600 group-hover:text-white text-center font-bold rounded-lg transition-all duration-300">
                    Access Seller Vault
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          role={selectedRole}
        />
      </div>
    </div>
  );
}
