// Page enhancements. Runs on every page load, including instant navigation.
const KSR_LANGS = {
  py: "Python", python: "Python", pycon: "Python Shell", sql: "SQL",
  bash: "Terminal", sh: "Terminal", shell: "Terminal", console: "Terminal",
  json: "JSON", yaml: "YAML", markdown: "Markdown", md: "Markdown", text: "Text"
};

document$.subscribe(() => {
  // Label every code block with its language
  document.querySelectorAll(".md-typeset div.highlight").forEach((block) => {
    if (block.querySelector(":scope > .filename")) return;
    const lang = [...block.classList].find((c) => c.startsWith("language-"));
    const key = lang ? lang.slice(9) : "text";
    const label = document.createElement("span");
    label.className = "filename";
    label.textContent = block.classList.contains("output") ? "Output" : (KSR_LANGS[key] || key);
    block.prepend(label);
  });

  // Session pages only
  const lesson = document.querySelector(".ksr-lesson");
  if (!lesson) return;

  // Category badge above the title
  const h1 = lesson.querySelector("h1");
  if (h1 && lesson.dataset.category && !lesson.querySelector(".ksr-badge")) {
    const badge = document.createElement("span");
    badge.className = "ksr-badge";
    badge.textContent = lesson.dataset.category;
    h1.before(badge);
  }

  // Number badge inside each section heading
  const sections = lesson.querySelectorAll(":scope > h2");
  sections.forEach((h2, i) => {
    if (h2.querySelector(".ksr-num")) return;
    const num = document.createElement("span");
    num.className = "ksr-num";
    num.textContent = String(i + 1).padStart(2, "0");
    num.title = `Section ${i + 1} of ${sections.length}`;
    h2.prepend(num);
  });

  // "Problem name · Live" -> problem name with a Live / Guided / Solo pill
  lesson.querySelectorAll("h3").forEach((h3) => {
    if (h3.querySelector(".ksr-mode")) return;
    for (const node of h3.childNodes) {
      if (node.nodeType !== Node.TEXT_NODE) continue;
      const match = node.textContent.match(/^(.*?)\s·\s(Live|Guided|Solo)\s*$/);
      if (!match) continue;
      node.textContent = match[1];
      const pill = document.createElement("span");
      pill.className = `ksr-mode ksr-mode-${match[2].toLowerCase()}`;
      pill.textContent = match[2];
      node.after(pill);
      break;
    }
  });
});
