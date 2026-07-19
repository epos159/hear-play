import { useState } from "react";
import { PROMPTS, dailyPrompt } from "../prompts.js";
import { randomFrom } from "../theory.js";

export default function Create({ onExplore }) {
  const [prompt, setPrompt] = useState(dailyPrompt);

  return (
    <div className="fade-in">
      <h1 className="screen-title">Create</h1>
      <p className="screen-sub">
        Improvisation isn't advanced — it's how children learn language. Babble first, grammar later.
      </p>

      <div className="card wood">
        <div className="eyebrow" style={{ color: "var(--ember-soft)" }}>Today, play…</div>
        <div className="prompt-word">“{prompt.word}”</div>
        <p className="subtle" style={{ fontSize: 15 }}>{prompt.guide}</p>
      </div>

      <button
        className="btn btn-ghost btn-block"
        onClick={() => { setPrompt(randomFrom(PROMPTS.filter((p) => p !== prompt))); onExplore(); }}
      >
        Give me a different one
      </button>

      <div className="card">
        <div className="eyebrow">The only three rules</div>
        <p style={{ fontSize: 15 }}>
          <strong>1.</strong> There are no wrong notes — only notes that surprise you.<br />
          <strong>2.</strong> If you play something you like, play it again. That's called composing.<br />
          <strong>3.</strong> Stop while it still feels good.
        </p>
      </div>
    </div>
  );
}
