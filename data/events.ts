export type EventRegion = "poland" | "europe" | "world" | "online";

export type EventItem = {
  title: string;
  date: string;
  endDate?: string;
  location: string;
  region: EventRegion;
  category: string;
  description: string;
  url: string;
  image: string;
  imageAlt: string;
};

export const events: EventItem[] = [
  {
    title: "Warsaw Medical Expo",
    date: "2026-09-15T09:00:00+02:00",
    endDate: "2026-09-17T16:00:00+02:00",
    location: "Nadarzyn, Polska",
    region: "poland",
    category: "Kalendarz rynku",
    description:
      "Targi i spotkania branżowe dla osób śledzących rozwój technologii medycznych, diagnostyki i opieki zdrowotnej.",
    url: "https://warsawmedicalexpo.com/en/registration/",
    image: "/events/warsaw-medical-expo.webp",
    imageAlt: "Warsaw Medical Expo logo"
  },
  {
    title: "WHH London Autumn Summit",
    date: "2026-09-22T09:00:00+02:00",
    location: "London, UK",
    region: "europe",
    category: "Kalendarz rynku",
    description:
      "Międzynarodowe spotkanie poświęcone innowacjom, inwestycjom i partnerstwom w zdrowiu kobiet.",
    url: "https://whhwomenshealthhorizons.com/events/london-sep-2026",
    image: "/events/whh-london.webp",
    imageAlt: "Panorama Londynu"
  },
  {
    title: "Global Congress on Women's Health, Hormones & Reproductive Medicine 2026",
    date: "2026-09-24T08:00:00+02:00",
    endDate: "2026-09-25T16:00:00+02:00",
    location: "Kraków, Polska",
    region: "poland",
    category: "Kalendarz rynku",
    description:
      "Program konferencyjny wokół zdrowia kobiet, hormonów, reprodukcji i nowych modeli opieki.",
    url: "https://sciratorconferences.com/womens-health-2026/",
    image: "/events/global-congress.webp",
    imageAlt: "Global Congress on Women's Health event artwork"
  },
  {
    title: "Women in Tech Europe Summit & Awards 2026",
    date: "2026-09-28T13:30:00+02:00",
    location: "Bruksela, Belgia",
    region: "europe",
    category: "Kalendarz rynku",
    description:
      "Europejskie wydarzenie łączące liderki technologii, inwestorki, founderki i partnerów ekosystemowych.",
    url: "https://luma.com/maxnfvwe",
    image: "/events/women-in-tech.webp",
    imageAlt: "Women in Tech Europe Awards artwork"
  },
  {
    title: "Women's Health Week",
    date: "2026-10-06T08:00:00+02:00",
    endDate: "2026-10-07T17:00:00+02:00",
    location: "London, UK",
    region: "europe",
    category: "Kalendarz rynku",
    description:
      "Tydzień poświęcony zdrowiu kobiet, profilaktyce, opiece klinicznej oraz kierunkom rozwoju rynku.",
    url: "https://womenshealthweek.com/whw-europe",
    image: "/events/womens-health-week.webp",
    imageAlt: "Women's Health Week Europe event artwork"
  }
];
