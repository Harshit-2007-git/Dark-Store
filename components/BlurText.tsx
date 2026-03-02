'use client';
import { motion } from 'framer-motion';

export default function BlurText({ text, delay = 0, animateBy = 'words', direction = 'top', className = "" }: any) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <p className={className}>
      {elements.map((el: string, i: number) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: direction === 'top' ? -20 : 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: (delay / 1000) + (i * 0.1),
            ease: "easeOut"
          }}
          className="inline-block whitespace-pre"
        >
          {el}{animateBy === 'words' ? '\u00A0' : ''}
        </motion.span>
      ))}
    </p>
  );
}
