import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Heart, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LOVE_DATA } from '../data/content';

export default function LoveQuotes() {
  const { quotes, partnerName } = LOVE_DATA;
  const [favorites, setFavorites] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const isFav = !prev[id];
      if (isFav) {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: {
            x: e.clientX ? e.clientX / window.innerWidth : 0.5,
            y: e.clientY ? e.clientY / window.innerHeight : 0.5,
          },
          colors: ['#E88B9A', '#D96578', '#FAF0DE'],
          scalar: 0.8,
        });
      }
      return { ...prev, [id]: isFav };
    });
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(`"${text}" — Elmer para ${partnerName}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  return (
    <section id="frases" className="py-16 sm:py-24 px-3.5 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-400/10 border border-champagne-400/20 text-champagne-300 text-[11px] sm:text-xs uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Pensamientos Inmortales</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-white mb-3 sm:mb-4 px-2"
          >
            Palabras que Guardan Nuestra Esencia
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-neutral-400 max-w-xl mx-auto text-xs sm:text-base font-light px-2"
          >
            Cinco certezas nacidas en los días compartidos, en la complicidad de tus ojos
            y en la calma de haber encontrado mi refugio en ti.
          </motion.p>
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {quotes.map((item, index) => {
            const isFeatured = index === 0 || index === 1;
            const isFav = !!favorites[item.id];
            const isCopied = copiedId === item.id;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className={`glass-card glass-card-hover rounded-2xl p-5 sm:p-8 flex flex-col justify-between relative group ${
                  index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Decorative Top Details */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 sm:p-2 rounded-xl bg-rosewood-500/10 text-rosewood-400 border border-rosewood-500/20">
                      <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform rotate-180" />
                    </span>
                    <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-champagne-300/90">
                      {item.tag}
                    </span>
                  </div>

                  {/* Actions: Favorite & Copy - Touch friendly */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className={`p-2.5 rounded-xl transition-all active:scale-90 ${
                        isFav
                          ? 'bg-rosewood-500/20 text-rosewood-400 border border-rosewood-500/30'
                          : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.05]'
                      }`}
                      title={isFav ? 'Te encanta' : 'Guardar en el corazón'}
                      aria-label="Marcar como favorito"
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform ${
                          isFav ? 'fill-rosewood-400 scale-110' : ''
                        }`}
                      />
                    </button>

                    <button
                      onClick={() => copyToClipboard(item.quote, item.id)}
                      className="p-2.5 rounded-xl text-neutral-400 hover:text-champagne-300 hover:bg-white/[0.05] active:scale-90 transition-all"
                      title="Copiar pensamiento"
                      aria-label="Copiar pensamiento"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Quote Body */}
                <blockquote className="mb-5 sm:mb-6">
                  <p
                    className={`font-serif text-neutral-200 leading-relaxed italic ${
                      isFeatured ? 'text-base sm:text-xl' : 'text-sm sm:text-lg'
                    }`}
                  >
                    "{item.quote}"
                  </p>
                </blockquote>

                {/* Card Footer */}
                <div className="pt-3.5 sm:pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400 gap-2">
                  <span className="font-light italic text-champagne-200/70 text-[11px] sm:text-xs truncate">
                    {item.detail}
                  </span>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 flex-shrink-0">
                    #{item.id}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
