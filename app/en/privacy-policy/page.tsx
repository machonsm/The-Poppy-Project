import { PoppyPrivacyPage } from "@/components/PoppyPrivacyPage";
import { localizedPageMetadata } from "@/lib/seo";
import { privacyRoutes } from "@/data/privacy";

export const metadata = localizedPageMetadata({
  title: "Privacy and cookie policy",
  description: "Information about the Poppy Project data controller, company form, Substack newsletter, analytics, cookies and your privacy rights.",
  canonical: privacyRoutes.en,
  ...privacyRoutes,
  locale: "en_GB"
});

export default function PrivacyPage() {
  return <PoppyPrivacyPage initialLanguage="en" />;
}
