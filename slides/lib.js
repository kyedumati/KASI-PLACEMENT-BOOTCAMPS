// Shared design and diagram helpers for the bootcamp slide decks.
// Canvas is 13.33 x 7.5 inches (16:9). All positions are in inches.
const pptxgen = require("pptxgenjs");

const K = {
  ink: "1B2033", mute: "5B6478", navy: "172E94", blue: "2447D4", blueSoft: "E8EDFF",
  soft: "F3F6FD", border: "CBD3E6", green: "2F8A68", greenSoft: "E0F2EA",
  amber: "B45309", amberSoft: "FDF1DC", red: "C81E4A", redSoft: "FDE7EC",
  purple: "6D28D9", purpleSoft: "EFE7FD", grey: "E5E9F2", white: "FFFFFF", code: "0F172A",
};
const THEME = {
  name: "Placement Bootcamps", headFontFace: "Calibri", bodyFontFace: "Calibri",
  colors: { dk1: K.ink, lt1: K.white, dk2: K.navy, lt2: K.soft, accent1: K.blue, accent2: K.green,
            accent3: K.amber, accent4: K.red, accent5: K.purple, accent6: K.mute, hlink: K.blue, folHlink: K.purple },
};
const MONO = "Courier New";
const W = 13.33, X0 = 0.6, CW = W - 2 * X0;
const MODE = { Live: [K.blueSoft, K.navy], Guided: [K.greenSoft, "1F6B50"], Solo: [K.amberSoft, "8A4B08"] };

// ---------------------------------------------------------------- primitives

/** Plain text. */
function T(s, text, x, y, w, h, o = {}) {
  s.addText(text, { x, y, w, h, margin: 0, isTextBox: true, fontSize: 16, color: K.ink, valign: "top", ...o });
}
/** Rounded box without text. */
function box(s, x, y, w, h, o = {}) {
  s.addShape("roundRect", {
    x, y, w, h, rectRadius: o.r ?? 0.08, fill: { color: o.fill || K.white },
    line: o.line === false ? { type: "none" } : { color: o.line || K.border, width: o.lw || 1 },
  });
}
/** Rounded box with centred text. */
function tb(s, text, x, y, w, h, o = {}) {
  s.addText(text, {
    shape: o.shape || "roundRect", x, y, w, h, rectRadius: o.r ?? 0.08, margin: o.align === "left" ? 12 : 3,   // points
    fill: { color: o.fill || K.white },
    line: o.line === false ? { type: "none" } : { color: o.line || K.border, width: o.lw || 1 },
    fontSize: o.fontSize || 16, bold: o.bold ?? false, color: o.color || K.ink, fontFace: o.fontFace,
    align: o.align || "center", valign: o.valign || "middle", italic: o.italic,
  });
}
/** Straight line from (x1,y1) to (x2,y2), with an arrow head unless head:false. */
function arrow(s, x1, y1, x2, y2, o = {}) {
  s.addShape("line", {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    flipH: x2 < x1, flipV: y2 < y1,
    line: { color: o.color || K.mute, width: o.w || 1.75, endArrowType: o.head === false ? "none" : "triangle",
            dashType: o.dash ? "dash" : "solid" },
  });
}
/** A row of array cells. Returns helpers for placing pointers. */
function cells(s, vals, x, y, o = {}) {
  const cw = o.cw || 1.1, ch = o.ch || 0.9, gap = o.gap ?? 0.07, step = cw + gap;
  const lw = o.labelW || 1.4;
  if (o.label) T(s, o.label, x - lw - 0.15, y, lw, ch, { align: "right", valign: "middle", fontSize: 15, color: K.mute, fontFace: MONO });
  vals.forEach((v, i) => {
    const f = (o.fill && o.fill[i]) || K.white;
    tb(s, v === null || v === undefined ? "" : String(v), x + i * step, y, cw, ch, {
      fill: f, line: (o.line && o.line[i]) || K.border, lw: o.line && o.line[i] ? 2.25 : 1,
      fontSize: o.fontSize || 26, bold: true, fontFace: MONO, r: 0.05,
      color: (o.color && o.color[i]) || K.ink,
    });
    if (o.idx !== false) T(s, String(o.idxFrom ? i + o.idxFrom : i), x + i * step, y + ch + 0.04, cw, 0.28, { align: "center", fontSize: 13, color: K.mute });
  });
  return { cx: (i) => x + i * step + cw / 2, x: (i) => x + i * step, top: y, bottom: y + ch + (o.idx !== false ? 0.32 : 0.04), step, cw, ch,
           width: vals.length * step - gap };
}
/** Pointer label with an arrow. dir "down": sits above y and points down at it. dir "up": sits below y. */
function ptr(s, label, cx, y, dir, color = K.blue, w = 1.1) {
  if (dir === "down") {
    tb(s, label, cx - w / 2, y - 0.9, w, 0.4, { fill: color, color: K.white, fontSize: 14, bold: true, line: false, fontFace: MONO });
    arrow(s, cx, y - 0.48, cx, y - 0.05, { color, w: 2 });
  } else {
    arrow(s, cx, y + 0.48, cx, y + 0.05, { color, w: 2 });
    tb(s, label, cx - w / 2, y + 0.5, w, 0.4, { fill: color, color: K.white, fontSize: 14, bold: true, line: false, fontFace: MONO });
  }
}
/** Circle node (trees, graphs). */
function node(s, text, cx, cy, o = {}) {
  const d = o.d || 0.78;
  tb(s, String(text), cx - d / 2, cy - d / 2, d, d, {
    shape: "ellipse", fill: o.fill || K.white, line: o.line || K.navy, lw: o.lw || 1.75,
    fontSize: o.fontSize || 18, bold: true, color: o.color || K.ink, fontFace: o.mono === false ? undefined : MONO,
  });
}
/** Edge between two circle centres, trimmed to the circle borders. */
function edge(s, a, b, o = {}) {
  const r = (o.d || 0.78) / 2, dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
  arrow(s, a[0] + (dx / len) * r, a[1] + (dy / len) * r, b[0] - (dx / len) * r, b[1] - (dy / len) * r,
        { head: o.head ?? false, color: o.color || K.mute, w: o.w || 1.75, dash: o.dash });
}
/** Commentary panel across the bottom of a step slide. Accepts a string or pptxgenjs text runs. */
function explain(s, text, o = {}) {
  const y = o.y ?? 5.45, h = o.h ?? 1.3;
  box(s, X0, y, CW, h, { fill: K.soft, line: false, r: 0.1 });
  T(s, text, X0 + 0.35, y, CW - 0.7, h, { fontSize: o.fontSize || 20, valign: "middle" });
}
function stepChip(s, i, n) {
  tb(s, `Step ${i} of ${n}`, 11.0, 0.62, 1.73, 0.44, { fill: K.blueSoft, color: K.navy, fontSize: 13, bold: true, line: false, r: 0.22 });
}
/** Named state variable: small label above a mono value box. */
function kv(s, label, val, x, y, o = {}) {
  const w = o.w || 1.9;
  T(s, label, x, y, w, 0.3, { fontSize: 14, color: K.mute, fontFace: MONO });
  tb(s, String(val), x, y + 0.34, w, 0.7, { fill: o.fill || K.white, line: o.line || K.border, lw: o.line ? 2.25 : 1,
     fontSize: o.fontSize || 24, bold: true, fontFace: MONO, color: o.color || K.ink });
}
/** Card with a heading and body text. */
function card(s, x, y, w, h, title, body, o = {}) {
  box(s, x, y, w, h, { fill: o.fill || K.white, line: o.line || K.border, r: 0.1 });
  let ty = y + 0.25;
  if (o.num !== undefined) {
    tb(s, String(o.num), x + 0.3, y + 0.28, 0.52, 0.52, { shape: "ellipse", fill: o.accent || K.blue, color: K.white, fontSize: 16, bold: true, line: false });
    ty = y + 0.98;
  }
  // Estimate how many lines the title takes, so the body starts below it.
  const ts = o.titleSize || 19, perChar = (o.titleMono ? 0.0084 : 0.0073) * ts;
  const lines = Math.max(1, Math.ceil((String(title).length * perChar) / (w - 0.6)));
  const th = 0.5 + (lines - 1) * ts * 0.0185;
  T(s, title, x + 0.3, ty, w - 0.6, th, { fontSize: ts, bold: true, color: o.titleColor || K.navy, fontFace: o.titleMono ? MONO : undefined });
  if (body) T(s, body, x + 0.3, ty + th + 0.05, w - 0.6, h - (ty - y) - th - 0.25, { fontSize: o.bodySize || 16, color: K.ink, fontFace: o.bodyMono ? MONO : undefined });
}
/** Dark code panel. Use sparingly: code is typed live, not read from slides. */
function code(s, lines, x, y, w, h, o = {}) {
  box(s, x, y, w, h, { fill: K.code, line: false, r: 0.1 });
  T(s, Array.isArray(lines) ? lines.join("\n") : lines, x + 0.3, y + 0.2, w - 0.6, h - 0.4,
    { fontFace: MONO, fontSize: o.fontSize || 16, color: "E2E8F0", valign: o.valign || "middle" });
}
/** Simple table: rows of strings. First row is the header. */
function table(s, rows, x, y, w, colW, o = {}) {
  const fs = o.fontSize || 15;
  const data = rows.map((r, ri) => r.map((c, ci) => ({
    text: String(c),
    options: ri === 0
      ? { bold: true, color: K.white, fill: { color: K.navy }, fontSize: fs, valign: "middle" }
      : { color: K.ink, fill: { color: ri % 2 ? K.white : K.soft }, fontSize: fs, valign: "middle",
          bold: ci === 0 && o.boldFirst !== false, fontFace: o.mono && o.mono.includes(ci) ? MONO : undefined },
  })));
  s.addTable(data, { x, y, w, colW, rowH: o.rowH || 0.5, border: { type: "solid", color: K.border, pt: 0.75 }, margin: [0.05, 0.12, 0.05, 0.12] });
}

// ---------------------------------------------------------------- deck

function deck(dayLabel, title) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.author = "Kasi Yedumati";
  pres.title = title;
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };

  const titlePh = (o) => ({ placeholder: { options: { name: "title", type: "title", align: "left", bold: true, ...o }, text: "" } });
  pres.defineSlideMaster({ title: "TITLE", background: { color: K.navy },
    objects: [titlePh({ x: 0.9, y: 2.2, w: 10.6, h: 1.9, fontSize: 44, color: K.white, valign: "bottom" })] });
  pres.defineSlideMaster({ title: "SECTION", background: { color: K.navy },
    objects: [titlePh({ x: 0.9, y: 2.75, w: 10.6, h: 1.3, fontSize: 40, color: K.white, valign: "top" })] });
  pres.defineSlideMaster({ title: "CONTENT", background: { color: K.white },
    objects: [
      titlePh({ x: X0, y: 0.38, w: 10.2, h: 0.92, fontSize: 30, color: K.navy, valign: "middle" }),
      { text: { text: dayLabel, options: { x: X0, y: 7.0, w: 9, h: 0.3, fontSize: 11, color: K.mute, margin: 0 } } },
    ],
    slideNumber: { x: 12.0, y: 7.0, w: 0.73, h: 0.3, fontSize: 11, color: K.mute, align: "right" } });

  const D = { pres, sec: null };
  D.section = (t) => { pres.addSection({ title: t }); D.sec = t; };
  D.raw = (master) => pres.addSlide({ masterName: master, sectionTitle: D.sec });
  const glow = (s) => {
    s.addShape("ellipse", { x: 9.6, y: -2.2, w: 6, h: 6, fill: { color: K.green, transparency: 72 }, line: { type: "none" } });
    s.addShape("ellipse", { x: 10.9, y: 4.6, w: 4.6, h: 4.6, fill: { color: "4F6EF0", transparency: 70 }, line: { type: "none" } });
  };

  /** Deck title slide. */
  D.title = (eyebrow, heading, sub, notes) => {
    const s = D.raw("TITLE"); glow(s);
    T(s, eyebrow.toUpperCase(), 0.9, 1.7, 10, 0.4, { fontSize: 14, bold: true, color: "BFD0FF", charSpacing: 3 });
    s.addText(heading, { placeholder: "title" });
    T(s, sub, 0.9, 4.35, 9.6, 1.2, { fontSize: 20, color: "DCE4FF" });
    T(s, "Kasi Yedumati", 0.9, 6.5, 6, 0.4, { fontSize: 14, color: "BFD0FF" });
    if (notes) s.addNotes(notes);
    return s;
  };
  /** Session divider. Starts a new PowerPoint section. */
  D.divider = (label, heading, time, topics, notes) => {
    D.section(heading);
    const s = D.raw("SECTION"); glow(s);
    T(s, label.toUpperCase(), 0.9, 2.2, 10, 0.4, { fontSize: 14, bold: true, color: "BFD0FF", charSpacing: 3 });
    s.addText(heading, { placeholder: "title" });
    tb(s, time, 0.9, 4.25, 2.5, 0.5, { fill: K.white, color: K.navy, fontSize: 15, bold: true, line: false, r: 0.25 });
    T(s, topics, 0.9, 5.0, 9.4, 1.2, { fontSize: 18, color: "DCE4FF" });
    if (notes) s.addNotes(notes);
    return s;
  };
  /** Ordinary content slide: a title, then whatever the caller draws. */
  D.content = (title, notes) => {
    const s = D.raw("CONTENT");
    s.addText(title, { placeholder: "title" });
    if (notes) s.addNotes(notes);
    return s;
  };
  /** One step of a walkthrough. */
  D.step = (title, i, n, notes) => { const s = D.content(title, notes); stepChip(s, i, n); return s; };
  /** The interview question that opens a session. */
  D.hook = (question, follow, notes) => {
    const s = D.content("The interview question", notes);
    box(s, X0, 1.7, CW, 3.3, { fill: K.soft, line: false, r: 0.12 });
    tb(s, "?", X0 + 0.5, 2.15, 1.0, 1.0, { shape: "ellipse", fill: K.blue, color: K.white, fontSize: 34, bold: true, line: false });
    T(s, question, X0 + 1.9, 1.95, CW - 2.5, 2.8, { fontSize: 30, bold: true, color: K.navy, valign: "middle" });
    T(s, follow, X0, 5.35, CW, 1.2, { fontSize: 20, color: K.mute });
    return s;
  };
  /** Lab slide: problems with Live / Guided / Solo pills. items: [name, mode, note]. */
  D.lab = (title, items, notes) => {
    const s = D.content(title, notes);
    const rowH = Math.min(1.3, 4.9 / items.length);
    items.forEach(([name, mode, note], i) => {
      const y = 1.65 + i * rowH;
      box(s, X0, y, CW, rowH - 0.14, { fill: K.white, r: 0.1 });
      const [bg, fg] = MODE[mode];
      tb(s, mode.toUpperCase(), X0 + 0.3, y + (rowH - 0.14 - 0.4) / 2, 1.35, 0.4, { fill: bg, color: fg, fontSize: 12, bold: true, line: false, r: 0.2 });
      T(s, name, X0 + 1.95, y, 5.0, rowH - 0.14, { fontSize: 21, bold: true, valign: "middle" });
      T(s, note, X0 + 7.1, y, CW - 7.4, rowH - 0.14, { fontSize: 16, color: K.mute, valign: "middle" });
    });
    return s;
  };
  /** Debrief: complexity of each problem, plus questions to answer aloud. rows: [problem, idea, time, space]. */
  D.debrief = (rows, questions, notes) => {
    const s = D.content("Debrief: say it out loud", notes);
    table(s, [["Problem", "Key idea", "Time", "Space"], ...rows], X0, 1.65, 7.4, [2.55, 2.55, 1.2, 1.1], { rowH: 0.78, fontSize: 16, mono: [2, 3] });
    box(s, 8.35, 1.65, 4.38, 4.9, { fill: K.soft, line: false, r: 0.1 });
    T(s, "Answer in a full sentence", 8.65, 1.85, 3.8, 0.4, { fontSize: 16, bold: true, color: K.navy });
    T(s, questions.map((q, i) => ({ text: q, options: { bullet: { type: "number" }, breakLine: i < questions.length - 1, paraSpaceAfter: 10 } })),
      8.65, 2.45, 3.8, 4.0, { fontSize: 18 });
    return s;
  };
  D.save = async (file) => {
    await pres.writeFile({ fileName: file });
    // Folder entries in the zip can stop a deck opening through cloud storage.
    try { require("child_process").execFileSync("zip", ["-dq", file, "*/"], { stdio: "ignore" }); } catch (e) { /* none present */ }
    if (process.env.PPTX_APPLY_THEME) {
      process.env.NODE_PATH = require("path").join(__dirname, "node_modules");
      require("module").Module._initPaths();
      const { applyTheme } = require(process.env.PPTX_APPLY_THEME);
      await applyTheme(file, THEME);
    }
    return file;
  };
  return D;
}

module.exports = { deck, K, MONO, W, X0, CW, T, box, tb, arrow, cells, ptr, node, edge, explain, stepChip, kv, card, code, table };
