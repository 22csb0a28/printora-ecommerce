import { Link } from 'react-router-dom'

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`display text-2xl sm:text-[28px] tracking-tight ${light ? 'text-paper' : 'text-ink'}`} aria-label="PRINTORA.NS home">
      PRINTORA<span className="text-volt-dark">.</span>NS
    </Link>
  )
}
