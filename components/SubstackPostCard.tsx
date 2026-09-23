"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { PoppyLanguage } from "@/components/PoppyChrome";
import { PoppyMark } from "@/components/brand/PoppyMark";
import type { SubstackPost } from "@/data/substack";
import { links } from "@/data/links";
import { FluidLink } from "@/components/ui/FluidButton";

const publicationName = "Poppy Project (FemTech PL)";

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
      <div className="pp-substack-post__card">
        <a className="pp-substack-post__cover" href={post.url} target="_blank" rel="noopener noreferrer" aria-label={`${post.title} — ${pl ? "czytaj na Substacku, nowa karta" : "read on Substack, new tab"}`}>
          {post.coverImage && !imageFailed ? (
            <Image src={coverPreview(post.coverImage)} alt="" width={1000} height={524} sizes="(max-width: 650px) 100vw, (max-width: 1100px) 50vw, 33vw" onError={() => setImageFailed(true)} />
          ) : (
            <div className="pp-substack-post__cover-fallback" aria-hidden="true"><PoppyMark /><span>{publicationName}</span></div>
          )}
        </a>
        <div className="pp-substack-post__body">
          <a className="pp-substack-post__title-link" href={post.url} target="_blank" rel="noopener noreferrer"><h3>{post.title}</h3></a>
          <p className="pp-substack-post__description">{post.description}</p>
          <a className="pp-substack-post__publication" href={links.substackPublication} target="_blank" rel="noopener noreferrer">{publicationName}</a>
          <FluidLink size="small" className="pp-substack-post__action" href={post.url} target="_blank" rel="noopener noreferrer">{pl ? "Czytaj na Substacku" : "Read on Substack"}<ArrowUpRight size={18} aria-hidden="true" /></FluidLink>
        </div>
      </div>
    </article>
  );
}
