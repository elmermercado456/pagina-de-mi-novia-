/**
 * Sound Engine para ambientación íntima (Web Audio API)
 * Genera acordes cálidos y envolventes que funcionan sin necesidad de archivos externos.
 * Si se especifica una URL de audio real en LOVE_DATA, reproducirá el archivo.
 */

let audioCtx = null;
let ambientInterval = null;

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

// Frecuencias para arpegios de Sol Mayor y Do Novena (Cálidos estilo balada acústica)
const CHORD_FREQS = {
  G: [196.0, 246.94, 293.66, 392.0, 493.88], // G3, B3, D4, G4, B4
  Cadd9: [261.63, 329.63, 392.0, 587.33], // C4, E4, G4, D5
  Em7: [164.81, 246.94, 329.63, 392.0, 493.88], // E3, B3, E4, G4, B4
  D: [293.66, 369.99, 440.0, 587.33], // D4, F#4, A4, D5
};

export function playWarmPluck(freq, delay = 0, duration = 3.5) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Mellow acoustic tone: Triangle wave with lowpass filter
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    // Warm filtering
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime + delay);
    filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + delay + duration);

    // Exponential pluck decay envelope
    const now = ctx.currentTime + delay;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  } catch (err) {
    console.warn('Audio no disponible en este momento:', err);
  }
}

export function playAcousticChord(chordName = 'G') {
  const freqs = CHORD_FREQS[chordName] || CHORD_FREQS.G;
  freqs.forEach((freq, idx) => {
    playWarmPluck(freq, idx * 0.12, 4.0);
  });
}

export function startAmbientLoop(onStep) {
  const chords = ['G', 'Cadd9', 'Em7', 'D'];
  let currentIdx = 0;

  playAcousticChord(chords[currentIdx]);
  if (onStep) onStep(chords[currentIdx]);

  ambientInterval = setInterval(() => {
    currentIdx = (currentIdx + 1) % chords.length;
    playAcousticChord(chords[currentIdx]);
    if (onStep) onStep(chords[currentIdx]);
  }, 4800);

  return () => {
    if (ambientInterval) {
      clearInterval(ambientInterval);
      ambientInterval = null;
    }
  };
}
