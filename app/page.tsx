'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, ArrowRight, Lock, ShoppingCart, X, User, Mail, Shield } from 'lucide-react';

// --- 1. INTERNAL COMPONENT: GRADIENT BLINDS ---
// This handles the vertical stripes that change color
const GradientBlinds = ({ role }: { role: 'buyer' | 'seller' | null }) => {
  // Color sets: Neutral (Slate), Buyer (Cyan/Blue), Seller (Red)
  const colors = 
    role === 'seller' ? ['#7f1d1d', '#450a0a'] : 
    role === 'buyer' ? ['#0891b2', '#083344'] :  
    ['#1e293b', '#020617'];                     

  return (
    <div className="absolute inset-0 flex overflow-hidden bg-black">
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div
          key={i}
          className="h-full flex-1"
          animate={{ 
            background: `linear-gradient(to bottom, ${colors[0]}, ${colors[1]})`,
          }}
          transition={{ duration: 0.6, delay: i * 0.03 }}
          style={{
            transformOrigin: i % 2 === 0 ? 'top' : 'bottom',
            filter: 'brightness(0.8) contrast(1.2)',
          }}
        />
      ))}
    </div>
  );
};

// --- 2. INTERNAL COMPONENT: BLUR TEXT ---
const BlurText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <div className={className}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 10 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          className="inline-block mr-3 text-white"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

// --- 3. MAIN PAGE COMPONENT ---
export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [mounted, setMounted] = useState(false);

  // Ensure client-side only rendering for animations
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('dashboard');
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden bg-black text-slate-100 font-mono">
      
      {/* BACKGROUND LAYER: Forced to bottom with z-0 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GradientBlinds role={selectedRole} />
        {/* The Black Overlay: Adjust opacity here (0.5 = 50% dark) */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      </div>

      {/* CONTENT LAYER: Raised to z-10 */}
      <div className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          
          {/* --- LANDING VIEW --- */}
          {currentView === 'landing' && (
            <motion.div 
              key="landing" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0, y: -20 }}
            >
              <section className="h-screen flex flex-col items-center justify-center text-center px-4">
                <BlurText text="Dark Store Bridge" className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter" />
                <p className="text-slate-400 max-w-xl mb-12 uppercase tracking-[0.4em] text-[10px]">Registry ID: 24BCE1363 // Local Grid Active</p>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-white/40"><ChevronDown /></motion.div>
              </section>

              <section className="min-h-screen flex flex-col items-center justify-center px-4 pb-40">
                <h2 className="text-4xl font-bold mb-16 text-white uppercase tracking-widest">Select Identity</h2>
                <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">
                  
                  {/* Buyer Card */}
                  <motion.div 
                    onMouseEnter={() => setSelectedRole('buyer')} 
                    onMouseLeave={() => setSelectedRole(null)}
                    onClick={() => { setSelectedRole('buyer'); setCurrentView('auth'); }}
                    className="group relative p-12 bg-white/5 border border-white/10 hover:border-cyan-500 rounded-3xl cursor-pointer backdrop-blur-xl transition-all shadow-2xl"
                  >
                    <div className="p-4 bg-cyan-500/20 rounded-xl text-cyan-400 w-fit mb-6 shadow-lg transition-transform group-hover:scale-110"><ShoppingCart size={32} /></div>
                    <h3 className="text-2xl font-bold text-white mb-2 uppercase">Buyer Portal</h3>
                    <p className="text-slate-400 text-sm font-light">Browse secure local inventory and establish bridges.</p>
                  </motion.div>

                  {/* Seller Card */}
                  <motion.div 
                    onMouseEnter={() => setSelectedRole('seller')} 
                    onMouseLeave={() => setSelectedRole(null)}
                    onClick={() => { setSelectedRole('seller'); setCurrentView('auth'); }}
                    className="group relative p-12 bg-white/5 border border-white/10 hover:border-red-500 rounded-3xl cursor-pointer backdrop-blur-xl transition-all shadow-2xl"
                  >
                    <div className="p-4 bg-red-500/20 rounded-xl text-red-500 w-fit mb-6 shadow-lg transition-transform group-hover:scale-110"><Lock size={32} /></div>
                    <h3 className="text-2xl font-bold text-white mb-2 uppercase">Seller Vault</h3>
                    <p className="text-slate-400 text-sm font-light">Manage encrypted digital assets and neighborhood orders.</p>
                  </motion.div>

                </div>
              </section>
            </motion.div>
          )}

          {/* --- AUTH VIEW --- */}
          {currentView === 'auth' && (
            <motion.div 
              key="auth" 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="h-screen flex items-center justify-center px-4"
            >
              <div className={`w-full max-w-md p-10 rounded-3xl border backdrop-blur-3xl shadow-2xl ${selectedRole === 'seller' ? 'border-red-500 bg-red-950/20' : 'border-cyan-500 bg-cyan-950/20'}`}>
                <div className="flex justify-between items-center mb-10">
                  <h2 className={`text-xl font-bold uppercase tracking-widest ${selectedRole === 'seller' ? 'text-red-500' : 'text-cyan-400'}`}>Verify Protocol</h2>
                  <X className="cursor-pointer text-slate-500 hover:text-white" onClick={() => { setCurrentView('landing'); setSelectedRole(null); }} />
                </div>
                <form onSubmit={handleAuthSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-2"><User size={12}/> Name</label>
                    <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-white/40 text-white" placeholder="Enter Full Name..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-2"><Mail size={12}/> Mail ID</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-white/40 text-white" placeholder="user@bridge.com" />
                  </div>
                  <button type="submit" className={`w-full py-5 font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg ${selectedRole === 'seller' ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-cyan-500 hover:bg-cyan-400 text-black'}`}>
                    Establish Bridge
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* --- DASHBOARD VIEW --- */}
          {currentView === 'dashboard' && (
            <motion.div 
              key="dash" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="p-8 md:p-16 h-screen overflow-y-auto"
            >
              <header className="flex justify-between items-center mb-16 border-b border-white/10 pb-8">
                <div>
                  <h1 className="font-bold text-2xl uppercase tracking-tighter">{selectedRole}_BRIDGE_v1.0</h1>
                  <p className="text-[10px] text-slate-500 uppercase mt-1 tracking-widest text-cyan-400/60">Node Active // Secure Handshake</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{formData.name}</p>
                  <button onClick={() => { setCurrentView('landing'); setSelectedRole(null); }} className="text-red-500 text-[10px] uppercase font-bold hover:underline">Terminate Session</button>
                </div>
              </header>
              <div className={`p-10 border bg-black/40 rounded-3xl backdrop-blur-md max-w-md ${selectedRole === 'seller' ? 'border-red-500/30 shadow-red-500/10' : 'border-cyan-500/30 shadow-cyan-500/10'}`}>
                <Shield className={selectedRole === 'seller' ? 'text-red-500' : 'text-cyan-500'} size={40} />
                <h4 className="mt-6 font-bold text-xl text-white uppercase tracking-widest">Integrity Verified</h4>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed">Cryptographic link established for {formData.email}. Access to the {selectedRole} vault has been granted for user 24BCE1363.</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
