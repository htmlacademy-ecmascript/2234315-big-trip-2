import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class AppModel extends Observable {
  #appApiService = null;
  #points = [];
  #offers = [];
  #destinations = [];
  isServerAvailable = true;

  constructor({ appApiService }) {
    super();
    this.#appApiService = appApiService;
  }

  async init() {
    try {
      const points = await this.#appApiService.points;

      this.#points = points.map(this.#adaptToClient);
      this.#offers = await this.#appApiService.offers;
      this.#destinations = await this.#appApiService.destinations;
    } catch {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
      this.isServerAvailable = false;
    }

    this._notify(UpdateType.INIT);
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

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point: ${update}`);
    }

    try {
      const response = await this.#appApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = this.#points.map((item) => item.id === updatedPoint.id ? updatedPoint : item);
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error(`Can't update point: ${err}`);
    }
    this._notify(updateType, update);
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#appApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [
        newPoint,
        ...this.#points,
      ];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error(`Can't add point: ${err}`);
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point: ${update}`);
    }

    try {
      await this.#appApiService.deletePoint(update);
      this.#points = this.#points.filter((point) => point.id !== update.id);
      this._notify(updateType);
    } catch (err) {
      throw new Error(`Can't delete point: ${err}`);
    }

    this._notify(updateType);
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
