import { ArrowRight, Instagram } from "lucide-react";
import Image from "next/image";
import { SeedField } from "@/components/brand/SeedField";
import { legacySocialPosts, socialProfileUrl } from "@/data/social";
import { Reveal } from "@/components/motion/Reveal";

export function InstagramSection() {
  return (
    <section className="section instagram-section" id="instagram" aria-labelledby="instagram-title">
      <div className="container instagram-section__inner">
        <Reveal className="instagram-section__header">
          <p className="section-kicker">Instagram</p>
          <h2 className="section-title" id="instagram-title">
            Aktualności w rytmie publikacji.
          </h2>
          <a className="button button-secondary" href={socialProfileUrl} target="_blank" rel="noreferrer">
            <Instagram size={16} aria-hidden="true" />
            Obserwuj
          </a>
        </Reveal>

        <div className="social-grid">
          <SeedField density="compact" accentIndex={18} className="social-grid__seeds" />
          {legacySocialPosts.map((post, index) => (
            <Reveal key={post.href} delay={index * 0.04} className={`social-post social-post--${index + 1}`}>
              <a href={post.href} target="_blank" rel="noreferrer">
                <Image
                  src={post.image}
                  alt={post.alt}
                  width={1080}
                  height={index === 0 ? 1350 : 1080}
                  sizes="(max-width: 560px) 100vw, (max-width: 820px) 50vw, 32vw"
                />
                <span>
                  Zobacz post
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
