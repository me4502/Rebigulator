import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const publicDirectory = fileURLToPath(new URL('../public/', import.meta.url));
const sourceLogo = join(publicDirectory, 'logo.png');
const pngVariants = [
  ['android-icon-36x36.png', 36],
  ['android-icon-48x48.png', 48],
  ['android-icon-72x72.png', 72],
  ['android-icon-96x96.png', 96],
  ['android-icon-144x144.png', 144],
  ['android-icon-192x192.png', 192],
  ['apple-icon-57x57.png', 57],
  ['apple-icon-60x60.png', 60],
  ['apple-icon-72x72.png', 72],
  ['apple-icon-76x76.png', 76],
  ['apple-icon-114x114.png', 114],
  ['apple-icon-120x120.png', 120],
  ['apple-icon-144x144.png', 144],
  ['apple-icon-152x152.png', 152],
  ['apple-icon-180x180.png', 180],
  ['apple-icon-precomposed.png', 192],
  ['apple-icon.png', 192],
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['favicon-96x96.png', 96],
  ['ms-icon-70x70.png', 70],
  ['ms-icon-144x144.png', 144],
  ['ms-icon-150x150.png', 150],
  ['ms-icon-310x310.png', 310],
];

const renderPng = (size) =>
  sharp(sourceLogo)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: 'nearest',
    })
    .png()
    .toBuffer();

const makeIco = (images) => {
  const directory = Buffer.alloc(6 + images.length * 16);
  directory.writeUInt16LE(1, 2);
  directory.writeUInt16LE(images.length, 4);

  let imageOffset = directory.length;
  for (const [index, image] of images.entries()) {
    const entryOffset = 6 + index * 16;
    directory.writeUInt8(image.size, entryOffset);
    directory.writeUInt8(image.size, entryOffset + 1);
    directory.writeUInt16LE(1, entryOffset + 4);
    directory.writeUInt16LE(32, entryOffset + 6);
    directory.writeUInt32LE(image.data.length, entryOffset + 8);
    directory.writeUInt32LE(imageOffset, entryOffset + 12);
    imageOffset += image.data.length;
  }

  return Buffer.concat([directory, ...images.map(({ data }) => data)]);
};

await Promise.all(
  pngVariants.map(async ([filename, size]) => {
    await writeFile(join(publicDirectory, filename), await renderPng(size));
  })
);

const faviconImages = await Promise.all(
  [16, 32, 48].map(async (size) => ({
    size,
    data: await renderPng(size),
  }))
);
await writeFile(join(publicDirectory, 'favicon.ico'), makeIco(faviconImages));

console.log(`Generated ${pngVariants.length} PNG icons and favicon.ico.`);
