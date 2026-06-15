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
      <div className="container contact-grid">
        <Reveal>
          <p className="tag">09 · Contact</p>
          <h2 className="contact-title">Let's build something efficient.</h2>
          <p className="contact-lede">
            Open to research collaborations, graduate opportunities, and roles
            in power electronics or renewable energy. Reach out — I usually
            reply within a day.
          </p>

          <div className="contact-direct">
            <a href={`mailto:${profile.email}`} className="contact-line">
              <Mail size={18} /> {profile.email}
            </a>
            <a href={`tel:${profile.phone}`} className="contact-line">
              <Phone size={18} /> {profile.phone}
            </a>
            <span className="contact-line">
              <MapPin size={18} /> {profile.location}
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

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 64px;
        }
        .contact-title {
          font-size: clamp(2rem, 4.5vw, 3rem);
          margin: 16px 0 18px;
        }
        .contact-lede {
          color: var(--ink-soft);
          max-width: 480px;
          margin-bottom: 36px;
        }
        .contact-direct {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .contact-line {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 0.95rem;
          color: var(--ink);
        }
        .contact-line svg {
          color: var(--copper);
        }

        .contact-links {
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 28px;
          background: var(--bg-card);
          align-self: start;
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
            gap: 40px;
          }
        }
      `}</style>
    </section>
  )
}
