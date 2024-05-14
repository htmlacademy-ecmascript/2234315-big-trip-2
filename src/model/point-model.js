import { POINTS_QUANTITY } from '../const.js';
import { getRandomPoint } from '../mock/points.js';
import { mockOffers } from '../mock/offers.js';
import { mockDestinations } from '../mock/destinations.js';

export default class PointModel {
  #points = [];
  #offers = [];
  #destinations = [];

  constructor() {
    this.#points = [];
    this.#offers = [];
    this.#destinations = [];
  }

  init() {
    this.#points = Array.from({ length: POINTS_QUANTITY }, getRandomPoint);
    this.#offers = mockOffers;
    this.#destinations = mockDestinations;
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}