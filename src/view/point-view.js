import { DATE_FORMAT } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate, getDuration } from '../utils/utils.js';

function createOfferTemplate(offer) {
  const { title, price } = offer;
  return (
    `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </li>`
  );
}

function createPointTemplate(point, offers, destinations) {
  const { dateFrom, dateTo, basePrice, isFavorite, type } = point;
  const pointTypeOffers = offers.find((offer) => offer.type === point.type).offers;
  const pointOffers = pointTypeOffers.filter((pointTypeOffer) => point.offers.includes(pointTypeOffer.id));
  const pointDestination = destinations.find((destination) => destination.id === point.destination);
  const { name } = pointDestination;

  return (
    `<div class="event">
      <time class="event__date" datetime="${humanizeDate(dateFrom, DATE_FORMAT.date)}">${humanizeDate(dateFrom, DATE_FORMAT.shortDate)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${humanizeDate(dateFrom, DATE_FORMAT.time)}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}">${humanizeDate(dateTo, DATE_FORMAT.time)}</time>
        </p>
        <p class="event__duration">${getDuration(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${pointOffers.map((offer) => createOfferTemplate(offer)).join('')}
      </ul>
      <button class="event__favorite-btn ${isFavorite && 'event__favorite-btn--active'}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`
  );
}

export default class PointView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, offers, destinations, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#offers, this.#destinations);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
