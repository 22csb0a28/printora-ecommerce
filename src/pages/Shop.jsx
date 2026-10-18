import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, Search } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { useAsync } from '../hooks/useAsync.js'
import { listCategories, listProducts } from '../services/catalog.js'
import { ProductGrid } from '../components/ProductCard.jsx'
import { EmptyState, ErrorState } from '../components/States.jsx'
import { effectivePrice, STOCK_LABELS } from '../lib/format.js'

const SORTS = {
  newest: { label: 'Newest', fn: (a, b) => b.createdAt.localeCompare(a.createdAt) },
  'price-asc': { label: 'Price: low to high', fn: (a, b) => effectivePrice(a) - effectivePrice(b) },
  'price-desc': { label: 'Price: high to low', fn: (a, b) => effectivePrice(b) - effectivePrice(a) },
}

/**
 * Catalogue page. Used for /shop and for curated collection pages
 * (College Merch, Sports Jerseys) by passing `collection`.
 */
export default function Shop({ collection }) {
  const [params, setParams] = useSearchParams()
  const [drawer, setDrawer] = useState(false)
  usePageMeta(collection?.title ?? 'Shop all', collection?.description ?? 'Browse oversized tees, polos, hoodies, jerseys and custom printed T-shirts.')

  const products = useAsync(async () => {
    if (!collection) return listProducts()
    const lists = await Promise.all(collection.categories.map((category) => listProducts({ category })))
    return lists.flat()
  }, [collection?.title])
  const cats = useAsync(listCategories, [])

  const f = {
    q: params.get('q') ?? '',
    category: params.get('category') ?? '',
    size: params.get('size') ?? '',
    color: params.get('color') ?? '',
    stock: params.get('stock') ?? '',
    min: params.get('min') ?? '',
    max: params.get('max') ?? '',
    sort: params.get('sort') ?? 'newest',
  }

  const set = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }
  const clearAll = () => setParams(f.sort !== 'newest' ? { sort: f.sort } : {}, { replace: true })

  const all = products.data ?? []
  const options = useMemo(() => {
    const sizes = new Set()
    const colors = new Map()
    all.forEach((p) => {
      p.sizes.forEach((s) => sizes.add(s))
      p.colors.forEach((c) => colors.set(c.name, c.hex))
    })
    return { sizes: [...sizes], colors: [...colors] }
  }, [all])

  const visibleCats = (cats.data ?? []).filter((c) => !collection || collection.categories.includes(c.slug))

  const results = useMemo(() => {
    const q = f.q.trim().toLowerCase()
    const min = Number(f.min) || 0
    const max = Number(f.max) || Infinity
    return all
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q))
      .filter((p) => !f.category || p.category === f.category)
      .filter((p) => !f.size || p.sizes.includes(f.size))
      .filter((p) => !f.color || p.colors.some((c) => c.name === f.color))
      .filter((p) => !f.stock || (f.stock === 'available' ? p.stock !== 'out_of_stock' : p.stock === f.stock))
      .filter((p) => effectivePrice(p) >= min && effectivePrice(p) <= max)
      .sort((SORTS[f.sort] ?? SORTS.newest).fn)
  }, [all, f.q, f.category, f.size, f.color, f.stock, f.min, f.max, f.sort])

  const activeCount = ['q', 'category', 'size', 'color', 'stock', 'min', 'max'].filter((k) => f[k]).length

  const filters = (
    <div className="space-y-8">
      <FilterGroup title="Category">
        <div className="flex flex-col gap-1">
          <Choice active={!f.category} onClick={() => set('category', '')}>All</Choice>
          {visibleCats.map((c) => (
            <Choice key={c.slug} active={f.category === c.slug} onClick={() => set('category', c.slug)}>{c.name}</Choice>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Price (₹)">
        <div className="flex items-center gap-2">
          <input type="number" min="0" inputMode="numeric" placeholder="Min" value={f.min} onChange={(e) => set('min', e.target.value)} className="field h-10" aria-label="Minimum price" />
          <span className="text-ash">–</span>
          <input type="number" min="0" inputMode="numeric" placeholder="Max" value={f.max} onChange={(e) => set('max', e.target.value)} className="field h-10" aria-label="Maximum price" />
        </div>
      </FilterGroup>
      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {options.sizes.map((s) => (
            <button key={s} onClick={() => set('size', f.size === s ? '' : s)} aria-pressed={f.size === s} className={`min-w-11 h-10 px-3 text-sm font-semibold border transition ${f.size === s ? 'bg-ink text-paper border-ink' : 'border-ink/20 hover:border-ink'}`}>
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Colour">
        <div className="flex flex-wrap gap-2">
          {options.colors.map(([name, hex]) => (
            <button key={name} onClick={() => set('color', f.color === name ? '' : name)} aria-pressed={f.color === name} title={name} className={`flex items-center gap-2 h-9 pl-1.5 pr-3 text-xs font-semibold border transition ${f.color === name ? 'border-ink bg-bone' : 'border-ink/15 hover:border-ink'}`}>
              <span className="size-6 rounded-full border border-ink/15" style={{ background: hex }} />
              {name}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Availability">
        <div className="flex flex-col gap-1">
          <Choice active={!f.stock} onClick={() => set('stock', '')}>Any</Choice>
          <Choice active={f.stock === 'available'} onClick={() => set('stock', 'available')}>Available to order</Choice>
          {Object.entries(STOCK_LABELS).map(([k, label]) => (
            <Choice key={k} active={f.stock === k} onClick={() => set('stock', k)}>{label}</Choice>
          ))}
        </div>
      </FilterGroup>
    </div>
  )

  return (
    <>
      <section className="bg-ink text-paper relative overflow-hidden grain">
        <div className="container-x py-14 lg:py-20">
          <p className="eyebrow text-volt">{collection?.eyebrow ?? 'The catalogue'}</p>
          <h1 className="display text-6xl sm:text-8xl mt-3">{collection?.title ?? 'Shop all'}</h1>
          {collection?.intro && <p className="mt-4 text-paper/60 max-w-2xl text-lg">{collection.intro}</p>}
          <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex items-center gap-3 max-w-xl bg-paper text-ink px-4 h-14" role="search">
            <Search className="size-5 text-ash" />
            <input value={f.q} onChange={(e) => set('q', e.target.value)} placeholder="Search name or product code" className="flex-1 bg-transparent outline-none font-medium" aria-label="Search products" />
            {f.q && <button type="button" onClick={() => set('q', '')} aria-label="Clear search"><X className="size-4" /></button>}
          </form>
        </div>
      </section>

      <div className="container-x py-10 lg:py-14 grid lg:grid-cols-[260px_1fr] gap-10">
        <aside className="hidden lg:block lg:sticky lg:top-28 self-start" aria-label="Filters">{filters}</aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-ink/10">
            <p className="text-sm text-ash" aria-live="polite">
              {products.loading ? 'Loading products…' : `${results.length} ${results.length === 1 ? 'product' : 'products'}`}
              {activeCount > 0 && <button onClick={clearAll} className="ml-3 underline underline-offset-4 text-ink font-semibold">Clear filters</button>}
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setDrawer(true)} className="lg:hidden btn-ghost h-10 px-4">
                <SlidersHorizontal className="size-4" /> Filters{activeCount > 0 && ` (${activeCount})`}
              </button>
              <label className="sr-only" htmlFor="sort">Sort by</label>
              <select id="sort" value={f.sort} onChange={(e) => set('sort', e.target.value)} className="field h-10 w-auto pr-8 text-sm font-semibold">
                {Object.entries(SORTS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {products.error ? (
            <ErrorState />
          ) : !products.loading && results.length === 0 ? (
            <EmptyState title="No matches" action={<button onClick={clearAll} className="btn-ink">Reset filters</button>}>
              Nothing fits those filters yet. Try another size or colour — or <Link to="/bulk-orders" className="underline">ask us for a custom piece</Link>.
            </EmptyState>
          ) : (
            <ProductGrid products={results} loading={products.loading} cols="md:grid-cols-2 xl:grid-cols-3" />
          )}
        </div>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 right-0 w-[88%] max-w-sm bg-paper flex flex-col animate-rise">
            <div className="flex items-center justify-between h-16 px-5 border-b border-ink/10">
              <p className="display text-2xl">Filters</p>
              <button onClick={() => setDrawer(false)} aria-label="Close filters"><X className="size-6" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{filters}</div>
            <div className="p-4 border-t border-ink/10 grid grid-cols-2 gap-2">
              <button onClick={clearAll} className="btn-ghost">Clear</button>
              <button onClick={() => setDrawer(false)} className="btn-ink">Show {results.length}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function FilterGroup({ title, children }) {
  return (
    <fieldset>
      <legend className="eyebrow text-ash mb-3">{title}</legend>
      {children}
    </fieldset>
  )
}

function Choice({ active, onClick, children }) {
  return (
    <button onClick={onClick} aria-pressed={active} className={`text-left py-1.5 text-sm transition flex items-center gap-2 ${active ? 'font-bold text-ink' : 'text-ink/60 hover:text-ink'}`}>
      <span className={`size-1.5 rounded-full transition ${active ? 'bg-volt-dark scale-100' : 'bg-transparent scale-0'}`} />
      {children}
    </button>
  )
}
