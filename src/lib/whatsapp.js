import { effectivePrice, formatPrice } from './format.js'

// Normalises a phone number to the digits-only international format wa.me expects.
// Ten-digit Indian numbers get the 91 country code prefixed.
export function normalizeWhatsAppNumber(raw = '') {
  let digits = String(raw).replace(/\D/g, '').replace(/^0+/, '')
  if (digits.length === 10) digits = `91${digits}`
  return digits
}

export function whatsappLink(number, message) {
  const phone = normalizeWhatsAppNumber(number)
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function productOrderMessage({ product, size, color, quantity, url }) {
  const unit = effectivePrice(product)
  const lines = [
    'Hi PRINTORA.NS! I want to order:',
    '',
    `Product: ${product.name}`,
    `Product Code: ${product.code}`,
    `Price per item: ${formatPrice(unit)}`,
    `Size: ${size}`,
    `Colour: ${color}`,
    `Quantity: ${quantity}`,
    `Estimated total: ${formatPrice(unit * quantity)}`,
  ]
  if (url) lines.push(`Product link: ${url}`)
  lines.push('', 'Please confirm stock availability, delivery charges, and delivery details.')
  return lines.join('\n')
}

export function bulkEnquiryMessage(f) {
  const row = (label, value) => (value ? `${label}: ${value}` : null)
  return [
    'Hi PRINTORA.NS! Bulk / custom order enquiry:',
    '',
    row('Name', f.name),
    row('College / Organisation', f.organization),
    row('Contact number', f.phone),
    row('Email', f.email),
    row('Event', f.eventName),
    row('Product type', f.productType),
    row('Estimated quantity', f.quantity),
    row('Size distribution', f.sizes),
    row('Colour preferences', f.colors),
    row('Printing / customisation', f.customization),
    row('Logo / artwork', f.artwork),
    row('Required delivery date', f.deliveryDate),
    row('Notes', f.notes),
    '',
    'Please share a quote, sample options and timelines.',
  ]
    .filter((l) => l !== null)
    .join('\n')
}

export function openWhatsApp(number, message) {
  window.open(whatsappLink(number, message), '_blank', 'noopener,noreferrer')
}
