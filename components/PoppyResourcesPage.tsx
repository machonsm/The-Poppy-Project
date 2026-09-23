"use client";

import Image from "next/image";
import { ArrowUpRight, BookOpen, Minus, Plus, Search, X } from "lucide-react";
import { useState } from "react";
import { PoppyFooter, PoppyHeader, type PoppyLanguage } from "@/components/PoppyChrome";
import { resources, type PoppyResource, type ResourceCategory } from "@/data/resources";
import { links } from "@/data/links";
import { FluidLink } from "@/components/ui/FluidButton";
import { usePoppyLanguage } from "@/lib/use-poppy-language";
import "./resources-page.css";

const copy = {
  pl: {
    libraryTitle: "Biblioteka wiedzy",
    libraryIntro: "Starannie wybrane źródła o zdrowiu kobiet i rynku FemTech w Polsce i globalnie.",
    filterLabel: "Wybierz kategorię raportów",
    all: "Wszystkie",
    poland: "Raporty po polsku",
    global: "Raporty po angielsku",
    searchLabel: "Szukaj w bibliotece",
    searchPlaceholder: "Szukaj tematu, tytułu, organizacji…",
    clearSearch: "Wyczyść wyszukiwanie",
    results: "materiałów w bibliotece",
    shown: "Wyświetlono",
    of: "z",
    external: "Raporty otwierają się w nowej karcie",
    about: "Pełny opis",
    less: "Zwiń opis",
    read: "Czytaj raport",
    newTab: "otwiera się w nowej karcie",
    emptyTitle: "Jeszcze nie mamy takiego wyniku.",
    emptyBody: "Spróbuj innego hasła lub sprawdź wszystkie materiały.",
    reset: "Pokaż wszystkie materiały",
    contactLabel: "Biblioteka, którą tworzymy razem",
    contactTitle: <>Znasz materiał, który<br />warto <em>udostępnić?</em></>,
    contactBody: "Podziel się z nami raportem, badaniem lub narzędziem, które pomaga lepiej zrozumieć zdrowie kobiet.",
    contactAction: "Daj nam znać"
  },
  en: {
    libraryTitle: "Knowledge library",
    libraryIntro: "Carefully selected sources on women’s health and the FemTech market in Poland and globally.",
    filterLabel: "Choose a report category",
    all: "All reports",
    poland: "Reports in Polish",
    global: "Reports in English",
    searchLabel: "Search the library",
    searchPlaceholder: "Search a topic, title, organisation…",
    clearSearch: "Clear search",
    results: "resources in the library",
    shown: "Showing",
    of: "of",
    external: "Reports open in a new tab",
    about: "Full description",
    less: "Show less",
    read: "Read report",
    newTab: "opens in a new tab",
    emptyTitle: "No match just yet.",
    emptyBody: "Try another search or browse the full collection.",
    reset: "Show all resources",
    contactLabel: "A library we build together",
    contactTitle: <>Know something<br />worth <em>sharing?</em></>,
    contactBody: "Share a report, study or tool that helps us understand women’s health better.",
    contactAction: "Let us know"
  }
};

const normalise = (text: string) => text.toLocaleLowerCase("pl").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l");

function ResourceCard({ resource, language }: { resource: PoppyResource; language: PoppyLanguage }) {
  const [expanded, setExpanded] = useState(false);
  const c = copy[language];
  const descriptionId = `${resource.id}-description`;

  return (
    <article className={`pp-resource pp-resource--${resource.category}${expanded ? " is-expanded" : ""}`} data-resource-id={resource.id}>
      <a className="pp-resource__cover" href={resource.href[language]} target="_blank" rel="noopener noreferrer" aria-label={`${c.read}: ${resource.title[language]} — ${c.newTab}`} style={{ backgroundColor: resource.cover.background }}>
        <Image
          src={resource.cover.src}
          alt={`${language === "pl" ? "Grafika raportu" : "Report artwork"}: ${resource.title[language]}`}
          width={resource.cover.width}
          height={resource.cover.height}
          style={{ objectPosition: resource.cover.position ?? "50% 50%", objectFit: resource.cover.fit ?? "cover" }}
          sizes="(max-width: 650px) 85vw, (max-width: 1100px) 42vw, 30vw"
        />
      </a>
      <div className="pp-resource__meta"><span className="pp-resource__dot" aria-hidden="true" /><span>{resource.publisher}</span><BookOpen size={18} strokeWidth={1.4} aria-hidden="true" /></div>
      <h3>{resource.title[language]}</h3>
      <p id={descriptionId} className="pp-resource__description">{resource.description[language]}</p>
      <button type="button" className="pp-resource__expand" aria-expanded={expanded} aria-controls={descriptionId} onClick={() => setExpanded(!expanded)}>
        {expanded ? c.less : c.about}{expanded ? <Minus size={14} aria-hidden="true" /> : <Plus size={14} aria-hidden="true" />}
      </button>
      <div className="pp-resource__bottom">
        <span className="pp-resource__category">{c[resource.category]}</span>
        <FluidLink className="pp-resource__read" size="small" href={resource.href[language]} target="_blank" rel="noopener noreferrer" aria-label={`${c.read}: ${resource.title[language]} — ${c.newTab}`}>
          <span>{c.read}</span><ArrowUpRight size={21} strokeWidth={1.5} aria-hidden="true" />
        </FluidLink>
      </div>
    </article>
  );
}

export function PoppyResourcesPage({ initialLanguage = "pl" }: { initialLanguage?: PoppyLanguage }) {
  const [language, setLanguage] = usePoppyLanguage(initialLanguage);
  const [category, setCategory] = useState<"all" | ResourceCategory>("all");
  const [query, setQuery] = useState("");
  const c = copy[language];
  const terms = normalise(query).trim().split(/\s+/).filter(Boolean);
  const publishedResources = resources.filter(resource => !resource.hidden);
  const matching = publishedResources.filter(resource => {
    const text = normalise(`${resource.title.pl} ${resource.title.en} ${resource.publisher} ${resource.description.pl} ${resource.description.en}`);
    return terms.every(term => text.includes(term));
  });
  const visible = matching.filter(resource => category === "all" || resource.category === category);
  const filters = ["all", "poland", "global"] as const;

  return (
    <div className="pp-site pp-resources-page">
      <PoppyHeader language={language} onLanguageChange={setLanguage} />
      <main id="main-content">
        <section className="pp-library" id="biblioteka" aria-labelledby="library-title">
          <div className="pp-container">
            <div className="pp-library__heading"><h1 id="library-title">{c.libraryTitle}</h1><p>{c.libraryIntro}</p></div>
            <div className="pp-library__toolbar">
              <div className="pp-library__filters" role="group" aria-label={c.filterLabel}>
                {filters.map(filter => <button type="button" key={filter} aria-pressed={category === filter} onClick={() => setCategory(filter)}>{c[filter]}<span>{filter === "all" ? matching.length : matching.filter(resource => resource.category === filter).length}</span></button>)}
              </div>
              <div className="pp-library__search" role="search">
                <Search size={19} strokeWidth={1.6} aria-hidden="true" />
                <label className="pp-library__sr-only" htmlFor="resource-search">{c.searchLabel}</label>
                <input id="resource-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={c.searchPlaceholder} autoComplete="off" />
                {query && <button type="button" onClick={() => setQuery("")} aria-label={c.clearSearch}><X size={18} aria-hidden="true" /></button>}
              </div>
            </div>
            <div className="pp-library__result-line">
              <p role="status" aria-live="polite" aria-atomic="true">{category === "all" && !query ? <><strong>{publishedResources.length}</strong> {c.results}</> : <>{c.shown} <strong>{visible.length}</strong> {c.of} {publishedResources.length}</>}</p>
              <span>{c.external}<ArrowUpRight size={14} aria-hidden="true" /></span>
            </div>
            {visible.length ? <div className="pp-library__grid">
              {visible.map(resource => <ResourceCard resource={resource} language={language} key={`${resource.id}-${language}`} />)}
            </div> : <div className="pp-library__empty">
              <BookOpen size={34} strokeWidth={1} aria-hidden="true" /><h3>{c.emptyTitle}</h3><p>{c.emptyBody}</p>
              <button type="button" className="pp-text-link" onClick={() => { setQuery(""); setCategory("all"); }}>{c.reset}<ArrowUpRight size={18} aria-hidden="true" /></button>
            </div>}
          </div>
        </section>

        <section className="pp-library-invitation" aria-labelledby="resource-invitation-title">
          <div className="pp-container pp-library-invitation__inner">
            <div><p className="pp-eyebrow">{c.contactLabel}</p><h2 id="resource-invitation-title">{c.contactTitle}</h2></div>
            <div><p>{c.contactBody}</p><FluidLink href={`mailto:${links.email}?subject=${encodeURIComponent(language === "pl" ? "Materiał do biblioteki Poppy" : "A resource for the Poppy library")}`}>{c.contactAction}<ArrowUpRight size={18} aria-hidden="true" /></FluidLink></div>
          </div>
        </section>
      </main>
      <PoppyFooter language={language} />
    </div>
  );
}
