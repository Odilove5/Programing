import { describe, expect, it } from "vitest";
import { curriculum } from "../lib/curriculum";
import { defaultState, lessonState } from "../lib/progress";

describe("clean learner initialization", () => {
  it("starts with no completed lessons", () => {
    expect(defaultState.progress).toEqual({});
    expect(curriculum.filter((lesson) => lesson.required).every((lesson) => lessonState(lesson, defaultState) !== "completed")).toBe(true);
  });
  it("does not infer progress from course files", () => {
    expect(defaultState.notes).toEqual([]);
    expect(defaultState.studySessions).toEqual([]);
    expect(defaultState.profile.onboarded).toBe(false);
  });
});
