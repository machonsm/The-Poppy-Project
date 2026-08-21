import { ArrowRight, Download, FileText } from "lucide-react";
import Image from "next/image";
import { ArcSystem } from "@/components/brand/ArcSystem";
import { links } from "@/data/links";
import { Reveal } from "@/components/motion/Reveal";

export function MapSection() {
  return (
    <section className="section map-section" id="mapa" aria-labelledby="map-title">
      <div className="container map-section__inner">
        <Reveal className="map-section__copy">
          <p className="section-kicker">Mapa Polskiego FemTechu 2025</p>
          <h2 className="section-title" id="map-title">
            Flagowy obraz polskiego ekosystemu.
          </h2>
          <p className="section-lede">
            Autorska mapa pokazuje pierwsze zestawienie polskiego ekosystemu
            FemTechu, stworzone w oparciu o dostępne informacje i bieżącą wiedzę
            o branży.
          </p>
          <div className="map-section__actions">
            <a className="button button-primary" href={links.mapDownload} target="_blank" rel="noreferrer">
              <Download size={16} aria-hidden="true" />
              Pobierz mapę
            </a>
            <a className="text-link" href={links.oldEventsPage} target="_blank" rel="noreferrer">
              Zobacz kalendarz rynku
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <Reveal className="map-product" delay={0.12}>
          <div className="map-product__frame">
            <Image
              src={links.mapPreview}
              alt="Podgląd Mapy Polskiego FemTechu 2025"
              width={900}
              height={1250}
              sizes="(max-width: 820px) 84vw, 480px"
              loading="lazy"
            />
          </div>
          <div className="map-product__meta">
            <span>
              <FileText size={15} aria-hidden="true" />
              PDF
            </span>
            <span>Źródło: FemTech po Polsku</span>
          </div>
          <ArcSystem className="map-product__arcs" />
        </Reveal>
      </div>
    </section>
  );
}
