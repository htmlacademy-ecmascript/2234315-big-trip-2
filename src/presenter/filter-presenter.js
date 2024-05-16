import FilterView from '../view/filter-view.js';
import { generateFilter } from '../mock/filter.js';
import { render } from '../framework/render.js';

export default class FilterPresenter {
  #filterContainer = null;
  #pointModel = null;
  #points = [];

  constructor({ filterContainer, pointModel }) {
    this.#filterContainer = filterContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.points];

    const filters = generateFilter(this.#points);

    render(new FilterView({ filters }), this.#filterContainer);
  }
}
