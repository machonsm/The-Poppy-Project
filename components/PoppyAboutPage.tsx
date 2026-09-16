"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedBiography } from "@/components/AnimatedBiography";
import { PoppyFooter, PoppyHeader, type PoppyLanguage } from "@/components/PoppyChrome";
import { links } from "@/data/links";
import { FluidLink } from "@/components/ui/FluidButton";

// Content from the original PL/EN About pages at femtechpo.pl,
// with the project name updated to the current Poppy Project brand.
const aboutCopy = {
  pl: {
    eyebrow: "O nas",
    title: "Co robimy?",
    intro: "Poppy Project przyspiesza innowacje w zdrowiu kobiet, budując otwarty, współpracujący ekosystem.",
    story: [
      "Łączymy założycieli, inwestorów i ekspertów, udostępniając zasoby, granty oraz listy inwestorów wspierających zdrowie kobiet i FemTech w Polsce i Europie Środkowo-Wschodniej.",
      "Wzmacniamy głosy liderek i innowatorek, wspierając rozwój technologii poprawiających zdrowie kobiet."
    ],
    teamTitle: "Kim jesteśmy?",
    teamIntro: "Połączyła nas pasja do rozwijającego się rynku FemTech i jego roli w zdrowiu kobiet. Obydwie jesteśmy aktywnie zaangażowane w tym środowisku i chcemy użyć naszej wiedzy, aby przyspieszyć rozwój rynku i społeczności FemTech w Polsce.",
    team: [
      { name: "Karolina Frątczak", image: "karolina-fratczak", role: "Analizy i inwestycje", bio: "Konsultantka z zapleczem analitycznym i komercyjnym. Autorka pierwszego europejskiego raportu o FemTech, stworzonego we współpracy z Sie Ventures, gdzie wspiera proces inwestycyjny w firmy prowadzone przez kobiety." },
      { name: "Sandra Machoń", image: "sandra-machon", role: "Dane i technologie", bio: "Data Scientist i pasjonatka FemTechu. Posiada doświadczenie z pracy w femtechowym start-upie Elvie, gdzie zajmowała się danymi, tworzeniem algorytmów i technologiami zdrowotnymi." }
    ],
    contactLabel: "Zróbmy coś razem",
    contactTitle: <>Masz pomysł?<br /><em>Porozmawiajmy.</em></>,
    contactAction: "Napisz do nas"
  },
  en: {
    eyebrow: "About us",
    title: "What do we do?",
    intro: "Poppy Project accelerates innovation in women’s health by building an open and collaborative ecosystem.",
    story: [
      "We connect founders, investors and experts, sharing resources, grants, and investor lists that support women’s health and FemTech across Poland and Central & Eastern Europe.",
      "We amplify the voices of women leaders and innovators, supporting the growth of technologies that improve women’s health."
    ],
    teamTitle: "Who are we?",
    teamIntro: "We’re united by a shared passion for the growing FemTech market and its role in women’s health. Both of us are actively involved in this space, and we want to use our knowledge to accelerate the development of the FemTech market and community in Poland.",
    team: [
      { name: "Karolina Frątczak", image: "karolina-fratczak", role: "Research & investment", bio: "A consultant with an analytical and commercial background. Author of the first European report on FemTech, created in collaboration with Sie Ventures, where she supports the investment process for women-led companies." },
      { name: "Sandra Machoń", image: "sandra-machon", role: "Data & technology", bio: "A data scientist and FemTech enthusiast. She has experience working at the FemTech startup Elvie, where she focused on data, algorithm development, and health technologies." }
    ],
    contactLabel: "Let’s build something together",
    contactTitle: <>Have an idea?<br /><em>Let’s talk.</em></>,
    contactAction: "Write to us"
  }
};

export function PoppyAboutPage() {
  const [language, setLanguage] = useState<PoppyLanguage>("pl");
  const c = aboutCopy[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="pp-site pp-about-page">
      <PoppyHeader language={language} onLanguageChange={setLanguage} />
      <main id="main-content">
        <section className="pp-about-page__story pp-section" aria-labelledby="about-page-title">
          <div className="pp-container pp-about-page__story-grid">
            <div>
              <p className="pp-eyebrow">{c.eyebrow}</p>
              <h1 id="about-page-title">{c.title}</h1>
              <p className="pp-about-page__lede">{c.intro}</p>
            </div>
            <div className="pp-about-page__mission">{c.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
        </section>

        <section className="pp-about-page__team pp-section" id="zespol" aria-labelledby="team-title">
          <div className="pp-container">
            <div className="pp-section-heading"><h2 id="team-title">{c.teamTitle}</h2><p className="pp-about-page__team-intro">{c.teamIntro}</p></div>
            <div className="pp-team">
              {c.team.map(person => <article className={`pp-team__person pp-team__person--${person.image}`} key={person.image}>
                <div className="pp-team__portrait"><Image src={`/team/${person.image}.png`} alt={person.name} width={person.image === "karolina-fratczak" ? 455 : 634} height={person.image === "karolina-fratczak" ? 446 : 634} sizes="(max-width: 650px) 90vw, 360px" /></div>
                <AnimatedBiography name={person.name} role={person.role} bio={person.bio} />
              </article>)}
            </div>
          </div>
        </section>

        <section className="pp-about-page__contact pp-section">
          <div className="pp-container"><div><p className="pp-eyebrow">{c.contactLabel}</p><h2>{c.contactTitle}</h2></div><FluidLink href={`mailto:${links.email}`}>{c.contactAction}<ArrowUpRight size={19} aria-hidden="true" /></FluidLink></div>
        </section>
      </main>
      <PoppyFooter language={language} />
    </div>
  );
}
