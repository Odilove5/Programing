import { curriculum, phases, type Lesson } from "./curriculum";
import { lessonState, type AppState } from "./progress";

export const masteryStates = ["NOT INTRODUCED", "INTRODUCED", "PRACTICED", "ASSESSED", "MASTERED"] as const;
export type MasteryState = (typeof masteryStates)[number];

export function currentLesson(state: AppState): Lesson {
  const explicit = curriculum.find((lesson) => state.progress[lesson.id]?.state === "in-progress");
  return explicit ?? curriculum.find((lesson) => lesson.required && lessonState(lesson, state) !== "completed") ?? curriculum[curriculum.length - 1];
}

export function nextRequiredLesson(state: AppState): Lesson | undefined {
  const current = currentLesson(state);
  return curriculum.find((lesson) => lesson.required && lesson.week * 10 + lesson.day > current.week * 10 + current.day && lessonState(lesson, state) !== "completed");
}

export function requiredProgress(state: AppState) {
  const required = curriculum.filter((lesson) => lesson.required);
  const completed = required.filter((lesson) => state.progress[lesson.id]?.state === "completed");
  return { completed: completed.length, remaining: required.length - completed.length, total: required.length };
}

export const skills = [
  { name: "Python Core", lessons: ["week-01-day-01", "week-02-day-01"], projects: ["Target-data normalizer"] },
  { name: "Functions", lessons: ["week-02-day-06", "week-05-day-01"], projects: ["Scope-Aware Target Validator"] },
  { name: "Loops", lessons: ["week-03-day-01"], projects: ["Target Classifier"] },
  { name: "Testing", lessons: ["week-02-day-06", "week-11-day-01"], projects: ["Reliable KPI Engine"] },
  { name: "Git", lessons: ["week-01-day-04", "week-02-day-04", "week-03-day-04"], projects: [] },
  { name: "CSV / JSON", lessons: ["week-05-day-02", "week-05-day-03"], projects: ["Campaign Performance Analyzer"] },
  { name: "HTTP & APIs", lessons: ["week-12-day-01", "week-13-day-01", "week-15-day-06"], projects: ["Marketing Data API Connector"] },
  { name: "FastAPI", lessons: ["week-18-day-01", "week-18-day-06"], projects: ["Persistent MarketingOps Backend"] },
  { name: "Databases", lessons: ["week-17-day-01", "week-17-day-03"], projects: ["SQLite evidence repository"] },
  { name: "Async & orchestration", lessons: ["week-26-day-01", "week-26-day-03"], projects: ["Agent Workflow"] },
  { name: "LLM Integration", lessons: ["week-20-day-01", "week-22-day-03", "week-23-day-06"], projects: ["AI Performance Analyst"] },
  { name: "Tool Calling", lessons: ["week-24-day-01", "week-24-day-03"], projects: ["Read-only marketing tool registry"] },
  { name: "Agent Orchestration", lessons: ["week-25-day-01", "week-27-day-06"], projects: ["Agent Workflow"] },
  { name: "Policy / Approval", lessons: ["week-28-day-01", "week-29-day-03", "week-31-day-06"], projects: ["Policy-Controlled Execution"] },
] as const;

export function skillMastery(state: AppState, lessonIds: readonly string[]): MasteryState {
  const evidence = lessonIds.map((id) => state.progress[id]).filter(Boolean);
  if (!evidence.length) return "NOT INTRODUCED";
  const completed = evidence.filter((item) => item.state === "completed");
  if (!completed.length) return "INTRODUCED";
  if (completed.some((item) => (item.confidence ?? 0) >= 4 && (item.score ?? 0) >= 80)) return "MASTERED";
  if (completed.some((item) => item.score !== null)) return "ASSESSED";
  return "PRACTICED";
}

export type ProjectView = {
  name: string; status: "COMPLETED" | "IN PROGRESS" | "NOT STARTED";
  lessonIds: string[]; path?: string; tests: string[]; milestone: string;
};

const legacyProjects: ProjectView[] = [
  { name: "Target-data Normalizer", status: "NOT STARTED", lessonIds: ["week-01-day-06"], path: "workspace/day6-target-data-normalizer", tests: ["7 recorded cases"], milestone: "Preserved foundation evidence" },
  { name: "Scope-Aware Target Validator", status: "NOT STARTED", lessonIds: ["week-02-day-06"], path: "workspace/week2-day6-scope-validator", tests: ["6 unittest methods", "11 effective cases"], milestone: "Preserved foundation evidence" },
  { name: "Target Classifier", status: "NOT STARTED", lessonIds: ["week-03-day-01"], path: "workspace/week3-day1-loops", tests: ["7 unittest methods"], milestone: "Active loop lesson evidence" },
];

export function projects(state: AppState): ProjectView[] {
  const statusFor = (ids: string[]) => ids.every((id) => state.progress[id]?.state === "completed") ? "COMPLETED" as const : ids.some((id) => state.progress[id]) ? "IN PROGRESS" as const : "NOT STARTED" as const;
  const legacy = legacyProjects.map((project) => ({ ...project, status: statusFor(project.lessonIds) }));
  const milestoneProjects = phases.slice(1).map((phase) => {
    const lessons = curriculum.filter((lesson) => lesson.phaseNumber === phase.number && lesson.day === 6);
    const final = lessons[lessons.length - 1];
    return { name: final.project.name.split(":")[0], status: statusFor([final.id]), lessonIds: lessons.map((lesson) => lesson.id), tests: final.deliverable.acceptanceCriteria, milestone: final.project.milestone };
  });
  return [...legacy, ...milestoneProjects];
}

export function capstoneMilestones(state: AppState) {
  return phases.slice(1).map((phase) => {
    const lessons = curriculum.filter((lesson) => lesson.phaseNumber === phase.number && lesson.required);
    const final = lessons.filter((lesson) => lesson.day === 6).at(-1)!;
    const completed = lessons.filter((lesson) => state.progress[lesson.id]?.state === "completed").length;
    const started = lessons.some((lesson) => state.progress[lesson.id]);
    return { phase, name: final.project.name.split(":")[0], lessonIds: lessons.map((lesson) => lesson.id), deliverable: final.deliverable.description, criteria: final.deliverable.acceptanceCriteria, capability: final.project.milestone, status: completed === lessons.length ? "COMPLETED" : started ? "IN PROGRESS" : "NOT STARTED" };
  });
}

export function historyEvents(state: AppState) {
  const lessonEvents = Object.values(state.progress).flatMap((progress) => {
    const lesson = curriculum.find((item) => item.id === progress.lessonId);
    if (!lesson) return [];
    const events = [];
    if (progress.startedAt) events.push({ date: progress.startedAt, type: "LESSON STARTED", title: lesson.title, detail: lesson.id, source: "Canonical progress record" });
    if (progress.completedAt) events.push({ date: progress.completedAt, type: "LESSON COMPLETED", title: lesson.title, detail: `Confidence ${progress.confidence ?? "not recorded"}/5`, source: "Lesson checkpoint" });
    return events;
  });
  const notes = state.notes.map((note) => ({ date: note.updatedAt, type: "REFLECTION UPDATED", title: curriculum.find((lesson) => lesson.id === note.lessonId)?.title ?? note.lessonId, detail: note.confusing ? "Marked confusing" : "Saved reflection", source: "Student reflection" }));
  return [...lessonEvents, ...notes].sort((a, b) => b.date.localeCompare(a.date));
}
