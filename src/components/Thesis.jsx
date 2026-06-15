import { Sun } from 'lucide-react'
import { thesis } from '../data/content'
import Reveal from './Reveal'

export default function Thesis() {
  return (
    <section id="thesis">
      <div className="container">
        <Reveal className="section-head">
          <p className="tag">06 · Thesis</p>
          <h2>{thesis.title}</h2>
          <p className="funding">
            <Sun size={16} /> {thesis.funding}
          </p>
        </Reveal>

        <div className="thesis-grid">
          <Reveal className="thesis-media">
            <div className="media-frame">
              <img src={thesis.image} alt="3D render of the solar-powered portable oil extractor" />
            </div>
            {thesis.video && (
              <video controls loop className="media-frame thesis-video" poster={thesis.image}>
                <source src={thesis.video} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
            )}
          </Reveal>

          <Reveal delay={100} className="thesis-copy">
            <p className="thesis-summary">{thesis.summary}</p>
            <ul className="thesis-details">
              {thesis.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={180} className="spec-sheet">
          <div className="spec-header">
            <span className="spec-label">PERFORMANCE / DATASHEET</span>
            <span className="spec-rev">REV 1.0</span>
          </div>
          <div className="spec-grid">
            {thesis.stats.map((stat) => (
              <div key={stat.label} className="spec-cell">
                <div className="spec-value">{stat.value}</div>
                <div className="spec-label-small">{stat.label}</div>
                <div className="spec-sub">{stat.sub}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .funding {
          margin-top: 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--circuit-green);
        }
        .thesis-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
          margin-bottom: 48px;
        }
        .thesis-media {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .media-frame {
          border: 1px solid var(--line);
          border-radius: var(--radius);
          overflow: hidden;
          background: var(--bg-elevated);
        }
        .media-frame img {
          width: 100%;
          object-fit: cover;
          aspect-ratio: 4 / 3;
        }
        .thesis-video {
          width: 100%;
          aspect-ratio: 16 / 9;
        }
        .thesis-summary {
          color: var(--ink-soft);
          font-size: 1.05rem;
          margin-bottom: 24px;
        }
        .thesis-details {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .thesis-details li {
          padding-left: 22px;
          position: relative;
          color: var(--ink-soft);
        }
        .thesis-details li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--copper);
        }

        .spec-sheet {
          border: 1px solid var(--copper);
          border-radius: var(--radius);
          overflow: hidden;
        }
        .spec-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 24px;
          background: var(--bg-elevated);
          border-bottom: 1px solid var(--line);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          color: var(--copper);
        }
        .spec-rev {
          color: var(--ink-faint);
        }
        .spec-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .spec-cell {
          padding: 32px 24px;
          border-right: 1px solid var(--line);
          text-align: center;
        }
        .spec-cell:last-child {
          border-right: none;
        }
        .spec-value {
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--ink);
        }
        .spec-label-small {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--copper-bright);
          margin-top: 8px;
        }
        .spec-sub {
          font-size: 0.85rem;
          color: var(--ink-faint);
          margin-top: 4px;
        }

        @media (max-width: 860px) {
          .thesis-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .spec-grid {
            grid-template-columns: 1fr 1fr;
          }
          .spec-cell {
            border-right: 1px solid var(--line);
            border-bottom: 1px solid var(--line);
          }
          .spec-cell:nth-child(2n) {
            border-right: none;
          }
          .spec-cell:nth-last-child(-n+2) {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  )
}
