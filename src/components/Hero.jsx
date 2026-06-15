import { ArrowDown, Mail } from 'lucide-react'
import { profile } from '../data/content'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="tag">EEE / Power Electronics Engineer</p>
          <h1>
            Md Abdullah<br />
            <span className="accent">Al Hossain</span>
          </h1>
          <p className="hero-lede">
            Designing efficient power-conversion systems and solar-powered
            devices — from converter topologies on the bench to off-grid
            hardware in the field.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-solid">
              View Projects
            </a>
            <a href="#contact" className="btn">
              <Mail size={15} /> Get in Touch
            </a>
          </div>

          <div className="hero-meta">
            <div>
              <span className="meta-label">Location</span>
              <span className="meta-value">{profile.location}</span>
            </div>
            <div>
              <span className="meta-label">Focus</span>
              <span className="meta-value">Power Electronics &amp; Renewables</span>
            </div>
            <div>
              <span className="meta-label">Status</span>
              <span className="meta-value">
                <span className="dot" /> Open to research &amp; industry roles
              </span>
            </div>
          </div>
        </div>

        <div className="hero-figure">
          <div className="scope">
            <svg viewBox="0 0 320 320" className="scope-grid" aria-hidden="true">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(232,147,90,0.12)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="320" height="320" fill="url(#grid)" />
              <path
                className="trace"
                d="M0,200 C30,200 40,80 70,80 C100,80 110,220 140,220 C170,220 180,60 210,60 C240,60 250,240 280,240 C300,240 310,160 320,160"
                fill="none"
              />
            </svg>
            <div className="photo-frame">
              <img src={profile.heroPhoto} alt="Portrait of Md. Abdullah Al Hossain" />
            </div>
            <span className="pin pin-1">+24V</span>
            <span className="pin pin-2">GND</span>
            <span className="pin pin-3">PV·IN</span>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About section">
        <ArrowDown size={18} />
      </a>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 96px;
          border-bottom: 1px solid var(--line);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: center;
          gap: 64px;
        }
        .hero-copy h1 {
          font-size: clamp(2.6rem, 6.4vw, 4.6rem);
          margin: 18px 0 22px;
        }
        .accent {
          color: var(--copper);
        }
        .hero-lede {
          max-width: 480px;
          font-size: 1.1rem;
          color: var(--ink-soft);
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          margin-top: 36px;
          flex-wrap: wrap;
        }
        .hero-meta {
          display: flex;
          gap: 40px;
          margin-top: 64px;
          flex-wrap: wrap;
        }
        .hero-meta > div {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .meta-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-faint);
        }
        .meta-value {
          font-size: 0.95rem;
          color: var(--ink);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--circuit-green);
          box-shadow: 0 0 0 3px rgba(111,207,151,0.18);
          display: inline-block;
        }

        .hero-figure {
          display: flex;
          justify-content: center;
        }
        .scope {
          position: relative;
          width: min(100%, 320px);
          aspect-ratio: 1;
        }
        .scope-grid {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--bg-elevated);
        }
        .trace {
          stroke: var(--circuit-green);
          stroke-width: 2;
          stroke-linecap: round;
          opacity: 0.85;
          stroke-dasharray: 6 5000;
          animation: draw 3.5s ease-in-out infinite alternate;
        }
        @keyframes draw {
          from { stroke-dashoffset: 1200; }
          to { stroke-dashoffset: 0; }
        }
        .photo-frame {
          position: absolute;
          inset: 14%;
          border-radius: 6px;
          overflow: hidden;
          border: 2px solid var(--copper);
          box-shadow: 0 18px 50px -20px rgba(0,0,0,0.6);
        }
        .photo-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.95) contrast(1.02);
        }
        .pin {
          position: absolute;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          color: var(--ink-faint);
          background: var(--bg-elevated);
          border: 1px solid var(--line);
          padding: 3px 8px;
          border-radius: 3px;
        }
        .pin-1 { top: -10px; left: 8%; }
        .pin-2 { bottom: -10px; right: 12%; }
        .pin-3 { top: 40%; right: -34px; }

        .scroll-cue {
          align-self: center;
          margin-top: 56px;
          color: var(--ink-faint);
          border: 1px solid var(--line);
          border-radius: 50%;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: bob 2.4s ease-in-out infinite;
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .trace, .scroll-cue { animation: none; }
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 56px;
            text-align: left;
          }
          .hero-figure {
            order: -1;
          }
          .scope {
            max-width: 260px;
            margin: 0 auto;
          }
          .pin-3 { display: none; }
        }
      `}</style>
    </section>
  )
}
