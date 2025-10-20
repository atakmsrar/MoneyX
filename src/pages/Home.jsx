import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import Logo3D from '../components/Logo3D'
import LeadForm from '../components/LeadForm'
import InvitationBanner from '../components/InvitationBanner'
import TickerText from '../components/TickerText'

const Home = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const invitationRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false)

  useEffect(() => {
    // Проверяем, что все refs готовы
    if (!titleRef.current || !subtitleRef.current || !ctaRef.current) {
      return
    }

    // Устанавливаем начальные стили
    gsap.set(titleRef.current, { opacity: 0, y: 50, scale: 0.9 })
    gsap.set(subtitleRef.current, { opacity: 0, y: 30 })
    gsap.set(ctaRef.current, { opacity: 0, y: 20, scale: 0.95 })
    
    // Немедленно запускаем анимацию с immediateRender
    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      immediateRender: true
    })
    gsap.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.3,
      immediateRender: true
    })
    gsap.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.6,
      immediateRender: true
    })
    

    // Плавающая анимация для заголовка (запускаем после основной анимации)
    gsap.to(titleRef.current, {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.5
    })

    // Анимация появления индикатора прокрутки
    if (scrollIndicatorRef.current) {
      gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 20 })
      gsap.to(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 2
      })
    }
  }, [])

  const openLeadForm = () => {
    setIsLeadFormOpen(true)
  }

  const closeLeadForm = () => {
    setIsLeadFormOpen(false)
  }

  const scrollToInvitation = () => {
    if (invitationRef.current) {
      invitationRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollIndicatorRef.current) {
        const scrollY = window.scrollY
        const windowHeight = window.innerHeight
        const opacity = Math.max(0, 1 - scrollY / (windowHeight * 0.5))
        gsap.to(scrollIndicatorRef.current, {
          opacity: opacity,
          duration: 0.3
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <div className="min-h-screen">
      {/* Главная секция */}
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div ref={heroRef} className="max-w-6xl mx-auto text-center">
          {/* 3D Логотип */}
          <div ref={titleRef} className="mb-12 flex justify-center" style={{ opacity: 1, transform: 'translateY(0) scale(1)' }}>
            <Logo3D />
          </div>
          
          {/* Подзаголовок с подсветкой */}
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed text-center"
            style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1)',
              opacity: 1,
              transform: 'translateY(0)'
            }}
          >
            Профессиональная платформа для копитрейдинга и инвестиций с передовыми 
            стратегиями и экспертной поддержкой. Начни свой путь к пассивному доходу уже сегодня.
          </p>
          
          {/* CTA кнопки */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center" style={{ opacity: 1, transform: 'translateY(0) scale(1)' }}>
            <button 
              onClick={openLeadForm}
              className="btn-primary"
            >
              Поучаствовать
            </button>
          </div>
        </div>

        {/* Индикатор прокрутки */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToInvitation}
        >
          <div className="flex flex-col items-center space-y-2 text-amber-400 hover:text-amber-300 transition-colors duration-300">
            <span className="text-sm font-medium">Прокрутите вниз</span>
            <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Секция приглашения */}
      <div ref={invitationRef}>
        <InvitationBanner onBookSpot={openLeadForm} />
      </div>

      {/* Лид форма */}
      <LeadForm 
        isOpen={isLeadFormOpen}
        onClose={closeLeadForm}
        formType="course"
      />

      {/* Бегущая строка */}
      <TickerText />
    </div>
  )
}

export default Home
