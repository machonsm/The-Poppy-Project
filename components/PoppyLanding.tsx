"use client";

import Image from "next/image";
import { ArrowUpRight, Download, Send } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent, type MouseEvent as ReactMouseEvent } from "react";
import { PoppyHeader, PoppyFooter } from "@/components/PoppyChrome";
import { PoppyEventList } from "@/components/PoppyEventList";
import { InstagramStoryCarousel } from "@/components/InstagramStoryCarousel";
import { FluidButton, FluidLink } from "@/components/ui/FluidButton";
import { FemtechExplorer } from "@/components/FemtechExplorer";
import { PoppyMark } from "@/components/brand/PoppyMark";
import { GravityDotGrid } from "@/components/brand/GravityDotGrid";
import { WorkMotif } from "@/components/brand/WorkMotif";
import { usePoppyHover } from "@/components/motion/usePoppyHover";
import { usePoppyScroll } from "@/components/motion/usePoppyScroll";
import { siteFeatures } from "@/lib/features";
import { sitePath } from "@/lib/site-path";
import { events, type EventRegion } from "@/data/events";
import { currentEventDay, isUpcomingEvent, subscribeEventDay } from "@/lib/event-dates";
import { usePoppyLanguage } from "@/lib/use-poppy-language";
import type { PoppyLanguage } from "@/lib/language-routes";
import { links } from "@/data/links";
import { mapAssets } from "@/data/map-assets";

type EventFilter = "all" | EventRegion;
const eventFilters: EventFilter[] = ["all", "poland", "europe", "world", "online"];
const formSubmitUrl = `https://formsubmit.co/ajax/${links.email}`;
const companyFormPageUrl = "https://joinpoppy.pl/#zglos-firme";

const content = {
  pl: {
    hero: ["Polska platforma", "innowacji", "w\u00a0zdrowiu kobiet"],
    intro: "Łączymy polski ekosystem z globalnym rynkiem innowacji zdrowia kobiet — FemTech.",
    mapCta: "Odkryj mapę FemTechu",
    strip: ["Obserwuj nas na Instagramie"],
    aboutTitle: <><span className="pp-heading-line"><span>Czym się</span></span><span className="pp-heading-line"><span><em>zajmujemy?</em></span></span></>,
    aboutIntro: "Budujemy ekosystem FemTech i innowacji w zdrowiu kobiet w Polsce i Europie Środkowo-Wschodniej.",
    aboutMoreAction: "O nas",
    pillars: [
      { title: "Łączymy", body: "Łączymy przedsiębiorców, medyków, naukowców, inwestorów i partnerów instytucjonalnych, budując pomost między Polską a bardziej dojrzałymi ekosystemami innowacji w zdrowiu kobiet." },
      { title: "Informujemy", body: "Mapujemy rynek, tłumaczymy badania, trendy i sprawdzone modele na lokalny kontekst." },
      { title: "Wspieramy", body: "Wspieramy polskie firmy, projekty i ekspertów w budowaniu międzynarodowej rozpoznawalności, tak aby lokalne talenty, wiedza i innowacje mogły docierać do szerszej sieci partnerów, inwestorów i odbiorców." }
    ],
    discoverKicker: "Odkrywaj dalej",
    discoverIntro: "Więcej wiedzy, inspiracji i rozmów o świecie FemTechu znajdziesz właśnie tutaj.",
    destinations: [
      { label: "Materiały", href: "/materialy/" },
      { label: "Artykuły", href: "/artykuly/" },
      { label: "Podcast", href: "/podcast/" }
    ],
    mapTitle: <>Mapa Polskiego<br /><em>FemTechu 2025.</em></>,
    mapBody: <><strong>Pobierz naszą autorską mapę FemTechu w Polsce.</strong><br /><br />To pierwsze zestawienie polskiego ekosystemu stworzone w oparciu o dostępne informacje i naszą bieżącą wiedzę o tej branży!</>,
    mapName: "Mapa Polskiego FemTechu", mapDownload: "Pobierz mapę", mapFree: "Edycja 2025 · Bezpłatny dostęp", mapFile: "Dokument · PDF", mapJoin: "Twojej firmy jeszcze tu nie ma?", mapJoinCta: "Daj nam znać",
    eventsTitle: <>Dobre spotkania.<br /><em>Nowe możliwości.</em></>,
    eventsBody: null, filters: ["Wszystkie", "Polska", "Europa", "Świat", "Online"], noEvents: "Na razie nie ma wydarzeń w tej kategorii.", showAllEvents: "Zobacz wszystkie", eventDate: "Data", eventName: "Wydarzenie", eventLocation: "Miejsce", eventOpen: "Zobacz wydarzenie", eventNote: "Kalendarz branżowy · Informacje i rejestracja na stronach organizatorów.",
    contactTitle: <>Zmiana potrzebuje ludzi.<br /><em>Takich jak Ty.</em></>,
    contactBody: "Tworzysz rozwiązanie dla zdrowia kobiet? Szukasz partnerów? A może masz pomysł, od którego wszystko się zacznie? Poznajmy się.", contactAction: "Napisz do nas", companyAction: "Zgłoś firmę do naszej bazy danych", formNote: "Wyślij zgłoszenie bezpośrednio ze strony. Dane formularza trafią do nas przez usługę FormSubmit.",
    formFields: ["Nazwa firmy", "Twój adres e-mail", "Strona internetowa", "Obszar działalności", "Opowiedz nam o firmie"], formEmailHint: "Podaj adres, na który możemy odpowiedzieć — nie musi być firmowy.", consent: "Zgadzam się na przekazanie danych zgłoszenia zespołowi Poppy Project przez usługę FormSubmit.", formButton: "Wyślij zgłoszenie", formSending: "Wysyłanie…", formSuccess: "Dziękujemy! Zgłoszenie zostało przyjęte. Odpowiemy na podany adres e-mail.", formError: "Nie udało się wysłać zgłoszenia. Spróbuj ponownie lub napisz do joinpoppypl@gmail.com.",
    instagramTitle: <>Zobacz, co dzieje się<br /><em>na Instagramie.</em></>, instagramBody: "Wybrane wiadomości, perspektywy i rozmowy z ekosystemu zdrowia kobiet.", socialAction: "Obserwuj nas na Instagramie"
  },
  en: {
    hero: ["Poland’s platform", "for innovation", "in women’s health"],
    intro: "We connect Poland’s ecosystem with the global women’s health innovation market — FemTech.",
    mapCta: "Explore the FemTech map",
    strip: ["Follow us on Instagram"],
    aboutTitle: <><span className="pp-heading-line"><span>What</span></span><span className="pp-heading-line"><span><em>we do.</em></span></span></>,
    aboutIntro: "We build the FemTech and women’s health innovation ecosystem in Poland and Central and Eastern Europe.",
    aboutMoreAction: "About us",
    pillars: [
      { title: "We connect", body: "We connect entrepreneurs, clinicians, scientists, investors and institutional partners, building a bridge between Poland and more mature women’s health innovation ecosystems." },
      { title: "We inform", body: "We map the market and translate research, trends and proven models into the local context." },
      { title: "We support", body: "We support Polish companies, projects and experts in building international recognition, helping local talent, knowledge and innovation reach a wider network of partners, investors and audiences." }
    ],
    discoverKicker: "Discover more",
    discoverIntro: "Find more knowledge, inspiration and conversations about the world of FemTech right here.",
    destinations: [
      { label: "Resources", href: "/en/resources/" },
      { label: "Articles", href: "/en/articles/" },
      { label: "Podcast", href: "/en/podcast/" }
    ],
    mapTitle: <>Polish FemTech<br /><em>Map 2025.</em></>,
    mapBody: <><strong>Download our original map of Poland’s FemTech ecosystem.</strong><br /><br />It is the first overview of the Polish ecosystem created from publicly available information and our current knowledge of the sector.</>,
    mapName: "Polish FemTech Map", mapDownload: "Download the map", mapFree: "2025 edition · Free access", mapFile: "Document · PDF", mapJoin: "Don’t see your company yet?", mapJoinCta: "Let us know",
    eventsTitle: <>Great encounters.<br /><em>New possibilities.</em></>,
    eventsBody: null, filters: ["All events", "Poland", "Europe", "World", "Online"], noEvents: "No events in this category yet.", showAllEvents: "View all events", eventDate: "Date", eventName: "Event", eventLocation: "Location", eventOpen: "View event", eventNote: "Industry calendar · Details and registration on organisers’ websites.",
    contactTitle: <>Change needs people.<br /><em>People like you.</em></>,
    contactBody: "Building a solution for women’s health? Looking for partners? Or holding an idea that could start something? Let’s get to know each other.", contactAction: "Email us", companyAction: "Submit your company to our database", formNote: "Send your submission directly from this page. FormSubmit will deliver the form data to us.",
    formFields: ["Company name", "Your email address", "Website", "Area of activity", "Tell us about your company"], formEmailHint: "Use an address where we can reply — it does not have to be a company email.", consent: "I agree to send my submission data to the Poppy Project team through FormSubmit.", formButton: "Send submission", formSending: "Sending…", formSuccess: "Thank you! Your submission has been received. We’ll reply to the email address you provided.", formError: "We couldn’t send your submission. Please try again or email joinpoppypl@gmail.com.",
    instagramTitle: <>See what’s happening<br /><em>on Instagram.</em></>, instagramBody: "Selected stories, perspectives and conversations from the women’s health ecosystem.", socialAction: "Follow us on Instagram"
  }
};

export function PoppyLanding({ initialLanguage = "pl", initialEventDay = "" }: {
  initialLanguage?: PoppyLanguage;
  initialEventDay?: string;
}) {
  const [language, setLanguage] = usePoppyLanguage(initialLanguage);
  const [filter, setFilter] = useState<EventFilter>("all");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const root = useRef<HTMLDivElement>(null);
  const flower = useRef<HTMLDivElement>(null);
  const cluster = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  usePoppyHover(mark);
  usePoppyScroll(root);
  const c = content[language];
  const mapAsset = mapAssets[language];
  const today = useSyncExternalStore(subscribeEventDay, currentEventDay, () => initialEventDay);
  const upcomingEvents = today ? events.filter(event => isUpcomingEvent(event, today)) : [];
  const visibleEvents = filter === "all" ? upcomingEvents : upcomingEvents.filter(event => event.region === filter);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    node.querySelectorAll("[data-reveal]").forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add("pp-reveal-ready");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (event: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    window.history.pushState(null, "", `#${id}`);
    window.dispatchEvent(new CustomEvent("poppy-scroll-to", { detail: target }));
  };

  const submitCompany = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const company = String(data.get("company") ?? "").trim();
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    setFormStatus("sending");

    try {
      const response = await fetch(formSubmitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          company,
          email: String(data.get("email") ?? "").trim(),
          website: String(data.get("website") ?? "").trim(),
          activity: String(data.get("activity") ?? "").trim(),
          description: String(data.get("description") ?? "").trim(),
          consent: "yes",
          _url: companyFormPageUrl,
          _subject: `Poppy Project — company database: ${company}`,
          _template: "table",
          _captcha: "false",
          _honey: String(data.get("_honey") ?? "")
        }),
        signal: controller.signal
      });
      const result: { success?: boolean | string } = await response.json();
      const accepted = result.success === true || result.success === "true";
      if (!response.ok || !accepted) throw new Error("Form submission failed");
      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  return (
    <div className="pp-site" ref={root}>
      <div className="pp-reading-progress" aria-hidden="true" />
      <PoppyHeader language={language} onLanguageChange={setLanguage} />
      <main id="main-content" className="pp-main">
        <div className="pp-opening">
        <section className="pp-hero" aria-labelledby="pp-hero-title">
          <GravityDotGrid className="pp-hero-dots" fullWidth />
          <div className="pp-container pp-hero__grid">
            <div className="pp-hero__copy">
              <p className="pp-hero__brand">Poppy Project</p>
              <h1 id="pp-hero-title">
                <span className="pp-title-line"><span>{c.hero[0]} <span className="pp-hero__title-break">{c.hero[1]}</span></span></span>{" "}
                <span className="pp-title-line"><span><em>{c.hero[2]}</em></span></span>
              </h1>
              <p className="pp-hero__intro">{c.intro}</p>
              {siteFeatures.mapDownload && <FluidLink className="pp-hero__map-link" href="#mapa" onClick={event => scrollToSection(event, "mapa")}>{c.mapCta}</FluidLink>}
            </div>
            <div className="pp-flower-stage" ref={flower}>
              <div className="pp-flower-cluster" ref={cluster}>
                <div className="pp-flower-stage__mark" ref={mark} tabIndex={0} role="img" aria-label={language === "pl" ? "Mak — płatki delikatnie kołyszą się po najechaniu lub zaznaczeniu klawiaturą" : "Poppy — petals gently flutter on hover or keyboard focus"}><PoppyMark animated /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="pp-about pp-section" id="perspektywa" aria-labelledby="about-heading">
          <div className="pp-container pp-about__layout">
            <div className="pp-about__introduction">
              <div className="pp-about__heading" data-reveal>
                <h2 id="about-heading">{c.aboutTitle}</h2>
              </div>
              <p className="pp-about__lead">{c.aboutIntro}</p>
              <div className="pp-about__invitation">
                <FluidLink href={sitePath(language === "pl" ? "/o-nas/" : "/en/about/")}>{c.aboutMoreAction}<ArrowUpRight size={18} aria-hidden="true" /></FluidLink>
              </div>
            </div>
            <div className="pp-work-grid">
              {c.pillars.map((pillar, index) => (
                <article className={`pp-work-card pp-work-card--${index}`} key={index} data-reveal>
                  <WorkMotif variant={index + 1} />
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="pp-container pp-about__destinations" data-reveal>
            <div className="pp-about__destinations-heading">
              <h3>{c.discoverKicker}</h3>
              <p>{c.discoverIntro}</p>
            </div>
            <nav className="pp-about__destination-actions" aria-label={c.discoverKicker}>
              {c.destinations.map((destination) => (
                <FluidLink href={sitePath(destination.href)} key={destination.href}>{destination.label}<ArrowUpRight size={16} aria-hidden="true" /></FluidLink>
              ))}
            </nav>
          </div>
        </section>

        </div>

        <div className="pp-events-stack">
        {siteFeatures.mapDownload &&
        <section className="pp-map pp-section" id="mapa" aria-labelledby="map-heading">
          <div className="pp-container pp-map__grid">
            <div className="pp-map__copy" data-reveal><h2 id="map-heading">{c.mapTitle}</h2><p className="pp-map__description">{c.mapBody}</p><span className="pp-map__edition">{c.mapFree}</span><a className="pp-button pp-button--light" href={mapAsset.pdf} download={mapAsset.filename}>{c.mapDownload}</a><span className="pp-map__file">{c.mapFile}</span><p className="pp-map__join">{c.mapJoin} <a href="#zglos-firme">{c.mapJoinCta} ↗</a></p></div>
            <a href={mapAsset.pdf} download={mapAsset.filename} className="pp-map-art" aria-label={c.mapDownload} data-reveal><Image className="pp-map-art__poster" src={mapAsset.poster} alt={c.mapName + " 2025"} width={595} height={842} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 1000px) 40vw, 420px" /><span className="pp-map-art__caption"><span>{c.mapName} · 2025</span><Download size={18} aria-hidden="true" /></span></a>
          </div>
        </section>
        }

        {siteFeatures.companyMap && <FemtechExplorer language={language} />}

        <section className="pp-events pp-section" id="wydarzenia" aria-labelledby="events-heading">
          <div className="pp-container">
            <div className="pp-section-heading pp-section-heading--split" data-reveal><div><h2 id="events-heading">{c.eventsTitle}</h2></div>{c.eventsBody && <p>{c.eventsBody}</p>}</div>
            <div className="pp-events__toolbar"><div className="pp-event-filters" role="group" aria-label={language === "pl" ? "Filtruj wydarzenia" : "Filter events"}>{eventFilters.map((id, index) => <button type="button" key={id} aria-pressed={filter === id} aria-controls="pp-events-results" onClick={() => setFilter(id)}>{c.filters[index]}<span>{!today ? "—" : id === "all" ? upcomingEvents.length : upcomingEvents.filter(event => event.region === id).length}</span></button>)}</div></div>
            <div className="pp-events__results" id="pp-events-results" role="region" aria-busy={!today} aria-label={language === "pl" ? "Lista wydarzeń" : "Events list"} tabIndex={visibleEvents.length > 5 ? 0 : undefined}>{!today ? <div className="pp-events__empty" role="status"><p>{language === "pl" ? "Ładowanie wydarzeń…" : "Loading events…"}</p><noscript>{language === "pl" ? "Włącz JavaScript, aby zobaczyć aktualne wydarzenia." : "Enable JavaScript to see current events."}</noscript></div> : visibleEvents.length ? <PoppyEventList key={filter} events={visibleEvents} language={language} openLabel={c.eventOpen} /> : <div className="pp-events__empty" role="status"><p>{c.noEvents}</p>{filter !== "all" && <button type="button" onClick={() => setFilter("all")}>{c.showAllEvents}<ArrowUpRight size={17} aria-hidden="true" /></button>}</div>}</div>
            <p className="pp-events__note">{c.eventNote}</p>
          </div>
        </section>
        </div>

        {siteFeatures.homeInstagram && <section className="pp-instagram pp-section" id="instagram" aria-labelledby="instagram-heading">
          <div className="pp-marquee" aria-label={c.strip.join(" · ")}><div className="pp-marquee__track" aria-hidden="true">{[0, 1, 2, 3].map(group => <div className="pp-marquee__group" key={group}>{c.strip.map((word, index) => <span key={word}><span className={index % 2 ? "pp-marquee__italic" : ""}>{word}</span><span className="pp-marquee__asterisk">✳</span></span>)}</div>)}</div></div>
          <div className="pp-container pp-instagram__inner">
            <div className="pp-section-heading pp-section-heading--split" data-reveal><div><h2 id="instagram-heading">{c.instagramTitle}</h2></div><div className="pp-instagram__intro"><p>{c.instagramBody}</p><FluidLink href={links.instagram} target="_blank" rel="noreferrer">{c.socialAction}<ArrowUpRight size={18} aria-hidden="true" /></FluidLink></div></div>
          </div>
          <InstagramStoryCarousel language={language} />
        </section>}

        <section className="pp-contact pp-section" id="kontakt" aria-labelledby="contact-heading">
          <div className="pp-container">
            <div className="pp-contact__grid">
              <div data-reveal>
                <h2 id="contact-heading">{c.contactTitle}</h2>
                <p className="pp-contact__intro">{c.contactBody}</p>
                <FluidLink href={`mailto:${links.email}`}>{c.contactAction}<ArrowUpRight size={19} aria-hidden="true" /></FluidLink>
              </div>
              <div className="pp-contact__flower" aria-hidden="true" data-reveal>
                <svg className="pp-contact__flower-filters" width="0" height="0" focusable="false">
                  <defs>
                    <filter id="pp-contact-red-petal" colorInterpolationFilters="sRGB">
                      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  5 -5 0 0 -.15" result="red-petal" />
                      <feComposite in="red-petal" in2="SourceAlpha" operator="in" />
                    </filter>
                  </defs>
                </svg>
                <Image className="pp-contact__flower-base" src={sitePath("/contact-poppy-cutout.png")} alt="" width={1024} height={1536} />
                <Image className="pp-contact__flower-petal pp-contact__flower-petal--left" src={sitePath("/contact-poppy-cutout.png")} alt="" width={1024} height={1536} />
              </div>
            </div>
            <div className="pp-company" id="zglos-firme">
              <h3 className="pp-company__title">{c.companyAction}</h3>
              <div className="pp-company__body">
                <p>{c.formNote}</p>
                <form action={`https://formsubmit.co/${links.email}`} method="POST" onSubmit={submitCompany} aria-busy={formStatus === "sending"}>
                  <input type="hidden" name="_url" value={companyFormPageUrl} />
                  <input type="hidden" name="_subject" value="Poppy Project — company database submission" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  <label className="pp-company__honey" aria-hidden="true"><span>Leave this field empty</span><input name="_honey" tabIndex={-1} autoComplete="off" /></label>
                  <label><span>{c.formFields[0]} *</span><input name="company" required autoComplete="organization" /></label>
                  <label><span>{c.formFields[1]} *</span><input name="email" required type="email" autoComplete="email" /><small className="pp-company__help">{c.formEmailHint}</small></label>
                  <label><span>{c.formFields[2]}</span><input name="website" type="url" placeholder="https://" /></label>
                  <label><span>{c.formFields[3]}</span><input name="activity" type="text" /></label>
                  <label className="pp-company__wide"><span>{c.formFields[4]} *</span><textarea name="description" rows={3} required maxLength={1500} /></label>
                  <label className="pp-company__consent"><input type="checkbox" name="consent" value="yes" required /><span>{c.consent}</span></label>
                  <div className="pp-company__wide"><FluidButton type="submit" disabled={formStatus === "sending"}>{formStatus === "sending" ? c.formSending : c.formButton}<Send size={17} aria-hidden="true" /></FluidButton></div>
                  {formStatus === "success" && <p className="pp-company__wide" role="status">{c.formSuccess}</p>}
                  {formStatus === "error" && <p className="pp-company__wide" role="alert">{c.formError}</p>}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PoppyFooter language={language} showNewsletter decorativeBlooms />
    </div>
  );
}
