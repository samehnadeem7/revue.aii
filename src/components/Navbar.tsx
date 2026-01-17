import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
      // Wait for navigation, then scroll
      setTimeout(() => {
        const aboutSection = document.getElementById('about')
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const handlePricingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
      // Wait for navigation, then scroll
      setTimeout(() => {
        const pricingSection = document.getElementById('pricing')
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      const pricingSection = document.getElementById('pricing')
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold text-white tracking-tight group-hover:text-white/90 transition-colors">
            REVUE. AI
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="relative inline-flex items-center gap-2 text-white/70 group py-2"
          >
            <span className="group-hover:text-white transition-colors duration-300 text-sm font-medium">Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white via-white/60 to-white/30 group-hover:w-full transition-all duration-300 ease-out"></span>
            <span className="inline-block opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-out text-white">
              →
            </span>
          </Link>
          <a
            href="#about"
            onClick={handleAboutClick}
            className="relative inline-flex items-center gap-2 text-white/70 group py-2"
          >
            <span className="group-hover:text-white transition-colors duration-300 text-sm font-medium">About</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white via-white/60 to-white/30 group-hover:w-full transition-all duration-300 ease-out"></span>
            <span className="inline-block opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-out text-white">
              →
            </span>
          </a>
          <a
            href="#pricing"
            onClick={handlePricingClick}
            className="relative inline-flex items-center gap-2 text-white/70 group py-2"
          >
            <span className="group-hover:text-white transition-colors duration-300 text-sm font-medium">Pricing</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white via-white/60 to-white/30 group-hover:w-full transition-all duration-300 ease-out"></span>
            <span className="inline-block opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-out text-white">
              →
            </span>
          </a>
        </nav>

        {/* Action Button */}
        {(() => {
          // Use context for reactive updates
          const { isAuthenticated, logout } = useAuth()

          if (isAuthenticated) {
            return (
              <button
                onClick={logout}
                className="relative px-5 py-2.5 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 text-white/90 font-semibold overflow-hidden group transition-all duration-300 inline-block hover:bg-black/50"
              >
                <span className="inline-block group-hover:-translate-y-1 transition-transform duration-300 text-sm">LOGOUT</span>
              </button>
            )
          }

          return (
            <Link
              to="/login"
              className="relative px-5 py-2.5 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 text-white/90 font-semibold overflow-hidden group transition-all duration-300 inline-block hover:bg-black/50"
            >
              <span className="inline-block group-hover:-translate-y-1 transition-transform duration-300 text-sm">LOGIN</span>
            </Link>
          )
        })()}
      </div>
    </header>
  )
}
