# 1. Complexity and arrays

<p class="session-meta">60 minutes · Big-O by counting loops, time versus space, traversal, prefix sums, Kadane's algorithm</p>

## Outcome

You can state the time and space complexity of code by counting its loops, and you can solve array problems in one pass by carrying a running value.

## Time-box

| Minutes | Activity |
|---|---|
| 0 to 5 | Hook: "Your solution works. The interviewer asks: what is its complexity?" |
| 5 to 20 | Big-O by counting loops, time versus space |
| 20 to 30 | **Live:** Running Sum, and prefix sums |
| 30 to 42 | **Guided:** Best Time to Buy and Sell Stock |
| 42 to 55 | **Solo:** Maximum Subarray |
| 55 to 60 | Debrief |

## Concepts

### Big-O by counting loops

Big-O says how the work grows as the input size `n` grows. Drop constants and keep the fastest-growing term.

| Code shape | Complexity | Name |
|---|---|---|
| No loop, a fixed number of steps | O(1) | Constant |
| The input is halved each step | O(log n) | Logarithmic |
| One loop over the input | O(n) | Linear |
| Sorting | O(n log n) | Linearithmic |
| A loop inside a loop, both over the input | O(n²) | Quadratic |
| Every subset of the input | O(2ⁿ) | Exponential |

```python
def has_pair_with_sum_slow(nums, target):
    n = len(nums)
    for i in range(n):                 # n times
        for j in range(i + 1, n):      # up to n times for each i
            if nums[i] + nums[j] == target:
                return True
    return False                       # O(n²) time, O(1) space
```

Rules of thumb:

- Loops one after another **add**: O(n) + O(n) = O(n).
- Loops inside each other **multiply**: O(n) × O(n) = O(n²).
- A hidden loop still counts. `x in my_list`, `nums.index(x)`, slicing and `sum(nums)` are each O(n).

### Time versus space

Space complexity counts the **extra** memory you allocate, not the input. You can often spend memory to save time. Tomorrow's hashing session is exactly that trade: an extra set brings the function above from O(n²) to O(n).

### Prefix sums

If you need many range sums, compute a running total once. Then any range sum is one subtraction.

```python
def build_prefix(nums):
    prefix = [0]                        # prefix[i] = sum of the first i elements
    for x in nums:
        prefix.append(prefix[-1] + x)
    return prefix

nums = [2, 4, 1, 7, 3]
prefix = build_prefix(nums)             # [0, 2, 6, 7, 14, 17]

# sum of nums[1..3] = 4 + 1 + 7
print(prefix[4] - prefix[1])            # 12
```

Building takes O(n) once. Every query after that is O(1).

### The one-pass idea

Many array problems are solved by walking left to right while carrying one or two values that summarise everything seen so far. Ask: **"What do I need to remember from the past to decide at this element?"**

## Problems

### Running Sum of 1d Array · Live

[LeetCode 1480](https://leetcode.com/problems/running-sum-of-1d-array/)

Return a list where position `i` holds the sum of `nums[0]` to `nums[i]`.

`[1, 2, 3, 4]` → `[1, 3, 6, 10]`

??? success "Solution"
    ```python
    def running_sum(nums):
        result = []
        total = 0
        for x in nums:
            total += x
            result.append(total)
        return result
    ```

    **Time** O(n). **Space** O(n) for the output.

### Best Time to Buy and Sell Stock · Guided

[LeetCode 121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

`prices[i]` is the price on day `i`. Buy on one day and sell on a later day. Return the largest profit, or 0 if no profit is possible.

`[7, 1, 5, 3, 6, 4]` → `5` (buy at 1, sell at 6)

??? question "Hint 1"
    Brute force tries every buy day with every later sell day: O(n²). What is repeated?

??? question "Hint 2"
    If you sell today, the best buy day is the cheapest day so far. Carry that minimum as you walk.

??? success "Solution"
    ```python
    def max_profit(prices):
        min_price = float("inf")
        best = 0
        for price in prices:
            if price < min_price:
                min_price = price
            elif price - min_price > best:
                best = price - min_price
        return best
    ```

    **Time** O(n). **Space** O(1).

### Maximum Subarray · Solo

[LeetCode 53](https://leetcode.com/problems/maximum-subarray/)

Return the largest sum of any contiguous, non-empty part of `nums`.

`[-2, 1, -3, 4, -1, 2, 1, -5, 4]` → `6` (from `[4, -1, 2, 1]`)

??? question "Hint 1"
    At each element you have two choices: extend the subarray that ended at the previous element, or start a new one here.

??? question "Hint 2"
    Extend only if the running sum so far is positive. A negative running sum can only make things worse, so drop it.

??? success "Solution: Kadane's algorithm"
    ```python
    def max_subarray(nums):
        current = best = nums[0]
        for x in nums[1:]:
            current = max(x, current + x)   # start fresh at x, or extend
            best = max(best, current)
        return best
    ```

    **Time** O(n). **Space** O(1), if you loop by index instead of slicing.

    Trace for `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`:

    | x | -2 | 1 | -3 | 4 | -1 | 2 | 1 | -5 | 4 |
    |---|---|---|---|---|---|---|---|---|---|
    | current | -2 | 1 | -2 | 4 | 3 | 5 | 6 | 1 | 5 |
    | best | -2 | 1 | 1 | 4 | 4 | 5 | 6 | 6 | 6 |

## Common mistakes

| Mistake | Fix |
|---|---|
| Starting Kadane with `best = 0` | An all-negative array then returns 0. Start with `nums[0]`. |
| Selling before buying in the stock problem | Update the minimum and the profit in the same pass, left to right |
| Counting only the visible loops | `in` on a list, slicing and `sum()` are loops too |
| Saying "O(2n)" or "O(n + 5)" | Drop constants: both are O(n) |

## Interview questions

1. What is the difference between time complexity and space complexity?
2. What is the complexity of `x in nums` when `nums` is a list? When it is a set?
3. Why do we drop constants in Big-O?
4. Explain Kadane's algorithm in two sentences.
5. Follow-up to Maximum Subarray: how would you also return the start and end indexes?

## Commit

`day2/running_sum.py`, `day2/max_profit.py`, `day2/max_subarray.py`
