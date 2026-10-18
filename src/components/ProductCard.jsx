import { Link } from 'react-router-dom'
import { img } from '../lib/image.js'
import { discountPercent, effectivePrice, formatPrice, STOCK_LABELS } from '../lib/format.js'
import { categoryName } from '../services/catalog.js'

export default function ProductCard({ product, priority = false }) {
  const off = discountPercent(product)
  const soldOut = product.stock === 'out_of_stock'
  const [primary, secondary] = product.images
  return (
    <Link to={`/product/${product.code}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-bone">
        <img
          src={img(primary, 640, 800)}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          className={`absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.04] ${secondary ? 'group-hover:opacity-0' : ''} ${soldOut ? 'grayscale opacity-70' : ''}`}
        />
        {secondary && (
          <img src={img(secondary, 640, 800)} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-0 transition duration-700 group-hover:opacity-100 group-hover:scale-[1.04]" />
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.newArrival && <span className="bg-paper text-ink px-2 py-1 text-[10px] font-bold uppercase tracking-widest">New</span>}
          {off > 0 && <span className="bg-volt text-ink px-2 py-1 text-[10px] font-bold uppercase tracking-widest">-{off}%</span>}
        </div>
        {product.stock !== 'in_stock' && (
          <span className={`absolute bottom-3 left-3 px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${soldOut ? 'bg-ink text-paper' : 'bg-ember text-white'}`}>
            {STOCK_LABELS[product.stock]}
          </span>
        )}
        <span className="absolute bottom-3 right-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 bg-ink text-paper px-3 py-2 text-[11px] font-bold uppercase tracking-wider">
          View
        </span>
      </div>
      <div className="pt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow text-ash">{product.code} · {categoryName(product.category)}</p>
          <h3 className="mt-1 font-semibold leading-snug truncate group-hover:underline underline-offset-4">{product.name}</h3>
        </div>
        <div className="text-right shrink-0">
          <p className="font-bold">{formatPrice(effectivePrice(product))}</p>
          {off > 0 && <p className="text-xs text-ash line-through">{formatPrice(product.price)}</p>}
        </div>
      </div>
    </Link>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] bg-bone" />
      <div className="mt-3 h-3 w-1/3 bg-bone" />
      <div className="mt-2 h-4 w-2/3 bg-bone" />
    </div>
  )
}

export function ProductGrid({ products, loading, skeletons = 8, cols = 'md:grid-cols-3 xl:grid-cols-4' }) {
  return (
    <div className={`grid grid-cols-2 ${cols} gap-x-4 gap-y-10 sm:gap-x-6`}>
      {loading
        ? Array.from({ length: skeletons }, (_, i) => <ProductCardSkeleton key={i} />)
        : products.map((p, i) => <ProductCard key={p.code} product={p} priority={i < 4} />)}
    </div>
  )
}
