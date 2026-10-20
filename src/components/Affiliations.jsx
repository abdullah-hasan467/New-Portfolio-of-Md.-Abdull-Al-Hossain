import { BadgeCheck } from 'lucide-react'
import Reveal from './Reveal'

const items = [
  'Member, IEEE.',
  'Member, Institution of Engineers (IEB) Bangladesh',
]

export default function Affiliations() {
  return (
    <section id="affiliations">
      <div className="container">
        <Reveal className="section-head">
          <p className="tag">08b · Involvements</p>
          <h2>Professional Affiliations</h2>
        </Reveal>

        <div className="af-list">
          {items.map((text, i) => (
            <Reveal key={text} delay={i * 100} className="af-item">
              <div className="af-head">
                <div className="af-icon">
                  <BadgeCheck size={18} strokeWidth={1.75} />
                </div>
                <div className="af-titles">
                  <p className="af-text">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .af-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .af-item {
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 28px;
          background: var(--bg-card);
        }
        .af-head {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .af-icon {
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
        .af-titles {
          flex: 1;
          min-width: 0;
        }
        .af-text {
          color: var(--ink-soft);
          line-height: 1.6;
        }

        @media (max-width: 600px) {
          .af-item {
            padding: 22px;
          }
        }
      `}</style>
    </section>
  )
}