import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

function getRandomBool(probability) {
  return Math.random() < probability;
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

export {getRandomArrayElement, getRandomInteger, getRandomBool, humanizeDate, getDuration};
