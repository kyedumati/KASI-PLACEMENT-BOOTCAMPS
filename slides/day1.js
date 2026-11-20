// Day 1: Programming foundations (Python, Linux and Git)
const { deck, K, MONO, W, X0, CW, T, box, tb, arrow, cells, ptr, explain, kv, card, code, table } = require("./lib");

const mark = (pairs) => Object.fromEntries(pairs);
const all = (n, c) => Object.fromEntries([...Array(n).keys()].map((i) => [i, c]));

module.exports = async function build(out) {
  const D = deck("Placement Readiness Training  ·  Day 1  ·  Programming foundations", "Day 1: Programming foundations");
  let s, a;

  /** Close of a Python or tools session: common mistakes, plus questions to answer aloud. */
  const wrap = (rows, questions) => {
    s = D.content("Debrief: mistakes to expect, questions to answer");
    table(s, [["Mistake", "Fix"], ...rows], X0, 1.65, 7.4, [3.5, 3.9], { rowH: 0.78, fontSize: 15 });
    box(s, 8.35, 1.65, 4.38, 4.9, { fill: K.soft, line: false, r: 0.1 });
    T(s, "Answer in a full sentence", 8.65, 1.85, 3.8, 0.4, { fontSize: 16, bold: true, color: K.navy });
    T(s, questions.map((q, i) => ({ text: q, options: { bullet: { type: "number" }, breakLine: i < questions.length - 1, paraSpaceAfter: 10 } })), 8.65, 2.45, 3.8, 4.0, { fontSize: 18 });
  };

  // ------------------------------------------------------------ opening
  D.section("Opening");
  D.title("M.Tech Placement Readiness Training · Day 1", "Programming foundations",
    "Python from the first variable to classes, then Linux and Git. By 3:45 your code is on GitHub.");

  s = D.content("The week at a glance");
  table(s, [["Day", "Theme", "What you will do"],
    ["Day 1", "Programming foundations", "Python, OOP, Linux and Git"],
    ["Day 2", "DSA I", "Arrays, hashing, two pointers, binary search, stacks, linked lists"],
    ["Day 3", "DSA II and data", "Recursion, trees, graphs, DP; then SQL, NumPy and pandas"],
    ["Day 4", "CS core and AI models", "OS and networks, deep learning, Transformers, LLMs, RAG"],
    ["Day 5", "Deploy and secure", "FastAPI, Docker, AI security, capstone, post-assessment"]],
    X0, 1.7, CW, [1.5, 3.6, 7.03], { rowH: 0.72, fontSize: 18 });
  T(s, "25 hours. Five one-hour sessions a day, 9:30 to 3:45.", X0, 6.25, CW, 0.4, { fontSize: 15, color: K.mute });

  s = D.content("How you are scored");
  [["30%", "Daily lab submissions", "Commits to your GitHub repository, Days 1 to 5"], ["30%", "Post-assessment: coding", "3 problems on Day 5"],
   ["20%", "Post-assessment: MCQ", "30 questions across all modules"], ["10%", "Daily recap quizzes", "10 questions, Days 2 to 5"], ["10%", "Capstone mini-project", "Built in pairs on Day 5"]]
    .forEach(([pct, t, b], i) => {
      const x = X0 + i * 2.47;
      box(s, x, 1.75, 2.3, 3.2, { r: 0.1 });
      T(s, pct, x + 0.25, 1.95, 1.8, 0.85, { fontSize: 44, bold: true, color: i < 2 ? K.blue : K.navy });
      T(s, t, x + 0.25, 2.95, 1.8, 0.75, { fontSize: 16, bold: true });
      T(s, b, x + 0.25, 3.75, 1.8, 1.1, { fontSize: 14, color: K.mute });
    });
  explain(s, [{ text: "Certificate: ", options: { bold: true } }, { text: "at least 60% overall and at least 90% attendance. The main measure is how far you improve between today's diagnostic and Day 5." }], { y: 5.3, h: 1.2, fontSize: 18 });

  s = D.content("How every session runs");
  [["Start with the interview", "Five minutes on a real interview question that the session answers."], ["See it typed live", "The concept and its code, written in front of you. Type along."],
   ["Solve it yourself", "Thirty minutes of lab: one problem demonstrated, one guided, one on your own."], ["Debrief and commit", "Common mistakes, questions to answer aloud, then a commit."]]
    .forEach(([t, b], i) => card(s, X0 + i * 3.08, 1.9, 2.9, 3.3, t, b, { num: i + 1, titleSize: 19, bodySize: 16 }));
  explain(s, "Reading a solution is not solving. A problem counts as done when you can write it again without looking.");

  s = D.content("Today");
  table(s, [["Time", "Session", "Lab"],
    ["9:30", "Diagnostic test and setup", "20 MCQs and 2 coding problems; then installs and accounts"],
    ["10:30", "Python basics", "Seven short programs"],
    ["11:45", "Python data structures", "Five programs with lists, sets and dictionaries"],
    ["1:45", "Functions, files, OOP", "Student-record program"],
    ["2:45", "Linux and Git", "Push everything to GitHub"]],
    X0, 1.7, CW, [1.3, 4.3, 6.53], { rowH: 0.72, fontSize: 18 });
  T(s, "Breaks: 11:30 to 11:45, and lunch 12:45 to 1:45", X0, 6.25, CW, 0.4, { fontSize: 15, color: K.mute });

  s = D.content("9:30  Diagnostic test and setup", "The diagnostic is not graded. Say so twice: students who look things up spoil their own baseline.");
  card(s, X0, 1.8, 5.9, 3.4, "Diagnostic test · 30 minutes", "20 multiple-choice questions on Python, DSA, SQL, OS and networks, and AI basics. Then 2 easy coding problems.\n\nIt is not graded. It records where you start.", { bodySize: 17, titleSize: 21 });
  card(s, X0 + 6.23, 1.8, 5.9, 3.4, "Setup check · 30 minutes", "Python runs from the terminal. VS Code opens with the Python extension. Git is installed. You can sign in to GitHub, LeetCode and HackerRank.", { bodySize: 17, titleSize: 21 });
  explain(s, "Work alone and do not look anything up. On Day 5 the same kind of test shows how far you have moved.");

  // ------------------------------------------------------------ Python basics
  D.divider("Session 1", "Python basics", "10:30 to 11:30", "Variables · data types · input and output · operators · if, elif, else · for and while · range · break and continue");
  D.hook("Write a program that checks whether a number is prime.", "It needs input, a loop, a condition and one good idea. By 11:30 you can write it without help.");

  s = D.content("A variable is a name for a value");
  [["name", "\"Asha\"", "str"], ["age", "23", "int"], ["cgpa", "8.4", "float"], ["placed", "False", "bool"]].forEach(([n, v, t], i) => {
    const y = 1.85 + i * 0.85;
    tb(s, n, 1.6, y, 2.2, 0.68, { fill: K.navy, color: K.white, fontFace: MONO, fontSize: 21, bold: true, line: false });
    arrow(s, 3.9, y + 0.34, 5.0, y + 0.34, { color: K.blue, w: 2.25 });
    tb(s, v, 5.1, y, 2.6, 0.68, { fontFace: MONO, fontSize: 21, bold: true });
    tb(s, t, 8.0, y + 0.11, 1.3, 0.46, { fill: K.greenSoft, color: "1F6B50", fontFace: MONO, fontSize: 16, bold: true, line: false, r: 0.23 });
  });
  T(s, "Python works out the type from the value. You never declare it.", 9.7, 1.95, 3.0, 1.5, { fontSize: 17, color: K.mute });
  explain(s, [{ text: "type(age)", options: { fontFace: MONO, bold: true } }, { text: " tells you the type. A name can be pointed at a new value of a different type at any time." }]);

  s = D.content("input() always gives you a string", "Type the failing version first and let the class read the error message.");
  const flow = (y, items, cols) => items.forEach(([t, w], i) => {
    const x = 1.0 + items.slice(0, i).reduce((acc, it) => acc + it[1] + 0.75, 0);
    tb(s, t, x, y, w, 0.75, { fontFace: MONO, fontSize: 18, bold: true, fill: cols[i][0], line: cols[i][1], color: cols[i][2] || K.ink });
    if (i < items.length - 1) arrow(s, x + w + 0.06, y + 0.375, x + w + 0.69, y + 0.375, { color: K.mute, w: 2 });
  });
  T(s, "Works", 1.0, 1.7, 3, 0.35, { fontSize: 15, bold: true, color: K.green });
  flow(2.1, [["you type 25", 2.2], ["input()", 1.7], ["\"25\"  str", 2.0], ["int()", 1.3], ["25  int", 1.7]],
    [[K.soft, K.border], [K.navy, K.navy, K.white], [K.amberSoft, K.amber], [K.navy, K.navy, K.white], [K.greenSoft, K.green]]);
  T(s, "Fails", 1.0, 3.3, 3, 0.35, { fontSize: 15, bold: true, color: K.red });
  flow(3.7, [["you type 25", 2.2], ["input()", 1.7], ["\"25\" + 1", 2.0], ["TypeError", 2.2]],
    [[K.soft, K.border], [K.navy, K.navy, K.white], [K.amberSoft, K.amber], [K.redSoft, K.red]]);
  explain(s, [{ text: "n = int(input(\"Enter a number: \"))", options: { fontFace: MONO, bold: true } }, { text: "   Convert before you do arithmetic." }]);

  s = D.content("Four operators that surprise people");
  [["17 / 5", "3.4", "Division always gives a float"], ["17 // 5", "3", "Floor division drops the fraction"], ["17 % 5", "2", "Modulo gives the remainder"], ["2 ** 10", "1024", "Power"]]
    .forEach(([e, r, n], i) => {
      const x = X0 + i * 3.08;
      box(s, x, 1.85, 2.9, 3.3, { r: 0.1 });
      T(s, e, x + 0.25, 2.1, 2.4, 0.6, { fontSize: 26, bold: true, fontFace: MONO, color: K.navy });
      T(s, r, x + 0.25, 2.85, 2.4, 0.9, { fontSize: 44, bold: true, fontFace: MONO, color: K.blue });
      T(s, n, x + 0.25, 3.95, 2.4, 1.0, { fontSize: 16, color: K.mute });
    });
  explain(s, [{ text: "Logical operators are words: " }, { text: "and", options: { fontFace: MONO, bold: true } }, { text: ", " }, { text: "or", options: { fontFace: MONO, bold: true } }, { text: ", " }, { text: "not", options: { fontFace: MONO, bold: true } },
    { text: ".   " }, { text: "=", options: { fontFace: MONO, bold: true } }, { text: " assigns, " }, { text: "==", options: { fontFace: MONO, bold: true } }, { text: " compares." }]);

  s = D.content("Peeling digits with % 10 and // 10", "This one idea solves sum of digits, reverse a number and palindrome number. Students fill the table on paper first.");
  cells(s, [1234, 123, 12, 1, 0], 4.3, 1.9, { label: "n", labelW: 3.4, idx: false, cw: 1.3, fill: { 4: K.grey } });
  cells(s, [4, 3, 2, 1, ""], 4.3, 3.0, { label: "digit = n % 10", labelW: 3.4, idx: false, cw: 1.3, fill: all(4, K.blueSoft) });
  cells(s, [4, 7, 9, 10, ""], 4.3, 4.1, { label: "total += digit", labelW: 3.4, idx: false, cw: 1.3, fill: { 3: K.greenSoft }, line: { 3: K.green } });
  for (let i = 0; i < 4; i++) arrow(s, 4.3 + i * 1.37 + 1.32, 2.35, 4.3 + (i + 1) * 1.37 - 0.02, 2.35, { color: K.mute, w: 1.5 });
  explain(s, [{ text: "n % 10", options: { fontFace: MONO, bold: true } }, { text: " is the last digit.  " }, { text: "n // 10", options: { fontFace: MONO, bold: true } }, { text: " removes it.  Repeat while n is greater than 0." }]);

  s = D.content("if, elif, else: the first true condition wins");
  T(s, "marks = 72", 1.0, 1.75, 4, 0.5, { fontSize: 22, bold: true, fontFace: MONO, color: K.navy });
  [["if marks >= 75", "False", "grade = \"A\"", false], ["elif marks >= 60", "True", "grade = \"B\"", true], ["else", "skipped", "grade = \"C\"", false]].forEach(([c, r, act, hit], i) => {
    const y = 2.5 + i * 0.95;
    tb(s, c, 1.0, y, 4.0, 0.75, { fontFace: MONO, fontSize: 19, bold: true, fill: hit ? K.greenSoft : K.white, line: hit ? K.green : K.border, lw: hit ? 2.5 : 1 });
    arrow(s, 5.06, y + 0.375, 5.9, y + 0.375, { color: hit ? K.green : K.mute, w: 2 });
    tb(s, r, 6.0, y + 0.1, 1.5, 0.55, { fontSize: 16, bold: true, fill: hit ? K.green : K.grey, color: hit ? K.white : K.mute, line: false, r: 0.27 });
    arrow(s, 7.56, y + 0.375, 8.4, y + 0.375, { color: hit ? K.green : K.grey, w: 2, dash: !hit });
    tb(s, act, 8.5, y, 3.2, 0.75, { fontFace: MONO, fontSize: 19, bold: hit, fill: hit ? K.greenSoft : K.white, line: hit ? K.green : K.border, color: hit ? K.ink : K.mute });
  });
  explain(s, "Conditions are checked top to bottom. As soon as one is true, its block runs and the rest are skipped. Indentation, four spaces, marks the block.", { y: 5.6, h: 1.15, fontSize: 18 });

  s = D.content("for or while?");
  card(s, X0, 1.8, 5.9, 3.3, "for", "You know how many times to repeat, or you are walking through a collection.", { titleMono: true, titleSize: 30, bodySize: 17 });
  code(s, ["for i in range(5):", "    print(i)"], X0 + 0.3, 3.6, 5.3, 1.2, { fontSize: 18 });
  card(s, X0 + 6.23, 1.8, 5.9, 3.3, "while", "You repeat until a condition changes, and you do not know how many rounds that takes.", { titleMono: true, titleSize: 30, bodySize: 17 });
  code(s, ["while n > 0:", "    n //= 10"], X0 + 6.53, 3.6, 5.3, 1.2, { fontSize: 18 });
  explain(s, "A while loop must change its own condition. If it never does, the program runs forever: press Ctrl + C to stop it.");

  s = D.content("range: the stop value is never included");
  a = cells(s, [0, 1, 2, 3, 4, 5], 4.2, 1.8, { label: "range(5)", labelW: 3.3, idx: false, cw: 0.95, ch: 0.75, fill: { ...all(5, K.blueSoft), 5: K.grey }, color: { 5: K.mute } });
  cells(s, [2, 4, 6, 8, 10, 11], 4.2, 2.9, { label: "range(2, 11, 2)", labelW: 3.3, idx: false, cw: 0.95, ch: 0.75, fill: { ...all(5, K.blueSoft), 5: K.grey }, color: { 5: K.mute } });
  cells(s, [5, 4, 3, 2, 1, 0], 4.2, 4.0, { label: "range(5, 0, -1)", labelW: 3.3, idx: false, cw: 0.95, ch: 0.75, fill: { ...all(5, K.blueSoft), 5: K.grey }, color: { 5: K.mute } });
  T(s, "stop:\nexcluded", a.x(5) + 1.1, 2.75, 1.8, 0.9, { fontSize: 15, bold: true, color: K.mute });
  explain(s, [{ text: "range(start, stop, step)", options: { fontFace: MONO, bold: true } }, { text: "   To include 5, write " }, { text: "range(1, 6)", options: { fontFace: MONO, bold: true } }, { text: "." }]);

  s = D.content("break leaves the loop, continue skips one round");
  a = cells(s, [1, 2, 3, 4, 5, 6, 7, 8, 9], 2.2, 2.6, { idx: false, cw: 0.9, fill: { 0: K.greenSoft, 1: K.greenSoft, 2: K.amberSoft, 3: K.greenSoft, 4: K.greenSoft, 5: K.redSoft, 6: K.grey, 7: K.grey, 8: K.grey },
    line: { 2: K.amber, 5: K.red }, color: { 6: K.mute, 7: K.mute, 8: K.mute } });
  ptr(s, "continue", a.cx(2), a.top, "down", K.amber, 1.4);
  ptr(s, "break", a.cx(5), a.top, "down", K.red, 1.0);
  T(s, "printed:   1  2  4  5", 2.2, 3.85, 8.5, 0.5, { fontSize: 22, bold: true, fontFace: MONO, color: K.green });
  explain(s, "At 3 the loop skips the print and carries on. At 6 it stops completely, so 7, 8 and 9 are never reached.");

  s = D.content("Prime check: why testing up to √n is enough", "Live problem. Divisors come in pairs, and one of each pair is at most the square root.");
  T(s, "Divisor pairs of 36", 1.0, 1.7, 6, 0.4, { fontSize: 18, bold: true, color: K.navy });
  [[1, 36], [2, 18], [3, 12], [4, 9], [6, 6]].forEach(([x, y], i) => {
    const cx = 1.0 + i * 2.25;
    tb(s, String(x), cx, 2.3, 0.85, 0.75, { fontFace: MONO, fontSize: 22, bold: true, fill: K.blueSoft, line: K.blue });
    T(s, "×", cx + 0.85, 2.3, 0.35, 0.75, { fontSize: 20, align: "center", valign: "middle", color: K.mute });
    tb(s, String(y), cx + 1.2, 2.3, 0.85, 0.75, { fontFace: MONO, fontSize: 22, bold: true, fill: K.grey, line: false, color: K.mute });
  });
  T(s, "The blue number of every pair is 6 or less, and √36 = 6.", 1.0, 3.4, 11, 0.5, { fontSize: 19 });
  code(s, ["i = 2", "while i * i <= n:", "    if n % i == 0:   # found a divisor: not prime"], 1.0, 4.05, 8.6, 1.3, { fontSize: 16 });
  tb(s, "O(√n) instead of O(n)", 9.9, 4.3, 2.8, 0.8, { fill: K.greenSoft, line: K.green, fontSize: 16, bold: true, fontFace: MONO });
  explain(s, "If n has no divisor up to its square root, it has none at all. Also remember: 0 and 1 are not prime.", { y: 5.7, h: 1.0, fontSize: 18 });

  D.lab("Lab: seven programs", [["Prime check", "Live", "Loop to √n, break at the first divisor"], ["FizzBuzz", "Live", "Check 15 first, then 3, then 5"],
    ["Even or odd · Largest of three", "Solo", "if, elif, else"], ["Factorial", "Solo", "A for loop that multiplies"], ["Sum of digits · Reverse a number", "Solo", "% 10 and // 10 in a while loop"]]);
  wrap([["Arithmetic on input() without int()", "n = int(input())"], ["= instead of == in a condition", "= assigns, == compares"], ["Expecting range(1, 5) to include 5", "The stop is excluded: range(1, 6)"],
    ["A while loop that never ends", "Change the loop variable inside the loop"]],
    ["What is the difference between / and //?", "What does range(10, 0, -2) produce?", "Why is checking up to √n enough for a prime test?"]);

  // ------------------------------------------------------------ data structures
  D.divider("Session 2", "Python data structures", "11:45 to 12:45", "Lists · tuples · sets · dictionaries · slicing · list comprehensions · string methods");
  D.hook("Count how many times each character appears in a string.", "The answer is a dictionary and three lines of code. You will use the same three lines all day tomorrow.");

  s = D.content("Which one do I use?");
  table(s, [["", "Written as", "Ordered", "Can change", "Duplicates", "Use it for"],
    ["List", "[1, 2, 3]", "Yes", "Yes", "Yes", "A sequence you will modify"],
    ["Tuple", "(1, 2, 3)", "Yes", "No", "Yes", "A fixed record, such as (row, col)"],
    ["Set", "{1, 2, 3}", "No", "Yes", "No", "\"Have I seen this?\", removing duplicates"],
    ["Dictionary", "{\"a\": 1}", "Insertion order", "Yes", "Unique keys", "Look up a value by a key; counting"]],
    X0, 1.65, CW, [1.6, 1.8, 1.9, 1.5, 1.6, 3.73], { rowH: 0.66, fontSize: 16, mono: [1] });
  explain(s, "Choosing the structure is half of solving the problem. In every lab today, say which one you chose and why.", { y: 5.65, h: 1.05 });

  s = D.content("List indexes: from the front, and from the back");
  a = cells(s, [40, 10, 30, 20, 50], 4.0, 2.9, { label: "nums", idx: false });
  [0, 1, 2, 3, 4].forEach((i) => {
    T(s, String(i), a.x(i), 3.9, a.cw, 0.35, { align: "center", fontSize: 17, bold: true, color: K.blue, fontFace: MONO });
    T(s, String(i - 5), a.x(i), 2.4, a.cw, 0.35, { align: "center", fontSize: 17, bold: true, color: K.amber, fontFace: MONO });
  });
  T(s, "from the back", 1.2, 2.4, 2.6, 0.35, { align: "right", fontSize: 14, color: K.amber, bold: true });
  T(s, "from the front", 1.2, 3.9, 2.6, 0.35, { align: "right", fontSize: 14, color: K.blue, bold: true });
  explain(s, [{ text: "nums[0]", options: { fontFace: MONO, bold: true } }, { text: " is the first element and " }, { text: "nums[-1]", options: { fontFace: MONO, bold: true } }, { text: " is the last. Valid indexes run from 0 to " },
    { text: "len(nums) - 1", options: { fontFace: MONO, bold: true } }, { text: "; anything else raises IndexError." }], { fontSize: 18 });

  s = D.content("Slicing: start is included, stop is not");
  a = cells(s, [0, 1, 2, 3, 4, 5], 4.0, 2.3, { label: "nums", fill: { 1: K.blueSoft, 2: K.blueSoft, 3: K.blueSoft }, line: { 1: K.blue, 2: K.blue, 3: K.blue } });
  ptr(s, "start 1", a.cx(1), a.top, "down", K.blue, 1.2); ptr(s, "stop 4", a.cx(4), a.top, "down", K.mute, 1.1);
  T(s, "nums[1:4]  →  [1, 2, 3]", 4.0, 3.75, 7, 0.5, { fontSize: 22, bold: true, fontFace: MONO, color: K.navy });
  table(s, [["Slice", "Result", "Meaning"], ["nums[:3]", "[0, 1, 2]", "first three"], ["nums[3:]", "[3, 4, 5]", "from index 3 to the end"], ["nums[::-1]", "[5, 4, 3, 2, 1, 0]", "reversed copy"]],
    X0, 4.4, CW, [3.0, 4.2, 4.93], { rowH: 0.46, fontSize: 15, mono: [0, 1] });
  T(s, "Slicing works the same way on lists, tuples and strings.", X0, 6.5, CW, 0.35, { fontSize: 15, color: K.mute });

  s = D.content("A set keeps one of each");
  cells(s, [1, 2, 2, 3, 3, 3], 1.3, 2.4, { idx: false, cw: 0.85 });
  T(s, "list", 1.3, 1.95, 2, 0.35, { fontSize: 14, color: K.mute, fontFace: MONO });
  arrow(s, 7.0, 2.85, 8.0, 2.85, { color: K.blue, w: 2.5 });
  T(s, "set( )", 6.8, 2.2, 1.5, 0.4, { fontSize: 15, bold: true, fontFace: MONO, color: K.blue, align: "center" });
  cells(s, [1, 2, 3], 8.3, 2.4, { idx: false, cw: 0.85, fill: all(3, K.greenSoft), line: all(3, K.green) });
  T(s, "set", 8.3, 1.95, 2, 0.35, { fontSize: 14, color: K.mute, fontFace: MONO });
  card(s, X0, 3.85, 5.9, 1.4, "x in my_set is O(1)", "It does not scan. It jumps straight to where x would be.", { titleMono: true, titleSize: 18, bodySize: 15 });
  card(s, X0 + 6.23, 3.85, 5.9, 1.4, "set() makes an empty set", "{} makes an empty dictionary, not an empty set.", { titleMono: true, titleSize: 18, bodySize: 15 });
  explain(s, "A set has no order and no indexes. Use it when the only question is \"is this in there?\".", { y: 5.6, h: 1.1 });

  s = D.content("A dictionary maps keys to values");
  [["\"Asha\"", 82], ["\"Ravi\"", 67], ["\"Meena\"", 91]].forEach(([k, v], i) => {
    const y = 1.9 + i * 0.9;
    tb(s, k, 1.3, y, 2.6, 0.72, { fill: K.navy, color: K.white, fontFace: MONO, fontSize: 20, bold: true, line: false });
    arrow(s, 3.96, y + 0.36, 4.9, y + 0.36, { color: K.blue, w: 2.25 });
    tb(s, String(v), 5.0, y, 1.6, 0.72, { fontFace: MONO, fontSize: 22, bold: true });
  });
  T(s, "key", 1.3, 4.65, 2.6, 0.3, { fontSize: 14, color: K.mute, align: "center", fontFace: MONO }); T(s, "value", 5.0, 4.65, 1.6, 0.3, { fontSize: 14, color: K.mute, align: "center", fontFace: MONO });
  table(s, [["Expression", "Result"], ["marks[\"Asha\"]", "82"], ["marks[\"Zoya\"]", "KeyError"], ["marks.get(\"Zoya\", 0)", "0"], ["marks[\"Zoya\"] = 75", "adds the pair"]], 7.3, 1.9, 5.43, [3.4, 2.03], { rowH: 0.56, fontSize: 16, mono: [0, 1], boldFirst: false });
  explain(s, [{ text: ".get(key, default)", options: { fontFace: MONO, bold: true } }, { text: " never raises an error. That is what makes the counting idiom on the next slides work." }], { y: 5.6, h: 1.1 });

  { const word = "banana".split(""), count = {};
    word.forEach((ch, i) => {
      const before = count[ch] || 0; count[ch] = before + 1;
      s = D.step("The counting idiom", i + 1, word.length, i === 0 ? "Live problem. Students predict the dictionary after each letter before you click." : undefined);
      a = cells(s, word, 1.4, 2.7, { idx: false, cw: 0.95, fill: { [i]: K.blueSoft }, line: { [i]: K.blue } });
      ptr(s, "ch", a.cx(i), a.top, "down", K.blue, 0.8);
      T(s, "count", 8.6, 1.8, 3, 0.3, { fontSize: 14, color: K.mute, fontFace: MONO });
      Object.entries(count).forEach(([k, v], j) => {
        tb(s, `"${k}"`, 8.6, 2.15 + j * 0.8, 1.4, 0.68, { fill: K.navy, color: K.white, fontFace: MONO, fontSize: 20, bold: true, line: false, r: 0.05 });
        tb(s, String(v), 10.1, 2.15 + j * 0.8, 1.2, 0.68, { fontFace: MONO, fontSize: 22, bold: true, r: 0.05, fill: k === ch ? K.greenSoft : K.white, line: k === ch ? K.green : K.border, lw: k === ch ? 2.5 : 1 });
      });
      explain(s, [{ text: "count[ch] = count.get(ch, 0) + 1", options: { fontFace: MONO, bold: true, fontSize: 18 } },
        { text: `\n'${ch}' ${before ? `has been seen ${before} time${before > 1 ? "s" : ""}` : "is new, so get returns 0"}. Its count becomes ${before + 1}.` }], { y: 5.4, h: 1.35, fontSize: 18 });
    }); }

  s = D.content("List comprehension: a loop written in one line");
  const parts = [["[", K.mute, 0.4], ["x * x", K.green, 1.9], ["for x in range(1, 6)", K.blue, 5.3], ["if x % 2 == 1", K.amber, 3.6], ["]", K.mute, 0.4]];
  let px = 0.85;
  parts.forEach(([t, col, w]) => { T(s, t, px, 2.0, w, 0.7, { fontSize: 24, bold: true, fontFace: MONO, color: col, align: "center", valign: "middle" }); px += w; });
  [["what to keep", K.green, 1.25, 1.9], ["where the values come from", K.blue, 3.15, 5.3], ["optional filter", K.amber, 8.45, 3.6]].forEach(([t, col, x, w]) => {
    box(s, x, 2.75, w, 0.06, { fill: col, line: false, r: 0 });
    T(s, t, x, 2.9, w, 0.4, { fontSize: 15, bold: true, color: col, align: "center" });
  });
  T(s, "→   [1, 9, 25]", 0.85, 3.7, 8, 0.6, { fontSize: 26, bold: true, fontFace: MONO, color: K.navy });
  explain(s, "Read it in the order you would write the loop: for each x, if the filter passes, keep x * x. Use it when the loop only builds a list.", { y: 4.75, h: 1.25, fontSize: 18 });

  s = D.content("The copy trap: two names, one list", "Draw attention to this before the lab. It causes real bugs in tomorrow's in-place array problems.");
  card(s, X0, 1.7, 5.9, 3.6, "b = a", "", { titleMono: true, titleSize: 26, titleColor: K.red });
  tb(s, "a", X0 + 0.5, 2.75, 0.8, 0.6, { fill: K.navy, color: K.white, fontFace: MONO, fontSize: 20, bold: true, line: false });
  tb(s, "b", X0 + 0.5, 4.1, 0.8, 0.6, { fill: K.navy, color: K.white, fontFace: MONO, fontSize: 20, bold: true, line: false });
  cells(s, [1, 2, 3], X0 + 2.6, 3.3, { idx: false, cw: 0.8, ch: 0.75 });
  arrow(s, X0 + 1.36, 3.05, X0 + 2.5, 3.5, { color: K.red, w: 2.25 }); arrow(s, X0 + 1.36, 4.4, X0 + 2.5, 3.9, { color: K.red, w: 2.25 });
  T(s, "Changing b changes a too.", X0 + 0.3, 4.8, 5.3, 0.4, { fontSize: 15, color: K.red, bold: true });
  card(s, X0 + 6.23, 1.7, 5.9, 3.6, "b = a.copy()", "", { titleMono: true, titleSize: 26, titleColor: K.green });
  tb(s, "a", X0 + 6.73, 2.6, 0.8, 0.6, { fill: K.navy, color: K.white, fontFace: MONO, fontSize: 20, bold: true, line: false });
  tb(s, "b", X0 + 6.73, 3.75, 0.8, 0.6, { fill: K.navy, color: K.white, fontFace: MONO, fontSize: 20, bold: true, line: false });
  cells(s, [1, 2, 3], X0 + 8.83, 2.52, { idx: false, cw: 0.8, ch: 0.75 }); cells(s, [1, 2, 3], X0 + 8.83, 3.67, { idx: false, cw: 0.8, ch: 0.75, fill: all(3, K.greenSoft) });
  arrow(s, X0 + 7.59, 2.9, X0 + 8.73, 2.9, { color: K.green, w: 2.25 }); arrow(s, X0 + 7.59, 4.05, X0 + 8.73, 4.05, { color: K.green, w: 2.25 });
  T(s, "Two separate lists.", X0 + 6.53, 4.8, 5.3, 0.4, { fontSize: 15, color: K.green, bold: true });
  explain(s, [{ text: "Related trap: " }, { text: "nums = nums.sort()", options: { fontFace: MONO, bold: true } }, { text: " sets nums to None, because sort() works in place and returns nothing." }], { y: 5.6, h: 1.1, fontSize: 18 });

  D.lab("Lab: five programs", [["Count character frequency", "Live", "The counting idiom"], ["Remove duplicates, keeping order", "Live", "A seen-set and a result list"],
    ["Second largest", "Solo", "Sort the distinct values, or one pass with two variables"], ["Palindrome string", "Solo", "Compare with the reversed slice"], ["Word count", "Solo", "split(), then the counting idiom"]]);
  wrap([["Reading a key that is not there: KeyError", "d.get(key, default)"], ["Index past the end: IndexError", "Valid indexes are 0 to len - 1"], ["b = a to copy a list", "b = a.copy()"], ["{} for an empty set", "set()"]],
    ["List or tuple: when would you choose a tuple?", "Why is x in my_set faster than x in my_list?", "sort() or sorted(): what is the difference?"]);

  // ------------------------------------------------------------ functions, files, OOP
  D.divider("Session 3", "Functions, files, OOP", "1:45 to 2:45", "Functions · arguments · scope · reading and writing files · try and except · classes · the four OOP pillars");
  D.hook("Explain the four pillars of object-oriented programming, with an example of each.", "One of the most asked interview questions. By 2:45 you can answer it, and you have built a program that uses them.");

  s = D.content("A function: inputs go in, one value comes back");
  tb(s, "5, 3", 1.0, 2.7, 1.8, 0.9, { fontFace: MONO, fontSize: 24, bold: true, fill: K.blueSoft, line: K.blue });
  T(s, "arguments", 1.0, 3.7, 1.8, 0.3, { fontSize: 14, color: K.mute, align: "center" });
  arrow(s, 2.86, 3.15, 3.7, 3.15, { color: K.blue, w: 2.5 });
  code(s, ["def area(length, width=1):", "    return length * width"], 3.8, 2.3, 5.3, 1.7, { fontSize: 17 });
  arrow(s, 9.16, 3.15, 10.0, 3.15, { color: K.green, w: 2.5 });
  tb(s, "15", 10.1, 2.7, 1.8, 0.9, { fontFace: MONO, fontSize: 28, bold: true, fill: K.greenSoft, line: K.green });
  T(s, "return value", 10.1, 3.7, 1.8, 0.3, { fontSize: 14, color: K.mute, align: "center" });
  table(s, [["Call", "Returns", "Why"], ["area(5, 3)", "15", "positional arguments"], ["area(5)", "5", "width uses its default"], ["area(width=2, length=4)", "8", "keyword arguments, any order"]], X0, 4.3, CW, [4.4, 1.5, 6.23], { rowH: 0.44, fontSize: 15, mono: [0, 1], boldFirst: false });
  T(s, "A function with no return gives back None. Printing a value is not returning it.", X0, 6.5, CW, 0.4, { fontSize: 15, color: K.mute });

  s = D.content("Scope: what happens inside a function stays inside");
  box(s, 1.0, 1.8, 11.3, 3.5, { fill: K.soft, line: K.border, r: 0.1 });
  T(s, "global", 1.25, 1.9, 2, 0.35, { fontSize: 14, bold: true, color: K.mute, fontFace: MONO });
  tb(s, "total = 100", 1.4, 2.6, 3.2, 0.8, { fontFace: MONO, fontSize: 20, bold: true, fill: K.white, line: K.blue, lw: 2 });
  box(s, 5.6, 2.3, 6.2, 2.6, { fill: K.white, line: K.green, lw: 2, r: 0.1 });
  T(s, "inside add_bonus()", 5.85, 2.4, 4, 0.35, { fontSize: 14, bold: true, color: K.green, fontFace: MONO });
  tb(s, "total = 5", 6.1, 3.1, 3.0, 0.8, { fontFace: MONO, fontSize: 20, bold: true, fill: K.greenSoft, line: K.green });
  T(s, "A new local variable. It disappears when the function returns.", 9.3, 2.95, 2.4, 1.6, { fontSize: 14, color: K.mute });
  explain(s, "After the call, the global total is still 100. Pass values in as arguments and get results back with return. Avoid the global keyword.", { y: 5.6, h: 1.1, fontSize: 18 });

  s = D.content("Files: open with a mode, and let with close it");
  [["\"r\"", "Read", "The file must exist."], ["\"w\"", "Write", "Creates the file, or wipes what was there."], ["\"a\"", "Append", "Adds to the end."]]
    .forEach(([m, t, b], i) => card(s, X0 + i * 2.2, 1.8, 2.05, 3.2, m, t + ". " + b, { titleMono: true, titleSize: 30, bodySize: 15 }));
  code(s, ["with open(\"results.txt\", \"w\") as f:", "    f.write(\"Day 1 done\\n\")", "", "with open(\"results.txt\") as f:", "    for line in f:", "        print(line.strip())"], 7.3, 1.8, 5.43, 3.2, { fontSize: 14.5 });
  explain(s, [{ text: "with", options: { fontFace: MONO, bold: true } }, { text: " closes the file for you, even if an error happens in the middle. Opening with \"w\" by mistake deletes your data." }]);

  s = D.content("try and except: keep running when the input is bad");
  tb(s, "try:  int(text)", 1.0, 2.7, 3.3, 0.85, { fontFace: MONO, fontSize: 18, bold: true, fill: K.blueSoft, line: K.blue });
  arrow(s, 4.36, 2.95, 5.6, 2.2, { color: K.green, w: 2.25 }); arrow(s, 4.36, 3.3, 5.6, 4.05, { color: K.red, w: 2.25 });
  T(s, "\"88\"", 4.35, 2.05, 1.2, 0.35, { fontSize: 15, fontFace: MONO, bold: true, color: K.green }); T(s, "\"abc\"", 4.35, 3.85, 1.2, 0.35, { fontSize: 15, fontFace: MONO, bold: true, color: K.red });
  tb(s, "returns 88", 5.7, 1.8, 3.0, 0.8, { fontFace: MONO, fontSize: 18, bold: true, fill: K.greenSoft, line: K.green });
  tb(s, "ValueError", 5.7, 3.65, 2.4, 0.8, { fontFace: MONO, fontSize: 18, bold: true, fill: K.redSoft, line: K.red });
  arrow(s, 8.16, 4.05, 9.0, 4.05, { color: K.red, w: 2.25 });
  tb(s, "except ValueError:\nskip this row", 9.1, 3.55, 3.5, 1.0, { fontFace: MONO, fontSize: 16, bold: true, fill: K.amberSoft, line: K.amber });
  T(s, "The program continues with the next row.", 9.1, 4.7, 3.5, 0.6, { fontSize: 14, color: K.mute });
  explain(s, "Name the error you expect. A bare except hides real bugs, such as a misspelt variable name.", { y: 5.6, h: 1.1 });

  s = D.content("Errors you will meet today");
  table(s, [["Error", "Raised when", "Example"], ["ValueError", "The type is right but the value is not", "int(\"abc\")"], ["TypeError", "The type is wrong", "\"a\" + 1"], ["KeyError", "A dictionary key does not exist", "marks[\"Zoya\"]"],
    ["IndexError", "A list index is out of range", "nums[10]"], ["FileNotFoundError", "The file you opened for reading is missing", "open(\"missing.csv\")"]],
    X0, 1.7, CW, [3.2, 5.4, 3.53], { rowH: 0.7, fontSize: 17, mono: [0, 2] });
  explain(s, "Read the last line of a traceback first. It names the error and usually tells you what went wrong.", { y: 6.0, h: 0.8, fontSize: 17 });

  s = D.content("A class is a blueprint, an object is one thing built from it");
  box(s, 1.0, 1.8, 4.3, 3.5, { fill: K.navy, line: false, r: 0.1 });
  T(s, "class Student", 1.3, 2.0, 3.7, 0.5, { fontSize: 21, bold: true, color: K.white, fontFace: MONO });
  T(s, [{ text: "data", options: { bold: true, breakLine: true, color: "BFD0FF" } }, { text: "roll_no, name, marks", options: { breakLine: true, fontFace: MONO } }, { text: " ", options: { breakLine: true } },
    { text: "behaviour", options: { bold: true, breakLine: true, color: "BFD0FF" } }, { text: "grade(), describe()", options: { fontFace: MONO } }], 1.3, 2.7, 3.7, 2.4, { fontSize: 16, color: K.white });
  [["M101", "Asha Verma", 88], ["M102", "Ravi Kumar", 67], ["M105", "Arjun Singh", 45]].forEach(([r, n, m], i) => {
    const y = 1.8 + i * 1.22;
    arrow(s, 5.36, 3.55, 6.9, y + 0.5, { color: K.blue, w: 2 });
    box(s, 7.0, y, 5.3, 1.05, { fill: K.white, line: K.blue, lw: 1.75, r: 0.1 });
    T(s, n, 7.25, y + 0.1, 3.3, 0.45, { fontSize: 18, bold: true });
    T(s, `${r}  ·  marks ${m}`, 7.25, y + 0.55, 3.3, 0.4, { fontSize: 14, color: K.mute, fontFace: MONO });
    tb(s, m >= 75 ? "A" : m >= 60 ? "B" : "C", 11.2, y + 0.22, 0.75, 0.6, { fill: K.greenSoft, line: K.green, fontSize: 20, bold: true, fontFace: MONO });
  });
  explain(s, [{ text: "__init__", options: { fontFace: MONO, bold: true } }, { text: " runs when an object is created. " }, { text: "self", options: { fontFace: MONO, bold: true } }, { text: " is the object itself, and it is the first parameter of every method." }], { y: 5.6, h: 1.1, fontSize: 18 });

  s = D.content("The four pillars of OOP", "The interview answer: one line of meaning plus one concrete example each. Students say all four aloud to a neighbour.");
  [["Encapsulation", "Keep data and the methods that guard it together. Hide the internals.", "A balance that changes only through deposit()", K.blue],
   ["Abstraction", "Show what an object does, and hide how.", "Shape promises an area(), without saying how", K.green],
   ["Inheritance", "A class reuses and extends another class.", "Circle and Rectangle are both a Shape", K.amber],
   ["Polymorphism", "The same call behaves differently for different objects.", "shape.area() runs different code for each", K.purple]]
    .forEach(([t, b, ex, col], i) => {
      const x = X0 + i * 3.08;
      card(s, x, 1.75, 2.9, 4.75, t, b, { num: i + 1, accent: col, titleSize: 19, bodySize: 15 });
      box(s, x + 0.25, 4.5, 2.4, 1.75, { fill: K.soft, line: false, r: 0.08 });
      T(s, "Example", x + 0.4, 4.6, 2.1, 0.3, { fontSize: 12, bold: true, color: K.mute });
      T(s, ex, x + 0.4, 4.92, 2.1, 1.25, { fontSize: 14 });
    });

  s = D.content("Inheritance and polymorphism in one picture");
  tb(s, "Shape\narea()  ← abstract", 4.9, 1.8, 3.5, 1.1, { fill: K.navy, color: K.white, fontFace: MONO, fontSize: 17, bold: true, line: false });
  tb(s, "Rectangle\narea() = length × width", 1.6, 3.7, 4.2, 1.1, { fill: K.blueSoft, line: K.blue, fontFace: MONO, fontSize: 16, bold: true });
  tb(s, "Circle\narea() = 3.14159 × r²", 7.5, 3.7, 4.2, 1.1, { fill: K.greenSoft, line: K.green, fontFace: MONO, fontSize: 16, bold: true });
  arrow(s, 3.7, 3.65, 5.9, 2.95, { color: K.mute, w: 2 }); arrow(s, 9.6, 3.65, 7.4, 2.95, { color: K.mute, w: 2 });
  T(s, "is a", 3.9, 3.0, 1.0, 0.3, { fontSize: 14, color: K.mute, italic: true }); T(s, "is a", 8.6, 3.0, 1.0, 0.3, { fontSize: 14, color: K.mute, italic: true });
  explain(s, [{ text: "for shape in shapes: print(shape.area())", options: { fontFace: MONO, bold: true, fontSize: 17 } }, { text: "\nOne loop, one call. Each object answers in its own way. Shape itself cannot be created, because it is abstract." }], { y: 5.3, h: 1.4, fontSize: 18 });

  s = D.content("Lab: the student-record program", "Hand out the starter file and CSV before this slide. Students fill seven TODOs; they do not start from a blank file.");
  const pipe = [["students.csv", K.soft, K.border], ["load_courses()", K.navy, K.navy], ["Student objects", K.blueSoft, K.blue], ["Course objects", K.blueSoft, K.blue], ["write_report()", K.navy, K.navy], ["results.txt", K.greenSoft, K.green]];
  pipe.forEach(([t, f, l], i) => {
    const x = 0.6 + i * 2.07;
    tb(s, t, x, 2.2, 1.78, 0.95, { fill: f, line: l, color: f === K.navy ? K.white : K.ink, fontFace: MONO, fontSize: 13, bold: true });
    if (i < pipe.length - 1) arrow(s, x + 1.8, 2.675, x + 2.05, 2.675, { color: K.mute, w: 2 });
  });
  arrow(s, 3.56, 3.2, 3.56, 3.95, { color: K.red, w: 2 });
  tb(s, "3 bad rows → skipped list", 1.9, 4.0, 3.4, 0.7, { fill: K.redSoft, line: K.red, fontSize: 15, bold: true });
  T(s, "Bad marks: \"abc\", an empty value, and 120. The program must not crash on any of them.", 5.7, 4.0, 7.0, 0.8, { fontSize: 16 });
  explain(s, "Grades: A for 75 and above, B for 60 and above, C for 40 and above, otherwise F. Expected output: 3 courses written, 3 rows skipped.", { y: 5.35, h: 1.3, fontSize: 18 });

  D.lab("Lab: seven TODOs, in this order", [["TODO 1 and 2: validate marks, compute the grade", "Live", "The Student class"], ["TODO 5: convert marks inside try and except", "Live", "Skip bad rows, remember them"],
    ["TODO 3, 4, 6: average, topper, group by course", "Solo", "The Course class and a dictionary"], ["TODO 7: write the report", "Solo", "open with \"w\", one section per course"]]);
  wrap([["Forgetting self in a method", "Every method's first parameter is self"], ["print instead of return", "Return the value; print where you call"], ["A bare except:", "Name the error: except ValueError:"], ["Running from the wrong folder", "cd into day1 first: FileNotFoundError"]],
    ["Explain the four pillars, with one example each.", "What is the difference between a class and an object?", "Why is with open(...) preferred?"]);

  // ------------------------------------------------------------ Linux and Git
  D.divider("Session 4", "Linux and Git", "2:45 to 3:45", "Shell commands · pipes · permissions · git init, add, commit, branch, merge, push · writing a README");
  D.hook("\"Send me the link to your code.\"", "A recruiter asks this. By 3:45 you have a link to send, and every lab this week adds to it.");

  s = D.content("Where am I? The file system is a tree");
  const fs = [["/", 6.2, 1.7], ["home", 6.2, 2.55], ["asha", 6.2, 3.4], ["placement-training-2026", 6.2, 4.25], ["day1", 4.4, 5.1], ["README.md", 8.0, 5.1]];
  fs.forEach(([t, cx, y], i) => {
    const w = Math.max(1.3, t.length * 0.155 + 0.5);
    tb(s, t, cx - w / 2, y, w, 0.55, { fontFace: MONO, fontSize: 15, bold: true, fill: i === 3 ? K.blueSoft : K.white, line: i === 3 ? K.blue : K.border, lw: i === 3 ? 2.25 : 1 });
    if (i > 0 && i < 4) arrow(s, 6.2, y - 0.3, 6.2, y, { head: false });
  });
  arrow(s, 5.6, 4.8, 4.6, 5.1, { head: false }); arrow(s, 6.8, 4.8, 7.8, 5.1, { head: false });
  [["/", "the root"], ["~", "your home folder: /home/asha"], [".", "the folder you are in"], ["..", "one level up"]].forEach(([sym, m], i) => {
    tb(s, sym, 9.6, 1.75 + i * 0.72, 0.7, 0.55, { fill: K.navy, color: K.white, fontFace: MONO, fontSize: 18, bold: true, line: false });
    T(s, m, 10.45, 1.75 + i * 0.72, 2.4, 0.55, { fontSize: 14, valign: "middle" });
  });
  T(s, "you are here  →", 1.4, 4.25, 2.6, 0.55, { fontSize: 15, bold: true, color: K.blue, align: "right", valign: "middle" });
  explain(s, [{ text: "pwd", options: { fontFace: MONO, bold: true } }, { text: " prints where you are. " }, { text: "ls", options: { fontFace: MONO, bold: true } }, { text: " lists what is here. " }, { text: "cd", options: { fontFace: MONO, bold: true } },
    { text: " moves. On Windows, use Git Bash: it understands all of these." }], { y: 5.85, h: 0.9, fontSize: 17 });

  s = D.content("Eight commands for everyday work");
  [["pwd", "Print where you are"], ["ls -la", "List files, including hidden ones"], ["cd folder", "Go into a folder"], ["mkdir name", "Make a folder"],
   ["cp a b", "Copy a to b"], ["mv a b", "Move or rename"], ["cat file", "Print a file"], ["rm file", "Delete. There is no recycle bin."]]
    .forEach(([c, m], i) => card(s, X0 + (i % 4) * 3.08, 1.75 + Math.floor(i / 4) * 1.95, 2.9, 1.75, c, m, { titleMono: true, titleSize: 20, bodySize: 15, titleColor: i === 7 ? K.red : K.navy }));
  explain(s, "Press Tab to complete a name, and the up arrow to bring back the last command. Read an rm command twice before you press Enter.", { y: 5.75, h: 1.0, fontSize: 17 });

  s = D.content("Pipes: the output of one command feeds the next");
  [["cat notes.txt", "every line of the file"], ["grep \"o\"", "only lines containing o"], ["wc -l", "count the lines"]].forEach(([c, m], i) => {
    const x = 0.9 + i * 4.15;
    tb(s, c, x, 2.4, 3.2, 0.95, { fill: K.navy, color: K.white, fontFace: MONO, fontSize: 19, bold: true, line: false });
    T(s, m, x, 3.5, 3.2, 0.4, { fontSize: 15, color: K.mute, align: "center" });
    if (i < 2) { arrow(s, x + 3.26, 2.875, x + 4.09, 2.875, { color: K.blue, w: 2.5 }); T(s, "|", x + 3.2, 1.85, 0.95, 0.5, { fontSize: 26, bold: true, color: K.blue, align: "center", fontFace: MONO }); }
  });
  tb(s, "2", 11.9, 4.2, 0.8, 0.7, { fill: K.greenSoft, line: K.green, fontFace: MONO, fontSize: 24, bold: true });
  T(s, "the answer:", 9.6, 4.2, 2.2, 0.7, { fontSize: 15, color: K.mute, align: "right", valign: "middle" });
  explain(s, [{ text: "cat notes.txt | grep \"o\" | wc -l", options: { fontFace: MONO, bold: true } }, { text: "    Small commands joined by pipes do big jobs. Interviewers ask you to count the error lines in a log this way." }], { y: 5.35, h: 1.3, fontSize: 18 });

  s = D.content("Permissions: read 4, write 2, execute 1");
  [["rwx", "owner", "4 + 2 + 1 = 7", K.blue, K.blueSoft], ["r-x", "group", "4 + 0 + 1 = 5", K.green, K.greenSoft], ["r-x", "others", "4 + 0 + 1 = 5", K.amber, K.amberSoft]].forEach(([p, who, sum, col, soft], i) => {
    const x = 1.5 + i * 3.5;
    tb(s, p, x, 2.0, 3.0, 1.1, { fill: soft, line: col, lw: 2.25, fontFace: MONO, fontSize: 36, bold: true });
    T(s, who, x, 3.2, 3.0, 0.4, { fontSize: 17, bold: true, color: col, align: "center" });
    T(s, sum, x, 3.65, 3.0, 0.4, { fontSize: 17, fontFace: MONO, align: "center" });
  });
  tb(s, "chmod 755 run.sh", 4.3, 4.45, 4.7, 0.75, { fill: K.navy, color: K.white, fontFace: MONO, fontSize: 21, bold: true, line: false });
  explain(s, [{ text: "chmod +x run.sh", options: { fontFace: MONO, bold: true } }, { text: " makes a script runnable. " }, { text: "644", options: { fontFace: MONO, bold: true } }, { text: " is the usual setting for a normal file: the owner reads and writes, everyone else reads." }], { y: 5.6, h: 1.1, fontSize: 18 });

  s = D.content("Git: three areas on your laptop, one on GitHub");
  const areas = [["Working directory", "the files you edit", K.soft, K.border], ["Staging area", "what goes in the next commit", K.amberSoft, K.amber], ["Repository", "history on your laptop", K.blueSoft, K.blue], ["GitHub", "history online", K.greenSoft, K.green]];
  areas.forEach(([t, m, f, l], i) => {
    const x = 0.6 + i * 3.18;
    box(s, x, 2.3, 2.55, 1.9, { fill: f, line: l, lw: 2, r: 0.1 });
    T(s, t, x + 0.2, 2.5, 2.15, 0.7, { fontSize: 18, bold: true });
    T(s, m, x + 0.2, 3.25, 2.15, 0.8, { fontSize: 14, color: K.mute });
    if (i < 3) {
      arrow(s, x + 2.58, 3.25, x + 3.15, 3.25, { color: K.navy, w: 2.5 });
      T(s, ["git add", "git commit", "git push"][i], x + 2.05, 1.75, 1.7, 0.4, { fontSize: 14, bold: true, fontFace: MONO, color: K.navy, align: "center" });
    }
  });
  explain(s, "A commit is a snapshot of your project that you can always return to. Git is the tool on your laptop. GitHub is a website that hosts a copy.", { y: 4.9, h: 1.3, fontSize: 18 });

  s = D.content("The daily cycle: four commands");
  [["git status", "What has changed? Run it before and after everything else."], ["git add .", "Stage every change in this folder."], ["git commit -m \"...\"", "Save a snapshot, with a message that starts with a verb."], ["git push", "Send your commits to GitHub."]]
    .forEach(([c, m], i) => card(s, X0 + i * 3.08, 1.9, 2.9, 3.2, c, m, { num: i + 1, titleMono: true, titleSize: 15.5, bodySize: 15 }));
  explain(s, [{ text: "Weak message: ", options: { color: K.red, bold: true } }, { text: "\"update\"", options: { fontFace: MONO } }, { text: ".     Better: ", options: { color: K.green, bold: true } }, { text: "\"Add prime check and FizzBuzz\"", options: { fontFace: MONO } }]);

  { const dot = (x, y, label, col) => { tb(s, label, x - 0.38, y - 0.38, 0.76, 0.76, { shape: "ellipse", fill: col, color: K.white, fontSize: 14, bold: true, line: false, fontFace: MONO }); };
    const stepsB = [["git switch -c improve-readme", "Create a branch and move to it. main is untouched."], ["git commit  (on the branch)", "The new commit C2 exists only on the branch."],
      ["git switch main, then git merge improve-readme", "main now includes C2. Delete the branch with git branch -d."]];
    stepsB.forEach(([cmd, msg], i) => {
      s = D.step("Branch and merge", i + 1, 3);
      T(s, "main", 1.0, 2.65, 1.6, 0.5, { fontSize: 16, bold: true, fontFace: MONO, color: K.navy, valign: "middle" });
      arrow(s, 2.7, 2.9, i === 2 ? 8.4 : 5.0, 2.9, { head: false, color: K.navy, w: 3 });
      dot(3.2, 2.9, "C1", K.navy);
      if (i === 2) dot(7.9, 2.9, "C2", K.green);
      if (i < 2) {
        T(s, "improve-readme", 4.75, 3.65, 2.4, 0.5, { fontSize: 15, bold: true, fontFace: MONO, color: K.green, valign: "middle" });
        arrow(s, 3.5, 3.15, 4.55, 3.9, { head: false, color: K.green, w: 3 });
        if (i === 1) { arrow(s, 7.2, 3.9, 8.4, 3.9, { head: false, color: K.green, w: 3 }); dot(8.8, 3.9, "C2", K.green); }
      }
      tb(s, "HEAD", i === 2 ? 7.4 : i === 1 ? 8.3 : 7.3, i === 2 ? 1.95 : i === 1 ? 2.95 : 3.7, 1.0, 0.4, { fill: K.amber, color: K.white, fontSize: 13, bold: true, line: false, fontFace: MONO });
      code(s, cmd, 0.6, 5.0, 7.2, 0.7, { fontSize: 15 });
      T(s, msg, 8.1, 5.0, 4.6, 0.7, { fontSize: 15, valign: "middle" });
      T(s, "HEAD marks where you are working.", X0, 6.0, CW, 0.4, { fontSize: 14, color: K.mute });
    }); }

  s = D.content("Lab: create placement-training-2026");
  [["Arrange", "Put your day1 folder inside a new folder named placement-training-2026."], ["README", "Write README.md: what the repository is, and how to run a program."],
   ["First commit", "git init, git add ., git commit"], ["Branch", "Add one line to the README on a branch, then merge it."],
   ["Push", "Create an empty public repository on GitHub, then git remote add and git push."], ["Check", "Open the repository in a browser: day1, the README, and 2 commits."]]
    .forEach(([t, b], i) => card(s, X0 + (i % 3) * 4.11, 1.7 + Math.floor(i / 3) * 2.35, 3.9, 2.15, t, b, { num: i + 1, titleSize: 18, bodySize: 14 }));
  T(s, "On GitHub, do not tick \"Add a README file\". The first push opens a browser window to sign in.", X0, 6.45, CW, 0.4, { fontSize: 15, color: K.mute });

  wrap([["fatal: not a git repository", "You are in the wrong folder. cd in, check with pwd"], ["Author identity unknown", "Run the two git config --global commands"], ["Updates were rejected on push", "git pull --rebase origin main, then push"], ["Authentication failed", "Sign in through the browser window"]],
    ["Git and GitHub: what is the difference?", "What is the staging area for?", "What does chmod 755 mean?"]);

  // ------------------------------------------------------------ close
  D.section("Close");
  s = D.content("Day 1 is done when");
  [["Every program runs", "The seven basics, the five data-structure programs, and the student-record program."], ["Everything is on GitHub", "One repository, a README, and at least two commits."],
   ["You did it without help", "Close the solutions and write one program again from memory."]]
    .forEach(([t, b], i) => card(s, X0 + i * 4.11, 1.9, 3.9, 2.9, t, b, { num: i + 1, titleSize: 19, bodySize: 16 }));
  explain(s, "Evening practice: 5 problems from the Python (Basic) track on HackerRank, finish any unfinished lab, and one commit with all of today's solutions in day1/.", { y: 5.1, h: 1.35, fontSize: 18 });

  s = D.content("Before tomorrow: three things DSA assumes");
  [["Loop over a list both ways", "for x in nums\nfor i in range(len(nums))"], ["Use a dict and a set", "Add, read, and check membership with in"], ["Write a function", "It takes a list and returns a value"]]
    .forEach(([t, b], i) => card(s, X0 + i * 4.11, 1.9, 3.9, 2.9, t, b, { num: i + 1, titleSize: 19, bodySize: i === 0 ? 13 : 16, bodyMono: i === 0 }));
  explain(s, "Tomorrow is five hours of data structures and algorithms. Every problem uses these three skills, so practise any that still feel slow.", { y: 5.1, h: 1.35, fontSize: 18 });

  return D.save(out);
};
