"""Acceptance tests for the Week 3 Day 2 student exercise."""

import unittest

from exercise import summarize_campaigns


class CampaignCollectionTests(unittest.TestCase):
    def test_names_preserve_input_order_and_channels_are_unique(self):
        campaigns = [
            {"name": "Search", "channel": "paid", "status": "active"},
            {"name": "Social", "channel": "organic", "status": "paused"},
            {"name": "Retargeting", "channel": "paid", "status": "active"},
        ]

        result = summarize_campaigns(campaigns)

        self.assertEqual(result["names"], ["Search", "Social", "Retargeting"])
        self.assertEqual(result["channels"], {"paid", "organic"})
        self.assertEqual([item["name"] for item in result["active"]], ["Search", "Retargeting"])

    def test_empty_input_is_safe(self):
        self.assertEqual(summarize_campaigns([]), {"names": [], "channels": set(), "active": []})


if __name__ == "__main__":
    unittest.main()
