# PRINTORA.NS

Storefront for **PRINTORA.NS**: premium college merchandise, custom event T-shirts, sports jerseys and everyday streetwear for students, fests, clubs and event organisers. Customers order through WhatsApp. There is no online payment.

## What's live
- Homepage, Shop (search, filters, sort), College Merch, Sports Jerseys
- Product pages with size, colour and quantity selection, plus **Buy on WhatsApp** (prefilled order message)
- Bulk Orders enquiry form that sends a full brief to WhatsApp
- About, Contact, Privacy Policy, Shipping & Returns (size guide), 404

The catalogue currently uses sample products (`src/data/fixtures.js`). The admin console, persistent product database and image uploads are next on the roadmap. See [PLAN.md](./PLAN.md).

## Tech
- React 19 + Vite 7 (JavaScript), React Router 7
- Tailwind CSS v4 (theme tokens in `src/index.css`)
- Lucide React icons
- Netlify hosting with SPA redirects and the Netlify Image CDN for optimised images

## Run locally
```bash
npm install
cp .env.example .env   # set your WhatsApp number
npm run dev
```
Or use `netlify dev` to emulate Netlify features such as the Image CDN.

## Configuration
| Variable | Purpose |
| --- | --- |
| `VITE_WHATSAPP_NUMBER` | WhatsApp business number with country code, digits only (e.g. `919876543210`). A 10-digit Indian number gets `91` added automatically. |
| `VITE_SITE_URL` | Public site URL used in product links inside WhatsApp messages. |

In Netlify, go to **Project configuration → Environment variables**, add these, then redeploy. Until you set them, the site uses the placeholder `919000000000`. **Replace it before launch.**

## Deploy
The site deploys from this Git repository. `netlify.toml` sets the build command (`npm run build`) and publish directory (`dist`), and adds a catch-all redirect so routes like `/product/PRN-001` and `/admin` load correctly on refresh.

## Testing WhatsApp ordering
1. Open any product, pick a size and colour, then click **Buy on WhatsApp**. You should see the full order message, including the estimated total.
2. On **Bulk Orders**, submit the form empty to see validation. Then fill it in and send it to WhatsApp.

## Roadmap
Coming next: the real database, secure admin sign-in, product CRUD, image uploads and editable store settings. Details are in [PLAN.md](./PLAN.md).
