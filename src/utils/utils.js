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

function humanizeDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getDuration(startDate, endDate) {
  const MIN_IN_HOUR = 60;
  const MIN_IN_DAY = 1440;
  const startDateTime = dayjs(startDate);
  const endDateTime = dayjs(endDate);
  const durationInMinutes = endDateTime.diff(startDateTime, 'minute');
  const durationInMsec = endDateTime.diff(startDateTime, 'millisecond');
  let format;

  if (durationInMinutes < MIN_IN_HOUR) {
    format = 'mm[M]';
  } else if (durationInMinutes < MIN_IN_DAY) {
    format = 'HH[H] mm[M]';
  } else {
    const days = endDateTime.diff(startDateTime, 'day');
    const hours = endDateTime.diff(startDateTime, 'hour') % 24;
    const minutes = endDateTime.diff(startDateTime, 'minute') % 60;
    format = `${String(days).padStart(2, '0')}[D] ${String(hours).padStart(2, '0')}[H] ${String(minutes).padStart(2, '0')}[M]`;
  }

  return dayjs.duration(durationInMsec).format(format);
}

const isFutureDate = (date) => dayjs().isBefore(dayjs(date));

const isPresentDate = (dateFrom, dateTo) => dayjs().isBetween(dateFrom, dateTo);

const isExpiredDate = (date) => dayjs().isAfter(dayjs(date));

function findOffersByType(allOffers, type) {
  return allOffers.find((offer) => offer.type === type).offers;
}

export {
  getRandomArrayElement,
  getRandomArrayElements,
  getRandomInteger,
  getRandomDate,
  humanizeDate,
  getDuration,
  isFutureDate,
  isPresentDate,
  isExpiredDate,
  findOffersByType
};
