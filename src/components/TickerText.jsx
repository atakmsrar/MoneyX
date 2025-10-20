import { useEffect, useRef } from 'react'
import { tickerAnimation } from '../utils/animations'

const TickerText = () => {
  const tickerRef = useRef(null)

  useEffect(() => {
    if (!tickerRef.current) return
    tickerAnimation(tickerRef.current, 15)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden bg-gradient-to-r from-amber-500/20 to-purple-500/20 border-t-2 border-amber-400/40 shadow-lg shadow-amber-500/10">
      <div 
        ref={tickerRef}
        className="whitespace-nowrap text-2xl md:text-3xl font-bold py-4 animate-ticker"
        style={{
          background: 'linear-gradient(90deg, #fbbf24, #ec4899, #8b5cf6, #fbbf24)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'gradient 2s ease infinite',
          textShadow: '0 0 30px rgba(251, 191, 36, 0.5)',
          minWidth: '200%'
        }}
      >
        <span className="inline-block mr-8">🔥 НОВЫЙ ПОТОК КОПИТРЕЙДИНГА</span>
        <span className="inline-block mr-8">💎 ОГРАНИЧЕННОЕ КОЛИЧЕСТВО МЕСТ</span>
        <span className="inline-block mr-8">🚀 ПАССИВНЫЙ ДОХОД ОТ ИНВЕСТИЦИЙ</span>
        <span className="inline-block mr-8">⭐ ПРОФЕССИОНАЛЬНЫЕ СТРАТЕГИИ</span>
        <span className="inline-block mr-8">💰 КОПИТРЕЙДИНГ С ЭКСПЕРТАМИ</span>
        <span className="inline-block mr-8">🔥 НОВЫЙ ПОТОК КОПИТРЕЙДИНГА</span>
        <span className="inline-block mr-8">💎 ОГРАНИЧЕННОЕ КОЛИЧЕСТВО МЕСТ</span>
        <span className="inline-block mr-8">🚀 ПАССИВНЫЙ ДОХОД ОТ ИНВЕСТИЦИЙ</span>
        <span className="inline-block mr-8">⭐ ПРОФЕССИОНАЛЬНЫЕ СТРАТЕГИИ</span>
        <span className="inline-block mr-8">💰 КОПИТРЕЙДИНГ С ЭКСПЕРТАМИ</span>
        <span className="inline-block mr-8">🔥 НОВЫЙ ПОТОК КОПИТРЕЙДИНГА</span>
        <span className="inline-block mr-8">💎 ОГРАНИЧЕННОЕ КОЛИЧЕСТВО МЕСТ</span>
        <span className="inline-block mr-8">🚀 ПАССИВНЫЙ ДОХОД ОТ ИНВЕСТИЦИЙ</span>
        <span className="inline-block mr-8">⭐ ПРОФЕССИОНАЛЬНЫЕ СТРАТЕГИИ</span>
        <span className="inline-block mr-8">💰 КОПИТРЕЙДИНГ С ЭКСПЕРТАМИ</span>
      </div>
      
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes ticker {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-ticker {
          animation: ticker 15s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default TickerText
