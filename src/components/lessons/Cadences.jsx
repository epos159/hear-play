import { DemoCard, Tip } from "./blocks.jsx";
import { V } from "../../demos.js";

export default function LessonCadences() {
  return (
    <div>
      <h2>Cadences: Musical Punctuation</h2>
      <p>
        Music speaks in phrases, and phrases end with punctuation. A <strong>cadence</strong> is
        how a phrase closes — with a period, a comma, or a plot twist. Four standard endings cover
        nearly everything you'll hear.
      </p>

      <DemoCard
        title="Authentic cadence (V → I) · the period"
        demo={{ kind: "progression", chords: [V.C, V.G, V.C] }}
        playLabel="Hear C – G – C"
      >
        The strongest close in music: maximum pull, full landing. When a piece ends definitively,
        this is almost always why.
      </DemoCard>

      <DemoCard
        title="Plagal cadence (IV → I) · the amen"
        demo={{ kind: "progression", chords: [V.C, V.F, V.C] }}
        playLabel="Hear C – F – C"
      >
        Finished, but gentler — the soft "A-men" that ends hymns. A settling rather than an arrival.
      </DemoCard>

      <DemoCard
        title="Half cadence (ends on V) · the comma"
        demo={{ kind: "progression", chords: [V.C, V.F, V.G] }}
        playLabel="Hear C – F – G…"
      >
        The phrase stops on the pull chord itself — left hanging mid-air. Your ear knows another
        phrase must follow.
      </DemoCard>

      <DemoCard
        title="Deceptive cadence (V → vi) · the plot twist"
        demo={{ kind: "progression", chords: [V.C, V.G, V.Am] }}
        playLabel="Hear C – G – Am"
      >
        Everything promises home… and lands on the shadow chord instead. Composers use it to
        stretch a phrase just when you expected it to end.
      </DemoCard>

      <h3>Listening for Cadences</h3>
      <p>
        At the end of any phrase ask: did it land (period), soften down (amen), hang (comma), or
        swerve (twist)? That's the entire skill — and it's exactly what the practice game drills.
      </p>

      <Tip>
        Cadences are why music feels like language. The V → I motion is the engine: V builds the
        expectation, and every cadence type is defined by how it honors or dodges that promise.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "Listen. Which cadence ends this phrase?",
    demo: { kind: "progression", chords: [[60, 64, 67], [67, 71, 74], [60, 64, 67]] },
    options: ["Authentic (V → I)", "Plagal (IV → I)", "Half (ends on V)", "Deceptive (V → vi)"],
    correct: 0,
    why: "G to C — the strong pull resolving fully home. The musical period.",
  },
  {
    q: "Listen. Finished or left hanging?",
    demo: { kind: "progression", chords: [[60, 64, 67], [65, 69, 72], [67, 71, 74]] },
    options: ["Finished — it landed", "Hanging — it stopped on the pull chord"],
    correct: 1,
    why: "That was a half cadence: the phrase parks on V, mid-sentence. Another phrase has to answer it.",
  },
  {
    q: "A deceptive cadence (V → vi) works by…",
    options: [
      "Ending louder than expected",
      "Promising home but landing on the shadow chord",
      "Repeating the last chord twice",
      "Skipping the V chord entirely",
    ],
    correct: 1,
    why: "V sets up the expectation of I; vi swerves into it. The surprise is the point — it extends the story.",
  },
];
