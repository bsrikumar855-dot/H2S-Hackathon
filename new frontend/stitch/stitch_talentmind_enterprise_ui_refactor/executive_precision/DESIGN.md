---
name: Executive Precision
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#434655'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006056'
  on-tertiary: '#ffffff'
  tertiary-container: '#007b6e'
  on-tertiary-container: '#b1fff1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#71f8e4'
  tertiary-fixed-dim: '#4fdbc8'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005048'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1440px
  sidebar-width: 280px
  gutter: 24px
---

## Brand & Style
The design system is anchored in the concept of "Human-Centric Intelligence." It avoids the cold, mechanical tropes of traditional AI platforms in favor of a premium, editorial aesthetic that feels both authoritative and approachable. The target audience—executive recruiters and HR leaders—requires a tool that feels like a high-end productivity suite rather than a technical dashboard.

The style is **Modern Corporate Minimalism**, blending the rigorous utility of a developer tool with the refined elegance of a luxury publication. It prioritizes clarity, intentionality, and "quiet" interfaces that reduce cognitive load during complex hiring workflows. The emotional response should be one of confidence, calm, and total control.

## Colors
The palette is built on a foundation of "Functional Neutrals." The primary background is a cool, off-white (#F8FAFC) to reduce screen glare, while the sidebar uses a deep Obsidian (#111827) to provide a strong structural anchor and immediate visual hierarchy.

Primary Blue is used sparingly for intent and action, while the Teal accent is reserved for AI-assisted insights or positive growth metrics, signaling "intelligence" without relying on cliché visuals. Secondary and Tertiary colors are utilized for data visualization and status indicators, ensuring the interface remains professional and high-contrast.

## Typography
Inter is the sole typeface for the design system to ensure maximum legibility and a systematic, modern feel. The hierarchy relies on tight tracking (letter spacing) for larger headings to create a premium "editorial" look, while body text remains neutral and open for readability.

Labels and metadata use a slightly heavier weight (Medium 500 or SemiBold 600) at smaller sizes to ensure they don't disappear against the white surface. Use `label-sm` for category tags and table headers to provide a distinct stylistic break from standard body copy.

## Layout & Spacing
The design system utilizes a **Fluid-Fixed Hybrid Grid**. The primary navigation sidebar is fixed at 280px, while the main content area occupies a fluid container with a maximum width of 1440px to prevent line lengths from becoming unreadable on ultra-wide monitors.

A strict 8px spacing scale governs all padding and margins. Vertical rhythm is critical; maintain 32px to 48px of space between major sections to allow the UI to "breathe." On mobile, gutters shrink to 16px and the sidebar collapses into a bottom-sheet or overlay drawer.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and **Subtle Ambient Shadows**. We avoid heavy dropshadows in favor of "Soft Lift" effects.

1.  **Level 0 (Base):** Background (#F8FAFC) - The canvas.
2.  **Level 1 (Surface):** White cards (#FFFFFF) with a 1px border (#E5E7EB). No shadow.
3.  **Level 2 (Interactive):** Elements that can be clicked (e.g., Hovered Cards) use a very diffused shadow: `0 4px 12px rgba(0, 0, 0, 0.05)`.
4.  **Level 3 (Overlay):** Modals and Dropdowns use a more defined shadow to separate from the UI: `0 12px 32px rgba(0, 0, 0, 0.1)`.

This system creates a sense of "physical sheets" of paper stacked neatly, mirroring the professional organized nature of recruitment workflows.

## Shapes
The design system uses a "Standardized Radius" approach to maintain a friendly but professional appearance. 

- **8px (Base):** Used for buttons, input fields, and small cards.
- **12px (Large):** Used for main content containers and dashboard widgets.
- **Full (Pill):** Used exclusively for status chips (e.g., "In Review", "Hired") and avatars.

Avoid sharp 0px corners, as they feel too aggressive for a "human" recruitment platform, but avoid the 20px+ "bubbly" look of consumer social apps.

## Components

### Buttons
- **Primary:** Solid #2563EB with White text. Subtle 1px inner light border for a tactile feel.
- **Secondary:** White background with #E5E7EB border and #111827 text.
- **Ghost:** No background/border, becomes #F1F5F9 on hover. Use for low-priority actions.

### Input Fields
Inputs must feel "architectural." Use a 1px border (#E5E7EB) that shifts to Primary Blue on focus. Labels should be placed above the field in `label-md`. Support prefix/suffix icons (e.g., Search icon) using Secondary Text color.

### KPI Cards
Display key metrics (e.g., "Time to Hire") using a Level 1 Surface. The metric should use `headline-lg` weight. Include a small sparkline or percentage indicator in Success/Danger colors to show trend.

### Candidate Lists & Tables
Tables are "minimalist-first." Remove all vertical grid lines. Use a subtle horizontal divider (#E5E7EB). Row hover state should be a light tint (#F8FAFC). Avatars should be 32px circles with the candidate's initials or photo.

### Progress Skeletons
During loading, use a subtle shimmering gradient from #F1F5F9 to #E2E8F0. Shapes should perfectly match the component they are replacing.

### Motion & Transitions
Transitions must be fast (200ms-300ms) using a `cubic-bezier(0.4, 0, 0.2, 1)` easing. Elements should "slide-up" 8px while fading in to create a sense of the interface assembling itself for the user.