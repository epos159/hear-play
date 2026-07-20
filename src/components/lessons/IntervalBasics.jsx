import { playInterval } from "../../audio.js";

export default function LessonIntervalBasics({ lesson }) {
  return (
    <div>
      <h2>What Are Intervals?</h2>

      <p>
        An <strong>interval</strong> is the distance between two notes. The bigger the jump in pitch, the larger the interval.
      </p>

      <h3>Measuring Intervals</h3>
      <p>
        Intervals are measured in <strong>semitones</strong> (also called half steps) — the smallest distance on a piano keyboard or between any two adjacent notes.
      </p>

      <ul>
        <li><strong>1 semitone</strong> = one piano key (black or white)</li>
        <li><strong>2 semitones</strong> = one whole step</li>
        <li><strong>12 semitones</strong> = one octave (same note name, different pitch)</li>
      </ul>

      <h3>Common Intervals</h3>

      <div style={{ marginTop: 20 }}>
        <div style={{
          background: "rgba(0,0,0,0.05)",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: 12,
        }}>
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>Minor 2nd (1 semitone)</div>
          <button className="btn btn-small" onClick={() => playInterval(60, 1)}>
            ▶ Hear it
          </button>
          <p style={{ marginTop: 8, marginBottom: 0, fontSize: "0.9rem", opacity: 0.8 }}>
            This is the smallest interval — sounds uncomfortable, nearly the same note.
          </p>
        </div>

        <div style={{
          background: "rgba(0,0,0,0.05)",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: 12,
        }}>
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>Major 2nd (2 semitones)</div>
          <button className="btn btn-small" onClick={() => playInterval(60, 2)}>
            ▶ Hear it
          </button>
          <p style={{ marginTop: 8, marginBottom: 0, fontSize: "0.9rem", opacity: 0.8 }}>
            A step — the most basic leap. Think "Happy Birthday" (happy-birthday).
          </p>
        </div>

        <div style={{
          background: "rgba(0,0,0,0.05)",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: 12,
        }}>
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>Perfect 4th (5 semitones)</div>
          <button className="btn btn-small" onClick={() => playInterval(60, 5)}>
            ▶ Hear it
          </button>
          <p style={{ marginTop: 8, marginBottom: 0, fontSize: "0.9rem", opacity: 0.8 }}>
            A sturdy, open sound. "Here Comes the Bride" starts with a 4th.
          </p>
        </div>

        <div style={{
          background: "rgba(0,0,0,0.05)",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: 12,
        }}>
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>Perfect 5th (7 semitones)</div>
          <button className="btn btn-small" onClick={() => playInterval(60, 7)}>
            ▶ Hear it
          </button>
          <p style={{ marginTop: 8, marginBottom: 0, fontSize: "0.9rem", opacity: 0.8 }}>
            The most perfect, open, heroic interval. "Twinkle Twinkle Little Star" starts with a 5th.
          </p>
        </div>

        <div style={{
          background: "rgba(0,0,0,0.05)",
          padding: "16px",
          borderRadius: "8px",
        }}>
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>Octave (12 semitones)</div>
          <button className="btn btn-small" onClick={() => playInterval(60, 12)}>
            ▶ Hear it
          </button>
          <p style={{ marginTop: 8, marginBottom: 0, fontSize: "0.9rem", opacity: 0.8 }}>
            The note repeats higher. Still feels like the same note, just "up there" in pitch.
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
        <strong>Why this matters:</strong> Every melody is made of intervals. When you learn to hear intervals, you can sing any melody back, and predict what comes next in music.
      </div>
    </div>
  );
}
