import AbstractView from '../framework/view/abstract-view.js';

function createPointsListItemTemplate() {
  return (
    '<li class="trip-events__item"></li>'
  );
}

export default class PointsListItemView extends AbstractView {
  get template() {
    return createPointsListItemTemplate();
  }
}
