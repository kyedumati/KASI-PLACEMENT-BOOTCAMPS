---
lesson: true
category: "Data Structures and Algorithms · Session 7 of 7"
---

# Graphs (BFS, DFS) and an introduction to DP

<p class="session-meta">60 minutes · Adjacency list, BFS and DFS templates, grid as a graph, DP as recursion plus memory</p>

## Outcome

You can store a graph as an adjacency list, traverse it with BFS and DFS, treat a grid as a graph, and turn a slow recursive solution into a fast one with memoisation and then a table.

## Time-box

| Minutes | Activity |
|---|---|
| 0 to 5 | Hook: "How does a map app count the separate islands in a satellite image?" |
| 5 to 15 | Adjacency list, BFS and DFS templates, the `visited` set |
| 15 to 28 | **Live:** Number of Islands |
| 28 to 33 | Flood Fill set up as the same pattern. **Solo**, finished in the evening if needed |
| 33 to 40 | DP as recursion plus memory, using the Fibonacci from the last session |
| 40 to 50 | **Guided:** Climbing Stairs, in three versions |
| 50 to 57 | **Solo:** House Robber |
| 57 to 60 | Debrief |

!!! note "Two topics in one hour"
    Graphs get the first half and DP the second. Flood Fill and House Robber each reuse the pattern of the problem before them, so finish them this evening if class time runs out.

## Part 1: Graphs

### Adjacency list

A graph is a set of nodes joined by edges. A tree is a graph with no cycles and one root. Store a graph as a dictionary from each node to the list of its neighbours.

```python
#   A --- B --- D
#   |     |
#   C --- E
graph = {
    "A": ["B", "C"],
    "B": ["A", "D", "E"],
    "C": ["A", "E"],
    "D": ["B"],
    "E": ["B", "C"],
}

print(graph["B"])   # the neighbours of B
```

``` { .text .output }
['A', 'D', 'E']
```

### BFS and DFS templates

Graphs can have cycles, so you must remember where you have been. That `visited` set is the only real difference from tree traversal.

```python
from collections import deque


def bfs(graph, start):
    """Visit nearest nodes first. Uses a queue."""
    visited = {start}
    queue = deque([start])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbour in graph[node]:
            if neighbour not in visited:
                visited.add(neighbour)       # mark when adding, not when removing
                queue.append(neighbour)
    return order


def dfs(graph, node, visited=None, order=None):
    """Go as deep as possible, then come back. Uses recursion."""
    if visited is None:
        visited, order = set(), []
    visited.add(node)
    order.append(node)
    for neighbour in graph[node]:
        if neighbour not in visited:
            dfs(graph, neighbour, visited, order)
    return order


print(bfs(graph, "A"))   # ['A', 'B', 'C', 'D', 'E']
print(dfs(graph, "A"))   # ['A', 'B', 'D', 'E', 'C']
```

``` { .text .output }
['A', 'B', 'C', 'D', 'E']
['A', 'B', 'D', 'E', 'C']
```

| | BFS | DFS |
|---|---|---|
| Data structure | Queue | Recursion (the call stack) or an explicit stack |
| Order | Level by level, nearest first | One path to the end, then back |
| Use it for | Shortest path when every step costs the same | Connected regions, exploring all paths, cycle detection |
| Time | O(V + E) | O(V + E) |

V is the number of nodes (vertices) and E the number of edges.

### A grid is a graph

In a grid problem, every cell is a node and its neighbours are the cells above, below, left and right. You do not build an adjacency list; you compute the neighbours.

```text
for each (dr, dc) in (1, 0), (-1, 0), (0, 1), (0, -1):
    nr, nc = r + dr, c + dc
    if 0 <= nr < rows and 0 <= nc < cols:
        (nr, nc) is a neighbour
```

## Problems: graphs

### Number of Islands · Live

[LeetCode 200](https://leetcode.com/problems/number-of-islands/)

The grid holds `"1"` for land and `"0"` for water. An island is a group of land cells connected up, down, left or right. Return the number of islands.

```text
1 1 0 0 0
1 1 0 0 0
0 0 1 0 0
0 0 0 1 1      -> 3
```

??? question "Hint 1"
    Scan every cell. Each time you find land that you have not visited, you have found a new island.

??? question "Hint 2"
    When you find a new island, run a DFS from that cell and mark every connected land cell, so that you do not count the same island again.

??? success "Solution"
    ```python
    def num_islands(grid):
        rows, cols = len(grid), len(grid[0])

        def sink(r, c):
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != "1":
                return
            grid[r][c] = "0"          # mark as visited by turning land into water
            sink(r + 1, c)
            sink(r - 1, c)
            sink(r, c + 1)
            sink(r, c - 1)

        count = 0
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == "1":
                    count += 1
                    sink(r, c)
        return count


    grid = [
        ["1", "1", "0", "0", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "1", "0", "0"],
        ["0", "0", "0", "1", "1"],
    ]
    print(num_islands(grid))
    ```

    ``` { .text .output }
    3
    ```

    **Time** O(rows × cols): each cell is visited a constant number of times. **Space** O(rows × cols) for the recursion in the worst case.

    This changes the input grid. If the interviewer says not to, keep a separate `visited` set of `(r, c)` tuples.

### Flood Fill · Solo

[LeetCode 733](https://leetcode.com/problems/flood-fill/)

Starting at cell `(sr, sc)`, repaint that cell and every cell connected to it that has the same original colour, using the new `color`. Return the image. This is the paint-bucket tool.

`image = [[1,1,1],[1,1,0],[1,0,1]]`, `sr = 1`, `sc = 1`, `color = 2` → `[[2,2,2],[2,2,0],[2,0,1]]`

??? question "Hint"
    It is Number of Islands with one DFS instead of many. Remember the original colour before you start. What happens if the new colour equals the original colour?

??? success "Solution"
    ```python
    def flood_fill(image, sr, sc, color):
        original = image[sr][sc]
        if original == color:                 # nothing to do; also prevents infinite recursion
            return image

        rows, cols = len(image), len(image[0])

        def fill(r, c):
            if r < 0 or r >= rows or c < 0 or c >= cols or image[r][c] != original:
                return
            image[r][c] = color
            fill(r + 1, c)
            fill(r - 1, c)
            fill(r, c + 1)
            fill(r, c - 1)

        fill(sr, sc)
        return image


    image = [
        [1, 1, 1],
        [1, 1, 0],
        [1, 0, 1],
    ]
    for row in flood_fill(image, 1, 1, 2):
        print(row)
    ```

    ``` { .text .output }
    [2, 2, 2]
    [2, 2, 0]
    [2, 0, 1]
    ```

    **Time** O(rows × cols). **Space** O(rows × cols) for the recursion.

## Part 2: Dynamic programming

### DP is recursion plus memory

The recursive Fibonacci from the last session was O(2ⁿ) because it solved the same subproblems again and again. Dynamic programming fixes that in one move: **store each answer the first time you compute it.**

Use DP when both of these hold:

1. **Overlapping subproblems:** the recursion asks the same question more than once.
2. **Optimal substructure:** the answer to the big problem is built from the answers to smaller ones.

Every DP solution is reached in the same three steps.

```python
# Step 1. Plain recursion: correct but O(2^n)
def fib_slow(n):
    if n < 2:
        return n
    return fib_slow(n - 1) + fib_slow(n - 2)


# Step 2. Memoisation (top-down): same recursion, plus a dictionary. O(n)
def fib_memo(n, memo=None):
    if memo is None:
        memo = {}
    if n < 2:
        return n
    if n not in memo:
        memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]


# Step 3. Table (bottom-up): fill from the smallest case upwards. O(n), no recursion
def fib_table(n):
    if n < 2:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]


print(fib_slow(20), fib_memo(50), fib_table(50))   # 6765 12586269025 12586269025
```

``` { .text .output }
6765 12586269025 12586269025
```

Try `fib_slow(35)` and feel the delay. `fib_memo(35)` is instant.

**The method for any DP problem:**

1. Define the state in words: "`dp[i]` is ...".
2. Write the recurrence: how `dp[i]` comes from smaller states.
3. Write the base cases.
4. Decide the order to fill the table.

## Problems: DP

### Climbing Stairs · Guided

[LeetCode 70](https://leetcode.com/problems/climbing-stairs/)

A staircase has `n` steps. Each move climbs 1 or 2 steps. Return the number of distinct ways to reach the top.

`n = 2` → `2` (1+1, 2). `n = 3` → `3` (1+1+1, 1+2, 2+1).

??? question "Hint 1"
    Think about the last move. You arrive at step `n` either from step `n - 1` or from step `n - 2`.

??? question "Hint 2"
    State: `ways(i)` is the number of ways to reach step `i`. Recurrence: `ways(i) = ways(i - 1) + ways(i - 2)`. Base cases: `ways(1) = 1`, `ways(2) = 2`.

??? success "Solution"
    ```python
    def climb_stairs(n):
        if n <= 2:
            return n
        dp = [0] * (n + 1)
        dp[1], dp[2] = 1, 2
        for i in range(3, n + 1):
            dp[i] = dp[i - 1] + dp[i - 2]
        return dp[n]


    print([climb_stairs(n) for n in range(1, 8)])
    ```

    ``` { .text .output }
    [1, 2, 3, 5, 8, 13, 21]
    ```

    **Time** O(n). **Space** O(n).

    Each state needs only the previous two, so the table can shrink to two variables:

    ```python
    def climb_stairs_o1(n):
        if n <= 2:
            return n
        prev, current = 1, 2
        for _ in range(3, n + 1):
            prev, current = current, prev + current
        return current


    print(climb_stairs_o1(5), climb_stairs_o1(10))
    ```

    ``` { .text .output }
    8 89
    ```

    **Time** O(n). **Space** O(1).

### House Robber · Solo

[LeetCode 198](https://leetcode.com/problems/house-robber/)

`nums[i]` is the money in house `i`. You cannot take from two houses that are next to each other. Return the largest total you can take.

`[1, 2, 3, 1]` → `4` (houses 0 and 2). `[2, 7, 9, 3, 1]` → `12` (houses 0, 2 and 4).

??? question "Hint 1"
    At each house you have two choices: skip it, or take it. If you take it, you cannot have taken the previous one.

??? question "Hint 2"
    State: `dp[i]` is the best total using houses `0` to `i`. Recurrence: `dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])`.

??? success "Solution"
    ```python
    def rob(nums):
        if not nums:
            return 0
        if len(nums) == 1:
            return nums[0]

        dp = [0] * len(nums)
        dp[0] = nums[0]
        dp[1] = max(nums[0], nums[1])
        for i in range(2, len(nums)):
            dp[i] = max(dp[i - 1],                 # skip house i
                        dp[i - 2] + nums[i])       # take house i
        return dp[-1]


    print(rob([1, 2, 3, 1]))      # houses 1 and 3
    print(rob([2, 7, 9, 3, 1]))   # houses 1, 3 and 5
    ```

    ``` { .text .output }
    4
    12
    ```

    **Time** O(n). **Space** O(n), which can be reduced to O(1) with two variables, as in Climbing Stairs.

    Table for `[2, 7, 9, 3, 1]`:

    | i | 0 | 1 | 2 | 3 | 4 |
    |---|---|---|---|---|---|
    | nums[i] | 2 | 7 | 9 | 3 | 1 |
    | dp[i] | 2 | 7 | 11 | 11 | 12 |

## In real projects

The same ideas, in software you already use. The trainer opens the session with one of these; read the rest after class.

| What you learn here | Where it runs in real software |
|---|---|
| Graph | A road map, a social network, the web (pages and links), and the list of packages that `pip install` must fetch first. |
| BFS | Fewest hops: the shortest route on a metro map, or "2nd-degree connection" on LinkedIn. |
| DFS | A web crawler following links. Finding everything that depends on a file before you delete it. |
| Grid traversal | The paint-bucket tool in an image editor is Flood Fill. Counting separate regions in a scan is Number of Islands. |
| Dynamic programming | Autocorrect measuring how far a typo is from a real word. A `diff` tool finding the fewest changes between two files. |

### Example: degrees of connection

BFS reaches people in order of distance, so the first time it meets someone is by the shortest chain of friends.

```python
from collections import deque

network = {
    "Asha": ["Ravi", "Meena"],
    "Ravi": ["Asha", "Kiran"],
    "Meena": ["Asha", "Kiran"],
    "Kiran": ["Ravi", "Meena", "Zoya"],
    "Zoya": ["Kiran"],
}


def degrees_from(start):
    degree = {start: 0}
    queue = deque([start])
    while queue:
        person = queue.popleft()
        for friend in network[person]:
            if friend not in degree:                 # first visit is the shortest chain
                degree[friend] = degree[person] + 1
                queue.append(friend)
    return degree


for person, degree in degrees_from("Asha").items():
    print(person, degree)
```

``` { .text .output }
Asha 0
Ravi 1
Meena 1
Kiran 2
Zoya 3
```

## Common mistakes

| Mistake | Fix |
|---|---|
| No `visited` set on a graph | Infinite loop on any cycle. Mark nodes as you add them. |
| Marking visited when a node leaves the queue | The same node is queued many times. Mark it when you add it. |
| Checking `grid[r][c]` before the bounds | `IndexError`, or a silent wrap-around with negative indexes. Check bounds first. |
| Flood fill when the new colour equals the old | Infinite recursion. Return early. |
| Counting diagonal neighbours | Read the statement: usually only four directions |
| Starting DP by writing a table | Write the recursion first, then add memory |
| Wrong base cases | Test `n = 0`, `n = 1` and `n = 2` by hand |

## Interview questions

1. What is the difference between BFS and DFS? When would you use each?
2. What is the difference between an adjacency list and an adjacency matrix? When is each better?
3. What is the time complexity of BFS and DFS?
4. What is the difference between a tree and a graph?
5. What is dynamic programming? What two properties must a problem have?
6. What is the difference between memoisation and tabulation?
7. How is DP different from a greedy approach? How is it different from divide and conquer?

## Commit

`day3/num_islands.py`, `day3/flood_fill.py`, `day3/climb_stairs.py`, `day3/house_robber.py`
