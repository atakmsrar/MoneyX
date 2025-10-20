import { useEffect, useRef, useState } from 'react'
import { fadeInUp, staggerFadeIn } from '../utils/animations'
import { reviews } from '../constants/reviews'
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

    // Анимация появления заголовка
    fadeInUp(titleRef.current)

    // Анимация появления отзывов
    const validRefs = reviewsRef.current.filter(ref => ref !== null)
    if (validRefs.length > 0) {
      staggerFadeIn(validRefs, 0.5)
    }
  }, [])

  const openLeadForm = () => {
    setIsLeadFormOpen(true)
  }

  const closeLeadForm = () => {
    setIsLeadFormOpen(false)
  }


  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div ref={containerRef} className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-16 px-4">
          <h1 
            ref={titleRef}
            className="title-gradient mb-6"
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
            className="btn-primary"
          >
            Поучаствовать
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
