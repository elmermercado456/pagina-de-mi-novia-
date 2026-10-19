import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Music,
  Disc,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Heart,
  Clock,
} from 'lucide-react';
import { LOVE_DATA } from '../data/content';

export default function SongLyrics() {
  const { song, partnerName } = LOVE_DATA;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Error al reproducir audio:', err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 0.8;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="canciones" className="py-16 sm:py-24 px-3.5 sm:px-6 relative z-10">
      <div className="max-w-3xl mx-auto">
        {/* Elemento de Audio Real */}
        <audio
          ref={audioRef}
          src={song.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Encabezado */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rosewood-500/10 border border-rosewood-500/20 text-rosewood-300 text-[11px] sm:text-xs uppercase tracking-widest mb-3"
          >
            <Music className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Nuestra Canción</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-white mb-2 px-2"
          >
            {song.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-neutral-400 text-xs sm:text-sm font-light italic px-2 max-w-lg mx-auto"
          >
            "{song.dedication}"
          </motion.p>
        </div>

        {/* Reproductor de Audio Móvil / Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/[0.08] shadow-2xl relative mb-8 sm:mb-12 overflow-hidden"
        >
          {/* Resplandor cálido sutil */}
          <div
            className={`absolute -top-16 -right-16 w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-opacity duration-700 ${
              isPlaying ? 'bg-rosewood-500/20 opacity-100' : 'bg-rosewood-500/10 opacity-40'
            }`}
          />

          {/* Fila superior: Vinilo y Título */}
          <div className="flex items-center gap-3.5 sm:gap-6 pb-4 sm:pb-6 border-b border-white/[0.08]">
            <div
              className={`w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-velvet-800 to-night-900 border border-champagne-400/20 flex items-center justify-center relative shadow-xl flex-shrink-0 transition-transform ${
                isPlaying ? 'scale-105 shadow-rosewood-500/25' : ''
              }`}
            >
              <Disc
                className={`w-8 h-8 sm:w-12 sm:h-12 text-rosewood-400 ${
                  isPlaying ? 'animate-spin-slow text-champagne-300' : ''
                }`}
              />
              <div
                className={`absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-night-950 transition-colors ${
                  isPlaying ? 'bg-rosewood-400 animate-pulse' : 'bg-champagne-400/80'
                }`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest text-champagne-300 font-semibold block truncate">
                {song.subtitle}
              </span>
              <h3 className="font-serif text-lg sm:text-2xl font-normal text-white mt-0.5 truncate">
                {song.title}
              </h3>
              <span className="text-[11px] sm:text-xs text-neutral-400 font-serif italic block">
                Para {partnerName}
              </span>
            </div>

            {/* Contador de tiempo */}
            <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px] sm:text-xs font-mono text-neutral-300 flex items-center gap-1.5 flex-shrink-0">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rosewood-400" />
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
          </div>

          {/* Barra de Progreso */}
          <div className="pt-4 sm:pt-6 space-y-1.5 mb-5 sm:mb-6">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controles de Reproducción y Volumen */}
          <div className="flex items-center justify-between gap-3">
            {/* Reiniciar */}
            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime = 0;
                setCurrentTime(0);
              }}
              className="p-3 rounded-xl sm:rounded-2xl glass-card text-neutral-400 hover:text-white border border-white/[0.06] transition-all active:scale-95 flex-shrink-0"
              title="Reiniciar canción"
              aria-label="Reiniciar canción"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Botón Principal Play / Pause */}
            <button
              onClick={togglePlay}
              className="flex-1 sm:flex-initial px-5 sm:px-8 py-3.5 rounded-xl sm:rounded-2xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-rosewood-500 via-rosewood-600 to-rosewood-700 hover:from-rosewood-600 hover:to-rosewood-800 text-white shadow-xl shadow-rosewood-500/25 border border-rosewood-400/30 transition-all active:scale-95"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-white flex-shrink-0" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white flex-shrink-0" />
                  <span>Escuchar Canción</span>
                </>
              )}
            </button>

            {/* Volumen */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={toggleMute}
                className="p-3 rounded-xl sm:rounded-2xl glass-card text-neutral-400 hover:text-white border border-white/[0.06] active:scale-95 transition-all"
                title={isMuted ? 'Activar sonido' : 'Silenciar'}
                aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-rosewood-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-20 h-1 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-rosewood-500 hidden sm:block"
              />
            </div>
          </div>
        </motion.div>

        {/* Letra Pura y Elegante (Estilo Cancionero Poético) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-12 border border-white/[0.06] shadow-2xl text-center space-y-7 sm:space-y-10"
        >
          {song.stanzas.map((stanza) => (
            <div
              key={stanza.id}
              className={`space-y-1.5 sm:space-y-2 transition-all ${
                stanza.isChorus
                  ? 'p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-champagne-400/20 text-champagne-100 shadow-inner'
                  : stanza.isOutro
                  ? 'pt-4 border-t border-white/[0.06] text-neutral-300 italic'
                  : 'text-neutral-200'
              }`}
            >
              {stanza.isChorus && (
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-rosewood-400 font-semibold mb-2">
                  Coro
                </span>
              )}
              {stanza.lines.map((line, lIdx) => (
                <p
                  key={lIdx}
                  className={`font-serif text-base sm:text-xl leading-relaxed tracking-wide px-1 ${
                    stanza.isChorus
                      ? 'font-medium text-champagne-200 text-glow-champagne'
                      : 'font-normal'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}

          {/* Firma final de la canción */}
          <div className="pt-6 sm:pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-neutral-400 text-center sm:text-left">
            <span className="font-serif italic text-champagne-300">
              Letra y música compuestas por Elmer
            </span>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <Heart className="w-3.5 h-3.5 text-rosewood-400 fill-rosewood-400 flex-shrink-0" />
              <span>Dedicada con amor eterno a {partnerName}</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
