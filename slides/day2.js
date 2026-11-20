// Day 2: Data structures and algorithms I
const { deck, K, MONO, W, X0, CW, T, box, tb, arrow, cells, ptr, explain, kv, card, code, table } = require("./lib");

/** Array row centred on the slide. */
function arr(s, vals, y, o = {}) {
  const step = (o.cw || 1.1) + 0.07, width = vals.length * step - 0.07;
  return cells(s, vals, o.x ?? (W - width) / 2 + (o.label ? 0.7 : 0), y, o);
}
const mark = (pairs) => Object.fromEntries(pairs);

module.exports = async function build(out) {
  const D = deck("Placement Readiness Training  ·  Day 2  ·  DSA I", "Day 2: Data structures and algorithms I");

  // ------------------------------------------------------------ opening
  D.section("Opening");
  D.title("Placement Readiness Training · Day 2", "Data structures and algorithms I",
    "Five patterns that cover most coding-round questions. Today you learn to recognise them.",
    "Open with the Day 1 recap quiz (10 questions, 5 minutes) before this slide.");

  let s = D.content("Today: five sessions, five patterns");
  table(s, [["Time", "Session", "Pattern you will recognise"],
    ["9:30", "Complexity and arrays", "Carry a running value in one pass"],
    ["10:30", "Strings and hashing", "Trade memory for speed with a dict or set"],
    ["11:45", "Two pointers and sliding window", "Move two indexes instead of nesting loops"],
    ["1:45", "Sorting and binary search", "Halve the search space every step"],
    ["2:45", "Stacks, queues, linked lists", "Most recent first, or first come first"]],
    X0, 1.7, CW, [1.4, 4.6, 6.13], { rowH: 0.72, fontSize: 18 });
  T(s, "Breaks: 11:30 to 11:45, and lunch 12:45 to 1:45", X0, 6.25, CW, 0.4, { fontSize: 15, color: K.mute });

  s = D.content("How to approach any problem", "Insist on step 2. Students who skip the brute force cannot explain why the better solution is better.");
  [["Restate", "Say the problem in one sentence. Work the example by hand."],
   ["Brute force", "Say the obvious solution and its complexity out loud."],
   ["Pattern", "Name it. Look for the clue words and use the cheat sheet."],
   ["Code", "Start from the template for that pattern."],
   ["Test", "The example, then an empty input, then one element."]]
    .forEach(([t, b], i) => card(s, X0 + i * 2.47, 1.8, 2.3, 3.9, t, b, { num: i + 1, bodySize: 15, titleSize: 18 }));
  T(s, "Use these five steps for every problem today, and in every interview.", X0, 6.1, CW, 0.5, { fontSize: 17, color: K.mute });

  // ------------------------------------------------------------ session 1
  D.divider("Session 1 of 5", "Complexity and arrays", "9:30 to 10:30",
    "Big-O by counting loops · time versus space · prefix sums · Kadane's algorithm");
  D.hook("Your solution works. What is its time complexity?",
    "Every interviewer asks this after every solution. By 10:30 you can answer it by counting loops.");

  s = D.content("Big-O: how the work grows as the input grows");
  const growth = [["O(1)", "Constant", "1", 0.15, K.green], ["O(log n)", "Logarithmic", "10", 0.35, K.green],
    ["O(n)", "Linear", "1,000", 1.0, K.blue], ["O(n log n)", "Linearithmic", "10,000", 1.7, K.blue],
    ["O(n²)", "Quadratic", "1,000,000", 2.6, K.amber], ["O(2ⁿ)", "Exponential", "more than atoms in the universe", 3.3, K.red]];
  growth.forEach(([o, name, ops, hgt, col], i) => {
    const x = X0 + i * 2.05;
    box(s, x + 0.55, 5.0 - hgt, 0.8, hgt, { fill: col, line: false, r: 0.04 });
    T(s, o, x, 5.1, 1.9, 0.4, { fontSize: 19, bold: true, align: "center", fontFace: MONO });
    T(s, name, x, 5.5, 1.9, 0.3, { fontSize: 13, color: K.mute, align: "center" });
    T(s, ops, x, 5.85, 1.9, 0.6, { fontSize: 13, align: "center", color: col, bold: true });
  });
  T(s, "Steps needed when n = 1,000  (bar heights are not to scale)", X0, 6.5, CW, 0.3, { fontSize: 13, color: K.mute });

  s = D.content("Count the loops", "Type both shapes live after this slide and time them with n = 10,000.");
  card(s, X0, 1.7, 5.9, 3.5, "Loops one after another: add", "", { titleSize: 20 });
  code(s, ["for x in nums:      # n", "    ...", "for x in nums:      # n", "    ..."], X0 + 0.3, 2.45, 5.3, 1.75, { fontSize: 17 });
  T(s, "n + n = 2n   →   O(n)", X0 + 0.3, 4.4, 5.3, 0.5, { fontSize: 20, bold: true, color: K.green, fontFace: MONO });
  card(s, X0 + 6.23, 1.7, 5.9, 3.5, "Loops inside each other: multiply", "", { titleSize: 20 });
  code(s, ["for x in nums:          # n", "    for y in nums:      # n", "        ..."], X0 + 6.53, 2.45, 5.3, 1.75, { fontSize: 17 });
  T(s, "n × n   →   O(n²)", X0 + 6.53, 4.4, 5.3, 0.5, { fontSize: 20, bold: true, color: K.amber, fontFace: MONO });
  explain(s, [{ text: "Hidden loops count too:  ", options: { bold: true } },
    { text: "x in my_list", options: { fontFace: MONO } }, { text: ",  " }, { text: "nums.index(x)", options: { fontFace: MONO } },
    { text: ",  slicing and  " }, { text: "sum(nums)", options: { fontFace: MONO } }, { text: "  are each O(n)." }], { y: 5.5, h: 1.1 });

  s = D.content("Prefix sums: pay once, answer every range in O(1)");
  const nums = [2, 4, 1, 7, 3], pre = [0, 2, 6, 7, 14, 17];
  let a = arr(s, nums, 1.9, { label: "nums", fill: mark([[1, K.amberSoft], [2, K.amberSoft], [3, K.amberSoft]]) });
  let p = arr(s, pre, 3.55, { label: "prefix", x: a.x(0) - a.step / 2, fill: mark([[1, K.redSoft], [4, K.greenSoft]]), idx: true });
  explain(s, [{ text: "Sum of nums[1..3]  =  prefix[4] − prefix[1]  =  14 − 2  =  12", options: { fontFace: MONO, bold: true } },
    { text: "\nprefix[i] holds the sum of the first i elements. Build it once in O(n).", options: { color: K.mute, fontSize: 16 } }]);

  // Running sum walkthrough
  { const v = [1, 2, 3, 4]; let total = 0; const res = [];
    v.forEach((x, i) => {
      total += x; res.push(total);
      s = D.step("Running Sum of 1d Array", i + 1, v.length);
      a = arr(s, v, 2.5, { label: "nums", fill: mark([[i, K.blueSoft]]), line: mark([[i, K.blue]]) });
      ptr(s, "x", a.cx(i), a.top, "down");
      arr(s, v.map((_, j) => (j <= i ? res[j] : "")), 4.1, { label: "result", x: a.x(0), fill: mark([[i, K.greenSoft]]), idx: false });
      kv(s, "total", total, 10.6, 2.4, { line: K.green });
      explain(s, `Add ${x} to the running total. total is now ${total}. Append it to the result.`);
    }); }

  // Best time to buy and sell stock
  { const v = [7, 1, 5, 3, 6, 4]; let mn = Infinity, best = 0;
    v.forEach((x, i) => {
      let msg;
      if (x < mn) { mn = x; msg = `${x} is the cheapest price so far. Remember it as the buy price.`; }
      else if (x - mn > best) { best = x - mn; msg = `Selling today gives ${x} − ${mn} = ${best}. That beats the best so far.`; }
      else msg = `Selling today gives ${x} − ${mn} = ${x - mn}. Not better than ${best}. Move on.`;
      s = D.step("Best Time to Buy and Sell Stock", i + 1, v.length);
      a = arr(s, v, 2.6, { label: "prices", x: 2.6, fill: mark([[i, K.blueSoft], [v.indexOf(mn), K.greenSoft]]), line: mark([[i, K.blue]]) });
      ptr(s, "today", a.cx(i), a.top, "down");
      if (v.indexOf(mn) !== i) ptr(s, "buy", a.cx(v.indexOf(mn)), a.bottom, "up", K.green);
      kv(s, "min_price", mn, 10.4, 2.0, { line: K.green, w: 2.1 });
      kv(s, "best", best, 10.4, 3.4, { line: K.amber, w: 2.1 });
      explain(s, msg);
    }); }

  // Kadane
  { const v = [-2, 1, -3, 4, -1, 2, 1, -5, 4]; let cur = v[0], best = v[0], start = 0;
    v.forEach((x, i) => {
      let msg;
      if (i === 0) msg = `Start with the first element. current = ${cur}, best = ${best}.`;
      else {
        const ext = cur + x;
        if (x > ext) { cur = x; start = i; msg = `Extending gives ${ext}. Starting fresh at ${x} is better, so drop the past.`; }
        else { cur = ext; msg = `Extend the subarray: current becomes ${ext}.`; }
        if (cur > best) { best = cur; msg += ` New best: ${best}.`; }
      }
      s = D.step("Maximum Subarray: Kadane's algorithm", i + 1, v.length);
      const f = {}; for (let j = start; j <= i; j++) f[j] = K.blueSoft;
      a = arr(s, v, 2.6, { label: "nums", x: 2.1, cw: 0.85, fill: f, line: mark([[i, K.blue]]), fontSize: 22 });
      ptr(s, "x", a.cx(i), a.top, "down");
      kv(s, "current", cur, 10.75, 2.0, { line: K.blue, w: 1.95 });
      kv(s, "best", best, 10.75, 3.4, { line: K.green, w: 1.95 });
      explain(s, [{ text: "current = max(x, current + x)     ", options: { fontFace: MONO, bold: true, fontSize: 17 } }, { text: "\n" + msg }]);
    }); }

  D.lab("Lab: arrays", [["Running Sum of 1d Array", "Live", "LeetCode 1480"], ["Best Time to Buy and Sell Stock", "Guided", "LeetCode 121. Carry the minimum so far."],
    ["Maximum Subarray", "Solo", "LeetCode 53. Extend, or start fresh."]]);
  D.debrief([["Running Sum", "Carry a total", "O(n)", "O(n)"], ["Buy and Sell Stock", "Carry the minimum", "O(n)", "O(1)"], ["Maximum Subarray", "Extend or restart", "O(n)", "O(1)"]],
    ["Why do we drop constants in Big-O?", "What breaks if Kadane starts with best = 0?", "Which hidden loops did you see today?"]);

  // ------------------------------------------------------------ session 2
  D.divider("Session 2 of 5", "Strings and hashing", "10:30 to 11:30",
    "Immutable strings · dictionaries and sets as hash maps · frequency counting");
  D.hook("Find two numbers in a list that add up to a target. Now do it without a nested loop.",
    "The nested loop is O(n²). A dictionary brings it down to O(n). This is the most useful trick in coding rounds.");

  s = D.content("Strings are immutable: every change makes a new string");
  tb(s, "s", 1.4, 2.3, 0.9, 0.7, { fill: K.blue, color: K.white, fontSize: 22, bold: true, fontFace: MONO, line: false });
  arrow(s, 2.35, 2.65, 3.5, 2.65, { color: K.blue });
  cells(s, ["h", "e", "l", "l", "o"], 3.6, 2.25, { idx: false });
  tb(s, "t", 1.4, 3.9, 0.9, 0.7, { fill: K.green, color: K.white, fontSize: 22, bold: true, fontFace: MONO, line: false });
  arrow(s, 2.35, 4.25, 3.5, 4.25, { color: K.green });
  cells(s, ["H", "E", "L", "L", "O"], 3.6, 3.85, { idx: false, fill: mark([0, 1, 2, 3, 4].map((i) => [i, K.greenSoft])) });
  code(s, ["s = \"hello\"", "t = s.upper()"], 9.3, 2.3, 3.4, 1.3, { fontSize: 18 });
  T(s, "A new object. s is unchanged.", 9.3, 3.95, 3.4, 0.7, { fontSize: 16, color: K.mute });
  explain(s, [{ text: "Building a string with += in a loop can copy it every time: O(n²). ", options: {} },
    { text: "Collect the parts in a list, then join once.", options: { bold: true } }]);

  s = D.content("How a dictionary finds a key in O(1)", "No scanning. The hash of the key says which slot to look in. Mention collisions briefly; it is an interview question.");
  tb(s, "\"Ravi\"", 0.9, 3.0, 1.9, 0.8, { fill: K.blueSoft, line: K.blue, fontSize: 20, bold: true, fontFace: MONO });
  arrow(s, 2.85, 3.4, 3.75, 3.4, { color: K.blue });
  tb(s, "hash( )", 3.8, 2.85, 2.1, 1.1, { fill: K.navy, color: K.white, fontSize: 20, bold: true, fontFace: MONO, line: false });
  arrow(s, 5.95, 3.4, 6.85, 3.4, { color: K.blue });
  tb(s, "slot 3", 6.9, 3.0, 1.6, 0.8, { fill: K.amberSoft, line: K.amber, fontSize: 19, bold: true, fontFace: MONO });
  ["", "Asha → 82", "", "Ravi → 67", "Meena → 91", ""].forEach((v, i) => {
    T(s, String(i), 9.2, 1.75 + i * 0.6, 0.4, 0.52, { fontSize: 14, color: K.mute, align: "right", valign: "middle", fontFace: MONO });
    tb(s, v, 9.75, 1.75 + i * 0.6, 2.9, 0.52, { fill: i === 3 ? K.greenSoft : K.white, line: i === 3 ? K.green : K.border, lw: i === 3 ? 2.25 : 1, fontSize: 16, fontFace: MONO, r: 0.04 });
  });
  arrow(s, 8.55, 3.4, 9.7, 3.8, { color: K.amber });
  explain(s, "The key is turned into a number, and the number is the address. No scanning, whether there are ten items or ten million.");

  s = D.content("List or set: the same question, very different cost");
  card(s, X0, 1.7, 5.9, 3.5, "x in my_list", "Checks every element until it finds a match.", { titleMono: true, titleSize: 22 });
  cells(s, [4, 9, 2, 7, 5], X0 + 0.3, 3.3, { idx: false, cw: 0.85, fill: mark([0, 1, 2, 3].map((i) => [i, K.amberSoft])) });
  T(s, "O(n)", X0 + 0.3, 4.4, 5.3, 0.5, { fontSize: 24, bold: true, color: K.amber, fontFace: MONO });
  card(s, X0 + 6.23, 1.7, 5.9, 3.5, "x in my_set", "Hashes x and looks in exactly one slot.", { titleMono: true, titleSize: 22 });
  cells(s, [4, 9, 2, 7, 5], X0 + 6.53, 3.3, { idx: false, cw: 0.85, fill: mark([[3, K.greenSoft]]), line: mark([[3, K.green]]) });
  T(s, "O(1)", X0 + 6.53, 4.4, 5.3, 0.5, { fontSize: 24, bold: true, color: K.green, fontFace: MONO });
  explain(s, "Whenever you write a loop just to ask \"have I seen this?\", replace it with a set or a dictionary.", { y: 5.5, h: 1.1 });

  s = D.content("Three hashing templates");
  [["Seen-set", "Have I met this before?", "seen = set()", "Contains Duplicate"],
   ["Frequency map", "How many of each?", "count[x] = count.get(x, 0) + 1", "Valid Anagram, First Unique Character"],
   ["Value → index map", "Where did I see it?", "position[x] = i", "Two Sum"]]
    .forEach(([t, q, c, use], i) => {
      const x = X0 + i * 4.11;
      card(s, x, 1.7, 3.9, 4.6, t, q, { num: i + 1, titleSize: 21, bodySize: 17 });
      code(s, c, x + 0.3, 3.95, 3.3, 0.95, { fontSize: i === 1 ? 12.5 : 15 });
      T(s, "Used in", x + 0.3, 5.1, 3.3, 0.3, { fontSize: 12, color: K.mute });
      T(s, use, x + 0.3, 5.4, 3.3, 0.7, { fontSize: 15, bold: true });
    });

  // Two Sum
  { const v = [11, 2, 15, 7], target = 9; const seen = {}; let done = false;
    v.forEach((x, i) => {
      if (done) return;
      const need = target - x, found = need in seen;
      s = D.step("Two Sum   (target = 9)", i + 1, v.length);
      a = arr(s, v, 2.6, { label: "nums", x: 2.2, fill: mark(found ? [[i, K.greenSoft], [seen[need], K.greenSoft]] : [[i, K.blueSoft]]), line: mark([[i, found ? K.green : K.blue]]) });
      ptr(s, "i", a.cx(i), a.top, "down");
      kv(s, "need = 9 − x", need, 7.5, 2.0, { w: 2.2, line: found ? K.green : undefined });
      T(s, "seen: value → index", 10.1, 2.0, 2.7, 0.3, { fontSize: 14, color: K.mute, fontFace: MONO });
      const keys = Object.keys(seen);
      if (!keys.length) tb(s, "empty", 10.1, 2.34, 2.6, 0.6, { fontSize: 14, color: K.mute, italic: true });
      keys.forEach((k, j) => tb(s, `${k} → ${seen[k]}`, 10.1, 2.34 + j * 0.68, 2.6, 0.6,
        { fontSize: 19, fontFace: MONO, bold: true, fill: found && Number(k) === need ? K.greenSoft : K.white, line: found && Number(k) === need ? K.green : K.border, r: 0.04 }));
      explain(s, found ? `Need ${need}. It is in seen at index ${seen[need]}. Return [${seen[need]}, ${i}].`
        : `Need ${need}. Not in seen yet. Store ${x} → ${i} and move on.`);
      if (found) done = true; else seen[x] = i;
    }); }
  s = D.content("Two Sum: check first, then store");
  card(s, X0, 1.8, 5.9, 3.3, "Wrong order", "Store the number, then look for its partner. With nums = [3, 3] and target 6 this is fine, but with nums = [3, 5] and target 6 the 3 pairs with itself.", { titleColor: K.red, bodySize: 16 });
  card(s, X0 + 6.23, 1.8, 5.9, 3.3, "Right order", "Look for the partner among the numbers already passed, then store the current number. An element can never pair with itself.", { titleColor: K.green, bodySize: 16 });
  explain(s, "Also read what the function must return. Two Sum wants indexes, not values.");

  // Anagram
  s = D.step("Valid Anagram: count up with s", 1, 2);
  cells(s, "anagram".split(""), 3.0, 1.85, { label: "s", idx: false, cw: 0.8, fill: mark([0, 1, 2, 3, 4, 5, 6].map((i) => [i, K.blueSoft])) });
  [["a", 3], ["n", 1], ["g", 1], ["r", 1], ["m", 1]].forEach(([k, n], i) => {
    tb(s, k, 3.0 + i * 1.3, 3.3, 1.1, 0.6, { fill: K.navy, color: K.white, fontSize: 19, bold: true, fontFace: MONO, line: false, r: 0.04 });
    tb(s, String(n), 3.0 + i * 1.3, 3.93, 1.1, 0.7, { fontSize: 22, bold: true, fontFace: MONO, r: 0.04 });
  });
  T(s, "count", 0.9, 3.6, 1.95, 0.7, { align: "right", valign: "middle", fontSize: 15, color: K.mute, fontFace: MONO });
  explain(s, "First pass: build a frequency map of s. Different lengths can never be anagrams, so check that first.");
  s = D.step("Valid Anagram: count down with t", 2, 2);
  cells(s, "nagaram".split(""), 3.0, 1.85, { label: "t", idx: false, cw: 0.8, fill: mark([0, 1, 2, 3, 4, 5, 6].map((i) => [i, K.greenSoft])) });
  ["a", "n", "g", "r", "m"].forEach((k, i) => {
    tb(s, k, 3.0 + i * 1.3, 3.3, 1.1, 0.6, { fill: K.navy, color: K.white, fontSize: 19, bold: true, fontFace: MONO, line: false, r: 0.04 });
    tb(s, "0", 3.0 + i * 1.3, 3.93, 1.1, 0.7, { fontSize: 22, bold: true, fontFace: MONO, r: 0.04, fill: K.greenSoft, line: K.green });
  });
  T(s, "count", 0.9, 3.6, 1.95, 0.7, { align: "right", valign: "middle", fontSize: 15, color: K.mute, fontFace: MONO });
  explain(s, "Second pass: subtract one for each letter of t. If a count is already 0 when you need it, return False. All zeros at the end means True.");

  D.lab("Lab: hashing", [["Two Sum", "Live", "LeetCode 1. Value → index map."], ["Valid Anagram", "Guided", "LeetCode 242. Frequency map."],
    ["Contains Duplicate", "Solo", "LeetCode 217. Seen-set."], ["First Unique Character in a String", "Solo", "LeetCode 387. Count, then scan again."]]);
  D.debrief([["Two Sum", "Value → index map", "O(n)", "O(n)"], ["Valid Anagram", "Frequency map", "O(n)", "O(k)"], ["Contains Duplicate", "Seen-set", "O(n)", "O(n)"], ["First Unique Character", "Count, then scan", "O(n)", "O(k)"]],
    ["How does a hash map work? What is a collision?", "Why can a list not be a dictionary key?", "Two Sum on a sorted array: can you avoid the extra memory?"]);

  // ------------------------------------------------------------ session 3
  D.divider("Session 3 of 5", "Two pointers and sliding window", "11:45 to 12:45",
    "Opposite-end pointers · fast and slow pointers · fixed and variable windows");
  D.hook("Check whether a string is a palindrome without creating a reversed copy.",
    "Reversing costs O(n) extra memory. Two indexes moving towards each other cost none.");

  s = D.content("Three pointer shapes");
  const shp = [["Opposite ends", "left and right move towards each other", "Palindromes, pair sum in a sorted array"],
    ["Fast and slow, same direction", "fast reads, slow marks where to write", "Moving or removing elements in place"],
    ["Fast and slow, different speeds", "slow moves 1 step, fast moves 2", "Middle of a linked list, cycle detection"]];
  shp.forEach(([t, how, use], i) => {
    const x = X0 + i * 4.11;
    card(s, x, 1.7, 3.9, 4.75, t, how, { titleSize: 18, bodySize: 15 });
    const c = cells(s, ["", "", "", "", ""], x + 0.45, 4.0, { idx: false, cw: 0.52, ch: 0.5, gap: 0.08 });
    if (i === 0) { ptr(s, "L", c.cx(0), 4.0, "down", K.blue, 0.5); ptr(s, "R", c.cx(4), 4.0, "down", K.green, 0.5); }
    if (i === 1) { ptr(s, "S", c.cx(1), 4.0, "down", K.green, 0.5); ptr(s, "F", c.cx(3), 4.0, "down", K.blue, 0.5); }
    if (i === 2) { ptr(s, "S", c.cx(1), 4.0, "down", K.green, 0.5); ptr(s, "F", c.cx(2), 4.55, "up", K.blue, 0.5); }
    T(s, use, x + 0.3, 5.55, 3.3, 0.75, { fontSize: 14, color: K.mute });
  });

  // Valid palindrome on "Taco cat"
  { const str = "Taco cat".split(""); let l = 0, r = str.length - 1; const steps = [];
    const alnum = (c) => /[a-z0-9]/i.test(c);
    while (l < r) {
      if (!alnum(str[l])) { steps.push([l, r, `'${str[l]}' is not a letter or digit. Skip it: move left.`]); l++; }
      else if (!alnum(str[r])) { steps.push([l, r, `The right character is a space. Skip it: move right inwards.`]); r--; }
      else { steps.push([l, r, `Compare '${str[l]}' and '${str[r]}', ignoring case. They match. Move both inwards.`]); l++; r--; }
    }
    steps.push([l, r, "left has met right. Every pair matched, so return True."]);
    steps.forEach(([li, ri, msg], i) => {
      s = D.step("Valid Palindrome", i + 1, steps.length);
      a = arr(s, str.map((c) => (c === " " ? "␣" : c)), 2.9, { cw: 1.0, fill: mark(li === ri ? [[li, K.greenSoft]] : [[li, K.blueSoft], [ri, K.greenSoft]]) });
      if (li === ri) ptr(s, "L = R", a.cx(li), a.top, "down", K.green, 1.1);
      else { ptr(s, "left", a.cx(li), a.top, "down", K.blue, 0.9); ptr(s, "right", a.cx(ri), a.top, "down", K.green, 0.9); }
      explain(s, msg);
    }); }

  // Move zeroes
  { const v = [0, 1, 0, 3, 12]; let slow = 0;
    v.forEach((_, fast) => {
      const before = v.slice(); let msg;
      if (v[fast] !== 0) { [v[slow], v[fast]] = [v[fast], v[slow]]; msg = `nums[fast] = ${before[fast]} is not zero. Swap it into position slow, then move slow forward.`; slow++; }
      else msg = "nums[fast] is zero. Leave it. Only fast moves.";
      s = D.step("Move Zeroes", fast + 1, 5);
      a = arr(s, before, 2.4, { label: "before", fill: mark([[fast, K.blueSoft]]), line: mark([[fast, K.blue]]) });
      ptr(s, "fast", a.cx(fast), a.top, "down", K.blue, 0.9);
      const b = arr(s, v, 3.85, { label: "after", idx: false, fill: mark(v.map((x, j) => [j, j < slow ? K.greenSoft : K.white])) });
      ptr(s, "slow", b.cx(Math.min(slow, 4)), b.bottom, "up", K.green, 0.9);
      explain(s, msg + "  Green cells are final.", { y: 5.85, h: 0.95, fontSize: 17 });
    }); }

  // Fixed window
  { const v = [2, 1, 5, 1, 3, 2], k = 3; let best = 0;
    for (let st = 0; st + k <= v.length; st++) {
      const sum = v.slice(st, st + k).reduce((x, y) => x + y, 0); best = Math.max(best, sum);
      s = D.step("Fixed window: maximum sum of 3 neighbours", st + 1, 4);
      const f = {}; for (let j = st; j < st + k; j++) f[j] = K.blueSoft;
      a = arr(s, v, 2.6, { label: "nums", x: 2.6, fill: f });
      box(s, a.x(st) - 0.07, 2.54, 3 * a.step + 0.07, a.ch + 0.1, { fill: K.blueSoft, line: K.blue, lw: 2.5 });
      cells(s, v, 2.6, 2.6, { fill: f, idx: false });
      kv(s, "window", sum, 10.4, 2.0, { line: K.blue, w: 2.1 });
      kv(s, "best", best, 10.4, 3.4, { line: K.green, w: 2.1 });
      explain(s, st === 0 ? "Add up the first 3 elements once: 2 + 1 + 5 = 8."
        : `Slide right: add the element that enters (${v[st + k - 1]}), subtract the one that leaves (${v[st - 1]}). No re-adding.`);
    } }

  s = D.content("Variable window: grow on the right, shrink from the left");
  code(s, ["left = 0", "for right in range(len(s)):", "    add s[right] to the window", "    while the window is invalid:", "        remove s[left] from the window", "        left += 1",
    "    update the answer with  right - left + 1"], X0, 1.7, 7.4, 3.5, { fontSize: 17 });
  card(s, 8.3, 1.7, 4.43, 3.5, "Why is this O(n)?", "There is a while inside a for, but each element enters the window once and leaves at most once. The total work is at most 2n steps.", { bodySize: 16 });
  explain(s, "Clue words: \"longest\" or \"shortest\" substring or subarray that satisfies a rule.", { y: 5.5, h: 1.1 });

  // Longest substring
  { const str = "abcabcbb".split(""); const win = new Set(); let l = 0, best = 0;
    str.forEach((c, r) => {
      const removed = [];
      while (win.has(c)) { win.delete(str[l]); removed.push(str[l]); l++; }
      win.add(c); best = Math.max(best, r - l + 1);
      s = D.step("Longest Substring Without Repeating Characters", r + 1, str.length);
      const f = {}; for (let j = l; j <= r; j++) f[j] = K.blueSoft;
      a = arr(s, str, 2.8, { x: 1.3, cw: 1.0, fill: f });
      ptr(s, l === r ? "L = R" : "left", a.cx(l), a.top, "down", K.green, l === r ? 1.0 : 0.85);
      if (l !== r) ptr(s, "right", a.cx(r), a.top, "down", K.blue, 0.85);
      kv(s, "window", str.slice(l, r + 1).join(""), 10.5, 2.0, { line: K.blue, w: 2.1 });
      kv(s, "best", best, 10.5, 3.4, { line: K.green, w: 2.1 });
      explain(s, removed.length ? `'${c}' is already in the window. Remove from the left (${removed.map((x) => `'${x}'`).join(", ")}) until it is not, then add it.`
        : `'${c}' is new. Add it. The window is ${r - l + 1} long.`);
    }); }

  D.lab("Lab: two pointers and sliding window", [["Valid Palindrome", "Live", "LeetCode 125. Opposite ends, skip non-alphanumerics."], ["Move Zeroes", "Guided", "LeetCode 283. Fast reads, slow writes."],
    ["Longest Substring Without Repeating Characters", "Solo", "LeetCode 3. Variable window with a set."]]);
  D.debrief([["Valid Palindrome", "Opposite ends", "O(n)", "O(1)"], ["Move Zeroes", "Fast and slow", "O(n)", "O(1)"], ["Longest Substring", "Variable window", "O(n)", "O(k)"]],
    ["When can two pointers replace a hash map?", "Why is the window loop O(n) and not O(n²)?", "Substring, subarray, subsequence: what is the difference?"]);

  // ------------------------------------------------------------ session 4
  D.divider("Session 4 of 5", "Sorting and binary search", "1:45 to 2:45",
    "Bubble, selection and merge sort (dry run) · sort with key · binary search template · search on the answer");
  s = D.hook("I am thinking of a number between 1 and 1,000,000. Find it in 20 questions.",
    "Each question halves what is left. Halving a million 20 times leaves one number. That is O(log n).");

  // Bubble sort
  { const v = [5, 2, 4, 1]; const steps = [];
    for (let i = 0; i < v.length - 1; i++) for (let j = 0; j < v.length - 1 - i; j++) {
      const before = v.slice(); const sw = v[j] > v[j + 1];
      if (sw) [v[j], v[j + 1]] = [v[j + 1], v[j]];
      steps.push([before, v.slice(), j, sw, i]);
    }
    steps.forEach(([before, after, j, sw, pass], n) => {
      s = D.step("Bubble sort: swap neighbours that are out of order", n + 1, steps.length);
      tb(s, `Pass ${pass + 1}`, X0, 1.6, 1.3, 0.42, { fill: K.navy, color: K.white, fontSize: 13, bold: true, line: false, r: 0.2 });
      const done = (arrv) => n === steps.length - 1 ? mark(arrv.map((_, q) => [q, K.greenSoft])) : mark(arrv.map((_, q) => [q, q >= arrv.length - pass - (j === arrv.length - 2 - pass ? 1 : 0) ? K.greenSoft : K.white]));
      a = arr(s, before, 2.4, { label: "before", fill: { [j]: K.blueSoft, [j + 1]: K.blueSoft }, line: { [j]: K.blue, [j + 1]: K.blue }, idx: false });
      arr(s, after, 3.9, { label: "after", idx: false, fill: { ...done(after), ...(sw ? {} : {}) } });
      explain(s, `Compare ${before[j]} and ${before[j + 1]}. ` + (sw ? `${before[j]} is bigger, so swap.` : "Already in order. No swap.") +
        (j === before.length - 2 - pass ? `  End of pass ${pass + 1}: the largest remaining value is in place.` : ""));
    }); }

  // Selection sort
  { const v = [5, 2, 4, 1];
    for (let i = 0; i < v.length - 1; i++) {
      const before = v.slice(); let m = i; for (let j = i + 1; j < v.length; j++) if (v[j] < v[m]) m = j;
      [v[i], v[m]] = [v[m], v[i]];
      s = D.step("Selection sort: smallest remaining value to the front", i + 1, 3);
      a = arr(s, before, 2.6, { label: "before", idx: false, fill: { ...mark(before.map((_, q) => [q, q < i ? K.greenSoft : K.white])), [m]: K.blueSoft }, line: { [m]: K.blue, [i]: K.amber } });
      ptr(s, "smallest", a.cx(m), a.top, "down", K.blue, 1.3);
      arr(s, v, 4.1, { label: "after", idx: false, fill: mark(v.map((_, q) => [q, q <= i ? K.greenSoft : K.white])) });
      explain(s, m === i ? `The smallest of the rest is ${before[m]}, already at position ${i}. Nothing to swap.`
        : `The smallest of the rest is ${before[m]}. Swap it with position ${i} (${before[i]}).`);
    } }

  // Merge sort tree
  s = D.content("Merge sort: split in half, sort each half, merge", "Draw attention to the merge step: it is the same code as Merge Two Sorted Lists later today.");
  const ms = (vals, cx, y, fill) => cells(s, vals, cx - (vals.length * 0.69 - 0.07) / 2, y, { cw: 0.62, ch: 0.56, idx: false, fontSize: 17, fill: mark(vals.map((_, i) => [i, fill])) });
  T(s, "SPLIT", 0.6, 1.75, 1.6, 0.4, { fontSize: 13, bold: true, color: K.blue, charSpacing: 2 });
  ms([5, 2, 4, 1], 6.67, 1.7, K.white);
  ms([5, 2], 4.6, 2.65, K.blueSoft); ms([4, 1], 8.74, 2.65, K.blueSoft);
  [[3.6, [5]], [5.6, [2]], [7.74, [4]], [9.74, [1]]].forEach(([cx, v]) => ms(v, cx, 3.6, K.blueSoft));
  arrow(s, 6.2, 2.3, 4.9, 2.62); arrow(s, 7.14, 2.3, 8.44, 2.62);
  arrow(s, 4.3, 3.25, 3.75, 3.57); arrow(s, 4.9, 3.25, 5.45, 3.57); arrow(s, 8.44, 3.25, 7.89, 3.57); arrow(s, 9.04, 3.25, 9.59, 3.57);
  T(s, "MERGE", 0.6, 4.6, 1.6, 0.4, { fontSize: 13, bold: true, color: K.green, charSpacing: 2 });
  ms([2, 5], 4.6, 4.55, K.greenSoft); ms([1, 4], 8.74, 4.55, K.greenSoft);
  arrow(s, 3.75, 4.2, 4.3, 4.52, { color: K.green }); arrow(s, 5.45, 4.2, 4.9, 4.52, { color: K.green });
  arrow(s, 7.89, 4.2, 8.44, 4.52, { color: K.green }); arrow(s, 9.59, 4.2, 9.04, 4.52, { color: K.green });
  ms([1, 2, 4, 5], 6.67, 5.5, K.greenSoft);
  arrow(s, 4.9, 5.15, 6.2, 5.47, { color: K.green }); arrow(s, 8.44, 5.15, 7.14, 5.47, { color: K.green });
  T(s, "log n levels, and n work at each level: O(n log n)", 0.6, 6.35, CW, 0.4, { fontSize: 17, bold: true, color: K.navy, align: "center" });

  s = D.content("Three sorts to explain and compare");
  table(s, [["Algorithm", "Idea", "Time", "Space", "Stable"],
    ["Bubble sort", "Swap neighbours; the largest bubbles to the end", "O(n²)", "O(1)", "Yes"],
    ["Selection sort", "Find the smallest remaining; put it at the front", "O(n²)", "O(1)", "No"],
    ["Merge sort", "Split, sort each half, merge", "O(n log n)", "O(n)", "Yes"],
    ["Python sorted()", "Timsort: merge sort plus insertion sort", "O(n log n)", "O(n)", "Yes"]],
    X0, 1.7, CW, [2.5, 5.33, 1.7, 1.3, 1.3], { rowH: 0.7, fontSize: 17, mono: [2, 3] });
  explain(s, [{ text: "Stable ", options: { bold: true } }, { text: "means equal items keep their original order. It matters when you sort by one field after another." }]);

  s = D.content("Sorting in Python: the key function");
  tb(s, "(\"Asha\", 82)", 0.9, 2.0, 2.6, 0.62, { fontFace: MONO, fontSize: 16 }); tb(s, "(\"Ravi\", 67)", 0.9, 2.75, 2.6, 0.62, { fontFace: MONO, fontSize: 16 }); tb(s, "(\"Meena\", 91)", 0.9, 3.5, 2.6, 0.62, { fontFace: MONO, fontSize: 16 });
  arrow(s, 3.6, 3.06, 4.5, 3.06, { color: K.blue });
  tb(s, "key = lambda s: s[1]", 4.6, 2.55, 3.7, 1.0, { fill: K.navy, color: K.white, fontFace: MONO, fontSize: 16, bold: true, line: false });
  T(s, "called once per item", 4.6, 3.65, 3.7, 0.4, { fontSize: 14, color: K.mute, align: "center" });
  arrow(s, 8.4, 3.06, 9.3, 3.06, { color: K.blue });
  tb(s, "(\"Ravi\", 67)", 9.4, 2.0, 2.9, 0.62, { fontFace: MONO, fontSize: 16, fill: K.greenSoft, line: K.green }); tb(s, "(\"Asha\", 82)", 9.4, 2.75, 2.9, 0.62, { fontFace: MONO, fontSize: 16, fill: K.greenSoft, line: K.green }); tb(s, "(\"Meena\", 91)", 9.4, 3.5, 2.9, 0.62, { fontFace: MONO, fontSize: 16, fill: K.greenSoft, line: K.green });
  explain(s, [{ text: "sorted(x)", options: { fontFace: MONO, bold: true } }, { text: " returns a new list.   " }, { text: "x.sort()", options: { fontFace: MONO, bold: true } },
    { text: " sorts in place and returns " }, { text: "None", options: { fontFace: MONO, bold: true } }, { text: ".   Add " }, { text: "reverse=True", options: { fontFace: MONO, bold: true } }, { text: " for descending order." }], { y: 4.7, h: 1.4, fontSize: 18 });

  // Binary search
  const bs = (title, v, target, endMsg) => {
    let lo = 0, hi = v.length - 1; const steps = [];
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (v[mid] === target) { steps.push([lo, hi, mid, `nums[mid] = ${v[mid]} equals the target. Return ${mid}.`]); lo = hi + 1; break; }
      if (v[mid] < target) { steps.push([lo, hi, mid, `nums[mid] = ${v[mid]} is less than ${target}. The target is to the right: low = mid + 1.`]); lo = mid + 1; }
      else { steps.push([lo, hi, mid, `nums[mid] = ${v[mid]} is greater than ${target}. The target is to the left: high = mid − 1.`]); hi = mid - 1; }
    }
    if (endMsg) steps.push([lo, hi, -1, endMsg(lo, hi)]);
    steps.forEach(([l, h, m, msg], i) => {
      s = D.step(`${title}   (target = ${target})`, i + 1, steps.length);
      const f = {}; v.forEach((_, j) => { f[j] = j < l || j > h ? K.grey : K.white; }); if (m >= 0) f[m] = K.blueSoft;
      a = arr(s, v, 2.7, { label: "nums", x: 2.9, fill: f, line: m >= 0 ? { [m]: K.blue } : {} });
      if (m >= 0) ptr(s, "mid", a.cx(m), a.top, "down", K.blue, 0.8);
      if (l === h && l < v.length) ptr(s, "low=high", a.cx(l), a.bottom, "up", K.green, 1.35);
      else {
        if (l < v.length) ptr(s, "low", a.cx(l), a.bottom, "up", K.green, 0.8);
        if (h >= 0 && h < v.length) ptr(s, "high", a.cx(h), a.bottom, "up", K.amber, 0.8);
      }
      explain(s, msg);
    });
  };
  bs("Binary Search", [-1, 0, 3, 5, 9, 12], 9);
  bs("Search Insert Position", [1, 3, 5, 6], 2, (lo, hi) => `low (${lo}) has passed high (${hi}). The target is not here. low is exactly where it would be inserted: return ${lo}.`);

  s = D.content("Binary search: three details to get right every time");
  [["high = len(nums) - 1", "Start at the last valid index, not at len(nums)."],
   ["while low <= high", "With < the last remaining element is never checked."],
   ["mid + 1  and  mid - 1", "Move past mid. Assigning low = mid can loop forever."]]
    .forEach(([t, b], i) => card(s, X0 + i * 4.11, 1.8, 3.9, 3.2, t, b, { num: i + 1, titleMono: true, titleSize: 18, bodySize: 16 }));
  explain(s, "Binary search needs sorted data. If the data is not sorted, sort it first or use a hash map.");

  s = D.content("Search on the answer: binary search without an array", "Integer square root of 17. The yes/no check flips once, so binary search the range of answers.");
  const xs = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  a = cells(s, xs, 3.4, 2.0, { label: "x", labelW: 2.4, idx: false, cw: 0.9, fill: mark(xs.map((x) => [x, x === 4 ? K.greenSoft : K.white])), line: { 4: K.green } });
  cells(s, xs.map((x) => (x * x <= 17 ? "yes" : "no")), 3.4, 3.1, { label: "x * x <= 17 ?", labelW: 2.4, idx: false, cw: 0.9, fontSize: 16,
    fill: mark(xs.map((x) => [x, x * x <= 17 ? K.greenSoft : K.redSoft])) });
  ptr(s, "answer", a.cx(4), 4.02, "up", K.green, 1.2);
  explain(s, "The check is yes, yes, yes ... then no forever. That single flip means you can binary search for it. Clue words: \"minimum speed\", \"smallest capacity\", \"least number of days such that...\"");

  // Merge sorted array
  { const n1 = [1, 2, 3, 0, 0, 0], n2 = [2, 5, 6]; let i = 2, j = 2, k = 5; const steps = [];
    while (j >= 0) {
      const b1 = n1.slice(); let msg;
      if (i >= 0 && n1[i] > n2[j]) { msg = `${n1[i]} (nums1) is larger than ${n2[j]} (nums2). Write ${n1[i]} at k, move i left.`; n1[k] = n1[i]; steps.push([b1, n1.slice(), i, j, k, msg]); i--; }
      else { msg = `${n2[j]} (nums2) is not smaller than ${i >= 0 ? n1[i] : "nothing"} (nums1). Write ${n2[j]} at k, move j left.`; n1[k] = n2[j]; steps.push([b1, n1.slice(), i, j, k, msg]); j--; }
      k--;
    }
    steps.forEach(([b1, a1, ii, jj, kk, msg], n) => {
      s = D.step("Merge Sorted Array: fill from the back", n + 1, steps.length);
      a = cells(s, a1.map((x, q) => (q > 2 && q < kk ? "" : x)), 3.2, 2.45, { label: "nums1",
        fill: mark(a1.map((_, q) => [q, q >= kk ? K.greenSoft : K.white])), line: { [kk]: K.green } });
      if (ii >= 0) ptr(s, "i", a.cx(ii), a.top, "down", K.blue, 0.6);
      ptr(s, "k", a.cx(kk), a.top, "down", K.green, 0.6);
      const b = cells(s, n2, 3.2, 3.85, { label: "nums2", idx: false, fill: { [jj]: K.amberSoft }, line: { [jj]: K.amber } });
      ptr(s, "j", b.cx(jj), b.bottom, "up", K.amber, 0.6);
      explain(s, msg, { y: 5.9, h: 0.9, fontSize: 17 });
    }); }

  D.lab("Lab: sorting and binary search", [["Binary Search", "Live", "LeetCode 704. The template."], ["Search Insert Position", "Guided", "LeetCode 35. Same loop; return low."],
    ["Merge Sorted Array", "Solo", "LeetCode 88. Three pointers, from the back."]]);
  D.debrief([["Binary Search", "Halve the range", "O(log n)", "O(1)"], ["Search Insert Position", "Return low", "O(log n)", "O(1)"], ["Merge Sorted Array", "Fill from the back", "O(m+n)", "O(1)"]],
    ["Why is binary search O(log n)?", "Compare bubble, selection and merge sort.", "What must be true before you can binary search?"]);

  // ------------------------------------------------------------ session 5
  D.divider("Session 5 of 5", "Stacks, queues, linked lists", "2:45 to 3:45",
    "Stack and queue with list and deque · a singly linked list built from a Node class");
  D.hook("How does your editor know that a bracket is not closed?",
    "The most recently opened bracket must be the first one closed. \"Most recent first\" is a stack.");

  s = D.content("Stack and queue");
  card(s, X0, 1.6, 5.9, 4.0, "Stack: last in, first out", "", { titleSize: 21 });
  ["3", "2", "1"].forEach((v, i) => tb(s, v, X0 + 0.9, 2.55 + i * 0.72, 2.0, 0.62, { fontFace: MONO, fontSize: 20, bold: true, fill: i === 0 ? K.blueSoft : K.white, line: i === 0 ? K.blue : K.border }));
  T(s, "top", X0 + 0.3, 2.55, 0.55, 0.62, { fontSize: 13, color: K.blue, bold: true, valign: "middle" });
  T(s, [{ text: "stack.append(x)", options: { fontFace: MONO, bold: true, breakLine: true } }, { text: "push onto the top", options: { color: K.mute, breakLine: true } },
    { text: " ", options: { breakLine: true } }, { text: "stack.pop()", options: { fontFace: MONO, bold: true, breakLine: true } }, { text: "remove from the top", options: { color: K.mute } }], X0 + 3.2, 2.55, 2.5, 2.4, { fontSize: 15 });
  card(s, X0 + 6.23, 1.6, 5.9, 4.0, "Queue: first in, first out", "", { titleSize: 21 });
  ["A", "B", "C"].forEach((v, i) => tb(s, v, X0 + 6.55 + i * 0.95, 2.75, 0.85, 0.8, { fontFace: MONO, fontSize: 20, bold: true, fill: i === 0 ? K.greenSoft : K.white, line: i === 0 ? K.green : K.border }));
  T(s, "front", X0 + 6.55, 3.6, 0.85, 0.3, { fontSize: 13, color: K.green, bold: true, align: "center" });
  T(s, "back", X0 + 8.45, 3.6, 0.85, 0.3, { fontSize: 13, color: K.mute, bold: true, align: "center" });
  T(s, [{ text: "queue.append(x)", options: { fontFace: MONO, bold: true, breakLine: true } }, { text: "join at the back", options: { color: K.mute, breakLine: true } },
    { text: " ", options: { breakLine: true } }, { text: "queue.popleft()", options: { fontFace: MONO, bold: true, breakLine: true } }, { text: "leave from the front", options: { color: K.mute } }], X0 + 9.55, 2.55, 2.4, 2.4, { fontSize: 15 });
  explain(s, [{ text: "Use " }, { text: "collections.deque", options: { fontFace: MONO, bold: true } }, { text: " for a queue. " }, { text: "list.pop(0)", options: { fontFace: MONO, bold: true } }, { text: " is O(n), because every remaining element shifts." }], { y: 5.8, h: 0.95, fontSize: 17 });

  // Valid parentheses
  { const str = "{[()]}".split(""); const pairs = { ")": "(", "]": "[", "}": "{" }; const st = [];
    str.forEach((c, i) => {
      let msg;
      if (pairs[c]) { const top = st.pop(); msg = `'${c}' is a closing bracket. Pop the top: '${top}'. It matches.`; }
      else { st.push(c); msg = `'${c}' is an opening bracket. Push it.`; }
      if (i === str.length - 1) msg += "  End of string and the stack is empty: valid.";
      s = D.step("Valid Parentheses", i + 1, str.length);
      a = cells(s, str, 1.3, 2.8, { cw: 1.05, fill: { [i]: K.blueSoft }, line: { [i]: K.blue }, idx: false });
      ptr(s, "ch", a.cx(i), a.top, "down", K.blue, 0.7);
      T(s, "stack", 9.3, 1.6, 2.2, 0.3, { fontSize: 13, color: K.mute, fontFace: MONO, align: "center" });
      box(s, 9.3, 1.95, 2.2, 3.1, { fill: K.soft, line: K.border });
      st.slice().reverse().forEach((v, q) => tb(s, v, 9.55, 4.35 - (st.length - 1 - q) * 0.72, 1.7, 0.62, { fontFace: MONO, fontSize: 22, bold: true, fill: q === 0 ? K.blueSoft : K.white, line: q === 0 ? K.blue : K.border }));
      if (!st.length) T(s, "empty", 9.3, 3.2, 2.2, 0.5, { fontSize: 15, color: K.mute, align: "center", italic: true });
      explain(s, msg);
    }); }
  s = D.content("Valid Parentheses: the two cases that fail first attempts");
  card(s, X0, 1.8, 5.9, 3.3, "\")\"", "A closing bracket arrives and the stack is empty. Check for an empty stack before you pop.", { titleMono: true, titleSize: 30, titleColor: K.red, bodySize: 17 });
  card(s, X0 + 6.23, 1.8, 5.9, 3.3, "\"((\"", "The string ends and brackets are still open. Return whether the stack is empty, not True.", { titleMono: true, titleSize: 30, titleColor: K.red, bodySize: 17 });
  explain(s, "A wrong type, such as \"([)]\", is caught by the pop: the top is '[' but ')' needs '('.");

  // Linked list anatomy
  const ll = (sl, vals, x, y, o = {}) => {
    const pos = [];
    vals.forEach((v, i) => {
      const nx = x + i * 2.05;
      tb(sl, String(v), nx, y, 0.85, 0.8, { fontFace: MONO, fontSize: 22, bold: true, fill: (o.fill && o.fill[i]) || K.white, line: (o.line && o.line[i]) || K.navy, lw: 1.75, r: 0.05 });
      tb(sl, "", nx + 0.85, y, 0.42, 0.8, { fill: K.soft, line: (o.line && o.line[i]) || K.navy, lw: 1.75, r: 0.05 });
      pos.push(nx);
    });
    return pos;
  };
  s = D.content("Linked list: a chain of nodes");
  const lp = ll(s, [1, 2, 3], 2.3, 2.5);
  lp.forEach((nx, i) => { if (i < 2) arrow(s, nx + 1.06, 2.9, lp[i + 1] - 0.05, 2.9, { color: K.navy, w: 2 }); });
  arrow(s, lp[2] + 1.06, 2.9, lp[2] + 1.9, 2.9, { color: K.navy, w: 2 });
  tb(s, "None", lp[2] + 1.95, 2.55, 1.2, 0.7, { fontFace: MONO, fontSize: 17, fill: K.grey, line: false });
  ptr(s, "head", lp[0] + 0.42, 2.5, "down", K.green, 0.9);
  T(s, "val", lp[1], 3.4, 0.85, 0.3, { fontSize: 13, color: K.mute, align: "center", fontFace: MONO });
  T(s, "next", lp[1] + 0.7, 3.4, 0.75, 0.3, { fontSize: 13, color: K.mute, align: "center", fontFace: MONO });
  table(s, [["", "Array (Python list)", "Linked list"], ["Read the i-th element", "O(1)", "O(n): walk from the head"], ["Insert or delete at the front", "O(n)", "O(1)"], ["Memory", "Compact", "An extra reference per node"]],
    X0, 4.25, CW, [4.2, 3.9, 4.03], { rowH: 0.52, fontSize: 15 });

  // Reverse linked list
  { const vals = [1, 2, 3]; const xs2 = [3.4, 5.45, 7.5];
    // state after k iterations: nodes < k point backwards
    for (let k = 0; k <= 3; k++) {
      s = D.step("Reverse Linked List", k + 1, 4);
      ll(s, vals, xs2[0], 2.9, { fill: mark(vals.map((_, i) => [i, i < k ? K.greenSoft : K.white])) });
      tb(s, "None", 1.5, 2.95, 1.1, 0.7, { fontFace: MONO, fontSize: 16, fill: K.grey, line: false });
      tb(s, "None", 10.4, 2.95, 1.1, 0.7, { fontFace: MONO, fontSize: 16, fill: K.grey, line: false });
      vals.forEach((_, i) => {
        if (i < k) { // reversed link: from node i back to node i-1 (or None)
          const to = i === 0 ? 2.65 : xs2[i - 1] + 1.32;
          arrow(s, xs2[i] - 0.05, 3.5, to, 3.5, { color: K.green, w: 2.25 });
        } else { // original link forward
          const to = i === 2 ? 10.35 : xs2[i + 1] - 0.05;
          if (i >= k) arrow(s, xs2[i] + 1.06, 3.1, to, 3.1, { color: i === k - 1 ? K.grey : K.navy, w: 2 });
        }
      });
      const px = k === 0 ? 2.05 : xs2[k - 1] + 0.42, cx = k === 3 ? 10.95 : xs2[k] + 0.42;
      ptr(s, "prev", px, 2.9, "down", K.green, 0.85);
      ptr(s, k === 3 ? "current" : "current", cx, 3.75, "up", K.blue, 1.15);
      explain(s, k === 0 ? "Start: prev is None, current is the head. Each loop does four things: save next, reverse the link, move prev, move current."
        : k < 3 ? `Node ${k} now points backwards. prev is node ${k}, current is node ${k + 1}. The rest of the list is still safe, because next was saved first.`
        : "current is None, so the loop ends. prev is the new head: return prev, not head.", { y: 5.6, h: 1.15, fontSize: 17 });
    } }

  // Merge two lists
  { const l1 = [1, 2, 4], l2 = [1, 3, 4]; let i = 0, j = 0; const merged = []; const steps = [[0, 0, [], "Start with a dummy node. tail points at it. Compare the two front nodes."]];
    while (i < 3 && j < 3) {
      if (l1[i] <= l2[j]) { merged.push([l1[i], 1]); i++; } else { merged.push([l2[j], 2]); j++; }
      steps.push([i, j, merged.slice(), `Attached ${merged[merged.length - 1][0]} from list${merged[merged.length - 1][1]} (the smaller front node; ties go to list1). Move that list forward.`]);
    }
    const rest = i < 3 ? l1.slice(i).map((v) => [v, 1]) : l2.slice(j).map((v) => [v, 2]);
    steps.push([3, 3, merged.concat(rest), `One list is used up. Attach the rest of the other in one step. Return dummy.next.`]);
    steps.forEach(([ii, jj, m, msg], n) => {
      s = D.step("Merge Two Sorted Lists", n + 1, steps.length);
      cells(s, l1, 2.7, 1.65, { label: "list1", idx: false, cw: 0.8, ch: 0.66, fill: mark(l1.map((_, q) => [q, q < ii ? K.grey : (q === ii ? K.blueSoft : K.white)])), line: ii < 3 ? { [ii]: K.blue } : {} });
      cells(s, l2, 2.7, 2.6, { label: "list2", idx: false, cw: 0.8, ch: 0.66, fill: mark(l2.map((_, q) => [q, q < jj ? K.grey : (q === jj ? K.amberSoft : K.white)])), line: jj < 3 ? { [jj]: K.amber } : {} });
      T(s, "merged", 0.6, 4.0, 1.95, 0.7, { align: "right", valign: "middle", fontSize: 15, color: K.mute, fontFace: MONO });
      tb(s, "dummy", 2.7, 4.0, 1.15, 0.7, { fontFace: MONO, fontSize: 14, fill: K.grey, line: false });
      m.forEach(([v, src], q) => {
        const x = 4.2 + q * 1.15;
        arrow(s, x - 0.33, 4.35, x - 0.03, 4.35, { color: K.navy });
        tb(s, String(v), x, 4.0, 0.8, 0.7, { fontFace: MONO, fontSize: 20, bold: true, fill: src === 1 ? K.blueSoft : K.amberSoft, line: src === 1 ? K.blue : K.amber, r: 0.05 });
      });
      explain(s, msg, { y: 5.6, h: 1.15, fontSize: 17 });
    }); }

  D.lab("Lab: stacks and linked lists", [["Valid Parentheses", "Live", "LeetCode 20. Push openers, pop on closers."], ["Reverse Linked List", "Guided", "LeetCode 206. prev, current, next_node."],
    ["Merge Two Sorted Lists", "Solo", "LeetCode 21. Dummy node and a tail pointer."]]);
  D.debrief([["Valid Parentheses", "Stack", "O(n)", "O(n)"], ["Reverse Linked List", "Three pointers", "O(n)", "O(1)"], ["Merge Two Sorted Lists", "Dummy and tail", "O(m+n)", "O(1)"]],
    ["Stack or queue: give a real use of each.", "Array or linked list: when is each better?", "How would you detect a cycle in a linked list?"]);

  // ------------------------------------------------------------ close
  D.section("Close");
  s = D.content("Pattern recap: read the clue, name the pattern");
  table(s, [["If the problem says", "Think of"],
    ["\"running total\", \"sum of a range\", \"best contiguous\"", "Prefix sums, Kadane"],
    ["\"have I seen this?\", \"count\", \"find a pair\", \"anagram\"", "Hash map or set"],
    ["\"sorted\" and \"pair\", \"palindrome\", \"in place\"", "Two pointers"],
    ["\"longest or shortest substring that...\"", "Sliding window"],
    ["\"sorted\" and \"find\", \"minimum value that works\"", "Binary search"],
    ["\"matching brackets\", \"most recent\", \"undo\"", "Stack"]],
    X0, 1.65, CW, [8.0, 4.13], { rowH: 0.66, fontSize: 17, boldFirst: false });

  s = D.content("Evening practice: six problems, same patterns");
  [["Majority Element", "Hashing: frequency count"], ["Group Anagrams", "Hashing: dictionary keyed by a signature"], ["Maximum Average Subarray I", "Fixed-size sliding window"],
   ["Missing Number", "Arrays: sum formula, or a set"], ["Implement Queue using Stacks", "Stacks"], ["Linked List Cycle", "Fast and slow pointers"]]
    .forEach(([n, p], i) => card(s, X0 + (i % 3) * 4.11, 1.7 + Math.floor(i / 3) * 2.2, 3.9, 2.0, n, p, { titleSize: 18, bodySize: 15 }));
  explain(s, "Before you code each one, write one line: which pattern is it, and why? Commit everything to day2/ in your repository.", { y: 6.0, h: 0.85, fontSize: 17 });

  return D.save(out);
};
