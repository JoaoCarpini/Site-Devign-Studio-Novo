import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const brandDir = join(__dirname, '../public/brand');
const sourcePath = join(brandDir, 'logo-symbol.png');
const symbolScale = 0.76;

const darkBackground = { r: 5, g: 5, b: 9, alpha: 1 };

async function loadTrimmedSymbolBuffer() {
  return sharp(sourcePath).trim({ threshold: 14 }).png().toBuffer();
}

async function renderIcon(size, background = null) {
  const symbolSize = Math.round(size * symbolScale);
  const offset = Math.round((size - symbolSize) / 2);

  const trimmed = await loadTrimmedSymbolBuffer();
  const symbol = await sharp(trimmed)
    .resize(symbolSize, symbolSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: background ?? { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).composite([{ input: symbol, top: offset, left: offset }]);
}

async function writeIcon(filename, size, background = null) {
  const output = join(brandDir, filename);
  await (await renderIcon(size, background))
    .png({ compressionLevel: 9, effort: 10, palette: size <= 32 })
    .toFile(output);
  console.log(`✓ ${filename} (${size}×${size})`);
}

async function writeSvg() {
  const size = 32;
  const symbolSize = Math.round(size * symbolScale);
  const offset = Math.round((size - symbolSize) / 2);

  const trimmed = await loadTrimmedSymbolBuffer();
  const symbolPng = await sharp(trimmed)
    .resize(symbolSize, symbolSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer();

  const b64 = symbolPng.toString('base64');

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Devign Studio">
  <title>Devign Studio</title>
  <image href="data:image/png;base64,${b64}" x="${offset}" y="${offset}" width="${symbolSize}" height="${symbolSize}" />
</svg>`;

  writeFileSync(join(brandDir, 'favicon.svg'), svg);
  console.log('✓ favicon.svg');
}

async function main() {
  await writeIcon('favicon-16.png', 16);
  await writeIcon('favicon-32.png', 32);
  await writeIcon('favicon-48.png', 48);
  await writeIcon('favicon.png', 32);
  await writeIcon('apple-touch-icon.png', 180);

  await writeIcon('favicon-16-dark.png', 16, darkBackground);
  await writeIcon('favicon-32-dark.png', 32, darkBackground);
  await writeIcon('favicon-dark.png', 32, darkBackground);

  await writeSvg();
  console.log('\nFavicons gerados em public/brand/');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
