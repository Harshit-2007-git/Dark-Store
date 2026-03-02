'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, ArrowRight, Lock, ShoppingCart, X, User, Mail, Shield } from 'lucide-react';

// --- 1. INTERNAL COMPONENT: GRADIENT BLINDS ---
const GradientBlinds = ({ role }: { role: 'buyer' | 'seller' | null }) => {
  // Determine colors based on the role state
  const colors = 
    role === 'seller' ? ['#7f1d1d', '#450a0a'] : // Deep Red
    role === 'buyer' ? ['#00f3ff', '#083344'] :  // Cyan Blue
    ['#1e293b', '#020617'];                     // Default Dark Slate

  return (
    <div className="absolute inset-0 flex overflow-hidden">
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div
          key={i}
          className="h-full flex-1"
          initial={false}
          animate={{ 
            background: `linear-gradient(to bottom, ${colors[0]}, ${colors[1]})`,
            scaleY: 1,
            opacity: 1 
          }}
          transition={{ duration: 0.8, delay: i * 0.02, ease: "circOut" }}
          style={{
            transformOrigin: i % 2 === 0 ? 'top' : 'bottom',
            filter: 'brightness(0.7) contrast(1.2)',
          }}
        />
      ))}
    </div>
  );
};

// --- 2. INTERNAL COMPONENT: BLUR TEXT ---
const BlurText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <p className={className}>
      {text.split(' ').map((word, i) => (
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
    <main className="min-h-screen text-slate-100 font-mono relative overflow-hidden bg-black">
      
      {/* BACKGROUND LAYER - NO BACKGROUND COLOR HERE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GradientBlinds role={selectedRole} />
        {/* The Black Overlay - Reduced opacity to 40% so colors are VERY visible */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full bg-transparent">
        <AnimatePresence mode="wait">
          
          {/* LANDING VIEW */}
          {currentView === 'landing' && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                import Ribbons from './Ribbons';

<div style={{ height: '500px', position: 'relative', overflow: 'hidden'}}>
  <Ribbons
    baseThickness={30}
    colors={["#5227FF"]}
    speedMultiplier={0.5}
    maxAge={500}
    enableFade={false}
    enableShaderEffect={false}
  />
</div>
                <BlurText text="Dark Store Bridge" className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter" />
                <p className="text-slate-300 max-w-xl mb-12 uppercase tracking-[0.5em] text-[10px]">Registry: 24BCE1363 // Local Grid</p>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-white/40"><ChevronDown /></motion.div>
              </section>

              <section className="min-h-screen flex flex-col items-center justify-center px-4 pb-20">
                <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
                  
                  {/* Buyer Card */}
                  <motion.div 
                    onMouseEnter={() => setSelectedRole('buyer')} onMouseLeave={() => setSelectedRole(null)}
                    onClick={() => { setSelectedRole('buyer'); setCurrentView('auth'); }}
                    className="group relative p-10 bg-white/5 border border-white/10 hover:border-cyan-500 rounded-3xl cursor-pointer backdrop-blur-xl transition-all shadow-2xl"
                  >
                    <div className="p-4 bg-cyan-500/20 rounded-xl text-cyan-400 w-fit mb-6 shadow-[0_0_15px_rgba(6,182,212,0.3)]"><ShoppingCart size={32} /></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Buyer Portal</h3>
                    <p className="text-slate-400 text-sm">Access secure local inventory.</p>
                  </motion.div>

                  {/* Seller Card */}
                  <motion.div 
                    onMouseEnter={() => setSelectedRole('seller')} onMouseLeave={() => setSelectedRole(null)}
                    onClick={() => { setSelectedRole('seller'); setCurrentView('auth'); }}
                    className="group relative p-10 bg-white/5 border border-white/10 hover:border-red-500 rounded-3xl cursor-pointer backdrop-blur-xl transition-all shadow-2xl"
                  >
                    <div className="p-4 bg-red-500/20 rounded-xl text-red-500 w-fit mb-6 shadow-[0_0_15px_rgba(239,68,68,0.3)]"><Lock size={32} /></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Seller Vault</h3>
                    <p className="text-slate-400 text-sm">Manage encrypted digital assets.</p>
                  </motion.div>

                </div>
              </section>
            </motion.div>
          )}

          {/* AUTH VIEW */}
          {currentView === 'auth' && (
            <motion.div key="auth" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="min-h-screen flex items-center justify-center px-4">
              <div className={`w-full max-w-md p-10 rounded-3xl border backdrop-blur-3xl shadow-2xl ${selectedRole === 'seller' ? 'border-red-500 bg-red-950/20' : 'border-cyan-500 bg-cyan-950/20'}`}>
                <div className="flex justify-between items-center mb-10">
                  <h2 className={`text-xl font-bold uppercase ${selectedRole === 'seller' ? 'text-red-500' : 'text-cyan-400'}`}>Verify Protocol</h2>
                  <X className="cursor-pointer text-slate-500 hover:text-white" onClick={() => { setCurrentView('landing'); setSelectedRole(null); }} />
                </div>
                <form onSubmit={handleAuthSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-2"><User size={12}/> Subject Name</label>
                    <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-white/40" placeholder="Enter Name..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-2"><Mail size={12}/> Registry Email</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-white/40" placeholder="user@vit.edu" />
                  </div>
                  <button type="submit" className={`w-full py-5 font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg ${selectedRole === 'seller' ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-cyan-500 hover:bg-cyan-400 text-black'}`}>
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
                  <p className="text-[10px] text-slate-500 uppercase mt-1">Registry: 24BCE1363 // Node Active</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{formData.name}</p>
                  <button onClick={() => setCurrentView('landing')} className="text-red-500 text-[10px] uppercase font-bold hover:underline">Terminate</button>
                </div>
              </header>
              <div className={`p-10 border bg-black/40 rounded-3xl backdrop-blur-md max-w-md ${selectedRole === 'seller' ? 'border-red-500/30' : 'border-cyan-500/30'}`}>
                <Shield className={selectedRole === 'seller' ? 'text-red-500' : 'text-cyan-500'} size={40} />
                <h4 className="mt-6 font-bold text-xl text-white uppercase tracking-widest">Integrity Verified</h4>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed">Secure session established for {formData.email}. Unauthorized bridge access is now granted.</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
