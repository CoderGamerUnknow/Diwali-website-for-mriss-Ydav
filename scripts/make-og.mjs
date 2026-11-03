/**
 * Builds the assets that social apps show when the link is shared:
 *
 *   public/og-image.png        1200 × 630  (WhatsApp, iMessage, Facebook, X)
 *   public/apple-touch-icon.png  180 × 180 (home-screen icon on iOS)
 *
 * The copy comes from src/const/site.js, so renaming the recipient and running
 * `npm run og` keeps the preview card in step with the page.
 */
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { site } from "../src/const/site.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const WIDTH = 1200;
const HEIGHT = 630;

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const stars = Array.from({ length: 56 }, (_, index) => {
  const x = ((index * 173.7) % (WIDTH - 64)) + 32;
  const y = ((index * 97.3) % (HEIGHT - 56)) + 28;
  const radius = index % 9 === 0 ? 1.9 : 1;
  const opacity = 0.1 + ((index * 7) % 38) / 100;
  return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius}" fill="#fdf4e3" opacity="${opacity.toFixed(2)}"/>`;
}).join("\n    ");

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${WIDTH}" y2="${HEIGHT}" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0b0706"/>
      <stop offset="0.55" stop-color="#1e130c"/>
      <stop offset="1" stop-color="#33150c"/>
    </linearGradient>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientTransform="translate(600 300) scale(540 400)" gradientUnits="userSpaceOnUse">
      <stop stop-color="#f2a93b" stop-opacity="0.2"/>
      <stop offset="0.55" stop-color="#f08a25" stop-opacity="0.06"/>
      <stop offset="1" stop-color="#f08a25" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="330" y1="180" x2="880" y2="420" gradientUnits="userSpaceOnUse">
      <stop stop-color="#c07a22"/>
      <stop offset="0.34" stop-color="#ffe6bc"/>
      <stop offset="0.62" stop-color="#f2a93b"/>
      <stop offset="1" stop-color="#d68f2c"/>
    </linearGradient>
    <linearGradient id="flame" x1="600" y1="16" x2="600" y2="64" gradientUnits="userSpaceOnUse">
      <stop stop-color="#fffbe6"/>
      <stop offset="0.4" stop-color="#ffe28a"/>
      <stop offset="0.75" stop-color="#ffb020"/>
      <stop offset="1" stop-color="#f97316"/>
    </linearGradient>
    <linearGradient id="bowl" x1="548" y1="66" x2="652" y2="96" gradientUnits="userSpaceOnUse">
      <stop stop-color="#d9a05b"/>
      <stop offset="0.5" stop-color="#a45c2a"/>
      <stop offset="1" stop-color="#5c2d13"/>
    </linearGradient>
    <radialGradient id="warm" cx="0" cy="0" r="1" gradientTransform="translate(600 58) scale(96 62)" gradientUnits="userSpaceOnUse">
      <stop stop-color="#ffb45a" stop-opacity="0.34"/>
      <stop offset="1" stop-color="#ffb45a" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

  <g fill="none" stroke="#f2a93b">
    <circle cx="600" cy="330" r="150" opacity="0.1"/>
    <circle cx="600" cy="330" r="210" opacity="0.08"/>
    <circle cx="600" cy="330" r="278" opacity="0.05"/>
    <circle cx="600" cy="330" r="344" opacity="0.035"/>
  </g>

  <g>
    ${stars}
  </g>

  <g>
    <ellipse cx="600" cy="58" rx="96" ry="62" fill="url(#warm)"/>
    <path d="M600 16c10.5 15 17 23 12.3 34.6-3.2 8-9.3 11.4-12.3 11.4s-9.1-3.4-12.3-11.4C583 39 589.5 31 600 16Z" fill="url(#flame)"/>
    <path d="M600 30c4.6 6.6 7.4 10.2 5.3 15.3-1.3 3.2-3.6 4.7-5.3 4.7s-4-1.5-5.3-4.7c-2.1-5.1.7-8.7 5.3-15.3Z" fill="#fffbea" opacity="0.92"/>
    <rect x="598.6" y="54" width="2.8" height="9" rx="1.4" fill="#4a2711"/>
    <path d="M548 68c6 12.6 24.8 19 52 19s46-6.4 52-19c-2.2 16.8-24 28.4-52 28.4S550.2 84.8 548 68Z" fill="url(#bowl)"/>
    <ellipse cx="600" cy="68" rx="52" ry="8.4" fill="#e8b264"/>
    <ellipse cx="600" cy="69" rx="40" ry="5" fill="#3d1d0d" opacity="0.5"/>
  </g>

  <rect x="26" y="26" width="1148" height="578" fill="none" stroke="#f2a93b" stroke-opacity="0.55"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#f2a93b" stroke-opacity="0.18"/>

  <g fill="none" stroke="#ffe6bc" stroke-opacity="0.85" stroke-width="2">
    <path d="M26 72V26h46"/>
    <path d="M1174 72V26h-46"/>
    <path d="M26 558v46h46"/>
    <path d="M1174 558v46h-46"/>
  </g>

  <text x="600" y="141" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="17" letter-spacing="7" fill="#f2a93b" opacity="0.92">THE FESTIVAL OF LIGHTS</text>

  <text x="600" y="278" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="126" font-weight="700" letter-spacing="2" fill="url(#gold)">Happy</text>
  <text x="600" y="396" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="126" font-weight="700" letter-spacing="2" fill="url(#gold)">Diwali</text>

  <text x="600" y="452" text-anchor="middle" font-family="'Nirmala UI', 'Noto Sans Devanagari', 'Tiro Devanagari Hindi', serif" font-size="32" letter-spacing="3" fill="#f2a93b">शुभ दीपावली</text>

  <line x1="468" y1="494" x2="732" y2="494" stroke="#f2a93b" stroke-opacity="0.35"/>
  <text x="600" y="500" text-anchor="middle" font-family="'Segoe UI Symbol', Georgia, serif" font-size="15" fill="#f2a93b">✦</text>

  <text x="600" y="537" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="20" letter-spacing="5.5" fill="#fdf4e3" opacity="0.84">A LETTER FOR ${escapeXml(
    site.principalShort.toUpperCase()
  )}</text>
  <text x="600" y="577" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="13.5" letter-spacing="3.5" fill="#fdf4e3" opacity="0.4">FROM ${escapeXml(
    site.letter.signature.toUpperCase()
  )} · ${escapeXml(site.diwaliLabel.toUpperCase())}</text>
</svg>`;

await sharp(Buffer.from(ogSvg))
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "public/og-image.png"));

const favicon = await readFile(path.join(root, "public/favicon.svg"));
await sharp(favicon, { density: 384 })
  .resize(180, 180)
  .flatten({ background: "#0b0706" })
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "public/apple-touch-icon.png"));

for (const file of ["public/og-image.png", "public/apple-touch-icon.png"]) {
  const info = await stat(path.join(root, file));
  console.log(`${file} — ${(info.size / 1024).toFixed(1)} kB`);
}
