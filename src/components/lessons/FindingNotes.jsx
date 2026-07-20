import Staff from "../Staff.jsx";
import { Tip } from "./blocks.jsx";

export default function LessonFindingNotes() {
  return (
    <div>
      <h2>Finding Notes on the Staff</h2>
      <p>
        Reading music is just recognizing where a note sits. There are only seven letter names —
        A through G — and they repeat as you climb. Every step up (line → space → line) is the next
        letter.
      </p>

      <h3>Climbing the Treble Staff</h3>
      <p>Here's every note from the bottom line to the top line. Tap each one to hear it rise.</p>
      <Staff
        clef="treble"
        notes={[
          { letter: "E", octave: 4, label: "E" },
          { letter: "F", octave: 4, label: "F" },
          { letter: "G", octave: 4, label: "G" },
          { letter: "A", octave: 4, label: "A" },
          { letter: "B", octave: 4, label: "B" },
          { letter: "C", octave: 5, label: "C" },
          { letter: "D", octave: 5, label: "D" },
          { letter: "E", octave: 5, label: "E" },
          { letter: "F", octave: 5, label: "F" },
        ]}
        caption="Line, space, line, space — each step is the next letter"
      />

      <h3>Middle C and Ledger Lines</h3>
      <p>
        Notes don't stop at the staff's edges. Short extra lines called <strong>ledger lines</strong>{" "}
        extend it. The most famous resident is <strong>middle C</strong> — one ledger line below the
        treble staff, right in the middle of the piano.
      </p>
      <Staff
        clef="treble"
        notes={[
          { letter: "C", octave: 4, label: "middle C" },
          { letter: "D", octave: 4, label: "D" },
          { letter: "A", octave: 5, label: "A" },
        ]}
        caption="Middle C on its ledger line below; A above the staff on a ledger line of its own"
      />

      <h3>How to Get Fast</h3>
      <p>
        Don't count up from E every time. Memorize a few <strong>anchor notes</strong> — G (the clef's
        own line), middle C, and top-line F — then find neighbors from the nearest anchor.
      </p>

      <Tip>
        Speed comes from anchors, not counting. Three memorized notes put every other note within
        one or two steps of something you already know.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "What note is this?",
    staff: { clef: "treble", notes: [{ letter: "G", octave: 4 }] },
    options: ["E", "G", "B", "D"],
    correct: 1,
    why: "It's on the second line from the bottom — the line the treble clef itself curls around: G.",
  },
  {
    q: "What note is this, sitting on a ledger line below the staff?",
    staff: { clef: "treble", notes: [{ letter: "C", octave: 4 }] },
    options: ["Middle C", "Low A", "D", "E"],
    correct: 0,
    why: "One ledger line below the treble staff is middle C — the center of the piano and your most useful anchor note.",
  },
  {
    q: "What note is this?",
    staff: { clef: "treble", notes: [{ letter: "A", octave: 4 }] },
    options: ["F", "G", "A", "B"],
    correct: 2,
    why: "It's in the second space up. The spaces spell F–A–C–E, so the second space is A.",
  },
];
