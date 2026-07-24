// Resolve declarative audio-demo descriptors into playback. Lets lesson and
// quiz data stay plain JSON-ish objects instead of holding functions.
import {
  stopAll,
  playNote,
  playChord,
  playInterval,
  playProgression,
  playSequence,
  playRhythm,
} from "./audio.js";

/** Play a demo, cancelling anything already sounding. Returns duration in seconds. */
export function playDemo(demo) {
  if (!demo) return 0;
  stopAll();
  switch (demo.kind) {
    case "note":
      return playNote(demo.midi, { dur: 1.4 });
    case "chord":
      return playChord(demo.notes);
    case "interval":
      return playInterval(demo.low, demo.semitones);
    case "progression":
      return playProgression(demo.chords);
    case "sequence":
      return playSequence(demo.notes, demo.step ?? 0.32);
    case "rhythm":
      return playRhythm(demo.tokens, demo.opts);
    default:
      return 0;
  }
}

// Common chord voicings in C, used across lessons and quizzes.
export const V = {
  C: [60, 64, 67],
  Dm: [62, 65, 69],
  Em: [64, 67, 71],
  F: [65, 69, 72],
  G: [67, 71, 74],
  Am: [57, 60, 64],
  Am4: [69, 72, 76],
  Bdim: [59, 62, 65],
  Csus4: [60, 65, 67],
};

export const C_MAJOR_SCALE = [60, 62, 64, 65, 67, 69, 71, 72];
export const A_MINOR_SCALE = [57, 59, 60, 62, 64, 65, 67, 69];
export const C_MINOR_SCALE = [60, 62, 63, 65, 67, 68, 70, 72];
