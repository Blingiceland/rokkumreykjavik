// Builds public/_og.html — the share-image poster, with Archivo Black inlined.
// Playwright then screenshots it to public/og.png. Throwaway helper.
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const font = await readFile(
  join(process.cwd(), "node_modules/@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff")
);
const b64 = font.toString("base64");

const INK = "#161310";
const PAPER = "#e7dfcb";
const PINK = "#e8296e";
const YELLOW = "#e6d000";
const heads = ["VINTAGE CARAVAN", "BRAIN POLICE", "MÚR"];

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Archivo Black';src:url(data:font/woff;base64,${b64}) format('woff');font-display:block}
*{margin:0;box-sizing:border-box}
html,body{margin:0}
.og{width:1200px;height:630px;background:${PAPER};border:14px solid ${INK};padding:52px;
  display:flex;flex-direction:column;justify-content:space-between;
  font-family:'Archivo Black',sans-serif;color:${INK};text-transform:uppercase}
.row{display:flex;align-items:center;justify-content:space-between}
.cred{font-size:24px;letter-spacing:3px}
.tag{background:${INK};color:${PAPER};padding:8px 16px;font-size:24px}
.title{display:flex;flex-wrap:wrap;align-items:center;gap:14px}
.title span{padding:4px 22px;line-height:1}
.b-rokk{background:${INK};color:${PAPER};font-size:108px;transform:rotate(-2deg);box-shadow:9px 11px 0 ${PINK}}
.b-i{background:${PINK};color:${PAPER};font-size:84px;transform:rotate(3deg)}
.b-reyk{background:${YELLOW};color:${INK};border:6px solid ${INK};font-size:108px;transform:rotate(1deg);box-shadow:9px 11px 0 ${PINK}}
.heads{display:flex;flex-wrap:wrap;gap:12px}
.heads span{background:${YELLOW};border:4px solid ${INK};padding:6px 14px;font-size:40px}
.dates{font-size:34px}
.free{background:${PINK};color:${PAPER};padding:8px 18px;font-size:34px}
</style></head><body>
<div class="og">
  <div class="row"><div class="cred">Dillon og Rás 2 kynna</div><div class="tag">Júlí 2026</div></div>
  <div class="title"><span class="b-rokk">Rokk</span><span class="b-i">Í</span><span class="b-reyk">Reykjavík</span></div>
  <div class="heads">${heads.map((h) => `<span>${h}</span>`).join("")}</div>
  <div class="row"><div class="dates">4 · 11 · 18 · 25 Júlí</div><div class="free">Ókeypis inn</div></div>
</div></body></html>`;

await writeFile(join(process.cwd(), "public/_og.html"), html, "utf8");
console.log("wrote public/_og.html");
