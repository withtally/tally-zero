import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [
    "bg-green-100",
    "bg-red-100",
    "bg-yellow-100",
    "bg-indigo-100",
    "bg-orange-100",
    "bg-amber-100",
    "bg-emerald-100",
    "bg-rose-100",

    "dark:bg-green-900/60",
    "dark:bg-red-900/60",
    "dark:bg-yellow-900/60",
    "dark:bg-indigo-900/60",
    "dark:bg-orange-900/60",
    "dark:bg-amber-900/60",
    "dark:bg-emerald-900/60",
    "dark:bg-rose-900/60",

    "text-green-800",
    "text-yellow-700",
    "text-amber-600",
    "text-emerald-700",
    "text-orange-600",
    "text-red-600",
    "text-indigo-500",
    "text-rose-700",

    "dark:text-green-200",
    "dark:text-yellow-400",
    "dark:text-amber-400",
    "dark:text-emerald-400",
    "dark:text-indigo-100",
    "dark:text-orange-200",
    "dark:text-red-100",
    "dark:text-rose-200",
  ],
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
