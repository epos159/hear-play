import Staff from "../Staff.jsx";
import { Tip } from "./blocks.jsx";

export default function LessonStaffBasics() {
  return (
    <div>
      <h2>The Musical Staff</h2>
      <p>
        Written music lives on a <strong>staff</strong> — five lines and the four spaces between
        them. Each line and space holds one note. The higher a note sits, the higher it sounds.
      </p>

      <h3>The Treble Clef</h3>
      <p>
        The swirl at the left is a <strong>clef</strong> — it tells you which notes the lines carry.
        The treble clef curls around the second line from the bottom, naming it <strong>G</strong>.
        It handles higher notes: melodies, the right hand at the piano.
      </p>
      <Staff clef="treble" guide="lines" caption="Treble staff — the five lines are E · G · B · D · F (“Every Good Boy Does Fine”)" />
      <Staff clef="treble" guide="spaces" caption="The four spaces spell a word: F · A · C · E" />

      <h3>The Bass Clef</h3>
      <p>
        The bass clef's two dots sit either side of the second line from the top, naming it{" "}
        <strong>F</strong>. It handles lower notes: bass lines, the left hand at the piano.
      </p>
      <Staff clef="bass" guide="lines" caption="Bass staff lines — G · B · D · F · A (“Good Boys Do Fine Always”)" />
      <Staff clef="bass" guide="spaces" caption="Bass staff spaces — A · C · E · G (“All Cows Eat Grass”)" />

      <Tip>
        Same five lines, different clef, different notes. Always glance at the clef first — it's the
        key that unlocks everything else on the staff.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "Which line does the treble clef curl around?",
    options: ["The bottom line (E)", "The second line (G)", "The middle line (B)", "The top line (F)"],
    correct: 1,
    why: "The treble clef is also called the G clef — its spiral wraps the G line, second from the bottom.",
  },
  {
    q: "What note is this?",
    staff: { clef: "treble", notes: [{ letter: "C", octave: 5 }] },
    options: ["A", "B", "C", "E"],
    correct: 2,
    why: "It sits in the third space up. The treble spaces spell F–A–C–E from the bottom, so the third space is C.",
  },
  {
    q: "The bass clef's two dots surround which note's line?",
    options: ["C", "A", "F", "G"],
    correct: 2,
    why: "The bass clef is the F clef — its dots bracket the F line, second from the top.",
  },
];
