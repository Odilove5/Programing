# Course tooling

`export_course_lessons.py` creates the GitHub-friendly lesson mirror from the
canonical `course_catalog.py`. It is safe to re-run and does not modify
student work under `workspace/`, dashboard progress, or lesson archives.

```bash
python tools/export_course_lessons.py
```

Validate the generated hierarchy and lesson files with:

```bash
python tools/validate_course_export.py
```
