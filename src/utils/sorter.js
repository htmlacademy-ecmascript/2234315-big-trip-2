import dayjs from 'dayjs';

function sortByDay(a, b) {
  return new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime();
}

function sortByTime(a, b) {
  return dayjs(b.dateTo).diff(dayjs(b.dateFrom)) - dayjs(a.dateTo).diff(dayjs(a.dateFrom));
}

function sortByPrice(a, b) {
  return b.basePrice - a.basePrice;
}

export { sortByDay, sortByTime, sortByPrice };
