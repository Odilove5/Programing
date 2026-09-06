def loop_values(maximum):
    values = []
    current = 1
    while current <= maximum:
        values.append(current)
        current += 1
    assert current == maximum + 1
    return values

def test_loop_boundaries():
    assert loop_values(0) == []
    assert loop_values(1) == [1]
    assert loop_values(3) == [1, 2, 3]
