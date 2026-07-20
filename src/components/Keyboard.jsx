import { useMemo } from "react";
import { playNote } from "../audio.js";
import { noteName } from "../theory.js";

// Interactive two-octave keyboard. `litNotes` (midi array) highlights chord
// tones. `onKeyTap`, if given, fires (in addition to the sound) whenever a
// key is pressed — used to turn the keyboard into an answer surface for
// "tap the note" questions.
export default function Keyboard({ startMidi = 60, octaves = 2, litNotes = [], onKeyTap }) {
  const litSet = useMemo(() => new Set(litNotes), [litNotes]);

  const whites = [];
  const blacks = [];
  let whiteIndex = 0;
  const totalWhites = octaves * 7 + 1;

  for (let m = startMidi; m <= startMidi + octaves * 12; m++) {
    const pc = m % 12;
    const isBlack = [1, 3, 6, 8, 10].includes(pc);
    if (!isBlack) {
      whites.push({ midi: m, index: whiteIndex });
      whiteIndex++;
    } else {
      blacks.push({ midi: m, index: whiteIndex }); // sits between previous & next white
    }
  }

  const handleTap = (midi) => {
    playNote(midi);
    onKeyTap?.(midi);
  };

  return (
    <div className="keyboard" role="group" aria-label="Piano keyboard">
      {whites.map(({ midi }) => (
        <button
          key={midi}
          className={`key-white${litSet.has(midi) ? " lit" : ""}`}
          onPointerDown={() => handleTap(midi)}
          aria-label={`${noteName(midi)} key`}
        >
          {midi % 12 === 0 && <span className="label">C</span>}
        </button>
      ))}
      {blacks.map(({ midi, index }) => (
        <button
          key={midi}
          className={`key-black${litSet.has(midi) ? " lit" : ""}`}
          style={{ left: `${(index / totalWhites) * 100 - 4}%` }}
          onPointerDown={() => handleTap(midi)}
          aria-label={`${noteName(midi)} key`}
        />
      ))}
    </div>
  );
}
