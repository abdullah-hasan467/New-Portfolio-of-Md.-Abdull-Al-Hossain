import { Briefcase } from 'lucide-react'
import { experience } from '../data/content'
import Reveal from './Reveal'

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <Reveal className="section-head">
          <p className="tag">03 · Experience</p>
          <h2>Where the theory met the hardware</h2>
          <p>
            A year of applied roles spanning consumer electronics, industrial
            SCADA systems, and renewable-energy research.
          </p>
        </Reveal>

        <div className="exp-list">
          {experience.map((job, i) => (
            <Reveal key={job.title} delay={i * 100} className="exp-item">
              <div className="exp-head">
                <div className="exp-icon">
                  <Briefcase size={18} strokeWidth={1.75} />
                </div>
                <div className="exp-titles">
                  <h3>{job.title}</h3>
                  <p className="exp-org">{job.org}</p>
                </div>
                <div className="exp-period">{job.period}</div>
              </div>
              <ul className="exp-points">
                {job.points.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .exp-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .exp-item {
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 28px;
          background: var(--bg-card);
        }
        .exp-head {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }
        .exp-icon {
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
        .exp-titles {
          flex: 1;
          min-width: 200px;
        }
        .exp-titles h3 {
          font-size: 1.2rem;
        }
        .exp-org {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--ink-faint);
          margin-top: 2px;
        }
        .exp-period {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--copper);
          border: 1px solid var(--line);
          border-radius: 100px;
          padding: 5px 14px;
          white-space: nowrap;
          align-self: flex-start;
        }
        .exp-points {
          list-style: none;
          padding-left: 58px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .exp-points li {
          color: var(--ink-soft);
          position: relative;
        }
        .exp-points li::before {
          content: '—';
          position: absolute;
          left: -22px;
          color: var(--copper);
        }

        @media (max-width: 600px) {
          .exp-points {
            padding-left: 0;
          }
          .exp-points li::before {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
