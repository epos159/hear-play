import { playChord } from "../../audio.js";

export default function LessonTriadBasics() {
  return (
    <div>
      <h2>Building Chords from Intervals</h2>

      <p>
        A <strong>chord</strong> is three or more notes played together. The simplest chord is a <strong>triad</strong> — three notes stacked in thirds.
      </p>

      <h3>How Triads Work</h3>
      <p>
        Start on any note (the root), skip one, play the next (third), skip one more, play that (fifth). You now have a triad.
      </p>

      <div style={{ marginTop: 20 }}>
        <div style={{
          background: "rgba(0,0,0,0.05)",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: 12,
        }}>
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>Major Triad (bright, settled)</div>
          <div style={{ marginBottom: 12 }}>
            Root – Major 3rd – Perfect 5th
            <br />
            <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>Example: C – E – G</span>
          </div>
          <button className="btn btn-small" onClick={() => playChord([60, 64, 67])}>
            ▶ Hear C Major
          </button>
          <p style={{ marginTop: 12, marginBottom: 0, fontSize: "0.9rem", opacity: 0.8 }}>
            Sounds happy, resolved, at rest. The major third (4 semitones up) is what gives it that brightness.
          </p>
        </div>

        <div style={{
          background: "rgba(0,0,0,0.05)",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: 12,
        }}>
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>Minor Triad (tender, wistful)</div>
          <div style={{ marginBottom: 12 }}>
            Root – Minor 3rd – Perfect 5th
            <br />
            <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>Example: A – C – E</span>
          </div>
          <button className="btn btn-small" onClick={() => playChord([57, 60, 64])}>
            ▶ Hear A Minor
          </button>
          <p style={{ marginTop: 12, marginBottom: 0, fontSize: "0.9rem", opacity: 0.8 }}>
            Sounds softer, more introspective. Lower the major third by one semitone and it changes the whole mood.
          </p>
        </div>

        <div style={{
          background: "rgba(0,0,0,0.05)",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: 12,
        }}>
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>Suspended Chord (floating, open)</div>
          <div style={{ marginBottom: 12 }}>
            Root – Perfect 4th – Perfect 5th
            <br />
            <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>Example: C – F – G</span>
          </div>
          <button className="btn btn-small" onClick={() => playChord([60, 65, 67])}>
            ▶ Hear C Suspended
          </button>
          <p style={{ marginTop: 12, marginBottom: 0, fontSize: "0.9rem", opacity: 0.8 }}>
            Sounds like it's waiting, hovering. Neither major nor minor — just open sky.
          </p>
        </div>

        <div style={{
          background: "rgba(0,0,0,0.05)",
          padding: "16px",
          borderRadius: "8px",
        }}>
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>Diminished Chord (tense, uneasy)</div>
          <div style={{ marginBottom: 12 }}>
            Root – Minor 3rd – Diminished 5th
            <br />
            <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>Example: B – D – F</span>
          </div>
          <button className="btn btn-small" onClick={() => playChord([59, 62, 65])}>
            ▶ Hear B Diminished
          </button>
          <p style={{ marginTop: 12, marginBottom: 0, fontSize: "0.9rem", opacity: 0.8 }}>
            Sounds cramped, tense, uneasy. All the intervals are squeezed tight.
          </p>
        </div>
      </div>

      <div style={{
        background: "rgba(0,0,0,0.03)",
        padding: "12px",
        borderRadius: "4px",
        marginTop: 20,
        fontSize: "0.9rem",
        opacity: 0.8,
      }}>
        <strong>Key insight:</strong> The quality of a chord (major, minor, etc.) comes from the third — the middle note. Change that one note, and you change the whole feeling.
      </div>

    </div>
  );
}
