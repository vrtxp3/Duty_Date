function convertDate(dateString) {
  const formatRegex = /^(?:\d{4}-\d{1,2}-\d{1,2})|(?:\d{2}\/\d{2}\/\d{4})$/;
  if (!formatRegex.test(dateString)) {
    return "Формат даты должен быть YYYY-MM-DD или DD/MM/YYYY";
  }

  // Удаление лишних символов, оставляя только цифры и разделители
  dateString = dateString.replace(/[^\d\/\-]/g, '');

  let day, month, year;
  if (dateString.includes("-")) {
    [year, month, day] = dateString.split("-");
  } else {
    [day, month, year] = dateString.split("/");
  }

  month = parseInt(month) - 1;

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const monthName = months[month];

  day = day.replace(/^0+/, "");
  const formattedDate = `${day} ${monthName} ${year}`;

  return formattedDate;
}

const dateInput1 = document.getElementById("dateInput1");
const convertedDate1Element = document.getElementById("convertedDate1");

dateInput1.addEventListener("input", () => {
  const dateString = dateInput1.value;

  const convertedDate = convertDate(dateString);

  convertedDate1Element.textContent = convertedDate;

  if (convertedDate !== "Формат даты должен быть YYYY-MM-DD или DD/MM/YYYY") {
    navigator.clipboard.writeText(convertedDate1Element.textContent);
  }
});
