import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/assets/photos');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const galleryCards = [
  { name: 'photo1', title: 'Golden Hour Sunset', emoji: '🌅', color1: '#F7C8D8', color2: '#FAD9C1', sub: 'Sunlight & warm memories' },
  { name: 'photo2', title: 'Coffee & Giggles', emoji: '☕', color1: '#FAD9C1', color2: '#D9B8E8', sub: 'Unstoppable laughs' },
  { name: 'photo3', title: 'Aesthetic Outfits', emoji: '✨', color1: '#D9B8E8', color2: '#F7C8D8', sub: 'Dressed to celebrate' },
  { name: 'photo4', title: 'Unfiltered Joy', emoji: '📸', color1: '#F7C8D8', color2: '#D6A85F', sub: 'Our classic funny moments' },
  { name: 'photo5', title: 'Flower Garden Stroll', emoji: '🌸', color1: '#D6A85F', color2: '#FAD9C1', sub: 'Spring blooms & fresh air' },
  { name: 'photo6', title: 'Seaside Adventures', emoji: '🌊', color1: '#D9B8E8', color2: '#C4E0E5', sub: 'Chasing waves together' },
  { name: 'photo7', title: 'Celebrating Wins', emoji: '🥂', color1: '#FAD9C1', color2: '#F7C8D8', sub: 'Cheering for your dreams' },
  { name: 'photo8', title: 'Cozy Winter Evenings', emoji: '🧣', color1: '#F7C8D8', color2: '#E0C3FC', sub: 'Chai, blankets & endless talks' },
  { name: 'photo9', title: 'Glow Up & Glamour', emoji: '👑', color1: '#D6A85F', color2: '#D9B8E8', sub: 'Always shining bright' },
  { name: 'photo10', title: 'Soul Sister Moments', emoji: '💖', color1: '#F7C8D8', color2: '#FAD9C1', sub: 'Bond that never fades' },
];

const memoryCards = [
  { name: 'memory1', title: 'The Day We First Met', emoji: '🌱', color1: '#F7C8D8', color2: '#FAD9C1', sub: 'Instant connection' },
  { name: 'memory2', title: 'Spontaneous Road Trip', emoji: '🚗', color1: '#FAD9C1', color2: '#D9B8E8', sub: 'Windows down, music up' },
  { name: 'memory3', title: 'Stargazing & Deep Talks', emoji: '🌌', color1: '#D9B8E8', color2: '#3B3035', sub: 'Heart to heart under the sky', dark: true },
  { name: 'memory4', title: 'The Kitchen Disaster', emoji: '🍰', color1: '#F7C8D8', color2: '#D6A85F', sub: 'Chocolate soup & tears of laughter' },
  { name: 'memory5', title: 'Lifetime Of Memories', emoji: '✨', color1: '#D6A85F', color2: '#FAD9C1', sub: 'To forever and always' },
];

function generateSvg({ title, emoji, color1, color2, sub, dark }) {
  const textColor = dark ? '#FFF8F5' : '#3B3035';
  const subColor = dark ? 'rgba(255,248,245,0.75)' : 'rgba(59,48,53,0.7)';
  const borderCol = dark ? 'rgba(255,255,255,0.15)' : 'rgba(214,168,95,0.3)';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="rgba(59,48,53,0.08)"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="600" fill="url(#grad)" />

  <!-- Subtle geometric / bokeh patterns -->
  <circle cx="120" cy="100" r="140" fill="white" opacity="0.15" />
  <circle cx="700" cy="500" r="180" fill="white" opacity="0.12" />
  <circle cx="680" cy="80" r="70" fill="white" opacity="0.18" />
  <circle cx="100" cy="520" r="90" fill="white" opacity="0.1" />

  <!-- Center Card Frame -->
  <rect x="70" y="60" width="660" height="480" rx="28" fill="${dark ? 'rgba(30,22,26,0.65)' : 'rgba(255,255,255,0.75)'}" stroke="${borderCol}" stroke-width="2" filter="url(#shadow)" />

  <!-- Sparkle stars -->
  <path d="M 200 130 Q 200 150 180 150 Q 200 150 200 170 Q 200 150 220 150 Q 200 150 200 130 Z" fill="#D6A85F" opacity="0.75" />
  <path d="M 620 420 Q 620 435 605 435 Q 620 435 620 450 Q 620 435 635 435 Q 620 435 620 420 Z" fill="#D6A85F" opacity="0.75" />

  <!-- Inner Content -->
  <g transform="translate(400, 240)" text-anchor="middle">
    <!-- Emoji Circle -->
    <circle cx="0" cy="-30" r="54" fill="${dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)'}" stroke="${borderCol}" stroke-width="1.5" />
    <text x="0" y="-12" font-size="48" font-family="'Apple Color Emoji','Segoe UI Emoji',sans-serif">${emoji}</text>

    <!-- Title -->
    <text x="0" y="65" font-family="'Playfair Display', Georgia, serif" font-size="34" font-weight="700" fill="${textColor}">${title}</text>
    
    <!-- Subtitle -->
    <text x="0" y="105" font-family="'Inter', -apple-system, sans-serif" font-size="18" font-weight="400" fill="${subColor}" letter-spacing="1">${sub}</text>

    <!-- Badge / Note -->
    <rect x="-140" y="140" width="280" height="34" rx="17" fill="${dark ? 'rgba(255,255,255,0.12)' : 'rgba(214,168,95,0.18)'}" stroke="${borderCol}" stroke-width="1"/>
    <text x="0" y="162" font-family="'Inter', -apple-system, sans-serif" font-size="13" font-weight="500" fill="${textColor}" letter-spacing="0.5">✦ REPLACE WITH YOUR PHOTO ✦</text>
  </g>
</svg>`;
}

const all = [...galleryCards, ...memoryCards];
for (const item of all) {
  const svg = generateSvg(item);
  // Write both .svg and .jpg (as SVG xml) so whatever reference works seamlessly
  fs.writeFileSync(path.join(outDir, `${item.name}.svg`), svg, 'utf-8');
  fs.writeFileSync(path.join(outDir, `${item.name}.jpg`), svg, 'utf-8');
}

console.log(`Generated ${all.length} placeholder photos in ${outDir}`);
