"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, Lightbulb } from "lucide-react";
import type { Lesson } from "../lib/curriculum";

export function GuidedPractice({ lesson }: { lesson: Lesson }) {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<"passed" | "retry" | null>(null);
  const [hint, setHint] = useState(0);
  const item = lesson.guidedPractice[step];
  const complete = step === lesson.guidedPractice.length;

  if (complete)
    return (
      <section className="guided-practice completed" aria-live="polite">
        <CheckCircle2 />
        <div>
          <p className="kicker">Guided practice complete</p>
          <h2>You demonstrated the key ideas</h2>
          <p>
            Continue to Step 3 and build the complete project from a blank
            editor.
          </p>
        </div>
      </section>
    );

  function check() {
    const normalized = answer.toLowerCase().replace(/\s+/g, " ");
    const passed = item.requiredIdeas.every((alternatives) =>
      alternatives.some((term) => normalized.includes(term.toLowerCase())),
    );
    setResult(passed ? "passed" : "retry");
  }

  return (
    <section className="guided-practice" aria-labelledby="guided-title">
      <div className="guided-progress">
        <span>Guided practice</span>
        <strong>
          {step + 1} / {lesson.guidedPractice.length}
        </strong>
      </div>
      <p className="kicker">You answer before feedback</p>
      <h2 id="guided-title">{item.title}</h2>
      <p>{item.prompt}</p>
      <label htmlFor={`guided-${lesson.id}`}>
        {item.responseType === "code" ? "Your code" : "Your explanation"}
      </label>
      <textarea
        id={`guided-${lesson.id}`}
        className={item.responseType === "code" ? "code-answer" : ""}
        value={answer}
        onChange={(event) => {
          setAnswer(event.target.value);
          setResult(null);
        }}
        placeholder={
          item.responseType === "code"
            ? "Write only the requested code…"
            : "Explain it in your own words…"
        }
      />
      <div className="guided-actions">
        <button
          className="button primary"
          onClick={check}
          disabled={!answer.trim()}
        >
          Check response
        </button>
        {result === "retry" && hint < item.hints.length && (
          <button
            className="button secondary"
            onClick={() => setHint((value) => value + 1)}
          >
            <Lightbulb size={16} /> Show hint {hint + 1}
          </button>
        )}
      </div>
      {item.hints.slice(0, hint).map((text, index) => (
        <p className="guided-hint" key={text}>
          <strong>Hint {index + 1}:</strong> {text}
        </p>
      ))}
      {result === "retry" && (
        <p className="guided-feedback retry" role="status">
          Not quite yet. Revise your answer or reveal a hint; the solution
          remains yours to write.
        </p>
      )}
      {result === "passed" && (
        <div className="guided-feedback passed" role="status">
          <CheckCircle2 size={18} />
          <p>{item.successFeedback}</p>
          <button
            className="button secondary"
            onClick={() => {
              setStep((value) => value + 1);
              setAnswer("");
              setResult(null);
              setHint(0);
            }}
          >
            Next prompt <ChevronRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
