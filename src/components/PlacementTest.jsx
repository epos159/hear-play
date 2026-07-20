import { useState } from "react";
import { PLACEMENT_TEST, getPlacementLevel } from "../curriculum.js";
import { playChord, playInterval, playProgression, playSequence } from "../audio.js";
import Staff from "./Staff.jsx";

// Staff graphics for the notation questions, keyed by question id.
const STAFF_FIGURES = {
  "read-treble": { clef: "treble", notes: [{ letter: "G", octave: 4 }] },
};

// Audio demos for the listening questions, keyed by question id.
const AUDIO_DEMOS = {
  "major-scale": () => playSequence([60, 62, 64, 65, 67, 69, 71, 72], 0.3),
  "interval-4th": () => playInterval(60, 5),
  "chord-emotion": () => playChord([60, 64, 67]),
  "progression-ending": () =>
    playProgression([
      [60, 64, 67],
      [65, 69, 72],
      [67, 71, 74],
      [60, 64, 67],
    ]),
  "cadence-recognize": () =>
    playProgression([
      [60, 64, 67],
      [67, 71, 74],
      [60, 64, 67],
    ]),
};

export default function PlacementTest({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [played, setPlayed] = useState(false);

  const question = PLACEMENT_TEST[index];
  const isLast = index === PLACEMENT_TEST.length - 1;
  const answered = selected !== null;
  const playDemo = AUDIO_DEMOS[question.id];
  const staffFigure = STAFF_FIGURES[question.id];

  const handleAnswer = (optionIndex) => {
    if (answered) return;
    setSelected(optionIndex);
    if (optionIndex === question.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (isLast) {
      onComplete(getPlacementLevel(score));
    } else {
      setIndex(index + 1);
      setSelected(null);
      setPlayed(false);
    }
  };

  return (
    <div className="fade-in">
      <h1 className="screen-title">What's your starting point?</h1>
      <p className="screen-sub">Six quick questions to find where to begin. Guessing is fine — wrong answers just mean we start earlier.</p>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="eyebrow">Question {index + 1} of {PLACEMENT_TEST.length}</div>
        <div style={{ background: "rgba(58,44,33,0.1)", height: 8, borderRadius: 4, marginBottom: 20 }}>
          <div
            style={{
              background: "var(--ember)",
              height: "100%",
              borderRadius: 4,
              width: `${((index + 1) / PLACEMENT_TEST.length) * 100}%`,
              transition: "width 0.3s",
            }}
          />
        </div>

        <h2 style={{ marginBottom: 16 }}>{question.question}</h2>

        {staffFigure && (
          <Staff clef={staffFigure.clef} notes={staffFigure.notes} interactive={false} />
        )}

        {playDemo && (
          <button
            className="btn btn-primary btn-block"
            style={{ marginBottom: 4 }}
            onClick={() => { playDemo(); setPlayed(true); }}
          >
            ▶ &nbsp;{played ? "Hear it again" : "Play the sound"}
          </button>
        )}

        <div className="options">
          {question.options.map((opt, i) => {
            let cls = "option";
            if (answered) {
              if (i === question.correct) cls += " correct";
              else if (i === selected) cls += " wrong";
            }
            return (
              <button key={i} className={cls} onClick={() => handleAnswer(i)} disabled={answered}>
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <>
            <div className="why" style={{ marginTop: 20 }}>
              {selected === question.correct ? (
                <><strong>Right.</strong> You already know this one.</>
              ) : (
                <><strong>No worries.</strong> The answer is {question.options[question.correct]} — this is exactly what the lessons cover.</>
              )}
            </div>
            <button className="btn btn-ghost btn-block" style={{ marginTop: 12 }} onClick={handleNext}>
              {isLast ? "See your starting level" : "Next question"} →
            </button>
          </>
        )}
      </div>

      {!answered && (
        <p style={{ textAlign: "center", opacity: 0.6 }}>
          {playDemo ? "Listen first, then pick an answer" : "Pick an answer to continue"}
        </p>
      )}
    </div>
  );
}
