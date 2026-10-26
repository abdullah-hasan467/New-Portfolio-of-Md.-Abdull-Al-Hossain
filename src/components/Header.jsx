
import { useEffect, useState } from 'react'
import { Menu, X, Cpu } from 'lucide-react'
import { profile } from '../data/content'
import ThemeToggle from './ThemeToggle'
import { useNow, DesktopClock, MobileClock, clockCss } from './Clock'

const links = [
  { href: '#about', label: 'About' },
  { href: '#education', label: 'Education' },
  { href: '#experience', label: 'Experience' },
  { href: '#research', label: 'Research' },
  { href: '#thesis', label: 'Thesis' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const now = useNow()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-row">
        <div className="brand-block">
          <a
            href="#top"
            className="brand"
            onClick={() => setOpen(false)}
          >
            <Cpu size={20} strokeWidth={1.75} />
            <span>{profile.shortName}</span>
          </a>

          <MobileClock now={now} />
        </div>

        <nav
          id="primary-navigation"
          className={`nav-links ${open ? 'open' : ''}`}
          aria-label="Main navigation"
          aria-hidden={!open && typeof window !== 'undefined'
            ? window.innerWidth <= 860
            : undefined}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <DesktopClock now={now} />

        <ThemeToggle />

        <button
          type="button"
          className={`nav-toggle ${open ? 'active' : ''}`}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="toggle-orbit" />

          <span className="toggle-lines">
            {open ? (
              <X size={22} strokeWidth={1.7} />
            ) : (
              <>
                <span className="menu-line line-one" />
                <span className="menu-line line-two" />
                <span className="menu-line line-three" />
              </>
            )}
          </span>
        </button>
      </div>

      <style>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(14, 19, 32, 0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid transparent;
          transition:
            border-color 0.25s ease,
            background 0.25s ease;
        }

        .site-header.scrolled {
          border-bottom-color: var(--line);
          background: rgba(14, 19, 32, 0.85);
        }

        .nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          gap: 16px;
        }

        .brand-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 5px;
          min-width: 0;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.05rem;
          color: var(--ink);
          letter-spacing: 0.01em;
          white-space: nowrap;
          min-width: 0;
        }

        .brand svg {
          color: var(--copper);
          flex-shrink: 0;
        }

        .nav-links {
          display: flex;
          gap: 30px;
          flex: 1;
          justify-content: flex-end;
        }

        .nav-links a {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--ink-soft);
          transition: color 0.2s ease;
          position: relative;
          padding: 4px 0;
        }

        .nav-links a:hover {
          color: var(--copper-bright);
        }

        /* Mobile circular menu control */

        .nav-toggle {
          position: relative;
          display: none;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          padding: 0;
          flex-shrink: 0;
          overflow: hidden;
          isolation: isolate;

          color: var(--ink);
          background: transparent;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;

          transition:
            color 250ms ease,
            transform 250ms ease;
        }

        .nav-toggle::before {
          content: '';
          position: absolute;
          inset: 3px;
          border: 1px solid var(--line);
          border-radius: 50%;
          background: var(--bg-card, var(--bg-elevated));
          opacity: 0.9;
          z-index: -1;

          transition:
            border-color 250ms ease,
            background 250ms ease,
            transform 300ms ease;
        }

        .toggle-orbit {
          position: absolute;
          inset: 0;
          border: 1px solid var(--copper);
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.72);
          pointer-events: none;

          transition:
            opacity 300ms ease,
            transform 350ms ease;
        }

        .toggle-lines {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 5px;
          width: 21px;
          height: 22px;
          color: var(--copper-bright);
          z-index: 1;
        }

        .menu-line {
          display: block;
          height: 1.7px;
          border-radius: 10px;
          background: currentColor;
          transform-origin: center;
          transition:
            width 250ms ease,
            transform 250ms ease,
            opacity 180ms ease;
        }

        .line-one {
          width: 21px;
          animation: line-calibrate 3s ease-in-out infinite;
        }

        .line-two {
          width: 14px;
          animation: line-calibrate 3s ease-in-out 180ms infinite;
        }

        .line-three {
          width: 18px;
          animation: line-calibrate 3s ease-in-out 360ms infinite;
        }

        @keyframes line-calibrate {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-2px);
          }
        }

        /* Hover and press response */

        .nav-toggle:hover {
          color: var(--copper-bright);
        }

        .nav-toggle:hover::before {
          border-color: var(--copper);
          transform: scale(0.93);
        }

        .nav-toggle:hover .toggle-orbit {
          opacity: 0.8;
          transform: scale(1);
        }

        .nav-toggle:hover .line-one {
          width: 15px;
        }

        .nav-toggle:hover .line-two {
          width: 21px;
        }

        .nav-toggle:hover .line-three {
          width: 12px;
        }

        .nav-toggle:active {
          transform: scale(0.91);
        }

        .nav-toggle.active::before {
          border-color: var(--copper);
          background: var(--bg-elevated);
        }

        .nav-toggle.active .toggle-orbit {
          opacity: 1;
          transform: scale(1);
        }

        .nav-toggle:focus-visible {
          outline: 2px solid var(--copper);
          outline-offset: 3px;
        }

        @media (max-width: 1100px) {
          .nav-links {
            gap: 20px;
          }

          .nav-links a {
            font-size: 0.78rem;
          }
        }

        @media (max-width: 860px) {
          .nav-row {
            gap: 10px;
          }

          .brand-block {
            flex: 1;
          }

          .nav-toggle {
            display: inline-flex;
          }

          .nav-links {
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;

            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 0;

            max-height: 0;
            overflow-x: hidden;
            overflow-y: auto;

            background: var(--bg-elevated);
            border-bottom: 1px solid transparent;
            visibility: hidden;
            opacity: 0;
            pointer-events: none;

            transition:
              max-height 350ms ease,
              opacity 220ms ease,
              visibility 350ms ease,
              border-color 250ms ease;
          }

          .nav-links.open {
            max-height: calc(100dvh - 72px);
            visibility: visible;
            opacity: 1;
            pointer-events: auto;
            border-bottom-color: var(--line);
          }

          .nav-links a {
            padding: 16px 24px;
            border-bottom: 1px solid var(--line);
            font-size: 0.82rem;
          }

          .nav-links a:last-child {
            border-bottom: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-toggle,
          .nav-toggle::before,
          .toggle-orbit,
          .menu-line,
          .nav-links {
            animation: none !important;
            transition: none !important;
          }
        }

        ${clockCss}
      `}</style>
    </header>
  )
}
