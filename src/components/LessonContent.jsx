import { useState } from "react";
import { getLessonById, getLessonIndex } from "../curriculum.js";
import { LESSON_COMPONENTS, LESSON_QUIZZES } from "./lessons/index.js";
import LessonQuiz from "./LessonQuiz.jsx";

const PRACTICE_LABELS = {
  emotion: "chord feeling",
  interval: "interval",
  cadence: "finished-or-not",
};

export default function LessonContent({ lessonId, isCompleted, onComplete, onBack }) {
  const lesson = getLessonById(lessonId);
  const quiz = LESSON_QUIZZES[lessonId];
  // Already-completed lessons are open for review: no need to re-pass the check.
  const [quizPassed, setQuizPassed] = useState(!quiz || isCompleted);

  if (!lesson) return <div>Lesson not found</div>;

  const LessonComponent = LESSON_COMPONENTS[lessonId] || LessonFallback;
  const idx = getLessonIndex(lessonId);

  return (
    <div className="fade-in">
      <button className="back-link" onClick={onBack}>← All lessons</button>

      {idx && (
        <div className="eyebrow" style={{ marginTop: 8 }}>
          Module {idx.module + 1} · Lesson {idx.lesson + 1}
          {isCompleted && " · completed"}
        </div>
      )}

      <h1 className="screen-title">{lesson.title}</h1>
      <p className="screen-sub">{lesson.description}</p>

      <div className="card">
        <LessonComponent lesson={lesson} />
      </div>

      {quiz && (
        <div className="card">
          <div className="eyebrow">Check what you learned</div>
          <LessonQuiz
            questions={quiz}
            optional={isCompleted}
            onPassed={() => setQuizPassed(true)}
          />
        </div>
      )}

      {quizPassed &&
        (lesson.practice ? (
          <div className="card" style={{ textAlign: "center" }}>
            <p style={{ marginTop: 0 }}>Now train your ear on it for real.</p>
            <button className="btn btn-primary" onClick={onComplete}>
              Practice {PRACTICE_LABELS[lesson.practice] || lesson.practice} recognition →
            </button>
          </div>
        ) : (
          <button className="btn btn-primary btn-block" onClick={onComplete}>
            {isCompleted ? "Done reviewing — next lesson" : "Done — next lesson"} →
          </button>
        ))}

      {!quizPassed && quiz && (
        <p style={{ textAlign: "center", opacity: 0.6, fontSize: 14 }}>
          Pass the check above to finish this lesson
        </p>
      )}
    </div>
  );
}

function LessonFallback({ lesson }) {
  return (
    <div>
      <p>{lesson.description}</p>
      <p style={{ opacity: 0.6, marginTop: 20 }}>(Full lesson content coming soon.)</p>
    </div>
  );
}
