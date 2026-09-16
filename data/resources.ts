// Text and original links migrated from femtechpo.pl/pl/materiay and /en/resources.
// Descriptions are the project's editorial copy, not independently verified report findings.
export type ResourceCategory = "poland" | "global";
export type PoppyResource = {
  id: string;
  category: ResourceCategory;
  publisher: string;
  cover: { src: string; width: number; height: number; source: string; position?: string; fit?: "contain"; background?: string };
  href: { pl: string; en: string };
  title: { pl: string; en: string };
  description: { pl: string; en: string };
};

export const resources: PoppyResource[] = [
  {
    "id": "report-1",
    "cover": {
      "src": "/resources/covers/report-1.png",
      "width": 750,
      "height": 563,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/668612d8-f427-461f-ade7-73705f21b182/Screenshot+2025-11-13+163840.png"
    },
    "category": "poland",
    "publisher": "SEXEDPL",
    "href": {
      "pl": "https://sexed.pl/piersi-w-polsce/",
      "en": "https://sexed.pl/piersi-w-polsce/"
    },
    "title": {
      "pl": "Piersi w Polsce",
      "en": "Piersi w Polsce"
    },
    "description": {
      "pl": "To przekrojowe wydawnictwo zbierające informacje nt. udziału i praw kobiet w różnych sferach życia politycznego, społecznego i prywatnego. Ekspertki z wybranych obszarów przedstawiają badania, analizy i tendencje oraz formułują rekomendacje działań potrzebnych dla poprawy standardów i ochrony praw kobiet.",
      "en": "This is a comprehensive publication gathering information on women’s participation and rights in various spheres of political, social, and private life. Experts from selected fields present research, analyses, and trends, and formulate recommendations for actions needed to improve standards and protect women’s rights."
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
      "src": "/resources/covers/report-11.png",
      "position": "12% 50%",
      "width": 750,
      "height": 425,
      "source": "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/de1f4c92-4e7f-4dd1-af3d-dd0983212e00/Screenshot+2025-10-12+at+14.06.35.png"
    },
    "category": "global",
    "publisher": "Silicon Valley Bank",
    "href": {
      "pl": "https://www.svb.com/trends-insights/reports/womens-health-report/",
      "en": "https://www.svb.com/trends-insights/reports/womens-health-report/"
    },
    "title": {
      "pl": "SVB: Innovation in Women's Health 2025",
      "en": "SVB: Innovation in Women's Health 2025"
    },
    "description": {
      "pl": "Najnowszy raport od Silicon Valley Bank (SVB), analizujący trendy inwestycyjne i innowacje w obszarze zdrowia kobiet w 2025 roku. Przedstawia on wzrost finansowania, rosnące znaczenie medycyny precyzyjnej, personalizowanej opieki i cyfrowych rozwiązań zdrowotnych, a także wyzwania rynkowe.",
      "en": "The latest report from Silicon Valley Bank (SVB) analyzes investment trends and innovations in women’s health for 2025. It highlights the growth of funding, the increasing importance of precision medicine, personalized care, and digital health solutions — as well as emerging market challenges."
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
  }
];
