# AI Recruiter Dashboard Design System

This document defines the design system and UI components for the AI-powered Recruiter Suitability Ranking Engine. The design language is tailored for a high-end, premium, **dark-mode first AI SaaS** product.

---

## 1. Design Philosophy & Aesthetic

*   **Dark Mode First:** Tailored for low-light environments, giving a futuristic, cybernetic, and premium feel.
*   **AI-Focused SaaS:** Accentuated with neon glows and gradient flows (Violet-to-Blue) representing active cognitive or algorithmic processes.
*   **Glassmorphism:** UI components appear as floating glass panels using semi-transparent dark layers, subtle borders, and background blurring to create layered depth.
*   **Harmonious Accents:** Accents of emerald/cyan (success matches) and rose/amber (missing skills and alerts) provide sharp visual context.

---

## 2. Core Theme Tokens

The design tokens are defined inside the code codebase at `src/theme/`.

### 2.1 Colors (`src/theme/colors.ts`)

Mapped to standard HEX values and CSS variables for Tailwind styling:

| Token Category | Token / Value | Description |
| :--- | :--- | :--- |
| **Theme Background** | `base: "#030014"` | Deep void background |
| | `surface: "#0a0720"` | Solid card background |
| | `glass: "rgba(10, 7, 32, 0.6)"` | Glassmorphism surface overlay (with backdrop blur) |
| **Neon Accent Gradients** | `primary: "#8b5cf6"` | Vibrant violet accent |
| | `secondary: "#3b82f6"` | Electric blue accent |
| | `cyan: "#06b6d4"` | Neon cyan matching accent |
| | `glow: "rgba(139, 92, 246, 0.15)"` | Violet box shadow glow |
| **Borders** | `glass: "rgba(255, 255, 255, 0.08)"` | Soft glass border |
| | `active: "rgba(139, 92, 246, 0.4)"` | Active state highlight border |
| **Typography** | `text-primary: "#f3f4f6"` | Light gray headings and text |
| | `text-secondary: "#9ca3af"` | Muted gray subtext |
| | `text-muted: "#6b7280"` | Dull disabled/placeholder text |
| | `text-accent: "#a78bfa"` | Bright violet text accent |

### 2.2 Typography (`src/theme/typography.ts`)

Optimized for high readability and structured data hierarchy:

*   **Font Families:**
    *   `sans`: `Inter, system-ui, -apple-system, sans-serif` (Clean, geometric, premium)
    *   `mono`: `Fira Code, ui-monospace, monospace` (For skills, data, formulas, and JSON outputs)
*   **Font Sizes:**
    *   `xs`: `0.75rem` (12px) — Badges, small metadata
    *   `sm`: `0.875rem` (14px) — Body text, table rows, labels
    *   `base`: `1rem` (16px) — Inputs, standard text
    *   `lg`: `1.125rem` (18px) — Card titles, section highlights
    *   `xl`: `1.25rem` (20px) — Panel headers
    *   `xxl`: `1.5rem` (24px) — Dashboard page sections
    *   `h3`: `1.875rem` (30px) — Major headers
    *   `h2`: `2.25rem` (36px) — Screen titles
    *   `h1`: `3rem` (48px) — Landing page hero text
*   **Font Weights:**
    *   `normal`: `400`
    *   `medium`: `500`
    *   `semibold`: `600`
    *   `bold`: `700`

### 2.3 Spacing & Radius (`src/theme/spacing.ts`)

Consistent spacing system based on a `rem` scale:

*   **Paddings & Margins:**
    *   `xs`: `0.25rem` (4px)
    *   `sm`: `0.5rem` (8px)
    *   `md`: `1rem` (16px)
    *   `lg`: `1.5rem` (24px)
    *   `xl`: `2rem` (32px)
    *   `xxl`: `3rem` (48px)
*   **Border Radius:**
    *   `sm`: `0.375rem` (6px) — Badge, small controls
    *   `md`: `0.5rem` (8px) — Inputs, buttons
    *   `lg`: `0.75rem` (12px) — Small cards
    *   `xl`: `1rem` (16px) — Standard glass cards
    *   `full`: `9999px` — Badges, pill progress bars

---

## 3. Reusable Tailwind-Only Primitives

All UI components are located in `src/components/ui/` and implemented using clean, TypeScript-safe React components styled with Tailwind CSS utility classes and the `cn` class merger.

### 3.1 Button (`src/components/ui/Button.tsx`)

A customizable button with active scale effects and hover gradients.

*   **Variants:**
    *   `primary` (default): Purple/Blue gradient (`from-violet-600 to-blue-600`) with violet neon shadow glow.
    *   `secondary`: Dark glass overlay (`bg-white/5` and `border-white/10`) for auxiliary choices.
    *   `outline`: Glowing transparent violet border (`border-violet-500/30 text-violet-400`).
    *   `ghost`: Flat transparent button with subtle hover overlay (`hover:bg-white/5`).
*   **Sizes:**
    *   `sm`: Compact size (`px-3 py-1.5 text-xs`)
    *   `md`: Standard size (`px-4 py-2 text-sm`)
    *   `lg`: Primary CTA size (`px-6 py-3 text-base`)

### 3.2 Card (`src/components/ui/Card.tsx`)

The fundamental layout container building block. Implements a premium translucent dark purple glass overlay.

*   **Features:**
    *   Translucent purple backdrop blend (`bg-[#0a0720]/60 backdrop-blur-md border-white/5`).
    *   Includes sub-components: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`.

### 3.3 Badge (`src/components/ui/Badge.tsx`)

Compact visual tags used primarily for candidate skills, gap analysis, and statuses.

*   **Variants:**
    *   `primary`: Violet glow (`bg-violet-950/40 border-violet-500/30 text-violet-300`) — required skills.
    *   `secondary`: Dark glass (`bg-white/5 border-white/10 text-gray-300`) — generic tags.
    *   `success`: Emerald glow (`bg-emerald-950/40 border-emerald-500/30 text-emerald-300`) — matched candidate skills.
    *   `danger`: Rose glow (`bg-rose-950/40 border-rose-500/30 text-rose-300`) — missing candidate skills.
    *   `warning`: Amber glow (`bg-amber-950/40 border-amber-500/30 text-amber-300`) — transferable candidate skills.

### 3.4 Input (`src/components/ui/Input.tsx`)

Single-line form element designed for searching, names, and metadata.

*   **Styling:** Semi-transparent dark input (`bg-black/30 border-white/10`) that smoothly glows violet on focus (`focus:border-violet-500/50 focus:ring-violet-500/20`).

### 3.5 Textarea (`src/components/ui/Textarea.tsx`)

Multi-line text editor designed for job description and candidate profiles pasting.

*   **Styling:** Matches Input styling, resizing naturally with smooth custom focus halos.

### 3.6 Table (`src/components/ui/Table.tsx`)

Grid component for presenting candidate lists, ranking breakdowns, and activity records.

*   **Styling:** Dark headers (`bg-white/5`), subtle glass border lines (`border-white/5`), and smooth row hover effects (`hover:bg-white/5`). Includes `TableHeader`, `TableBody`, `TableRow`, `TableHead`, and `TableCell`.

### 3.7 Drawer (`src/components/ui/Drawer.tsx`)

Slide-out panel appearing from the right side of the screen for inspecting granular candidate info, skill gaps, and explanations.

*   **Features:**
    *   Uses a React Portal to render overlays directly to the body.
    *   Includes an absolute backdrop mask (`bg-black/65 backdrop-blur-sm`).
    *   Drawer container animates smoothly from the right (`animate-in slide-in-from-right duration-250`) and features high-blur glass blending.

### 3.8 ProgressBar (`src/components/ui/ProgressBar.tsx`)

Progress indicator showing match percentages, component weights, or scoring processes.

*   **Variants:**
    *   `primary`: Purple-to-Blue fill gradient.
    *   `success`: Emerald-to-Cyan fill gradient.
    *   `warning`: Amber-to-Orange fill gradient.
*   **Properties:**
    *   `animate`: Toggleable shifting sheen overlays (`before:animate-shimmer`) for scanning or loaded feedback.
