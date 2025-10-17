import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const cursorOutlineRef = useRef(null)

  useEffect(() => {
    // Скрываем курсор на мобильных устройствах
    if (window.innerWidth < 768) {
      return
    }

    const cursor = cursorRef.current
    const cursorOutline = cursorOutlineRef.current

    // Создаем анимацию следования за мышью
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX - 5,
        y: e.clientY - 5,
        duration: 0.1,
        ease: "power2.out"
      })
      
      gsap.to(cursorOutline, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    // Обработчики для увеличения курсора при наведении
    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: "power2.out" })
      gsap.to(cursorOutline, { scale: 1.5, duration: 0.3, ease: "power2.out" })
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" })
      gsap.to(cursorOutline, { scale: 1, duration: 0.3, ease: "power2.out" })
    }

    // Добавляем обработчики событий
    window.addEventListener('mousemove', moveCursor)
    
    // Находим все интерактивные элементы
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })

    // Очистка при размонтировании
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  // Скрываем курсор на мобильных устройствах
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null
  }

  return (
    <>
      <div 
        ref={cursorRef}
        className="cursor-dot"
      />
      <div 
        ref={cursorOutlineRef}
        className="cursor-outline"
      />
    </>
  )
}

export default CustomCursor
