import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import { SettingsProvider } from './components/SettingsContext.jsx'
import { ToastProvider } from './components/Toast.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import BulkOrders from './pages/BulkOrders.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import { PrivacyPolicy, ShippingReturns } from './pages/Policy.jsx'
import AdminPreview from './pages/AdminPreview.jsx'
import NotFound from './pages/NotFound.jsx'

const COLLEGE = {
  title: 'College Merch',
  eyebrow: 'Campus & fest collection',
  intro: 'Batch tees, department drops, club sweatshirts and fest crew wear. Every design can be customised with your college name.',
  description: 'College merchandise and fest T-shirts — batch tees, department wear and crew merch from PRINTORA.NS.',
  categories: ['college-merchandise', 'college-fest-merchandise'],
}

const JERSEYS = {
  title: 'Sports Jerseys',
  eyebrow: 'Team merchandise',
  intro: 'Sublimated jerseys for football, cricket, basketball and more — with names, numbers and sponsor logos.',
  description: 'Custom sports jerseys for college teams with names and numbers. Order on WhatsApp.',
  categories: ['sports-jerseys'],
}

export default function App() {
  return (
    <SettingsProvider>
      <ToastProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="college-merch" element={<Shop key="college" collection={COLLEGE} />} />
            <Route path="sports-jerseys" element={<Shop key="jerseys" collection={JERSEYS} />} />
            <Route path="product/:code" element={<ProductDetail />} />
            <Route path="bulk-orders" element={<BulkOrders />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="shipping-returns" element={<ShippingReturns />} />
            <Route path="admin/*" element={<AdminPreview />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ToastProvider>
    </SettingsProvider>
  )
}
