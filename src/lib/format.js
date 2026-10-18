export const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

export const effectivePrice = (product) => product.salePrice ?? product.price

export const discountPercent = (product) =>
  product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0

export const STOCK_LABELS = {
  in_stock: 'In stock',
  low_stock: 'Few left',
  out_of_stock: 'Sold out',
}
