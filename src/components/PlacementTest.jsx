import { useEffect, useRef, useState } from "react";
import { CURRICULUM, PLACEMENT_SECTIONS, buildShuffledPlacementSections, computePlacementResult } from "../curriculum.js";
import { playDemo } from "../demos.js";
import { noteName } from "../theory.js";
import Staff from "./Staff.jsx";
import Keyboard from "./Keyboard.jsx";

const DONT_KNOW = "dontknow";
const TOTAL_QUESTIONS = PLACEMENT_SECTIONS.reduce((n, s) => n + s.questions.length, 0);

export default function PlacementTest({ onComplete }) {
  // Randomized once per attempt: question order and answer-option order both
  // shuffle, so retaking the check never looks the same way twice.
  const [sections] = useState(buildShuffledPlacementSections);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [played, setPlayed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const headingRef = useRef(null);

  const section = sections[sectionIdx];
  const question = section.questions[qIdx];
  const isLastQuestionInSection = qIdx === section.questions.length - 1;
  const isLastSection = sectionIdx === sections.length - 1;
  const answered = selected !== null;
  const questionsBefore = sections.slice(0, sectionIdx).reduce((n, s) => n + s.questions.length, 0) + qIdx;
  const isTapKey = question.type === "tap-key";

  const outcome = !answered
    ? null
    : selected === DONT_KNOW
    ? "dontknow"
    : selected === (isTapKey ? question.correctMidi : question.correct)
    ? "correct"
    : "wrong";

  // Move focus to the question heading on every new question, so screen
  // reader and keyboard users land somewhere sensible instead of staying
  // wherever the previous "Next" button was.
  useEffect(() => {
    headingRef.current?.focus();
  }, [sectionIdx, qIdx]);

  const handleAnswer = (value) => {
    if (answered) return;
    setSelected(value);
  };

  const handleNext = () => {
    const sectionAnswers = [...(answers[section.id] || []), outcome];
    const nextAnswers = { ...answers, [section.id]: sectionAnswers };
    setAnswers(nextAnswers);
    setSelected(null);
    setPlayed(false);

    if (!isLastQuestionInSection) {
      setQIdx(qIdx + 1);
    } else if (!isLastSection) {
      setSectionIdx(sectionIdx + 1);
      setQIdx(0);
    } else {
      setResult(computePlacementResult(nextAnswers));
    }
  };

  const choosePath = (moduleIndex, freeNavigation) => {
    onComplete({ moduleIndex, freeNavigation, summary: result });
  };

  if (result) {
    return <PlacementResults result={result} onChoose={choosePath} />;
  }

  return (
    <div className="fade-in">
      <h1 className="screen-title">What's your starting point?</h1>
      <p className="screen-sub">
        Honest answers matter more than right ones — "I don't know yet" is a completely fine thing to tap.
      </p>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="eyebrow">
          Section {sectionIdx + 1} of {sections.length} · {section.title}
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={TOTAL_QUESTIONS}
          aria-valuenow={questionsBefore + 1}
          aria-label="Placement check progress"
          style={{ background: "rgba(58,44,33,0.1)", height: 8, borderRadius: 4, marginBottom: 20 }}
        >
          <div
            style={{
              background: "var(--ember)",
              height: "100%",
              borderRadius: 4,
              width: `${((questionsBefore + 1) / TOTAL_QUESTIONS) * 100}%`,
              transition: "width 0.3s",
            }}
          />
        </div>

        <h2 style={{ marginBottom: 16 }} ref={headingRef} tabIndex={-1}>
          {question.q}
        </h2>

        {question.staff && <Staff clef={question.staff.clef} notes={question.staff.notes} interactive={false} />}

        {question.demo && (
          <button
            className="btn btn-primary btn-block"
            style={{ marginBottom: 4 }}
            onClick={() => {
              playDemo(question.demo);
              setPlayed(true);
            }}
          >
            ▶ &nbsp;{played ? "Hear it again" : "Play the sound"}
          </button>
        )}

        {isTapKey ? (
          <div style={{ margin: "14px 0" }}>
            <Keyboard
              startMidi={question.keyboardStart}
              octaves={question.keyboardOctaves || 1}
              litNotes={answered ? [question.correctMidi] : []}
              onKeyTap={(midi) => handleAnswer(midi)}
            />
            <p className="subtle" style={{ textAlign: "center", marginTop: 8 }}>
              Tap the key that matches the note on the staff.
            </p>
          </div>
        ) : (
          <div className="options" role="group" aria-label="Answer options">
            {question.options.map((opt, i) => {
              let cls = "option";
              if (answered) {
                if (i === question.correct) cls += " correct";
                else if (i === selected) cls += " wrong";
              }
              return (
                <button
                  key={i}
                  className={cls}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  aria-pressed={i === selected}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        <button
          className={`option-dontknow ${selected === DONT_KNOW ? "chosen" : ""}`}
          onClick={() => handleAnswer(DONT_KNOW)}
          disabled={answered}
          aria-pressed={selected === DONT_KNOW}
        >
          I don't know yet
        </button>

        {answered && (
          <>
            <div className="why" style={{ marginTop: 20 }} role="status" aria-live="polite">
              {outcome === "correct" && (
                <>
                  <strong>Right.</strong> {question.why}
                </>
              )}
              {outcome === "wrong" && isTapKey && (
                <>
                  <strong>Good try.</strong> That note was {noteName(question.correctMidi)}. {question.why}
                </>
              )}
              {outcome === "wrong" && !isTapKey && (
                <>
                  <strong>Good try.</strong> The answer is "{question.options[question.correct]}." {question.why}
                </>
              )}
              {outcome === "dontknow" && (
                <>
                  <strong>We'll learn this.</strong> This is part of {section.title.toLowerCase()} — it's on your
                  path, no need to know it yet.
                </>
              )}
            </div>
            <button className="btn btn-ghost btn-block" style={{ marginTop: 12 }} onClick={handleNext}>
              {isLastQuestionInSection && isLastSection ? "See your results" : "Next question"} →
            </button>
          </>
        )}
      </div>

      {!answered && (
        <p style={{ textAlign: "center", opacity: 0.6 }}>
          {question.demo ? "Listen first, then pick an answer — or say you don't know yet" : "Pick an answer, or say you don't know yet"}
        </p>
      )}
    </div>
  );
}

function PlacementResults({ result, onChoose }) {
  const recommendedModule = CURRICULUM[result.recommendedModuleIndex];
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="screen-title" ref={headingRef} tabIndex={-1}>
        Here's what we learned about you
      </h1>
      <p className="screen-sub">
        This isn't a score — it's a map. Everything below is exactly what the lessons are for.
      </p>

      {result.knowWell.length > 0 && (
        <div className="card">
          <div className="eyebrow">You seem to know these well</div>
          <ul className="placement-list">
            {result.knowWell.map((s) => (
              <li key={s.id}>{s.title}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="card">
        <div className="eyebrow">We'll work on these to get them down solidly</div>
        {result.toLearn.length > 0 ? (
          <ul className="placement-list">
            {result.toLearn.map((s) => (
              <li key={s.id}>
                {s.title}
                {s.status === "developing" && <span className="subtle"> — you're partway there</span>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="subtle" style={{ margin: 0 }}>
            Nothing here — you were solid across everything we checked.
          </p>
        )}
      </div>

      <div className="card" style={{ textAlign: "center" }}>
        <div className="eyebrow">Suggested path</div>
        <h2 style={{ marginBottom: 10 }}>Start with {recommendedModule.title}</h2>
        <p className="subtle" style={{ marginBottom: 16 }}>{recommendedModule.subtitle}</p>
        <button className="btn btn-primary btn-block" onClick={() => onChoose(result.recommendedModuleIndex, false)}>
          Follow this path →
        </button>
        <button className="btn btn-ghost btn-block" style={{ marginTop: 10 }} onClick={() => onChoose(0, false)}>
          Start from the very beginning
        </button>
        <button className="btn btn-ghost btn-block" style={{ marginTop: 10 }} onClick={() => onChoose(0, true)}>
          Let me choose my own modules
        </button>
        <p className="subtle" style={{ marginTop: 14, marginBottom: 0 }}>
          You can retake this or jump to any lesson for review, any time.
        </p>
      </div>
    </div>
  );
}
