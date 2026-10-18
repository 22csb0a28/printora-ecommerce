import { usePageMeta } from '../hooks/usePageMeta.js'

function PolicyPage({ title, description, updated, children }) {
  usePageMeta(title, description)
  return (
    <article className="container-x py-16 lg:py-24 max-w-3xl">
      <p className="eyebrow text-ash">Policies · Updated {updated}</p>
      <h1 className="display text-6xl sm:text-7xl mt-3">{title}</h1>
      <div className="mt-10 space-y-8 leading-relaxed text-ink/80 [&_h2]:display [&_h2]:text-3xl [&_h2]:text-ink [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        {children}
      </div>
    </article>
  )
}

export function PrivacyPolicy() {
  return (
    <PolicyPage title="Privacy Policy" description="How PRINTORA.NS handles your personal information." updated="October 2026">
      <section><h2>What we collect</h2><p>This website doesn't create customer accounts or take payments. When you order or enquire, the details you choose to share (name, phone, college, sizes, delivery address) are sent by you to us over WhatsApp.</p></section>
      <section><h2>How we use it</h2><ul><li>To confirm stock, pricing and delivery for your order.</li><li>To prepare design mockups for bulk orders.</li><li>To send shipping updates you asked for.</li></ul></section>
      <section><h2>Sharing</h2><p>We share delivery details only with our courier partners to ship your order. We never sell your information.</p></section>
      <section><h2>Your choices</h2><p>Ask us on WhatsApp or by email to delete your chat history and order details once your order is complete.</p></section>
    </PolicyPage>
  )
}

export function ShippingReturns() {
  return (
    <PolicyPage title="Shipping & Returns" description="Delivery timelines, charges, exchanges and the PRINTORA.NS size guide." updated="October 2026">
      <section><h2>Shipping</h2><ul><li>Ready-stock items dispatch in 1–2 working days; delivery in 4–8 working days across India.</li><li>Bulk and custom orders ship 7–14 days after mockup approval.</li><li>Delivery charges are confirmed on WhatsApp before you pay.</li></ul></section>
      <section><h2>Exchanges</h2><p>Size exchanges are accepted within 7 days of delivery on unworn, unwashed, non-customised items with tags intact. Message us on WhatsApp with your order details to start an exchange.</p></section>
      <section><h2>Custom & bulk orders</h2><p>Custom printed pieces can't be returned unless there's a printing defect or a mismatch with the approved mockup — in which case we reprint at no cost.</p></section>
      <section id="size-guide" className="scroll-mt-28">
        <h2>Size guide (inches)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-ink/10">
            <thead className="bg-bone text-left"><tr>{['Size', 'Regular chest', 'Regular length', 'Oversized chest', 'Oversized length'].map((h) => <th key={h} className="p-3 font-bold">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-ink/10">
              {[['XS', 36, 26, 42, 27], ['S', 38, 27, 44, 28], ['M', 40, 28, 46, 29], ['L', 42, 29, 48, 30], ['XL', 44, 30, 50, 31], ['XXL', 46, 31, 52, 32]].map((r) => (
                <tr key={r[0]}>{r.map((c, i) => <td key={i} className={`p-3 ${i === 0 ? 'font-bold' : ''}`}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PolicyPage>
  )
}
