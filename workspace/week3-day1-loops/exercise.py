max_attempts = [0, 1, 3]


for attempt in max_attempts:
    current_attempt = 0

    while current_attempt < attempt:
        print(f"{current_attempt} for maximum {attempt}")
        current_attempt += 1
    assert current_attempt == attempt
    



