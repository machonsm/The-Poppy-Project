import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { EventItem } from "@/data/events";
import "./poppy-events.css";

const englishLocations: Record<string, string> = {
  "Nadarzyn, Polska": "Nadarzyn, Poland",
  "Poznań, Polska": "Poznań, Poland",
  "Kraków, Polska": "Kraków, Poland",
  "Bruksela, Belgia": "Brussels, Belgium",
  "Genewa + online": "Geneva + online",
  "Berlin + online": "Berlin + online",
  "Paryż, Francja": "Paris, France",
  "Warszawa, Polska": "Warsaw, Poland",
  "Warszawa + livestream": "Warsaw + livestream",
  "Online · Unia Europejska": "Online · European Union",
  "Lokalizacja organizatora": "See organiser’s location"
};

type PoppyEventListProps = {
  events: EventItem[];
  language: "pl" | "en";
  openLabel: string;
};

export function PoppyEventList({ events, language, openLabel }: PoppyEventListProps) {
  const locale = language === "pl" ? "pl-PL" : "en-GB";
  const dateOptions: Intl.DateTimeFormatOptions = { timeZone: "Europe/Warsaw" };
  const fullDate = new Intl.DateTimeFormat(locale, {
    ...dateOptions, day: "numeric", month: "long", year: "numeric"
  });

  return (
    <div className="pp-event-list">
      <div className="pp-events__labels" aria-hidden="true">
        <span>{language === "pl" ? "Data" : "Date"}</span>
        <span>{language === "pl" ? "Wydarzenie" : "Event"}</span>
        <span>{language === "pl" ? "Miejsce" : "Location"}</span>
        <span>↗</span>
      </div>
      {events.map((event) => {
        const start = new Date(event.date);
        const end = event.endDate ? new Date(event.endDate) : null;
        const dateRange = end ? fullDate.formatRange(start, end) : fullDate.format(start);
        const location = language === "en" ? englishLocations[event.location] ?? event.location : event.location;
        const newTab = language === "pl" ? "Otwiera się w nowej karcie" : "Opens in a new tab";

        return (
          <a
            className="pp-event"
            key={`${event.url}-${event.date}`}
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={openLabel + ": " + event.title + ". " + dateRange + ". " + location + ". " + newTab + "."}
          >
            <time className="pp-event__date" dateTime={event.date} aria-label={dateRange}>
              {event.ongoing ? <>
                <strong aria-hidden="true">{language === "pl" ? "Trwa" : "Open"}</strong>
                <span aria-hidden="true">{language === "pl" ? "do" : "until"}<br />{(end ?? start).toLocaleDateString(locale, { ...dateOptions, year: "numeric" })}</span>
              </> : <>
                <strong aria-hidden="true">{start.toLocaleDateString(locale, { ...dateOptions, day: "2-digit" })}</strong>
                <span aria-hidden="true">{start.toLocaleDateString(locale, { ...dateOptions, month: "short" })}<br />{start.toLocaleDateString(locale, { ...dateOptions, year: "numeric" })}</span>
              </>}
            </time>
            <div className="pp-event__body">
              <h3>{event.title}</h3>
              <span>{location}</span>
            </div>
            <span className="pp-event__location">{location}</span>
            <span className="pp-event__arrow" aria-hidden="true"><ArrowUpRight size={21} /></span>
            <span className="pp-event__preview" aria-hidden="true">
              {event.image ? <Image className={event.imageFit === "contain" ? "pp-event__preview-image--contain" : undefined} src={event.image} alt="" width={490} height={354} sizes="245px" /> : <span className="pp-event__preview-fallback"><small>{event.category}</small><strong>{event.title}</strong></span>}
            </span>
          </a>
        );
      })}
    </div>
  );
}
