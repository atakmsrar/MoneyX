// Форматирование телефона для разных стран
export const formatPhoneByCountry = (phone, country) => {
  if (!phone || phone.length === 0) return ''

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

// Основная функция форматирования
export const formatPhone = (value, country) => {
  const phone = value.replace(/\D/g, '')
  const phoneCode = country.phoneCode.replace('+', '')
  
  if (phone.length === 0) return ''
  
  if (!phone.startsWith(phoneCode)) {
    const cleanPhone = phone.startsWith('+') ? phone.slice(1) : phone
    const fullPhone = phoneCode + cleanPhone
    return formatPhoneByCountry(fullPhone, country)
  }
  
  return formatPhoneByCountry(phone, country)
}
