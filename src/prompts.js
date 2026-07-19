// Daily improvisation prompts — creativity over correctness.
export const PROMPTS = [
  { word: "Gratitude", guide: "Stay in C major. Play slowly. Let each note ring fully before the next — gratitude is unhurried." },
  { word: "Sunrise", guide: "Start low and quiet. Climb gradually. Let it get brighter — more notes, higher notes — but never rushed." },
  { word: "Hope", guide: "Try C and F chords, back and forth. Hope keeps leaning forward — end phrases on a note that wants to keep going." },
  { word: "Forgiveness", guide: "Begin on A minor. Somewhere in the middle, find your way to C major and stay there a while." },
  { word: "Celebration", guide: "Play louder than feels polite. Repeat a short pattern and let it grow. Wrong notes are confetti." },
  { word: "Longing", guide: "Play a note, then the note just below it, slowly. That small falling step is the oldest sound of longing in music." },
  { word: "Rest", guide: "Use only three notes: C, E, G. Play them in any order, softly, with long silences. Silence is part of the music." },
  { word: "Rain", guide: "Light, repeated single notes high on the keyboard — irregular, like drops. Let a low chord hum underneath." },
  { word: "Courage", guide: "March on one low note, steady as a heartbeat. Then let the right hand step upward, one bold note at a time." },
  { word: "Wonder", guide: "Play a chord you've never played. Listen to it fully. Then find one note that makes it glow." },
  { word: "Home", guide: "Wander anywhere on the keys — then find your way back to C. Notice the moment it feels like arriving." },
  { word: "Prayer", guide: "Keep both hands close together, middle of the keyboard, quiet. Speak in short phrases with pauses between." },
  { word: "Dancing", guide: "Count 1-2-3, 1-2-3. Low note on 1, two light chords on 2 and 3. Sway. You're playing a waltz." },
  { word: "Bells", guide: "Play the same note in different octaves, letting them overlap and ring. Try C — high, low, middle." },
  { word: "A lullaby", guide: "Rock gently between two chords, C and F. Keep everything soft and repeat until it feels like breathing." },
  { word: "Victory", guide: "Big open chords, rising. C — F — G — C. Play each one like a flag being planted." },
  { word: "Missing someone", guide: "A minor, played slowly, one note at a time. Let one high note appear now and then, like a memory." },
  { word: "Morning coffee", guide: "Something light and repetitive in the right hand. Content, unhurried, a little bounce." },
  { word: "The ocean", guide: "Roll a low C chord over and over, swelling louder and softer. Waves don't rush and neither should you." },
  { word: "Patience", guide: "Choose one chord. Play it once per breath, for ten breaths. Notice how it changes as you listen longer." },
  { word: "Joy", guide: "C major, high on the keyboard, quick light notes. Skip around. Joy doesn't walk in straight lines." },
];

export function dailyPrompt() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return PROMPTS[dayOfYear % PROMPTS.length];
}
