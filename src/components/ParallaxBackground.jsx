import { useEffect, useRef } from 'react'

const ParallaxBackground = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    // Убираем всю логику анимации слоев, так как слоев больше нет
    // Оставляем только чистый черный фон для частиц
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Убираем все градиентные слои - оставляем только чистый черный фон */}
    </div>
  )
}

export default ParallaxBackground
