import React, { useState, useEffect } from 'react'
import FrontPage from './components/FrontPage'
import Details from './components/Details'
import Projects from './components/Projects'
import Footer from './components/Footer'
import Admin from './components/Admin'

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home')

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#home')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (currentHash === '#admin') {
    return <Admin />
  }

  return (
    <>
      <FrontPage />
      <Details />
      <Projects />
      <Footer />
    </>
  )
}

export default App

