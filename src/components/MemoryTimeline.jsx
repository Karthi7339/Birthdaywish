import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Calendar, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import SmartImage from './SmartImage';

export default function MemoryTimeline({ onSelectImage }) {
  const containerRef = useRef(null);

  // Scroll progress for filling the timeline central line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 90%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="memories"
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Section 10: Memory Introduction */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 5rem auto' }}>
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
                marginBottom: '1.5rem',
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
                Chapters Of Us
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
              "{birthdayData.memoryIntro.quote1}"
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                color: '#72626A',
              }}
            >
              {birthdayData.memoryIntro.quote2}
            </p>
          </motion.div>
        </div>

        {/* Section 13: Memory Timeline */}
        <div style={{ position: 'relative', maxWidth: '980px', margin: '0 auto' }}>
          {/* Background Central Track Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: 3,
              backgroundColor: 'rgba(214, 168, 95, 0.2)',
              transform: 'translateX(-50%)',
              borderRadius: 3,
            }}
            className="hidden md:block"
          />

          {/* Active Filling Line */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              width: 3,
              height: lineHeight,
              background: 'linear-gradient(to bottom, #F7C8D8, #D6A85F, #D9B8E8)',
              transform: 'translateX(-50%)',
              borderRadius: 3,
              boxShadow: '0 0 12px rgba(214, 168, 95, 0.5)',
            }}
            className="hidden md:block"
          />

          {/* Mobile Vertical Left Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '20px',
              width: 2,
              backgroundColor: 'rgba(214, 168, 95, 0.25)',
            }}
            className="md:hidden"
          />

          {/* Timeline Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {birthdayData.memories.map((memory, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={memory.id}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Desktop Center Node Indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '24px',
                      transform: 'translateX(-50%)',
                      zIndex: 10,
                    }}
                    className="hidden md:flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: '#FFF8F5',
                        border: '3px solid #D6A85F',
                        boxShadow: '0 0 15px rgba(214, 168, 95, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Heart size={16} color="#D6A85F" fill="#D6A85F" />
                    </motion.div>
                  </div>

                  {/* Card Container with Alternating Side on Desktop */}
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: isEven ? 'flex-start' : 'flex-end',
                    }}
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: isEven ? -40 : 40,
                        y: 20,
                      }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        width: '100%',
                        maxWidth: '440px',
                      }}
                      className="glass-card"
                    >
                      <div
                        style={{
                          padding: '1.75rem',
                          borderRadius: '24px',
                          border: '1px solid rgba(255, 255, 255, 0.8)',
                          boxShadow: 'var(--shadow-md)',
                        }}
                      >
                        {/* Header: Number & Tag */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1rem',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-serif)',
                              fontSize: '1.4rem',
                              fontWeight: 700,
                              color: '#D6A85F',
                              letterSpacing: '1px',
                            }}
                          >
                            {memory.number}
                          </span>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              fontSize: '0.8rem',
                              fontWeight: 500,
                              color: '#8C4770',
                              backgroundColor: 'rgba(247, 200, 216, 0.35)',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '9999px',
                            }}
                          >
                            <Calendar size={13} />
                            {memory.date}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.35rem',
                            fontWeight: 700,
                            color: '#3B3035',
                            lineHeight: 1.3,
                            marginBottom: '0.75rem',
                          }}
                        >
                          {memory.title}
                        </h3>

                        {/* Description */}
                        <p
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.98rem',
                            color: '#5C4C53',
                            lineHeight: 1.6,
                            marginBottom: memory.image ? '1.25rem' : 0,
                          }}
                        >
                          {memory.description}
                        </p>

                        {/* Optional Memory Photo */}
                        {memory.image && (
                          <div style={{ marginTop: '0.5rem', borderRadius: '16px', overflow: 'hidden' }}>
                            <SmartImage
                              src={memory.image}
                              alt={memory.title}
                              aspectRatio={memory.aspectRatio || "16/9"}
                              caption={memory.title}
                              onClick={() =>
                                onSelectImage &&
                                onSelectImage({
                                  image: memory.image,
                                  caption: `${memory.title} — ${memory.description}`,
                                  date: memory.date,
                                })
                              }
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
