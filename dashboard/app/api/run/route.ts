import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { z } from "zod";

const requestSchema = z.object({
  language: z.enum(["python", "bash", "powershell"]),
  code: z.string().min(1).max(50_000),
});

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success)
    return Response.json({ error: "Invalid code request" }, { status: 400 });

  const workspace = resolve(process.cwd(), "..", "workspace");
  mkdirSync(workspace, { recursive: true });
  const gitBash = "C:\\Program Files\\Git\\bin\\bash.exe";
  const commands = {
    python: {
      executable: "python",
      args: ["-I", "-c", parsed.data.code],
      input: undefined,
    },
    bash: {
      executable: existsSync(gitBash) ? gitBash : "bash",
      args: ["--noprofile", "--norc", "-s"],
      input: parsed.data.code,
    },
    powershell: {
      executable: "powershell.exe",
      args: ["-NoProfile", "-NonInteractive", "-Command", "-"],
      input: parsed.data.code,
    },
  } as const;

  const selected = commands[parsed.data.language];
  try {
    const result = await runProcess(
      selected.executable,
      [...selected.args],
      selected.input,
      workspace,
    );
    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Interpreter unavailable",
      },
      { status: 503 },
    );
  }
}

function runProcess(
  executable: string,
  args: string[],
  input: string | undefined,
  cwd: string,
) {
  return new Promise<{
    stdout: string;
    stderr: string;
    exitCode: number | null;
    timedOut: boolean;
  }>((resolvePromise, reject) => {
    const child = spawn(executable, args, {
      cwd,
      shell: false,
      windowsHide: true,
      env: { ...process.env, PYTHONIOENCODING: "utf-8" },
    });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    const append = (current: string, chunk: Buffer) =>
      (current + chunk.toString("utf8")).slice(-12_000);
    child.stdout.on("data", (chunk: Buffer) => {
      stdout = append(stdout, chunk);
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderr = append(stderr, chunk);
    });
    child.on("error", reject);
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, 5_000);
    child.on("close", (exitCode) => {
      clearTimeout(timer);
      resolvePromise({
        stdout,
        stderr: timedOut
          ? `${stderr}\nExecution stopped after five seconds.`.trim()
          : stderr,
        exitCode,
        timedOut,
      });
    });
    if (input !== undefined) child.stdin.end(input);
    else child.stdin.end();
  });
}
