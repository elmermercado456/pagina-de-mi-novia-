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
  Sparkles,
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
    <section id="canciones" className="py-24 px-4 sm:px-6 relative z-10">
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
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rosewood-500/10 border border-rosewood-500/20 text-rosewood-300 text-xs uppercase tracking-widest mb-3"
          >
            <Music className="w-3.5 h-3.5" />
            <span>Nuestra Canción</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-serif text-3xl sm:text-5xl font-light text-white mb-2"
          >
            {song.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-neutral-400 text-sm font-light italic"
          >
            "{song.dedication}"
          </motion.p>
        </div>

        {/* Reproductor de Audio Limpio y Elegante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl relative mb-12"
        >
          {/* Resplandor cálido sutil */}
          <div
            className={`absolute -top-16 -right-16 w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-opacity duration-700 ${
              isPlaying ? 'bg-rosewood-500/20 opacity-100' : 'bg-rosewood-500/10 opacity-40'
            }`}
          />

          {/* Fila superior: Vinilo y Título */}
          <div className="flex items-center gap-4 sm:gap-6 pb-6 border-b border-white/[0.08]">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-velvet-800 to-night-900 border border-champagne-400/20 flex items-center justify-center relative shadow-xl flex-shrink-0 transition-transform ${
                isPlaying ? 'scale-105 shadow-rosewood-500/25' : ''
              }`}
            >
              <Disc
                className={`w-10 h-10 sm:w-12 sm:h-12 text-rosewood-400 ${
                  isPlaying ? 'animate-spin-slow text-champagne-300' : ''
                }`}
              />
              <div
                className={`absolute w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-night-950 transition-colors ${
                  isPlaying ? 'bg-rosewood-400 animate-pulse' : 'bg-champagne-400/80'
                }`}
              />
            </div>

            <div className="flex-1">
              <span className="text-[11px] uppercase tracking-widest text-champagne-300 font-semibold block">
                {song.subtitle}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mt-0.5">
                {song.title}
              </h3>
              <span className="text-xs text-neutral-400 font-serif italic">
                Para {partnerName}
              </span>
            </div>

            {/* Contador de tiempo */}
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-neutral-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-rosewood-400" />
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
          </div>

          {/* Barra de Progreso */}
          <div className="pt-6 space-y-1.5 mb-6">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-rosewood-500"
            />
            <div className="flex justify-between text-[11px] font-mono text-neutral-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controles de Reproducción y Volumen */}
          <div className="flex items-center justify-between">
            {/* Reiniciar */}
            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime = 0;
                setCurrentTime(0);
              }}
              className="p-3 rounded-2xl glass-card text-neutral-400 hover:text-white border border-white/[0.06] transition-all"
              title="Reiniciar canción"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Botón Principal Play / Pause */}
            <button
              onClick={togglePlay}
              className="px-8 py-3.5 rounded-2xl font-medium text-sm flex items-center gap-3 bg-gradient-to-r from-rosewood-500 via-rosewood-600 to-rosewood-700 hover:from-rosewood-600 hover:to-rosewood-800 text-white shadow-xl shadow-rosewood-500/25 border border-rosewood-400/30 transition-all transform hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 fill-white" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-white" />
                  <span>Escuchar Canción</span>
                </>
              )}
            </button>

            {/* Volumen */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2.5 rounded-xl glass-card text-neutral-400 hover:text-white border border-white/[0.06]"
                title={isMuted ? 'Activar sonido' : 'Silenciar'}
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
          transition={{ delay: 0.2, duration: 0.7 }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-white/[0.06] shadow-2xl text-center space-y-10"
        >
          {song.stanzas.map((stanza) => (
            <div
              key={stanza.id}
              className={`space-y-2 transition-all ${
                stanza.isChorus
                  ? 'p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-champagne-400/20 text-champagne-100 shadow-inner'
                  : stanza.isOutro
                  ? 'pt-4 border-t border-white/[0.06] text-neutral-300 italic'
                  : 'text-neutral-200'
              }`}
            >
              {stanza.isChorus && (
                <span className="block text-[10px] uppercase tracking-widest text-rosewood-400 font-semibold mb-2">
                  Coro
                </span>
              )}
              {stanza.lines.map((line, lIdx) => (
                <p
                  key={lIdx}
                  className={`font-serif text-lg sm:text-xl leading-relaxed tracking-wide ${
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
          <div className="pt-8 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
            <span className="font-serif italic text-champagne-300">
              Letra y música compuestas por Elmer
            </span>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <Heart className="w-3.5 h-3.5 text-rosewood-400 fill-rosewood-400" />
              <span>Dedicada con amor eterno a {partnerName}</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
