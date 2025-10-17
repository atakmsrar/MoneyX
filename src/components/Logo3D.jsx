import { useRef } from 'react'

const Logo3D = () => {
  const containerRef = useRef(null)
  const moneyLettersRef = useRef([])
  const xLetterRef = useRef(null)

  const moneyText = "MONEY"
  const letters = moneyText.split('')

  return (
    <div 
      ref={containerRef}
      className="flex items-center justify-center cursor-pointer relative"
    >
      <div className="flex items-center space-x-2 relative z-10">
        {/* Буквы MONEY */}
        {letters.map((letter, index) => (
          <span
            key={index}
            ref={el => moneyLettersRef.current[index] = el}
            className="text-6xl md:text-8xl font-extrabold text-white uppercase tracking-wider relative"
            style={{
              fontFamily: 'Orbitron, monospace',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1)',
              transformStyle: 'preserve-3d'
            }}
          >
            {letter}
          </span>
        ))}
        
        {/* Буква X */}
        <span
          ref={xLetterRef}
          className="text-6xl md:text-8xl font-extrabold text-amber-400 uppercase tracking-wider relative"
          style={{
            fontFamily: 'Orbitron, monospace',
            textShadow: '0 0 30px rgba(251, 191, 36, 0.8), 0 0 60px rgba(251, 191, 36, 0.4), 0 0 90px rgba(251, 191, 36, 0.2)',
            transformStyle: 'preserve-3d'
          }}
        >
          X
        </span>
      </div>
    </div>
  )
}

export default Logo3D
