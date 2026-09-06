import Link from "next/link";
import { ArrowRight, Check, Circle, CircleDot } from "lucide-react";
import type { Lesson } from "../lib/curriculum";

export function StatusBadge({ status }: { status: string }) {
  return <span className={`status-badge status-${status.toLowerCase().replaceAll(" ", "-")}`}>{status}</span>;
}

export function CheckpointSteps({ lesson }: { lesson: Lesson }) {
  if (!lesson.checkpoint) return null;
  return <ol className="checkpoint-list" aria-label="Lesson checkpoint">
    {lesson.checkpoint.completedSteps.map((step) => <li className="done" key={step}><Check size={15}/><span>{step}</span><small>Completed</small></li>)}
    <li className="current" aria-current="step"><CircleDot size={15}/><span>{lesson.checkpoint.current}</span><small>Current</small></li>
    {lesson.checkpoint.remainingSteps.map((step) => <li key={step}><Circle size={14}/><span>{step}</span><small>Not started</small></li>)}
  </ol>;
}

export function ReadingList({ lesson }: { lesson: Lesson }) {
  return <div className="reading-list">
    {lesson.officialResources.length ? lesson.officialResources.map((resource) => <a href={resource.url} target="_blank" rel="noreferrer" key={resource.url}><div><strong>{resource.required ? "Required reading" : "Optional reinforcement"}</strong><span>{resource.title}</span><small>{resource.publisher} · {resource.resourceType}</small></div><ArrowRight size={15}/></a>) : <p className="empty">No external reading assigned. Use the lesson’s retrieval prompt.</p>}
    <div className="why-reading"><strong>Why it matters</strong><p>{lesson.defensiveConnection}</p></div>
  </div>;
}

export function LessonLink({ lesson, label = "Continue lesson" }: { lesson: Lesson; label?: string }) {
  return <Link className="button primary" href={`/lessons/${lesson.id}#current-checkpoint`}>{label}<ArrowRight size={16}/></Link>;
}
