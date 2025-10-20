import { useEffect, useRef } from 'react'
import { tickerAnimation } from '../utils/animations'
import { partners } from '../constants/partners'

const PartnersTicker = () => {
  const tickerRef = useRef(null)


  useEffect(() => {
    if (!tickerRef.current) return
    tickerAnimation(tickerRef.current, 20)
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 to-purple-500/10 border-y border-amber-400/20 py-6">
      <div className="text-center mb-4">
        <span className="text-amber-400 font-bold text-lg">В ПАРТНЕРСТВЕ С</span>
      </div>
      <div 
        ref={tickerRef}
        className="whitespace-nowrap text-2xl md:text-3xl font-bold"
        style={{
          minWidth: '200%'
        }}
      >
        {partners.map((partner, index) => (
          <span key={index} className="inline-block mr-16 text-white/80 hover:text-amber-400 transition-colors duration-300">
            {partner.name}
          </span>
        ))}
        {partners.map((partner, index) => (
          <span key={`duplicate-${index}`} className="inline-block mr-16 text-white/80 hover:text-amber-400 transition-colors duration-300">
            {partner.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default PartnersTicker
