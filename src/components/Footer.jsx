import { profile } from '../data/content'
import LastUpdate from './LastUpdate'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <span>
        Copyright  © {year} {profile.name}. All rights reserved.
        </span>

        <div className="footer-right">
          <span className="footer-built">Designed & developed by Hasan</span>
          <LastUpdate />
        </div>
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
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }
        .footer-built {
          color: var(--ink-faint);
        }

        @media (max-width: 600px) {
          .footer-row {
            flex-direction: column;
          }
          .footer-right {
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  )
}