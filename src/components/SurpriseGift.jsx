import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, Check, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';

export default function SurpriseGift({ onSurpriseUnlocked }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const surprise = birthdayData.surprise;

  const handleOpenGift = () => {
    if (isOpen) return;

    // Trigger wiggle shake first
    setIsShaking(true);

    setTimeout(() => {
      setIsShaking(false);
      setIsOpen(true);

      if (onSurpriseUnlocked) {
        onSurpriseUnlocked();
      }

      // Spectacular golden & pastel confetti explosion
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D6A85F', '#F7C8D8', '#FAD9C1', '#D9B8E8', '#FFFFFF'],
        ticks: 250,
        gravity: 0.7,
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 120,
          origin: { y: 0.55 },
          colors: ['#D6A85F', '#FFE082', '#FFD54F'],
        });
      }, 300);
    }, 600);
  };

  return (
    <section
      id="surprise"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ maxWidth: '850px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1.2rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(214, 168, 95, 0.3)',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '1.25rem',
              }}
            >
              <Sparkles size={16} color="#D6A85F" />
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
                Mystery Box
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: 700,
                color: '#3B3035',
                lineHeight: 1.2,
                marginBottom: '0.75rem',
              }}
            >
              {surprise.preTitle}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.15rem, 3vw, 1.6rem)',
                color: '#72626A',
              }}
            >
              "{surprise.title}"
            </p>
          </motion.div>
        </div>

        {/* Gift Box Area */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!isOpen ? (
            /* Unopened Gift Box */
            <div style={{ position: 'relative', textAlign: 'center' }}>
              {/* Radial Aura Glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-40px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(214, 168, 95, 0.35) 0%, rgba(247, 200, 216, 0.2) 50%, transparent 70%)',
                  filter: 'blur(30px)',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />

              <motion.div
                animate={
                  isShaking
                    ? {
                        rotate: [-6, 6, -8, 8, -4, 4, 0],
                        scale: [1, 1.05, 0.98, 1.06, 1],
                      }
                    : {
                        y: [0, -8, 0],
                      }
                }
                transition={
                  isShaking
                    ? { duration: 0.6 }
                    : { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }
                }
                whileHover={{ scale: 1.04 }}
                onClick={handleOpenGift}
                style={{
                  position: 'relative',
                  width: 'clamp(200px, 30vw, 260px)',
                  height: 'clamp(200px, 30vw, 260px)',
                  cursor: 'pointer',
                  zIndex: 1,
                  margin: '0 auto',
                }}
              >
                {/* Gift Lid */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '-5%',
                    width: '110%',
                    height: '28%',
                    backgroundColor: '#FAD9C1',
                    borderRadius: '16px 16px 6px 6px',
                    boxShadow: '0 8px 20px rgba(59,48,53,0.12)',
                    border: '2px solid rgba(214, 168, 95, 0.4)',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Ribbon on lid */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '26px',
                      height: '100%',
                      backgroundColor: '#D6A85F',
                      boxShadow: '0 0 8px rgba(214,168,95,0.4)',
                    }}
                  />
                  {/* Bow on top */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '24px',
                        borderRadius: '50% 50% 0 50%',
                        border: '4px solid #D6A85F',
                        transform: 'rotate(-25deg)',
                        backgroundColor: 'rgba(214,168,95,0.2)',
                      }}
                    />
                    <div
                      style={{
                        width: '32px',
                        height: '24px',
                        borderRadius: '50% 50% 50% 0',
                        border: '4px solid #D6A85F',
                        transform: 'rotate(25deg)',
                        backgroundColor: 'rgba(214,168,95,0.2)',
                      }}
                    />
                  </div>
                </div>

                {/* Gift Body */}
                <div
                  style={{
                    position: 'absolute',
                    top: '24%',
                    left: 0,
                    width: '100%',
                    height: '76%',
                    backgroundColor: '#F7C8D8',
                    backgroundImage: 'linear-gradient(135deg, #F7C8D8 0%, #D9B8E8 100%)',
                    borderRadius: '0 0 20px 20px',
                    border: '2px solid rgba(214, 168, 95, 0.4)',
                    borderTop: 'none',
                    boxShadow: '0 16px 36px rgba(59, 48, 53, 0.15)',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {/* Vertical Ribbon */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '26px',
                      height: '100%',
                      backgroundColor: '#D6A85F',
                      boxShadow: '0 0 8px rgba(214,168,95,0.4)',
                    }}
                  />
                  {/* Horizontal Ribbon */}
                  <div
                    style={{
                      position: 'absolute',
                      height: '26px',
                      width: '100%',
                      backgroundColor: '#D6A85F',
                      boxShadow: '0 0 8px rgba(214,168,95,0.4)',
                    }}
                  />
                </div>
              </motion.div>

              {/* Prompt Text & Button */}
              <div style={{ marginTop: '2.5rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: '#72626A',
                    marginBottom: '1.25rem',
                  }}
                >
                  {surprise.boxPrompt}
                </p>

                <button
                  onClick={handleOpenGift}
                  className="btn-primary"
                  id="open-gift-btn"
                  aria-label="Open the gift surprise"
                  disabled={isShaking}
                  style={{
                    fontSize: '1.1rem',
                    padding: '1rem 2.5rem',
                  }}
                >
                  <Gift size={20} />
                  <span>{isShaking ? 'Unwrapping...' : 'Open It 🎁'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Unlocked Surprise Voucher Card */
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                maxWidth: '640px',
              }}
            >
              <div
                className="glass-card"
                style={{
                  padding: 'clamp(2rem, 5vw, 3rem)',
                  border: '2px solid rgba(214, 168, 95, 0.6)',
                  boxShadow: '0 20px 60px rgba(214, 168, 95, 0.25), 0 8px 24px rgba(59, 48, 53, 0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                  textAlign: 'center',
                }}
              >
                {/* Decorative golden corner stars */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  <Star size={18} color="#D6A85F" fill="#D6A85F" />
                </div>
                <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                  <Star size={18} color="#D6A85F" fill="#D6A85F" />
                </div>

                {/* Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.3rem 1rem',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(214, 168, 95, 0.2)',
                    border: '1px solid rgba(214, 168, 95, 0.4)',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Sparkles size={14} color="#D6A85F" />
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#8C4770',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                    }}
                  >
                    VIP Birthday Gift
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                    fontWeight: 700,
                    color: '#3B3035',
                    marginBottom: '0.5rem',
                  }}
                >
                  {surprise.giftTitle}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: '#D6A85F',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    marginBottom: '2rem',
                  }}
                >
                  {surprise.giftSubtitle}
                </p>

                {/* Perks Checklist */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.9rem',
                    textAlign: 'left',
                    backgroundColor: 'rgba(255, 255, 255, 0.65)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(214, 168, 95, 0.2)',
                    marginBottom: '2rem',
                  }}
                >
                  {surprise.giftPerks.map((perk, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.95rem',
                        color: '#3B3035',
                        lineHeight: 1.5,
                      }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          backgroundColor: '#F7C8D8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        <Check size={12} color="#8C4770" strokeWidth={3} />
                      </div>
                      <span>{perk}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Secret Blessing */}
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: '1.05rem',
                    color: '#72626A',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                  }}
                >
                  "{surprise.secretWish}"
                </p>

                {/* Re-pack option */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary"
                  aria-label="Re-box surprise gift"
                >
                  Pack gift back in box 🎁
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
