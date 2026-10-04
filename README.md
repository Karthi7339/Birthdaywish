# 🎂 Interactive Birthday Surprise Website

A production-quality interactive birthday surprise website built with React, Vite, Framer Motion, and Web Audio. Designed as an emotional, cinematic digital journey for your best friend.

---

## ✨ Features Included

1. **Elegant Loading Screen**: "Preparing something special..." with gentle glowing ring and smooth fade.
2. **Ambient Particle System**: Lightweight Canvas-based floating bokeh, gold stars, and warm rose particles (fully respects `prefers-reduced-motion`).
3. **Cinematic Opening Screen**: Warm personal greeting with interactive ripple button "Open Your Surprise ✨".
4. **Cinematic Birthday Reveal**:
   - Letter-by-letter gold reveal of your friend's name
   - Dual sparkle and confetti burst
   - Smooth scroll indicator
5. **Interactive Progress Bar**:
   - Desktop: Minimal floating pill (`01 Hello`, `02 Memories`, `03 Moments`, `04 Letter`, `05 Surprise`, `06 Celebrate`)
   - Mobile: Ultra-compact, non-intrusive top indicator
6. **Chapters Of Us (Memory Timeline)**:
   - Alternating memory cards on desktop & vertical timeline on mobile
   - Animated glowing filling line that connects memories as you scroll
   - Number badges, dates, emotional tags, and photo previews
7. **Gallery Of Smiles (Masonry & Lightbox)**:
   - 10 photo slots with subtle scrapbook rotation angles, warm shadows, and hover zoom
   - Fullscreen accessible Lightbox modal with next/prev buttons, image counter, keyboard support (`Escape`, `ArrowLeft`, `ArrowRight`), and touch support
8. **From The Heart (Interactive Letter & Envelope)**:
   - 3D styled vintage envelope with a golden wax seal
   - Unfolds to reveal a textured stationery letter with emotional paragraphs and signature
   - Can be folded back and reopened anytime
9. **Mystery Box (Interactive Surprise Gift)**:
   - 3D gift box with ribbon and bow that wiggles upon click
   - Lid pops open with golden radial light rays and celebratory confetti
   - Unveils the "Special Birthday Privilege Pass" with perks & secret blessing
10. **Cheers To You (Final Celebration & Replay)**:
    - Floating pastel balloons drifting upwards
    - Birthday quotes and warm blessings
    - "Replay the Surprise ↺" button that smoothly scrolls back to the beginning and resets interactive states
11. **Smart Music System**:
    - Unobtrusive floating audio control pill (Play / Pause, Mute / Unmute, bouncing soundwave)
    - Browser autoplay policy compliant (starts only after user interaction)
    - **Dual Engine**: Plays `/assets/music/birthday.mp3`, or falls back to an acoustic music-box synthesizer (Web Audio API) if no file is present!

---

## 🎨 How to Personalize (In 1 File!)

All text, names, dates, memories, photos, and messages are configured in:
👉 [`src/data/birthdayData.js`](file:///c:/Users/sakth/Documents/karthis%20folder/New%20folder/src/data/birthdayData.js)

### 1. Change Friend's Name & Messages:
Open `src/data/birthdayData.js` and edit:
- `name`: Change `"Girija"` to your friend's name if needed
- `intro`: Customize the greeting and subtitle
- `letter`: Customize your heartfelt letter paragraphs and signature
- `surprise`: Edit the gift perks and secret wish
- `celebration`: Customize the final quotes

### 2. Replace Photos:
Place your own photos in `public/assets/photos/`:
- `photo1.jpg` through `photo10.jpg` for the Gallery
- `memory1.jpg` through `memory5.jpg` for the Timeline

*(If any image is missing, the site automatically displays a fallback gradient card so it never looks broken).*

### 3. Add Custom Music:
Drop your favorite song into:
`public/assets/music/birthday.mp3`

---

## 🚀 Running the Project

```bash
# Start local dev server
npm run dev

# Build for production
npm run build
```
Local development server runs at `http://localhost:5173/`.
