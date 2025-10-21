import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const FloatingParticles = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Создаем частицы
    const createParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'particle'
      
      // Случайные параметры
      const size = Math.random() * 6 + 0.5 // 0.5-6.5px (более разнообразные размеры)
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      const opacity = Math.random() * 0.8 + 0.1 // 0.1-0.9 (более широкий диапазон прозрачности)
      const color = ['#ffffff', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563'][Math.floor(Math.random() * 5)]
      
      particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, ${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')} 0%, ${color}${Math.floor(opacity * 128).toString(16).padStart(2, '0')} 50%, transparent 100%);
        border-radius: 50%;
        opacity: 1;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 1;
        filter: blur(0.5px);
        box-shadow: 0 0 ${size * 2}px ${color}20, 0 0 ${size * 4}px ${color}10, 0 0 ${size * 6}px ${color}05;
      `
      
      container.appendChild(particle)
      return particle
    }

    // Создаем меньше частиц для слабых устройств
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 15 : 80 // Уменьшено с 30 до 15 для мобильных
    const particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle())
    }

    // Улучшенная анимация частиц при скролле (оптимизированная для большого количества)
    let scrollY = 0
    let ticking = false

    const updateParticles = () => {
      const scrollSpeed = scrollY * 0.15 // Замедляем чувствительность к скроллу
      
      // Обрабатываем частицы батчами для лучшей производительности
      const batchSize = 20
      for (let i = 0; i < particles.length; i += batchSize) {
        const batch = particles.slice(i, i + batchSize)
        
        batch.forEach((particle, batchIndex) => {
          const index = i + batchIndex
          const speed = (index % 5 + 1) * 0.12 // Разные скорости для разнообразия
          const direction = index % 2 === 0 ? 1 : -1
          const horizontalDrift = Math.sin(scrollY * 0.003 + index) * 6
          
          gsap.to(particle, {
            y: `+=${scrollSpeed * speed * direction}`,
            x: `+=${scrollSpeed * speed * 0.2 * direction + horizontalDrift}`,
            rotation: `+=${scrollSpeed * 0.03}`,
            scale: 1 + Math.sin(scrollY * 0.001 + index) * 0.08,
            duration: 0.4,
            ease: "power1.out"
          })
        })
      }
      
      ticking = false
    }

    const handleScroll = () => {
      scrollY = window.scrollY
      
      if (!ticking) {
        requestAnimationFrame(updateParticles)
        ticking = true
      }
    }

    // Плавающая анимация частиц (оптимизированная для мобильных) - запускаем сразу
    particles.forEach((particle, _index) => {
      const duration = isMobile ? 8 + Math.random() * 4 : 4 + Math.random() * 6 // Медленнее на мобильных
      const delay = Math.random() * 1
      
      gsap.to(particle, {
        y: `+=${isMobile ? 20 + Math.random() * 40 : 30 + Math.random() * 80}`, // Меньше движения на мобильных
        x: `+=${isMobile ? 10 + Math.random() * 20 : 15 + Math.random() * 30}`,
        rotation: isMobile ? 90 + Math.random() * 90 : 180 + Math.random() * 180, // Меньше вращения на мобильных
        duration: duration,
        delay: delay,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })
    })

    // Анимация при наведении мыши (только для десктопа)
    if (!isMobile) {
      const handleMouseMove = (e) => {
        const x = e.clientX
        const y = e.clientY
        
        particles.forEach((particle, index) => {
          const rect = particle.getBoundingClientRect()
          const distance = Math.sqrt(
            Math.pow(x - (rect.left + rect.width / 2), 2) + 
            Math.pow(y - (rect.top + rect.height / 2), 2)
          )
          
          if (distance < 100) {
            const force = (100 - distance) / 100
            const angle = Math.atan2(
              y - (rect.top + rect.height / 2),
              x - (rect.left + rect.width / 2)
            )
            
            gsap.to(particle, {
              x: `+=${Math.cos(angle) * force * 20}`,
              y: `+=${Math.sin(angle) * force * 20}`,
              scale: 1 + force * 0.5,
              duration: 0.3,
              ease: "power2.out"
            })
          }
        })
      }
      
      window.addEventListener('mousemove', handleMouseMove)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
      // Очищаем частицы при размонтировании
      container.innerHTML = ''
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" />
}

export default FloatingParticles
