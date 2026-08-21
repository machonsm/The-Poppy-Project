import { ArrowRight, Send } from "lucide-react";
import { ArcSystem } from "@/components/brand/ArcSystem";
import { links } from "@/data/links";
import { Reveal } from "@/components/motion/Reveal";

export function SubmitSection() {
  return (
    <section className="section submit-section" id="kontakt" aria-labelledby="submit-title">
      <div className="container submit-section__inner">
        <Reveal className="submit-section__copy">
          <p className="section-kicker">Znasz firmę FemTech w Polsce?</p>
          <h2 className="section-title" id="submit-title">
            Dodaj firmę do ekosystemu.
          </h2>
          <p>
            Jesteś właścicielką albo właścicielem firmy FemTech w Polsce? A może
            znasz projekt, który powinien znaleźć się na radarze? Daj nam znać i
            pomóż budować wiarygodną bazę polskiego FemTechu.
          </p>
          <a className="button button-primary" href={links.contact}>
            <Send size={16} aria-hidden="true" />
            Dodaj firmę
          </a>
        </Reveal>

        <div className="submit-section__signal" aria-hidden="true">
          <ArcSystem tone="dark" />
          <div className="signal-line">
            <span />
            <span />
            <span />
          </div>
          <ArrowRight size={32} />
        </div>
      </div>
    </section>
  );
}
