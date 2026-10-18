import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { img } from '../lib/image.js'

export default function About() {
  usePageMeta('About us', 'PRINTORA.NS prints college merchandise, fest tees and team jerseys for students across India.')
  return (
    <>
      <section className="container-x py-16 lg:py-24 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow text-ash">About PRINTORA.NS</p>
          <h1 className="display text-6xl sm:text-8xl mt-3">Started in a hostel room. Printed for 120+ campuses.</h1>
        </div>
        <p className="lg:col-span-5 text-lg text-ink/70 leading-relaxed">
          PRINTORA.NS began when our founders couldn't find fest tees that looked good and lasted past the fest. Today we design and print
          college merchandise, event wear and team kits — in small, carefully checked batches — for students, clubs and organisers.
        </p>
      </section>
      <div className="container-x grid grid-cols-2 lg:grid-cols-3 gap-3">
        <img src={img('/img/custom.png', 900, 1100)} alt="Screen printing a T-shirt" loading="lazy" className="aspect-[4/5] object-cover size-full" />
        <img src={img('/img/fest.png', 900, 1100)} alt="Students at a college fest" loading="lazy" className="aspect-[4/5] object-cover size-full lg:translate-y-12" />
        <img src={img('/img/roundneck.png', 900, 1100)} alt="Stack of plain tees" loading="lazy" className="aspect-[4/5] object-cover size-full hidden lg:block" />
      </div>
      <section className="container-x py-24 grid md:grid-cols-3 gap-10">
        {[
          ['Fabric first', 'We test every blank for shrinkage, GSM and colour-fastness before it reaches a press.'],
          ['Design that belongs on campus', 'Our in-house designers work with your committee until the mockup feels like yours.'],
          ['Honest ordering', 'No online payments or hidden checkout fees. Every order is confirmed person-to-person on WhatsApp.'],
        ].map(([t, d], i) => (
          <div key={t} className="border-t-2 border-ink pt-5">
            <span className="font-mono text-xs text-ash">0{i + 1}</span>
            <h2 className="display text-3xl mt-2">{t}</h2>
            <p className="mt-3 text-ash leading-relaxed">{d}</p>
          </div>
        ))}
      </section>
      <section className="bg-volt">
        <div className="container-x py-16 flex flex-wrap items-center justify-between gap-6">
          <h2 className="display text-5xl sm:text-6xl">Got an event coming up?</h2>
          <Link to="/bulk-orders" className="btn-ink">Plan your bulk order</Link>
        </div>
      </section>
    </>
  )
}
