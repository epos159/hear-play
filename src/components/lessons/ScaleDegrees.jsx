import { DemoCard, Tip } from "./blocks.jsx";

const DEGREES = [
  { num: "1", name: "Tonic", solfa: "do", job: "Home. Where the music rests and usually ends." },
  { num: "2", name: "Supertonic", solfa: "re", job: "One step above home — a passing, in-motion note." },
  { num: "3", name: "Mediant", solfa: "mi", job: "The mood-setter: this note decides major vs. minor." },
  { num: "4", name: "Subdominant", solfa: "fa", job: "A gentle lean away from home." },
  { num: "5", name: "Dominant", solfa: "sol", job: "Home's strongest partner — creates the pull back." },
  { num: "6", name: "Submediant", solfa: "la", job: "Soft and warm; home base of the relative minor." },
  { num: "7", name: "Leading tone", solfa: "ti", job: "One half-step below home; leans in so hard it names itself." },
];

export default function LessonScaleDegrees() {
  return (
    <div>
      <h2>Scale Degrees: Every Note Has a Job</h2>
      <p>
        Musicians rarely say "the fifth note of the scale." Each position — each{" "}
        <strong>degree</strong> — has a name and, more importantly, a <em>personality</em>. Learn
        the jobs and you can hear a melody's logic, not just its notes.
      </p>

      <div className="degree-table">
        {DEGREES.map((d) => (
          <div key={d.num} className="degree-row">
            <span className="degree-num">{d.num}</span>
            <span className="degree-name">
              {d.name} <em>({d.solfa})</em>
            </span>
            <span className="degree-job">{d.job}</span>
          </div>
        ))}
      </div>

      <h3>Hear the Two Big Personalities</h3>
      <DemoCard
        title="The leading tone's pull"
        demo={{ kind: "sequence", notes: [60, 62, 64, 65, 67, 69, 71], step: 0.32 }}
        playLabel="Play do → ti and stop"
      >
        The scale climbs and stops on <strong>ti</strong>. Feel your ear begging for the last note?
        That unresolved lean is the leading tone doing its job.
      </DemoCard>
      <DemoCard
        title="…and the tonic's answer"
        demo={{ kind: "sequence", notes: [60, 62, 64, 65, 67, 69, 71, 72], step: 0.32 }}
        playLabel="Play the full scale"
      >
        Same climb, but this time it lands. That relief is <strong>do</strong> — the tonic — closing
        the door.
      </DemoCard>

      <DemoCard
        title="Tonic and dominant, the axis of music"
        demo={{ kind: "sequence", notes: [60, 67, 60], step: 0.5 }}
        playLabel="Play do → sol → do"
      >
        Do and sol (1 and 5) are the two poles nearly all Western music swings between. Chord
        progressions — coming in Module 5 — are built on this axis.
      </DemoCard>

      <Tip>
        Three degrees carry most of the story: <strong>1</strong> is home, <strong>5</strong> creates
        the pull toward home, and <strong>3</strong> sets the mood. If you can find those by ear,
        you can navigate almost any song.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "Which degree is the \"home\" note of a key?",
    options: ["Tonic (1)", "Mediant (3)", "Dominant (5)", "Leading tone (7)"],
    correct: 0,
    why: "The tonic is home base — the note of rest that phrases return to and pieces end on.",
  },
  {
    q: "Listen — the scale stops one note early. Which degree is left hanging?",
    demo: { kind: "sequence", notes: [60, 62, 64, 65, 67, 69, 71], step: 0.32 },
    options: ["The dominant (5)", "The leading tone (7)", "The tonic (1)", "The supertonic (2)"],
    correct: 1,
    why: "That last, straining note is ti — the leading tone, a half-step under home, desperate to resolve up.",
  },
  {
    q: "Which degree decides whether a key sounds major or minor?",
    options: ["The 2nd", "The 3rd", "The 5th", "The 6th"],
    correct: 1,
    why: "The mediant — the 3rd. High 3rd: major and bright. Lowered 3rd: minor and shadowed.",
  },
];
