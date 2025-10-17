import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navbarRef = useRef(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Проверяем, что ref готов
    if (!navbarRef.current) {
      return
    }

    // Устанавливаем начальные стили
    gsap.set(navbarRef.current, { y: -100, opacity: 0 })
    
    // Анимация появления навбара
    gsap.to(navbarRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    })
  }, [])

  useEffect(() => {
    if (!mobileMenuRef.current) return

    if (isMobileMenuOpen) {
      gsap.fromTo(mobileMenuRef.current, 
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.3, ease: "power2.out" }
      )
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      })
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { name: 'Главная', path: '/' },
    { name: 'Новости', path: '/news' },
    { name: 'Отзывы', path: '/reviews' },
    { name: 'Курсы', path: '/course' },
    { name: 'О нас', path: '/about' }
  ]

  return (
    <nav 
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-md bg-black/50 border-b border-white/10' 
          : 'backdrop-blur-md bg-black/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-amber-400 hover:text-amber-300 transition-colors duration-300"
          >
            MoneyX
          </Link>

          {/* Навигационное меню */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-amber-400 ${
                  location.pathname === item.path
                    ? 'text-amber-400'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Мобильное меню */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white hover:text-amber-400 transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden bg-black/95 backdrop-blur-md border-b border-white/10"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`block px-3 py-2 text-lg font-medium transition-all duration-300 hover:text-amber-400 ${
                  location.pathname === item.path
                    ? 'text-amber-400'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
