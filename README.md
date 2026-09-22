# Poppy Project

The ready-to-view static website is in `out/`. To open it, run:

```powershell
cd C:\Users\macho\Desktop\ThePoppyProject
py serve.py
```

Open the URL printed in Terminal. Keep Terminal running while viewing the site; stop it with `Ctrl+C`. The server prefers port 8765 and automatically picks a free port if it is occupied. No npm, Node.js, or internet connection is needed to view the exported site. External event links, social profiles, and email actions need their respective services.

## Editing the source

The editable source uses Next.js with static export. After source changes, regenerate `out/` with `npm run build`. This build step needs Node.js and installed dependencies; viewing the finished export only needs Python. Upload the contents of `out/` to a static host to publish.

The homepage is in `components/PoppyLanding.tsx`, shared navigation/footer in `components/PoppyChrome.tsx`, and the visual system in `app/redesign.css`. Brand fonts (Fraunces and Outfit, with Polish characters) are self-hosted in `public/fonts/` with their licenses. The supplied `poppy-replica.svg` is represented in `components/brand/poppyReplica.ts` with its original paths and painting order intact. `PoppyMark.tsx` frames it uniformly, removes the white canvas, and adapts its fills to the site's palette and monochrome treatments. The same artwork is used for the header, hero, footer, and favicon.

The complete header and hero are rendered immediately, including when JavaScript is slow or unavailable. A short, non-blocking entrance animation adds polish without hiding navigation or content. Hovering or keyboard-focusing the poppy activates a gentle alternating petal flutter; the stem and full flower do not lean or follow the cursor. Interactive dots sit to the right of the flower. The site respects the system's reduced-motion preference. All flower motion uses the local SVG artwork, not embedded video.

## Editorial scrolling

Lenis 1.3.26 is bundled locally in the static export. `components/motion/usePoppyScroll.ts` owns a single animation clock for desktop wheel smoothing and the scroll-linked hero, About, resource, and map effects. `app/editorial-motion.css` contains the responsive scene styles. The Instagram carousel uses its own animation clock while visible. No CDN or Node server is needed to run them.

On a fine-pointer desktop at least 901px wide and 700px high, the opening hero keeps its subtle scroll-linked movement while the About section follows the normal document flow without a scroll hold. The downloadable ecosystem map is enabled independently by `siteFeatures.mapDownload`. The interactive Poland map and directory remain implemented but are temporarily disabled by `siteFeatures.companyMap`. When enabled, city buttons remain usable throughout; choosing one scrolls to the results. The directory has `data-lenis-prevent` so its internal list scroll works independently. Header/section anchors are handled by Lenis with a header offset.

`components/brand/PoppyBloomBorder.tsx` adds six sparse white decorative poppies beside the wordmark in the home-page footer, rooted on the copyright divider (three on mobile). Curved SVG stems draw upwards as this bottom row enters view; flower heads follow the growing tips, open using the original logo paths and retain their gentle sway. Scrolling back reverses the growth. The border cannot catch clicks, and reduced motion shows a finished static row. The supplied floral image is a visual reference; no raster asset or third-party Framer component is embedded.

Touch devices and short/narrow screens retain native scrolling, a normal document layout and a direct map-to-directory flow. System reduced-motion and the saved motion preference disable the cinematic scenes and scroll smoothing; these preferences are observed live. Animation work pauses when the document is hidden. The About biographies use accessible buttons and animated, collapsible panels in `components/AnimatedBiography.tsx`. Without JavaScript the page content and biographies remain visible, with no scroll-dependent controls.

The hero and its navigation share the Warm Linen background without a separating rule. A downward arrow at the lower left links to the next section. Desktop navigation is centered in the header. The red editorial headline remains, while the small platform descriptor above it is intentionally omitted. The flower is framed by the original thin olive circles, with a solid outer ring and a dashed inner ring. The background remains clear while scrolling, with no falling-petal overlay. `PoppyNewsletterSignup.tsx` shows a Supascribe signup embed in the home-page footer and on the blog page. The supplied loader only contains embed `175153234302`, so that ID is used; the supplied `878753974051` did not render with that loader. Supascribe is a third-party service that receives newsletter signups and connects them to Substack. The site does not claim a subscription succeeded by itself. `InstagramStoryCarousel.tsx` retains six curated post covers but the home Instagram section is temporarily disabled by `siteFeatures.homeInstagram`. The covers are stored locally; the signup form requires an internet connection.

The events section uses `components/PoppyEventList.tsx`: the original ruled list with date, title, location, and direct organiser links. Hovering or keyboard-focusing a row reveals a floating, tilted event image and highlights its arrow; mobile keeps the compact, directly tappable rows without the floating preview. Existing regional filters, event data, and bilingual labels are retained.

The downloadable ecosystem-map section and its hero link are shown with `siteFeatures.mapDownload`; the map is intentionally omitted from the main navigation. The interactive company explorer remains independently hidden with `siteFeatures.companyMap`; set only that flag to `true` to restore the company browser. `components/FemtechExplorer.tsx` still provides city clusters, accent-insensitive search, health-area and location filters, and bilingual company profiles. All 44 CSV entries are retained in `data/femtech-companies.ts`; 34 have a Polish city and the other 10 remain accessible under “Outside the map”. Missing fields stay empty instead of being inferred. Founder names, funding amounts, and internal assessments are not published. Company descriptions reflect the supplied database and are not independently verified clinical claims.

Update the curated entries in `data/femtech-companies.ts`, preserving unique IDs and using `null` for missing descriptions, websites, or locations, then rebuild the static export. The supplied CSV in Downloads is unchanged. `data/poland-map.ts` contains the offline Natural Earth boundary (public domain) and approximate GeoNames city centers (CC BY 4.0), projected consistently; source and license links appear below the map. Pins represent cities, not office addresses. The map, directory, filters, and company profiles work without an API key or internet connection; external company websites require internet access. The preceding section offers the supplied 2025 map as separate Polish and English PDFs, with previews matching the chosen language. Both PDFs are also linked from Materiały.

Typography follows the brand-book scale: Fraunces H1 60/66, H2 38/46, H3 25/32; Outfit lead 21/32, body 17/29, labels 13/18, and buttons 16/16. H1/H2 scale down for small screens.

Brand review (15 September 2026): reviewed all 21 pages of `Poppy Project - Brand Book.pdf`. The primary lockups on pages 1–2 and 9 use **Poppy Project**, without “The”; this name is used in the navigation, footer, site copy, and metadata. The flower silhouette is consistent with the supplied vector, so its paths and existing hover/intro interactions are preserved. Page 10 retains the five existing colours and defines Burgundy `#6B0C0C`, now used for shaded petals and primary-button hover states (including the favicon shading).

Page 11 explicitly specifies Fraunces for headings and Outfit for body/UI, with the same landing-page type scale already implemented. These website rules take precedence over inconsistent example-page fonts: Poppins appears in logo taglines, and Cormorant Garamond/Century Gothic appear in later visual-language examples. No tagline font has been substituted into body copy. Text inside the supplied 2025 PDF maps, external URLs, and email addresses is unchanged.

Company submissions use [FormSubmit's AJAX endpoint](https://formsubmit.co/ajax-documentation) to send directly from the page to `joinpoppypl@gmail.com`. FormSubmit is a third-party processor of the submitted fields. The first real or test submission triggers an activation email; the recipient must confirm it before relying on delivery. Test once from the published site and check the inbox/spam folder before launch. No test submission is sent during the build.

## Button hierarchy and language control

Primary calls to action use `components/ui/FluidButton.tsx` and `fluid-button.css`, inspired by [the supplied Framer example](https://fluidbutton.framer.website/): pill outlines, a rounded fill rising from below, and vertically rolling labels in the Poppy palette. `FluidButton` retains a native button (including refs, form submission and disabled states); `FluidLink` retains a native link (including downloads and new-tab behavior). `FluidSurface` adds the same visual to primary linked cards without nesting interactive elements.

Secondary controls retain their earlier section-specific styling: buttons on olive sections, map locations and company browsing, event/report filters, search/reset, episode selection and utility icons. These use ordinary native buttons/links without the fluid label animation. The newsletter form is rendered by Supascribe. Plain navigation/footer text links and third-party controls are unchanged. Use fluid components for primary actions, not selection/filter controls.

Only one primary label is exposed to assistive technology; its animated duplicate is `aria-hidden`. The effect works with keyboard focus and touch press, needs no animation library or JavaScript event loop, and respects reduced-motion preferences with a static colour change.

`components/ui/LanguageToggle.tsx` adapts [the globe-toggle reference](https://language-icon-toggle.framer.website/) into a compact disclosure with a sliding PL/EN selection. Its floating capsule does not shift the navigation. It supports keyboard arrows, Home/End, Escape, outside-click dismissal and reduced motion; hidden choices are inert. Choosing a language calls the existing page translation callback without reloading the podcast player.

## Podcast and Spotify

`/podcast/` contains five episodes from [the original podcast page](https://www.femtechpo.pl/pl/podcast), with Spotify episode IDs verified using the public oEmbed metadata. `data/podcasts.ts` contains the episode order, original Polish titles, short PL/EN editorial summaries and topic labels. Interface text switches PL/EN; audio remains Polish. Add a new entry there and rebuild to add episodes — this catalogue is curated, not an automatic Spotify feed.

The native CSS record player in `PoppyPodcastPlayer.tsx` takes its visual inspiration from [the supplied Framer example](https://empowered-heptagon-112449.framer.app/). Its record label uses the user-supplied `public/femtech-po-polsku.webp` artwork; the podcast is branded **FemTech po Polsku by Poppy Project** in both languages. The cord is an accessible play/pause button. The disc rotates only after real playback-state events from [Spotify's official iFrame API](https://developer.spotify.com/documentation/embeds/references/iframe-api); no playback or progress is simulated. Choosing an episode replaces and destroys the previous controller without autoplay. Switching the interface language does not reload the selected episode. System/site reduced-motion preferences stop the decorative rotation without affecting audio.

The official Spotify embed and its controls remain visible below the record. No API key or copied audio is used. If the API fails to load, a standard Spotify iframe is used; each episode also has a direct new-tab Spotify link. The page and episode descriptions work on the Python static server; streaming needs internet. Spotify/browser restrictions may limit an embed to a preview, so a direct episode link is always available. Tall desktop screens keep the player visible alongside the episode list; smaller screens use a stacked layout.

## Blog and Substack

`/blog/` embeds the supplied Supascribe signup form for **FemTech po Polsku** at the top and displays equal-height article cards below. `SubstackPostCard.tsx` uses original Substack cover images, titles and short descriptions in Poppy's typography; previews are limited to three lines each, while the full title remains in each link's accessible name. The entire card opens the original article in a new tab, with one visible reading action and no duplicate button underneath. PL/EN controls translate the interface, not the original article text. Emails are handled by Supascribe's embed, not stored in this project. No email was submitted during development.

`data/substack-config.json` is the shared publication address. `public/data/substack-posts.json` is a generated snapshot containing only public titles, short descriptions, dates, article URLs and cover-image URLs. The page statically renders all entries (including older articles), with search across the unabridged preview text and year filters. Cover URLs are restricted to HTTPS on Substack's media hosts; large originals use Substack's image-resizing service and lazy loading. Missing/failed images show a branded placeholder without changing card height. If Substack is blocked, cached text and article links remain usable. Internet is required for cover images, the Supascribe signup embed and full articles. Cards use the same scheduled archive refresh as before.

To refresh a local Python-served preview:

```bash
npm run sync:substack
npm run build
```

Normal `npm run build` deliberately uses the committed snapshot and works without a live Substack connection. The sync script reads the public paginated archive used by Substack's website (`/api/v1/archive`), not just the latest RSS items. It keeps requesting pages until an empty result, validates/deduplicates every entry, and writes the snapshot atomically only after a complete successful fetch. This public endpoint is not a versioned, documented API: if it changes or is unavailable, syncing fails without wiping the previous snapshot. No subscriber data, private posts or full article bodies are stored. `npm run test:substack` tests pagination, ordering, malformed data and failure safety.

### Enable automatic refresh on GitHub Pages

The `.github/workflows/pages.yml` workflow refreshes the complete archive and rebuilds/deploys the static site on pushes to `main`, manual runs, and every six hours (at minute 23 UTC). To configure deployment:

1. Commit/push the source, generated JSON snapshot and workflow to GitHub.
2. In the repository's **Settings → Pages → Build and deployment**, choose **GitHub Actions**. A custom domain is optional: the build reads GitHub Pages' base path and supports both a root domain and the default `/repository-name/` URL.
3. Open **Actions → Publish Poppy Project and refresh Substack → Run workflow** for the first deployment. Check that both jobs succeed. No Substack secret is required.

Successful later runs publish new/updated articles and remove deleted archive entries automatically. If syncing fails during a push or manual run, the workflow reports a warning and builds the website using the committed article snapshot, so source changes can still be published. The saved list may not include the newest articles until a refresh succeeds. If syncing fails during a scheduled run, deployment does not run and the last published site stays online. GitHub schedules are approximate and can be delayed; scheduled workflows in inactive public repositories may be disabled after 60 days. Monitor the Actions status and re-enable if necessary. See [GitHub's custom Pages workflow guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
