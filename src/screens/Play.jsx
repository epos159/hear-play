import { useState } from "react";
import Keyboard from "../components/Keyboard.jsx";
import { playChord, playPattern } from "../audio.js";
import { buildChord, CHORD_QUALITIES, noteName } from "../theory.js";
import { PlayButton } from "../components/lessons/blocks.jsx";

// Root positions in the C4 octave for the chord library
const ROOTS = [
  { label: "C", midi: 60 },
  { label: "D", midi: 62 },
  { label: "E", midi: 64 },
  { label: "F", midi: 65 },
  { label: "G", midi: 67 },
  { label: "A", midi: 69 },
];

const PATTERNS = [
  { id: "pillars", name: "Pillars", desc: "Hold the whole chord and let it ring. The simplest accompaniment there is — and it works for almost any slow song." },
  { id: "broken", name: "Rolling brook", desc: "Play the chord one note at a time, low to high and back. Instantly turns a chord into motion." },
  { id: "waltz", name: "Waltz", desc: "Low note, then two light chords: ONE-two-three. The heartbeat of every song that sways." },
];

export default function Play({ onExplore }) {
  const [rootIdx, setRootIdx] = useState(0);
  const [quality, setQuality] = useState("major");

  const root = ROOTS[rootIdx];
  const chord = buildChord(root.midi, quality);
  const def = CHORD_QUALITIES[quality];

  return (
    <div className="fade-in">
      <h1 className="screen-title">At the piano</h1>
      <p className="screen-sub">Tap the keys, or follow the lit notes with your real piano.</p>

      <Keyboard startMidi={60} octaves={2} litNotes={chord} />

      <div className="card">
        <div className="eyebrow">Chord shapes</div>
        <div className="chips">
          {ROOTS.map((r, i) => (
            <button key={r.label} className={`chip${i === rootIdx ? " active" : ""}`} onClick={() => setRootIdx(i)}>
              {r.label}
            </button>
          ))}
        </div>
        <div className="chips">
          {Object.entries(CHORD_QUALITIES).map(([q, d]) => (
            <button key={q} className={`chip${q === quality ? " active" : ""}`} onClick={() => setQuality(q)}>
              {d.label}
            </button>
          ))}
        </div>

        <p style={{ fontSize: 15, margin: "10px 0 4px" }}>
          <strong style={{ fontFamily: "var(--font-display)" }}>
            {root.label} {def.label.toLowerCase()}
          </strong>{" "}
          — {chord.map((m) => noteName(m)).join(" · ")}
        </p>
        <p className="subtle" style={{ margin: "0 0 14px" }}>{def.feeling}</p>

        <PlayButton
          onPlay={() => {
            const d = playChord(chord);
            onExplore();
            return d;
          }}
          label="Hear this shape"
          againLabel="Hear this shape"
          className="btn btn-primary"
        />
      </div>

      <div className="card">
        <div className="eyebrow">Make it move</div>
        <h2>Accompaniment patterns</h2>
        <p className="subtle">The same three notes, three different feelings. Try each with the chord you chose above.</p>
        {PATTERNS.map((p) => (
          <div key={p.id} style={{ margin: "16px 0" }}>
            <h3>{p.name}</h3>
            <p className="subtle" style={{ margin: "4px 0 8px" }}>{p.desc}</p>
            <PlayButton
              onPlay={() => {
                const d = playPattern(chord, p.id);
                onExplore();
                return d;
              }}
              label="Hear it"
              againLabel="Hear it"
              className="btn btn-ghost"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
