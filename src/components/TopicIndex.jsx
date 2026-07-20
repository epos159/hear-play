import { useState } from "react";
import { CURRICULUM } from "../curriculum.js";

// Searchable concept map: every topic taught, linked to the lesson that
// teaches it, so learners can jump back and review anything in seconds.
export default function TopicIndex({ completedLessons, unlockedThrough, onSelectLesson }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const modules = CURRICULUM.map((module, idx) => {
    const lessons = module.lessons
      .map((lesson) => ({
        ...lesson,
        matchedTopics: q
          ? lesson.topics.filter((t) => t.toLowerCase().includes(q))
          : lesson.topics,
        titleMatch: q ? lesson.title.toLowerCase().includes(q) : true,
      }))
      .filter((l) => l.titleMatch || l.matchedTopics.length > 0);
    return { ...module, idx, lessons };
  }).filter((m) => m.lessons.length > 0);

  return (
    <div>
      <input
        type="search"
        className="topic-search"
        placeholder="Search a concept — “cadence”, “ledger”, “minor”…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {modules.length === 0 && (
        <p className="subtle" style={{ textAlign: "center", padding: "20px 0" }}>
          Nothing matches “{query}” — try a broader word like “chord” or “scale.”
        </p>
      )}

      {modules.map((module) => (
        <div key={module.id} style={{ marginBottom: 18 }}>
          <div className="eyebrow" style={{ marginBottom: 6 }}>{module.title}</div>
          {module.lessons.map((lesson) => {
            const done = completedLessons.includes(lesson.id);
            const available = module.idx <= unlockedThrough;
            return (
              <button
                key={lesson.id}
                className="topic-row"
                onClick={() => available && onSelectLesson(lesson.id)}
                disabled={!available}
              >
                <div className="topic-row-main">
                  <span className="topic-row-title">
                    {done ? "✓ " : ""}{lesson.title}
                    {!available && " 🔒"}
                  </span>
                  <span className="topic-row-topics">
                    {(q ? lesson.matchedTopics : lesson.topics).join(" · ")}
                  </span>
                </div>
                <span className="topic-row-go">{done ? "review →" : available ? "open →" : ""}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
