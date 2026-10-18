// Sample catalogue and store settings for the storefront preview.
// Everything here is read through src/services/catalog.js — replace that service with
// database calls and this file can be deleted without touching any page or component.

export const STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const C = {
  black: { name: 'Black', hex: '#141414' },
  white: { name: 'Off White', hex: '#f1efe8' },
  charcoal: { name: 'Charcoal', hex: '#3b3b3b' },
  olive: { name: 'Olive', hex: '#5d6140' },
  sand: { name: 'Sand', hex: '#d8c9a8' },
  navy: { name: 'Navy', hex: '#1d2840' },
  volt: { name: 'Volt', hex: '#d7f25c' },
  maroon: { name: 'Maroon', hex: '#5e1f24' },
}

export const categories = [
  { slug: 'college-merchandise', name: 'College Merchandise', image: '/img/hero.png', blurb: 'Department tees, batch drops, club wear' },
  { slug: 'oversized-t-shirts', name: 'Oversized T-Shirts', image: '/img/oversized-white.png', blurb: '240 GSM drop-shoulder fits' },
  { slug: 'round-neck-t-shirts', name: 'Round Neck T-Shirts', image: '/img/roundneck.png', blurb: 'Everyday combed cotton' },
  { slug: 'polo-t-shirts', name: 'Polo T-Shirts', image: '/img/polo.png', blurb: 'Pique polos for teams and staff' },
  { slug: 'hoodies-sweatshirts', name: 'Hoodies & Sweatshirts', image: '/img/hoodie.png', blurb: 'Fleece-lined, campus-ready' },
  { slug: 'sports-jerseys', name: 'Sports Jerseys', image: '/img/jersey.png', blurb: 'Sublimated, name + number' },
  { slug: 'college-fest-merchandise', name: 'College Fest Merchandise', image: '/img/fest.png', blurb: 'Crew, volunteer and fest tees' },
  { slug: 'custom-printed-t-shirts', name: 'Custom Printed T-Shirts', image: '/img/custom.png', blurb: 'Your artwork, printed to order' },
  { slug: 'accessories', name: 'Accessories', image: '/img/cap.png', blurb: 'Caps, totes and add-ons' },
]

export const products = [
  {
    code: 'PRN-001', name: 'Campus Static Oversized Tee', category: 'oversized-t-shirts',
    price: 699, salePrice: 499, stock: 'in_stock', featured: true, newArrival: true, createdAt: '2026-10-12',
    sizes: STANDARD_SIZES, colors: [C.black, C.white],
    images: ['/img/oversized-black.png', '/img/oversized-white.png', '/img/hero.png'],
    description: '240 GSM heavyweight cotton with a dropped shoulder and boxy fit. Abstract back print in puff-white ink that survives 50+ washes.',
  },
  {
    code: 'PRN-002', name: 'Monochrome Wave Oversized Tee', category: 'oversized-t-shirts',
    price: 649, stock: 'in_stock', featured: true, createdAt: '2026-09-28',
    sizes: STANDARD_SIZES, colors: [C.white, C.black],
    images: ['/img/oversized-white.png', '/img/oversized-black.png'],
    description: 'Op-art chest graphic on bio-washed cotton. Relaxed through the body, slightly cropped length so it sits right over cargos.',
  },
  {
    code: 'PRN-003', name: 'Essential Round Neck — 4 Colours', category: 'round-neck-t-shirts',
    price: 349, salePrice: 299, stock: 'in_stock', createdAt: '2026-08-14',
    sizes: STANDARD_SIZES, colors: [C.charcoal, C.white, C.olive, C.sand],
    images: ['/img/roundneck.png'],
    description: '180 GSM combed cotton, regular fit. The blank we print most of our college orders on — soft, shape-holding and pre-shrunk.',
  },
  {
    code: 'PRN-004', name: 'Faculty Pique Polo', category: 'polo-t-shirts',
    price: 599, stock: 'in_stock', featured: true, createdAt: '2026-07-30',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'], colors: [C.charcoal, C.navy, C.black, C.white],
    images: ['/img/polo.png'],
    description: 'Breathable 220 GSM pique with a ribbed collar. Embroider your department crest on the chest — popular with staff and organising committees.',
  },
  {
    code: 'PRN-005', name: 'After Hours Heavy Hoodie', category: 'hoodies-sweatshirts',
    price: 1299, salePrice: 1099, stock: 'low_stock', featured: true, newArrival: true, createdAt: '2026-10-09',
    sizes: STANDARD_SIZES, colors: [C.black, C.charcoal, C.maroon],
    images: ['/img/hoodie.png'],
    description: '340 GSM brushed-back fleece, double-layer hood and kangaroo pocket. Built for winter fests and late-night library runs.',
  },
  {
    code: 'PRN-006', name: 'Volt Strike Football Jersey', category: 'sports-jerseys',
    price: 549, stock: 'in_stock', featured: true, newArrival: true, createdAt: '2026-10-15',
    sizes: STANDARD_SIZES, colors: [{ name: 'Black / Volt', hex: '#141414' }],
    images: ['/img/jersey.png'],
    description: 'Full-sublimation dri-fit jersey with mesh back panel. Add player names and numbers for the whole squad — no extra setup cost above 15 pieces.',
  },
  {
    code: 'PRN-007', name: 'Inter-College Cricket Jersey', category: 'sports-jerseys',
    price: 599, stock: 'in_stock', createdAt: '2026-09-02',
    sizes: STANDARD_SIZES, colors: [C.navy, C.maroon, C.black],
    images: ['/img/jersey.png'],
    description: 'Collared cricket jersey in moisture-wicking poly. Colourways matched to your college crest on request.',
  },
  {
    code: 'PRN-008', name: 'Fest Crew 2026 Tee', category: 'college-fest-merchandise',
    price: 399, stock: 'in_stock', featured: true, newArrival: true, createdAt: '2026-10-11',
    sizes: STANDARD_SIZES, colors: [C.black, C.volt],
    images: ['/img/fest.png', '/img/oversized-black.png'],
    description: 'The organiser and volunteer tee. Front "CREW" lockup, back print with your fest name and dates. Sample design shown.',
  },
  {
    code: 'PRN-009', name: 'Batch of 2027 Department Tee', category: 'college-merchandise',
    price: 449, stock: 'in_stock', featured: true, createdAt: '2026-09-20',
    sizes: STANDARD_SIZES, colors: [C.black, C.white, C.navy],
    images: ['/img/hero.png', '/img/oversized-white.png'],
    description: 'Batch tees with your department name and every classmate\'s name on the back. Minimum 20 pieces for custom names.',
  },
  {
    code: 'PRN-010', name: 'Club Varsity Sweatshirt', category: 'college-merchandise',
    price: 999, stock: 'out_of_stock', createdAt: '2026-06-18',
    sizes: STANDARD_SIZES, colors: [C.charcoal, C.maroon],
    images: ['/img/hoodie.png'],
    description: 'Crew-neck sweatshirt with varsity arch lettering. Back in stock before the winter semester.',
  },
  {
    code: 'PRN-011', name: 'Your Design — Custom Print Tee', category: 'custom-printed-t-shirts',
    price: 549, salePrice: 449, stock: 'in_stock', newArrival: true, createdAt: '2026-10-05',
    sizes: STANDARD_SIZES, colors: [C.black, C.white, C.charcoal, C.olive],
    images: ['/img/custom.png', '/img/roundneck.png'],
    description: 'Send us your artwork and we screen print or DTF it on premium cotton. Single pieces welcome; bulk pricing kicks in from 25.',
  },
  {
    code: 'PRN-012', name: 'Hackathon Night Oversized Tee', category: 'college-fest-merchandise',
    price: 499, stock: 'low_stock', createdAt: '2026-08-27',
    sizes: ['S', 'M', 'L', 'XL'], colors: [C.black],
    images: ['/img/oversized-black.png'],
    description: 'Oversized black tee with a terminal-style back print. Made for tech fests and 36-hour hackathons.',
  },
  {
    code: 'PRN-013', name: 'Printora Logo Cap + Tote', category: 'accessories',
    price: 449, stock: 'in_stock', createdAt: '2026-09-10',
    sizes: ['Free Size'], colors: [C.black, C.sand],
    images: ['/img/cap.png'],
    description: 'Six-panel cotton cap and a heavy canvas tote, both customisable with your club logo.',
  },
  {
    code: 'PRN-014', name: 'Studio Blank Round Neck', category: 'round-neck-t-shirts',
    price: 299, stock: 'in_stock', createdAt: '2026-05-21',
    sizes: STANDARD_SIZES, colors: [C.white, C.black, C.sand],
    images: ['/img/roundneck.png'],
    description: 'Our lightest everyday tee at 160 GSM. Great for event giveaways where budget matters.',
  },
]

export const settings = {
  storeName: 'PRINTORA.NS',
  // Placeholder — set VITE_WHATSAPP_NUMBER (or the admin setting, once live) to your business number.
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '919000000000',
  email: 'hello@printora.example',
  phoneDisplay: '+91 90000 00000',
  address: 'Hyderabad, Telangana, India',
  hours: 'Mon–Sat, 10am – 8pm',
  announcements: [
    'New drop: Fest Crew 2026 tees are live',
    'Bulk orders from 25 pieces — free design mockup',
    'Flat ₹200 off oversized tees this week',
    'Pan-India delivery for college orders',
  ],
  social: {
    instagram: 'https://instagram.com/printora.ns',
    whatsapp: '',
    youtube: '',
  },
  instagramHandle: '@printora.ns',
}

// Sample testimonials — clearly labelled on the site until real reviews are supplied.
export const testimonials = [
  { name: 'Aditi R.', role: 'Cultural Secretary, sample college', quote: 'We ordered 340 fest tees with three weeks to go. Mockups came back the same evening and the prints held up through the whole fest.' },
  { name: 'Karthik M.', role: 'Football captain, sample college', quote: 'Names and numbers were spot on for all 22 jerseys. The fabric doesn\'t cling even in afternoon matches.' },
  { name: 'Sneha P.', role: 'Coding club lead, sample college', quote: 'Our hackathon tees sold out to non-members too. The oversized fit is the real deal, not just a size up.' },
]
