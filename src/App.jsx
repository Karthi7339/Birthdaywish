import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import GiftWrappingHero from './components/GiftWrappingHero';
import ParticleBackground from './components/ParticleBackground';
import IntroScreen from './components/IntroScreen';
import BirthdayReveal from './components/BirthdayReveal';
import ProgressIndicator from './components/ProgressIndicator';
import MemoryTimeline from './components/MemoryTimeline';
import PhotoGallery from './components/PhotoGallery';
import MessageCard from './components/MessageCard';
import SurpriseGift from './components/SurpriseGift';
import Celebration from './components/Celebration';
import MusicControl from './components/MusicControl';
import Lightbox from './components/Lightbox';
import { birthdayData } from './data/birthdayData';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGiftUnwrapped, setIsGiftUnwrapped] = useState(false);
  const [hasStartedJourney, setHasStartedJourney] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [journeyKey, setJourneyKey] = useState(0);

  // Unwrapping gift complete handler
  const handleGiftUnwrapped = () => {
    setIsGiftUnwrapped(true);
    setHasStartedJourney(true);
  };

  // Start journey handler (triggered by clicking "Open Your Surprise")
  const handleStartJourney = () => {
    setHasStartedJourney(true);
    const revealEl = document.getElementById('reveal');
    if (revealEl) {
      revealEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContinueToMemories = () => {
    const memEl = document.getElementById('memories');
    if (memEl) {
      memEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Replay handler
  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Soft reset key to refresh interactive elements
    setTimeout(() => {
      setIsGiftUnwrapped(false);
      setJourneyKey((k) => k + 1);
    }, 600);
  };

  return (
    <div key={journeyKey} style={{ position: 'relative', minHeight: '100vh' }}>
      {/* 1. Initial Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. Interactive Gift Wrapping Hero Page */}
      {!isLoading && (
        <GiftWrappingHero onUnwrapComplete={handleGiftUnwrapped} />
      )}

      {/* 3. Floating Ambient Particle System */}
      <ParticleBackground />

      {/* 4. Floating Minimal Progress Bar */}
      <ProgressIndicator />

      {/* Main Flow Sequence */}
      <main>
        {/* Step 1: Cinematic Intro Screen */}
        <IntroScreen onStartJourney={handleStartJourney} />

        {/* Step 2: Main Birthday Reveal */}
        <BirthdayReveal onContinue={handleContinueToMemories} />

        {/* Step 3: Memories Timeline */}
        <MemoryTimeline
          onSelectImage={(photoData) => setSelectedPhoto(photoData)}
        />

        {/* Step 4: Photo Gallery Grid */}
        <PhotoGallery />

        {/* Step 5: Personal Letter / Interactive Envelope */}
        <MessageCard />

        {/* Step 6: Mystery Surprise Box */}
        <SurpriseGift />

        {/* Step 7: Final Celebration & Replay */}
        <Celebration onReplay={handleReplay} />
      </main>

      {/* Ambient Music Control (activates after clicking surprise or starting) */}
      <MusicControl
        isVisible={hasStartedJourney}
        shouldAutoStart={hasStartedJourney}
      />

      {/* Lightbox for timeline images if clicked */}
      <Lightbox
        isOpen={selectedPhoto !== null}
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}
