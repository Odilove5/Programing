import { describe, expect, it } from "vitest";
import { canonicalProgressState } from "../lib/canonical-progress";
import { curriculum } from "../lib/curriculum";
import { currentLesson, projects, requiredProgress, skillMastery } from "../lib/course-view";
import { lessonState } from "../lib/progress";

describe("verified progress snapshot",()=>{
  it("preserves weeks 1 and 2 and the range checkpoint",()=>{const state=canonicalProgressState;expect(curriculum.filter(l=>l.required&&l.week<=2).every(l=>lessonState(l,state)==="completed")).toBe(true);expect(currentLesson(state).id).toBe("week-03-day-01");expect(currentLesson(state).checkpoint?.current).toBe("range()");expect(state.progress["week-03-day-01"].state).toBe("in-progress")});
  it("does not infer future completion",()=>{const state=canonicalProgressState;expect(requiredProgress(state)).toEqual({completed:12,remaining:204,total:216});expect(state.progress["week-03-day-02"]).toBeUndefined();expect(projects(state).find(p=>p.name==="Campaign Performance Analyzer")?.status).toBe("NOT STARTED")});
  it("reconciles foundation skill and project evidence",()=>{const state=canonicalProgressState;expect(skillMastery(state,["week-01-day-01"])).not.toBe("NOT INTRODUCED");expect(projects(state).find(p=>p.name==="Scope-Aware Target Validator")?.status).toBe("COMPLETED");expect(projects(state).find(p=>p.name==="Target Classifier")?.status).toBe("IN PROGRESS")});
});
