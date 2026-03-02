'use client';

import React, { useEffect, useRef } from 'react';

interface Line {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  angle: number;
  opacity: number;
  hovered: boolean;
}

export function FloatingLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<Line[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize lines
    const generateLines = () => {
      const lines: Line[] = [];
      for (let i = 0; i < 15; i++) {
        lines.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          length: 80 + Math.random() * 120,
          angle: Math.random() * Math.PI * 2,
          opacity: 0.3 + Math.random() * 0.4,
          hovered: false,
        });
      }
      return lines;
    };

    linesRef.current = generateLines();

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Check hover proximity
      linesRef.current.forEach((line) => {
        const dx = mouseRef.current.x - line.x;
        const dy = mouseRef.current.y - line.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        line.hovered = distance < 150;
      });
    };

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(8, 25, 41, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      linesRef.current.forEach((line) => {
        // Update position
        line.x += line.vx;
        line.y += line.vy;

        // Bounce off walls
        if (line.x < 0 || line.x > canvas.width) line.vx *= -1;
        if (line.y < 0 || line.y > canvas.height) line.vy *= -1;

        // Keep in bounds
        line.x = Math.max(0, Math.min(canvas.width, line.x));
        line.y = Math.max(0, Math.min(canvas.height, line.y));

        // Rotate slightly
        line.angle += 0.01;

        // Increase opacity when hovered
        if (line.hovered) {
          line.opacity = Math.min(1, line.opacity + 0.05);
        } else {
          line.opacity = Math.max(0.3, line.opacity - 0.02);
        }

        // Draw line
        ctx.save();
        ctx.translate(line.x, line.y);
        ctx.rotate(line.angle);
        ctx.globalAlpha = line.opacity;

        const gradient = ctx.createLinearGradient(-line.length / 2, 0, line.length / 2, 0);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
        gradient.addColorStop(0.5, line.hovered ? 'rgba(0, 255, 255, 0.8)' : 'rgba(0, 255, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = line.hovered ? 3 : 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-line.length / 2, 0);
        ctx.lineTo(line.length / 2, 0);
        ctx.stroke();

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
}
