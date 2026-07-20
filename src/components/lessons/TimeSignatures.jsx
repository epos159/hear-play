import { BeatRow, DemoCard, Tip } from "./blocks.jsx";

export default function LessonTimeSignatures() {
  return (
    <div>
      <h2>Grouping Beats Into Measures</h2>
      <p>
        Beats don't just run on forever — they group into repeating chunks called{" "}
        <strong>measures</strong> (or "bars"). A <strong>time signature</strong> tells you two
        things: how many beats are in each measure, and which note value counts as one beat.
      </p>

      <h3>4/4 — The Most Common Meter</h3>
      <p>
        The top number is <strong>4 beats per measure</strong>. The bottom number means a{" "}
        <strong>quarter note = 1 beat</strong> (for now, just assume the bottom number always
        means that — it's true for almost everything you'll play early on).
      </p>
      <BeatRow count={4} strongOn={[1]} />
      <DemoCard
        title="Four beats, first one accented"
        demo={{ kind: "rhythm", tokens: ["quarter", "quarter", "quarter", "quarter"], opts: { accentFirst: true } }}
      >
        Listen for the slightly louder click on beat 1 — that's the <strong>downbeat</strong>, the
        moment that feels like "home" in the measure.
      </DemoCard>

      <h3>3/4 — The Waltz Feel</h3>
      <p>Three beats per measure, one strong beat and two lighter ones — the "ONE-two-three" of a waltz.</p>
      <BeatRow count={3} strongOn={[1]} />
      <DemoCard
        title="Three beats, waltz feel"
        demo={{ kind: "rhythm", tokens: ["quarter", "quarter", "quarter"], opts: { accentFirst: true } }}
      >
        Same idea as 4/4, just one beat shorter per measure. Count "ONE-two-three, ONE-two-three."
      </DemoCard>

      <h3>Feel It Before You Count It</h3>
      <p>
        Play both demos above again and tap your foot along. You'll likely feel the difference —
        4/4 feels square and even, 3/4 feels like it's spinning forward — before you ever count
        the beats out loud. That instinct is the whole point; counting is just a way to describe
        what you already feel.
      </p>

      <Tip>
        Almost every song you know is in 4/4 or 3/4. Next time you hear music, try tapping along —
        if it feels even and square, guess 4/4; if it feels like it's turning in a circle, guess
        3/4.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "In 4/4 time, how many beats are in each measure?",
    options: ["2", "3", "4", "6"],
    correct: 2,
    why: "The top number of the time signature — 4 beats per measure.",
  },
  {
    q: "Listen to this rhythm. Is it in 4 or in 3?",
    demo: { kind: "rhythm", tokens: ["quarter", "quarter", "quarter"], opts: { accentFirst: true } },
    options: ["4/4 — four beats", "3/4 — three beats, a waltz feel"],
    correct: 1,
    why: "Three clicks before the accent repeats — that's the waltz feel of 3/4.",
  },
  {
    q: "Which beat usually feels the strongest in a measure?",
    options: ["The last beat", "The first beat", "Beat 2", "They all feel equal"],
    correct: 1,
    why: "The first beat — the downbeat — is where the measure feels like it's landing.",
  },
];
