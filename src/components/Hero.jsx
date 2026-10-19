import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronDown, Sparkles, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LOVE_DATA } from '../data/content';

export default function Hero() {
  const { hero, partnerName, occasion } = LOVE_DATA;

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E88B9A', '#FAF0DE', '#D96578', '#F3DEC0', '#BF485C'],
    });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 sm:pt-28 pb-14 overflow-hidden bg-radial-gradient"
    >
      {/* Decorative concentric glow rings - safely sized to avoid overflow */}
      <div className="absolute w-[340px] h-[340px] sm:w-[600px] sm:h-[600px] rounded-full border border-rosewood-500/10 pointer-events-none animate-pulse-slow max-w-[92vw] max-h-[92vw]" />
      <div className="absolute w-[460px] h-[460px] sm:w-[850px] sm:h-[850px] rounded-full border border-champagne-400/5 pointer-events-none max-w-[98vw] max-h-[98vw]" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="max-w-3xl mx-auto relative z-10 flex flex-col items-center w-full"
      >
        {/* Subtle pill badge */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/[0.04] border border-champagne-400/20 backdrop-blur-md mb-5 sm:mb-6 shadow-sm max-w-full"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne-400 animate-spin-slow flex-shrink-0" />
          <span className="text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-medium text-champagne-300 truncate">
            {occasion} • Para {partnerName}
          </span>
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rosewood-400 fill-rosewood-400 flex-shrink-0" />
        </motion.div>

        {/* Impactful romantic title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-serif text-3xl sm:text-5xl md:text-7xl font-light tracking-tight text-white leading-tight mb-3 sm:mb-4 px-2"
        >
          {hero.title.split(',')[0]},
          <span className="block italic font-normal bg-gradient-to-r from-rosewood-300 via-champagne-300 to-rosewood-400 bg-clip-text text-transparent text-glow-rose mt-1">
            {hero.title.split(',')[1] || 'Mi Amor'}
          </span>
        </motion.h1>

        {/* Personal Dedication Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-sm sm:text-base md:text-lg text-champagne-200/80 font-serif italic mb-6 sm:mb-8 max-w-xl px-2 leading-relaxed"
        >
          "{hero.subtitle}: donde cada latido se volvió código y cada verso guarda tu mirada."
        </motion.p>

        {/* Emotional Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="glass-card p-5 sm:p-8 rounded-2xl relative border border-white/[0.08] shadow-2xl mb-8 sm:mb-10 max-w-2xl text-left w-full"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rosewood-400 mb-2.5">
            <Feather className="w-4 h-4 flex-shrink-0" />
            <span>Un mensaje desde mi corazón</span>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-neutral-300 font-light">
            {hero.welcomeMessage}
          </p>
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400 gap-2">
            <span className="italic font-serif text-[11px] sm:text-xs">Construido para ti</span>
            <span className="text-rosewood-300 font-medium">Siempre tuyo, Elmer</span>
          </div>
        </motion.div>

        {/* CTA Buttons - Mobile Touch Friendly */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4"
        >
          <a
            href="#tiempo"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-rosewood-500 to-rosewood-600 hover:from-rosewood-600 hover:to-rosewood-700 text-white font-medium text-sm tracking-wide shadow-lg shadow-rosewood-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white flex-shrink-0" />
            <span>{hero.ctaExplore}</span>
          </a>

          <button
            onClick={triggerCelebration}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full glass-card hover:bg-white/10 text-champagne-300 font-medium text-sm tracking-wide border border-champagne-400/30 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-champagne-400 flex-shrink-0" />
            <span>¡Celebrar Nuestro Día!</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Scroll Down Indicator */}
      <motion.a
        href="#tiempo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-10 sm:mt-12 flex flex-col items-center text-neutral-400 hover:text-champagne-300 transition-colors group cursor-pointer"
      >
        <span className="text-[10px] uppercase tracking-widest font-light mb-1">Deslizar</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-rosewood-400" />
      </motion.a>
    </section>
  );
}
