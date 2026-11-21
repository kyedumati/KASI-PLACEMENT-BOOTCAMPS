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

``` { .text .output }
<class 'int'>
Asha 23 8.4 False
```

### Input and output

`input()` always returns a string. Convert it before doing arithmetic.

```python
n = int(input("Enter a number: "))
print("Double is", n * 2)
print(f"{n} squared is {n ** 2}")   # f-string: the cleanest way to format output
```

``` { .text .output }
Enter a number: 7
Double is 14
7 squared is 49
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

``` { .text .output }
3.4
3
2
1024
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

``` { .text .output }
B
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

``` { .text .output }
0 1 2 3 4
2 4 6 8 10
Countdown 3
Countdown 2
Countdown 1
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

``` { .text .output }
1 2 4 5
```

## In real projects

The same ideas, in software you already use. The trainer opens the session with one of these; read the rest after class.

| What you learn here | Where it runs in real software |
|---|---|
| `if` / `elif` / `else` | An ATM checks the balance before it pays out. A login page locks the account after three wrong passwords. |
| `for` loop | A payroll job runs once a month and loops over every employee to compute a salary. |
| `while` loop | A food-delivery app keeps asking the server "where is my order?" until the status is Delivered. |
| `//` and `%` | Splitting 135 minutes into 2 h 15 min, counting pages of search results, working out which notes an ATM gives. |
| `int(input())` | Every form field arrives as text. The server converts it before doing arithmetic, exactly as you do here. |

### Example: which notes does the ATM give?

An ATM has ₹500, ₹200 and ₹100 notes. `//` says how many notes of one kind fit, and `%` says what is still left to pay.

```python
amount = 3800

for note in [500, 200, 100]:
    count = amount // note      # how many notes of this kind
    amount = amount % note      # what is still left to pay
    print(f"₹{note} x {count}")
```

``` { .text .output }
₹500 x 7
₹200 x 1
₹100 x 1
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

    ``` { .text .output }
    Enter a number: 7
    Odd
    ```

### 2. Largest of three · Solo

Read three numbers and print the largest. Do it with `if`, not with `max()`.

??? success "Solution"
    <!-- input: 12, 45, 7 -->
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

    ``` { .text .output }
    First: 12
    Second: 45
    Third: 7
    Largest is 45
    ```

### 3. Factorial · Solo

Read `n` and print `n!`. For example, `5! = 5 × 4 × 3 × 2 × 1 = 120`.

??? question "Hint"
    Start a variable at 1 and multiply it by every number from 1 to `n`.

??? success "Solution"
    <!-- input: 5 -->
    ```python
    n = int(input("Enter n: "))

    result = 1
    for i in range(1, n + 1):
        result *= i

    print(f"{n}! = {result}")
    ```

    ``` { .text .output }
    Enter n: 5
    5! = 120
    ```

### 4. Prime check · Live

Read `n` and print whether it is prime. A prime is greater than 1 and divisible only by 1 and itself.

??? question "Hint"
    If `n` has a divisor other than 1 and itself, one of them is at most the square root of `n`. You only need to test up to there.

??? success "Solution"
    <!-- input: 29 -->
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

    ``` { .text .output }
    Enter n: 29
    Prime
    ```

    Testing up to √n makes this O(√n). Testing every number up to `n` is O(n).

### 5. Sum of digits · Solo

Read a non-negative number and print the sum of its digits. `1234` gives `10`.

??? question "Hint"
    Take the last digit with `% 10`, add it, then remove it with `// 10`. Repeat until the number is 0.

??? success "Solution"
    <!-- input: 1234 -->
    ```python
    n = int(input("Enter a number: "))

    total = 0
    while n > 0:
        total += n % 10
        n //= 10

    print("Sum of digits:", total)
    ```

    ``` { .text .output }
    Enter a number: 1234
    Sum of digits: 10
    ```

### 6. Reverse a number · Solo

Read a non-negative number and print its digits reversed. `1234` gives `4321`.

??? question "Hint"
    Same loop as sum of digits. Build the answer with `reversed_n = reversed_n * 10 + digit`.

??? success "Solution"
    <!-- input: 1234 -->
    ```python
    n = int(input("Enter a number: "))

    reversed_n = 0
    while n > 0:
        reversed_n = reversed_n * 10 + n % 10
        n //= 10

    print("Reversed:", reversed_n)
    ```

    ``` { .text .output }
    Enter a number: 1234
    Reversed: 4321
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

    ``` { .text .output }
    1
    2
    Fizz
    4
    Buzz
    Fizz
    7
    8
    Fizz
    Buzz
    11
    Fizz
    13
    14
    FizzBuzz
    16
    17
    Fizz
    19
    Buzz
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
2. What type does `input()` return? What must you do before using it in arithmetic?
3. What does `range(10, 0, -2)` produce?
4. What is the difference between `break` and `continue`?
5. Why is checking divisors up to √n enough for a prime test?

## Commit

Save all seven programs in `day1/`. You will push them in the Linux and Git session.
