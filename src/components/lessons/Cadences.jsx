import { playProgression } from "../../audio.js";

export default function LessonCadences() {
  return (
    <div>
      <h2>Musical Punctuation: Cadences</h2>

      <p>
        Music has <strong>punctuation</strong> just like sentences. Some chord progressions sound finished (a period), while others sound like they're still going (a comma). These endings are called <strong>cadences</strong>.
      </p>

      <h3>The Two Main Cadences</h3>

      <div style={{ marginTop: 20 }}>
        <div style={{
          background: "rgba(0,0,0,0.05)",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: 12,
        }}>
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>Authentic Cadence (V → I)</div>
          <div style={{ marginBottom: 12, opacity: 0.8 }}>
            Dominant chord → Tonic chord. This feels <strong>finished</strong>, resolved, like a period.
          </div>
          <button className="btn btn-small" onClick={() => playProgression([[60, 64, 67], [67, 71, 74], [60, 64, 67]])}>
            ▶ Play: C – G – C
          </button>
          <p style={{ marginTop: 12, marginBottom: 0, fontSize: "0.9rem", opacity: 0.8 }}>
            The V chord pulls away from home (C). The I chord brings you back. That return home feels complete.
          </p>
        </div>

        <div style={{
          background: "rgba(0,0,0,0.05)",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: 12,
        }}>
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>Plagal Cadence (IV → I)</div>
          <div style={{ marginBottom: 12, opacity: 0.8 }}>
            Subdominant chord → Tonic chord. Feels finished, but softer. Sometimes called the "Amen cadence."
          </div>
          <button className="btn btn-small" onClick={() => playProgression([[60, 64, 67], [65, 69, 72], [60, 64, 67]])}>
            ▶ Play: C – F – C
          </button>
          <p style={{ marginTop: 12, marginBottom: 0, fontSize: "0.9rem", opacity: 0.8 }}>
            Less dramatic than authentic, but still feels like home. You hear this at the end of hymns.
          </p>
        </div>

        <div style={{
          background: "rgba(0,0,0,0.05)",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: 12,
        }}>
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>Half Cadence (I → V or IV → V)</div>
          <div style={{ marginBottom: 12, opacity: 0.8 }}>
            Ending on the Dominant chord. This feels <strong>incomplete</strong>, like a comma or question mark.
          </div>
          <button className="btn btn-small" onClick={() => playProgression([[60, 64, 67], [65, 69, 72], [67, 71, 74]])}>
            ▶ Play: C – F – G
          </button>
          <p style={{ marginTop: 12, marginBottom: 0, fontSize: "0.9rem", opacity: 0.8 }}>
            Your ear is waiting for something to come next. It's unresolved, hanging in the air.
          </p>
        </div>

        <div style={{
          background: "rgba(0,0,0,0.05)",
          padding: "16px",
          borderRadius: "8px",
        }}>
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>Deceptive Cadence (V → vi)</div>
          <div style={{ marginBottom: 12, opacity: 0.8 }}>
            Dominant → Relative minor. Feels <strong>unresolved</strong>, surprising, like an unexpected ending.
          </div>
          <button className="btn btn-small" onClick={() => playProgression([[60, 64, 67], [67, 71, 74], [57, 60, 64]])}>
            ▶ Play: C – G – Am
          </button>
          <p style={{ marginTop: 12, marginBottom: 0, fontSize: "0.9rem", opacity: 0.8 }}>
            You expect to land on C (I), but instead land on A minor (vi). The expectation is broken — that's what makes it deceptive.
          </p>
        </div>
      </div>

      <h3>Recognizing Cadences</h3>
      <p>
        When you hear the end of a phrase, ask yourself:
      </p>
      <ul>
        <li>Does it feel finished, or still waiting?</li>
        <li>Is it a strong resolution, or subtle and soft?</li>
        <li>Did it surprise me?</li>
      </ul>

      <div style={{
        background: "rgba(0,0,0,0.03)",
        padding: "12px",
        borderRadius: "4px",
        marginTop: 20,
        fontSize: "0.9rem",
        opacity: 0.8,
      }}>
        <strong>Practice tip:</strong> Listen to the end of songs on the radio or in music you love. Can you hear where the phrases end? Can you feel if it's finished or still going?
      </div>

    </div>
  );
}
