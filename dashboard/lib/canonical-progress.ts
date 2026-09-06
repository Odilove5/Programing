import type { AppState } from "./progress";

const completed = (lessonId: string, startedAt: string, completedAt: string, confidence = 3, score: number | null = null): AppState["progress"][string] => ({
  lessonId, state: "completed", startedAt, completedAt, timeSpentMinutes: 90,
  score, confidence, checklist: [0, 1, 2, 3, 4], review: false,
});

/**
 * Repository checkpoint used to initialize an empty progress store and to
 * provide an honest last-known state when the progress service is offline.
 * It mirrors the preserved local progress record; it is not inferred from
 * exercise or project files.
 */
export const canonicalProgressState: AppState = {
  version: 1,
  profile: {
    name: "Odilon Nguemou", startDate: "2026-08-07", dailyTarget: 90,
    studyDays: [1, 2, 3, 4, 5, 6], shell: "Both", theme: "dark", onboarded: true,
  },
  progress: {
    "week-01-day-01": { ...completed("week-01-day-01", "2026-08-07T19:47:55.209Z", "2026-08-07T23:16:38.767Z", 3, 100), checklist: [0, 1, 2, 3, 4, 5], review: true },
    "week-01-day-02": completed("week-01-day-02", "2026-08-07T17:20:42.0395243-04:00", "2026-08-07T17:20:42.0395243-04:00"),
    "week-01-day-03": completed("week-01-day-03", "2026-08-07T17:51:45.7026874-04:00", "2026-08-07T19:09:27.0361438-04:00", 4),
    "week-01-day-04": completed("week-01-day-04", "2026-08-07T19:43:53.3783228-04:00", "2026-08-10T08:58:23.6830554-04:00"),
    "week-01-day-05": completed("week-01-day-05", "2026-08-10T09:11:13.3314351-04:00", "2026-08-10T10:25:05.0264855-04:00"),
    "week-01-day-06": completed("week-01-day-06", "2026-08-10T10:26:52.0982830-04:00", "2026-08-10T11:36:14.7732520-04:00"),
    "week-02-day-01": completed("week-02-day-01", "2026-08-10T11:44:46.2966434-04:00", "2026-08-10T15:45:30.3827648-04:00"),
    "week-02-day-02": completed("week-02-day-02", "2026-08-12T10:16:46.5990790-04:00", "2026-08-12T13:16:59.5600090-04:00"),
    "week-02-day-03": completed("week-02-day-03", "2026-08-10T16:09:12.8618554-04:00", "2026-08-10T17:30:21.7400618-04:00"),
    "week-02-day-04": completed("week-02-day-04", "2026-08-12T13:22:26.0632176-04:00", "2026-08-12T14:36:22.3729565-04:00"),
    "week-02-day-05": completed("week-02-day-05", "2026-08-12T15:41:18.7379168-04:00", "2026-08-12T17:31:26.1557382-04:00"),
    "week-02-day-06": completed("week-02-day-06", "2026-08-12T18:09:47.9029706-04:00", "2026-08-17T18:17:47.6369314-04:00"),
    "week-03-day-01": {
      lessonId: "week-03-day-01", state: "completed", startedAt: "2026-08-18T14:50:25.4141678-04:00",
      completedAt: "2026-09-06T18:08:46Z", timeSpentMinutes: 0, score: null, confidence: 3, checklist: [0, 1, 2, 3, 4, 5], review: false,
    },
  },
  notes: [{ id: "5e2aa19a-c770-4a6d-ba33-68d630be725a", lessonId: "week-01-day-01", text: "Variables give a value a useful name.", confusing: false, updatedAt: "2026-08-07T19:47:49.405Z" }],
  bookmarks: [],
  studySessions: [],
};
