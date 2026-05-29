import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        /* Display scale — hero & statement moments */
        'display-xl': ['clamp(3rem, 7vw + 1rem, 6rem)', { lineHeight: '1.02', letterSpacing: '-0.035em', fontWeight: '700' }],
        'display-lg': ['clamp(2.5rem, 6vw + 0.5rem, 4.5rem)', { lineHeight: '1.04', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display': ['clamp(2.125rem, 5vw + 0.5rem, 3.5rem)', { lineHeight: '1.06', letterSpacing: '-0.025em', fontWeight: '700' }],
        /* Section headings */
        'heading-xl': ['clamp(1.875rem, 3.5vw + 0.25rem, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-lg': ['clamp(1.625rem, 3vw + 0.25rem, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '700' }],
        'heading': ['clamp(1.375rem, 2.5vw + 0.25rem, 2rem)', { lineHeight: '1.12', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-sm': ['clamp(1.25rem, 2vw + 0.125rem, 1.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
        /* Body scale — enlarged for older ICPs */
        'body-xl': ['clamp(1.375rem, 1.6vw, 1.625rem)', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        'body-lg': ['clamp(1.25rem, 1.4vw, 1.5rem)', { lineHeight: '1.75', letterSpacing: '0.015em' }],
        'body': ['clamp(1.125rem, 1.1vw, 1.3125rem)', { lineHeight: '1.8', letterSpacing: '0.015em' }],
        'body-sm': ['clamp(1.0625rem, 1vw, 1.1875rem)', { lineHeight: '1.75', letterSpacing: '0.02em' }],
        /* Utility scale */
        'label': ['0.9375rem', { lineHeight: '1.4', letterSpacing: '0.06em', fontWeight: '600' }],
        'eyebrow-size': ['0.8125rem', { lineHeight: '1.3', letterSpacing: '0.3em', fontWeight: '700' }],
        'stat': ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.035em', fontWeight: '700' }],
        'stat-sm': ['clamp(2rem, 4vw, 2.75rem)', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '700' }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "dark-section": {
          DEFAULT: "hsl(var(--dark-section))",
          foreground: "hsl(var(--dark-section-foreground))",
        },
        "trust-badge": "hsl(var(--trust-badge))",
        heritage: {
          green: "hsl(var(--heritage-green))",
          charcoal: "hsl(var(--heritage-charcoal))",
        },
        highland: {
          gold: "hsl(var(--highland-gold))",
          "gold-light": "hsl(var(--highland-gold-light))",
        },
        "warm-stone": "hsl(var(--warm-stone))",
        slate: {
          DEFAULT: "hsl(var(--slate))",
          light: "hsl(var(--slate-light))",
          dark: "hsl(var(--slate-dark))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "dropdown-in": {
          from: { opacity: "0", transform: "translateY(6px) scale(0.97)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "ba-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(var(--highland-gold) / 0.4)" },
          "50%": { boxShadow: "0 0 0 8px hsl(var(--highland-gold) / 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        "accordion-up": "accordion-up 0.2s ease-out",
        "wiggle": "wiggle 0.5s ease-in-out",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "dropdown-in": "dropdown-in 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        "ba-pulse": "ba-pulse 2s ease-in-out 1",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;