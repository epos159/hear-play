import { DemoCard, Tip } from "./blocks.jsx";
import { V } from "../../demos.js";

export default function LessonCommonProgressions() {
  return (
    <div>
      <h2>Progressions: Chords in Motion</h2>
      <p>
        A <strong>chord progression</strong> is a repeating journey through the chord family —
        away from home, back toward it. A handful of journeys are so satisfying they power most of
        popular music. Learn these four and you'll start hearing them everywhere.
      </p>

      <DemoCard
        title="I – IV – V – I · the classic"
        demo={{ kind: "progression", chords: [V.C, V.F, V.G, V.C] }}
        playLabel="Hear it"
      >
        Folk, blues, early rock — the plain-spoken original. Home, lean away, pull, land.
      </DemoCard>

      <DemoCard
        title="I – V – vi – IV · the pop anthem"
        demo={{ kind: "progression", chords: [V.C, V.G, V.Am, V.F] }}
        playLabel="Hear it"
      >
        "Let It Be," "No Woman No Cry," "Someone Like You" — hundreds more. The dip to vi adds a
        bittersweet shadow that pop can't get enough of.
      </DemoCard>

      <DemoCard
        title="vi – IV – I – V · the emotional loop"
        demo={{ kind: "progression", chords: [V.Am, V.F, V.C, V.G] }}
        playLabel="Hear it"
      >
        The same four chords starting from the shadow — instantly more yearning. ("Zombie,"
        "Africa," countless film trailers.)
      </DemoCard>

      <DemoCard
        title="ii – V – I · the jazz handshake"
        demo={{ kind: "progression", chords: [V.Dm, V.G, V.C] }}
        playLabel="Hear it"
      >
        Jazz's favorite way home: a two-step approach where each chord hands off to the next.
        Smooth, inevitable, everywhere in standards.
      </DemoCard>

      <h3>Same Chords, Different Story</h3>
      <p>
        Notice that the pop anthem and the emotional loop use the <em>same four chords</em> in a
        different order. Progressions are about <strong>where you start and what you circle back
        to</strong> — order is everything.
      </p>

      <Tip>
        Next time a song grabs you, try to feel where "home" is and count the loop — most verses
        and choruses cycle four chords. You now own the names for what you're hearing.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "Listen. Which progression is this?",
    demo: { kind: "progression", chords: [[60, 64, 67], [67, 71, 74], [57, 60, 64], [65, 69, 72]] },
    options: ["I – IV – V – I", "I – V – vi – IV", "ii – V – I", "vi – IV – I – V"],
    correct: 1,
    why: "Home, pull, shadow, lean — the \"pop anthem\" I–V–vi–IV that powers half the radio.",
  },
  {
    q: "The \"pop anthem\" (I–V–vi–IV) and \"emotional loop\" (vi–IV–I–V) differ by…",
    options: [
      "Completely different chords",
      "The same chords in a different order",
      "One being in a minor key",
      "The number of chords",
    ],
    correct: 1,
    why: "Identical palette, different starting point — which is exactly why order defines a progression's character.",
  },
  {
    q: "Which progression is jazz's classic route home?",
    options: ["I – IV – V", "vi – IV – I – V", "ii – V – I", "I – vi – ii"],
    correct: 2,
    why: "ii–V–I: each chord hands off smoothly to the next, landing on home. The bread and butter of jazz standards.",
  },
];
