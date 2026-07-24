import { DemoCard, NoteValueBar, Tip } from "./blocks.jsx";
import Staff from "../Staff.jsx";

const G4 = { letter: "G", octave: 4 };

export default function LessonNoteValues() {
  return (
    <div>
      <h2>How Long Does a Note Last?</h2>
      <p>
        Every note has a <strong>pitch</strong> (how high or low it sounds) and a{" "}
        <strong>duration</strong> (how long it lasts). The pitch is what you've been hearing so
        far — this lesson is about the other half: time. And duration has a <em>shape</em> on the
        page, not just a name.
      </p>

      <h3>The Note Values — See Them</h3>
      <p>
        Here are the four durations you'll meet first, drawn the way they appear in real music.
        Hollow heads last longer; solid heads are shorter; a little flag on the stem cuts the
        duration in half again.
      </p>
      <Staff
        clef="treble"
        interactive={false}
        notes={[
          { ...G4, value: "whole", label: "whole" },
          { ...G4, value: "half", label: "half" },
          { ...G4, value: "quarter", label: "quarter" },
          { ...G4, value: "eighth", label: "eighth" },
        ]}
        caption="Same pitch, four different shapes — each lasting half as long as the one before"
      />

      <h3>Feel How Long Each One Lasts</h3>
      <p>
        Symbol on the left, duration bar in the middle, sound on the right — longer bar means a
        longer hold.
      </p>

      <NoteValueBar
        label="Whole note"
        glyph="whole"
        beats={4}
        demo={{ kind: "rhythm", tokens: ["whole"], opts: { beatDur: 0.4 } }}
      />
      <NoteValueBar
        label="Half note"
        glyph="half"
        beats={2}
        demo={{ kind: "rhythm", tokens: ["half"], opts: { beatDur: 0.4 } }}
      />
      <NoteValueBar
        label="Quarter note"
        glyph="quarter"
        beats={1}
        demo={{ kind: "rhythm", tokens: ["quarter"], opts: { beatDur: 0.4 } }}
      />
      <NoteValueBar
        label="Eighth note"
        glyph="eighth"
        beats={0.5}
        demo={{ kind: "rhythm", tokens: ["eighth"], opts: { beatDur: 0.4 } }}
      />

      <p>
        Each step down is <strong>half</strong> the last: a whole note is two halves, a half note
        is two quarters, a quarter note is two eighths.
      </p>

      <h3>Hear the Difference</h3>
      <Staff
        clef="none"
        interactive={false}
        notes={[
          { ...G4, value: "quarter", label: "1" },
          { ...G4, value: "quarter", label: "2" },
          { ...G4, value: "quarter", label: "3" },
          { ...G4, value: "quarter", label: "4" },
        ]}
        caption="Four quarter notes — one per beat"
      />
      <DemoCard
        title="Four steady quarter notes"
        demo={{ kind: "rhythm", tokens: ["quarter", "quarter", "quarter", "quarter"], opts: { accentFirst: true } }}
      >
        A calm walking pace — one click per beat.
      </DemoCard>

      <Staff
        clef="none"
        interactive={false}
        notes={[
          { ...G4, value: "eighth", label: "1" },
          { ...G4, value: "eighth" },
          { ...G4, value: "eighth", label: "2" },
          { ...G4, value: "eighth" },
          { ...G4, value: "eighth", label: "3" },
          { ...G4, value: "eighth" },
          { ...G4, value: "eighth", label: "4" },
          { ...G4, value: "eighth" },
        ]}
        caption="Eight eighth notes — two per beat, notice the flags"
      />
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
        that same amount of time. Each note value has a matching rest shape:
      </p>
      <Staff
        clef="none"
        interactive={false}
        notes={[
          { rest: "whole", label: "whole" },
          { rest: "half", label: "half" },
          { rest: "quarter", label: "quarter" },
          { rest: "eighth", label: "eighth" },
        ]}
        caption="Whole rest hangs from a line; half rest sits on a line; quarter is the zigzag; eighth has a flag"
      />
      <Staff
        clef="none"
        interactive={false}
        notes={[
          { ...G4, value: "quarter", label: "1" },
          { ...G4, value: "quarter", label: "2" },
          { rest: "quarter", label: "rest" },
          { ...G4, value: "quarter", label: "4" },
        ]}
        caption="Two quarters, a quarter rest, then another quarter"
      />
      <DemoCard
        title="Quarter notes with a rest in the middle"
        demo={{ kind: "rhythm", tokens: ["quarter", "quarter", "rest-quarter", "quarter"], opts: { accentFirst: true } }}
      >
        Listen for the gap on beat 3 — that missing click is the rest doing its job.
      </DemoCard>

      <Tip>
        When you see a new rhythm on a page, match the shape first: hollow = long, solid = shorter,
        flag = shorter still. The sound and the symbol are two sides of the same idea.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "Which of these is a whole note?",
    staff: {
      clef: "treble",
      notes: [
        { letter: "G", octave: 4, value: "half" },
        { letter: "G", octave: 4, value: "whole" },
        { letter: "G", octave: 4, value: "quarter" },
        { letter: "G", octave: 4, value: "eighth" },
      ],
    },
    options: ["The first (hollow with a stem)", "The second (hollow, no stem)", "The third (solid with a stem)", "The fourth (solid with a flag)"],
    correct: 1,
    why: "A whole note is the hollow oval with no stem — the longest of the four.",
  },
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
    q: "Which symbol is a quarter rest?",
    staff: {
      clef: "none",
      notes: [
        { rest: "whole", label: "A" },
        { rest: "half", label: "B" },
        { rest: "quarter", label: "C" },
        { rest: "eighth", label: "D" },
      ],
    },
    options: ["A — the block hanging from a line", "B — the block sitting on a line", "C — the squiggle", "D — the little flagged rest"],
    correct: 2,
    why: "The quarter rest is the zigzag/squiggle — one beat of silence.",
  },
  {
    q: "How many quarter notes fit inside one half note?",
    options: ["One", "Two", "Three", "Four"],
    correct: 1,
    why: "A half note (2 beats) equals two quarter notes (1 beat each).",
  },
];
