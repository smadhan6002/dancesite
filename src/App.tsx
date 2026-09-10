import { useState, useEffect } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HeroSection from './sections/HeroSection'
import DanceSequenceSection from './sections/DanceSequenceSection'
import AcademySection from './sections/AcademySection'
import TimelineSection from './sections/TimelineSection'
import FounderSection from './sections/FounderSection'
import CoursesSection from './sections/CoursesSection'
import GallerySection from './sections/GallerySection'
import ReelsSection from './sections/ReelsSection'
import AchievementsSection from './sections/AchievementsSection'
import ContactSection from './sections/ContactSection'

import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'

import LoadingScreen from './components/LoadingScreen'
import ScrollProgressBar from './components/ScrollProgressBar'
import CustomCursor from './components/CustomCursor'

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check session storage on mount
    const auth = sessionStorage.getItem('admin_auth') === 'true'
    setIsAuthenticated(auth)

    // Handle back/forward buttons
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (path: string) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }

  const handleLogin = () => {
    sessionStorage.setItem('admin_auth', 'true')
    setIsAuthenticated(true)
    navigate('/admin/dashboard')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    setIsAuthenticated(false)
    navigate('/admin')
  }

  // Admin routes — no loading screen needed
  if (currentPath === '/admin/dashboard') {
    if (!isAuthenticated) {
      setTimeout(() => navigate('/admin'), 0)
      return null
    }
    return <AdminDashboard onLogout={handleLogout} />
  }

  if (currentPath === '/admin') {
    if (isAuthenticated) {
      setTimeout(() => navigate('/admin/dashboard'), 0)
      return null
    }
    return <AdminLogin onLogin={handleLogin} />
  }

  // Public SPA Route
  return (
    <>
      {/* Premium loading screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Gold scroll progress bar */}
      <ScrollProgressBar />

      {/* Premium custom cursor (desktop only) */}
      <CustomCursor />

      <Navbar />
      <main>
        <HeroSection />
        <DanceSequenceSection />
        <AcademySection />
        <TimelineSection />
        <FounderSection />
        <CoursesSection />
        <GallerySection />
        <ReelsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
