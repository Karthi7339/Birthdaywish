import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function IntroScreen({ onStartJourney }) {
  return (
    <section
      id="intro"
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {/* Decorative ambient blurred glow spheres */}
      <div
        style={{
          position: 'absolute',
          width: 'clamp(280px, 45vw, 550px)',
          height: 'clamp(280px, 45vw, 550px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(247, 200, 216, 0.45) 0%, rgba(250, 217, 193, 0.25) 50%, transparent 75%)',
          filter: 'blur(45px)',
          top: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative' }}>
        {/* Subtle pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.2rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(214, 168, 95, 0.3)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '1.75rem',
          }}
        >
          <Sparkles size={16} color="#D6A85F" />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#8C4770',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}
          >
            A Little Surprise For You
          </span>
          <Sparkles size={16} color="#D6A85F" />
        </motion.div>

        {/* Heading: Heyy Girija */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3.2rem, 9.5vw, 6.2rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#3B3035',
            marginBottom: '0.75rem',
            textShadow: '0 4px 24px rgba(247, 200, 216, 0.4)',
          }}
        >
          <span className="rose-gradient-text">{birthdayData.intro.greeting}</span>
        </motion.h1>

        {/* Affectionate Nickname: Paasakaari */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.65, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.4rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, rgba(247, 200, 216, 0.75) 0%, rgba(250, 217, 193, 0.8) 100%)',
            border: '1.5px solid rgba(214, 168, 95, 0.4)',
            boxShadow: '0 6px 18px rgba(247, 200, 216, 0.45)',
            marginBottom: '2rem',
          }}
        >
          <Heart size={15} color="#8C4770" fill="#8C4770" />
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.15rem, 3vw, 1.45rem)',
              fontWeight: 700,
              color: '#8C4770',
              letterSpacing: '0.5px',
            }}
          >
            {birthdayData.nickname}
          </span>
          <Heart size={15} color="#8C4770" fill="#8C4770" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.2rem, 3.5vw, 1.85rem)',
            color: '#72626A',
            marginBottom: '2.5rem',
            maxWidth: '560px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          "{birthdayData.intro.subtitle}"
        </motion.p>

        {/* Main CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          <button
            onClick={onStartJourney}
            className="btn-primary group"
            id="open-surprise-btn"
            aria-label="Open your birthday surprise"
            style={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
              padding: '1.15rem 2.75rem',
              cursor: 'pointer',
            }}
          >
            <span>{birthdayData.intro.buttonText}</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              style={{ display: 'inline-flex' }}
            >
              <ArrowRight size={20} />
            </motion.span>
          </button>
        </motion.div>

        {/* Subtle note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          style={{
            marginTop: '1.5rem',
            fontSize: '0.85rem',
            color: '#9E8E95',
            fontFamily: 'var(--font-sans)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
          }}
        >
          <span>Best experienced with sound on</span>
          <Heart size={14} color="#F7C8D8" fill="#F7C8D8" />
        </motion.p>
      </div>
    </section>
  );
}
