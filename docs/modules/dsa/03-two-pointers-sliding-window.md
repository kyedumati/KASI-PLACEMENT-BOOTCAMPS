---
lesson: true
category: "Data Structures and Algorithms · Session 3 of 7"
---

# Two pointers and sliding window

<p class="session-meta">60 minutes · Opposite-end pointers, fast and slow pointers, fixed and variable windows</p>

## Outcome

You can solve array and string problems in one pass and O(1) extra space by moving two indexes, without a nested loop.

## Time-box

| Minutes | Activity |
|---|---|
| 0 to 5 | Hook: "Check if a string is a palindrome without creating a reversed copy." |
| 5 to 17 | The three pointer shapes and the two window types |
| 17 to 27 | **Live:** Valid Palindrome |
| 27 to 38 | **Guided:** Move Zeroes |
| 38 to 55 | **Solo:** Longest Substring Without Repeating Characters |
| 55 to 60 | Debrief |

## Concepts

### Three pointer shapes

| Shape | How the pointers move | Typical use |
|---|---|---|
| **Opposite ends** | `left` starts at 0, `right` at the end; they move towards each other | Palindromes, pair sum in a sorted array, reversing |
| **Fast and slow (same direction)** | `fast` reads every element; `slow` marks where the next kept element goes | Removing or moving elements in place |
| **Fast and slow (different speeds)** | `slow` moves 1 step, `fast` moves 2 | Middle of a linked list, cycle detection |

Opposite-ends template:

```python
def pair_sum_sorted(nums, target):
    """nums is sorted. Return True if two elements add up to target."""
    left, right = 0, len(nums) - 1
    while left < right:
        total = nums[left] + nums[right]
        if total == target:
            return True
        if total < target:
            left += 1          # need a bigger sum
        else:
            right -= 1         # need a smaller sum
    return False

print(pair_sum_sorted([1, 3, 4, 6, 9], 10))   # True (1 + 9)
```

``` { .text .output }
True
```

This is the answer to the Two Sum follow-up: on a sorted array you need no extra memory.

### Sliding window

A window is a contiguous range `[left, right]`. You slide it across the input and update its summary as elements enter and leave, so you never recompute the whole window.

**Fixed size:** the window always holds `k` elements.

```python
def max_sum_of_k(nums, k):
    window = sum(nums[:k])
    best = window
    for right in range(k, len(nums)):
        window += nums[right] - nums[right - k]   # one enters, one leaves
        best = max(best, window)
    return best

print(max_sum_of_k([2, 1, 5, 1, 3, 2], 3))   # 9 (5 + 1 + 3)
```

``` { .text .output }
9
```

**Variable size:** grow the window on the right; shrink it from the left while it breaks the rule.

```text
left = 0
for right in range(len(s)):
    add s[right] to the window
    while the window is invalid:
        remove s[left] from the window
        left += 1
    update the answer with the window size, right - left + 1
```

Each element enters once and leaves at most once, so the total is O(n) even though there is a `while` inside the `for`.

## In real projects

The same ideas, in software you already use. The trainer opens the session with one of these; read the rest after class.

| What you learn here | Where it runs in real software |
|---|---|
| Two pointers from both ends | Checking a palindrome, reversing in place, finding a pair of prices that adds up to a budget in a sorted list. |
| Slow and fast pointer | Compacting a list in place: removing deleted records without using a second list. |
| Fixed sliding window | The 7-day moving average on a stock chart, or "average response time over the last 5 minutes" on a monitoring dashboard. |
| Variable sliding window | Rate limiting: allow at most 100 requests from one user in any 60-second window. |

### Example: moving average on a price chart

The 3-day average for every position. The window slides one step at a time: add the price that enters, subtract the price that leaves. No window is added up from scratch.

```python
prices = [100, 102, 101, 105, 110, 108, 112]
k = 3

window_sum = sum(prices[:k])
averages = [round(window_sum / k, 2)]

for right in range(k, len(prices)):
    window_sum += prices[right] - prices[right - k]    # one in, one out
    averages.append(round(window_sum / k, 2))

print(averages)
```

``` { .text .output }
[101.0, 102.67, 105.33, 107.67, 110.0]
```

## Problems

### Valid Palindrome · Live

[LeetCode 125](https://leetcode.com/problems/valid-palindrome/)

Return `True` if the string is a palindrome when you consider only letters and digits and ignore case.

`"A man, a plan, a canal: Panama"` → `True`. `"race a car"` → `False`.

??? question "Hint"
    Two pointers from the ends. Skip any character that is not a letter or digit, using `isalnum()`.

??? success "Solution"
    ```python
    def is_palindrome(s):
        left, right = 0, len(s) - 1
        while left < right:
            if not s[left].isalnum():
                left += 1
            elif not s[right].isalnum():
                right -= 1
            elif s[left].lower() != s[right].lower():
                return False
            else:
                left += 1
                right -= 1
        return True


    print(is_palindrome("A man, a plan, a canal: Panama"))
    print(is_palindrome("race a car"))
    ```

    ``` { .text .output }
    True
    False
    ```

    **Time** O(n). **Space** O(1).

    Building a cleaned string and comparing it with its reverse is also O(n) time, but it uses O(n) space.

### Move Zeroes · Guided

[LeetCode 283](https://leetcode.com/problems/move-zeroes/)

Move every 0 to the end of `nums`, keeping the other elements in their original order. Change the list in place and do not create a copy.

`[0, 1, 0, 3, 12]` → `[1, 3, 12, 0, 0]`

??? question "Hint"
    `slow` points at the position where the next non-zero value belongs. `fast` scans. When `fast` finds a non-zero value, swap it into `slow` and advance `slow`.

??? success "Solution"
    ```python
    def move_zeroes(nums):
        slow = 0
        for fast in range(len(nums)):
            if nums[fast] != 0:
                nums[slow], nums[fast] = nums[fast], nums[slow]
                slow += 1


    nums = [0, 1, 0, 3, 12]
    move_zeroes(nums)        # changes the list in place, returns nothing
    print(nums)
    ```

    ``` { .text .output }
    [1, 3, 12, 0, 0]
    ```

    **Time** O(n). **Space** O(1).

    The function returns nothing. The judge checks the list you were given.

### Longest Substring Without Repeating Characters · Solo

[LeetCode 3](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

Return the length of the longest substring in which no character repeats.

`"abcabcbb"` → `3` (`"abc"`). `"bbbbb"` → `1`. `"pwwkew"` → `3` (`"wke"`).

??? question "Hint 1"
    This is a variable window. The window is valid while every character in it is distinct.

??? question "Hint 2"
    Keep a set of the characters in the window. When the new character is already in the set, remove characters from the left until it is not.

??? success "Solution"
    ```python
    def length_of_longest_substring(s):
        window = set()
        left = 0
        best = 0
        for right in range(len(s)):
            while s[right] in window:
                window.remove(s[left])
                left += 1
            window.add(s[right])
            best = max(best, right - left + 1)
        return best


    print(length_of_longest_substring("abcabcbb"))   # abc
    print(length_of_longest_substring("bbbbb"))      # b
    print(length_of_longest_substring("pwwkew"))     # wke
    ```

    ``` { .text .output }
    3
    1
    3
    ```

    **Time** O(n). **Space** O(k), where k is the number of distinct characters.

    Trace for `"abcabcbb"`:

    | right | char | window after | left | best |
    |---|---|---|---|---|
    | 0 | a | a | 0 | 1 |
    | 1 | b | ab | 0 | 2 |
    | 2 | c | abc | 0 | 3 |
    | 3 | a | bca | 1 | 3 |
    | 4 | b | cab | 2 | 3 |
    | 5 | c | abc | 3 | 3 |
    | 6 | b | cb | 5 | 3 |
    | 7 | b | b | 7 | 3 |

## Common mistakes

| Mistake | Fix |
|---|---|
| `while left <= right` on a palindrome check | `left < right` is enough; the middle character matches itself |
| Returning a new list from an "in place" problem | Modify the list you were given |
| Using `if` instead of `while` to shrink the window | One removal may not be enough |
| Window length as `right - left` | It is `right - left + 1` |
| Using two pointers on an unsorted array for pair sum | The left/right decision only works when the array is sorted |

## Interview questions

1. When can two pointers replace a hash map? What do you gain?
2. Why is the variable sliding window O(n) when it has a nested `while`?
3. What is the difference between a substring, a subarray and a subsequence?
4. How would you find the middle node of a linked list in one pass?
5. Follow-up to Longest Substring: how would you return the substring itself, not only its length?

## Commit

`day2/valid_palindrome.py`, `day2/move_zeroes.py`, `day2/longest_substring.py`
