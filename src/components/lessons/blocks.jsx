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
