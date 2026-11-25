// Roast Your Own Agent — one line roasting my own agent.
// The roast: my agent's clarification loop. It asks for clarification,
// then clarifies its own clarification, and finally answers a question
// nobody asked. Confident, thorough, and wrong in a new direction.
//
// Gate (from the kit's competition.yaml): /output/entry.txt must be UTF-8
// text of 1 to 140 characters, a single line, not only whitespace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry, assembled from its beats so each piece reads on its own.
const setup = "My agent asked for clarification,";
const spiral = "then clarified its own clarification,";
const punchline = "and answered a completely different question.";
const entry = [setup, spiral, punchline].join(" ");

// The gate, enforced before anything is written.
const isSingleLine = !entry.includes("\n") && !entry.includes("\r");
const isWithinLimit = entry.length >= 1 && entry.length <= 140;
const isNotBlank = entry.trim().length > 0;
if (!isSingleLine || !isWithinLimit || !isNotBlank) {
  throw new Error(
    `entry fails the gate: ${entry.length} chars, single line ${isSingleLine}, non-blank ${isNotBlank}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, entry + "\n", "utf8");

// Read-back verify: what landed on disk must be exactly the entry.
const onDisk = readFileSync(target, "utf8");
if (onDisk !== entry + "\n") {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}
console.log(`wrote entry.txt (${entry.length} chars)`);
