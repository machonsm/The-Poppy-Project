"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PoppyLanguage } from "@/components/PoppyChrome";
import type { SubstackPost } from "@/data/substack";
import { links } from "@/data/links";

export function SubstackPostEmbed({ post, language }: { post: SubstackPost; language: PoppyLanguage }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(470);
  const [ready, setReady] = useState(false);
  const pl = language === "pl";

  useEffect(() => {
    const origin = new URL(links.substack).origin;
    const url = new URL(post.url.replace("/p/", "/embed/p/"));
    // The same post iframe and resize protocol as Substack's official embed.js.
    // Do not send the full parent URL, which could contain private query data.
    url.searchParams.set("origin", window.location.origin);
    const resize = (event: MessageEvent) => {
      if (event.origin !== origin || event.source !== frame.current?.contentWindow) return;
      const value = Number(event.data?.iframeHeight);
      if (!Number.isFinite(value) || value < 180 || value > 1800) return;
      setHeight(Math.ceil(value));
      setReady(true);
    };
    window.addEventListener("message", resize);
    if (frame.current) frame.current.src = url.href;
    return () => window.removeEventListener("message", resize);
  }, [post.url]);

  return (
    <article className="pp-substack-post" aria-label={post.title} data-post-id={post.id}>
      <div className="pp-substack-post__meta">
        <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat(pl ? "pl-PL" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Warsaw" }).format(new Date(post.publishedAt))}</time>
        <span>Substack</span>
      </div>
      <div className={`pp-substack-post__preview${ready ? " is-ready" : ""}`}>
        <div className="pp-substack-post__fallback" hidden={ready}>
          <span className="pp-eyebrow">FemTech po Polsku</span>
          <h3><a href={post.url} target="_blank" rel="noopener noreferrer">{post.title}</a></h3>
          {post.description && <p>{post.description}</p>}
        </div>
        <iframe
          ref={frame}
          title={`${pl ? "Artykuł na Substacku" : "Substack article"}: ${post.title}`}
          height={height}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          tabIndex={ready ? 0 : -1}
          aria-hidden={!ready}
        />
      </div>
      <a className="pp-substack-post__link" href={post.url} target="_blank" rel="noopener noreferrer" aria-label={`${pl ? "Czytaj na Substacku" : "Read on Substack"}: ${post.title} — ${pl ? "nowa karta" : "new tab"}`}>
        {pl ? "Czytaj na Substacku" : "Read on Substack"}<ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </article>
  );
}
