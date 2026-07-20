import { Compare, DemoCard, Tip } from "./blocks.jsx";

export default function LessonHarmonyBasics() {
  return (
    <div>
      <h2>Harmony: Melody Meets Chords</h2>
      <p>
        Melody is the line; harmony is the landscape it walks through. The same melody note can feel
        cozy or aching depending on the chord underneath — that relationship is the last fundamental
        to tune your ear to.
      </p>

      <h3>Consonance and Dissonance</h3>
      <Compare
        a={{
          title: "Consonant — agrees",
          demo: { kind: "chord", notes: [60, 64, 67, 72] },
          text: "The notes reinforce each other. Restful; nothing needs to move.",
        }}
        b={{
          title: "Dissonant — rubs",
          demo: { kind: "chord", notes: [60, 62, 71] },
          text: "The notes grind and shimmer. Unstable; something must move.",
        }}
      />
      <p>
        Neither is "good" or "bad" — music <em>needs</em> both. Dissonance is hunger, consonance is
        the meal. A piece with no dissonance is wallpaper; all dissonance is noise.
      </p>

      <h3>Chord Tones and Color Tones</h3>
      <DemoCard
        title="Melody note inside the chord"
        demo={{ kind: "chord", notes: [60, 64, 67, 76] }}
        playLabel="Hear E over C major"
      >
        E belongs to C major, so the melody note nests inside the harmony. Stable, sweet, plain.
      </DemoCard>
      <DemoCard
        title="Melody note outside the chord"
        demo={{ kind: "chord", notes: [60, 64, 67, 74] }}
        playLabel="Hear D over C major"
      >
        D isn't in C–E–G, so it hovers above the chord with a gentle ache — a <em>color tone</em>.
        Jazz and R&B live on these.
      </DemoCard>

      <h3>Tension → Release</h3>
      <DemoCard
        title="A suspension resolving"
        demo={{ kind: "progression", chords: [[60, 65, 67, 72], [60, 64, 67, 72]] }}
        playLabel="Hear the sigh"
      >
        The F leans against the chord (tension)… then slips down to E (release). This two-note sigh
        is the oldest expressive device in harmony — you'll hear it from Bach chorales to film
        scores.
      </DemoCard>

      <Tip>
        Harmony is managed tension. Composers choose when melody notes agree with the chord and when
        they rub against it — and the rub-then-resolve moments are where the feeling lives.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "Dissonance in music is best described as…",
    options: [
      "A mistake to avoid",
      "Tension that wants to resolve",
      "Any minor chord",
      "Playing too loudly",
    ],
    correct: 1,
    why: "Dissonance is instability with direction — the hunger that makes the consonant resolution taste like something.",
  },
  {
    q: "Listen. Consonant or dissonant?",
    demo: { kind: "chord", notes: [60, 62, 71] },
    options: ["Consonant — restful", "Dissonant — it rubs"],
    correct: 1,
    why: "Those close-packed notes grind against each other — classic dissonance, begging to move somewhere.",
  },
  {
    q: "A melody note that isn't in the chord underneath it…",
    options: [
      "Is always wrong",
      "Adds color and gentle tension against the harmony",
      "Turns the chord diminished",
      "Has no effect",
    ],
    correct: 1,
    why: "Non-chord tones are seasoning — they hover with an ache that chord tones can't provide. The art is in resolving them.",
  },
];
