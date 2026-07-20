import Staff from "../Staff.jsx";
import { DemoCard, Tip } from "./blocks.jsx";
import { V } from "../../demos.js";

export default function LessonTriadBasics() {
  return (
    <div>
      <h2>Triads: Stacking Notes into Chords</h2>
      <p>
        A <strong>chord</strong> is several notes sounding together; the basic model is the{" "}
        <strong>triad</strong> — three notes stacked in thirds. Take a root, skip a letter, take the
        next (the <em>3rd</em>), skip again, take the next (the <em>5th</em>).
      </p>

      <Staff
        clef="treble"
        notes={[
          { letter: "C", octave: 4, label: "root" },
          { letter: "E", octave: 4, label: "3rd" },
          { letter: "G", octave: 4, label: "5th" },
        ]}
        caption="C major triad spelled out — C, E, G"
      />

      <h3>The Four Qualities</h3>
      <DemoCard title="Major — bright, settled" formula="root + major 3rd + perfect 5th (C–E–G)" demo={{ kind: "chord", notes: V.C }}>
        At rest, like standing in sunlight. The high middle note does it.
      </DemoCard>
      <DemoCard title="Minor — tender, wistful" formula="root + minor 3rd + perfect 5th (A–C–E)" demo={{ kind: "chord", notes: V.Am }}>
        Lower the middle note one half-step and noon becomes dusk.
      </DemoCard>
      <DemoCard title="Suspended — floating, unresolved" formula="root + perfect 4th + perfect 5th (C–F–G)" demo={{ kind: "chord", notes: V.Csus4 }}>
        The 3rd is replaced by a 4th, so it's neither major nor minor — it hovers, waiting.
      </DemoCard>
      <DemoCard title="Diminished — tense, uneasy" formula="root + minor 3rd + diminished 5th (B–D–F)" demo={{ kind: "chord", notes: V.Bdim }}>
        Everything squeezed tight, the 5th pulled flat. Film-score unease in one chord.
      </DemoCard>

      <Tip>
        The middle note — the 3rd — is the mood dial. Major and minor triads share their root and
        5th; that one half-step in the middle changes the entire emotional weather.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "A triad is built from…",
    options: [
      "Any three random notes",
      "A root plus a 3rd plus a 5th",
      "Three notes a half-step apart",
      "A root and two octaves",
    ],
    correct: 1,
    why: "Stack two thirds: root, 3rd, 5th. Every triad quality is some flavor of that stack.",
  },
  {
    q: "Listen. Major or minor?",
    demo: { kind: "chord", notes: [62, 65, 69] },
    options: ["Major — bright", "Minor — shadowed"],
    correct: 1,
    why: "That's D minor — the lowered 3rd gives it the dusky color.",
  },
  {
    q: "Which note differs between C major (C–E–G) and C minor (C–E♭–G)?",
    options: ["The root", "The 3rd", "The 5th", "All three"],
    correct: 1,
    why: "Only the middle note moves — E down to E♭. One half-step, whole new mood.",
  },
];
