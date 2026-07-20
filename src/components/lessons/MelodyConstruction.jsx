import { Compare, DemoCard, Tip } from "./blocks.jsx";

export default function LessonMelodyConstruction() {
  return (
    <div>
      <h2>Building Melodies</h2>
      <p>
        A melody isn't a random walk through the scale — it's a <strong>shape</strong> with a
        grammar: mostly steps, occasional leaps, phrases that ask and answer. Once you hear the
        grammar, you can write tunes on purpose.
      </p>

      <h3>Steps Flow, Leaps Announce</h3>
      <Compare
        a={{
          title: "Mostly steps",
          demo: { kind: "sequence", notes: [60, 62, 64, 65, 64, 62, 60], step: 0.34 },
          text: "Smooth and singable — motion by neighbor notes.",
        }}
        b={{
          title: "A leap, then recovery",
          demo: { kind: "sequence", notes: [60, 67, 65, 64, 62, 60], step: 0.34 },
          text: "The leap up to G grabs attention; the stepwise walk back down releases it.",
        }}
      />
      <p>
        That's the classic rule of thumb: <strong>after a leap, step back</strong> the other way.
        Leaps are exclamation points — melodies that only leap sound frantic; melodies that only
        step sound flat.
      </p>

      <h3>Question and Answer</h3>
      <DemoCard
        title="The question phrase"
        demo={{ kind: "sequence", notes: [60, 62, 64, 65, 67, 67], step: 0.34 }}
        playLabel="Hear it rise and wait"
      >
        The phrase climbs and stops <em>off</em> home — musically a raised eyebrow.
      </DemoCard>
      <DemoCard
        title="The answer phrase"
        demo={{ kind: "sequence", notes: [67, 65, 64, 62, 60, 60], step: 0.34 }}
        playLabel="Hear it come home"
      >
        Same rhythm, mirrored shape, landing on do. Question, answer — a complete musical sentence.
      </DemoCard>

      <h3>The Power of Repetition</h3>
      <DemoCard
        title="A motif, repeated one step higher"
        demo={{ kind: "sequence", notes: [60, 62, 64, 62, 64, 65, 67, 65], step: 0.3 }}
        playLabel="Hear the sequence"
      >
        Take a small idea (a <em>motif</em>) and restate it starting on a different note — musicians
        call this a <em>sequence</em>. Beethoven's Fifth is four notes worth of motif, sequenced
        into a symphony.
      </DemoCard>

      <Tip>
        The recipe for a singable melody: move by step, spend leaps sparingly and recover from them,
        shape phrases as questions and answers, and repeat your best idea more than you think you
        should.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "After a large leap, a melody usually…",
    options: [
      "Leaps again, further",
      "Steps back in the opposite direction",
      "Stops entirely",
      "Repeats the same note",
    ],
    correct: 1,
    why: "Leap, then step back — the recovery balances the jump and keeps the line singable.",
  },
  {
    q: "Listen. Does this phrase sound like a question or an answer?",
    demo: { kind: "sequence", notes: [60, 62, 64, 65, 67, 67], step: 0.34 },
    options: ["A question — it hangs, off home", "An answer — it lands on home"],
    correct: 0,
    why: "It climbs and parks on sol, away from do — an open, asking shape that wants a reply.",
  },
  {
    q: "A short musical idea that gets repeated and developed is called…",
    options: ["A cadence", "A motif", "An inversion", "A scale degree"],
    correct: 1,
    why: "A motif — the melodic seed. Repetition (exact or shifted) is what turns a fragment into a piece.",
  },
];
