// Gentle progress tracking in localStorage — celebrates consistency, never judges.
const KEY = "htp-progress-v1";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function loadProgress() {
  try {
    const p = JSON.parse(localStorage.getItem(KEY)) || {};
    return {
      streak: p.streak || 0,
      lastDay: p.lastDay || null,
      listens: p.listens || 0,
      explorations: p.explorations || 0,
      completedPlacement: p.completedPlacement || false,
      startLevel: p.startLevel || 0,
      currentLesson: p.currentLesson || null,
      completedLessons: p.completedLessons || [],
    };
  } catch {
    return {
      streak: 0,
      lastDay: null,
      listens: 0,
      explorations: 0,
      completedPlacement: false,
      startLevel: 0,
      currentLesson: null,
      completedLessons: [],
    };
  }
}

function save(p) {
  localStorage.setItem(KEY, JSON.stringify(p));
  return p;
}

// Call on any meaningful activity; maintains the daily streak.
export function touchDay(p) {
  const today = todayStr();
  if (p.lastDay === today) return p;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const streak = p.lastDay === yesterday ? p.streak + 1 : 1;
  return save({ ...p, streak, lastDay: today });
}

export function recordListen(p) {
  return save(touchDay({ ...p, listens: p.listens + 1 }));
}

export function recordExploration(p) {
  return save(touchDay({ ...p, explorations: p.explorations + 1 }));
}

export function updateLearning(p, updates) {
  return save({ ...p, ...updates });
}
