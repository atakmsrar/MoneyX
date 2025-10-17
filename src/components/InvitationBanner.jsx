import { gsap } from 'gsap'

const InvitationBanner = ({ onBookSpot }) => {

  const handleBookSpot = () => {
    if (onBookSpot) {
      onBookSpot()
    } else {
      console.log('Бронирование места...')
    }
  }

  return (
    <div className="relative min-h-screen text-white flex items-center justify-center overflow-hidden">
      {/* Убираем все фоновые эффекты чтобы частицы были видны */}

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center text-center space-y-12">
          
          {/* Основной контент */}
          <div className="space-y-8">
            {/* Заголовок */}
            <div className="space-y-2">
              <div className="text-amber-400 text-sm font-medium tracking-wider uppercase">
                ОКТЯБРЬСКИЙ ПОТОК
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                <div className="bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">КОПИТРЕЙДИНГ</div>
                <div className="bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">С ЭКСПЕРТАМИ</div>
                <div className="bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">MONEYX</div>
              </h1>
            </div>

            {/* Призыв к действию */}
            <div className="space-y-3 text-xl md:text-2xl font-medium leading-relaxed">
              <div>ПРИСОЕДИНЯЙСЯ</div>
              <div>К ПРОФЕССИОНАЛЬНОМУ</div>
              <div>КОПИТРЕЙДИНГУ</div>
              <div className="bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">С ЭКСПЕРТАМИ MONEYX</div>
            </div>

            {/* Даты */}
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center flex flex-col items-center">
                <div className="text-8xl md:text-9xl font-bold text-white">15</div>
                <div className="text-lg text-gray-300 uppercase tracking-wider">ОКТЯБРЯ</div>
              </div>
              
              <div className="text-6xl md:text-7xl font-bold text-gray-400">-</div>
              
              <div className="text-center flex flex-col items-center">
                <div className="text-8xl md:text-9xl font-bold text-white">15</div>
                <div className="text-lg text-gray-300 uppercase tracking-wider">ДЕКАБРЯ</div>
              </div>
            </div>

            {/* Информация о вложениях */}
            <div className="bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-400/30 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <div className="text-amber-400 font-bold text-lg">💰 ТРЕБУЕТСЯ СТАРТОВЫЙ КАПИТАЛ</div>
                <div className="text-gray-300 text-sm">Для участия в копитрейдинге необходим минимальный депозит</div>
                <div className="text-white font-semibold">От $1000 для начала инвестиций</div>
              </div>
            </div>

            {/* Кнопка */}
            <div className="flex justify-center">
              <button
                onClick={handleBookSpot}
                className="group bg-gradient-to-r from-amber-400 to-orange-500 text-black px-8 py-4 rounded-lg font-bold text-lg hover:from-amber-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
              >
                <span>ПРИСОЕДИНИТЬСЯ К КОПИТРЕЙДИНГУ</span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="text-center space-y-2">
            <div className="bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold text-xl">ОГРАНИЧЕННОЕ КОЛИЧЕСТВО</div>
            <div className="text-gray-400 text-sm">Только 30 участников в потоке копитрейдинга</div>
          </div>
        </div>
      </div>

      {/* Убираем декоративные элементы чтобы не мешали частицам */}
    </div>
  )
}

export default InvitationBanner
