import { sitePath } from "@/lib/site-path";

export type EventRegion = "poland" | "europe" | "world" | "online";

export type EventItem = {
  title: string;
  date: string;
  endDate?: string;
  ongoing?: boolean;
  location: string;
  region: EventRegion;
  category: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
};

const eventEntries: EventItem[] = [
  {
    title: "Women TechEU — nabór ciągły",
    date: "2026-06-01T09:00:00+02:00",
    endDate: "2027-06-15T17:00:00+02:00",
    ongoing: true,
    location: "Online · Unia Europejska",
    region: "europe",
    category: "Finansowanie UE",
    description:
      "Ciągły nabór z cotygodniowymi terminami kwalifikacyjnymi dla startupów deep-tech prowadzonych przez kobiety. Program planuje wesprzeć 160 firm, oferując każdej 75 000 EUR finansowania bezzwrotnego, mentoring, matchmaking inwestorski i kontakty z firmami.",
    url: "https://womentecheurope.eu/active-calls/",
    image: "/events/women-techeu.webp",
    imageAlt: "Women TechEU — nabór dla startupów deep-tech prowadzonych przez kobiety"
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
    title: "Women’s Mental Health Is Scaling. Here’s Who Mavida Is Hiring.",
    date: "2026-09-30T14:00:00-04:00",
    endDate: "2026-09-30T14:30:00-04:00",
    location: "Online",
    region: "online",
    category: "Zdrowie psychiczne i kariera",
    description:
      "Spotkanie z Emmą Sugerman, współzałożycielką i COO Mavida Health, o skalowaniu wirtualnej opieki psychicznej dla kobiet i osób na drodze do rodzicielstwa, kulturze organizacji oraz planowanych rekrutacjach.",
    url: "https://luma.com/gnyig3lu",
    image: "/events/mavida-womens-mental-health.webp",
    imageAlt: "Women’s Mental Health Is Scaling — webinar z Emmą Sugerman z Mavida Health",
    imageFit: "contain"
  },
  {
    title: "Women’s Health at Work: Practical Training for HR, Managers & People Leaders",
    date: "2026-10-01T14:00:00+02:00",
    endDate: "2026-10-01T18:30:00+02:00",
    location: "Hilversum, Holandia",
    region: "europe",
    category: "Zdrowie kobiet w pracy",
    description:
      "Praktyczne szkolenie dla osób z HR, kadry zarządzającej i liderów zespołów o wspieraniu zdrowia kobiet w miejscu pracy — od menstruacji i macierzyństwa po menopauzę oraz nowe wytyczne ISO 45010.",
    url: "https://luma.com/h063bi2b",
    image: "/events/womens-health-at-work.webp",
    imageAlt: "Women’s Health at Work — praktyczne szkolenie dla HR, managerów i liderów zespołów"
  },
  {
    title: "Three Women & Me Global Women’s Health Summit",
    date: "2026-10-01T15:00:00+02:00",
    endDate: "2026-10-01T22:00:00+02:00",
    location: "Online",
    region: "online",
    category: "Zdrowie kobiet",
    description:
      "Wirtualny summit poświęcony m.in. menopauzie, hormonom, PCOS, endometriozie, płodności, długowieczności, digital health i innowacjom medycznym.",
    url: "https://www.eventbrite.com/e/three-women-me-online-womens-health-summit-tickets-1997039225081?aff=ebdssbdestsearch",
    image: "/events/three-women-me.webp",
    imageAlt: "Three Women & Me Global Women’s Health Summit — grafika wydarzenia",
    imageFit: "contain"
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
  },
  {
    title: "Giving Women Conference: Reimagining Women’s Health",
    date: "2026-10-06T09:00:00+02:00",
    location: "Genewa + online",
    region: "europe",
    category: "Global health",
    description:
      "Konferencja o zdrowiu kobiet w niedostatecznie zaopiekowanych społecznościach, skierowana do badaczy, funderów i osób pracujących w global health.",
    url: "https://givingwomen.org/conference/",
    image: "/events/giving-women-jogendra-singh.webp",
    imageAlt: "Trzy uśmiechnięte kobiety podczas wspólnego spotkania"
  },
  {
    title: "Śląskie Dni Zdrowia Kobiet 2026",
    date: "2026-10-09T00:00:00+02:00",
    endDate: "2026-10-10T23:59:59+02:00",
    location: "Katowice, Polska",
    region: "poland",
    category: "Wiedza kliniczna",
    description:
      "Dwudniowa konferencja dla lekarzy, diagnostów, pielęgniarek i położnych poświęcona nowoczesnym technologiom w medycynie kobiet, aktualnym standardom leczenia, profilaktyce oraz praktycznym szkoleniom z zakresu ginekologii i położnictwa.",
    url: "https://www.pamis.org/dnizdrowia2026",
    image: "/events/slaskie-dni-zdrowia-kobiet-2026.png",
    imageAlt: "Fundacja PAMIS — Polska Akademia Minimalnie Inwazyjnej Chirurgii",
    imageFit: "contain"
  },
  {
    title: "World Health Summit 2026",
    date: "2026-10-11T09:00:00+02:00",
    endDate: "2026-10-13T18:00:00+02:00",
    location: "Berlin + online",
    region: "europe",
    category: "Global health",
    description:
      "Globalne forum polityki zdrowotnej, innowacji i partnerstw, łączące ekspertów, instytucje, funderów oraz liderów ochrony zdrowia.",
    url: "https://www.worldhealthsummit.org/events/annual-whs/2026",
    image: "/events/women-health-research.webp",
    imageAlt: "Badaczki analizujące wyniki w laboratorium"
  },
  {
    title: "Funding Women’s Health: Where Are the Gaps?",
    date: "2026-10-14T18:00:00+02:00",
    location: "Online",
    region: "online",
    category: "Finansowanie",
    description:
      "Webinar VILDA, Impact Invest i NORA o lukach w finansowaniu zdrowia kobiet, badaniach, startupach oraz roli kapitału publicznego i prywatnego.",
    url: "https://vildanetwork.com/event/vilda-webinar-funding-womens-health-where-are-the-gaps/",
    image: "/events/funding-womens-health-trust-tru-katsande.webp",
    imageAlt: "Badaczka pracująca przy mikroskopie"
  },
  {
    title: "Institute of Women’s Health Virtual Event",
    date: "2026-10-16T09:00:00+02:00",
    endDate: "2026-10-17T17:00:00+02:00",
    location: "Online",
    region: "online",
    category: "Wiedza kliniczna",
    description:
      "Wirtualne wydarzenie kliniczne o zaburzeniach menstruacyjnych, nieprawidłowych krwawieniach z macicy, płodności i niepłodności.",
    url: "https://www.iwhevents.com/october",
    image: "/events/institute-womens-health-online-marketing.webp",
    imageAlt: "Lekarz w białym fartuchu z czerwonym stetoskopem"
  },
  {
    title: "To Poland For Science",
    date: "2026-10-19T09:00:00+02:00",
    location: "Warszawa, Polska",
    region: "poland",
    category: "Nauka i innowacje",
    description:
      "Jednodniowe wydarzenie poświęcone dobrostanowi oraz budowaniu zdrowej i odpornej społeczności naukowej w Polsce i za granicą.",
    url: "https://poloniumfoundation.org/to-poland-for-science",
    image: "/events/to-poland-for-science.png",
    imageAlt: "Pałac Kultury i Nauki — grafika wydarzenia To Poland For Science"
  },
  {
    title: "EIC Accelerator — batching date",
    date: "2026-11-04T17:00:00+01:00",
    location: "Online · Unia Europejska",
    region: "europe",
    category: "Finansowanie UE",
    description:
      "Termin złożenia pełnego wniosku dla firm z sektora healthtech i deep-tech, które otrzymały GO na etapie short proposal.",
    url: "https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en",
    image: "/events/european-commission.webp",
    imageAlt: "EIC Accelerator — program finansowania Komisji Europejskiej",
    imageFit: "contain"
  },
  {
    title: "Horizon Europe Cluster 1 Health Brokerage Event",
    date: "2026-11-24T09:00:00+01:00",
    endDate: "2026-11-25T17:00:00+01:00",
    location: "Online",
    region: "online",
    category: "Finansowanie UE",
    description:
      "Spotkania matchmakingowe, prezentacje projektów i poszukiwanie partnerów do konsorcjów przygotowujących wnioski w konkursach Horizon Europe Health 2027.",
    url: "https://hadea.ec.europa.eu/events/brokerage-event-horizon-europe-cluster-1-health-2026-11-24_en",
    image: "/events/european-commission.webp",
    imageAlt: "Logo Komisji Europejskiej",
    imageFit: "contain"
  },
  {
    title: "Life Science Open Space",
    date: "2026-11-26T09:00:00+01:00",
    endDate: "2026-11-27T17:30:00+01:00",
    location: "Kraków, Polska",
    region: "poland",
    category: "Life Science",
    description:
      "Forum współpracy łączące naukę, biznes, ochronę zdrowia, inwestorów i administrację wokół innowacji w obszarze life science.",
    url: "https://lsos.info/",
    image: "/events/life-science-open-space.png",
    imageAlt: "Life Science Open Space 2026 — grafika wydarzenia"
  },
  {
    title: "Horizon Europe Cluster 1 Health Info Day",
    date: "2026-11-26T09:00:00+01:00",
    location: "Online",
    region: "online",
    category: "Finansowanie UE",
    description:
      "Dzień informacyjny Komisji Europejskiej o konkursach Horizon Europe Health 2027, obejmujących technologie medyczne, rozwiązania cyfrowe i systemy zdrowia.",
    url: "https://hadea.ec.europa.eu/events/horizon-europe-info-days-cluster-1-health-2026-11-26_en",
    image: "/events/european-commission.webp",
    imageAlt: "Logo Komisji Europejskiej",
    imageFit: "contain"
  },
  {
    title: "Women's Health Europe Forum",
    date: "2026-11-27T09:00:00+01:00",
    endDate: "2026-11-27T18:00:00+01:00",
    location: "Paryż, Francja",
    region: "europe",
    category: "FemTech i innowacje",
    description:
      "Pierwsze forum Unii Europejskiej poświęcone innowacjom w zdrowiu kobiet, łączące founderów, inwestorów, naukowców i instytucje.",
    url: "https://www.womenshealtheuropeforum.eu/",
    image: "/events/womens-health-europe-forum.webp",
    imageAlt: "Women's Health Europe Forum 2026 w Paryżu — oficjalna grafika wydarzenia"
  },
  {
    title: "MEDmeetsTECH",
    date: "2026-12-03T09:30:00+01:00",
    location: "Warszawa + livestream",
    region: "poland",
    category: "MedTech",
    description:
      "Konferencja łącząca medycynę, naukę i biznes wokół cyfrowego zdrowia, wdrożeń MedTech oraz rozwiązań dla pacjentów.",
    url: "https://medmeetstech.com/mmt22",
    image: "/events/medmeetstech.png",
    imageAlt: "MEDmeetsTECH — grafika wydarzenia"
  },
  {
    title: "Women TechEU — kolejna runda full proposal",
    date: "2027-01-14T17:00:00+01:00",
    location: "Online · Unia Europejska",
    region: "europe",
    category: "Finansowanie UE",
    description:
      "Najbliższy termin pełnego wniosku dla firm, które pozytywnie przeszły etap kwalifikacyjny Women TechEU. Kolejne rundy zaplanowano na 1 kwietnia i 8 lipca 2027.",
    url: "https://womentecheurope.eu/active-calls/",
    image: "/events/women-techeu.webp",
    imageAlt: "Women TechEU — runda pełnych wniosków"
  },
  {
    title: "GatherVerse Women’s Health Summit 2027",
    date: "2027-03-09T15:00:00+01:00",
    endDate: "2027-03-10T22:00:00+01:00",
    location: "Online",
    region: "online",
    category: "FemTech i AI",
    description:
      "Globalny wirtualny summit łączący zdrowie kobiet, AI, technologię i innowacje dla medyków, badaczy, innowatorów, decydentów i organizacji społecznych.",
    url: "https://gatherverse.org/whs2027/",
    image: "/events/gatherverse-womens-health.webp",
    imageAlt: "GatherVerse Women’s Health Summit 2027 — grafika wydarzenia",
    imageFit: "contain"
  },
  {
    title: "Mayo Clinic Women’s Health Update",
    date: "2027-03-11T08:00:00-07:00",
    endDate: "2027-03-13T17:00:00-07:00",
    location: "Arizona + livestream",
    region: "world",
    category: "Wiedza kliniczna",
    description:
      "Kliniczna konferencja Mayo Clinic o menopauzie, zdrowiu seksualnym, zdrowiu piersi i długowieczności, dostępna również w transmisji online.",
    url: "https://ce.mayo.edu/content/23rd-annual-womens-health-update",
    image: "/events/mayo-clinic-emma-simpson.webp",
    imageAlt: "Kobieta podczas spaceru na świeżym powietrzu"
  },
  {
    title: "EIC Pre-Accelerator 2027 — otwarcie naboru",
    date: "2027-05-05T09:00:00+02:00",
    endDate: "2027-11-18T17:00:00+01:00",
    location: "Online · Unia Europejska",
    region: "europe",
    category: "Finansowanie UE",
    description:
      "Nabór dla startupów deep-tech na poziomie TRL 4–6 z krajów widening, w tym Polski. Planowane granty wynoszą od 500 000 do 1 mln EUR.",
    url: "https://eic.ec.europa.eu/eic-funding-opportunities/eic-pre-accelerator_en",
    image: "/events/european-commission.webp",
    imageAlt: "EIC Pre-Accelerator — program finansowania Komisji Europejskiej",
    imageFit: "contain"
  }
];

export const events: EventItem[] = eventEntries.map(event => ({
  ...event,
  image: event.image ? sitePath(event.image) : undefined
}));
