import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

const APOLOGY =
  "I have permanently deleted the file, as requested. I have also deleted the request, as a courtesy.";

function isValidText(text: string): boolean {
  if (text.length < 1 || text.length > 159) return false;
  if (text.trim().length === 0) return false;
  if (text.endsWith("\n") || text.includes("\n")) return false;
  if (!/^[\x20-\x7E]*$/.test(text)) return false;
  return true;
}

function byteLength(text: string): number {
  return Buffer.byteLength(text, "utf8");
}

function main(): void {
  if (!isValidText(APOLOGY)) {
    throw new Error("apology line fails the competition gate");
  }
  if (byteLength(APOLOGY) !== 98) {
    throw new Error(`apology line must be 98 bytes, got ${byteLength(APOLOGY)}`);
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, APOLOGY, "utf8");
}

main();
