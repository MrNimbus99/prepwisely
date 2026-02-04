import React, { useState } from 'react'
import { PageName } from './types'

// Import pages (we'll create these next)
import LandingPage from './pages/LandingPage'

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [currentPage, setCurrentPage] = useState<PageName>('landing')

  const handleNavigate = (page: PageName) => {
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />
      
      // We'll add more pages as we build them
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Page: {currentPage}</h1>
              <p className="text-muted-foreground mb-4">This page is under construction</p>
              <button 
                onClick={() => handleNavigate('landing')}
                className="text-primary hover:underline"
              >
                ← Back to Landing
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
    </div>
  )
}

export default App
