export type EventItem = {
  title: string;
  date: string;
  endDate?: string;
  location: string;
  category: string;
  description: string;
  url: string;
};

export const events: EventItem[] = [
  {
    title: "Warsaw Medical Expo",
    date: "2026-09-15T09:00:00+02:00",
    endDate: "2026-09-17T16:00:00+02:00",
    location: "Nadarzyn, Polska",
    category: "Kalendarz rynku",
    description:
      "Wydarzenie z aktualnego kalendarza FemTech po Polsku; link prowadzi do rejestracji organizatora.",
    url: "https://warsawmedicalexpo.com/en/registration/"
  },
  {
    title: "WHH London Autumn Summit",
    date: "2026-09-22T09:00:00+02:00",
    location: "London, UK",
    category: "Kalendarz rynku",
    description:
      "Wydarzenie z aktualnego kalendarza FemTech po Polsku; link prowadzi do strony organizatora.",
    url: "https://whhwomenshealthhorizons.com/events/london-sep-2026"
  },
  {
    title: "Global Congress on Women's Health, Hormones & Reproductive Medicine 2026",
    date: "2026-09-24T08:00:00+02:00",
    endDate: "2026-09-25T16:00:00+02:00",
    location: "Lokalizacja organizatora",
    category: "Kalendarz rynku",
    description:
      "Wydarzenie z aktualnego kalendarza FemTech po Polsku; link prowadzi do strony organizatora.",
    url: "https://sciratorconferences.com/womens-health-2026/"
  },
  {
    title: "Women in Tech Europe Summit & Awards 2026",
    date: "2026-09-28T13:30:00+02:00",
    location: "Bruksela, Belgia",
    category: "Kalendarz rynku",
    description:
      "Wydarzenie z aktualnego kalendarza FemTech po Polsku; link prowadzi do strony wydarzenia.",
    url: "https://luma.com/maxnfvwe"
  },
  {
    title: "Women's Health Week",
    date: "2026-10-06T08:00:00+02:00",
    endDate: "2026-10-07T17:00:00+02:00",
    location: "London, UK",
    category: "Kalendarz rynku",
    description:
      "Wydarzenie z aktualnego kalendarza FemTech po Polsku; link prowadzi do strony organizatora.",
    url: "https://womenshealthweek.com/whw-europe"
  }
];
