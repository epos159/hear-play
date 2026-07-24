// Music education curriculum: from fundamentals to ear training mastery
import { shuffle, shuffleOptions } from "./theory.js";

export const CURRICULUM = [
  {
    id: "rhythm-basics",
    title: "Rhythm and Note Values",
    subtitle: "How long notes last, and how beats group together",
    level: 0,
    lessons: [
      {
        id: "note-values",
        title: "Note Values and Rests",
        description: "Whole, half, quarter, and eighth notes — and musical silence",
        duration: "6 min",
        topics: ["note values", "rhythm", "rests", "beats", "quarter note", "eighth note"],
      },
      {
        id: "time-signatures",
        title: "Time Signatures and Beats",
        description: "What 4/4 and 3/4 mean, and how to feel the beat",
        duration: "7 min",
        topics: ["time signature", "meter", "beat", "measure", "downbeat"],
      },
    ],
  },
  {
    id: "staff-notation",
    title: "Reading Music",
    subtitle: "The staff, clefs, and note names",
    level: 1,
    lessons: [
      {
        id: "staff-basics",
        title: "The Staff and Clefs",
        description: "Learn the 5 lines and spaces, treble and bass clefs",
        duration: "5 min",
        topics: ["staff notation", "treble clef", "bass clef"],
      },
      {
        id: "note-names",
        title: "Finding Notes",
        description: "Identify notes on the staff by name",
        duration: "7 min",
        topics: ["note naming", "staff positions"],
      },
      {
        id: "octaves",
        title: "Octaves and Pitch",
        description: "Understand pitch range and how octaves work",
        duration: "6 min",
        topics: ["octaves", "pitch", "frequency"],
      },
    ],
  },
  {
    id: "scales-modes",
    title: "Scales and Modes",
    subtitle: "Building blocks of melody",
    level: 2,
    lessons: [
      {
        id: "major-scale",
        title: "The Major Scale",
        description: "The most common scale — the do-re-mi pattern",
        duration: "8 min",
        topics: ["major scale", "scale degrees", "intervals"],
      },
      {
        id: "natural-minor",
        title: "The Minor Scale",
        description: "The darker, wistful cousin of major",
        duration: "8 min",
        topics: ["minor scale", "relative minor", "character"],
      },
      {
        id: "scale-degrees",
        title: "Scale Degrees",
        description: "Each note's role in the scale (tonic, dominant, etc.)",
        duration: "10 min",
        topics: ["scale degrees", "tonic", "dominant"],
      },
    ],
  },
  {
    id: "key-signatures",
    title: "Key Signatures",
    subtitle: "Sharps, flats, and the Circle of Fifths",
    level: 3,
    lessons: [
      {
        id: "key-signatures",
        title: "Key Signatures",
        description: "What the sharps and flats at the start of a piece mean",
        duration: "9 min",
        topics: ["key signature", "sharps", "flats", "major keys"],
      },
      {
        id: "circle-of-fifths",
        title: "The Circle of Fifths",
        description: "How all twelve keys relate to each other",
        duration: "10 min",
        topics: ["circle of fifths", "key relationships", "order of sharps and flats"],
      },
    ],
  },
  {
    id: "intervals",
    title: "Intervals",
    subtitle: "Distance between notes",
    level: 4,
    lessons: [
      {
        id: "interval-basics",
        title: "Interval Basics",
        description: "Unison, octaves, and the semitone scale",
        duration: "8 min",
        topics: ["semitones", "octaves", "interval counting"],
      },
      {
        id: "interval-quality",
        title: "Interval Quality",
        description: "Major, minor, perfect, augmented, diminished",
        duration: "10 min",
        topics: ["interval quality", "major/minor", "perfect intervals"],
      },
      {
        id: "interval-ear",
        title: "Hearing Intervals",
        description: "Recognize intervals by ear using song anchors",
        duration: "12 min",
        topics: ["ear training", "interval recognition"],
        practice: "interval",
      },
    ],
  },
  {
    id: "triads",
    title: "Triads and Chord Qualities",
    subtitle: "The emotional building blocks",
    level: 5,
    lessons: [
      {
        id: "triad-basics",
        title: "Triad Construction",
        description: "Major, minor, diminished, and augmented triads",
        duration: "10 min",
        topics: ["triads", "chord construction", "chord types"],
      },
      {
        id: "chord-inversions",
        title: "Chord Inversions",
        description: "Root position, first inversion, second inversion",
        duration: "9 min",
        topics: ["inversions", "voicing", "bass note"],
      },
      {
        id: "chord-ear",
        title: "Chord Feeling Recognition",
        description: "Identify major, minor, sus, and diminished by ear",
        duration: "15 min",
        topics: ["ear training", "chord recognition", "emotion"],
        practice: "emotion",
      },
    ],
  },
  {
    id: "progressions",
    title: "Chord Progressions",
    subtitle: "How chords connect and flow",
    level: 6,
    lessons: [
      {
        id: "diatonic-chords",
        title: "Diatonic Harmony",
        description: "Chords that belong in a key (I, IV, V, vi, etc.)",
        duration: "10 min",
        topics: ["diatonic", "roman numerals", "key harmony"],
      },
      {
        id: "common-progressions",
        title: "Common Progressions",
        description: "I-IV-V, vi-IV-I-V, and other favorites",
        duration: "8 min",
        topics: ["progressions", "voice leading", "common patterns"],
      },
      {
        id: "cadences",
        title: "Musical Punctuation (Cadences)",
        description: "How phrases end — periods and commas",
        duration: "10 min",
        topics: ["cadences", "resolution", "phrasing"],
        practice: "cadence",
      },
    ],
  },
  {
    id: "melody-harmony",
    title: "Melody and Harmony",
    subtitle: "Notes over chords",
    level: 7,
    lessons: [
      {
        id: "melody-construction",
        title: "Building Melodies",
        description: "Contour, phrasing, and musical shape",
        duration: "12 min",
        topics: ["melody", "contour", "phrasing"],
      },
      {
        id: "counterpoint-intro",
        title: "Harmony Basics",
        description: "How melodies interact with chords",
        duration: "10 min",
        topics: ["harmony", "voice leading", "consonance/dissonance"],
      },
    ],
  },
];

export function getLessonById(lessonId) {
  for (const module of CURRICULUM) {
    const lesson = module.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return null;
}

export function getModuleById(moduleId) {
  return CURRICULUM.find((m) => m.id === moduleId);
}

export function getLessonIndex(lessonId) {
  for (let i = 0; i < CURRICULUM.length; i++) {
    for (let j = 0; j < CURRICULUM[i].lessons.length; j++) {
      if (CURRICULUM[i].lessons[j].id === lessonId) {
        return { module: i, lesson: j };
      }
    }
  }
  return null;
}

export function getNextLesson(lessonId) {
  const idx = getLessonIndex(lessonId);
  if (!idx) return null;

  const { module, lesson } = idx;
  const moduleData = CURRICULUM[module];

  if (lesson + 1 < moduleData.lessons.length) {
    return moduleData.lessons[lesson + 1];
  }

  if (module + 1 < CURRICULUM.length) {
    return CURRICULUM[module + 1].lessons[0];
  }

  return null;
}

// Highest module index the learner can open: everything up to the placement
// level, plus each further module earned by completing the one before it.
export function getUnlockedThrough(startLevel, completedLessons) {
  const done = (lesson) => completedLessons.includes(lesson.id);
  let unlocked = startLevel;
  while (
    unlocked < CURRICULUM.length - 1 &&
    CURRICULUM[unlocked].lessons.every(done)
  ) {
    unlocked++;
  }
  return unlocked;
}

// Placement is a map, not a pass/fail test. Questions are grouped into
// sections that mirror the curriculum modules, and every question offers an
// honest "I don't know yet" option alongside the choices — guessing
// shouldn't be able to skip a learner past something they haven't learned,
// and admitting a gap shouldn't feel like failure.
//
// Question shape: { q, staff?, demo?, options, correct, why }
// - staff / demo render the same way lesson quiz questions do.
// - "why" is used for the gentle, encouraging reveal after an answer.
export const PLACEMENT_SECTIONS = [
  {
    id: "rhythm",
    title: "Rhythm and Note Values",
    moduleId: "rhythm-basics",
    questions: [
      {
        q: "Which of these notes lasts the longest?",
        staff: {
          clef: "treble",
          notes: [
            { letter: "G", octave: 4, value: "quarter" },
            { letter: "G", octave: 4, value: "eighth" },
            { letter: "G", octave: 4, value: "whole" },
            { letter: "G", octave: 4, value: "half" },
          ],
        },
        options: ["The first (quarter note)", "The second (eighth note)", "The third (whole note)", "The fourth (half note)"],
        correct: 2,
        why: "The third is a whole note — hollow, no stem — held for four beats, the longest of the four shown.",
      },
      {
        q: "Listen to this rhythm. Is the beat perfectly steady, or is there a gap in it?",
        demo: { kind: "rhythm", tokens: ["quarter", "quarter", "rest-quarter", "quarter"], opts: { accentFirst: true } },
        options: ["Steady — no gaps", "There's a gap — a beat of silence"],
        correct: 1,
        why: "Beat 3 is a rest — silence that still takes up time. Noticing that gap is real rhythmic listening.",
      },
      {
        q: "A rest tells the performer to…",
        options: ["Play softer", "Stay silent", "Play faster", "Repeat the note"],
        correct: 1,
        why: "A rest is musical silence — it still takes up time, just with no sound.",
      },
      {
        q: "How many quarter notes fit inside one whole note?",
        options: ["Two", "Three", "Four", "Eight"],
        correct: 2,
        why: "A whole note is four beats; each quarter note is one beat — so four quarters fill a whole.",
      },
      {
        q: "Listen. Is this moving in quarter notes or eighth notes?",
        demo: {
          kind: "rhythm",
          tokens: ["eighth", "eighth", "eighth", "eighth", "eighth", "eighth", "eighth", "eighth"],
          opts: { accentFirst: true },
        },
        options: ["Quarter notes — a walking pace", "Eighth notes — twice as fast", "Half notes — slow", "Whole notes — very slow"],
        correct: 1,
        why: "Eighth notes move twice as quickly as quarter notes — that lighter, faster click is what you heard.",
      },
    ],
  },
  {
    id: "staff",
    title: "Reading the Staff",
    moduleId: "staff-notation",
    questions: [
      {
        q: "What note is this?",
        staff: { clef: "treble", notes: [{ letter: "G", octave: 4 }] },
        options: ["C", "G", "E", "B"],
        correct: 1,
        why: "It sits on the second line, which the treble clef curls around and names G.",
      },
      {
        q: "And this one, on the bass clef?",
        staff: { clef: "bass", notes: [{ letter: "F", octave: 3 }] },
        options: ["F", "A", "C", "D"],
        correct: 0,
        why: "The bass clef's two dots bracket the F line, second from the top.",
      },
      {
        q: "The treble clef is also called the ___ clef.",
        options: ["F", "G", "C", "D"],
        correct: 1,
        why: "Its spiral wraps around the G line — treble and G clef are the same thing.",
      },
      {
        type: "tap-key",
        q: "Tap the piano key that matches this note.",
        staff: { clef: "treble", notes: [{ letter: "E", octave: 4 }] },
        keyboardStart: 60,
        keyboardOctaves: 1,
        correctMidi: 64,
        why: "That's the bottom line of the treble staff — E4, just above middle C.",
      },
      {
        q: "What note sits on one ledger line below the treble staff?",
        staff: { clef: "treble", notes: [{ letter: "C", octave: 4 }] },
        options: ["Low A", "Middle C", "D", "E"],
        correct: 1,
        why: "One ledger line below the treble staff is middle C — the most useful anchor note on the piano.",
      },
    ],
  },
  {
    id: "scales",
    title: "Scales and Keys",
    moduleId: "scales-modes",
    questions: [
      {
        q: "Listen to this scale. How would you describe it?",
        demo: { kind: "sequence", notes: [60, 62, 64, 65, 67, 69, 71, 72], step: 0.28 },
        options: ["Bright and settled", "Dark and wistful", "Floating, unresolved", "Tense, uneasy"],
        correct: 0,
        why: "That's the major scale — the bright, settled sound most melodies are built from.",
      },
      {
        q: "And how about this one?",
        demo: { kind: "sequence", notes: [57, 59, 60, 62, 64, 65, 67, 69], step: 0.28 },
        options: ["Bright and settled", "Dark and wistful", "Floating, unresolved", "Tense, uneasy"],
        correct: 1,
        why: "The minor scale — same shape, but a few notes lowered gives it a wistful color.",
      },
      {
        q: "In the C major scale, which note is \"home\" — the one everything resolves back to?",
        options: ["C", "F", "G", "B"],
        correct: 0,
        why: "That's the tonic — the note the scale is named after and built around.",
      },
      {
        q: "The major-scale step pattern is often remembered as…",
        options: ["All half steps", "Whole–whole–half, then whole–whole–whole–half", "Half–whole–half–whole…", "Five wholes in a row"],
        correct: 1,
        why: "W–W–H–W–W–W–H — that pattern is what makes any major scale sound major, no matter which note you start on.",
      },
    ],
  },
  {
    id: "keys",
    title: "Key Signatures",
    moduleId: "key-signatures",
    questions: [
      {
        q: "How many sharps does the key of G major have?",
        options: ["0", "1", "2", "3"],
        correct: 1,
        why: "G major has one sharp — F♯ — which keeps its scale sounding just like C major's pattern, shifted up.",
      },
      {
        q: "Sharps are added to key signatures in a fixed order. What is it?",
        options: ["F–C–G–D–A–E–B", "B–E–A–D–G–C–F", "C–D–E–F–G–A–B", "A–B–C–D–E–F–G"],
        correct: 0,
        why: "F–C–G–D–A–E–B — the same order the Circle of Fifths adds sharps as you move clockwise.",
      },
      {
        q: "Which key has no sharps or flats at all?",
        options: ["G major", "F major", "C major", "D major"],
        correct: 2,
        why: "C major — every note is a white key with no accidentals, which is why it's the usual starting point.",
      },
      {
        q: "F major's key signature has one flat. Which note is it?",
        options: ["E♭", "B♭", "A♭", "D♭"],
        correct: 1,
        why: "B♭ — flats are always added in the order B–E–A–D–G–C–F, so the first flat is always B♭.",
      },
    ],
  },
  {
    id: "intervals",
    title: "Intervals",
    moduleId: "intervals",
    questions: [
      {
        q: "Two notes, one after another — how big is that leap?",
        demo: { kind: "interval", low: 60, semitones: 7 },
        options: ["A small step", "A medium leap", "A wide, open leap", "A full octave"],
        correct: 2,
        why: "That's a perfect fifth — the same open leap that opens \"Twinkle Twinkle.\"",
      },
      {
        q: "And this leap?",
        demo: { kind: "interval", low: 60, semitones: 12 },
        options: ["A small step", "A medium leap", "A wide, open leap", "A full octave — same note, higher"],
        correct: 3,
        why: "An octave — the same note name, one register up.",
      },
      {
        q: "What's the smallest distance between two notes on the piano?",
        options: ["A step", "A half-step", "A third", "A leap"],
        correct: 1,
        why: "A half-step (semitone) — one key to its very next neighbor, black or white.",
      },
      {
        q: "How far is this leap?",
        demo: { kind: "interval", low: 60, semitones: 4 },
        options: ["A small step", "A medium leap", "A wide, open leap", "A full octave"],
        correct: 1,
        why: "A major third — a medium leap. Think of the first two notes of \"When the Saints Go Marching In.\"",
      },
    ],
  },
  {
    id: "chords",
    title: "Chords",
    moduleId: "triads",
    questions: [
      {
        q: "What kind of feeling does this chord have?",
        demo: { kind: "chord", notes: [60, 64, 67] },
        options: ["Bright and settled", "Tender and wistful", "Floating, unresolved", "Tense, uneasy"],
        correct: 0,
        why: "A major chord — bright and at rest.",
      },
      {
        q: "And this one?",
        demo: { kind: "chord", notes: [57, 60, 64] },
        options: ["Bright and settled", "Tender and wistful", "Floating, unresolved", "Tense, uneasy"],
        correct: 1,
        why: "A minor chord — the lowered middle note softens it into something tender.",
      },
      {
        q: "And this one?",
        demo: { kind: "chord", notes: [59, 62, 65] },
        options: ["Bright and settled", "Tender and wistful", "Floating, unresolved", "Tense, uneasy"],
        correct: 3,
        why: "A diminished chord — everything squeezed close together, uneasy and unresolved.",
      },
      {
        q: "A basic triad is built from how many notes?",
        options: ["Two", "Three", "Four", "Five"],
        correct: 1,
        why: "Tri- means three — root, third, and fifth stacked together.",
      },
    ],
  },
  {
    id: "progressions",
    title: "Progressions and Cadences",
    moduleId: "progressions",
    questions: [
      {
        q: "Does this chord progression feel finished, or still going?",
        demo: { kind: "progression", chords: [[60, 64, 67], [65, 69, 72], [67, 71, 74], [60, 64, 67]] },
        options: ["Finished — it came home", "Still going — it's left hanging"],
        correct: 0,
        why: "It ends back on the home chord — your ear hears the sentence close.",
      },
      {
        q: "And this one?",
        demo: { kind: "progression", chords: [[60, 64, 67], [65, 69, 72], [60, 64, 67], [67, 71, 74]] },
        options: ["Finished — it came home", "Still going — it's left hanging"],
        correct: 1,
        why: "It ends on the away chord — a comma, not a period. Your ear is still waiting.",
      },
      {
        q: "A progression that ends by returning to the home chord is like a sentence ending with a…",
        options: ["Comma", "Question mark", "Period", "Exclamation point"],
        correct: 2,
        why: "A period — the phrase has fully resolved and come to rest.",
      },
      {
        q: "In a major key, the I, IV, and V chords are the ones that…",
        options: ["Sound tense and unstable", "Are the three most \"at home\" major chords in the key", "Only appear in classical music", "Always use black keys"],
        correct: 1,
        why: "I, IV, and V are the primary triads — the backbone of countless songs in any major key.",
      },
    ],
  },
];

// A freshly randomized copy of the placement sections: question order within
// each section and answer-option order within each question both shuffle.
// Section order itself stays fixed (it mirrors the curriculum's teaching
// order), but nothing else is memorizable by position — retaking the check,
// or just remembering "it's always the third option," won't help.
export function buildShuffledPlacementSections() {
  return PLACEMENT_SECTIONS.map((section) => ({
    ...section,
    questions: shuffle(section.questions).map((q) => {
      // Tap-key questions have no options list to shuffle — the keyboard
      // itself is the answer surface.
      if (!q.options) return q;
      const { options, correct } = shuffleOptions(q.options, q.correct);
      return { ...q, options, correct };
    }),
  }));
}

// Result for one section: how many were right vs. flagged as not-yet-known,
// and a status used both for the "know well" / "we'll work on" summary and
// for suggesting where to start.
function summarizeSection(section, outcomes) {
  const total = section.questions.length;
  const correct = outcomes.filter((o) => o === "correct").length;
  const dontKnow = outcomes.filter((o) => o === "dontknow").length;
  // Strict: a section only counts as solid when every question is right.
  // One miss (or "don't know") keeps it on the learning path — placement
  // should never skip you past something you only partly know.
  let status = "new";
  if (total > 0) {
    if (correct === total) status = "know-well";
    else if (correct > 0) status = "developing";
  }
  return {
    id: section.id,
    title: section.title,
    moduleId: section.moduleId,
    moduleIndex: getModuleById(section.moduleId) ? CURRICULUM.indexOf(getModuleById(section.moduleId)) : 0,
    total,
    correct,
    dontKnow,
    status,
  };
}

// outcomesBySection: { [sectionId]: Array<"correct" | "wrong" | "dontknow"> }
// Returns per-section results plus a recommended starting module — the
// earliest section that isn't solidly known, so nothing gets skipped just
// because a later section went well.
export function computePlacementResult(outcomesBySection) {
  const sections = PLACEMENT_SECTIONS.map((section) =>
    summarizeSection(section, outcomesBySection[section.id] || [])
  );

  const knowWell = sections.filter((s) => s.status === "know-well");
  const toLearn = sections.filter((s) => s.status !== "know-well");

  const firstGap = sections.find((s) => s.status !== "know-well");
  const recommendedModuleIndex = firstGap ? firstGap.moduleIndex : sections[sections.length - 1].moduleIndex;

  return { sections, knowWell, toLearn, recommendedModuleIndex };
}
