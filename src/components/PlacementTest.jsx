import { useState } from "react";
import { PLACEMENT_TEST, getPlacementLevel } from "../curriculum.js";

export default function PlacementTest({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const question = PLACEMENT_TEST[index];
  const isLast = index === PLACEMENT_TEST.length - 1;

  const handleAnswer = (optionIndex) => {
    if (answered) return;
    setAnswered(true);
    if (optionIndex === question.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (isLast) {
      const level = getPlacementLevel(score);
      onComplete(level);
    } else {
      setIndex(index + 1);
      setAnswered(false);
    }
  };

  return (
    <div className="fade-in">
      <h1 className="screen-title">What's your starting point?</h1>
      <p className="screen-sub">Quick 6-question placement test to find where to begin.</p>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="eyebrow">Question {index + 1} of {PLACEMENT_TEST.length}</div>
        <div style={{ background: "rgba(0,0,0,0.1)", height: 8, borderRadius: 4, marginBottom: 20 }}>
          <div
            style={{
              background: "currentColor",
              height: "100%",
              borderRadius: 4,
              width: `${((index + 1) / PLACEMENT_TEST.length) * 100}%`,
              transition: "width 0.3s",
            }}
          />
        </div>

        <h2 style={{ marginBottom: 20 }}>{question.question}</h2>

        <div className="options">
          {question.options.map((opt, i) => {
            let cls = "option";
            if (answered) {
              if (i === question.correct) cls += " correct";
              else if (i !== question.correct) cls += " wrong";
            }
            return (
              <button
                key={i}
                className={cls}
                onClick={() => handleAnswer(i)}
                disabled={answered}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <>
            <div className="why" style={{ marginTop: 20 }}>
              {index === question.correct ? (
                <>Right! You're building confidence here.</>
              ) : (
                <>No worries — that's what learning is for.</>
              )}
            </div>
            <button
              className="btn btn-ghost btn-block"
              style={{ marginTop: 12 }}
              onClick={handleNext}
            >
              {isLast ? "See your starting level" : "Next question"} →
            </button>
          </>
        )}
      </div>

      {!answered && <p style={{ textAlign: "center", opacity: 0.6 }}>Pick an answer to continue</p>}
    </div>
  );
}
