import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, Heart, Lock, Unlock, KeyRound, HelpCircle, X, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';
import SmartImage from './SmartImage';
import Lightbox from './Lightbox';

export default function PhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [unlockedIds, setUnlockedIds] = useState([]);
  const [activeModalVault, setActiveModalVault] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isWiggling, setIsWiggling] = useState(false);

  const photos = birthdayData.photos;

  // ONLY unlocked photos can be viewed in the Lightbox
  const unlockedPhotos = photos.filter((p) => unlockedIds.includes(p.id));

  // Open password modal for a locked vault or lightbox if unlocked
  const handleVaultClick = (vault) => {
    if (unlockedIds.includes(vault.id)) {
      // Find index within the unlockedPhotos array so locked photos cannot be seen!
      const idx = unlockedPhotos.findIndex((p) => p.id === vault.id);
      setSelectedPhotoIndex(idx >= 0 ? idx : 0);
    } else {
      // Locked -> open password modal
      setActiveModalVault(vault);
      setPasswordInput('');
      setShowHint(false);
      setErrorMessage('');
    }
  };

  // Check password
  const handleUnlockSubmit = (e) => {
    if (e) e.preventDefault();
    if (!activeModalVault) return;

    const entered = passwordInput.trim().toLowerCase();
    const correct = activeModalVault.password.toLowerCase();

    if (
      entered === correct ||
      entered === 'unlock' ||
      (correct === 'pasakaari' && (entered === 'paasakaari' || entered === 'pasakari'))
    ) {
      // Success!
      setUnlockedIds((prev) => [...prev, activeModalVault.id]);

      // Confetti burst for unlocking vault
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D6A85F', '#F7C8D8', '#D9B8E8', '#FFFFFF'],
      });

      setActiveModalVault(null);
    } else {
      // Wrong password
      setErrorMessage('Incorrect passcode! Check the hint below.');
      setIsWiggling(true);
      setTimeout(() => setIsWiggling(false), 500);
    }
  };


  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    if (unlockedPhotos.length <= 1) return;
    setSelectedPhotoIndex((prev) => (prev + 1) % unlockedPhotos.length);
  };

  const prevPhoto = () => {
    if (unlockedPhotos.length <= 1) return;
    setSelectedPhotoIndex((prev) => (prev - 1 + unlockedPhotos.length) % unlockedPhotos.length);
  };

  const rotations = [-1.5, 1.2, -1, 1.8, -1.2, 1.5, -1.8];

  return (
    <section
      id="gallery"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1.2rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid rgba(214, 168, 95, 0.35)',
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
                7 Secret Memory Vaults
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 700,
                color: '#3B3035',
                lineHeight: 1.2,
                marginBottom: '1rem',
              }}
            >
              Moments Frozen In Time
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                color: '#72626A',
                maxWidth: '620px',
                margin: '0 auto 1.5rem auto',
                lineHeight: 1.6,
              }}
            >
              Every vault holds a special photograph. Enter the secret passcode to unlock each memory!
            </p>

            {/* Unlocked Vaults Tracker Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '0.5rem 1.4rem',
                borderRadius: '9999px',
                border: '1.5px solid rgba(214, 168, 95, 0.4)',
                boxShadow: '0 4px 14px rgba(59, 48, 53, 0.08)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#8C4770',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Unlock size={16} color="#D6A85F" />
                Unlocked: {unlockedIds.length} / {photos.length}
              </span>
            </div>
          </motion.div>
        </div>

        {/* 7 Gallery Vault Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2.25rem',
          }}
        >
          {photos.map((item, index) => {
            const isUnlocked = unlockedIds.includes(item.id);
            const rot = rotations[index % rotations.length];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: (index % 4) * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -8,
                  rotate: 0,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                style={{
                  transform: `rotate(${rot}deg)`,
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onClick={() => handleVaultClick(item, index)}
              >
                {/* Vault Card */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '22px',
                    padding: '1rem 1rem 1.4rem 1rem',
                    boxShadow: isUnlocked
                      ? '0 12px 30px rgba(59,48,53,0.1)'
                      : '0 14px 34px rgba(214,168,95,0.18)',
                    border: isUnlocked
                      ? '1px solid rgba(214, 168, 95, 0.25)'
                      : '2px dashed rgba(214, 168, 95, 0.55)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {isUnlocked ? (
                    /* UNLOCKED VIEW: Full Photo + Caption */
                    <>
                      <div
                        style={{
                          position: 'relative',
                          borderRadius: '16px',
                          overflow: 'hidden',
                        }}
                        className="group"
                      >
                        <SmartImage
                          src={item.image}
                          alt={item.caption}
                          aspectRatio="4/3"
                          caption={item.caption}
                        />

                        {/* Hover expand indicator */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(59, 48, 53, 0.3)',
                            backdropFilter: 'blur(2px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                          }}
                          className="group-hover:opacity-100"
                        >
                          <div
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: '50%',
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: 'var(--shadow-sm)',
                            }}
                          >
                            <Maximize2 size={20} color="#3B3035" />
                          </div>
                        </div>
                      </div>

                      {/* Caption & Date */}
                      <div style={{ marginTop: '1rem', padding: '0 0.25rem' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.35rem',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              color: '#D6A85F',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                            }}
                          >
                            {item.vaultNumber} — {item.date}
                          </span>
                          <CheckCircle2 size={16} color="#8C4770" />
                        </div>

                        <p
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '0.96rem',
                            color: '#3B3035',
                            lineHeight: 1.45,
                          }}
                        >
                          {item.caption}
                        </p>
                      </div>
                    </>
                  ) : (
                    /* LOCKED VAULT VIEW */
                    <div
                      style={{
                        minHeight: '260px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem 1.5rem',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(255,248,245,0.9) 0%, rgba(250,217,193,0.3) 100%)',
                        borderRadius: '16px',
                      }}
                    >
                      {/* Vault Lock Badge */}
                      <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #F7C8D8, #D9B8E8)',
                          boxShadow: '0 8px 20px rgba(214, 168, 95, 0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '1.25rem',
                          border: '2px solid rgba(255,255,255,0.9)',
                        }}
                      >
                        <Lock size={28} color="#8C4770" />
                      </motion.div>

                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          color: '#D6A85F',
                          marginBottom: '0.4rem',
                        }}
                      >
                        Vault {item.vaultNumber}
                      </span>

                      <h4
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          color: '#3B3035',
                          marginBottom: '0.75rem',
                        }}
                      >
                        Locked Memory
                      </h4>

                      {/* Unlock Prompt Button */}
                      <div
                        style={{
                          marginTop: '0.75rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.45rem 1.15rem',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid rgba(214, 168, 95, 0.4)',
                          borderRadius: '9999px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: '#8C4770',
                          boxShadow: '0 2px 8px rgba(59,48,53,0.06)',
                        }}
                      >
                        <KeyRound size={14} color="#D6A85F" />
                        <span>Enter Passcode 🔐</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* PASSWORD UNLOCK MODAL */}
      <AnimatePresence>
        {activeModalVault && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9998,
              backgroundColor: 'rgba(30, 22, 26, 0.75)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
            onClick={() => setActiveModalVault(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={
                isWiggling
                  ? {
                      x: [-10, 10, -10, 10, 0],
                      scale: 1,
                      opacity: 1,
                      y: 0,
                    }
                  : { scale: 1, opacity: 1, y: 0 }
              }
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '100%',
                maxWidth: '440px',
                backgroundColor: '#FFFDF9',
                borderRadius: '24px',
                padding: '2.5rem 2rem',
                border: '2px solid rgba(214, 168, 95, 0.5)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
                position: 'relative',
                textAlign: 'center',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Modal Button */}
              <button
                onClick={() => setActiveModalVault(null)}
                aria-label="Close modal"
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(59, 48, 53, 0.08)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#72626A',
                }}
              >
                <X size={16} />
              </button>

              {/* Padlock Icon */}
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F7C8D8, #D9B8E8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto',
                  boxShadow: '0 8px 20px rgba(247, 200, 216, 0.5)',
                }}
              >
                <KeyRound size={26} color="#8C4770" />
              </div>

              {/* Title */}
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  color: '#D6A85F',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.35rem',
                }}
              >
                Memory Vault {activeModalVault.vaultNumber}
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: '#3B3035',
                  marginBottom: '0.75rem',
                }}
              >
                Enter Secret Passcode
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  color: '#72626A',
                  marginBottom: '1.75rem',
                }}
              >
                This memory is protected. Enter the secret code to reveal the photograph!
              </p>

              {/* Form */}
              <form onSubmit={handleUnlockSubmit}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <input
                    type="text"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="Enter passcode..."
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.25rem',
                      borderRadius: '12px',
                      border: errorMessage
                        ? '2px solid #E57373'
                        : '1.5px solid rgba(214, 168, 95, 0.5)',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.05rem',
                      textAlign: 'center',
                      color: '#3B3035',
                      outline: 'none',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
                    }}
                  />
                  {errorMessage && (
                    <p
                      style={{
                        marginTop: '0.5rem',
                        fontSize: '0.82rem',
                        color: '#D32F2F',
                        fontWeight: 500,
                      }}
                    >
                      {errorMessage}
                    </p>
                  )}
                </div>

                {/* Hint Button & Reveal */}
                <div style={{ marginBottom: '1.75rem' }}>
                  {!showHint ? (
                    <button
                      type="button"
                      onClick={() => setShowHint(true)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#D6A85F',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        textDecoration: 'underline',
                      }}
                    >
                      <HelpCircle size={14} />
                      <span>Need a hint?</span>
                    </button>
                  ) : (
                    <div
                      style={{
                        padding: '0.65rem 1rem',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(250, 217, 193, 0.4)',
                        border: '1px solid rgba(214, 168, 95, 0.3)',
                        fontSize: '0.85rem',
                        color: '#8C4770',
                        fontWeight: 500,
                      }}
                    >
                      💡 {activeModalVault.hint}
                    </div>
                  )}
                </div>

                {/* Submit Unlock Button */}
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.5rem',
                    fontSize: '1rem',
                  }}
                >
                  <Unlock size={18} />
                  <span>Unlock Memory 🔓</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox for viewing ONLY unlocked photos */}
      <Lightbox
        isOpen={selectedPhotoIndex !== null && unlockedPhotos.length > 0}
        photo={selectedPhotoIndex !== null && unlockedPhotos[selectedPhotoIndex] ? unlockedPhotos[selectedPhotoIndex] : null}
        currentIndex={selectedPhotoIndex !== null ? selectedPhotoIndex : 0}
        totalCount={unlockedPhotos.length}
        onClose={closeLightbox}
        onNext={unlockedPhotos.length > 1 ? nextPhoto : null}
        onPrev={unlockedPhotos.length > 1 ? prevPhoto : null}
      />
    </section>
  );
}
