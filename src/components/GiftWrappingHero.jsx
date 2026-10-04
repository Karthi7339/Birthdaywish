import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, Heart, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';

export default function GiftWrappingHero({ onUnwrapComplete }) {
  const [isUnwrapping, setIsUnwrapping] = useState(false);
  const [isUnwrapped, setIsUnwrapped] = useState(false);

  const handleUnwrap = () => {
    if (isUnwrapping || isUnwrapped) return;

    setIsUnwrapping(true);

    // Initial celebratory confetti burst
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#D6A85F', '#F7C8D8', '#FAD9C1', '#D9B8E8', '#FFFFFF'],
    });

    // Secondary burst as paper parts open
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 120,
        origin: { y: 0.45 },
        colors: ['#FFE082', '#D6A85F', '#FF80AB'],
      });
    }, 400);

    // Complete unwrapping and reveal website
    setTimeout(() => {
      setIsUnwrapped(true);
      if (onUnwrapComplete) {
        onUnwrapComplete();
      }
    }, 1200);
  };

  if (isUnwrapped) return null;

  return (
    <AnimatePresence>
      {!isUnwrapped && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9992,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* LEFT WRAPPING PANEL */}
          <motion.div
            animate={
              isUnwrapping
                ? {
                    x: '-100%',
                    rotateY: -25,
                    opacity: 0,
                    transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
                  }
                : { x: 0, opacity: 1 }
            }
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: '50.5%',
              background: 'radial-gradient(circle at 70% 50%, #FDE2EA 0%, #F7C8D8 50%, #E8B4C8 100%)',
              backgroundImage: `
                radial-gradient(circle at 70% 50%, #FDE2EA 0%, #F7C8D8 50%, #E8B4C8 100%),
                repeating-linear-gradient(45deg, rgba(214, 168, 95, 0.08) 0px, rgba(214, 168, 95, 0.08) 12px, transparent 12px, transparent 24px)
              `,
              boxShadow: 'inset -8px 0 24px rgba(59, 48, 53, 0.15)',
              transformOrigin: 'left center',
              zIndex: 1,
            }}
          />

          {/* RIGHT WRAPPING PANEL */}
          <motion.div
            animate={
              isUnwrapping
                ? {
                    x: '100%',
                    rotateY: 25,
                    opacity: 0,
                    transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
                  }
                : { x: 0, opacity: 1 }
            }
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: '50.5%',
              background: 'radial-gradient(circle at 30% 50%, #FDE2EA 0%, #F7C8D8 50%, #E8B4C8 100%)',
              backgroundImage: `
                radial-gradient(circle at 30% 50%, #FDE2EA 0%, #F7C8D8 50%, #E8B4C8 100%),
                repeating-linear-gradient(-45deg, rgba(214, 168, 95, 0.08) 0px, rgba(214, 168, 95, 0.08) 12px, transparent 12px, transparent 24px)
              `,
              boxShadow: 'inset 8px 0 24px rgba(59, 48, 53, 0.15)',
              transformOrigin: 'right center',
              zIndex: 1,
            }}
          />

          {/* VERTICAL GOLD SATIN RIBBON */}
          <motion.div
            animate={
              isUnwrapping
                ? {
                    scaleY: 0,
                    opacity: 0,
                    transition: { duration: 0.6, ease: 'easeInOut' },
                  }
                : { scaleY: 1, opacity: 1 }
            }
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: 'clamp(44px, 5.5vw, 68px)',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(90deg, #B88537 0%, #E5BE75 30%, #FFF2CC 50%, #E5BE75 70%, #9C6B28 100%)',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.25), inset 0 0 10px rgba(255, 255, 255, 0.5)',
              zIndex: 2,
              transformOrigin: 'center center',
            }}
          />

          {/* HORIZONTAL GOLD SATIN RIBBON */}
          <motion.div
            animate={
              isUnwrapping
                ? {
                    scaleX: 0,
                    opacity: 0,
                    transition: { duration: 0.6, ease: 'easeInOut' },
                  }
                : { scaleX: 1, opacity: 1 }
            }
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '50%',
              height: 'clamp(44px, 5.5vw, 68px)',
              transform: 'translateY(-50%)',
              background: 'linear-gradient(180deg, #B88537 0%, #E5BE75 30%, #FFF2CC 50%, #E5BE75 70%, #9C6B28 100%)',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.25), inset 0 0 10px rgba(255, 255, 255, 0.5)',
              zIndex: 2,
              transformOrigin: 'center center',
            }}
          />

          {/* RADIANT BURST OF LIGHT BEHIND BOW WHEN UNWRAPPING */}
          {isUnwrapping && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2.5, 4], opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 248, 220, 1) 0%, rgba(214, 168, 95, 0.8) 40%, transparent 70%)',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            />
          )}

          {/* CENTER BOW & GIFT TAG */}
          <motion.div
            animate={
              isUnwrapping
                ? {
                    scale: [1, 1.2, 0],
                    rotate: [0, -10, 20],
                    opacity: [1, 1, 0],
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                  }
                : {
                    scale: [1, 1.03, 1],
                    transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
                  }
            }
            style={{
              position: 'relative',
              zIndex: 15,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '1.5rem',
            }}
          >
            {/* 3D Gold Ribbon Bow */}
            <div
              onClick={handleUnwrap}
              style={{
                position: 'relative',
                width: 130,
                height: 90,
                cursor: 'pointer',
                marginBottom: '1.25rem',
                filter: 'drop-shadow(0 12px 24px rgba(59, 48, 53, 0.35))',
              }}
              title="Click bow to unwrap!"
            >
              {/* Left Bow Loop */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 8,
                  width: 58,
                  height: 54,
                  borderRadius: '50% 50% 10% 50%',
                  background: 'linear-gradient(135deg, #FFF2CC 0%, #D6A85F 45%, #9C6B28 100%)',
                  transform: 'rotate(-25deg)',
                  boxShadow: 'inset 0 0 10px rgba(255,255,255,0.7)',
                }}
              />
              {/* Right Bow Loop */}
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 8,
                  width: 58,
                  height: 54,
                  borderRadius: '50% 50% 50% 10%',
                  background: 'linear-gradient(225deg, #FFF2CC 0%, #D6A85F 45%, #9C6B28 100%)',
                  transform: 'rotate(25deg)',
                  boxShadow: 'inset 0 0 10px rgba(255,255,255,0.7)',
                }}
              />
              {/* Center Bow Knot */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 36,
                  height: 38,
                  borderRadius: '12px',
                  background: 'radial-gradient(circle at 35% 35%, #FFF2CC, #D6A85F, #8A5B1E)',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                  zIndex: 3,
                }}
              />
              {/* Ribbon Tails */}
              <div
                style={{
                  position: 'absolute',
                  bottom: -18,
                  left: 32,
                  width: 28,
                  height: 48,
                  background: 'linear-gradient(to bottom, #D6A85F, #9C6B28)',
                  transform: 'rotate(-18deg)',
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: -18,
                  right: 32,
                  width: 28,
                  height: 48,
                  background: 'linear-gradient(to bottom, #D6A85F, #9C6B28)',
                  transform: 'rotate(18deg)',
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)',
                }}
              />
            </div>

            {/* Luxurious Gift Tag Card */}
            <div
              style={{
                maxWidth: 420,
                width: '100%',
                backgroundColor: '#FFFDF9',
                borderRadius: '24px',
                padding: '2rem 1.75rem',
                border: '2px solid rgba(214, 168, 95, 0.6)',
                boxShadow: '0 20px 50px rgba(59, 48, 53, 0.25), 0 0 35px rgba(247, 200, 216, 0.5)',
                position: 'relative',
              }}
            >
              {/* Golden Hole Punch on Gift Tag */}
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #D6A85F, #8A5B1E)',
                  margin: '0 auto 1rem auto',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                }}
              />

              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  color: '#8C4770',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                ✦ Special Birthday Delivery ✦
              </span>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.75rem, 5vw, 2.3rem)',
                  fontWeight: 800,
                  color: '#3B3035',
                  lineHeight: 1.2,
                  marginBottom: '0.35rem',
                }}
              >
                For: <span className="rose-gradient-text">{birthdayData.name}</span>
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#D6A85F',
                  marginBottom: '1rem',
                }}
              >
                ({birthdayData.nickname})
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  color: '#72626A',
                  lineHeight: 1.5,
                  marginBottom: '1.75rem',
                }}
              >
                From your brother <strong>Karthi 🤍</strong>
                <br />
                A personalized surprise filled with memories & love.
              </p>

              {/* Interactive Unwrap CTA Button */}
              <button
                onClick={handleUnwrap}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(214, 168, 95, 0.45)',
                }}
                aria-label="Unwrap birthday gift surprise"
              >
                <Gift size={22} />
                <span>{isUnwrapping ? 'Unwrapping Decoration...' : 'Unwrap Your Surprise 🎁'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
