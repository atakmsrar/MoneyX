// Список стран с масками телефонов
export const countries = [
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
  },
  { 
    value: 'latvia', 
    label: 'Латвия',
    phoneMask: '+371 (12) 345-678',
    phoneCode: '+371',
    phoneRegex: /^[\+]?371[\d]{8}$/
  }
]
