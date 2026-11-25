import { useEffect, useRef, useState } from "react";
import "./header.css";

const destinations = [
  { label: "Über mich", href: "#ueber-mich" },
  { label: "Referenzen", href: "#projekte" },
  { label: "Leistungen", href: "#leistungen" },
  { label: "Arbeitsweise", href: "#ablauf" },
];

export function ArrowUpRight() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 2c.3 2.8 1.9 4.5 4.7 4.7v3.5a8.7 8.7 0 0 1-4.7-1.5v6.8A6.5 6.5 0 1 1 10.1 9l1 .1v3.6a3.3 3.3 0 0 0-1-.2 3 3 0 1 0 3 3V2z" />
    </svg>
  );
}

const socialProfiles = [
  { label: "Instagram", href: "https://www.instagram.com/silorn_technologies/", icon: <InstagramIcon /> },
  { label: "TikTok", href: "https://www.tiktok.com/@silorn_technologies", icon: <TikTokIcon /> },
];

function RollingText({ label }: { label: string }) {
  return (
    <span className="silorn-roll">
      <span className="silorn-roll-track">
        <span>{label}</span>
        <span aria-hidden="true">{label}</span>
      </span>
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const syncScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", syncScroll, { passive: true });
    return () => window.removeEventListener("scroll", syncScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggle.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [menuOpen]);

  return (
    <header ref={header} className="silorn-header fixed inset-x-0 top-0 z-50" data-scrolled={scrolled || undefined}>
      <div className="silorn-header-inner relative mx-auto flex items-center justify-between gap-4">
        <a className="silorn-brand inline-flex shrink-0 items-center gap-2.5" href="#start" aria-label="Silorn Technologies, Startseite" onClick={() => setMenuOpen(false)}>
          <svg aria-hidden="true" viewBox="0 0 104 126" width="31" height="38" className="silorn-brand-mark shrink-0">
            <path fill="var(--royal)" d="M8 46 95 57c7 1 9 9 1 12L68 82 10 68C2 66 2 60 8 55z" />
            <path fill="var(--midnight)" d="m8 31 60-29c5-2 10-2 14 1l22 12-91 45c-4 2-6 4-4 8-8-4-8-10-8-19 0-8 2-14 7-18Z" />
            <path fill="var(--midnight)" d="m0 112 94-47c6-3 7-6 3-9 7 4 7 14 6 24-1 8-4 12-10 16l-55 27c-4 2-10 2-14 0Z" />
          </svg>
          <span aria-hidden="true" className="silorn-brand-label">
            <span className="silorn-wordmark">Silorn<span className="silorn-brand-dot" /></span>
            <span className="silorn-brand-caption">Technologies</span>
          </span>
        </a>

        <nav className="silorn-header-nav hidden items-center lg:flex" aria-label="Hauptnavigation">
          {destinations.map(({ label, href }) => (
            <a key={href} className="silorn-nav-item" href={href}><RollingText label={label} /></a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="silorn-header-socials">
            {socialProfiles.map(({ label, href, icon }) => (
              <a key={label} className="silorn-social-link" aria-label={label} href={href} target="_blank" rel="noopener noreferrer">
                {icon}<span className="silorn-social-label">{label}</span>
              </a>
            ))}
          </div>
          <button
            ref={menuToggle}
            type="button"
            className="silorn-menu-toggle grid place-items-center rounded-full lg:hidden"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
            aria-controls="silorn-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              <path d={menuOpen ? "m6 6 12 12M18 6 6 18" : "M4 8h16M4 16h16"} />
            </svg>
          </button>
        </div>

        <nav id="silorn-mobile-menu" className="silorn-mobile-menu lg:hidden" aria-label="Mobile Navigation" hidden={!menuOpen}>
          {destinations.map(({ label, href }) => (
            <a key={href} className="silorn-mobile-item" href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
