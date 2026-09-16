"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation supports the static export. */

import { ArrowDownRight, ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PoppyFooter, PoppyHeader, type PoppyLanguage } from "@/components/PoppyChrome";
import { SubstackPostEmbed } from "@/components/SubstackPostEmbed";
import { substackArchive } from "@/data/substack";
import { links } from "@/data/links";
import "./blog-page.css";

const copy = {
  pl: {
    title: <>Nowe pytania.<br /><em>Szersza perspektywa.</em></>,
    intro: "Analizy, obserwacje i najważniejsze wiadomości ze świata zdrowia kobiet. Czytaj nasz Substack — FemTech po Polsku.",
    explore: "Przeglądaj artykuły",
    signupTitle: "Dobre treści. Prosto na maila.",
    signupLabel: "Zapisz się na nasz newsletter",
    signupHelp: "Formularz nie działa? Zapisz się na Substacku",
    signupPrivacy: "Zapis obsługuje Substack. Twój adres e-mail trafia bezpośrednio do naszego newslettera na tej platformie.",
    archiveTitle: "Wszystkie artykuły",
    archiveIntro: "Prosto z naszego Substacka. Od najnowszych do tych, do których warto wrócić.",
    search: "Szukaj artykułu",
    searchPlaceholder: "Szukaj tematu lub tytułu…",
    clear: "Wyczyść wyszukiwanie",
    year: "Rok publikacji",
    allYears: "Wszystkie lata",
    count: "Artykuły",
    updated: "Ostatnia synchronizacja",
    empty: "Nie znaleźliśmy takiego artykułu.",
    reset: "Pokaż wszystkie artykuły",
    original: "Otwórz archiwum na Substacku",
    embedNote: "Podglądy i formularz pochodzą z Substacka i wymagają połączenia z internetem. Jeśli podgląd się nie załaduje, artykuł możesz otworzyć przez link."
  },
  en: {
    title: <>New questions.<br /><em>Wider perspectives.</em></>,
    intro: "Analysis, observations and the latest in women’s health. Read our Substack publication — FemTech po Polsku.",
    explore: "Explore the articles",
    signupTitle: "Good reads. In your inbox.",
    signupLabel: "Subscribe to our newsletter",
    signupHelp: "Form not loading? Subscribe on Substack",
    signupPrivacy: "Substack handles subscriptions. Your email goes directly to our newsletter on that platform.",
    archiveTitle: "All articles",
    archiveIntro: "From our Substack. The latest perspectives and stories worth revisiting.",
    search: "Search articles",
    searchPlaceholder: "Search a topic or title…",
    clear: "Clear search",
    year: "Publication year",
    allYears: "All years",
    count: "Articles",
    updated: "Last synced",
    empty: "No matching article just yet.",
    reset: "Show all articles",
    original: "Open the archive on Substack",
    embedNote: "Previews and the signup form are provided by Substack and require an internet connection. If a preview cannot load, use its article link. Articles stay in their original language."
  }
};

const normalise = (text: string) => text.toLocaleLowerCase("pl").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l");
const years = Array.from(new Set(substackArchive.posts.map(post => post.publishedAt.slice(0, 4)))).sort().reverse();

export function PoppyBlogPage() {
  const [language, setLanguage] = useState<PoppyLanguage>("pl");
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const c = copy[language];
  const terms = normalise(query).trim().split(/\s+/).filter(Boolean);
  const visible = substackArchive.posts.filter(post => (year === "all" || post.publishedAt.startsWith(year)) && terms.every(term => normalise(`${post.title} ${post.description}`).includes(term)));

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  return <div className="pp-site pp-blog-page">
    <PoppyHeader language={language} onLanguageChange={setLanguage} />
    <main id="main-content">
      <section className="pp-blog-hero" aria-labelledby="blog-title">
        <div className="pp-container">
          <nav className="pp-blog-breadcrumb" aria-label={language === "pl" ? "Ścieżka nawigacji" : "Breadcrumb"}><a href="/">Poppy Project</a><span aria-hidden="true">/</span><span aria-current="page">Blog</span></nav>
          <div className="pp-blog-hero__grid">
            <div className="pp-blog-hero__copy">
              <p className="pp-eyebrow">Poppy Notes · FemTech po Polsku</p>
              <h1 id="blog-title">{c.title}</h1>
              <p className="pp-blog-hero__intro">{c.intro}</p>
              <a className="pp-text-link" href="#artykuly">{c.explore}<ArrowDownRight size={20} aria-hidden="true" /></a>
            </div>
            <div className="pp-blog-signup" aria-labelledby="signup-title">
              <h2 id="signup-title">{c.signupTitle}</h2>
              <iframe src={`${links.substack}embed`} title={c.signupLabel} className="pp-blog-signup__frame" referrerPolicy="strict-origin-when-cross-origin" />
              <div className="pp-blog-signup__help">
                <a href={`${links.substack}subscribe`} target="_blank" rel="noopener noreferrer">{c.signupHelp}<ArrowUpRight size={15} aria-hidden="true" /></a>
                <p>{c.signupPrivacy}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pp-blog-archive" id="artykuly" aria-labelledby="archive-title">
        <div className="pp-container">
          <div className="pp-blog-archive__heading"><h2 id="archive-title">{c.archiveTitle}</h2><p>{c.archiveIntro}</p></div>
          <div className="pp-blog-tools">
            <div className="pp-blog-search" role="search">
              <Search size={20} aria-hidden="true" />
              <label className="pp-blog-sr-only" htmlFor="blog-search">{c.search}</label>
              <input type="search" id="blog-search" placeholder={c.searchPlaceholder} value={query} onChange={event => setQuery(event.target.value)} autoComplete="off" />
              {query && <button type="button" aria-label={c.clear} onClick={() => setQuery("")}><X size={18} aria-hidden="true" /></button>}
            </div>
            <label className="pp-blog-year"><span>{c.year}</span><select value={year} onChange={event => setYear(event.target.value)}><option value="all">{c.allYears}</option>{years.map(value => <option key={value} value={value}>{value}</option>)}</select></label>
          </div>
          <div className="pp-blog-status"><p role="status" aria-live="polite" aria-atomic="true">{c.count}: <strong>{visible.length}</strong>{visible.length !== substackArchive.posts.length && ` / ${substackArchive.posts.length}`}</p><span>{c.updated}: <time dateTime={substackArchive.syncedAt}>{new Intl.DateTimeFormat(language === "pl" ? "pl-PL" : "en-GB", { dateStyle: "medium", timeZone: "Europe/Warsaw" }).format(new Date(substackArchive.syncedAt))}</time></span></div>
          {visible.length ? <div className="pp-blog-grid">{visible.map(post => <SubstackPostEmbed key={post.id} post={post} language={language} />)}</div> : <div className="pp-blog-empty"><h3>{c.empty}</h3><button type="button" className="pp-text-link" onClick={() => { setQuery(""); setYear("all"); }}>{c.reset}<ArrowUpRight size={18} aria-hidden="true" /></button></div>}
          <div className="pp-blog-archive__bottom"><p>{c.embedNote}</p><a className="pp-text-link" href={`${links.substack}archive`} target="_blank" rel="noopener noreferrer">{c.original}<ArrowUpRight size={18} aria-hidden="true" /></a></div>
        </div>
      </section>
    </main>
    <PoppyFooter language={language} />
  </div>;
}
