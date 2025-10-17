import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import LeadForm from '../components/LeadForm'

const Reviews = () => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const reviewsRef = useRef([])
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false)
  const animationTriggered = useRef(false)

  useEffect(() => {
    // Проверяем, что refs готовы и анимация еще не запускалась
    if (!titleRef.current || animationTriggered.current) {
      return
    }

    // Помечаем, что анимация запущена
    animationTriggered.current = true

    // Устанавливаем начальные стили
    gsap.set(titleRef.current, { opacity: 0, y: 50, scale: 0.9 })
    
    const tl = gsap.timeline()
    
    // Анимация появления заголовка
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out"
    })

    // Анимация появления отзывов
    const validRefs = reviewsRef.current.filter(ref => ref !== null)
    if (validRefs.length > 0) {
      gsap.set(validRefs, { opacity: 0, y: 30, scale: 0.95 })
      gsap.to(validRefs, { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.5
      })
    }
  }, [])

  const openLeadForm = () => {
    setIsLeadFormOpen(true)
  }

  const closeLeadForm = () => {
    setIsLeadFormOpen(false)
  }

  const reviews = [
    {
      name: "Александр Петров",
      role: "Копитрейдер",
      rating: 5,
      text: "За 6 месяцев копитрейдинга с MoneyX получил стабильную доходность 18%! Эксперты действительно знают свое дело. Рекомендую всем!",
      avatar: "АП"
    },
    {
      name: "Мария Сидорова",
      role: "Инвестор",
      rating: 5,
      text: "Начала с $2000, сейчас мой депозит вырос до $3500. Копитрейдинг с MoneyX - это пассивный доход, о котором я мечтала!",
      avatar: "МС"
    },
    {
      name: "Дмитрий Козлов",
      role: "Аналитик",
      rating: 5,
      text: "Профессиональные стратегии и прозрачная отчетность. За 4 месяца доходность составила 22%. Лучшая платформа для копитрейдинга!",
      avatar: "ДК"
    },
    {
      name: "Елена Волкова",
      role: "Предприниматель",
      rating: 5,
      text: "Благодаря копитрейдингу с MoneyX получаю стабильный пассивный доход. Не нужно следить за рынком - эксперты делают все за меня!",
      avatar: "ЕВ"
    },
    {
      name: "Игорь Морозов",
      role: "IT-специалист",
      rating: 5,
      text: "Отличная платформа для копитрейдинга! Удобный интерфейс, детальная аналитика и стабильные результаты. Доходность 15% за квартал.",
      avatar: "ИМ"
    },
    {
      name: "Анна Новикова",
      role: "Финансовый консультант",
      rating: 5,
      text: "Копитрейдинг с MoneyX превзошел все ожидания! За 8 месяцев увеличила капитал на 35%. Профессиональный подход и отличные результаты.",
      avatar: "АН"
    }
  ]

  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div ref={containerRef} className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
          >
            Отзывы
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Что говорят наши ученики о курсах MoneyX
          </p>
        </div>

        {/* Отзывы */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.map((review, index) => (
            <div 
              key={index}
              ref={el => reviewsRef.current[index] = el}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-lg mr-4">
                  {review.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{review.name}</h3>
                  <p className="text-sm text-gray-400">{review.role}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">★</span>
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

        {/* CTA секция */}
        <div className="text-center p-8 bg-gradient-to-r from-amber-400/10 to-purple-600/10 rounded-2xl border border-amber-400/20">
          <h2 className="text-3xl font-bold mb-4">Готовы начать копитрейдинг?</h2>
          <p className="text-gray-300 mb-6">
            Присоединяйтесь к успешным инвесторам MoneyX и получайте пассивный доход
          </p>
          <button 
            onClick={openLeadForm}
            className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold rounded-full hover:from-amber-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25"
          >
            Начать копитрейдинг
          </button>
        </div>
      </div>

      {/* Лид форма */}
      <LeadForm 
        isOpen={isLeadFormOpen}
        onClose={closeLeadForm}
        formType="course"
      />
    </div>
  )
}

export default Reviews
