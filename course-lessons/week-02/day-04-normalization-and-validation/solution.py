def classify_path(path):
    if path == ".DS_Store" or path.endswith(".pyc"):
        return "noise"
    if path.endswith(".json"):
        return "generated"
    if "test" in path:
        return "test"
    return "source"
