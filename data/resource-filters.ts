export type ResourceTopic =
  | "rynek-femtech"
  | "inwestycje"
  | "innowacje-badania"
  | "dane-ai"
  | "system-opieki"
  | "profilaktyka-diagnostyka"
  | "menstruacja"
  | "menopauza"
  | "zdrowie-seksualne-reprodukcyjne"
  | "zdrowie-w-pracy"
  | "prawa-rownosc"
  | "edukacja-komunikacja"
  | "piersi-onkologia"
  | "choroby-przewlekle"
  | "zdrowie-psychiczne";

export type ResourceDocumentLanguage = "pl" | "en" | "other";
export type ResourceGeography = "poland" | "global";

export type ResourceFilterMetadata = {
  years: number[];
  topics: ResourceTopic[];
  documentLanguage: ResourceDocumentLanguage;
  geography: ResourceGeography;
};

const metadata: Record<string, ResourceFilterMetadata> = {
  "report-1": { years: [2026], topics: ["profilaktyka-diagnostyka", "piersi-onkologia", "system-opieki"], documentLanguage: "pl", geography: "poland" },
  "report-2026-objawy-w-sieci": { years: [2026], topics: ["edukacja-komunikacja", "profilaktyka-diagnostyka", "zdrowie-seksualne-reprodukcyjne"], documentLanguage: "pl", geography: "poland" },
  "report-5": { years: [2025], topics: ["zdrowie-w-pracy", "menstruacja", "menopauza"], documentLanguage: "pl", geography: "poland" },
  "report-8": { years: [2025], topics: ["zdrowie-seksualne-reprodukcyjne", "profilaktyka-diagnostyka", "system-opieki"], documentLanguage: "pl", geography: "poland" },
  "report-9": { years: [2025], topics: ["menopauza", "system-opieki", "edukacja-komunikacja", "zdrowie-w-pracy"], documentLanguage: "pl", geography: "poland" },
  "report-2024-niewidzialne-w-pracy": { years: [2024], topics: ["menopauza", "zdrowie-w-pracy", "system-opieki", "edukacja-komunikacja"], documentLanguage: "pl", geography: "poland" },
  "report-7": { years: [2024], topics: ["system-opieki", "profilaktyka-diagnostyka"], documentLanguage: "pl", geography: "poland" },
  "report-2": { years: [2020], topics: ["menstruacja", "prawa-rownosc", "edukacja-komunikacja"], documentLanguage: "pl", geography: "global" },
  "report-3": { years: [2024], topics: ["edukacja-komunikacja", "zdrowie-seksualne-reprodukcyjne"], documentLanguage: "pl", geography: "poland" },
  "report-4": { years: [2023], topics: ["menopauza", "edukacja-komunikacja"], documentLanguage: "pl", geography: "poland" },
  "report-6": { years: [2021], topics: ["prawa-rownosc", "zdrowie-seksualne-reprodukcyjne"], documentLanguage: "pl", geography: "poland" },

  "report-11": { years: [2026], topics: ["inwestycje", "rynek-femtech", "innowacje-badania", "dane-ai"], documentLanguage: "en", geography: "global" },
  "report-2026-femmehealth-q1": { years: [2026], topics: ["inwestycje", "rynek-femtech"], documentLanguage: "en", geography: "global" },
  "report-2026-care-for-women": { years: [2026], topics: ["system-opieki", "profilaktyka-diagnostyka", "choroby-przewlekle", "zdrowie-psychiczne", "zdrowie-seksualne-reprodukcyjne"], documentLanguage: "en", geography: "global" },
  "report-2026-innovation-radar": { years: [2026], topics: ["innowacje-badania", "inwestycje", "system-opieki"], documentLanguage: "en", geography: "global" },
  "report-2026-accelerating-femtech": { years: [2026], topics: ["rynek-femtech", "innowacje-badania", "inwestycje"], documentLanguage: "en", geography: "global" },
  "report-2026-france-barometer": { years: [2026], topics: ["rynek-femtech", "inwestycje", "innowacje-badania"], documentLanguage: "other", geography: "global" },
  "report-2026-india-futures": { years: [2026], topics: ["system-opieki", "dane-ai", "innowacje-badania"], documentLanguage: "en", geography: "global" },
  "report-2026-uk-health-gap": { years: [2026], topics: ["system-opieki", "innowacje-badania"], documentLanguage: "en", geography: "global" },
  "report-2026-funding-q2": { years: [2026], topics: ["inwestycje", "rynek-femtech"], documentLanguage: "en", geography: "global" },
  "report-2026-era-of-scale": { years: [2026], topics: ["inwestycje", "rynek-femtech"], documentLanguage: "en", geography: "global" },
  "report-2026-reimbursement-roadmap": { years: [2026], topics: ["system-opieki", "innowacje-badania"], documentLanguage: "en", geography: "global" },
  "report-2026-post-femtech": { years: [2026], topics: ["innowacje-badania", "dane-ai", "system-opieki"], documentLanguage: "en", geography: "global" },
  "report-2026-censorship": { years: [2026], topics: ["edukacja-komunikacja", "prawa-rownosc"], documentLanguage: "en", geography: "global" },
  "report-2026-southeast-asia": { years: [2026], topics: ["rynek-femtech", "inwestycje", "innowacje-badania"], documentLanguage: "en", geography: "global" },
  "report-2026-limited-definition": { years: [2026], topics: ["system-opieki", "innowacje-badania", "zdrowie-seksualne-reprodukcyjne"], documentLanguage: "en", geography: "global" },
  "report-2026-global-index-year-5": { years: [2026], topics: ["system-opieki", "profilaktyka-diagnostyka", "zdrowie-psychiczne"], documentLanguage: "en", geography: "global" },
  "report-2026-hrp-annual": { years: [2026], topics: ["zdrowie-seksualne-reprodukcyjne", "innowacje-badania", "system-opieki"], documentLanguage: "en", geography: "global" },
  "report-2026-femtech-spain": { years: [2026], topics: ["rynek-femtech", "inwestycje", "system-opieki"], documentLanguage: "en", geography: "global" },
  "report-2026-wham-investing-in-menopause": { years: [2026], topics: ["menopauza", "inwestycje", "rynek-femtech", "system-opieki"], documentLanguage: "en", geography: "global" },
  "report-14": { years: [2026], topics: ["inwestycje", "rynek-femtech", "innowacje-badania"], documentLanguage: "en", geography: "global" },
  "report-21": { years: [2026], topics: ["inwestycje", "rynek-femtech"], documentLanguage: "en", geography: "global" },
  "report-13": { years: [2024], topics: ["rynek-femtech", "inwestycje"], documentLanguage: "en", geography: "global" },
  "report-18": { years: [2024], topics: ["rynek-femtech", "innowacje-badania", "inwestycje"], documentLanguage: "en", geography: "global" },
  "report-16": { years: [2024], topics: ["system-opieki", "innowacje-badania", "dane-ai", "inwestycje"], documentLanguage: "en", geography: "global" },
  "report-20": { years: [2023], topics: ["dane-ai", "innowacje-badania", "prawa-rownosc"], documentLanguage: "en", geography: "global" },
  "report-17": { years: [2024], topics: ["rynek-femtech", "inwestycje"], documentLanguage: "en", geography: "global" },
  "report-10": { years: [2026], topics: ["rynek-femtech", "inwestycje", "innowacje-badania", "dane-ai"], documentLanguage: "en", geography: "global" },
  "report-12": { years: [2024], topics: ["innowacje-badania", "rynek-femtech", "dane-ai"], documentLanguage: "en", geography: "global" },
  "report-15": { years: [2025], topics: ["system-opieki", "innowacje-badania", "dane-ai", "menopauza", "menstruacja", "piersi-onkologia", "zdrowie-seksualne-reprodukcyjne", "choroby-przewlekle"], documentLanguage: "en", geography: "global" },
  "report-19": { years: [2024, 2025], topics: ["system-opieki", "innowacje-badania", "inwestycje", "choroby-przewlekle"], documentLanguage: "en", geography: "global" },
  "report-22": { years: [2025, 2026], topics: ["inwestycje", "rynek-femtech", "innowacje-badania"], documentLanguage: "en", geography: "global" },
  "report-23": { years: [2026], topics: ["inwestycje", "rynek-femtech"], documentLanguage: "en", geography: "global" },
  "resource-2026-boro-global-map": { years: [2026], topics: ["rynek-femtech", "system-opieki", "inwestycje"], documentLanguage: "en", geography: "global" },
  "resource-2026-finland-ecosystem-map": { years: [2026], topics: ["rynek-femtech", "innowacje-badania"], documentLanguage: "en", geography: "global" }
};

const fallback: ResourceFilterMetadata = {
  years: [],
  topics: [],
  documentLanguage: "other",
  geography: "global"
};

export function getResourceFilterMetadata(id: string): ResourceFilterMetadata {
  return metadata[id] ?? fallback;
}
