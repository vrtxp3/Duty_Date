function convertDate(input) {
    const cleaned = input.replace(/[^\d/\\-]/g, '');
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
    
    const monthIndex = parseInt(month, 10) - 1;
    const dayNumber = parseInt(day, 10);
    
    if (monthIndex < 0 || monthIndex > 11) return "Неверный месяц";
    if (dayNumber < 1 || dayNumber > 31) return "Неверный день";
    
    return `${dayNumber} ${months[monthIndex]} ${year}`;
}

const dateInput = document.getElementById("dateInput");
const convertedDateElement = document.getElementById("convertedDate");
const pasteButton = document.getElementById("pasteButton");

dateInput.addEventListener("input", async (e) => {
    const result = convertDate(e.target.value);
    convertedDateElement.textContent = result;
    
    if (!result.startsWith("Неверный")) {
        try {
            await navigator.clipboard.writeText(result);
            dateInput.value = ''; // Очистка поля после копирования
        } catch (error) {
            console.error('Ошибка копирования:', error);
        }
    }
});

convertedDateElement.addEventListener("click", () => {
    navigator.clipboard.writeText(convertedDateElement.textContent);
    dateInput.value = '';
});

pasteButton.addEventListener("click", async () => {
    try {
        const text = await navigator.clipboard.readText();
        dateInput.value = text;
        dateInput.dispatchEvent(new Event('input'));
    } catch (error) {
        console.error('Ошибка вставки:', error);
        convertedDateElement.textContent = "Ошибка доступа к буферу";
    }
});
