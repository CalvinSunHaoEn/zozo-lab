# ZOZO Lab — source-owned website

Static HTML, CSS and JavaScript for zozo-lab.com, compatible with the existing GitHub Pages deployment. No build step or Framer runtime is required.

## Local preview

Run node preview.cjs from this folder, then open http://127.0.0.1:4175/ . Set PORT to change the port.

## Editing

- index.html: page shell, official logo, navigation, footer, metadata and existing Google Analytics.
- app.js: product catalog, routes, SVG image framing, search, saved designs, filters and product pages.
- showcase.js: homepage content, two-design hero, slideshow controls and image-view selectors.
- styles.css: shared layout foundations and existing route styles.
- showcase.css: product-led redesign, shared page styling and responsive rules.
- silhouettes.js: vector clipping paths for all 18 supplied product images. Original WebP files are unchanged.
- tools/build-silhouettes.cjs: optional mask rebuild utility; requires the sharp Node package in the developer's environment. The deployed website has no dependency on it.

The presentation was independently authored around the product display approach of the Amble reference at https://amble.framer.media/ . It uses ZOZO Lab artwork, branding and copy, with no imported Framer source or template media.

## Pages

- #/ : homepage
- #/shop and #/collections : full catalog
- #/shop/cheese, #/shop/sculptural, #/shop/jelly : series
- #/product/<id> : product detail with front, side and inside view buttons
- #/about : studio introduction

Hash routes preserve GitHub Pages direct-link behavior. CNAME and favicon are retained.

## Product status

Cheese Cutout and Fluid Metal are design previews at USD 29.90. The other four designs retain their blurred Coming soon treatment and Price at launch status. Supported devices, materials and release details remain unconfirmed. There is no checkout or purchase flow.

The existing optional Google Forms waitlist is retained. Saving designs is local to the browser and does not submit the waitlist. Google Analytics and the existing privacy explanation are retained.

## 2026-11-06 candidate

The new hero supports product switching, three views, pause/play and keyboard navigation between tabs. Automatic rotation respects reduced motion and pauses while the hero is hovered, contains focus, is off-screen, or a drawer is open.

Browser QA covered 320, 390, 768 and 1440px layouts across the homepage, catalog, Cheese Cutout detail and Jelly listing. Search, empty results, saved-design reload persistence/removal, the featured filter and gallery controls were exercised. Review screenshots and QA records are stored outside the deployment folder in ../website-review-2026-11-06/ .

The website revision was reviewed and approved for publication on 2026-11-06. See Git history for the published source revision.

## Capsule media and motion

The brand sentence embeds three rounded media capsules. Capsules expand in sequence on first appearance; text changes from muted to dark as the section moves through the viewport. One ImageGen lifestyle photograph is a review candidate using the user's supplied hand-pose reference; the other capsules use generated stone/liquid-metal and melting-cheese atmosphere studies.

- motion.js and motion.css implement viewport reveals, staggered heading words, image reveals, desktop wheel easing and smooth in-page navigation. Touch scrolling, nested scrollers and keyboard input remain native.
- showcase.js implements sequenced outgoing/incoming product transitions with opacity, translation, a 6-degree rotation and 0.94-to-1 scale; background type and metadata enter in sequence. New selections cancel stale transitions.
- User-started autoplay can run while its play button has focus. Other interactions pause rotation.
- Reduced-motion preferences suppress smooth scrolling and reveals.

These behaviors were recreated in local source from observation of the reference page; no Framer dependency was introduced.

## Product-card price treatment

The product cards reserve a stepped, rounded white price bay at the upper right. Numeric prices use larger bold tabular figures and a smaller USD label. Card-width queries move the preview/status badge below the notch when space is limited. cards.css owns this treatment. Upcoming products retain Price at launch rather than inventing a release price.

Vector contours now cover all 18 product views. Coming-soon frosting is clipped to the product silhouette rather than a full white rectangle.

## Featured mobile layout

At viewport widths up to 760px, the two featured cards use a vertical flex column with full-width cards and 24px spacing. Above 760px the desktop two-column grid is retained. This scoped adjustment follows the content-led breakpoints and flexible layout guidance in MDN Responsive Design and web.dev Responsive Web Design Basics. Verified at 320, 390, 600, 760, 768 and 1440px with no horizontal overflow.

## Mobile card consistency and icons

All product-card groups, including Next Up, catalog and product-page recommendations, use full-width vertical flex columns at widths up to 760px. Checked at 320, 390 and 430px; tablet and desktop layouts retained at 768 and 1440px. UI symbols are rendered using locally vendored Lucide SVG icons under the ISC license (assets/icons/). icons.js converts dynamic control symbols to decorative SVG while preserving existing accessible labels. No emoji icons should be introduced.
