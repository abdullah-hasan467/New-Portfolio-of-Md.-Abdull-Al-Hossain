import { projects } from '../data/content'
import Reveal from './Reveal'

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <Reveal className="section-head">
          <p className="tag">07 · Projects</p>
          <h2>Selected Builds</h2>
          <p>
            Eleven projects spanning power electronics, embedded systems, IoT,
            and RF design — from circuit prototypes to field-ready devices.
          </p>
        </Reveal>

        <div className="project-grid">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 80} className="project-card">
              <div className="project-img">
                <img src={project.image} alt={`${project.title} project preview`} loading="lazy" />
                <span className="project-tag">{project.tag}</span>
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tools">
                  {project.tools.map((tool) => (
                    <span key={tool} className="pill">{tool}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .project-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .project-card {
          border: 1px solid var(--line);
          border-radius: var(--radius);
          overflow: hidden;
          background: var(--bg-card);
          display: flex;
          flex-direction: column;
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .project-card:hover {
          border-color: var(--copper);
          transform: translateY(-4px);
        }
        .project-img {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: var(--bg-elevated);
        }
        .project-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .project-card:hover .project-img img {
          transform: scale(1.06);
        }
        .project-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(14, 19, 32, 0.85);
          border: 1px solid var(--copper);
          color: var(--copper-bright);
          padding: 5px 10px;
          border-radius: 100px;
        }
        .project-body {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .project-body h3 {
          font-size: 1.15rem;
          margin-bottom: 10px;
        }
        .project-body p {
          color: var(--ink-soft);
          font-size: 0.95rem;
          flex: 1;
          margin-bottom: 16px;
        }
        .project-tools {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        @media (max-width: 980px) {
          .project-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .project-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
