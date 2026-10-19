import React, { useState, useEffect } from 'react';
import { Heart, Music, Volume2, Sparkles, Menu, X, Clock, Quote, Mail, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Navbar({ isAudioPlaying, onToggleAudio }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    { name: 'Inicio', href: '#inicio', icon: Home },
    { name: 'Nuestro Tiempo', href: '#tiempo', icon: Clock },
    { name: 'Frases', href: '#frases', icon: Quote },
    { name: 'Nuestra Canción', href: '#canciones', icon: Music },
    { name: 'Para Ti', href: '#carta', icon: Mail },
  ];

  const handleMobileNavClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'py-2.5 sm:py-3 bg-night-950/90 backdrop-blur-lg border-b border-white/[0.08] shadow-lg shadow-black/40'
          : 'py-3.5 sm:py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 flex items-center justify-between">
        {/* Logo / Couple Brand */}
        <a
          href="#inicio"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none min-w-0"
        >
          <span className="p-1.5 rounded-full bg-rosewood-500/10 border border-rosewood-500/20 group-hover:bg-rosewood-500/20 transition-colors flex-shrink-0">
            <Heart className="w-4 h-4 text-rosewood-400 fill-rosewood-400/40 group-hover:scale-110 transition-transform" />
          </span>
          <span className="font-serif text-base sm:text-lg tracking-wide text-champagne-200 font-semibold group-hover:text-champagne-300 transition-colors truncate">
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
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {/* Confetti Trigger */}
          <button
            onClick={triggerLoveConfetti}
            title="Lanzar destellos de amor"
            aria-label="Lanzar destellos de amor"
            className="w-9 h-9 sm:w-auto sm:h-auto sm:p-2 flex items-center justify-center rounded-full glass-card hover:bg-white/10 text-champagne-300 border border-champagne-400/20 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Ambient Music Toggle */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center justify-center gap-1.5 h-9 sm:h-auto px-2.5 sm:px-3 sm:py-1.5 rounded-full text-xs tracking-wider transition-all border ${
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

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full glass-card border border-white/[0.1] text-neutral-300 hover:text-white active:scale-95 transition-all"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-rosewood-400" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-night-950/95 border-b border-white/[0.08] backdrop-blur-xl px-4 pt-2 pb-5"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleMobileNavClick(link.href)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium text-neutral-300 hover:text-champagne-300 hover:bg-white/[0.05] active:bg-rosewood-500/15 transition-colors"
                  >
                    <IconComponent className="w-4 h-4 text-rosewood-400 flex-shrink-0" />
                    <span>{link.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-white/[0.06] text-center text-xs text-neutral-400 flex items-center justify-center gap-1.5 font-serif italic">
              <span>Para Abigail, con amor infinito</span>
              <Heart className="w-3 h-3 text-rosewood-400 fill-rosewood-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
