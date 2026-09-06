def retry_states(max_attempts):
    states = []
    attempt = 1
    while attempt <= max_attempts:
        states.append(attempt)
        attempt += 1
    return states

def drain_queue(items):
    queue = list(items)
    processed = []
    while queue:
        processed.append(queue.pop(0))
    return processed
