# Hero Section Redesign: Implementation Plan 🚀

This document outlines the step-by-step implementation strategy for the Performance-First, Bento-inspired Hero Section redesign, adhering strictly to enterprise-level architecture and performance constraints.

## 1. Architectural Overview

### Goal
Refactor `<Hero />` to achieve a Vercel/Linear-inspired aesthetic using a modular Bento Box grid. Prioritize static elegance, clean component architecture, and GPU-accelerated micro-interactions.

### Core Principles
- **Performance First:** No layout animations. Strict adherence to `transform` and `opacity`.
- **Modular Architecture:** Business logic, animations, and data must be fully decoupled from the UI.
- **Bento Grid Layout:** CSS Grid-based modular layout.
- **Glassmorphism via Utilities:** Use a central `.glass-card` utility instead of inline Tailwind classes.

---

## 2. File Structure & Component Decomposition

The `Hero` component will be moved into its own dedicated directory to maintain strict separation of concerns:

```text
src/components/Hero/
├── Hero.jsx                # Main orchestrator (assembles the grid)
├── HeroGrid.jsx            # The Bento Box Grid layout wrapper
├── HeroBackground.jsx      # Background orchestrator
├── HeroContent.jsx         # Typography and CTA buttons
├── HeroAvatar.jsx          # Avatar card wrapper
├── HeroDock.jsx            # Social links dock
├── HeroStats.jsx           # Mini bento stats cards
├── HeroAnimations.js       # All GSAP logic isolated here
└── hero.constants.js       # Data (Name, Titles, Stats, Socials)
```

### Component Details
- **Avatar (`HeroAvatar.jsx`):** Must be composed of `<Image fetchpriority="high" />` and `<AvailabilityBadge />`.
- **Background (`HeroBackground.jsx`):** Must be composed of isolated layers:
  - `<AuroraLayer />`
  - `<GridLayer />`
  - `<NoiseLayer />`
  - `<SpotlightLayer />`
- **Data & i18n (`hero.constants.js`):** No hardcoded text in components. `stats.map(...)` and `socials.map(...)` must be used.

---

## 3. Styling Strategy (Tailwind CSS)

### Strict Transition Rule
**Forbidden:** `transition-all` (causes the browser to monitor all properties, degrading performance).
**Allowed:** `transition-transform`, `transition-opacity`, `transition-colors`.

### Glassmorphism Utility
We will create a centralized utility class in the global CSS (or Tailwind config) to allow a single source of truth for the blur effect:
```css
.glass-card {
  @apply bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl shadow-black/20;
}
```

---

## 4. Animation Strategy & Isolation

### No Animations in JSX
The `<Hero />` component and its children will **not** import GSAP. Instead, they will assign specific `data-animate` or `ref` tags, and `HeroAnimations.js` will handle all logic.
```javascript
// HeroAnimations.js
export const initHeroAnimations = (containerRef) => {
  // GSAP logic here
}
```

### Animation Budget Rules
- **Maximum simultaneous animations:** 3
- **Maximum transforms per frame:** 10
- **Maximum duration:** 700ms

---

## 5. Performance Budget

- **Lighthouse Scores:**
  - Performance ≥ 95
  - Accessibility = 100
  - Best Practices = 100
  - SEO = 100
- **Core Web Vitals:**
  - CLS < 0.02
  - LCP < 2.5s (Ensured via `fetchpriority="high"` on the hero image)
  - INP < 200ms
- **Resource Constraints:**
  - Hero JavaScript < 35KB (gzip)
  - Hero CSS < 10KB
- **Rendering & DOM:**
  - DOM nodes inside Hero < 120
  - 60 FPS on mid-range laptops
  - Zero layout shifts (Layout changes are strictly prohibited)
  - No animation may trigger layout or paint on every frame (only compositing/GPU).

---

## 6. Definition of Done

The implementation is considered complete only if:
- [ ] Pixel-perfect responsive layout across mobile, tablet, and desktop.
- [ ] No layout shift (CLS) during page load.
- [ ] No hydration warnings.
- [ ] All animations are GPU accelerated (transform/opacity only).
- [ ] No unnecessary React re-renders.
- [ ] Lighthouse Performance score ≥ 95.
- [ ] Accessibility score = 100.
- [ ] Hero remains visually appealing even when all animations are disabled (Fallback support).
- [ ] Code is modular, reusable, and follows the specified architecture.
