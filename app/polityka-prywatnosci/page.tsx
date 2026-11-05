import { PoppyPrivacyPage } from "@/components/PoppyPrivacyPage";
import { localizedPageMetadata } from "@/lib/seo";
import { privacyRoutes } from "@/data/privacy";

export const metadata = localizedPageMetadata({
  title: "Polityka prywatności i cookies",
  description: "Administrator danych, formularz firmy, newsletter na Substacku, analityka, cookies i prawa osób korzystających z Poppy Project.",
  canonical: privacyRoutes.pl,
  ...privacyRoutes
});

export default function PrivacyPage() {
  return <PoppyPrivacyPage initialLanguage="pl" />;
}
