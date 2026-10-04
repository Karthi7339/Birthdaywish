import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function MusicControl({ isVisible, shouldAutoStart = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [useSynth, setUseSynth] = useState(false);
  const audioRef = useRef(null);

  // Web Audio API synth backup refs
  const audioCtxRef = useRef(null);
  const isSynthRunningRef = useRef(false);
  const synthTimerRef = useRef(null);

  // Music Box Melody notes (frequencies in Hz for a soft Happy Birthday theme in C Major)
  // C4, C4, D4, C4, F4, E4 | C4, C4, D4, C4, G4, F4 | C4, C4, C5, A4, F4, E4, D4 | Bb4, Bb4, A4, F4, G4, F4
  const melody = [
    { note: 261.63, dur: 350 }, // C4
    { note: 261.63, dur: 350 }, // C4
    { note: 293.66, dur: 700 }, // D4
    { note: 261.63, dur: 700 }, // C4
    { note: 349.23, dur: 700 }, // F4
    { note: 329.63, dur: 1200 }, // E4

    { note: 261.63, dur: 350 }, // C4
    { note: 261.63, dur: 350 }, // C4
    { note: 293.66, dur: 700 }, // D4
    { note: 261.63, dur: 700 }, // C4
    { note: 392.00, dur: 700 }, // G4
    { note: 349.23, dur: 1200 }, // F4

    { note: 261.63, dur: 350 }, // C4
    { note: 261.63, dur: 350 }, // C4
    { note: 523.25, dur: 700 }, // C5
    { note: 440.00, dur: 700 }, // A4
    { note: 349.23, dur: 700 }, // F4
    { note: 329.63, dur: 700 }, // E4
    { note: 293.66, dur: 1100 }, // D4

    { note: 466.16, dur: 350 }, // Bb4
    { note: 466.16, dur: 350 }, // Bb4
    { note: 440.00, dur: 700 }, // A4
    { note: 349.23, dur: 700 }, // F4
    { note: 392.00, dur: 700 }, // G4
    { note: 349.23, dur: 1400 }, // F4
  ];

  // Play a soft chime tone
  const playTone = (freq, durationMs) => {
    if (!audioCtxRef.current || isMuted) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Sine wave with overtone for celesta/music box bell feel
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationMs / 1000);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + durationMs / 1000);
    } catch (e) {
      // AudioContext safe catch
    }
  };

  const startSynthLoop = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
      }
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    isSynthRunningRef.current = true;
    let step = 0;

    const playNext = () => {
      if (!isSynthRunningRef.current) return;
      const current = melody[step];
      playTone(current.note, current.dur);

      step = (step + 1) % melody.length;
      synthTimerRef.current = setTimeout(playNext, current.dur + 80);
    };

    playNext();
  };

  const stopSynthLoop = () => {
    isSynthRunningRef.current = false;
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  // Try to start music when triggered by user interaction
  useEffect(() => {
    if (shouldAutoStart && !isPlaying) {
      startPlayback();
    }
  }, [shouldAutoStart]);

  const startPlayback = () => {
    const audio = audioRef.current;
    if (audio && !useSynth) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Audio file missing or blocked -> activate gentle synth backup
            setUseSynth(true);
            startSynthLoop();
            setIsPlaying(true);
          });
      }
    } else {
      startSynthLoop();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current && !useSynth) {
        audioRef.current.pause();
      }
      stopSynthLoop();
      setIsPlaying(false);
    } else {
      startPlayback();
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.muted = newMuted;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSynthLoop();
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Background music controls"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9000,
      }}
    >
      {/* Hidden audio element pointing to the placeholder */}
      <audio
        ref={audioRef}
        src={birthdayData.music.src}
        loop
        preload="auto"
        onError={() => {
          // If mp3 is not present, switch to synth mode seamlessly
          setUseSynth(true);
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.45rem 0.85rem',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(214, 168, 95, 0.35)',
          borderRadius: '9999px',
          boxShadow: '0 8px 24px rgba(59, 48, 53, 0.1)',
        }}
      >
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            backgroundColor: isPlaying ? '#D6A85F' : 'rgba(247, 200, 216, 0.6)',
            border: 'none',
            color: isPlaying ? '#FFFFFF' : '#3B3035',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: 2 }} />}
        </button>

        {/* Animated Soundwave Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            height: 18,
            padding: '0 0.25rem',
          }}
          title={birthdayData.music.title}
        >
          {[0.5, 0.8, 0.4].map((scale, i) => (
            <motion.div
              key={i}
              animate={
                isPlaying && !isMuted
                  ? {
                      height: ['4px', '16px', '6px', '14px', '4px'],
                    }
                  : { height: '4px' }
              }
              transition={{
                repeat: Infinity,
                duration: 1.2,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
              style={{
                width: 3,
                backgroundColor: '#8C4770',
                borderRadius: 2,
              }}
            />
          ))}
        </div>

        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#72626A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '0.2rem',
          }}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </motion.div>
    </aside>
  );
}
