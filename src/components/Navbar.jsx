import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Search, X, MessageCircle } from 'lucide-react'
import Logo from './Logo.jsx'
import { useSettings } from './SettingsContext.jsx'
import { whatsappLink } from '../lib/whatsapp.js'

export const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/college-merch', label: 'College Merch' },
  { to: '/sports-jerseys', label: 'Sports Jerseys' },
  { to: '/bulk-orders', label: 'Bulk Orders' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const settings = useSettings()

  useEffect(() => {
    setOpen(false)
    setSearching(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const submit = (e) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
    setQuery('')
  }

  const linkCls = ({ isActive }) =>
    `relative py-1 text-[13px] font-semibold uppercase tracking-wider transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-volt-dark after:transition-all ${
      isActive ? 'text-ink after:w-full' : 'text-ink/60 hover:text-ink after:w-0 hover:after:w-full'
    }`

  return (
    <header className={`sticky top-0 z-40 bg-paper/90 backdrop-blur-md transition-shadow ${scrolled ? 'shadow-[0_1px_0_rgba(0,0,0,0.08)]' : ''}`}>
      <div className="container-x flex h-16 lg:h-[72px] items-center gap-6">
        <button className="lg:hidden -ml-1 p-1" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="size-6" />
        </button>
        <Logo />
        <nav className="hidden lg:flex items-center gap-7 mx-auto" aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={linkCls}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto lg:ml-0 flex items-center gap-1">
          <button onClick={() => setSearching((s) => !s)} className="p-2 hover:bg-bone rounded-full transition" aria-label="Search products" aria-expanded={searching}>
            {searching ? <X className="size-5" /> : <Search className="size-5" />}
          </button>
          {settings.whatsappNumber && (
            <a
              href={whatsappLink(settings.whatsappNumber, 'Hi PRINTORA.NS! I have a question.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 h-10 px-4 bg-ink text-paper text-xs font-bold uppercase tracking-wider hover:bg-volt hover:text-ink transition"
            >
              <MessageCircle className="size-4" /> Chat
            </a>
          )}
        </div>
      </div>

      {searching && (
        <div className="border-t border-ink/10 bg-paper animate-rise">
          <form onSubmit={submit} className="container-x flex items-center gap-3 py-4" role="search">
            <Search className="size-5 text-ash" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product name or code (e.g. PRN-006)"
              className="flex-1 bg-transparent text-lg sm:text-xl font-semibold outline-none placeholder:text-ash/70"
              aria-label="Search query"
            />
            <button className="btn-ink h-10 px-5">Search</button>
          </form>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-sm bg-ink text-paper flex flex-col animate-rise">
            <div className="flex items-center justify-between h-16 px-5 border-b border-paper/10">
              <Logo light />
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex flex-col p-5 gap-1" aria-label="Mobile">
              {NAV.map((n, i) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.end}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className={({ isActive }) => `animate-rise display text-4xl py-2 ${isActive ? 'text-volt' : 'text-paper hover:text-volt'}`}
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto p-5 border-t border-paper/10">
              <Link to="/bulk-orders" className="btn-volt w-full">Get a bulk quote</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
