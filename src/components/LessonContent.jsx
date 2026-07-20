import { getLessonById, getLessonIndex } from "../curriculum.js";
import LessonStaffBasics from "./lessons/StaffBasics.jsx";
import LessonMajorScale from "./lessons/MajorScale.jsx";
import LessonIntervalBasics from "./lessons/IntervalBasics.jsx";
import LessonTriadBasics from "./lessons/TriadBasics.jsx";
import LessonCadences from "./lessons/Cadences.jsx";

const LESSON_COMPONENTS = {
  "staff-basics": LessonStaffBasics,
  "major-scale": LessonMajorScale,
  "interval-basics": LessonIntervalBasics,
  "triad-basics": LessonTriadBasics,
  cadences: LessonCadences,
};

const PRACTICE_LABELS = {
  emotion: "chord feeling",
  interval: "interval",
  cadence: "finished-or-not",
};

export default function LessonContent({ lessonId, onComplete, onBack }) {
  const lesson = getLessonById(lessonId);

  if (!lesson) return <div>Lesson not found</div>;

  const LessonComponent = LESSON_COMPONENTS[lessonId] || LessonFallback;
  const idx = getLessonIndex(lessonId);

  return (
    <div className="fade-in">
      <button className="back-link" onClick={onBack}>← All lessons</button>

      {idx && (
        <div className="eyebrow" style={{ marginTop: 8 }}>
          Module {idx.module + 1} · Lesson {idx.lesson + 1}
        </div>
      )}

      <h1 className="screen-title">{lesson.title}</h1>
      <p className="screen-sub">{lesson.description}</p>

      <div className="card" style={{ marginBottom: 24 }}>
        <LessonComponent lesson={lesson} />
      </div>

      {lesson.practice ? (
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ marginTop: 0 }}>Ready to train your ear on this?</p>
          <button className="btn btn-primary" onClick={onComplete}>
            Practice {PRACTICE_LABELS[lesson.practice] || lesson.practice} recognition →
          </button>
        </div>
      ) : (
        <button className="btn btn-primary btn-block" onClick={onComplete}>
          Done — next lesson →
        </button>
      )}
    </div>
  );
}

function LessonFallback({ lesson }) {
  return (
    <div>
      <p>{lesson.description}</p>
      <p style={{ opacity: 0.6, marginTop: 20 }}>(Full lesson content coming soon — mark it done and keep moving.)</p>
    </div>
  );
}
