import { Mail, Phone, MapPin, Linkedin, Facebook, ExternalLink } from 'lucide-react'
import { profile } from '../data/content'
import Reveal from './Reveal'

const links = [
  { label: 'LinkedIn', href: profile.social.linkedin, icon: Linkedin },
  { label: 'Google Scholar', href: profile.social.scholar, icon: ExternalLink },
  { label: 'ResearchGate', href: profile.social.researchgate, icon: ExternalLink },
  { label: 'ORCID', href: profile.social.orcid, icon: ExternalLink },
  { label: 'Facebook', href: profile.social.facebook, icon: Facebook },
]

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <Reveal className="section-head">
          <p className="tag">09 · Contact</p>
          <h2>Let's build something efficient.</h2>
          <p>
            Open to research collaborations, graduate opportunities, and roles
            in power electronics or renewable energy. Reach out — I usually
            reply within a day.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-direct-card">
            <p className="contact-links-label">Direct</p>
            <div className="contact-direct">
              <a href={`mailto:${profile.email}`} className="contact-line">
                <span className="contact-icon"><Mail size={18} strokeWidth={1.75} /></span>
                <span className="contact-text">{profile.email}</span>
              </a>
              <a href={`tel:${profile.phone}`} className="contact-line">
                <span className="contact-icon"><Phone size={18} strokeWidth={1.75} /></span>
                <span className="contact-text">{profile.phone}</span>
              </a>
              <span className="contact-line">
                <span className="contact-icon"><MapPin size={18} strokeWidth={1.75} /></span>
                <span className="contact-text">{profile.location}</span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={100} className="contact-links">
            <p className="contact-links-label">Find me online</p>
            <div className="links-list">
              {links.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="link-row">
                  <span><Icon size={16} /> {label}</span>
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
            <a href={`mailto:${profile.email}`} className="btn btn-solid contact-cta">
              <Mail size={15} /> Send an Email
            </a>
          </Reveal>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 24px;
          align-items: start;
        }
        .contact-direct-card,
        .contact-links {
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 28px;
          background: var(--bg-card);
        }
        .contact-direct {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .contact-line {
          display: flex;
          align-items: center;
          gap: 14px;
          font-family: var(--font-mono);
          font-size: 0.95rem;
          color: var(--ink);
          min-width: 0;
        }
        .contact-icon {
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
        .contact-text {
          min-width: 0;
          overflow-wrap: anywhere;
        }
        a.contact-line:hover .contact-text {
          color: var(--copper-bright);
        }
        .contact-links-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-faint);
          margin-bottom: 16px;
        }
        .links-list {
          display: flex;
          flex-direction: column;
        }
        .link-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid var(--line);
          color: var(--ink-soft);
          transition: color 0.2s ease;
        }
        .link-row:last-child {
          border-bottom: none;
        }
        .link-row span {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .link-row:hover {
          color: var(--copper-bright);
        }
        .contact-cta {
          width: 100%;
          justify-content: center;
          margin-top: 24px;
        }

        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .contact-direct-card,
          .contact-links {
            padding: 22px;
          }
        }
      `}</style>
    </section>
  )
}