'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, ArrowRight, Lock, ShoppingCart, X, User, Mail, Shield } from 'lucide-react';

// --- IMPORTS ---
import { SplitText } from '@/components/split-text';
import { FloatingLines } from '@/components/floating-lines';
import { useUser, type UserRole } from '@/lib/user-context';
import GradientBlinds from './GradientBlinds'; // Ensure this path is correct!

// --- INTERNAL COMPONENT: BLUR TEXT ---
const BlurText = ({ text, delay = 0, animateBy = 'words', direction = 'top', className = "" }: any) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  return (
    <p className={className}>
      {elements.map((el: string, i: number) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: direction === 'top' ? -20 : 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: (delay / 1000) + (i * 0.1), ease: "easeOut" }}
          className="inline-block whitespace-pre"
        >
          {el}{animateBy === 'words' ? '\u00A0' : ''}
        </motion.span>
      ))}
    </p>
  );
};

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('dashboard');
  };

  return (
    // 1. Root container MUST be transparent
    <main className="min-h-screen text-slate-200 font-mono relative bg-transparent">
      
      {/* 2. BACKGROUND LAYER: Forced to Full Screen & Fixed */}
      <div className="fixed inset-0 z-0 w-screen h-screen pointer-events-none">
        <GradientBlinds
          gradientColors={
            selectedRole === 'seller' 
              ? ['#FF0000', '#450a0a'] // Red for Seller
              : selectedRole === 'buyer'
              ? ['#00F3FF', '#0891b2'] // Blue for Buyer
              : ['#FF9FFC', '#5227FF'] // Original Purple
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
        {/* Dark overlay to make text pop */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* 3. CONTENT LAYER: z-10 and bg-transparent */}
      <div className="relative z-10 bg-transparent">
        <FloatingLines />
        
        <AnimatePresence mode="wait">
          
          {/* VIEW: LANDING */}
          {currentView === 'landing' && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-transparent">
              <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <BlurText text="Dark Store Bridge" className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter text-white" />
                <p className="text-slate-300 max-w-2xl mb-12">Registry ID: 24BCE1363 // Secure Micro-Storefronts</p>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-white/50"><ChevronDown /></motion.div>
              </section>

              <section className="min-h-screen flex flex-col items-center justify-center px-4 pb-20">
                <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl relative">
                  
                  {/* Buyer Card */}
                  <motion.div 
                    onMouseEnter={() => setSelectedRole('buyer')} 
                    onMouseLeave={() => setSelectedRole(null)}
                    onClick={() => { setSelectedRole('buyer'); setCurrentView('auth'); }}
                    className="group relative p-10 bg-black/40 border border-white/10 hover:border-cyan-500/50 rounded-3xl cursor-pointer backdrop-blur-md transition-all shadow-2xl"
                  >
                    <div className="p-4 bg-cyan-500/10 rounded-xl text-cyan-400 w-fit mb-6"><ShoppingCart size={32} /></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Buyer Portal</h3>
                    <p className="text-slate-400 text-sm">Browse neighborhood catalogs.</p>
                  </motion.div>

                  {/* Seller Card */}
                  <motion.div 
                    onMouseEnter={() => setSelectedRole('seller')} 
                    onMouseLeave={() => setSelectedRole(null)}
                    onClick={() => { setSelectedRole('seller'); setCurrentView('auth'); }}
                    className="group relative p-10 bg-black/40 border border-white/10 hover:border-red-500/50 rounded-3xl cursor-pointer backdrop-blur-md transition-all shadow-2xl"
                  >
                    <div className="p-4 bg-red-500/10 rounded-xl text-red-500 w-fit mb-6"><Lock size={32} /></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Seller Vault</h3>
                    <p className="text-slate-400 text-sm">Manage encrypted inventory.</p>
                  </motion.div>

                </div>
              </section>
            </motion.div>
          )}

          {/* VIEW: AUTH */}
          {currentView === 'auth' && (
            <motion.div key="auth" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen flex items-center justify-center px-4 bg-transparent">
              <div className={`w-full max-w-md p-10 rounded-3xl border backdrop-blur-3xl shadow-2xl ${selectedRole === 'seller' ? 'border-red-500/30 bg-red-950/20' : 'border-cyan-500/30 bg-cyan-950/20'}`}>
                <div className="flex justify-between items-center mb-10">
                  <h2 className={`text-xl font-bold uppercase ${selectedRole === 'seller' ? 'text-red-500' : 'text-cyan-400'}`}>Authenticate</h2>
                  <X className="cursor-pointer" onClick={() => setCurrentView('landing')} />
                </div>
                <form onSubmit={handleAuthSubmit} className="space-y-6">
                  <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none" placeholder="Name" />
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none" placeholder="Email" />
                  <button type="submit" className={`w-full py-5 font-bold uppercase rounded-xl ${selectedRole === 'seller' ? 'bg-red-600' : 'bg-cyan-500'} text-black`}>Establish Bridge</button>
                </form>
              </div>
            </motion.div>
          )}

          {/* VIEW: DASHBOARD */}
          {currentView === 'dashboard' && (
            <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 md:p-16 bg-transparent">
              <nav className="flex justify-between items-center mb-16 border-b border-white/10 pb-8">
                <h1 className="font-bold text-2xl uppercase">{selectedRole}_BRIDGE</h1>
                <button onClick={() => setCurrentView('landing')} className="text-red-500 text-xs uppercase underline">Terminate</button>
              </nav>
              <div className="p-10 border border-white/10 bg-black/40 rounded-3xl backdrop-blur-md max-w-md">
                <Shield className={selectedRole === 'seller' ? 'text-red-500' : 'text-cyan-500'} size={40} />
                <h4 className="mt-6 font-bold text-xl text-white">Identity Verified</h4>
                <p className="mt-2 text-slate-400">Welcome, {formData.name}. Access granted for node 24BCE1363.</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
