import { useEffect, useState } from 'react'
import { Clock as ClockIcon } from 'lucide-react'

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

export function useNow() {
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

function getParts(now) {
  const parts = timeFmt.formatToParts(now)
  const get = (type) => parts.find((p) => p.type === type)?.value ?? ''
  return {
    hh: get('hour'),
    mm: get('minute'),
    ss: get('second'),
    ampm: get('dayPeriod'),
    date: dateFmt.format(now),
  }
}

/* Desktop: ThemeToggle-এর পাশে, দুই লাইন */
export function DesktopClock({ now }) {
  const { hh, mm, ss, ampm, date } = getParts(now)
  return (
    <div className="live-clock" aria-hidden="true">
      <ClockIcon className="clock-icon" size={18} strokeWidth={1.75} />
      <div className="clock-body">
        <div className="clock-time">
          <span className="clock-digits">
            {hh}:{mm}
            <span className="clock-sec">:{ss}</span>
          </span>
          <span className="clock-ampm">{ampm}</span>
        </div>
        <div className="clock-date">{date}</div>
      </div>
      <ClockStyles />
    </div>
  )
}

/* Mobile: নামের ঠিক নিচে, এক লাইনে */
export function MobileClock({ now }) {
  const { hh, mm, ss, ampm, date } = getParts(now)
  return (
    <div className="mobile-clock" aria-hidden="true">
      <ClockIcon className="mclock-icon" size={11} strokeWidth={2} />
      <span className="mclock-time">
        {hh}:{mm}
        <span className="clock-sec">:{ss}</span>
        <span className="mclock-ampm">{ampm}</span>
      </span>
      <span className="mclock-sep">|</span>
      <span className="mclock-date">{date}</span>
    </div>
  )
}

/* একসাথে দুটো clock: CSS breakpoint ঠিক করে কোনটা দেখাবে।
   Header-এ আলাদা আলাদা বসাতে চাইলে DesktopClock / MobileClock আলাদাভাবে import করো। */
function ClockStyles() {
  return null
}

export default function Clock() {
  const now = useNow()
  return <DesktopClock now={now} />
}

/* ---------- Styles (এই file-এর নিজস্ব CSS) ---------- */
export const clockCss = `
  /* ---------- Desktop clock ---------- */
  .live-clock {
    display: flex;
    align-items: center;
    gap: 10px;
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
  .clock-icon {
    color: var(--copper);
    flex-shrink: 0;
  }
  .clock-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 4px;
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
  .clock-date {
    font-size: 0.64rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-soft);
  }

  /* ---------- Mobile clock (default: hidden) ---------- */
  .mobile-clock {
    display: none;
  }

  @media (max-width: 860px) {
    .live-clock {
      display: none;
    }
    .mobile-clock {
      display: flex;
      align-items: center;
      gap: 6px;
      padding-left: 30px; /* brand icon (20px) + gap (10px), যাতে নামের সাথে align হয় */
      font-family: var(--font-mono);
      font-variant-numeric: tabular-nums;
      font-size: 0.68rem;
      line-height: 1;
      letter-spacing: 0.04em;
      color: var(--ink);
      white-space: nowrap;
      user-select: none;
      position: relative;
    }
    .mclock-icon {
      position: absolute;
      left: 4px;
      color: var(--copper);
      flex-shrink: 0;
    }
    .mclock-ampm {
      margin-left: 4px;
      font-size: 0.56rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      color: var(--copper);
    }
    .mclock-sep {
      color: var(--line);
    }
    .mclock-date {
      font-size: 0.62rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink-soft);
    }
  }

  @media (max-width: 380px) {
    .mobile-clock { font-size: 0.62rem; gap: 5px; }
    .mclock-date { font-size: 0.56rem; letter-spacing: 0.04em; }
    .mclock-ampm { font-size: 0.5rem; }
  }
`