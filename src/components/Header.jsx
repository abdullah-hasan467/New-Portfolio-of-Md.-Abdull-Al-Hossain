import { useEffect, useState } from 'react'
import { Menu, X, Cpu } from 'lucide-react'
import { profile } from '../data/content'
import ThemeToggle from './ThemeToggle'

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-row">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <Cpu size={20} strokeWidth={1.75} />
          <span>{profile.shortName}</span>
        </a>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <ThemeToggle />

        <button
          className="nav-toggle"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
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
          border-bottom: 1px solid transparent;
          transition: border-color 0.25s ease, background 0.25s ease;
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
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.05rem;
          color: var(--ink);
          letter-spacing: 0.01em;
        }
        .brand svg {
          color: var(--copper);
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
        .nav-toggle {
          display: none;
          background: none;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          color: var(--ink);
          padding: 8px;
          cursor: pointer;
        }
        @media (max-width: 860px) {
          .nav-toggle {
            display: flex;
          }
          .nav-links {
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            background: var(--bg-elevated);
            border-bottom: 1px solid var(--line);
            flex-direction: column;
            gap: 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            justify-content: flex-start;
          }
          .nav-links.open {
            max-height: 500px;
          }
          .nav-links a {
            padding: 16px 24px;
            border-bottom: 1px solid var(--line);
          }
        }
      `}</style>
    </header>
  )
}