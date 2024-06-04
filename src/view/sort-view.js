import AbstractView from '../framework/view/abstract-view.js';
import { SortType, DISABLED_SORT_TYPES } from '../const.js';

function createSortItemTemplate(type, isChecked) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${type}">
      <input
        id="sort-${type}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${type}"
        ${isChecked ? 'checked' : ''}
        ${DISABLED_SORT_TYPES.includes(type) ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>`
  );
}

function createSortTemplate() {
  const sortItemsTemplate = Object.values(SortType)
    .map((sortType, index) => createSortItemTemplate(sortType, index === 0))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    this.#handleSortTypeChange(evt.target.id.replace('sort-', ''));
  };
}
