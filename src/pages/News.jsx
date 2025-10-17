import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import NewsCard from '../components/NewsCard'

const News = () => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)

  // Актуальные новости о копитрейдинге и инвестициях (декабрь 2024)
  const cryptoNews = [
    {
      title: "Копитрейдинг набирает популярность: +40% новых инвесторов за месяц",
      description: "Согласно последним данным, количество участников копитрейдинга выросло на 40% за последний месяц, что свидетельствует о растущем интересе к пассивным инвестициям.",
      source: "Investment News",
      time: "2 часа назад",
      tags: ["Копитрейдинг", "Рост", "Инвесторы"]
    },
    {
      title: "Эксперты MoneyX показали доходность 15-25% в ноябре",
      description: "Команда профессиональных трейдеров MoneyX продемонстрировала стабильную доходность от 15% до 25% в ноябре, подтверждая эффективность стратегий копитрейдинга.",
      source: "MoneyX Analytics",
      time: "4 часа назад",
      tags: ["MoneyX", "Доходность", "Стратегии"]
    },
    {
      title: "Новые регулятивные требования для копитрейдинга в ЕС",
      description: "Европейские регуляторы ввели новые требования для платформ копитрейдинга, направленные на защиту инвесторов и повышение прозрачности операций.",
      source: "Financial Times",
      time: "6 часов назад",
      tags: ["Регулирование", "ЕС", "Защита"]
    },
    {
      title: "Bitcoin ETF привлек $2.3 млрд за неделю",
      description: "Институциональные инвесторы активно вкладываются в Bitcoin ETF, привлекая рекордные $2.3 млрд за неделю, что создает новые возможности для копитрейдинга.",
      source: "CryptoNews",
      time: "8 часов назад",
      tags: ["Bitcoin", "ETF", "Институции"]
    },
    {
      title: "Алгоритмический трейдинг показывает рост на 35%",
      description: "Автоматизированные торговые системы демонстрируют рост эффективности на 35% благодаря улучшенным алгоритмам машинного обучения и анализу больших данных.",
      source: "TradingTech",
      time: "10 часов назад",
      tags: ["Алгоритмы", "Автоматизация", "ML"]
    },
    {
      title: "Новые возможности диверсификации в копитрейдинге",
      description: "Эксперты MoneyX представили инновационные стратегии диверсификации портфеля, включающие криптовалюты, акции и товарные активы для снижения рисков.",
      source: "MoneyX Research",
      time: "12 часов назад",
      tags: ["Диверсификация", "Риски", "Портфель"]
    },
    {
      title: "Психология инвестирования: как избежать эмоциональных решений",
      description: "Психологи и финансовые эксперты разработали новые методики для инвесторов, помогающие принимать рациональные решения и избегать импульсивных действий.",
      source: "Psychology Today",
      time: "1 день назад",
      tags: ["Психология", "Решения", "Рациональность"]
    },
    {
      title: "Блокчейн-технологии в традиционных инвестициях",
      description: "Крупные финансовые институты начинают интегрировать блокчейн-технологии в традиционные инвестиционные продукты, создавая новые возможности для копитрейдинга.",
      source: "Blockchain News",
      time: "1 день назад",
      tags: ["Блокчейн", "Традиции", "Инновации"]
    },
    {
      title: "Успешные истории копитрейдеров: от $100 до $50,000",
      description: "Реальные истории участников MoneyX, которые начали с минимальных вложений и достигли значительных результатов благодаря профессиональному копитрейдингу.",
      source: "Success Stories",
      time: "2 дня назад",
      tags: ["Истории", "Успех", "Результаты"]
    }
  ]

  useEffect(() => {
    // Проверяем, что refs готовы
    if (!titleRef.current || !containerRef.current) {
      return
    }

    // Устанавливаем начальные стили
    gsap.set(titleRef.current, { opacity: 0, y: 30, scale: 0.95 })
    
    const tl = gsap.timeline()
    
    // Анимация появления заголовка
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    })

    // Анимация появления карточек новостей
    const newsCards = containerRef.current?.querySelectorAll('.news-card')
    if (newsCards && newsCards.length > 0) {
      gsap.set(newsCards, { opacity: 0, y: 50, scale: 0.95 })
      gsap.to(newsCards, { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.6, 
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
      })
    }
  }, [])

  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div ref={containerRef} className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-16 px-4">
          <h1 
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-tight"
          >
            Новости
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Актуальные новости о копитрейдинге, инвестициях и финансовых рынках
          </p>
        </div>


        {/* Сетка новостей */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cryptoNews.map((news, index) => (
            <div key={index} className="news-card">
              <NewsCard news={news} index={index} />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default News
