import { ShieldCheck } from 'lucide-react'
import { reviewing } from '../data/content'
import Reveal from './Reveal'

export default function Reviewer() {
  return (
    <section id="reviewer">
      <div className="container">
        <Reveal className="section-head">
          <p className="tag">05a · Service</p>
          <h2>Reviewer for international journals</h2>
        </Reveal>

        <Reveal delay={80} className="reviewer-list">
          {reviewing.map((item, i) => (
            <div key={i} className="reviewer-row">
              <div className="reviewer-year">{item.year}</div>
              <div className="reviewer-body">
                <ShieldCheck size={16} />
                <span>{item.journal}</span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      <style>{`
        .reviewer-list {
          display: flex;
          flex-direction: column;
        }
        .reviewer-row {
          display: grid;
          grid-template-columns: 70px 1fr;
          gap: 24px;
          padding: 16px 0;
          border-bottom: 1px solid var(--line);
          align-items: center;
        }
        .reviewer-row:last-child {
          border-bottom: none;
        }
        .reviewer-year {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--ink-faint);
        }
        .reviewer-body {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.05rem;
          color: var(--ink);
        }
        .reviewer-body svg {
          color: var(--circuit-green);
          flex-shrink: 0;
        }

        @media (max-width: 600px) {
          .reviewer-row {
            grid-template-columns: 1fr;
            gap: 4px;
          }
        }
      `}</style>
    </section>
  )
}