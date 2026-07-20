import { playSequence } from "../../audio.js";

export default function LessonMajorScale() {
  const playMajorScale = () => {
    const cMajor = [60, 62, 64, 65, 67, 69, 71, 72]; // C D E F G A B C
    playSequence(cMajor, 0.3);
  };

  return (
    <div>
      <h2>The Major Scale</h2>

      <p>
        A <strong>scale</strong> is a sequence of notes in ascending or descending pitch. The most common scale is the <strong>major scale</strong> — also known as the do-re-mi pattern.
      </p>

      <button
        className="btn btn-primary"
        onClick={playMajorScale}
        style={{ marginBottom: 20 }}
      >
        ▶ Play C Major Scale
      </button>

      <h3>The Major Scale Pattern</h3>
      <p>
        Every major scale follows the same pattern of distances (in semitones):
      </p>

      <div style={{
        background: "rgba(0,0,0,0.05)",
        padding: "16px",
        borderRadius: "8px",
        margin: "12px 0",
        fontFamily: "monospace",
        textAlign: "center",
      }}>
        <div style={{ marginBottom: 8 }}>
          <strong>2 – 2 – 1 – 2 – 2 – 2 – 1</strong>
        </div>
        <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
          (whole step – whole step – half step – whole step – whole step – whole step – half step)
        </div>
      </div>

      <h3>Scale Degrees</h3>
      <p>
        Each note in the major scale has a name based on its position:
      </p>

      <div style={{ marginTop: 12 }}>
        <div style={{ marginBottom: 8 }}>
          <strong>1. Tonic (Do)</strong> — The home note, the center of the key
        </div>
        <div style={{ marginBottom: 8 }}>
          <strong>2. Supertonic (Re)</strong> — One step up
        </div>
        <div style={{ marginBottom: 8 }}>
          <strong>3. Mediant (Mi)</strong> — The middle note of the first chord
        </div>
        <div style={{ marginBottom: 8 }}>
          <strong>4. Subdominant (Fa)</strong> — Below the dominant
        </div>
        <div style={{ marginBottom: 8 }}>
          <strong>5. Dominant (Sol)</strong> — The most important note after the tonic
        </div>
        <div style={{ marginBottom: 8 }}>
          <strong>6. Submediant (La)</strong> — Below the mediant of the upper octave
        </div>
        <div style={{ marginBottom: 8 }}>
          <strong>7. Leading Tone (Ti)</strong> — Pulls strongly toward the tonic
        </div>
        <div>
          <strong>8. Tonic (Do)</strong> — We've come home, one octave higher
        </div>
      </div>

      <h3>Why Major Sounds Bright</h3>
      <p>
        The major scale has a specific recipe of intervals that creates a bright, happy, settled feeling. Play with different keys — the recipe is always the same, just starting from a different note.
      </p>

      <div style={{
        background: "rgba(0,0,0,0.03)",
        padding: "12px",
        borderRadius: "4px",
        marginTop: 12,
        fontSize: "0.9rem",
        opacity: 0.8,
      }}>
        <strong>Try this:</strong> Sing "do-re-mi-fa-sol-la-ti-do" and feel how each note naturally leads to the next. That's the major scale.
      </div>
    </div>
  );
}
