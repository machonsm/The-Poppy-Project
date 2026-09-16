"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedBiography } from "@/components/AnimatedBiography";
import { PoppyFooter, PoppyHeader, type PoppyLanguage } from "@/components/PoppyChrome";
import { PoppyMark } from "@/components/brand/PoppyMark";
import { links } from "@/data/links";

const aboutCopy = {
  pl: {
    eyebrow: "O nas",
    title: <>Dwie perspektywy.<br />Jeden wspólny <em>kierunek.</em></>,
    intro: "Połączyła nas pasja do FemTechu i przekonanie, że przyszłość zdrowia kobiet powstaje dzięki wiedzy, odwadze i współpracy.",
    scroll: "Poznaj nas",
    storyLabel: "Dlaczego Poppy Project",
    storyTitle: <>Łączymy polski FemTech<br />z <em>szerszym światem.</em></>,
    story: [
      "The Poppy Project łączy polski ekosystem zdrowia kobiet z europejską i globalną społecznością FemTech. Działamy na styku biznesu, wiedzy i relacji.",
      "Mapujemy rynek, tłumaczymy badania i trendy oraz tworzymy połączenia między osobami rozwijającymi innowacje, medycyną, nauką, inwestorami i partnerami instytucjonalnymi."
    ],
    teamLabel: "Zespół",
    teamTitle: <>Poznaj osoby,<br />które tworzą <em>Poppy.</em></>,
    team: [
      { name: "Karolina Frątczak", image: "karolina-fratczak", role: "Analizy i inwestycje", bio: "Konsultantka z doświadczeniem analitycznym i komercyjnym. Autorka pierwszego europejskiego raportu o FemTech, przygotowanego z Sie Ventures, gdzie wspiera inwestycje w firmy prowadzone przez kobiety." },
      { name: "Sandra Machoń", image: "sandra-machon", role: "Dane i technologie", bio: "Data Scientist i pasjonatka FemTechu. W Elvie pracowała z danymi, rozwijała algorytmy i zdobywała doświadczenie w technologiach wspierających zdrowie kobiet." }
    ],
    contactLabel: "Zróbmy coś razem",
    contactTitle: <>Masz pomysł?<br /><em>Porozmawiajmy.</em></>,
    contactAction: "Napisz do nas"
  },
  en: {
    eyebrow: "About us",
    title: <>Two perspectives.<br />One shared <em>direction.</em></>,
    intro: "A passion for FemTech brought us together, along with a belief that the future of women’s health grows through knowledge, courage and collaboration.",
    scroll: "Meet us",
    storyLabel: "Why Poppy Project",
    storyTitle: <>Connecting Polish FemTech<br />with the <em>wider world.</em></>,
    story: [
      "The Poppy Project connects Poland’s women’s health ecosystem with the European and global FemTech community. We work where business, knowledge and relationships meet.",
      "We map the market, translate research and trends, and create connections between innovators, clinicians, scientists, investors and institutional partners."
    ],
    teamLabel: "The team",
    teamTitle: <>Meet the people<br />behind <em>Poppy.</em></>,
    team: [
      { name: "Karolina Frątczak", image: "karolina-fratczak", role: "Research & investment", bio: "A consultant with analytical and commercial experience. She authored the first European FemTech report with Sie Ventures, where she supports investment in women-led companies." },
      { name: "Sandra Machoń", image: "sandra-machon", role: "Data & technology", bio: "A Data Scientist passionate about FemTech. At Elvie, she worked with data, developed algorithms and gained experience in women’s health technology." }
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
        <section className="pp-about-page__hero" aria-labelledby="about-page-title">
          <div className="pp-container pp-about-page__hero-grid">
            <div>
              <p className="pp-eyebrow">{c.eyebrow}</p>
              <h1 id="about-page-title">{c.title}</h1>
              <p className="pp-about-page__lede">{c.intro}</p>
              <a className="pp-text-link" href="#zespol">{c.scroll}<ArrowDownRight size={18} /></a>
            </div>
            <div className="pp-about-page__mark" aria-hidden="true"><span /><PoppyMark /></div>
          </div>
        </section>

        <section className="pp-about-page__story pp-section">
          <div className="pp-container pp-about-page__story-grid">
            <div><p className="pp-eyebrow">{c.storyLabel}</p><h2>{c.storyTitle}</h2></div>
            <div>{c.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
        </section>

        <section className="pp-about-page__team pp-section" id="zespol" aria-labelledby="team-title">
          <div className="pp-container">
            <div className="pp-section-heading"><p className="pp-eyebrow">{c.teamLabel}</p><h2 id="team-title">{c.teamTitle}</h2></div>
            <div className="pp-team">
              {c.team.map(person => <article className={`pp-team__person pp-team__person--${person.image}`} key={person.image}>
                <div className="pp-team__portrait"><Image src={`/team/${person.image}.png`} alt={person.name} width={person.image === "karolina-fratczak" ? 455 : 634} height={person.image === "karolina-fratczak" ? 446 : 634} sizes="(max-width: 650px) 90vw, 360px" /></div>
                <AnimatedBiography name={person.name} role={person.role} bio={person.bio} />
              </article>)}
            </div>
          </div>
        </section>

        <section className="pp-about-page__contact pp-section">
          <div className="pp-container"><div><p className="pp-eyebrow">{c.contactLabel}</p><h2>{c.contactTitle}</h2></div><a className="pp-button" href={`mailto:${links.email}`}>{c.contactAction}<ArrowUpRight size={19} /></a></div>
        </section>
      </main>
      <PoppyFooter language={language} />
    </div>
  );
}
