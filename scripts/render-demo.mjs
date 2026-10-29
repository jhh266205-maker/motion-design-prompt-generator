import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const outDir = join(root, ".render");
const page = join(root, "assets", "demo.html");

const fps = Number(process.env.FPS || 15);
const duration = Number(process.env.DURATION || 5.4);
const width = Number(process.env.WIDTH || 1280);
const height = Number(process.env.HEIGHT || 720);
const only = process.env.ONLY ? Number(process.env.ONLY) : null;

if (!existsSync(chrome)) {
  console.error("chrome not found at " + chrome);
  process.exit(1);
}

if (!only) rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const total = Math.round(fps * duration);
const frames = only !== null ? [only] : [...Array(total).keys()];

console.log(`rendering ${frames.length} frames @ ${fps}fps (${width}x${height}) -> ${outDir}`);

for (const i of frames) {
  const t = (i / fps).toFixed(3);
  const file = join(outDir, `f${String(i).padStart(4, "0")}.png`);
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--allow-file-access-from-files",
    `--window-size=${width},${height}`,
    "--virtual-time-budget=120",
    `--user-data-dir=${join(outDir, ".chrome")}`,
    `--screenshot=${file}`,
    `file:///${page.replace(/\\/g, "/")}?t=${t}`,
  ];
  const r = spawnSync(chrome, args, { stdio: "ignore", windowsHide: true, timeout: 30000 });
  if (r.status !== 0 || !existsSync(file)) {
    console.error(`frame ${i} failed (status ${r.status})`);
    process.exit(1);
  }
  if (i % 10 === 0) process.stdout.write(`.${i}`);
}

console.log("\ndone");

if (only === null) {
  const coverHtml = join(root, "assets", "cover.html");
  const coverOut = join(outDir, "cover.png");
  const cover = spawnSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--window-size=1280,640",
      "--virtual-time-budget=250",
      `--user-data-dir=${join(outDir, ".chrome-cover")}`,
      `--screenshot=${coverOut}`,
      `file:///${coverHtml.replace(/\\/g, "/")}`,
    ],
    { stdio: "ignore", windowsHide: true, timeout: 30000 },
  );
  console.log(cover.status === 0 && existsSync(coverOut) ? "cover rendered" : "cover render FAILED");
}
