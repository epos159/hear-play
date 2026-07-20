import { DemoCard, Tip } from "./blocks.jsx";
import { INTERVALS } from "../../theory.js";

export default function LessonHearingIntervals() {
  return (
    <div>
      <h2>Hearing Intervals: The Song-Anchor Method</h2>
      <p>
        You already have every interval memorized — hidden inside songs you know. The trick
        professionals use is simple: link each interval to the opening leap of a familiar tune.
        Hear the leap, and the song surfaces on its own.
      </p>

      <h3>Your Anchor Library</h3>
      <p>Play each one a few times. Sing the song lyric as the second note lands.</p>
      {INTERVALS.map((iv) => (
        <DemoCard
          key={iv.semitones}
          title={iv.label}
          demo={{ kind: "interval", low: 60, semitones: iv.semitones }}
          playLabel="Hear the leap"
        >
          <strong>{iv.anchor}</strong> — sounds {iv.character}.
        </DemoCard>
      ))}

      <h3>How to Practice</h3>
      <p>
        Don't try to memorize all six anchors at once. Master two — say the perfect 5th (Twinkle
        Twinkle) and the octave (Over the Rainbow) — until they're instant, then add one at a time.
        The practice game after this lesson quizzes you exactly this way.
      </p>

      <Tip>
        This works in reverse, too: when you hear an interval in the wild, hum up from the low note
        through your anchor songs until one clicks into place. Within weeks it becomes automatic.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "Listen. Which song does this leap start?",
    demo: { kind: "interval", low: 60, semitones: 5 },
    options: [
      "Twinkle Twinkle Little Star",
      "Here Comes the Bride",
      "Somewhere Over the Rainbow",
      "Greensleeves",
    ],
    correct: 1,
    why: "Five half-steps — the sturdy perfect 4th that opens \"Here Comes the Bride.\"",
  },
  {
    q: "Listen. Which leap is this?",
    demo: { kind: "interval", low: 57, semitones: 12 },
    options: ["A perfect 5th", "A soft minor 3rd", "An octave", "A whole step"],
    correct: 2,
    why: "\"Some-where\" — the full octave leap home from Over the Rainbow.",
  },
  {
    q: "What's the smartest way to build interval recognition?",
    options: [
      "Master a couple of anchors, then add more one at a time",
      "Drill all intervals equally from day one",
      "Memorize the half-step numbers mathematically",
      "Only practice descending intervals",
    ],
    correct: 0,
    why: "Depth beats breadth: two instant anchors give you reference points to triangulate everything else.",
  },
];
