import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { events } from "@/data/events";
import { Reveal } from "@/components/motion/Reveal";

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  day: "2-digit",
  month: "short"
});

const yearFormatter = new Intl.DateTimeFormat("pl-PL", {
  year: "numeric"
});

function formatDate(date: string, endDate?: string) {
  const start = new Date(date);
  const startLabel = dateFormatter.format(start);
  const year = yearFormatter.format(start);

  if (!endDate) {
    return { day: startLabel, year };
  }

  return {
    day: `${startLabel} - ${dateFormatter.format(new Date(endDate))}`,
    year
  };
}

export function EventsSection() {
  return (
    <section className="section events-section" id="wydarzenia" aria-labelledby="events-title">
      <div className="container events-section__inner">
        <Reveal className="events-section__intro">
          <p className="section-kicker">Nadchodzące wydarzenia</p>
          <h2 className="section-title" id="events-title">
            Miejsca, w których wiedza staje się relacją.
          </h2>
          <p className="section-lede">
            Śledzimy najważniejsze wydarzenia FemTech, HealthTech oraz innowacji
            w zdrowiu kobiet w Polsce, Europie i na świecie.
          </p>
        </Reveal>

        <div className="events-list">
          {events.map((event, index) => {
            const date = formatDate(event.date, event.endDate);

            return (
              <Reveal key={event.title} delay={index * 0.05}>
                <article className="event-row">
                  <div className="event-row__date" aria-label={`Data wydarzenia: ${date.day} ${date.year}`}>
                    <strong>{date.day}</strong>
                    <span>{date.year}</span>
                  </div>
                  <div className="event-row__body">
                    <span className="event-row__category">{event.category}</span>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <div className="event-row__meta">
                      <span>
                        <MapPin size={15} aria-hidden="true" />
                        {event.location}
                      </span>
                      <span>
                        <CalendarDays size={15} aria-hidden="true" />
                        Aktualny kalendarz
                      </span>
                    </div>
                  </div>
                  <a className="event-row__link" href={event.url} target="_blank" rel="noreferrer">
                    <span>Otwórz</span>
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
