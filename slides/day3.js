// Day 3 (morning): Data structures and algorithms II
const { deck, K, MONO, W, X0, CW, T, box, tb, arrow, cells, ptr, node, edge, explain, kv, card, code, table } = require("./lib");

// The example binary tree used all morning:      4
//                                              2   6
//                                             1 3    7
const TREE = { 4: [0, 0], 2: [-1.7, 1.2], 6: [1.7, 1.2], 1: [-2.55, 2.4], 3: [-0.85, 2.4], 7: [2.55, 2.4] };
const TEDGES = [[4, 2], [4, 6], [2, 1], [2, 3], [6, 7]];
function tree(s, ox, oy, o = {}) {
  const P = (v) => [ox + TREE[v][0], oy + TREE[v][1]];
  TEDGES.forEach(([a, b]) => edge(s, P(a), P(b), { color: o.edge && o.edge(a, b) ? o.edge(a, b) : K.mute, w: o.edge && o.edge(a, b) ? 3 : 1.75 }));
  Object.keys(TREE).map(Number).forEach((v) => {
    const [cx, cy] = P(v);
    node(s, v, cx, cy, { fill: (o.fill && o.fill[v]) || K.white, line: (o.line && o.line[v]) || K.navy, lw: o.line && o.line[v] ? 3 : 1.75, fontSize: 20 });
    if (o.badge && o.badge[v] !== undefined)
      tb(s, String(o.badge[v]), cx + 0.3, cy - 0.62, o.badgeW || 0.42, 0.42, { shape: o.badgeW ? "roundRect" : "ellipse", fill: o.badgeFill || K.amber, color: K.white, fontSize: 13, bold: true, line: false, r: 0.2 });
  });
  return P;
}

// Call tree of the naive Fibonacci, laid out by leaf order.
function fibTree(n) {
  let leaf = 0;
  const build = (k, depth) => {
    const t = { k, depth, kids: k < 2 ? [] : [build(k - 1, depth + 1), build(k - 2, depth + 1)] };
    t.x = t.kids.length ? (t.kids[0].x + t.kids[1].x) / 2 : leaf++;
    return t;
  };
  return { root: build(n, 0), leaves: leaf };
}
function drawFib(s, n, x, y, w, colorOf) {
  const { root, leaves } = fibTree(n), sx = w / (leaves - 1), sy = 0.8, seen = new Set();
  const walk = (t) => {
    const first = !seen.has(t.k); seen.add(t.k);
    const here = [x + t.x * sx, y + t.depth * sy];
    t.kids.forEach((c) => { edge(s, here, [x + c.x * sx, y + c.depth * sy], { d: 0.7 }); });
    const [fill, line, color] = colorOf(t.k, first);
    node(s, `f(${t.k})`, here[0], here[1], { d: 0.7, fontSize: 12, fill, line, color });
    t.kids.forEach(walk);
  };
  walk(root);
}

const GRAPH = { A: ["B", "C"], B: ["A", "D", "E"], C: ["A", "E"], D: ["B"], E: ["B", "C"] };
const GPOS = { A: [0, 0], B: [2.2, 0], D: [4.4, 0], C: [0, 1.9], E: [2.2, 1.9] };
const GEDGES = [["A", "B"], ["B", "D"], ["A", "C"], ["B", "E"], ["C", "E"]];
function graph(s, ox, oy, o = {}) {
  const P = (v) => [ox + GPOS[v][0], oy + GPOS[v][1]];
  GEDGES.forEach(([a, b]) => edge(s, P(a), P(b), { d: 0.9 }));
  Object.keys(GPOS).forEach((v) => {
    node(s, v, ...P(v), { d: 0.9, fontSize: 22, fill: (o.fill && o.fill[v]) || K.white, line: (o.line && o.line[v]) || K.navy, lw: o.line && o.line[v] ? 3 : 1.75 });
    if (o.badge && o.badge[v] !== undefined) tb(s, String(o.badge[v]), P(v)[0] + 0.35, P(v)[1] - 0.7, 0.42, 0.42, { shape: "ellipse", fill: K.amber, color: K.white, fontSize: 13, bold: true, line: false });
  });
}
function grid(s, g, x, y, size, fillOf, o = {}) {
  g.forEach((row, r) => row.forEach((v, c) => {
    const [fill, line] = fillOf(r, c, v);
    tb(s, String(v), x + c * (size + 0.06), y + r * (size + 0.06), size, size, { fill, line: line || K.border, lw: line ? 2.5 : 1, fontSize: o.fontSize || 20, bold: true, fontFace: MONO, r: 0.04 });
  }));
}

module.exports = async function build(out) {
  const D = deck("Placement Readiness Training  ·  Day 3  ·  DSA II", "Day 3: Data structures and algorithms II");
  let s;

  D.section("Opening");
  D.title("Placement Readiness Training · Day 3", "Data structures and algorithms II",
    "Recursion, trees, graphs, and a first look at dynamic programming. Bring paper: this morning you trace by hand.",
    "Open with the Day 2 recap quiz (10 questions, 5 minutes) before this slide.");

  s = D.content("This morning: two sessions");
  table(s, [["Time", "Session", "What you will be able to do"],
    ["9:30", "Recursion, backtracking, trees", "Trace recursion on paper; traverse a tree two ways"],
    ["10:30", "Graphs (BFS, DFS) and DP intro", "Traverse a graph or grid; turn slow recursion into fast DP"]],
    X0, 1.7, CW, [1.3, 4.4, 6.43], { rowH: 0.8, fontSize: 18 });
  box(s, X0, 4.4, CW, 1.7, { fill: K.soft, line: false, r: 0.1 });
  T(s, "Each session has four problems.", X0 + 0.35, 4.55, CW - 0.7, 0.5, { fontSize: 20, bold: true, color: K.navy });
  T(s, "Two are done in class. The other two reuse the same pattern: start them in class, and finish them this evening if time runs out.", X0 + 0.35, 5.05, CW - 0.7, 0.9, { fontSize: 17 });
  T(s, "From 11:45: DBMS and SQL, then NumPy and pandas.", X0, 6.3, CW, 0.4, { fontSize: 15, color: K.mute });

  // ------------------------------------------------------------ session 6
  D.divider("Session 1 of 2", "Recursion, backtracking, trees", "9:30 to 10:30",
    "Base and recursive case · call-stack tracing on paper · generating subsets · tree traversals · level order · BST search");
  D.hook("What happens, step by step, when a function calls itself?",
    "If you can trace the call stack on paper, you can write any recursive function. Take out a sheet of paper now.");

  s = D.content("Every recursive function has two parts");
  code(s, ["def factorial(n):", "    if n <= 1:", "        return 1", "    return n * factorial(n - 1)"], X0, 1.8, 6.3, 2.6, { fontSize: 20 });
  card(s, 7.3, 1.8, 5.43, 1.2, "Base case", "The smallest input, answered directly.", { titleColor: K.green, bodySize: 16 });
  card(s, 7.3, 3.2, 5.43, 1.2, "Recursive case", "Make the problem smaller, then call yourself.", { titleColor: K.blue, bodySize: 16 });
  arrow(s, 7.25, 2.4, 4.6, 2.95, { color: K.green, w: 2.25 });
  arrow(s, 7.25, 3.8, 6.75, 3.75, { color: K.blue, w: 2.25 });
  explain(s, "Write the base case first. Without it the function never stops, and Python raises RecursionError.");

  // Call stack for factorial(4)
  { const fact = { 1: 1, 2: 2, 3: 6, 4: 24 }; const steps = [];
    for (let d = 1; d <= 4; d++) steps.push(["push", d]);
    for (let n = 1; n <= 4; n++) steps.push(["pop", n]);
    steps.forEach(([kind, v], i) => {
      s = D.step("The call stack for factorial(4)", i + 1, steps.length, i === 0 ? "Students trace this on paper as you click through. Pause before each return and ask what value comes back." : undefined);
      T(s, "call stack (newest on top)", X0, 1.55, 6.5, 0.3, { fontSize: 14, color: K.mute, fontFace: MONO });
      const lowest = kind === "push" ? 5 - v : v;           // smallest n still on the stack
      for (let n = 4; n >= lowest; n--) {
        const y = 4.55 - (4 - n) * 0.78, top = n === lowest;
        const ret = kind === "pop" && top;
        tb(s, ret ? `factorial(${n})  returns ${fact[n]}` : n === 1 ? "factorial(1)  base case" : `factorial(${n})  waits for  ${n} * factorial(${n - 1})`,
          X0, y, 6.9, 0.68, { fontFace: MONO, fontSize: 16, bold: top, align: "left",
            fill: ret ? K.greenSoft : top ? K.blueSoft : K.white, line: ret ? K.green : top ? K.blue : K.border, lw: top ? 2.25 : 1, r: 0.05 });
      }
      kv(s, "depth", 4 - lowest + 1, 8.6, 1.9, { w: 1.8 });
      if (kind === "pop") kv(s, "returned", fact[v], 10.7, 1.9, { w: 1.9, line: K.green });
      box(s, 8.6, 3.3, 4.0, 1.9, { fill: K.soft, line: false });
      T(s, kind === "push" ? "Going down" : "Coming back up", 8.85, 3.45, 3.5, 0.4, { fontSize: 17, bold: true, color: kind === "push" ? K.blue : K.green });
      T(s, kind === "push" ? "Each call waits for the one above it. Nothing is multiplied yet." : "Each return unblocks the call beneath it.", 8.85, 3.9, 3.5, 1.2, { fontSize: 15 });
      explain(s, kind === "push"
        ? (v === 4 ? "factorial(1) hits the base case. It is the first call that can answer without asking anyone." : `factorial(${5 - v}) cannot finish yet. It calls factorial(${4 - v}) and waits.`)
        : (v === 1 ? "The base case returns 1. Its frame is removed from the stack." : `factorial(${v}) now has its answer: ${v} × ${fact[v - 1]} = ${fact[v]}.` + (v === 4 ? " The stack is empty. Done." : "")),
        { y: 5.55, h: 1.2 });
    }); }

  s = D.content("Fibonacci: the same work, again and again", "Ask the class to find every f(3) and f(2). This slide comes back in the next session, when memoisation removes the repeats.");
  drawFib(s, 5, 1.2, 1.8, 10.9, (k) => (k === 3 ? [K.amberSoft, K.amber, K.ink] : k === 2 ? [K.redSoft, K.red, K.ink] : [K.white, K.navy, K.ink]));
  explain(s, [{ text: "f(3) is computed 2 times and f(2) 3 times. ", options: { bold: true } }, { text: "For f(5) that is 15 calls. For f(50) it is over 40 billion. Time O(2ⁿ), and O(n) space for the call stack." }], { y: 5.75, h: 1.0, fontSize: 18 });

  s = D.content("Backtracking: choose, explore, un-choose");
  [["Choose", "path.append(choice)", "Add one option to the answer you are building.", K.blue],
   ["Explore", "backtrack(next, path)", "Recurse to make the remaining choices.", K.green],
   ["Un-choose", "path.pop()", "Undo the choice, so the next option starts clean.", K.amber]]
    .forEach(([t, c, b, col], i) => {
      const x = X0 + i * 4.11;
      card(s, x, 1.8, 3.9, 3.3, t, b, { num: i + 1, accent: col, titleSize: 22, bodySize: 16 });
      code(s, c, x + 0.3, 4.05, 3.3, 0.8, { fontSize: 15 });
    });
  explain(s, "Backtracking builds every possible answer, one choice at a time. Clue words: \"all subsets\", \"all combinations\", \"all permutations\".");

  // Subsets decision tree
  { const nodes = [[[], 1.5, 0], [[1], 0.5, 1], [[1, 2], 0, 2], [[1, 2, 3], 0, 3], [[1, 3], 1, 2], [[2], 2, 1], [[2, 3], 2, 2], [[3], 3, 1]];
    const parent = [-1, 0, 1, 2, 1, 0, 5, 0];
    const msgs = ["Start with an empty path. Record it: the empty set is a subset.",
      "Choose 1. Record [1].", "Choose 2. Record [1, 2].", "Choose 3. Record [1, 2, 3]. No choices left, so return.",
      "Un-choose 3, un-choose 2. Back at [1], choose 3 instead. Record [1, 3].",
      "Un-choose 3, un-choose 1. Back at the root, choose 2. Record [2].",
      "Choose 3. Record [2, 3].", "Un-choose 3, un-choose 2. Choose 3. Record [3]. All 8 subsets found."];
    const P = (i) => [1.6 + nodes[i][1] * 2.35, 1.85 + nodes[i][2] * 1.02];
    nodes.forEach((_, k) => {
      s = D.step("Subsets of [1, 2, 3]: the decision tree", k + 1, 8);
      // highlight the path from root to node k
      const onPath = new Set(); for (let q = k; q >= 0; q = parent[q]) onPath.add(q);
      nodes.forEach(([v], i) => {
        if (i > k) return;
        if (parent[i] >= 0) { const a = P(parent[i]), b = P(i); arrow(s, a[0], a[1] + 0.27, b[0], b[1] - 0.27, { head: false, color: onPath.has(i) ? K.blue : K.mute, w: onPath.has(i) ? 3 : 1.5 }); }
      });
      nodes.forEach(([v], i) => {
        if (i > k) return;
        const [cx, cy] = P(i);
        tb(s, `[${v.join(", ")}]`, cx - 0.75, cy - 0.27, 1.5, 0.54, { fontFace: MONO, fontSize: 15, bold: true,
          fill: i === k ? K.blueSoft : K.greenSoft, line: i === k ? K.blue : K.green, lw: i === k ? 2.5 : 1 });
      });
      kv(s, "path", `[${nodes[k][0].join(", ")}]`, 10.3, 1.75, { w: 2.4, line: K.blue, fontSize: 19 });
      kv(s, "subsets recorded", k + 1, 10.3, 3.1, { w: 2.4, line: K.green });
      explain(s, msgs[k], { y: 5.6, h: 1.15, fontSize: 19 });
    }); }

  s = D.content("Binary tree: the words you need");
  let P = tree(s, 3.6, 2.2);
  T(s, "root", 4.15, 1.95, 1.2, 0.4, { fontSize: 16, bold: true, color: K.blue });
  T(s, "leaves: no children", 0.6, 5.15, 6.0, 0.4, { fontSize: 16, bold: true, color: K.green, align: "center" });
  ["depth 1", "depth 2", "depth 3"].forEach((t, i) => T(s, t, 6.55, 2.0 + i * 1.2, 1.2, 0.4, { fontSize: 14, color: K.mute, fontFace: MONO }));
  code(s, ["class TreeNode:", "  def __init__(self, val=0,", "               left=None,", "               right=None):", "    self.val = val", "    self.left = left", "    self.right = right"], 8.0, 1.8, 4.73, 3.1, { fontSize: 15 });
  T(s, "Each node has a value and up to two children. The height of this tree is 3.", 8.0, 5.1, 4.73, 0.9, { fontSize: 15, color: K.mute });

  [["Inorder: left, node, right", [1, 2, 3, 4, 6, 7], "On a binary search tree, inorder gives sorted output."],
   ["Preorder: node, left, right", [4, 2, 1, 3, 6, 7], "The node is visited before its children. Used to copy a tree."],
   ["Postorder: left, right, node", [1, 3, 2, 7, 6, 4], "The node is visited after its children. Used to delete a tree, or to compute sizes."]]
    .forEach(([title, order, note], i) => {
      s = D.step("Depth-first traversal  ·  " + title, i + 1, 3);
      tree(s, 3.9, 2.25, { badge: Object.fromEntries(order.map((v, q) => [v, q + 1])) });
      T(s, "visit order", 8.0, 2.1, 4.7, 0.3, { fontSize: 14, color: K.mute, fontFace: MONO });
      cells(s, order, 8.0, 2.45, { cw: 0.7, ch: 0.7, fontSize: 20, idx: false, fill: Object.fromEntries(order.map((_, q) => [q, K.greenSoft])) });
      T(s, "The orange number beside each node is when it is visited.", 8.0, 3.45, 4.7, 0.7, { fontSize: 15, color: K.mute });
      explain(s, note, { y: 5.6, h: 1.15 });
    });

  s = D.content("Binary search tree: smaller on the left, larger on the right");
  tree(s, 3.9, 2.25, { fill: { 4: K.blueSoft, 2: K.blueSoft, 3: K.greenSoft }, line: { 4: K.blue, 2: K.blue, 3: K.green }, edge: (a, b) => ((a === 4 && b === 2) || (a === 2 && b === 3) ? K.blue : null) });
  T(s, "Search for 3", 8.0, 2.0, 4.7, 0.4, { fontSize: 20, bold: true, color: K.navy });
  T(s, [{ text: "At 4:  3 < 4, go left", options: { breakLine: true, fontFace: MONO } }, { text: "At 2:  3 > 2, go right", options: { breakLine: true, fontFace: MONO } }, { text: "At 3:  found", options: { fontFace: MONO, bold: true, color: K.green } }],
    8.0, 2.6, 4.7, 1.6, { fontSize: 18, paraSpaceAfter: 8 });
  explain(s, "Each step throws away half the tree, like binary search. O(log n) when the tree is balanced, O(n) in the worst case when it is a single chain.", { y: 5.6, h: 1.15, fontSize: 18 });

  s = D.content("Maximum Depth of Binary Tree: trust the recursion", "Guided problem. Read the badges bottom-up: leaves return 1, each parent returns 1 + the larger child.");
  tree(s, 3.9, 2.25, { badge: { 1: 1, 3: 1, 7: 1, 2: 2, 6: 2, 4: 3 }, badgeFill: K.green });
  T(s, "The green number is what each call returns.", 0.9, 5.2, 6.0, 0.4, { fontSize: 14, color: K.mute, align: "center" });
  code(s, ["depth(None) = 0", "", "depth(node) = 1 + max(", "    depth(node.left),", "    depth(node.right))"], 8.0, 1.9, 4.73, 2.4, { fontSize: 16 });
  T(s, "Assume the function already works for the two subtrees. Then the answer for this node is one line.", 8.0, 4.5, 4.73, 1.0, { fontSize: 15 });
  explain(s, "Time O(n): every node is visited once. Space O(h) for the call stack, where h is the height.", { y: 5.85, h: 0.9, fontSize: 18 });

  // Level order BFS
  { const levels = [[4], [2, 6], [1, 3, 7]]; const queues = [[4], [2, 6], [1, 3, 7], []];
    for (let k = 0; k <= 3; k++) {
      s = D.step("Binary Tree Level Order Traversal", k + 1, 4);
      const fill = {}, line = {};
      levels.forEach((lv, li) => lv.forEach((v) => { if (li < k) fill[v] = K.greenSoft; if (li === k) { fill[v] = K.amberSoft; line[v] = K.amber; } }));
      tree(s, 3.6, 2.2, { fill, line });
      T(s, "queue", 7.6, 1.75, 5, 0.3, { fontSize: 14, color: K.mute, fontFace: MONO });
      if (queues[k].length) cells(s, queues[k], 7.6, 2.1, { cw: 0.8, ch: 0.75, fontSize: 21, idx: false, fill: Object.fromEntries(queues[k].map((_, q) => [q, K.amberSoft])) });
      else tb(s, "empty", 7.6, 2.1, 1.6, 0.75, { fontSize: 15, color: K.mute, italic: true });
      T(s, "result", 7.6, 3.25, 5, 0.3, { fontSize: 14, color: K.mute, fontFace: MONO });
      tb(s, "[" + levels.slice(0, k).map((l) => `[${l.join(", ")}]`).join(", ") + "]", 7.6, 3.6, 5.1, 0.75, { fontFace: MONO, fontSize: 17, bold: true, fill: K.greenSoft, line: K.green, align: "left" });
      explain(s, k === 0 ? "Put the root in the queue. At the start of each round, the queue holds exactly one level."
        : k < 3 ? `Record the queue length (${levels[k - 1].length}). Remove exactly that many nodes, add their values to this level, and add their children to the queue.`
        : "The queue is empty, so every level has been recorded. Fixing the level size before the inner loop is the whole trick.", { y: 5.6, h: 1.15, fontSize: 18 });
    } }

  D.lab("Lab: recursion and trees", [["Fibonacci", "Live", "LeetCode 509. Base case first."], ["Maximum Depth of Binary Tree", "Guided", "LeetCode 104. One line after the base case."],
    ["Binary Tree Level Order Traversal", "Solo", "LeetCode 102. Queue, and fix the level size."], ["Subsets", "Solo", "LeetCode 78. Record a copy: path[:]"]]);
  D.debrief([["Fibonacci (naive)", "Two recursive calls", "O(2ⁿ)", "O(n)"], ["Maximum Depth", "1 + max of subtrees", "O(n)", "O(h)"], ["Level Order", "Queue, level size", "O(n)", "O(n)"], ["Subsets", "Choose, explore, undo", "O(n·2ⁿ)", "O(n)"]],
    ["What are the two parts of a recursive function?", "Which traversal gives sorted output on a BST?", "DFS or BFS on a tree: which data structure does each use?"]);

  // ------------------------------------------------------------ session 7
  D.divider("Session 2 of 2", "Graphs (BFS, DFS) and an introduction to DP", "10:30 to 11:30",
    "Adjacency list · BFS and DFS templates · grid as a graph · DP as recursion plus memory");
  D.hook("How would a program count the separate islands in a satellite image?",
    "A grid is a graph in disguise. Find one piece of land, then spread out to everything connected to it.");

  s = D.content("A graph, and how to store it");
  graph(s, 1.5, 2.5);
  T(s, "Nodes joined by edges. A tree is a graph with no cycles and one root.", 0.8, 5.2, 6.0, 0.7, { fontSize: 15, color: K.mute, align: "center" });
  T(s, "Adjacency list: each node → its neighbours", 7.6, 1.75, 5.1, 0.4, { fontSize: 17, bold: true, color: K.navy });
  Object.entries(GRAPH).forEach(([k, v], i) => {
    tb(s, k, 7.6, 2.3 + i * 0.66, 0.8, 0.56, { fill: K.navy, color: K.white, fontFace: MONO, fontSize: 19, bold: true, line: false, r: 0.05 });
    tb(s, `[${v.map((x) => `"${x}"`).join(", ")}]`, 8.5, 2.3 + i * 0.66, 4.2, 0.56, { fontFace: MONO, fontSize: 17, bold: true, align: "left", r: 0.05 });
  });
  T(s, "In Python: a dictionary from each node to a list.", 7.6, 5.7, 5.1, 0.4, { fontSize: 15, color: K.mute });

  // BFS steps
  { const visited = ["A"], queue = ["A"], order = []; const frames = [["start", null, queue.slice(), visited.slice(), order.slice()]];
    while (queue.length) {
      const n = queue.shift(); order.push(n); const added = [];
      GRAPH[n].forEach((m) => { if (!visited.includes(m)) { visited.push(m); queue.push(m); added.push(m); } });
      frames.push([n, added, queue.slice(), visited.slice(), order.slice()]);
    }
    frames.forEach(([cur, added, q, vis, ord], i) => {
      s = D.step("Breadth-first search from A", i + 1, frames.length, i === 0 ? "Students trace the queue on paper. Stress: mark a node visited when it is added to the queue, not when it is removed." : undefined);
      const fill = {}, line = {};
      ord.forEach((v) => { fill[v] = K.greenSoft; }); q.forEach((v) => { fill[v] = K.amberSoft; line[v] = K.amber; });
      if (cur !== "start") { fill[cur] = K.blueSoft; line[cur] = K.blue; }
      graph(s, 1.3, 2.35, { fill, line });
      T(s, "queue", 7.6, 1.7, 5, 0.3, { fontSize: 14, color: K.mute, fontFace: MONO });
      if (q.length) cells(s, q, 7.6, 2.03, { cw: 0.8, ch: 0.72, fontSize: 21, idx: false, fill: Object.fromEntries(q.map((_, j) => [j, K.amberSoft])) });
      else tb(s, "empty", 7.6, 2.03, 1.6, 0.72, { fontSize: 15, color: K.mute, italic: true });
      T(s, "visited", 7.6, 3.0, 5, 0.3, { fontSize: 14, color: K.mute, fontFace: MONO });
      tb(s, `{${vis.join(", ")}}`, 7.6, 3.33, 5.1, 0.66, { fontFace: MONO, fontSize: 18, bold: true, align: "left", r: 0.05 });
      T(s, "order", 7.6, 4.2, 5, 0.3, { fontSize: 14, color: K.mute, fontFace: MONO });
      tb(s, ord.length ? ord.join("  →  ") : " ", 7.6, 4.53, 5.1, 0.66, { fontFace: MONO, fontSize: 18, bold: true, align: "left", fill: K.greenSoft, line: K.green, r: 0.05 });
      explain(s, cur === "start" ? "Mark A as visited and put it in the queue."
        : `Remove ${cur} from the front. ` + (added.length ? `Its unvisited neighbours are ${added.join(" and ")}: mark them visited and add them to the back.` : "All of its neighbours are already visited. Nothing to add.")
          + (q.length ? "" : " The queue is empty: done."), { y: 5.6, h: 1.15, fontSize: 18 });
    }); }

  s = D.content("Depth-first search from A: go deep, then come back");
  graph(s, 1.3, 2.35, { fill: { A: K.greenSoft, B: K.greenSoft, D: K.greenSoft, E: K.greenSoft, C: K.greenSoft }, badge: { A: 1, B: 2, D: 3, E: 4, C: 5 } });
  T(s, "order", 7.6, 1.9, 5, 0.3, { fontSize: 14, color: K.mute, fontFace: MONO });
  tb(s, "A  →  B  →  D  →  E  →  C", 7.6, 2.23, 5.1, 0.7, { fontFace: MONO, fontSize: 18, bold: true, align: "left", fill: K.greenSoft, line: K.green, r: 0.05 });
  T(s, "From A go to B, then as deep as possible to D. D is a dead end, so come back to B and try E. From E reach C.", 7.6, 3.2, 5.1, 1.6, { fontSize: 16 });
  explain(s, "Same graph, same start, different order. DFS uses recursion (the call stack) where BFS uses a queue. Both need the visited set, because graphs have cycles.", { y: 5.6, h: 1.15, fontSize: 18 });

  s = D.content("BFS or DFS?");
  table(s, [["", "BFS", "DFS"], ["Data structure", "Queue", "Recursion, or an explicit stack"], ["Order", "Level by level, nearest first", "One path to the end, then back"],
    ["Use it for", "Shortest path when every step costs the same", "Connected regions, all paths, cycle detection"], ["Time", "O(V + E)", "O(V + E)"]],
    X0, 1.7, CW, [2.6, 4.76, 4.77], { rowH: 0.78, fontSize: 17 });
  explain(s, "V is the number of nodes and E the number of edges. Every node and every edge is looked at once.", { y: 5.75, h: 0.95, fontSize: 18 });

  s = D.content("A grid is a graph: each cell has up to four neighbours");
  grid(s, [["", "↑", ""], ["←", "r, c", "→"], ["", "↓", ""]], 1.6, 1.9, 1.05,
    (r, c) => (r === 1 && c === 1 ? [K.blueSoft, K.blue] : (r + c) % 2 === 1 ? [K.greenSoft, K.green] : [K.white, null]), { fontSize: 18 });
  code(s, ["for dr, dc in (1, 0), (-1, 0), (0, 1), (0, -1):", "    nr, nc = r + dr, c + dc", "    if 0 <= nr < rows and 0 <= nc < cols:", "        # (nr, nc) is a neighbour"], 5.6, 1.9, 7.13, 2.2, { fontSize: 14.5 });
  T(s, "No adjacency list is needed. You compute the neighbours from the row and column.", 5.6, 4.3, 7.13, 0.8, { fontSize: 16 });
  explain(s, "Check the bounds before you read the cell. A negative index does not raise an error in Python: it silently wraps to the other side.", { y: 5.6, h: 1.15, fontSize: 18 });

  // Number of islands
  { const g = ["11000", "11000", "00100", "00011"].map((r) => r.split(""));
    const isl = [[[0, 0], [0, 1], [1, 0], [1, 1]], [[2, 2]], [[3, 3], [3, 4]]];
    const cols = [[K.blueSoft, K.blue], [K.amberSoft, K.amber], [K.purpleSoft, K.purple]];
    for (let k = 0; k <= 3; k++) {
      s = D.step("Number of Islands", k + 1, 4);
      grid(s, g, 1.5, 1.85, 0.78, (r, c, v) => {
        for (let q = 0; q < k; q++) if (isl[q].some(([a, b]) => a === r && b === c)) return cols[q];
        return v === "1" ? [K.greenSoft, null] : [K.white, null];
      });
      kv(s, "count", k, 7.2, 1.9, { w: 1.9, line: K.green });
      T(s, "green = unvisited land     white = water", 7.2, 3.15, 5.5, 0.4, { fontSize: 15, color: K.mute });
      T(s, k === 0 ? "Scan row by row, left to right." : `Island ${k}: found at row ${isl[k - 1][0][0]}, column ${isl[k - 1][0][1]}`, 7.2, 3.7, 5.5, 0.5, { fontSize: 19, bold: true, color: K.navy });
      explain(s, k === 0 ? "Each time the scan meets land that has not been visited, that is a new island."
        : k < 3 ? `New land: count becomes ${k}. Run DFS from it and mark every connected land cell, so this island is never counted again. Then keep scanning.`
        : "The last piece of land is found and marked. The scan reaches the end: 3 islands. Every cell is visited a constant number of times, so O(rows × cols).", { y: 5.6, h: 1.15, fontSize: 18 });
    } }

  s = D.content("Flood Fill: the same DFS, started once", "Solo problem. Point out the trap: if the new colour equals the old one, return early or the recursion never ends.");
  const img = [[1, 1, 1], [1, 1, 0], [1, 0, 1]], after = [[2, 2, 2], [2, 2, 0], [2, 0, 1]];
  T(s, "before", 1.6, 1.7, 3.2, 0.3, { fontSize: 14, color: K.mute, fontFace: MONO, align: "center" });
  grid(s, img, 1.6, 2.05, 1.0, (r, c) => (r === 1 && c === 1 ? [K.blueSoft, K.blue] : [K.white, null]));
  arrow(s, 5.1, 3.6, 6.2, 3.6, { color: K.blue, w: 2.5 });
  T(s, "after", 6.5, 1.7, 3.2, 0.3, { fontSize: 14, color: K.mute, fontFace: MONO, align: "center" });
  grid(s, after, 6.5, 2.05, 1.0, (r, c, v) => (v === 2 ? [K.amberSoft, K.amber] : [K.white, null]));
  card(s, 10.1, 2.05, 2.63, 3.1, "Start (1, 1)", "New colour 2. The 1 in the bottom corner is not connected, so it stays.", { bodySize: 14, titleSize: 17 });
  explain(s, "Remember the original colour before you start. If the new colour equals it, return immediately.", { y: 5.6, h: 1.15 });

  // DP
  s = D.content("Dynamic programming is recursion plus memory", "This is the Fibonacci tree from the last session. Grey calls are answered from memory and never expanded.");
  drawFib(s, 5, 1.2, 1.8, 10.9, (k, first) => (first ? [K.greenSoft, K.green, K.ink] : [K.grey, K.border, K.mute]));
  explain(s, [{ text: "Store each answer the first time you compute it. ", options: { bold: true } }, { text: "Green calls do real work, once each. Grey calls are looked up. 15 calls become 6 pieces of work: O(2ⁿ) becomes O(n)." }], { y: 5.75, h: 1.0, fontSize: 18 });

  s = D.content("Every DP solution is reached in three steps");
  [["Plain recursion", "Correct, but it solves the same subproblem many times.", "O(2ⁿ)", K.red],
   ["Memoisation", "The same recursion, plus a dictionary of answers already computed. Top-down.", "O(n)", K.blue],
   ["Table", "Fill a list from the smallest case upwards. No recursion. Bottom-up.", "O(n)", K.green]]
    .forEach(([t, b, c, col], i) => {
      const x = X0 + i * 4.11;
      card(s, x, 1.8, 3.9, 3.3, t, b, { num: i + 1, accent: col, titleSize: 21, bodySize: 16 });
      T(s, c, x + 0.3, 4.3, 3.3, 0.6, { fontSize: 26, bold: true, color: col, fontFace: MONO });
      if (i < 2) arrow(s, x + 3.92, 3.45, x + 4.09, 3.45, { color: K.mute, w: 2 });
    });
  explain(s, "Use DP when the recursion asks the same question more than once, and the big answer is built from smaller answers. Always write the recursion first.");

  s = D.content("The method for any DP problem");
  [["State", "Say in words what dp[i] means."], ["Recurrence", "How does dp[i] come from smaller states?"], ["Base cases", "The smallest states, answered directly."], ["Order", "Fill so that what you need is already there."]]
    .forEach(([t, b], i) => card(s, X0 + i * 3.08, 1.9, 2.9, 3.0, t, b, { num: i + 1, titleSize: 21, bodySize: 16 }));
  explain(s, "Clue words: \"number of ways\", \"minimum cost\", \"maximum profit\", with a choice to make at every step.");

  s = D.content("Climbing Stairs: think about the last move");
  for (let i = 0; i < 5; i++) {
    box(s, 1.2 + i * 1.0, 4.6 - i * 0.6, 1.0 + (4 - i) * 1.0, 0.6, { fill: i === 4 ? K.greenSoft : i >= 2 ? K.blueSoft : K.soft, line: K.border, r: 0.02 });
    T(s, String(i + 1), 1.2 + i * 1.0, 4.6 - i * 0.6, 1.0, 0.6, { fontSize: 17, bold: true, align: "center", valign: "middle", fontFace: MONO });
  }
  arrow(s, 4.7, 2.75, 5.55, 2.15, { color: K.blue, w: 2.5 }); arrow(s, 3.7, 3.35, 5.4, 2.1, { color: K.amber, w: 2.5 });
  T(s, "1 step", 5.75, 1.75, 1.2, 0.3, { fontSize: 14, bold: true, color: K.blue }); T(s, "2 steps", 2.5, 2.85, 1.1, 0.3, { fontSize: 14, bold: true, color: K.amber, align: "right" });
  card(s, 7.4, 1.8, 5.33, 3.4, "You reach step n from two places", "From step n − 1 with a 1-step move, or from step n − 2 with a 2-step move.", { bodySize: 16, titleSize: 19 });
  code(s, ["ways(n) = ways(n - 1) + ways(n - 2)", "ways(1) = 1     ways(2) = 2"], 7.7, 3.75, 4.73, 1.15, { fontSize: 14.5 });
  explain(s, "State: ways(i) is the number of distinct ways to reach step i. The recurrence is Fibonacci in disguise.");

  { const dp = [null, 1, 2, null, null, null];
    for (let i = 2; i <= 5; i++) {
      if (i > 2) dp[i] = dp[i - 1] + dp[i - 2];
      s = D.step("Climbing Stairs: fill the table  (n = 5)", i - 1, 4);
      const f = {}, ln = {};
      if (i > 2) { f[i - 1] = K.greenSoft; ln[i - 1] = K.green; f[i - 2] = K.blueSoft; f[i - 3] = K.blueSoft; } else { f[0] = K.blueSoft; f[1] = K.blueSoft; }
      const a = cells(s, dp.slice(1).map((v) => (v === null ? "" : v)), 4.2, 2.7, { label: "dp", idxFrom: 1, fill: f, line: ln });
      if (i > 2) ptr(s, "i", a.cx(i - 1), a.top, "down", K.green, 0.7);
      explain(s, i === 2 ? "Base cases: one way to reach step 1, two ways to reach step 2 (1+1, or 2)."
        : `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}.` + (i === 5 ? " Answer: 8 ways. Only the last two values are ever needed, so two variables are enough: O(1) space." : ""));
    } }

  { const v = [2, 7, 9, 3, 1], dp = [];
    v.forEach((x, i) => {
      let msg;
      if (i === 0) { dp[0] = x; msg = "One house: take it. dp[0] = 2."; }
      else if (i === 1) { dp[1] = Math.max(v[0], v[1]); msg = "Two houses: they are neighbours, so take the richer one. dp[1] = 7."; }
      else { const skip = dp[i - 1], take = dp[i - 2] + x; dp[i] = Math.max(skip, take);
        msg = `Skip house ${i}: keep dp[${i - 1}] = ${skip}.   Take it: dp[${i - 2}] + ${x} = ${take}.   The larger is ${dp[i]}.` + (i === 4 ? " Answer: 12." : ""); }
      s = D.step("House Robber: take or skip", i + 1, 5);
      const a = cells(s, v, 3.9, 2.4, { label: "nums", fill: { [i]: K.blueSoft }, line: { [i]: K.blue } });
      ptr(s, "i", a.cx(i), a.top, "down", K.blue, 0.7);
      cells(s, v.map((_, j) => (j <= i ? dp[j] : "")), 3.9, 4.05, { label: "dp", idx: false, fill: { [i]: K.greenSoft }, line: { [i]: K.green } });
      explain(s, [{ text: "dp[i] = max(dp[i-1], dp[i-2] + nums[i])", options: { fontFace: MONO, bold: true, fontSize: 17 } }, { text: "\n" + msg }], { y: 5.5, h: 1.3, fontSize: 18 });
    }); }

  D.lab("Lab: graphs and DP", [["Number of Islands", "Live", "LeetCode 200. Scan, count, sink."], ["Climbing Stairs", "Guided", "LeetCode 70. Recursion, then memo, then table."],
    ["Flood Fill", "Solo", "LeetCode 733. One DFS. Return early if the colour is the same."], ["House Robber", "Solo", "LeetCode 198. Take or skip."]]);
  D.debrief([["Number of Islands", "DFS on a grid", "O(r·c)", "O(r·c)"], ["Flood Fill", "DFS from one cell", "O(r·c)", "O(r·c)"], ["Climbing Stairs", "dp[i-1] + dp[i-2]", "O(n)", "O(1)"], ["House Robber", "Take or skip", "O(n)", "O(1)"]],
    ["BFS or DFS: when would you use each?", "Memoisation or tabulation: what is the difference?", "What two properties make a problem a DP problem?"]);

  // ------------------------------------------------------------ close
  D.section("Close");
  s = D.content("Seven sessions of DSA: what you can now recognise");
  table(s, [["If the problem says", "Think of"],
    ["\"all subsets\", \"all combinations\", \"all permutations\"", "Backtracking"],
    ["\"tree\" and \"depth\", \"height\", \"path\"", "DFS recursion"],
    ["\"tree\" and \"level\"", "BFS with a queue"],
    ["\"grid\", \"islands\", \"connected\", \"regions\"", "Graph DFS or BFS"],
    ["\"shortest path\" with equal step costs", "BFS"],
    ["\"number of ways\", \"minimum cost\", \"maximum profit\"", "Dynamic programming"]],
    X0, 1.65, CW, [8.0, 4.13], { rowH: 0.66, fontSize: 17, boldFirst: false });

  s = D.content("Evening practice");
  [["Finish the Solo problems", "Subsets, Level Order Traversal, Flood Fill, House Robber."], ["Two new problems", "Invert Binary Tree, and Max Area of Island."],
   ["Commit", "Everything goes in day3/ in your repository."]]
    .forEach(([t, b], i) => card(s, X0 + i * 4.11, 1.9, 3.9, 2.6, t, b, { num: i + 1, titleSize: 19, bodySize: 16 }));
  explain(s, "After the break: DBMS concepts and SQL. The evening list also has 10 SQL queries and one data analysis notebook from this afternoon.", { y: 5.0, h: 1.2, fontSize: 18 });

  return D.save(out);
};
