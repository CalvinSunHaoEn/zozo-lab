# ZOZO Lab — Mobile accessories

Editorial collection preview for the second-phase phone cases and accessories. Plain HTML, CSS and JavaScript, compatible with the existing GitHub Pages setup; no build step or external runtime dependencies.

## Preview

Run `python -m http.server 4173 --bind 127.0.0.1` from this directory, then open `http://127.0.0.1:4173/`.

## Pages

- `#/` — editorial homepage
- `#/collections` — collection index
- `#/shop` — complete catalog, with collection/category filters and name sorting
- `#/shop/sculptural`, `#/shop/playful`, `#/shop/accessories` — collection views
- `#/product/<id>` — product details and alternate images
- `#/about` — studio introduction

Hash routes keep direct links compatible with GitHub Pages without server rewrite rules. Existing `CNAME` and favicon are preserved.

## Content

The catalog covers the six supplied Phase 2 phone-case designs: Fluid Metal, Crystal Inlay, Cherry Jelly, Blue Jelly, Cheese Character and Cheese Cutout Case. All prices are USD 29.90 as instructed. There are no purchase, checkout, account, payment or newsletter submission controls. Device compatibility and final material claims remain unconfirmed and are labeled accordingly.

Search, collection filtering, category filtering, sorting, grid density, color previews, native modal panels, and a device-local saved edit are implemented. Saving uses localStorage and falls back to in-memory state when storage is unavailable.

## Assets

The official logo and Alan Sans font come from the supplied brand folder. The font license is included. Product art comes from the high-resolution renders in `Phonecase 高清图 9 08`; web-ready WebP derivatives preserve the front, side and back views while keeping page weight reasonable.

Zara's US homepage, category navigation, new-arrivals catalog, and product detail page were inspected on September 7, 2026. The design translates image-first hierarchy, quiet navigation, catalog grids and alternating editorial layouts. No Zara code, imagery, logo or copy is included.

## Validation

JavaScript syntax and Git whitespace checks; browser checks of desktop and 390px mobile layouts, search and empty results, category filtering/reset, color changes, saved-edit persistence/removal, and horizontal mobile gallery scrolling. All eight catalog objects display USD 29.90, and no purchase controls are present.

## Publishing

This redesign is prepared on `redesign/phase-2-editorial`. Review it before replacing the live site. The existing GitHub Pages domain configuration is unchanged.
