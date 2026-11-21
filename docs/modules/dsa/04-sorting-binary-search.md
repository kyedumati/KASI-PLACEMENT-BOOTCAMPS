---
lesson: true
category: "Data Structures and Algorithms · Session 4 of 7"
---

# Sorting and binary search

<p class="session-meta">60 minutes · Bubble, selection and merge sort (dry run), Python sort with key, binary search template, search on the answer</p>

## Outcome

You can explain how three sorting algorithms work and what they cost, sort anything in Python with a `key`, and write binary search from memory without an off-by-one error.

## Time-box

| Minutes | Activity |
|---|---|
| 0 to 5 | Hook: "Guess my number between 1 and 1,000,000 in 20 questions." |
| 5 to 17 | Bubble, selection and merge sort: dry run on the board, no typing |
| 17 to 22 | Python `sort` with `key` |
| 22 to 32 | **Live:** Binary Search, the template |
| 32 to 42 | **Guided:** Search Insert Position |
| 42 to 55 | **Solo:** Merge Sorted Array |
| 55 to 60 | Search on the answer, debrief |

## Concepts

### Three sorts to explain, not to memorise

In interviews you are asked to explain and compare these. In code you call `sorted()`.

| Algorithm | Idea | Time | Space | Stable |
|---|---|---|---|---|
| Bubble sort | Swap neighbours that are out of order; the largest value "bubbles" to the end each pass | O(n²) | O(1) | Yes |
| Selection sort | Find the smallest remaining value and put it at the front | O(n²) | O(1) | No |
| Merge sort | Split in half, sort each half, merge the two sorted halves | O(n log n) | O(n) | Yes |

**Dry run on paper** with `[5, 2, 4, 1]`:

- Bubble, pass 1: `[2, 5, 4, 1]` → `[2, 4, 5, 1]` → `[2, 4, 1, 5]`. The 5 is now in place.
- Selection, pass 1: the smallest is 1; swap it with the first element → `[1, 2, 4, 5]`.
- Merge: split into `[5, 2]` and `[4, 1]` → sort each to `[2, 5]` and `[1, 4]` → merge to `[1, 2, 4, 5]`.

The code, for reference after class:

```python
def bubble_sort(nums):
    n = len(nums)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if nums[j] > nums[j + 1]:
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
                swapped = True
        if not swapped:          # already sorted: stop early
            break
    return nums


def selection_sort(nums):
    n = len(nums)
    for i in range(n - 1):
        smallest = i
        for j in range(i + 1, n):
            if nums[j] < nums[smallest]:
                smallest = j
        nums[i], nums[smallest] = nums[smallest], nums[i]
    return nums


def merge_sort(nums):
    if len(nums) <= 1:
        return nums
    mid = len(nums) // 2
    left = merge_sort(nums[:mid])
    right = merge_sort(nums[mid:])

    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged


data = [5, 2, 4, 1, 9]
print(bubble_sort(data[:]))       # data[:] is a copy, so data stays unsorted
print(selection_sort(data[:]))
print(merge_sort(data))
```

``` { .text .output }
[1, 2, 4, 5, 9]
[1, 2, 4, 5, 9]
[1, 2, 4, 5, 9]
```

### Sorting in Python

`sorted(x)` returns a new list. `x.sort()` sorts in place and returns `None`. Both are O(n log n) and stable.

```python
students = [("Asha", 82), ("Ravi", 67), ("Meena", 91)]

by_marks = sorted(students, key=lambda s: s[1])                 # lowest first
by_marks_desc = sorted(students, key=lambda s: s[1], reverse=True)
by_name_length = sorted(["kiwi", "fig", "banana"], key=len)

print(by_marks_desc[0])     # ('Meena', 91)
print(by_name_length)       # ['fig', 'kiwi', 'banana']

# Sort by marks descending, then name ascending
ranked = sorted(students, key=lambda s: (-s[1], s[0]))
print(ranked)
```

``` { .text .output }
('Meena', 91)
['fig', 'kiwi', 'banana']
[('Meena', 91), ('Asha', 82), ('Ravi', 67)]
```

`key` is a function that is called once on each element. The elements are ordered by what it returns.

### Binary search

On **sorted** data, look at the middle. If it is not the target, half of the data can be thrown away. A million elements need about 20 steps.

![Binary search for 9 in [-1, 0, 3, 5, 9, 12]: the first middle is 3, so the left half is discarded; the second middle is 9](../../assets/diagrams/binary-search-light.svg#only-light){ .ksr-diagram }
![Binary search for 9 in [-1, 0, 3, 5, 9, 12]: the first middle is 3, so the left half is discarded; the second middle is 9](../../assets/diagrams/binary-search-dark.svg#only-dark){ .ksr-diagram }

```text
low, high = 0, len(nums) - 1
while low <= high:
    mid = (low + high) // 2
    if nums[mid] == target:  found
    if nums[mid] <  target:  low = mid + 1     # target is in the right half
    else:                    high = mid - 1    # target is in the left half
not found; low is where the target would be inserted
```

Three details to get right every time:

1. `high` starts at `len(nums) - 1`.
2. The loop condition is `low <= high`.
3. Move past `mid` with `mid + 1` and `mid - 1`. Assigning `low = mid` can loop forever.

### Search on the answer

Binary search is not only for arrays. If the answers form a range, and a "does this value work?" check flips from no to yes exactly once across that range, you can binary search the range itself.

Example: the integer square root of `n` is the largest `x` with `x * x <= n`.

```python
def int_sqrt(n):
    low, high = 0, n
    answer = 0
    while low <= high:
        mid = (low + high) // 2
        if mid * mid <= n:       # mid works: remember it, try bigger
            answer = mid
            low = mid + 1
        else:                    # mid is too big
            high = mid - 1
    return answer

print(int_sqrt(17))   # 4
```

``` { .text .output }
4
```

Clue words: "minimum speed", "smallest capacity", "least number of days such that...".

## In real projects

The same ideas, in software you already use. The trainer opens the session with one of these; read the rest after class.

| What you learn here | Where it runs in real software |
|---|---|
| Sorting with a key | "Sort by price: low to high" on a shopping site. A leaderboard sorted by score. |
| Merge step of merge sort | Combining two sorted lists into one: two bank statements, or log files from two servers, ordered by time. |
| Binary search | A database index finds one row among a million in about 20 steps. Your phone's contact search does the same. |
| Search for a boundary | `git bisect` finds the first commit that broke the build by testing the middle commit each time. |
| Insert position | Keeping a leaderboard sorted as each new score arrives, without sorting it again. |

### Example: find the first bad build

Eight builds went out. Somewhere a bug came in, and every build after it is bad too. Testing a build takes ten minutes, so test as few as possible. This is what `git bisect` does.

```python
builds = ["ok", "ok", "ok", "ok", "bad", "bad", "bad", "bad"]    # build 0 to build 7

low, high = 0, len(builds) - 1
tested = 0
while low < high:
    mid = (low + high) // 2
    tested += 1
    if builds[mid] == "bad":
        high = mid          # the first bad build is mid, or earlier
    else:
        low = mid + 1       # the first bad build is after mid

print(f"First bad build: {low}. Builds tested: {tested} out of {len(builds)}.")
```

``` { .text .output }
First bad build: 4. Builds tested: 3 out of 8.
```

## Problems

### Binary Search · Live

[LeetCode 704](https://leetcode.com/problems/binary-search/)

`nums` is sorted in ascending order. Return the index of `target`, or `-1` if it is not present. Your solution must be O(log n).

`nums = [-1, 0, 3, 5, 9, 12]`, `target = 9` → `4`

??? success "Solution"
    ```python
    def binary_search(nums, target):
        low, high = 0, len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return -1


    print(binary_search([-1, 0, 3, 5, 9, 12], 9))   # found at index 4
    print(binary_search([-1, 0, 3, 5, 9, 12], 2))   # not there
    ```

    ``` { .text .output }
    4
    -1
    ```

    **Time** O(log n). **Space** O(1).

### Search Insert Position · Guided

[LeetCode 35](https://leetcode.com/problems/search-insert-position/)

`nums` is sorted and has no duplicates. Return the index of `target` if it is present. Otherwise return the index where it would be inserted to keep the list sorted.

`[1, 3, 5, 6]`, `5` → `2`. `[1, 3, 5, 6]`, `2` → `1`. `[1, 3, 5, 6]`, `7` → `4`.

??? question "Hint"
    Run the same template. When the loop ends without finding the target, look at where `low` stopped.

??? success "Solution"
    ```python
    def search_insert(nums, target):
        low, high = 0, len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return low


    print(search_insert([1, 3, 5, 6], 5))   # found
    print(search_insert([1, 3, 5, 6], 2))   # belongs between 1 and 3
    print(search_insert([1, 3, 5, 6], 7))   # belongs at the end
    ```

    ``` { .text .output }
    2
    1
    4
    ```

    **Time** O(log n). **Space** O(1).

    When the loop ends, everything left of `low` is smaller than the target and everything from `low` onwards is larger. So `low` is the insert position.

### Merge Sorted Array · Solo

[LeetCode 88](https://leetcode.com/problems/merge-sorted-array/)

`nums1` has length `m + n`: its first `m` values are sorted, and the last `n` slots are zeros reserved as empty space. `nums2` has `n` sorted values. Merge `nums2` into `nums1` in place, so that `nums1` is sorted.

`nums1 = [1, 2, 3, 0, 0, 0]`, `m = 3`, `nums2 = [2, 5, 6]`, `n = 3` → `nums1 = [1, 2, 2, 3, 5, 6]`

??? question "Hint 1"
    If you fill from the front, you overwrite values of `nums1` that you still need.

??? question "Hint 2"
    The free space is at the back. Fill from the back with the larger of the two current values, using three pointers.

??? success "Solution"
    ```python
    def merge(nums1, m, nums2, n):
        i = m - 1            # last real value in nums1
        j = n - 1            # last value in nums2
        k = m + n - 1        # next slot to fill, from the back

        while j >= 0:
            if i >= 0 and nums1[i] > nums2[j]:
                nums1[k] = nums1[i]
                i -= 1
            else:
                nums1[k] = nums2[j]
                j -= 1
            k -= 1


    nums1 = [1, 2, 3, 0, 0, 0]
    merge(nums1, 3, [2, 5, 6], 3)
    print(nums1)
    ```

    ``` { .text .output }
    [1, 2, 2, 3, 5, 6]
    ```

    **Time** O(m + n). **Space** O(1).

    The loop runs until `nums2` is used up. Any values of `nums1` that remain are already in the right place.

## Common mistakes

| Mistake | Fix |
|---|---|
| Binary search on unsorted data | Sort first, or use a hash map |
| `while low < high` with this template | The last element is never checked. Use `low <= high`. |
| `low = mid` or `high = mid` | Infinite loop. Use `mid + 1` and `mid - 1`. |
| `nums = nums.sort()` | `sort()` returns `None` |
| Appending and re-sorting in Merge Sorted Array | It works but is O((m+n) log(m+n)) and misses the point of the question |

## Interview questions

1. Compare bubble sort, selection sort and merge sort on time, space and stability.
2. What does "stable sort" mean? Give a case where it matters.
3. Which algorithm does Python's `sort()` use, and what is its complexity?
4. Why is binary search O(log n)?
5. What must be true of the data before you can binary search it?
6. What is "binary search on the answer"? Give one example.

## Commit

`day2/binary_search.py`, `day2/search_insert.py`, `day2/merge_sorted_array.py`
