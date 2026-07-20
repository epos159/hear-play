import { useState } from "react";
import { playDemo } from "../demos.js";
import Staff from "./Staff.jsx";

// Mastery-style check: questions come one at a time; a missed question goes
// to the back of the queue and returns until it's answered correctly.
export default function LessonQuiz({ questions, onPassed, optional = false }) {
  const [queue, setQueue] = useState(() => questions.map((_, i) => i));
  const [selected, setSelected] = useState(null);
  const [mastered, setMastered] = useState(0);
  const [played, setPlayed] = useState(false);
  const [passed, setPassed] = useState(false);

  if (passed || queue.length === 0) {
    return (
      <div className="why" style={{ marginTop: 0 }}>
        <strong>Check complete.</strong> You answered everything correctly.
      </div>
    );
  }

  const q = questions[queue[0]];
  const answered = selected !== null;
  const wasRight = answered && selected === q.correct;

  const choose = (i) => {
    if (!answered) setSelected(i);
  };

  const next = () => {
    let newQueue;
    if (wasRight) {
      newQueue = queue.slice(1);
      setMastered(mastered + 1);
    } else {
      newQueue = [...queue.slice(1), queue[0]]; // come back to it later
    }
    setQueue(newQueue);
    setSelected(null);
    setPlayed(false);
    if (newQueue.length === 0) {
      setPassed(true);
      onPassed();
    }
  };

  return (
    <div>
      <div className="quiz-progress">
        {questions.map((_, i) => (
          <span key={i} className={`quiz-dot ${i < mastered ? "filled" : ""}`} />
        ))}
        <span className="quiz-count">{mastered} of {questions.length}</span>
        {optional && <span className="quiz-count">· optional refresher</span>}
      </div>

      <h3 style={{ marginBottom: 12 }}>{q.q}</h3>

      {q.staff && (
        <div style={{ marginBottom: 12 }}>
          <Staff clef={q.staff.clef} notes={q.staff.notes} interactive={false} />
        </div>
      )}

      {q.demo && (
        <button
          className="btn btn-primary btn-block"
          style={{ marginBottom: 4 }}
          onClick={() => { playDemo(q.demo); setPlayed(true); }}
        >
          ▶ &nbsp;{played ? "Hear it again" : "Play the sound"}
        </button>
      )}

      <div className={`options ${q.options.some((o) => o.length > 24) ? "single-col" : ""}`}>
        {q.options.map((opt, i) => {
          let cls = "option";
          if (answered) {
            if (i === q.correct) cls += " correct";
            else if (i === selected) cls += " wrong";
          }
          return (
            <button key={i} className={cls} onClick={() => choose(i)} disabled={answered}>
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <>
          <div className="why" style={{ marginTop: 16 }}>
            <strong>{wasRight ? "Right." : "Not quite."}</strong> {q.why}
            {!wasRight && " This one will come back around."}
          </div>
          <button className="btn btn-ghost btn-block" style={{ marginTop: 12 }} onClick={next}>
            {wasRight && queue.length === 1 ? "Finish check" : "Next"} →
          </button>
        </>
      )}
    </div>
  );
}
