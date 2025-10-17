import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import LeadForm from '../components/LeadForm'

const Course = () => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const videoRef = useRef(null)
  const videoElementRef = useRef(null)
  const descriptionRef = useRef(null)
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false)
  const [leadFormType, setLeadFormType] = useState('consultation')

  useEffect(() => {
    // Проверяем, что все refs готовы
    if (!titleRef.current || !descriptionRef.current || !videoRef.current) {
      return
    }

    // Устанавливаем начальные стили
    gsap.set(titleRef.current, { opacity: 0, y: 50, scale: 0.9 })
    gsap.set(descriptionRef.current, { opacity: 0, y: 30 })
    gsap.set(videoRef.current, { opacity: 0, scale: 0.9 })
    
    const tl = gsap.timeline()
    
    // Анимация появления элементов
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out"
    })
    .to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .to(videoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      onComplete: () => {
        // Автоматически запускаем видео после анимации
        if (videoElementRef.current) {
          videoElementRef.current.play().catch(console.log)
        }
      }
    }, "-=0.3")
  }, [])

  // Дополнительный useEffect для автовоспроизведения видео
  useEffect(() => {
    const handleVideoLoad = () => {
      if (videoElementRef.current) {
        // Пытаемся запустить видео автоматически
        videoElementRef.current.play().catch(error => {
          console.log('Автовоспроизведение заблокировано браузером:', error)
          // Если автовоспроизведение заблокировано, показываем уведомление
          const videoContainer = videoElementRef.current.parentElement
          if (videoContainer) {
            const notification = document.createElement('div')
            notification.className = 'absolute top-4 right-4 bg-amber-400/90 text-black px-3 py-2 rounded-lg text-sm font-medium z-10'
            notification.innerHTML = '👆 Нажмите для воспроизведения'
            videoContainer.appendChild(notification)
            
            // Убираем уведомление через 5 секунд
            setTimeout(() => {
              if (notification.parentElement) {
                notification.parentElement.removeChild(notification)
              }
            }, 5000)
          }
        })
      }
    }

    if (videoElementRef.current) {
      videoElementRef.current.addEventListener('loadeddata', handleVideoLoad)
      
      return () => {
        if (videoElementRef.current) {
          videoElementRef.current.removeEventListener('loadeddata', handleVideoLoad)
        }
      }
    }
  }, [])

  // Функции для открытия форм
  const openConsultationForm = () => {
    setLeadFormType('consultation')
    setIsLeadFormOpen(true)
  }

  const openCourseForm = () => {
    setLeadFormType('course')
    setIsLeadFormOpen(true)
  }

  const closeLeadForm = () => {
    setIsLeadFormOpen(false)
  }

  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
          >
            Демо курс
          </h1>
          <p 
            ref={descriptionRef}
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Это видео содержит кусочки того, что вы сможете получить, пройдя наш полный курс. 
            Погрузитесь в мир профессионального трейдинга и откройте для себя новые возможности заработка.
          </p>
        </div>

        {/* Видео плеер */}
        <div ref={videoRef} className="mb-16">
          <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <video 
              ref={videoElementRef}
              className="w-full h-auto rounded-2xl"
              controls
              autoPlay
              muted
              loop
              poster=""
              preload="metadata"
              playsInline
            >
              <source src="/MoneyX/готовое.mp4" type="video/mp4" />
              Ваш браузер не поддерживает видео элемент.
            </video>
            
            {/* Декоративные элементы */}
            <div className="absolute top-4 left-4">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                ДЕМО ВЕРСИЯ
              </span>
            </div>
            
            <div className="absolute bottom-4 right-4">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                <span className="text-white text-sm">MoneyX Academy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Описание курса */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-amber-400/10 to-purple-600/10 rounded-2xl border border-amber-400/20 p-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-purple-600 bg-clip-text text-transparent">
              Что вы увидите в полном курсе:
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-amber-400 text-3xl mb-3">📈</div>
                <h3 className="text-xl font-bold text-white mb-2">Технический анализ</h3>
                <p className="text-gray-300 text-sm">Изучите графики, индикаторы и паттерны для принятия правильных решений</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-amber-400 text-3xl mb-3">💼</div>
                <h3 className="text-xl font-bold text-white mb-2">Управление рисками</h3>
                <p className="text-gray-300 text-sm">Научитесь защищать свой капитал и минимизировать потери</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-amber-400 text-3xl mb-3">🧠</div>
                <h3 className="text-xl font-bold text-white mb-2">Психология торговли</h3>
                <p className="text-gray-300 text-sm">Контролируйте эмоции и развивайте дисциплину трейдера</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={openCourseForm}
                className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold rounded-full hover:from-amber-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25"
              >
                Поучаствовать
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Лид форма */}
      <LeadForm 
        isOpen={isLeadFormOpen}
        onClose={closeLeadForm}
        formType={leadFormType}
      />
    </div>
  )
}

export default Course