'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CursorState {
  mouseX: number;
  mouseY: number;
  isHovering: boolean;
  elementBounds: DOMRect | null;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>({
    mouseX: 0,
    mouseY: 0,
    isHovering: false,
    elementBounds: null,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setState((prev) => ({
        ...prev,
        mouseX: e.clientX,
        mouseY: e.clientY,
      }));

      // Check if hovering over interactive element
      const element = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      const isInteractive =
        element &&
        (element.tagName === 'BUTTON' ||
          element.tagName === 'A' ||
          element.classList.contains('interactive') ||
          element.closest('button') ||
          element.closest('a'));

      if (isInteractive && element) {
        const bounds = element.getBoundingClientRect();
        setState((prev) => ({
          ...prev,
          isHovering: true,
          elementBounds: bounds,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          isHovering: false,
          elementBounds: null,
        }));
      }
    };

    const handleMouseLeave = () => {
      setState((prev) => ({
        ...prev,
        isHovering: false,
        elementBounds: null,
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const mainCursorSize = state.isHovering ? 40 : 24;
  const targetSize = state.isHovering && state.elementBounds ? 
    Math.max(state.elementBounds.width, state.elementBounds.height) + 20 : 0;

  return (
    <>
      {/* Hide default cursor */}
      <style>{`body { cursor: none; }`}</style>

      {/* Expanded target cursor when hovering */}
      {state.isHovering && state.elementBounds && (
        <motion.div
          ref={cursorRef}
          className="fixed pointer-events-none z-40 border border-magenta-400/40 rounded-sm"
          style={{
            width: targetSize,
            height: targetSize,
            left: state.elementBounds.left + state.elementBounds.width / 2 - targetSize / 2,
            top: state.elementBounds.top + state.elementBounds.height / 2 - targetSize / 2,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            boxShadow: [
              '0 0 20px rgba(255, 0, 255, 0.3)',
              '0 0 40px rgba(255, 0, 255, 0.5)',
              '0 0 20px rgba(255, 0, 255, 0.3)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      )}

      {/* Main crosshair cursor */}
      <motion.div
        className="fixed pointer-events-none z-40 flex items-center justify-center"
        style={{
          left: state.mouseX,
          top: state.mouseY,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: state.isHovering ? 1.2 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Crosshair */}
        <div className="relative flex items-center justify-center">
          {/* Vertical line */}
          <div
            className="absolute w-0.5 bg-gradient-to-b from-cyan-400/0 via-cyan-400 to-cyan-400/0"
            style={{ height: mainCursorSize }}
          />
          {/* Horizontal line */}
          <div
            className="absolute h-0.5 bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-cyan-400/0"
            style={{ width: mainCursorSize }}
          />
          {/* Center dot */}
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />

          {/* Corner markers */}
          {!state.isHovering && (
            <>
              <div className="absolute w-1 h-1 bg-magenta-400 rounded-full" style={{ top: -6, left: -6 }} />
              <div className="absolute w-1 h-1 bg-magenta-400 rounded-full" style={{ top: -6, right: -6 }} />
              <div className="absolute w-1 h-1 bg-magenta-400 rounded-full" style={{ bottom: -6, left: -6 }} />
              <div className="absolute w-1 h-1 bg-magenta-400 rounded-full" style={{ bottom: -6, right: -6 }} />
            </>
          )}
        </div>

        {/* Pulse ring */}
        <motion.div
          className="absolute w-full h-full border border-cyan-400/30 rounded-full pointer-events-none"
          animate={{
            scale: [1, 1.5],
            opacity: [1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          style={{
            width: mainCursorSize + 10,
            height: mainCursorSize + 10,
          }}
        />
      </motion.div>
    </>
  );
}
