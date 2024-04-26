import {POINTS_TYPES, DATE_FORMAT} from '../const';
import {createElement} from '../render.js';
import {humanizeDate} from '../utils.js';

function createBlancPoint (pointTypes) {

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

function createPointTypeTemplate(pointType, currentPointType) {

  return (
    `<div class="event__type-item">
        <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === currentPointType && 'checked'}>
        <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${pointType}</label>
      </div>`
  );
}

function createDestinationTemplate(destination) {
  const {name} = destination;

  return (
    `<option value="${name}"></option>`
  );
}

function createOfferTemplate(offer, selectedOffers) {
  const {id, title, price} = offer;
  const formatOfferTitle = (offerTitle) => offerTitle.toLowerCase().split(' ').join('-');
  const offerCheckedAttribute = selectedOffers.map((selectedOffer) => selectedOffer.id).includes(id) ? 'checked' : '';

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${formatOfferTitle(title)}-1" type="checkbox" name="event-offer-${formatOfferTitle(title)}" ${offerCheckedAttribute}>
      <label class="event__offer-label" for="event-offer-${formatOfferTitle(title)}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
}

function createPictureTemplate(picture) {
  const {src, description} = picture;

  return (
    `<img class="event__photo" src="${src}" alt="${description}">`
  );
}

function createPointEditTemplate(point, offers, destinations) {
  const currentPoint = point ? point : createBlancPoint(POINTS_TYPES);
  const {dateFrom, dateTo, basePrice, type} = currentPoint;
  const pointTypeOffers = offers.find((offer) => offer.type === currentPoint.type).offers;
  const pointOffers = pointTypeOffers.filter((pointTypeOffer) => currentPoint.offers.includes(pointTypeOffer.id));
  const pointDestination = destinations.find((destination) => destination.id === currentPoint.destination);
  const {name, description, pictures} = pointDestination || {};

  return (
    `<form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${POINTS_TYPES.map((pointType) => createPointTypeTemplate(pointType, type)).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointDestination ? name : ''}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinations.map((item) => createDestinationTemplate(item)).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(dateFrom, DATE_FORMAT.fullDate)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(dateTo, DATE_FORMAT.fullDate)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">

        ${pointTypeOffers.length ? `
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${pointTypeOffers.map((offer) => createOfferTemplate(offer, pointOffers)).join('')}
            </div>
          </section>` : ''}

        ${pointDestination ? `
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>

            ${pictures.length ? `
              <div class="event__photos-container">
                <div class="event__photos-tape">
                  ${pictures.map((image) => createPictureTemplate(image)).join('')}
                </div>
              </div>` : ''}
          </section>` : ''}

      </section>
    </form>`
  );
}

export default class PointEditView {
  constructor({point, offers, destinations}) {
    this.point = point;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createPointEditTemplate(this.point, this.offers, this.destinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
