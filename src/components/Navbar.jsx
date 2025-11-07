import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { isMobileDevice } from '../utils/deviceDetect'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navbarRef = useRef(null)

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

  const navItems = [
    { name: 'Главная', path: '/' },
    { name: 'Новости', path: '/news' },
    { name: 'Отзывы', path: '/reviews' },
    { name: 'Курсы', path: '/course' },
    { name: 'О нас', path: '/about' }
  ]

  const blurClass = isMobileDevice() ? '' : 'backdrop-blur-md'
  
  return (
    <>
      <nav 
        ref={navbarRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${blurClass} ${
          isScrolled 
            ? 'bg-black/50 border-b border-white/10' 
            : 'bg-black/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-4 md:py-0 md:h-16">
            {/* Логотип */}
            <Link 
              to="/" 
              className="text-2xl font-bold text-amber-400 hover:text-amber-300 transition-colors duration-300"
            >
              MoneyX
            </Link>

            {/* Навигационное меню */}
            <div className="flex items-center gap-2 md:gap-8 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-amber-400/40 scrollbar-track-transparent pb-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium rounded-full border border-transparent transition-all duration-300 hover:text-amber-400 flex-shrink-0 ${
                    location.pathname === item.path
                      ? 'text-black bg-amber-400'
                      : 'text-white hover:text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-28 md:h-20" aria-hidden="true"></div>
    </>
  )
}

export default Navbar
