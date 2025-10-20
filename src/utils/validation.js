// Валидация email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Валидация телефона по странам
export const validatePhone = (phone, country) => {
  const phoneRegex = {
    russia: /^[\+]?7[\d]{10}$/,
    kazakhstan: /^[\+]?7[\d]{10}$/,
    belarus: /^[\+]?375[\d]{9}$/,
    moldova: /^[\+]?373[\d]{8}$/
  }
  
  const regex = phoneRegex[country] || /^[\+]?[1-9][\d]{0,15}$/
  return regex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

// Валидация имени
export const validateName = (name) => {
  return name.trim().length >= 2
}

// Общая валидация формы
export const validateForm = (formData, countries) => {
  const errors = {}
  
  if (!validateName(formData.fullName)) {
    errors.fullName = formData.fullName.trim().length === 0 
      ? 'ФИО обязательно для заполнения'
      : 'ФИО должно содержать минимум 2 символа'
  }
  
  if (!formData.phone.trim()) {
    errors.phone = 'Номер телефона обязателен'
  } else if (!validatePhone(formData.phone, formData.country)) {
    const currentCountry = countries.find(c => c.value === formData.country)
    errors.phone = `Введите корректный номер телефона (${currentCountry?.phoneMask || ''})`
  }
  
  if (!formData.email.trim()) {
    errors.email = 'Email обязателен'
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Введите корректный email'
  }
  
  if (!formData.country) {
    errors.country = 'Выберите страну'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
