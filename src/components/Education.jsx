import { GraduationCap } from 'lucide-react'
import { education } from '../data/content'
import Reveal from './Reveal'

export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <Reveal className="section-head">
          <p className="tag">02 · Education</p>
          <h2>Academic Foundation</h2>
          <p>
            Four stages of schooling that built the analytical groundwork for
            a career in power electronics and renewable energy.
          </p>
        </Reveal>

        <div className="edu-list">
          {education.map((item, i) => (
            <Reveal key={item.title} delay={i * 90} className="edu-item">
              <div className="edu-period">{item.period}</div>
              <div className="edu-body">
                <div className="edu-icon">
                  <GraduationCap size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p className="edu-org">{item.org}</p>
                  <p className="edu-desc">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .edu-list {
          display: flex;
          flex-direction: column;
        }
        .edu-item {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 32px;
          padding: 28px 0;
          border-top: 1px solid var(--line);
        }
        .edu-item:last-child {
          border-bottom: 1px solid var(--line);
        }
        .edu-period {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--copper);
          padding-top: 4px;
        }
        .edu-body {
          display: flex;
          gap: 20px;
        }
        .edu-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--copper);
        }
        .edu-body h3 {
          font-size: 1.25rem;
          margin-bottom: 4px;
        }
        .edu-org {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--ink-faint);
          margin-bottom: 10px;
        }
        .edu-desc {
          color: var(--ink-soft);
          max-width: 640px;
        }

        @media (max-width: 720px) {
          .edu-item {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>
    </section>
  )
}
