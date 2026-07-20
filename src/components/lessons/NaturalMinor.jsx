import { Compare, DemoCard, Tip } from "./blocks.jsx";
import { A_MINOR_SCALE, C_MAJOR_SCALE, C_MINOR_SCALE } from "../../demos.js";

export default function LessonNaturalMinor() {
  return (
    <div>
      <h2>The Minor Scale</h2>
      <p>
        If major is sunlight, <strong>minor</strong> is dusk — the same seven letters rearranged
        into something more inward and wistful. It isn't "sad music's scale" so much as music with
        shadows in it.
      </p>

      <Compare
        a={{
          title: "C major",
          demo: { kind: "sequence", notes: C_MAJOR_SCALE },
          text: "Bright and settled.",
        }}
        b={{
          title: "C minor",
          demo: { kind: "sequence", notes: C_MINOR_SCALE },
          text: "Same starting note — three notes lowered, whole mood changed.",
        }}
      />

      <h3>The Recipe</h3>
      <div className="formula-box">
        W – H – W – W – H – W – W
        <span>the natural minor pattern</span>
      </div>
      <p>
        Compare with major (W–W–H–W–W–W–H): the half-steps land in different places, so the
        "shadowed" notes — especially the lowered 3rd — arrive early and color everything after.
      </p>

      <h3>Relative Major and Minor</h3>
      <p>
        Here's the elegant part: play the white keys from <strong>A</strong> to A and you get A
        minor — no sharps or flats, exactly C major's notes, started two letters lower. Every major
        key has this shadow twin, called its <strong>relative minor</strong>.
      </p>
      <DemoCard
        title="A natural minor — C major's twin"
        demo={{ kind: "sequence", notes: A_MINOR_SCALE }}
        playLabel="Play A minor"
      >
        Same seven notes as C major. Different home note, completely different feeling — proof that{" "}
        <em>where you call home</em> matters as much as which notes you use.
      </DemoCard>

      <Tip>
        The defining sound of minor is its <strong>lowered 3rd</strong> — one half-step down from
        major's 3rd. When a piece feels like it slipped from sun into shade, that's usually the note
        responsible.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "Listen. Major or minor?",
    demo: { kind: "sequence", notes: [60, 62, 63, 65, 67, 68, 70, 72] },
    options: ["Major", "Minor"],
    correct: 1,
    why: "That was C minor — the lowered 3rd (and 6th and 7th) gives it that dusky color.",
  },
  {
    q: "What is the relative minor of C major?",
    options: ["C minor", "E minor", "A minor", "G minor"],
    correct: 2,
    why: "A minor uses exactly C major's notes (all white keys) with A as home. Relative pairs always share their notes.",
  },
  {
    q: "Which single change contributes most to the \"minor\" sound?",
    options: [
      "Playing more quietly",
      "Lowering the 3rd by a half-step",
      "Raising the 5th",
      "Starting on a black key",
    ],
    correct: 1,
    why: "The lowered 3rd is minor's signature. You'll hear this again with chords: one middle note decides major vs. minor.",
  },
];
