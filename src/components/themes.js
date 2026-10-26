// Theme registry. The real colors live in themes.css (one block per id).
// This file only holds metadata for the switcher UI: name, mode, swatch preview.
// To add a theme: add an entry here AND a [data-theme="your-id"] block in themes.css.

export const THEMES = [
  { id: 'copper-night', name: 'Copper Night', mode: 'dark',  swatch: ['#0b0e14', '#e8935a', '#6fcf97'] },
  { id: 'daylight',     name: 'Daylight',     mode: 'light', swatch: ['#f6f3ee', '#c8642a', '#2e9e6a'] },
  { id: 'cyber',        name: 'Cyber Neon',   mode: 'dark',  swatch: ['#07060f', '#00e5ff', '#ff3dcb'] },
  { id: 'aurora',       name: 'Aurora',       mode: 'dark',  swatch: ['#06100f', '#4ee0b5', '#8b7bff'] },
  { id: 'sunset',       name: 'Sunset',       mode: 'dark',  swatch: ['#14091a', '#ff7a59', '#ffd166'] },
  { id: 'ocean',        name: 'Deep Ocean',   mode: 'dark',  swatch: ['#050d1a', '#3ea6ff', '#5eead4'] },
  { id: 'terminal',     name: 'Terminal',     mode: 'dark',  swatch: ['#000000', '#39ff14', '#ffd400'] },
  { id: 'sakura',       name: 'Sakura',       mode: 'light', swatch: ['#fdf2f5', '#d6336c', '#7c5cff'] },
]

export const DEFAULT_THEME = 'copper-night'
export const STORAGE_KEY = 'theme'

// Accepts old values ('dark' / 'light') from the previous toggle and unknown ids.
export function resolveTheme(value) {
  if (value === 'dark') return 'copper-night'
  if (value === 'light') return 'daylight'
  return THEMES.some(t => t.id === value) ? value : DEFAULT_THEME
}
