def review_paths(paths):
    semantic, excluded = [], []
    for path in paths:
        if path == ".DS_Store" or path.endswith(".pyc") or path.endswith(".json"):
            excluded.append(path)
        else:
            semantic.append(path)
    return {"semantic": semantic, "excluded": excluded}
