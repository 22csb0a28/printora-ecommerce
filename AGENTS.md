# AGENTS.md

## Start here
This project is built in milestones. **Read `PLAN.md` first** and continue with the next unchecked milestone. Milestone 1 (storefront UI + WhatsApp ordering) is done. Milestone 2 starts with a backend decision the product owner still has to confirm: Supabase, or Netlify Database/Identity/Blobs.

## Architecture
- Vite + React 19 SPA in plain JavaScript (the owner asked for no TypeScript). React Router 7 is set up in `src/App.jsx`.
- `netlify.toml` builds to `dist` and has a `/* → /index.html 200` SPA fallback.
- Tailwind v4 via `@tailwindcss/vite`. All design tokens (colours `ink/coal/bone/paper/volt/ember`, fonts Anton/Archivo/JetBrains Mono) are in `src/index.css` `@theme`. Shared classes (`btn-*`, `field`, `label`, `display`, `eyebrow`, `container-x`, `grain`) are declared with `@utility`, **not** `@layer components`, because v4 can only `@apply` and variant `@utility` classes.

## Key directories
- `src/pages/` — route components. `Shop.jsx` also renders the College Merch and Sports Jerseys pages through its `collection` prop.
- `src/components/` — layout (Navbar, Footer, AnnouncementBar), ProductCard/ProductGrid, Toast and Settings contexts, empty/error states.
- `src/services/catalog.js` — **the only data access layer.** It is async and currently reads `src/data/fixtures.js`. Replace the function bodies with real queries and keep their signatures. Public reads must return published products only.
- `src/lib/whatsapp.js` — number normalisation, `wa.me` link building, and the product and bulk message templates.
- `src/lib/image.js` — `img(src, w, h)` returns a Netlify Image CDN URL in production and the raw path in dev. Use it for every image. Remote storage domains must be added to `netlify.toml` `[images] remote_images`.
- `public/img/` — generated placeholder photography.

## Conventions
- Products are addressed by `code` (`/product/PRN-001`). Prices are whole rupees. `salePrice` is optional and `effectivePrice()` resolves it.
- Stock status is one of `in_stock | low_stock | out_of_stock`.
- Shop filters live in URL search params so filtered views can be shared.
- Never present opening WhatsApp as a confirmed order. The UI copy says the order is confirmed in chat.
- Sample testimonials are labelled as samples on the page.
- Never put service-role keys or admin secrets in client code. Admin authorisation must be enforced server-side.
