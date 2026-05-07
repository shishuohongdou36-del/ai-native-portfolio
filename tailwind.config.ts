import type { Config } from "tailwindcss"

// Design tokens — single source of truth (spec §7.1, §7.3, §7.5).
// Keep this file synchronized with src/styles/tokens.css.
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#05070D",
          secondary: "#090D18",
          elevated: "#0E1424",
        },
        surface: {
          glass: "rgba(255, 255, 255, 0.06)",
          glassStrong: "rgba(255, 255, 255, 0.10)",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.12)",
          active: "rgba(69, 230, 255, 0.45)",
        },
        text: {
          primary: "#F5F7FA",
          secondary: "#A8B3C7",
          muted: "#6F7A91",
        },
        accent: {
          cyan: "#45E6FF",
          violet: "#8B5CFF",
          blue: "#3B82F6",
          green: "#5FFFB1",
        },
        danger: "#FF6B8A",
      },
      fontFamily: {
        sans: [
          '"Inter Variable"',
          "Inter",
          '"PingFang SC"',
          '"HarmonyOS Sans SC"',
          '"Microsoft YaHei"',
          "system-ui",
          "sans-serif",
        ],
        display: [
          '"Bricolage Grotesque Variable"',
          '"Bricolage Grotesque"',
          '"Inter Variable"',
          "Inter",
          '"PingFang SC"',
          '"HarmonyOS Sans SC"',
          '"Microsoft YaHei"',
          "sans-serif",
        ],
        mono: ['ui-monospace', "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        // [size, lineHeight]
        "hero-title-d": ["clamp(64px, 8vw, 96px)", "1.02"],
        "hero-title-m": ["clamp(40px, 9vw, 52px)", "1.05"],
        "hero-sub-d": ["clamp(22px, 2vw, 28px)", "1.4"],
        "hero-sub-m": ["clamp(18px, 4.5vw, 22px)", "1.45"],
        "section-d": ["clamp(36px, 4.2vw, 48px)", "1.1"],
        "section-m": ["clamp(28px, 6.5vw, 34px)", "1.15"],
        "card-title": ["clamp(20px, 1.6vw, 26px)", "1.2"],
        "body": ["17px", "1.7"],
        "caption": ["13px", "1.5"],
      },
      maxWidth: {
        container: "1280px",
      },
      spacing: {
        "section-y-d": "120px",
        "section-y-m": "76px",
        "card-d": "28px",
        "card-m": "20px",
      },
      boxShadow: {
        "glow-cyan": "0 0 32px -4px rgba(69, 230, 255, 0.35)",
        "glow-violet": "0 0 36px -6px rgba(139, 92, 255, 0.32)",
        "card-elev": "0 10px 30px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06) inset",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "drift-slow": "drift 12s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -8px, 0)" },
        },
      },
    },
  },
  plugins: [],
}

export default config
