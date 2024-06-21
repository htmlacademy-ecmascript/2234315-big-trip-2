import AbstractView from '../framework/view/abstract-view.js';
import { NoPointsTextType } from '../const.js';

function createNoPointsTemplate(reason) {
  const noPointsText = NoPointsTextType[reason];

  return (
    `<p class="trip-events__msg">${noPointsText}</p>`
  );
}

export default class NoPointsView extends AbstractView {
  #reason = null;

  constructor(reason) {
    super();
    this.#reason = reason;
  }

  get template() {
    return createNoPointsTemplate(this.#reason);
  }
}
