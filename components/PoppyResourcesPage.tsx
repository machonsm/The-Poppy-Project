"use client";

import Image from "next/image";
import { ArrowUpRight, BookOpen, ChevronDown, Minus, Plus, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PoppyFooter, PoppyHeader, type PoppyLanguage } from "@/components/PoppyChrome";
import { resources, type PoppyResource } from "@/data/resources";
import { links } from "@/data/links";
import { getResourceFilterMetadata, type ResourceDocumentLanguage, type ResourceGeography, type ResourceTopic } from "@/data/resource-filters";
import { FluidLink } from "@/components/ui/FluidButton";
import { usePoppyLanguage } from "@/lib/use-poppy-language";
import "./resources-page.css";

const copy = {
  pl: {
    libraryTitle: "Biblioteka wiedzy",
    libraryIntro: "Starannie wybrane źródła o zdrowiu kobiet i rynku FemTech w Polsce i globalnie.",
    filterLabel: "Wybierz kategorię raportów",
    all: "Wszystkie",
    poland: "Polska",
    global: "Świat",
    searchLabel: "Szukaj w bibliotece",
    searchPlaceholder: "Szukaj tematu, tytułu, organizacji…",
    clearSearch: "Wyczyść wyszukiwanie",
    filters: "Filtry",
    hideFilters: "Ukryj filtry",
    yearLabel: "Rok",
    allYears: "Wszystkie lata",
    topicLabel: "Tematyka",
    allTopics: "Wszystkie tematy",
    documentLanguageLabel: "Język raportu",
    allLanguages: "Wszystkie języki",
    polish: "Polski",
    english: "Angielski",
    otherLanguage: "Inny",
    sortLabel: "Sortowanie",
    newest: "Najnowsze",
    oldest: "Najstarsze",
    alphabetic: "Alfabetycznie",
    clearFilters: "Wyczyść filtry",
    removeFilter: "Usuń filtr",
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
    poland: "Poland",
    global: "Worldwide",
    searchLabel: "Search the library",
    searchPlaceholder: "Search a topic, title, organisation…",
    clearSearch: "Clear search",
    filters: "Filters",
    hideFilters: "Hide filters",
    yearLabel: "Year",
    allYears: "All years",
    topicLabel: "Topic",
    allTopics: "All topics",
    documentLanguageLabel: "Report language",
    allLanguages: "All languages",
    polish: "Polish",
    english: "English",
    otherLanguage: "Other",
    sortLabel: "Sort by",
    newest: "Newest",
    oldest: "Oldest",
    alphabetic: "Alphabetical",
    clearFilters: "Clear filters",
    removeFilter: "Remove filter",
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

const topics: ResourceTopic[] = [
  "rynek-femtech",
  "inwestycje",
  "innowacje-badania",
  "dane-ai",
  "system-opieki",
  "profilaktyka-diagnostyka",
  "menstruacja",
  "menopauza",
  "zdrowie-seksualne-reprodukcyjne",
  "zdrowie-w-pracy",
  "prawa-rownosc",
  "edukacja-komunikacja",
  "piersi-onkologia",
  "choroby-przewlekle",
  "zdrowie-psychiczne"
];

const topicLabels: Record<PoppyLanguage, Record<ResourceTopic, string>> = {
  pl: {
    "rynek-femtech": "Rynek i ekosystem FemTech",
    "inwestycje": "Finansowanie i inwestycje",
    "innowacje-badania": "Innowacje i badania",
    "dane-ai": "Dane, AI i prywatność",
    "system-opieki": "System opieki i luka w zdrowiu kobiet",
    "profilaktyka-diagnostyka": "Profilaktyka i diagnostyka",
    "menstruacja": "Menstruacja",
    "menopauza": "Menopauza",
    "zdrowie-seksualne-reprodukcyjne": "Zdrowie seksualne i reprodukcyjne",
    "zdrowie-w-pracy": "Zdrowie kobiet w pracy",
    "prawa-rownosc": "Prawa kobiet i równość",
    "edukacja-komunikacja": "Edukacja i komunikacja zdrowotna",
    "piersi-onkologia": "Zdrowie piersi i onkologia",
    "choroby-przewlekle": "Choroby przewlekłe",
    "zdrowie-psychiczne": "Zdrowie psychiczne"
  },
  en: {
    "rynek-femtech": "Market and FemTech ecosystem",
    "inwestycje": "Funding and investment",
    "innowacje-badania": "Innovation and research",
    "dane-ai": "Data, AI and privacy",
    "system-opieki": "Healthcare systems and the women’s health gap",
    "profilaktyka-diagnostyka": "Prevention and diagnostics",
    "menstruacja": "Menstruation",
    "menopauza": "Menopause",
    "zdrowie-seksualne-reprodukcyjne": "Sexual and reproductive health",
    "zdrowie-w-pracy": "Women’s health at work",
    "prawa-rownosc": "Women’s rights and equality",
    "edukacja-komunikacja": "Health education and communication",
    "piersi-onkologia": "Breast health and oncology",
    "choroby-przewlekle": "Chronic conditions",
    "zdrowie-psychiczne": "Mental health"
  }
};

type LanguageFilter = "all" | ResourceDocumentLanguage;
type SortOrder = "newest" | "oldest" | "alphabetic";

const validCategory = (value: string | null): value is "all" | ResourceGeography => value === "all" || value === "poland" || value === "global";
const validTopic = (value: string): value is ResourceTopic => topics.includes(value as ResourceTopic);
const validLanguage = (value: string | null): value is LanguageFilter => value === "all" || value === "pl" || value === "en" || value === "other";
const validSort = (value: string | null): value is SortOrder => value === "newest" || value === "oldest" || value === "alphabetic";
const auditedYears = [2026, 2025, 2024, 2023, 2021, 2020];
const parseYears = (value: string | null) => Array.from(new Set(value?.split(",").map(Number).filter(year => auditedYears.includes(year)) ?? []));
const parseTopics = (value: string | null) => Array.from(new Set(value?.split(",").filter(validTopic) ?? []));

function ResourceCard({ resource, language, geography }: { resource: PoppyResource; language: PoppyLanguage; geography: ResourceGeography }) {
  const [expanded, setExpanded] = useState(false);
  const c = copy[language];
  const descriptionId = `${resource.id}-description`;

  return (
    <article className={`pp-resource pp-resource--${geography}${expanded ? " is-expanded" : ""}`} data-resource-id={resource.id}>
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
        <span className="pp-resource__category">{c[geography]}</span>
        <FluidLink className="pp-resource__read" size="small" href={resource.href[language]} target="_blank" rel="noopener noreferrer" aria-label={`${c.read}: ${resource.title[language]} — ${c.newTab}`}>
          <span>{c.read}</span><ArrowUpRight size={21} strokeWidth={1.5} aria-hidden="true" />
        </FluidLink>
      </div>
    </article>
  );
}

export function PoppyResourcesPage({ initialLanguage = "pl" }: { initialLanguage?: PoppyLanguage }) {
  const [language, setLanguage] = usePoppyLanguage(initialLanguage);
  const [category, setCategory] = useState<"all" | ResourceGeography>("all");
  const [query, setQuery] = useState("");
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<ResourceTopic[]>([]);
  const [documentLanguage, setDocumentLanguage] = useState<LanguageFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filtersReady, setFiltersReady] = useState(false);
  const c = copy[language];
  const publishedResources = resources.filter(resource => !resource.hidden);
  const enrichedResources = publishedResources.map(resource => ({ resource, metadata: getResourceFilterMetadata(resource.id) }));
  const availableYears = Array.from(new Set(enrichedResources.flatMap(({ metadata }) => metadata.years))).sort((a, b) => b - a);
  const terms = normalise(query).trim().split(/\s+/).filter(Boolean);
  const searchMatches = enrichedResources.filter(({ resource, metadata }) => {
    const topicSearchText = metadata.topics.flatMap(value => [topicLabels.pl[value], topicLabels.en[value]]).join(" ");
    const text = normalise(`${resource.title.pl} ${resource.title.en} ${resource.publisher} ${resource.description.pl} ${resource.description.en} ${topicSearchText} ${metadata.years.join(" ")}`);
    return terms.every(term => text.includes(term));
  });
  const matching = searchMatches.filter(({ metadata }) =>
    (selectedYears.length === 0 || metadata.years.some(year => selectedYears.includes(year)))
    && (selectedTopics.length === 0 || metadata.topics.some(topic => selectedTopics.includes(topic)))
    && (documentLanguage === "all" || metadata.documentLanguage === documentLanguage)
  );
  const visible = matching
    .filter(({ metadata }) => category === "all" || metadata.geography === category)
    .sort((a, b) => {
      if (sortOrder === "alphabetic") return a.resource.title[language].localeCompare(b.resource.title[language], language);
      const difference = Math.max(...b.metadata.years, 0) - Math.max(...a.metadata.years, 0);
      return sortOrder === "newest" ? difference : -difference;
    });
  const filters = ["all", "poland", "global"] as const;
  const hasActiveFilters = Boolean(query) || category !== "all" || selectedYears.length > 0 || selectedTopics.length > 0 || documentLanguage !== "all";
  const languageLabel = (value: ResourceDocumentLanguage) => value === "pl" ? c.polish : value === "en" ? c.english : c.otherLanguage;
  const toggleYear = (value: number) => setSelectedYears(current => current.includes(value) ? current.filter(year => year !== value) : [...current, value].sort((a, b) => b - a));
  const toggleTopic = (value: ResourceTopic) => setSelectedTopics(current => current.includes(value) ? current.filter(topic => topic !== value) : [...current, value]);
  const resetFilters = () => {
    setQuery("");
    setCategory("all");
    setSelectedYears([]);
    setSelectedTopics([]);
    setDocumentLanguage("all");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const regionParam = params.get("region");
    const yearsParam = params.get("years") ?? params.get("year");
    const topicsParam = params.get("topics") ?? params.get("topic");
    const languageParam = params.get("language");
    const sortParam = params.get("sort");
    const timeoutId = window.setTimeout(() => {
      if (validCategory(regionParam)) setCategory(regionParam);
      setSelectedYears(parseYears(yearsParam));
      setSelectedTopics(parseTopics(topicsParam));
      if (validLanguage(languageParam)) setDocumentLanguage(languageParam);
      if (validSort(sortParam)) setSortOrder(sortParam);
      setQuery(params.get("q") ?? "");
      setFiltersReady(true);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!filtersReady) return;
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category !== "all") params.set("region", category);
    if (selectedYears.length) params.set("years", selectedYears.join(","));
    if (selectedTopics.length) params.set("topics", selectedTopics.join(","));
    if (documentLanguage !== "all") params.set("language", documentLanguage);
    if (sortOrder !== "newest") params.set("sort", sortOrder);
    const queryString = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${queryString ? `?${queryString}` : ""}${window.location.hash}`);
  }, [category, documentLanguage, filtersReady, query, selectedTopics, selectedYears, sortOrder]);

  return (
    <div className="pp-site pp-resources-page">
      <PoppyHeader language={language} onLanguageChange={setLanguage} />
      <main id="main-content">
        <section className="pp-library" id="biblioteka" aria-labelledby="library-title">
          <div className="pp-container">
            <div className="pp-library__heading"><h1 id="library-title">{c.libraryTitle}</h1><p>{c.libraryIntro}</p></div>
            <div className="pp-library__toolbar">
              <div className="pp-library__search" role="search">
                <Search size={19} strokeWidth={1.6} aria-hidden="true" />
                <label className="pp-library__sr-only" htmlFor="resource-search">{c.searchLabel}</label>
                <input id="resource-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={c.searchPlaceholder} autoComplete="off" />
                {query && <button type="button" onClick={() => setQuery("")} aria-label={c.clearSearch}><X size={18} aria-hidden="true" /></button>}
              </div>
              <div className="pp-library__filters" role="group" aria-label={c.filterLabel}>
                {filters.map(filter => <button type="button" key={filter} aria-pressed={category === filter} onClick={() => setCategory(filter)}>{c[filter]}<span>{filter === "all" ? matching.length : matching.filter(({ metadata }) => metadata.geography === filter).length}</span></button>)}
              </div>
              <button type="button" className="pp-library__filter-toggle" aria-expanded={filtersOpen} aria-controls="resource-advanced-filters" onClick={() => setFiltersOpen(!filtersOpen)}>
                <SlidersHorizontal size={17} aria-hidden="true" />{filtersOpen ? c.hideFilters : c.filters}
              </button>
              <div className={`pp-library__advanced${filtersOpen ? " is-open" : ""}`} id="resource-advanced-filters">
                <div className="pp-library__field">
                  <span>{c.yearLabel}</span>
                  <details className="pp-library__filter-menu">
                    <summary>{selectedYears.length ? selectedYears.join(", ") : c.allYears}<ChevronDown size={16} aria-hidden="true" /></summary>
                    <div className="pp-library__filter-options" role="group" aria-label={c.yearLabel}>
                      {availableYears.map(value => <label key={value}>
                        <input type="checkbox" checked={selectedYears.includes(value)} onChange={() => toggleYear(value)} />
                        <span>{value}</span>
                      </label>)}
                    </div>
                  </details>
                </div>
                <div className="pp-library__field">
                  <span>{c.topicLabel}</span>
                  <details className="pp-library__filter-menu">
                    <summary>{selectedTopics.length ? `${c.topicLabel} (${selectedTopics.length})` : c.allTopics}<ChevronDown size={16} aria-hidden="true" /></summary>
                    <div className="pp-library__filter-options pp-library__filter-options--topics" role="group" aria-label={c.topicLabel}>
                      {topics.map(value => <label key={value}>
                        <input type="checkbox" checked={selectedTopics.includes(value)} onChange={() => toggleTopic(value)} />
                        <span>{topicLabels[language][value]}</span>
                      </label>)}
                    </div>
                  </details>
                </div>
                <label>
                  <span>{c.documentLanguageLabel}</span>
                  <span className="pp-library__select"><select value={documentLanguage} onChange={event => setDocumentLanguage(event.target.value as LanguageFilter)}>
                    <option value="all">{c.allLanguages}</option>
                    <option value="pl">{c.polish}</option>
                    <option value="en">{c.english}</option>
                    <option value="other">{c.otherLanguage}</option>
                  </select><ChevronDown size={16} aria-hidden="true" /></span>
                </label>
                <label>
                  <span>{c.sortLabel}</span>
                  <span className="pp-library__select"><select value={sortOrder} onChange={event => setSortOrder(event.target.value as SortOrder)}>
                    <option value="newest">{c.newest}</option>
                    <option value="oldest">{c.oldest}</option>
                    <option value="alphabetic">{c.alphabetic}</option>
                  </select><ChevronDown size={16} aria-hidden="true" /></span>
                </label>
              </div>
            </div>
            {hasActiveFilters && <div className="pp-library__active-filters" aria-label={c.filters}>
              {category !== "all" && <button type="button" onClick={() => setCategory("all")} aria-label={`${c.removeFilter}: ${c[category]}`}>{c[category]}<X size={13} aria-hidden="true" /></button>}
              {selectedYears.map(year => <button type="button" key={year} onClick={() => toggleYear(year)} aria-label={`${c.removeFilter}: ${year}`}>{year}<X size={13} aria-hidden="true" /></button>)}
              {selectedTopics.map(topic => <button type="button" key={topic} onClick={() => toggleTopic(topic)} aria-label={`${c.removeFilter}: ${topicLabels[language][topic]}`}>{topicLabels[language][topic]}<X size={13} aria-hidden="true" /></button>)}
              {documentLanguage !== "all" && <button type="button" onClick={() => setDocumentLanguage("all")} aria-label={`${c.removeFilter}: ${languageLabel(documentLanguage)}`}>{languageLabel(documentLanguage)}<X size={13} aria-hidden="true" /></button>}
              <button type="button" className="pp-library__clear-filters" onClick={resetFilters}>{c.clearFilters}</button>
            </div>}
            <div className="pp-library__result-line">
              <p role="status" aria-live="polite" aria-atomic="true">{!hasActiveFilters ? <><strong>{publishedResources.length}</strong> {c.results}</> : <>{c.shown} <strong>{visible.length}</strong> {c.of} {publishedResources.length}</>}</p>
              <span>{c.external}<ArrowUpRight size={14} aria-hidden="true" /></span>
            </div>
            {visible.length ? <div className="pp-library__grid">
              {visible.map(({ resource, metadata }) => <ResourceCard resource={resource} language={language} geography={metadata.geography} key={`${resource.id}-${language}`} />)}
            </div> : <div className="pp-library__empty">
              <BookOpen size={34} strokeWidth={1} aria-hidden="true" /><h3>{c.emptyTitle}</h3><p>{c.emptyBody}</p>
              <button type="button" className="pp-text-link" onClick={resetFilters}>{c.reset}<ArrowUpRight size={18} aria-hidden="true" /></button>
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
