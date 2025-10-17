import { useState, useEffect } from 'react'
import { gsap } from 'gsap'

const LeadForm = ({ isOpen, onClose, formType = 'consultation' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    country: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Список стран с масками телефонов
  const countries = [
    { 
      value: '', 
      label: 'Выберите страну',
      phoneMask: '+7 (999) 123-45-67',
      phoneCode: '+7',
      phoneRegex: /^[\+]?[1-9][\d]{0,15}$/
    },
    { 
      value: 'russia', 
      label: 'Россия',
      phoneMask: '+7 (999) 123-45-67',
      phoneCode: '+7',
      phoneRegex: /^[\+]?7[\d]{10}$/
    },
    { 
      value: 'belarus', 
      label: 'Беларусь',
      phoneMask: '+375 (29) 123-45-67',
      phoneCode: '+375',
      phoneRegex: /^[\+]?375[\d]{9}$/
    },
    { 
      value: 'kazakhstan', 
      label: 'Казахстан',
      phoneMask: '+7 (999) 123-45-67',
      phoneCode: '+7',
      phoneRegex: /^[\+]?7[\d]{10}$/
    },
    { 
      value: 'moldova', 
      label: 'Молдова',
      phoneMask: '+373 (22) 123-456',
      phoneCode: '+373',
      phoneRegex: /^[\+]?373[\d]{8}$/
    }
  ]

  // Получаем текущую страну
  const currentCountry = countries.find(c => c.value === formData.country) || countries[0]

  // Анимации
  useEffect(() => {
    if (isOpen) {
      const overlay = document.querySelector('.modal-overlay')
      const content = document.querySelector('.modal-content')
      
      if (!overlay || !content) {
        return
      }

      // Устанавливаем начальные стили
      gsap.set(overlay, { opacity: 0 })
      gsap.set(content, { opacity: 0, scale: 0.8, y: 50 })
      
      // Запускаем анимацию открытия
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
  }, [isOpen])

  const handleClose = () => {
    const overlay = document.querySelector('.modal-overlay')
    const content = document.querySelector('.modal-content')
    
    if (!overlay || !content) {
      onClose()
      return
    }

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
    .call(() => onClose())
  }

  // Валидация
  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'ФИО обязательно для заполнения'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'ФИО должно содержать минимум 2 символа'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Номер телефона обязателен'
    } else if (!currentCountry.phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = `Введите корректный номер телефона (${currentCountry.phoneMask})`
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email'
    }

    if (!formData.country) {
      newErrors.country = 'Выберите страну'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Здесь можно добавить отправку данных на сервер
      const selectedCountry = countries.find(c => c.value === formData.country)
      console.log('🎯 Лид-форма отправлена:', { 
        ...formData, 
        countryName: selectedCountry?.label || 'Не выбрано',
        formType,
        timestamp: new Date().toISOString()
      })
      
      // Имитация отправки
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Показываем сообщение об успехе
      alert('Спасибо! Мы свяжемся с вами в ближайшее время.')
      
      // Очищаем форму и закрываем модальное окно
      setFormData({ fullName: '', phone: '', email: '', country: '' })
      setErrors({})
      handleClose()
      
    } catch (error) {
      console.error('Ошибка отправки формы:', error)
      alert('Произошла ошибка. Попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Обработка изменений в полях
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Если изменилась страна, очищаем телефон
    if (name === 'country') {
      setFormData(prev => ({
        ...prev,
        phone: ''
      }))
    }
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Форматирование телефона в зависимости от страны
  const formatPhone = (value, country) => {
    const phone = value.replace(/\D/g, '')
    const phoneCode = country.phoneCode.replace('+', '')
    
    // Если номер пустой, возвращаем пустую строку
    if (phone.length === 0) {
      return ''
    }
    
    // Если номер не начинается с кода страны, добавляем его
    if (!phone.startsWith(phoneCode)) {
      const cleanPhone = phone.startsWith('+') ? phone.slice(1) : phone
      const fullPhone = phoneCode + cleanPhone
      return formatPhoneByCountry(fullPhone, country)
    }
    
    return formatPhoneByCountry(phone, country)
  }

  // Форматирование телефона для конкретной страны
  const formatPhoneByCountry = (phone, country) => {
    // Если номер пустой, возвращаем пустую строку
    if (!phone || phone.length === 0) {
      return ''
    }

    switch (country.value) {
      case 'russia':
      case 'kazakhstan':
        // +7 (XXX) XXX-XX-XX
        if (phone.length === 0) return ''
        if (phone.length === 1) return `+${phone}`
        if (phone.length <= 4) return `+${phone.slice(0, 1)} (${phone.slice(1)})`
        if (phone.length <= 7) return `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(4)}`
        if (phone.length <= 9) return `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`
        return `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9, 11)}`
      
      case 'belarus':
        // +375 (XX) XXX-XX-XX
        if (phone.length === 0) return ''
        if (phone.length <= 3) return `+${phone}`
        if (phone.length <= 5) return `+${phone.slice(0, 3)} (${phone.slice(3)})`
        if (phone.length <= 8) return `+${phone.slice(0, 3)} (${phone.slice(3, 5)}) ${phone.slice(5)}`
        if (phone.length <= 10) return `+${phone.slice(0, 3)} (${phone.slice(3, 5)}) ${phone.slice(5, 8)}-${phone.slice(8)}`
        return `+${phone.slice(0, 3)} (${phone.slice(3, 5)}) ${phone.slice(5, 8)}-${phone.slice(8, 10)}-${phone.slice(10, 12)}`
      
      case 'moldova':
        // +373 (XX) XXX-XXX
        if (phone.length === 0) return ''
        if (phone.length <= 3) return `+${phone}`
        if (phone.length <= 5) return `+${phone.slice(0, 3)} (${phone.slice(3)})`
        if (phone.length <= 8) return `+${phone.slice(0, 3)} (${phone.slice(3, 5)}) ${phone.slice(5)}`
        return `+${phone.slice(0, 3)} (${phone.slice(3, 5)}) ${phone.slice(5, 8)}-${phone.slice(8, 11)}`
      
      default:
        return phone
    }
  }

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value
    const phoneDigits = inputValue.replace(/\D/g, '')
    const phoneCode = currentCountry.phoneCode.replace('+', '')
    
    // Если пользователь удалил все цифры, очищаем поле полностью
    if (phoneDigits.length === 0) {
      setFormData(prev => ({
        ...prev,
        phone: ''
      }))
      
      if (errors.phone) {
        setErrors(prev => ({
          ...prev,
          phone: ''
        }))
      }
      return
    }
    
    // Если номер короче кода страны, добавляем код автоматически
    if (phoneDigits.length < phoneCode.length && !phoneDigits.startsWith(phoneCode)) {
      const fullPhone = phoneCode + phoneDigits
      const formatted = formatPhoneByCountry(fullPhone, currentCountry)
      setFormData(prev => ({
        ...prev,
        phone: formatted
      }))
    } else {
      // Обычное форматирование
      const formatted = formatPhone(inputValue, currentCountry)
      setFormData(prev => ({
        ...prev,
        phone: formatted
      }))
    }
    
    if (errors.phone) {
      setErrors(prev => ({
        ...prev,
        phone: ''
      }))
    }
  }


  if (!isOpen) return null

  const formTitle = formType === 'consultation' 
    ? 'Поучаствовать' 
    : 'Поучаствовать'

  const formDescription = formType === 'consultation'
    ? 'Оставьте свои контактные данные, и наш эксперт свяжется с вами для бесплатной консультации'
    : 'Заполните форму, чтобы получить доступ к полному курсу и начать обучение'

  return (
    <div className="modal-overlay fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="modal-content bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 shadow-2xl w-full max-w-md">
        {/* Заголовок */}
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {formTitle}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-300 mt-2 text-sm">
            {formDescription}
          </p>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* ФИО */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ФИО *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.fullName 
                  ? 'border-red-500 focus:ring-red-500/50' 
                  : 'border-white/20 focus:ring-amber-500/50 focus:border-amber-500'
              }`}
              placeholder="Введите ваше полное имя"
            />
            {errors.fullName && (
              <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Телефон */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Номер телефона *
              {formData.country && (
                <span className="text-amber-400 ml-2">
                  ({currentCountry.label})
                </span>
              )}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.phone 
                  ? 'border-red-500 focus:ring-red-500/50' 
                  : 'border-white/20 focus:ring-amber-500/50 focus:border-amber-500'
              }`}
              placeholder={currentCountry.phoneMask}
              disabled={!formData.country}
              onKeyDown={(e) => {
                // Разрешаем удаление символов
                if (e.key === 'Backspace' || e.key === 'Delete') {
                  return
                }
                // Разрешаем только цифры и специальные символы
                if (!/[0-9+\-\(\)\s]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                  e.preventDefault()
                }
              }}
            />
            {!formData.country && (
              <p className="text-gray-500 text-sm mt-1">
                Сначала выберите страну
              </p>
            )}
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500/50' 
                  : 'border-white/20 focus:ring-amber-500/50 focus:border-amber-500'
              }`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Страна */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Страна *
            </label>
            <div className="relative">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full px-4 py-3 pr-10 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                  errors.country 
                    ? 'border-red-500 focus:ring-red-500/50' 
                    : 'border-white/20 focus:ring-amber-500/50 focus:border-amber-500'
                }`}
              >
                {countries.map((country) => (
                  <option 
                    key={country.value} 
                    value={country.value}
                    className="bg-gray-800 text-white"
                  >
                    {country.label}
                  </option>
                ))}
              </select>
              {/* Кастомная стрелка */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.country && (
              <p className="text-red-400 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          {/* Кнопки */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 transform ${
                isSubmitting
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-300 hover:to-orange-400 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                  Отправляем...
                </div>
              ) : (
                'Поучаствовать'
              )}
            </button>
            
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 px-6 border border-white/20 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LeadForm
