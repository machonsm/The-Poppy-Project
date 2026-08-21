"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { MapSection } from "@/components/sections/MapSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { SubmitSection } from "@/components/sections/SubmitSection";

export function HomePage() {
  return (
    <div className="site-shell">
      <Header />
      <main id="page">
        <HeroSection />
        <PillarsSection />
        <MapSection />
        <EventsSection />
        <InstagramSection />
        <SubmitSection />
      </main>
      <Footer />
    </div>
  );
}
