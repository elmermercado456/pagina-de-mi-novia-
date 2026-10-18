/**
 * MOTOR DE CANTO Y MELODÍA ACÚSTICA SINCRONIZADA
 * Reproduce la melodía acústica (guitarra con arpegios y bajo cálido)
 * y entona la voz línea por línea sincronizada en español.
 */

// Estructura de líneas y acordes para cada canción
export const SUNG_SONGS = {
  'cancion-1': {
    id: 'cancion-1',
    title: 'Acordes de Madrugada',
    tempoBpm: 68,
    lines: [
      { text: "Se apagan las luces de la ciudad...", chord: "G", durationMs: 4200 },
      { text: "y el reloj se olvida de avanzar.", chord: "Cadd9", durationMs: 4000 },
      { text: "Tengo en mis manos seis cuerdas y un café...", chord: "Em7", durationMs: 4300 },
      { text: "y en cada pensamiento tu nombre otra vez.", chord: "D", durationMs: 4200 },
      { text: "No hay prisa en esta noche de cristal...", chord: "G", durationMs: 4200 },
      { text: "tu voz aún resuena en mi ventanal.", chord: "Cadd9", durationMs: 4000 },
      { text: "Basta cerrar los ojos un segundo...", chord: "Em7", durationMs: 4200 },
      { text: "para entender por qué cambiaste mi mundo.", chord: "D", durationMs: 4400 },
      { text: "Y es que contigo, Abigail...", chord: "Cadd9", durationMs: 4100 },
      { text: "los inviernos se vuelven de abril.", chord: "G", durationMs: 4000 },
      { text: "No me hace falta ninguna otra estrella...", chord: "Em7", durationMs: 4200 },
      { text: "si tu mirada es la más sincera y bella.", chord: "D", durationMs: 4200 },
      { text: "Quédate aquí, cerquita de mi compás...", chord: "Cadd9", durationMs: 4300 },
      { text: "que el tiempo a tu lado, siempre pide más.", chord: "G", durationMs: 4800 },
    ],
  },
  'cancion-2': {
    id: 'cancion-2',
    title: 'Constelación en tu Mano',
    tempoBpm: 64,
    lines: [
      { text: "Dibujé en la madera un mapa imperfecto...", chord: "D", durationMs: 4200 },
      { text: "buscando explicar este noble afecto.", chord: "A", durationMs: 4000 },
      { text: "Pero el amor sincero no cabe en papel...", chord: "Bm7", durationMs: 4200 },
      { text: "se vive en la calma, en la orilla de tu piel.", chord: "Gadd9", durationMs: 4300 },
      { text: "Tú no pides nada y lo entregas todo...", chord: "D", durationMs: 4100 },
      { text: "me salvaste los días de aquel viejo lodo.", chord: "A", durationMs: 4100 },
      { text: "Tienes en la risa un truco de luz...", chord: "Bm7", durationMs: 4000 },
      { text: "que apaga cualquier peso de cualquier cruz.", chord: "Gadd9", durationMs: 4300 },
      { text: "Tengo una constelación en tu mano...", chord: "D", durationMs: 4200 },
      { text: "un juramento que no fue en vano.", chord: "A", durationMs: 4000 },
      { text: "No te prometo un cielo sin tormenta...", chord: "Bm7", durationMs: 4100 },
      { text: "pero sí un abrazo que siempre te sostenga.", chord: "Gadd9", durationMs: 4400 },
      { text: "Eres mi verso exacto, mi verdad primera...", chord: "D", durationMs: 4200 },
      { text: "el motivo por el que mi alma espera.", chord: "D", durationMs: 4800 },
    ],
  },
};

// Frecuencias exactas de notas para arpegios de guitarra (Hz)
const NOTES = {
  G2: 98.0,
  B2: 123.47,
  D3: 146.83,
  E3: 164.81,
  G3: 196.0,
  A3: 220.0,
  B3: 246.94,
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  Fs4: 369.99,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
};

// Acordes de guitarra con secuencia de bajo y arpegios
const CHORD_PATTERNS = {
  G: {
    bass: NOTES.G2,
    arpeggio: [NOTES.G3, NOTES.B3, NOTES.D4, NOTES.G4, NOTES.D4, NOTES.B3],
  },
  Cadd9: {
    bass: NOTES.C4 / 2, // C3
    arpeggio: [NOTES.G3, NOTES.C4, NOTES.D4, NOTES.G4, NOTES.D4, NOTES.C4],
  },
  Em7: {
    bass: NOTES.E3,
    arpeggio: [NOTES.G3, NOTES.B3, NOTES.D4, NOTES.E4, NOTES.D4, NOTES.B3],
  },
  D: {
    bass: NOTES.D3,
    arpeggio: [NOTES.A3, NOTES.D4, NOTES.Fs4, NOTES.A4, NOTES.Fs4, NOTES.D4],
  },
  A: {
    bass: NOTES.A3 / 2, // A2
    arpeggio: [NOTES.A3, NOTES.C4 * 1.06, NOTES.E4, NOTES.A4, NOTES.E4, NOTES.A3],
  },
  Bm7: {
    bass: NOTES.B2,
    arpeggio: [NOTES.Fs4 / 2, NOTES.B3, NOTES.D4, NOTES.Fs4, NOTES.D4, NOTES.B3],
  },
  Gadd9: {
    bass: NOTES.G2,
    arpeggio: [NOTES.G3, NOTES.A3, NOTES.D4, NOTES.G4, NOTES.D4, NOTES.A3],
  },
};

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Toca una cuerda de guitarra acústica pulsada
 */
function pluckString(freq, timeOffset = 0, duration = 3.2, volume = 0.22, isBass = false) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const startTime = ctx.currentTime + timeOffset;

    // Oscilador primario (triangular para calidez acústica)
    const osc = ctx.createOscillator();
    osc.type = isBass ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Oscilador armónico secundario para resonancia de madera
    const harmonicOsc = ctx.createOscillator();
    harmonicOsc.type = 'sine';
    harmonicOsc.frequency.setValueAtTime(freq * (isBass ? 2 : 2.01), startTime);

    // Filtro pasa-bajos para timbre cálido de guitarra
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isBass ? 450 : 1800, startTime);
    filter.frequency.exponentialRampToValueAtTime(isBass ? 120 : 380, startTime + duration);

    // Ganancia envolvente tipo pluck (ataque rápido y decaimiento exponencial)
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.025);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    const harmonicGain = ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.0001, startTime);
    harmonicGain.gain.linearRampToValueAtTime(volume * 0.35, startTime + 0.03);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.7);

    // Conexiones de nodos
    osc.connect(filter);
    harmonicOsc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);

    harmonicOsc.start(startTime);
    harmonicOsc.stop(startTime + duration);
  } catch (err) {
    console.warn('Error en síntesis de guitarra:', err);
  }
}

/**
 * Toca un compás completo de guitarra arpegiada para un acorde
 */
export function playGuitarMeasure(chordName = 'G', durationMs = 4000, volume = 0.25) {
  const pattern = CHORD_PATTERNS[chordName] || CHORD_PATTERNS.G;

  // 1. Tocar el bajo fundamental al inicio
  pluckString(pattern.bass, 0, durationMs / 1000, volume * 1.25, true);

  // 2. Tocar secuencia de arpegios distribuidos en el compás
  const notesCount = pattern.arpeggio.length;
  const intervalSeconds = (durationMs / 1000 - 0.4) / notesCount;

  pattern.arpeggio.forEach((noteFreq, idx) => {
    const delay = idx * intervalSeconds + 0.15;
    pluckString(noteFreq, delay, 2.2, volume * 0.9, false);
  });
}

/**
 * Obtener la mejor voz en español del navegador
 */
export function getBestSpanishVoice() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();

  // Preferencia por voces naturales en español (México, España, Latinoamericana)
  const esVoices = voices.filter((v) => v.lang.startsWith('es'));
  if (esVoices.length === 0) return null;

  // Buscar voces conocidas de alta calidad (Google, Microsoft, Paulina, Jorge, Sabina, etc.)
  const preferred = esVoices.find(
    (v) =>
      v.name.includes('Natural') ||
      v.name.includes('Online') ||
      v.name.includes('Google') ||
      v.name.includes('Helena') ||
      v.name.includes('Paulina') ||
      v.name.includes('Raul') ||
      v.name.includes('Jorge')
  );

  return preferred || esVoices[0];
}

/**
 * Canta/Entona una frase con cadencia poética
 */
export function singLineWithSpeech(text, { voice, pitch = 1.0, rate = 0.86, volume = 1.0, onEnd }) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    if (onEnd) onEnd();
    return;
  }

  // Cancelar frases previas en cola
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  if (voice) utterance.voice = voice;
  utterance.pitch = pitch;
  utterance.rate = rate; // Ritmo pausado y romántico
  utterance.volume = volume;

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = () => onEnd();
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Controlador de Reproducción de Canción Cantada Completa
 */
export class SongSingerController {
  constructor(songId = 'cancion-1', callbacks = {}) {
    this.song = SUNG_SONGS[songId] || SUNG_SONGS['cancion-1'];
    this.callbacks = callbacks; // onLineChange, onPlayStateChange, onComplete
    this.currentIndex = 0;
    this.isPlaying = false;
    this.timer = null;
    this.guitarVolume = 0.28;
    this.voiceVolume = 1.0;
    this.voice = getBestSpanishVoice();

    // Actualizar voces cuando carguen
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.voice = getBestSpanishVoice();
      };
    }
  }

  setVolumes(guitarVol, voiceVol) {
    this.guitarVolume = guitarVol;
    this.voiceVolume = voiceVol;
  }

  start() {
    this.isPlaying = true;
    this.currentIndex = 0;
    if (this.callbacks.onPlayStateChange) this.callbacks.onPlayStateChange(true);
    this._playStep();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (this.callbacks.onPlayStateChange) this.callbacks.onPlayStateChange(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  _playStep() {
    if (!this.isPlaying) return;

    if (this.currentIndex >= this.song.lines.length) {
      // Fin de la canción
      this.isPlaying = false;
      this.currentIndex = 0;
      if (this.callbacks.onPlayStateChange) this.callbacks.onPlayStateChange(false);
      if (this.callbacks.onComplete) this.callbacks.onComplete();
      return;
    }

    const currentLine = this.song.lines[this.currentIndex];

    // 1. Notificar cambio de línea para iluminar en pantalla (efecto karaoke)
    if (this.callbacks.onLineChange) {
      this.callbacks.onLineChange(this.currentIndex, currentLine);
    }

    // 2. Tocar melodía de guitarra para este acorde
    playGuitarMeasure(currentLine.chord, currentLine.durationMs, this.guitarVolume);

    // 3. Entonar la letra poética
    singLineWithSpeech(currentLine.text, {
      voice: this.voice,
      pitch: 1.04,
      rate: 0.85,
      volume: this.voiceVolume,
    });

    // 4. Programar el siguiente verso
    this.timer = setTimeout(() => {
      this.currentIndex++;
      this._playStep();
    }, currentLine.durationMs);
  }
}
