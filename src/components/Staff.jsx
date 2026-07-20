// SVG staff renderer — real five-line staff with drawn clefs, note heads,
// ledger lines, and tap-to-hear. No fonts, no libraries: renders identically
// on every device.
import { playNote } from "../audio.js";

const SPACING = 12; // px between staff lines
const LINES_Y = [30, 42, 54, 66, 78]; // top → bottom
const BOTTOM_Y = 78;

const LETTER_INDEX = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };
const LETTER_SEMIS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

// Diatonic index of the bottom staff line: E4 for treble, G2 for bass.
const BOTTOM_DIA = { treble: 4 * 7 + LETTER_INDEX.E, bass: 2 * 7 + LETTER_INDEX.G };

function diaIndex(note) {
  return note.octave * 7 + LETTER_INDEX[note.letter];
}

function noteY(note, clef) {
  return BOTTOM_Y - (diaIndex(note) - BOTTOM_DIA[clef]) * (SPACING / 2);
}

export function noteToMidi(note) {
  const accShift = note.acc === "#" ? 1 : note.acc === "b" ? -1 : 0;
  return 12 * (note.octave + 1) + LETTER_SEMIS[note.letter] + accShift;
}

function ledgerLines(y) {
  const ys = [];
  if (y >= BOTTOM_Y + SPACING) {
    for (let ly = BOTTOM_Y + SPACING; ly <= y + 0.1; ly += SPACING) ys.push(ly);
  } else if (y <= LINES_Y[0] - SPACING) {
    for (let ly = LINES_Y[0] - SPACING; ly >= y - 0.1; ly -= SPACING) ys.push(ly);
  }
  return ys;
}

// Hand-drawn clefs (single stroked paths) so no music font is needed.
function TrebleClef() {
  return (
    <g stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* bottom curl */}
      <path d="M 30 84 C 28 90, 36 93, 38.5 87 C 39 85.5, 39 84, 39 82" />
      {/* stem, top hook, left descent, bowl and spiral around the G line */}
      <path d="M 39 82 L 39 20 C 39 15, 43 12, 44 17 C 45 22, 41 26, 37 30 C 31 36, 28 44, 29 51 C 30 60, 36 64, 41 63 C 47 61, 49 68, 45 74 C 41 79, 32 78, 30 71 C 28 64, 33 59, 37 60 C 40 61, 41 64, 39 66" />
    </g>
  );
}

function BassClef() {
  return (
    <g fill="currentColor">
      <path
        d="M 26 47 C 24 38, 32 28, 40 32 C 48 36, 47 48, 42 58 C 38 65, 32 70, 27 74"
        stroke="currentColor"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="26.5" cy="45" r="4" />
      <circle cx="52" cy="36" r="2.6" />
      <circle cx="52" cy="48" r="2.6" />
    </g>
  );
}

// Faint full-width labels for teaching the line/space names.
function GuideLabels({ mode, clef, width }) {
  const letters = [];
  const startDia = BOTTOM_DIA[clef] + (mode === "spaces" ? 1 : 0);
  const count = mode === "spaces" ? 4 : 5;
  const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
  for (let i = 0; i < count; i++) {
    const dia = startDia + i * 2;
    letters.push({
      letter: LETTERS[dia % 7],
      y: BOTTOM_Y - (dia - BOTTOM_DIA[clef]) * (SPACING / 2),
    });
  }
  return (
    <g fontSize="10" fontWeight="700" fill="currentColor">
      {letters.map((l, i) => (
        <g key={i}>
          <circle cx={width - 22} cy={l.y} r="7.5" fill="#fffdf8" stroke="currentColor" strokeWidth="0.8" opacity="0.9" />
          <text x={width - 22} y={l.y + 3.6} textAnchor="middle" opacity="0.8">{l.letter}</text>
        </g>
      ))}
    </g>
  );
}

/**
 * notes: [{ letter: "G", octave: 4, acc?: "#"|"b", label?: "G" }]
 * clef: "treble" | "bass"
 * guide: "lines" | "spaces" — faint letter labels for teaching
 * interactive: tap a note to hear it (default true)
 * caption: small text under the staff
 */
export default function Staff({ clef = "treble", notes = [], guide = null, interactive = true, caption = null }) {
  const noteGap = 46;
  const notesStart = 74;
  const width = Math.max(230, notesStart + notes.length * noteGap + 26);
  const hasLow = notes.some((n) => noteY(n, clef) > 92);
  const height = hasLow ? 118 : 106;

  const tap = (note) => {
    if (interactive) playNote(noteToMidi(note), { dur: 1.2, gain: 0.4 });
  };

  return (
    <div className="staff-wrap">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: "100%", maxWidth: width * 1.35, display: "block" }}
        role="img"
        aria-label={`${clef} staff${notes.length ? " with notes " + notes.map((n) => n.letter + (n.acc || "") + n.octave).join(", ") : ""}`}
      >
        {/* staff lines */}
        {LINES_Y.map((y) => (
          <line key={y} x1="8" y1={y} x2={width - 8} y2={y} stroke="currentColor" strokeWidth="1.1" opacity="0.75" />
        ))}
        {/* end barlines */}
        <line x1="8" y1={LINES_Y[0]} x2="8" y2={BOTTOM_Y} stroke="currentColor" strokeWidth="1.5" />
        <line x1={width - 8} y1={LINES_Y[0]} x2={width - 8} y2={BOTTOM_Y} stroke="currentColor" strokeWidth="1.5" />

        {clef === "treble" ? <TrebleClef /> : <BassClef />}
        {guide && <GuideLabels mode={guide} clef={clef} width={width} />}

        {notes.map((note, i) => {
          const x = notesStart + i * noteGap;
          const y = noteY(note, clef);
          return (
            <g
              key={i}
              onClick={() => tap(note)}
              style={interactive ? { cursor: "pointer" } : undefined}
            >
              {/* generous invisible tap target */}
              {interactive && <rect x={x - 18} y={y - 26} width="36" height="52" fill="transparent" />}
              {ledgerLines(y).map((ly) => (
                <line key={ly} x1={x - 11} y1={ly} x2={x + 11} y2={ly} stroke="currentColor" strokeWidth="1.1" opacity="0.75" />
              ))}
              {note.acc && (
                <text x={x - 15} y={y + 4.5} fontSize="14" fontWeight="600" textAnchor="middle" fill="currentColor">
                  {note.acc === "#" ? "♯" : "♭"}
                </text>
              )}
              <ellipse cx={x} cy={y} rx="7" ry="5.4" fill="currentColor" transform={`rotate(-14 ${x} ${y})`} />
              {note.label && (
                <text x={x} y={height - 4} fontSize="10.5" fontWeight="700" textAnchor="middle" fill="currentColor" opacity="0.8">
                  {note.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {caption && <div className="staff-caption">{caption}</div>}
      {interactive && notes.length > 0 && <div className="staff-hint">tap a note to hear it</div>}
    </div>
  );
}
