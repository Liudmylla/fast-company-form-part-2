const addZero = (num) => {
  return num < 10 ? "0" + String(num) : String(num);
};

const formatPhrase = (num) => {
  if (String(num)[0] === "1" && (num < 10 || num > 20)) return "минута";
  if (/[234]$/.test(String(num)) && (num < 10 || num > 20)) return "минуты";

  return "минут";
};

const getMonth = (index) => {
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
    "декабря"
  ];

  return months[index];
};

export const displayDate = (date) => {
  date = typeof date === "number" ? date : Number(date);
  const diff = Date.now() - date;
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();
  const day = new Date(date).getDate();
  const hours = new Date(date).getHours();
  const min = new Date(date).getMinutes();

  if (diff < 60000) {
    return "меньше минуты назад";
  } else if (diff <= 1.8e6) {
    const min = Math.round(diff / 60000);
    return `${min} ${formatPhrase(min)} назад`;
  } else if (diff < 8.64e7) {
    return `${addZero(hours)}:${addZero(min)}`;
  } else if (diff < 3.154e10) {
    return `${addZero(day)} ${getMonth(month)}`;
  } else {
    return `${addZero(day)} ${getMonth(month)} ${year} года`;
  }
};
