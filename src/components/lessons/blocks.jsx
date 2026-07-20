// Shared building blocks for lesson content, so every lesson looks and
// behaves consistently.
import { useState } from "react";
import { playDemo } from "../../demos.js";

// A concept card with an optional play button and supporting text.
export function DemoCard({ title, formula, demo, playLabel = "Hear it", children }) {
  const [played, setPlayed] = useState(false);
  return (
    <div className="demo-card">
      <div className="demo-card-title">{title}</div>
      {formula && <div className="demo-card-formula">{formula}</div>}
      {demo && (
        <button
          className="btn btn-small"
          onClick={() => {
            playDemo(demo);
            setPlayed(true);
          }}
        >
          ▶ {played ? "Again" : playLabel}
        </button>
      )}
      {children && <div className="demo-card-body">{children}</div>}
    </div>
  );
}

// Emphasized takeaway callout.
export function Tip({ label = "Key idea", children }) {
  return (
    <div className="lesson-tip">
      <strong>{label}:</strong> {children}
    </div>
  );
}

// Side-by-side A/B listening comparison.
export function Compare({ a, b }) {
  return (
    <div className="compare-row">
      <DemoCard title={a.title} demo={a.demo} playLabel={a.playLabel || "Hear it"}>
        {a.text}
      </DemoCard>
      <DemoCard title={b.title} demo={b.demo} playLabel={b.playLabel || "Hear it"}>
        {b.text}
      </DemoCard>
    </div>
  );
}

// A note value shown as a proportional bar (no music font needed) — the
// bar's width is literally how long the note lasts relative to a beat.
export function NoteValueBar({ label, beats, sub, demo }) {
  const [played, setPlayed] = useState(false);
  return (
    <div className="note-value-row">
      <div className="note-value-bar" style={{ width: `${Math.max(beats, 0.5) * 44}px` }} />
      <div className="note-value-label">
        <strong>{label}</strong>
        <span>{sub || (beats === 1 ? "1 beat" : `${beats} beats`)}</span>
      </div>
      {demo && (
        <button
          className="btn btn-small"
          onClick={() => {
            playDemo(demo);
            setPlayed(true);
          }}
        >
          ▶ {played ? "Again" : "Hear it"}
        </button>
      )}
    </div>
  );
}

// A row of beat markers for teaching meter — the strong beat (the
// "downbeat") is filled in, the rest are outlined.
export function BeatRow({ count, strongOn = [1], labels }) {
  return (
    <div className="beat-row">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={`beat-dot ${strongOn.includes(i + 1) ? "strong" : ""}`}>
          {labels ? labels[i] : i + 1}
        </div>
      ))}
    </div>
  );
}
