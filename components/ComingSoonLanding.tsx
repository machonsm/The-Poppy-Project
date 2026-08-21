import Image from "next/image";
import { Phone } from "lucide-react";
import { GravityDotGrid } from "@/components/brand/GravityDotGrid";
import { links } from "@/data/links";

export function ComingSoonLanding() {
  return (
    <div className="poppy-landing">
      <header className="landing-header">
        <div className="landing-header-container">
          <a className="landing-header-logo" href="#" aria-label="The Poppy Project">
            <Image src="/poppy-logo.svg" alt="" width={1080} height={1350} priority />
            <span>The Poppy Project</span>
          </a>

          <nav className="landing-header-nav" aria-label="Główna nawigacja">
            <a className="landing-header-link" href={links.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="landing-header-link" href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="landing-header-link" href={links.substack} target="_blank" rel="noreferrer">
              Newsletter
            </a>
            <a className="landing-header-link" href={links.mapDownload} target="_blank" rel="noreferrer">
              Mapa
            </a>
          </nav>

          <a className="landing-header-contact" href={links.contact} aria-label="Kontakt">
            <Phone aria-hidden="true" size={28} strokeWidth={1.7} />
          </a>
        </div>
      </header>

      <main>
        <section className="landing-hero" aria-labelledby="landing-hero-title">
          <div className="landing-hero-container">
            <h1 className="landing-hero-title" id="landing-hero-title">
              <span className="landing-hero-title__the">THE</span>
              <span className="landing-hero-title__poppy">POPPY</span>
              <span className="landing-hero-title__project">PROJECT</span>
            </h1>
            <p className="landing-hero-badge">
              women&apos;s health innovation
            </p>
            <a className="landing-hero-btn" href={links.contact} aria-label="Dołącz do The Poppy Project">
              <svg width="166" height="166" viewBox="0 0 166 166" aria-hidden="true">
                <defs>
                  <path
                    id="landing-btn-path"
                    d="M83 83 m -60 0 a 60 60 0 1 1 120 0 a 60 60 0 1 1 -120 0"
                  />
                </defs>
                <text className="landing-hero-btn__text">
                  <textPath href="#landing-btn-path" startOffset="0">
                    JOIN THE ECOSYSTEM - JOIN THE ECOSYSTEM -
                  </textPath>
                </text>
                <path
                  className="landing-hero-btn__circle"
                  d="M83 83 m -45 0 a 45 45 0 1 1 90 0 a 45 45 0 1 1 -90 0"
                />
                <path className="landing-hero-btn__arrow" d="M72 91l23-23m0 0h-19m19 0v19" />
              </svg>
            </a>
          </div>

          <div className="landing-hero-shape" aria-hidden="true">
            <div className="landing-hero-logo-cluster">
              <GravityDotGrid className="landing-hero-dot-grid" />
              <div className="landing-hero-logo-panel">
                <Image
                  className="landing-hero-img"
                  src="/poppy-logo.svg"
                  alt=""
                  width={1080}
                  height={1350}
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
