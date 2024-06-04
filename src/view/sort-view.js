import AbstractView from '../framework/view/abstract-view.js';
import { SortType, DISABLED_SORT_TYPES } from '../const.js';

function createSortItemTemplate(type, currentSortType) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${type}">
      <input
        id="sort-${type}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${type}"
        ${type === currentSortType ? 'checked' : ''}
        ${DISABLED_SORT_TYPES.includes(type) ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>`
  );
}

function createSortTemplate(currentSortType) {
  const sortItemsTemplate = Object.values(SortType)
    .map((sortType) => createSortItemTemplate(sortType, currentSortType))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({ currentSortType, onSortTypeChange }) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    const sortType = evt.target.id.split('-')[1];

    this.#handleSortTypeChange(sortType);
  };
}
