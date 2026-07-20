import { DemoCard, Tip } from "./blocks.jsx";
import Staff from "../Staff.jsx";

export default function LessonKeySignatures() {
  return (
    <div>
      <h2>Key Signatures</h2>
      <p>
        You already know that a sharp or flat next to a note raises or lowers it. But if a whole
        scale needs the same sharp or flat over and over — every single F, say — writing it in
        front of every note would be exhausting to read and write. So instead, we write it{" "}
        <strong>once, at the start of every line</strong>: that's a key signature. It applies for
        the rest of the piece, silently, until something cancels it.
      </p>

      <h3>C Major: The Simplest Case</h3>
      <p>
        The C major scale uses only the white keys — no sharps, no flats. So its key signature is
        empty. That's why C major is usually the first scale anyone learns: nothing to remember
        yet.
      </p>
      <Staff
        clef="treble"
        notes={[
          { letter: "C", octave: 4 },
          { letter: "D", octave: 4 },
          { letter: "E", octave: 4 },
          { letter: "F", octave: 4 },
          { letter: "G", octave: 4 },
          { letter: "A", octave: 4 },
          { letter: "B", octave: 4 },
          { letter: "C", octave: 5 },
        ]}
        caption="C major — no sharps or flats"
      />

      <h3>Move the Scale, and the Sharps Follow</h3>
      <p>
        Every major scale follows the exact same pattern of steps — whole, whole, half, whole,
        whole, whole, half. Start that pattern on a note other than C, and you'll need a sharp or
        flat somewhere to keep the pattern intact. Start on G, and the 7th note needs to be raised
        to F♯ — otherwise the scale wouldn't sound "major" anymore.
      </p>
      <DemoCard
        title="G major — one sharp (F♯)"
        demo={{ kind: "sequence", notes: [67, 69, 71, 72, 74, 76, 78, 79], step: 0.26 }}
      >
        Same bright, settled sound as C major — just shifted up, with F♯ keeping the pattern
        correct.
      </DemoCard>
      <DemoCard
        title="F major — one flat (B♭)"
        demo={{ kind: "sequence", notes: [65, 67, 69, 70, 72, 74, 76, 77], step: 0.26 }}
      >
        Same pattern again, shifted the other way — this time it's B that needs to be lowered.
      </DemoCard>

      <h3>Reading the Count</h3>
      <p>
        Instead of memorizing which note is sharp or flat in all 15 possible keys right away, just
        remember: the <strong>number</strong> of sharps or flats tells you the key. Sharps and
        flats are always added in the same fixed order, too — sharps follow{" "}
        <strong>F–C–G–D–A–E–B</strong>, flats follow that exact order backwards,{" "}
        <strong>B–E–A–D–G–C–F</strong>. One sharp is always F♯ first; two sharps are always F♯ and
        C♯; and so on.
      </p>

      <Tip>
        You don't need all 15 key signatures memorized today. Just internalize the idea: the key
        signature is a shortcut, the count of sharps/flats identifies the key, and there's a fixed
        order they get added in. The Circle of Fifths (next lesson) makes that order visual and
        much easier to hold onto.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "Why do we write a key signature instead of a sharp next to every note?",
    options: [
      "It looks more traditional",
      "It's a shortcut — one mark covers every occurrence of that note for the whole piece",
      "It changes the tempo",
      "It's required for bass clef only",
    ],
    correct: 1,
    why: "A key signature applies to every occurrence of that note letter, in every octave, for as long as it's in effect — much simpler than marking each one individually.",
  },
  {
    q: "How many sharps or flats does C major have?",
    options: ["None", "One sharp", "One flat", "Three sharps"],
    correct: 0,
    why: "C major is the only major key with an empty key signature — all white keys.",
  },
  {
    q: "G major's key signature has one sharp. Which note is it?",
    options: ["C♯", "F♯", "B♭", "G♯"],
    correct: 1,
    why: "F♯ — raising the 7th note of the G major scale keeps the whole-whole-half... pattern intact.",
  },
  {
    q: "What's the fixed order sharps are added to key signatures?",
    options: ["F–C–G–D–A–E–B", "A–B–C–D–E–F–G", "B–E–A–D–G–C–F", "C–G–D–A–E–B–F"],
    correct: 0,
    why: "F–C–G–D–A–E–B — the same order the Circle of Fifths moves through clockwise, one sharp at a time.",
  },
];
