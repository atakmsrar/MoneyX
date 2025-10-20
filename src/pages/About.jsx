import { useEffect, useRef, useState } from 'react'
import { fadeInUp, staggerFadeIn } from '../utils/animations'
import { stats } from '../constants/stats'
import PartnersTicker from '../components/PartnersTicker'
import LeadForm from '../components/LeadForm'

const About = () => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const statsRef = useRef(null)
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false)

  const openLeadForm = () => {
    console.log('Opening lead form...')
    setIsLeadFormOpen(true)
  }

  const closeLeadForm = () => {
    setIsLeadFormOpen(false)
  }

  useEffect(() => {
    // Проверяем, что refs готовы
    if (!titleRef.current || !contentRef.current || !statsRef.current) {
      return
    }

    // Анимация появления заголовка
    fadeInUp(titleRef.current)

    // Анимация появления контента
    fadeInUp(contentRef.current, 0.5)

    // Анимация появления статистики
    fadeInUp(statsRef.current, 0.7)
  }, [])


  return (
    <div className="min-h-screen pt-20">
      {/* Бегущая строка партнеров */}
      <PartnersTicker />

      <div ref={containerRef} className="max-w-6xl mx-auto px-4 py-12">
        {/* Заголовок */}
        <div className="text-center mb-16 px-4">
          <h1 
            ref={titleRef}
            className="title-gradient mb-6"
          >
            О MoneyX
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Профессиональная платформа для копитрейдинга и инвестиций
          </p>
        </div>

        {/* Основной контент */}
        <div ref={contentRef} className="space-y-16">
          {/* О компании */}
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Наша миссия
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              MoneyX — это ведущая платформа для копитрейдинга, которая предоставляет 
              профессиональные инвестиционные стратегии и экспертный менеджмент капитала. 
              Мы помогаем нашим клиентам получать стабильный пассивный доход через 
              профессиональное управление их инвестициями.
            </p>
          </div>

          {/* Статистика */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Преимущества */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Почему выбирают нас?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Профессиональная команда</h4>
                    <p className="text-gray-300">Наши эксперты имеют многолетний опыт работы на финансовых рынках</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Прозрачная отчетность</h4>
                    <p className="text-gray-300">Полная прозрачность всех операций и детальная аналитика результатов</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Диверсификация рисков</h4>
                    <p className="text-gray-300">Стратегии, направленные на минимизацию рисков и максимизацию доходности</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">24/7 Поддержка</h4>
                    <p className="text-gray-300">Круглосуточная поддержка наших клиентов и оперативное решение вопросов</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Наши принципы
              </h3>
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-amber-400/10 to-purple-500/10 rounded-xl border border-amber-400/20">
                  <h4 className="text-xl font-bold text-amber-400 mb-3">Безопасность</h4>
                  <p className="text-gray-300">Все средства клиентов защищены современными системами безопасности и застрахованы</p>
                </div>
                <div className="p-6 bg-gradient-to-r from-amber-400/10 to-purple-500/10 rounded-xl border border-amber-400/20">
                  <h4 className="text-xl font-bold text-amber-400 mb-3">Надежность</h4>
                  <p className="text-gray-300">Стабильные результаты и проверенные временем инвестиционные стратегии</p>
                </div>
                <div className="p-6 bg-gradient-to-r from-amber-400/10 to-purple-500/10 rounded-xl border border-amber-400/20">
                  <h4 className="text-xl font-bold text-amber-400 mb-3">Инновации</h4>
                  <p className="text-gray-300">Использование передовых технологий и алгоритмов для оптимизации инвестиций</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA секция */}
          <div className="text-center p-8 bg-gradient-to-r from-amber-400/10 to-purple-600/10 rounded-2xl border border-amber-400/20">
            <h2 className="text-3xl font-bold mb-4 text-white">Готовы начать инвестировать?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Присоединяйтесь к MoneyX и получите доступ к профессиональным инвестиционным стратегиям
            </p>
            <button 
              onClick={openLeadForm}
              className="btn-primary"
            >
              Поучаствовать
            </button>
          </div>
        </div>
      </div>

      {/* Лид форма */}
      <LeadForm 
        isOpen={isLeadFormOpen}
        onClose={closeLeadForm}
        formType="consultation"
      />
    </div>
  )
}

export default About
