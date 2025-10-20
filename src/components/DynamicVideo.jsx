import { useEffect, useRef } from 'react'

const DynamicVideo = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      // Определяем правильный путь к видео в зависимости от платформы
      const isGitHubPages = window.location.hostname === 'atakmsrar.github.io' || 
                           window.location.pathname.includes('/MoneyX/')
      
      const videoPath = isGitHubPages ? '/MoneyX/готовое.mp4' : '/готовое.mp4'
      
      // Создаем source элемент
      const source = document.createElement('source')
      source.src = videoPath
      source.type = 'video/mp4'
      
      // Очищаем существующие source элементы и добавляем новый
      videoRef.current.innerHTML = ''
      videoRef.current.appendChild(source)
    }
  }, [])

  return (
    <video 
      ref={videoRef}
      className="w-full h-auto rounded-2xl"
      controls
      autoPlay
      muted
      loop
      poster=""
      preload="metadata"
      playsInline
    >
      Ваш браузер не поддерживает видео элемент.
    </video>
  )
}

export default DynamicVideo

