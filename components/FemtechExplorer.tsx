"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Globe2, MapPin, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { femtechCompanies, femtechGroups, femtechSectors, type FemtechCityId, type FemtechCompany, type FemtechSectorId } from "@/data/femtech-companies";
import { polandCities, polandMapViewBox, polandOutlinePath, polandMapAttribution } from "@/data/poland-map";
import type { PoppyLanguage } from "@/components/PoppyChrome";
import { FluidLink } from "@/components/ui/FluidButton";
import "./femtech-explorer.css";

const copy = {
  pl: {
    title: "Polski FemTech.", titleAccent: "Odkryj, kto go tworzy.",
    intro: "Poznaj firmy i rozwiązania z naszej bazy. Zacznij od miasta, obszaru zdrowia albo nazwy, która Cię interesuje.",
    companies: "Firmy w bazie", cities: "Miasta w Polsce", search: "Szukaj firmy lub rozwiązania", searchLabel: "Szukaj w bazie firm", sector: "Obszar zdrowia", allSectors: "Wszystkie obszary", location: "Lokalizacja", allPlaces: "Wszystkie miejsca", unmapped: "Globalnie z polskim powiązaniem", clear: "Wyczyść filtry",
    mapLabel: "Mapa polskiego FemTechu", mapHint: "Wybierz miasto. Poznaj firmy.", cityButton: "Pokaż firmy w mieście", results: "Firmy do odkrycia", resultsRegion: "Wyniki wyszukiwania firm", allCompanies: "Cała baza", noResults: "Jeszcze nie tutaj.", noResultsBody: "Nie ma firm pasujących do tych filtrów. Zmień obszar, lokalizację lub wyszukiwaną nazwę.",
    back: "Wróć do listy", explore: "Poznaj firmę", website: "Odwiedź stronę", newTab: "otwiera się w nowej karcie", noWebsite: "Strona internetowa nie została podana w bazie.", noDescription: "Opis firmy nie został jeszcze podany w bazie.", noLocation: "Brak lokalizacji w bazie", type: "Rodzaj rozwiązania", model: "Model działalności", connection: "Powiązanie z ekosystemem", noPin: "Ta firma nie ma punktu na mapie Polski.",
    mapNote: "Punkty wskazują miasta podane w bazie, nie adresy siedzib. Widok „Globalnie z polskim powiązaniem” obejmuje firmy polskich founderów działających za granicą oraz międzynarodowych founderów mieszkających i tworzących w Polsce.", source: "Opisy na podstawie dostarczonej bazy projektu. Szczegóły sprawdzaj bezpośrednio u firm.", missing: "Twojej firmy jeszcze tu nie ma?", add: "Daj nam znać", mapCredit: "Dane mapy",
  },
  en: {
    title: "Polish FemTech.", titleAccent: "Meet the companies behind it.",
    intro: "Discover companies and solutions from our database. Start with a city, a health area, or a name you are curious about.",
    companies: "Companies in the database", cities: "Cities in Poland", search: "Search companies or solutions", searchLabel: "Search the company directory", sector: "Health area", allSectors: "All health areas", location: "Location", allPlaces: "All locations", unmapped: "Global with Polish ties", clear: "Clear filters",
    mapLabel: "Polish FemTech company map", mapHint: "Choose a city. Meet its companies.", cityButton: "Show companies in", results: "Companies to discover", resultsRegion: "Company search results", allCompanies: "The whole directory", noResults: "Not here just yet.", noResultsBody: "No companies match these filters. Try a different health area, location, or search term.",
    back: "Back to the list", explore: "Explore company", website: "Visit website", newTab: "opens in a new tab", noWebsite: "No website was supplied in the database.", noDescription: "A company description has not yet been supplied in the database.", noLocation: "Location not supplied", type: "Type of solution", model: "Business model", connection: "Ecosystem connection", noPin: "This company has no location pin on the Poland map.",
    mapNote: "Pins represent cities listed in the database, not office addresses. “Global with Polish ties” includes companies founded by Polish founders abroad and international founders who live and build in Poland.", source: "Descriptions are based on the supplied project database. Check details directly with each company.", missing: "Is your company missing?", add: "Let us know", mapCredit: "Map data",
  },
};

type PlaceFilter = "all" | "unmapped" | FemtechCityId;
const normalize = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l");
const companyCount = (count: number, language: PoppyLanguage) => {
  if (language === "en") return `${count} ${count === 1 ? "company" : "companies"}`;
  const noun = count === 1 ? "firma" : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14) ? "firmy" : "firm";
  return `${count} ${noun}`;
};

export function FemtechExplorer({ language }: { language: PoppyLanguage }) {
  const c = copy[language];
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<FemtechSectorId | "all">("all");
  const [place, setPlace] = useState<PlaceFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const results = useRef<HTMLDivElement>(null);
  const hold = useRef<HTMLDivElement>(null);
  const explorer = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const companyList = useRef<HTMLUListElement>(null);
  const listScrollTop = useRef(0);
  const profileHeading = useRef<HTMLHeadingElement>(null);
  const sectorLabel = (id: FemtechSectorId) => femtechSectors.find(item => item.id === id)!.label[language];

  const matches = useMemo(() => {
    const search = normalize(query.trim());
    return femtechCompanies.filter(company => {
      if (sector !== "all" && company.sectorId !== sector) return false;
      const healthArea = femtechSectors.find(item => item.id === company.sectorId)!.label;
      return !search || normalize([
        company.name, company.location?.pl, company.location?.en,
        company.description?.pl, company.description?.en, healthArea.pl, healthArea.en,
        company.typeLabel?.pl, company.typeLabel?.en,
      ].filter(Boolean).join(" ")).includes(search);
    }).sort((a, b) => a.name.localeCompare(b.name, language));
  }, [query, sector, language]);
  const cityCounts = new Map(polandCities.map(city => [city.id, matches.filter(company => company.cityId === city.id).length]));
  const outsideCount = matches.filter(company => company.cityId === null).length;
  const visibleCompanies = matches.filter(company => place === "all" || (place === "unmapped" ? company.cityId === null : company.cityId === place));
  const selected = visibleCompanies.find(company => company.id === selectedId) ?? null;
  const activeCity = selected?.cityId ?? (place !== "all" && place !== "unmapped" ? place : null);
  const locationLabel = place === "all" ? c.allCompanies : place === "unmapped" ? c.unmapped : polandCities.find(city => city.id === place)!.name[language];
  const hasFilters = query.trim() !== "" || sector !== "all" || place !== "all";

  useEffect(() => {
    if (selectedId) profileHeading.current?.focus({ preventScroll: true });
  }, [selectedId]);

  useEffect(() => {
    const track = hold.current;
    const panel = explorer.current;
    if (!track || !panel) return;
    const desktop = matchMedia("(min-width: 901px) and (min-height: 700px) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const headerHeight = document.querySelector<HTMLElement>(".pp-header")?.getBoundingClientRect().height ?? 100;
      // Only hold the complete view when the controls, map, results and notes all fit.
      track.classList.toggle("is-pinnable", desktop.matches && !reduced.matches && document.documentElement.dataset.motion !== "off" && panel.getBoundingClientRect().height <= innerHeight - headerHeight - 48);
    };
    const resize = new ResizeObserver(update);
    const motion = new MutationObserver(update);
    resize.observe(panel);
    motion.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
    window.addEventListener("resize", update);
    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);
    update();
    return () => {
      resize.disconnect(); motion.disconnect(); window.removeEventListener("resize", update);
      desktop.removeEventListener("change", update); reduced.removeEventListener("change", update);
    };
  }, []);

  const reset = () => {
    setQuery(""); setSector("all"); setPlace("all"); setSelectedId(null);
    requestAnimationFrame(() => searchInput.current?.focus());
  };
  const choosePlace = (next: PlaceFilter, fromMap = false) => {
    setPlace(fromMap && place === next ? "all" : next);
    setSelectedId(null);
    if (fromMap) {
      requestAnimationFrame(() => {
        if (results.current) window.dispatchEvent(new CustomEvent("poppy-scroll-to", { detail: results.current }));
      });
    }
  };
  const backToList = () => {
    const previous = selectedId;
    setSelectedId(null);
    requestAnimationFrame(() => {
      if (companyList.current) companyList.current.scrollTop = listScrollTop.current;
      results.current?.querySelector<HTMLButtonElement>(`[data-company-id="${previous}"]`)?.focus({ preventScroll: true });
    });
  };

  const companyRow = (company: FemtechCompany) => (
    <li key={company.id}>
      <button type="button" className="pfe-company" data-company-id={company.id} aria-label={`${c.explore}: ${company.name}`} onClick={() => { listScrollTop.current = companyList.current?.scrollTop ?? 0; setSelectedId(company.id); }}>
        <span className="pfe-company__copy"><span className="pfe-company__sector">{sectorLabel(company.sectorId)}</span><span className="pfe-company__name">{company.name}</span><span className="pfe-company__place">{company.location?.[language] ?? c.noLocation}</span></span>
        <span className="pfe-company__arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
      </button>
    </li>
  );

  return (
    <section className="pfe pp-section" id="firmy" aria-labelledby="pfe-title">
      <div className="pp-container">
        <div className="pfe-heading">
          <div><h2 id="pfe-title">{c.title}<br /><em>{c.titleAccent}</em></h2><p className="pfe-heading__intro">{c.intro}</p></div>
          <dl className="pfe-stats"><div><dd>{femtechCompanies.length}</dd><dt>{c.companies}</dt></div><div><dd>{polandCities.length}</dd><dt>{c.cities}</dt></div></dl>
        </div>

        <div className="pfe-hold" ref={hold}><div className="pfe-explorer" ref={explorer}>
          <div className="pfe-controls">
            <label className="pfe-search"><Search size={19} aria-hidden="true" /><span className="sr-only">{c.searchLabel}</span><input ref={searchInput} type="search" value={query} placeholder={c.search} onChange={event => { setQuery(event.target.value); setSelectedId(null); }} /></label>
            <label className="pfe-select"><span>{c.sector}</span><select value={sector} onChange={event => { setSector(event.target.value as FemtechSectorId | "all"); setSelectedId(null); }}><option value="all">{c.allSectors}</option>{femtechSectors.map(item => <option key={item.id} value={item.id}>{item.label[language]}</option>)}</select><ChevronDown size={15} aria-hidden="true" /></label>
            <label className="pfe-select"><span>{c.location}</span><select value={place} onChange={event => choosePlace(event.target.value as PlaceFilter)}><option value="all">{c.allPlaces}</option>{polandCities.map(city => <option value={city.id} key={city.id}>{city.name[language]} ({cityCounts.get(city.id) ?? 0})</option>)}<option value="unmapped">{c.unmapped} ({outsideCount})</option></select><ChevronDown size={15} aria-hidden="true" /></label>
          </div>

          <div className={`pfe-workspace${hasFilters || selected ? " is-exploring" : ""}`}>
            <div className="pfe-map-panel">
              <div className="pfe-map-heading"><span>{c.mapHint}</span><span aria-hidden="true">N ↑</span></div>
              <div className={`pfe-map${selected && !selected.cityId ? " pfe-map--unmapped" : ""}`} role="group" aria-label={c.mapLabel}>
                <svg className="pfe-map__outline" viewBox={polandMapViewBox} fill="none" aria-hidden="true" focusable="false">
                  <defs><pattern id="pfe-grid" width="34" height="34" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="2.2" fill="currentColor" /></pattern></defs>
                  <rect width="600" height="600" fill="url(#pfe-grid)" className="pfe-map__grid" />
                  <path className="pfe-map__land" d={polandOutlinePath} />
                  <path className="pfe-map__tracing" d={polandOutlinePath} pathLength="1" />
                </svg>
                {polandCities.map(city => {
                  const count = cityCounts.get(city.id) ?? 0;
                  return <button key={city.id} type="button" className={`pfe-pin${activeCity === city.id ? " is-active" : ""}`} data-city={city.id} style={{ left: `${city.x / 6}%`, top: `${city.y / 6}%` }} disabled={!count} aria-pressed={place === city.id} aria-controls="pfe-results" aria-label={`${c.cityButton} ${city.name[language]}: ${companyCount(count, language)}`} onClick={() => choosePlace(city.id, true)}><span className="pfe-pin__count">{count}</span><span className="pfe-pin__label">{city.name[language]}</span></button>;
                })}
              </div>
              <div className="pfe-map-footer"><span><i aria-hidden="true" />{companyCount(matches.length - outsideCount, language)} {language === "pl" ? "na mapie" : "on the map"}</span><button type="button" aria-pressed={place === "unmapped"} onClick={() => choosePlace("unmapped", true)}><Globe2 size={15} aria-hidden="true" />{c.unmapped}<span>{outsideCount}</span><ArrowRight size={15} aria-hidden="true" /></button></div>
              {selected && !selected.cityId && <p className="pfe-no-pin"><Globe2 size={16} aria-hidden="true" />{c.noPin}</p>}
            </div>

            <div className="pfe-results-column">
            <div className="pfe-results" id="pfe-results" ref={results} role="region" aria-label={c.resultsRegion}>
              <div className="pfe-results__header"><div><span>{locationLabel}</span><p aria-live="polite" aria-atomic="true">{companyCount(visibleCompanies.length, language)}</p></div>{hasFilters && <button type="button" className="pfe-clear" onClick={reset} aria-label={c.clear} title={c.clear}><X size={18} aria-hidden="true" /></button>}</div>
              {selected ? (
                <div className="pfe-profile" key={selected.id}>
                  <button type="button" className="pfe-back" onClick={backToList}><ArrowLeft size={16} aria-hidden="true" />{c.back}</button>
                  <div className="pfe-profile__identity"><span className="pfe-profile__monogram" aria-hidden="true">{selected.name.slice(0, 1)}</span><div><p className="pfe-profile__sector">{sectorLabel(selected.sectorId)}</p><h3 ref={profileHeading} tabIndex={-1}>{selected.name}</h3></div></div>
                  <p className="pfe-profile__location"><MapPin size={15} aria-hidden="true" />{selected.location?.[language] ?? c.noLocation}</p>
                  <p className="pfe-profile__description">{selected.description?.[language] ?? c.noDescription}</p>
                  <dl className="pfe-profile__facts">{selected.typeLabel && <div><dt>{c.type}</dt><dd>{selected.typeLabel[language]}</dd></div>}{selected.businessModel && <div><dt>{c.model}</dt><dd>{selected.businessModel}</dd></div>}<div><dt>{c.connection}</dt><dd>{femtechGroups.find(group => group.id === selected.group)!.label[language]}</dd></div></dl>
                  {selected.website ? <FluidLink className="pfe-profile__website" href={selected.website} target="_blank" rel="noopener noreferrer">{c.website}<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> ({c.newTab})</span></FluidLink> : <p className="pfe-profile__missing">{c.noWebsite}</p>}
                </div>
              ) : visibleCompanies.length ? (
                <ul className="pfe-company-list" ref={companyList} aria-label={c.results} data-lenis-prevent>{visibleCompanies.map(companyRow)}</ul>
              ) : (
                <div className="pfe-empty"><Search size={28} aria-hidden="true" /><h3>{c.noResults}</h3><p>{c.noResultsBody}</p><button type="button" className="pp-text-link" onClick={reset}>{c.clear}<ArrowRight size={16} aria-hidden="true" /></button></div>
              )}
            </div>
            </div>
          </div>
          <div className="pfe-notes"><p>{c.mapNote}</p><p>{c.source}<span className="pfe-credit">{c.mapCredit}: <a href={polandMapAttribution.outline.url} target="_blank" rel="noopener noreferrer">{polandMapAttribution.outline.label}</a> · <a href={polandMapAttribution.cities.url} target="_blank" rel="noopener noreferrer">{polandMapAttribution.cities.label}</a> (<a href={polandMapAttribution.cities.licenseUrl} target="_blank" rel="noopener noreferrer">{polandMapAttribution.cities.license}</a>)</span></p></div>
        </div></div>
        <div className="pfe-submit"><span>{c.missing}</span><FluidLink href="#zglos-firme">{c.add}<ArrowUpRight size={18} aria-hidden="true" /></FluidLink></div>
      </div>
    </section>
  );
}
