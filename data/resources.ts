// Text and original links migrated from femtechpo.pl/pl/materiay and /en/resources.
// Descriptions are the project's editorial copy, not independently verified report findings.
import { sitePath } from "@/lib/site-path";

export type ResourceCategory = "poland" | "global";
export type PoppyResource = {
  id: string;
  hidden?: boolean;
  category: ResourceCategory;
  publisher: string;
  cover: { src: string; width: number; height: number; source: string; position?: string; fit?: "contain"; background?: string };
  href: { pl: string; en: string };
  title: { pl: string; en: string };
  description: { pl: string; en: string };
};

const resourceEntries: PoppyResource[] = [
  {
    "id": "report-1",
    "cover": {
      "src": "/resources/covers/piersi-w-polsce-2026.webp",
      "width": 1920,
      "height": 1080,
      "source": "https://sexed.pl/projects/dlaczego-polki-odkladaja-badania-piersi-raport-nie-mam-czasu-na-raka/"
    },
    "category": "poland",
    "publisher": "SEXEDPL · Ipsos",
    "href": {
      "pl": "https://sexed.pl/projects/dlaczego-polki-odkladaja-badania-piersi-raport-nie-mam-czasu-na-raka/",
      "en": "https://sexed.pl/projects/dlaczego-polki-odkladaja-badania-piersi-raport-nie-mam-czasu-na-raka/"
    },
    "title": {
      "pl": "Piersi w Polsce: Nie mam czasu na raka",
      "en": "Breast Health in Poland: I Don’t Have Time for Cancer"
    },
    "description": {
      "pl": "Raport o profilaktyce raka piersi i barierach między świadomością a wykonywaniem mammografii. Pokazuje, dlaczego Polki odkładają badania mimo wiedzy o ich znaczeniu, oraz wskazuje rozwiązania wspierające udział w profilaktyce.",
      "en": "A report on breast cancer prevention and the gap between awareness and mammography uptake. It examines why women in Poland postpone screening despite understanding its importance and identifies ways to improve participation in preventive care."
    }
  },
  {
    "id": "report-2026-objawy-w-sieci",
    "cover": {
      "src": "/resources/covers/objawy-w-sieci-2026.png",
      "position": "50% 0%",
      "width": 1191,
      "height": 1684,
      "source": "https://www.santanderconsumer.pl/files/pdf/20260413-Raport-Objawy-w-sieci-Biustowniczki-2026.pdf"
    },
    "category": "poland",
    "publisher": "Santander Consumer Bank · Biustowniczki",
    "href": {
      "pl": "https://www.santanderconsumer.pl/files/pdf/20260413-Raport-Objawy-w-sieci-Biustowniczki-2026.pdf",
      "en": "https://www.santanderconsumer.pl/files/pdf/20260413-Raport-Objawy-w-sieci-Biustowniczki-2026.pdf"
    },
    "title": {
      "pl": "Objawy w sieci 2026",
      "en": "Symptoms Online 2026"
    },
    "description": {
      "pl": "Raport o tym, jak Polki szukają informacji o zdrowiu w internecie. Analizuje diagnozowanie online, wiarygodność źródeł, dezinformację zdrowotną oraz wpływ treści z sieci na decyzje dotyczące konsultacji i leczenia.",
      "en": "A report on how women in Poland search for health information online. It examines online self-diagnosis, source credibility, health misinformation, and how digital content shapes decisions about medical consultations and treatment."
    }
  },
  {
    "id": "report-2",
    "cover": {
      "src": "/resources/covers/report-2.png",
      "position": "50% 0%",
      "width": 583,
      "height": 778,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/c5aa5982-bd44-4156-b053-21febf778cb8/Screenshot+2025-11-13+172958.png"
    },
    "category": "poland",
    "publisher": "Kulczyk Foundation · Founders Pledge",
    "href": {
      "pl": "https://kulczykfoundation.org.pl/menstruacja/badania/Ubostwo_Menstruacyjne_Czym_Jest_I_Jak_Z_Nim_Walczyc_Miedzynarodowy_Raport",
      "en": "https://kulczykfoundation.org.pl/menstruacja/badania/Ubostwo_Menstruacyjne_Czym_Jest_I_Jak_Z_Nim_Walczyc_Miedzynarodowy_Raport"
    },
    "title": {
      "pl": "Krwawy Problem Ubóstwo Menstruacyjne",
      "en": "Krwawy Problem Ubóstwo Menstruacyjne"
    },
    "description": {
      "pl": "Raport przygotowany przez Kulczyk Foundation we współpracy z Founders Pledge analizuje globalny problem ograniczonego dostępu do środków higieny menstruacyjnej.",
      "en": "Prepared by the Kulczyk Foundation in cooperation with Founders Pledge, this report analyzes the global issue of limited access to menstrual hygiene products."
    }
  },
  {
    "id": "report-3",
    "cover": {
      "src": "/resources/covers/report-3.png",
      "width": 560,
      "height": 420,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/f5e51342-8c7a-4181-b0cc-717b12282ec4/Screenshot+2025-11-13+164252.png"
    },
    "category": "poland",
    "publisher": "SEXEDPL · DOZ.pl",
    "href": {
      "pl": "https://sexed.pl/projects/narodowa-kartkowka-z-wdz/",
      "en": "https://sexed.pl/projects/narodowa-kartkowka-z-wdz/"
    },
    "title": {
      "pl": "Narodowa Kartkówka z WDŻ.",
      "en": "Narodowa Kartkówka z WDŻ."
    },
    "description": {
      "pl": "Raport Narodowa kartkówka z WDŻ przygotowany przez Fundację SEXEDPL i portal DOZ.pl to ogólnopolskie badanie diagnozujące stan wiedzy Polek i Polaków na temat seksualności i edukacji seksualnej. Publikacja pokazuje, że choć większość respondentów ocenia swoją wiedzę wysoko, rzeczywiste wyniki testu ujawniają poważne braki — jedynie 16% osób uzyskało dobrą lub bardzo dobrą ocenę.",
      "en": "The National Knowledge Test on Sexual Education report, prepared by the SEXEDPL Foundation and DOZ.pl, is a nationwide study assessing the knowledge of Polish women and men about sexuality and sex education. While most respondents rated their knowledge highly, test results revealed significant gaps — only 16% achieved a good or very good score."
    }
  },
  {
    "id": "report-4",
    "cover": {
      "src": "/resources/covers/report-4.png",
      "width": 629,
      "height": 471,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/605475dd-9c72-4a3b-92dd-d6605773f5bd/Screenshot+2025-11-13+164231.png"
    },
    "category": "poland",
    "publisher": "Kulczyk Foundation",
    "href": {
      "pl": "https://kulczykfoundation.org.pl/menopauza/badania/Menopauza_Bez_Tabu_Pierwsze_W_Polsce_Kompleksowe_Badanie_Dotyczace_Menopauzy",
      "en": "https://kulczykfoundation.org.pl/menopauza/badania/Menopauza_Bez_Tabu_Pierwsze_W_Polsce_Kompleksowe_Badanie_Dotyczace_Menopauzy"
    },
    "title": {
      "pl": "Menopauza bez tabu",
      "en": "Menopauza bez tabu"
    },
    "description": {
      "pl": "Raport Menopauza bez tabu to kompleksowe badanie społeczne zrealizowane na zlecenie Kulczyk Foundation, dotyczące doświadczeń, wiedzy i postaw Polek i Polaków wobec menopauzy. Publikacja omawia temat w wymiarze biologiczno-medycznym, społecznym i kulturowym, pokazując, że menopauza wciąż pozostaje tematem tabu.",
      "en": "The report Menopause Without Taboos is a comprehensive social study commissioned by the Kulczyk Foundation, examining the experiences, knowledge, and attitudes of Polish women and men toward menopause. The publication discusses the topic from biological-medical, social, and cultural perspectives, showing that menopause still remains a taboo subject."
    }
  },
  {
    "id": "report-5",
    "cover": {
      "src": "/resources/covers/report-5.png",
      "position": "50% 100%",
      "width": 546,
      "height": 728,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/668fd730-2b9d-4be2-b722-40b1db24c38b/Screenshot+2025-11-13+173400.png"
    },
    "category": "poland",
    "publisher": "Supesu",
    "href": {
      "pl": "https://www.supesu.pl/blog/czerwony-raport-2025",
      "en": "https://www.supesu.pl/blog/czerwony-raport-2025"
    },
    "title": {
      "pl": "Czerwony Raport 2025",
      "en": "Czerwony Raport 2025"
    },
    "description": {
      "pl": "Czerwony Raport 2025 to opracowanie przygotowane przez firmę Supesu, poświęcone tematowi zdrowia menstruacyjnego i menopauzalnego w miejscu pracy oraz dostępności środków higieny osobistej w przestrzeni publicznej. Raport, oparty na badaniu 162 osób pracujących w różnych sektorach biznesu, pokazuje rosnącą świadomość i potrzebę wprowadzania urlopów menstruacyjnych i menopauzalnych",
      "en": "The Red Report 2025, prepared by Supesu, focuses on menstrual and menopausal health in the workplace, as well as access to personal hygiene products in public spaces. Based on a survey of 162 employees across various business sectors, the report highlights the growing awareness and need for introducing menstrual and menopausal leave policies."
    }
  },
  {
    "id": "report-6",
    "cover": {
      "src": "/resources/covers/report-6.png",
      "position": "50% 55%",
      "width": 526,
      "height": 701,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/50e95482-6925-425b-b363-9c2eb0782afb/Screenshot+2025-11-13+164916.png"
    },
    "category": "poland",
    "publisher": "Centrum Praw Kobiet",
    "href": {
      "pl": "https://cpk.org.pl/pobierz-raport/",
      "en": "https://cpk.org.pl/pobierz-raport/"
    },
    "title": {
      "pl": "Kobiety w Polsce w XXI wieku",
      "en": "Kobiety w Polsce w XXI wieku"
    },
    "description": {
      "pl": "To przekrojowe wydawnictwo zbierające informacje nt. udziału i praw kobiet w różnych sferach życia politycznego, społecznego i prywatnego. Ekspertki z wybranych obszarów przedstawiają badania, analizy i tendencje oraz formułują rekomendacje działań potrzebnych dla poprawy standardów i ochrony praw kobiet.",
      "en": "This cross-sectional publication gathers data on women’s participation and rights across political, social, and private spheres. Experts from various fields present research, analyses, and trends, while offering recommendations for actions needed to improve standards and protect women’s rights."
    }
  },
  {
    "id": "report-7",
    "cover": {
      "src": "/resources/covers/report-7.png",
      "position": "50% 0%",
      "width": 552,
      "height": 736,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/100a7d21-8cf9-454b-8b39-64d6af3334c3/Screenshot+2025-11-13+173015.png"
    },
    "category": "poland",
    "publisher": "Medonet",
    "href": {
      "pl": "https://ocdn.eu/medonet/medonet/Raport%20Narodowy%20Test%20Zdrowia%20Polak%C3%B3w%202024.pdf",
      "en": "https://ocdn.eu/medonet/medonet/Raport%20Narodowy%20Test%20Zdrowia%20Polak%C3%B3w%202024.pdf"
    },
    "title": {
      "pl": "Narodowy Test Zdrowia Polaków",
      "en": "Narodowy Test Zdrowia Polaków"
    },
    "description": {
      "pl": "Narodowy Test Zdrowia Polaków 2024 to piąta edycja największego w Polsce badania dotyczącego stanu zdrowia, stylu życia i postaw zdrowotnych obywateli. W badaniu wzięło udział ponad 150 tysięcy osób, a łącznie od 2020 roku zebrano już ponad 1,3 mln ankiet.",
      "en": "The National Health Test of Poles 2024 is the fifth edition of Poland’s largest study on public health, lifestyle, and health attitudes. Over 150,000 people took part in the latest edition, and since 2020 more than 1.3 million surveys have been collected."
    }
  },
  {
    "id": "report-8",
    "cover": {
      "src": "/resources/covers/report-8.png",
      "position": "50% 40%",
      "width": 750,
      "height": 1000,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/54a9bbe4-4b28-45c9-9f87-c48cbebe1636/Screenshot+2025-11-18+at+11.01.42.png"
    },
    "category": "poland",
    "publisher": "Gedeon Richter Polska",
    "href": {
      "pl": "https://zdrowa-ona.pl/w-kobiecym-interesie/?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnzu5BGjGdoDK61Z04gBfPhWn2xRSVS48c_ofQnJAAzBM4bpFaoBl8NpcJtEw_aem_w_5LBSVNHAgMWGlQXx9sgQ",
      "en": "https://zdrowa-ona.pl/w-kobiecym-interesie/"
    },
    "title": {
      "pl": "W Kobiecym Interesie 2025",
      "en": "W Kobiecym Interesie 2025"
    },
    "description": {
      "pl": "Raport dotyczy kampanii „W kobiecym interesie. Bez wyjątku.” prowadzonej przez Gedeon Richter Polska – jej celem jest zwiększenie dostępności profilaktyki i opieki ginekologicznej dla wszystkich kobiet w Polsce, ze szczególnym uwzględnieniem barier społecznych, emocjonalnych i geograficznych, które uniemożliwiają regularne badania intymne.",
      "en": "The report focuses on the campaign “In the Women’s Interest. Without Exception.” run by Gedeon Richter Polska, which aims to improve access to gynecological prevention and care for all women in Poland, especially addressing social, emotional and geographic barriers that prevent regular intimate health check-ups."
    }
  },
  {
    "id": "report-9",
    "cover": {
      "src": "/resources/covers/report-9.png",
      "position": "50% 40%",
      "width": 750,
      "height": 951,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/1a093f02-11bc-4283-b144-0d44c7769107/Screenshot+2026-01-27+at+20.35.16.png"
    },
    "category": "poland",
    "publisher": "Kulczyk Foundation",
    "href": {
      "pl": "https://menopauzabeztabu.org.pl/wp-content/uploads/2025/11/Biala-Ksiega-Menopauzy_KF.pdf",
      "en": "https://menopauzabeztabu.org.pl/wp-content/uploads/2025/11/Biala-Ksiega-Menopauzy_KF.pdf"
    },
    "title": {
      "pl": "Biała Ksiega Menopauzy 2025",
      "en": "Biała Księga Menopauzy 2025"
    },
    "description": {
      "pl": "Biała Księga Menopauzy przedstawia menopauzę jako naturalny, a jednocześnie społecznie zaniedbany etap życia kobiet, który ma istotne konsekwencje zdrowotne, zawodowe i ekonomiczne, wskazując na skalę zjawiska w Polsce, jego wpływ na rynek pracy, system ochrony zdrowia i jakość życia oraz na utrwalone stereotypy i tabu pogłębiające brak wsparcia.",
      "en": "The White Paper on Menopause presents menopause as a natural yet socially neglected stage of women’s lives that has significant health, professional, and economic consequences, highlighting the scale of the phenomenon in Poland, its impact on the labour market, the healthcare system, and quality of life, as well as entrenched stereotypes and taboos that deepen the lack of support."
    }
  },
  {
    "id": "report-10",
    "cover": {
      "src": "/resources/covers/report-10.png",
      "position": "50% 0%",
      "width": 750,
      "height": 970,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/f3cfd223-95e7-4ec0-a6f5-61542bce320b/Screenshot+2026-05-10+at+22.38.19.png"
    },
    "category": "global",
    "publisher": "PwC",
    "href": {
      "pl": "https://www.pwc.com/us/en/industries/health-industries/library/the-future-of-womens-health.html?utm_medium=email&_hsmi=415316118&utm_content=415316118&utm",
      "en": "https://www.pwc.com/us/en/industries/health-industries/library/the-future-of-womens-health.html?utm_medium=email&_hsmi=415316118&utm_content=415316118&utm_"
    },
    "title": {
      "pl": "From margin to mainstream — The future of women’s health",
      "en": "From margin to mainstream — The future of women’s health"
    },
    "description": {
      "pl": "PwC wskazuje, że zdrowie kobiet pozostaje strukturalnie niedofinansowane i niedostatecznie priorytetyzowane, mimo swojej skali i wpływu, a domknięcie tej luki stanowi istotną, wielomiliardową szansę wzrostu wraz z przechodzeniem sektora do głównego nurtu ochrony zdrowia.",
      "en": "PwC highlights that women’s health remains structurally underfunded and underprioritised despite its scale and influence, but closing this gap represents a significant multibillion-dollar growth opportunity as the sector moves into the healthcare mainstream."
    }
  },
  {
    "id": "report-11",
    "cover": {
      "src": "/resources/covers/2026-official-svb.png",
      "fit": "contain",
      "background": "#ffffff",
      "width": 1536,
      "height": 864,
      "source": "https://www.svb.com/trends-insights/reports/womens-health-report/"
    },
    "category": "global",
    "publisher": "Silicon Valley Bank",
    "href": {
      "pl": "https://www.svb.com/trends-insights/reports/womens-health-report/",
      "en": "https://www.svb.com/trends-insights/reports/womens-health-report/"
    },
    "title": {
      "pl": "Innovation in Women’s Health 2026",
      "en": "Innovation in Women’s Health 2026"
    },
    "description": {
      "pl": "Raport Silicon Valley Bank o inwestycjach VC, startupach, innowacjach i transakcjach w zdrowiu kobiet w USA i Europie. Analizuje około 2 mld USD kapitału zainwestowanego w 2025 roku oraz perspektywy finansowania sektora w 2026 roku.",
      "en": "Silicon Valley Bank’s report on venture capital, startups, innovation, and transactions in women’s health across the US and Europe. It analyzes roughly $2 billion invested in 2025 and the sector’s funding outlook for 2026."
    }
  },
  {
    "id": "report-12",
    "cover": {
      "src": "/resources/covers/report-12.png",
      "fit": "contain",
      "background": "#ceb1f6",
      "width": 750,
      "height": 421,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/2e7ff188-b503-4c7a-ae8c-a35b092822bf/Screenshot+2025-10-12+at+14.12.04.png"
    },
    "category": "global",
    "publisher": "Ultra Violet Agency",
    "href": {
      "pl": "https://www.ultraviolet.agency/reports/p/femtechfutures2035",
      "en": "https://www.ultraviolet.agency/reports/p/femtechfutures2035"
    },
    "title": {
      "pl": "FemTech Futures 2035; The trends shaping the next decade in Women's Health",
      "en": "FemTech Futures 2035; The trends shaping the next decade in Women's Health"
    },
    "description": {
      "pl": "To raport przygotowany przez Ultra Violet Agency, przedstawiający wizję przyszłości FemTech i zdrowia kobiet do 2035 roku.",
      "en": "Prepared by Ultra Violet Agency, this report presents a forward-looking vision of the future of FemTech and women’s health through 2035."
    }
  },
  {
    "id": "report-13",
    "cover": {
      "src": "/resources/covers/report-13.webp",
      "width": 750,
      "height": 938,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/6dea16c3-2565-40f8-9087-41cb943bd3b6/Sie%2BVentures%2BFemTech%2BReport.webp"
    },
    "category": "global",
    "publisher": "Sie Ventures",
    "href": {
      "pl": "https://www.sie.ventures/femtech-report",
      "en": "https://www.sie.ventures/femtech-report"
    },
    "title": {
      "pl": "Sie Ventures European FemTech Report 2023-2024",
      "en": "Sie Ventures European FemTech Report 2023-2024"
    },
    "description": {
      "pl": "Sie Ventures stworzyło pierwszą mapę europejskiego rynku FemTech, opartą na danych zebranych od ponad 540 aktywnych firm z sektora FemTech – na różnych etapach rozwoju, od fazy pre-seed po wejście na giełdę.",
      "en": "Sie Ventures has created the first comprehensive map of the European FemTech market, based on data from over 540 active companies across all stages of development — from pre-seed startups to publicly listed firms."
    }
  },
  {
    "id": "report-14",
    "cover": {
      "src": "/resources/covers/report-14.png",
      "position": "50% 0%",
      "width": 750,
      "height": 1059,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/346f2646-35f0-45b0-ab41-8737db33f96d/Screenshot+2026-05-10+at+15.03.54.png"
    },
    "category": "global",
    "publisher": "World Economic Forum",
    "href": {
      "pl": "https://www.weforum.org/publications/women-s-health-investment-outlook-2026/",
      "en": "https://www.weforum.org/publications/women-s-health-investment-outlook-2026/"
    },
    "title": {
      "pl": "Women’s Health Investment Outlook",
      "en": "Women’s Health Investment Outlook"
    },
    "description": {
      "pl": "Raport pokazuje, że zdrowie kobiet, mimo że dotyczy niemal połowy populacji świata, przyciąga jedynie 6% prywatnych inwestycji w sekcji zdrowia. Raport wskazuje sektor jako jeden z największych niewykorzystanych obszarów wzrostu w ochronie zdrowia, podkreślając potencjał wykraczający daleko poza zdrowie reprodukcyjne.",
      "en": "The report shows that women’s health, despite affecting nearly half of the global population, receives only 6% of private healthcare investment. It identifies the sector as one of the largest untapped growth opportunities in healthcare, with potential extending far beyond reproductive health."
    }
  },
  {
    "id": "report-15",
    "cover": {
      "src": "/resources/covers/report-15.png",
      "position": "50% 0%",
      "width": 750,
      "height": 937,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/5b2ca7e8-2151-49cf-af5e-7dd8f2a2363a/Screenshot+2025-10-12+at+14.02.48.png"
    },
    "category": "global",
    "publisher": "World Economic Forum · McKinsey Health Institute",
    "href": {
      "pl": "https://www.weforum.org/publications/blueprint-to-close-the-women-s-health-gap-how-to-improve-lives-and-economies-for-all/",
      "en": "https://www.weforum.org/publications/blueprint-to-close-the-women-s-health-gap-how-to-improve-lives-and-economies-for-all/"
    },
    "title": {
      "pl": "Blueprint to Close the Women’s Health Gap: How to Improve Lives and Economies for All",
      "en": "Blueprint to Close the Women’s Health Gap: How to Improve Lives and Economies for All"
    },
    "description": {
      "pl": "Raport opracowany przez World Economic Forum we współpracy z McKinsey Health Institute, stanowiący strategiczny plan działań (blueprint) na rzecz zamknięcia luki zdrowotnej kobiet oraz poprawy jakości życia i wzrostu gospodarczego na świecie.",
      "en": "Developed by the World Economic Forum in collaboration with the McKinsey Health Institute, this strategic blueprint outlines key actions needed to close the women’s health gap, enhance quality of life, and drive global economic growth."
    }
  },
  {
    "id": "report-16",
    "cover": {
      "src": "/resources/covers/report-16.png",
      "position": "50% 0%",
      "width": 741,
      "height": 926,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/d0833672-e4c4-4802-90f1-f5925951a84e/Screenshot+2025-10-12+at+17.16.57.png"
    },
    "category": "global",
    "publisher": "World Economic Forum · McKinsey Health Institute",
    "href": {
      "pl": "https://www3.weforum.org/docs/WEF_Closing_the_Women%E2%80%99s_Health_Gap_2024.pdf",
      "en": "https://www3.weforum.org/docs/WEF_Closing_the_Women%E2%80%99s_Health_Gap_2024.pdf"
    },
    "title": {
      "pl": "Closing the Women’s Health Gap: A $1 Trillion Opportunity to Improve Lives and Economies",
      "en": "Closing the Women’s Health Gap: A $1 Trillion Opportunity to Improve Lives and Economies"
    },
    "description": {
      "pl": "Raport opracowany przez World Economic Forum we współpracy z McKinsey Health Institute, analizujący globalną lukę w zdrowiu kobiet, jej ekonomiczne konsekwencje oraz przedstawiający możliwe rozwiązania systemowe.",
      "en": "Developed by the World Economic Forum in collaboration with the McKinsey Health Institute, this report analyzes the global women’s health gap, its economic impact, and proposes potential systemic solutions."
    }
  },
  {
    "id": "report-17",
    "cover": {
      "src": "/resources/covers/report-17.webp",
      "position": "50% 100%",
      "width": 576,
      "height": 721,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/245ca102-2ceb-4587-8a37-12aea021edb6/Screenshot%2B2024-04-02%2Bat%2B10.26.22%E2%80%AFAM.webp"
    },
    "category": "global",
    "publisher": "FemHealth Insights",
    "href": {
      "pl": "https://www.femhealthinsights.com/reports/p/2023-femtech-landscape-report",
      "en": "https://www.femhealthinsights.com/reports/p/2023-femtech-landscape-report"
    },
    "title": {
      "pl": "2023 FemTech Landscape Report",
      "en": "2023 FemTech Landscape Report"
    },
    "description": {
      "pl": "Raport FemHealth Insights analizujący krajobraz FemTech w 2023 roku — jego rozwój, trendy w zdrowiu kobiet, najbardziej dynamiczne piony innowacji, wyjścia kapitałowe firm oraz prognozy na rok 2024.",
      "en": "Prepared by FemHealth Insights, this report explores the FemTech landscape in 2023 — its growth, women’s health trends, the most dynamic areas of innovation, company exits, and forecasts for 2024."
    }
  },
  {
    "id": "report-18",
    "cover": {
      "src": "/resources/covers/report-18.png",
      "width": 750,
      "height": 937,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/da732174-e670-4403-bed6-6fcd6a862331/Screenshot+2025-10-12+at+14.09.20.png"
    },
    "category": "global",
    "publisher": "Calm/Storm VC",
    "href": {
      "pl": "https://www.calmstorm.vc/femtech-report",
      "en": "https://www.calmstorm.vc/femtech-report"
    },
    "title": {
      "pl": "FemTech Report 2024",
      "en": "FemTech Report 2024"
    },
    "description": {
      "pl": "Raport opracowany przez Calm/Storm VC, prezentujący kompleksowy przegląd branży FemTech – jej aktualny stan, kluczowe wyzwania i obszary niedoinwestowania, a także największe szanse innowacji w zdrowiu kobiet w obszarach takich jak menopauza, onkologia, zdrowie seksualne, płodność czy antykoncepcja.",
      "en": "Published by Calm/Storm VC, this comprehensive report provides an overview of the FemTech industry — its current state, major challenges, and areas of underinvestment. It also identifies the biggest opportunities for innovation in women’s health, including menopause, oncology, sexual health, fertility, and contraception."
    }
  },
  {
    "id": "report-19",
    "cover": {
      "src": "/resources/covers/report-19.png",
      "width": 750,
      "height": 937,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/cd332e37-1acc-4c04-8388-e0cc0aacb209/Screenshot+2025-10-12+at+17.26.49.png"
    },
    "category": "global",
    "publisher": "Springboard Enterprises · Accenture",
    "href": {
      "pl": "https://sb.co/state-of-womens-health/",
      "en": "https://sb.co/state-of-womens-health/"
    },
    "title": {
      "pl": "State of Women’s Health Report",
      "en": "State of Women’s Health Report"
    },
    "description": {
      "pl": "Raport Springboard Enterprises i Accenture identyfikujący trzy główne bariery w zdrowiu kobiet – niedofinansowanie, luki w badaniach naukowych i błędne rozumienie potrzeb zdrowotnych – oraz prezentujący możliwe rozwiązania systemowe.",
      "en": "Produced by Springboard Enterprises and Accenture, this report identifies three key barriers to women’s health — underfunding, research gaps, and misaligned understanding of women’s health needs — and presents actionable, system-level solutions."
    }
  },
  {
    "id": "report-20",
    "cover": {
      "src": "/resources/covers/report-20.png",
      "position": "50% 0%",
      "width": 750,
      "height": 937,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/681d445a-1e68-455e-91f7-78c1dc22212e/Screenshot+2025-10-12+at+17.33.21.png"
    },
    "category": "global",
    "publisher": "Women at the Table",
    "href": {
      "pl": "https://www.womenatthetable.net/2024/01/10/the-gender-data-health-gap-harnessing-ais-transformative-power-to-bridge-the-gender-health-data-divide/",
      "en": "https://www.womenatthetable.net/2024/01/10/the-gender-data-health-gap-harnessing-ais-transformative-power-to-bridge-the-gender-health-data-divide/"
    },
    "title": {
      "pl": "The Gender Data Health Gap: Harnessing AI’s Transformative Power to Bridge the Gender Health Data Divide",
      "en": "The Gender Data Health Gap: Harnessing AI’s Transformative Power to Bridge the Gender Health Data Divide"
    },
    "description": {
      "pl": "To raport Women at the Table analizujący lukę w danych zdrowotnych kobiet, jej konsekwencje dla diagnostyki i leczenia oraz ryzyko pogłębienia nierówności przez AI, wraz z propozycjami wielowymiarowych rozwiązań systemowych i technologicznych.",
      "en": "This report by Women at the Table examines the gender data gap in health — its impact on diagnostics and treatment, and how AI could deepen existing inequalities. It also presents multidimensional systemic and technological solutions to address the issue."
    }
  },
  {
    "id": "report-21",
    "cover": {
      "src": "/resources/covers/report-21.png",
      "position": "100% 50%",
      "width": 750,
      "height": 420,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/064dad4c-0c6b-4a6c-99f7-85c645ed6da0/Screenshot+2026-02-14+at+20.17.00.png"
    },
    "category": "global",
    "publisher": "AOA DX",
    "href": {
      "pl": "https://aoadx.com/exit-report/",
      "en": "https://aoadx.com/exit-report/"
    },
    "title": {
      "pl": "Follow the Exits: AOA DX Women's Health Report 2025",
      "en": "Follow the Exits: AOA DX Women's Health Report 2025"
    },
    "description": {
      "pl": "Pierwszy kompleksowy raport analizujący 25 lat wyjść (exitów) z inwestycji w sektorze zdrowia kobiet, dokumentujący ponad 91 miliardów dolarów zrealizowanej wartości. Pokazuje, że zdrowie kobiet to dojrzały, wysoko rentowny rynek napędzający innowacje w diagnostyce, onkologii i opiece przewlekłej, a także rosnącą efektywność kapitałową firm pomimo historycznego niedofinansowania.",
      "en": "The first comprehensive report analyzing 25 years of exits in women’s health, documenting over $91 billion in realized value. It shows that women’s health is a mature, highly profitable market driving innovation in diagnostics, oncology, and chronic care, while also demonstrating strong capital efficiency despite historical underinvestment."
    }
  },
  {
    "id": "report-22",
    "cover": {
      "src": "/resources/covers/report-22.png",
      "position": "50% 0%",
      "width": 226,
      "height": 292,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/e1aa20f9-9525-4ee4-8189-090505d36db9/2026-Report-Cover.png"
    },
    "category": "global",
    "publisher": "WHAM",
    "href": {
      "pl": "https://whamnow.org/the-report/",
      "en": "https://whamnow.org/the-reports/"
    },
    "title": {
      "pl": "The Business Case for Accelerating Women's Health Investment",
      "en": "The Business Case for Accelerating Women's Health Investment"
    },
    "description": {
      "pl": "Raport analizujący jeden z najbardziej niedofinansowanych, ale szybko rozwijających się obszarów opieki zdrowotnej, pokazując jak wiedza oparta na różnicach płciowych przekształca rynki, redukuje ryzyko i uwalnia wartość. Przedstawia aktualne dane rynkowe, perspektywy inwestorów oraz sprawdzone studia przypadków, oferując jasną mapę drogową dla kapitału napędzającego innowacje i generującego trwałe zyski w zdrowiu kobiet.",
      "en": "A report analyzing one of the most underfunded yet rapidly growing areas of healthcare, showing how sex-based insights are transforming markets, reducing risk, and unlocking value. It presents current market data, investor perspectives, and validated case studies, offering a clear roadmap for capital driving innovation and generating sustainable returns in women’s health."
    }
  },
  {
    "id": "report-23",
    "cover": {
      "src": "/resources/covers/report-23.png",
      "position": "50% 75%",
      "width": 750,
      "height": 1096,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/eed6e7ef-90b9-4ae7-b5e7-24d1b5cc102c/Screenshot+2026-02-14+at+20.21.00.png"
    },
    "category": "global",
    "publisher": "Kearney · Flagship Pioneering · Mubadala · Novo Holdings",
    "href": {
      "pl": "https://www.kearney.com/industry/health/w-health/article/accelerating-private-capital-investment-in-womens-health",
      "en": "https://www.kearney.com/industry/health/w-health/article/accelerating-private-capital-investment-in-womens-health"
    },
    "title": {
      "pl": "Accelerating Private Capital Investment in Women's Health",
      "en": "Accelerating Private Capital Investment in Women's Health"
    },
    "description": {
      "pl": "Raport opracowany przez Kearney, Flagship Pioneering, Mubadala i Novo Holdings, analizujący możliwości przyspieszenia inwestycji kapitału prywatnego w zdrowiu kobiet. Pokazuje, że sektor ten jest dużym, niedoinwestowanym rynkiem o wartości biliona dolarów, oferującym znaczące możliwości zwrotu z inwestycji przy jednoczesnym zamykaniu luki w dostępie do opieki zdrowotnej dla kobiet i poprawie wyników zdrowotnych.",
      "en": "A report by Kearney, Flagship Pioneering, Mubadala, and Novo Holdings analyzing how private capital investment in women’s health can be accelerated. It shows that the sector is a large, underinvested, trillion-dollar market offering significant return opportunities while also addressing gaps in women’s healthcare access and improving health outcomes."
    }
  },
  {
    "id": "report-2026-femmehealth-q1",
    "cover": {
      "src": "/resources/covers/2026-official-femmehealth-q1.png",
      "fit": "contain",
      "background": "#ffffff",
      "width": 1200,
      "height": 900,
      "source": "https://femmehealthalliance.org/womens-health-investment-report-q1-2026-funding-exits-and-market-analysis-femmehealth-alliance/"
    },
    "category": "global",
    "publisher": "FemmeHealth Alliance",
    "href": {
      "pl": "https://femmehealthalliance.org/womens-health-investment-report-q1-2026-funding-exits-and-market-analysis-femmehealth-alliance/",
      "en": "https://femmehealthalliance.org/womens-health-investment-report-q1-2026-funding-exits-and-market-analysis-femmehealth-alliance/"
    },
    "title": {
      "pl": "Women’s Health Investment Report: Q1 2026",
      "en": "Women’s Health Investment Report: Q1 2026"
    },
    "description": {
      "pl": "Kwartalna analiza przepływów kapitału, exitów i sygnałów rynkowych w zdrowiu kobiet. Raport przedstawia otoczenie finansowania w pierwszym kwartale 2026 roku, perspektywę europejską oraz wnioski dla inwestorów i operatorów.",
      "en": "A quarterly analysis of capital flows, exits, and market signals in women’s health. The report examines the Q1 2026 funding environment, the European perspective, and implications for investors and operators."
    }
  },
  {
    "id": "report-2026-care-for-women",
    "cover": {
      "src": "/resources/covers/2026-official-care-for-women.png",
      "fit": "contain",
      "background": "#ffffff",
      "width": 953,
      "height": 1348,
      "source": "https://www.weforum.org/publications/care-for-women-investing-in-care-delivery-to-improve-womens-lives-and-livelihoods/"
    },
    "category": "global",
    "publisher": "World Economic Forum · McKinsey Health Institute",
    "href": {
      "pl": "https://www.weforum.org/publications/care-for-women-investing-in-care-delivery-to-improve-womens-lives-and-livelihoods/",
      "en": "https://www.weforum.org/publications/care-for-women-investing-in-care-delivery-to-improve-womens-lives-and-livelihoods/"
    },
    "title": {
      "pl": "CARE for Women: Investing in Care Delivery to Improve Women’s Lives and Livelihoods",
      "en": "CARE for Women: Investing in Care Delivery to Improve Women’s Lives and Livelihoods"
    },
    "description": {
      "pl": "Praktyczna mapa działań dotycząca luk w dostępie, diagnostyce, badaniach przesiewowych i leczeniu kobiet. Raport analizuje ekonomiczne korzyści poprawy opieki i przedstawia model CARE wspierający projektowanie skuteczniejszych ścieżek klinicznych.",
      "en": "A practical roadmap addressing gaps in women’s access, diagnosis, screening, and treatment. It examines the economic benefits of better care and presents the CARE framework for designing more effective clinical pathways."
    }
  },
  {
    "id": "report-2026-innovation-radar",
    "cover": {
      "src": "/resources/covers/2026-official-innovation-radar.png",
      "fit": "contain",
      "background": "#ffffff",
      "width": 953,
      "height": 1348,
      "source": "https://www.weforum.org/publications/the-women-s-health-innovation-radar-revealing-gaps-and-opportunities-across-the-science-to-patient-journey/"
    },
    "category": "global",
    "publisher": "World Economic Forum · Kearney Health Institute · Gates Foundation · Wellcome Leap",
    "href": {
      "pl": "https://www.weforum.org/publications/the-women-s-health-innovation-radar-revealing-gaps-and-opportunities-across-the-science-to-patient-journey/",
      "en": "https://www.weforum.org/publications/the-women-s-health-innovation-radar-revealing-gaps-and-opportunities-across-the-science-to-patient-journey/"
    },
    "title": {
      "pl": "The Women’s Health Innovation Radar",
      "en": "The Women’s Health Innovation Radar"
    },
    "description": {
      "pl": "Mapa innowacji w zdrowiu kobiet od badań podstawowych po wdrożenie produktu i dostęp pacjentek. Obejmuje dziesięć kluczowych obszarów chorobowych, wskazując luki badawcze, niedoinwestowane etapy rozwoju oraz możliwości dla nauki i rynku.",
      "en": "A map of women’s health innovation from basic science through product development and patient access. It covers ten priority condition areas and highlights research gaps, underfunded stages, and opportunities for science and industry."
    }
  },
  {
    "id": "report-2026-accelerating-femtech",
    "cover": {
      "src": "/resources/covers/2026-official-accelerating-femtech.png",
      "fit": "contain",
      "background": "#ffffff",
      "width": 1191,
      "height": 1684,
      "source": "https://healthinnovationnetwork.com/wp-content/uploads/2026/05/Accelerating-FemTech-Impact-Report-2026.pdf"
    },
    "category": "global",
    "publisher": "Health Innovation Network · Innovate UK",
    "href": {
      "pl": "https://healthinnovationnetwork.com/wp-content/uploads/2026/05/Accelerating-FemTech-Impact-Report-2026.pdf",
      "en": "https://healthinnovationnetwork.com/wp-content/uploads/2026/05/Accelerating-FemTech-Impact-Report-2026.pdf"
    },
    "title": {
      "pl": "Accelerating FemTech Impact Report 2026",
      "en": "Accelerating FemTech Impact Report 2026"
    },
    "description": {
      "pl": "Podsumowanie trzyletniego programu wspierającego 43 innowacje FemTech w Wielkiej Brytanii. Raport opisuje finansowanie, komercjalizację, współpracę z NHS, rozwój produktów i efekty wsparcia dla firm na różnych etapach dojrzałości.",
      "en": "A review of a three-year UK programme supporting 43 FemTech innovations. It covers funding, commercialization, NHS collaboration, product development, and the impact of tailored support for companies at different stages."
    }
  },
  {
    "id": "report-2026-france-barometer",
    "cover": {
      "src": "/resources/covers/2026-official-france-barometer.png",
      "fit": "contain",
      "background": "#ffffff",
      "width": 1200,
      "height": 900,
      "source": "https://www.femtechfrance.org/post/publication-du-barom%C3%A8tre-2026-de-la-femtech-en-france"
    },
    "category": "global",
    "publisher": "Femtech France · Wavestone",
    "href": {
      "pl": "https://www.femtechfrance.org/post/publication-du-barom%C3%A8tre-2026-de-la-femtech-en-france",
      "en": "https://www.femtechfrance.org/post/publication-du-barom%C3%A8tre-2026-de-la-femtech-en-france"
    },
    "title": {
      "pl": "Baromètre 2026 de la Femtech en France",
      "en": "2026 Barometer of FemTech in France"
    },
    "description": {
      "pl": "Przegląd francuskiego rynku FemTech obejmujący około 200 aktywnych startupów. Analizuje finansowanie, przychody, rentowność, zatrudnienie i modele biznesowe, tworząc aktualny obraz jednego z najważniejszych ekosystemów w Europie.",
      "en": "An overview of the French FemTech market covering around 200 active startups. It examines funding, revenue, profitability, employment, and business models across one of Europe’s leading ecosystems."
    }
  },
  {
    "id": "report-2026-india-futures",
    "cover": {
      "src": "/resources/covers/2026-official-india-futures.png",
      "fit": "contain",
      "background": "#ffffff",
      "width": 953,
      "height": 1348,
      "source": "https://www.orfonline.org/research/women-s-health-futures-in-india-technology-workforce-and-finance-for-lifelong-well-being"
    },
    "category": "global",
    "publisher": "Observer Research Foundation",
    "href": {
      "pl": "https://www.orfonline.org/research/women-s-health-futures-in-india-technology-workforce-and-finance-for-lifelong-well-being",
      "en": "https://www.orfonline.org/research/women-s-health-futures-in-india-technology-workforce-and-finance-for-lifelong-well-being"
    },
    "title": {
      "pl": "Women’s Health Futures in India: Technology, Workforce, and Finance for Lifelong Well-Being",
      "en": "Women’s Health Futures in India: Technology, Workforce, and Finance for Lifelong Well-Being"
    },
    "description": {
      "pl": "Raport o przyszłości zdrowia kobiet w Indiach w ujęciu całego życia. Analizuje AI i digital health, kadry medyczne, przedsiębiorczość kobiet, finansowanie, choroby przewlekłe, zdrowie psychiczne, nieodpłatną pracę opiekuńczą i starzenie.",
      "en": "A life-course analysis of women’s health in India. It examines AI and digital health, the healthcare workforce, women-led enterprise, financing, chronic disease, mental health, unpaid care, and ageing."
    }
  },
  {
    "id": "report-2026-uk-health-gap",
    "cover": {
      "src": "/resources/covers/2026-official-uk-health-gap.jpg",
      "fit": "contain",
      "background": "#ffffff",
      "width": 800,
      "height": 800,
      "source": "https://www.mckinsey.com/mhi/our-insights/closing-the-womens-health-gap-the-united-kingdoms-36-billion-pound-opportunity"
    },
    "category": "global",
    "publisher": "McKinsey Health Institute",
    "href": {
      "pl": "https://www.mckinsey.com/mhi/our-insights/closing-the-womens-health-gap-the-united-kingdoms-36-billion-pound-opportunity",
      "en": "https://www.mckinsey.com/mhi/our-insights/closing-the-womens-health-gap-the-united-kingdoms-36-billion-pound-opportunity"
    },
    "title": {
      "pl": "Closing the Women’s Health Gap: The United Kingdom’s £36 Billion Opportunity",
      "en": "Closing the Women’s Health Gap: The United Kingdom’s £36 Billion Opportunity"
    },
    "description": {
      "pl": "Analiza luki zdrowotnej kobiet w Wielkiej Brytanii oraz potencjalnych korzyści zdrowotnych, społecznych i ekonomicznych wynikających z jej zmniejszenia. Raport szacuje skalę możliwości gospodarczej na 36 miliardów funtów.",
      "en": "An analysis of the women’s health gap in the United Kingdom and the potential health, social, and economic gains from closing it. The report estimates the economic opportunity at £36 billion."
    }
  },
  {
    "id": "report-2026-funding-q2",
    "cover": {
      "src": "/resources/covers/2026-official-funding-q2.png",
      "fit": "contain",
      "background": "#ffffff",
      "width": 1200,
      "height": 900,
      "source": "https://www.futurefemhealth.com/p/q2-2026-womens-health-funding-in"
    },
    "category": "global",
    "publisher": "FutureFemHealth",
    "href": {
      "pl": "https://www.futurefemhealth.com/p/q2-2026-womens-health-funding-in",
      "en": "https://www.futurefemhealth.com/p/q2-2026-womens-health-funding-in"
    },
    "title": {
      "pl": "Q2 2026: Women’s Health Funding in Review",
      "en": "Q2 2026: Women’s Health Funding in Review"
    },
    "description": {
      "pl": "Analiza 40 zweryfikowanych rund finansowania w zdrowiu kobiet o łącznej wartości około 739 mln USD w drugim kwartale 2026 roku. Wprowadza też ramy klasyfikacji pokazujące, jak różne definicje sektora wpływają na dane inwestycyjne.",
      "en": "An analysis of 40 verified women’s health funding rounds totaling approximately $739 million in Q2 2026. It also applies a classification framework showing how different sector definitions affect investment data."
    }
  },
  {
    "id": "report-2026-era-of-scale",
    "cover": {
      "src": "/resources/covers/2026-official-era-of-scale.png",
      "fit": "contain",
      "background": "#ffffff",
      "width": 1200,
      "height": 900,
      "source": "https://wplatform.co/forms/womens-health-equity-funding-trends-report-2026"
    },
    "category": "global",
    "publisher": "W Group",
    "href": {
      "pl": "https://wplatform.co/forms/womens-health-equity-funding-trends-report-2026",
      "en": "https://wplatform.co/forms/womens-health-equity-funding-trends-report-2026"
    },
    "title": {
      "pl": "The Road to the Era of Scale: Global Women’s Health Investment Report",
      "en": "The Road to the Era of Scale: Global Women’s Health Investment Report"
    },
    "description": {
      "pl": "Globalny raport inwestycyjny oparty na analizie ponad 500 informacji o finansowaniu i 164 rund w ponad 30 krajach. Pokazuje, gdzie trafiał kapitał w 2024 i 2025 roku, które kategorie rosną i jakie bariery mogą ograniczyć dalsze skalowanie.",
      "en": "A global investment report based on more than 500 funding stories and 164 rounds across over 30 countries. It shows where capital moved in 2024 and 2025, which categories are growing, and what may constrain further scaling."
    }
  },
  {
    "id": "report-2026-reimbursement-roadmap",
    "cover": {
      "src": "/resources/covers/2026-official-reimbursement.png",
      "fit": "contain",
      "background": "#ffffff",
      "width": 1200,
      "height": 900,
      "source": "https://milkeninstitute.org/index.php/content-hub/research-and-reports/research-and-data-tools/coverage-and-reimbursement-roadmap-womens-health-innovation"
    },
    "category": "global",
    "publisher": "Milken Institute",
    "href": {
      "pl": "https://milkeninstitute.org/index.php/content-hub/research-and-reports/research-and-data-tools/coverage-and-reimbursement-roadmap-womens-health-innovation",
      "en": "https://milkeninstitute.org/index.php/content-hub/research-and-reports/research-and-data-tools/coverage-and-reimbursement-roadmap-womens-health-innovation"
    },
    "title": {
      "pl": "Coverage and Reimbursement Roadmap for Women’s Health Innovation",
      "en": "Coverage and Reimbursement Roadmap for Women’s Health Innovation"
    },
    "description": {
      "pl": "Przewodnik po ścieżkach refundacji i finansowania innowacji w zdrowiu kobiet w USA — od koncepcji produktu do dostępu pacjentek. Opisuje bariery systemowe oraz ścieżki self-pay, ubezpieczycieli komercyjnych i programów publicznych.",
      "en": "A guide to coverage and reimbursement pathways for women’s health innovations in the US, from product concept to patient access. It covers structural barriers and the self-pay, commercial payer, and public programme routes."
    }
  },
  {
    "id": "report-2026-post-femtech",
    "cover": {
      "src": "/resources/covers/2026-official-post-femtech.jpg",
      "fit": "contain",
      "background": "#ffffff",
      "width": 1080,
      "height": 720,
      "source": "https://post.parliament.uk/research-briefings/post-pn-0775/"
    },
    "category": "global",
    "publisher": "UK Parliament POST",
    "href": {
      "pl": "https://post.parliament.uk/research-briefings/post-pn-0775/",
      "en": "https://post.parliament.uk/research-briefings/post-pn-0775/"
    },
    "title": {
      "pl": "FemTech: Consumer Technology to Support Women’s Health",
      "en": "FemTech: Consumer Technology to Support Women’s Health"
    },
    "description": {
      "pl": "Briefing parlamentarny o aplikacjach, oprogramowaniu i urządzeniach wspierających zdrowie kobiet. Ocenia bazę dowodową, regulacje, bezpieczeństwo i prywatność danych, wdrażanie w NHS oraz ryzyko pogłębiania nierówności.",
      "en": "A parliamentary briefing on apps, software, and connected devices supporting women’s health. It reviews the evidence base, regulation, safety and data privacy, NHS adoption, and the risk of widening inequalities."
    }
  },
  {
    "id": "report-2026-censorship",
    "cover": {
      "src": "/resources/covers/2026-official-censorship.png",
      "fit": "contain",
      "background": "#ffffff",
      "width": 1200,
      "height": 900,
      "source": "https://censhership.com/one-year-on"
    },
    "category": "global",
    "publisher": "CensHERship · The Case for Her",
    "href": {
      "pl": "https://censhership.com/one-year-on",
      "en": "https://censhership.com/one-year-on"
    },
    "title": {
      "pl": "Censorship Revealed: One Year On — The State of Women’s Health Censorship in 2026",
      "en": "Censorship Revealed: One Year On — The State of Women’s Health Censorship in 2026"
    },
    "description": {
      "pl": "Analiza ograniczania i moderowania treści dotyczących zdrowia kobiet na platformach cyfrowych rok po pierwszym badaniu CensHERship. Pokazuje, że problem nadal wpływa na sposób komunikowania się organizacji i dostęp odbiorczyń do informacji.",
      "en": "An analysis of restrictions and moderation affecting women’s health content on digital platforms one year after CensHERship’s first study. It shows that suppression continues to shape organizational communication and access to information."
    }
  },
  {
    "id": "report-2026-southeast-asia",
    "cover": {
      "src": "/resources/covers/2026-official-southeast-asia.jpg",
      "fit": "contain",
      "background": "#ffffff",
      "width": 1920,
      "height": 1080,
      "source": "https://www.linkedin.com/posts/femtechasia_2026-overview-of-the-femtech-industry-in-activity-7503256153502404608-zNuS"
    },
    "category": "global",
    "publisher": "FemTech Association Asia",
    "href": {
      "pl": "https://www.linkedin.com/posts/femtechasia_2026-overview-of-the-femtech-industry-in-activity-7503256153502404608-zNuS",
      "en": "https://www.linkedin.com/posts/femtechasia_2026-overview-of-the-femtech-industry-in-activity-7503256153502404608-zNuS"
    },
    "title": {
      "pl": "2026 Overview of the Femtech Industry in Southeast Asia",
      "en": "2026 Overview of the Femtech Industry in Southeast Asia"
    },
    "description": {
      "pl": "Przegląd rynku FemTech w Indonezji, Malezji, Filipinach, Singapurze, Tajlandii i Wietnamie. Obejmuje mapy rynku, modele biznesowe, obszary zdrowotne, finansowanie i profile rozwijających się ekosystemów regionu.",
      "en": "An overview of the FemTech sector in Indonesia, Malaysia, the Philippines, Singapore, Thailand, and Vietnam. It covers market maps, business models, health categories, funding, and emerging regional ecosystems."
    }
  },
  {
    "id": "report-2026-limited-definition",
    "cover": {
      "src": "/resources/covers/2026-official-limited-definition.png",
      "fit": "contain",
      "background": "#ffffff",
      "width": 980,
      "height": 1268,
      "source": "https://www.trillianthealth.com/2026-womens-health-research-report"
    },
    "category": "global",
    "publisher": "Trilliant Health",
    "href": {
      "pl": "https://www.trillianthealth.com/2026-womens-health-research-report",
      "en": "https://www.trillianthealth.com/2026-womens-health-research-report"
    },
    "title": {
      "pl": "How a Limited Women’s Health Definition Inadequately Shapes Research, Investment and Care Delivery",
      "en": "How a Limited Women’s Health Definition Inadequately Shapes Research, Investment and Care Delivery"
    },
    "description": {
      "pl": "31-stronicowa analiza pokazująca, jak zbyt wąskie sprowadzanie zdrowia kobiet do obszaru seksualnego i reprodukcyjnego wpływa na badania, finansowanie, udział w badaniach klinicznych, projektowanie świadczeń i dostęp do opieki.",
      "en": "A 31-page analysis of how narrowly defining women’s health around sexual and reproductive care shapes research, investment, clinical trial participation, benefit design, and access to care."
    }
  },
  {
    "id": "report-2026-global-index-year-5",
    "cover": {
      "src": "/resources/covers/2026-official-global-index.png",
      "fit": "contain",
      "background": "#ffffff",
      "width": 1008,
      "height": 1296,
      "source": "https://hologic.womenshealthindex.com/report-and-data"
    },
    "category": "global",
    "publisher": "Hologic · Gallup",
    "href": {
      "pl": "https://hologic.womenshealthindex.com/report-and-data",
      "en": "https://hologic.womenshealthindex.com/report-and-data"
    },
    "title": {
      "pl": "Global Women’s Health Index, Year 5",
      "en": "Global Women’s Health Index, Year 5"
    },
    "description": {
      "pl": "Globalny obraz zdrowia i dobrostanu kobiet oparty na doświadczeniach osób ze 144 krajów i terytoriów. Piąta edycja analizuje dostęp do opieki, profilaktykę i nierówności; dane zebrano w 2024 roku, a analizę opublikowano w 2026.",
      "en": "A global picture of women’s health and wellbeing based on experiences across 144 countries and territories. Year 5 examines access, prevention, and inequalities using 2024 data analyzed and published in 2026."
    }
  },
  {
    "id": "report-2026-hrp-annual",
    "cover": {
      "src": "/resources/covers/2026-official-hrp.png",
      "fit": "contain",
      "background": "#ffffff",
      "width": 1200,
      "height": 900,
      "source": "https://www.who.int/publications/i/item/9789240121843"
    },
    "category": "global",
    "publisher": "WHO · UNDP · UNFPA · UNICEF · World Bank",
    "href": {
      "pl": "https://www.who.int/publications/i/item/9789240121843",
      "en": "https://www.who.int/publications/i/item/9789240121843"
    },
    "title": {
      "pl": "HRP Annual Report 2025",
      "en": "HRP Annual Report 2025"
    },
    "description": {
      "pl": "Raport roczny programu HRP opisujący działania z 2025 roku na rzecz zdrowia seksualnego i reprodukcyjnego oraz praw reprodukcyjnych. Obejmuje badania, innowacje, partnerstwa i rozwiązania wzmacniające systemy ochrony zdrowia na świecie.",
      "en": "HRP’s annual report on its 2025 work to advance sexual and reproductive health and rights. It covers research, innovation, partnerships, and solutions that strengthen health systems and outcomes worldwide."
    }
  },
  {
    "id": "report-2026-femtech-spain",
    "cover": {
      "src": "/resources/covers/2026-official-femtech-spain.png",
      "fit": "contain",
      "background": "#ffffff",
      "width": 1200,
      "height": 900,
      "source": "https://www.femtechspain.es/en/ecosystem"
    },
    "category": "global",
    "publisher": "FemTech Spain · Ship2B Ventures",
    "href": {
      "pl": "https://www.femtechspain.es/en/report-2026.html",
      "en": "https://www.femtechspain.es/en/report-2026.html"
    },
    "title": {
      "pl": "Femtech Spain Industry Report 2026",
      "en": "Femtech Spain Industry Report 2026"
    },
    "description": {
      "pl": "Druga edycja raportu o hiszpańskim ekosystemie FemTech. Obejmuje mapę 64 aktywnych firm według kategorii, lokalizacji i technologii, a także analizę finansowania, inwestycji, regulacji i polityki zdrowotnej w Hiszpanii.",
      "en": "The second annual report on Spain’s FemTech ecosystem. It maps 64 active companies by category, geography, and technology type, and examines funding, investment, regulation, and women’s health policy in Spain."
    }
  },
  {
    "id": "resource-2026-boro-global-map",
    "cover": {
      "src": "/resources/covers/2026-official-boro-innovation-map.png",
      "width": 2400,
      "height": 1358,
      "source": "https://boro.fi/assets/img/blog/wh_map_cover.png"
    },
    "category": "global",
    "publisher": "Boro · Anastasiya Markvarde",
    "href": {
      "pl": "https://boro.fi/blog/map",
      "en": "https://boro.fi/blog/map"
    },
    "title": {
      "pl": "Globalna mapa innowacji w zdrowiu kobiet",
      "en": "Women’s Health Innovation Map by Country"
    },
    "description": {
      "pl": "Interaktywna mapa innowacji w zdrowiu kobiet obejmująca wybrane kraje i regiony. Zestawia rozwój polityk publicznych, rundy finansowania, inwestorów oraz najważniejsze organizacje ekosystemu, a dane są aktualizowane kwartalnie.",
      "en": "An interactive women’s health innovation map covering selected countries and regions. It brings together policy developments, funding rounds, investors, and major ecosystem organisations, with data updated quarterly."
    }
  },
  {
    "id": "resource-2026-finland-ecosystem-map",
    "cover": {
      "src": "/resources/covers/2026-official-finland-ecosystem-map.png",
      "width": 1600,
      "height": 1000,
      "source": "https://eir-accelerator.com/finland-ecosystem-map"
    },
    "category": "global",
    "publisher": "Eir Accelerator · Women’s Health Hub Finland · Business Turku",
    "href": {
      "pl": "https://eir-accelerator.com/finland-ecosystem-map",
      "en": "https://eir-accelerator.com/finland-ecosystem-map"
    },
    "title": {
      "pl": "Mapa fińskiego ekosystemu zdrowia kobiet",
      "en": "Finland Women’s Health Ecosystem Map"
    },
    "description": {
      "pl": "Interaktywna mapa 111 fińskich organizacji działających w 12 obszarach zdrowia kobiet. Obejmuje startupy, naukę, biobanki, inwestorów, ochronę zdrowia, firmy farmaceutyczne oraz instytucje wspierające rozwój ekosystemu.",
      "en": "An interactive map of 111 Finnish organisations active across 12 women’s health areas. It covers startups, research, biobanks, investors, healthcare, pharma, and public and ecosystem support organisations."
    }
  }
];

export const resources: PoppyResource[] = resourceEntries.map(resource => ({
  ...resource,
  cover: { ...resource.cover, src: sitePath(resource.cover.src) }
}));
