---
lesson: true
category: "Python · Session 3 of 3"
---

# Functions, files, OOP

<p class="session-meta">60 minutes · Functions, arguments, scope, files, try/except, classes, the four OOP pillars</p>

## Outcome

You can split a program into functions and classes, read and write files, and keep the program running when the input is bad. You can also explain the four OOP pillars with an example, which is one of the most common interview questions.

## Time-box

| Minutes | Activity |
|---|---|
| 0 to 5 | Hook: "Explain the four pillars of OOP with an example." |
| 5 to 15 | Functions, scope, files, try/except |
| 15 to 25 | Classes and the four pillars |
| 25 to 52 | Lab: student-record program, from starter code |
| 52 to 60 | Debrief |

!!! warning "This session is dense"
    Download the starter code and the CSV before the session starts. The lab is built to be finished from the starter in 25 minutes. Writing it from a blank file takes longer than the slot.

## Concepts

### Functions and arguments

```python
def area(length, width=1):        # width has a default value
    """Return the area of a rectangle."""
    return length * width

print(area(5, 3))                 # positional arguments -> 15
print(area(5))                    # default used -> 5
print(area(width=2, length=4))    # keyword arguments -> 8
```

``` { .text .output }
15
5
8
```

A function that has no `return` gives back `None`. Printing a value is not the same as returning it.

### Scope

A variable created inside a function exists only inside it.

```python
total = 100          # global

def add_bonus():
    total = 5        # a new local variable; the global is untouched
    return total

print(add_bonus(), total)   # 5 100
```

``` { .text .output }
5 100
```

Pass values in as arguments and get results back with `return`. Avoid the `global` keyword.

### Files

`with` closes the file for you, even if an error occurs.

```python
with open("notes.txt", "w") as f:      # "w" overwrites, "a" appends, "r" reads
    f.write("Day 1 done\n")
    f.write("Day 2 next\n")

with open("notes.txt") as f:
    for line in f:
        print(line.strip())
```

``` { .text .output }
Day 1 done
Day 2 next
```

### Handling errors

Code that can fail goes in `try`. What to do about the failure goes in `except`. Catch the specific error you expect.

```python
def to_marks(text):
    try:
        return int(text)
    except ValueError:
        print(f"Bad marks value: {text!r}")
        return None

print(to_marks("88"))    # 88
print(to_marks("abc"))   # Bad marks value: 'abc' then None
```

``` { .text .output }
88
Bad marks value: 'abc'
None
```

| Error | Raised when |
|---|---|
| `ValueError` | The type is right but the value is not: `int("abc")` |
| `TypeError` | The type is wrong: `"a" + 1` |
| `KeyError` | A dictionary key does not exist |
| `IndexError` | A list index is out of range |
| `FileNotFoundError` | The file you opened for reading does not exist |
| `ZeroDivisionError` | Division by zero |

### Classes and objects

A class is a blueprint. An object is one thing built from it. `__init__` runs when the object is created, and `self` is the object itself.

```python
class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance      # leading underscore: internal, do not touch from outside

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self._balance += amount

    @property
    def balance(self):               # read-only access
        return self._balance


acc = Account("Asha")
acc.deposit(500)
print(acc.owner, acc.balance)        # Asha 500
```

``` { .text .output }
Asha 500
```

### The four pillars

| Pillar | One-line meaning | In the code below |
|---|---|---|
| **Encapsulation** | Keep data and the methods that guard it together; hide the internals | `Account._balance` can only change through `deposit()` |
| **Abstraction** | Show what an object does, hide how | `Shape` says every shape has an `area()`, without saying how |
| **Inheritance** | A class reuses and extends another class | `Circle` and `Rectangle` are both a `Shape` |
| **Polymorphism** | The same call behaves differently depending on the object | `shape.area()` runs different code for each shape |

```python
from abc import ABC, abstractmethod


class Shape(ABC):                     # abstraction: a contract, not a real shape
    def __init__(self, name):
        self.name = name

    @abstractmethod
    def area(self):
        pass

    def describe(self):
        return f"{self.name} with area {self.area():.2f}"


class Rectangle(Shape):               # inheritance
    def __init__(self, length, width):
        super().__init__("Rectangle")
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width


class Circle(Shape):
    def __init__(self, radius):
        super().__init__("Circle")
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2


for shape in [Rectangle(4, 5), Circle(1)]:
    print(shape.describe())           # polymorphism: same call, different area()
```

``` { .text .output }
Rectangle with area 20.00
Circle with area 3.14
```

`Shape("x")` raises `TypeError`, because an abstract class cannot be instantiated.

## In real projects

The same ideas, in software you already use. The trainer opens the session with one of these; read the rest after class.

| What you learn here | Where it runs in real software |
|---|---|
| Functions | One `is_valid_email()` function, called from the sign-up page, the profile page and the admin page. |
| Files | Reading a config file at start-up, writing a log, importing a CSV exported from Excel. |
| `try` / `except` | A payment call times out. The app catches the error, tells the user, and does not crash. |
| Class and object | `User`, `Order`, `Product`: every table in a web application has a class like these. |
| Encapsulation | A bank account's balance changes only through `deposit()` and `withdraw()`, which check the rules. |
| Inheritance and polymorphism | UPI, card and wallet are all payments. The checkout code calls `pay()` and does not care which one it has. |

### Example: one checkout, many ways to pay

The loop at the bottom is the checkout. It calls `pay()` on whatever it is given. Adding a wallet payment later means writing one new class; the checkout code does not change.

```python
class Payment:
    def __init__(self, amount):
        self.amount = amount

    def pay(self):
        raise NotImplementedError("each payment type writes its own pay()")


class UpiPayment(Payment):
    def pay(self):
        return f"Paid ₹{self.amount} by UPI"


class CardPayment(Payment):
    def pay(self):
        fee = self.amount * 0.02
        return f"Paid ₹{self.amount} by card, fee ₹{fee:.2f}"


for payment in [UpiPayment(500), CardPayment(1200)]:
    print(payment.pay())
```

``` { .text .output }
Paid ₹500 by UPI
Paid ₹1200 by card, fee ₹24.00
```

## Lab: student-record program

Download both files into your `day1` folder:

- [student_records_starter.py](../../assets/day1/student_records_starter.py){ download }
- [students.csv](../../assets/day1/students.csv){ download }

**The task.** `students.csv` has one row per student: roll number, name, course and marks. Three rows are bad on purpose. Your program must:

1. Read the CSV.
2. Model the data with a `Student` class and a `Course` class.
3. Compute a grade for each student: **A** for 75 and above, **B** for 60 and above, **C** for 40 and above, otherwise **F**.
4. Skip bad rows without crashing, and remember which rows were skipped.
5. Write a report to `results.txt`.

The starter code has seven `TODO` markers. Do them in order.

| TODO | What to write | How it is done |
|---|---|---|
| 1 and 2 | Validate marks, compute the grade | Live |
| 5 | Convert marks inside `try`/`except` | Live |
| 3, 4, 6 | `average()`, `topper()`, group students by course | Solo |
| 7 | Write the report file | Solo |

??? question "Hint for TODO 4"
    `max()` accepts a `key` function: `max(self.students, key=lambda s: s.marks)`.

??? question "Hint for TODO 6"
    ```text
    if the course name is not in courses:
        courses[name] = Course(name)
    courses[name].add_student(student)
    ```

??? success "Solution"
    ```python
    import csv


    class Student:
        def __init__(self, roll_no, name, marks):
            self.roll_no = roll_no
            self.name = name
            if not 0 <= marks <= 100:
                raise ValueError(f"marks out of range: {marks}")
            self.marks = marks

        def grade(self):
            if self.marks >= 75:
                return "A"
            if self.marks >= 60:
                return "B"
            if self.marks >= 40:
                return "C"
            return "F"

        def describe(self):
            return f"{self.roll_no} {self.name}: {self.marks} ({self.grade()})"


    class Course:
        def __init__(self, name):
            self.name = name
            self.students = []

        def add_student(self, student):
            self.students.append(student)

        def average(self):
            total = sum(s.marks for s in self.students)
            return total / len(self.students)

        def topper(self):
            return max(self.students, key=lambda s: s.marks)


    def load_courses(path):
        courses = {}
        skipped = []
        with open(path, newline="") as f:
            for row in csv.DictReader(f):
                try:
                    student = Student(row["roll_no"], row["name"], int(row["marks"]))
                except ValueError as error:
                    skipped.append(f"{row['roll_no']} {row['name']}: {error}")
                    continue

                name = row["course"]
                if name not in courses:
                    courses[name] = Course(name)
                courses[name].add_student(student)
        return courses, skipped


    def write_report(courses, skipped, path):
        with open(path, "w") as f:
            for course in courses.values():
                f.write(f"{course.name}\n")
                f.write(f"  Average: {course.average():.1f}\n")
                f.write(f"  Topper:  {course.topper().name}\n")
                for student in course.students:
                    f.write(f"  {student.describe()}\n")
                f.write("\n")

            f.write(f"Skipped rows: {len(skipped)}\n")
            for message in skipped:
                f.write(f"  {message}\n")


    if __name__ == "__main__":
        courses, skipped = load_courses("students.csv")
        write_report(courses, skipped, "results.txt")
        print(f"{len(courses)} courses written to results.txt, {len(skipped)} rows skipped")
    ```

    ``` { .text .output }
    3 courses written to results.txt, 3 rows skipped
    ```

    Then look at the report it wrote:

    ```python
    with open("results.txt") as f:
        print(f.read())
    ```

    ``` { .text .output }
    AIML
      Average: 58.5
      Topper:  Asha Verma
      M101 Asha Verma: 88 (A)
      M102 Ravi Kumar: 67 (B)
      M105 Arjun Singh: 45 (C)
      M111 Rahul Jain: 34 (F)

    Cyber Security
      Average: 75.0
      Topper:  Meena Iyer
      M103 Meena Iyer: 91 (A)
      M108 Sneha Gupta: 58 (C)
      M112 Nisha Reddy: 76 (A)

    Data Science
      Average: 77.5
      Topper:  Pooja Shah
      M106 Divya Nair: 73 (B)
      M110 Pooja Shah: 82 (A)

    Skipped rows: 3
      M104 Zoya Khan: invalid literal for int() with base 10: 'abc'
      M107 Kiran Rao: invalid literal for int() with base 10: ''
      M109 Vikram Das: marks out of range: 120
    ```

**Expected result.** The program prints `3 courses written to results.txt, 3 rows skipped`. In `results.txt`, the AIML average is `58.5` and its topper is Asha Verma.

!!! tip "If you finish early"
    Create the file-not-found case: rename the CSV and run the program. Then catch `FileNotFoundError` and print a helpful message instead of a traceback.

## Common mistakes

| Mistake | What you see | Fix |
|---|---|---|
| Forgetting `self` in a method definition | `TypeError: takes 0 positional arguments but 1 was given` | Every method's first parameter is `self` |
| `print` instead of `return` | The caller gets `None` | `return` the value; print it where you call the function |
| Bare `except:` | Real bugs are silently hidden | Name the error: `except ValueError:` |
| A mutable default such as `def f(items=[])` | The list is shared between calls | Use `items=None`, then `if items is None: items = []` |
| Running the script from another folder | `FileNotFoundError: students.csv` | Open the `day1` folder in the terminal first |
| Opening with `"w"` when you meant to add | Old contents are gone | Use `"a"` to append |

## Interview questions

1. Explain the four pillars of OOP, each with a one-line example.
2. What is the difference between a class and an object?
3. What is `self`? What is `__init__`?
4. In the `Shape` example, what does `super().__init__(...)` do? Why can `Shape` itself not be created?
5. What goes in `try` and what goes in `except`? Why name the error, such as `except ValueError`, and not use a bare `except`?
6. Why is `with open(...)` preferred over calling `open()` and `close()` yourself?

## Commit

Save your finished program as `day1/student_records.py`, with `students.csv` beside it. You will push the whole folder in the Linux and Git session.
