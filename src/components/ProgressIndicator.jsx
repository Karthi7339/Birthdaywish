import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'intro', label: '01', title: 'Hello' },
  { id: 'memories', label: '02', title: 'Memories' },
  { id: 'gallery', label: '03', title: 'Moments' },
  { id: 'message', label: '04', title: 'Letter' },
  { id: 'surprise', label: '05', title: 'Surprise' },
  { id: 'celebration', label: '06', title: 'Celebrate' },
];

export default function ProgressIndicator({ activeSection = 'intro' }) {
  const [current, setCurrent] = useState(activeSection);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setCurrent(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Floating Side Indicator */}
      <nav
        aria-label="Progress navigation"
        className="hidden md:flex"
        style={{
          position: 'fixed',
          right: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 90,
          flexDirection: 'column',
          gap: '1rem',
          pointerEvents: 'auto',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(214, 168, 95, 0.25)',
            borderRadius: '9999px',
            padding: '0.85rem 0.65rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            alignItems: 'center',
          }}
        >
          {sections.map((s) => {
            const isActive = current === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                title={`${s.label} — ${s.title}`}
                aria-label={`Scroll to ${s.title}`}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.2rem',
                  position: 'relative',
                }}
              >
                <motion.div
                  animate={{
                    width: isActive ? 22 : 8,
                    height: 8,
                    backgroundColor: isActive ? '#D6A85F' : 'rgba(59, 48, 53, 0.25)',
                    borderRadius: 4,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Top Minimal Progress Bar */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          top: '0.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 90,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(214, 168, 95, 0.25)',
          borderRadius: '9999px',
          padding: '0.35rem 0.85rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-sans)',
          color: '#3B3035',
        }}
      >
        <span style={{ fontWeight: 600, color: '#D6A85F' }}>
          {sections.find((s) => s.id === current)?.label || '01'}
        </span>
        <span style={{ color: 'rgba(59, 48, 53, 0.3)' }}>—</span>
        <span style={{ fontWeight: 500, letterSpacing: '0.5px' }}>
          {sections.find((s) => s.id === current)?.title || 'Surprise'}
        </span>
      </div>
    </>
  );
}
