"""Run every ```python block in docs/modules and check the solutions.

Usage:  python tests/check_code_blocks.py                   check everything
        python tests/check_code_blocks.py --write-outputs   refresh the Output boxes

All blocks on one page share a namespace and run top to bottom, the way a
student would type them. input() is replaced with canned answers. After a
page has run, the CHECKS for that page assert on the functions it defined.

Every Python block must print something, and the Output box under it must be
exactly what the block prints. The boxes are written by --write-outputs, never
by hand.
"""
import builtins
import contextlib
import io
import os
import re
import shutil
import sys
import tempfile
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MODULES = ROOT / "docs" / "modules"
DAY1_ASSETS = ROOT / "docs" / "assets" / "day1"

FENCE_OPEN = re.compile(r"^(\s*)```python\s*$")
FENCE_CLOSE = re.compile(r"^\s*```\s*$")
OUTPUT_OPEN = re.compile(r"^\s*``` \{ \.text \.output \}\s*$")
INPUT_NOTE = re.compile(r"^\s*<!-- input: (.*?) -->\s*$")
OUTPUT_FENCE = "``` { .text .output }"


def python_blocks(path):
    """Return the page's lines and one record per ```python block.

    A line `<!-- input: 12, 45 -->` directly above a block gives the answers
    that input() returns inside it. Without one, input() returns "7".
    """
    lines = path.read_text().splitlines()
    blocks, current = [], None
    for index, line in enumerate(lines):
        if current is None:
            match = FENCE_OPEN.match(line)
            if match:
                note = INPUT_NOTE.match(lines[index - 1]) if index else None
                current = {
                    "open": index,
                    "indent": match.group(1),
                    "body": [],
                    "inputs": [a.strip() for a in note.group(1).split(",")] if note else [],
                }
        elif FENCE_CLOSE.match(line):
            current["close"] = index
            current["code"] = textwrap.dedent("\n".join(current.pop("body")))
            blocks.append(current)
            current = None
        else:
            current["body"].append(line)
    return lines, blocks


def run_page(path):
    """Execute the page's blocks. Return (namespace, list of stdout per block)."""
    namespace = {"__name__": "__main__"}
    outputs = []
    _, blocks = python_blocks(path)
    for block in blocks:
        answers = list(block["inputs"])

        def fake_input(prompt=""):
            answer = answers.pop(0) if answers else "7"
            print(f"{prompt}{answer}")          # what the terminal would show
            return answer

        builtins.input = fake_input
        buffer = io.StringIO()
        line = block["open"] + 1
        try:
            with contextlib.redirect_stdout(buffer):
                exec(compile(block["code"], f"{path.name}:{line}", "exec"), namespace)
        except Exception as error:
            raise AssertionError(f"{path.name} line {line}: {type(error).__name__}: {error}")
        outputs.append(buffer.getvalue())
    return namespace, outputs


def with_outputs(path, outputs):
    """Return the page text with an Output box after every Python block.

    An existing Output box directly below a block is replaced, so running
    this twice changes nothing. Returns (text, line numbers of silent blocks).
    """
    lines, blocks = python_blocks(path)
    result, silent, cursor = [], [], 0
    for block, output in zip(blocks, outputs):
        result.extend(lines[cursor:block["close"] + 1])
        cursor = block["close"] + 1

        # Skip an Output box that is already there
        probe = cursor
        while probe < len(lines) and not lines[probe].strip():
            probe += 1
        if probe < len(lines) and OUTPUT_OPEN.match(lines[probe]):
            probe += 1
            while not FENCE_CLOSE.match(lines[probe]):
                probe += 1
            cursor = probe + 1

        shown = [l.rstrip() for l in output.rstrip("\n").split("\n")]
        if not output.strip():
            silent.append(block["open"] + 1)
            continue
        indent = block["indent"]
        result.append("")
        result.append(indent + OUTPUT_FENCE)
        result.extend((indent + l) if l else "" for l in shown)
        result.append(indent + "```")
    result.extend(lines[cursor:])
    return "\n".join(result) + "\n", silent


# ---------------------------------------------------------------- checks

def check_basics(ns, out):
    text = "\n".join(out)
    assert "Odd" in text                      # even/odd with n = 7
    assert "Largest is 45" in text            # inputs 12, 45, 7
    assert "5! = 120" in text
    assert "Prime" in text and "Not prime" not in text   # n = 29
    assert "Sum of digits: 10" in text        # n = 1234
    assert "Reversed: 4321" in text
    fizz = out[-1].split()
    assert fizz[:5] == ["1", "2", "Fizz", "4", "Buzz"] and fizz[14] == "FizzBuzz" and len(fizz) == 20


def check_data_structures(ns, out):
    text = "\n".join(out)
    assert "[3, 1, 2, 5]" in text             # remove duplicates
    assert text.count("\n30\n") >= 1 and ns["second"] == 30
    assert ns["count"]["the"] == 3            # word count


def check_oop(ns, out):
    courses, skipped = ns["load_courses"]("students.csv")
    assert set(courses) == {"AIML", "Cyber Security", "Data Science"}
    assert len(skipped) == 3
    assert courses["AIML"].average() == 58.5
    assert courses["AIML"].topper().name == "Asha Verma"
    assert ns["Student"]("X", "Y", 75).grade() == "A"
    assert ns["Student"]("X", "Y", 60).grade() == "B"
    assert ns["Student"]("X", "Y", 40).grade() == "C"
    assert ns["Student"]("X", "Y", 39).grade() == "F"
    assert "3 courses written to results.txt, 3 rows skipped" in "\n".join(out)
    report = Path("results.txt").read_text()
    assert "Average: 58.5" in report and "Skipped rows: 3" in report
    try:
        ns["Shape"]("x")
    except TypeError:
        pass
    else:
        raise AssertionError("Shape should be abstract")


def check_arrays(ns, out):
    assert ns["running_sum"]([1, 2, 3, 4]) == [1, 3, 6, 10]
    assert ns["max_profit"]([7, 1, 5, 3, 6, 4]) == 5
    assert ns["max_profit"]([7, 6, 4, 3, 1]) == 0
    assert ns["max_subarray"]([-2, 1, -3, 4, -1, 2, 1, -5, 4]) == 6
    assert ns["max_subarray"]([-3, -1, -2]) == -1
    assert ns["build_prefix"]([2, 4, 1, 7, 3]) == [0, 2, 6, 7, 14, 17]
    assert ns["has_pair_with_sum_slow"]([1, 2, 3], 5) is True


def check_hashing(ns, out):
    assert ns["two_sum"]([2, 7, 11, 15], 9) == [0, 1]
    assert ns["two_sum"]([3, 3], 6) == [0, 1]
    assert ns["two_sum"]([3, 2, 4], 6) == [1, 2]
    assert ns["is_anagram"]("anagram", "nagaram") and not ns["is_anagram"]("rat", "car")
    assert not ns["is_anagram"]("aacc", "ccac")
    assert ns["contains_duplicate"]([1, 2, 3, 1]) and not ns["contains_duplicate"]([1, 2, 3, 4])
    assert ns["first_uniq_char"]("leetcode") == 0
    assert ns["first_uniq_char"]("loveleetcode") == 2
    assert ns["first_uniq_char"]("aabb") == -1


def check_two_pointers(ns, out):
    assert ns["is_palindrome"]("A man, a plan, a canal: Panama")
    assert not ns["is_palindrome"]("race a car")
    assert ns["is_palindrome"](" ") and ns["is_palindrome"](".,")
    nums = [0, 1, 0, 3, 12]
    ns["move_zeroes"](nums)
    assert nums == [1, 3, 12, 0, 0]
    f = ns["length_of_longest_substring"]
    assert (f("abcabcbb"), f("bbbbb"), f("pwwkew"), f("")) == (3, 1, 3, 0)
    assert ns["pair_sum_sorted"]([1, 3, 4, 6, 9], 10) and not ns["pair_sum_sorted"]([1, 3, 4], 100)
    assert ns["max_sum_of_k"]([2, 1, 5, 1, 3, 2], 3) == 9


def check_sorting(ns, out):
    data = [5, 2, 4, 1, 9, 2, 0, -3]
    for name in ("bubble_sort", "selection_sort", "merge_sort"):
        assert ns[name](data[:]) == sorted(data), name
        assert ns[name]([]) == [] and ns[name]([1]) == [1]
    assert ns["binary_search"]([-1, 0, 3, 5, 9, 12], 9) == 4
    assert ns["binary_search"]([-1, 0, 3, 5, 9, 12], 2) == -1
    assert ns["binary_search"]([], 2) == -1
    s = ns["search_insert"]
    assert (s([1, 3, 5, 6], 5), s([1, 3, 5, 6], 2), s([1, 3, 5, 6], 7), s([1, 3, 5, 6], 0)) == (2, 1, 4, 0)
    nums1 = [1, 2, 3, 0, 0, 0]
    ns["merge"](nums1, 3, [2, 5, 6], 3)
    assert nums1 == [1, 2, 2, 3, 5, 6]
    nums1 = [4, 5, 6, 0, 0, 0]
    ns["merge"](nums1, 3, [1, 2, 3], 3)
    assert nums1 == [1, 2, 3, 4, 5, 6]
    nums1 = [0]
    ns["merge"](nums1, 0, [1], 1)
    assert nums1 == [1]
    assert [ns["int_sqrt"](n) for n in (0, 1, 15, 16, 17)] == [0, 1, 3, 4, 4]
    assert ns["ranked"][0] == ("Meena", 91)


def check_linear(ns, out):
    v = ns["is_valid"]
    assert v("()[]{}") and v("{[]}") and v("")
    assert not v("([)]") and not v("((") and not v(")") and not v("(]")
    build, to_list = ns["build_list"], ns["to_list"]
    assert to_list(ns["reverse_list"](build([1, 2, 3]))) == [3, 2, 1]
    assert ns["reverse_list"](None) is None
    merged = ns["merge_two_lists"](build([1, 2, 4]), build([1, 3, 4]))
    assert to_list(merged) == [1, 1, 2, 3, 4, 4]
    assert to_list(ns["merge_two_lists"](None, build([0]))) == [0]
    assert ns["merge_two_lists"](None, None) is None


def check_recursion_trees(ns, out):
    assert [ns["fib"](n) for n in (0, 1, 4, 10)] == [0, 1, 3, 55]
    assert ns["factorial"](4) == 24
    root = ns["root"]
    assert ns["max_depth"](root) == 3 and ns["max_depth"](None) == 0
    assert ns["level_order"](root) == [[4], [2, 6], [1, 3, 7]]
    assert ns["level_order"](None) == []
    assert ns["subsets"]([1, 2, 3]) == [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]
    pre, post = [], []
    ns["preorder"](root, pre)
    ns["postorder"](root, post)
    assert pre == [4, 2, 1, 3, 6, 7] and post == [1, 3, 2, 7, 6, 4]
    assert ns["result"] == [1, 2, 3, 4, 6, 7]
    assert ns["search_bst"](root, 7).val == 7 and ns["search_bst"](root, 5) is None


def check_graphs_dp(ns, out):
    graph = ns["graph"]
    assert ns["bfs"](graph, "A") == ["A", "B", "C", "D", "E"]
    assert ns["dfs"](graph, "A") == ["A", "B", "D", "E", "C"]
    grid = [list("11000"), list("11000"), list("00100"), list("00011")]
    assert ns["num_islands"](grid) == 3
    assert ns["num_islands"]([["0"]]) == 0
    image = [[1, 1, 1], [1, 1, 0], [1, 0, 1]]
    assert ns["flood_fill"](image, 1, 1, 2) == [[2, 2, 2], [2, 2, 0], [2, 0, 1]]
    assert ns["flood_fill"]([[0, 0], [0, 0]], 0, 0, 0) == [[0, 0], [0, 0]]
    for n in range(0, 20):
        assert ns["fib_slow"](n) == ns["fib_memo"](n) == ns["fib_table"](n)
    for name in ("climb_stairs", "climb_stairs_o1"):
        assert [ns[name](n) for n in (1, 2, 3, 5, 10)] == [1, 2, 3, 8, 89], name
    rob = ns["rob"]
    assert (rob([1, 2, 3, 1]), rob([2, 7, 9, 3, 1]), rob([5]), rob([]), rob([2, 1, 1, 2])) == (4, 12, 5, 0, 4)


CHECKS = {
    "python/01-basics.md": check_basics,
    "python/02-data-structures.md": check_data_structures,
    "python/03-functions-files-oop.md": check_oop,
    "dsa/01-complexity-arrays.md": check_arrays,
    "dsa/02-strings-hashing.md": check_hashing,
    "dsa/03-two-pointers-sliding-window.md": check_two_pointers,
    "dsa/04-sorting-binary-search.md": check_sorting,
    "dsa/05-stacks-queues-linked-lists.md": check_linear,
    "dsa/06-recursion-backtracking-trees.md": check_recursion_trees,
    "dsa/07-graphs-dp.md": check_graphs_dp,
}


def main():
    write = "--write-outputs" in sys.argv
    failures = 0
    pages = sorted(MODULES.rglob("*.md"))
    workdir = tempfile.mkdtemp()
    shutil.copy(DAY1_ASSETS / "students.csv", workdir)
    os.chdir(workdir)

    for page in pages:
        key = page.relative_to(MODULES).as_posix()
        _, blocks = python_blocks(page)
        if not blocks:
            continue
        try:
            namespace, outputs = run_page(page)
            if key in CHECKS:
                CHECKS[key](namespace, outputs)
                status = f"ok    {len(blocks):2d} blocks, solutions checked"
            else:
                status = f"ok    {len(blocks):2d} blocks, no solution checks"

            text, silent = with_outputs(page, outputs)
            if write:
                page.write_text(text)
            elif text != page.read_text():
                raise AssertionError("Output boxes are out of date. Run with --write-outputs.")
            if silent:
                raise AssertionError(f"blocks that print nothing, at lines {silent}")
            status += ", outputs match"
        except AssertionError as error:
            failures += 1
            status = f"FAIL  {error or 'solution check failed'}"
        print(f"{key:45s} {status}")

    # The starter file must at least be valid Python
    compile((DAY1_ASSETS / "student_records_starter.py").read_text(), "starter", "exec")

    missing = [k for k in CHECKS if not (MODULES / k).exists()]
    if missing:
        failures += 1
        print("FAIL  pages named in CHECKS do not exist:", missing)

    shutil.rmtree(workdir, ignore_errors=True)
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
