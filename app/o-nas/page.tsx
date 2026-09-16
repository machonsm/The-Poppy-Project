import type { Metadata } from "next";
import { PoppyAboutPage } from "@/components/PoppyAboutPage";

export const metadata: Metadata = {
  title: "O nas",
  alternates: {
    canonical: "/o-nas/"
  }
};

export default function AboutPage() {
  return <PoppyAboutPage />;
}
