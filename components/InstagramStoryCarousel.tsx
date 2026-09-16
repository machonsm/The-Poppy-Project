"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Minus, Pause, Play, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PoppyLanguage } from "@/components/PoppyChrome";
import { socialPosts } from "@/data/social";
import "./instagram-stories.css";

const copy = {
  pl: { label: "Wybrane posty FemTech po Polsku", hint: "Przeciągnij i odkrywaj", previous: "Poprzedni post", next: "Następny post", pause: "Zatrzymaj karuzelę", play: "Uruchom karuzelę", more: "Rozwiń opis", less: "Zwiń opis", open: "Otwórz na Instagramie w nowej karcie" },
  en: { label: "Selected FemTech po Polsku posts", hint: "Drag to explore", previous: "Previous post", next: "Next post", pause: "Pause carousel", play: "Play carousel", more: "Show caption", less: "Hide caption", open: "Open on Instagram in a new tab" },
};

export function InstagramStoryCarousel({ language }: { language: PoppyLanguage }) {
  const c = copy[language];
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const motion = useRef({ x: 0, size: 0, step: 0, hover: false, focus: false, visible: false, reduced: false, paused: false, dragging: false, dragged: false, start: 0, initialX: 0 });
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const rail = viewport.current;
    const strip = track.current;
    if (!rail || !strip) return;
    const state = motion.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    const paint = () => {
      if (!state.size) return;
      state.x = ((state.x - state.size) % state.size + state.size) % state.size + state.size;
      strip.style.transform = `translate3d(${-state.x}px, 0, 0)`;
    };
    const measure = () => {
      const first = strip.children[0] as HTMLElement;
      const second = strip.children[1] as HTMLElement;
      const previousSize = state.size;
      state.size = second.offsetLeft - first.offsetLeft;
      state.step = (first.children[1] as HTMLElement).offsetLeft - (first.children[0] as HTMLElement).offsetLeft;
      state.x = previousSize ? state.x / previousSize * state.size : state.size;
      paint();
    };
    const preferences = () => { state.reduced = reduced.matches || document.documentElement.dataset.motion === "off"; };
    const tick = (time: number) => {
      const delta = Math.min(40, time - (previous || time));
      previous = time;
      if (state.visible && !document.hidden && !state.paused && !state.reduced && !state.hover && !state.focus && !state.dragging) state.x += delta * .024;
      paint();
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => { state.visible = entry.isIntersecting; }, { threshold: .1 });
    observer.observe(rail);
    const resize = new ResizeObserver(measure);
    resize.observe(rail);
    const mutation = new MutationObserver(preferences);
    mutation.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
    reduced.addEventListener("change", preferences);
    preferences(); measure(); frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect(); mutation.disconnect(); reduced.removeEventListener("change", preferences); };
  }, []);

  const move = (direction: number) => {
    const state = motion.current;
    state.paused = true;
    setPaused(true);
    state.x += direction * state.step;
  };

  return <div className="pp-stories" role="region" aria-roledescription="carousel" aria-label={c.label}>
    <div className="pp-stories__viewport" ref={viewport} tabIndex={0} data-lenis-prevent-horizontal
      onPointerEnter={event => { if (event.pointerType === "mouse") motion.current.hover = true; }}
      onPointerLeave={() => { motion.current.hover = false; }}
      onPointerDown={event => {
        if (event.button !== 0 || (event.target as Element).closest("button")) return;
        const state = motion.current;
        state.dragging = true; state.dragged = false; state.start = event.clientX; state.initialX = state.x;
      }}
      onPointerMove={event => {
        const state = motion.current;
        if (!state.dragging) return;
        const distance = event.clientX - state.start;
        if (Math.abs(distance) > 6) { state.dragged = true; event.currentTarget.setPointerCapture(event.pointerId); }
        state.x = state.initialX - distance;
      }}
      onPointerUp={event => {
        const state = motion.current; state.dragging = false;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => { motion.current.dragging = false; }}
      onClickCapture={event => { if (motion.current.dragged) { event.preventDefault(); event.stopPropagation(); motion.current.dragged = false; } }}
      onDragStart={event => event.preventDefault()}
      onFocusCapture={event => {
        const state = motion.current; state.focus = true;
        const card = (event.target as Element).closest<HTMLElement>(".pp-story");
        if (card) {
          const bounds = card.getBoundingClientRect(); const visible = event.currentTarget.getBoundingClientRect();
          if (bounds.left < visible.left || bounds.right > visible.right) state.x += bounds.left - visible.left - 12;
        }
      }}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) motion.current.focus = false; }}
      onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}>
      <div className="pp-stories__track" ref={track}>
        {[0, 1, 2].map(group => <div className="pp-stories__group" key={group} aria-hidden={group !== 1 || undefined}>
          {socialPosts.map((post, index) => {
            const key = `${group}-${post.id}`;
            const open = expanded === key;
            return <article className={`pp-story${open ? " is-expanded" : ""}`} key={post.id} aria-roledescription="slide" aria-label={`${index + 1} / ${socialPosts.length}`}>
              <a className="pp-story__image" href={post.href} target="_blank" rel="noopener noreferrer" tabIndex={group === 1 ? 0 : -1} aria-label={`${post.title[language]} — ${c.open}`}>
                <Image src={post.image} alt={post.title[language]} width={500} height={500} sizes="(max-width: 650px) 82vw, (max-width: 1200px) 38vw, 420px" loading="lazy" draggable={false} />
              </a>
              <div className="pp-story__caption">
                <button type="button" className="pp-story__toggle" aria-expanded={open} aria-controls={`story-caption-${key}`} aria-label={`${open ? c.less : c.more}: ${post.title[language]}`} tabIndex={group === 1 ? 0 : -1} onClick={() => setExpanded(open ? null : key)}>
                  <span>{post.title[language]}</span><span className="pp-story__sign" aria-hidden="true">{open ? <Minus size={16} /> : <Plus size={16} />}</span>
                </button>
                <div id={`story-caption-${key}`} className="pp-story__description" inert={!open}><div><p>{post.description[language]}</p><a href={post.href} target="_blank" rel="noopener noreferrer" tabIndex={group === 1 && open ? 0 : -1} aria-label={`${post.title[language]} — ${c.open}`}>@femtechpo.pl</a></div></div>
              </div>
            </article>;
          })}
        </div>)}
      </div>
    </div>
    <div className="pp-stories__controls pp-container">
      <span>{c.hint}<span className="pp-stories__line" aria-hidden="true" /></span>
      <div>
        <button type="button" aria-label={c.previous} onClick={() => move(-1)}><ArrowLeft size={18} /></button>
        <button type="button" aria-label={paused ? c.play : c.pause} aria-pressed={paused} onClick={() => { motion.current.paused = !paused; setPaused(!paused); }}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>
        <button type="button" aria-label={c.next} onClick={() => move(1)}><ArrowRight size={18} /></button>
      </div>
    </div>
  </div>;
}
