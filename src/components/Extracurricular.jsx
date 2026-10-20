import { Users, Trophy, Activity, HeartHandshake, Telescope, PawPrint } from 'lucide-react'
import Reveal from './Reveal'

const items = [
  { Icon: Users, text: 'IEEE Student Branch, Independent University, Bangladesh.' },
  { Icon: Trophy, text: 'Engineering & Renewable Energy Competitions.' },
  {
    Icon: Activity,
    text: 'Sports: Active player in volleyball, handball, and cricket at school and university.',
  },
  {
    Icon: HeartHandshake,
    text: 'Volunteer, Bangladesh Physics Olympiad (2023 & 2024)',
    period: '2023–2024',
  },
  {
    Icon: Telescope,
    text: 'Volunteer, Bangladesh Olympiad on Astronomy and Astrophysics (2024)',
    period: '2024',
  },
  {
    Icon: PawPrint,
    text: 'Volunteer, Wildlife Rescue and Conservation, Bangladesh Forest Department (2019–2023)',
    period: '2019–2023',
  },
]

export default function Extracurricular() {
  return (
    <section id="extracurricular">
      <div className="container">
        <Reveal className="section-head">
          <p className="tag">08a · Engagements</p>
          <h2>Extracurricular Activities &amp; Volunteering</h2>
        </Reveal>

        <div className="xc-list">
          {items.map(({ Icon, text, period }, i) => (
            <Reveal key={text} delay={i * 100} className="xc-item">
              <div className="xc-head">
                <div className="xc-icon">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <div className="xc-titles">
                  <p className="xc-text">{text}</p>
                </div>
                {period && <div className="xc-period">{period}</div>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .xc-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .xc-item {
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 28px;
          background: var(--bg-card);
        }
        .xc-head {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          flex-wrap: wrap;
        }
        .xc-icon {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--copper);
        }
        .xc-titles {
          flex: 1;
          min-width: 200px;
          align-self: center;
        }
        .xc-text {
          color: var(--ink-soft);
          line-height: 1.6;
        }
        .xc-period {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--copper);
          border: 1px solid var(--line);
          border-radius: 100px;
          padding: 5px 14px;
          white-space: nowrap;
          align-self: flex-start;
        }

        @media (max-width: 600px) {
          .xc-item {
            padding: 22px;
          }
        }
      `}</style>
    </section>
  )
}