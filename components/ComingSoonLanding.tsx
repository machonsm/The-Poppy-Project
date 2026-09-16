"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Download,
  Globe2,
  Mail,
  MapPin,
  Send
} from "lucide-react";
import { GravityDotGrid } from "@/components/brand/GravityDotGrid";
import { events, type EventItem } from "@/data/events";
import { mapAssets } from "@/data/map-assets";
import { useRef, useState, type PointerEvent } from "react";

type Language = "pl" | "en";

type NavItem = {
  label: string;
  href: string;
};

type SubmitFieldCopy = {
  company: string;
  website: string;
  category: string;
  contact: string;
  email: string;
  description: string;
  consent: string;
};

type LandingCopy = {
  navLabel: string;
  languageLabel: string;
  subtitle: string;
  nav: NavItem[];
  purpose: {
    kicker: string;
    title: string;
    intro: string;
    body: string;
    points: string[];
    closing: string;
    actions: string[];
    phases: {
      title: string;
      body: string;
      tags: string[];
    }[];
  };
  resource: {
    kicker: string;
    title: string;
    body: string;
    note: string;
    cta: string;
  };
  events: {
    kicker: string;
    title: string;
    body: string;
    cta: string;
  };
  instagram: {
    kicker: string;
    title: string;
    body: string;
    cta: string;
  };
  submit: {
    kicker: string;
    title: string;
    body: string;
    button: string;
    fields: SubmitFieldCopy;
  };
  footer: {
    title: string;
    body: string;
    pages: string;
    contact: string;
  };
};

const copy: Record<Language, LandingCopy> = {
  pl: {
    navLabel: "Główna nawigacja",
    languageLabel: "Zmień język",
    subtitle: "Polska platforma innowacji w zdrowiu kobiet.",
    nav: [
      { label: "Materiały", href: "/materialy" },
      { label: "Blog", href: "/blog" },
      { label: "Podcast", href: "/podcast" },
      { label: "Wydarzenia", href: "#wydarzenia" },
      { label: "O nas", href: "/o-nas" }
    ],
    purpose: {
      kicker: "Kim jesteśmy",
      title: "Kim Jesteśmy",
      intro: "The Poppy Project to polska platforma innowacji w zdrowiu kobiet.",
      body:
        "The Poppy Project łączy polski ekosystem zdrowia kobiet z europejską i globalną społecznością zdrowia kobiet i FemTech. Działamy na styku biznesu, wiedzy i relacji, pomagając polskim organizacjom, ekspertom i przedsiębiorcom budować widoczność oraz dostęp do międzynarodowych możliwości rozwoju, finansowania i współpracy.",
      points: [
        "Mapujemy rynek, tłumaczymy badania, trendy i sprawdzone modele działania oraz łączymy przedsiębiorców, medyków, naukowców, inwestorów i partnerów instytucjonalnych. Tworzymy pomost między Polską a bardziej rozwiniętymi ekosystemami innowacji w zdrowiu kobiet.",
        "Śledzimy rozwiązania, które sprawdziły się na dojrzalszych rynkach, i pomagamy ocenić, które z nich mają potencjał, by skutecznie odpowiadać na potrzeby kobiet w Polsce. Jednocześnie wspieramy polskie firmy, projekty i ekspertów w budowaniu międzynarodowej rozpoznawalności, tak aby lokalne talenty, wiedza i innowacje mogły docierać do szerszego grona partnerów, inwestorów i odbiorców."
      ],
      closing: "Łączymy polskie innowacje z globalnymi trendami w zdrowiu kobiet.",
      actions: [
        "mapuje rynek.",
        "tłumaczy badania.",
        "łączy ludzi.",
        "buduje mosty.",
        "otwiera finansowanie.",
        "pokazuje talenty.",
        "tworzy zasoby.",
        "wzmacnia zdrowie kobiet."
      ],
      phases: [
        {
          title: "Mapujemy rynek",
          body:
            "Tworzymy aktualny obraz polskiego FemTechu: kategorie, firmy, luki, potrzeby i obszary wzrostu, które warto pokazywać dalej.",
          tags: ["Mapa ekosystemu", "Kategorie", "Baza firm"]
        },
        {
          title: "Tłumaczymy wiedzę",
          body:
            "Przekładamy badania, trendy i sprawdzone modele działania na język użyteczny dla founderek, ekspertów, partnerów i instytucji.",
          tags: ["Badania", "Trendy", "Modele działania"]
        },
        {
          title: "Łączymy ludzi",
          body:
            "Budujemy relacje między przedsiębiorcami, medykami, naukowcami, inwestorami i partnerami, którzy mogą wzmacniać zdrowie kobiet w Polsce.",
          tags: ["Founderki", "Medycy", "Inwestorzy"]
        },
        {
          title: "Otwieramy możliwości",
          body:
            "Pomagamy polskim projektom budować rozpoznawalność i dostęp do międzynarodowych rozmów, finansowania oraz współpracy.",
          tags: ["Widoczność", "Finansowanie", "Partnerstwa"]
        }
      ]
    },
    resource: {
      kicker: "Bezpłatny zasób",
      title: "Mapa Polskiego FemTechu 2025",
      body: "Pobierz naszą autorską mapę FemTechu w Polsce.",
      note:
        "To pierwsze zestawienie polskiego ekosystemu stworzone w oparciu o dostępne informacje i naszą bieżącą wiedzę o tej branży!",
      cta: "Pobierz mapę"
    },
    events: {
      kicker: "Nadchodzące wydarzenia",
      title: "Kalendarz dla osób budujących zdrowie kobiet.",
      body:
        "Śledzimy najważniejsze wydarzenia FemTech, HealthTech oraz innowacji w zdrowiu kobiet w Polsce, Europie i na świecie.",
      cta: "Otwórz wydarzenie"
    },
    instagram: {
      kicker: "Instagram",
      title: "Obserwuj nas na Instagramie",
      body:
        "Najkrótsza droga do aktualności, zapowiedzi materiałów i sygnałów z ekosystemu.",
      cta: "Otwórz Instagram"
    },
    submit: {
      kicker: "Znasz firmę FemTech w Polsce?",
      title: "Dodaj firmę do mapy ekosystemu.",
      body:
        "Jesteś właścicielem/lką firmy FemTech w Polsce bądź znasz taką? Daj nam znać! W gronie raźniej: The Poppy Project buduje bazę danych polskiego FemTechu.",
      button: "Wyślij zgłoszenie",
      fields: {
        company: "Nazwa firmy",
        website: "Strona www",
        category: "Obszar działalności",
        contact: "Osoba kontaktowa",
        email: "E-mail",
        description: "Krótki opis firmy",
        consent: "Mogę przekazać te informacje zespołowi The Poppy Project."
      }
    },
    footer: {
      title: "The Poppy Project",
      body:
        "Polska platforma wiedzy, rozmów i wydarzeń wokół innowacji w zdrowiu kobiet.",
      pages: "Strony",
      contact: "Kontakt"
    }
  },
  en: {
    navLabel: "Main navigation",
    languageLabel: "Change language",
    subtitle: "Polish platform for women’s health innovation.",
    nav: [
      { label: "Resources", href: "/materialy" },
      { label: "Blog", href: "/blog" },
      { label: "Podcast", href: "/podcast" },
      { label: "Events", href: "#wydarzenia" },
      { label: "About us", href: "/o-nas" }
    ],
    purpose: {
      kicker: "Who we are",
      title: "Who We Are",
      intro: "The Poppy Project is a Polish platform for women’s health innovation.",
      body:
        "The Poppy Project connects the Polish women’s health ecosystem with the European and global women’s health and FemTech community. We work at the intersection of business, knowledge, and relationships, helping Polish organisations, experts, and entrepreneurs build visibility and access international opportunities for growth, funding, and collaboration.",
      points: [
        "We map the market, translate research, trends, and proven operating models, and connect entrepreneurs, clinicians, scientists, investors, and institutional partners. We create a bridge between Poland and more mature women’s health innovation ecosystems.",
        "We track solutions that have worked in more mature markets and help assess which of them could effectively respond to the needs of women in Poland. At the same time, we support Polish companies, projects, and experts in building international recognition, so that local talent, knowledge, and innovation can reach a wider circle of partners, investors, and audiences."
      ],
      closing: "We connect Polish innovation with global trends in women’s health.",
      actions: [
        "maps the market.",
        "translates research.",
        "connects people.",
        "builds bridges.",
        "opens funding.",
        "spotlights talent.",
        "creates resources.",
        "strengthens women’s health."
      ],
      phases: [
        {
          title: "Map the Market",
          body:
            "We build a current picture of Polish FemTech: categories, companies, gaps, needs, and growth areas worth bringing into wider view.",
          tags: ["Ecosystem map", "Categories", "Company base"]
        },
        {
          title: "Translate Knowledge",
          body:
            "We turn research, trends, and proven operating models into useful insight for founders, experts, partners, and institutions.",
          tags: ["Research", "Trends", "Operating models"]
        },
        {
          title: "Connect People",
          body:
            "We create relationships between entrepreneurs, clinicians, scientists, investors, and partners who can strengthen women’s health in Poland.",
          tags: ["Founders", "Clinicians", "Investors"]
        },
        {
          title: "Open Opportunities",
          body:
            "We help Polish projects build recognition and access international conversations, funding pathways, and collaborations.",
          tags: ["Visibility", "Funding", "Partnerships"]
        }
      ]
    },
    resource: {
      kicker: "Free resource",
      title: "Polish FemTech Map 2025",
      body: "Download our original map of FemTech in Poland.",
      note:
        "It is the first overview of the Polish ecosystem created from available information and our current knowledge of the field.",
      cta: "Download map"
    },
    events: {
      kicker: "Upcoming events",
      title: "A calendar for people building women’s health.",
      body:
        "We track key FemTech, HealthTech, and women’s health innovation events in Poland, Europe, and around the world.",
      cta: "Open event"
    },
    instagram: {
      kicker: "Instagram",
      title: "Follow us on Instagram",
      body:
        "The shortest route to updates, material previews, and signals from the ecosystem.",
      cta: "Open Instagram"
    },
    submit: {
      kicker: "Know a FemTech company in Poland?",
      title: "Add a company to the ecosystem map.",
      body:
        "Are you a founder of a FemTech company in Poland, or do you know one? Let us know and help us build a reliable view of Polish FemTech.",
      button: "Submit company",
      fields: {
        company: "Company name",
        website: "Website",
        category: "Area of activity",
        contact: "Contact person",
        email: "Email",
        description: "Short company description",
        consent: "I can share this information with The Poppy Project team."
      }
    },
    footer: {
      title: "The Poppy Project",
      body:
        "A Polish platform for knowledge, conversations, and events around women’s health innovation.",
      pages: "Pages",
      contact: "Contact"
    }
  }
};

const contactHref = "mailto:hello@thepoppyproject.pl";
const pageLinks: NavItem[] = [
  { label: "Materiały", href: "/materialy" },
  { label: "Blog", href: "/blog" },
  { label: "Podcast", href: "/podcast" },
  { label: "O nas", href: "/o-nas" }
];

const categoryOptions = [
  "Płodność i reprodukcja",
  "Zdrowie menstruacyjne",
  "Endometrioza",
  "Ciąża i poród",
  "Menopauza",
  "Onkologia",
  "Zdrowie psychiczne",
  "Inne"
];

const instagramPreviewPosts = [
  "Mapa Polskiego FemTechu 2025",
  "Poppy Notes: luka danych",
  "Poppy Talks: rozmowy z founderkami"
];

const dateFormatters: Record<Language, Intl.DateTimeFormat> = {
  pl: new Intl.DateTimeFormat("pl-PL", { day: "2-digit", month: "short" }),
  en: new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" })
};

const yearFormatter = new Intl.DateTimeFormat("pl-PL", { year: "numeric" });

function formatEventDate(language: Language, date: string, endDate?: string) {
  const start = new Date(date);
  const label = dateFormatters[language].format(start);
  const year = yearFormatter.format(start);

  if (!endDate) {
    return { label, year };
  }

  return {
    label: `${label} - ${dateFormatters[language].format(new Date(endDate))}`,
    year
  };
}

export function ComingSoonLanding() {
  const [language, setLanguage] = useState<Language>("pl");
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);
  const eventsListRef = useRef<HTMLDivElement>(null);
  const eventCursorRef = useRef<HTMLDivElement>(null);
  const eventPreviewRef = useRef<HTMLDivElement>(null);
  const currentCopy = copy[language];
  const mapAsset = mapAssets[language];
  const visibleEvents = events;

  const handleEventsPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const list = eventsListRef.current;
    const cursor = eventCursorRef.current;
    const preview = eventPreviewRef.current;

    if (!list || !cursor || !preview) {
      return;
    }

    const bounds = list.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const previewX = Math.min(Math.max(x + 28, 12), Math.max(12, bounds.width - 230));
    const previewY = Math.min(Math.max(y - 108, 12), Math.max(12, bounds.height - 190));

    cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    preview.style.transform = `translate3d(${previewX}px, ${previewY}px, 0)`;
  };

  const clearActiveEvent = () => {
    setActiveEvent(null);
  };

  return (
    <div className="poppy-landing">
      <header className="landing-header">
        <div className="landing-header-container">
          <Link className="landing-header-logo" href="/" aria-label="The Poppy Project">
            <Image src="/poppy-logo.svg" alt="" width={1080} height={1350} priority />
            <span className="landing-header-wordmark">
              <span className="landing-header-wordmark__the">THE</span>
              <span className="landing-header-wordmark__poppy">POPPY</span>
              <span className="landing-header-wordmark__project">PROJECT</span>
            </span>
          </Link>

          <nav className="landing-header-nav" aria-label={currentCopy.navLabel}>
            {currentCopy.nav.map((item) => (
              <a key={`${item.href}-${item.label}`} className="landing-header-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="landing-header-actions">
            <div className="landing-language-toggle" aria-label={currentCopy.languageLabel}>
              <button
                className={language === "pl" ? "is-active" : ""}
                type="button"
                aria-label="Polski"
                aria-pressed={language === "pl"}
                onClick={() => setLanguage("pl")}
              >
                PL
              </button>
              <button
                className={language === "en" ? "is-active" : ""}
                type="button"
                aria-label="English"
                aria-pressed={language === "en"}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="landing-hero" aria-labelledby="landing-hero-title">
          <div className="landing-hero-container">
            <h1 className="landing-hero-title" id="landing-hero-title">
              <span className="landing-hero-title__the">THE</span>
              <span className="landing-hero-title__poppy">POPPY</span>
              <span className="landing-hero-title__project">PROJECT</span>
            </h1>
            <p className="landing-hero-subtitle">{currentCopy.subtitle}</p>
          </div>

          <div className="landing-hero-shape" aria-hidden="true">
            <div className="landing-hero-logo-cluster">
              <GravityDotGrid className="landing-hero-dot-grid" />
              <div className="landing-hero-logo-panel">
                <Image
                  className="landing-hero-img"
                  src="/poppy-logo.svg"
                  alt=""
                  width={1080}
                  height={1350}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="landing-home-section landing-purpose" id="czym-sie-zajmujemy" aria-labelledby="purpose-title">
          <div className="landing-home-section__inner landing-purpose-kinetic">
            <div className="landing-purpose-kinetic__intro">
              <p className="landing-section__kicker">{currentCopy.purpose.kicker}</p>
              <h2 id="purpose-title">{currentCopy.purpose.title}</h2>
              <p>
                <strong>{currentCopy.purpose.intro}</strong>
              </p>
              <p>{currentCopy.purpose.body}</p>
              {currentCopy.purpose.points.map((point) => (
                <p key={point}>{point}</p>
              ))}
              <p className="landing-purpose-kinetic__closing">
                <strong>{currentCopy.purpose.closing}</strong>
              </p>
            </div>
          </div>
        </section>

        <section className="landing-home-section landing-resource" id="mapa" aria-labelledby="resource-title">
          <div className="landing-home-section__inner landing-resource__inner">
            <div className="landing-resource__copy">
              <h2 id="resource-title">{currentCopy.resource.title}</h2>
              <p>{currentCopy.resource.body}</p>
              <p>{currentCopy.resource.note}</p>
              <a className="landing-section__cta" href={mapAsset.pdf} download={mapAsset.filename}>
                <Download size={18} aria-hidden="true" />
                <span>{currentCopy.resource.cta}</span>
              </a>
            </div>

            <a className="landing-map-preview" href={mapAsset.pdf} download={mapAsset.filename} aria-label={currentCopy.resource.cta}>
              <Image
                src={mapAsset.poster}
                alt={language === "pl" ? "Mapa Polskiego FemTechu 2025" : "Polish FemTech Map 2025"}
                width={595}
                height={842}
                sizes="(max-width: 820px) 86vw, 420px"
              />
            </a>
          </div>
        </section>

        <section className="landing-home-section landing-events" id="wydarzenia" aria-labelledby="events-title">
          <div className="landing-home-section__inner">
            <div className="landing-home-section__header">
              <p className="landing-section__kicker">{currentCopy.events.kicker}</p>
              <h2 id="events-title">{currentCopy.events.title}</h2>
              <p>{currentCopy.events.body}</p>
            </div>

            <div
              className="landing-events-list"
              data-preview-active={activeEvent ? "true" : "false"}
              ref={eventsListRef}
              onPointerMove={handleEventsPointerMove}
              onPointerLeave={clearActiveEvent}
            >
              <div className="landing-events-cursor" ref={eventCursorRef} aria-hidden="true" />
              <div className="landing-events-preview" ref={eventPreviewRef} aria-hidden="true">
                {activeEvent ? (
                  <Image
                    src={activeEvent.image}
                    alt=""
                    width={460}
                    height={360}
                    sizes="220px"
                  />
                ) : null}
              </div>

              {visibleEvents.map((event) => {
                const date = formatEventDate(language, event.date, event.endDate);

                return (
                  <article
                    className="landing-event-card"
                    key={event.title}
                    onPointerEnter={() => setActiveEvent(event)}
                    onFocus={() => setActiveEvent(event)}
                    onBlur={clearActiveEvent}
                  >
                    <div className="landing-event-card__thumb">
                      <Image
                        src={event.image}
                        alt={event.imageAlt}
                        width={180}
                        height={130}
                        sizes="(max-width: 900px) 86px, 1px"
                      />
                    </div>
                    <div className="landing-event-card__date">
                      <strong>{date.label}</strong>
                      <span>{date.year}</span>
                    </div>
                    <div className="landing-event-card__body">
                      <span>{event.category}</span>
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                      <div>
                        <MapPin size={15} aria-hidden="true" />
                        {event.location}
                      </div>
                    </div>
                    <a href={event.url} target="_blank" rel="noreferrer" aria-label={`${currentCopy.events.cta}: ${event.title}`}>
                      <ArrowUpRight size={22} aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="landing-home-section landing-instagram" id="instagram" aria-labelledby="instagram-title">
          <div className="landing-home-section__inner landing-instagram__inner">
            <div className="landing-home-section__header">
              <p className="landing-section__kicker">{currentCopy.instagram.kicker}</p>
              <h2 id="instagram-title">{currentCopy.instagram.title}</h2>
              <p>{currentCopy.instagram.body}</p>
            </div>

            <div className="landing-instagram__embed" aria-label={currentCopy.instagram.cta}>
              <div className="landing-instagram__topbar">
                <span />
                <strong>@thepoppyproject</strong>
              </div>
              <div className="landing-instagram__posts">
                {instagramPreviewPosts.map((post, index) => (
                  <article key={post}>
                    <Image src="/poppy-logo.svg" alt="" width={1080} height={1350} />
                    <p>{post}</p>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="landing-home-section landing-submit" id="kontakt" aria-labelledby="submit-title">
          <div className="landing-home-section__inner landing-submit__inner">
            <div className="landing-submit__copy">
              <p className="landing-section__kicker">{currentCopy.submit.kicker}</p>
              <h2 id="submit-title">{currentCopy.submit.title}</h2>
              <p>{currentCopy.submit.body}</p>
            </div>

            <form className="landing-company-form" action={contactHref} method="post" encType="text/plain">
              <label>
                <span>{currentCopy.submit.fields.company}</span>
                <input name="company" required />
              </label>
              <label>
                <span>{currentCopy.submit.fields.website}</span>
                <input name="website" type="url" placeholder="https://" />
              </label>
              <label>
                <span>{currentCopy.submit.fields.category}</span>
                <select name="category" defaultValue="">
                  <option value="" disabled />
                  {categoryOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>{currentCopy.submit.fields.contact}</span>
                <input name="contact" />
              </label>
              <label>
                <span>{currentCopy.submit.fields.email}</span>
                <input name="email" type="email" required />
              </label>
              <label className="landing-company-form__wide">
                <span>{currentCopy.submit.fields.description}</span>
                <textarea name="description" rows={5} required />
              </label>
              <label className="landing-company-form__consent">
                <input name="consent" type="checkbox" required />
                <span>{currentCopy.submit.fields.consent}</span>
              </label>
              <button className="landing-section__cta" type="submit">
                <Send size={18} aria-hidden="true" />
                <span>{currentCopy.submit.button}</span>
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="landing-site-footer">
        <div className="landing-site-footer__inner">
          <div>
            <Image src="/poppy-logo.svg" alt="" width={1080} height={1350} />
            <h2>{currentCopy.footer.title}</h2>
            <p>{currentCopy.footer.body}</p>
          </div>

          <nav aria-label={currentCopy.footer.pages}>
            <h3>{currentCopy.footer.pages}</h3>
            {pageLinks.map((item) => (
              <a key={item.href} href={item.href}>
                {language === "en" && item.label === "Materiały" ? "Resources" : item.label}
              </a>
            ))}
          </nav>

          <div>
            <h3>{currentCopy.footer.contact}</h3>
            <a href={contactHref}>
              <Mail size={16} aria-hidden="true" />
              hello@thepoppyproject.pl
            </a>
            <a href="#instagram">
              <Globe2 size={16} aria-hidden="true" />
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
