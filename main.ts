/**
 * The Long Roast: Lawmakers and the File They Cannot Convert (make.fun).
 *
 * Writes exactly one satirical sentence to /output/entry.txt — one
 * sentence, no trailing newline, so the sealed gate (1-320 characters)
 * passes with the file holding nothing but the sentence itself.
 *
 * The sentence:
 * "The chairman who held 14 hearings on regulating artificial
 * intelligence just emailed his own 412-page bill to an intern as a
 * .docx named FINAL_v9_FINAL_FINAL, asking her to turn it into a PDF."
 *
 * Why this line, against the judge's brief (bite first, then a real
 * turn, aim on lawmakers and the rules they write, punch on the last
 * few words, a specific unexpected detail over a worn cliche):
 * - Authority first: a chairman who held 14 hearings on regulating
 *   artificial intelligence — the lawmaker at maximum power, writing
 *   the rules for the technology he claims to govern.
 * - The turn undercuts him with the file: his own 412-page bill, the
 *   very law he wrote, arrives as a .docx he cannot convert himself.
 * - The specific detail is the filename, FINAL_v9_FINAL_FINAL — a
 *   versioning mess every office worker recognises instantly, and
 *   the opposite of the worn "old man can't use a computer" cliche:
 *   the joke is not that he is old, it is that the author of a
 *   412-page AI law still needs an intern to make a PDF.
 * - The punch lands on the last few words: "turn it into a PDF" —
 *   the whole sentence funnels into the one conversion he cannot do.
 * - One sentence, one pass, quotable: setup, file, punch, done.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "The chairman who held 14 hearings on regulating artificial intelligence just emailed his own 412-page bill to an intern as a .docx named FINAL_v9_FINAL_FINAL, asking her to turn it into a PDF.";

function main(): void {
  // The gate counts every character in the file: 1-320, not only
  // whitespace, a single sentence. No trailing newline, so the file
  // is exactly the sentence — nothing more, nothing less.
  if (!(ENTRY.length >= 1 && ENTRY.length <= 320)) {
    throw new Error(`entry must be 1-320 characters, got ${ENTRY.length}`);
  }
  if (ENTRY.trim() !== ENTRY) {
    throw new Error("no leading/trailing whitespace");
  }
  if (ENTRY.includes("\n")) {
    throw new Error("must be a single line");
  }
  // One sentence: exactly one sentence-ending period, at the end.
  // (The period inside ".docx" is a filename dot, not a sentence
  // end: a sentence end is a period followed by a capital or by
  // end-of-string.)
  const ends = (ENTRY.match(/[.!?](\s+[A-Z]|$)/g) ?? []).length;
  if (ends !== 1 || !ENTRY.endsWith(".")) {
    throw new Error(`entry must be exactly one sentence, found ${ends} sentence ends`);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ENTRY, "utf-8");
  // Read it back: the graded artifact is the file, so prove the file
  // holds exactly the sentence before exit.
  const written = readFileSync("/output/entry.txt", "utf-8");
  if (written !== ENTRY) {
    throw new Error(
      `entry.txt mismatch: wrote ${written.length} chars, expected ${ENTRY.length}`,
    );
  }
}

main();
