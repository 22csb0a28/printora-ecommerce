import { useState } from 'react'
import { MessageCircle, CheckCircle2, GraduationCap, PartyPopper, Trophy, Building2 } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { useSettings } from '../components/SettingsContext.jsx'
import { useToast } from '../components/Toast.jsx'
import { bulkEnquiryMessage, openWhatsApp } from '../lib/whatsapp.js'
import { img } from '../lib/image.js'

const PRODUCT_TYPES = ['Oversized T-Shirts', 'Round Neck T-Shirts', 'Polo T-Shirts', 'Hoodies & Sweatshirts', 'Sports Jerseys', 'Mixed / not sure yet']

const EMPTY = {
  name: '', organization: '', phone: '', email: '', eventName: '', productType: '', quantity: '',
  sizes: '', colors: '', customization: '', artwork: '', deliveryDate: '', notes: '',
}

const today = () => new Date().toISOString().slice(0, 10)

function validate(f) {
  const e = {}
  if (f.name.trim().length < 2) e.name = 'Enter your name'
  if (f.organization.trim().length < 2) e.organization = 'Enter your college or organisation'
  if (!/^\+?[\d\s-]{10,15}$/.test(f.phone.trim())) e.phone = 'Enter a valid 10-digit mobile number'
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email or leave it blank'
  if (!f.eventName.trim()) e.eventName = 'Enter the event or purpose'
  if (!f.productType) e.productType = 'Choose a product type'
  const q = Number(f.quantity)
  if (!Number.isInteger(q) || q < 10 || q > 10000) e.quantity = 'Bulk orders start at 10 pieces'
  if (!f.customization.trim()) e.customization = 'Tell us what to print'
  if (!f.deliveryDate) e.deliveryDate = 'Pick a delivery date'
  else if (f.deliveryDate < today()) e.deliveryDate = 'Date must be in the future'
  return e
}

export default function BulkOrders() {
  usePageMeta('Bulk & Custom Orders', 'Custom T-shirts, hoodies and jerseys in bulk for colleges, fests, clubs and companies. Free mockups, enquire on WhatsApp.')
  const settings = useSettings()
  const notify = useToast()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((x) => ({ ...x, [key]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    if (sending) return
    const next = validate(form)
    setErrors(next)
    if (Object.keys(next).length) {
      notify('A few details are missing — check the highlighted fields.', 'error')
      document.querySelector(`[name="${Object.keys(next)[0]}"]`)?.focus()
      return
    }
    setSending(true)
    openWhatsApp(settings.whatsappNumber, bulkEnquiryMessage(form))
    setSent(true)
    notify('WhatsApp opened with your enquiry. Press send in WhatsApp to reach us.')
    setTimeout(() => setSending(false), 2500)
  }

  const field = (key, label, props = {}) => (
    <div className={props.wide ? 'sm:col-span-2' : ''}>
      <label htmlFor={key} className="label">{label}{props.required && <span className="text-ember"> *</span>}</label>
      {props.as === 'textarea' ? (
        <textarea id={key} name={key} rows={3} value={form[key]} onChange={update(key)} placeholder={props.placeholder} className={`field h-auto py-3 ${errors[key] ? 'field-error' : ''}`} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-err` : undefined} />
      ) : props.as === 'select' ? (
        <select id={key} name={key} value={form[key]} onChange={update(key)} className={`field ${errors[key] ? 'field-error' : ''}`} aria-invalid={!!errors[key]}>
          <option value="">Select…</option>
          {props.options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input id={key} name={key} type={props.type ?? 'text'} value={form[key]} onChange={update(key)} placeholder={props.placeholder} min={props.min} inputMode={props.inputMode} autoComplete={props.autoComplete} className={`field ${errors[key] ? 'field-error' : ''}`} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-err` : undefined} />
      )}
      {errors[key] && <p id={`${key}-err`} className="mt-1.5 text-sm text-ember">{errors[key]}</p>}
    </div>
  )

  return (
    <>
      <section className="relative bg-ink text-paper overflow-hidden grain">
        <img src={img('/img/bulk.png', 1600)} alt="" className="absolute inset-0 size-full object-cover opacity-35" />
        <div className="relative container-x py-20 lg:py-28">
          <p className="eyebrow text-volt">Bulk & customised orders</p>
          <h1 className="display text-6xl sm:text-8xl lg:text-9xl mt-3 max-w-4xl">Your logo. Your crew. Our press.</h1>
          <p className="mt-5 text-lg text-paper/70 max-w-xl">Fest tees, club hoodies, team jerseys and corporate polos from 10 pieces. Free mockup, transparent pricing, size-wise packing.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            {[[GraduationCap, 'Colleges & councils'], [PartyPopper, 'Festivals & events'], [Trophy, 'Sports teams'], [Building2, 'Companies']].map(([Icon, label]) => (
              <span key={label} className="inline-flex items-center gap-2 border border-paper/25 px-4 h-10 text-sm"><Icon className="size-4 text-volt" />{label}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-14 lg:py-20 grid lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 space-y-8">
          <div>
            <h2 className="display text-4xl">How it works</h2>
            <ol className="mt-6 space-y-6">
              {[
                ['Send the enquiry', 'Fill the form — it opens WhatsApp with every detail pre-written.'],
                ['Get a mockup & quote', 'Our design team replies with a digital mockup and per-piece price, usually within 72 hours.'],
                ['Approve & collect sizes', 'Lock the design, share the final size list, and we start printing.'],
                ['Delivered to campus', 'Packed size-wise (or by name) and shipped with tracking.'],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="display text-3xl text-volt-dark w-8">{i + 1}</span>
                  <div><p className="font-bold">{t}</p><p className="text-sm text-ash mt-1">{d}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-bone p-6">
            <p className="eyebrow text-ash">Indicative pricing</p>
            <table className="w-full mt-4 text-sm">
              <tbody className="divide-y divide-ink/10">
                {[['10–49 pcs', 'from ₹329'], ['50–199 pcs', 'from ₹289'], ['200+ pcs', 'from ₹249']].map(([q, p]) => (
                  <tr key={q}><td className="py-2.5">{q}</td><td className="py-2.5 text-right font-bold">{p}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-ash">Round-neck 180 GSM, one-colour front print. Final quote depends on fabric, print method and placements.</p>
          </div>
        </aside>

        <div className="lg:col-span-8">
          {sent && (
            <div className="mb-8 flex items-start gap-3 bg-volt/30 border-l-4 border-volt-dark p-5 animate-rise" role="status">
              <CheckCircle2 className="size-5 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold">Your enquiry is ready in WhatsApp.</p>
                <p className="mt-1">Tap send in WhatsApp to reach our team. This isn't an order confirmation — we'll reply with a mockup and quote. WhatsApp didn't open? <button type="button" onClick={() => openWhatsApp(settings.whatsappNumber, bulkEnquiryMessage(form))} className="underline font-semibold">Try again</button>.</p>
              </div>
            </div>
          )}
          <form onSubmit={submit} noValidate className="border border-ink/10 p-6 sm:p-10">
            <h2 className="display text-4xl">Request a quote</h2>
            <p className="text-sm text-ash mt-2">Fields marked <span className="text-ember">*</span> are required.</p>

            <h3 className="eyebrow text-ash mt-10 mb-4">About you</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {field('name', 'Your name', { required: true, autoComplete: 'name', placeholder: 'Meera Iyer' })}
              {field('organization', 'College / organisation', { required: true, autoComplete: 'organization', placeholder: 'e.g. Student Council, ABC Institute' })}
              {field('phone', 'Contact number', { required: true, type: 'tel', inputMode: 'tel', autoComplete: 'tel', placeholder: '98765 43210' })}
              {field('email', 'Email (optional)', { type: 'email', autoComplete: 'email', placeholder: 'you@college.edu' })}
            </div>

            <h3 className="eyebrow text-ash mt-10 mb-4">The order</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {field('eventName', 'Event name / purpose', { required: true, placeholder: 'e.g. Spectrum Fest 2026 — volunteers' })}
              {field('productType', 'Product type', { required: true, as: 'select', options: PRODUCT_TYPES })}
              {field('quantity', 'Estimated quantity', { required: true, type: 'number', min: 10, inputMode: 'numeric', placeholder: '120' })}
              {field('deliveryDate', 'Required delivery date', { required: true, type: 'date', min: today() })}
              {field('sizes', 'Sizes & distribution', { wide: true, placeholder: 'e.g. S-15, M-40, L-35, XL-20, XXL-10' })}
              {field('colors', 'Colour preferences', { wide: true, placeholder: 'e.g. Black body, volt green print' })}
            </div>

            <h3 className="eyebrow text-ash mt-10 mb-4">Design</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {field('customization', 'Printing & customisation', { required: true, wide: true, as: 'textarea', placeholder: 'Front logo, back print with event dates, individual names on back…' })}
              {field('artwork', 'Logo / artwork details', { wide: true, as: 'textarea', placeholder: 'Do you have a ready logo (PNG/PDF/AI)? You can send files in the WhatsApp chat.' })}
              {field('notes', 'Additional notes', { wide: true, as: 'textarea', placeholder: 'Budget per piece, sample request, delivery address city…' })}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
              <button type="submit" disabled={sending} className="btn-whatsapp h-14 px-8 text-base">
                <MessageCircle className="size-5" /> {sending ? 'Opening WhatsApp…' : 'Send Enquiry on WhatsApp'}
              </button>
              <p className="text-xs text-ash max-w-sm">No payment needed. We reply on WhatsApp with a mockup and quote before anything is confirmed.</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
