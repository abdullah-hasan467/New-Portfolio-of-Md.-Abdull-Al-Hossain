import { BadgeCheck } from 'lucide-react'
import FadeIn from './FadeIn'

const items = [
  'Member, IEEE.',
  'Member, Institution of Engineers (IEB) Bangladesh',
]

export default function Affiliations() {
  return (
    <section id="affiliations" className="section">
      <div className="container">
        <FadeIn as="h1" className="section-title">
          Professional Affiliations
        </FadeIn>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '24px 0 0',
            display: 'grid',
            gap: '14px',
          }}
        >
          {items.map((text, i) => (
            <FadeIn
              as="li"
              key={i}
              delay={i * 100}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <BadgeCheck size={20} style={{ color: 'var(--accent, #c8793a)', flexShrink: 0 }} />
              <span>{text}</span>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  )
}