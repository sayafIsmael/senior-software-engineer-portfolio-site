import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'module';

const projectRoot = 'e:/Abu Sayaf/Portfolio/abu-sayaf-astro-portfolio';
const require = createRequire(path.join(projectRoot, 'package.json'));
const sharp = require('sharp');

const publicDir = path.join(projectRoot, 'public');

// Perfected SVG Favicon
// 512x512 canvas, centered at (256, 256)
// Letter A width: 228px (from 92 to 320)
// Gap: 42px
// Slash width: 58px (from 362 to 420 at base, from 264 to 322 at top)
// Angle: dx=98 over dy=280 (dy/dx ~ 2.857, ~70.7°)
// Optical and mathematical center: exactly at (256, 256)
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <title>Abu Sayaf Favicon</title>
  <defs>
    <!-- Background Gradient (Rich Obsidian with deep forest undertone) -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#142118"/>
      <stop offset="50%" stop-color="#0b130e"/>
      <stop offset="100%" stop-color="#050806"/>
    </linearGradient>

    <!-- Border Rim Highlight (Crisp emerald rim) -->
    <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ade80" stop-opacity="0.55"/>
      <stop offset="45%" stop-color="#22c55e" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#15803d" stop-opacity="0.08"/>
    </linearGradient>

    <!-- Inner Ambient Radial Glow -->
    <radialGradient id="innerGlow" cx="68%" cy="32%" r="62%">
      <stop offset="0%" stop-color="#22c55e" stop-opacity="0.30"/>
      <stop offset="50%" stop-color="#22c55e" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="#22c55e" stop-opacity="0"/>
    </radialGradient>

    <!-- Letter A Gradient (Crisp architectural white to subtle mint cream) -->
    <linearGradient id="letterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#edf6e8"/>
    </linearGradient>

    <!-- Signature Emerald Slash Gradient (High-energy tech emerald) -->
    <linearGradient id="slashGrad" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#6ee7b7"/>
      <stop offset="35%" stop-color="#34d399"/>
      <stop offset="75%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>

    <!-- Soft Drop Shadow for Glyphs -->
    <filter id="subtleShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.65"/>
    </filter>

    <!-- Slash Glow -->
    <filter id="slashGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="14" flood-color="#34d399" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Squircle Base with 120px corner radius -->
  <rect x="24" y="24" width="464" height="464" rx="120" fill="url(#bgGrad)"/>
  
  <!-- Ambient Emerald Light inside squircle -->
  <rect x="24" y="24" width="464" height="464" rx="120" fill="url(#innerGlow)"/>

  <!-- Crisp Rim Border -->
  <rect x="24" y="24" width="464" height="464" rx="120" fill="none" stroke="url(#rimGrad)" stroke-width="7"/>

  <!-- Architectural Monogram: A / -->
  <g filter="url(#subtleShadow)">
    <!-- Precision Geometric Letter A -->
    <path d="M 190 116
             L 222 116
             L 320 396
             L 262 396
             L 239 328
             L 173 328
             L 150 396
             L 92 396
             Z
             M 206 200
             L 185 278
             L 227 278
             Z"
          fill="url(#letterGrad)"/>

    <!-- The Signature Architectural Slash / (Parallel to right leg of A) -->
    <path d="M 264 116
             L 322 116
             L 420 396
             L 362 396
             Z"
          fill="url(#slashGrad)"
          filter="url(#slashGlow)"/>
  </g>
</svg>`;

function createIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const headerSize = 6 + (numImages * 16);
  let currentOffset = headerSize;
  const entries = [];
  
  for (const { width, height, buffer } of pngBuffers) {
    const size = buffer.length;
    entries.push({
      width: width >= 256 ? 0 : width,
      height: height >= 256 ? 0 : height,
      colorCount: 0,
      reserved: 0,
      planes: 1,
      bitCount: 32,
      bytesInRes: size,
      imageOffset: currentOffset
    });
    currentOffset += size;
  }
  
  const totalSize = currentOffset;
  const icoBuffer = Buffer.alloc(totalSize);
  
  // Header
  icoBuffer.writeUInt16LE(0, 0); // reserved
  icoBuffer.writeUInt16LE(1, 2); // 1 = ICO
  icoBuffer.writeUInt16LE(numImages, 4);
  
  // Directory entries
  entries.forEach((entry, idx) => {
    const offset = 6 + (idx * 16);
    icoBuffer.writeUInt8(entry.width, offset + 0);
    icoBuffer.writeUInt8(entry.height, offset + 1);
    icoBuffer.writeUInt8(entry.colorCount, offset + 2);
    icoBuffer.writeUInt8(entry.reserved, offset + 3);
    icoBuffer.writeUInt16LE(entry.planes, offset + 4);
    icoBuffer.writeUInt16LE(entry.bitCount, offset + 6);
    icoBuffer.writeUInt32LE(entry.bytesInRes, offset + 8);
    icoBuffer.writeUInt32LE(entry.imageOffset, offset + 12);
  });
  
  // Image buffers
  pngBuffers.forEach(({ buffer }, idx) => {
    buffer.copy(icoBuffer, entries[idx].imageOffset);
  });
  
  return icoBuffer;
}

async function generateAll() {
  // 1. Write favicon.svg
  const svgPath = path.join(publicDir, 'favicon.svg');
  fs.writeFileSync(svgPath, svgContent, 'utf8');
  console.log('Written favicon.svg');

  // 2. Generate PNGs
  const svgBuffer = Buffer.from(svgContent);

  const pngSizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  for (const { name, size } of pngSizes) {
    const outPath = path.join(publicDir, name);
    await sharp(svgBuffer).resize(size, size).png().toFile(outPath);
    console.log(`Generated ${name} (${size}x${size})`);
  }

  // 3. Generate favicon.ico with 16x16, 32x32, 48x48
  const icoSizes = [16, 32, 48];
  const icoPngBuffers = [];
  for (const size of icoSizes) {
    const buf = await sharp(svgBuffer).resize(size, size).png().toBuffer();
    icoPngBuffers.push({ width: size, height: size, buffer: buf });
  }

  const icoBuffer = createIco(icoPngBuffers);
  const icoPath = path.join(publicDir, 'favicon.ico');
  fs.writeFileSync(icoPath, icoBuffer);
  console.log(`Generated favicon.ico (${icoBuffer.length} bytes, containing 16x16, 32x32, 48x48)`);

  // 4. Generate site.webmanifest
  const manifest = {
    name: 'Abu Sayaf | Senior Software Engineer & Software Architect',
    short_name: 'Abu Sayaf',
    description: 'Abu Sayaf is a senior full-stack software engineer with 10 years of experience in software architecture, distributed systems, security-aware engineering, and production delivery.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0c110e',
    theme_color: '#0c110e',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml'
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };

  const manifestPath = path.join(publicDir, 'site.webmanifest');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log('Written site.webmanifest');
}

generateAll().catch(err => {
  console.error('Error generating favicon assets:', err);
  process.exit(1);
});
