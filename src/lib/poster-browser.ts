import type { Browser } from "puppeteer-core";
import { existsSync } from "fs";

/**
 * Launch headless Chrome for poster capture.
 *  - On serverless (Vercel / Lambda): puppeteer-core + @sparticuz/chromium,
 *    which ships a Chromium binary that runs in the function.
 *  - Locally: puppeteer-core driving the system Chrome/Edge (no bundled
 *    Chromium needed). Override with PUPPETEER_EXECUTABLE_PATH if needed.
 */
const LOCAL_CHROME_CANDIDATES = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
];

function localChromePath(): string {
  const found = LOCAL_CHROME_CANDIDATES.find((p): p is string => typeof p === "string" && existsSync(p));
  if (!found) {
    throw new Error(
      "Fann ekki Chrome/Edge á vélinni fyrir plakat-export. Settu PUPPETEER_EXECUTABLE_PATH á slóð á chrome.exe."
    );
  }
  return found;
}

export async function getPosterBrowser(): Promise<Browser> {
  const puppeteer = (await import("puppeteer-core")).default;
  const onServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_VERSION);

  if (onServerless) {
    const chromium = (await import("@sparticuz/chromium")).default;
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }

  return puppeteer.launch({
    headless: true,
    executablePath: localChromePath(),
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}
