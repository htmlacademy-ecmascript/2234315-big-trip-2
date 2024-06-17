import Observable from '../framework/observable.js';
import { POINTS_QUANTITY } from '../const.js';
import { getRandomPoint } from '../mock/points.js';
import { mockOffers } from '../mock/offers.js';
import { mockDestinations } from '../mock/destinations.js';

export default class AppModel extends Observable {
  #points = [];
  #offers = [];
  #destinations = [];

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

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
