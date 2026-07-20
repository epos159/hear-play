import { DemoCard, NoteValueBar, Tip } from "./blocks.jsx";

export default function LessonNoteValues() {
  return (
    <div>
      <h2>How Long Does a Note Last?</h2>
      <p>
        Every note has a <strong>pitch</strong> (how high or low it sounds) and a{" "}
        <strong>duration</strong> (how long it lasts). The pitch is what you've been hearing so
        far — this lesson is about the other half: time.
      </p>

      <h3>The Note Values</h3>
      <p>
        Musicians count duration in <strong>beats</strong>. Here's the same idea shown two ways —
        as a bar (longer bar, longer note) and as sound (hold the button to hear each one land on
        the beat):
      </p>

      <NoteValueBar
        label="Whole note"
        beats={4}
        demo={{ kind: "rhythm", tokens: ["whole"], opts: { beatDur: 0.4 } }}
      />
      <NoteValueBar
        label="Half note"
        beats={2}
        demo={{ kind: "rhythm", tokens: ["half"], opts: { beatDur: 0.4 } }}
      />
      <NoteValueBar
        label="Quarter note"
        beats={1}
        demo={{ kind: "rhythm", tokens: ["quarter"], opts: { beatDur: 0.4 } }}
      />
      <NoteValueBar
        label="Eighth note"
        beats={0.5}
        demo={{ kind: "rhythm", tokens: ["eighth"], opts: { beatDur: 0.4 } }}
      />

      <p>
        Each step down is <strong>half</strong> the last: a whole note is two halves, a half note
        is two quarters, a quarter note is two eighths.
      </p>

      <h3>Hear the Difference</h3>
      <DemoCard
        title="Four steady quarter notes"
        demo={{ kind: "rhythm", tokens: ["quarter", "quarter", "quarter", "quarter"], opts: { accentFirst: true } }}
      >
        A calm walking pace — one click per beat.
      </DemoCard>
      <DemoCard
        title="Eight eighth notes — twice as fast"
        demo={{
          kind: "rhythm",
          tokens: ["eighth", "eighth", "eighth", "eighth", "eighth", "eighth", "eighth", "eighth"],
          opts: { accentFirst: true },
        }}
      >
        Same total time, but the notes move twice as quickly — a light jog instead of a walk.
      </DemoCard>

      <h3>Rests: Musical Silence</h3>
      <p>
        A <strong>rest</strong> is the exact opposite of a note — it tells you to stay silent for
        that same amount of time. A quarter rest is one beat of nothing; a half rest is two beats
        of nothing. Silence is part of the music, not a gap in it.
      </p>
      <DemoCard
        title="Quarter notes with a rest in the middle"
        demo={{ kind: "rhythm", tokens: ["quarter", "quarter", "rest-quarter", "quarter"], opts: { accentFirst: true } }}
      >
        Listen for the gap on beat 3 — that missing click is the rest doing its job.
      </DemoCard>

      <Tip>
        You don't need to read rhythm notation yet to feel it. Tap your foot along with any song —
        you're already counting beats. Naming the note values just gives that feeling a vocabulary.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "Which note lasts the longest?",
    options: ["Eighth note", "Quarter note", "Half note", "Whole note"],
    correct: 3,
    why: "A whole note gets four beats — the longest of the four we covered.",
  },
  {
    q: "Listen to this pattern. Is it moving in quarter notes or eighth notes?",
    demo: {
      kind: "rhythm",
      tokens: ["eighth", "eighth", "eighth", "eighth", "eighth", "eighth", "eighth", "eighth"],
      opts: { accentFirst: true },
    },
    options: ["Quarter notes — a walking pace", "Eighth notes — twice as fast", "Half notes — half speed", "Whole notes — very slow"],
    correct: 1,
    why: "Eighth notes move twice as fast as quarter notes — that's the quicker, lighter feel you heard.",
  },
  {
    q: "How many quarter notes fit inside one half note?",
    options: ["One", "Two", "Three", "Four"],
    correct: 1,
    why: "A half note (2 beats) equals two quarter notes (1 beat each).",
  },
  {
    q: "A rest tells the performer to…",
    options: ["Play louder", "Stay silent", "Play faster", "Hold the note longer"],
    correct: 1,
    why: "A rest is silence with a duration — it still takes up time, just with no sound.",
  },
];
