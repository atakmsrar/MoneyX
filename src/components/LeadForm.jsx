import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { modalIn, modalOut } from '../utils/animations'
import { validateForm } from '../utils/validation'
import { formatPhone } from '../utils/phoneFormatter'
import { countries } from '../constants/countries'
import { sendToGoogleSheets, isGoogleSheetsConfigured } from '../utils/googleSheets'

const LeadForm = ({ isOpen, onClose, formType = 'consultation' }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    country: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)


  // Получаем текущую страну
  const currentCountry = countries.find(c => c.value === formData.country) || countries[0]

  // Анимации
  useEffect(() => {
    if (isOpen) {
      const overlay = document.querySelector('.modal-overlay')
      const content = document.querySelector('.modal-content')
      modalIn(overlay, content)
    }
  }, [isOpen])

  const handleClose = () => {
    const overlay = document.querySelector('.modal-overlay')
    const content = document.querySelector('.modal-content')
    modalOut(overlay, content, onClose)
  }

  // Валидация
  const validateFormData = () => {
    const { isValid, errors: validationErrors } = validateForm(formData, countries)
    setErrors(validationErrors)
    return isValid
  }

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateFormData()) {
      return
    }

    setIsSubmitting(true)

    try {
      const selectedCountry = countries.find(c => c.value === formData.country)
      
      // Подготавливаем данные для отправки
      const leadData = {
        fullName: formData.fullName,
        country: selectedCountry?.label || formData.country,
        email: formData.email,
        phone: formData.phone,
        source: `MoneyX Website - ${formType}`
      }
      
      console.log('🎯 Лид-форма отправлена:', { 
        ...leadData,
        timestamp: new Date().toISOString()
      })
      
      // Отправляем данные в Google Sheets
      if (isGoogleSheetsConfigured()) {
        const sheetsResult = await sendToGoogleSheets(leadData)
        if (sheetsResult.success) {
          console.log('✅ Данные успешно сохранены в Google Sheets')
        } else {
          console.warn('⚠️ Не удалось сохранить в Google Sheets:', sheetsResult.error)
        }
      } else {
        console.warn('⚠️ Google Sheets не настроен. Инструкция: GOOGLE_SHEETS_SETUP.md')
      }
      
      // Отправляем событие Lead в Facebook Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: formType,
          content_category: 'Lead Form',
          value: 1,
          currency: 'USD'
        })
      }
      
      // Очищаем форму и закрываем модальное окно
      setFormData({ fullName: '', phone: '', email: '', country: '' })
      setErrors({})
      handleClose()
      
      // Устанавливаем флаг успешной отправки для Thank You страницы
      sessionStorage.setItem('formSubmitted', 'true')
      
      // Перенаправляем на Thank You страницу
      navigate('/thank-you')
      
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
      const formatted = formatPhone(fullPhone, currentCountry)
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
              className={`form-input ${
                errors.fullName ? 'form-input-error' : ''
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
              className={`form-input ${
                errors.phone ? 'form-input-error' : ''
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
              className={`form-input ${
                errors.email ? 'form-input-error' : ''
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
                className={`form-input appearance-none cursor-pointer ${
                  errors.country ? 'form-input-error' : ''
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
              className={`btn-primary ${
                isSubmitting ? 'bg-gray-600 text-gray-300 cursor-not-allowed' : ''
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
              className="btn-secondary"
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
