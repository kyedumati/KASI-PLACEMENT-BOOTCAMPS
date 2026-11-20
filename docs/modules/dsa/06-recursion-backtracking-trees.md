---
lesson: true
category: "Data Structures and Algorithms · Session 6 of 7"
---

# Recursion, backtracking, trees

<p class="session-meta">60 minutes · Base and recursive case, call-stack tracing, generating subsets, tree traversals, level order, BST search</p>

## Outcome

You can write a recursive function with a correct base case, trace it on paper, generate all subsets with backtracking, and traverse a binary tree both depth-first and level by level.

## Time-box

| Minutes | Activity |
|---|---|
| 0 to 5 | Hook: "What happens when a function calls itself?" |
| 5 to 15 | **Live:** Fibonacci, with the call stack traced on paper |
| 15 to 25 | Backtracking: the choose, explore, un-choose template, with the Subsets decision tree on the board |
| 25 to 35 | Trees: `TreeNode`, the three traversals, BST search |
| 35 to 45 | **Guided:** Maximum Depth of Binary Tree |
| 45 to 57 | **Solo:** Binary Tree Level Order Traversal, then Subsets |
| 57 to 60 | Debrief |

!!! note "Solo problems continue in the evening"
    This session has four problems. Start Level Order Traversal in class. Subsets is drawn on the board in class, and you code it this evening if time runs out.

## Concepts

### Recursion

A recursive function solves a problem by calling itself on a smaller version of the same problem. It needs two parts:

- **Base case:** the smallest input, answered directly. Without it, the function never stops.
- **Recursive case:** reduce the problem and call yourself.

```python
def factorial(n):
    if n <= 1:                      # base case
        return 1
    return n * factorial(n - 1)     # recursive case

print(factorial(4))   # 24
```

**Trace the call stack on paper.** Each call waits for the one below it:

```text
factorial(4)
  4 * factorial(3)
        3 * factorial(2)
              2 * factorial(1)
                    returns 1
              returns 2
        returns 6
  returns 24
```

Every waiting call uses memory on the call stack. So recursion that goes `n` levels deep uses O(n) space, even if you create no variables.

### Backtracking

Backtracking builds every possible answer one choice at a time. After exploring a choice, it undoes the choice and tries the next one.

```text
def backtrack(start, path):
    record path (if it is a complete answer)
    for each choice from start onwards:
        path.append(choice)        # choose
        backtrack(next start, path)   # explore
        path.pop()                 # un-choose
```

The decision tree for the subsets of `[1, 2, 3]`. Every node is one answer:

```text
[]
├── [1]
│   ├── [1, 2]
│   │   └── [1, 2, 3]
│   └── [1, 3]
├── [2]
│   └── [2, 3]
└── [3]
```

### Binary trees

Each node has a value and up to two children, `left` and `right`. The top node is the root. A node with no children is a leaf.

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


#        4
#       / \
#      2   6
#     / \   \
#    1   3   7
root = TreeNode(4,
                TreeNode(2, TreeNode(1), TreeNode(3)),
                TreeNode(6, None, TreeNode(7)))
```

### Depth-first traversals

The three orders differ only in when you visit the node itself.

```python
def inorder(node, out):        # left, node, right
    if node is None:
        return
    inorder(node.left, out)
    out.append(node.val)
    inorder(node.right, out)


def preorder(node, out):       # node, left, right
    if node is None:
        return
    out.append(node.val)
    preorder(node.left, out)
    preorder(node.right, out)


def postorder(node, out):      # left, right, node
    if node is None:
        return
    postorder(node.left, out)
    postorder(node.right, out)
    out.append(node.val)


result = []
inorder(root, result)
print(result)      # [1, 2, 3, 4, 6, 7]
```

For the tree above: preorder is `[4, 2, 1, 3, 6, 7]` and postorder is `[1, 3, 2, 7, 6, 4]`.

### Binary search tree

A BST is a binary tree with an ordering rule: everything in the left subtree is smaller than the node, and everything in the right subtree is larger. The tree above is a BST, which is why its inorder traversal came out sorted.

Searching a BST is binary search on a tree: at each node, go left or right.

```python
def search_bst(node, target):
    while node:
        if target == node.val:
            return node
        node = node.left if target < node.val else node.right
    return None

print(search_bst(root, 3).val)    # 3
print(search_bst(root, 5))        # None
```

Search is O(h), where h is the height: O(log n) for a balanced tree, and O(n) in the worst case when the tree is a single chain.

## Problems

### Fibonacci · Live

[LeetCode 509](https://leetcode.com/problems/fibonacci-number/)

`F(0) = 0`, `F(1) = 1`, and `F(n) = F(n - 1) + F(n - 2)`. Return `F(n)`.

`n = 4` → `3`. `n = 10` → `55`.

??? success "Solution"
    ```python
    def fib(n):
        if n < 2:                        # base cases: F(0) = 0, F(1) = 1
            return n
        return fib(n - 1) + fib(n - 2)
    ```

    **Time** O(2ⁿ). **Space** O(n) for the call stack.

    Draw the call tree for `fib(5)`. `fib(3)` is computed twice and `fib(2)` three times. This repeated work is the problem that dynamic programming solves in the next session.

### Maximum Depth of Binary Tree · Guided

[LeetCode 104](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

Return the number of nodes on the longest path from the root down to a leaf.

For the example tree above → `3`. For an empty tree → `0`.

??? question "Hint"
    Trust the recursion: assume the function already works for the left and right subtrees. The depth of a tree is 1 plus the deeper of its two subtrees. What is the depth of an empty tree?

??? success "Solution"
    ```python
    def max_depth(root):
        if root is None:
            return 0
        return 1 + max(max_depth(root.left), max_depth(root.right))
    ```

    **Time** O(n): every node is visited once. **Space** O(h) for the call stack.

### Binary Tree Level Order Traversal · Solo

[LeetCode 102](https://leetcode.com/problems/binary-tree-level-order-traversal/)

Return the node values level by level, from top to bottom, with each level as its own list, left to right.

For the example tree above → `[[4], [2, 6], [1, 3, 7]]`

??? question "Hint 1"
    "Level by level" means breadth-first search, which uses a queue.

??? question "Hint 2"
    At the start of each round, the queue holds exactly one level. Record its length, and process exactly that many nodes.

??? success "Solution"
    ```python
    from collections import deque


    def level_order(root):
        if root is None:
            return []

        result = []
        queue = deque([root])
        while queue:
            level = []
            for _ in range(len(queue)):       # exactly one level
                node = queue.popleft()
                level.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            result.append(level)
        return result
    ```

    **Time** O(n). **Space** O(n) for the queue.

### Subsets · Solo

[LeetCode 78](https://leetcode.com/problems/subsets/)

`nums` holds distinct integers. Return every possible subset, in any order.

`[1, 2, 3]` → `[[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]`

??? question "Hint 1"
    Use the backtracking template. Every `path` you reach is a valid subset, so record it at every call.

??? question "Hint 2"
    Record a **copy** of the path, `path[:]`. If you append `path` itself, every entry in the result is the same list, and it ends up empty.

??? success "Solution"
    ```python
    def subsets(nums):
        result = []
        path = []

        def backtrack(start):
            result.append(path[:])            # record a copy
            for i in range(start, len(nums)):
                path.append(nums[i])          # choose
                backtrack(i + 1)              # explore
                path.pop()                    # un-choose

        backtrack(0)
        return result
    ```

    **Time** O(n × 2ⁿ): there are 2ⁿ subsets and copying each costs up to n. **Space** O(n) for the recursion, not counting the output.

## Common mistakes

| Mistake | What you see | Fix |
|---|---|---|
| Missing or unreachable base case | `RecursionError: maximum recursion depth exceeded` | Write the base case first |
| Not checking for `None` in a tree function | `AttributeError: 'NoneType' object has no attribute 'left'` | Start with `if node is None: return` |
| `result.append(path)` in backtracking | A result full of empty lists | Append `path[:]` |
| Forgetting `path.pop()` | Subsets grow and never shrink | Every `append` needs a matching `pop` |
| Not fixing the level size before the inner loop | Levels are mixed together | `for _ in range(len(queue))` |
| Forgetting `return` on the recursive call | The function returns `None` | `return 1 + max(...)` |

## Interview questions

1. What are the two parts of every recursive function?
2. What is a stack overflow, and what causes it in recursion?
3. What is the difference between recursion and iteration? When would you choose each?
4. Name the three depth-first traversals. Which one gives sorted output on a BST?
5. What is the difference between a binary tree and a binary search tree?
6. What is the time complexity of search in a BST? What is the worst case?
7. What is the difference between DFS and BFS on a tree? Which data structure does each use?

## Commit

`day3/fibonacci.py`, `day3/max_depth.py`, `day3/level_order.py`, `day3/subsets.py`
