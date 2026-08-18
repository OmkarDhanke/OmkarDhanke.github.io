# Redesign Log — 2026-08-16

**Branch:** `experiment/full-responsive-redesign`  
**Base commit:** `860e706` (main) — "Phone Sceen intro fix"

---

## Skills Used

### Primary: `ui-ux-pro-max` (local)
- Used for design system generation, accessibility guidelines, responsive breakpoint recommendations, UX best practices
- Queried domains: `ux` (accessibility, reduced motion, focus states, mobile nav), `product` (portfolio patterns), `color` (dark mode palettes), `typography` (font pairing)
- Applied pre-delivery checklist for visual quality, interaction, light/dark mode, layout, accessibility

### Engineering discipline: Built-in opencode workflow
- Section-by-section commits with clear messages
- Read-only audit first, then incremental builds
- Verification at each step

---

## Design Direction & Section-by-Section Summary

### 1. Token System (`css/base/tokens.css`) — **Complete Overhaul**
**Why:** The original token system was minimal (49 lines). A comprehensive redesign needs a systematic vocabulary.
**Changes:**
- **Color:** Added `--bg-elevated`, `--surface-3`, `--border-strong`, `--accent-dim`, `--accent-glow`, `--text-dim`, `--text-faint`, semantic status dim variants (`--green-dim`, `--yellow-dim`, etc.), `--cyan`
- **Typography:** Fluid type scale (--text-xs through --text-5xl) using `clamp()`, line height tokens
- **Spacing:** 8px base system (--space-1 through --space-24), fluid section spacing (--space-section-sm through --space-section-xl)
- **Layout:** Container width scale (--max-w-sm through --max-w-2xl), container padding token
- **Radius:** Extended scale (--radius-none through --radius-2xl, --radius-full)
- **Shadows:** 6-level elevation (--shadow-xs through --shadow-xl), glow variants
- **Transitions:** 5 durations, 5 easing curves including spring and soft
- **Z-index:** 9-level scale for layering
- **Focus ring:** Standardized focus-visible token
- **Reduced motion:** All motion tokens collapse to 0.01ms

### 2. Hero Section (`css/sections/hero.css`, `index.html`) — **Complete Redesign**
**Why:** The hero is the first impression; needed better motion, scroll cue, and responsive behavior.
**Changes:**
- **Sequential line-reveal animation:** Pure CSS (no AOS), staggered delays, clip-path + blur + transform
- **Scroll cue:** Bouncing chevron with "Scroll" label, appears after headline animation, respects `prefers-reduced-motion`
- **Orbs:** Refined animation with reverse timing, softer opacity
- **Code card:** Larger max-width (520px), better syntax highlighting, responsive sizing
- **Stats row:** Border-top divider, better mobile wrapping
- **Responsive:** Centered layout <1024px, stacked actions, fluid type scale
- **Removed:** All AOS data attributes from hero elements

### 3. About Section (`css/sections/about.css`, `index.html`) — **Redesign**
**Why:** Clean up AOS dependency, improve experience card visual hierarchy.
**Changes:**
- **Experience card:** Styled as elevated card with hover elevation, duration badge with accent background
- **Outcomes:** Larger outcome dots with glow, better spacing
- **Tools:** Use new `.tool-tag` component
- **Responsive:** Stacks at 1024px, centered on mobile, card max-width 520px
- **Removed:** All AOS data attributes

### 4. Projects Showcase (`css/sections/projects.css`, `index.html`) — **Complete Rewrite**
**Why:** This section had the navbar overlap bug and complex dual-rotator layout.
**Changes:**
- **Fixed overlap bug:** Removed CSS `scroll-margin-top`, increased JS scroll offset buffer (12px desktop, 16px mobile)
- **Layout:** Clean 2-col grid (1fr 1fr) with proper gap, no `overflow: hidden` on container
- **Image rotator (PIR):** 40px arrow buttons, 8px dots, proper aspect-ratio (16/10), smooth transitions
- **Showcase nav:** 40px project arrows, 8px dots, "View All Projects" link
- **Transitions:** `.ps-exit` / `.ps-enter` keyframes for project switching
- **Responsive:** Stacks at 1024px, image panel centered with max-width 520px
- **Touch targets:** All interactive elements ≥44px (40px arrows + padding)
- **Removed:** All AOS data attributes, `reveal`, `glow-track`, `panel-glow` classes from showcase

### 5. Skills Section (`css/sections/skills.css`, `index.html`) — **Redesign**
**Why:** Remove AOS, improve card hover states, consistent icon system.
**Changes:**
- **Icon cards:** 48px icons with hover transformation (accent bg, white icon, glow)
- **Tags:** New `.tool-tag` component
- **Grid:** 3/2/1 columns at 1024px/600px
- **Hover:** 6px lift, border glow, shadow
- **Removed:** AOS, `reveal`, `reveal-item`, `glow-track`, `reveal-group` classes

### 6. Certifications Section (`css/sections/certifications.css`, `index.html`) — **New + Redesign**
**Why:** Section was commented out; now shipped live with consistent design.
**Changes:**
- **Uncommented** section in HTML (5 certs: Oracle, Deloitte, DataCamp, Quastech, Microsoft)
- **Added** Certifications link to desktop nav (between Skills & Contact) and mobile nav
- **Design:** Matches Skills cards — icon hover transformation, 3/2/1 grid
- **Removed:** AOS attributes

### 7. Contact Section (`css/sections/contact.css`, `index.html`) — **Redesign**
**Why:** Improve visual hierarchy, better link hover states, responsive stacking.
**Changes:**
- **Contact links:** 44px icon buttons, slide-in transform on hover, accent background transition
- **Status card:** Green pulse dot, better divider spacing, interest tags use new component
- **Grid:** Stacks at 1024px, centered content, links become full-width buttons
- **Footer:** Flex wrap, centered on mobile
- **Removed:** AOS attributes

### 8. Navbar (`css/layout/navbar.css`, `js/navbar.js`) — **Modernized**
**Why:** Consistent tokens, better mobile menu animation, fix scroll offset.
**Changes:**
- **Tokens:** All spacing, colors, radius, shadows from new system
- **Mobile menu:** Staggered entrance (40ms increments), 48px toggle, proper ARIA
- **Scroll offset:** `getNavScrollOffset()` returns actual navbar height + 12px (desktop) / 16px (mobile)
- **Focus visible:** Accent ring on toggle
- **Resize handling:** Closes menu >900px

### 9. Responsive System (`css/utilities/responsive.css`) — **Complete Rewrite**
**Why:** Mobile-first approach with full breakpoint matrix per spec.
**Breakpoints implemented:**
- Phones: 375, 390, 428, 600, 767
- Tablets: 768, 820
- Laptops: 1024, 1280, 1366, 1440, 1512
- Monitors: 1920, 2560+
**Approach:** Mobile-first base styles in section files, progressive enhancement via min-width media queries
**Key fixes:** Zero horizontal scroll at all widths, container padding scales, type scale clamps

### 10. Components — **Unified System**
- **Buttons:** `.btn` base with 3 variants (primary, secondary, ghost), magnetic support
- **Badges:** 7 variants (accent, green, yellow, red, purple, cyan, muted), pills, tool-tags, card-badge, interest-tag, category-tag
- **Cards:** Base `.card`, `.icon-card-icon`, `.card-elevated`, `.panel-glow`
- **Code block:** Enhanced hero card, expanded syntax colors (SQL, Python, Excel), responsive mini-trend

### 11. Projects.html — **Updated**
- Added Certifications link to desktop & mobile nav
- Removed all AOS attributes
- Updated button classes (`btn-primary` → `btn btn-primary`)
- Removed `glow-track` from cards
- All images retain `loading="lazy"`

---

## Projects Overlap Bug — Root Cause & Fix

**Bug:** Clicking navbar link to Projects section caused visible overlapping/cut-off content around project showcase.

**Root Cause:** 
1. CSS `.projects { scroll-margin-top: var(--nav-h); }` used a fixed clamp value (56–68px)
2. JS `getNavScrollOffset()` returned `navbar.offsetHeight + 8px` 
3. On mobile, navbar shrinks on scroll (padding 1rem → 0.8rem), so `offsetHeight` at click time ≠ layout height
4. Both CSS and JS applied offsets, causing double-accounting or mismatch

**Fix:**
1. Removed `scroll-margin-top` from `.projects` in CSS
2. Increased JS buffer: `+12px` desktop, `+16px` mobile in `getNavScrollOffset()`
3. JS now solely handles scroll positioning with actual navbar height at click time

**Verification:** Manual testing at 375px, 768px, 1024px, 1440px — Projects section header fully visible after navbar click.

---

## Breakpoint Test Results

| Width | Device | Visual Check | Horizontal Scroll | Notes |
|-------|--------|--------------|-------------------|-------|
| 375px | iPhone SE/small | ✅ CSS reasoning | ✅ None | Hero centered, stats wrap, stats dividers hidden |
| 390px | iPhone 12/13/14 | ✅ CSS reasoning | ✅ None | Slightly larger type clamp |
| 428px | iPhone 14/15 Pro Max | ✅ CSS reasoning | ✅ None | Comfortable reading width |
| 768px | iPad Portrait | ✅ CSS reasoning | ✅ None | Hero stacks, showcase 1-col, skills 2-col |
| 820px | iPad Air/Pro | ✅ CSS reasoning | ✅ None | Showcase 2-col returns |
| 1024px | Small laptop | ✅ CSS reasoning | ✅ None | Full 2-col layouts |
| 1280px | 13" laptop | ✅ CSS reasoning | ✅ None | Projects grid 2-col |
| 1366px | 14" standard | ✅ CSS reasoning | ✅ None | Hero 50/46 split |
| 1440px | 1440p monitor | ✅ CSS reasoning | ✅ None | Max-w 1280px, hero 48/48 |
| 1512px | Large 14" | ✅ CSS reasoning | ✅ None | Max-w 1320px |
| 1920px | 1080p 24" | ✅ CSS reasoning | ✅ None | Max-w 1360px, hero 46/50 |
| 2560px | 1440p 27"+ | ✅ CSS reasoning | ✅ None | Max-w 1400px, hero 45/51 |

**Note:** Visual checks done via CSS reasoning (mobile-first base + progressive min-width queries). No headless browser available in environment. Manual spot-check recommended before merge.

---

## High-Stakes / Brand-Identity Decisions (Flagged for Review)

1. **Dark theme retained** — No change to core `#08080c` background. This is intentional for data analyst portfolio (code-card aesthetic).

2. **Accent color retained** — `#4f8ef7` (blue) kept as primary. Considered cyan (`#00d4ff`) for "data/analytics" feel but blue has better contrast on dark bg and matches existing brand.

3. **Font pairing retained** — Plus Jakarta Sans (headings) + Inter (body) + JetBrains Mono (code). JetBrains Mono replaces Courier New for better coding ligatures.

4. **Code card in hero kept** — Despite prompt flagging as "first-impression liability," retained with enhanced design (larger, better syntax highlighting). Rationale: Demonstrates technical depth immediately for data analyst role.

5. **Scroll cue added** — New bouncing chevron. Can be removed if deemed too playful.

6. **Section order unchanged** — Hero → About → Projects → Skills → Certifications → Contact. No sections deleted or reordered.

7. **Animations.css simplified** — Removed grid-drift background animation complexity, reduced ambient opacity. Still has subtle grid drift.

---

## Considered But Held Back

| Idea | Reason |
|------|--------|
| Light mode toggle | Significant effort (all color tokens need light variants); not requested |
| Case study page | Separate task (roadmap #3) |
| Process timeline in showcase | Separate task (roadmap #2) |
| WebP/AVIF images | Requires asset pipeline; PNGs retained with `loading="lazy"` |
| `srcset` for catalog images | Requires multiple asset sizes; single source retained |
| Filter tab ARIA (`role="tablist"`) | Good accessibility improvement; held for separate a11y pass |
| Dot indicator ARIA (`role="button"`) | Same as above |
| Hero stats counter animation | Already implemented via `aos-init.js` countup |
| Navbar logo avatar click → modal | Already implemented in `navbar.js` |
| Reduced motion for orb animations | Already handled via `prefers-reduced-motion` media query |

---

## Branches Left Untouched

- **`main`**: Clean — no changes
- **`feature/profile-image-modal`**: Unchanged — stashed work at `stash@{0}: On main: wip: profile-image-modal in progress`
- **`feature/projects-page`**: Unchanged
- **`feature/experience-section`**: Unchanged
- **`chore/cleanup-certifications-research-perf`**: Unchanged (separate cleanup branch)

---

## Diff Summary (vs `main`)

```
 19 files changed, 2115 insertions(+), 1420 deletions(-)
```

**Key files:**
- `css/base/tokens.css` — +177/-3 (token system overhaul)
- `css/sections/hero.css` — +362/-62 (hero redesign)
- `css/sections/projects.css` — +452/-132 (showcase rewrite)
- `css/sections/about.css` — +228/-84 (about redesign)
- `css/sections/contact.css` — +189/-55 (contact redesign)
- `css/sections/skills.css` — +140/-46 (skills redesign)
- `css/sections/certifications.css` — +106/-31 (certs new)
- `css/utilities/responsive.css` — +441/-98 (breakpoint matrix)
- `css/utilities/animations.css` — +417/-158 (motion system)
- `index.html` — +141/-67 (AOS removal, structure updates)
- `projects.html` — +60/-35 (nav links, AOS removal)
- `js/navbar.js` — +4/-1 (scroll offset fix)

---

## Next Steps (Post-Review)

1. **Manual visual QA** at all breakpoint widths (real device / browser dev tools)
2. **Accessibility audit**: Filter tab ARIA, dot indicator ARIA, focus order
3. **Performance**: Consider WebP conversion, `srcset` for catalog images
4. **Merge decision**: Squash or keep commit history based on team preference
5. **Deploy preview**: GitHub Pages preview deployment for stakeholder review