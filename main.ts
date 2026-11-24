// A tiny, deterministic make.fun entrypoint.
// It emits one haiku; no network calls, no clocks read, no random choices.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The judged artifact lives in a single file inside this directory.
const OUTPUT_FILE = "entry.txt";

// Where the contest harness wants our output; fall back to a sane default.
function outputDirectory(): string {
  return process.env.MAKEFUN_OUTPUT_DIR || "/output";
}

// The three lines are kept together so the syllable count stays 5-7-5.
function haikuLines(): string[] {
  return [
    "Cursor blinks at three",
    "one log line says nothing new",
    "the bug was the clock",
  ];
}

// Joining with "\n" and appending one final "\n" yields exactly three lines.
function render(lines: string[]): string {
  return lines.join("\n") + "\n";
}

// Create the directory (idempotently), then write the bytes in one shot.
function main(): void {
  const directory = outputDirectory();
  mkdirSync(directory, { recursive: true });

  const artifact = render(haikuLines());
  const destination = join(directory, OUTPUT_FILE);
  // Three lines, seventeen syllables, one deterministic write.
  writeFileSync(destination, artifact, "utf8");
}

main();
