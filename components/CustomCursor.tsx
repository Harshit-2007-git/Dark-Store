'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Transform, Vec3, Color, Polyline } from 'ogl';
import { useUser } from '@/lib/user-context';

interface CustomCursorProps {
  baseSpring?: number;
  baseFriction?: number;
  baseThickness?: number;
  pointCount?: number;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  baseSpring = 0.05,
  baseFriction = 0.8,
  baseThickness = 25,
  pointCount = 40,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  // THEME LOGIC: Blue for Buyers, Red for Sellers
  const ribbonColor = user?.role === 'seller' ? "#ef4444" : "#06b6d4";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ dpr: window.devicePixelRatio || 2, alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    // Styling the canvas to be a global overlay
    gl.canvas.style.position = 'fixed';
    gl.canvas.style.top = '0';
    gl.canvas.style.left = '0';
    gl.canvas.style.width = '100vw';
    gl.canvas.style.height = '100vh';
    gl.canvas.style.pointerEvents = 'none'; 
    gl.canvas.style.zIndex = '9999';
    container.appendChild(gl.canvas);

    const scene = new Transform();
    const lines: any[] = [];

    const vertex = `
      precision highp float;
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      varying vec2 vUV;
      void main() {
          vUV = uv;
          vec4 current = vec4(position, 1.0);
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
          vec2 nextScreen = next.xy * aspect;
          vec2 prevScreen = prev.xy * aspect;
          vec2 tangent = normalize(nextScreen - prevScreen);
          vec2 normal = vec2(-tangent.y, tangent.x) / aspect;
          normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
          normal *= uThickness * (1.0 / (uResolution.y / uDPR));
          current.xy -= normal * side;
          gl_Position = current;
      }
    `;

    const fragment = `
      precision highp float;
      uniform vec3 uColor;
      varying vec2 vUV;
      void main() {
          float fade = 1.0 - smoothstep(0.0, 1.0, vUV.y);
          gl_FragColor = vec4(uColor, fade * 0.8);
      }
    `;

    function resize() {
      if (!container) return;
      renderer.setSize(window.innerWidth, window.innerHeight);
      lines.forEach(line => line.polyline.resize());
    }
    window.addEventListener('resize', resize);

    const line = {
      spring: baseSpring,
      friction: baseFriction,
      mouseVelocity: new Vec3(),
      points: Array.from({ length: pointCount }, () => new Vec3()),
      polyline: {} as any
    };

    line.polyline = new Polyline(gl, {
      points: line.points,
      vertex,
      fragment,
      uniforms: {
        uColor: { value: new Color(ribbonColor) },
        uThickness: { value: baseThickness },
      }
    });
    line.polyline.mesh.setParent(scene);
    lines.push(line);

    const mouse = new Vec3();
    const updateMouse = (e: MouseEvent) => {
      mouse.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * -2 + 1, 0);
    };
    window.addEventListener('mousemove', updateMouse);

    let frameId: number;
    const update = () => {
      frameId = requestAnimationFrame(update);
      lines.forEach(l => {
        const tmp = new Vec3().copy(mouse).sub(l.points[0]).multiply(l.spring);
        l.mouseVelocity.add(tmp).multiply(l.friction);
        l.points[0].add(l.mouseVelocity);
        for (let i = 1; i < l.points.length; i++) {
          l.points[i].lerp(l.points[i - 1], 0.15);
        }
        l.polyline.updateGeometry();
      });
      renderer.render({ scene });
    };
    update();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', updateMouse);
      cancelAnimationFrame(frameId);
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
    };
  }, [ribbonColor]);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
};

export default CustomCursor;
