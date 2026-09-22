import type { Metadata } from "next";
import { PoppyLanding } from "@/components/PoppyLanding";
import { currentEventDay } from "@/lib/event-dates";
import { localizedPageMetadata } from "@/lib/seo";

export const metadata: Metadata = localizedPageMetadata({
  title: "FemTech in Poland and innovation in women’s health",
  description: "Poppy Project is Poland’s platform for FemTech and women’s health innovation. Discover companies, events, reports, articles and podcasts.",
  canonical: "/en/",
  pl: "/",
  en: "/en/",
  locale: "en_GB"
});

export default function EnglishHomePage() {
  return <PoppyLanding initialLanguage="en" initialEventDay={currentEventDay()} />;
}
