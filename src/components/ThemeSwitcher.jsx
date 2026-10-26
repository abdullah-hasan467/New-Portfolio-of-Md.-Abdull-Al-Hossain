import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { Palette, Check } from 'lucide-react'
import { THEMES, STORAGE_KEY, resolveTheme } from './themes'

function readStored() {
  try {
    return resolveTheme(localStorage.getItem(STORAGE_KEY))
  } catch {
    return resolveTheme(null)
  }
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(readStored)
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const btnRef = useRef(null)
  const gridRef = useRef(null)

  // Apply saved theme before first paint (no flash)
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Switch theme: circular reveal when supported, soft cross-fade otherwise
  const applyTheme = useCallback((id, originEl) => {
    if (id === document.documentElement.getAttribute('data-theme')) return
    const root = document.documentElement

    const commit = () => {
      root.setAttribute('data-theme', id)
      setTheme(id)
      try { localStorage.setItem(STORAGE_KEY, id) } catch { /* storage blocked */ }
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!document.startViewTransition || reduce) {
      root.classList.add('theme-fade')
      commit()
      window.setTimeout(() => root.classList.remove('theme-fade'), 650)
      return
    }

    const rect = (originEl || btnRef.current).getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => flushSync(commit))
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 700, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
        )
      })
      .catch(() => {})
  }, [])

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return
    const onDown = e => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = e => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Press "T" anywhere (outside inputs) to cycle themes
  useEffect(() => {
    const onKey = e => {
      if (e.key.toLowerCase() !== 't' || e.metaKey || e.ctrlKey || e.altKey) return
      const tag = (e.target.tagName || '').toLowerCase()
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return
      const i = THEMES.findIndex(t => t.id === theme)
      applyTheme(THEMES[(i + 1) % THEMES.length].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [theme, applyTheme])

  // Focus the active theme when the panel opens
  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => {
      gridRef.current?.querySelector('[aria-checked="true"]')?.focus()
    }, 60)
    return () => window.clearTimeout(t)
  }, [open])

  // Arrow-key navigation inside the grid
  const onGridKey = e => {
    const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp']
    if (!keys.includes(e.key)) return
    e.preventDefault()
    const items = [...gridRef.current.querySelectorAll('[role="radio"]')]
    const i = items.indexOf(document.activeElement)
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1
    items[(i + step + items.length) % items.length]?.focus()
  }

  const current = THEMES.find(t => t.id === theme) || THEMES[0]

  return (
    <div className="ts" ref={wrapRef}>
      <button
        ref={btnRef}
        className="ts-btn"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Theme: ${current.name}. Change theme`}
        title="Change theme (T)"
      >
        <Palette size={17} />
        <span className="ts-dot" style={{ background: current.swatch[1] }} />
      </button>

      <div className="ts-panel" data-open={open} role="dialog" aria-label="Choose a theme">
        <div className="ts-head">
          <span>Theme</span>
          <kbd>T</kbd>
        </div>
        <div className="ts-grid" role="radiogroup" ref={gridRef} onKeyDown={onGridKey}>
          {THEMES.map((t, i) => {
            const active = t.id === theme
            return (
              <button
                key={t.id}
                role="radio"
                aria-checked={active}
                tabIndex={active ? 0 : -1}
                className="ts-card"
                style={{ '--i': i }}
                onClick={e => applyTheme(t.id, e.currentTarget)}
              >
                <span className="ts-preview" style={{ background: t.swatch[0] }}>
                  <span className="ts-bar" style={{ background: t.swatch[1] }} />
                  <span className="ts-bar short" style={{ background: t.swatch[2] }} />
                </span>
                <span className="ts-name">
                  {t.name}
                  {active && <Check size={13} />}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <style>{`
        .ts { position: relative; flex-shrink: 0; }

        .ts-btn {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px;
          background: transparent;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          color: var(--ink-soft);
          cursor: pointer;
          transition: border-color .2s ease, color .2s ease, background .2s ease, transform .2s ease;
        }
        .ts-btn:hover {
          border-color: var(--copper);
          color: var(--copper-bright);
          background: var(--bg-card);
        }
        .ts-btn:active { transform: scale(.94); }
        .ts-dot {
          position: absolute; right: 5px; bottom: 5px;
          width: 7px; height: 7px; border-radius: 50%;
          box-shadow: 0 0 0 2px var(--bg);
          transition: background .4s ease;
        }

        .ts-panel {
          position: absolute; right: 0; top: calc(100% + 10px);
          width: 292px; padding: 12px;
          background: var(--bg-card);
          border: 1px solid var(--line);
          border-radius: calc(var(--radius) + 4px);
          box-shadow: 0 20px 50px -12px rgba(0,0,0,.45);
          z-index: 50;
          opacity: 0; visibility: hidden;
          transform: translateY(-8px) scale(.97);
          transform-origin: top right;
          transition: opacity .22s ease, transform .28s cubic-bezier(.22,1,.36,1), visibility 0s linear .28s;
        }
        .ts-panel[data-open="true"] {
          opacity: 1; visibility: visible;
          transform: none;
          transition-delay: 0s;
        }

        .ts-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 2px 4px 10px;
          font-size: 13px; color: var(--ink-soft);
        }
        .ts-head kbd {
          font: inherit; font-size: 11px;
          padding: 1px 6px;
          border: 1px solid var(--line); border-radius: 5px;
          color: var(--ink-soft);
        }

        .ts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

        .ts-card {
          display: flex; flex-direction: column; gap: 8px;
          padding: 8px; text-align: left;
          background: transparent; color: var(--ink);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          cursor: pointer;
          opacity: 0; transform: translateY(6px);
          transition: border-color .2s ease, background .2s ease, transform .2s ease, opacity .3s ease;
          transition-delay: 0s;
        }
        .ts-panel[data-open="true"] .ts-card {
          opacity: 1; transform: none;
          transition-delay: calc(var(--i) * 28ms + 40ms), 0s, 0s, calc(var(--i) * 28ms + 40ms);
        }
        .ts-panel[data-open="true"] .ts-card:hover {
          transform: translateY(-2px);
          border-color: var(--copper);
          transition-delay: 0s;
        }
        .ts-card[aria-checked="true"] {
          border-color: var(--copper);
          background: rgba(var(--node-rgb), .08);
        }

        .ts-preview {
          display: flex; flex-direction: column; gap: 5px; justify-content: center;
          height: 38px; padding: 0 9px;
          border-radius: calc(var(--radius) - 3px);
          border: 1px solid rgba(128,128,128,.25);
        }
        .ts-bar { display: block; height: 5px; width: 70%; border-radius: 3px; }
        .ts-bar.short { width: 40%; }

        .ts-name {
          display: flex; align-items: center; justify-content: space-between; gap: 4px;
          font-size: 12.5px; line-height: 1.2;
        }
        .ts-name svg { color: var(--copper); flex-shrink: 0; }

        @media (prefers-reduced-motion: reduce) {
          .ts-panel, .ts-card, .ts-btn { transition: none !important; }
          .ts-card { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  )
}
