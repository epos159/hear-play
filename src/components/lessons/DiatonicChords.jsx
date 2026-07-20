import { DemoCard, Tip } from "./blocks.jsx";
import { V } from "../../demos.js";

const FAMILY = [
  { numeral: "I", name: "C major", notes: V.C, job: "Home" },
  { numeral: "ii", name: "D minor", notes: V.Dm, job: "Gentle motion" },
  { numeral: "iii", name: "E minor", notes: V.Em, job: "Wistful color" },
  { numeral: "IV", name: "F major", notes: V.F, job: "The lean away" },
  { numeral: "V", name: "G major", notes: V.G, job: "The pull home" },
  { numeral: "vi", name: "A minor", notes: V.Am, job: "The shadow home" },
  { numeral: "vii°", name: "B diminished", notes: V.Bdim, job: "Maximum tension" },
];

export default function LessonDiatonicChords() {
  return (
    <div>
      <h2>The Chord Family of a Key</h2>
      <p>
        Build a triad on <em>each</em> note of the C major scale using only the scale's own notes,
        and you get seven chords — the key's <strong>diatonic family</strong>. Every pop song
        you know draws mostly from this palette.
      </p>

      <h3>Meet the Family (in C major)</h3>
      {FAMILY.map((c) => (
        <DemoCard key={c.numeral} title={`${c.numeral} — ${c.name}`} demo={{ kind: "chord", notes: c.notes }} playLabel="Hear it">
          {c.job}
        </DemoCard>
      ))}

      <h3>Why Roman Numerals?</h3>
      <p>
        Writing <strong>I–IV–V</strong> instead of C–F–G describes the <em>relationship</em>, not
        the key. A I–IV–V in C is C–F–G; in G it's G–C–D — same movement, same feeling. Numerals are
        how musicians talk about harmony portably. Uppercase = major, lowercase = minor, ° =
        diminished.
      </p>
      <p>
        Notice the pattern — it's the same in every major key: <strong>I, IV, V</strong> are major;{" "}
        <strong>ii, iii, vi</strong> are minor; <strong>vii°</strong> is diminished.
      </p>

      <DemoCard
        title="The three pillars: I, IV, V"
        demo={{ kind: "progression", chords: [V.C, V.F, V.G, V.C] }}
        playLabel="Hear I–IV–V–I"
      >
        Thousands of folk, blues, and rock songs use only these three chords. Home, away, pull,
        home.
      </DemoCard>

      <Tip>
        One scale gives you seven chords for free. Learn the numeral pattern once
        (M–m–m–M–M–m–dim) and you know the chord family of all twelve major keys.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "In any major key, which numerals are the major chords?",
    options: ["I, IV, V", "ii, iii, vi", "I, ii, iii", "IV, V, vii°"],
    correct: 0,
    why: "The pillars I, IV, and V are major; ii, iii, vi come out minor; vii° is diminished. Same pattern, every major key.",
  },
  {
    q: "In the key of C, which chord is vi?",
    options: ["G major", "A minor", "E minor", "F major"],
    correct: 1,
    why: "Count up six scale steps from C: A. Built from scale notes it's A–C–E — A minor, the key's \"shadow home.\"",
  },
  {
    q: "Why write I–IV–V instead of C–F–G?",
    options: [
      "It's shorter to write",
      "Numerals describe the relationship, so it works in any key",
      "Roman numerals look more professional",
      "Letters are reserved for melody",
    ],
    correct: 1,
    why: "Numerals are key-independent: I–IV–V names the same journey whether you're in C, G, or F♯.",
  },
];
