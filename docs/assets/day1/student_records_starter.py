"""Student-record program: starter code.

Keep students.csv in the same folder as this file.
Fill in every TODO, then run:  python student_records_starter.py
"""
import csv


class Student:
    def __init__(self, roll_no, name, marks):
        self.roll_no = roll_no
        self.name = name
        # TODO 1: raise ValueError if marks is not between 0 and 100
        self.marks = marks

    def grade(self):
        # TODO 2: return "A" for 75 and above, "B" for 60 and above,
        #         "C" for 40 and above, otherwise "F"
        pass

    def describe(self):
        return f"{self.roll_no} {self.name}: {self.marks} ({self.grade()})"


class Course:
    def __init__(self, name):
        self.name = name
        self.students = []

    def add_student(self, student):
        self.students.append(student)

    def average(self):
        # TODO 3: return the average marks of the students in this course
        pass

    def topper(self):
        # TODO 4: return the Student with the highest marks
        pass


def load_courses(path):
    """Read the CSV. Return (courses, skipped).

    courses: dict of course name -> Course
    skipped: list of messages, one per bad row
    """
    courses = {}
    skipped = []
    with open(path, newline="") as f:
        for row in csv.DictReader(f):
            # TODO 5: convert row["marks"] to int and create a Student.
            #         Use try/except ValueError. On error, append a message
            #         to skipped and continue with the next row.
            # TODO 6: add the student to the right Course in courses,
            #         creating the Course the first time you see its name.
            pass
    return courses, skipped


def write_report(courses, skipped, path):
    # TODO 7: write one section per course to the file at path:
    #         course name, average, topper, then one line per student.
    #         Finish with the skipped rows.
    pass


if __name__ == "__main__":
    courses, skipped = load_courses("students.csv")
    write_report(courses, skipped, "results.txt")
    print(f"{len(courses)} courses written to results.txt, {len(skipped)} rows skipped")
