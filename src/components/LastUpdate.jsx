import { useEffect, useState } from 'react'
import { DatabaseZap } from 'lucide-react'

/* Visitor-এর timezone-এর জন্য undefined, সবসময় Bangladesh time চাইলে 'Asia/Dhaka' */
const TIME_ZONE = undefined

const LAST_UPDATE =
  typeof __LAST_UPDATE__ !== 'undefined' ? __LAST_UPDATE__ : new Date().toISOString()
const lastDate = new Date(LAST_UPDATE)

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: TIME_ZONE,
})

const timeFmt = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
  timeZone: TIME_ZONE,
})

const pad = (n) => String(n).padStart(2, '0')

function elapsed(from, to) {
  let s = Math.max(0, Math.floor((to - from) / 1000))
  const d = Math.floor(s / 86400)
  s -= d * 86400
  const h = Math.floor(s / 3600)
  s -= h * 3600
  const m = Math.floor(s / 60)
  s -= m * 60
  return `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`
}

export default function LastUpdate() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="last-update">
      <div className="lu-row">
        <DatabaseZap size={14} strokeWidth={1.75} className="lu-icon" />
        <span>
          Database Update: {dateFmt.format(lastDate)}, {timeFmt.format(lastDate)}
        </span>
      </div>
      <div className="lu-ago">{elapsed(lastDate, now)} ago</div>

      <style>{`
        .last-update {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-variant-numeric: tabular-nums;
          line-height: 1.3;
        }
        .lu-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .lu-icon {
          color: var(--copper);
          flex-shrink: 0;
        }
        .lu-ago {
          color: var(--copper-bright);
          letter-spacing: 0.04em;
        }

        @media (max-width: 600px) {
          .last-update {
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  )
}