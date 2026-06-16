import { ExternalLink, FileText, Mic, Clock3 } from 'lucide-react'
import { publications } from '../data/content'
import Reveal from './Reveal'

function PubRow({ item, showStatus }) {
  return (
    <div className="pub-row">
      <div className="pub-year">{item.year}</div>
      <div className="pub-body">
        <p className="pub-authors">{item.authors}</p>
        <h3>{item.title}</h3>
        <p className="pub-venue">{item.venue}</p>
        <div className="pub-footer">
          {showStatus && item.status && <span className="status-pill">{item.status}</span>}
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="pub-link">
              View paper <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// Sort newest-first (2026, 2025, 2024, ...). Falls back to original
// order for entries with the same year.
function byYearDesc(list) {
  return [...list].sort((a, b) => Number(b.year) - Number(a.year))
}

export default function Publications() {
  return (
    <section id="publications">
      <div className="container">
        <Reveal className="section-head">
          <p className="tag">05 · Publications</p>
          <h2>Research Output</h2>
          <p>Peer-reviewed journal articles, conference papers, and presentations in power electronics and renewable energy.</p>
        </Reveal>

        <Reveal className="pub-group">
          <h3 className="pub-group-title journal">
            <FileText size={18} /> Journal Articles (Peer-Reviewed)
          </h3>
          {byYearDesc(publications.journals).map((item, i) => (
            <PubRow key={i} item={item} />
          ))}
        </Reveal>

        <Reveal delay={80} className="pub-group">
          <h3 className="pub-group-title conference">
            <Mic size={18} /> Conference Proceedings (Peer-Reviewed)
          </h3>
          {byYearDesc(publications.conferences).map((item, i) => (
            <PubRow key={i} item={item} showStatus />
          ))}
        </Reveal>

        {/* <Reveal delay={140} className="pub-group">
          <h3 className="pub-group-title review">
            <Clock3 size={18} /> Manuscript Under Review
          </h3>
          {byYearDesc(publications.underReview).map((item, i) => (
            <PubRow key={i} item={item} />
          ))}
        </Reveal> */}

        <Reveal delay={200} className="pub-group">
          <h3 className="pub-group-title presentations">
            <Mic size={18} /> Conference Presentations
          </h3>
          {byYearDesc(publications.presentations).map((item, i) => (
            <PubRow key={i} item={item} />
          ))}
        </Reveal>

        <Reveal delay={260}>
          <p className="pub-cta">
            Interested in collaborating on research?{' '}
            <a href="#contact">Get in Touch</a>.
          </p>
        </Reveal>
      </div>


      

      <style>{`
        .pub-group {
          margin-bottom: 48px;
        }
        .pub-group:last-of-type {
          margin-bottom: 0;
        }
        .pub-group-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.1rem;
          font-family: var(--font-mono);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding-bottom: 14px;
          margin-bottom: 18px;
          border-bottom: 1px solid var(--line);
        }
        .pub-group-title.journal { color: var(--signal-blue); }
        .pub-group-title.conference { color: var(--copper); }
        .pub-group-title.review { color: var(--circuit-green); }
        .pub-group-title.presentations { color: var(--ink-soft); }

        .pub-row {
          display: grid;
          grid-template-columns: 70px 1fr;
          gap: 24px;
          padding: 18px 0;
          border-bottom: 1px solid var(--line);
        }
        .pub-row:last-child {
          border-bottom: none;
        }
        .pub-year {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--ink-faint);
          padding-top: 2px;
        }
        .pub-authors {
          font-size: 0.92rem;
          color: var(--ink-faint);
          margin-bottom: 6px;
        }
        .pub-body h3 {
          font-size: 1.1rem;
          margin-bottom: 6px;
          line-height: 1.4;
        }
        .pub-venue {
          color: var(--ink-soft);
          font-size: 0.92rem;
        }
        .pub-footer {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 10px;
          flex-wrap: wrap;
        }
        .status-pill {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border: 1px solid var(--circuit-green);
          color: var(--circuit-green);
          border-radius: 100px;
        }
        .pub-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          color: var(--copper);
          transition: color 0.2s ease;
        }
        .pub-link:hover {
          color: var(--copper-bright);
        }
        .pub-cta {
          text-align: center;
          color: var(--ink-soft);
          margin-top: 24px;
        }
        .pub-cta a {
          color: var(--copper);
          font-family: var(--font-mono);
        }

        @media (max-width: 600px) {
          .pub-row {
            grid-template-columns: 1fr;
            gap: 6px;
          }
        }
      `}</style>
    </section>
  )
}
