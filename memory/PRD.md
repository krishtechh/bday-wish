# PRD — Birthday Surprise Website

## Original Problem Statement
Build a fully responsive, premium, interactive Birthday Surprise SPA inspired by viral Instagram birthday sites. Pastel pink theme, floating hearts, glassmorphism, confetti, background music, React + Tailwind + Framer Motion, no backend, all content editable from a single data file. Sections: Welcome, animated envelope Letter with typewriter, 12 Reasons card flips, Memory Timeline, Polaroid Gallery with lightbox, interactive Cake Builder, Celebration screen, Music Player, Final message. Bonus: dark/light mode, progress indicator, floating nav, loading screen, mobile-first, SEO.

## Architecture
- Frontend only: React 19 + Tailwind CSS + Framer Motion + react-icons + react-confetti + canvas-confetti
- No backend usage (template FastAPI/MongoDB left untouched)
- Single editable content file: `src/data/birthdayData.js` (names, letter text, 12 reasons, memories, photos, cake flavors, final message)
- Components: `src/components/` — LoadingScreen, ProgressBar, FloatingHearts, Balloons, FloatingNav, MusicPlayer, WelcomeSection, LetterSection, ReasonsSection, TimelineSection, GallerySection, CakeBuilderSection, CelebrationSection, FinalSection
- Music: Web Audio API synthesized "Happy Birthday" music-box melody (no external audio file needed), autoplays after "Start The Surprise" click, volume slider, spinning vinyl disc
- Theme: CSS variables in `index.css` (`--pink`, `--bg-primary`, etc.) with `.dark` class toggle on `<html>`
- Fonts: Cormorant Garamond (display), Dancing Script (handwritten), Plus Jakarta Sans (body)

## User Personas
- Partner/friend creating a personalized birthday surprise for someone they love
- Recipient opening the link on their phone (mobile-first usage)

## Implemented (2026-09-18)
- Loading screen with bouncing cake animation
- Welcome hero with floating balloons, glow cake icon, bouncing CTA + confetti burst
- Animated pink envelope: wax seal tap → 3D flap open → letter slides out → typewriter letter card with Pause / Skip / Replay controls and heart burst
- 12 Reasons grid: 3D flip cards, Reveal Next / Reveal All, glow + heart burst per reveal, progress counter
- Memory Timeline: alternating slide-in cards, gradient progress line with heart tracker tied to scroll
- Polaroid masonry gallery (6 photos), tape details, hover straighten, lightbox with heart-reaction burst
- Cake Builder: 6 flavors, candle slider (1–10), add → light (animated flickering flames) → Make A Wish & Blow (smoke + mega confetti + fireworks)
- Celebration screen: locked until candles blown, then confetti rain, fireworks, balloons, giant gradient "HAPPY BIRTHDAY ❤️", replay button
- Floating music player: rotating disc, play/pause, volume slider, animated EQ bars, autoplay on first interaction
- Dark/light mode toggle, top scroll progress bar, floating section nav
- Mobile responsive (verified at 390px, no horizontal overflow), SEO meta tags
- All interactive elements carry data-testid attributes

## Verification
- Desktop (1920px) + mobile (390px) end-to-end Playwright flows passed: start → envelope → typewriter → reveal reasons → timeline → lightbox → cake build/light/blow → celebration → dark mode
- Console clean after fixes (card-flip preserve-3d bug and nav centering bug fixed)

## Backlog
- P0: Personalize content in `birthdayData.js` (real names, real letter, real photos)
- P1: Swap gallery/timeline stock photos for real couple photos (object-storage upload if needed)
- P2: Custom audio track upload for the music player
- P2: Shareable link banner / OG image
- P2: Blow-into-microphone candle detection (Web Audio volume meter)

## Test Credentials
No authentication — see /app/memory/test_credentials.md
