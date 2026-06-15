import { about, profile } from '../data/content'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about">
      <div className="container about-grid">
        <Reveal className="about-photo">
          <div className="frame">
            <img src={profile.heroPhoto} alt="" />
          </div>
        </Reveal>

        <div className="about-copy">
          <Reveal>
            <p className="tag">01 · About</p>
            <h2>{about.heading}</h2>
          </Reveal>

          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={(i + 1) * 80}>
              <p className="about-p">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={320}>
            <p className="about-p about-closing">{about.closing}</p>
          </Reveal>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 0.7fr 1.3fr;
          gap: 64px;
          align-items: start;
        }
        .about-photo .frame {
          border: 1px solid var(--line);
          border-radius: var(--radius);
          overflow: hidden;
          position: relative;
          aspect-ratio: 4 / 5;
        }
        .about-photo .frame::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid var(--copper);
          margin: 10px;
          pointer-events: none;
          opacity: 0.5;
        }
        .about-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .about-copy h2 {
          margin-bottom: 28px;
        }
        .about-p {
          color: var(--ink-soft);
          margin-bottom: 18px;
          max-width: 620px;
        }
        .about-closing {
          color: var(--ink-faint);
          font-style: italic;
        }

        @media (max-width: 860px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .about-photo .frame {
            max-width: 320px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  )
}
