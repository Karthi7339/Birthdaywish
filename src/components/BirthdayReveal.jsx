import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, ChevronDown, Cake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';

export default function BirthdayReveal({ onContinue }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const hasTriggeredConfetti = useRef(false);

  useEffect(() => {
    if (isInView && !hasTriggeredConfetti.current) {
      hasTriggeredConfetti.current = true;

      // Subtle, elegant confetti with curated soft colors
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#F7C8D8', '#FAD9C1', '#D9B8E8', '#D6A85F', '#FFFFFF'],
        ticks: 200,
        gravity: 0.8,
        scalar: 0.9,
      });

      // Secondary gentle burst after 400ms
      setTimeout(() => {
        confetti({
          particleCount: 35,
          angle: 60,
          spread: 55,
          origin: { x: 0.2, y: 0.6 },
          colors: ['#F7C8D8', '#D9B8E8', '#D6A85F'],
        });
        confetti({
          particleCount: 35,
          angle: 120,
          spread: 55,
          origin: { x: 0.8, y: 0.6 },
          colors: ['#FAD9C1', '#F7C8D8', '#D6A85F'],
        });
      }, 400);
    }
  }, [isInView]);

  const nameLetters = Array.from(birthdayData.name);

  return (
    <section
      id="reveal"
      ref={containerRef}
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '5rem 1.5rem',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Floating Cake / Sparkle Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '2px solid rgba(214, 168, 95, 0.4)',
            boxShadow: 'var(--shadow-gold)',
            marginBottom: '2rem',
          }}
        >
          <Cake size={36} color="#D6A85F" />
        </motion.div>

        {/* Happy Birthday Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '4px',
              color: '#8C4770',
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            {birthdayData.reveal.title}
          </span>
        </motion.div>

        {/* Big Name Reveal with Letter-by-letter stagger */}
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3.5rem, 11vw, 8rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.05em',
          }}
          aria-label={birthdayData.name}
        >
          {nameLetters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{
                duration: 0.7,
                delay: 0.6 + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="gold-gradient-text"
              style={{
                display: 'inline-block',
                textShadow: '0 4px 20px rgba(214, 168, 95, 0.25)',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        {/* Subtitle / Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.15rem, 3vw, 1.6rem)',
            color: '#72626A',
            maxWidth: '650px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.6,
            marginBottom: '3rem',
          }}
        >
          "{birthdayData.reveal.tagline}"
        </motion.p>

        {/* Scroll Indicator button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <button
            onClick={onContinue}
            id="reveal-continue-btn"
            aria-label="Continue to memories section"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#3B3035',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              fontWeight: 500,
              letterSpacing: '1px',
              padding: '0.5rem 1rem',
            }}
          >
            <span style={{ color: '#72626A' }}>{birthdayData.reveal.scrollPrompt}</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(214, 168, 95, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <ChevronDown size={20} color="#D6A85F" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
