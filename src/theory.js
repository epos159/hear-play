// Music theory helpers — notes, intervals, chords

export const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function noteName(midi) {
  return NOTE_NAMES[midi % 12];
}

export function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Chord qualities: intervals from the root, plus the emotional vocabulary
// that Hear Then Play leads with.
export const CHORD_QUALITIES = {
  major: {
    label: "Major",
    intervals: [0, 4, 7],
    feeling: "Bright · settled · sunlight",
    why: "The middle note (the major third) sits high and confident. Nothing is pulling anywhere — the chord is at rest, like standing in sunlight.",
  },
  minor: {
    label: "Minor",
    intervals: [0, 3, 7],
    feeling: "Tender · wistful · dusk",
    why: "Lower the middle note by one small step and the chord softens. That lowered third is the sound of tenderness — dusk instead of noon.",
  },
  sus4: {
    label: "Suspended",
    intervals: [0, 5, 7],
    feeling: "Floating · waiting · open sky",
    why: "The middle note has been lifted so it's neither major nor minor — it hovers. Your ear waits for it to land. That waiting is the feeling.",
  },
  dim: {
    label: "Diminished",
    intervals: [0, 3, 6],
    feeling: "Tense · uneasy · storm coming",
    why: "Every note is squeezed close together and the top note is pulled flat. Nothing agrees. Film composers use this for exactly that uneasy feeling.",
  },
};

export function buildChord(rootMidi, quality) {
  return CHORD_QUALITIES[quality].intervals.map((i) => rootMidi + i);
}

// Intervals with song anchors and character words
export const INTERVALS = [
  { semitones: 2, label: "A single step", anchor: "“Happy Birthday” (py–birth, the first rise)", character: "walking to the next note" },
  { semitones: 3, label: "A soft leap", anchor: "“Greensleeves” (a–las)", character: "gentle, a little melancholy" },
  { semitones: 4, label: "A warm leap", anchor: "“Oh When the Saints” (oh–when)", character: "warm and happy" },
  { semitones: 5, label: "A sturdy leap", anchor: "“Here Comes the Bride” (here–comes)", character: "rising, ceremonial" },
  { semitones: 7, label: "An open leap", anchor: "“Twinkle Twinkle” (twin–kle ↑)", character: "open, heroic" },
  { semitones: 12, label: "A leap home", anchor: "“Somewhere Over the Rainbow” (some–where)", character: "a full octave — same note, higher home" },
];

// Cadence phrases in C major for the "Finished or Still Going?" game.
// Each entry: chord progression (arrays of midi notes) + whether it resolves.
const C = 60, F = 65, G = 67, Am = 57;
export const CADENCES = [
  {
    finished: true,
    chords: [
      [C, C + 4, C + 7],
      [F, F + 4, F + 7],
      [G, G + 4, G + 7],
      [C, C + 4, C + 7],
    ],
    why: "The phrase ends on the home chord (the one it started from). Your ear hears the journey close — like a sentence ending with a period.",
  },
  {
    finished: false,
    chords: [
      [C, C + 4, C + 7],
      [F, F + 4, F + 7],
      [C, C + 4, C + 7],
      [G, G + 4, G + 7],
    ],
    why: "The phrase stops on the away chord — the one that leans back toward home. It's a comma, not a period. Your ear is still waiting.",
  },
  {
    finished: true,
    chords: [
      [Am, Am + 3, Am + 7],
      [F, F + 4, F + 7],
      [G, G + 4, G + 7],
      [C, C + 4, C + 7],
    ],
    why: "Even starting from a wistful place, the phrase walks home and lands there. Landing on home = finished, no matter where you began.",
  },
  {
    finished: false,
    chords: [
      [C, C + 4, C + 7],
      [Am, Am + 3, Am + 7],
      [F, F + 4, F + 7],
      [F, F + 2, F + 7],
    ],
    why: "The last chord is suspended — its middle note hovers, refusing to pick a direction. Hovering is the opposite of finished.",
  },
];

export function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Shuffle a multiple-choice option list while tracking where the correct
// answer landed, so quizzes don't always show the answer in the same spot.
export function shuffleOptions(options, correctIndex) {
  const paired = options.map((opt, i) => ({ opt, isCorrect: i === correctIndex }));
  const mixed = shuffle(paired);
  return { options: mixed.map((p) => p.opt), correct: mixed.findIndex((p) => p.isCorrect) };
}
