// Storefront data access. Pages only talk to these functions.
// Currently backed by sample fixtures; the next milestone swaps the bodies for real
// database queries (published products only) without changing their signatures.
import { categories, products, settings, testimonials } from '../data/fixtures.js'

const published = () => products.filter((p) => p.published !== false)

export async function listProducts({ category, search, featured, newArrival } = {}) {
  let list = published()
  if (category) list = list.filter((p) => p.category === category)
  if (featured) list = list.filter((p) => p.featured)
  if (newArrival) list = list.filter((p) => p.newArrival)
  if (search) {
    const q = search.trim().toLowerCase()
    list = list.filter((p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q))
  }
  return list
}

export async function getProduct(code) {
  return published().find((p) => p.code.toLowerCase() === String(code).toLowerCase()) ?? null
}

export async function getRelatedProducts(product, limit = 4) {
  const list = published().filter((p) => p.code !== product.code)
  const same = list.filter((p) => p.category === product.category)
  return [...same, ...list.filter((p) => p.category !== product.category)].slice(0, limit)
}

export async function listCategories() {
  return categories
}

export function categoryName(slug) {
  return categories.find((c) => c.slug === slug)?.name ?? slug
}

export async function getSettings() {
  return settings
}

export async function listTestimonials() {
  return testimonials
}
