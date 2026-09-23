"use client";

import { ArrowUpRight, Search, X } from "lucide-react";
import { useState } from "react";
import { PoppyFooter, PoppyHeader } from "@/components/PoppyChrome";
import { SubstackPostCard } from "@/components/SubstackPostCard";
import { PoppyNewsletterSignup } from "@/components/PoppyNewsletterSignup";
import { substackArchive } from "@/data/substack";
import { links } from "@/data/links";
import { FluidLink } from "@/components/ui/FluidButton";
import { usePoppyLanguage } from "@/lib/use-poppy-language";
import type { PoppyLanguage } from "@/lib/language-routes";
import "./blog-page.css";

const copy = {
  pl: {
    title: <>Co dzieje się w FemTechu?<br /><em>Tematy, które warto śledzić.</em></>,
    intro: "Analizy, obserwacje i najważniejsze tematy dotyczące zdrowia kobiet, technologii i rynku. Czytaj nas na Substacku.",
    explore: "Przeglądaj artykuły",
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
    archiveNote: "Artykuły pochodzą z naszego Substacka. Tutaj znajdziesz krótkie zajawki — pełne teksty otwierają się w nowej karcie."
  },
  en: {
    title: <>What’s happening in FemTech?<br /><em>Topics worth following.</em></>,
    intro: "Analysis, observations and the most important topics in women’s health, technology and the market. Read us on Substack.",
    explore: "Explore the articles",
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
    archiveNote: "Articles come from our Substack. These are short previews — full articles open in a new tab and stay in their original language."
  }
};

const normalise = (text: string) => text.toLocaleLowerCase("pl").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l");
const years = Array.from(new Set(substackArchive.posts.map(post => post.publishedAt.slice(0, 4)))).sort().reverse();

export function PoppyBlogPage({ initialLanguage = "pl" }: { initialLanguage?: PoppyLanguage }) {
  const [language, setLanguage] = usePoppyLanguage(initialLanguage);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const c = copy[language];
  const terms = normalise(query).trim().split(/\s+/).filter(Boolean);
  const visible = substackArchive.posts.filter(post => (year === "all" || post.publishedAt.startsWith(year)) && terms.every(term => normalise(`${post.title} ${post.description}`).includes(term)));

  return <div className="pp-site pp-blog-page">
    <PoppyHeader language={language} onLanguageChange={setLanguage} />
    <main id="main-content">
      <section className="pp-blog-hero" aria-labelledby="blog-title">
        <div className="pp-container">
          <div className="pp-blog-hero__grid">
            <div className="pp-blog-hero__copy">
              <h1 id="blog-title">{c.title}</h1>
              <p className="pp-blog-hero__intro">{c.intro}</p>
              <FluidLink href="#artykuly">{c.explore}</FluidLink>
            </div>
            <PoppyNewsletterSignup language={language} variant="card" />
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
          {visible.length ? <div className="pp-blog-grid">{visible.map(post => <SubstackPostCard key={post.id} post={post} language={language} />)}</div> : <div className="pp-blog-empty"><h3>{c.empty}</h3><button type="button" className="pp-text-link" onClick={() => { setQuery(""); setYear("all"); }}>{c.reset}<ArrowUpRight size={18} aria-hidden="true" /></button></div>}
          <div className="pp-blog-archive__bottom"><p>{c.archiveNote}</p><FluidLink href={links.substack} target="_blank" rel="noopener noreferrer">{c.original}<ArrowUpRight size={18} aria-hidden="true" /></FluidLink></div>
        </div>
      </section>
    </main>
    <PoppyFooter language={language} />
  </div>;
}
