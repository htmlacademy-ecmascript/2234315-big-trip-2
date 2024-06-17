import he from 'he';
import { POINT_TYPES, DATE_FORMAT, BLANK_POINT } from '../const';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeDate, findOffersByType } from '../utils/utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
        id="event-offer-${id}"
        data-id="${id}"
        type="checkbox"
        name="event-offer-${formatOfferTitle(title)}"
        ${offerCheckedAttribute}>
      <label class="event__offer-label" for="event-offer-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
}

function createOffersTemplate(allOffers, currentPointType, selectedOffers) {
  const pointTypeOffers = findOffersByType(allOffers, currentPointType);

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
  const currentPoint = point || BLANK_POINT;
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
            value="${he.encode(name || '')}"
            list="destination-list-${id}"
            required>
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
            type="number"
            name="event-price"
            value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${id ? 'Delete' : 'Cancel'}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>

      </header >
    <section class="event__details">

      ${createOffersTemplate(offers, type, currentPoint.offers)}
      ${createDestinationTemplate(pointDestination)}

    </section>
    </form > `
  );
}

export default class PointEditView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleFormClose = null;
  #handleDeleteClick = null;
  #datepickerStart = null;
  #datepickerEnd = null;

  constructor({ point, offers, destinations, onFormSubmit, onFormClose, onDeleteClick }) {
    super();
    this._setState(PointEditView.parsePointToState(point));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate(this._state, this.#offers, this.#destinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    const pointOffers = findOffersByType(this.#offers, this._state.type);

    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.#setDatepicker();

    if (pointOffers.length !== 0) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    }
  }

  #setDatepicker() {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        locale: {
          firstDayOfWeek: 1
        },
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#startDateChangeHandler,
      },
    );

    this.#datepickerEnd = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        locale: {
          firstDayOfWeek: 1
        },
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#endDateChangeHandler,
      },
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parsePointToState(this._state));
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointEditView.parseStateToPoint(this._state));
  };

  #pointTypeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations.find((destination) => destination.name === evt.target.value);

    if (!selectedDestination) {
      evt.target.value = '';

      return;
    }

    this.updateElement({
      destination: selectedDestination.id
    });
  };

  #startDateChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate
    });
    this.#datepickerEnd.set('minDate', userDate);
  };

  #endDateChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate
    });
    this.#datepickerStart.set('maxDate', userDate);
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      basePrice: evt.target.value
    });
  };

  #offerChangeHandler = (evt) => {
    const offerId = evt.target.dataset.id;
    const selectedOffers = [...this._state.offers];
    const index = selectedOffers.indexOf(offerId);

    if (index > -1) {
      selectedOffers.splice(index, 1);
    } else {
      selectedOffers.push(offerId);
    }

    this._setState({
      offers: selectedOffers
    });
  };

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }
}
