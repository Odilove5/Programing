import tempfile
import unittest
import copy
from datetime import date
from pathlib import Path

import study_coach


class StudyCoachTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.curriculum = study_coach.load_json(study_coach.CURRICULUM_FILE)

    def test_first_day(self):
        lesson = study_coach.make_lesson(self.curriculum, date(2026, 1, 5), 1, 90)
        self.assertEqual(lesson.week, 1)
        self.assertEqual(lesson.track, "Python and domain models")
        self.assertEqual(lesson.date, "2026-01-05")

    def test_phase_boundaries_and_final_day(self):
        self.assertEqual(study_coach.make_lesson(self.curriculum, date.today(), 21, 60).phase, "Existing foundations and bridge")
        self.assertEqual(study_coach.make_lesson(self.curriculum, date.today(), 22, 60).phase, "Python for marketing data")
        final = study_coach.make_lesson(self.curriculum, date.today(), 252, 120)
        self.assertEqual(final.week, 36)
        self.assertEqual(final.track, "Rest / review")

    def test_project_driven_weekly_rotation(self):
        tracks = [study_coach.make_lesson(self.curriculum, date.today(), day, 90).track
                  for day in range(1, 8)]
        self.assertEqual(tracks, ["Python and domain models", "Data and interfaces", "Reliable automation", "Git and quality",
                                  "Policy and reliability", "Integrated project", "Rest / review"])

    def test_bridge_and_capstone_topics(self):
        bridge = study_coach.make_lesson(self.curriculum, date.today(), 22, 90)
        capstone = study_coach.make_lesson(self.curriculum, date.today(), 239, 90)
        self.assertIn("campaign", bridge.topic.lower())
        self.assertIn("outcome", capstone.topic.lower())

    def test_primary_source_policy_accepts_curriculum(self):
        study_coach.validate_curriculum_sources(self.curriculum)

    def test_primary_source_policy_rejects_other_domains(self):
        curriculum = copy.deepcopy(self.curriculum)
        curriculum["sources"]["unapproved"] = {"title": "Other", "url": "https://example.com/course"}
        with self.assertRaises(ValueError):
            study_coach.validate_curriculum_sources(curriculum)

    def test_state_round_trip(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "state.json"
            state = study_coach.ensure_state(path, date(2026, 1, 1), 75)
            self.assertEqual(state["minutes_per_day"], 75)
            self.assertTrue(path.exists())

    def test_dashboard_payload_contains_full_plan(self):
        state = {"start_date": "2026-08-06", "minutes_per_day": 90, "completed": {},
                 "assessments": {}, "labs": {}, "projects": {}}
        payload = study_coach.dashboard_payload(state, self.curriculum)
        self.assertEqual(len(payload["lessons"]), 252)
        self.assertEqual(payload["study_day_count"], 216)
        self.assertFalse(payload["lessons"][0]["completed"])
        self.assertEqual(len(payload["lessons"][0]["course"]["assessment"]), 5)
        self.assertNotIn("answer", payload["lessons"][0]["course"]["assessment"][0])
        self.assertGreaterEqual(len(payload["lessons"][0]["course"]["concepts"]), 9)
        self.assertIn("architecture", payload["lessons"][0]["course"]["project"])
        self.assertIn("starter_code", payload["lessons"][0]["course"]["project"])
        self.assertTrue(payload["lessons"][0]["course"]["source_basis"]["sources"])
        self.assertEqual(len(payload["lessons"][0]["course"]["guided_steps"]), 7)

    def test_local_python_interpreter(self):
        result = study_coach.run_local_code("python", "print(6 * 7)")
        self.assertEqual(result["exit_code"], 0)
        self.assertEqual(result["stdout"].strip(), "42")

    def test_workspace_path_cannot_escape(self):
        with self.assertRaises(ValueError):
            study_coach.safe_workspace_path("../outside.py")


if __name__ == "__main__":
    unittest.main()
