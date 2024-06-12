function extractDate(dateString) {
  // Регулярные выражения для поиска дат в форматах YYYY-MM-DD и DD/MM/YYYY
  const regexYMD = /\d{4}-\d{2}-\d{2}/;
  const regexDMY = /\d{2}\/\d{2}\/\d{4}/;

  // Поиск соответствия в строке
  const matchYMD = dateString.match(regexYMD);
  const matchDMY = dateString.match(regexDMY);

  // Извлечение найденной даты
  let matchedDate = matchYMD ? matchYMD[0] : (matchDMY ? matchDMY[0] : null);

  // Если дата не найдена, возвращаем сообщение об ошибке
  if (!matchedDate) {
    return "Дата не найдена в строке.";
  }

  // Удаление лишних символов, которые могли попасть в результат
  matchedDate = matchedDate.replace(/[^0-9\-\/]/g, '');

  return convertDate(matchedDate);
}

function convertDate(dateString) {
  // Определение формата даты и разделение на части
  let parts = dateString.includes("-") ? dateString.split("-") : dateString.split("/");

  // Удаление пробелов и ведущих нулей из каждой части
  parts = parts.map(part => part.trim().replace(/^0+/, ""));

  // Присвоение значений дня, месяца и года
  let day, month, year;
  if (dateString.includes("-")) {
    [year, month, day] = parts;
  } else {
    [day, month, year] = parts;
  }

  // Преобразование месяца в число
  month = parseInt(month) - 1;

  // Получение названия месяца
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];
  const monthName = months[month];

  // Форматирование даты (единый формат день-месяц-год)
  const formattedDate = `${day} ${monthName} ${year}`;

  return formattedDate;
}

// Получение элементов DOM
const dateInput1 = document.getElementById("dateInput1");
const convertedDate1Element = document.getElementById("convertedDate1");

const dateInput2 = document.getElementById("dateInput2");
const convertedDate2Element = document.getElementById("convertedDate2");

// Обработка события ввода для первого поля даты
dateInput1.addEventListener("input", () => {
  const dateString = dateInput1.value;
  const convertedDate = extractDate(dateString); // Используем функцию extractDate
  convertedDate1Element.textContent = convertedDate;
});

// Обработка события нажатия на параграф с преобразованной датой для первого поля
convertedDate1Element.addEventListener("click", () => {
  navigator.clipboard.writeText(convertedDate1Element.textContent);
});

// Обработка события ввода для второго поля даты
dateInput2.addEventListener("input", () => {
  const dateString = dateInput2.value;
  const convertedDate = extractDate(dateString); // Используем функцию extractDate
  convertedDate2Element.textContent = convertedDate;
});

// Обработка события нажатия на параграф с преобразованной датой для второго поля
convertedDate2Element.addEventListener("click", () => {
  navigator.clipboard.writeText(convertedDate2Element.textContent);
});
