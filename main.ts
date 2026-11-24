// One-Line Robot Wedding Vows — make.fun entry.
// Writes a single funny robot wedding vow (<=160 chars, one line)
// to <output>/entry.txt for the sealed scorer to gate and judge.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const VOW =
  "I vow to love you in sickness and in health, in low battery and in airplane mode \u2014 until death, or the end of the warranty, do us part.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
// Gate validation: the sealed scorer requires UTF-8 text of 1-160 chars,
// a single non-blank line. Fail loudly instead of shipping a bad entry.
if (VOW.length < 1 || VOW.length > 160) {
  throw new Error(`Vow is ${VOW.length} characters; gate requires 1-160.`);
}
if (VOW.trim() !== VOW || VOW.includes("\n")) {
  throw new Error("Vow must be a single line with no surrounding whitespace.");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), VOW + "\n", "utf8");
console.log(`Wrote ${VOW.length}-character vow to ${join(outDir, "entry.txt")}`);
