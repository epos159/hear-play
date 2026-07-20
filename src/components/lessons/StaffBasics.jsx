export default function LessonStaffBasics({ lesson }) {
  return (
    <div>
      <h2>The Musical Staff</h2>

      <p>
        Music notation uses five lines called a <strong>staff</strong> to show pitch. The higher a note sits on the staff, the higher it sounds.
      </p>

      <div style={{
        background: "rgba(0,0,0,0.05)",
        padding: "20px",
        borderRadius: "8px",
        margin: "20px 0",
        fontFamily: "monospace",
        fontSize: "24px",
        lineHeight: "2.5",
        textAlign: "center",
        color: "rgba(0,0,0,0.8)",
      }}>
        <div>─ Line 5</div>
        <div>  Space 4</div>
        <div>─ Line 4</div>
        <div>  Space 3</div>
        <div>─ Line 3</div>
        <div>  Space 2</div>
        <div>─ Line 2</div>
        <div>  Space 1</div>
        <div>─ Line 1</div>
      </div>

      <h3>The Treble Clef (𝄞)</h3>
      <p>
        The treble clef shows <strong>higher-pitched notes</strong> — what most melody instruments and the right hand of piano play.
      </p>
      <p style={{ opacity: 0.7, fontSize: "0.95rem" }}>
        On the treble staff, Line 2 is G, Line 3 is B, and Line 5 is F. The spaces spell the word FACE from bottom to top.
      </p>

      <h3>The Bass Clef (𝄢)</h3>
      <p>
        The bass clef shows <strong>lower-pitched notes</strong> — what bass instruments and the left hand of piano play.
      </p>
      <p style={{ opacity: 0.7, fontSize: "0.95rem" }}>
        On the bass staff, Line 4 is G, Line 3 is B, and Line 1 is A. The spaces spell ACEG from bottom to top.
      </p>

      <h3>Key Takeaway</h3>
      <p>
        The clef symbol at the start of the staff tells you which notes the lines and spaces represent. Same five lines and spaces, but different clefs mean different pitches.
      </p>
    </div>
  );
}
