const defaultTheme = require("tailwindcss/defaultTheme");

const fromVariable = (variableName) => `var(${variableName})`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        border: fromVariable("--border"),
        input: fromVariable("--input"),
        ring: fromVariable("--ring"),
        background: fromVariable("--background"),
        foreground: fromVariable("--foreground"),
        card: {
          DEFAULT: fromVariable("--card"),
          foreground: fromVariable("--card-foreground"),
        },
        popover: {
          DEFAULT: fromVariable("--popover"),
          foreground: fromVariable("--popover-foreground"),
        },
        primary: {
          DEFAULT: fromVariable("--primary"),
          foreground: fromVariable("--primary-foreground"),
        },
        secondary: {
          DEFAULT: fromVariable("--secondary"),
          foreground: fromVariable("--secondary-foreground"),
        },
        muted: {
          DEFAULT: fromVariable("--muted"),
          foreground: fromVariable("--muted-foreground"),
        },
        accent: {
          DEFAULT: fromVariable("--accent"),
          foreground: fromVariable("--accent-foreground"),
        },
        destructive: {
          DEFAULT: fromVariable("--destructive"),
          foreground: fromVariable("--destructive-foreground"),
        },
        chart: {
          1: fromVariable("--chart-1"),
          2: fromVariable("--chart-2"),
          3: fromVariable("--chart-3"),
          4: fromVariable("--chart-4"),
          5: fromVariable("--chart-5"),
        },
        sidebar: {
          DEFAULT: fromVariable("--sidebar"),
          foreground: fromVariable("--sidebar-foreground"),
          primary: fromVariable("--sidebar-primary"),
          "primary-foreground": fromVariable("--sidebar-primary-foreground"),
          accent: fromVariable("--sidebar-accent"),
          "accent-foreground": fromVariable("--sidebar-accent-foreground"),
          border: fromVariable("--sidebar-border"),
          ring: fromVariable("--sidebar-ring"),
        },
        portfolio: {
          primary: fromVariable("--portfolio-primary"),
          secondary: fromVariable("--portfolio-secondary"),
          tertiary: fromVariable("--portfolio-tertiary"),
          neutral: fromVariable("--portfolio-neutral"),
          surface: fromVariable("--portfolio-surface"),
          "surface-alt": fromVariable("--portfolio-surface-alt"),
          border: fromVariable("--portfolio-border"),
          highlight: fromVariable("--portfolio-highlight"),
          success: fromVariable("--portfolio-success"),
          warning: fromVariable("--portfolio-warning"),
          danger: fromVariable("--portfolio-danger"),
          accent: fromVariable("--portfolio-accent"),
          "accent-hover": fromVariable("--portfolio-accent-hover"),
          "accent-border": fromVariable("--portfolio-accent-border"),
          "code-surface": fromVariable("--portfolio-code-surface"),
          "code-foreground": fromVariable("--portfolio-code-foreground"),
        },
      },
      spacing: {
        "portfolio-xs": fromVariable("--portfolio-space-xs"),
        "portfolio-sm": fromVariable("--portfolio-space-sm"),
        "portfolio-md": fromVariable("--portfolio-space-md"),
        "portfolio-lg": fromVariable("--portfolio-space-lg"),
        "portfolio-xl": fromVariable("--portfolio-space-xl"),
        "portfolio-xxl": fromVariable("--portfolio-space-xxl"),
        "portfolio-gutter": fromVariable("--portfolio-gutter"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        heading: ["var(--font-heading)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        "portfolio-card": "inset 0 0 0 1px var(--portfolio-surface)",
        "portfolio-card-accent":
          "inset 0 0 0 1px var(--portfolio-accent-border)",
      },
      transitionTimingFunction: {
        portfolio: fromVariable("--portfolio-ease-out"),
        "portfolio-hover": fromVariable("--portfolio-ease-hover"),
        "portfolio-continuous": fromVariable("--portfolio-ease-continuous"),
      },
      transitionDuration: {
        "portfolio-150": fromVariable("--portfolio-duration-150"),
        "portfolio-180": fromVariable("--portfolio-duration-180"),
        "portfolio-200": fromVariable("--portfolio-duration-200"),
        "portfolio-300": fromVariable("--portfolio-duration-300"),
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "border-beam": "border-beam calc(var(--duration) * 1s) infinite linear",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
