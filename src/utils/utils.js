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
  const dateDuration = dayjs(endDate).diff(startDate, 'minute');
  const durationInMsec = dayjs.duration({ minutes: dateDuration }).$ms;
  let format;

  if (dateDuration < MIN_IN_HOUR) {
    format = 'mm[M]';
  } else if (dateDuration < MIN_IN_DAY) {
    format = 'HH[H] mm[M]';
  } else {
    format = 'DD[D] HH[H] mm[M]';
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
