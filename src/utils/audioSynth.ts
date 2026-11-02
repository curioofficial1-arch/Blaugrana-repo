/**
 * Pure Web Audio API Blaugrana Fanfare & Stadium Ambience Synthesizer.
 * Synthesizes the memorable triumphant melodic intervals of the iconic Barça fanfare.
 */

let activeAudioCtx: AudioContext | null = null;

export function playBarcaAnthemFanfare(onComplete?: () => void): () => void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return () => {};

    if (activeAudioCtx) {
      activeAudioCtx.close().catch(() => {});
    }

    const ctx = new AudioContextClass();
    activeAudioCtx = ctx;

    // Melodic notes representing the famous fanfare motif
    // C4, E4, G4, C5, G4, C5
    const notes = [
      { freq: 261.63, duration: 0.28, delay: 0.0 }, // C4
      { freq: 329.63, duration: 0.28, delay: 0.3 }, // E4
      { freq: 392.00, duration: 0.28, delay: 0.6 }, // G4
      { freq: 523.25, duration: 0.45, delay: 0.9 }, // C5 (Bar-ça!)
      { freq: 392.00, duration: 0.32, delay: 1.4 }, // G4
      { freq: 523.25, duration: 0.75, delay: 1.75 }, // C5 (Bar-ça!)
      { freq: 659.25, duration: 0.9, delay: 2.55 }, // E5 (Baaaar-ça!)
    ];

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Warm subtle reverb simulation via delay
    const delay = ctx.createDelay();
    delay.delayTime.value = 0.22;
    const delayFeedback = ctx.createGain();
    delayFeedback.gain.value = 0.25;
    delay.connect(delayFeedback);
    delayFeedback.connect(delay);
    masterGain.connect(delay);
    delay.connect(ctx.destination);

    notes.forEach((note) => {
      const startTime = ctx.currentTime + note.delay;
      
      // Brass-like dual oscillator
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sawtooth';

      osc1.frequency.setValueAtTime(note.freq, startTime);
      osc2.frequency.setValueAtTime(note.freq * 1.003, startTime); // subtle detune for stadium warmth

      noteGain.gain.setValueAtTime(0.001, startTime);
      noteGain.gain.exponentialRampToValueAtTime(0.22, startTime + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + note.duration);

      osc1.connect(noteGain);
      osc2.connect(noteGain);
      noteGain.connect(masterGain);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + note.duration + 0.05);
      osc2.stop(startTime + note.duration + 0.05);
    });

    const totalDuration = 3.6;
    const timeoutId = window.setTimeout(() => {
      if (onComplete) onComplete();
    }, totalDuration * 1000);

    return () => {
      window.clearTimeout(timeoutId);
      if (activeAudioCtx === ctx) {
        masterGain.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
        setTimeout(() => {
          ctx.close().catch(() => {});
          activeAudioCtx = null;
        }, 100);
      }
    };
  } catch (err) {
    console.warn('Audio synthesis unavailable', err);
    return () => {};
  }
}
