import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(duration);
dayjs.extend(isBetween);

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomArrayElements(array, count) {
  const arrayCopy = [...array];

  if (array.length === 0 || count > array.length) {
    return [];
  }

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy.slice(0, count);
}

function getRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

function generateUUID() {
  const hex = () => Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0');
  return `${hex()}-${hex()}-${hex()}-${hex()}-${hex()}${hex()}`;
}

function humanizeDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getDuration(startDate, endDate) {
  const dateDuration = dayjs(endDate).diff(startDate, 'minute');
  const MIN_IN_HOUR = 60;
  const MIN_IN_DAY = 1440;
  let format;

  if (dateDuration < MIN_IN_HOUR) {
    format = 'mm[M]';
  } else if (dateDuration < MIN_IN_DAY) {
    format = 'HH[H] mm[M]';
  } else {
    format = 'DD[D] HH[H] mm[M]';
  }

  return dayjs(dayjs.duration({ minutes: dateDuration }).$ms).format(format);
}

const isFutureDate = (date) => dayjs().isBefore(dayjs(date));

const isPresentDate = (dateFrom, dateTo) => dayjs().isBetween(dateFrom, dateTo);

const isExpiredDate = (date) => dayjs().isAfter(dayjs(date));

export {
  getRandomArrayElement,
  getRandomArrayElements,
  getRandomInteger,
  getRandomDate,
  generateUUID,
  humanizeDate,
  getDuration,
  isFutureDate,
  isPresentDate,
  isExpiredDate
};
