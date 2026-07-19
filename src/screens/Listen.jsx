import { useState } from "react";
import { playChord, playInterval, playProgression } from "../audio.js";
import { CHORD_QUALITIES, buildChord, INTERVALS, CADENCES, randomFrom, shuffle } from "../theory.js";

const GAMES = [
  { id: "emotion", title: "What does it feel like?", sub: "Hear a chord. Name its feeling — the note names come later." },
  { id: "interval", title: "How far did it leap?", sub: "Two notes. Recognize the distance by the song it starts." },
  { id: "cadence", title: "Finished, or still going?", sub: "Musical sentences end with periods too. Hear the difference." },
];

export default function Listen({ onCorrect }) {
  const [game, setGame] = useState(null);

  if (!game) {
    return (
      <div className="fade-in">
        <h1 className="screen-title">Train your ear</h1>
        <p className="screen-sub">Every musician you admire hears it before they play it.</p>
        <div className="game-list">
          {GAMES.map((g) => (
            <button key={g.id} className="card" style={{ textAlign: "left", cursor: "pointer" }} onClick={() => setGame(g.id)}>
              <h2>{g.title}</h2>
              <p className="subtle" style={{ margin: 0 }}>{g.sub}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const back = () => setGame(null);
  if (game === "emotion") return <ChordEmotion back={back} onCorrect={onCorrect} />;
  if (game === "interval") return <IntervalGame back={back} onCorrect={onCorrect} />;
  return <CadenceGame back={back} onCorrect={onCorrect} />;
}

/* ————— Game 1: Chord Emotion ————— */
function newEmotionRound() {
  const quality = randomFrom(Object.keys(CHORD_QUALITIES));
  const root = 54 + Math.floor(Math.random() * 10); // F#3–D#4 region
  return { quality, chord: buildChord(root, quality), answered: null };
}

function ChordEmotion({ back, onCorrect }) {
  const [round, setRound] = useState(newEmotionRound);
  const [played, setPlayed] = useState(false);

  const answer = (q) => {
    if (round.answered) return;
    setRound({ ...round, answered: q });
    if (q === round.quality) onCorrect();
  };

  return (
    <GameFrame back={back} title="What does it feel like?" sub="Press play, close your eyes, and trust your first impression.">
      <button className="btn btn-primary btn-block" onClick={() => { playChord(round.chord); setPlayed(true); }}>
        ▶ &nbsp;{played ? "Hear it again" : "Play the chord"}
      </button>

      <div className="options">
        {Object.entries(CHORD_QUALITIES).map(([q, def]) => {
          let cls = "option";
          if (round.answered) {
            if (q === round.quality) cls += " correct";
            else if (q === round.answered) cls += " wrong";
          }
          return (
            <button key={q} className={cls} onClick={() => answer(q)}>
              {def.feeling.split(" · ")[0]}
              <span className="hint">{def.feeling.split(" · ").slice(1).join(" · ")}</span>
            </button>
          );
        })}
      </div>

      {round.answered && (
        <>
          <div className="why">
            <strong>{CHORD_QUALITIES[round.quality].label} chord.</strong>{" "}
            {CHORD_QUALITIES[round.quality].why}
          </div>
          <NextButton onClick={() => { setRound(newEmotionRound()); setPlayed(false); }} />
        </>
      )}
    </GameFrame>
  );
}

/* ————— Game 2: Interval Recognition ————— */
function newIntervalRound() {
  const target = randomFrom(INTERVALS);
  const others = shuffle(INTERVALS.filter((i) => i !== target)).slice(0, 3);
  return {
    target,
    low: 55 + Math.floor(Math.random() * 8),
    options: shuffle([target, ...others]),
    answered: null,
  };
}

function IntervalGame({ back, onCorrect }) {
  const [round, setRound] = useState(newIntervalRound);
  const [played, setPlayed] = useState(false);

  const answer = (opt) => {
    if (round.answered) return;
    setRound({ ...round, answered: opt });
    if (opt === round.target) onCorrect();
  };

  return (
    <GameFrame back={back} title="How far did it leap?" sub="Every leap has a song that starts with it. Let the song surface.">
      <button className="btn btn-primary btn-block" onClick={() => { playInterval(round.low, round.target.semitones); setPlayed(true); }}>
        ▶ &nbsp;{played ? "Hear it again" : "Play the two notes"}
      </button>

      <div className="options single-col">
        {round.options.map((opt) => {
          let cls = "option";
          if (round.answered) {
            if (opt === round.target) cls += " correct";
            else if (opt === round.answered) cls += " wrong";
          }
          return (
            <button key={opt.semitones} className={cls} onClick={() => answer(opt)}>
              {opt.label}
              <span className="hint">{opt.anchor}</span>
            </button>
          );
        })}
      </div>

      {round.answered && (
        <>
          <div className="why">
            <strong>{round.target.label}.</strong> It sounds {round.target.character}. When you hear this leap in the wild, think of {round.target.anchor}.
          </div>
          <NextButton onClick={() => { setRound(newIntervalRound()); setPlayed(false); }} />
        </>
      )}
    </GameFrame>
  );
}

/* ————— Game 3: Finished or Still Going ————— */
function newCadenceRound() {
  return { cadence: randomFrom(CADENCES), answered: null };
}

function CadenceGame({ back, onCorrect }) {
  const [round, setRound] = useState(newCadenceRound);
  const [played, setPlayed] = useState(false);

  const answer = (finished) => {
    if (round.answered !== null) return;
    setRound({ ...round, answered: finished });
    if (finished === round.cadence.finished) onCorrect();
  };

  return (
    <GameFrame back={back} title="Finished, or still going?" sub="Music speaks in sentences. Some end with a period — some with a comma.">
      <button className="btn btn-primary btn-block" onClick={() => { playProgression(round.cadence.chords); setPlayed(true); }}>
        ▶ &nbsp;{played ? "Hear the phrase again" : "Play the phrase"}
      </button>

      <div className="options">
        {[
          { val: true, label: "Finished", hint: "it came home" },
          { val: false, label: "Still going", hint: "it's left hanging" },
        ].map(({ val, label, hint }) => {
          let cls = "option";
          if (round.answered !== null) {
            if (val === round.cadence.finished) cls += " correct";
            else if (val === round.answered) cls += " wrong";
          }
          return (
            <button key={label} className={cls} onClick={() => answer(val)}>
              {label}
              <span className="hint">{hint}</span>
            </button>
          );
        })}
      </div>

      {round.answered !== null && (
        <>
          <div className="why">
            <strong>{round.cadence.finished ? "Finished." : "Still going."}</strong> {round.cadence.why}
          </div>
          <NextButton onClick={() => { setRound(newCadenceRound()); setPlayed(false); }} />
        </>
      )}
    </GameFrame>
  );
}

/* ————— Shared bits ————— */
function GameFrame({ back, title, sub, children }) {
  return (
    <div className="fade-in">
      <button className="back-link" onClick={back}>← All listening games</button>
      <h1 className="screen-title">{title}</h1>
      <p className="screen-sub">{sub}</p>
      <div className="card">{children}</div>
    </div>
  );
}

function NextButton({ onClick }) {
  return (
    <button className="btn btn-ghost btn-block" style={{ marginTop: 12 }} onClick={onClick}>
      Next one →
    </button>
  );
}
