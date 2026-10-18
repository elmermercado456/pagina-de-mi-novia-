import React from 'react';
import { Heart, Code2 } from 'lucide-react';
import { LOVE_DATA } from '../data/content';

export default function Footer() {
  const { partnerName, authorName } = LOVE_DATA;

  return (
    <footer className="py-12 border-t border-white/[0.06] relative z-10 text-center text-xs text-neutral-400">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 font-serif italic text-sm text-neutral-300">
          <span>Hecho con</span>
          <Heart className="w-4 h-4 text-rosewood-400 fill-rosewood-400 inline mx-0.5 animate-pulse" />
          <span>por {authorName} para {partnerName}</span>
        </div>

        <div className="flex items-center gap-2 text-neutral-400">
          <Code2 className="w-3.5 h-3.5 text-champagne-400" />
          <span>React • Tailwind CSS • Framer Motion</span>
        </div>

        <div className="text-[11px] text-neutral-400">
          © {new Date().getFullYear()} Nuestro Refugio Digital Privado
        </div>
      </div>
    </footer>
  );
}
