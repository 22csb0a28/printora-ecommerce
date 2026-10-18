import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Instagram, Layers, Palette, Shirt, Truck, Users, Quote } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { useAsync } from '../hooks/useAsync.js'
import { listCategories, listProducts, listTestimonials } from '../services/catalog.js'
import { useSettings } from '../components/SettingsContext.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import ProductCard, { ProductGrid } from '../components/ProductCard.jsx'
import { ErrorState } from '../components/States.jsx'
import { img } from '../lib/image.js'

export default function Home() {
  usePageMeta(null, 'Premium college merchandise, custom event T-shirts, sports jerseys and everyday streetwear. Order on WhatsApp.')
  return (
    <>
      <Hero />
      <Categories />
      <Trending />
      <CollegeFest />
      <NewArrivals />
      <Jerseys />
      <BulkPromo />
      <WhyUs />
      <Testimonials />
      <Social />
    </>
  )
}

function Hero() {
  return (
    <section className="relative bg-ink text-paper overflow-hidden grain">
      <div className="container-x grid lg:grid-cols-12 gap-8 pt-10 pb-14 lg:py-20 items-end">
        <div className="lg:col-span-7 relative z-10">
          <p className="eyebrow text-volt animate-rise">Drop 04 · Campus Season 2026</p>
          <h1 className="display text-[15vw] sm:text-[6.5rem] lg:text-[7rem] xl:text-[8.5rem] mt-4">
            <span className="block animate-rise" style={{ animationDelay: '80ms' }}>Your campus.</span>
            <span className="block animate-rise text-volt" style={{ animationDelay: '160ms' }}>Your style.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-paper/70 max-w-xl animate-rise" style={{ animationDelay: '240ms' }}>
            Premium college merchandise, custom event T-shirts, jerseys and everyday streetwear.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-rise" style={{ animationDelay: '320ms' }}>
            <Link to="/shop" className="btn-volt">Shop Collection <ArrowRight className="size-4" /></Link>
            <Link to="/bulk-orders" className="btn border border-paper/40 text-paper hover:bg-paper hover:text-ink">Custom Bulk Orders</Link>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 max-w-lg border-t border-paper/15 pt-6">
            {[['120+', 'campuses served'], ['38k', 'pieces printed'], ['72 hr', 'mockup turnaround']].map(([n, l]) => (
              <div key={l}>
                <dt className="display text-3xl sm:text-4xl">{n}</dt>
                <dd className="text-xs text-paper/50 mt-1 uppercase tracking-wider">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden lg:-mb-20 lg:rotate-[1.5deg] shadow-2xl">
            <img src={img('/img/hero.png', 900, 1200)} alt="Students wearing PRINTORA.NS oversized tees on campus steps" className="size-full object-cover object-[60%_center]" fetchpriority="high" />
          </div>
          <div className="absolute -left-4 sm:-left-10 bottom-8 lg:bottom-0 bg-volt text-ink px-5 py-4 -rotate-3 shadow-xl">
            <p className="eyebrow">Bulk from</p>
            <p className="display text-4xl">25 pcs</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Categories() {
  const { data, loading } = useAsync(listCategories, [])
  const cats = data ?? []
  return (
    <section className="container-x py-20 lg:py-28">
      <SectionHeader eyebrow="Shop by category" title="Find your fit" to="/shop" cta="All products" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[200px] sm:auto-rows-[260px]">
        {loading && Array.from({ length: 6 }, (_, i) => <div key={i} className="bg-bone animate-pulse" />)}
        {cats.slice(0, 8).map((c, i) => (
          <Link
            key={c.slug}
            to={`/shop?category=${c.slug}`}
            className={`group relative overflow-hidden bg-coal ${i === 0 ? 'col-span-2 row-span-2' : ''} ${i === 5 ? 'col-span-2' : ''}`}
          >
            <img src={img(c.image, i === 0 ? 1000 : 600)} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-paper">
              <h3 className={`display ${i === 0 ? 'text-4xl sm:text-6xl' : 'text-2xl sm:text-3xl'}`}>{c.name}</h3>
              <p className="text-sm text-paper/70 mt-1 hidden sm:block">{c.blurb}</p>
            </div>
            <ArrowUpRight className="absolute top-4 right-4 size-6 text-paper opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition" />
          </Link>
        ))}
      </div>
    </section>
  )
}

function ProductRail({ loader, eyebrow, title, to }) {
  const { data, loading, error } = useAsync(loader, [])
  return (
    <section className="container-x pb-20 lg:pb-28">
      <SectionHeader eyebrow={eyebrow} title={title} to={to} />
      {error ? <ErrorState /> : <ProductGrid products={(data ?? []).slice(0, 4)} loading={loading} skeletons={4} />}
    </section>
  )
}

const Trending = () => <ProductRail loader={() => listProducts({ featured: true })} eyebrow="Most ordered this month" title="Trending now" to="/shop" />
const NewArrivals = () => <ProductRail loader={() => listProducts({ newArrival: true })} eyebrow="Fresh off the press" title="New arrivals" to="/shop?sort=newest" />

function CollegeFest() {
  const { data } = useAsync(async () => [
    ...(await listProducts({ category: 'college-merchandise' })),
    ...(await listProducts({ category: 'college-fest-merchandise' })),
  ], [])
  return (
    <section className="bg-ink text-paper py-20 lg:py-28 mb-20 lg:mb-28 relative overflow-hidden grain">
      <div className="container-x grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <p className="eyebrow text-volt">College & festival collection</p>
          <h2 className="display text-5xl sm:text-7xl mt-3">Made for the fest. Worn all year.</h2>
          <p className="mt-5 text-paper/60 leading-relaxed">
            Batch tees, department drops, crew and volunteer wear for cultural, tech and sports fests. Pick a base style here or send us your design.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/college-merch" className="btn-volt">Browse college merch</Link>
            <Link to="/bulk-orders" className="btn border border-paper/30 hover:bg-paper hover:text-ink">Plan a fest order</Link>
          </div>
        </div>
        <div className="lg:col-span-8 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:thin]">
          {(data ?? []).map((p) => (
            <div key={p.code} className="snap-start shrink-0 w-[68%] sm:w-[42%] lg:w-[38%]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Jerseys() {
  const { data } = useAsync(() => listProducts({ category: 'sports-jerseys' }), [])
  return (
    <section className="container-x pb-20 lg:pb-28">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="relative min-h-[460px] overflow-hidden bg-coal text-paper p-8 sm:p-12 flex flex-col justify-end">
          <img src={img('/img/jersey.png', 1000)} alt="Sublimated black and volt football jersey" loading="lazy" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
          <div className="relative">
            <p className="eyebrow text-volt">Sports jerseys & team merch</p>
            <h2 className="display text-5xl sm:text-7xl mt-3">Kit out the whole squad.</h2>
            <p className="mt-4 text-paper/70 max-w-md">Full-sublimation jerseys with names, numbers and sponsor logos. Football, cricket, basketball, kabaddi and esports.</p>
            <Link to="/sports-jerseys" className="btn-volt mt-6">Shop jerseys</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 content-start">
          {(data ?? []).slice(0, 2).map((p) => <ProductCard key={p.code} product={p} />)}
          <div className="col-span-2 border border-ink/10 p-6 flex flex-wrap items-center justify-between gap-4">
            <p className="font-semibold">Team order? Names & numbers free above 15 jerseys.</p>
            <Link to="/bulk-orders" className="btn-ink h-10">Get team quote</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function BulkPromo() {
  return (
    <section className="bg-volt text-ink">
      <div className="container-x grid lg:grid-cols-2 gap-10 py-16 lg:py-24 items-center">
        <div>
          <p className="eyebrow">Bulk customised orders</p>
          <h2 className="display text-6xl sm:text-8xl mt-3">25 to 2,500 pieces.</h2>
          <p className="mt-5 text-lg max-w-lg text-ink/75">
            For colleges, student councils, clubs, companies and events. Send your logo, we send a free digital mockup and quote within 72 hours.
          </p>
          <ol className="mt-8 grid sm:grid-cols-3 gap-4">
            {['Share your brief', 'Approve the mockup', 'We print & ship'].map((s, i) => (
              <li key={s} className="border-t-2 border-ink pt-3">
                <span className="font-mono text-xs">0{i + 1}</span>
                <p className="font-bold mt-1">{s}</p>
              </li>
            ))}
          </ol>
          <Link to="/bulk-orders" className="btn-ink mt-10">Start a bulk enquiry <ArrowRight className="size-4" /></Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={img('/img/bulk.png', 1000)} alt="Stacks of freshly screen printed T-shirts" loading="lazy" className="size-full object-cover" />
        </div>
      </div>
    </section>
  )
}

const REASONS = [
  { icon: Shirt, title: 'Heavyweight fabric', text: '180–340 GSM combed and bio-washed cotton. Prints that don\'t crack after the first wash.' },
  { icon: Palette, title: 'Any design, any colour', text: 'Screen print, DTF, embroidery and full sublimation — matched to your college colours.' },
  { icon: Users, title: 'Built for bulk', text: 'Tiered pricing from 25 pieces, size-wise packing and individual name printing.' },
  { icon: Layers, title: 'Free mockups', text: 'See your design on the garment before you commit. Unlimited revisions on bulk orders.' },
  { icon: Truck, title: 'Pan-India delivery', text: 'Tracked shipping to campuses across India, with express options for fest deadlines.' },
]

function WhyUs() {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <p className="eyebrow text-ash">Why PRINTORA.NS</p>
          <h2 className="display text-5xl sm:text-6xl mt-3">Quality you can feel. Service you can text.</h2>
        </div>
        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
          {REASONS.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className={`bg-paper p-6 sm:p-8 group hover:bg-ink hover:text-paper transition-colors duration-300 ${i === 4 ? 'sm:col-span-2' : ''}`}>
              <Icon className="size-7 text-volt-dark group-hover:text-volt transition" strokeWidth={1.75} />
              <h3 className="font-bold text-lg mt-4">{title}</h3>
              <p className="mt-2 text-ash group-hover:text-paper/60 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const { data } = useAsync(listTestimonials, [])
  return (
    <section className="bg-bone py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow text-ash">What students say</p>
            <h2 className="display text-5xl sm:text-6xl mt-2">Worn on campus</h2>
          </div>
          <span className="eyebrow border border-ink/30 px-3 py-1.5">Sample reviews — replaced with real ones soon</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {(data ?? []).map((t, i) => (
            <figure key={t.name} className={`bg-paper p-8 flex flex-col ${i === 1 ? 'md:translate-y-8' : ''}`}>
              <Quote className="size-8 text-volt-dark" />
              <blockquote className="mt-4 text-lg leading-relaxed flex-1">“{t.quote}”</blockquote>
              <figcaption className="mt-6 pt-4 border-t border-ink/10">
                <p className="font-bold">{t.name}</p>
                <p className="text-sm text-ash">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

const FEED = ['/img/hero.png', '/img/fest.png', '/img/oversized-black.png', '/img/jersey.png', '/img/hoodie.png', '/img/custom.png']

function Social() {
  const s = useSettings()
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <p className="eyebrow text-ash">Follow the drops</p>
          <h2 className="display text-5xl sm:text-6xl mt-2">{s.instagramHandle || '@printora.ns'}</h2>
        </div>
        {s.social?.instagram && (
          <a href={s.social.instagram} target="_blank" rel="noopener noreferrer" className="btn-ink"><Instagram className="size-4" /> Follow on Instagram</a>
        )}
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-1">
        {FEED.map((src) => (
          <a key={src} href={s.social?.instagram || '#'} target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden bg-bone" aria-label="Open Instagram">
            <img src={img(src, 400, 400)} alt="" loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition grid place-items-center">
              <Instagram className="size-7 text-paper opacity-0 group-hover:opacity-100 transition" />
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
