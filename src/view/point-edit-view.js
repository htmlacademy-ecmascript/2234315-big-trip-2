import { POINT_TYPES, DATE_FORMAT } from '../const';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate } from '../utils/utils.js';

function createBlankPoint(pointTypes) {

  return {
    id: '',
    basePrice: '',
    dateFrom: '',
    dateTo: '',
    destination: '',
    isFavourite: false,
    offers: [],
    type: pointTypes[0],
  };
}

function createPointTypeTemplate(pointType, currentPointType, currentPointId) {

  return (
    `<div class="event__type-item">
        <input id="event-type-${pointType}-${currentPointId}"
          class="event__type-input visually-hidden"
          type="radio"
          name="event-type"
          value="${pointType}"
          ${pointType === currentPointType && 'checked'}>
        <label class="event__type-label
          event__type-label--${pointType}"
          for="event-type-${pointType}-${currentPointId}">${pointType}</label>
      </div>`
  );
}

function createOfferTemplate(offer, selectedOffers) {
  const { id, title, price } = offer;
  const formatOfferTitle = (offerTitle) => offerTitle.toLowerCase().split(' ').join('-');
  const offerCheckedAttribute = selectedOffers.find((selectedOffer) => selectedOffer === id) ? 'checked' : '';

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden"
        id="event-offer-${formatOfferTitle(title)}-${id}"
        type="checkbox"
        name="event-offer-${formatOfferTitle(title)}"
        ${offerCheckedAttribute}>
      <label class="event__offer-label" for="event-offer-${formatOfferTitle(title)}-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
}

function createOffersTemplate(allOffers, currentPointType, selectedOffers) {
  const pointTypeOffers = allOffers.find((offer) => offer.type === currentPointType).offers;

  if (!pointTypeOffers.length) {
    return '';
  }

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${pointTypeOffers.map((offer) => createOfferTemplate(offer, selectedOffers)).join('')}
      </div>
    </section>`
  );
}

function createPicturesTemplate(pictures) {

  if (!pictures.length) {
    return '';
  }

  return (
    `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map((image) => `<img class="event__photo" src="${image.src}" alt="${image.description}">`).join('')}
        </div>
      </div>`
  );
}

function createDestinationTemplate(destination) {

  if (!destination) {
    return '';
  }

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>

      ${createPicturesTemplate(destination.pictures)}
    </section>`
  );
}

function createPointEditTemplate(point, offers, destinations) {
  const currentPoint = point || createBlankPoint(POINT_TYPES);
  const { id, dateFrom, dateTo, basePrice, type } = currentPoint;
  const pointDestination = destinations.find((destination) => destination.id === currentPoint.destination);
  const { name } = pointDestination || {};

  return (
    `<form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle visually-hidden" id="event-type-toggle-${id}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${POINT_TYPES.map((pointType) => createPointTypeTemplate(pointType, type, id)).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${type}
          </label>
          <input class="event__input  event__input--destination"
            id="event-destination-${id}"
            type="text"
            name="event-destination"
            value="${name || ''}"
            list="destination-list-${id}">
          <datalist id="destination-list-${id}">
            ${destinations.map((item) => `<option value="${item.name}"></option>`).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">From</label>
          <input class="event__input event__input--time"
            id="event-start-time-${id}"
            type="text"
            name="event-start-time"
            value="${humanizeDate(dateFrom, DATE_FORMAT.fullDate)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">To</label>
          <input class="event__input  event__input--time"
            id="event-end-time-${id}"
            type="text"
            name="event-end-time"
            value="${humanizeDate(dateTo, DATE_FORMAT.fullDate)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price"
            id="event-price-${id}"
            type="text"
            name="event-price"
            value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">

        ${createOffersTemplate(offers, type, currentPoint.offers)}
        ${createDestinationTemplate(pointDestination)}

      </section>
    </form>`
  );
}

export default class PointEditView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #handleFormSubmit = null;

  constructor({ point, offers, destinations, onFormSubmit }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;

    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
  }

  get template() {
    return createPointEditTemplate(this.#point, this.#offers, this.#destinations);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };
}
