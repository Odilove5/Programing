import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const appState = sqliteTable("app_state", {
  id: integer("id").primaryKey(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const lessonProgress = sqliteTable("lesson_progress", { lessonId: text("lesson_id").primaryKey(), state: text("state").notNull(), startedAt: text("started_at"), completedAt: text("completed_at"), timeSpentMinutes: integer("time_spent_minutes").notNull().default(0), score: integer("score"), confidence: integer("confidence"), review: integer("review", { mode: "boolean" }).notNull().default(false) });
export const studentNotes = sqliteTable("student_notes", { id: text("id").primaryKey(), lessonId: text("lesson_id").notNull(), text: text("text").notNull(), confusing: integer("confusing", { mode: "boolean" }).notNull().default(false), updatedAt: text("updated_at").notNull() });
export const bookmarks = sqliteTable("bookmarks", { id: text("id").primaryKey(), lessonId: text("lesson_id").notNull(), url: text("url").notNull(), title: text("title").notNull() });
export const studySessions = sqliteTable("study_sessions", { id: text("id").primaryKey(), lessonId: text("lesson_id").notNull(), minutes: integer("minutes").notNull(), date: text("date").notNull() });
