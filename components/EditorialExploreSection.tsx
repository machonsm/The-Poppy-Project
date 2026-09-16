import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { links } from "@/data/links";
import type { PoppyLanguage } from "@/components/PoppyChrome";

const cards = [
  { label: "Materiały", title: "Szerszy obraz.", body: "Mapy, raporty i narzędzia. Więcej kontekstu dla lepszych decyzji.", action: "Otwórz bibliotekę", href: "/materialy/" },
  { label: "Poppy Notes", title: "Nowe punkty widzenia.", body: "Obserwacje, analizy i historie z ekosystemu zdrowia kobiet.", action: "Czytaj na Substacku", href: links.substack },
  { label: "Poppy Talks", title: "Rozmowy, które zostają.", body: "Perspektywy osób, które tworzą przyszłość zdrowia kobiet.", action: "Odkryj podcast", href: "/podcast/" }
];

const englishCards = [
  { label: "Resources", title: "The bigger picture.", body: "Maps, reports and tools. More context for better decisions.", action: "Explore the library", href: "/materialy/" },
  { label: "Poppy Notes", title: "New points of view.", body: "Observations, analysis and stories from the women’s health ecosystem.", action: "Read on Substack", href: links.substack },
  { label: "Poppy Talks", title: "Conversations that stay.", body: "Perspectives from people shaping the future of women’s health.", action: "Discover the podcast", href: "/podcast/" }
];

export function EditorialExploreSection({ language = "pl" }: { language?: PoppyLanguage }) {
  return (
    <section className="pp-explore pp-section" aria-labelledby="explore-heading">
      <div className="pp-container">
        <div className="pp-section-heading">
          <p className="pp-eyebrow">{language === "pl" ? "Zostań z ciekawością" : "Stay curious"}</p>
          <h2 id="explore-heading">{language === "pl" ? <>Wiedza, która<br /><em>porusza.</em></> : <>Knowledge that<br /><em>moves us.</em></>}</h2>
        </div>
        <div className="pp-explore__grid">
          {(language === "pl" ? cards : englishCards).map((card, index) => {
            const external = card.href.startsWith("http");
            return <a key={card.href} className={`pp-editorial-card pp-editorial-card--${index}`} href={card.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
              <div className="pp-editorial-card__top"><span>{card.label}</span></div>
              <div className="pp-editorial-card__art" aria-hidden="true">
                {index === 0 ? <div className="pp-art-pages"><i /><i /><i /><span>the bigger<br /><em>picture.</em></span></div> : index === 1 ? <div className="pp-art-notes"><span>P</span><span>↗</span><span>p.</span></div> : <div className="pp-art-sound">{Array.from({ length: 25 }, (_, bar) => <i key={bar} style={{ "--bar-height": `${22 + Math.sin(bar * .7) ** 2 * 65}%`, "--bar-delay": `${bar * -.12}s` } as CSSProperties} />)}</div>}
              </div>
              <div className="pp-editorial-card__copy"><h3>{card.title}</h3><p>{card.body}</p><span className="pp-editorial-card__link">{card.action}<ArrowUpRight size={21} /></span></div>
            </a>;
          })}
        </div>
      </div>
    </section>
  );
}
