---
lesson: true
category: "Data Structures and Algorithms · Session 5 of 7"
---

# Stacks, queues, linked lists

<p class="session-meta">60 minutes · Stack and queue with list and deque, singly linked list built from a Node class</p>

## Outcome

You can use a stack and a queue in Python, build a linked list from a `Node` class, and rewire its pointers without losing nodes.

## Time-box

| Minutes | Activity |
|---|---|
| 0 to 5 | Hook: "How does your editor know that a bracket is not closed?" |
| 5 to 12 | Stack and queue |
| 12 to 22 | **Live:** Valid Parentheses |
| 22 to 30 | Linked list: the `Node` class, building and walking |
| 30 to 43 | **Guided:** Reverse Linked List, drawn on the board first |
| 43 to 55 | **Solo:** Merge Two Sorted Lists |
| 55 to 60 | Debrief |

## Concepts

![A stack pushes and pops at the top. A queue adds at the back and removes from the front](../../assets/diagrams/stack-queue-light.svg#only-light){ .ksr-diagram }
![A stack pushes and pops at the top. A queue adds at the back and removes from the front](../../assets/diagrams/stack-queue-dark.svg#only-dark){ .ksr-diagram }

### Stack: last in, first out

Think of a pile of plates. You add and remove at the top. A Python list is a stack if you only use `append` and `pop`.

```python
stack = []
stack.append(1)        # push
stack.append(2)
stack.append(3)
print(stack[-1])       # peek at the top -> 3
print(stack.pop())     # pop -> 3
print(stack)           # [1, 2]
print(not stack)       # is it empty? -> False
```

``` { .text .output }
3
3
[1, 2]
False
```

All four operations are O(1).

### Queue: first in, first out

Think of a line at a counter. You add at the back and remove from the front. Use `deque`, because `list.pop(0)` is O(n): it shifts every remaining element.

```python
from collections import deque

queue = deque()
queue.append("A")          # enqueue at the back
queue.append("B")
queue.append("C")
print(queue.popleft())     # dequeue from the front -> A
print(queue)               # deque(['B', 'C'])
```

``` { .text .output }
A
deque(['B', 'C'])
```

### Linked list

A linked list is a chain of nodes. Each node holds a value and a reference to the next node. The last node points to `None`.

![A linked list: head points to node 1, which points to node 2, then node 3, then None](../../assets/diagrams/linked-list-light.svg#only-light){ .ksr-diagram }
![A linked list: head points to node 1, which points to node 2, then node 3, then None](../../assets/diagrams/linked-list-dark.svg#only-dark){ .ksr-diagram }

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def build_list(values):
    """[1, 2, 3] -> 1 -> 2 -> 3 -> None. Returns the head."""
    dummy = ListNode()
    tail = dummy
    for v in values:
        tail.next = ListNode(v)
        tail = tail.next
    return dummy.next


def to_list(head):
    """Walk the chain and collect the values."""
    values = []
    current = head
    while current:
        values.append(current.val)
        current = current.next
    return values


head = build_list([1, 2, 3])
print(to_list(head))       # [1, 2, 3]
```

``` { .text .output }
[1, 2, 3]
```

Keep `build_list` and `to_list` in a file. LeetCode gives you the head node, but on your own machine you need these two helpers to test.

| | Array (Python list) | Linked list |
|---|---|---|
| Read the i-th element | O(1) | O(n): walk from the head |
| Insert or delete at the front | O(n) | O(1) |
| Insert or delete in the middle, given the node | O(n) | O(1) |
| Memory | Compact | Extra reference per node |

!!! tip "The dummy node trick"
    When you build a new list, start with a throwaway `dummy` node and attach to it. At the end, return `dummy.next`. This removes the special case for "the list is empty so far".

## In real projects

The same ideas, in software you already use. The trainer opens the session with one of these; read the rest after class.

| What you learn here | Where it runs in real software |
|---|---|
| Stack | Undo in an editor, the Back button in a browser, and the call stack that runs your functions. |
| Stack for matching pairs | VS Code highlighting an unclosed bracket. A compiler checking that every `{` has a `}`. |
| Queue | A print queue, a customer-support ticket line, and background job queues such as Celery or Kafka. |
| Linked list | Next and previous in a music playlist. The "least recently used" list inside a cache. |

### Example: the Back button and a ticket queue

The browser history is a stack: the last page you opened is the first one you leave. A support desk is a queue: the first ticket raised is the first one served.

```python
from collections import deque

pages = []                               # a stack
for page in ["home", "courses", "python", "lab-1"]:
    pages.append(page)                   # visiting a page pushes it

pages.pop()                              # Back
pages.pop()                              # Back
print("Now on:", pages[-1])

tickets = deque(["T1", "T2", "T3"])      # a queue
tickets.append("T4")                     # a new ticket joins at the back
print("Serving:", tickets.popleft())     # the oldest ticket is served first
print("Waiting:", list(tickets))
```

``` { .text .output }
Now on: courses
Serving: T1
Waiting: ['T2', 'T3', 'T4']
```

## Problems

### Valid Parentheses · Live

[LeetCode 20](https://leetcode.com/problems/valid-parentheses/)

The string contains only `(`, `)`, `{`, `}`, `[` and `]`. Return `True` if every opening bracket is closed by the same type of bracket, in the correct order.

`"()[]{}"` → `True`. `"([)]"` → `False`. `"(("` → `False`.

??? question "Hint"
    The most recently opened bracket must be the first one closed. "Most recent first" means a stack.

??? success "Solution"
    ```python
    def is_valid(s):
        pairs = {")": "(", "]": "[", "}": "{"}
        stack = []
        for ch in s:
            if ch in pairs:                              # a closing bracket
                if not stack or stack.pop() != pairs[ch]:
                    return False
            else:                                        # an opening bracket
                stack.append(ch)
        return not stack                                 # nothing left open


    for text in ["()[]{}", "{[]}", "([)]", "(("]:
        print(text, is_valid(text))
    ```

    ``` { .text .output }
    ()[]{} True
    {[]} True
    ([)] False
    (( False
    ```

    **Time** O(n). **Space** O(n).

    Two edge cases fail most first attempts: a closing bracket when the stack is empty, such as `")"`, and brackets left open at the end, such as `"(("`.

### Reverse Linked List · Guided

[LeetCode 206](https://leetcode.com/problems/reverse-linked-list/)

Reverse a singly linked list and return the new head.

`1 → 2 → 3 → None` becomes `3 → 2 → 1 → None`

??? question "Hint 1"
    Walk the list once. At each node, make its `next` point backwards.

??? question "Hint 2"
    When you change `current.next`, you lose the rest of the list. Save it in a variable first. You need three names: `prev`, `current` and `next_node`.

??? success "Solution"
    ```python
    def reverse_list(head):
        prev = None
        current = head
        while current:
            next_node = current.next    # 1. save the rest
            current.next = prev         # 2. reverse the link
            prev = current              # 3. move prev forward
            current = next_node         # 4. move current forward
        return prev


    head = build_list([1, 2, 3, 4, 5])
    print(to_list(reverse_list(head)))
    ```

    ``` { .text .output }
    [5, 4, 3, 2, 1]
    ```

    **Time** O(n). **Space** O(1).

    Trace for `1 → 2 → 3`:

    | Step | prev | current | Links so far |
    |---|---|---|---|
    | Start | None | 1 | `1 → 2 → 3` |
    | After 1st loop | 1 | 2 | `1 → None`, `2 → 3` |
    | After 2nd loop | 2 | 3 | `2 → 1 → None`, `3` |
    | After 3rd loop | 3 | None | `3 → 2 → 1 → None` |

### Merge Two Sorted Lists · Solo

[LeetCode 21](https://leetcode.com/problems/merge-two-sorted-lists/)

Given the heads of two sorted linked lists, join them into one sorted list and return its head. Reuse the existing nodes.

`1 → 2 → 4` and `1 → 3 → 4` → `1 → 1 → 2 → 3 → 4 → 4`

??? question "Hint"
    Use a dummy node and a `tail` pointer. Repeatedly attach the smaller of the two front nodes. When one list runs out, attach the rest of the other in one step.

??? success "Solution"
    ```python
    def merge_two_lists(list1, list2):
        dummy = ListNode()
        tail = dummy

        while list1 and list2:
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next

        tail.next = list1 or list2      # attach whatever is left
        return dummy.next


    merged = merge_two_lists(build_list([1, 2, 4]), build_list([1, 3, 4]))
    print(to_list(merged))
    ```

    ``` { .text .output }
    [1, 1, 2, 3, 4, 4]
    ```

    **Time** O(m + n). **Space** O(1).

    This is the merge step of merge sort, on linked lists.

## Common mistakes

| Mistake | Fix |
|---|---|
| `stack.pop()` on an empty stack | `IndexError`. Check `if not stack` first. |
| Using `list.pop(0)` as a queue | It is O(n). Use `deque.popleft()`. |
| `AttributeError: 'NoneType' object has no attribute 'next'` | You walked past the end. Check `while current:` before reading `current.next`. |
| Reversing a link before saving the next node | The rest of the list is lost. Save `next_node` first. |
| Returning `head` after reversing | The old head is now the tail. Return `prev`. |

## Interview questions

1. What is the difference between a stack and a queue? Give a real use of each.
2. Where does the operating system or a programming language use a stack?
3. Compare an array and a linked list for access, insertion and deletion.
4. Why is `collections.deque` preferred over a list for a queue?
5. How would you detect a cycle in a linked list?
6. Follow-up: reverse a linked list recursively.

## Commit

`day2/valid_parentheses.py`, `day2/reverse_linked_list.py`, `day2/merge_two_lists.py`
