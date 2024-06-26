import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import { HEADER_DESTINATIONS_COUNT } from '../const.js';

dayjs.extend(duration);
dayjs.extend(isBetween);

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

const getTripTitle = (points, destinations) => {
  const allDestinations = points.map((point) => destinations.find((destination) => destination.id === point.destination));
  let tripDestinations = allDestinations.map((destination) => destination.name);

  if (points.length > HEADER_DESTINATIONS_COUNT) {
    tripDestinations = [
      allDestinations[0].name,
      '...',
      allDestinations[points.length - 1].name
    ];
  }

  return tripDestinations.join('&nbsp;&mdash;&nbsp;');
};

const getOffersCost = (selectedOffers, offers) => {
  const allOffers = offers.flatMap((offer) => offer.offers);
  const selectedOffersPrices = selectedOffers.map((selectedOffer) => allOffers.find((offer) => offer.id === selectedOffer).price);

  return selectedOffersPrices.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
};

const getTripCost = (points, offers) => {
  const selectedOffers = points.flatMap((point) => point.offers);
  const offersCost = selectedOffers.length === 0 ? 0 : getOffersCost(selectedOffers, offers);

  const pointsPrices = points.map((point) => point.basePrice);
  const pointsCost = pointsPrices.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

  return pointsCost + offersCost;
};

export {
  humanizeDate,
  getDuration,
  isFutureDate,
  isPresentDate,
  isExpiredDate,
  findOffersByType,
  getTripTitle,
  getTripCost
};
