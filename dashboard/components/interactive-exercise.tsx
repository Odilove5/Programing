"use client";
import { useMemo, useState } from "react";
import {
  CircleCheck,
  CircleX,
  ChevronRight,
  Lightbulb,
  Play,
  RotateCcw,
  TerminalSquare,
} from "lucide-react";
import type { Lesson } from "../lib/curriculum";

type Language = "python" | "bash" | "powershell";
function languageFor(lesson: Lesson): Language {
  if (lesson.track === "Bash & PowerShell")
    return lesson.title.startsWith("Bash:") ? "bash" : "powershell";
  return "python";
}

export function InteractiveExercise({
  lesson,
  onCodeChange,
}: {
  lesson: Lesson;
  onCodeChange?: (code: string) => void;
}) {
  const language = languageFor(lesson);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("Run your code to see output here.");
  const [running, setRunning] = useState(false);
  const [validation, setValidation] = useState<"passed" | "failed" | null>(
    null,
  );
  const [hintCount, setHintCount] = useState(0);
  const hints = useMemo(
    () =>
      lesson.practiceExercises[0].hints ?? [
        `Start with the smallest requirement: ${lesson.learningObjectives[0]}.`,
        lesson.troubleshooting[0],
        `Use this success test: ${lesson.practiceExercises[0].successCriteria}`,
      ],
    [lesson],
  );
  async function run() {
    setRunning(true);
    setOutput("Running locally…");
    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ language, code }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Interpreter unavailable");
      const normalize = (value: string) => value.replace(/\r\n/g, "\n").trim();
      const passed =
        result.exitCode === 0 &&
        lesson.practiceExercises[0].requiredCodeSnippets.every((snippet) =>
          snippet === "<f-string>"
            ? /f["']/.test(code)
            : code.includes(snippet),
        ) &&
        (lesson.practiceExercises[0].validationMode === "exit-code" ||
          normalize(result.stdout) ===
            normalize(lesson.practiceExercises[0].expectedOutput));
      setValidation(passed ? "passed" : "failed");
      setOutput(
        [
          result.stdout,
          result.stderr,
          result.exitCode !== null ? `[exit code ${result.exitCode}]` : "",
        ]
          .filter(Boolean)
          .join("\n") || "Program finished without output.",
      );
    } catch (error) {
      setValidation("failed");
      setOutput(error instanceof Error ? error.message : "Could not run code.");
    } finally {
      setRunning(false);
    }
  }
  return (
    <section
      className="interactive-exercise"
      aria-labelledby="interactive-title"
    >
      <p className="kicker">Final step · You write the code</p>
      <h2 id="interactive-title">Interactive exercise</h2>
      <p>{lesson.practiceExercises[0].instructions}</p>
      <div className="exercise-workbench">
        <div className="editor-panel">
          <div className="editor-toolbar">
            <span>
              <TerminalSquare size={16} />
              {language}
            </span>
            <button
              onClick={() => {
                setCode("");
                onCodeChange?.("");
                setOutput(
                  "Editor cleared. Write your own solution, then run it.",
                );
                setValidation(null);
              }}
            >
              <RotateCcw size={15} />
              Clear
            </button>
          </div>
          <label className="sr-only" htmlFor={`editor-${lesson.id}`}>
            Code editor
          </label>
          <textarea
            id={`editor-${lesson.id}`}
            spellCheck={false}
            placeholder="Write your solution here…"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              onCodeChange?.(event.target.value);
            }}
          />
          <div className="editor-actions">
            <button className="button primary" disabled={running} onClick={run}>
              <Play size={16} />
              {running ? "Running…" : "Run code"}
            </button>
            <span>Runs locally · 5 second limit</span>
          </div>
        </div>
        <div className="output-panel">
          <div className="output-title">Program output</div>
          <pre aria-live="polite">
            <code>{output}</code>
          </pre>
        </div>
      </div>
      {validation && (
        <div
          className={`validation-result ${validation}`}
          role="status"
          aria-live="polite"
        >
          {validation === "passed" ? (
            <CircleCheck size={20} />
          ) : (
            <CircleX size={20} />
          )}
          <div>
            <strong>
              {validation === "passed"
                ? "Exercise passed"
                : "Not validated yet"}
            </strong>
            <p>
              {validation === "passed"
                ? "Your program completed successfully and matched the expected result."
                : "Compare the output with the expected result and confirm your solution demonstrates every project objective, then try again."}
            </p>
          </div>
        </div>
      )}
      <div className="hint-panel">
        <div>
          <Lightbulb size={18} />
          <strong>Need a hint?</strong>
          <span>Reveal one at a time before checking the example.</span>
        </div>
        {hints.slice(0, hintCount).map((hint, index) => (
          <p key={hint}>
            <span>Hint {index + 1}</span>
            {hint}
          </p>
        ))}
        {hintCount < hints.length && (
          <button
            className="button secondary"
            onClick={() => setHintCount((count) => count + 1)}
          >
            Show hint {hintCount + 1}
            <ChevronRight size={15} />
          </button>
        )}
      </div>
      <p className="exercise-success">
        <strong>Definition of success:</strong>{" "}
        {lesson.practiceExercises[0].successCriteria}
      </p>
      <p className="runner-warning">
        Only run code you wrote or reviewed. The interpreter runs on your
        computer inside the course workspace; network activity remains
        restricted to your authorized local lab.
      </p>
    </section>
  );
}
