import { Compare, DemoCard, Tip } from "./blocks.jsx";

export default function LessonIntervalQuality() {
  return (
    <div>
      <h2>Interval Quality: Major, Minor, Perfect</h2>
      <p>
        "Seven half-steps" is a mouthful, so musicians name intervals two ways at once: a{" "}
        <strong>number</strong> (how many letter names you cross) and a <strong>quality</strong>{" "}
        (the exact flavor). C up to E is a <em>third</em>; whether it's a <em>major</em> or{" "}
        <em>minor</em> third depends on the half-step count.
      </p>

      <h3>Major vs. Minor: One Half-Step of Mood</h3>
      <Compare
        a={{
          title: "Major 3rd (4 half-steps)",
          demo: { kind: "interval", low: 60, semitones: 4 },
          text: "C → E. Warm, bright — the opening of \"Oh When the Saints.\"",
        }}
        b={{
          title: "Minor 3rd (3 half-steps)",
          demo: { kind: "interval", low: 60, semitones: 3 },
          text: "C → E♭. Gentle, melancholy — the start of \"Greensleeves.\"",
        }}
      />
      <p>
        Seconds, thirds, sixths, and sevenths all come in this major/minor pair — the larger version
        is "major," and shrinking it by a half-step makes it "minor."
      </p>

      <h3>The "Perfect" Family</h3>
      <p>
        Unisons, 4ths, 5ths, and octaves are different: they're so acoustically stable they get one
        neutral name — <strong>perfect</strong>. They sound open and pure rather than happy or sad.
      </p>
      <DemoCard title="Perfect 5th (7 half-steps)" demo={{ kind: "interval", low: 60, semitones: 7 }}>
        Neither major nor minor — just solid. Power chords in rock are bare perfect 5ths.
      </DemoCard>

      <h3>Squeezed and Stretched</h3>
      <p>
        Shrink a perfect interval by a half-step and it becomes <strong>diminished</strong>; stretch
        it and it's <strong>augmented</strong>. One matters most:
      </p>
      <DemoCard title="The tritone — diminished 5th (6 half-steps)" demo={{ kind: "interval", low: 60, semitones: 6 }}>
        The most unstable interval in music — medieval theorists nicknamed it "the devil in music."
        The Simpsons theme opens with one. Tension incarnate.
      </DemoCard>

      <Tip>
        Number = letters crossed. Quality = exact size. So C→E is a major 3rd, C→E♭ a minor 3rd,
        and C→G a perfect 5th. Two words, complete address.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "What's the difference between a major 3rd and a minor 3rd?",
    options: [
      "One half-step — minor is smaller",
      "One whole step — minor is smaller",
      "They're the same size, played differently",
      "Minor thirds only exist in minor keys",
    ],
    correct: 0,
    why: "A major 3rd spans 4 half-steps, a minor 3rd spans 3. That single half-step is the happy/sad hinge.",
  },
  {
    q: "Listen. Major 3rd or minor 3rd?",
    demo: { kind: "interval", low: 62, semitones: 3 },
    options: ["Major 3rd — warm", "Minor 3rd — melancholy"],
    correct: 1,
    why: "Three half-steps — the soft, Greensleeves-flavored minor 3rd.",
  },
  {
    q: "Which intervals belong to the \"perfect\" family?",
    options: [
      "3rds and 6ths",
      "2nds and 7ths",
      "4ths, 5ths, octaves, and unisons",
      "Only the octave",
    ],
    correct: 2,
    why: "Unison, 4th, 5th, and octave are the acoustically pure ones — one neutral quality, no major/minor split.",
  },
];
