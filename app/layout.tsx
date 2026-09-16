import type { Metadata, Viewport } from "next";
import "../public/fonts/fonts.css";
import "./globals.css";
import "./redesign.css";
import "./poppy-intro.css";
import "lenis/dist/lenis.css";
import "./editorial-motion.css";
import "@/components/ui/fluid-button.css";

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
        url: "/favicon.svg?v=brandbook-20260915",
        type: "image/svg+xml"
      }
    ],
    shortcut: "/favicon.svg?v=brandbook-20260915"
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
  if (location.pathname === "/") {
    var playPoppyIntro = !location.hash && sessionStorage.getItem("poppy-intro-v8-clean") !== "seen" && document.documentElement.dataset.motion !== "off" && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.dataset.poppyIntro = playPoppyIntro ? "pending" : "done";
    setTimeout(function () {
      if (document.documentElement.dataset.poppyIntro === "pending") document.documentElement.dataset.poppyIntro = "done";
    }, 4500);
  }
} catch (error) { if (location.pathname === "/") document.documentElement.dataset.poppyIntro = "done"; }
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
      </body>
    </html>
  );
}
