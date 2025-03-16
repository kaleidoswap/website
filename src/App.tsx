// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { Downloads } from '@/pages/Downloads'
import { Privacy } from '@/pages/Privacy'
import { Terms } from '@/pages/Terms'
import { MarketMakers } from '@/pages/MarketMakers'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/market-makers" element={<MarketMakers />} />
      </Routes>
    </Router>
  )
}

export default App