// Builds the classroom decks into slides/dist.  Usage: node build.js [1|2|3 ...]
const path = require("path");
const decks = {
  1: ["./day1", "Day-1-Programming-Foundations.pptx"],
  2: ["./day2", "Day-2-DSA-I.pptx"],
  3: ["./day3", "Day-3-DSA-II.pptx"],
};
(async () => {
  const want = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(decks);
  for (const d of want) {
    const [mod, file] = decks[d];
    const out = await require(mod)(path.join(__dirname, "dist", file));
    console.log("built", path.relative(process.cwd(), out));
  }
})().catch((e) => { console.error(e); process.exit(1); });
