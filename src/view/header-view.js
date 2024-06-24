import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate, getTriDestinations, getTripCost } from '../utils/utils.js';
import { HEADER_DESTINATIONS_COUNT, DATE_FORMAT } from '../const.js';

function createHeaderTemplate(points, offers, destinations) {
  const dateFrom = points[0].dateFrom;
  const dateTo = points[points.length - 1].dateTo;
  let tripDestinations = getTriDestinations(points, destinations).map((destination) => destination.name);

  if (points.length > HEADER_DESTINATIONS_COUNT) {
    tripDestinations = [
      getTriDestinations(points, destinations)[0].name,
      '...',
      getTriDestinations(points, destinations)[points.length - 1].name
    ];
  }

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripDestinations.join('&nbsp;&mdash;&nbsp;')}</h1>
        <p class="trip-info__dates">${humanizeDate(dateFrom, DATE_FORMAT.shortDate)}&nbsp;&mdash;&nbsp;${humanizeDate(dateTo, DATE_FORMAT.shortDate)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripCost(points, offers)}</span>
      </p>
    </section>`
  );
}

export default class HeaderView extends AbstractView {
  #points = null;
  #offers = null;
  #destinations = null;

  constructor({ points, offers, destinations }) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createHeaderTemplate(this.#points, this.#offers, this.#destinations);
  }
}
