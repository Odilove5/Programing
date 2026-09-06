#!/usr/bin/env python3
"""Daily study planner for the Python and AI MarketingOps course."""

from __future__ import annotations

import argparse
import json
import mimetypes
import os
import shutil
import subprocess
import sys
import threading
import webbrowser
from dataclasses import asdict, dataclass
from datetime import date, datetime, timedelta
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urlparse

from course_content import grade_assessment, lesson_content


APP_DIR = Path(__file__).resolve().parent
CURRICULUM_FILE = APP_DIR / "curriculum.json"
DEFAULT_STATE = APP_DIR / ".study-progress.json"
DASHBOARD_DIR = APP_DIR / "dashboard" / "static"
LAB_DIR = APP_DIR / "workspace"


@dataclass(frozen=True)
class Lesson:
    day: int
    week: int
    weekday: int
    date: str
    phase: str
    track: str
    topic: str
    objective: str
    reading: list[dict[str, str]]
    practice: str
    deliverable: str
    minutes: int
    level: str
    module_title: str
    module_description: str
    module_objectives: list[str]
    prerequisites: list[str]
    unit_label: str
    unit_kind: str


def load_json(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def validate_curriculum_sources(curriculum: dict[str, Any]) -> None:
    allowed = set(curriculum["program"]["source_policy"]["allowed_domains"])
    sources = curriculum.get("sources", {})
    if not sources:
        raise ValueError("curriculum must define primary sources")
    for key, source in sources.items():
        host = urlparse(source["url"]).hostname
        if host not in allowed:
            raise ValueError(f"source {key!r} uses unapproved domain {host!r}")
    for rotation in curriculum.get("weekly_rotation", []):
        unknown = set(rotation.get("sources", [])) - set(sources)
        if unknown:
            raise ValueError(f"track {rotation['track']!r} references unknown sources: {sorted(unknown)}")
        if rotation["track"] != "Rest / review" and not rotation.get("sources"):
            raise ValueError(f"track {rotation['track']!r} must cite a primary source")


def save_json(path: Path, value: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(value, indent=2) + "\n", encoding="utf-8")
    temporary.replace(path)


def parse_date(value: str) -> date:
    try:
        return date.fromisoformat(value)
    except ValueError as error:
        raise argparse.ArgumentTypeError("use YYYY-MM-DD") from error


def phase_for_week(curriculum: dict[str, Any], week: int) -> dict[str, Any]:
    return next(p for p in curriculum["phases"] if p["weeks"][0] <= week <= p["weeks"][1])


def make_lesson(curriculum: dict[str, Any], start: date, day_number: int,
                minutes: int) -> Lesson:
    if not 1 <= day_number <= 252:
        raise ValueError("day must be between 1 and 252")

    week = ((day_number - 1) // 7) + 1
    weekday = ((day_number - 1) % 7) + 1
    lesson_date = start + timedelta(days=day_number - 1)
    phase = phase_for_week(curriculum, week)
    rotation = curriculum["weekly_rotation"][weekday - 1]
    if rotation["track"] == "Rest / review":
        topic = "Recovery and retrieval practice"
        objective = "Recall and connect the week's Python, data, quality, policy, and project skills."
        reading: list[dict[str, str]] = []
        practice = "Retrieve five key ideas without notes, then correct gaps inside the platform."
        deliverable = "A weekly summary and next-week question."
    else:
        topics = phase["topics"][rotation["topic_group"]]
        topic = topics[(week - phase["weeks"][0]) % len(topics)]
        objective = rotation["objective"].format(topic=topic)
        reading = [curriculum["sources"][key] for key in rotation["sources"]]
        if rotation["track"] == "Shells":
            if topic.startswith("Bash:"):
                reading = [curriculum["sources"]["bash"]]
            elif topic.startswith("PowerShell:"):
                reading = [curriculum["sources"]["powershell"]]
        practice = rotation["practice"].format(topic=topic)
        deliverable = rotation["deliverable"]

    return Lesson(
        day=day_number,
        week=week,
        weekday=weekday,
        date=lesson_date.isoformat(),
        phase=phase["name"],
        track=rotation["track"],
        topic=topic,
        objective=objective,
        reading=reading,
        practice=practice,
        deliverable=deliverable,
        minutes=minutes if weekday != 7 else 0,
        level="Beginner" if week <= 8 else "Intermediate" if week <= 24 else "Advanced",
        module_title=f"Week {week}: {phase['name']}",
        module_description="A connected week of Python, data, automation, quality, policy, and an integrated MarketingOps build.",
        module_objectives=[f"Explain and implement {topic}", "Apply the concept with safe inputs and useful errors",
                           "Test normal and failure behavior", "Add only the current result to MarketingOps AI"],
        prerequisites=["Complete the previous curriculum day"] if day_number > 1 else ["No prior experience required"],
        unit_label=rotation["track"],
        unit_kind="Review" if weekday == 7 else "Project" if weekday == 6 else "Learn",
    )


def day_for_date(start: date, target: date) -> int:
    return (target - start).days + 1


def print_lesson(lesson: Lesson) -> None:
    print(f"Day {lesson.day} | Week {lesson.week} | {lesson.date}")
    print(f"{lesson.phase} — {lesson.track}")
    print(f"\nTopic: {lesson.topic}\nObjective: {lesson.objective}")
    if lesson.minutes:
        reading_minutes = max(15, lesson.minutes // 3)
        practice_minutes = max(25, lesson.minutes - reading_minutes - 10)
        print(f"\nTimebox: {reading_minutes}m reading, {practice_minutes}m practice, 10m notes/tests")
    if lesson.reading:
        print("\nOfficial material:")
        for source in lesson.reading:
            print(f"  - {source['title']}: {source['url']}")
    print(f"\nPractice: {lesson.practice}")
    print(f"Deliverable: {lesson.deliverable}")
    if lesson.track in {"Security concepts", "Integrated lab"}:
        print("Scope: Use only your local lab or an explicitly authorized training target.")


def ensure_state(path: Path, start: date, minutes: int) -> dict[str, Any]:
    if path.exists():
        state = load_json(path)
        state.setdefault("assessments", {})
        state.setdefault("labs", {})
        state.setdefault("projects", {})
        return state
    state: dict[str, Any] = {
        "start_date": start.isoformat(),
        "minutes_per_day": minutes,
        "completed": {},
        "assessments": {},
        "labs": {},
        "projects": {},
    }
    save_json(path, state)
    return state


def command_today(args: argparse.Namespace, curriculum: dict[str, Any]) -> None:
    state = ensure_state(args.state, args.start, args.minutes)
    start = parse_date(state["start_date"])
    target = args.date or date.today()
    day_number = day_for_date(start, target)
    if day_number < 1:
        print(f"Your plan begins on {start.isoformat()}.")
        return
    if day_number > 252:
        print("The 36-week curriculum is complete. Review your capstone and retrospective.")
        return
    lesson = make_lesson(curriculum, start, day_number, state["minutes_per_day"])
    print_lesson(lesson)
    if str(day_number) in state["completed"]:
        print(f"\nCompleted: {state['completed'][str(day_number)]['completed_at']}")


def command_complete(args: argparse.Namespace, curriculum: dict[str, Any]) -> None:
    state = ensure_state(args.state, args.start, args.minutes)
    start = parse_date(state["start_date"])
    day_number = args.day or day_for_date(start, args.date or date.today())
    lesson = make_lesson(curriculum, start, day_number, state["minutes_per_day"])
    state["completed"][str(day_number)] = {
        "completed_at": datetime.now().astimezone().isoformat(timespec="seconds"),
        "topic": lesson.topic,
        "notes": args.notes or "",
    }
    save_json(args.state, state)
    print(f"Marked day {day_number} complete: {lesson.topic}")


def command_status(args: argparse.Namespace, curriculum: dict[str, Any]) -> None:
    state = ensure_state(args.state, args.start, args.minutes)
    completed = len(state["completed"])
    study_days = 36 * 6
    print(f"Start date: {state['start_date']}")
    print(f"Completed: {completed}/{study_days} study days ({completed / study_days:.1%})")
    if state["completed"]:
        latest = max(int(day) for day in state["completed"])
        print(f"Latest completed curriculum day: {latest}")


def command_plan(args: argparse.Namespace, curriculum: dict[str, Any]) -> None:
    state = ensure_state(args.state, args.start, args.minutes)
    start = parse_date(state["start_date"])
    start_day = args.from_day
    for day_number in range(start_day, min(252, start_day + args.days - 1) + 1):
        lesson = make_lesson(curriculum, start, day_number, state["minutes_per_day"])
        marker = "x" if str(day_number) in state["completed"] else " "
        print(f"[{marker}] Day {day_number:3} {lesson.date} | {lesson.track:<18} | {lesson.topic}")


def dashboard_payload(state: dict[str, Any], curriculum: dict[str, Any]) -> dict[str, Any]:
    start = parse_date(state["start_date"])
    today_number = day_for_date(start, date.today())
    lessons = []
    for day_number in range(1, 253):
        lesson = asdict(make_lesson(curriculum, start, day_number, state["minutes_per_day"]))
        lesson["completed"] = state["completed"].get(str(day_number))
        lesson["assessment_result"] = state.get("assessments", {}).get(str(day_number))
        lesson["lab_result"] = state.get("labs", {}).get(str(day_number))
        lesson["project_result"] = state.get("projects", {}).get(str(day_number))
        content = lesson_content(lesson)
        lesson["course"] = content
        for question in lesson["course"]["assessment"]:
            question.pop("answer", None)
        lessons.append(lesson)
    return {"start_date": state["start_date"], "minutes_per_day": state["minutes_per_day"],
            "program": curriculum.get("program", {}),
            "today_day": max(1, min(252, today_number)),
            "completed_count": len(state["completed"]), "study_day_count": 216,
            "lessons": lessons}


def run_local_code(language: str, code: str) -> dict[str, Any]:
    """Run learner-authored code locally with a short timeout and captured output."""
    if len(code) > 50_000:
        raise ValueError("code is limited to 50,000 characters")
    git_bash = Path(r"C:\Program Files\Git\bin\bash.exe")
    bash_executable = shutil.which("bash") or (str(git_bash) if git_bash.exists() else None)
    commands = {
        "python": [sys.executable, "-I", "-c", code],
        "powershell": ["powershell.exe", "-NoProfile", "-NonInteractive", "-Command", "-"],
    }
    if bash_executable:
        commands["bash"] = [bash_executable, "--noprofile", "--norc", "-s"]
    if language not in commands:
        raise ValueError("supported languages: python, powershell, bash (when installed)")
    LAB_DIR.mkdir(parents=True, exist_ok=True)
    try:
        result = subprocess.run(commands[language], input=code if language in {"powershell", "bash"} else None,
                                cwd=LAB_DIR, text=True, capture_output=True, timeout=5,
                                env={**os.environ, "PYTHONIOENCODING": "utf-8"}, check=False)
        return {"stdout": result.stdout[-12_000:], "stderr": result.stderr[-12_000:],
                "exit_code": result.returncode, "timed_out": False}
    except subprocess.TimeoutExpired as error:
        return {"stdout": (error.stdout or "")[-12_000:], "stderr": "Execution stopped after 5 seconds.",
                "exit_code": None, "timed_out": True}


def safe_workspace_path(relative: str) -> Path:
    candidate = (LAB_DIR / relative).resolve()
    try:
        candidate.relative_to(LAB_DIR.resolve())
    except ValueError as error:
        raise ValueError("file must stay inside the course workspace") from error
    return candidate


def make_dashboard_handler(state_path: Path, curriculum: dict[str, Any],
                           start: date, minutes: int) -> type[BaseHTTPRequestHandler]:
    class DashboardHandler(BaseHTTPRequestHandler):
        def send_json(self, value: Any, status: int = 200) -> None:
            body = json.dumps(value).encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)

        def do_GET(self) -> None:  # noqa: N802
            path = urlparse(self.path).path
            if path == "/api/dashboard":
                self.send_json(dashboard_payload(ensure_state(state_path, start, minutes), curriculum))
                return
            requested = "index.html" if path == "/" else unquote(path.lstrip("/"))
            file_path = (DASHBOARD_DIR / requested).resolve()
            try:
                file_path.relative_to(DASHBOARD_DIR.resolve())
            except ValueError:
                self.send_error(404)
                return
            if not file_path.is_file():
                self.send_error(404)
                return
            body = file_path.read_bytes()
            content_type = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"
            self.send_response(200)
            self.send_header("Content-Type", f"{content_type}; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def do_POST(self) -> None:  # noqa: N802
            try:
                length = int(self.headers.get("Content-Length", "0"))
                if length > 100_000:
                    raise ValueError("request too large")
                value = json.loads(self.rfile.read(length) or b"{}")
                path = urlparse(self.path).path
                if path == "/api/run":
                    self.send_json(run_local_code(str(value.get("language", "")), str(value.get("code", ""))))
                    return
                if path == "/api/workspace/save":
                    file_path = safe_workspace_path(str(value.get("file", "")))
                    file_path.parent.mkdir(parents=True, exist_ok=True)
                    file_path.write_text(str(value.get("content", ""))[:100_000], encoding="utf-8")
                    self.send_json({"saved": True, "file": str(file_path.relative_to(LAB_DIR))})
                    return
                day_number = int(value["day"])
                if not 1 <= day_number <= 252:
                    raise ValueError("day must be between 1 and 252")
                state = ensure_state(state_path, start, minutes)
                lesson = asdict(make_lesson(curriculum, parse_date(state["start_date"]), day_number,
                                            state["minutes_per_day"]))
                if path == "/api/assessment":
                    result = grade_assessment(lesson, [int(answer) for answer in value.get("answers", [])])
                    result["completed_at"] = datetime.now().astimezone().isoformat(timespec="seconds")
                    state["assessments"][str(day_number)] = result
                    save_json(state_path, state)
                    self.send_json({"result": result, "dashboard": dashboard_payload(state, curriculum)})
                    return
                if path in {"/api/lab", "/api/project"}:
                    key = "labs" if path.endswith("lab") else "projects"
                    state[key][str(day_number)] = {"completed_at": datetime.now().astimezone().isoformat(timespec="seconds"),
                                                   "notes": str(value.get("notes", ""))[:2000]}
                    save_json(state_path, state)
                    self.send_json(dashboard_payload(state, curriculum))
                    return
                if path != "/api/complete":
                    self.send_error(404)
                    return
                notes = str(value.get("notes", "")).strip()[:2000]
                lesson_obj = make_lesson(curriculum, parse_date(state["start_date"]), day_number,
                                         state["minutes_per_day"])
                state["completed"][str(day_number)] = {
                    "completed_at": datetime.now().astimezone().isoformat(timespec="seconds"),
                    "topic": lesson_obj.topic, "notes": notes}
                save_json(state_path, state)
                self.send_json(dashboard_payload(state, curriculum))
            except (KeyError, TypeError, ValueError, json.JSONDecodeError) as error:
                self.send_json({"error": str(error)}, 400)

        def do_DELETE(self) -> None:  # noqa: N802
            parts = urlparse(self.path).path.strip("/").split("/")
            if len(parts) != 3 or parts[:2] != ["api", "complete"]:
                self.send_error(404)
                return
            try:
                day_number = int(parts[2])
                if not 1 <= day_number <= 252:
                    raise ValueError("invalid day")
                state = ensure_state(state_path, start, minutes)
                state["completed"].pop(str(day_number), None)
                save_json(state_path, state)
                self.send_json(dashboard_payload(state, curriculum))
            except ValueError as error:
                self.send_json({"error": str(error)}, 400)

        def log_message(self, format: str, *args: Any) -> None:
            return

    return DashboardHandler


def command_dashboard(args: argparse.Namespace, curriculum: dict[str, Any]) -> None:
    ensure_state(args.state, args.start, args.minutes)
    server = ThreadingHTTPServer((args.host, args.port),
                                 make_dashboard_handler(args.state, curriculum, args.start, args.minutes))
    url = f"http://{args.host}:{args.port}"
    print(f"Study dashboard: {url}\nPress Ctrl+C to stop.")
    if not args.no_browser:
        threading.Timer(0.5, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nDashboard stopped.")
    finally:
        server.server_close()


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="36-week Python and AI MarketingOps study coach")
    parser.add_argument("--state", type=Path, default=DEFAULT_STATE, help="progress file path")
    parser.add_argument("--start", type=parse_date, default=date.today(), help="start date (YYYY-MM-DD)")
    parser.add_argument("--minutes", type=int, choices=range(60, 121), default=90, metavar="60-120")
    commands = parser.add_subparsers(dest="command", required=True)

    today = commands.add_parser("today", help="show a lesson")
    today.add_argument("--date", type=parse_date, help="lesson date; defaults to today")

    complete = commands.add_parser("complete", help="mark a lesson complete")
    complete.add_argument("--day", type=int, choices=range(1, 253))
    complete.add_argument("--date", type=parse_date)
    complete.add_argument("--notes", help="short reflection")

    commands.add_parser("status", help="show progress")
    plan = commands.add_parser("plan", help="list upcoming lessons")
    plan.add_argument("--from-day", type=int, choices=range(1, 253), default=1)
    plan.add_argument("--days", type=int, choices=range(1, 253), default=14)
    dashboard = commands.add_parser("dashboard", help="open the progress dashboard")
    dashboard.add_argument("--host", default="127.0.0.1")
    dashboard.add_argument("--port", type=int, default=8765)
    dashboard.add_argument("--no-browser", action="store_true")
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    curriculum = load_json(CURRICULUM_FILE)
    validate_curriculum_sources(curriculum)
    {"today": command_today, "complete": command_complete,
     "status": command_status, "plan": command_plan,
     "dashboard": command_dashboard}[args.command](args, curriculum)


if __name__ == "__main__":
    main()
