# Настройка Google Sheets для приёма лидов

Эта инструкция поможет настроить автоматическую отправку данных из формы в Google Sheets.

## Шаг 1: Создание Google Таблицы

1. Откройте [Google Sheets](https://sheets.google.com)
2. Создайте новую таблицу с названием "MoneyX - Лиды"
3. В первой строке создайте заголовки столбцов:
   - **A1**: ФИО
   - **B1**: Страна
   - **C1**: Почта
   - **D1**: Номер телефона
   - **E1**: Дата и время
   - **F1**: Источник

## Шаг 2: Создание Google Apps Script

1. В вашей таблице откройте: **Расширения** → **Apps Script**
2. Удалите весь код в редакторе
3. Вставьте следующий код:

```javascript
function doPost(e) {
  try {
    // Получаем активную таблицу
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Парсим данные из запроса
    var data = JSON.parse(e.postData.contents);
    
    // Формируем строку данных
    var row = [
      data.fullName || '',
      data.country || '',
      data.email || '',
      data.phone || '',
      data.timestamp || new Date().toISOString(),
      data.source || 'MoneyX Website'
    ];
    
    // Добавляем строку в таблицу
    sheet.appendRow(row);
    
    // Возвращаем успешный ответ
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Возвращаем ошибку
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Google Sheets API работает!');
}
```

4. Сохраните проект (Ctrl+S или Cmd+S)
5. Назовите проект: "MoneyX Leads API"

## Шаг 3: Деплой Web App

1. Нажмите **Развернуть** → **Новое развертывание**
2. Нажмите на иконку ⚙️ (шестерёнка) рядом с "Выберите тип"
3. Выберите **Веб-приложение**
4. Настройте параметры:
   - **Описание**: MoneyX Leads Collector
   - **Запускать как**: Я (ваш email)
   - **У кого есть доступ**: Все
5. Нажмите **Развернуть**
6. **Скопируйте URL веб-приложения** (он выглядит так: `https://script.google.com/macros/s/AKfycby.../exec`)

## Шаг 4: Настройка MoneyX

1. В корне проекта создайте файл `.env.local` (если его нет)
2. Добавьте в него строку:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/ВАШ_URL_ЗДЕСЬ/exec
```

3. Замените `ВАШ_URL_ЗДЕСЬ` на скопированный URL из шага 3

## Шаг 5: Перезапуск проекта

1. Остановите сервер разработки (Ctrl+C)
2. Запустите заново: `npm run dev`
3. Протестируйте форму - данные должны появиться в Google Sheets!

## Пример заполненной таблицы

| ФИО | Страна | Почта | Номер телефона | Дата и время | Источник |
|-----|--------|-------|----------------|--------------|----------|
| Иван Иванов | Россия | ivan@example.com | +7 (999) 123-45-67 | 2025-10-21T14:30:00.000Z | MoneyX Website |

## Проверка работы

После настройки вы можете проверить работу:

1. Откройте сайт
2. Заполните форму заявки
3. Отправьте форму
4. Проверьте Google Sheets - новая строка должна появиться автоматически

## Устранение проблем

### Данные не приходят в таблицу

1. Проверьте, что URL в `.env.local` правильный
2. Убедитесь, что в Google Apps Script настроен доступ "Все"
3. Проверьте консоль браузера (F12) на наличие ошибок
4. Убедитесь, что перезапустили сервер после добавления `.env.local`

### Ошибка "Authorization required"

1. В Google Apps Script перейдите в **Развернуть** → **Управление развертываниями**
2. Нажмите на иконку редактирования (карандаш)
3. Измените "У кого есть доступ" на "Все"
4. Обновите развертывание

## Дополнительные возможности

### Отправка уведомлений на email

Добавьте в Google Apps Script функцию отправки email:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var row = [
      data.fullName || '',
      data.country || '',
      data.email || '',
      data.phone || '',
      data.timestamp || new Date().toISOString(),
      data.source || 'MoneyX Website'
    ];
    
    sheet.appendRow(row);
    
    // Отправка email уведомления
    MailApp.sendEmail({
      to: 'your-email@example.com', // Ваш email
      subject: '🎯 Новый лид с MoneyX!',
      body: 'ФИО: ' + data.fullName + '\\n' +
            'Страна: ' + data.country + '\\n' +
            'Email: ' + data.email + '\\n' +
            'Телефон: ' + data.phone
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

**Готово!** Теперь все заявки будут автоматически сохраняться в Google Sheets 🎉

