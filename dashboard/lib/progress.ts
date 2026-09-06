import { z } from "zod";
import type { Lesson } from "./curriculum";

export const lessonStateSchema = z.enum(["locked", "available", "in-progress", "completed", "needs-review"]);
export const lessonProgressSchema = z.object({
  lessonId: z.string(), state: lessonStateSchema, startedAt: z.string().nullable(), completedAt: z.string().nullable(),
  timeSpentMinutes: z.number().nonnegative(), score: z.number().min(0).max(100).nullable(), confidence: z.number().int().min(1).max(5).nullable(),
  checklist: z.array(z.number().int().nonnegative()), review: z.boolean(),
});
export const appStateSchema = z.object({
  version: z.literal(1), profile: z.object({ name: z.string(), startDate: z.string(), dailyTarget: z.union([z.literal(60), z.literal(90), z.literal(120)]), studyDays: z.array(z.number().int().min(0).max(6)), shell: z.enum(["PowerShell", "Bash", "Both"]), theme: z.enum(["dark", "light", "system"]), onboarded: z.boolean() }),
  progress: z.record(z.string(), lessonProgressSchema), notes: z.array(z.object({ id: z.string(), lessonId: z.string(), text: z.string(), confusing: z.boolean(), updatedAt: z.string() })),
  bookmarks: z.array(z.object({ lessonId: z.string(), url: z.string().url(), title: z.string() })),
  studySessions: z.array(z.object({ id: z.string(), lessonId: z.string(), minutes: z.number().positive(), date: z.string() })),
});
export type AppState = z.infer<typeof appStateSchema>;

export const defaultState: AppState = { version: 1, profile: { name: "Local student", startDate: "2026-08-07", dailyTarget: 90, studyDays: [1,2,3,4,5,6], shell: "Both", theme: "dark", onboarded: false }, progress: {}, notes: [], bookmarks: [], studySessions: [] };
export const requiredLessons = (lessons: Lesson[]) => lessons.filter((lesson) => lesson.required);
export function completionPercent(state: AppState, lessons: Lesson[]) { const total = requiredLessons(lessons).length; const done = requiredLessons(lessons).filter((lesson) => state.progress[lesson.id]?.state === "completed").length; return total ? Math.round(done / total * 100) : 0; }
export function lessonState(lesson: Lesson, state: AppState): z.infer<typeof lessonStateSchema> { const saved = state.progress[lesson.id]; if (saved) return saved.state; if (!lesson.required) return "available"; if (lesson.week === 1 && lesson.day === 1) return "available"; const prerequisitesDone = lesson.prerequisiteLessonIds.every((id) => !id.endsWith("day-07") && state.progress[id]?.state === "completed" || id.endsWith("day-07")); return prerequisitesDone ? "available" : "locked"; }
export function lessonForDate(startDate: string, today = new Date()) { const start = new Date(`${startDate}T00:00:00`); const day = Math.floor((new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() - start.getTime()) / 86400000) + 1; return Math.max(1, Math.min(252, day)); }
export function searchLessons(lessons: Lesson[], query: string, filters: { phase?: string; track?: string; status?: string }, state: AppState) { const q = query.trim().toLowerCase(); return lessons.filter((lesson) => (!q || `${lesson.title} ${lesson.summary} ${lesson.tags.join(" ")}`.toLowerCase().includes(q)) && (!filters.phase || lesson.phase === filters.phase) && (!filters.track || lesson.track === filters.track) && (!filters.status || lessonState(lesson, state) === filters.status)); }
export function exportState(state: AppState) { return JSON.stringify(appStateSchema.parse(state), null, 2); }
export function importState(value: string) { return appStateSchema.parse(JSON.parse(value)); }
