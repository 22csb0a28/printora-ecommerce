import { useState } from 'react'
import { Mail, MapPin, MessageCircle, Phone, Clock, Instagram } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { useSettings } from '../components/SettingsContext.jsx'
import { useToast } from '../components/Toast.jsx'
import { openWhatsApp, whatsappLink } from '../lib/whatsapp.js'

export default function Contact() {
  usePageMeta('Contact', 'Reach PRINTORA.NS on WhatsApp, email or Instagram for orders, bulk quotes and support.')
  const s = useSettings()
  const notify = useToast()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim() || message.trim().length < 5) {
      setError('Add your name and a short message.')
      return
    }
    setError('')
    openWhatsApp(s.whatsappNumber, `Hi PRINTORA.NS! I'm ${name.trim()}.\n\n${message.trim()}`)
    notify('WhatsApp opened with your message.')
  }

  const cards = [
    { icon: MessageCircle, title: 'WhatsApp', value: s.phoneDisplay, href: s.whatsappNumber && whatsappLink(s.whatsappNumber, 'Hi PRINTORA.NS!') },
    { icon: Mail, title: 'Email', value: s.email, href: s.email && `mailto:${s.email}` },
    { icon: Instagram, title: 'Instagram', value: s.instagramHandle, href: s.social?.instagram },
    { icon: MapPin, title: 'Studio', value: s.address },
    { icon: Clock, title: 'Hours', value: s.hours },
    { icon: Phone, title: 'Call', value: s.phoneDisplay, href: s.whatsappNumber && `tel:+${s.whatsappNumber}` },
  ].filter((c) => c.value)

  return (
    <section className="container-x py-16 lg:py-24 grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-6">
        <p className="eyebrow text-ash">Contact</p>
        <h1 className="display text-6xl sm:text-8xl mt-3">Say hi. We reply fast.</h1>
        <div className="mt-10 grid sm:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
          {cards.map(({ icon: Icon, title, value, href }) => {
            const body = (
              <>
                <Icon className="size-5 text-volt-dark" />
                <p className="eyebrow text-ash mt-4">{title}</p>
                <p className="font-semibold mt-1 break-words">{value}</p>
              </>
            )
            return href ? (
              <a key={title} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="bg-paper p-6 hover:bg-bone transition">{body}</a>
            ) : (
              <div key={title} className="bg-paper p-6">{body}</div>
            )
          })}
        </div>
      </div>
      <form onSubmit={submit} noValidate className="lg:col-span-6 bg-ink text-paper p-6 sm:p-10 self-start">
        <h2 className="display text-4xl">Send a message</h2>
        <p className="text-paper/60 text-sm mt-2">Opens WhatsApp with your message ready to send.</p>
        <label htmlFor="c-name" className="label mt-8">Your name</label>
        <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} className="field" autoComplete="name" />
        <label htmlFor="c-msg" className="label mt-6">Message</label>
        <textarea id="c-msg" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="field h-auto py-3" placeholder="Question about sizes, an order, or a collaboration…" />
        {error && <p className="mt-2 text-sm text-ember" role="alert">{error}</p>}
        <button className="btn-whatsapp mt-8 w-full sm:w-auto"><MessageCircle className="size-5" /> Message on WhatsApp</button>
      </form>
    </section>
  )
}
