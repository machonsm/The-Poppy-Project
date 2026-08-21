import { Instagram, Linkedin, Mail, Music2, NotebookText } from "lucide-react";
import { links } from "@/data/links";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { navItems } from "@/data/navigation";

const socialLinks = [
  { label: "Instagram", href: links.instagram, icon: Instagram },
  { label: "LinkedIn", href: links.linkedin, icon: Linkedin },
  { label: "Substack", href: links.substack, icon: NotebookText },
  { label: "Spotify", href: links.spotify, icon: Music2 }
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <BrandLogo tone="light" />
          <p>
            Polska platforma innowacji w zdrowiu kobiet. Łączymy polski ekosystem
            z europejską i globalną społecznością zdrowia kobiet i FemTech.
          </p>
        </div>

        <div className="footer__columns">
          <div>
            <h2>Nawigacja</h2>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Kontakt</h2>
            <ul>
              <li>
                <a href={links.contact}>
                  <Mail size={15} aria-hidden="true" />
                  Formularz kontaktowy
                </a>
              </li>
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noreferrer">
                    <Icon size={15} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© 2026 The Poppy Project. Wszystkie prawa zastrzeżone.</p>
        <div>
          <a href={links.contact}>Kontakt</a>
          <span aria-hidden="true">·</span>
          <a href={links.oldEventsPage}>Archiwum wydarzeń</a>
        </div>
      </div>
    </footer>
  );
}
