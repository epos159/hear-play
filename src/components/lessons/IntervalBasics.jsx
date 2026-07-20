import { DemoCard, Tip } from "./blocks.jsx";

export default function LessonIntervalBasics() {
  return (
    <div>
      <h2>What Are Intervals?</h2>
      <p>
        An <strong>interval</strong> is the distance between two notes. Melodies are nothing but a
        chain of intervals — learn to hear the distances and you can carry any tune.
      </p>

      <h3>The Measuring Unit: Half-Steps</h3>
      <p>
        The smallest distance is a <strong>half-step</strong> (semitone) — one piano key to its
        immediate neighbor, black or white. Two half-steps make a <strong>whole step</strong>.
        Twelve make an octave.
      </p>

      <h3>Meet the Landmarks</h3>
      <DemoCard title="Half-step (minor 2nd) — 1 semitone" demo={{ kind: "interval", low: 60, semitones: 1 }}>
        Uncomfortably close — the "Jaws" crawl. Notes this near each other create friction.
      </DemoCard>
      <DemoCard title="Whole step (major 2nd) — 2 semitones" demo={{ kind: "interval", low: 60, semitones: 2 }}>
        The basic walking step. In "Happy Birthday," the first rise ("py–birth") is this interval.
      </DemoCard>
      <DemoCard title="Perfect 4th — 5 semitones" demo={{ kind: "interval", low: 60, semitones: 5 }}>
        Sturdy and ceremonial — "Here Comes the Bride" opens with this leap.
      </DemoCard>
      <DemoCard title="Perfect 5th — 7 semitones" demo={{ kind: "interval", low: 60, semitones: 7 }}>
        Open and heroic — "Twinkle Twinkle" leaps a 5th on twin-kle.
      </DemoCard>
      <DemoCard title="Octave — 12 semitones" demo={{ kind: "interval", low: 60, semitones: 12 }}>
        "Some-where" in "Over the Rainbow." The same note, one register higher — a leap home.
      </DemoCard>

      <Tip>
        Every melody you know is a chain of these distances. When you can name the links, you can
        sing a tune from its sheet music — or write down one you've only heard.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "How many half-steps are in a whole step?",
    options: ["One", "Two", "Three", "Twelve"],
    correct: 1,
    why: "A whole step is two half-steps — two neighboring keys' worth of distance on the piano.",
  },
  {
    q: "Listen. Which interval is this?",
    demo: { kind: "interval", low: 62, semitones: 7 },
    options: ["Half-step", "Perfect 4th", "Perfect 5th", "Octave"],
    correct: 2,
    why: "That open, heroic leap is a perfect 5th — think \"twin-kle\" leaping upward.",
  },
  {
    q: "Listen. Which interval is this?",
    demo: { kind: "interval", low: 64, semitones: 12 },
    options: ["Perfect 5th", "Whole step", "Perfect 4th", "Octave"],
    correct: 3,
    why: "Same note, higher home — a full octave, like \"some-where\" in Over the Rainbow.",
  },
];
