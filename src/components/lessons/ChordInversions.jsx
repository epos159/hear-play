import Staff from "../Staff.jsx";
import { DemoCard, Tip } from "./blocks.jsx";

export default function LessonChordInversions() {
  return (
    <div>
      <h2>Chord Inversions: Same Chord, New Shape</h2>
      <p>
        C–E–G is a C major triad. But so is E–G–C. And G–C–E. A chord keeps its identity no matter
        which of its notes sits on the bottom — each arrangement is an <strong>inversion</strong>.
      </p>

      <h3>The Three Positions</h3>
      <DemoCard title="Root position" formula="C – E – G (root on the bottom)" demo={{ kind: "chord", notes: [60, 64, 67] }}>
        The textbook stack. Grounded and plain — the chord at its most solid.
      </DemoCard>
      <DemoCard title="First inversion" formula="E – G – C (3rd on the bottom)" demo={{ kind: "chord", notes: [64, 67, 72] }}>
        Lighter, leaning forward. The root has jumped up an octave.
      </DemoCard>
      <DemoCard title="Second inversion" formula="G – C – E (5th on the bottom)" demo={{ kind: "chord", notes: [67, 72, 76] }}>
        Open and slightly unsettled — classically it wants to move somewhere.
      </DemoCard>

      <Staff
        clef="treble"
        notes={[
          { letter: "C", octave: 4, label: "C" },
          { letter: "E", octave: 4, label: "E" },
          { letter: "G", octave: 4, label: "G" },
          { letter: "E", octave: 4, label: "E" },
          { letter: "G", octave: 4, label: "G" },
          { letter: "C", octave: 5, label: "C" },
          { letter: "G", octave: 4, label: "G" },
          { letter: "C", octave: 5, label: "C" },
          { letter: "E", octave: 5, label: "E" },
        ]}
        caption="Root position · first inversion · second inversion (three notes each)"
      />

      <h3>Why Bother?</h3>
      <p>
        <strong>Smooth motion.</strong> Jumping between root-position chords makes your hand (and
        the music) leap around. With inversions, neighboring chords can share notes and slide by
        step. Compare:
      </p>
      <DemoCard
        title="C → F → G, all root position"
        demo={{ kind: "progression", chords: [[60, 64, 67], [65, 69, 72], [67, 71, 74]] }}
        playLabel="Hear the leaps"
      >
        Each chord jumps to a new spot.
      </DemoCard>
      <DemoCard
        title="Same chords, voiced with inversions"
        demo={{ kind: "progression", chords: [[60, 64, 67], [60, 65, 69], [59, 67, 74]] }}
        playLabel="Hear it glide"
      >
        C stays put as F arrives around it; everything moves by a step or less. This is called{" "}
        <em>voice leading</em>.
      </DemoCard>

      <Tip>
        The bass note you hear is not always the chord's root. When a progression sounds unusually
        smooth and connected, inversions are almost always the reason.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "E–G–C (E on the bottom) is which position of the C major triad?",
    options: ["Root position", "First inversion", "Second inversion", "Not a C chord anymore"],
    correct: 1,
    why: "With the 3rd (E) in the bass, it's first inversion. Same three notes, same chord — new bottom.",
  },
  {
    q: "What changes when you invert a chord?",
    options: [
      "Its name and quality",
      "Which note is on the bottom — not its identity",
      "It becomes minor",
      "It gains a fourth note",
    ],
    correct: 1,
    why: "Inversion rearranges the stack. C major stays C major whether C, E, or G holds the floor.",
  },
  {
    q: "The main practical reason to use inversions is…",
    options: [
      "They're louder",
      "Smoother connections between chords (voice leading)",
      "They're easier to memorize",
      "They only work on guitar",
    ],
    correct: 1,
    why: "Inversions let adjacent chords share notes and move by step instead of leaping — the glue of good accompaniment.",
  },
];
