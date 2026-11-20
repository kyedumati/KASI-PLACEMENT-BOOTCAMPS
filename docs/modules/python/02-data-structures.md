---
lesson: true
category: "Python · Session 2 of 3"
---

# Python data structures

<p class="session-meta">60 minutes · Lists, tuples, sets, dictionaries, slicing, comprehensions, string methods</p>

## Outcome

You can pick the right built-in structure for a job and use it without looking up the syntax. Tomorrow's DSA sessions depend on this one.

## Time-box

| Minutes | Activity |
|---|---|
| 0 to 5 | Hook: "Count how many times each character appears in a string." |
| 5 to 25 | The four structures, typed live |
| 25 to 50 | Lab: 5 programs |
| 50 to 60 | Debrief: which structure did you choose, and why? |

## Which one do I use?

| Structure | Written as | Ordered | Can change | Duplicates | Use it for |
|---|---|---|---|---|---|
| List | `[1, 2, 3]` | Yes | Yes | Yes | A sequence you will modify |
| Tuple | `(1, 2, 3)` | Yes | No | Yes | A fixed record, such as `(row, col)` |
| Set | `{1, 2, 3}` | No | Yes | No | "Have I seen this?" and removing duplicates |
| Dictionary | `{"a": 1}` | Insertion order | Yes | Keys are unique | Looking up a value by a key, and counting |

## Concepts

### Lists

```python
nums = [40, 10, 30]

nums.append(20)        # add at the end      -> [40, 10, 30, 20]
nums.insert(0, 5)      # add at an index     -> [5, 40, 10, 30, 20]
last = nums.pop()      # remove the end      -> 20
nums.sort()            # sort in place       -> [5, 10, 30, 40]

print(nums[0], nums[-1])   # first and last  -> 5 40
print(len(nums))           # 4
print(30 in nums)          # True, but this scans the list: O(n)
```

### Slicing

`sequence[start:stop:step]`. The stop index is excluded. It works on lists, tuples and strings.

```python
nums = [0, 1, 2, 3, 4, 5]

print(nums[1:4])    # [1, 2, 3]
print(nums[:3])     # [0, 1, 2]
print(nums[3:])     # [3, 4, 5]
print(nums[::-1])   # reversed: [5, 4, 3, 2, 1, 0]
print("python"[::-1])   # nohtyp
```

### Tuples

A tuple cannot be changed after it is created. That makes it safe to use as a dictionary key or a set member.

```python
point = (3, 4)
x, y = point          # unpacking
a, b = 1, 2
a, b = b, a           # swap without a temporary variable
print(x, y, a, b)     # 3 4 2 1
```

### Sets

```python
seen = set()
seen.add(5)
seen.add(5)            # no effect: already there
print(seen)            # {5}
print(5 in seen)       # True, and this is O(1)

print(set([1, 2, 2, 3, 3, 3]))   # {1, 2, 3}
print({1, 2, 3} & {2, 3, 4})     # intersection: {2, 3}
```

### Dictionaries

```python
marks = {"Asha": 82, "Ravi": 67}

marks["Meena"] = 91            # add or update
print(marks["Asha"])           # 82
print(marks.get("Zoya", 0))    # 0: get() returns a default instead of an error

for name, score in marks.items():
    print(name, score)
```

The counting idiom you will use all week:

```python
count = {}
for ch in "banana":
    count[ch] = count.get(ch, 0) + 1
print(count)   # {'b': 1, 'a': 3, 'n': 2}
```

### List comprehensions

A one-line way to build a list from a loop.

```python
squares = [x * x for x in range(1, 6)]            # [1, 4, 9, 16, 25]
evens = [x for x in range(10) if x % 2 == 0]      # [0, 2, 4, 6, 8]
print(squares, evens)
```

### String methods

Strings are immutable. Every method returns a new string.

```python
s = "  Placement Training 2026  "

print(s.strip())                 # remove spaces at both ends
print(s.lower(), s.upper())
print(s.strip().split())         # ['Placement', 'Training', '2026']
print("-".join(["a", "b", "c"])) # a-b-c
print(s.replace("2026", "Week"))
print("a1".isalnum(), "abc".isalpha(), "42".isdigit())
```

## Lab

### 1. Count character frequency · Live

Given a string, print how many times each character appears.

??? success "Solution"
    ```python
    text = "placement"

    count = {}
    for ch in text:
        count[ch] = count.get(ch, 0) + 1

    for ch, times in count.items():
        print(ch, times)
    ```

### 2. Remove duplicates · Live

Given a list, produce a list with duplicates removed, keeping the first occurrence of each value in its original order.

??? question "Hint"
    `list(set(nums))` removes duplicates but loses the order. Keep a set of values you have seen, and build the result as you go.

??? success "Solution"
    ```python
    nums = [3, 1, 3, 2, 1, 5]

    seen = set()
    unique = []
    for x in nums:
        if x not in seen:
            seen.add(x)
            unique.append(x)

    print(unique)   # [3, 1, 2, 5]
    ```

### 3. Second largest · Solo

Given a list of numbers, print the second largest distinct value. For `[10, 40, 40, 30]` the answer is `30`.

??? question "Hint 1"
    The simple way: remove duplicates, sort, take the second from the end.

??? question "Hint 2"
    The interview way: one pass with two variables, `largest` and `second`.

??? success "Solution"
    ```python
    nums = [10, 40, 40, 30]

    # Simple: O(n log n)
    distinct = sorted(set(nums))
    print(distinct[-2] if len(distinct) >= 2 else None)   # 30

    # One pass: O(n)
    largest = second = None
    for x in nums:
        if largest is None or x > largest:
            second = largest
            largest = x
        elif x != largest and (second is None or x > second):
            second = x
    print(second)   # 30
    ```

### 4. Palindrome string · Solo

Given a string, print whether it reads the same forwards and backwards. Ignore case.

??? success "Solution"
    ```python
    text = "Madam"

    cleaned = text.lower()
    print(cleaned == cleaned[::-1])   # True
    ```

### 5. Word count · Solo

Given a sentence, print each word and how many times it appears. Ignore case.

??? success "Solution"
    ```python
    sentence = "the quick brown fox jumps over the lazy dog the end"

    count = {}
    for word in sentence.lower().split():
        count[word] = count.get(word, 0) + 1

    for word, times in count.items():
        print(word, times)
    ```

## Common mistakes

| Mistake | What you see | Fix |
|---|---|---|
| Reading a key that is not in the dictionary | `KeyError: 'x'` | Use `d.get(key, default)` or check `if key in d` |
| Index past the end of a list | `IndexError: list index out of range` | Valid indexes are `0` to `len(nums) - 1` |
| `b = a` to copy a list | Changing `b` also changes `a` | `b = a.copy()` or `b = a[:]` |
| `nums = nums.sort()` | `nums` becomes `None` | `nums.sort()` sorts in place and returns `None`. Use `sorted(nums)` to get a new list. |
| `{}` to make an empty set | You get an empty dictionary | `set()` |
| Changing a character with `s[0] = "x"` | `TypeError: 'str' object does not support item assignment` | Build a new string |

## Interview questions

1. What is the difference between a list and a tuple? When would you choose a tuple?
2. Why is `x in my_set` faster than `x in my_list`?
3. Can a list be a dictionary key? Why not?
4. What is the difference between `sort()` and `sorted()`?
5. What is the difference between a shallow copy and a deep copy?

## Commit

Save the five programs in `day1/`.
