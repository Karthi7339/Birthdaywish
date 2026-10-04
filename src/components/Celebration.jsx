import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Heart, RotateCcw, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';

export default function Celebration({ onReplay }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const hasTriggeredConfetti = useRef(false);

  const celebration = birthdayData.celebration;

  useEffect(() => {
    if (isInView && !hasTriggeredConfetti.current) {
      hasTriggeredConfetti.current = true;

      // Festive multi-angle confetti
      const end = Date.now() + 2 * 1000;
      const colors = ['#F7C8D8', '#FAD9C1', '#D9B8E8', '#D6A85F', '#FFFFFF'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [isInView]);

  // Balloons data with random floating properties
  const balloons = [
    { left: '8%', delay: '0s', duration: '14s', color: '#F7C8D8', size: 54 },
    { left: '22%', delay: '4s', duration: '16s', color: '#D9B8E8', size: 62 },
    { left: '40%', delay: '2s', duration: '13s', color: '#FAD9C1', size: 48 },
    { left: '65%', delay: '6s', duration: '15s', color: '#D6A85F', size: 58 },
    { left: '82%', delay: '1s', duration: '17s', color: '#F7C8D8', size: 66 },
    { left: '92%', delay: '5s', duration: '14s', color: '#D9B8E8', size: 52 },
  ];

  return (
    <section
      id="celebration"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '7rem 1.5rem 6rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Floating Pastel Balloons */}
      {balloons.map((b, i) => (
        <div
          key={i}
          className="floating-balloon"
          style={{
            left: b.left,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
        >
          {/* Balloon shape */}
          <div
            style={{
              width: b.size,
              height: b.size * 1.25,
              borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
              backgroundColor: b.color,
              boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.06), 0 8px 20px rgba(59,48,53,0.08)',
              position: 'relative',
              opacity: 0.85,
            }}
          >
            {/* Balloon knot */}
            <div
              style={{
                position: 'absolute',
                bottom: '-5px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '6px',
                height: '5px',
                backgroundColor: b.color,
                borderRadius: '2px',
              }}
            />
            {/* String */}
            <div
              style={{
                position: 'absolute',
                bottom: '-45px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '1px',
                height: '40px',
                backgroundColor: 'rgba(59, 48, 53, 0.25)',
              }}
            />
          </div>
        </div>
      ))}

      <div className="container" style={{ maxWidth: '850px', position: 'relative', zIndex: 10 }}>
        {/* Celebration Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.3rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(214, 168, 95, 0.4)',
            boxShadow: 'var(--shadow-gold)',
            marginBottom: '1.75rem',
          }}
        >
          <PartyPopper size={18} color="#D6A85F" />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#8C4770',
            }}
          >
            Cheers To You
          </span>
          <PartyPopper size={18} color="#D6A85F" />
        </motion.div>

        {/* Main Celebration Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#3B3035',
            marginBottom: '1rem',
          }}
        >
          {celebration.headline}
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.15rem, 3vw, 1.6rem)',
            color: '#72626A',
            maxWidth: '680px',
            margin: '0 auto 3rem auto',
            lineHeight: 1.6,
          }}
        >
          "{celebration.subheadline}"
        </motion.p>

        {/* 3 Wishes Cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '540px',
            margin: '0 auto 3.5rem auto',
          }}
        >
          {celebration.wishes.map((wish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
              className="glass-card"
              style={{
                padding: '1.15rem 1.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                border: '1px solid rgba(214, 168, 95, 0.3)',
              }}
            >
              <Heart size={16} color="#D6A85F" fill="#D6A85F" />
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
                  fontWeight: 600,
                  color: '#3B3035',
                }}
              >
                {wish}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Final Golden Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ marginBottom: '4rem' }}
        >
          <p
            className="font-script"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              color: '#8C4770',
              fontWeight: 700,
            }}
          >
            {celebration.finalQuote}
          </p>
        </motion.div>

        {/* Replay Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            borderTop: '1px solid rgba(214, 168, 95, 0.25)',
            paddingTop: '2.5rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              color: '#72626A',
              marginBottom: '1rem',
              letterSpacing: '0.5px',
            }}
          >
            Want to experience it again?
          </p>

          <button
            onClick={onReplay}
            className="btn-primary"
            id="replay-btn"
            aria-label="Replay the birthday surprise"
            style={{
              padding: '0.9rem 2.2rem',
              fontSize: '1rem',
            }}
          >
            <RotateCcw size={18} />
            <span>{celebration.replayButton}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
