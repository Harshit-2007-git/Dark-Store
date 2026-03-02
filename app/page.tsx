'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingLines } from '@/components/floating-lines';
import { SplitText } from '@/components/split-text';
import { useUser, type UserRole } from '@/lib/user-context';
import { ChevronDown, ShieldCheck, ArrowRight, Lock, ShoppingCart, X, User, Mail, Shield } from 'lucide-react';

// --- INTERNAL COMPONENT: BLUR TEXT ---
// This handles the specialized blurring entrance animation
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

// --- INTERNAL COMPONENT: CYBER BACKGROUND ---
// This creates the reactive grid and glowing orb background
const CyberBackground = ({ role }: { role: 'buyer' | 'seller' | null }) => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0A0A0B]">
      <div 
        className="absolute inset-0 opacity-[0.15] transition-colors duration-700"
        style={{
          backgroundImage: `linear-gradient(${role === 'seller' ? '#ef4444' : '#06b6d4'} 1px, transparent 1px), 
                            linear-gradient(90deg, ${role === 'seller' ? '#ef4444' : '#06b6d4'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          x: role === 'seller' ? 100 : role === 'buyer' ? -100 : 0,
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className={`absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-1000
          ${role === 'seller' ? 'bg-red-900/40' : role === 'buyer' ? 'bg-blue-900/40' : 'bg-slate-900/20'}`}
      />
    </div>
  );
};

export default function Home() {
  // --- STATE MANAGEMENT ---
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [mounted, setMounted] = useState(false);
  const { user } = useUser();

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // --- HANDLERS ---
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
    <main className="min-h-screen text-slate-200 font-mono relative selection:bg-cyan-500/30">
      <CyberBackground role={selectedRole} />
      <FloatingLines />

      <AnimatePresence mode="wait">
        
        {/* --- VIEW 1: LANDING & ROLE SELECTION --- */}
        {currentView === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
              <BlurText 
                text="Dark Store Bridge" 
                animateBy="letters" 
                className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter text-white" 
              />
              <motion.p 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
                className="text-slate-500 max-w-2xl mb-12 font-light"
              >
                Democratizing local commerce through secure, zero-maintenance digital storefronts.
              </motion.p>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-cyan-500/50">
                <ChevronDown />
                <p className="text-[10px] uppercase tracking-widest mt-2">Scroll to Authenticate</p>
              </motion.div>
            </section>

            <section className="min-h-screen flex flex-col items-center justify-center px-4 pb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white">Select Identity</h2>
              <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl relative">
                
                {/* Dynamic Scan Line Overlay (Based on Hover) */}
                <AnimatePresence>
                  {selectedRole && (
                    <motion.div 
                      key="scan" className="absolute inset-0 z-0 pointer-events-none rounded-2xl overflow-hidden"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    >
                      <motion.div 
                        className={`absolute inset-x-0 h-1 blur-sm ${selectedRole === 'buyer' ? 'bg-cyan-500 shadow-[0_0_15px_cyan]' : 'bg-red-500 shadow-[0_0_15px_red]'}`}
                        animate={{ y: ["-10%", "1100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buyer Card */}
                <motion.div 
                  onMouseEnter={() => setSelectedRole('buyer')} onMouseLeave={() => setSelectedRole(null)}
                  onClick={() => { setSelectedRole('buyer'); setCurrentView('auth'); }}
                  className="group relative p-10 bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 rounded-3xl cursor-pointer backdrop-blur-md transition-all"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-4 bg-cyan-500/10 rounded-xl text-cyan-400"><ShoppingCart size={32} /></div>
                    <ShieldCheck className="text-slate-700 group-hover:text-cyan-500 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Buyer Portal</h3>
                  <p className="text-slate-500 text-sm mb-8">Securely browse local inventory and initiate encrypted bridges.</p>
                  <div className="w-full py-3 bg-slate-800 text-slate-400 group-hover:bg-cyan-500 group-hover:text-black text-center font-bold rounded-lg transition-all">Establish Handshake</div>
                </motion.div>

                {/* Seller Card */}
                <motion.div 
                  onMouseEnter={() => setSelectedRole('seller')} onMouseLeave={() => setSelectedRole(null)}
                  onClick={() => { setSelectedRole('seller'); setCurrentView('auth'); }}
                  className="group relative p-10 bg-slate-900/40 border border-slate-800 hover:border-red-500/50 rounded-3xl cursor-pointer backdrop-blur-md transition-all"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-4 bg-red-500/10 rounded-xl text-red-500"><Lock size={32} /></div>
                    <ShieldCheck className="text-slate-700 group-hover:text-red-500 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Seller Vault</h3>
                  <p className="text-slate-500 text-sm mb-8">Manage inventory via Google Sheets and fulfill local orders.</p>
                  <div className="w-full py-3 bg-slate-800 text-slate-400 group-hover:bg-red-500 group-hover:text-black text-center font-bold rounded-lg transition-all">Access Dashboard</div>
                </motion.div>
              </div>
              <p className="mt-12 text-[10px] text-slate-700 uppercase tracking-widest">Registry ID: 24BCE1363</p>
            </section>
          </motion.div>
        )}

        {/* --- VIEW 2: DYNAMIC AUTH POP-UP (RED/BLUE) --- */}
        {currentView === 'auth' && (
          <motion.div key="auth" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="min-h-screen flex items-center justify-center px-4">
            <div className={`w-full max-w-md p-10 rounded-3xl border backdrop-blur-2xl relative shadow-2xl ${selectedRole === 'seller' ? 'border-red-500/30 bg-red-950/10' : 'border-cyan-500/30 bg-cyan-950/10'}`}>
              <div className="flex justify-between items-center mb-10">
                <h2 className={`text-xl font-bold uppercase tracking-widest ${selectedRole === 'seller' ? 'text-red-500' : 'text-cyan-400'}`}>Handshake Protocol</h2>
                <X className="cursor-pointer text-slate-500" onClick={() => setCurrentView('landing')} />
              </div>
              <form onSubmit={handleAuthSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 uppercase flex items-center gap-2"><User size={12}/> Full Name</label>
                  <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-xl focus:outline-none focus:border-slate-600" placeholder="e.g. Harshit" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 uppercase flex items-center gap-2"><Mail size={12}/> Registry Email</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-xl focus:outline-none focus:border-slate-600" placeholder="user@bridge.com" />
                </div>
                <button className={`w-full py-5 font-bold uppercase tracking-widest ${selectedRole === 'seller' ? 'bg-red-600' : 'bg-cyan-500'} text-black rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}>
                  Establish Bridge <ArrowRight size={18}/>
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* --- VIEW 3: SECURE DASHBOARD --- */}
        {currentView === 'dashboard' && (
          <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 md:p-16">
            <nav className="flex justify-between items-center mb-16 border-b border-slate-800 pb-8">
              <div>
                <h1 className="font-bold text-2xl tracking-tighter uppercase">{selectedRole}_BRIDGE v1.0</h1>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">Secure Node // ID: 24BCE1363</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">{formData.name || 'Harshit'}</p>
                <button onClick={resetApp} className="text-[10px] text-red-500 hover:underline uppercase">Terminate Session</button>
              </div>
            </nav>
            <div className="grid md:grid-cols-3 gap-8">
               <div className={`p-8 border ${selectedRole === 'seller' ? 'border-red-500/20' : 'border-cyan-500/20'} bg-slate-900/40 rounded-3xl backdrop-blur-md`}>
                 <Shield className={selectedRole === 'seller' ? 'text-red-500' : 'text-cyan-500'} size={32} />
                 <h4 className="mt-6 font-bold text-lg text-white">System Integrity</h4>
                 <p className="mt-2 text-sm text-slate-500 leading-relaxed">Cryptographic handshake verified. You are now authorized to manage digital assets within the {selectedRole} protocols.</p>
               </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}
