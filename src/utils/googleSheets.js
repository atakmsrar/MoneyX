/**
 * Утилита для отправки данных в Google Sheets
 */

// URL вашего Google Apps Script Web App
// Инструкция по настройке в файле GOOGLE_SHEETS_SETUP.md
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxoNL2F4cdCAyNhgjB_oHV5Vqe_WvKL_tE52rtBRnSxfNYTZnLfqxaM6jLxIShH6CUA_Q/exec'

/**
 * Очищает номер телефона от всех символов, оставляя только цифры
 * @param {string} phone - номер телефона с форматированием
 * @returns {string} номер телефона только с цифрами
 */
const cleanPhoneNumber = (phone) => {
  if (!phone) return ''
  // Удаляем все символы кроме цифр
  return phone.replace(/\D/g, '')
}

/**
 * Отправляет данные лида в Google Sheets
 * @param {Object} leadData - данные лида
 * @param {string} leadData.fullName - ФИО
 * @param {string} leadData.country - страна
 * @param {string} leadData.email - email
 * @param {string} leadData.phone - телефон
 * @param {string} leadData.source - источник
 * @returns {Promise<Object>} результат отправки
 */
export const sendToGoogleSheets = async (leadData) => {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn('⚠️ Google Sheets URL не настроен. Данные не отправлены в таблицу.')
    return { success: false, error: 'URL не настроен' }
  }

  try {
    // Очищаем номер телефона от всех символов (скобки, пробелы, тире и т.д.)
    const cleanPhone = cleanPhoneNumber(leadData.phone)
    
    // Получаем URL текущей страницы
    const pageUrl = typeof window !== 'undefined' ? window.location.href : ''
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Важно для Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: leadData.fullName,
        country: leadData.country,
        email: leadData.email,
        phone: cleanPhone, // Отправляем только цифры
        timestamp: new Date().toISOString(),
        source: leadData.source || 'MoneyX Website',
        pageUrl: pageUrl
      })
    })

    // При mode: 'no-cors' мы не можем прочитать ответ,
    // но запрос будет отправлен успешно
    console.log('✅ Данные отправлены в Google Sheets (телефон:', cleanPhone, ', URL:', pageUrl, ')')
    return { success: true }

  } catch (error) {
    console.error('❌ Ошибка отправки в Google Sheets:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Валидация настройки Google Sheets
 * @returns {boolean} настроен ли Google Sheets
 */
export const isGoogleSheetsConfigured = () => {
  return Boolean(GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.trim() !== '')
}

