import { Compare, DemoCard, Tip } from "./blocks.jsx";
import { V } from "../../demos.js";

export default function LessonChordEar() {
  return (
    <div>
      <h2>Recognizing Chords by Feel</h2>
      <p>
        You don't need perfect pitch to name a chord's quality — you need a vocabulary of{" "}
        <em>feelings</em>. Each triad type has an unmistakable emotional fingerprint. This lesson is
        about learning to trust it.
      </p>

      <h3>The Listening Strategy</h3>
      <p>
        When a chord plays: <strong>1)</strong> Let it wash over you — first impression.{" "}
        <strong>2)</strong> Ask: settled or unsettled? <strong>3)</strong> If settled: bright
        (major) or shadowed (minor)? If unsettled: hovering (suspended) or tense (diminished)?
      </p>

      <h3>Train the Contrast</h3>
      <p>Same root, different quality — the fairest comparison your ear can get:</p>
      <Compare
        a={{ title: "C major", demo: { kind: "chord", notes: V.C }, text: "Settled and bright: sunlight." }}
        b={{ title: "C minor", demo: { kind: "chord", notes: [60, 63, 67] }, text: "Settled but shadowed: dusk." }}
      />
      <Compare
        a={{ title: "C suspended", demo: { kind: "chord", notes: V.Csus4 }, text: "Unsettled, hovering: open sky, waiting to land." }}
        b={{ title: "C diminished", demo: { kind: "chord", notes: [60, 63, 66] }, text: "Unsettled, compressed: storm coming." }}
      />

      <h3>Hear the Suspension Resolve</h3>
      <DemoCard
        title="sus4 → major"
        demo={{ kind: "progression", chords: [V.Csus4, V.C] }}
        playLabel="Hear it land"
      >
        The hovering 4th slides down a half-step into the major 3rd — the classic "ahh" of
        resolution. Pop and rock use this constantly.
      </DemoCard>

      <Tip>
        Decision tree, two questions deep: settled or not → bright or dark / hovering or tense.
        Four qualities, two binary choices. The practice game after this lesson drills exactly this.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "Listen. Settled or unsettled?",
    demo: { kind: "chord", notes: [57, 60, 64] },
    options: ["Settled — at rest", "Unsettled — needs to move"],
    correct: 0,
    why: "A minor: shadowed, but stable. Minor chords are settled — they're dusk, not danger.",
  },
  {
    q: "Listen. Which quality is this?",
    demo: { kind: "chord", notes: [62, 67, 69] },
    options: ["Major", "Minor", "Suspended", "Diminished"],
    correct: 2,
    why: "D suspended — no 3rd, so no major/minor mood. Just that floating, waiting-to-land openness.",
  },
  {
    q: "Listen. Which quality is this?",
    demo: { kind: "chord", notes: [59, 62, 65] },
    options: ["Major", "Minor", "Suspended", "Diminished"],
    correct: 3,
    why: "B diminished — compressed and uneasy, the tensest of the four triads.",
  },
];
