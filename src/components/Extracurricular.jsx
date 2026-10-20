import { Users, Trophy, Activity, HeartHandshake, Telescope, PawPrint } from 'lucide-react'
import FadeIn from './FadeIn'

const items = [
  { Icon: Users, text: 'IEEE Student Branch, Independent University, Bangladesh.' },
  { Icon: Trophy, text: 'Engineering & Renewable Energy Competitions.' },
  { Icon: Activity, text: 'Sports: Active player in volleyball, handball, and cricket at school and university.' },
  { Icon: HeartHandshake, text: 'Volunteer, Bangladesh Physics Olympiad (2023 & 2024)', year: '2023–2024' },
  { Icon: Telescope, text: 'Volunteer, Bangladesh Olympiad on Astronomy and Astrophysics (2024)', year: '2024' },
  { Icon: PawPrint, text: 'Volunteer, Wildlife Rescue and Conservation, Bangladesh Forest Department (2019–2023)', year: '2019–2023' },
]

const cardStyle = {
  display: 'flex',
  gap: '14px',
  alignItems: 'flex-start',
  padding: '18px 20px',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '10px',
  background: 'rgba(255,255,255,0.03)',
  color: 'inherit',
}

export default function Extracurricular() {
  return (
    <section id="extracurricular" className="section">
      <div className="container">
        <FadeIn as="h1" className="section-title">
          Extracurricular Activities &amp; Volunteering
        </FadeIn>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginTop: '24px',
          }}
        >
          {items.map(({ Icon, text, year }, i) => (
            <FadeIn key={i} delay={i * 80} style={cardStyle}>
              <Icon size={20} style={{ color: 'var(--accent, #c8793a)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ margin: 0, lineHeight: 1.5 }}>{text}</p>
                {year && (
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: 6,
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '0.8rem',
                      color: 'var(--accent, #c8793a)',
                    }}
                  >
                    {year}
                  </span>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}