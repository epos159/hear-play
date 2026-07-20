import Staff from "../Staff.jsx";
import { DemoCard, Tip } from "./blocks.jsx";

export default function LessonOctaves() {
  return (
    <div>
      <h2>Octaves and Pitch</h2>
      <p>
        Play a C, then the next C above it. They're different pitches, yet they sound like{" "}
        <em>the same note, higher</em>. That distance is an <strong>octave</strong> — and it's why
        there are only seven letter names: after G, the alphabet starts over.
      </p>

      <DemoCard
        title="Two Cs, one octave apart"
        demo={{ kind: "sequence", notes: [60, 72], step: 0.6 }}
        playLabel="Hear C4 → C5"
      >
        The upper note vibrates exactly twice as fast — 100% mathematically related, which is why
        your ear hears them as family.
      </DemoCard>

      <Staff
        clef="treble"
        notes={[
          { letter: "C", octave: 4, label: "C4" },
          { letter: "C", octave: 5, label: "C5" },
        ]}
        caption="C4 (middle C) and C5 — same letter, one octave apart"
      />

      <h3>Naming Octaves: C4, A4, C5…</h3>
      <p>
        Musicians number octaves so "which C?" has an answer. Each number spans C up to the next B.
        Middle C is <strong>C4</strong>. The A above it — <strong>A4</strong> — is the note
        orchestras tune to (440 vibrations per second).
      </p>

      <DemoCard
        title="One note across three octaves"
        demo={{ kind: "sequence", notes: [48, 60, 72], step: 0.55 }}
        playLabel="Hear C3 → C4 → C5"
      >
        Low, middle, high — but unmistakably all "C." Register changes; identity doesn't.
      </DemoCard>

      <h3>Why the Two Clefs Exist</h3>
      <p>
        The piano spans more than seven octaves — far too many notes for one staff. The treble and
        bass staves are two windows onto that range, meeting in the middle at middle C.
      </p>

      <Tip>
        An octave is 12 half-steps (count every key, black and white, on a piano). Same letter name,
        doubled vibration speed, one staff-position cycle — three descriptions of the same distance.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "Two notes an octave apart have…",
    options: [
      "Different letter names",
      "The same letter name",
      "Nothing in common",
      "The same exact pitch",
    ],
    correct: 1,
    why: "An octave lands on the same letter name, one cycle higher — that's why C repeats up the keyboard.",
  },
  {
    q: "How many half-steps (semitones) make an octave?",
    options: ["7", "8", "10", "12"],
    correct: 3,
    why: "Twelve — count every key, black and white, from one C to the next. The name \"octave\" comes from the eight letter-name steps (C-D-E-F-G-A-B-C).",
  },
  {
    q: "Which note is middle C?",
    options: ["C3", "C4", "C5", "A4"],
    correct: 1,
    why: "Middle C is C4 in scientific pitch notation. (A4, at 440 Hz, is the tuning note just above it.)",
  },
];
