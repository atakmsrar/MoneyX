/**
 * Утилиты для определения типа устройства и оптимизации
 */

/**
 * Проверяет, является ли устройство мобильным
 * @returns {boolean} true если мобильное устройство
 */
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

/**
 * Проверяет, является ли устройство планшетом
 * @returns {boolean} true если планшет
 */
export const isTabletDevice = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= 768 && window.innerWidth < 1024
}

/**
 * Проверяет, является ли устройство десктопом
 * @returns {boolean} true если десктоп
 */
export const isDesktopDevice = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= 1024
}

/**
 * Возвращает оптимизированные настройки для GSAP анимаций
 * @returns {Object} настройки анимаций
 */
export const getAnimationSettings = () => {
  const isMobile = isMobileDevice()
  
  return {
    // Длительность анимаций
    duration: {
      fast: isMobile ? 0.2 : 0.3,
      normal: isMobile ? 0.4 : 0.6,
      slow: isMobile ? 0.6 : 1.0,
    },
    // Использовать ли сложные эффекты
    useComplexEffects: !isMobile,
    // Использовать ли blur эффекты
    useBlur: !isMobile,
    // Количество частиц
    particleCount: isMobile ? 15 : 80,
  }
}

