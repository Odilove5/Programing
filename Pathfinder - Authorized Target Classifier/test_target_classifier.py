import unittest

from target_classifier import classify_targets


class ClassifyTargetsTest(unittest.TestCase):
    def setUp(self):
        self.allowed_targets = {
            "lab-server.local",
            "training-api.local",
        }

    def test_mixed_inputs_are_classified(self):
        result = classify_targets(
            [
                "  LAB-SERVER.LOCAL  ",
                "",
                "TRAINING API.LOCAL",
                "production.example",
                " Training-API.Local ",
            ],
            self.allowed_targets,
        )

        self.assertEqual(len(result["accepted"]), 2)
        self.assertEqual(len(result["rejected"]), 3)

    def test_empty_target_is_rejected(self):
        result = classify_targets(["   "], self.allowed_targets)

        self.assertEqual(
            result["rejected"],
            [{"input": "   ", "reason": "target is empty"}],
        )

    def test_internal_space_is_rejected(self):
        result = classify_targets(["TRAINING API.LOCAL"], self.allowed_targets)

        self.assertEqual(
            result["rejected"][0]["reason"],
            "target contains spaces",
        )

    def test_target_outside_allowlist_is_rejected(self):
        result = classify_targets(["production.example"], self.allowed_targets)

        self.assertEqual(
            result["rejected"][0],
            {
                "input": "production.example",
                "normalized": "production.example",
                "reason": "target is not allowed",
            },
        )

    def test_duplicate_inputs_are_preserved(self):
        result = classify_targets(
            ["lab-server.local", "LAB-SERVER.LOCAL"],
            self.allowed_targets,
        )

        self.assertEqual(len(result["accepted"]), 2)
        self.assertEqual(
            [item["normalized"] for item in result["accepted"]],
            ["lab-server.local", "lab-server.local"],
        )

    def test_empty_input_list_returns_empty_results(self):
        result = classify_targets([], self.allowed_targets)

        self.assertEqual(result, {"accepted": [], "rejected": []})

    def test_processing_order_is_preserved(self):
        result = classify_targets(
            ["training-api.local", "lab-server.local"],
            self.allowed_targets,
        )

        self.assertEqual(
            [item["normalized"] for item in result["accepted"]],
            ["training-api.local", "lab-server.local"],
        )


if __name__ == "__main__":
    unittest.main()
