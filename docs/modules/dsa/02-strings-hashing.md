---
lesson: true
category: "Data Structures and Algorithms · Session 2 of 7"
---

# Strings and hashing

<p class="session-meta">60 minutes · Immutable strings, dictionaries and sets as hash maps, frequency counting</p>

## Outcome

You can replace a nested loop with a dictionary or a set. This is the single most useful trick in coding rounds.

## Time-box

| Minutes | Activity |
|---|---|
| 0 to 5 | Hook: "Find two numbers that add up to a target. Now do it without a nested loop." |
| 5 to 15 | Strings are immutable; how hashing gives O(1) lookup |
| 15 to 27 | **Live:** Two Sum |
| 27 to 37 | **Guided:** Valid Anagram |
| 37 to 55 | **Solo:** Contains Duplicate, First Unique Character in a String |
| 55 to 60 | Debrief |

## Concepts

### Strings are immutable

You cannot change a string in place. Every "change" creates a new string, which costs O(n).

```python
s = "hello"
t = s.upper()        # a new string; s is unchanged
print(s, t)          # hello HELLO

# Slow: each += may copy the whole string
slow = ""
for ch in "abc":
    slow += ch

# Fast: collect parts in a list, join once
parts = []
for ch in "abc":
    parts.append(ch)
fast = "".join(parts)
print(slow, fast)
```

``` { .text .output }
hello HELLO
abc abc
```

### How a hash map finds things in O(1)

A dictionary runs the key through a hash function to get a number, and uses that number to jump straight to a slot. It does not scan. That is why `key in my_dict` and `x in my_set` take the same time whether there are ten items or ten million.

Keys must be **hashable**, which in practice means immutable: numbers, strings and tuples work. Lists do not.

### The three hashing templates

```python
nums = [4, 1, 4, 2]

# 1. Seen-set: "have I met this before?"
seen = set()
for x in nums:
    if x in seen:
        print("repeat:", x)
    seen.add(x)

# 2. Frequency map: "how many of each?"
count = {}
for x in nums:
    count[x] = count.get(x, 0) + 1
print(count)                     # {4: 2, 1: 1, 2: 1}

# 3. Value-to-index map: "where did I see it?"
position = {}
for i, x in enumerate(nums):
    position[x] = i
print(position)                  # {4: 2, 1: 1, 2: 3}
```

``` { .text .output }
repeat: 4
{4: 2, 1: 1, 2: 1}
{4: 2, 1: 1, 2: 3}
```

Python also ships a ready-made frequency map:

```python
from collections import Counter

print(Counter("banana"))         # Counter({'a': 3, 'n': 2, 'b': 1})
```

``` { .text .output }
Counter({'a': 3, 'n': 2, 'b': 1})
```

Write the manual loop first so you can explain it. Use `Counter` once you can.

## In real projects

The same ideas, in software you already use. The trainer opens the session with one of these; read the rest after class.

| What you learn here | Where it runs in real software |
|---|---|
| Dictionary lookup in O(1) | A cache such as Redis: "have I already computed the answer for this request?" A database index works on the same idea. |
| Set membership | "This email is already registered." Removing duplicate contacts when you import a phone book. |
| Frequency count | Trending hashtags, most-searched products, the most common error in a log. |
| Store what you have seen, look up what you need | Matching a refund to its original payment: one pass, one dictionary. |
| Anagram and character counts | Spell checkers and word games compare letter counts, not letter order. |

### Example: trending hashtags

The counting idiom from the Python session, on real-looking data. Count every tag, then sort by the count.

```python
posts = [
    "#python #ai",
    "#placement #python",
    "#ai #python #dsa",
    "#placement",
]

count = {}
for post in posts:
    for tag in post.split():
        count[tag] = count.get(tag, 0) + 1

top = sorted(count.items(), key=lambda pair: pair[1], reverse=True)
for tag, times in top[:3]:
    print(tag, times)
```

``` { .text .output }
#python 3
#ai 2
#placement 2
```

## Problems

### Two Sum · Live

[LeetCode 1](https://leetcode.com/problems/two-sum/)

Return the indexes of the two numbers in `nums` that add up to `target`. Exactly one answer exists, and you may not use the same element twice.

`nums = [2, 7, 11, 15]`, `target = 9` → `[0, 1]`

??? question "Hint 1"
    For each number `x`, the partner you need is `target - x`. Brute force scans for it: O(n²).

??? question "Hint 2"
    Keep a dictionary of value → index for the numbers already passed. Check for the partner **before** you add the current number.

??? success "Solution"
    ```python
    def two_sum(nums, target):
        seen = {}                          # value -> index
        for i, x in enumerate(nums):
            need = target - x
            if need in seen:
                return [seen[need], i]
            seen[x] = i
        return []


    print(two_sum([2, 7, 11, 15], 9))
    print(two_sum([3, 2, 4], 6))
    ```

    ``` { .text .output }
    [0, 1]
    [1, 2]
    ```

    **Time** O(n). **Space** O(n).

    Checking before adding is what stops an element pairing with itself, for example `nums = [3, 3]`, `target = 6`.

### Valid Anagram · Guided

[LeetCode 242](https://leetcode.com/problems/valid-anagram/)

Return `True` if `t` uses exactly the same letters as `s`, the same number of times.

`"anagram"`, `"nagaram"` → `True`. `"rat"`, `"car"` → `False`.

??? question "Hint"
    Two strings are anagrams when their frequency maps are equal. Different lengths can never be anagrams.

??? success "Solution"
    ```python
    def is_anagram(s, t):
        if len(s) != len(t):
            return False

        count = {}
        for ch in s:
            count[ch] = count.get(ch, 0) + 1

        for ch in t:
            if count.get(ch, 0) == 0:
                return False
            count[ch] -= 1
        return True


    print(is_anagram("anagram", "nagaram"))
    print(is_anagram("rat", "car"))
    ```

    ``` { .text .output }
    True
    False
    ```

    **Time** O(n). **Space** O(k), where k is the number of distinct characters.

    `sorted(s) == sorted(t)` is also correct, but it is O(n log n). Mention both and say which is faster.

### Contains Duplicate · Solo

[LeetCode 217](https://leetcode.com/problems/contains-duplicate/)

Return `True` if any value appears at least twice.

`[1, 2, 3, 1]` → `True`. `[1, 2, 3, 4]` → `False`.

??? success "Solution"
    ```python
    def contains_duplicate(nums):
        seen = set()
        for x in nums:
            if x in seen:
                return True
            seen.add(x)
        return False


    print(contains_duplicate([1, 2, 3, 1]))
    print(contains_duplicate([1, 2, 3, 4]))
    ```

    ``` { .text .output }
    True
    False
    ```

    **Time** O(n). **Space** O(n).

    `len(set(nums)) != len(nums)` is a correct one-liner. The loop version can stop early.

### First Unique Character in a String · Solo

[LeetCode 387](https://leetcode.com/problems/first-unique-character-in-a-string/)

Return the index of the first character that appears only once, or `-1` if there is none.

`"leetcode"` → `0`. `"loveleetcode"` → `2`. `"aabb"` → `-1`.

??? question "Hint"
    Two passes. First count every character. Then walk the string again and return the first index whose count is 1.

??? success "Solution"
    ```python
    def first_uniq_char(s):
        count = {}
        for ch in s:
            count[ch] = count.get(ch, 0) + 1

        for i, ch in enumerate(s):
            if count[ch] == 1:
                return i
        return -1


    print(first_uniq_char("leetcode"))       # l
    print(first_uniq_char("loveleetcode"))   # v
    print(first_uniq_char("aabb"))           # none
    ```

    ``` { .text .output }
    0
    2
    -1
    ```

    **Time** O(n): two passes are still linear. **Space** O(k).

## Common mistakes

| Mistake | Fix |
|---|---|
| Adding to the map before checking, in Two Sum | Check for the partner first, then add |
| Returning values when the problem asks for indexes | Read what the return value must be |
| `count[ch] += 1` on a key that is not there yet | `KeyError`. Use `count.get(ch, 0) + 1`. |
| Using a list as a dictionary key | `TypeError: unhashable type: 'list'`. Convert it to a tuple. |
| Sorting when a set would do | Sorting is O(n log n); hashing is O(n) |

## Interview questions

1. Why is a lookup in a dictionary or a set O(1) on average, when a lookup in a list is O(n)?
2. Name the three hashing templates, and one problem each one solves.
3. What is the difference between a set and a dictionary?
4. Why are strings immutable in Python? Name one benefit.
5. In Two Sum, why does the dictionary store value to index, and why do you check before you store?

## Commit

`day2/two_sum.py`, `day2/valid_anagram.py`, `day2/contains_duplicate.py`, `day2/first_unique_char.py`
