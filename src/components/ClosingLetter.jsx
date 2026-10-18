import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Feather, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LOVE_DATA } from '../data/content';

export default function ClosingLetter() {
  const { letter, partnerName } = LOVE_DATA;
  const [sealed, setSealed] = useState(false);

  const handleSealClick = () => {
    setSealed(true);
    // Multi-stage confetti celebration
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#E88B9A', '#D96578'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#FAF0DE', '#F3DEC0'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#E5C48E', '#BF485C'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#FFFFFF', '#F5BAC4'],
    });
  };

  return (
    <section id="carta" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-400/10 border border-champagne-400/20 text-champagne-300 text-xs uppercase tracking-widest mb-3"
          >
            <Feather className="w-3.5 h-3.5" />
            <span>Epílogo & Promesa</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-serif text-3xl sm:text-5xl font-light text-white mb-3"
          >
            {letter.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-neutral-400 text-sm font-light italic"
          >
            Palabras reservadas solo para tus ojos, Abigail.
          </motion.p>
        </div>

        {/* Parchment Styled Letter Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass-card rounded-3xl p-8 sm:p-12 border border-champagne-400/20 shadow-2xl overflow-hidden"
        >
          {/* Subtle background vintage gradient glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-champagne-400/10 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-rosewood-500/10 blur-[80px] pointer-events-none" />

          {/* Letter Content */}
          <div className="space-y-5 text-neutral-200 font-serif text-base sm:text-lg leading-relaxed sm:leading-loose relative z-10">
            {letter.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? 'text-xl sm:text-2xl text-champagne-200 font-semibold italic'
                    : 'text-neutral-300 font-light'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Signature Block */}
          <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div>
              <span className="block text-xs uppercase tracking-widest text-neutral-400 mb-1 font-sans">
                {letter.signoffNote}
              </span>
              <p className="font-handwriting text-3xl sm:text-4xl text-rosewood-300 tracking-wide">
                {letter.signature}
              </p>
            </div>

            {/* Interactive Wax Seal / Heart Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSealClick}
                className="group relative px-5 py-3 rounded-full bg-gradient-to-r from-rosewood-600 to-rosewood-500 hover:from-rosewood-500 hover:to-rosewood-600 text-white text-xs font-semibold uppercase tracking-wider shadow-lg shadow-rosewood-600/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 border border-rosewood-400/40"
              >
                <Heart className="w-4 h-4 fill-white group-hover:scale-125 transition-transform" />
                <span>{sealed ? '¡Amor Eterno Sellado!' : 'Sellar Nuestro Amor'}</span>
                <Sparkles className="w-3.5 h-3.5 text-champagne-300" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
