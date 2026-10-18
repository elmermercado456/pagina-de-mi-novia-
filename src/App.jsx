import React, { useState, useEffect } from 'react';
import BackgroundStars from './components/BackgroundStars';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TimeCounter from './components/TimeCounter';
import LoveQuotes from './components/LoveQuotes';
import SongLyrics from './components/SongLyrics';
import ClosingLetter from './components/ClosingLetter';
import Footer from './components/Footer';
import { startAmbientLoop } from './utils/soundEngine';

export default function App() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Música ambiental de fondo
  useEffect(() => {
    let stopLoop = null;

    if (isAudioPlaying) {
      stopLoop = startAmbientLoop();
    }

    return () => {
      if (stopLoop) stopLoop();
    };
  }, [isAudioPlaying]);

  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-night-950 text-neutral-100 relative selection:bg-rosewood-500/30 selection:text-champagne-300">
      {/* Polvo estelar interactivo sobre lienzo Canvas */}
      <BackgroundStars />

      {/* Barra de navegación flotante con control de música ambiental */}
      <Navbar
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
      />

      {/* Flujo principal de la experiencia */}
      <main className="relative z-10">
        <Hero />
        <TimeCounter />
        <LoveQuotes />
        {/* Sección de canciones que se cantan solas con su melodía de guitarra */}
        <SongLyrics />
        <ClosingLetter />
      </main>

      {/* Pie de página conmemorativo */}
      <Footer />
    </div>
  );
}
