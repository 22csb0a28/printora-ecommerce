import { useEffect } from 'react'

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | PRINTORA.NS` : 'PRINTORA.NS — College Merch, Custom Tees & Streetwear'
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
    window.scrollTo(0, 0)
  }, [title, description])
}
