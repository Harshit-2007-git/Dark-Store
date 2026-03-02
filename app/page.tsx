'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FloatingLines } from '@/components/floating-lines';
import { SplitText } from '@/components/split-text';
import { AuthModal } from '@/components/auth-modal';
import { useUser, type UserRole } from '@/lib/user-context';
import { ChevronDown, ShieldCheck, ArrowRight, Lock, ShoppingCart } from 'lucide-react';

// --- ADDED IMPORT ---
import GradientBlinds from './GradientBlinds';

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useUser();

  if (user) {
    return (
      <motion.div
        className="min-h-screen bg-[#0F1115] flex items-center justify-center p-6 font-mono relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* --- ADDED BACKGROUND LAYER --- */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <GradientBlinds
            gradientColors={['#FF9FFC', '#5227FF']}
            angle={0}
            noise={0.3}
            blindCount={12}
            blindMinWidth={50}
            spotlightRadius={0.5}
            spotlightSoftness={1}
            spotlightOpacity={1}
            mouseDampening={0.15}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="lighten"
          />
        </div>

        <motion.div 
          className="relative z-10 w-full max-w-md p-8 border border-slate-800 bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl"
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
            Access authorized for encrypted <span className="text-magenta-400 uppercase">{user.role}</span> protocols.
          </p>

          <Link
            href={user.role === 'buyer' ? '/dashboard' : '/inventory'}
            className="group flex items-center justify-center w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20"
          >
            INITIALIZE INTERFACE
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#0A0A0B] text-slate-200 relative">
      {/* --- ADDED BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GradientBlinds
          gradientColors={['#FF9FFC', '#5227FF']}
          angle={0}
          noise={0.3}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>

      <div className="relative z-10">
        <FloatingLines />
        <div className="min-h-screen w-full overflow-hidden">
          
          <section className="min-h-screen w-full flex items-center justify-center relative">
            <div className="text-center px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
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

              <motion.div
                className="flex flex-col items-center gap-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown className="w-6 h-6 text-cyan-500/50" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-600">Scroll to Authenticate</p>
              </motion.div>
            </div>
          </section>

          <section className="min-h-screen w-full flex items-center justify-center relative px-4 pb-20">
            <div className="max-w-6xl mx-auto w-full">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Select Identity</h2>
                <p className="text-slate-500">Choose your interface to bridge with the local ecosystem.</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* Buyer Card */}
                <motion.div
                  className="relative group cursor-pointer"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  onClick={() => { setSelectedRole('buyer'); setShowAuthModal(true); }}
                >
                  <div className="absolute inset-0 bg-cyan-500/5 rounded-2xl blur-2xl group-hover:bg-cyan-500/10 transition-all" />
                  <div className="relative bg-slate-900/40 border border-slate-800 group-hover:border-cyan-500/50 rounded-2xl p-8 backdrop-blur-md transition-all duration-500">
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-4 bg-cyan-500/10 rounded-xl text-cyan-400">
                        <ShoppingCart className="w-8 h-8" />
                      </div>
                      <ShieldCheck className="w-5 h-5 text-slate-700 group-hover:text-cyan-500 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Buyer Portal</h3>
                    <p className="text-slate-400 text-sm mb-8">Securely browse local inventory and initiate WhatsApp-bridged orders.</p>
                  </div>
                </motion.div>

                {/* Seller Card */}
                <motion.div
                  className="relative group cursor-pointer"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  onClick={() => { setSelectedRole('seller'); setShowAuthModal(true); }}
                >
                  <motion.div
                    className="absolute inset-0 bg-red-500/10 rounded-2xl blur-2xl"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <div className="relative bg-slate-900/40 border border-slate-800 group-hover:border-red-500/60 rounded-2xl p-8 backdrop-blur-md transition-all duration-500">
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-4 bg-red-500/10 rounded-xl text-red-400 group-hover:bg-red-500/20 transition-all">
                        <Lock className="w-8 h-8" />
                      </div>
                      <ShieldCheck className="text-slate-700 group-hover:text-red-500 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Seller Dashboard</h3>
                    <p className="text-slate-400 text-sm mb-8">Manage inventory via Google Sheets and fulfill neighborhood orders.</p>
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
    </div>
  );
}
