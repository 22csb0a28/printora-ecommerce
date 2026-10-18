// Serves images through the Netlify Image CDN so the storefront never ships full-resolution originals.
// Works for local /img paths now and for remote storage URLs once allowed in netlify.toml.
export function img(src, width = 800, height) {
  if (!src) return ''
  if (import.meta.env.DEV) return src
  const params = new URLSearchParams({ url: src, w: String(width), fm: 'webp', q: '78' })
  if (height) {
    params.set('h', String(height))
    params.set('fit', 'cover')
  }
  return `/.netlify/images?${params}`
}
