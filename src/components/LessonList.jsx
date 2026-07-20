import { CURRICULUM } from "../curriculum.js";

export default function LessonList({ startLevel, onSelectLesson }) {
  return (
    <div className="fade-in">
      <h1 className="screen-title">Learn Music</h1>
      <p className="screen-sub">From fundamentals through ear training mastery.</p>

      {CURRICULUM.map((module, idx) => {
        const isLocked = idx < startLevel;
        const isActive = idx === startLevel;
        const isAvailable = idx <= startLevel;

        return (
          <div key={module.id}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                marginTop: idx === 0 ? 0 : 28,
                marginBottom: 12,
              }}
            >
              <h2 style={{ margin: 0, flex: 1 }}>{module.title}</h2>
              {isActive && <span className="badge">Start here</span>}
              {isLocked && <span className="badge" style={{ opacity: 0.5 }}>Unlock next</span>}
            </div>
            <p style={{ margin: "0 0 16px 0", opacity: 0.7 }}>{module.subtitle}</p>

            <div className="lesson-grid">
              {module.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  className={`lesson-card ${!isAvailable ? "locked" : ""}`}
                  onClick={() => isAvailable && onSelectLesson(lesson.id)}
                  disabled={!isAvailable}
                >
                  <h3>{lesson.title}</h3>
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

      <style>{`
        .lesson-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }

        .lesson-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 16px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }

        .lesson-card:hover:not(:disabled) {
          border-color: currentColor;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .lesson-card:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .lesson-card h3 {
          margin: 0 0 8px 0;
          font-size: 1rem;
        }

        .lesson-card .subtle {
          font-size: 0.9rem;
          margin: 0;
          opacity: 0.8;
        }

        .lock-icon {
          position: absolute;
          bottom: 8px;
          right: 8px;
          font-size: 20px;
          opacity: 0.5;
        }

        .tag {
          display: inline-block;
          background: rgba(0, 0, 0, 0.05);
          padding: 2px 8px;
          border-radius: 3px;
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .badge {
          display: inline-block;
          background: rgba(0, 0, 0, 0.08);
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
