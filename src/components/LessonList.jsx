import { CURRICULUM } from "../curriculum.js";

export default function LessonList({ startLevel, completedLessons, onSelectLesson }) {
  const done = (lesson) => completedLessons.includes(lesson.id);
  const moduleComplete = (m) => m.lessons.every(done);

  // Everything up to the placement level is open; finishing a module opens the next.
  let unlockedThrough = startLevel;
  while (
    unlockedThrough < CURRICULUM.length - 1 &&
    moduleComplete(CURRICULUM[unlockedThrough])
  ) {
    unlockedThrough++;
  }

  const activeModule = CURRICULUM.findIndex(
    (m, idx) => idx <= unlockedThrough && !moduleComplete(m)
  );

  return (
    <div className="fade-in">
      <h1 className="screen-title">Learn Music</h1>
      <p className="screen-sub">From fundamentals through ear training. Finish a section to open the next.</p>

      {CURRICULUM.map((module, idx) => {
        const isAvailable = idx <= unlockedThrough;
        const isComplete = moduleComplete(module);
        const isTestedOut = idx < startLevel && !isComplete;

        return (
          <div key={module.id}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                marginTop: idx === 0 ? 8 : 28,
                marginBottom: 2,
              }}
            >
              <h2 style={{ margin: 0, flex: 1, fontSize: 21 }}>{module.title}</h2>
              {isComplete && <span className="badge badge-done">✓ Done</span>}
              {!isComplete && idx === activeModule && <span className="badge">Start here</span>}
              {isTestedOut && <span className="badge badge-muted">Tested out — review anytime</span>}
              {!isAvailable && <span className="badge badge-muted">Locked</span>}
            </div>
            <p className="subtle" style={{ margin: "0 0 14px 0" }}>{module.subtitle}</p>

            <div className="lesson-grid">
              {module.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  className={`lesson-card ${done(lesson) ? "done" : ""}`}
                  onClick={() => onSelectLesson(lesson.id)}
                  disabled={!isAvailable}
                >
                  <h3>{done(lesson) ? "✓ " : ""}{lesson.title}</h3>
                  <p className="subtle">{lesson.description}</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <span className="tag">{lesson.duration}</span>
                    {lesson.practice && <span className="tag">+ ear training</span>}
                  </div>
                  {!isAvailable && <div className="lock-icon">🔒</div>}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
