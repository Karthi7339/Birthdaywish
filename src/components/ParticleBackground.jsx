import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle colors matching palette
    const colors = [
      'rgba(247, 200, 216, 0.45)', // Primary rose
      'rgba(250, 217, 193, 0.45)', // Secondary peach
      'rgba(217, 184, 232, 0.4)',  // Accent lavender
      'rgba(214, 168, 95, 0.35)',  // Highlight gold
      'rgba(255, 255, 255, 0.6)',  // Soft white
    ];

    // Create particles
    const particleCount = Math.min(Math.floor(window.innerWidth / 25), 45);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.2, // Slow upward drift
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
        isSparkle: Math.random() > 0.65,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(time + p.pulseOffset));

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));

        if (p.isSparkle) {
          // Draw a small 4-point golden star sparkle
          const r = p.radius * 1.5;
          ctx.translate(p.x, p.y);
          ctx.rotate(time * 0.5);
          ctx.fillStyle = '#D6A85F';
          ctx.beginPath();
          ctx.moveTo(0, -r * 2);
          ctx.quadraticCurveTo(0, 0, r * 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, r * 2);
          ctx.quadraticCurveTo(0, 0, -r * 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, -r * 2);
          ctx.fill();
        } else {
          // Soft bokeh circle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
