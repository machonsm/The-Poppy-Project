import { ArrowRight, Map } from "lucide-react";
import { PoppyHeroSystem } from "@/components/brand/PoppyHeroSystem";

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="section-kicker hero__kicker">
            Polska platforma innowacji w zdrowiu kobiet
          </p>
          <h1 className="display-title hero__title" id="hero-title">
            <span>
              Łączymy <br className="hero__phone-break" />
              polskie
            </span>
            <span>innowacje</span>
            <span>z globalnymi</span>
            <span>trendami</span>
            <span>
              w zdrowiu <br className="hero__phone-break" />
              kobiet.
            </span>
          </h1>
          <p className="hero__copy">
            Mapujemy rynek, tłumaczymy badania i tworzymy połączenia między
            przedsiębiorcami, medykami, naukowcami, inwestorami i partnerami
            instytucjonalnymi.
          </p>
          <div className="hero__actions" aria-label="Najważniejsze akcje">
            <a className="button button-primary" href="#czym-sie-zajmujemy">
              Poznaj ekosystem
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="#mapa">
              <Map size={16} aria-hidden="true" />
              Zobacz mapę FemTechu
            </a>
          </div>
        </div>

        <PoppyHeroSystem />
      </div>
    </section>
  );
}
