import { describe, expect, it } from "vitest";
import { curriculum } from "../lib/curriculum";
import { defaultState, lessonState, type AppState } from "../lib/progress";
import { capstoneMilestones, currentLesson, historyEvents, nextRequiredLesson, projects, requiredProgress, skillMastery } from "../lib/course-view";

function verifiedState(): AppState {
  const completed = curriculum.filter((lesson) => lesson.required && lesson.week <= 2);
  return {
    ...defaultState,
    progress: {
      ...Object.fromEntries(completed.map((lesson, index) => [lesson.id, { lessonId: lesson.id, state: "completed" as const, startedAt: `2026-08-${String(index + 1).padStart(2,"0")}T10:00:00Z`, completedAt: `2026-08-${String(index + 1).padStart(2,"0")}T11:00:00Z`, timeSpentMinutes: 90, score: null, confidence: 3, checklist: [0,1,2,3,4], review: false }])),
      "week-03-day-01": { lessonId: "week-03-day-01", state: "in-progress", startedAt: "2026-08-18T14:50:25Z", completedAt: null, timeSpentMinutes: 0, score: null, confidence: 3, checklist: [], review: false },
    },
  };
}

describe("dashboard views with fictional learner fixtures", () => {
  it("preserves the verified checkpoint without completing future lessons", () => { const state=verifiedState(); expect(curriculum.filter(l=>l.required&&l.week===1).every(l=>lessonState(l,state)==="completed")).toBe(true); expect(curriculum.filter(l=>l.required&&l.week===2).every(l=>lessonState(l,state)==="completed")).toBe(true); expect(currentLesson(state).id).toBe("week-03-day-01"); expect(currentLesson(state).checkpoint?.current).toBe("range()"); expect(state.progress["week-03-day-02"]).toBeUndefined(); });
  it("selects the exact next action after the active lesson", () => { expect(nextRequiredLesson(verifiedState())?.id).toBe("week-03-day-02"); });
  it("keeps optional days out of required progress", () => { const progress=requiredProgress(verifiedState()); expect(progress).toEqual({completed:12,remaining:204,total:216}); });
  it("keeps syllabus order canonical", () => { expect(curriculum.map(l=>l.id)).toEqual([...curriculum].sort((a,b)=>a.week-b.week||a.day-b.day).map(l=>l.id)); });
  it("renders mastery as evidence states rather than percentages", () => { const state=verifiedState(); expect(skillMastery(state,["week-03-day-01"])).toBe("INTRODUCED"); expect(skillMastery(state,["week-01-day-01"])).toBe("PRACTICED"); expect(skillMastery(state,["week-20-day-01"])).toBe("NOT INTRODUCED"); });
  it("derives project status only from stored progress", () => { const view=projects(verifiedState()); expect(view.find(p=>p.name==="Scope-Aware Target Validator")?.status).toBe("COMPLETED"); expect(view.find(p=>p.name==="Target Classifier")?.status).toBe("IN PROGRESS"); expect(view.find(p=>p.name==="Campaign Performance Analyzer")?.status).toBe("NOT STARTED"); });
  it("derives capstone status and current milestone from canonical phases", () => { const milestones=capstoneMilestones(verifiedState()); expect(milestones[0].name).toBe("Campaign Performance Analyzer"); expect(milestones[0].status).toBe("NOT STARTED"); expect(milestones.at(-1)?.name).toBe("Autonomous MarketingOps Agent"); });
  it("surfaces reading and acceptance metadata", () => { const lesson=currentLesson(verifiedState()); expect(lesson.officialResources.length).toBeGreaterThan(0); expect(lesson.practiceExercises[0].successCriteria.length).toBeGreaterThan(20); expect(lesson.defensiveConnection).toContain("MarketingOps AI"); });
  it("builds history from stored timestamps only", () => { const events=historyEvents(verifiedState()); expect(events.some(e=>e.type==="LESSON STARTED"&&e.title.includes("Lists"))).toBe(true); expect(events.every(e=>Boolean(e.date))).toBe(true); });
});
