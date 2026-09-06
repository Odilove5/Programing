import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { z } from "zod";
import { curriculumById } from "../../../lib/curriculum";

const requestSchema = z.object({
  lessonId: z.string().regex(/^week-\d{2}-day-\d{2}$/),
  studentCode: z.string().max(50_000).default(""),
  studentNotes: z.string().max(20_000).default(""),
});

function archiveMarkdown(
  lesson: NonNullable<ReturnType<typeof curriculumById.get>>,
  studentCode: string,
  studentNotes: string,
) {
  const solutionLanguage = lesson.track.includes("Python") ? "python" : "shell";
  const cliSessionPath = resolve(
    process.cwd(),
    "..",
    "cli-sessions",
    `${lesson.id}.md`,
  );
  const cliSession = existsSync(cliSessionPath)
    ? readFileSync(cliSessionPath, "utf8").trim()
    : "No guided CLI session has been recorded for this lesson yet.";
  const explicitHeadings = [
    "Technical lesson overview",
    "Learning objectives",
    "Cmdlet explanation",
    "Technical concept explanation",
  ];
  const explicitSections = new Map(
    explicitHeadings.map((heading) => {
      const match = cliSession.match(
        new RegExp(`^## ${heading}\\r?\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, "m"),
      );
      return [heading, match?.[1].trim() ?? ""];
    }),
  );
  const overview =
    explicitSections.get("Technical lesson overview") ||
    lesson.lessonOverview.introduction;
  const objectives =
    explicitSections.get("Learning objectives") ||
    lesson.learningObjectives.map((objective) => `- ${objective}`).join("\n");
  const explanationHeading = explicitSections.get("Cmdlet explanation")
    ? "Cmdlet explanation"
    : "Technical concept explanation";
  const explanation =
    explicitSections.get("Cmdlet explanation") ||
    explicitSections.get("Technical concept explanation") ||
    lesson.conceptSections
      .map((section) => `### ${section.heading}\n\n${section.content}`)
      .join("\n\n");
  const promotedSections = `## Technical lesson overview

${overview}

## Learning objectives

${objectives}

## ${explanationHeading}

${explanation}`;
  const cliExercises = explicitHeadings
    .reduce(
      (content, heading) =>
        content.replace(
          new RegExp(`^## ${heading}\\r?\\n[\\s\\S]*?(?=^## |(?![\\s\\S]))`, "m"),
          "",
        ),
      cliSession,
    )
    .trim();
  return `# CLI Training Archive: ${lesson.title}

Week ${lesson.week}, Day ${lesson.day} · ${lesson.track}

${promotedSections ? `${promotedSections}\n\n` : ""}## CLI course content and completed exercises

${cliExercises || "No guided CLI exercises have been recorded yet."}

## Student solution

\`\`\`${solutionLanguage}
${studentCode || "# No editor code was captured for this archive."}
\`\`\`

## Student notes

${studentNotes.trim() || "No student notes were saved."}

## Completion record

- Lesson completed in the local study platform.
- CLI exercises and final student solution captured.
- Archive regenerated: ${new Date().toISOString()}
`;
}

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success)
    return Response.json(
      { error: "Invalid archive request", issues: parsed.error.issues },
      { status: 400 },
    );
  const lesson = curriculumById.get(parsed.data.lessonId);
  if (!lesson)
    return Response.json({ error: "Lesson not found" }, { status: 404 });
  const directory = resolve(process.cwd(), "..", "lesson-archives");
  mkdirSync(directory, { recursive: true });
  const filename = `${lesson.id}-${lesson.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}.md`;
  const path = join(directory, filename);
  writeFileSync(
    path,
    archiveMarkdown(lesson, parsed.data.studentCode, parsed.data.studentNotes),
    "utf8",
  );
  return Response.json({ filename, path });
}
