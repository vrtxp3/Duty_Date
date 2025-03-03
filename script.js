function convertDate(input) {
    // Очистка входных данных от лишних символов
    const cleaned = input.replace(/[^\d/\\-]/g, '');
    
    // Поиск паттернов даты
    const ymdMatch = cleaned.match(/(\d{4})[-/\\](\d{1,2})[-/\\](\d{1,2})/);
    const dmyMatch = cleaned.match(/(\d{1,2})[-/\\](\d{1,2})[-/\\](\d{4})/);

    if (ymdMatch) {
        const [_, year, month, day] = ymdMatch;
        return formatResult(day, month, year);
    }
    
    if (dmyMatch) {
        const [_, day, month, year] = dmyMatch;
        return formatResult(day, month, year);
    }
    
    return "Неверный формат даты";
}

function formatResult(day, month, year) {
    const months = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
    
    // Проверка валидности даты
    const monthIndex = parseInt(month, 10) - 1;
    const dayNumber = parseInt(day, 10);
    
    if (monthIndex < 0 || monthIndex > 11) return "Неверный месяц";
    if (dayNumber < 1 || dayNumber > 31) return "Неверный день";
    
    // Форматирование результата
    return `${dayNumber} ${months[monthIndex]} ${year}`;
}

// DOM элементы
const dateInput = document.getElementById("dateInput");
const convertedDateElement = document.getElementById("convertedDate");

// Новая функция для работы с буфером обмена
async function handleClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        if (text) {
            dateInput.value = text;
            const result = convertDate(text);
            convertedDateElement.textContent = result;
            
            if (!result.startsWith("Неверный")) {
                await navigator.clipboard.writeText(result);
            }
        }
    } catch (error) {
        console.log('Ошибка доступа к буферу:', error);
    }
}

// Автоматическая обработка при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    // Пытаемся прочитать буфер обмена
    try {
        await handleClipboard();
    } catch (error) {
        // Если нет разрешения, просто фокусируемся на поле ввода
        dateInput.focus();
    }
});

// Обработчик вставки через Ctrl+V или контекстное меню
dateInput.addEventListener('paste', async (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    dateInput.value = text;
    const result = convertDate(text);
    convertedDateElement.textContent = result;
    
    if (!result.startsWith("Неверный")) {
        await navigator.clipboard.writeText(result);
    }
});

// Обработка события ввода
dateInput.addEventListener("input", (e) => {
    const result = convertDate(e.target.value);
    convertedDateElement.textContent = result;
    
    // Автоматическое копирование при успешном преобразовании
    if (!result.startsWith("Неверный")) {
        navigator.clipboard.writeText(result)
            .catch(error => console.error('Ошибка копирования:', error));
    }
});

// Обработка события нажатия на параграф с преобразованной датой
convertedDateElement.addEventListener("click", () => {
    navigator.clipboard.writeText(convertedDateElement.textContent);
});
