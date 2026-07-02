/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary": "#ffffff",
        "on-error": "#ffffff",
        "on-secondary-container": "#5c647a",
        "tertiary-fixed": "#71f8e4",
        "surface-container": "#e9edff",
        "secondary-fixed": "#dae2fd",
        "primary": "#004ac6",
        "on-tertiary-fixed": "#00201c",
        "on-background": "#141b2b",
        "surface-tint": "#0053db",
        "surface-container-lowest": "#ffffff",
        "primary-container": "#2563eb",
        "surface-container-high": "#e1e8fd",
        "surface-dim": "#d3daef",
        "tertiary-container": "#007b6e",
        "secondary-fixed-dim": "#bec6e0",
        "on-primary-fixed-variant": "#003ea8",
        "tertiary": "#006056",
        "on-error-container": "#93000a",
        "surface-variant": "#dce2f7",
        "inverse-on-surface": "#edf0ff",
        "background": "#f9f9ff",
        "on-secondary": "#ffffff",
        "error-container": "#ffdad6",
        "surface": "#f9f9ff",
        "on-tertiary-container": "#b1fff1",
        "error": "#ba1a1a",
        "on-tertiary": "#ffffff",
        "tertiary-fixed-dim": "#4fdbc8",
        "inverse-surface": "#293040",
        "primary-fixed-dim": "#b4c5ff",
        "primary-fixed": "#dbe1ff",
        "on-surface-variant": "#434655",
        "on-tertiary-fixed-variant": "#005048",
        "inverse-primary": "#b4c5ff",
        "surface-container-highest": "#dce2f7",
        "outline-variant": "#c3c6d7",
        "secondary": "#565e74",
        "on-secondary-fixed-variant": "#3f465c",
        "on-surface": "#141b2b",
        "surface-container-low": "#f1f3ff",
        "outline": "#737686",
        "on-secondary-fixed": "#131b2e",
        "on-primary-container": "#eeefff",
        "surface-bright": "#f9f9ff",
        "secondary-container": "#dae2fd",
        "on-primary-fixed": "#00174b"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px"
      },
      spacing: {
        "sidebar-width": "280px",
        "xs": "4px",
        "sm": "8px",
        "base": "4px",
        "md": "16px",
        "lg": "24px",
        "xl": "32px",
        "2xl": "48px",
        "3xl": "64px",
        "gutter": "24px",
        "container-max": "1440px"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "headline-sm": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "headline-lg": ["Inter", "sans-serif"],
        "display": ["Inter", "sans-serif"]
      },
      fontSize: {
        "body-sm":  ["14px", { lineHeight: "20px", letterSpacing: "0em",     fontWeight: "400" }],
        "body-md":  ["16px", { lineHeight: "24px", letterSpacing: "0em",     fontWeight: "400" }],
        "body-lg":  ["18px", { lineHeight: "28px", letterSpacing: "0em",     fontWeight: "400" }],
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.05em",  fontWeight: "600" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.01em",  fontWeight: "500" }],
        "headline-sm": ["20px", { lineHeight: "28px", letterSpacing: "0em",    fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "display":     ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }]
      },
      animation: {
        "float": "subtle-float 6s ease-in-out infinite",
        "float-reverse": "subtle-float 8s ease-in-out infinite reverse",
        "shimmer": "shimmer 1.5s infinite",
        "spin-slow": "spin 2s linear infinite"
      },
      keyframes: {
        "subtle-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        }
      }
    }
  },
  plugins: [],
}
