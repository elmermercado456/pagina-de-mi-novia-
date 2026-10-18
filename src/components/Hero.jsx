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
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 pb-12 overflow-hidden bg-radial-gradient"
    >
      {/* Decorative concentric glow rings */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-rosewood-500/10 pointer-events-none animate-pulse-slow" />
      <div className="absolute w-[850px] h-[850px] rounded-full border border-champagne-400/5 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-3xl mx-auto relative z-10 flex flex-col items-center"
      >
        {/* Subtle pill badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-champagne-400/20 backdrop-blur-md mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne-400 animate-spin-slow" />
          <span className="text-xs uppercase tracking-widest font-medium text-champagne-300">
            {occasion} • Para {partnerName}
          </span>
          <Heart className="w-3.5 h-3.5 text-rosewood-400 fill-rosewood-400" />
        </motion.div>

        {/* Impactful romantic title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-tight mb-4"
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
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-base sm:text-lg text-champagne-200/80 font-serif italic mb-8 max-w-xl"
        >
          "{hero.subtitle}: donde cada latido se volvió código y cada verso guarda tu mirada."
        </motion.p>

        {/* Emotional Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9 }}
          className="glass-card p-6 sm:p-8 rounded-2xl relative border border-white/[0.08] shadow-2xl mb-10 max-w-2xl text-left"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rosewood-400 mb-3">
            <Feather className="w-4 h-4" />
            <span>Un mensaje desde mi corazón</span>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-neutral-300 font-light">
            {hero.welcomeMessage}
          </p>
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
            <span className="italic font-serif">Construido exclusivamente para ti</span>
            <span className="text-rosewood-300 font-medium">Siempre tuyo, Elmer</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#tiempo"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-rosewood-500 to-rosewood-600 hover:from-rosewood-600 hover:to-rosewood-700 text-white font-medium text-sm tracking-wide shadow-lg shadow-rosewood-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>{hero.ctaExplore}</span>
          </a>

          <button
            onClick={triggerCelebration}
            className="px-6 py-3 rounded-full glass-card hover:bg-white/10 text-champagne-300 font-medium text-sm tracking-wide border border-champagne-400/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-champagne-400" />
            <span>¡Celebrar Nuestro Día!</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Scroll Down Indicator */}
      <motion.a
        href="#tiempo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-neutral-400 hover:text-champagne-300 transition-colors group cursor-pointer"
      >
        <span className="text-[11px] uppercase tracking-widest font-light mb-1">Deslizar</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-rosewood-400" />
      </motion.a>
    </section>
  );
}
