import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, Sparkles, X, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

// Typewriter signature effect
function TypewriterSignature({ text, startDelay = 1000, speed = 80 }) {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setIsDone(false);
    const timer = setTimeout(() => {
      let idx = 0;
      const interval = setInterval(() => {
        if (idx < text.length) {
          setDisplayed(text.slice(0, idx + 1));
          idx++;
        } else {
          setIsDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [text, startDelay, speed]);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <span>{displayed}</span>
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1.1em',
          backgroundColor: '#8C4770',
          marginLeft: '4px',
          animation: 'cursorBlink 0.8s infinite',
        }}
      />
    </span>
  );
}

export default function MessageCard() {
  const [isOpen, setIsOpen] = useState(false);
  const letter = birthdayData.letter;

  return (
    <section
      id="message"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ maxWidth: '850px' }}>
        {/* Section Heading */}
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
                From The Heart
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 700,
                color: '#3B3035',
                lineHeight: 1.2,
                marginBottom: '0.75rem',
              }}
            >
              {letter.heading}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.05rem, 2.5vw, 1.4rem)',
                color: '#72626A',
              }}
            >
              "{letter.teaser}"
            </p>
          </motion.div>
        </div>

        {/* Envelope Container */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {!isOpen ? (
            /* Closed Envelope View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              style={{
                width: '100%',
                maxWidth: '560px',
                perspective: '1000px',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  backgroundColor: '#FFF0E5',
                  backgroundImage: 'linear-gradient(135deg, #FFF5EE 0%, #FDE4CF 100%)',
                  borderRadius: '24px',
                  border: '2px solid rgba(214, 168, 95, 0.35)',
                  boxShadow: '0 20px 50px rgba(59, 48, 53, 0.12), 0 0 30px rgba(247, 200, 216, 0.3)',
                  padding: '3.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                {/* Envelope Flap Triangle Graphic */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(to bottom, rgba(247, 200, 216, 0.4), transparent)',
                    borderTopLeftRadius: '22px',
                    borderTopRightRadius: '22px',
                    pointerEvents: 'none',
                  }}
                />

                {/* Wax Seal Button */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(true)}
                  className="wax-seal"
                  style={{
                    width: 70,
                    height: 70,
                    marginBottom: '1.5rem',
                    zIndex: 2,
                  }}
                  title="Click to break seal and open letter"
                  aria-label="Break wax seal and open letter"
                >
                  <span style={{ fontSize: '1.75rem' }}>💌</span>
                </motion.div>

                {/* Label */}
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: '#8C4770',
                    marginBottom: '0.5rem',
                  }}
                >
                  For Your Eyes Only
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: '#3B3035',
                    marginBottom: '1.5rem',
                  }}
                >
                  To My Favorite Human
                </h3>

                {/* Open Letter Button */}
                <button
                  onClick={() => setIsOpen(true)}
                  className="btn-primary"
                  id="open-letter-btn"
                  aria-label="Open letter"
                  style={{
                    fontSize: '1rem',
                    padding: '0.85rem 2rem',
                    zIndex: 2,
                  }}
                >
                  <MailOpen size={18} />
                  <span>Open Letter</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* Opened Letter View */
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                maxWidth: '680px',
              }}
            >
              <div
                className="paper-letter"
                style={{
                  borderRadius: '24px',
                  border: '1px solid rgba(214, 168, 95, 0.4)',
                  padding: 'clamp(2rem, 5vw, 3.5rem)',
                  position: 'relative',
                }}
              >
                {/* Close Button at top right */}
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Fold and close letter"
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(214, 168, 95, 0.3)',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#72626A',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)')}
                >
                  <X size={18} />
                </button>

                {/* Letter Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(214, 168, 95, 0.25)',
                    paddingBottom: '1rem',
                    marginBottom: '2rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      color: '#D6A85F',
                      fontWeight: 600,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {letter.date}
                  </span>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <Heart size={16} color="#F7C8D8" fill="#F7C8D8" />
                    <Heart size={16} color="#D9B8E8" fill="#D9B8E8" />
                  </div>
                </div>

                {/* Salutation */}
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                    fontWeight: 700,
                    color: '#3B3035',
                    marginBottom: '1.5rem',
                  }}
                >
                  {letter.salutation}
                </h4>

                {/* Paragraphs */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                    lineHeight: 1.8,
                    color: '#4A3B42',
                  }}
                >
                  {letter.paragraphs.map((p, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 * i }}
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>

                {/* Closing & Signature */}
                <div
                  style={{
                    marginTop: '2.5rem',
                    borderTop: '1px solid rgba(214, 168, 95, 0.25)',
                    paddingTop: '1.5rem',
                    textAlign: 'right',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      color: '#72626A',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {letter.closing}
                  </p>
                  <p
                    className="font-script"
                    style={{
                      fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                      color: '#8C4770',
                      fontWeight: 700,
                    }}
                  >
                    <TypewriterSignature text={letter.signature} startDelay={900} speed={75} />
                  </p>
                </div>

                {/* Close Bottom Button */}
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="btn-secondary"
                    aria-label="Close letter"
                  >
                    Fold back letter
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
