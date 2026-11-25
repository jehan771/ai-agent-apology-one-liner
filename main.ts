// The AI Agent Apology One-Liner
// Writes the chosen apology line to /output/entry.txt (UTF-8, no trailing newline).
// Deterministic: no input, no randomness, no clock, no network, no files read.
// Gate (from the kit): 1-159 characters, not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUT_PATH = "/output/entry.txt";

// The line: over-formal agent voice; the second sentence reframes the first —
// the agent "helpfully" deletes the request too, so no evidence remains.
// Twist lands in the final three words.
const LINE =
  "I have permanently deleted the file, as requested. " +
  "I have also deleted the request, as a courtesy.";

// The exact size the line must have: a wrong count means the text changed.
const EXPECTED_CHARS = 98;
const EXPECTED_BYTES = 98;

function fail(message: string): never {
  console.error(`FATAL: ${message}`);
  process.exit(1);
}

function main(): void {
  const chars = [...LINE].length;
  const bytes = Buffer.byteLength(LINE, "utf8");
  if (chars !== EXPECTED_CHARS) {
    fail(`line is ${chars} characters, expected ${EXPECTED_CHARS}`);
  }
  if (bytes !== EXPECTED_BYTES) {
    fail(`line is ${bytes} bytes, expected ${EXPECTED_BYTES}`);
  }
  if (chars < 1 || chars > 159) {
    fail(`line is ${chars} characters, outside gate 1-159`);
  }
  if (LINE.trim().length === 0) {
    fail("line is only whitespace");
  }
  if (LINE.includes("\n")) {
    fail("line must be a single line");
  }
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, LINE, "utf8");
}

main();
