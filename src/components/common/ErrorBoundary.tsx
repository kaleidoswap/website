import { Component, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
              <span className="text-red-400 text-2xl">!</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
            <p className="text-gray-400 mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false })
                window.location.href = '/'
              }}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
