import sharp from "sharp";

const poppy = await sharp("public/favicon.svg").resize(330, 330).png().toBuffer();
const background = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#f4ede2"/>
    <circle cx="1100" cy="74" r="170" fill="#eadac9"/>
    <circle cx="1110" cy="565" r="260" fill="#f0e4d6"/>
    <rect width="18" height="630" fill="#8f2822"/>
    <text x="80" y="125" font-family="Georgia,serif" font-size="42" fill="#8f2822">Poppy Project</text>
    <text x="80" y="265" font-family="Georgia,serif" font-size="67" font-weight="600" fill="#2d2925">FemTech w Polsce</text>
    <text x="80" y="355" font-family="Georgia,serif" font-size="57" font-style="italic" fill="#8f2822">i innowacje w zdrowiu kobiet</text>
    <text x="82" y="475" font-family="Arial,sans-serif" font-size="28" fill="#5f574f" letter-spacing="2">WIEDZA · WYDARZENIA · SPOŁECZNOŚĆ</text>
  </svg>
`);

await sharp(background)
  .composite([{ input: poppy, left: 820, top: 150 }])
  .png({ compressionLevel: 9 })
  .toFile("public/og/poppy-project-og.png");
