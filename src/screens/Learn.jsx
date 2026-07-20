import { useState } from "react";
import { CURRICULUM, getPlacementLevel, PLACEMENT_TEST, getLessonById, getNextLesson } from "../curriculum.js";
import PlacementTest from "../components/PlacementTest.jsx";
import LessonContent from "../components/LessonContent.jsx";
import LessonList from "../components/LessonList.jsx";

export default function Learn({ progress, onLessonComplete, go }) {
  const [state, setLearnState] = useState(() => {
    if (!progress.completedPlacement) return { view: "placement" };
    if (progress.currentLesson) return { view: "lesson", lessonId: progress.currentLesson };
    return { view: "overview", startLevel: progress.startLevel || 0 };
  });

  const handlePlacementComplete = (level) => {
    setLearnState({ view: "overview", startLevel: level });
    onLessonComplete({ completedPlacement: true, startLevel: level });
  };

  const handleStartLesson = (lessonId) => {
    setLearnState({ view: "lesson", lessonId });
    onLessonComplete({ currentLesson: lessonId });
  };

  const handleLessonComplete = () => {
    const lesson = getLessonById(state.lessonId);
    if (lesson && lesson.practice) {
      go("listen");
    } else {
      const nextLesson = getNextLesson(state.lessonId);
      if (nextLesson) {
        handleStartLesson(nextLesson.id);
      } else {
        setLearnState({ view: "overview", startLevel: progress.startLevel || 0 });
      }
    }
  };

  const backToOverview = () => {
    setLearnState({ view: "overview", startLevel: progress.startLevel || 0 });
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

  return <LessonList startLevel={state.startLevel} onSelectLesson={handleStartLesson} />;
}
