// A plain-SVG Circle of Fifths — no fonts or images. Twelve positions
// arranged clockwise, each a perfect fifth above the last, with the major
// key in bold and its relative minor beneath it. C sits at the top.
const MAJOR_KEYS = ["C", "G", "D", "A", "E", "B", "F♯/G♭", "D♭", "A♭", "E♭", "B♭", "F"];
const MINOR_KEYS = ["Am", "Em", "Bm", "F♯m", "C♯m", "G♯m", "D♯m/E♭m", "B♭m", "Fm", "Cm", "Gm", "Dm"];

export default function CircleOfFifths({ highlightIndex = 0 }) {
  const size = 260;
  const center = size / 2;
  const radius = 96;

  const points = MAJOR_KEYS.map((label, i) => {
    const angle = (Math.PI / 180) * (i * 30 - 90);
    return {
      i,
      label,
      minor: MINOR_KEYS[i],
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  });

  return (
    <div className="staff-wrap" style={{ textAlign: "center" }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{ width: "100%", maxWidth: 320, display: "block", margin: "0 auto" }}
        role="img"
        aria-label="Circle of fifths: twelve major and minor keys arranged clockwise, each a fifth above the last"
      >
        <circle cx={center} cy={center} r={radius} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        {points.map((p) => {
          const isHighlighted = p.i === highlightIndex;
          return (
            <g key={p.i}>
              <circle
                cx={p.x}
                cy={p.y}
                r="21"
                fill={isHighlighted ? "var(--ember)" : "#fffdf8"}
                stroke="currentColor"
                strokeWidth="1"
                opacity={isHighlighted ? 1 : 0.9}
              />
              <text
                x={p.x}
                y={p.y - 2}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={isHighlighted ? "#fff" : "currentColor"}
              >
                {p.label}
              </text>
              <text
                x={p.x}
                y={p.y + 11}
                textAnchor="middle"
                fontSize="9"
                fill={isHighlighted ? "rgba(255,255,255,0.85)" : "currentColor"}
                opacity={isHighlighted ? 1 : 0.6}
              >
                {p.minor}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="staff-caption">
        C sits at the top. Clockwise adds a sharp each step; counter-clockwise adds a flat.
      </div>
    </div>
  );
}
