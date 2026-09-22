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

const siteName = "Poppy Project";
const description =
  "Poppy Project to polska platforma innowacji w zdrowiu kobiet. Łączymy polskie innowacje z globalnymi trendami, wiedzą i możliwościami współpracy.";

export const metadata: Metadata = {
  metadataBase: new URL("https://thepoppyproject.pl"),
  title: {
    default: siteName,
    template: `%s | ${siteName}`
  },
  description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: siteName,
    description,
    url: "/",
    siteName,
    locale: "pl_PL",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description
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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionPreferenceScript }} />
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
