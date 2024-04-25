import {POINTS_QUANTITY} from '../const.js';
import {getRandomPoint} from '../mock/points.js';
import {mockDestinations} from '../mock/destinations.js';
import {mockOffers} from '../mock/offers.js';

export default class PointModel {
  points = Array.from({length: POINTS_QUANTITY}, getRandomPoint);
  destinations = mockDestinations;
  offers = mockOffers;

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    const destinations = this.getDestinations();

    return destinations.find((destination) => destination.id === id);
  }

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    return this.getOffers().find((offer) => offer.type === type);
  }

  getOffersById(type, idList) {
    const offersByType = this.getOffersByType(type);

    return offersByType.offers.filter((item) => idList.find((id) => item.id === id));
  }
}
