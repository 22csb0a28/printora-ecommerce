import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta.js'

export default function NotFound() {
  usePageMeta('Page not found')
  return (
    <section className="container-x py-24 lg:py-32 text-center">
      <p className="display text-[40vw] sm:text-[18rem] leading-none text-bone select-none" aria-hidden>404</p>
      <h1 className="display text-5xl sm:text-6xl -mt-6 sm:-mt-16">This page skipped class.</h1>
      <p className="mt-4 text-ash">The link may be broken or the product is no longer available.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="btn-ink">Go home</Link>
        <Link to="/shop" className="btn-ghost">Browse shop</Link>
      </div>
    </section>
  )
}
