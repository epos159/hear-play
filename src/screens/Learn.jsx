import { useState } from "react";
import { getLessonById, getNextLesson } from "../curriculum.js";
import PlacementTest from "../components/PlacementTest.jsx";
import LessonContent from "../components/LessonContent.jsx";
import LessonList from "../components/LessonList.jsx";

export default function Learn({ progress, onLessonComplete, go }) {
  const [state, setLearnState] = useState(() => {
    if (!progress.completedPlacement) return { view: "placement" };
    if (progress.currentLesson) return { view: "lesson", lessonId: progress.currentLesson };
    return { view: "overview" };
  });

  const handlePlacementComplete = (level) => {
    setLearnState({ view: "overview" });
    onLessonComplete({ completedPlacement: true, startLevel: level });
  };

  const handleStartLesson = (lessonId) => {
    setLearnState({ view: "lesson", lessonId });
    onLessonComplete({ currentLesson: lessonId });
  };

  const handleLessonComplete = () => {
    const lesson = getLessonById(state.lessonId);
    const completedLessons = progress.completedLessons.includes(state.lessonId)
      ? progress.completedLessons
      : [...progress.completedLessons, state.lessonId];

    if (lesson?.practice) {
      // Lessons that end in ear training hand off to the Listen tab.
      onLessonComplete({ completedLessons, currentLesson: null });
      go("listen");
      return;
    }

    const next = getNextLesson(state.lessonId);
    onLessonComplete({ completedLessons, currentLesson: next ? next.id : null });
    setLearnState(next ? { view: "lesson", lessonId: next.id } : { view: "overview" });
  };

  const backToOverview = () => {
    setLearnState({ view: "overview" });
    onLessonComplete({ currentLesson: null });
  };

  if (state.view === "placement") {
    return <PlacementTest onComplete={handlePlacementComplete} />;
  }

  if (state.view === "lesson") {
    return (
      <LessonContent
        lessonId={state.lessonId}
        onComplete={handleLessonComplete}
        onBack={backToOverview}
      />
    );
  }

  return (
    <LessonList
      startLevel={progress.startLevel || 0}
      completedLessons={progress.completedLessons || []}
      onSelectLesson={handleStartLesson}
    />
  );
}
