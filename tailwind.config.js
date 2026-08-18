/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': 'var(--bg-primary)',
        'brand-elevated': 'var(--bg-elevated)',
        'brand-surface-subtle': 'var(--bg-surface-subtle)',
        'accent-signal': 'var(--accent-signal)',
        'accent-signal-deep': 'var(--accent-signal-deep)',
        'accent-signal-subtle': 'var(--accent-signal-subtle)',
        'accent-warn': 'var(--accent-warn)',
        'accent-danger': 'var(--accent-danger)',
        'accent-success': 'var(--accent-success)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'border-default': 'var(--divider)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'brand': '0 4px 14px 0 rgba(32, 86, 163, 0.22)',
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
      },
      screens: {
        'xs': '360px',
      }
    },
  },
  plugins: [],
}
