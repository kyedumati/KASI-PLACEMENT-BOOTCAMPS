---
lesson: true
category: "Python · Session 1 of 3"
---

# Python basics

<p class="session-meta">60 minutes · Variables, data types, input/output, operators, conditions, loops</p>

## Outcome

You can write a program that takes input, makes decisions with `if`, repeats work with `for` and `while`, and prints a result.

## Time-box

| Minutes | Activity |
|---|---|
| 0 to 5 | Hook: "Write a program to check if a number is prime." Who can do it right now? |
| 5 to 25 | Concepts, typed live |
| 25 to 50 | Lab: 7 programs |
| 50 to 60 | Debrief and common mistakes |

## Concepts

### Variables and data types

A variable is a name for a value. Python works out the type from the value.

```python
name = "Asha"        # str
age = 23             # int
cgpa = 8.4           # float
placed = False       # bool

print(type(age))     # <class 'int'>
print(name, age, cgpa, placed)
```

### Input and output

`input()` always returns a string. Convert it before doing arithmetic.

```python
n = int(input("Enter a number: "))
print("Double is", n * 2)
print(f"{n} squared is {n ** 2}")   # f-string: the cleanest way to format output
```

### Operators

| Kind | Operators | Note |
|---|---|---|
| Arithmetic | `+` `-` `*` `/` `//` `%` `**` | `/` always gives a float. `//` drops the fraction. `%` gives the remainder. |
| Comparison | `==` `!=` `<` `>` `<=` `>=` | Result is `True` or `False` |
| Logical | `and` `or` `not` | Words, not `&&` and `||` |

```python
print(17 / 5)    # 3.4
print(17 // 5)   # 3
print(17 % 5)    # 2
print(2 ** 10)   # 1024
```

!!! tip "Two operators that solve half of today's lab"
    `n % 10` gives the last digit of `n`. `n // 10` removes the last digit.

### Conditions

Indentation is the syntax. Use four spaces.

```python
marks = 72

if marks >= 75:
    grade = "A"
elif marks >= 60:
    grade = "B"
else:
    grade = "C"

print(grade)   # B
```

### Loops

Use `for` when you know how many times to repeat. Use `while` when you repeat until a condition changes.

```python
for i in range(5):          # 0 1 2 3 4
    print(i, end=" ")
print()

for i in range(2, 11, 2):   # start, stop (excluded), step -> 2 4 6 8 10
    print(i, end=" ")
print()

count = 3
while count > 0:
    print("Countdown", count)
    count -= 1
```

`break` leaves the loop. `continue` skips to the next round.

```python
for i in range(1, 10):
    if i == 3:
        continue   # skip 3
    if i == 6:
        break      # stop before 6
    print(i, end=" ")   # 1 2 4 5
print()
```

## Lab

Create a folder `day1` and save each program as its own file.

### 1. Even or odd · Solo

Read a number and print whether it is even or odd.

??? success "Solution"
    ```python
    n = int(input("Enter a number: "))

    if n % 2 == 0:
        print("Even")
    else:
        print("Odd")
    ```

### 2. Largest of three · Solo

Read three numbers and print the largest. Do it with `if`, not with `max()`.

??? success "Solution"
    ```python
    a = int(input("First: "))
    b = int(input("Second: "))
    c = int(input("Third: "))

    if a >= b and a >= c:
        largest = a
    elif b >= c:
        largest = b
    else:
        largest = c

    print("Largest is", largest)
    ```

### 3. Factorial · Solo

Read `n` and print `n!`. For example, `5! = 5 × 4 × 3 × 2 × 1 = 120`.

??? question "Hint"
    Start a variable at 1 and multiply it by every number from 1 to `n`.

??? success "Solution"
    ```python
    n = int(input("Enter n: "))

    result = 1
    for i in range(1, n + 1):
        result *= i

    print(f"{n}! = {result}")
    ```

### 4. Prime check · Live

Read `n` and print whether it is prime. A prime is greater than 1 and divisible only by 1 and itself.

??? question "Hint"
    If `n` has a divisor other than 1 and itself, one of them is at most the square root of `n`. You only need to test up to there.

??? success "Solution"
    ```python
    n = int(input("Enter n: "))

    is_prime = n > 1
    i = 2
    while i * i <= n:
        if n % i == 0:
            is_prime = False
            break
        i += 1

    print("Prime" if is_prime else "Not prime")
    ```

    Testing up to √n makes this O(√n). Testing every number up to `n` is O(n).

### 5. Sum of digits · Solo

Read a non-negative number and print the sum of its digits. `1234` gives `10`.

??? question "Hint"
    Take the last digit with `% 10`, add it, then remove it with `// 10`. Repeat until the number is 0.

??? success "Solution"
    ```python
    n = int(input("Enter a number: "))

    total = 0
    while n > 0:
        total += n % 10
        n //= 10

    print("Sum of digits:", total)
    ```

### 6. Reverse a number · Solo

Read a non-negative number and print its digits reversed. `1234` gives `4321`.

??? question "Hint"
    Same loop as sum of digits. Build the answer with `reversed_n = reversed_n * 10 + digit`.

??? success "Solution"
    ```python
    n = int(input("Enter a number: "))

    reversed_n = 0
    while n > 0:
        reversed_n = reversed_n * 10 + n % 10
        n //= 10

    print("Reversed:", reversed_n)
    ```

### 7. FizzBuzz · Live

Print the numbers 1 to 20. For multiples of 3 print `Fizz`, for multiples of 5 print `Buzz`, and for multiples of both print `FizzBuzz`.

??? success "Solution"
    ```python
    for i in range(1, 21):
        if i % 15 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)
    ```

    The check for 15 must come first. If `i % 3` came first, 15 would print `Fizz` and never reach the other branches.

## Common mistakes

| Mistake | What you see | Fix |
|---|---|---|
| Arithmetic on `input()` without `int()` | `TypeError: can only concatenate str (not "int") to str` | `n = int(input())` |
| `=` instead of `==` in a condition | `SyntaxError: invalid syntax` | `=` assigns, `==` compares |
| Mixed or missing indentation | `IndentationError` | Four spaces, set VS Code to insert spaces |
| Expecting `range(1, 5)` to include 5 | Loop stops at 4 | The stop value is excluded. Use `range(1, 6)`. |
| Forgetting to change the loop variable in `while` | Program never ends | Press ++ctrl+c++, then update the variable inside the loop |

## Interview questions

1. What is the difference between `/` and `//`?
2. Is Python compiled or interpreted? Is it statically or dynamically typed?
3. What does `range(10, 0, -2)` produce?
4. What is the difference between `break` and `continue`?
5. Why is checking divisors up to √n enough for a prime test?

## Commit

Save all seven programs in `day1/`. You will push them in the Linux and Git session.
