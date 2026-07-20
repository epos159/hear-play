// Music education curriculum: from fundamentals to ear training mastery

export const CURRICULUM = [
  {
    id: "staff-notation",
    title: "Reading Music",
    subtitle: "The staff, clefs, and note names",
    level: 0,
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
    level: 1,
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
    id: "intervals",
    title: "Intervals",
    subtitle: "Distance between notes",
    level: 2,
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
    level: 3,
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
    level: 4,
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
    level: 5,
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

export const PLACEMENT_TEST = [
  {
    id: "read-treble",
    type: "multiple-choice",
    question: "What note is this?",
    options: ["C", "G", "E", "B"],
    correct: 1,
    difficulty: 0,
  },
  {
    id: "major-scale",
    type: "audio",
    question: "Listen to this run of notes. What is it called?",
    options: ["A major scale", "A minor scale", "A pentatonic scale", "A chromatic scale"],
    correct: 0,
    difficulty: 0,
  },
  {
    id: "interval-4th",
    type: "audio",
    question: "Two notes, one after the other. What interval is that leap?",
    options: ["Major third", "Perfect fourth", "Perfect fifth", "Octave"],
    correct: 1,
    difficulty: 1,
  },
  {
    id: "chord-emotion",
    type: "audio",
    question: "What type of chord do you hear?",
    options: ["Major", "Minor", "Suspended", "Diminished"],
    correct: 0,
    difficulty: 1,
  },
  {
    id: "progression-ending",
    type: "audio",
    question: "Does this chord progression feel finished, or still going?",
    options: ["Finished — it came home", "Still going — it's left hanging"],
    correct: 0,
    difficulty: 2,
  },
  {
    id: "cadence-recognize",
    type: "audio",
    question: "This phrase ends V → I. What is that cadence called?",
    options: ["Authentic", "Plagal", "Deceptive", "Half"],
    correct: 0,
    difficulty: 2,
  },
];

export function getPlacementLevel(correctCount) {
  if (correctCount <= 1) return 0; // Start at staff basics
  if (correctCount <= 2) return 1; // Start at scales
  if (correctCount <= 3) return 2; // Start at intervals
  if (correctCount <= 4) return 3; // Start at chords
  return 4; // Start at progressions
}
