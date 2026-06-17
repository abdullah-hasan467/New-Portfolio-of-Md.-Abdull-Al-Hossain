import { profile } from '../data/content'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <span>© {year} {profile.name}. All rights reserved.</span>
        <span className="footer-built">Built By Hasan Abdullah</span>
      </div>

      <style>{`
        .site-footer {
          padding: 32px 0;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--ink-faint);
        }
        .footer-row {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-built {
          color: var(--ink-faint);
        }
      `}</style>
    </footer>
  )
}
