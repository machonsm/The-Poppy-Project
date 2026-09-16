/**
 * Public directory fields curated from the user-provided
 * "Polskie Startupy FemTech - PL FemTech List.csv".
 *
 * Groups, locations and sectors follow the source, not inferred geography.
 * Missing values stay null; an unspecified sector uses "other".
 * Descriptions are concise, neutral summaries, not verified clinical claims.
 * Founder names, fundraising and internal assessments are intentionally omitted.
 */
export type FemtechLabel = { pl: string; en: string };
export type FemtechGroupId = "poland" | "global" | "international";
export type FemtechSectorId =
  | "fertility" | "menstrual" | "pelvic" | "endometriosis" | "menopause"
  | "oncology" | "mental" | "hormonal" | "other";
export type FemtechCityId =
  | "warszawa" | "olsztyn" | "krakow" | "poznan" | "szczecin"
  | "gdansk" | "radom" | "wroclaw" | "katowice" | "pulawy";

export type FemtechCompany = {
  id: string;
  name: string;
  group: FemtechGroupId;
  cityId: FemtechCityId | null;
  location: FemtechLabel | null;
  sectorId: FemtechSectorId;
  description: FemtechLabel | null;
  website: string | null;
  typeLabel: FemtechLabel | null;
  businessModel: string | null;
};

export const femtechSectors: { id: FemtechSectorId; label: FemtechLabel }[] = [
  {
    "id": "fertility",
    "label": {
      "pl": "Płodność i reprodukcja",
      "en": "Fertility & reproduction"
    }
  },
  {
    "id": "menstrual",
    "label": {
      "pl": "Zdrowie menstruacyjne",
      "en": "Menstrual health"
    }
  },
  {
    "id": "pelvic",
    "label": {
      "pl": "Zdrowie miednicy, ciąża i poród",
      "en": "Pelvic health, pregnancy & birth"
    }
  },
  {
    "id": "endometriosis",
    "label": {
      "pl": "Endometrioza",
      "en": "Endometriosis"
    }
  },
  {
    "id": "menopause",
    "label": {
      "pl": "Menopauza",
      "en": "Menopause"
    }
  },
  {
    "id": "oncology",
    "label": {
      "pl": "Onkologia",
      "en": "Oncology"
    }
  },
  {
    "id": "mental",
    "label": {
      "pl": "Zdrowie psychiczne i doradztwo",
      "en": "Mental health & advisory"
    }
  },
  {
    "id": "hormonal",
    "label": {
      "pl": "Zdrowie hormonalne i PCOS",
      "en": "Hormonal health & PCOS"
    }
  },
  {
    "id": "other",
    "label": {
      "pl": "Inne / nieokreślone",
      "en": "Other / unspecified"
    }
  }
];

export const femtechGroups: { id: FemtechGroupId; label: FemtechLabel }[] = [
  {
    "id": "poland",
    "label": {
      "pl": "FemTech w Polsce",
      "en": "FemTech in Poland"
    }
  },
  {
    "id": "global",
    "label": {
      "pl": "Polscy założyciele za granicą",
      "en": "Polish founders abroad"
    }
  },
  {
    "id": "international",
    "label": {
      "pl": "Zagraniczni założyciele w Polsce",
      "en": "International founders in Poland"
    }
  }
];

export const femtechCompanies: FemtechCompany[] = [
  {
    "id": "mim-fertility",
    "name": "MIM Fertility",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "fertility",
    "description": {
      "pl": "Narzędzia AI wspierające pracę klinik leczenia niepłodności i procedury in vitro.",
      "en": "AI tools supporting fertility clinics and IVF care."
    },
    "website": "https://mimfertility.ai/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "B2B"
  },
  {
    "id": "iyoni",
    "name": "iYoni",
    "group": "poland",
    "cityId": "olsztyn",
    "location": {
      "pl": "Olsztyn",
      "en": "Olsztyn"
    },
    "sectorId": "fertility",
    "description": {
      "pl": "Aplikacja wykorzystująca AI do wspierania płodności i zdrowia hormonalnego w modelu wirtualnej kliniki.",
      "en": "An AI-powered fertility and hormonal health app with a virtual clinic model."
    },
    "website": "https://iyoni.app/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "D2C, B2B2C"
  },
  {
    "id": "ovufriend",
    "name": "OvuFriend",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "fertility",
    "description": {
      "pl": "Platforma do obserwacji płodności i zdrowia hormonalnego ze społecznością wzajemnego wsparcia.",
      "en": "A fertility and hormonal health tracking platform with a peer support community."
    },
    "website": "https://ovufriend.pl/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "D2C"
  },
  {
    "id": "my-ovu",
    "name": "My Ovu",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "fertility",
    "description": {
      "pl": "Urządzenie do monitorowania płodności i cyklu menstruacyjnego.",
      "en": "A device for tracking fertility and the menstrual cycle."
    },
    "website": "https://my-ovu.com/",
    "typeLabel": {
      "pl": "Urządzenie medyczne",
      "en": "Medical device"
    },
    "businessModel": "D2C"
  },
  {
    "id": "klinika-digna",
    "name": "Klinika Digna",
    "group": "poland",
    "cityId": "krakow",
    "location": {
      "pl": "Kraków",
      "en": "Kraków"
    },
    "sectorId": "menopause",
    "description": {
      "pl": "Klinika telemedyczna oferująca wsparcie medyczne i edukacyjne w okresie okołomenopauzalnym.",
      "en": "A telehealth clinic offering medical and educational support during perimenopause."
    },
    "website": "https://digna.me/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "D2C"
  },
  {
    "id": "endome",
    "name": "EndoMe",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "endometriosis",
    "description": {
      "pl": "Suplementy i produkty codziennego użytku tworzone ze specjalistami z myślą o osobach z endometriozą.",
      "en": "Supplements and lifestyle products developed with specialists for people living with endometriosis."
    },
    "website": "https://endome.pl/",
    "typeLabel": {
      "pl": "Produkty konsumenckie",
      "en": "Consumer goods"
    },
    "businessModel": "D2C"
  },
  {
    "id": "hugup",
    "name": "HUGUP",
    "group": "poland",
    "cityId": "poznan",
    "location": {
      "pl": "Poznań",
      "en": "Poznań"
    },
    "sectorId": "pelvic",
    "description": {
      "pl": "Egzoszkielet ciążowy zaprojektowany do podtrzymywania brzucha i rozkładania jego ciężaru.",
      "en": "A pregnancy exoskeleton designed to support the belly and redistribute its weight."
    },
    "website": "https://hugup.com/",
    "typeLabel": {
      "pl": "Urządzenie medyczne",
      "en": "Medical device"
    },
    "businessModel": "D2C, B2B2C"
  },
  {
    "id": "bestie",
    "name": "Bestie",
    "group": "poland",
    "cityId": "szczecin",
    "location": {
      "pl": "Szczecin",
      "en": "Szczecin"
    },
    "sectorId": "menstrual",
    "description": {
      "pl": "Dysk menstruacyjny z silikonu oraz produkty uzupełniające, w tym tampony i plastry rozgrzewające.",
      "en": "A silicone menstrual disc and complementary products, including tampons and heat patches."
    },
    "website": "https://hibestie.pl/",
    "typeLabel": {
      "pl": "Produkty konsumenckie",
      "en": "Consumer goods"
    },
    "businessModel": "D2C"
  },
  {
    "id": "himommy-bemommy",
    "name": "HiMommy, BeMommy",
    "group": "poland",
    "cityId": "krakow",
    "location": {
      "pl": "Kraków",
      "en": "Kraków"
    },
    "sectorId": "fertility",
    "description": {
      "pl": "Aplikacja towarzysząca w ciąży i wczesnym rodzicielstwie, rozwijana również w kierunku zdrowia psychicznego matek.",
      "en": "A pregnancy and early parenthood app, also developing a focus on maternal mental health."
    },
    "website": "https://himommy.app/pl",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "D2C, B2B"
  },
  {
    "id": "ora",
    "name": "Ora",
    "group": "poland",
    "cityId": "gdansk",
    "location": {
      "pl": "Gdańsk",
      "en": "Gdańsk"
    },
    "sectorId": "menstrual",
    "description": {
      "pl": "Wielorazowe produkty menstruacyjne, w tym bielizna, kubeczki i dyski.",
      "en": "Reusable menstrual products, including period underwear, cups and discs."
    },
    "website": "https://myora.pl/",
    "typeLabel": {
      "pl": "Produkty konsumenckie",
      "en": "Consumer goods"
    },
    "businessModel": "D2C, B2B2C"
  },
  {
    "id": "femfast",
    "name": "FemFast",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "fertility",
    "description": {
      "pl": "Personalizacja oparta na AI i danych o cyklu w obszarze zdrowia hormonalnego, metabolizmu i zarządzania masą ciała.",
      "en": "AI-driven, cycle-aware personalisation for hormonal health, metabolic health and weight management."
    },
    "website": "https://femfast.io/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "D2C"
  },
  {
    "id": "menopedia",
    "name": "Menopedia",
    "group": "poland",
    "cityId": "krakow",
    "location": {
      "pl": "Kraków",
      "en": "Kraków"
    },
    "sectorId": "menopause",
    "description": {
      "pl": "Platforma edukacyjna o menopauzie z narzędziem do śledzenia objawów i forum wsparcia.",
      "en": "A menopause education platform with symptom tracking and a peer support forum."
    },
    "website": "https://www.menopedia.pl/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "B2B"
  },
  {
    "id": "menoscan",
    "name": "Menoscan",
    "group": "poland",
    "cityId": "radom",
    "location": {
      "pl": "Radom",
      "en": "Radom"
    },
    "sectorId": "menopause",
    "description": {
      "pl": "Spersonalizowane informacje o perimenopauzie łączące dane z urządzeń ubieralnych i zgłaszane objawy.",
      "en": "Personalised perimenopause insights combining wearable data and self-reported symptoms."
    },
    "website": "https://menoscan.pl/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "B2B, D2C"
  },
  {
    "id": "oncobag",
    "name": "OncoBag",
    "group": "poland",
    "cityId": "wroclaw",
    "location": {
      "pl": "Wrocław",
      "en": "Wrocław"
    },
    "sectorId": "oncology",
    "description": {
      "pl": "Torba z elementami wsparcia drenażu limfatycznego, zaprojektowana dla kobiet po mastektomii.",
      "en": "A bag with lymphatic drainage support, designed for women recovering from mastectomy."
    },
    "website": "https://oncobag.pl/",
    "typeLabel": {
      "pl": "Produkty konsumenckie",
      "en": "Consumer goods"
    },
    "businessModel": "D2C, B2B2C"
  },
  {
    "id": "vitabloom",
    "name": "Vitabloom",
    "group": "poland",
    "cityId": "wroclaw",
    "location": {
      "pl": "Wrocław",
      "en": "Wrocław"
    },
    "sectorId": "endometriosis",
    "description": {
      "pl": "Aplikacja do śledzenia objawów i edukacji o endometriozie, adenomiozie i zespole przekrwienia miednicy.",
      "en": "A symptom-tracking and education app focused on endometriosis, adenomyosis and pelvic congestion syndrome."
    },
    "website": "https://vitabloom.pl/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "D2C, B2B"
  },
  {
    "id": "ovu-cycles",
    "name": "Ovu Cycles",
    "group": "poland",
    "cityId": "poznan",
    "location": {
      "pl": "Poznań",
      "en": "Poznań"
    },
    "sectorId": "menstrual",
    "description": {
      "pl": "Aplikacja do obserwacji cyklu oraz platforma z kursami o płodności i zdrowiu hormonalnym.",
      "en": "A cycle-tracking app and a platform with courses on fertility and hormonal health."
    },
    "website": "https://www.ovucycles.com/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "D2C"
  },
  {
    "id": "yourkaya",
    "name": "YourKaya",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "menstrual",
    "description": {
      "pl": "Produkty menstruacyjne i do higieny intymnej z naciskiem na zrównoważony rozwój.",
      "en": "Menstrual and intimate care products with a focus on sustainability."
    },
    "website": "https://yourkaya.com/",
    "typeLabel": {
      "pl": "Produkty konsumenckie",
      "en": "Consumer goods"
    },
    "businessModel": "D2C"
  },
  {
    "id": "pelvifly",
    "name": "PelviFly",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa, Mannheim",
      "en": "Warsaw, Mannheim"
    },
    "sectorId": "pelvic",
    "description": {
      "pl": "Aplikacja do ćwiczeń mięśni dna miednicy i wsparcia powrotu do sprawności po porodzie.",
      "en": "An app for pelvic floor exercises and postpartum recovery."
    },
    "website": "https://pelvicoach.com/",
    "typeLabel": {
      "pl": "Urządzenie medyczne",
      "en": "Medical device"
    },
    "businessModel": "D2C"
  },
  {
    "id": "ailis",
    "name": "Ailis",
    "group": "poland",
    "cityId": "krakow",
    "location": {
      "pl": "Kraków",
      "en": "Kraków"
    },
    "sectorId": "oncology",
    "description": {
      "pl": "Technologia ukierunkowana na wczesne wykrywanie raka piersi.",
      "en": "Technology focused on early breast cancer detection."
    },
    "website": "https://ailiscare.com/",
    "typeLabel": {
      "pl": "Urządzenie medyczne",
      "en": "Medical device"
    },
    "businessModel": "B2B"
  },
  {
    "id": "emanui",
    "name": "Emanui",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "menstrual",
    "description": {
      "pl": "Przenośne urządzenie do czyszczenia i sterylizacji kubeczków menstruacyjnych.",
      "en": "A portable cleaner and steriliser for menstrual cups."
    },
    "website": "https://emanui.com/",
    "typeLabel": {
      "pl": "Produkty konsumenckie",
      "en": "Consumer goods"
    },
    "businessModel": "D2C"
  },
  {
    "id": "oasis-diagnostics",
    "name": "Oasis Diagnostics",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "pelvic",
    "description": {
      "pl": "Narzędzie diagnostyczne do oceny powikłań po porodzie drogami natury.",
      "en": "A diagnostic tool for assessing complications after vaginal childbirth."
    },
    "website": "https://oasis-diagnostics.com/",
    "typeLabel": {
      "pl": "Urządzenie medyczne",
      "en": "Medical device"
    },
    "businessModel": "B2B"
  },
  {
    "id": "ouli",
    "name": "Ouli",
    "group": "poland",
    "cityId": "katowice",
    "location": {
      "pl": "Katowice",
      "en": "Katowice"
    },
    "sectorId": "pelvic",
    "description": {
      "pl": "Rozwiązanie do terapii blizn dla kobiet po cesarskim cięciu.",
      "en": "A scar therapy solution for women recovering from caesarean sections."
    },
    "website": "https://ouli.io/",
    "typeLabel": {
      "pl": "Urządzenie medyczne",
      "en": "Medical device"
    },
    "businessModel": "B2B"
  },
  {
    "id": "diagendo",
    "name": "Diagendo",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "endometriosis",
    "description": {
      "pl": "Wyrób do diagnostyki in vitro ukierunkowany na rozpoznawanie endometriozy.",
      "en": "An in vitro diagnostic device focused on endometriosis diagnosis."
    },
    "website": "https://diagendo.com/",
    "typeLabel": {
      "pl": "Urządzenie medyczne",
      "en": "Medical device"
    },
    "businessModel": "B2B2C"
  },
  {
    "id": "finally-me",
    "name": "Finally.me",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "menstrual",
    "description": {
      "pl": "Produkty menstruacyjne.",
      "en": "Menstrual products."
    },
    "website": "https://finally.me/",
    "typeLabel": {
      "pl": "Produkty konsumenckie",
      "en": "Consumer goods"
    },
    "businessModel": "D2C"
  },
  {
    "id": "herrise",
    "name": "HerRise",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "mental",
    "description": {
      "pl": "Oprogramowanie do wsparcia emocjonalnego i zarządzania emocjami.",
      "en": "Software for emotional support and management."
    },
    "website": "https://herrise.pl/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "D2C"
  },
  {
    "id": "pregnabit-by-nestmedic",
    "name": "Pregnabit by Nestmedic",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "pelvic",
    "description": {
      "pl": "Urządzenie wspierające monitorowanie ciąży.",
      "en": "A device supporting pregnancy monitoring."
    },
    "website": "https://pregnabit.com/",
    "typeLabel": {
      "pl": "Urządzenie medyczne",
      "en": "Medical device"
    },
    "businessModel": "B2B"
  },
  {
    "id": "womanup",
    "name": "WomanUp",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "pelvic",
    "description": {
      "pl": "Aplikacja do ćwiczeń mięśni dna miednicy i treningu fizycznego dla kobiet.",
      "en": "A pelvic floor and physical training app for women."
    },
    "website": "https://womanup.pl/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "D2C"
  },
  {
    "id": "braster",
    "name": "Braster",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "oncology",
    "description": {
      "pl": "Urządzenie do badania piersi.",
      "en": "A breast examination device."
    },
    "website": "https://www.braster.eu/",
    "typeLabel": {
      "pl": "Urządzenie medyczne",
      "en": "Medical device"
    },
    "businessModel": null
  },
  {
    "id": "endofind",
    "name": "EndoFind",
    "group": "poland",
    "cityId": "pulawy",
    "location": {
      "pl": "Puławy",
      "en": "Puławy"
    },
    "sectorId": "endometriosis",
    "description": {
      "pl": "Narzędzia wspierające wykrywanie endometriozy z wykorzystaniem analizy obrazu i sztucznej inteligencji.",
      "en": "Tools supporting endometriosis detection using computer vision and artificial intelligence."
    },
    "website": "https://endofind.com/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "B2B"
  },
  {
    "id": "sophia-health",
    "name": "Sophia Health",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "mental",
    "description": {
      "pl": "Programy profilaktyki zdrowotnej i dobrostanu projektowane dla miejsc pracy.",
      "en": "Preventive health and wellbeing programmes designed for workplaces."
    },
    "website": null,
    "typeLabel": {
      "pl": "Doradztwo",
      "en": "Consultancy"
    },
    "businessModel": "B2B2C"
  },
  {
    "id": "iron-kegel",
    "name": "Iron Kegel",
    "group": "poland",
    "cityId": "wroclaw",
    "location": {
      "pl": "Wrocław",
      "en": "Wrocław"
    },
    "sectorId": "pelvic",
    "description": {
      "pl": "Aplikacja do ćwiczeń mięśni Kegla.",
      "en": "An app for Kegel exercises."
    },
    "website": "https://ironkegelapp.pl/#women",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "D2C"
  },
  {
    "id": "menoprzelom",
    "name": "MenoPrzełom",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "menopause",
    "description": {
      "pl": "Platforma internetowa i usługi doradcze związane z menopauzą.",
      "en": "An online platform and advisory services focused on menopause."
    },
    "website": "https://menoprzelom.pl/",
    "typeLabel": {
      "pl": "Doradztwo",
      "en": "Consultancy"
    },
    "businessModel": "D2C"
  },
  {
    "id": "normalnie",
    "name": "Normalnie",
    "group": "poland",
    "cityId": null,
    "location": null,
    "sectorId": "menstrual",
    "description": null,
    "website": "https://www.normalnie.com/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "D2C"
  },
  {
    "id": "holos",
    "name": "Holos",
    "group": "poland",
    "cityId": null,
    "location": null,
    "sectorId": "hormonal",
    "description": null,
    "website": "https://getholos.co/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "D2C"
  },
  {
    "id": "mymidwife",
    "name": "MyMidwife",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "pelvic",
    "description": null,
    "website": "https://mymidwife.pl/en",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "D2C"
  },
  {
    "id": "arcana",
    "name": "Arcana",
    "group": "poland",
    "cityId": "warszawa",
    "location": {
      "pl": "Warszawa",
      "en": "Warsaw"
    },
    "sectorId": "other",
    "description": null,
    "website": null,
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": null
  },
  {
    "id": "asele",
    "name": "Asele",
    "group": "international",
    "cityId": null,
    "location": {
      "pl": "Nigeria",
      "en": "Nigeria"
    },
    "sectorId": "menstrual",
    "description": {
      "pl": "Platforma zdrowia i produktywności kobiet uwzględniająca poszczególne fazy cyklu.",
      "en": "A women’s health and productivity platform designed around the phases of the menstrual cycle."
    },
    "website": null,
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "D2C"
  },
  {
    "id": "mama-air",
    "name": "Mama Air",
    "group": "international",
    "cityId": null,
    "location": {
      "pl": "Kenia",
      "en": "Kenya"
    },
    "sectorId": "pelvic",
    "description": {
      "pl": "Mobilny asystent samoopieki w ciąży z codziennymi, spersonalizowanymi wskazówkami.",
      "en": "A mobile maternal self-care assistant offering daily, personalised pregnancy guidance."
    },
    "website": "https://mamaair.africa/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "D2C"
  },
  {
    "id": "prosoma",
    "name": "Prosoma",
    "group": "global",
    "cityId": null,
    "location": {
      "pl": "Berlin",
      "en": "Berlin"
    },
    "sectorId": "oncology",
    "description": {
      "pl": "Rozwiązanie cyfrowe wspierające dobrostan emocjonalny osób z chorobą nowotworową.",
      "en": "A digital solution supporting the emotional wellbeing of people living with cancer."
    },
    "website": "https://prosoma.com/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "D2C"
  },
  {
    "id": "dama-health",
    "name": "Dama Health",
    "group": "global",
    "cityId": null,
    "location": {
      "pl": "Londyn",
      "en": "London"
    },
    "sectorId": "menstrual",
    "description": {
      "pl": "Rozwiązania do personalizacji antykoncepcji hormonalnej.",
      "en": "Solutions for personalised hormonal contraception."
    },
    "website": "https://damahealth.com/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "B2B"
  },
  {
    "id": "joii",
    "name": "Joii",
    "group": "global",
    "cityId": null,
    "location": {
      "pl": "Dublin",
      "en": "Dublin"
    },
    "sectorId": "menstrual",
    "description": {
      "pl": "Oprogramowanie do pomiaru objętości krwawienia menstruacyjnego.",
      "en": "Software for measuring menstrual blood volume."
    },
    "website": "https://joiicare.com/",
    "typeLabel": {
      "pl": "Urządzenie medyczne",
      "en": "Medical device"
    },
    "businessModel": "D2C"
  },
  {
    "id": "3mbrace-health",
    "name": "3mbrace Health",
    "group": "global",
    "cityId": null,
    "location": {
      "pl": "Amsterdam",
      "en": "Amsterdam"
    },
    "sectorId": "mental",
    "description": {
      "pl": "Programy dla organizacji wspierające zdrowie i dobrostan kobiet w miejscu pracy.",
      "en": "Programmes helping organisations support women’s health and wellbeing at work."
    },
    "website": "https://3mbracehealth.com/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": "B2B2C"
  },
  {
    "id": "moya-health",
    "name": "Moya Health",
    "group": "global",
    "cityId": null,
    "location": {
      "pl": "Londyn",
      "en": "London"
    },
    "sectorId": "other",
    "description": {
      "pl": "Cyfrowy asystent zarządzania chorobami przewlekłymi, początkowo skupiony na schorzeniach skóry.",
      "en": "A chronic health management companion with an initial focus on skin conditions."
    },
    "website": "https://moyahealth.app/",
    "typeLabel": {
      "pl": "Oprogramowanie",
      "en": "Software"
    },
    "businessModel": null
  },
  {
    "id": "athena-fertility",
    "name": "Athena Fertility",
    "group": "global",
    "cityId": null,
    "location": null,
    "sectorId": "other",
    "description": null,
    "website": null,
    "typeLabel": null,
    "businessModel": null
  }
];
