import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  // Process avatar into a circular crop with green border
  const avatarSize = 280;
  const avatarPath = path.resolve('public/images/portfolio-avatar.png');
  
  // Create circular mask for avatar
  const circleMask = Buffer.from(
    `<svg width="${avatarSize}" height="${avatarSize}">
      <circle cx="${avatarSize / 2}" cy="${avatarSize / 2}" r="${avatarSize / 2}" fill="#fff" />
    </svg>`
  );

  const roundedAvatar = await sharp(avatarPath)
    .resize(avatarSize, avatarSize, { fit: 'cover' })
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Create SVG vector graphics overlay with high-end modern engineering design
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Dark gradient background -->
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0c120e" />
        <stop offset="50%" stop-color="#111a14" />
        <stop offset="100%" stop-color="#080c09" />
      </linearGradient>

      <!-- Emerald glow accents -->
      <radialGradient id="glowTopLeft" cx="15%" cy="20%" r="55%">
        <stop offset="0%" stop-color="#22c55e" stop-opacity="0.18" />
        <stop offset="50%" stop-color="#16a34a" stop-opacity="0.05" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="glowRight" cx="85%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#10b981" stop-opacity="0.15" />
        <stop offset="60%" stop-color="#059669" stop-opacity="0.03" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>

      <!-- Linear emerald gradient for badges/accents -->
      <linearGradient id="emeraldText" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#4ade80" />
        <stop offset="100%" stop-color="#22c55e" />
      </linearGradient>

      <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#22c55e" stop-opacity="0.6" />
        <stop offset="40%" stop-color="#27332b" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#16a34a" stop-opacity="0.4" />
      </linearGradient>

      <!-- Avatar ring border -->
      <linearGradient id="avatarRing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4ade80" />
        <stop offset="50%" stop-color="#16a34a" />
        <stop offset="100%" stop-color="#059669" />
      </linearGradient>

      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000" flood-opacity="0.6" />
      </filter>
    </defs>

    <style>
      .mono { font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
      .badge-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.12em; fill: #4ade80; text-transform: uppercase; }
      .title { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 64px; font-weight: 800; fill: #f8fafc; letter-spacing: -0.03em; }
      .subtitle { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 26px; font-weight: 600; fill: #86efac; letter-spacing: -0.01em; }
      .desc { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 20px; font-weight: 400; fill: #94a3b8; line-height: 1.5; }
      .tag { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; fill: #e2e8f0; }
      .brand-url { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; font-weight: 600; fill: #64748b; letter-spacing: 0.05em; }
    </style>

    <!-- Base Canvas -->
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <rect width="${width}" height="${height}" fill="url(#glowTopLeft)" />
    <rect width="${width}" height="${height}" fill="url(#glowRight)" />

    <!-- Outer card border -->
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="24" fill="none" stroke="url(#borderGrad)" stroke-width="1.5" />

    <!-- Subtle Background Circuit / Grid Lines -->
    <g opacity="0.12" stroke="#22c55e" stroke-width="1">
      <path d="M 80 140 L 400 140 L 440 180 L 700 180" fill="none" />
      <path d="M 200 480 L 520 480 L 560 440 L 800 440" fill="none" />
      <circle cx="700" cy="180" r="4" fill="#22c55e" />
      <circle cx="800" cy="440" r="4" fill="#22c55e" />
      <circle cx="80" cy="140" r="3" fill="#22c55e" />
    </g>

    <!-- Content Group Left -->
    <g transform="translate(80, 80)">
      <!-- Eyebrow Pill -->
      <g>
        <rect x="0" y="0" width="280" height="36" rx="18" fill="#142e1b" stroke="#22c55e" stroke-opacity="0.4" stroke-width="1.2" />
        <circle cx="18" cy="18" r="4.5" fill="#4ade80" />
        <text x="32" y="23" class="badge-text">10+ YEARS EXPERIENCE</text>
      </g>

      <!-- Main Title -->
      <text x="0" y="105" class="title">Abu Sayaf</text>
      
      <!-- Role / Subtitle -->
      <text x="0" y="152" class="subtitle">Senior Software Engineer &amp; System Architect</text>

      <!-- Punchy Value Prop -->
      <text x="0" y="205" class="desc">Scalable distributed architectures, cloud platforms, cybersecurity,</text>
      <text x="0" y="235" class="desc">and high-throughput AI-integrated production systems.</text>

      <!-- Skill Pills -->
      <g transform="translate(0, 275)">
        <!-- Pill 1: Architecture -->
        <g transform="translate(0, 0)">
          <rect width="186" height="38" rx="10" fill="#131e16" stroke="#27332b" stroke-width="1.2" />
          <text x="18" y="24" class="tag">System Design</text>
        </g>
        <!-- Pill 2: AI-Integrated -->
        <g transform="translate(196, 0)">
          <rect width="176" height="38" rx="10" fill="#131e16" stroke="#22c55e" stroke-opacity="0.5" stroke-width="1.2" />
          <text x="18" y="24" class="tag" fill="#86efac">⚡ AI-Integrated</text>
        </g>
        <!-- Pill 3: Cloud & Scale -->
        <g transform="translate(382, 0)">
          <rect width="180" height="38" rx="10" fill="#131e16" stroke="#27332b" stroke-width="1.2" />
          <text x="18" y="24" class="tag">Cloud &amp; DevOps</text>
        </g>
      </g>

      <!-- Footer Info -->
      <g transform="translate(0, 420)">
        <text x="0" y="0" class="brand-url">PORTFOLIO &amp; PRODUCTION CASE STUDIES</text>
      </g>
    </g>

    <!-- Right Side: Avatar Framing -->
    <!-- Outer decorative glow circle -->
    <circle cx="970" cy="315" r="162" fill="none" stroke="#22c55e" stroke-opacity="0.15" stroke-width="2" stroke-dasharray="6 8" />
    <circle cx="970" cy="315" r="152" fill="none" stroke="url(#avatarRing)" stroke-width="4" filter="url(#shadow)" />

    <!-- Verified Badge Overlay -->
    <g transform="translate(1040, 400)">
      <circle cx="22" cy="22" r="22" fill="#14532d" stroke="#4ade80" stroke-width="2" />
      <path d="M 14 22 L 20 28 L 30 16" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </svg>
  `;

  // Avatar position: center is at (970, 315), radius is 140 (avatarSize is 280)
  const avatarTop = 315 - avatarSize / 2;
  const avatarLeft = 970 - avatarSize / 2;

  // Composite the SVG base with the circular avatar
  const outputBuffer = await sharp(Buffer.from(svgOverlay))
    .composite([
      {
        input: roundedAvatar,
        top: Math.round(avatarTop),
        left: Math.round(avatarLeft),
      },
    ])
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(path.resolve('public/images/og-cover.png'));

  console.log('Successfully generated public/images/og-cover.png', outputBuffer);
}

generateOgImage().catch(console.error);
