import { useEffect, useRef } from 'react'
import { fadeInUp, staggerFadeIn } from '../utils/animations'
import { cryptoNews } from '../constants/news'
import NewsCard from '../components/NewsCard'

const News = () => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)


  useEffect(() => {
    // Проверяем, что refs готовы
    if (!titleRef.current || !containerRef.current) {
      return
    }

    // Анимация появления заголовка
    fadeInUp(titleRef.current)

    // Анимация появления карточек новостей
    const newsCards = containerRef.current?.querySelectorAll('.news-card')
    if (newsCards && newsCards.length > 0) {
      staggerFadeIn(newsCards, 0.5)
    }
  }, [])

  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div ref={containerRef} className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-16 px-4">
          <h1 
            ref={titleRef}
            className="title-gradient mb-6"
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
