// Web Audio engine — warm synthesized piano-ish tones, no samples needed.
import { midiToFreq } from "./theory.js";

let ctx = null;
// All sounding nodes route through this bus so stopAll() can duck and replace
// it — otherwise overlapping Play clicks stack oscillators forever.
let master = null;

export function audioCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function getMaster() {
  const ac = audioCtx();
  if (!master) {
    master = ac.createGain();
    master.gain.value = 1;
    master.connect(ac.destination);
  }
  return master;
}

/** Silence anything currently scheduled and start a fresh mix bus. */
export function stopAll() {
  if (!ctx || !master) return;
  const ac = ctx;
  const now = ac.currentTime;
  const old = master;
  try {
    old.gain.cancelScheduledValues(now);
    old.gain.setValueAtTime(Math.max(old.gain.value, 0.0001), now);
    old.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
  } catch {
    /* ignore */
  }
  master = ac.createGain();
  master.gain.value = 1;
  master.connect(ac.destination);
  // Disconnect the ducked bus after the fade finishes.
  setTimeout(() => {
    try {
      old.disconnect();
    } catch {
      /* ignore */
    }
  }, 80);
}

// A single note: fundamental + a few decaying partials through a shared envelope.
// Returns the scheduled end time offset (seconds from now) for lock/disable UI.
export function playNote(midi, { when = 0, dur = 1.4, gain = 0.4 } = {}) {
  const ac = audioCtx();
  const t = ac.currentTime + when;
  const freq = midiToFreq(midi);
  const dest = getMaster();

  const noteGain = ac.createGain();
  noteGain.gain.setValueAtTime(0.0001, t);
  noteGain.gain.exponentialRampToValueAtTime(gain, t + 0.015);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  const filter = ac.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = Math.min(freq * 6, 8000);
  noteGain.connect(filter).connect(dest);

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
    osc.connect(g).connect(noteGain);
    osc.start(t);
    osc.stop(t + dur + 0.1);
  }
  return when + dur;
}

// Chord with a soft strum so it sounds human.
export function playChord(midis, { when = 0, dur = 1.8, gain = 0.32, strum = 0.03 } = {}) {
  let end = when;
  midis.forEach((m, i) => {
    const e = playNote(m, { when: when + i * strum, dur, gain });
    if (e > end) end = e;
  });
  return end;
}

// Two notes in sequence (interval training).
export function playInterval(low, semitones, { gap = 0.75 } = {}) {
  playNote(low, { dur: 1.1 });
  return playNote(low + semitones, { when: gap, dur: 1.4 });
}

// Chord progression, one chord per beat.
export function playProgression(chords, { beat = 0.95 } = {}) {
  let end = 0;
  chords.forEach((chord, i) => {
    const last = i === chords.length - 1;
    const e = playChord(chord, { when: i * beat, dur: last ? 2.4 : 1.2 });
    if (e > end) end = e;
  });
  return end;
}

// Simple accompaniment patterns for the At the Piano screen.
export function playPattern(chord, pattern) {
  const [r, third, fifth] = chord;
  if (pattern === "pillars") {
    playChord(chord, { dur: 2.6, gain: 0.34 });
    return playChord(chord, { when: 1.4, dur: 2.6, gain: 0.3 });
  }
  if (pattern === "broken") {
    let end = 0;
    [r, third, fifth, third, r + 12, third, fifth, third].forEach((m, i) => {
      const e = playNote(m, { when: i * 0.28, dur: 0.9, gain: 0.32 });
      if (e > end) end = e;
    });
    return end;
  }
  if (pattern === "waltz") {
    let end = 0;
    [0, 1, 2, 3, 4, 5].forEach((i) => {
      const beatInBar = i % 3;
      const e =
        beatInBar === 0
          ? playNote(r - 12, { when: i * 0.42, dur: 0.8, gain: 0.4 })
          : playChord([third, fifth], { when: i * 0.42, dur: 0.6, gain: 0.24 });
      if (e > end) end = e;
    });
    return end;
  }
  return 0;
}

// Play a sequence of notes in order (for scales, etc.)
export function playSequence(notes, stepDuration = 0.3, { gain = 0.35 } = {}) {
  let end = 0;
  notes.forEach((midi, i) => {
    const e = playNote(midi, { when: i * stepDuration, dur: stepDuration * 0.8, gain });
    if (e > end) end = e;
  });
  return end;
}

// Beats each note value gets, assuming a quarter note = 1 beat.
export const NOTE_VALUE_BEATS = { whole: 4, half: 2, quarter: 1, eighth: 0.5, sixteenth: 0.25 };

// Play a rhythm as a click track: tokens are note-value names ("quarter",
// "eighth", ...) or a rest of that value ("rest-quarter"). Rests advance the
// clock silently. The first beat can be accented to teach downbeat feel.
export function playRhythm(tokens, { beatDur = 0.45, midi = 76, gain = 0.32, accentFirst = false } = {}) {
  let t = 0;
  tokens.forEach((token, i) => {
    const isRest = token.startsWith("rest-");
    const beats = NOTE_VALUE_BEATS[isRest ? token.slice(5) : token] ?? 1;
    if (!isRest) {
      const accent = accentFirst && i === 0;
      playNote(midi, {
        when: t,
        dur: Math.min(beats * beatDur * 0.65, beatDur * 0.9),
        gain: accent ? gain * 1.35 : gain,
      });
    }
    t += beats * beatDur;
  });
  return t;
}
