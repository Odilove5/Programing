def above_threshold(records, threshold):
    return [record for record in records if record.get("bytes", 0) > threshold]
