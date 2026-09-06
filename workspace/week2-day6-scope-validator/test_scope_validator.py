import unittest

from scope_validator import normalize_target, validate_target, is_port_allowed, evaluate_target

class NormalizeTargetTest(unittest.TestCase):
    def test_removes_whitespace_and_lowercase(self):
        result = normalize_target("  TRAINING-API.LOCAL  ")
        self.assertEqual(result, "training-api.local")

    def test_empty_target_is_invalid(self):
        result = validate_target("")
        self.assertFalse(result["valid"])
        self.assertEqual(result["reason"], "target is empty")

    def test_target_with_spaces_is_invalid(self):
        result = validate_target(" ")
        self.assertFalse(result["valid"])
        self.assertEqual(result["reason"], "target contains spaces")

    def test_allowed_port_boundaries(self):
        cases = [
            (1, True),
            (65535, True),
            (0, False),
            (65536, False)
        ]
        for port, expected in cases:
            with self.subTest(port=port):
                self.assertEqual(
                    is_port_allowed(port, 1, 65535),
                    expected,
                )

    def test_evaluate_target_accepts_valid_input(self):
        allowed_targets = {"training-api.local", "lab-server.local"}
        result = evaluate_target("   TRAINING-API.LOCAL   ", 8443, allowed_targets)
        self.assertEqual(
            result,
            {
                "target": "training-api.local",
                "port": 8443,
                "decision": "accepted",
                "reason": "target and port passed all checks",
            }
        )

    def test_evaluate_target_rejections(self):
        allowed_targets = {"training-api.local", "lab-server.local"}
        test_cases = [
            (
                "empty_target",
                " ",
                443,
                "target is empty",
            ),
            (
                "target containing spaces",
                "lab server.local",
                443,
                "target contains spaces",
            ),
            (
                "target outside allowed list",
                "not-allowed.local",
                443,
                "target is not allowed",
            ),
            (
                "port below range",
                "training-api.local",
                0,
                "port must be between 1 and 65535",
            ),
            (
                "port above range",
                "training-api.local",
                65536,
                "port must be between 1 and 65535",
            ),
        ]
        for name, target, port, expected_reason in test_cases:
            with self.subTest(name=name):
                result = evaluate_target(
                    target,
                    port,
                    allowed_targets,
                )
                self.assertEqual(result["decision"], "rejected")
                self.assertEqual(result["reason"], expected_reason)

if __name__ == "__main__":
    unittest.main()
