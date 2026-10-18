import { Link } from 'react-router-dom'
import { LockKeyhole } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta.js'

// Placeholder for the secure admin console (see PLAN.md, milestones 3–5).
export default function AdminPreview() {
  usePageMeta('Admin')
  return (
    <section className="container-x py-24 max-w-xl text-center">
      <LockKeyhole className="size-10 mx-auto text-ash" strokeWidth={1.5} />
      <h1 className="display text-5xl mt-4">Admin console</h1>
      <p className="mt-3 text-ash">Secure sign-in for store administrators is being set up. Product, image and settings management will appear here.</p>
      <Link to="/" className="btn-ink mt-8">Back to store</Link>
    </section>
  )
}
