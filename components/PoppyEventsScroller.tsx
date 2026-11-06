"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function PoppyEventsScroller({ language, loading, children }: {
  language: "pl" | "en";
  loading: boolean;
  children: ReactNode;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [position, setPosition] = useState({ overflow: false, up: false, down: false });
  const pl = language === "pl";

  useEffect(() => {
    const element = viewport.current;
    const list = content.current;
    if (!element || !list) return;
    const measure = () => {
      const next = {
        overflow: element.scrollHeight > element.clientHeight + 1,
        up: element.scrollTop > 1,
        down: element.scrollTop + element.clientHeight < element.scrollHeight - 1
      };
      setPosition(previous => previous.overflow === next.overflow && previous.up === next.up && previous.down === next.down ? previous : next);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    observer.observe(list);
    element.addEventListener("scroll", measure, { passive: true });
    const frame = requestAnimationFrame(measure);
    return () => { observer.disconnect(); element.removeEventListener("scroll", measure); cancelAnimationFrame(frame); };
  }, [children, expanded]);

  const scroll = (direction: number) => {
    const element = viewport.current;
    if (!element) return;
    element.scrollBy({ top: direction * element.clientHeight * .8, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return <div className="pp-events__browser">
    {(position.overflow || expanded) && <div className="pp-events__scroll-tools" role="group" aria-label={pl ? "Przeglądanie wydarzeń" : "Browse events"}>
      <button type="button" className="pp-events__expand" data-events-expand aria-controls="pp-events-results" aria-expanded={expanded} onClick={() => setExpanded(previous => !previous)}>{expanded ? (pl ? "Zwiń listę" : "Collapse list") : (pl ? "Pokaż wszystkie wydarzenia" : "Show all events")}</button>
      {!expanded && <>
        <button type="button" className="pp-events__scroll-button" data-events-scroll="up" aria-controls="pp-events-results" aria-label={pl ? "Przewiń wydarzenia w górę" : "Scroll events up"} disabled={!position.up} onClick={() => scroll(-1)}><ArrowUp size={18} aria-hidden="true" /></button>
        <button type="button" className="pp-events__scroll-button" data-events-scroll="down" aria-controls="pp-events-results" aria-label={pl ? "Przewiń wydarzenia w dół" : "Scroll events down"} disabled={!position.down} onClick={() => scroll(1)}><ArrowDown size={18} aria-hidden="true" /></button>
      </>}
    </div>}
    <div ref={viewport} className="pp-events__results" id="pp-events-results" role="region" aria-busy={loading} aria-label={pl ? "Lista wydarzeń" : "Events list"} tabIndex={position.overflow ? 0 : undefined} data-expanded={expanded}>
      <div ref={content}>{children}</div>
    </div>
  </div>;
}
