"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation supports the static export. */

import Image from "next/image";
import { ArrowUpRight, BookOpen, Minus, Plus, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PoppyFooter, PoppyHeader, type PoppyLanguage } from "@/components/PoppyChrome";
import { resources, type PoppyResource, type ResourceCategory } from "@/data/resources";
import { mapAssets } from "@/data/map-assets";
import { links } from "@/data/links";
import { FluidLink } from "@/components/ui/FluidButton";
import "./resources-page.css";

const copy = {
  pl: {
    page: "Materiały",
    title: <>Wiedza, która otwiera <em>perspektywy.</em></>,
    intro: "Nasza biblioteka raportów, grantów, list inwestorów oraz narzędzi wspierających rozwój FemTechu, zdrowia kobiet i innowacji w Polsce i Europie Środkowo-Wschodniej.",
    explore: "Odkryj bibliotekę",
    mapTitle: "Mapa Polskiego FemTechu 2025",
    mapAction: "Pobierz mapę",
    mapAlt: "Podgląd Mapy Polskiego FemTechu 2025",
    libraryTitle: "Biblioteka raportów",
    libraryIntro: "Polska perspektywa. Globalny kontekst. Wiedza, do której warto wracać.",
    filterLabel: "Wybierz kategorię raportów",
    all: "Wszystkie",
    poland: "Zdrowie kobiet w Polsce",
    global: "Rynek FemTech",
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
    page: "Resources",
    title: <>Knowledge that opens <em>perspectives.</em></>,
    intro: "Explore our growing library of reports, grants, investor lists, and tools driving FemTech, women’s health, and innovation across Poland and Central & Eastern Europe.",
    explore: "Explore the library",
    mapTitle: "Polish FemTech Map 2025",
    mapAction: "Download the map",
    mapAlt: "Preview of the Polish FemTech Map 2025",
    libraryTitle: "The report library",
    libraryIntro: "A Polish perspective. A global context. Knowledge worth coming back to.",
    filterLabel: "Choose a report category",
    all: "All reports",
    poland: "Women’s health in Poland",
    global: "The FemTech market",
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
        <FluidLink size="small" href={resource.href[language]} target="_blank" rel="noopener noreferrer" aria-label={`${c.read}: ${resource.title[language]} — ${c.newTab}`}>
          <span>{c.read}</span><ArrowUpRight size={21} strokeWidth={1.5} aria-hidden="true" />
        </FluidLink>
      </div>
    </article>
  );
}

export function PoppyResourcesPage() {
  const [language, setLanguage] = useState<PoppyLanguage>("pl");
  const [category, setCategory] = useState<"all" | ResourceCategory>("all");
  const [query, setQuery] = useState("");
  const c = copy[language];
  const map = mapAssets[language];
  const terms = normalise(query).trim().split(/\s+/).filter(Boolean);
  const matching = resources.filter(resource => {
    const text = normalise(`${resource.title.pl} ${resource.title.en} ${resource.publisher} ${resource.description.pl} ${resource.description.en}`);
    return terms.every(term => text.includes(term));
  });
  const visible = matching.filter(resource => category === "all" || resource.category === category);
  const filters = ["all", "poland", "global"] as const;

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  return (
    <div className="pp-site pp-resources-page">
      <PoppyHeader language={language} onLanguageChange={setLanguage} />
      <main id="main-content">
        <section className="pp-library-hero" aria-labelledby="resources-title">
          <div className="pp-container">
            <nav className="pp-library-breadcrumb" aria-label={language === "pl" ? "Ścieżka nawigacji" : "Breadcrumb"}>
              <a href="/">Poppy Project</a><span aria-hidden="true">/</span><span aria-current="page">{c.page}</span>
            </nav>
            <div className="pp-library-hero__grid">
              <div className="pp-library-hero__copy">
                <h1 id="resources-title">{c.title}</h1>
                <p className="pp-library-hero__intro">{c.intro}</p>
                <FluidLink href="#biblioteka">{c.explore}</FluidLink>
              </div>
              <a className="pp-library-map" href={map.pdf} download={map.filename}>
                <div className="pp-library-map__art">
                  <span className="pp-library-map__orbit" aria-hidden="true" />
                  <span className="pp-library-map__sheet pp-library-map__sheet--red" aria-hidden="true" />
                  <span className="pp-library-map__sheet pp-library-map__sheet--olive" aria-hidden="true" />
                  <Image className="pp-library-map__poster" src={map.poster} alt={c.mapAlt} width={595} height={842} sizes="(max-width: 650px) 200px, 235px" priority />
                  <span className="pp-library-map__format" aria-hidden="true">PDF<br /><span>PL / EN</span></span>
                </div>
                <div className="pp-library-map__caption">
                  <div><h2>{c.mapTitle}</h2><span className="pp-library-map__download">{c.mapAction}</span></div>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="pp-library" id="biblioteka" aria-labelledby="library-title">
          <div className="pp-container">
            <div className="pp-library__heading"><h2 id="library-title">{c.libraryTitle}</h2><p>{c.libraryIntro}</p></div>
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
              <p role="status" aria-live="polite" aria-atomic="true">{category === "all" && !query ? <><strong>{resources.length}</strong> {c.results}</> : <>{c.shown} <strong>{visible.length}</strong> {c.of} {resources.length}</>}</p>
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
