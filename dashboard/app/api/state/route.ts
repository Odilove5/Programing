import { env } from "cloudflare:workers";
import { canonicalProgressState } from "../../../lib/canonical-progress";
import { appStateSchema, defaultState } from "../../../lib/progress";

async function database() {
  if (!env.DB) throw new Error("Progress database binding is unavailable");
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS app_state (id INTEGER PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL)").run();
  return env.DB;
}

export async function GET() {
  const db = await database();
  const row = await db.prepare("SELECT value FROM app_state WHERE id = 1").first<{ value: string }>();
  return Response.json(row ? appStateSchema.parse(JSON.parse(row.value)) : canonicalProgressState);
}

export async function PUT(request: Request) {
  const parsed = appStateSchema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: "Invalid progress data", issues: parsed.error.issues }, { status: 400 });
  const db = await database();
  await db.prepare("INSERT INTO app_state (id, value, updated_at) VALUES (1, ?, ?) ON CONFLICT(id) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at").bind(JSON.stringify(parsed.data), new Date().toISOString()).run();
  return Response.json(parsed.data);
}

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (body.confirmation !== "RESET MY PROGRESS") return Response.json({ error: "Confirmation phrase is required" }, { status: 400 });
  const db = await database(); await db.prepare("DELETE FROM app_state WHERE id = 1").run();
  return Response.json(defaultState);
}
