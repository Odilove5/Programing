def bounded_attempts(max_attempts):
    return list(range(1, max_attempts + 1))

def safe_countdown(start):
    values = []
    current = start
    while current > 0:
        values.append(current)
        current -= 1
    return values
