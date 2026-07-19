// Web Audio engine — warm synthesized piano-ish tones, no samples needed.
import { midiToFreq } from "./theory.js";

let ctx = null;

export function audioCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

// A single note: fundamental + a few decaying partials through a shared envelope.
export function playNote(midi, { when = 0, dur = 1.4, gain = 0.4 } = {}) {
  const ac = audioCtx();
  const t = ac.currentTime + when;
  const freq = midiToFreq(midi);

  const master = ac.createGain();
  master.gain.setValueAtTime(0.0001, t);
  master.gain.exponentialRampToValueAtTime(gain, t + 0.015);
  master.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  // gentle lowpass keeps it warm rather than buzzy
  const filter = ac.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = Math.min(freq * 6, 8000);
  master.connect(filter).connect(ac.destination);

  const partials = [
    [1, 1.0, "triangle"],
    [2, 0.35, "sine"],
    [3, 0.12, "sine"],
    [4, 0.05, "sine"],
  ];
  for (const [mult, amp, type] of partials) {
    const osc = ac.createOscillator();
    osc.type = type;
    osc.frequency.value = freq * mult;
    const g = ac.createGain();
    g.gain.value = amp;
    osc.connect(g).connect(master);
    osc.start(t);
    osc.stop(t + dur + 0.1);
  }
}

// Chord with a soft strum so it sounds human.
export function playChord(midis, { when = 0, dur = 1.8, gain = 0.32, strum = 0.03 } = {}) {
  midis.forEach((m, i) => playNote(m, { when: when + i * strum, dur, gain }));
}

// Two notes in sequence (interval training).
export function playInterval(low, semitones, { gap = 0.75 } = {}) {
  playNote(low, { dur: 1.1 });
  playNote(low + semitones, { when: gap, dur: 1.4 });
}

// Chord progression, one chord per beat.
export function playProgression(chords, { beat = 0.95 } = {}) {
  chords.forEach((chord, i) => {
    const last = i === chords.length - 1;
    playChord(chord, { when: i * beat, dur: last ? 2.4 : 1.2 });
  });
  return chords.length * 0.95 + 1.5; // rough total seconds
}

// Simple accompaniment patterns for the At the Piano screen.
export function playPattern(chord, pattern) {
  const [r, third, fifth] = chord;
  if (pattern === "pillars") {
    playChord(chord, { dur: 2.6, gain: 0.34 });
    playChord(chord, { when: 1.4, dur: 2.6, gain: 0.3 });
  } else if (pattern === "broken") {
    [r, third, fifth, third, r + 12, third, fifth, third].forEach((m, i) =>
      playNote(m, { when: i * 0.28, dur: 0.9, gain: 0.32 })
    );
  } else if (pattern === "waltz") {
    [0, 1, 2, 3, 4, 5].forEach((i) => {
      const beatInBar = i % 3;
      if (beatInBar === 0) playNote(r - 12, { when: i * 0.42, dur: 0.8, gain: 0.4 });
      else playChord([third, fifth], { when: i * 0.42, dur: 0.6, gain: 0.24 });
    });
  }
}
