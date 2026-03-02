'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoGridItemProps {
  children: React.ReactNode;
  className?: string;
  span?: 'small' | 'medium' | 'large' | 'full';
  delay?: number;
  hoverGlow?: boolean;
  color?: 'cyan' | 'magenta' | 'green';
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-max ${className}`}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  children,
  className = '',
  span = 'small',
  delay = 0,
  hoverGlow = true,
  color = 'cyan',
}: BentoGridItemProps) {
  const spanClasses = {
    small: 'lg:col-span-1 lg:row-span-1',
    medium: 'lg:col-span-2 lg:row-span-1',
    large: 'lg:col-span-2 lg:row-span-2',
    full: 'lg:col-span-4',
  };

  const glowColor = {
    cyan: 'hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]',
    magenta: 'hover:shadow-[0_0_30px_rgba(255,0,255,0.3)]',
    green: 'hover:shadow-[0_0_30px_rgba(0,255,100,0.3)]',
  };

  const borderColor = {
    cyan: 'border-cyan-500/30 hover:border-cyan-400',
    magenta: 'border-magenta-500/30 hover:border-magenta-400',
    green: 'border-green-500/30 hover:border-green-400',
  };

  return (
    <motion.div
      className={`${spanClasses[span]} col-span-1 md:col-span-2 lg:col-span-${span === 'large' ? '2' : span === 'medium' ? '2' : span === 'full' ? '4' : '1'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={hoverGlow ? { scale: 1.02 } : {}}
    >
      <div
        className={`h-full bg-slate-900/50 backdrop-blur border rounded-lg p-6 transition-all duration-300 ${borderColor[color]} ${glowColor[color]} ${className}`}
      >
        {children}
      </div>
    </motion.div>
  );
}
