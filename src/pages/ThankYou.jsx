import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'

const ThankYou = () => {
  const containerRef = useRef(null)
  const iconRef = useRef(null)
  const titleRef = useRef(null)
  const messageRef = useRef(null)
  const buttonRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Проверяем, что пользователь попал сюда после отправки формы
    const formSubmitted = sessionStorage.getItem('formSubmitted')
    
    if (!formSubmitted) {
      // Если не было отправки формы, перенаправляем на главную
      navigate('/', { replace: true })
      return
    }

    // Очищаем флаг после использования
    sessionStorage.removeItem('formSubmitted')

    // Анимации появления
    if (!iconRef.current || !titleRef.current || !messageRef.current || !buttonRef.current) {
      return
    }

    // Устанавливаем начальные стили
    gsap.set([iconRef.current, titleRef.current, messageRef.current, buttonRef.current], {
      opacity: 0,
      y: 30
    })

    // Анимация иконки с вращением
    gsap.set(iconRef.current, { scale: 0, rotation: -180 })

    const tl = gsap.timeline()

    tl.to(iconRef.current, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .to(messageRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")

    // Добавляем пульсацию иконке
    gsap.to(iconRef.current, {
      scale: 1.1,
      duration: 1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    })

  }, [navigate])

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Иконка успеха */}
        <div ref={iconRef} className="mb-8 flex justify-center">
          <div className="relative">
            {/* Внешний круг с градиентом */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-green-500 rounded-full blur-xl opacity-50"></div>
            
            {/* Основная иконка */}
            <div className="relative bg-gradient-to-br from-amber-400 to-green-500 rounded-full p-8">
              <svg 
                className="w-24 h-24 text-black" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Заголовок */}
        <h1 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-green-500 bg-clip-text text-transparent"
        >
          Спасибо!
        </h1>

        {/* Сообщение */}
        <div ref={messageRef} className="mb-12">
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Ваша заявка успешно отправлена! 🎉
          </p>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Наш менеджер свяжется с вами в ближайшее время.
          </p>
        </div>

        {/* Дополнительная информация */}
        <div className="bg-gradient-to-r from-amber-400/10 to-green-500/10 rounded-2xl border border-amber-400/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Что дальше?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="flex items-start gap-3">
              <div className="text-3xl">📞</div>
              <div>
                <h3 className="text-white font-semibold mb-1">Звонок</h3>
                <p className="text-gray-400 text-sm">Мы позвоним вам в течение 24 часов</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="text-3xl">💬</div>
              <div>
                <h3 className="text-white font-semibold mb-1">Консультация</h3>
                <p className="text-gray-400 text-sm">Наш эксперт ответит на все ваши вопросы</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="text-3xl">🎓</div>
              <div>
                <h3 className="text-white font-semibold mb-1">Обучение</h3>
                <p className="text-gray-400 text-sm">Начните свой путь в трейдинге с нами</p>
              </div>
            </div>
          </div>
        </div>

        {/* Кнопка возврата */}
        <div ref={buttonRef}>
          <Link 
            to="/"
            className="inline-block btn-primary"
          >
            Вернуться на главную
          </Link>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  )
}

export default ThankYou

