import { Award, Zap } from 'lucide-react'
import { grants, researchInterests } from '../data/content'
import Reveal from './Reveal'

export default function GrantsResearch() {
  return (
    <section id="research">
      <div className="container grants-grid">
        <div>
          <Reveal className="section-head">
            <p className="tag">04 · Funding</p>
            <h2>Grants &amp; Sponsorship</h2>
            <p>External financial support that has backed thesis and project work.</p>
          </Reveal>

          <div className="grants-list">
            {grants.map((g, i) => (
              <Reveal key={g.title} delay={i * 100} className="grant-item">
                <div className="grant-amount">
                  <Award size={18} strokeWidth={1.75} />
                  <span>{g.amount}</span>
                </div>
                <h3>{g.title}</h3>
                <p>{g.description}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={150} className="research-panel">
          <p className="tag">Research Interest</p>
          <h2 className="research-title">
            <Zap size={26} strokeWidth={1.75} />
            What drives the work
          </h2>
          <ul className="interest-list">
            {researchInterests.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>

      <style>{`
        .grants-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 64px;
          align-items: start;
        }
        .grants-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .grant-item {
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 24px;
          background: var(--bg-card);
        }
        .grant-amount {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          color: var(--copper-bright);
          font-size: 1.1rem;
          margin-bottom: 10px;
        }
        .grant-item h3 {
          font-size: 1.15rem;
          margin-bottom: 8px;
        }
        .grant-item p {
          color: var(--ink-soft);
          font-size: 0.98rem;
        }

        .research-panel {
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 32px;
          background: linear-gradient(160deg, var(--bg-card), var(--bg-elevated));
          position: sticky;
          top: 100px;
        }
        .research-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.6rem;
          margin: 14px 0 24px;
          color: var(--copper);
        }
        .research-title svg {
          color: var(--copper-bright);
        }
        .interest-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .interest-list li {
          font-family: var(--font-mono);
          font-size: 0.92rem;
          color: var(--ink);
          padding: 12px 16px;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          border-left: 2px solid var(--copper);
        }

        @media (max-width: 900px) {
          .grants-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .research-panel {
            position: static;
          }
        }
      `}</style>
    </section>
  )
}
