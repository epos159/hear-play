import { useState } from "react";
import { getLessonById, getNextLesson, getLessonIndex, CURRICULUM } from "../curriculum.js";
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

export default function LessonContent({ lessonId, onComplete, onBack }) {
  const [progress, setProgress] = useState({ scrolled: false });
  const lesson = getLessonById(lessonId);

  if (!lesson) return <div>Lesson not found</div>;

  const LessonComponent = LESSON_COMPONENTS[lessonId] || LessonFallback;
  const idx = getLessonIndex(lessonId);
  const moduleNum = idx?.module + 1;
  const lessonNum = idx?.lesson + 1;

  return (
    <div className="fade-in">
      <button className="back-link" onClick={onBack}>← Back to lessons</button>

      <div style={{ marginBottom: 8 }}>
        <span className="eyebrow">
          Module {moduleNum}, Lesson {lessonNum}
        </span>
      </div>

      <h1 className="screen-title">{lesson.title}</h1>
      <p className="screen-sub">{lesson.description}</p>

      <div
        className="card"
        style={{ marginBottom: 24 }}
        onScroll={() => setProgress({ scrolled: true })}
      >
        <LessonComponent lesson={lesson} />
      </div>

      {lesson.practice ? (
        <div
          style={{
            background: "rgba(0,0,0,0.03)",
            padding: 20,
            borderRadius: 8,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, marginBottom: 12 }}>
            Ready to practice what you learned?
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              onComplete();
            }}
          >
            Start {lesson.practice} practice →
          </button>
        </div>
      ) : (
        <button className="btn btn-primary btn-block" onClick={onComplete}>
          Next lesson →
        </button>
      )}
    </div>
  );
}

function LessonFallback({ lesson }) {
  return (
    <div>
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>
      <p style={{ opacity: 0.6, marginTop: 20 }}>
        (Lesson content coming soon)
      </p>
    </div>
  );
}
