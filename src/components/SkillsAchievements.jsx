import { Trophy, Wrench, Leaf, Code2 } from 'lucide-react'
import { trainingAndAwards } from '../data/content'
import Reveal from './Reveal'

export default function SkillsAchievements() {
  const { training, awards, certifications, toolsProficiency, languages } = trainingAndAwards

  return (
    <section id="achievements">
      <div className="container">
        <Reveal className="section-head">
          <p className="tag">08 · Achievements</p>
          <h2>Training &amp; Recognition</h2>
          <p>Certifications, academic honors, and the toolkit behind the projects.</p>
        </Reveal>

        <div className="ach-grid">
          <Reveal className="ach-card">
            <h3><Wrench size={18} /> Training</h3>
            <ul className="tag-list">
              {training.map((t) => <li key={t} className="pill">{t}</li>)}
            </ul>
          </Reveal>

          <Reveal delay={80} className="ach-card">
            <h3><Trophy size={18} /> Academic Excellence</h3>
            <ul className="text-list">
              {awards.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </Reveal>

          <Reveal delay={160} className="ach-card">
            <h3><Leaf size={18} /> Certifications</h3>
            {certifications.map((c) => (
              <div key={c.title} className="cert-block">
                <h4>{c.title}</h4>
                <p>{c.description}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={240} className="ach-card">
            <h3><Code2 size={18} /> Tools &amp; Languages</h3>
            <ul className="tag-list">
              {toolsProficiency.map((t) => <li key={t} className="pill">{t}</li>)}
              {languages.map((l) => <li key={l} className="pill pill-accent">{l}</li>)}
            </ul>
          </Reveal>
        </div>
      </div>

      <style>{`
        .ach-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .ach-card {
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 28px;
          background: var(--bg-card);
        }
        .ach-card h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.1rem;
          margin-bottom: 18px;
          color: var(--copper);
        }
        .tag-list {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .pill-accent {
          border-color: var(--copper);
          color: var(--copper-bright);
        }
        .text-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          color: var(--ink-soft);
        }
        .text-list li {
          padding-left: 18px;
          position: relative;
        }
        .text-list li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--copper);
        }
        .cert-block {
          margin-bottom: 16px;
        }
        .cert-block:last-child {
          margin-bottom: 0;
        }
        .cert-block h4 {
          font-size: 1rem;
          margin-bottom: 6px;
          color: var(--ink);
          font-family: var(--font-display);
          font-weight: 600;
        }
        .cert-block p {
          color: var(--ink-soft);
          font-size: 0.92rem;
        }

        @media (max-width: 760px) {
          .ach-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
