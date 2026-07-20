import { useState } from "react";
import { Tip } from "./blocks.jsx";
import CircleOfFifthsDiagram from "../CircleOfFifths.jsx";
import { playInterval } from "../../audio.js";

export default function LessonCircleOfFifths() {
  const [highlight, setHighlight] = useState(0);

  return (
    <div>
      <h2>The Circle of Fifths</h2>
      <p>
        Take any key and go up a <strong>perfect fifth</strong> — the same wide, open leap from
        "Twinkle Twinkle." You land on a new key that has exactly one more sharp (or one fewer
        flat) than the one you started from. Do that twelve times in a row and you land right back
        where you started, having passed through every key that exists.
      </p>
      <button
        className="btn btn-primary btn-block"
        style={{ marginBottom: 4 }}
        onClick={() => playInterval(60, 7)}
      >
        ▶ &nbsp;Hear a perfect fifth
      </button>

      <h3>Walking Around the Circle</h3>
      <p>
        Arrange those twelve keys in that order and you get a circle: C at the top, then G, D, A,
        E, B, and around through the flat keys back to C. Tap a key below to see where it sits.
      </p>
      <CircleOfFifthsDiagram highlightIndex={highlight} />
      <div className="chips" style={{ justifyContent: "center", marginTop: 10 }}>
        {["C", "G", "D", "A", "E", "B", "F♯/G♭", "D♭", "A♭", "E♭", "B♭", "F"].map((k, i) => (
          <button key={k} className={`chip${i === highlight ? " active" : ""}`} onClick={() => setHighlight(i)}>
            {k}
          </button>
        ))}
      </div>

      <h3>Why It's Worth Knowing</h3>
      <p>
        Neighboring keys on the circle share almost all the same notes — one changed accidental
        apart. That makes the circle useful for a few very practical things: guessing a key
        signature without memorizing all fifteen, finding a closely related key to modulate to
        mid-song, and understanding why some keys just "feel" close to each other while others
        feel distant.
      </p>
      <p>
        Notice, too, that every major key has a <strong>relative minor</strong> sharing its exact
        key signature — shown in small text under each major key above. C major and A minor use
        identical notes; they just resolve to a different "home."
      </p>

      <Tip>
        You don't need to recite all twelve keys from memory. What matters is the shape: clockwise
        adds a sharp, counter-clockwise adds a flat, and neighbors on the circle are close
        relatives. Everything else can be looked up once that shape is intuitive.
      </Tip>
    </div>
  );
}

export const quiz = [
  {
    q: "Moving clockwise around the Circle of Fifths, each new key adds…",
    options: ["One sharp", "One flat", "An entirely new scale pattern", "Nothing — the notes are the same"],
    correct: 0,
    why: "Clockwise = up a perfect fifth = one more sharp (or one fewer flat) each step.",
  },
  {
    q: "What's the interval between neighboring keys on the Circle of Fifths?",
    options: ["A half-step", "A major third", "A perfect fifth", "An octave"],
    correct: 2,
    why: "That's the whole idea behind the name — each step around the circle is a perfect fifth.",
  },
  {
    q: "What does every major key share with the minor key shown just below it on the circle?",
    options: ["The same tonic note", "The exact same key signature", "The same tempo", "Nothing — they're unrelated"],
    correct: 1,
    why: "That's the relative minor — same notes, same key signature, different \"home\" note.",
  },
  {
    q: "The Circle of Fifths is mainly useful for…",
    options: ["Counting rhythm", "Understanding how keys relate and finding key signatures quickly", "Naming intervals", "Tuning a piano"],
    correct: 1,
    why: "It's a map of key relationships — great for guessing signatures and finding closely related keys.",
  },
];
