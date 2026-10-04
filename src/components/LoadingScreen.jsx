import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Elegant short timer
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Allow fade out animation to finish
    }, 1600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#FFF8F5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            backgroundImage: `radial-gradient(circle at center, rgba(247, 200, 216, 0.4) 0%, rgba(255, 248, 245, 0.95) 70%)`,
          }}
        >
          {/* Glowing Animated Ring with Heart / Sparkle */}
          <div style={{ position: 'relative', width: 90, height: 90, marginBottom: '2rem' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '2px dashed #D6A85F',
                opacity: 0.7,
              }}
            />
            <motion.div
              animate={{ scale: [0.95, 1.08, 0.95] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: 8,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F7C8D8, #D9B8E8)',
                boxShadow: '0 0 25px rgba(247, 200, 216, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Heart size={28} color="#3B3035" fill="#3B3035" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                fontWeight: 600,
                color: '#3B3035',
                letterSpacing: '0.5px',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              Preparing something special...
              <Sparkles size={18} color="#D6A85F" />
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                color: '#72626A',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Just a moment
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
