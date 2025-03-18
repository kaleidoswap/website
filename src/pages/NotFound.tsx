import { useNavigate } from 'react-router-dom'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { ArrowLeft, Home } from 'lucide-react'
import { footerConfig } from '@/constants/footer'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Fixed background gradient */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-primary-500/5 via-secondary-500/5 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative">
        <Navbar />
        
        <section className="py-20 md:py-32 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 grid-background opacity-10" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-bitcoin-500/10 to-transparent rounded-full blur-3xl animate-pulse-slow" aria-hidden="true" />
          
          <div className="container relative z-10 text-center">
            <div className="glass-card border-bitcoin-500/20 p-8 md:p-12 shadow-glow-bitcoin animate-fadeIn max-w-2xl mx-auto">
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-8xl font-bold mb-4 text-gradient-bitcoin">404</h1>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Page Not Found</h2>
                <p className="text-gray-300 mb-8">
                  The page you're looking for doesn't exist or has been moved.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn">
                  <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="group relative overflow-hidden border-bitcoin-500/50 text-bitcoin-500 hover:bg-bitcoin-500/10"
                  >
                    <span className="relative flex items-center">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Go Back
                    </span>
                  </Button>
                  
                  <Button
                    variant="secondary"
                    onClick={() => navigate('/')}
                    className="group relative overflow-hidden bg-gradient-to-r from-bitcoin-500 to-bitcoin-600 hover:from-bitcoin-400 hover:to-bitcoin-500"
                  >
                    <span className="relative flex items-center">
                      <Home className="mr-2 h-4 w-4" />
                      Return Home
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer {...footerConfig} />
      </div>
    </div>
  )
} 