'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FloatingLines } from '@/components/floating-lines';
import { SplitText } from '@/components/split-text';
import { AuthModal } from '@/components/auth-modal';
import { useUser, type UserRole } from '@/lib/user-context';
import { ChevronDown, ShoppingCart, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // --- SUCCESS VIEW (Once Logged In) ---
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
            Welcome, {user.name || 'Harshit'}
          </h1>
          <p className="text-slate-400 mb-8 text-sm">
            Access authorized for encrypted <span className="text-blue-400 uppercase font-bold">{user.role}</span> protocols.
          </p>

          <Link
            href={user.role === 'buyer' ? '/dashboard' : '/inventory'}
            className="group flex items-center justify-center w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-xl transition-all duration-300 border border-slate-600 shadow-lg"
          >
            INITIALIZE INTERFACE
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  // --- LANDING VIEW ---
  return (
    <div className="bg-[#0A0A0B] text-slate-200 min-h-screen">
      <FloatingLines />
      <div className="w-full overflow-hidden">
        
        {/* Hero Section */}
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
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
            >
              Secure, location-based product catalogs for local micro-sellers and student entrepreneurs.
            </motion.p>

            <motion.div className="flex flex-col items-center gap-2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown className="w-6 h-6 text-slate-700" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-600">Identify to Proceed</p>
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

            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Buyer Card (Blue Theme) */}
              <motion.div
                className="relative group cursor-pointer"
                onHoverStart={() => setSelectedRole('buyer')}
                onHoverEnd={() => setSelectedRole(null)}
                onClick={() => { setSelectedRole('buyer'); setShowAuthModal(true); }}
              >
                <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-2xl group-hover:bg-blue-500/10 transition-all duration-500" />
                <div className="relative bg-slate-900/40 border border-slate-800 group-hover:border-blue-500/40 rounded-2xl p-8 backdrop-blur-md transition-all duration-500 overflow-hidden">
                  
                  <AnimatePresence>
                    {selectedRole === 'buyer' && (
                      <motion.div className="absolute inset-0 z-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div 
                          className="absolute inset-x-0 h-px bg-blue-400/50 shadow-[0_0_15px_rgba(96,165,250,0.5)]"
                          initial={{ y: "0%" }} animate={{ y: "100%" }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="p-4 bg-slate-800/50 rounded-xl text-blue-400 border border-slate-700 group-hover:border-blue-500/50 transition-colors">
                      <ShoppingCart className="w-8 h-8" />
                    </div>
                    <ShieldCheck className="w-5 h-5 text-slate-700 group-hover:text-blue-500 transition-colors" />
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">Buyer Portal</h3>
                    <p className="text-slate-400 text-sm mb-8">Browse verified local inventory and initiate secure WhatsApp handshakes.</p>
                    <div className="w-full py-3 bg-slate-800 text-slate-300 group-hover:bg-blue-600 group-hover:text-white text-center font-bold rounded-lg transition-all duration-300">
                      Access Marketplace
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Seller Card (Red Theme) */}
              <motion.div
                className="relative group cursor-pointer"
                onHoverStart={() => setSelectedRole('seller')}
                onHoverEnd={() => setSelectedRole(null)}
                onClick={() => { setSelectedRole('seller'); setShowAuthModal(true); }}
              >
                <div className="absolute inset-0 bg-red-500/5 rounded-2xl blur-2xl group-hover:bg-red-500/10 transition-all duration-500" />
                <div className="relative bg-slate-900/40 border border-slate-800 group-hover:border-red-500/40 rounded-2xl p-8 backdrop-blur-md transition-all duration-500 overflow-hidden">
                  
                  <AnimatePresence>
                    {selectedRole === 'seller' && (
                      <motion.div className="absolute inset-0 z-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div 
                          className="absolute inset-x-0 h-px bg-red-400/50 shadow-[0_0_15px_rgba(248,113,113,0.5)]"
                          initial={{ y: "0%" }} animate={{ y: "100%" }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="p-4 bg-slate-800/50 rounded-xl text-red-400 border border-slate-700 group-hover:border-red-500/50 transition-colors">
                      <Lock className="w-8 h-8" />
                    </div>
                    <ShieldCheck className="w-5 h-5 text-slate-700 group-hover:text-red-500 transition-colors" />
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">Seller Dashboard</h3>
                    <p className="text-slate-400 text-sm mb-8">Convert Sheets into storefronts and manage secure neighborhood fulfillments.</p>
                    <div className="w-full py-3 bg-slate-800 text-slate-300 group-hover:bg-red-600 group-hover:text-white text-center font-bold rounded-lg transition-all duration-300">
                      Access Seller Vault
                    </div>
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
