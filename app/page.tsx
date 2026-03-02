'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingLines } from '@/components/floating-lines';
import { SplitText } from '@/components/split-text';
import { useUser, type UserRole } from '@/lib/user-context';
import { ChevronDown, ShieldCheck, ArrowRight, Lock, ShoppingCart, X, User, Mail, Shield } from 'lucide-react';

// --- CHECK THIS IMPORT PATH ---
// If GradientBlinds.tsx is in the same folder as page.tsx, use './GradientBlinds'
// If it is in the components folder, use '@/components/GradientBlinds'
import GradientBlinds from './GradientBlinds';

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [mounted, setMounted] = useState(false);

  // CRITICAL: Only render the background after the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('dashboard');
  };

  const resetApp = () => {
    setCurrentView('landing');
    setSelectedRole(null);
    setFormData({ name: '', email: '' });
  };

  return (
    <main className="min-h-screen text-slate-200 font-mono relative">
      
      {/* 1. THE BACKGROUND LAYER (Fixed and Transparent Overlay) */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <GradientBlinds
          gradientColors={
            selectedRole === 'seller' 
              ? ['#7f1d1d', '#450a0a'] // Red Theme for Seller
              : selectedRole === 'buyer'
              ? ['#0e7490', '#164e63'] // Blue Theme for Buyer
              : ['#FF9FFC', '#5227FF'] // Original Purple Theme for Neutral
          }
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
        {/* Subtle dark overlay so text is readable over the animation */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* 2. THE CONTENT LAYER (Must be relative and z-10) */}
      <div className="relative z-10">
        <FloatingLines />
        
        <AnimatePresence mode="wait">
          
          {/* --- VIEW 1: LANDING --- */}
          {currentView === 'landing' && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <SplitText text="Dark Store Bridge" className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter" delay={0.2} />
                <p className="text-slate-300 max-w-2xl mb-12 font-light">Democratizing local commerce through secure storefronts.</p>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-white/50"><ChevronDown /></motion.div>
              </section>

              <section className="min-h-screen flex flex-col items-center justify-center px-4 pb-20">
                <h2 className="text-4xl font-bold mb-16 text-white">Select Identity</h2>
                <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
                  
                  {/* Buyer Card */}
                  <motion.div 
                    onMouseEnter={() => setSelectedRole('buyer')} onMouseLeave={() => setSelectedRole(null)}
                    onClick={() => { setSelectedRole('buyer'); setCurrentView('auth'); }}
                    className="group relative p-10 bg-black/40 border border-white/10 hover:border-cyan-500/50 rounded-3xl cursor-pointer backdrop-blur-md transition-all shadow-2xl"
                  >
                    <ShoppingCart className="text-cyan-400 mb-6" size={32} />
                    <h3 className="text-2xl font-bold text-white mb-2">Buyer Portal</h3>
                    <p className="text-slate-300 text-sm">Browse secure local inventory.</p>
                  </motion.div>

                  {/* Seller Card */}
                  <motion.div 
                    onMouseEnter={() => setSelectedRole('seller')} onMouseLeave={() => setSelectedRole(null)}
                    onClick={() => { setSelectedRole('seller'); setCurrentView('auth'); }}
                    className="group relative p-10 bg-black/40 border border-white/10 hover:border-red-500/50 rounded-3xl cursor-pointer backdrop-blur-md transition-all shadow-2xl"
                  >
                    <Lock className="text-red-500 mb-6" size={32} />
                    <h3 className="text-2xl font-bold text-white mb-2">Seller Vault</h3>
                    <p className="text-slate-300 text-sm">Manage inventory via Google Sheets.</p>
                  </motion.div>
                </div>
                <p className="mt-12 text-[10px] text-white/30 uppercase tracking-widest">Reg ID: 24BCE1363</p>
              </section>
            </motion.div>
          )}

          {/* --- VIEW 2: AUTH --- */}
          {currentView === 'auth' && (
            <motion.div key="auth" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen flex items-center justify-center px-4">
              <div className={`w-full max-w-md p-10 rounded-3xl border backdrop-blur-3xl shadow-2xl ${selectedRole === 'seller' ? 'border-red-500/30 bg-red-950/20' : 'border-cyan-500/30 bg-cyan-950/20'}`}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className={`text-xl font-bold uppercase ${selectedRole === 'seller' ? 'text-red-500' : 'text-cyan-400'}`}>Authenticate</h2>
                  <X className="cursor-pointer" onClick={() => setCurrentView('landing')} />
                </div>
                <form onSubmit={handleAuthSubmit} className="space-y-6">
                  <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none" placeholder="Name" />
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none" placeholder="Email" />
                  <button className={`w-full py-5 font-bold uppercase rounded-xl ${selectedRole === 'seller' ? 'bg-red-600' : 'bg-cyan-500'} text-black`}>Establish Bridge</button>
                </form>
              </div>
            </motion.div>
          )}

          {/* --- VIEW 3: DASHBOARD --- */}
          {currentView === 'dashboard' && (
            <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 md:p-16">
              <nav className="flex justify-between items-center mb-12 border-b border-white/10 pb-8">
                <h1 className="font-bold text-2xl uppercase">{selectedRole}_BRIDGE</h1>
                <div className="text-right">
                  <p className="text-white font-bold">{formData.name}</p>
                  <button onClick={resetApp} className="text-[10px] text-red-500 uppercase">Terminate</button>
                </div>
              </nav>
              <div className="p-8 border border-white/10 bg-black/40 rounded-3xl backdrop-blur-md max-w-lg">
                <Shield className={selectedRole === 'seller' ? 'text-red-500' : 'text-cyan-500'} />
                <h4 className="mt-4 font-bold text-lg">Integrity Verified</h4>
                <p className="text-sm text-slate-400">Node 24BCE1363 is now online.</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
