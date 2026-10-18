import React, { useState, useEffect } from 'react';
import { Heart, Music, Volume2, VolumeX, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Navbar({ isAudioPlaying, onToggleAudio }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerLoveConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.15 },
      colors: ['#E88B9A', '#FAF0DE', '#D96578', '#F3DEC0'],
      shapes: ['circle'],
      scalar: 1.1,
    });
  };

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nuestro Tiempo', href: '#tiempo' },
    { name: 'Frases', href: '#frases' },
    { name: 'Canciones', href: '#canciones' },
    { name: 'Para Ti', href: '#carta' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-night-950/80 backdrop-blur-md border-b border-white/[0.06] shadow-lg shadow-black/30'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo / Couple Brand */}
        <a
          href="#inicio"
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <span className="p-1.5 rounded-full bg-rosewood-500/10 border border-rosewood-500/20 group-hover:bg-rosewood-500/20 transition-colors">
            <Heart className="w-4 h-4 text-rosewood-400 fill-rosewood-400/40 group-hover:scale-110 transition-transform" />
          </span>
          <span className="font-serif text-lg tracking-wide text-champagne-200 font-semibold group-hover:text-champagne-300 transition-colors">
            Abigail <span className="text-rosewood-400 font-light">&</span> Elmer
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-night-900/60 p-1.5 rounded-full border border-white/[0.08] backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 text-xs uppercase tracking-wider text-neutral-300 hover:text-champagne-300 hover:bg-white/[0.04] rounded-full transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Confetti Trigger */}
          <button
            onClick={triggerLoveConfetti}
            title="Lanzar destellos de amor"
            aria-label="Lanzar destellos de amor"
            className="p-2 rounded-full glass-card hover:bg-white/10 text-champagne-300 border border-champagne-400/20 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Ambient Music Toggle */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-wider transition-all border ${
              isAudioPlaying
                ? 'bg-rosewood-500/20 text-rosewood-300 border-rosewood-500/40 shadow-sm shadow-rosewood-500/20'
                : 'glass-card text-neutral-400 border-white/[0.08] hover:text-neutral-200'
            }`}
            title={isAudioPlaying ? 'Pausar música ambiental' : 'Reproducir melodía acústica'}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-rosewood-400" />
                <span className="hidden sm:inline font-medium">Melodía Activa</span>
              </>
            ) : (
              <>
                <Music className="w-3.5 h-3.5 text-neutral-400" />
                <span className="hidden sm:inline font-medium">Música Íntima</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
