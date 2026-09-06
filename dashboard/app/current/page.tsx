"use client";
import { useApp } from "../../components/app-provider";
import { CheckpointSteps, LessonLink, ReadingList, StatusBadge } from "../../components/course-panels";
import { PageSkeleton, ProgressNotice } from "../../components/progress-states";
import { currentLesson } from "../../lib/course-view";
import { contentReadiness } from "../../lib/curriculum";

export default function CurrentLessonPage() {
  const { state, loading, error, stale, retry } = useApp(); if (loading) return <PageSkeleton label="Loading current lesson"/>;
  const lesson = currentLesson(state);
  return <div className="page">{error&&<ProgressNotice message={error} retry={retry}/>}<header className="page-header"><div><p className="eyebrow">Current lesson · Week {lesson.week}, Day {lesson.day}</p><h1>{lesson.title}</h1><p>{lesson.summary}</p><p className="content-readiness">Course content: <strong>{contentReadiness(lesson)}</strong></p>{stale&&<span className="stale-label">Last verified local progress</span>}</div><StatusBadge status="IN PROGRESS"/></header>
    <div className="lesson-dashboard"><main><section id="current-checkpoint" className="panel current-panel"><p className="kicker">Current checkpoint</p><h2><code>{lesson.checkpoint?.current ?? "Lesson start"}</code></h2><CheckpointSteps lesson={lesson}/><LessonLink lesson={lesson} label="Continue current lesson"/></section><details className="panel disclosure" open><summary>Learning objectives and concepts</summary><ul className="plain-list">{lesson.learningObjectives.map((item) => <li key={item}>{item}</li>)}</ul><dl className="overview-concepts">{lesson.lessonOverview.concepts.map((item)=><div key={item.name}><dt>{item.name}</dt><dd>{item.explanation}</dd></div>)}</dl></details><details className="panel disclosure"><summary>Exercise and acceptance criteria</summary><h3>{lesson.practiceExercises[0].title}</h3><p>{lesson.practiceExercises[0].instructions}</p><h3>Tests and acceptance</h3><p>{lesson.practiceExercises[0].successCriteria}</p></details></main><aside><section className="panel"><h2>Required reading</h2><ReadingList lesson={lesson}/></section><section className="panel"><p className="kicker">Capstone connection</p><h2>What this unlocks</h2><p>{lesson.defensiveConnection}</p></section></aside></div>
  </div>;
}
