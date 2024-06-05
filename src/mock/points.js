import { nanoid } from 'nanoid';
import { POINT_TYPES } from '../const.js';
import { getRandomArrayElement, getRandomArrayElements, getRandomInteger, getRandomDate } from '../utils/utils.js';
import { mockDestinations } from './destinations.js';
import { mockOffers } from './offers.js';

const getOffersIds = (type) => {
  const offersByType = mockOffers.find((offerByType) => offerByType.type === type);
  const offersIds = offersByType.offers.map((offer) => offer.id);
  const selectedOffersIds = getRandomArrayElements(offersIds, getRandomInteger(offersIds.length));

  return selectedOffersIds;
};

const getRandomPoint = () => {
  const pointType = getRandomArrayElement(POINT_TYPES);

  return ({
    id: nanoid(),
    basePrice: getRandomInteger(500),
    dateFrom: getRandomDate(new Date(2024, 4, 1), new Date(2024, 4, 5)),
    dateTo: getRandomDate(new Date(2024, 4, 5), new Date(2024, 4, 15)),
    destination: mockDestinations[getRandomInteger(mockDestinations.length)].id,
    isFavorite: !getRandomInteger(2),
    offers: getOffersIds(pointType),
    type: pointType,
  });
};

export { getRandomPoint };
