import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const PartnersTicker = () => {
  const tickerRef = useRef(null)

  const partners = [
    { name: "Richard Wee Chambers", logo: "RWC" },
    { name: "Alliance Bank", logo: "AB" },
    { name: "Liberty Insurance", logo: "LI" },
    { name: "Solaroo", logo: "SOL" },
    { name: "StashAway", logo: "SA" },
    { name: "Grandall Law Firm", logo: "GLF" },
    { name: "Investment Partners", logo: "IP" },
    { name: "Financial Advisors", logo: "FA" }
  ]

  useEffect(() => {
    if (!tickerRef.current) return

    // Устанавливаем начальную позицию и сразу запускаем анимацию
    gsap.fromTo(tickerRef.current, 
      { x: '0%' },
      {
        x: '-50%',
        duration: 20,
        ease: 'none',
        repeat: -1,
        immediateRender: true
      }
    )
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
