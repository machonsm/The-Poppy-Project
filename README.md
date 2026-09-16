# Poppy Project

The ready-to-view static website is in `out/`. To open it, run:

```bash
cd /Users/sandramachon/Documents/ThePoppyProject
python3 serve.py
```

Open the URL printed in Terminal. Keep Terminal running while viewing the site; stop it with `Ctrl+C`. The server prefers port 8765 and automatically picks a free port if it is occupied. No npm, Node.js, or internet connection is needed to view the exported site. External event links, social profiles, and email actions need their respective services.

## Editing the source

The editable source uses Next.js with static export. After source changes, regenerate `out/` with `npm run build`. This build step needs Node.js and installed dependencies; viewing the finished export only needs Python. Upload the contents of `out/` to a static host to publish.

The homepage is in `components/PoppyLanding.tsx`, shared navigation/footer in `components/PoppyChrome.tsx`, and the visual system in `app/redesign.css`. Brand fonts (Fraunces and Outfit, with Polish characters) are self-hosted in `public/fonts/` with their licenses. The supplied `poppy-replica.svg` is represented in `components/brand/poppyReplica.ts` with its original paths and painting order intact. `PoppyMark.tsx` frames it uniformly, removes the white canvas, and adapts its fills to the site's palette and monochrome treatments. The same artwork is used for the header, hero, footer, and favicon.

On the first home-page visit in a tab, a clean Warm Linen canvas appears with only the poppy, which fades in centrally, pauses, then glides to the right side of the desktop hero. The header and copy appear afterwards. The flower intro takes 2 seconds. Hovering or keyboard-focusing the poppy activates a gentle alternating petal flutter; the stem and full flower do not lean or follow the cursor. Interactive dots sit to the right of the flower. Escape, Tab or scrolling skip the intro. The site respects the system's reduced-motion preference. All flower motion uses the local SVG artwork, not embedded video.

## Editorial scrolling

Lenis 1.3.26 is bundled locally in the static export. `components/motion/usePoppyScroll.ts` owns a single animation clock: desktop wheel smoothing, hero parallax, portrait drift, resource-card arrangement, map tracing/pin reveals, and the Instagram belt's velocity response. `app/editorial-motion.css` contains the responsive scene styles. No CDN or Node server is needed to run them.

On a fine-pointer desktop at least 901px wide and 700px high, the hero stays in place while the About section covers it. The interactive Poland map stays visible alongside three short narrative chapters, followed by the directory. The city buttons remain usable throughout; choosing one scrolls to the results. The directory has `data-lenis-prevent` so its internal list scroll works independently. Header/section anchors are handled by Lenis with a header offset.

`components/brand/PoppyBloomBorder.tsx` adds nineteen decorative poppies rooted exclusively at the About section's top edge (ten on mobile). Curved SVG stems draw upwards with scroll progress; flower heads follow the growing tips and open using the original logo paths. Scrolling back reverses the growth. The border is absent during the intro, cannot catch clicks, and does not cover the About copy. Reduced motion shows a finished, static border when the section enters view. The supplied floral image is a visual reference; no raster asset or third-party Framer component is embedded.

Touch devices and short/narrow screens retain native scrolling, a normal document layout and a direct map-to-directory flow. System reduced-motion and the saved motion preference disable the cinematic scenes and scroll smoothing; these preferences are observed live. Animation work pauses when the document is hidden. The About biographies use accessible buttons and animated, collapsible panels in `components/AnimatedBiography.tsx`. Without JavaScript the page content and biographies remain visible, with no scroll-dependent controls.

The hero and its sticky navigation share the Warm Linen background without a separating rule. Desktop navigation is centered in the header. The red editorial headline remains, while the small platform descriptor above it is intentionally omitted. The flower is framed by the original thin olive circles, with a solid outer ring and a dashed inner ring. The background remains clear while scrolling, with no falling-petal overlay. The hero's primary red panel posts its branded email form directly to the publication's official Substack subscription endpoint. The original scrolling belt now introduces a dedicated section with six selected Instagram post embeds. Substack signup and Instagram embeds require an internet connection.

The events section uses `components/PoppyEventList.tsx`: the original ruled list with date, title, location, and direct organiser links. Hovering or keyboard-focusing a row reveals a floating, tilted event image and highlights its arrow; mobile keeps the compact, directly tappable rows without the floating preview. Existing regional filters, event data, and bilingual labels are retained.

The interactive company explorer is at `/#firmy`, linked from the header and hero. `components/FemtechExplorer.tsx` provides city clusters, accent-insensitive search, health-area and location filters, and bilingual company profiles. All 44 CSV entries are retained in `data/femtech-companies.ts`; 34 have a Polish city and the other 10 remain accessible under “Outside the map”. Missing fields stay empty instead of being inferred. Founder names, funding amounts, and internal assessments are not published. Company descriptions reflect the supplied database and are not independently verified clinical claims.

Update the curated entries in `data/femtech-companies.ts`, preserving unique IDs and using `null` for missing descriptions, websites, or locations, then rebuild the static export. The supplied CSV in Downloads is unchanged. `data/poland-map.ts` contains the offline Natural Earth boundary (public domain) and approximate GeoNames city centers (CC BY 4.0), projected consistently; source and license links appear below the map. Pins represent cities, not office addresses. The map, directory, filters, and company profiles work without an API key or internet connection; external company websites require internet access. The preceding section offers the supplied 2025 map as separate Polish and English PDFs, with previews matching the chosen language. Both PDFs are also linked from Materiały.

Typography follows the brand-book scale: Fraunces H1 60/66, H2 38/46, H3 25/32; Outfit lead 21/32, body 17/29, labels 13/18, and buttons 16/16. H1/H2 scale down for small screens.

Brand review (15 September 2026): reviewed all 21 pages of `Poppy Project - Brand Book.pdf`. The primary lockups on pages 1–2 and 9 use **Poppy Project**, without “The”; this name is used in the navigation, footer, site copy, and metadata. The flower silhouette is consistent with the supplied vector, so its paths and existing hover/intro interactions are preserved. Page 10 retains the five existing colours and defines Burgundy `#6B0C0C`, now used for shaded petals and primary-button hover states (including the favicon shading).

Page 11 explicitly specifies Fraunces for headings and Outfit for body/UI, with the same landing-page type scale already implemented. These website rules take precedence over inconsistent example-page fonts: Poppins appears in logo taglines, and Cormorant Garamond/Century Gothic appear in later visual-language examples. No tagline font has been substituted into body copy. Text inside the supplied 2025 PDF maps, external URLs, and email addresses is unchanged.

Company submissions use [FormSubmit's AJAX endpoint](https://formsubmit.co/ajax-documentation) to send directly from the page to `femtechpopl@gmail.com`. FormSubmit is a third-party processor of the submitted fields. The first real or test submission triggers an activation email; the recipient must confirm it before relying on delivery. Test once from the published site and check the inbox/spam folder before launch. No test submission is sent during the build. Blog and podcast items marked “W przygotowaniu” remain upcoming content.
