// Shared building blocks for lesson content, so every lesson looks and
// behaves consistently.
import { useEffect, useRef, useState } from "react";
import { playDemo } from "../../demos.js";
import { stopAll } from "../../audio.js";
import { NoteGlyph } from "../Staff.jsx";

/**
 * Play button that disables until the demo finishes and cancels any
 * overlapping sound when clicked again after unlock.
 */
export function PlayButton({
  demo,
  onPlay,
  label = "Play the sound",
  againLabel = "Hear it again",
  playingLabel = "Playing…",
  className = "btn btn-primary btn-block",
  style,
}) {
  const [busy, setBusy] = useState(false);
  const [played, setPlayed] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handle = () => {
    if (busy) return;
    let seconds = 0;
    if (demo) seconds = playDemo(demo) || 0;
    else if (onPlay) {
      stopAll();
      seconds = onPlay() || 0;
    }
    setPlayed(true);
    setBusy(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setBusy(false), Math.max(seconds, 0.4) * 1000 + 80);
  };

  return (
    <button className={className} style={style} onClick={handle} disabled={busy} aria-busy={busy}>
      ▶ &nbsp;{busy ? playingLabel : played ? againLabel : label}
    </button>
  );
}

// A concept card with an optional play button and supporting text.
export function DemoCard({ title, formula, demo, playLabel = "Hear it", children }) {
  return (
    <div className="demo-card">
      <div className="demo-card-title">{title}</div>
      {formula && <div className="demo-card-formula">{formula}</div>}
      {demo && <PlayButton demo={demo} label={playLabel} againLabel="Again" className="btn btn-small" />}
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

// A note value shown as its real symbol, a proportional duration bar, and
// an optional play button — see it, feel how long it lasts, hear it.
export function NoteValueBar({ label, beats, sub, demo, glyph = "quarter" }) {
  return (
    <div className="note-value-row">
      <NoteGlyph kind={glyph} size={40} />
      <div className="note-value-bar" style={{ width: `${Math.max(beats, 0.5) * 44}px` }} />
      <div className="note-value-label">
        <strong>{label}</strong>
        <span>{sub || (beats === 1 ? "1 beat" : `${beats} beats`)}</span>
      </div>
      {demo && <PlayButton demo={demo} label="Hear it" againLabel="Again" className="btn btn-small" />}
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
