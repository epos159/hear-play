import { useState } from "react";
import Home from "./screens/Home.jsx";
import Learn from "./screens/Learn.jsx";
import Listen from "./screens/Listen.jsx";
import Play from "./screens/Play.jsx";
import Create from "./screens/Create.jsx";
import { loadProgress, recordListen, recordExploration, updateLearning } from "./progress.js";

const TABS = [
  { id: "home", label: "Home", glyph: "⌂" },
  { id: "learn", label: "Learn", glyph: "📚" },
  { id: "listen", label: "Listen", glyph: "◠" },
  { id: "play", label: "Play", glyph: "▤" },
  { id: "create", label: "Create", glyph: "✧" },
];

export default function App() {
  const [tab, setTab] = useState("home");
  const [progress, setProgress] = useState(loadProgress);

  const onCorrect = () => setProgress((p) => recordListen(p));
  const onExplore = () => setProgress((p) => recordExploration(p));
  const onLessonComplete = (updates) => setProgress((p) => updateLearning(p, updates));

  return (
    <div className="app">
      <header className="app-header">
        <span className="wordmark">
          Hear <em>then</em> Play
        </span>
        {progress.streak > 1 && <span className="streak">♪ {progress.streak}-day streak</span>}
      </header>

      {tab === "home" && <Home progress={progress} go={setTab} />}
      {tab === "learn" && <Learn progress={progress} onLessonComplete={onLessonComplete} go={setTab} />}
      {tab === "listen" && <Listen onCorrect={onCorrect} />}
      {tab === "play" && <Play onExplore={onExplore} />}
      {tab === "create" && <Create onExplore={onExplore} />}

      <nav className="tabbar">
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => setTab(t.id)}>
            <span className="glyph">{t.glyph}</span>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
