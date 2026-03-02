'use client';
import { motion } from 'framer-motion';

export default function CyberBackground({ role }: { role: 'buyer' | 'seller' | null }) {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0A0A0B]">
      {/* Dynamic Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] transition-colors duration-700"
        style={{
          backgroundImage: `linear-gradient(${role === 'seller' ? '#ef4444' : '#3b82f6'} 1px, transparent 1px), 
                            linear-gradient(90deg, ${role === 'seller' ? '#ef4444' : '#3b82f6'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Reactive Glowing Orb */}
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
}
