import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { PoppyFooter, PoppyHeader } from "@/components/PoppyChrome";
import { links } from "@/data/links";
import "./content-pages.css";

type PageCard = {
  title: string;
  text: string;
  href?: string;
  action?: string;
};

type PoppyContentPageProps = {
  kicker: string;
  title: string;
  lede: string;
  cards: PageCard[];
  afterCollection?: ReactNode;
};

const pageDetails: Record<string, { label: string; signature: string }> = {
  Materiały: { label: "W bibliotece", signature: "Wiedza, która otwiera możliwości." },
  Blog: { label: "Na naszym radarze", signature: "Nowe pytania. Szersza perspektywa." },
  Podcast: { label: "Poppy Talks", signature: "Ważne rozmowy potrzebują przestrzeni." },
  "O nas": { label: "To nas łączy", signature: "Razem możemy zmienić więcej." }
};

export function PoppyContentPage({ kicker, title, lede, cards, afterCollection }: PoppyContentPageProps) {
  const details = pageDetails[kicker] ?? { label: kicker, signature: "Przyszłość zdrowia kobiet." };

  return (
    <div className="pp-content-page">
      <PoppyHeader />

      <main id="main-content">
        <section className="pp-content-hero pp-container" aria-labelledby="page-title">
          <div className="pp-content-overline">
            <nav className="pp-content-breadcrumb" aria-label="Ścieżka nawigacji">
              {/* Native document navigation enables static-host page transitions. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/">Poppy Project</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{kicker}</span>
            </nav>
          </div>

          <div className="pp-content-title-row">
            <div>
              <p className="pp-eyebrow pp-content-kicker">{kicker}</p>
              <h1 id="page-title">{title}</h1>
            </div>
            <div className="pp-content-signature" aria-hidden="true">
              <span className="pp-content-signature-mark">P.</span>
              <span>{details.signature}</span>
            </div>
          </div>

          <div className="pp-content-intro">
            <a className="pp-content-scroll" href="#page-collection" aria-label={`Przejdź do sekcji: ${details.label}`}>
              <span><ArrowDown size={20} aria-hidden="true" /></span>
              Odkrywaj dalej
            </a>
            <p>{lede}</p>
          </div>
        </section>

        <section id="page-collection" className="pp-content-collection" aria-labelledby="collection-title">
          <div className="pp-container">
            <div className="pp-content-collection-heading">
              <h2 id="collection-title" className="pp-eyebrow">{details.label}</h2>
            </div>

            <div className="pp-content-grid">
              {cards.map((card) => {
                const upcoming = card.action === "W przygotowaniu";
                const href = upcoming ? undefined : card.href;
                const fileExtension = href?.match(/\.(webp|png|jpe?g|pdf)(?:[?#].*)?$/i)?.[1];
                const isDownload = Boolean(fileExtension);
                const content = (
                  <>
                    <div className="pp-content-card-top">
                      {href ? (
                        <span className="pp-content-card-arrow" aria-hidden="true">
                          {isDownload ? <ArrowDown size={22} /> : <ArrowUpRight size={22} />}
                        </span>
                      ) : (
                        <span className="pp-content-card-line" aria-hidden="true" />
                      )}
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                    {card.action ? (
                      <span className={`pp-content-card-action${upcoming ? " pp-content-card-action--upcoming" : ""}`}>
                        {upcoming ? <span className="pp-content-status-dot" aria-hidden="true" /> : null}
                        {card.action}
                        {fileExtension ? <span className="pp-content-format">{fileExtension.toUpperCase()}</span> : null}
                      </span>
                    ) : null}
                  </>
                );

                return href ? (
                  <a className="pp-content-card pp-content-card--link" href={href} download={isDownload || undefined} key={card.title}>
                    {content}
                  </a>
                ) : (
                  <article className="pp-content-card" key={card.title}>
                    {content}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {afterCollection}

        <section className="pp-content-conversation pp-container" aria-labelledby="conversation-title">
          <div>
            <p className="pp-eyebrow">Dobre rzeczy zaczynają się od połączeń</p>
            <h2 id="conversation-title">Porozmawiajmy<br />o <em>możliwościach.</em></h2>
          </div>
          <a className="pp-button pp-content-contact" href={`mailto:${links.email}`}>
            Napisz do nas <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </section>
      </main>

      <PoppyFooter />
    </div>
  );
}
