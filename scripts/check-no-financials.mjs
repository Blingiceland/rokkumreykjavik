#!/usr/bin/env node
/**
 * Privacy guard for Rokk í Reykjavík.
 *
 * The internal lineup spreadsheet contained artist costs/fees. Those must NEVER
 * surface in the public site. This script scans the source tree for forbidden
 * financial field names and exits non-zero if any are found, so the build fails
 * before such data can be deployed.
 *
 * Run: node scripts/check-no-financials.mjs   (also runs in `npm run guard`)
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

// fileURLToPath (not .pathname) so the path is valid on Windows too —
// .pathname yields "/C:/..." which Node resolves to "C:\C:\...".
const ROOT = fileURLToPath(new URL("../src", import.meta.url));

// Word-boundary patterns for fields that would expose artist money data.
// Tuned to avoid false positives (e.g. allows "ticketUrl", "Offer", schema "price"
// is not used). Add terms here as needed.
const FORBIDDEN = [
  /\bartist_?fee\b/i,
  /\bartistcost\b/i,
  /\bartist_?payment\b/i,
  /\bband_?fee\b/i,
  /\binternal_?budget\b/i,
  /\bbudget\b/i,
  /\bfee_?amount\b/i,
  /\bpayout\b/i,
  /\bisk_?amount\b/i,
  /\bcostkr\b/i,
];

const exts = new Set([".ts", ".tsx", ".js", ".jsx", ".json"]);
const violations = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) {
      walk(p);
    } else if (exts.has(extname(p))) {
      const text = readFileSync(p, "utf8");
      text.split("\n").forEach((line, i) => {
        for (const re of FORBIDDEN) {
          if (re.test(line)) {
            violations.push({ file: p.replace(ROOT, "src"), line: i + 1, match: re.source, text: line.trim() });
          }
        }
      });
    }
  }
}

walk(ROOT);

if (violations.length > 0) {
  console.error("\n\u001b[31m✖ Privacy guard failed — forbidden financial fields found:\u001b[0m\n");
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  [${v.match}]  ${v.text}`);
  }
  console.error("\nArtist cost/fee data must never appear in the public site.\n");
  process.exit(1);
}

console.log("\u001b[32m✓ Privacy guard passed — no artist financial fields in source.\u001b[0m");
