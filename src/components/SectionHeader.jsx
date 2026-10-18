import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function SectionHeader({ eyebrow, title, to, cta = 'View all', light = false }) {
  return (
    <div className="flex items-end justify-between gap-6 mb-8 sm:mb-10">
      <div>
        {eyebrow && <p className={`eyebrow ${light ? 'text-volt' : 'text-ash'}`}>{eyebrow}</p>}
        <h2 className="display text-4xl sm:text-5xl lg:text-6xl mt-2">{title}</h2>
      </div>
      {to && (
        <Link to={to} className={`group shrink-0 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider border-b-2 pb-1 ${light ? 'border-volt' : 'border-ink'}`}>
          {cta} <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  )
}
