import {createElement} from '../render.js';

function createPointsListItemTemplate() {
  return (
    '<li class="trip-events__item"></li>'
  );
}

export default class PointsListItemView {
  getTemplate() {
    return createPointsListItemTemplate();
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
