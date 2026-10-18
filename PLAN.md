# PRINTORA.NS — Product Roadmap

PRINTORA.NS is a big store: a full storefront, a protected admin console, image management and editable settings. We're building it in small milestones you can try out one at a time. Each milestone ships something you can use on the live site.

## Milestone 1 — Storefront experience ✅ (done)
- Branded homepage with every section from the brief: announcement bar, hero, categories, trending, college/fest collection, jerseys, bulk promo, why-us, sample testimonials, Instagram, footer.
- Shop with search by name or product code, filters for category, price, size, colour and availability, and sorting.
- College Merch and Sports Jerseys collection pages.
- Product detail page: gallery, size/colour/quantity selection with validation, stock status, sale pricing, related products.
- **Working WhatsApp ordering** (the prefilled product message) and a **working bulk enquiry form** that sends its message to WhatsApp.
- About, Contact (WhatsApp message form), Privacy Policy, Shipping & Returns (with size guide), 404 page.
- All catalogue and settings data goes through one module, `src/services/catalog.js`. For now it reads sample data from `src/data/fixtures.js`.

## Milestone 2 — Real catalogue data
- **Decision needed first:** choose the backend. The brief asks for Supabase (Postgres + Auth + Storage). The other option is Netlify's built-in stack, all inside this Netlify project: Netlify Database (managed Postgres), Netlify Identity and Netlify Blobs. With Netlify's stack there are no external keys to manage, and admin checks happen server-side in Netlify Functions. Both options meet the security requirements.
- Schema: `products` (unique code, name, slug, description, category, price, sale price with CHECK sale < price, sizes[], colours jsonb, stock status enum, published/featured/new flags, timestamps), `product_images` (FK → products, position, storage path, alt), `categories`, `store_settings` (single row), `admin_users`/roles.
- Indexes on code, category, published and created_at.
- Seed the database with the current fixture catalogue.
- Swap the bodies of `src/services/catalog.js` for real queries. Pages don't change.
- Public reads return **published products only**, enforced server-side (RLS or function checks), never only in the UI.

## Milestone 3 — Secure admin sign-in
- `/admin` login using the chosen auth provider.
- Admin access is granted by a server-side role (admins table or app_metadata role), never by a frontend flag.
- Document how to assign the first administrator securely.
- Route guard, session handling, sign-out.

## Milestone 4 — Product management
- Dashboard overview: total, published and unpublished counts, counts per category, recent updates.
- Product list with search; create, edit and delete (with confirmation); publish/unpublish; featured and new-arrival toggles.
- Validation: unique product code format (`PRN-000`), price > 0, sale < price, at least one size and colour.
- Preview a product before publishing.

## Milestone 5 — Image uploads
- Upload several images per product, with progress, previews and reordering.
- Replace and remove images; handle failed uploads gracefully.
- Write access restricted to admins by storage policies. Public read for images of published products.
- Images served through the Netlify Image CDN (add the storage domain to `[images] remote_images` in `netlify.toml`).

## Milestone 6 — Store settings
- Edit the WhatsApp number (with country-code validation), contact details, announcement bar items, homepage promo content and social links.
- `getSettings()` reads from the database, so changes go live without a redeploy.

## Milestone 7 — Launch polish
- Real product photography and testimonials.
- Per-route meta and Open Graph images, sitemap.xml, robots.txt.
- Accessibility and performance pass. End-to-end checklist: admin login → create product → upload image → publish → order on WhatsApp.
- Deployment guide: environment variables in Netlify, auth site URL and redirect URLs.
