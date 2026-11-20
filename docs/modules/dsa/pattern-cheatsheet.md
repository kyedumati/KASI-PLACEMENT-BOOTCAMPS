# Pattern cheat sheet

Most interview problems are a known pattern in disguise. Read the problem, look for the clue, and pick the pattern.

## Clue to pattern

| If the problem says | Think of | Session |
|---|---|---|
| "sum of a range", "running total", "subarray sum" | Prefix sums | [1](01-complexity-arrays.md) |
| "maximum subarray", "best contiguous" | Kadane's algorithm | [1](01-complexity-arrays.md) |
| "have I seen this before?", "count occurrences", "find a pair", "duplicate", "anagram" | Hash map or set | [2](02-strings-hashing.md) |
| "sorted array" and "pair", "palindrome", "in place", "move elements" | Two pointers | [3](03-two-pointers-sliding-window.md) |
| "longest / shortest substring or subarray that..." | Sliding window | [3](03-two-pointers-sliding-window.md) |
| "sorted" and "find", or "minimum value that works" | Binary search | [4](04-sorting-binary-search.md) |
| "matching brackets", "most recent", "undo", "nearest previous" | Stack | [5](05-stacks-queues-linked-lists.md) |
| "in order of arrival", "level by level" | Queue | [5](05-stacks-queues-linked-lists.md) |
| "all subsets", "all combinations", "all permutations" | Backtracking | [6](06-recursion-backtracking-trees.md) |
| "tree" and "depth", "height", "path" | DFS recursion | [6](06-recursion-backtracking-trees.md) |
| "tree" and "level" | BFS with a queue | [6](06-recursion-backtracking-trees.md) |
| "grid", "islands", "connected", "regions" | Graph DFS or BFS | [7](07-graphs-dp.md) |
| "shortest path" with equal step costs | BFS | [7](07-graphs-dp.md) |
| "number of ways", "minimum cost", "maximum profit" with choices at each step | Dynamic programming | [7](07-graphs-dp.md) |

## Complexity you should know by heart

| Operation | Time |
|---|---|
| Read `nums[i]`, append to a list, pop from the end | O(1) |
| `x in my_list`, `my_list.index(x)`, insert or pop at the front of a list | O(n) |
| `x in my_set`, `x in my_dict`, read or write `my_dict[key]` | O(1) on average |
| `deque.append`, `deque.popleft` | O(1) |
| `sorted(nums)`, `nums.sort()` | O(n log n) |
| Binary search | O(log n) |
| Slicing `nums[a:b]`, `s[::-1]` | O(length of the slice) |
| Joining strings in a loop with `+=` | O(n²) in the worst case. Use `"".join(parts)`. |

## From input size to the complexity you need

Online judges allow roughly 10⁸ simple operations a second. Use the constraint on `n` to work backwards:

| n up to | Acceptable complexity |
|---|---|
| 20 | O(2ⁿ): backtracking is fine |
| 1,000 | O(n²) |
| 100,000 | O(n log n) or O(n) |
| 10⁹ | O(log n): binary search or a formula |
