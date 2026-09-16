import os
import unittest
from unittest.mock import Mock, patch

os.environ.setdefault("SUPABASE_URL", "https://example.supabase.co")
os.environ.setdefault("SUPABASE_SECRET_KEY", "test-secret")

with patch("supabase.create_client", return_value=Mock()):
    from backend.app import app, extract_text, find_skills


class ResumeServiceTests(unittest.TestCase):
    def test_plain_text_extraction_normalizes_whitespace(self):
        self.assertEqual(extract_text(b"  React\n\n TypeScript  ", "text/plain"), "React TypeScript")

    def test_skill_matching_is_case_insensitive_and_evidence_backed(self):
        found = find_skills("Built production apps with React and TypeScript.", [{"id": "1", "name": "React", "category": "frontend"}])
        self.assertEqual(found[0]["skillId"], "1")
        self.assertIn("React", found[0]["evidence"])

    def test_empty_documents_are_rejected(self):
        with self.assertRaises(ValueError):
            extract_text(b"   ", "text/plain")

    @patch("backend.app.supabase")
    def test_upload_rejects_empty_file(self, client):
        response = app.test_client().post("/api/resumes", headers={"Authorization": "Bearer token"}, data={"file": (b"", "resume.txt")}, content_type="multipart/form-data")
        self.assertEqual(response.status_code, 400)


if __name__ == "__main__":
    unittest.main()
