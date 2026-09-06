def test_loop_boundaries():

    max_attempts = [0, 1, 3]

    for attempt in max_attempts:
        current_attempt = 1
        result = []

        while current_attempt <= attempt:
            result.append(current_attempt)
            current_attempt += 1

        assert current_attempt == attempt + 1
        print(f"result for {attempt} --> {result}")

if __name__ == "__main__":
    test_loop_boundaries()



