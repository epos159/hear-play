import { dailyPrompt } from "../prompts.js";

export default function Home({ progress, go }) {
  const prompt = dailyPrompt();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="fade-in">
      <h1 className="screen-title">{greeting}.</h1>
      <p className="screen-sub">Hear it first. The playing will follow.</p>

      {!progress.completedPlacement && (
        <button className="mode-card mode-listen" style={{ background: "linear-gradient(135deg, #66755a, #4a5741)" }} onClick={() => go("learn")}>
          <div className="eyebrow">New here? Start here</div>
          <h2>Learn the fundamentals</h2>
          <p>Six quick questions find your level, then lessons take you from the staff to chords to musical sentences.</p>
        </button>
      )}

      <button className="mode-card mode-listen" onClick={() => go("listen")}>
        <div className="eyebrow">Away from the piano</div>
        <h2>Train your ear</h2>
        <p>A few minutes of listening — chord feelings, intervals, musical sentences. Perfect for a spare moment.</p>
      </button>

      <button className="mode-card mode-play" onClick={() => go("play")}>
        <div className="eyebrow">At the piano</div>
        <h2>Put it under your fingers</h2>
        <p>Chord shapes, accompaniment patterns, and a keyboard to explore — when you're near the keys.</p>
      </button>

      <button className="mode-card mode-listen" onClick={() => go("create")} style={{ background: "linear-gradient(135deg, #6e4f33, #4a3828)" }}>
        <div className="eyebrow">Today's improvisation</div>
        <h2 style={{ fontStyle: "italic" }}>Play “{prompt.word}”</h2>
        <p>No wrong notes. Just you, describing something with sound.</p>
      </button>

      {(progress.listens > 0 || progress.streak > 0) && (
        <div className="card">
          <div className="eyebrow">Your journey</div>
          <div className="stat-row">
            <div className="stat"><b>{progress.streak}</b>day streak</div>
            <div className="stat"><b>{progress.listens}</b>sounds explored</div>
            <div className="stat"><b>{progress.explorations}</b>ideas played</div>
          </div>
        </div>
      )}
    </div>
  );
}
