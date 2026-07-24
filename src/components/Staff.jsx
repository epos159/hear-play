// SVG staff renderer — five-line staff with clefs, note heads (by duration),
// stems/flags, rests, ledger lines, and tap-to-hear.
import { playNote } from "../audio.js";

const SPACING = 12; // px between staff lines
const LINES_Y = [30, 42, 54, 66, 78]; // top → bottom
const BOTTOM_Y = 78;
const STEM_LEN = 30;
const HEAD_RX = 7;
const HEAD_RY = 5.4;

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

function TrebleClef() {
  return (
    <text
      x="36"
      y="76"
      fontFamily="'Noto Music', 'Segoe UI Symbol', serif"
      fontSize="66"
      fill="currentColor"
      textAnchor="middle"
      style={{ userSelect: "none" }}
      aria-hidden="true"
    >
      {"\u{1D11E}"}
    </text>
  );
}

function BassClef() {
  return (
    <text
      x="34"
      y="72"
      fontFamily="'Noto Music', 'Segoe UI Symbol', serif"
      fontSize="52"
      fill="currentColor"
      textAnchor="middle"
      style={{ userSelect: "none" }}
      aria-hidden="true"
    >
      {"\u{1D122}"}
    </text>
  );
}

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

/** Open (hollow) vs filled notehead by duration. */
function NoteHead({ x, y, open }) {
  if (open) {
    return (
      <ellipse
        cx={x}
        cy={y}
        rx={HEAD_RX}
        ry={HEAD_RY}
        fill="#fffdf8"
        stroke="currentColor"
        strokeWidth="1.8"
        transform={`rotate(-14 ${x} ${y})`}
      />
    );
  }
  return <ellipse cx={x} cy={y} rx={HEAD_RX} ry={HEAD_RY} fill="currentColor" transform={`rotate(-14 ${x} ${y})`} />;
}

/** Eighth-note flag attached at the stem tip. */
function StemFlag({ stemX, stemTipY, stemUp }) {
  if (stemUp) {
    return (
      <path
        d={`M ${stemX} ${stemTipY} C ${stemX + 14} ${stemTipY + 6}, ${stemX + 16} ${stemTipY + 20}, ${stemX + 4} ${stemTipY + 28}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    );
  }
  return (
    <path
      d={`M ${stemX} ${stemTipY} C ${stemX + 14} ${stemTipY - 6}, ${stemX + 16} ${stemTipY - 20}, ${stemX + 4} ${stemTipY - 28}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  );
}

/**
 * Draw a pitched note with optional duration.
 * value: "whole" | "half" | "quarter" | "eighth" (default "quarter")
 */
function PitchedNote({ note, x, y, height, interactive, onTap }) {
  const value = note.value || "quarter";
  const isWhole = value === "whole";
  const isOpen = value === "whole" || value === "half";
  const hasFlag = value === "eighth";
  const stemUp = y > LINES_Y[2];
  const stemX = stemUp ? x + 6.6 : x - 6.6;
  const stemTipY = stemUp ? y - STEM_LEN : y + STEM_LEN;

  return (
    <g onClick={onTap} style={interactive ? { cursor: "pointer" } : undefined}>
      {interactive && <rect x={x - 18} y={y - 26} width="36" height="52" fill="transparent" />}
      {ledgerLines(y).map((ly) => (
        <line key={ly} x1={x - 11} y1={ly} x2={x + 11} y2={ly} stroke="currentColor" strokeWidth="1.1" opacity="0.75" />
      ))}
      {note.acc && (
        <text x={x - 15} y={y + 4.5} fontSize="14" fontWeight="600" textAnchor="middle" fill="currentColor">
          {note.acc === "#" ? "♯" : "♭"}
        </text>
      )}
      {!isWhole && <line x1={stemX} y1={y} x2={stemX} y2={stemTipY} stroke="currentColor" strokeWidth="1.6" />}
      {hasFlag && <StemFlag stemX={stemX} stemTipY={stemTipY} stemUp={stemUp} />}
      <NoteHead x={x} y={y} open={isOpen} />
      {note.label && (
        <text x={x} y={height - 4} fontSize="10.5" fontWeight="700" textAnchor="middle" fill="currentColor" opacity="0.8">
          {note.label}
        </text>
      )}
    </g>
  );
}

/**
 * Rests sit in fixed staff positions (not pitch).
 * rest: "whole" | "half" | "quarter" | "eighth"
 */
function RestSymbol({ rest, x, height, label }) {
  // Whole hangs from the 4th line; half sits on the 3rd; quarter/eighth float mid-staff.
  let body = null;
  if (rest === "whole") {
    body = <rect x={x - 7} y={LINES_Y[1]} width="14" height="6" fill="currentColor" />;
  } else if (rest === "half") {
    body = <rect x={x - 7} y={LINES_Y[2] - 6} width="14" height="6" fill="currentColor" />;
  } else if (rest === "quarter") {
    body = (
      <path
        d={`M ${x - 2} ${LINES_Y[0] + 4}
            C ${x + 8} ${LINES_Y[1]}, ${x - 10} ${LINES_Y[2]}, ${x + 4} ${LINES_Y[2] + 4}
            C ${x - 8} ${LINES_Y[3]}, ${x + 6} ${LINES_Y[3] + 6}, ${x - 2} ${BOTTOM_Y - 4}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  } else {
    // eighth rest — classic "flag with a ball" shape
    body = (
      <g fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path
          d={`M ${x + 5} ${LINES_Y[3] + 2}
              L ${x - 1} ${LINES_Y[1] - 2}
              C ${x - 10} ${LINES_Y[1] + 8}, ${x + 2} ${LINES_Y[2] + 4}, ${x + 5} ${LINES_Y[1] + 6}`}
          strokeWidth="1.8"
        />
      </g>
    );
  }

  return (
    <g>
      {body}
      {label && (
        <text x={x} y={height - 4} fontSize="10.5" fontWeight="700" textAnchor="middle" fill="currentColor" opacity="0.8">
          {label}
        </text>
      )}
    </g>
  );
}

/**
 * Compact standalone glyph for teaching note/rest shapes outside a full staff.
 * kind: note value name, or "rest-whole" / "rest-half" / etc.
 */
export function NoteGlyph({ kind = "quarter", size = 44 }) {
  const isRest = kind.startsWith("rest-");
  const value = isRest ? kind.slice(5) : kind;
  const w = size;
  const h = size * 1.35;
  const cx = w / 2;
  const cy = h * 0.58;
  const lineYs = [0.28, 0.4, 0.52, 0.64, 0.76].map((t) => h * t);

  if (isRest) {
    let body = null;
    if (value === "whole") {
      body = <rect x={cx - 8} y={lineYs[1]} width="16" height="7" fill="currentColor" />;
    } else if (value === "half") {
      body = <rect x={cx - 8} y={lineYs[2] - 7} width="16" height="7" fill="currentColor" />;
    } else if (value === "quarter") {
      body = (
        <path
          d={`M ${cx - 2} ${lineYs[0] + 2}
              C ${cx + 9} ${lineYs[1]}, ${cx - 10} ${lineYs[2]}, ${cx + 4} ${lineYs[2] + 2}
              C ${cx - 8} ${lineYs[3]}, ${cx + 6} ${lineYs[3] + 4}, ${cx - 2} ${lineYs[4] - 2}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    } else {
      body = (
        <g fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path
            d={`M ${cx + 5} ${lineYs[3] + 2}
                L ${cx - 1} ${lineYs[1] - 2}
                C ${cx - 10} ${lineYs[1] + 8}, ${cx + 2} ${lineYs[2] + 4}, ${cx + 5} ${lineYs[1] + 6}`}
            strokeWidth="1.8"
          />
        </g>
      );
    }
    return (
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true" className="note-glyph">
        {lineYs.map((y, i) => (
          <line key={i} x1="4" y1={y} x2={w - 4} y2={y} stroke="currentColor" strokeWidth="1" opacity="0.35" />
        ))}
        {body}
      </svg>
    );
  }

  const open = value === "whole" || value === "half";
  const hasStem = value !== "whole";
  const hasFlag = value === "eighth";
  const stemX = cx + 6.2;
  const stemTip = cy - 28;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true" className="note-glyph">
      {hasStem && <line x1={stemX} y1={cy} x2={stemX} y2={stemTip} stroke="currentColor" strokeWidth="1.8" />}
      {hasFlag && (
        <path
          d={`M ${stemX} ${stemTip} C ${stemX + 12} ${stemTip + 5}, ${stemX + 14} ${stemTip + 18}, ${stemX + 3} ${stemTip + 25}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
      <NoteHead x={cx} y={cy} open={open} />
    </svg>
  );
}

/**
 * notes: [{ letter, octave, acc?, label?, value? } | { rest, label? }]
 * value / rest: "whole" | "half" | "quarter" | "eighth"
 * clef: "treble" | "bass" | "none" — "none" for rhythm-only examples
 */
export default function Staff({
  clef = "treble",
  notes = [],
  guide = null,
  interactive = true,
  caption = null,
}) {
  const showClef = clef !== "none";
  const noteGap = 46;
  const notesStart = showClef ? 82 : 28;
  const width = Math.max(showClef ? 230 : 160, notesStart + notes.length * noteGap + 26);
  const pitched = notes.filter((n) => !n.rest);
  const hasLow = pitched.some((n) => noteY(n, clef === "none" ? "treble" : clef) > 92);
  const height = hasLow ? 118 : 106;
  const pitchClef = clef === "none" ? "treble" : clef;

  const tap = (note) => {
    if (interactive && !note.rest) playNote(noteToMidi(note), { dur: 1.2, gain: 0.4 });
  };

  const ariaNotes = notes
    .map((n) => (n.rest ? `${n.rest} rest` : `${n.value || "quarter"} ${n.letter}${n.acc || ""}${n.octave}`))
    .join(", ");

  return (
    <div className="staff-wrap">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: "100%", maxWidth: width * 1.35, display: "block" }}
        role="img"
        aria-label={`${showClef ? clef : "rhythm"} staff${notes.length ? " with " + ariaNotes : ""}`}
      >
        {LINES_Y.map((y) => (
          <line key={y} x1="8" y1={y} x2={width - 8} y2={y} stroke="currentColor" strokeWidth="1.1" opacity="0.75" />
        ))}
        <line x1="8" y1={LINES_Y[0]} x2="8" y2={BOTTOM_Y} stroke="currentColor" strokeWidth="1.5" />
        <line x1={width - 8} y1={LINES_Y[0]} x2={width - 8} y2={BOTTOM_Y} stroke="currentColor" strokeWidth="1.5" />

        {clef === "treble" && <TrebleClef />}
        {clef === "bass" && <BassClef />}
        {guide && showClef && <GuideLabels mode={guide} clef={pitchClef} width={width} />}

        {notes.map((note, i) => {
          const x = notesStart + i * noteGap;
          if (note.rest) {
            return <RestSymbol key={i} rest={note.rest} x={x} height={height} label={note.label} />;
          }
          const y = noteY(note, pitchClef);
          return (
            <PitchedNote
              key={i}
              note={note}
              x={x}
              y={y}
              height={height}
              interactive={interactive}
              onTap={() => tap(note)}
            />
          );
        })}
      </svg>
      {caption && <div className="staff-caption">{caption}</div>}
      {interactive && pitched.length > 0 && <div className="staff-hint">tap a note to hear it</div>}
    </div>
  );
}
