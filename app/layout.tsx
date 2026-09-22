import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../public/fonts/fonts.css";
import "./globals.css";
import "./redesign.css";
import "./poppy-intro.css";
import "lenis/dist/lenis.css";
import "./editorial-motion.css";
import "@/components/ui/fluid-button.css";
import { sitePath } from "@/lib/site-path";
import { links } from "@/data/links";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_NAME, SITE_URL, SOCIAL_IMAGE, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`
  },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
    languages: {
      "pl-PL": "/",
      en: "/en/",
      "x-default": "/"
    }
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "pl_PL",
    alternateLocale: ["en_GB"],
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Poppy Project — FemTech w Polsce i innowacje w zdrowiu kobiet" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [SOCIAL_IMAGE]
  },
  icons: {
    icon: [
      {
        url: sitePath("/favicon.svg?v=transparent-20260921"),
        type: "image/svg+xml"
      }
    ],
    shortcut: sitePath("/favicon.svg?v=transparent-20260921")
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FDFBF7"
};

const motionPreferenceScript = `
try {
  if (sessionStorage.getItem("poppy-motion") === "off") document.documentElement.dataset.motion = "off";
} catch (error) {}
document.documentElement.dataset.poppyIntro = "done";
`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/poppy-logo.png`,
      email: links.email,
      sameAs: [links.instagram, links.linkedin, links.substack, links.spotify]
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: HOME_DESCRIPTION,
      inLanguage: ["pl-PL", "en"],
      publisher: { "@id": `${SITE_URL}/#organization` }
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionPreferenceScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema) }} />
      </head>
      <body>
        {children}
        <Script
          data-goatcounter="https://poppyproject.goatcounter.com/count"
          src="https://gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
