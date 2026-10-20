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

/* Visitor-এর নিজের timezone দেখাতে চাইলে undefined রাখো।
   সবসময় Bangladesh time চাইলে 'Asia/Dhaka' দাও। */
const TIME_ZONE = undefined

const timeFmt = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
  timeZone: TIME_ZONE,
})

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: TIME_ZONE,
})

function useNow() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let timer
    // প্রতিটা সেকেন্ডের boundary-তে tick করে, তাই drift হয় না
    const tick = () => {
      setNow(new Date())
      timer = setTimeout(tick, 1000 - (Date.now() % 1000) + 5)
    }
    tick()
    return () => clearTimeout(timer)
  }, [])

  return now
}

function LiveClock() {
  const now = useNow()

  const parts = timeFmt.formatToParts(now)
  const get = (type) => parts.find((p) => p.type === type)?.value ?? ''
  const hh = get('hour')
  const mm = get('minute')
  const ss = get('second')
  const ampm = get('dayPeriod')

  return (
    <div
      className="live-clock"
      title={`${dateFmt.format(now)} ${hh}:${mm}:${ss} ${ampm}`}
      aria-hidden="true"
    >
      <div className="clock-time">
        <span className="clock-dot" />
        <span className="clock-digits">
          {hh}:{mm}
          <span className="clock-sec">:{ss}</span>
        </span>
        <span className="clock-ampm">{ampm}</span>
      </div>
      <div className="clock-date">{dateFmt.format(now)}</div>
    </div>
  )
}

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

        <LiveClock />

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
        .nav-toggle {
          display: none;
          background: none;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          color: var(--ink);
          padding: 8px;
          cursor: pointer;
          flex-shrink: 0;
        }

        /* ---------- Live clock ---------- */
        .live-clock {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 4px;
          height: 38px;
          padding: 0 0 0 16px;
          border-left: 1px solid var(--line);
          font-family: var(--font-mono);
          font-variant-numeric: tabular-nums;
          line-height: 1;
          white-space: nowrap;
          user-select: none;
          flex-shrink: 0;
        }
        .clock-time {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--ink);
        }
        .clock-sec {
          color: var(--copper-bright);
        }
        .clock-ampm {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--copper);
          align-self: flex-end;
          padding-bottom: 1px;
        }
        .clock-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--copper);
          box-shadow: 0 0 0 0 var(--copper);
          animation: clockPulse 2s ease-out infinite;
          flex-shrink: 0;
        }
        .clock-date {
          font-size: 0.64rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-soft);
        }
        @keyframes clockPulse {
          0%   { box-shadow: 0 0 0 0 rgba(200, 121, 58, 0.55); }
          70%  { box-shadow: 0 0 0 6px rgba(200, 121, 58, 0); }
          100% { box-shadow: 0 0 0 0 rgba(200, 121, 58, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .clock-dot { animation: none; }
        }

        /* Tablet / small laptop: nav আর clock একসাথে tight হলে gap কমাও */
        @media (max-width: 1100px) {
          .nav-links { gap: 20px; }
          .nav-links a { font-size: 0.78rem; }
        }

        /* ---------- Mobile ---------- */
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
            font-size: 0.82rem;
          }
          .nav-row {
            gap: 10px;
          }
          /* nav-links fixed হওয়ায় clock-কে right দিকে ঠেলে দাও */
          .live-clock {
            margin-left: auto;
            padding-left: 12px;
          }
        }

        /* Phone: শুধু time দেখাও, date লুকাও */
        @media (max-width: 480px) {
          .live-clock {
            height: auto;
            padding-left: 10px;
          }
          .clock-date { display: none; }
          .clock-time { font-size: 0.82rem; gap: 5px; }
          .clock-ampm { font-size: 0.58rem; }
        }

        /* খুব ছোট screen: dot আর AM/PM-এর জায়গা বাঁচাও */
        @media (max-width: 360px) {
          .clock-dot { display: none; }
          .clock-time { font-size: 0.76rem; }
        }
      `}</style>
    </header>
  )
}