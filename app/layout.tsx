import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteName = "The Poppy Project";
const description =
  "The Poppy Project to polska platforma innowacji w zdrowiu kobiet. Nowa strona startuje wkrótce.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.femtechpo.pl"),
  title: {
    default: `${siteName} | Launching Soon`,
    template: `%s | ${siteName}`
  },
  description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `${siteName} | Launching Soon`,
    description,
    url: "/",
    siteName,
    locale: "pl_PL",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Launching Soon`,
    description
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FDFAF7"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
