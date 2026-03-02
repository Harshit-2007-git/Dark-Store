'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, ArrowRight, Lock, ShoppingCart, X, User, Mail, Shield } from 'lucide-react';

// --- 1. INTERNAL COMPONENT: GRADIENT BLINDS ---
// Defining this here so you don't need a separate file or CSS import
const GradientBlinds = ({ 
  gradientColors = ['#FF9FFC', '#5227FF'], 
  blindCount = 12 
}) => {
  return (
    <div className="absolute inset-0 flex overflow-hidden">
      {Array.from({ length: blindCount }).map((_, i) => (
        <motion.div
          key={i}
          className="h-full flex-1"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 1, delay: i * 0.05, ease: "circOut" }}
          style={{
            background: `linear-gradient(to bottom, ${gradientColors[0]}, ${gradientColors[1]})`,
            transformOrigin: i % 2 === 0 ? 'top' : 'bottom',
            filter: 'contrast(120%) brightness(80%)',
          }}
        />
      ))}
    </div>
  );
};

// --- 2. INTERNAL COMPONENT: BLUR TEXT ---
const BlurText = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(' ');
  return (
    <p className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 10 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          className="inline-block mr-3"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};

// --- 3. MAIN PAGE COMPONENT ---
export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('dashboard');
  };

  return (
    <main className="min-h-screen text-slate-100 font-mono relative bg-black overflow-x-hidden">
      
      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0">
        <GradientBlinds 
          blindCount={16}
          gradientColors={
            selectedRole === 'seller' ? ['#ff0000', '#450a0a'] : 
            selectedRole === 'buyer' ? ['#00f3ff', '#0891b2'] : 
            ['#1e293b', '#020617']
          }
        />
        {/* Noise & Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          
          {/* LANDING VIEW */}
          {currentView === 'landing' && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <BlurText text="Dark Store Bridge" className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter" />
                <p className="text-slate-400 max-w-xl mb-12 uppercase tracking-widest text-xs">Registry: 24BCE1363 // Secure Micro-Storefronts</p>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-white/20"><ChevronDown /></motion.div>
              </section>

              <section className="min-h-screen flex flex-col items-center justify-center px-4 pb-20">
                <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
                  
                  {/* Buyer Card */}
                  <motion.div 
                    onMouseEnter={() => setSelectedRole('buyer')} onMouseLeave={() => setSelectedRole(null)}
                    onClick={() => { setSelectedRole('buyer'); setCurrentView('auth'); }}
                    className="group relative p-10 bg-white/5 border border-white/10 hover:border-cyan-500/50 rounded-3xl cursor-pointer backdrop-blur-xl transition-all"
                  >
                    <div className="p-4 bg-cyan-500/10 rounded-xl text-cyan-400 w-fit mb-6 transition-colors group-hover:bg-cyan-500/20"><ShoppingCart size={32} /></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Buyer Portal</h3>
                    <p className="text-slate-400 text-sm">Access secure local inventory.</p>
                  </motion.div>

                  {/* Seller Card */}
                  <motion.div 
                    onMouseEnter={() => setSelectedRole('seller')} onMouseLeave={() => setSelectedRole(null)}
                    onClick={() => { setSelectedRole('seller'); setCurrentView('auth'); }}
                    className="group relative p-10 bg-white/5 border border-white/10 hover:border-red-500/50 rounded-3xl cursor-pointer backdrop-blur-xl transition-all"
                  >
                    <div className="p-4 bg-red-500/10 rounded-xl text-red-500 w-fit mb-6 transition-colors group-hover:bg-red-500/20"><Lock size={32} /></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Seller Vault</h3>
                    <p className="text-slate-400 text-sm">Manage encrypted digital assets.</p>
                  </motion.div>

                </div>
              </section>
            </motion.div>
          )}

          {/* AUTH VIEW (The Pop-up) */}
          {currentView === 'auth' && (
            <motion.div key="auth" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="min-h-screen flex items-center justify-center px-4">
              <div className={`w-full max-w-md p-10 rounded-3xl border backdrop-blur-3xl shadow-2xl ${selectedRole === 'seller' ? 'border-red-500/40 bg-red-950/20 shadow-red-500/10' : 'border-cyan-500/40 bg-cyan-950/20 shadow-cyan-500/10'}`}>
                <div className="flex justify-between items-center mb-10">
                  <h2 className={`text-xl font-bold uppercase tracking-widest ${selectedRole === 'seller' ? 'text-red-500' : 'text-cyan-400'}`}>Verify Identity</h2>
                  <X className="cursor-pointer text-slate-500 hover:text-white" onClick={() => { setCurrentView('landing'); setSelectedRole(null); }} />
                </div>
                <form onSubmit={handleAuthSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest">Full Name</label>
                    <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-white/30" placeholder="Enter Name..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest">Mail ID</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-white/30" placeholder="user@vit.edu" />
                  </div>
                  <button type="submit" className={`w-full py-5 font-bold uppercase tracking-widest rounded-xl transition-all ${selectedRole === 'seller' ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-cyan-500 hover:bg-cyan-400 text-black'}`}>
                    Authorize Bridge
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* DASHBOARD VIEW */}
          {currentView === 'dashboard' && (
            <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 md:p-16">
              <header className="flex justify-between items-center mb-16 border-b border-white/10 pb-8">
                <div>
                  <h1 className="font-bold text-2xl uppercase tracking-tighter">{selectedRole}_BRIDGE_v1</h1>
                  <p className="text-[10px] text-slate-500 uppercase mt-1">Node: 24BCE1363 // Local Grid Active</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{formData.name}</p>
                  <button onClick={() => setCurrentView('landing')} className="text-red-500 text-[10px] uppercase font-bold hover:underline">Terminate</button>
                </div>
              </header>
              <div className="p-10 border border-white/10 bg-white/5 rounded-3xl backdrop-blur-md max-w-md">
                <Shield className={selectedRole === 'seller' ? 'text-red-500' : 'text-cyan-500'} size={40} />
                <h4 className="mt-6 font-bold text-xl text-white uppercase">Integrity Verified</h4>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed">Secure link established for {formData.email}. The {selectedRole} vault is now accessible.</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
