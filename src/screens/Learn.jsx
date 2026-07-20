import { useState } from "react";
import { CURRICULUM, getLessonById, getNextLesson, getUnlockedThrough } from "../curriculum.js";
import PlacementTest from "../components/PlacementTest.jsx";
import LessonContent from "../components/LessonContent.jsx";
import LessonList from "../components/LessonList.jsx";
import TopicIndex from "../components/TopicIndex.jsx";

export default function Learn({ progress, onLessonComplete, go }) {
  const [state, setLearnState] = useState(() => {
    if (!progress.completedPlacement) return { view: "placement" };
    if (progress.currentLesson) return { view: "lesson", lessonId: progress.currentLesson };
    return { view: "overview" };
  });
  const [overviewMode, setOverviewMode] = useState("course"); // "course" | "topics"

  const completedLessons = progress.completedLessons || [];
  const startLevel = progress.startLevel || 0;
  const unlockedThrough = progress.freeNavigation
    ? CURRICULUM.length - 1
    : getUnlockedThrough(startLevel, completedLessons);

  const handlePlacementComplete = ({ moduleIndex, freeNavigation, summary }) => {
    setLearnState({ view: "overview" });
    onLessonComplete({
      completedPlacement: true,
      startLevel: moduleIndex,
      freeNavigation: !!freeNavigation,
      placementSummary: summary,
    });
  };

  const handleRetakePlacement = () => setLearnState({ view: "placement" });

  const handleStartLesson = (lessonId) => {
    setLearnState({ view: "lesson", lessonId });
    onLessonComplete({ currentLesson: lessonId });
  };

  const handleLessonComplete = () => {
    const lesson = getLessonById(state.lessonId);
    const completed = completedLessons.includes(state.lessonId)
      ? completedLessons
      : [...completedLessons, state.lessonId];

    if (lesson?.practice) {
      // Lessons that end in ear training hand off straight into the
      // specific Listen game they promised, not the game picker.
      onLessonComplete({ completedLessons: completed, currentLesson: null });
      go("listen", { game: lesson.practice });
      return;
    }

    const next = getNextLesson(state.lessonId);
    onLessonComplete({ completedLessons: completed, currentLesson: next ? next.id : null });
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
        key={state.lessonId}
        lessonId={state.lessonId}
        isCompleted={completedLessons.includes(state.lessonId)}
        onComplete={handleLessonComplete}
        onBack={backToOverview}
      />
    );
  }

  return (
    <div className="fade-in">
      <h1 className="screen-title">Learn Music</h1>
      <p className="screen-sub">From fundamentals through ear training. Finish a section to open the next.</p>

      <div className="seg-control">
        <button
          className={overviewMode === "course" ? "active" : ""}
          onClick={() => setOverviewMode("course")}
        >
          Course
        </button>
        <button
          className={overviewMode === "topics" ? "active" : ""}
          onClick={() => setOverviewMode("topics")}
        >
          Review a topic
        </button>
      </div>

      {overviewMode === "course" ? (
        <LessonList
          startLevel={startLevel}
          completedLessons={completedLessons}
          unlockedThrough={unlockedThrough}
          onSelectLesson={handleStartLesson}
        />
      ) : (
        <TopicIndex
          completedLessons={completedLessons}
          unlockedThrough={unlockedThrough}
          onSelectLesson={handleStartLesson}
        />
      )}

      <button
        className="back-link"
        style={{ display: "block", margin: "18px auto 0", textAlign: "center" }}
        onClick={handleRetakePlacement}
      >
        Retake the placement check →
      </button>
    </div>
  );
}
