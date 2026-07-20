// Registry mapping curriculum lesson ids to their content components and
// end-of-lesson knowledge checks.
import StaffBasics, { quiz as staffBasicsQuiz } from "./StaffBasics.jsx";
import FindingNotes, { quiz as findingNotesQuiz } from "./FindingNotes.jsx";
import Octaves, { quiz as octavesQuiz } from "./Octaves.jsx";
import MajorScale, { quiz as majorScaleQuiz } from "./MajorScale.jsx";
import NaturalMinor, { quiz as naturalMinorQuiz } from "./NaturalMinor.jsx";
import ScaleDegrees, { quiz as scaleDegreesQuiz } from "./ScaleDegrees.jsx";
import IntervalBasics, { quiz as intervalBasicsQuiz } from "./IntervalBasics.jsx";
import IntervalQuality, { quiz as intervalQualityQuiz } from "./IntervalQuality.jsx";
import HearingIntervals, { quiz as hearingIntervalsQuiz } from "./HearingIntervals.jsx";
import TriadBasics, { quiz as triadBasicsQuiz } from "./TriadBasics.jsx";
import ChordInversions, { quiz as chordInversionsQuiz } from "./ChordInversions.jsx";
import ChordEar, { quiz as chordEarQuiz } from "./ChordEar.jsx";
import DiatonicChords, { quiz as diatonicChordsQuiz } from "./DiatonicChords.jsx";
import CommonProgressions, { quiz as commonProgressionsQuiz } from "./CommonProgressions.jsx";
import Cadences, { quiz as cadencesQuiz } from "./Cadences.jsx";
import MelodyConstruction, { quiz as melodyConstructionQuiz } from "./MelodyConstruction.jsx";
import HarmonyBasics, { quiz as harmonyBasicsQuiz } from "./HarmonyBasics.jsx";

export const LESSON_COMPONENTS = {
  "staff-basics": StaffBasics,
  "note-names": FindingNotes,
  octaves: Octaves,
  "major-scale": MajorScale,
  "natural-minor": NaturalMinor,
  "scale-degrees": ScaleDegrees,
  "interval-basics": IntervalBasics,
  "interval-quality": IntervalQuality,
  "interval-ear": HearingIntervals,
  "triad-basics": TriadBasics,
  "chord-inversions": ChordInversions,
  "chord-ear": ChordEar,
  "diatonic-chords": DiatonicChords,
  "common-progressions": CommonProgressions,
  cadences: Cadences,
  "melody-construction": MelodyConstruction,
  "counterpoint-intro": HarmonyBasics,
};

export const LESSON_QUIZZES = {
  "staff-basics": staffBasicsQuiz,
  "note-names": findingNotesQuiz,
  octaves: octavesQuiz,
  "major-scale": majorScaleQuiz,
  "natural-minor": naturalMinorQuiz,
  "scale-degrees": scaleDegreesQuiz,
  "interval-basics": intervalBasicsQuiz,
  "interval-quality": intervalQualityQuiz,
  "interval-ear": hearingIntervalsQuiz,
  "triad-basics": triadBasicsQuiz,
  "chord-inversions": chordInversionsQuiz,
  "chord-ear": chordEarQuiz,
  "diatonic-chords": diatonicChordsQuiz,
  "common-progressions": commonProgressionsQuiz,
  cadences: cadencesQuiz,
  "melody-construction": melodyConstructionQuiz,
  "counterpoint-intro": harmonyBasicsQuiz,
};
