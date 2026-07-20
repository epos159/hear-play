import Staff from "../Staff.jsx";
import { DemoCard, Tip } from "./blocks.jsx";
import { C_MAJOR_SCALE } from "../../demos.js";

export default function LessonMajorScale() {
  return (
    <div>
      <h2>The Major Scale</h2>
      <p>
        A <strong>scale</strong> is a ladder of notes. The <strong>major scale</strong> — the
        do-re-mi pattern — is the most important ladder in Western music: bright, settled, and the
        reference point everything else is measured against.
      </p>

      <DemoCard
        title="C major, bottom to top"
        demo={{ kind: "sequence", notes: C_MAJOR_SCALE }}
        playLabel="Play the scale"
      >
        Sing along: do, re, mi, fa, sol, la, ti, do.
      </DemoCard>

      <Staff
        clef="treble"
        notes={[
          { letter: "C", octave: 4, label: "do" },
          { letter: "D", octave: 4, label: "re" },
          { letter: "E", octave: 4, label: "mi" },
          { letter: "F", octave: 4, label: "fa" },
          { letter: "G", octave: 4, label: "sol" },
          { letter: "A", octave: 4, label: "la" },
          { letter: "B", octave: 4, label: "ti" },
          { letter: "C", octave: 5, label: "do" },
        ]}
        caption="C major on the staff — tap any note"
      />

      <h3>The Recipe</h3>
      <p>
        What makes it sound "major" is the spacing between steps. In half-steps, every major scale —
        no matter where it starts — follows:
      </p>
      <div className="formula-box">
        W – W – H – W – W – W – H
        <span>whole, whole, half, whole, whole, whole, half</span>
      </div>
      <p>
        C major happens to use only white keys, which is why it's the beginner's home. Start the
        same recipe on G and you'll need one black key (F♯); start on D, two. Same recipe, same
        sound, different starting note — that's what a <strong>key</strong> is.
      </p>

      <h3>Each Note Has a Job</h3>
      <p>
        The 1st note (<strong>do</strong>) is home — the note the music wants to end on. The 5th
        (<strong>sol</strong>) is its strongest partner. The 7th (<strong>ti</strong>) leans so hard
        toward home it's called the <em>leading tone</em>. You'll meet these jobs formally in the
        Scale Degrees lesson.
      </p>

      <Tip>
        One recipe, twelve starting notes, twelve major keys — all of them sound like "do-re-mi"
        because the spacing, not the starting pitch, is what your ear recognizes.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "What is the step recipe of every major scale?",
    options: ["W–W–H–W–W–W–H", "W–H–W–W–H–W–W", "H–W–W–H–W–W–W", "All whole steps"],
    correct: 0,
    why: "Whole–whole–half–whole–whole–whole–half. The two half-steps (mi→fa and ti→do) give the major scale its shape.",
  },
  {
    q: "Listen. Is this a major scale?",
    demo: { kind: "sequence", notes: [60, 62, 64, 65, 67, 69, 71, 72] },
    options: ["Yes — it's do-re-mi all the way up", "No — something is lowered"],
    correct: 0,
    why: "That's C major: the familiar bright do-re-mi ladder with no alterations.",
  },
  {
    q: "Why does G major need an F♯?",
    options: [
      "To make it sound different from C",
      "To keep the W–W–H–W–W–W–H spacing when starting on G",
      "Because sharps sound happier",
      "It doesn't — G major has no sharps",
    ],
    correct: 1,
    why: "The recipe is fixed. Starting on G, the seventh step must sit a half-step below G — that's F♯, not F.",
  },
];
