import { Link } from 'react-router-dom'
import { Instagram, Mail, MapPin, MessageCircle, Phone, Youtube, Clock } from 'lucide-react'
import Logo from './Logo.jsx'
import { useSettings } from './SettingsContext.jsx'
import { whatsappLink } from '../lib/whatsapp.js'

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      ['/shop', 'All products'],
      ['/college-merch', 'College merch'],
      ['/sports-jerseys', 'Sports jerseys'],
      ['/shop?category=hoodies-sweatshirts', 'Hoodies'],
      ['/shop?category=custom-printed-t-shirts', 'Custom prints'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['/bulk-orders', 'Bulk orders'],
      ['/about', 'About us'],
      ['/contact', 'Contact'],
    ],
  },
  {
    title: 'Policies',
    links: [
      ['/shipping-returns', 'Shipping & returns'],
      ['/privacy-policy', 'Privacy policy'],
    ],
  },
]

export default function Footer() {
  const s = useSettings()
  return (
    <footer className="relative bg-ink text-paper overflow-hidden grain">
      <div className="container-x pt-16 pb-10 grid gap-12 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <Logo light />
          <p className="mt-4 text-paper/60 max-w-sm leading-relaxed">
            College merchandise, custom event tees, jerseys and streetwear — printed in small batches and shipped across India.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-paper/80">
            {s.phoneDisplay && <li className="flex gap-3"><Phone className="size-4 text-volt mt-0.5" />{s.phoneDisplay}</li>}
            {s.email && <li className="flex gap-3"><Mail className="size-4 text-volt mt-0.5" /><a href={`mailto:${s.email}`} className="hover:text-volt">{s.email}</a></li>}
            {s.address && <li className="flex gap-3"><MapPin className="size-4 text-volt mt-0.5" />{s.address}</li>}
            {s.hours && <li className="flex gap-3"><Clock className="size-4 text-volt mt-0.5" />{s.hours}</li>}
          </ul>
          <div className="mt-8 flex gap-2">
            {s.social?.instagram && (
              <a href={s.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="size-10 grid place-items-center border border-paper/20 hover:bg-volt hover:text-ink hover:border-volt transition"><Instagram className="size-4" /></a>
            )}
            {s.whatsappNumber && (
              <a href={whatsappLink(s.whatsappNumber, 'Hi PRINTORA.NS!')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="size-10 grid place-items-center border border-paper/20 hover:bg-volt hover:text-ink hover:border-volt transition"><MessageCircle className="size-4" /></a>
            )}
            {s.social?.youtube && (
              <a href={s.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="size-10 grid place-items-center border border-paper/20 hover:bg-volt hover:text-ink hover:border-volt transition"><Youtube className="size-4" /></a>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow text-volt">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map(([to, label]) => (
                  <li key={to}><Link to={to} className="text-paper/70 hover:text-paper transition">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="container-x">
        <p className="display text-[19vw] lg:text-[15rem] text-paper/[0.06] leading-[0.8] select-none -mb-[0.12em]" aria-hidden>PRINTORA.NS</p>
      </div>
      <div className="border-t border-paper/10">
        <div className="container-x py-5 flex flex-col sm:flex-row gap-2 justify-between text-xs text-paper/50">
          <p>© {new Date().getFullYear()} PRINTORA.NS. All rights reserved.</p>
          <p>Orders are placed and confirmed over WhatsApp. No online payment is taken on this site.</p>
        </div>
      </div>
    </footer>
  )
}
