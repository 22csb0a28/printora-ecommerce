import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, Minus, Plus, MessageCircle, Ruler, Truck, ShieldCheck, Share2 } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { useAsync } from '../hooks/useAsync.js'
import { categoryName, getProduct, getRelatedProducts } from '../services/catalog.js'
import { useSettings } from '../components/SettingsContext.jsx'
import { useToast } from '../components/Toast.jsx'
import { ProductGrid } from '../components/ProductCard.jsx'
import { EmptyState, ErrorState } from '../components/States.jsx'
import { img } from '../lib/image.js'
import { discountPercent, effectivePrice, formatPrice, STOCK_LABELS } from '../lib/format.js'
import { openWhatsApp, productOrderMessage } from '../lib/whatsapp.js'

const MAX_QTY = 50

export default function ProductDetail() {
  const { code } = useParams()
  const { data: product, loading, error } = useAsync(() => getProduct(code), [code])
  usePageMeta(product?.name ?? (loading ? 'Loading' : 'Product not found'), product?.description)

  if (loading) return <DetailSkeleton />
  if (error) return <div className="container-x py-16"><ErrorState /></div>
  if (!product)
    return (
      <div className="container-x py-20">
        <EmptyState title="Product not found" action={<Link to="/shop" className="btn-ink">Back to shop</Link>}>
          We couldn't find a product with code “{code}”. It may have sold out or been removed.
        </EmptyState>
      </div>
    )
  return <ProductView key={product.code} product={product} />
}

function ProductView({ product }) {
  const settings = useSettings()
  const notify = useToast()
  const [active, setActive] = useState(0)
  const [size, setSize] = useState('')
  const [color, setColor] = useState(product.colors.length === 1 ? product.colors[0].name : '')
  const [qty, setQty] = useState(1)
  const [errors, setErrors] = useState({})
  const related = useAsync(() => getRelatedProducts(product), [product.code])

  useEffect(() => {
    if (product.sizes.length === 1) setSize(product.sizes[0])
  }, [product])

  const unit = effectivePrice(product)
  const off = discountPercent(product)
  const soldOut = product.stock === 'out_of_stock'
  const url = `${import.meta.env.VITE_SITE_URL || window.location.origin}/product/${product.code}`

  const order = () => {
    const next = {}
    if (!size) next.size = 'Choose a size'
    if (!color) next.color = 'Choose a colour'
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) next.qty = `Quantity must be 1–${MAX_QTY}`
    setErrors(next)
    if (Object.keys(next).length) {
      notify('Please pick a size and colour before ordering.', 'error')
      return
    }
    openWhatsApp(settings.whatsappNumber, productOrderMessage({ product, size, color, quantity: qty, url }))
    notify('WhatsApp opened with your order details. We confirm stock and delivery in the chat.')
  }

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: product.name, url })
      else {
        await navigator.clipboard.writeText(url)
        notify('Product link copied.')
      }
    } catch {
      /* share sheet dismissed */
    }
  }

  return (
    <>
      <div className="container-x pt-6">
        <nav className="flex items-center gap-1 text-xs text-ash" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ink">Home</Link><ChevronRight className="size-3" />
          <Link to="/shop" className="hover:text-ink">Shop</Link><ChevronRight className="size-3" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-ink">{categoryName(product.category)}</Link>
        </nav>
      </div>

      <section className="container-x py-8 lg:py-12 grid lg:grid-cols-12 gap-8 lg:gap-14">
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-3">
          {product.images.length > 1 && (
            <div className="flex sm:flex-col gap-2 sm:w-20 shrink-0">
              {product.images.map((src, i) => (
                <button key={src} onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`} aria-current={i === active} className={`aspect-[4/5] w-16 sm:w-full overflow-hidden border-2 transition ${i === active ? 'border-ink' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={img(src, 160, 200)} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <div className="relative flex-1 aspect-[4/5] bg-bone overflow-hidden">
            {product.images.map((src, i) => (
              <img key={src} src={img(src, 1100, 1375)} alt={i === active ? product.name : ''} className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-0'}`} loading={i === 0 ? 'eager' : 'lazy'} />
            ))}
            {off > 0 && <span className="absolute top-4 left-4 bg-volt px-3 py-1.5 text-xs font-bold uppercase tracking-widest">Save {off}%</span>}
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <p className="eyebrow text-ash">{categoryName(product.category)}</p>
          <h1 className="display text-5xl sm:text-6xl mt-2">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="font-mono bg-bone px-2 py-1">{product.code}</span>
            <StockBadge stock={product.stock} />
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            <p className="text-3xl font-extrabold">{formatPrice(unit)}</p>
            {off > 0 && <p className="text-lg text-ash line-through">{formatPrice(product.price)}</p>}
            <p className="text-xs text-ash">incl. taxes, excl. delivery</p>
          </div>
          <p className="mt-6 text-ink/75 leading-relaxed">{product.description}</p>

          <fieldset className="mt-8">
            <div className="flex items-center justify-between">
              <legend className="label mb-0">Colour {color && <span className="font-normal normal-case tracking-normal text-ash">— {color}</span>}</legend>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button key={c.name} onClick={() => { setColor(c.name); setErrors((e) => ({ ...e, color: undefined })) }} aria-pressed={color === c.name} aria-label={c.name} title={c.name}
                  className={`size-11 rounded-full p-1 border-2 transition ${color === c.name ? 'border-ink' : 'border-transparent hover:border-ink/30'}`}>
                  <span className="block size-full rounded-full border border-ink/15" style={{ background: c.hex }} />
                </button>
              ))}
            </div>
            {errors.color && <p className="mt-2 text-sm text-ember">{errors.color}</p>}
          </fieldset>

          <fieldset className="mt-6">
            <div className="flex items-center justify-between">
              <legend className="label mb-0">Size</legend>
              <Link to="/shipping-returns#size-guide" className="text-xs underline underline-offset-4 inline-flex items-center gap-1"><Ruler className="size-3.5" /> Size guide</Link>
            </div>
            <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => { setSize(s); setErrors((e) => ({ ...e, size: undefined })) }} aria-pressed={size === s}
                  className={`h-12 text-sm font-bold border transition ${size === s ? 'bg-ink text-paper border-ink' : errors.size ? 'border-ember' : 'border-ink/20 hover:border-ink'}`}>
                  {s}
                </button>
              ))}
            </div>
            {errors.size && <p className="mt-2 text-sm text-ember">{errors.size}</p>}
          </fieldset>

          <div className="mt-6">
            <span className="label">Quantity</span>
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center border border-ink/20 h-12">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-12 h-full grid place-items-center hover:bg-bone disabled:opacity-30" disabled={qty <= 1} aria-label="Decrease quantity"><Minus className="size-4" /></button>
                <input type="number" min="1" max={MAX_QTY} value={qty} onChange={(e) => setQty(Math.min(MAX_QTY, Math.max(1, parseInt(e.target.value, 10) || 1)))} className="w-14 h-full text-center font-bold bg-transparent outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" aria-label="Quantity" />
                <button onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} className="w-12 h-full grid place-items-center hover:bg-bone disabled:opacity-30" disabled={qty >= MAX_QTY} aria-label="Increase quantity"><Plus className="size-4" /></button>
              </div>
              <p className="text-sm text-ash">Estimated total <span className="block text-lg font-bold text-ink">{formatPrice(unit * qty)}</span></p>
            </div>
            {errors.qty && <p className="mt-2 text-sm text-ember">{errors.qty}</p>}
            {qty >= 20 && <p className="mt-2 text-sm">Ordering {qty}? <Link to="/bulk-orders" className="underline font-semibold">Get bulk pricing</Link></p>}
          </div>

          <div className="mt-8 flex gap-2">
            <button onClick={order} disabled={soldOut} className="btn-whatsapp flex-1 h-14 text-base">
              <MessageCircle className="size-5" /> {soldOut ? 'Sold out' : 'Buy on WhatsApp'}
            </button>
            <button onClick={share} className="btn-ghost h-14 w-14 px-0" aria-label="Share product"><Share2 className="size-5" /></button>
          </div>
          <p className="mt-3 text-xs text-ash">Opens WhatsApp with your order details. Your order is confirmed only after we reply with stock and delivery details.</p>

          <ul className="mt-8 border-t border-ink/10 divide-y divide-ink/10 text-sm">
            <li className="flex gap-3 py-4"><Truck className="size-5 shrink-0" /> Pan-India delivery in 4–8 working days. Charges confirmed on WhatsApp.</li>
            <li className="flex gap-3 py-4"><ShieldCheck className="size-5 shrink-0" /> Size exchange within 7 days on unworn, non-customised pieces.</li>
          </ul>
        </div>
      </section>

      <section className="container-x py-16 border-t border-ink/10">
        <h2 className="display text-4xl sm:text-5xl mb-8">You might also like</h2>
        <ProductGrid products={related.data ?? []} loading={related.loading} skeletons={4} />
      </section>
    </>
  )
}

function StockBadge({ stock }) {
  const tone = { in_stock: 'bg-[#1faa53]', low_stock: 'bg-ember', out_of_stock: 'bg-ash' }[stock]
  return (
    <span className="inline-flex items-center gap-2 font-semibold">
      <span className={`size-2 rounded-full ${tone}`} /> {STOCK_LABELS[stock]}
    </span>
  )
}

function DetailSkeleton() {
  return (
    <div className="container-x py-12 grid lg:grid-cols-12 gap-14 animate-pulse">
      <div className="lg:col-span-7 aspect-[4/5] bg-bone" />
      <div className="lg:col-span-5 space-y-4">
        <div className="h-3 w-24 bg-bone" />
        <div className="h-14 w-4/5 bg-bone" />
        <div className="h-8 w-32 bg-bone" />
        <div className="h-24 bg-bone" />
        <div className="h-12 bg-bone" />
        <div className="h-14 bg-bone" />
      </div>
    </div>
  )
}
