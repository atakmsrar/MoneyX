import { gsap } from 'gsap'

// Общие анимации для элементов
export const fadeInUp = (element, delay = 0) => {
  if (!element) return
  
  gsap.set(element, { opacity: 0, y: 30, scale: 0.95 })
  gsap.to(element, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: "power2.out",
    delay
  })
}

export const fadeInScale = (element, delay = 0) => {
  if (!element) return
  
  gsap.set(element, { opacity: 0, scale: 0.9 })
  gsap.to(element, {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "power3.out",
    delay
  })
}

export const staggerFadeIn = (elements, delay = 0) => {
  if (!elements || elements.length === 0) return
  
  gsap.set(elements, { opacity: 0, y: 30, scale: 0.95 })
  gsap.to(elements, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    delay
  })
}

// Анимация модального окна
export const modalIn = (overlay, content) => {
  if (!overlay || !content) return
  
  gsap.set(overlay, { opacity: 0 })
  gsap.set(content, { opacity: 0, scale: 0.8, y: 50 })
  
  const tl = gsap.timeline()
  tl.to(overlay, { opacity: 1, duration: 0.3 })
    .to(content, { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      duration: 0.4, 
      ease: "back.out(1.7)" 
    }, "-=0.2")
}

export const modalOut = (overlay, content, onComplete) => {
  if (!overlay || !content) return
  
  const tl = gsap.timeline()
  tl.to(content, {
    opacity: 0,
    scale: 0.8,
    y: 50,
    duration: 0.3
  })
  .to(overlay, {
    opacity: 0,
    duration: 0.3
  }, "-=0.1")
  .call(() => onComplete && onComplete())
}

// Анимация тикера
export const tickerAnimation = (element, duration = 15) => {
  if (!element) return
  
  gsap.fromTo(element, 
    { x: '0%' },
    {
      x: '-50%',
      duration,
      ease: 'none',
      repeat: -1,
      immediateRender: true
    }
  )
}
