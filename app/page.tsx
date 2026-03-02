'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingLines } from '@/components/floating-lines';
import { SplitText } from '@/components/split-text';
import { ChevronDown, ShieldCheck, ArrowRight, Lock, ShoppingCart, X, User, Mail, Package, Activity, Globe } from 'lucide-react';

export default function DarkStoreBridge() {
  // --- STATE MANAGEMENT ---
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'buyer-dash' | 'seller-dash'>('landing');
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // --- HANDLERS ---
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'buyer') setCurrentView('buyer-dash');
    else setCurrentView('seller-dash');
  };

  const resetApp = () => {
    setCurrentView('landing');
    setFormData({ name: '', email: '' });
  };

  return (
    <div className="bg-[#0A0A0B] text-slate-200 min-h-screen font-mono selection:bg-blue-500/30">
      <FloatingLines />
      
      <AnimatePresence mode="wait">
        
        {/* --- VIEW 1: APP OVERVIEW & LANDING --- */}
        {currentView === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
              <SplitText text="Dark Store Bridge" className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter" delay={0.2} />
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                className="text-slate-500 max-w-2xl mb-12 text-sm md:text-base leading-relaxed"
              >
                A zero-maintenance storefront turning Google Sheets into live, location-based catalogs. 
                Democratizing digital commerce for student entrepreneurs.
              </motion.p>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-slate-700">
                <ChevronDown />
                <p className="text-[10px] uppercase tracking-widest mt-2">Scroll to select role</p>
              </motion.div>
            </section>

            {/* Role Selection Section */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 pb-20">
              <h2 className="text-3xl font-bold mb-12 text-white">Identity Registry</h2>
              <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
                
                {/* Buyer Card (Blue) */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  onClick={() => { setSelectedRole('buyer'); setCurrentView('auth'); }}
                  className="group relative p-8 bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 rounded-2xl cursor-pointer overflow-hidden transition-all"
                >
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <ShoppingCart className="w-12 h-12 text-blue-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-2">Buyer Portal</h3>
                  <p className="text-slate-500 text-sm">Access neighborhood catalogs and initiate secure WhatsApp bridges.</p>
                  <div className="mt-8 py-2 border border-blue-500/30 text-blue-400 text-center text-xs uppercase tracking-widest group-hover:bg-blue-500 group-hover:text-black transition-all">Initialize Handshake</div>
                </motion.div>

                {/* Seller Card (Red) */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  onClick={() => { setSelectedRole('seller'); setCurrentView('auth'); }}
                  className="group relative p-8 bg-slate-900/40 border border-slate-800 hover:border-red-500/50 rounded-2xl cursor-pointer overflow-hidden transition-all"
                >
                  <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Lock className="w-12 h-12 text-red-500 mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-2">Seller Vault</h3>
                  <p className="text-slate-500 text-sm">Manage inventory and orders directly via Google Sheets.</p>
                  <div className="mt-8 py-2 border border-red-500/30 text-red-500 text-center text-xs uppercase tracking-widest group-hover:bg-red-500 group-hover:text-black transition-all">Open Dashboard</div>
                </motion.div>

              </div>
              <p className="mt-12 text-[10px] text-slate-700 uppercase tracking-widest">System ID: 24BCE1363</p>
            </section>
          </motion.div>
        )}

        {/* --- VIEW 2: DYNAMIC AUTH FORM (RED/BLUE) --- */}
        {currentView === 'auth' && (
          <motion.div key="auth" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="min-h-screen flex items-center justify-center px-4">
            <div className={`w-full max-w-md p-8 border rounded-2xl backdrop-blur-xl ${selectedRole === 'buyer' ? 'border-blue-500/30 bg-blue-950/10' : 'border-red-500/30 bg-red-950/10'}`}>
              <div className="flex justify-between items-center mb-8">
                <h2 className={`text-xl font-bold uppercase tracking-tighter ${selectedRole === 'buyer' ? 'text-blue-400' : 'text-red-500'}`}>
                  {selectedRole} Auth Protocol
                </h2>
                <button onClick={() => setCurrentView('landing')}><X className="text-slate-600 hover:text-white" /></button>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase text-slate-500 mb-2">Subject Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-600" />
                    <input 
                      required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-slate-600"
                      placeholder="e.g. Harshit"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-slate-500 mb-2">Registry Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-600" />
                    <input 
                      required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-slate-600"
                      placeholder="harshit@gmail.com"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest text-slate-950 transition-all ${selectedRole === 'buyer' ? 'bg-blue-500 hover:bg-blue-400' : 'bg-red-500 hover:bg-red-400'}`}
                >
                  Establish Bridge
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* --- VIEW 3: BUYER DASHBOARD (BLUE) --- */}
        {currentView === 'buyer-dash' && (
          <motion.div key="buyer-dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
            <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
              <div>
                <h1 className="text-xl font-bold">BUYER_PORTAL <span className="text-blue-500">v1.0</span></h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Active Session: {formData.name}</p>
              </div>
              <button onClick={resetApp} className="text-xs text-slate-500 hover:text-red-500 transition-colors">Terminate Session</button>
            </header>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 border border-slate-800 bg-slate-900/50 rounded-xl">
                  <div className="w-full h-32 bg-slate-800 rounded-lg mb-4 animate-pulse" />
                  <h3 className="font-bold mb-2 text-blue-400">Cyber Asset 0{i}</h3>
                  <p className="text-xs text-slate-500 mb-4">Secured API Endpoint with SHA-256 verification.</p>
                  <button className="w-full py-2 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded text-xs uppercase font-bold hover:bg-blue-500 hover:text-black">Request Bridge</button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- VIEW 4: SELLER DASHBOARD (RED) --- */}
        {currentView === 'seller-dash' && (
          <motion.div key="seller-dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
            <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
              <div>
                <h1 className="text-xl font-bold">SELLER_VAULT <span className="text-red-500">v1.0</span></h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Authenticated: {formData.name}</p>
              </div>
              <button onClick={resetApp} className="text-xs text-slate-500 hover:text-red-500 transition-colors">Logout Securely</button>
            </header>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="p-6 border border-dashed border-red-500/30 bg-red-500/5 rounded-xl flex flex-col items-center justify-center text-center">
                <Plus className="text-red-500 mb-2" />
                <span className="text-[10px] uppercase font-bold text-red-500">Add New Catalog</span>
              </div>
              {[1, 2].map((i) => (
                <div key={i} className="p-6 border border-slate-800 bg-slate-900/50 rounded-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 bg-red-500 text-black text-[8px] font-bold uppercase">Live</div>
                  <Package className="text-red-500 mb-4" />
                  <h3 className="font-bold text-white mb-1 text-sm">Design Assets v{i}</h3>
                  <p className="text-[10px] text-slate-500 uppercase mb-4">Synced: 2 mins ago</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1 bg-slate-800 rounded text-[10px] font-bold uppercase">Edit</button>
                    <button className="flex-1 py-1 bg-red-500/10 text-red-500 border border-red-500/30 rounded text-[10px] font-bold uppercase">Analytics</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// Minimal placeholder components for missing imports
function Plus(props: any) { return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" height="24" width="24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>; }
