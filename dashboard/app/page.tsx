"use client";
import Link from "next/link";
import { CheckCircle2, Target } from "lucide-react";
import { useApp } from "../components/app-provider";
import { CheckpointSteps, LessonLink, ReadingList, StatusBadge } from "../components/course-panels";
import { ProgressNotice, PageSkeleton } from "../components/progress-states";
import { capstoneMilestones, currentLesson, historyEvents, projects, requiredProgress, skillMastery, skills } from "../lib/course-view";

export default function OverviewPage() {
  const { state, loading, error, stale, retry } = useApp();
  if (loading) return <PageSkeleton label="Loading course overview"/>;
  const lesson = currentLesson(state); const progress = requiredProgress(state); const allProjects = projects(state); const milestones = capstoneMilestones(state);
  const currentMilestone = milestones.find((item) => item.status !== "COMPLETED") ?? milestones.at(-1)!;
  const projectCount = allProjects.filter((project) => project.status === "COMPLETED").length;
  const masteryCount = skills.filter((skill) => ["ASSESSED", "MASTERED"].includes(skillMastery(state, skill.lessons))).length;
  const recent=historyEvents(state).slice(0,3);
  const checkpoint = lesson.checkpoint?.current;
  return <div className="page overview-page">
    {error&&<ProgressNotice message={error} retry={retry}/>}<header className="course-heading"><div><p className="eyebrow">Python + AI Software Engineering</p><h1>{checkpoint ? "Resume at" : "Start with"} <code>{checkpoint ?? lesson.title}</code></h1><p>Week {lesson.week}, Day {lesson.day} · Building toward <strong>Autonomous MarketingOps AI</strong></p>{stale&&<span className="stale-label">Last verified local progress</span>}</div><StatusBadge status={checkpoint ? "IN PROGRESS" : "NOT STARTED"}/></header>
    <section className="position-strip" aria-label="Current course position"><div><small>Phase</small><strong>{lesson.phase}</strong></div><div><small>Module</small><strong>Week {lesson.week}</strong></div><div><small>Lesson</small><strong>{lesson.title}</strong></div><div><small>Checkpoint</small><strong>{lesson.checkpoint?.current ?? "Lesson start"}</strong></div><div><small>Next concept</small><strong>{lesson.checkpoint?.remainingSteps[0] ?? "Next lesson"}</strong></div></section>
    <section className="summary-row" aria-label="Course summary"><Summary label="Lessons complete" value={`${progress.completed} / ${progress.total}`}/><Summary label="Lessons remaining" value={String(progress.remaining)}/><Summary label="Projects complete" value={String(projectCount)}/><Summary label="Skills assessed" value={String(masteryCount)}/><Summary label="Upcoming milestone" value={currentMilestone.name}/></section>
    <div className="overview-grid">
      <section className="panel current-panel"><div className="section-heading"><div><p className="kicker">Current lesson · Week {lesson.week}, Day {lesson.day}</p><h2>{lesson.title}</h2></div><StatusBadge status="IN PROGRESS"/></div><p className="lead">{lesson.learningObjectives[0]}</p><CheckpointSteps lesson={lesson}/><div className="panel-actions"><LessonLink lesson={lesson} label="Continue current lesson"/><Link className="text-link" href="/current">View lesson plan</Link></div></section>
      <aside className="panel next-panel"><p className="kicker">Do this next</p><h2>{checkpoint ? "Continue" : "Start"} <code>{checkpoint ?? lesson.title}</code></h2><p>{checkpoint ? "Continue the stored lesson checkpoint, then move to the next concept." : "Read the lesson overview, predict the example, and open the first exercise."}</p><div className="acceptance"><strong>{checkpoint ? "Up next" : "First steps"}</strong><ul>{(lesson.checkpoint?.remainingSteps.slice(0,3) ?? lesson.learningObjectives.slice(0,3)).map((item) => <li key={item}>{item}</li>)}</ul></div><LessonLink lesson={lesson} label={checkpoint ? "Continue current lesson" : "Start first lesson"}/></aside>
    </div>
    <div className="overview-grid secondary-grid"><section className="panel"><div className="section-heading"><div><p className="kicker">Skill mastery</p><h2>Evidence, not completion</h2></div><Link href="/skills">All skills</Link></div><div className="compact-skills">{skills.slice(0,6).map((skill) => <div key={skill.name}><span>{skill.name}</span><StatusBadge status={skillMastery(state, skill.lessons)}/></div>)}</div></section><section className="panel"><div className="section-heading"><div><p className="kicker">Current reading</p><h2>Required references</h2></div></div><ReadingList lesson={lesson}/></section></div>
    <section className="panel"><div className="section-heading"><div><p className="kicker">Capstone progression</p><h2>From campaign data to controlled autonomy</h2></div><Link href="/capstone">Full roadmap</Link></div><div className="milestone-track">{milestones.map((item, index) => <div className={item === currentMilestone ? "milestone current" : "milestone"} key={item.name}><span>{index + 1}</span><div><strong>{item.name}</strong><StatusBadge status={item.status}/></div></div>)}</div></section>
    <div className="overview-grid secondary-grid"><section className="panel"><div className="section-heading"><h2>Foundation projects</h2><Link className="text-link" href="/projects">All projects</Link></div>{allProjects.slice(0,3).map((project) => <div className="list-row" key={project.name}><Target size={16}/><span><strong>{project.name}</strong><small>{project.milestone}</small></span><StatusBadge status={project.status}/></div>)}</section><section className="panel"><div className="section-heading"><h2>Recent evidence</h2><Link className="text-link" href="/history">Full history</Link></div>{recent.map((item,index) => <div className="list-row" key={`${item.date}-${index}`}><CheckCircle2 size={16}/><span><strong>{item.title}</strong><small>{item.type} · {new Date(item.date).toLocaleDateString()}</small></span></div>)}</section></div>
  </div>;
}
function Summary({label,value}:{label:string;value:string}) { return <div><small>{label}</small><strong>{value}</strong></div> }
