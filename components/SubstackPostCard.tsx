"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { PoppyLanguage } from "@/components/PoppyChrome";
import { PoppyMark } from "@/components/brand/PoppyMark";
import type { SubstackPost } from "@/data/substack";
import { FluidSurface } from "@/components/ui/FluidButton";

function coverPreview(url: string) {
  // Substack's image service keeps large original photographs out of the grid.
  return new URL(url).hostname === "substack-post-media.s3.amazonaws.com"
    ? `https://substackcdn.com/image/fetch/w_1000,h_524,c_fill,f_auto,q_auto:good/${encodeURIComponent(url)}`
    : url;
}

export function SubstackPostCard({ post, language }: { post: SubstackPost; language: PoppyLanguage }) {
  const [imageFailed, setImageFailed] = useState(false);
  const pl = language === "pl";

  return (
    <article className="pp-substack-post" data-post-id={post.id}>
      <div className="pp-substack-post__meta">
        <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat(pl ? "pl-PL" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Warsaw" }).format(new Date(post.publishedAt))}</time>
        <span>Substack</span>
      </div>
      <a className="pp-substack-post__card" href={post.url} target="_blank" rel="noopener noreferrer" aria-label={`${post.title} — ${pl ? "czytaj na Substacku, nowa karta" : "read on Substack, new tab"}`} data-fluid-trigger>
        <div className="pp-substack-post__cover">
          {post.coverImage && !imageFailed ? (
            <Image src={coverPreview(post.coverImage)} alt="" width={1000} height={524} sizes="(max-width: 650px) 100vw, (max-width: 1100px) 50vw, 33vw" onError={() => setImageFailed(true)} />
          ) : (
            <div className="pp-substack-post__cover-fallback" aria-hidden="true"><PoppyMark /><span>FemTech po Polsku</span></div>
          )}
        </div>
        <div className="pp-substack-post__body">
          <h3>{post.title}</h3>
          <p className="pp-substack-post__description">{post.description}</p>
          <span className="pp-substack-post__publication">FemTech po Polsku</span>
          <FluidSurface size="small" className="pp-substack-post__action">{pl ? "Czytaj na Substacku" : "Read on Substack"}<ArrowUpRight size={18} aria-hidden="true" /></FluidSurface>
        </div>
      </a>
    </article>
  );
}
