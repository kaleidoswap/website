// src/App.tsx
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Lazy load pages for code splitting
const Home = lazy(() => import('@/pages/Home').then((m) => ({ default: m.Home })))
const Products = lazy(() => import('@/pages/Products').then((m) => ({ default: m.Products })))
const Downloads = lazy(() => import('@/pages/Downloads').then((m) => ({ default: m.Downloads })))
const Privacy = lazy(() => import('@/pages/Privacy').then((m) => ({ default: m.Privacy })))
const Terms = lazy(() => import('@/pages/Terms').then((m) => ({ default: m.Terms })))
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })))

// Product pages
const WebApp = lazy(() => import('@/pages/products/WebApp').then((m) => ({ default: m.WebApp })))
const Desktop = lazy(() => import('@/pages/products/Desktop').then((m) => ({ default: m.Desktop })))
const SDK = lazy(() => import('@/pages/products/SDK').then((m) => ({ default: m.SDK })))

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-400 text-sm">Loading...</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/web-app" element={<WebApp />} />
          <Route path="/products/desktop" element={<Desktop />} />
          <Route path="/products/sdk" element={<SDK />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
