"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  CircleAlert,
  Clock3,
  ExternalLink,
  Flag,
  FileCode2,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { useApp } from "../../../components/app-provider";
import { InteractiveExercise } from "../../../components/interactive-exercise";
import { GuidedPractice } from "../../../components/guided-practice";
import { CheckpointSteps, StatusBadge } from "../../../components/course-panels";
import { contentReadiness, curriculum, curriculumById } from "../../../lib/curriculum";
export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const lesson = curriculumById.get(id);
  const { state, update } = useApp();
  const [exerciseCode, setExerciseCode] = useState("");
  const [archiveMessage, setArchiveMessage] = useState("");
  if (!lesson) return <div className="page-state">Lesson not found.</div>;
  const saved = state.progress[id];
  const note = state.notes.find((n) => n.lessonId === id);
  const index = curriculum.findIndex((l) => l.id === id);
  const toggleCheck = (n: number) =>
    update((s) => ({
      ...s,
      progress: {
        ...s.progress,
        [id]: {
          lessonId: id,
          state: "in-progress",
          startedAt: s.progress[id]?.startedAt || new Date().toISOString(),
          completedAt: null,
          timeSpentMinutes: s.progress[id]?.timeSpentMinutes || 0,
          score: s.progress[id]?.score || null,
          confidence: s.progress[id]?.confidence || null,
          review: s.progress[id]?.review || false,
          checklist: s.progress[id]?.checklist.includes(n)
            ? s.progress[id].checklist.filter((x) => x !== n)
            : [...(s.progress[id]?.checklist || []), n],
        },
      },
    }));
  const complete = async () => {
    update((s) => ({
      ...s,
      progress: {
        ...s.progress,
        [id]: {
          lessonId: id,
          state: "completed",
          startedAt: s.progress[id]?.startedAt || new Date().toISOString(),
          completedAt: new Date().toISOString(),
          timeSpentMinutes: lesson.estimatedMinutes,
          score: s.progress[id]?.score || null,
          confidence: s.progress[id]?.confidence || 3,
          review: s.progress[id]?.review || false,
          checklist: lesson.completionChecklist.map((_, i) => i),
        },
      },
      studySessions: [
        ...s.studySessions,
        {
          id: crypto.randomUUID(),
          lessonId: id,
          minutes: lesson.estimatedMinutes,
          date: new Date().toISOString(),
        },
      ],
    }));
    try {
      const response = await fetch("/api/archive", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          lessonId: id,
          studentCode: exerciseCode,
          studentNotes: note?.text || "",
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Archive failed");
      setArchiveMessage(`Saved to lesson-archives/${result.filename}`);
    } catch (error) {
      setArchiveMessage(
        error instanceof Error
          ? error.message
          : "Could not save lesson archive",
      );
    }
  };
  return (
    <div className="page lesson-page">
      <div className="lesson-top">
        <Link href="/curriculum">
          <ArrowLeft size={16} /> Curriculum
        </Link>
        <div>
          <span>
            Week {lesson.week} · Day {lesson.day}
          </span>
          <span>{lesson.track}</span>
          <span>{lesson.difficulty}</span>
          <span>
            <Clock3 size={14} />
            {lesson.estimatedMinutes} min
          </span>
        </div>
      </div>
      <header className="lesson-header">
        <p className="eyebrow">{lesson.phase}</p>
        <h1>{lesson.title}</h1>
        <p>{lesson.summary}</p>
        <p className="content-readiness">Course content: <strong>{contentReadiness(lesson)}</strong></p>
        <div className="header-actions">
          <button
            className="button secondary"
            onClick={() =>
              update((s) => ({
                ...s,
                progress: {
                  ...s.progress,
                  [id]: {
                    lessonId: id,
                    state: s.progress[id]?.state || "available",
                    startedAt: s.progress[id]?.startedAt || null,
                    completedAt: s.progress[id]?.completedAt || null,
                    timeSpentMinutes: s.progress[id]?.timeSpentMinutes || 0,
                    score: s.progress[id]?.score || null,
                    confidence: s.progress[id]?.confidence || null,
                    checklist: s.progress[id]?.checklist || [],
                    review: !s.progress[id]?.review,
                  },
                },
              }))
            }
          >
            <Flag size={16} />
            {saved?.review ? "Remove from review" : "Mark for review"}
          </button>
        </div>
      </header>
      {lesson.checkpoint && (
        <section id="current-checkpoint" className="panel current-panel checkpoint-anchor">
          <div className="section-heading"><div><p className="kicker">Resume from stored checkpoint</p><h2>{lesson.checkpoint.current}</h2></div><StatusBadge status="IN PROGRESS"/></div>
          <CheckpointSteps lesson={lesson}/>
        </section>
      )}
      <LessonKit lesson={lesson} />
      <div className="lesson-layout">
        <article className="lesson-content">
          <section className="lesson-overview" aria-labelledby="overview-title">
            <p className="kicker">Start here · No exercise yet</p>
            <h2 id="overview-title">Lesson overview</h2>
            <p>{lesson.lessonOverview.introduction}</p>
            <h3>Concepts you will learn</h3>
            <dl className="overview-concepts">
              {lesson.lessonOverview.concepts.map((concept) => (
                <div key={concept.name}>
                  <dt>{concept.name}</dt>
                  <dd>{concept.explanation}</dd>
                </div>
              ))}
            </dl>
          </section>
          <LessonSection title="What you will be able to do">
            <ul>
              {lesson.learningObjectives.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </LessonSection>
          <section
            className="realistic-example"
            aria-labelledby="example-title"
          >
            <p className="kicker">Step 1 · See the objective in action</p>
            <h2 id="example-title">
              Realistic example: {lesson.guidedExamples[0].title}
            </h2>
            <p>{lesson.lab.objective}</p>
            <p>{lesson.guidedExamples[0].explanation}</p>
            <pre>
              <code>{lesson.guidedExamples[0].code}</code>
            </pre>
          </section>
          <div className="explanation-marker">
            <p className="kicker">Step 2 · Learn the notion</p>
            <h2>Understand the notion</h2>
            <p>
              Connect the practical problem to the idea that solves it before
              writing your own implementation.
            </p>
          </div>
          <section
            className="notion-explanation"
            aria-label="Concept explanation"
          >
            {lesson.notionExplanation.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <GuidedPractice lesson={lesson} />
          <details className="lesson-reference">
            <summary>Vocabulary and official references</summary>
            <div className="reference-content">
              <LessonSection title="Key vocabulary">
                <dl className="vocab">
                  {lesson.keyVocabulary.map((v) => (
                    <div key={v.term}>
                      <dt>{v.term}</dt>
                      <dd>{v.definition}</dd>
                    </div>
                  ))}
                </dl>
              </LessonSection>
              <LessonSection title="Official reading">
                <div className="resources">
                  {lesson.officialResources.map((r) => (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={r.url}
                      key={r.url}
                    >
                      <span>
                        <strong>{r.title}</strong>
                        <small>
                          {r.publisher} · {r.resourceType}
                        </small>
                      </span>
                      <button
                        aria-label={`Bookmark ${r.title}`}
                        onClick={(e) => {
                          e.preventDefault();
                          update((s) => ({
                            ...s,
                            bookmarks: [
                              ...s.bookmarks.filter((b) => b.url !== r.url),
                              { lessonId: id, url: r.url, title: r.title },
                            ],
                          }));
                        }}
                      >
                        <Bookmark size={16} />
                      </button>
                    </a>
                  ))}
                </div>
              </LessonSection>
            </div>
          </details>
          <section className="lab-section">
            <p className="kicker">Step 3 · Build the project</p>
            <h2>{lesson.project.name}</h2>
            <p>{lesson.project.increment}</p>
            <div className="safety-notice">
              <ShieldCheck />
              <div>
                <strong>Safety and scope</strong>
                <p>{lesson.lab.authorizationNotice}</p>
              </div>
            </div>
            <h3>Project objective</h3>
            <p>{lesson.lab.objective}</p>
            <h3>Project coverage</h3>
            <p>
              Your solution must demonstrate every learning objective from this
              lesson:
            </p>
            <ul className="objective-coverage">
              {lesson.learningObjectives.map((objective) => (
                <li key={objective}>
                  <Check size={15} /> {objective}
                </li>
              ))}
            </ul>
            <h3>Project steps</h3>
            <ol>
              {lesson.lab.instructions.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ol>
            <h3>Expected output</h3>
            <pre className="expected-output">
              <code>{lesson.practiceExercises[0].expectedOutput}</code>
            </pre>
            <h3>Deliverable</h3>
            <p>{lesson.deliverable.description}</p>
            <ul>
              {lesson.deliverable.acceptanceCriteria.map((criterion) => (
                <li key={criterion}>{criterion}</li>
              ))}
            </ul>
            <h3>Cleanup</h3>
            <ul>
              {lesson.lab.cleanup.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
          <InteractiveExercise lesson={lesson} onCodeChange={setExerciseCode} />
          <Knowledge
            lesson={lesson}
            savedScore={saved?.score ?? null}
            onScore={(score) =>
              update((s) => ({
                ...s,
                progress: {
                  ...s.progress,
                  [id]: {
                    lessonId: id,
                    state: s.progress[id]?.state || "in-progress",
                    startedAt:
                      s.progress[id]?.startedAt || new Date().toISOString(),
                    completedAt: s.progress[id]?.completedAt || null,
                    timeSpentMinutes: s.progress[id]?.timeSpentMinutes || 0,
                    score,
                    confidence: s.progress[id]?.confidence || null,
                    checklist: s.progress[id]?.checklist || [],
                    review: s.progress[id]?.review || false,
                  },
                },
              }))
            }
          />
          <details className="lesson-reference">
            <summary>Need more help?</summary>
            <div className="reference-content">
              <LessonSection title="Common mistakes & troubleshooting">
                <div className="two-column compact">
                  <div>
                    <h3>Common mistakes</h3>
                    <ul>
                      {lesson.commonMistakes.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3>Troubleshooting</h3>
                    <ul>
                      {lesson.troubleshooting.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </LessonSection>
              <LessonSection title="Defensive relevance">
                <p>{lesson.defensiveConnection}</p>
                <p>
                  <strong>Mitigation and detection:</strong>{" "}
                  {lesson.mitigationNotes}
                </p>
              </LessonSection>
            </div>
          </details>
        </article>
        <aside className="lesson-aside">
          <div className="sticky-card">
            <p className="kicker">Completion</p>
            <h2>Prove your progress</h2>
            {lesson.completionChecklist.map((x, i) => (
              <label className="check-row" key={x}>
                <input
                  type="checkbox"
                  checked={saved?.checklist.includes(i) || false}
                  onChange={() => toggleCheck(i)}
                />
                <span>
                  <Check size={14} />
                </span>
                {x}
              </label>
            ))}
            <label className="confidence">
              Confidence{" "}
              <select
                value={saved?.confidence || 3}
                onChange={(e) =>
                  update((s) => ({
                    ...s,
                    progress: {
                      ...s.progress,
                      [id]: {
                        lessonId: id,
                        state: s.progress[id]?.state || "in-progress",
                        startedAt:
                          s.progress[id]?.startedAt || new Date().toISOString(),
                        completedAt: s.progress[id]?.completedAt || null,
                        timeSpentMinutes: s.progress[id]?.timeSpentMinutes || 0,
                        score: s.progress[id]?.score || null,
                        confidence: Number(e.target.value),
                        checklist: s.progress[id]?.checklist || [],
                        review: s.progress[id]?.review || false,
                      },
                    },
                  }))
                }
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} / 5
                  </option>
                ))}
              </select>
            </label>
            <button className="button primary full" onClick={complete}>
              {saved?.state === "completed"
                ? "Completed — update"
                : "Mark lesson complete"}
            </button>
            {archiveMessage && (
              <p className="archive-message">{archiveMessage}</p>
            )}
          </div>
          <div className="sticky-card">
            <p className="kicker">Student notes</p>
            <textarea
              aria-label="Lesson notes"
              defaultValue={note?.text || ""}
              placeholder="Explain the concept in your own words…"
              onBlur={(e) => {
                const text = e.target.value;
                update((s) => ({
                  ...s,
                  notes: [
                    ...s.notes.filter((n) => n.lessonId !== id),
                    {
                      id: note?.id || crypto.randomUUID(),
                      lessonId: id,
                      text,
                      confusing: note?.confusing || false,
                      updatedAt: new Date().toISOString(),
                    },
                  ],
                }));
              }}
            />
            <label className="confusing">
              <input
                type="checkbox"
                checked={note?.confusing || false}
                onChange={(e) =>
                  update((s) => ({
                    ...s,
                    notes: [
                      ...s.notes.filter((n) => n.lessonId !== id),
                      {
                        id: note?.id || crypto.randomUUID(),
                        lessonId: id,
                        text: note?.text || "",
                        confusing: e.target.checked,
                        updatedAt: new Date().toISOString(),
                      },
                    ],
                  }))
                }
              />
              <CircleAlert size={15} /> This concept is confusing
            </label>
          </div>
        </aside>
      </div>
      <nav className="lesson-nav">
        {index > 0 ? (
          <Link href={`/lessons/${curriculum[index - 1].id}`}>
            <ArrowLeft /> Previous
          </Link>
        ) : (
          <span />
        )}
        {index < curriculum.length - 1 && (
          <Link href={`/lessons/${curriculum[index + 1].id}`}>
            Next <ArrowRight />
          </Link>
        )}
      </nav>
    </div>
  );
}

function LessonKit({ lesson }: { lesson: (typeof curriculum)[number] }) {
  const weekPath = `https://github.com/Odilove5/Programing/tree/main/course-lessons/week-${String(lesson.week).padStart(2, "0")}`;
  const files = [
    {
      name: "instructions.md",
      label: "Read first",
      description: "Objective, worked-example workflow, acceptance criteria, and capstone connection.",
      icon: FileText,
    },
    {
      name: "exercise.py",
      label: "Write here",
      description: "An intentionally incomplete student file. Build the implementation yourself.",
      icon: FileCode2,
    },
    {
      name: "solution.py",
      label: "Compare after attempting",
      description: "A separate reference pattern; it is not a substitute for your exercise.",
      icon: FileCode2,
    },
  ];
  return (
    <section className="lesson-kit panel" aria-labelledby="lesson-kit-title">
      <div className="lesson-kit-heading">
        <div>
          <p className="kicker">GitHub lesson format</p>
          <h2 id="lesson-kit-title">A small lesson you can finish and review</h2>
          <p>Use the same three-file workflow as the reference course: read, implement, then compare.</p>
        </div>
        <a className="button secondary" href={weekPath} target="_blank" rel="noreferrer">
          Open week on GitHub <ExternalLink size={15} />
        </a>
      </div>
      <div className="lesson-kit-files">
        {files.map(({ name, label, description, icon: Icon }) => (
          <div className="lesson-kit-file" key={name}>
            <Icon size={17} aria-hidden="true" />
            <div><strong>{name}</strong><span>{label}</span><p>{description}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LessonSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="content-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
function Knowledge({
  lesson,
  savedScore,
  onScore,
}: {
  lesson: (typeof curriculum)[number];
  savedScore: number | null;
  onScore: (n: number) => void;
}) {
  const answers = new Map<string, number>();
  return (
    <section className="content-section">
      <h2>Knowledge check</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const right = lesson.knowledgeCheck.filter(
            (q) => answers.get(q.id) === q.answer,
          ).length;
          onScore(Math.round((right / lesson.knowledgeCheck.length) * 100));
        }}
      >
        {lesson.knowledgeCheck.map((q, i) => (
          <fieldset key={q.id}>
            <legend>
              {i + 1}. {q.prompt}
            </legend>
            {q.options.map((o, n) => (
              <label key={o}>
                <input
                  required
                  name={q.id}
                  type="radio"
                  onChange={() => answers.set(q.id, n)}
                />
                {o}
              </label>
            ))}
          </fieldset>
        ))}
        <button className="button secondary" type="submit">
          Check answers
        </button>
        {savedScore !== null && (
          <strong className="score">Latest score: {savedScore}%</strong>
        )}
      </form>
    </section>
  );
}
